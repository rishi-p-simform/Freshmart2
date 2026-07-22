import { useAppDispatch } from '@/src/redux';
import { createAddress } from '@/src/redux/address/AddressSlice';
import { AddressPayload } from '@/src/types';
import * as Location from 'expo-location';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';

export type AddressType = 'Home' | 'Work' | 'Other';

export const useAddAddress = () => {
  const router = useRouter();
  const { type } = useLocalSearchParams<{ type: 'current' | 'new' }>();
  const isCurrent = type === 'current';

  const [coordinate, setCoordinate] = useState({
    latitude: 37.78825,
    longitude: -122.4324
  });

  const [addressType, setAddressType] = useState<AddressType>('Home');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  const [errors, setErrors] = useState<{
    addressLine1?: string;
    city?: string;
    state?: string;
    pincode?: string;
  }>({});

  // Ref to track if the current change is from reverse geocoding to prevent infinite loops
  const isReverseGeocoding = useRef(false);

  const reverseGeocodeLocation = async (lat: number, lon: number) => {
    isReverseGeocoding.current = true;
    try {
      const result = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lon });
      if (result && result.length > 0) {
        const addr = result[0];
        setAddressLine1(addr.street || addr.name || '');
        setAddressLine2(addr.district || addr.subregion || '');
        setCity(addr.city || addr.subregion || '');
        setState(addr.region || '');
        setPincode(addr.postalCode || '');
        setErrors({});
      }
    } catch (error) {
      console.warn('Error reverse geocoding:', error);
    } finally {
      // Allow a small delay before accepting manual input geocoding again
      setTimeout(() => {
        isReverseGeocoding.current = false;
      }, 500);
    }
  };

  const [isLoadingLocation, setIsLoadingLocation] = useState(isCurrent);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.warn('Permission to access location was denied');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setCoordinate({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        });

        if (isCurrent) {
          await reverseGeocodeLocation(location.coords.latitude, location.coords.longitude);
        }
      } finally {
        setIsLoadingLocation(false);
      }
    };

    fetchLocation();
  }, [isCurrent]);

  // Debounced geocoding when form fields change manually
  useEffect(() => {
    if (isReverseGeocoding.current) return;

    const fullAddress = `${addressLine1} ${addressLine2} ${city} ${state} ${pincode}`.trim();
    if (fullAddress.length < 5) return;

    const timeoutId = setTimeout(async () => {
      try {
        const result = await Location.geocodeAsync(fullAddress);
        if (result && result.length > 0) {
          setCoordinate({
            latitude: result[0].latitude,
            longitude: result[0].longitude
          });
        }
      } catch (error) {
        console.warn('Error geocoding address:', error);
      }
    }, 1000); // 1s debounce

    return () => clearTimeout(timeoutId);
  }, [addressLine1, addressLine2, city, state, pincode]);

  const goBack = () => {
    router.back();
  };

  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: {
      addressLine1?: string;
      city?: string;
      state?: string;
      pincode?: string;
    } = {};

    if (!addressLine1.trim()) {
      newErrors.addressLine1 = 'Address Line 1 is required';
    }
    if (!city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!state.trim()) {
      newErrors.state = 'State is required';
    }
    if (!pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const setAddressLine1WithClearError = (text: string) => {
    setAddressLine1(text);
    if (errors.addressLine1) setErrors((prev) => ({ ...prev, addressLine1: undefined }));
  };

  const setCityWithClearError = (text: string) => {
    setCity(text);
    if (errors.city) setErrors((prev) => ({ ...prev, city: undefined }));
  };

  const setStateWithClearError = (text: string) => {
    setState(text);
    if (errors.state) setErrors((prev) => ({ ...prev, state: undefined }));
  };

  const setPincodeWithClearError = (text: string) => {
    setPincode(text);
    if (errors.pincode) setErrors((prev) => ({ ...prev, pincode: undefined }));
  };

  const onConfirm = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const payload: AddressPayload = {
        label: addressType.toLowerCase(),
        address_line1: addressLine1.trim(),
        address_line2: addressLine2.trim(),
        city: city.trim(),
        state: state.trim(),
        pincode: pincode.trim(),
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        is_default: true
      };

      const resultAction = await dispatch(createAddress({ data: payload })).unwrap();
      if (resultAction) {
        router.back();
      }
    } catch (error: any) {
      console.warn('Failed to add address:', error);
      Alert.alert('Error', error?.message || 'Failed to add address');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isCurrent,
    coordinate,
    goBack,
    addressType,
    setAddressType,
    addressLine1,
    setAddressLine1: setAddressLine1WithClearError,
    addressLine2,
    setAddressLine2,
    city,
    setCity: setCityWithClearError,
    state,
    setState: setStateWithClearError,
    pincode,
    setPincode: setPincodeWithClearError,
    errors,
    isLoadingLocation,
    isSubmitting,
    onConfirm
  };
};
