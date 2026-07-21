import { useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import { authorizedAPI } from '../../../configs';
import { APIConst, Strings } from '../../../constants';
import { useOrders } from '../../../redux';
import type { AddressData, AddressListResponse } from '../../../types';
import type { LocationCoordinates, TrackOrderHookReturnType } from './TrackOrderTypes';

/**
 * Custom hook for TrackOrder Screen business logic.
 * Fetches order details from Redux store, handles call and SMS action links.
 * Resolves customer home location by fetching addresses directly from API
 * to ensure fresh data with coordinates.
 *
 * @returns {TrackOrderHookReturnType} Hook state and handlers.
 */
export const useTrackOrder = (): TrackOrderHookReturnType => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { fetchOrderDetail, orderDetail, detailLoading } = useOrders();

  const [addresses, setAddresses] = useState<AddressData[]>([]);

  useEffect(() => {
    if (id) {
      fetchOrderDetail(id);
    }
    // Fetch addresses directly from API — bypasses Redux persist stale cache
    const fetchAddresses = async () => {
      try {
        const response = await authorizedAPI.get<AddressListResponse>(APIConst.addresses);
        if (response.ok && response.data?.data) {
          setAddresses(response.data.data);
        }
      } catch {
        // Silently fail — fallback coordinates will be used
      }
    };
    fetchAddresses();
  }, [id, fetchOrderDetail]);

  const activeAddress = useMemo(() => {
    // First check order's embedded address if it has coordinates
    if (orderDetail?.address?.latitude && orderDetail?.address?.longitude) {
      return orderDetail.address;
    }
    // Find the order's address in the fresh API data (which has coordinates)
    if (orderDetail?.address?.id && addresses.length > 0) {
      const found = addresses.find((addr) => addr.id === orderDetail.address?.id);
      if (found) return found;
    }
    // Fallback to default address from fresh API data
    const defaultAddr = addresses.find((addr) => addr.is_default);
    return defaultAddr || addresses[0] || null;
  }, [orderDetail, addresses]);

  const homeLocation = useMemo(() => {
    if (activeAddress?.latitude && activeAddress?.longitude) {
      return {
        latitude: Number(activeAddress.latitude),
        longitude: Number(activeAddress.longitude)
      };
    }

    return {
      latitude: 22.9958017,
      longitude: 72.5007225
    };
  }, [activeAddress]);

  const storeLocation = useMemo(() => {
    // Store is within ~1.2km of customer home location (+0.008lat, +0.008long)
    return {
      latitude: homeLocation.latitude + 0.008,
      longitude: homeLocation.longitude + 0.008
    };
  }, [homeLocation]);

  const openTel = useCallback(async () => {
    const url = 'tel:0000000000';
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(Strings.TrackOrder.errorTitle, Strings.TrackOrder.telError);
      }
    } catch {
      Alert.alert(Strings.TrackOrder.errorTitle, Strings.TrackOrder.telError);
    }
  }, []);

  const openSMS = useCallback(async () => {
    try {
      let url: string;
      if (Platform.OS === 'android') {
        url = 'smsto:';
      } else if (Platform.OS === 'ios') {
        url = 'sms:';
      } else {
        Alert.alert(
          Strings.TrackOrder.unsupportedPlatform,
          Strings.TrackOrder.unsupportedPlatformMsg
        );
        return;
      }

      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(Strings.TrackOrder.errorTitle, Strings.TrackOrder.smsError);
      }
    } catch {
      Alert.alert(Strings.TrackOrder.errorTitle, Strings.TrackOrder.smsError);
    }
  }, []);

  const orderIdPrefix = useMemo(() => {
    if (!id) return '#--';
    return id.includes('-') ? `#${id.split('-')[0]}-${id.split('-')[1]}` : `#${id}`;
  }, [id]);

  const [refreshing, setRefreshing] = useState(false);

  const refresh = useCallback(async () => {
    if (id) {
      try {
        setRefreshing(true);
        await fetchOrderDetail(id).unwrap();
      } finally {
        setRefreshing(false);
      }
    }
  }, [id, fetchOrderDetail]);

  const [routeCoordinates, setRouteCoordinates] = useState<LocationCoordinates[]>([]);

  useEffect(() => {
    let isMounted = true;
    const fetchDirectionsRoute = async () => {
      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${storeLocation.longitude},${storeLocation.latitude};${homeLocation.longitude},${homeLocation.latitude}?overview=full&geometries=geojson`;
        const response = await fetch(url);
        const data = await response.json();

        if (isMounted && data?.routes?.[0]?.geometry?.coordinates) {
          const coords: [number, number][] = data.routes[0].geometry.coordinates;
          const formattedCoords: LocationCoordinates[] = coords
            .map(([lng, lat]) => ({
              latitude: Number(lat),
              longitude: Number(lng)
            }))
            .filter((coord) => Number.isFinite(coord.latitude) && Number.isFinite(coord.longitude));
          setRouteCoordinates(formattedCoords);
          return;
        }
      } catch {
        // Fallback to intermediate waypoints if network fails
      }

      if (isMounted) {
        const latDiff = homeLocation.latitude - storeLocation.latitude;
        const lngDiff = homeLocation.longitude - storeLocation.longitude;
        setRouteCoordinates([
          storeLocation,
          {
            latitude: storeLocation.latitude + latDiff * 0.25,
            longitude: storeLocation.longitude + lngDiff * 0.05
          },
          {
            latitude: storeLocation.latitude + latDiff * 0.45,
            longitude: storeLocation.longitude + lngDiff * 0.35
          },
          {
            latitude: storeLocation.latitude + latDiff * 0.55,
            longitude: storeLocation.longitude + lngDiff * 0.75
          },
          {
            latitude: storeLocation.latitude + latDiff * 0.85,
            longitude: storeLocation.longitude + lngDiff * 0.95
          },
          homeLocation
        ]);
      }
    };

    fetchDirectionsRoute();

    return () => {
      isMounted = false;
    };
  }, [
    storeLocation,
    homeLocation,
    storeLocation.latitude,
    storeLocation.longitude,
    homeLocation.latitude,
    homeLocation.longitude
  ]);

  return {
    order: orderDetail,
    loading: detailLoading,
    refreshing,
    orderIdPrefix,
    activeAddress,
    homeLocation,
    storeLocation,
    routeCoordinates,
    openTel,
    openSMS,
    refresh
  };
};

export default useTrackOrder;
