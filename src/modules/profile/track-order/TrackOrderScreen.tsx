import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useImage } from 'expo-image';
import { AppleMaps, GoogleMaps } from 'expo-maps';
import { Stack } from 'expo-router';
import React, { useMemo, useRef } from 'react';
import {
  Platform,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
  useWindowDimensions
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import Images from '../../../assets/images';
import { CustomHeader, FullScreenLoader, OrderStatus, Text } from '../../../components';
import { Strings } from '../../../constants';
import { useTheme } from '../../../hooks';
import { Colors } from '../../../theme';
import styleSheet from './TrackOrderStyles';
import { useTrackOrder } from './useTrackOrder';

/**
 * TrackOrderScreen Component
 * Dynamic screen for tracking order delivery status with progress timeline, delivery partner card, live map with fixed home and store pins via useImage, and pull-to-refresh functionality.
 *
 * @returns {React.ReactElement} TrackOrderScreen element.
 */
const TrackOrderScreen: React.FC = () => {
  const { styles, theme } = useTheme(styleSheet);
  const {
    order,
    loading,
    refreshing,
    orderIdPrefix,
    activeAddress,
    homeLocation,
    storeLocation,
    routeCoordinates,
    openTel,
    openSMS,
    refresh
  } = useTrackOrder();

  const homeIcon = useImage(Images.homePin, { maxWidth: 120, maxHeight: 120 });
  const storeIcon = useImage(Images.storePin, { maxWidth: 120, maxHeight: 120 });

  const isOutForDelivery =
    order?.status?.toUpperCase() === 'OUT_FOR_DELIVERY' ||
    order?.status?.toLowerCase() === 'out for delivery';

  const renderMapView = () => {
    const safeHomeLat = Number.isFinite(homeLocation?.latitude)
      ? homeLocation.latitude
      : 22.9958017;
    const safeHomeLng = Number.isFinite(homeLocation?.longitude)
      ? homeLocation.longitude
      : 72.5007225;
    const safeStoreLat = Number.isFinite(storeLocation?.latitude)
      ? storeLocation.latitude
      : safeHomeLat + 0.008;
    const safeStoreLng = Number.isFinite(storeLocation?.longitude)
      ? storeLocation.longitude
      : safeHomeLng + 0.008;

    const safeHomeLocation = { latitude: safeHomeLat, longitude: safeHomeLng };
    const safeStoreLocation = { latitude: safeStoreLat, longitude: safeStoreLng };

    const cameraPosition = {
      coordinates: {
        latitude: (safeHomeLat + safeStoreLat) / 2,
        longitude: (safeHomeLng + safeStoreLng) / 2
      },
      zoom: 14
    };

    const homeTitle = activeAddress
      ? `${activeAddress.address_line1 || activeAddress.label || 'Home'}, ${activeAddress.city || ''}`
      : 'Home Location';

    const validRouteCoordinates = (routeCoordinates || []).filter(
      (coord) => Number.isFinite(coord?.latitude) && Number.isFinite(coord?.longitude)
    );

    const routePolyline =
      isOutForDelivery && validRouteCoordinates.length > 0
        ? [
            {
              coordinates: validRouteCoordinates,
              color: Colors[theme]?.orange,
              width: Platform.OS === 'ios' ? 4 : 15
            }
          ]
        : [];

    const mapMarkers = [
      {
        id: 'home',
        title: homeTitle,
        coordinates: safeHomeLocation,
        icon: homeIcon ?? undefined,
        anchor: { x: 0.5, y: 0.5 }
      },
      {
        id: 'store',
        title: 'FreshMart Store',
        coordinates: safeStoreLocation,
        icon: storeIcon ?? undefined,
        anchor: { x: 0.5, y: 0.5 }
      }
    ];

    if (Platform.OS === 'ios') {
      return (
        <AppleMaps.View
          style={styles.map}
          cameraPosition={cameraPosition}
          polylines={routePolyline}
          annotations={mapMarkers}
          uiSettings={{
            compassEnabled: false,
            myLocationButtonEnabled: false,
            scaleBarEnabled: false,
            togglePitchEnabled: false
          }}
        />
      );
    }

    return (
      <GoogleMaps.View
        style={styles.map}
        cameraPosition={cameraPosition}
        polylines={routePolyline}
        markers={mapMarkers}
        uiSettings={{
          compassEnabled: false,
          myLocationButtonEnabled: false,
          zoomControlsEnabled: false,
          mapToolbarEnabled: false,
          indoorLevelPickerEnabled: false
        }}
      />
    );
  };

  const renderOrderInfoCard = () => {
    if (!order) return null;

    return (
      <View style={styles.orderInfoCard}>
        <Text variant="titleMedium" style={styles.orderInfoTitle}>
          Order Details
        </Text>

        {order.order_items?.map((item) => (
          <View key={item.id} style={styles.orderItemRow}>
            <Text variant="bodyMedium" style={styles.orderItemName} numberOfLines={1}>
              {item.product_name}
            </Text>
            <Text variant="bodySmall" style={styles.orderItemQty}>
              x{item.quantity}
            </Text>
            <Text variant="titleSmall" style={styles.orderItemPrice}>
              ${(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        ))}

        <View style={styles.divider} />

        <View style={styles.summaryRow}>
          <Text variant="bodyMedium" style={styles.summaryLabel}>
            Subtotal
          </Text>
          <Text variant="titleSmall" style={styles.summaryValue}>
            ${order.subtotal?.toFixed(2)}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text variant="bodyMedium" style={styles.summaryLabel}>
            Delivery Fee
          </Text>
          <Text variant="titleSmall" style={styles.summaryValue}>
            {order.delivery_fee === 0 ? 'Free' : `$${order.delivery_fee?.toFixed(2)}`}
          </Text>
        </View>

        {order.discount > 0 && (
          <View style={styles.summaryRow}>
            <Text variant="bodyMedium" style={styles.summaryLabel}>
              Discount
            </Text>
            <Text variant="titleSmall" style={{ color: Colors[theme]?.orange }}>
              -${order.discount?.toFixed(2)}
            </Text>
          </View>
        )}

        <View style={styles.divider} />

        <View style={styles.summaryRow}>
          <Text variant="titleMedium" style={styles.totalLabel}>
            Total Amount
          </Text>
          <Text variant="titleMedium" style={styles.totalValue}>
            ${order.total?.toFixed(2)}
          </Text>
        </View>
      </View>
    );
  };

  const { height: screenHeight } = useWindowDimensions();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['50%', '85%'], []);
  const animatedPosition = useSharedValue(screenHeight);
  const [sheetIndex, setSheetIndex] = React.useState<number>(0);

  const isMapFullScreen = sheetIndex === -1;

  const toggleMapExpand = () => {
    if (isMapFullScreen) {
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close();
    }
  };

  const animationConfigs = useMemo(
    () => ({
      damping: 25,
      stiffness: 80,
      mass: 1,
      overshootClamping: true,
      restDisplacementThreshold: 10,
      restSpeedThreshold: 10
    }),
    []
  );

  const animatedMapStyle = useAnimatedStyle(() => {
    if (animatedPosition.value === screenHeight) {
      return { flex: 1 };
    }
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: animatedPosition.value
    };
  });

  const isDelivered = order?.status?.toLowerCase() === 'delivered';
  const isCancelled = order?.status?.toLowerCase() === 'cancelled';
  const isTerminalState = isDelivered || isCancelled;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => (
            <CustomHeader
              title={Strings.TrackOrder.title}
              headerContent={
                <View>
                  <Text variant="headlineLarge" style={styles.textColor}>
                    {Strings.TrackOrder.title}
                  </Text>
                  <Text variant="caption" style={styles.secondaryText}>
                    {orderIdPrefix}
                  </Text>
                </View>
              }
            />
          )
        }}
      />

      {loading ? (
        <FullScreenLoader />
      ) : isTerminalState ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refresh}
              tintColor={Colors[theme]?.primary}
            />
          }
        >
          {isDelivered ? (
            /* Delivered Status Block (Happy UI) */
            <View style={[styles.statusBlockContainer, styles.deliveredCard]}>
              <Text style={styles.statusEmoji}>🥳</Text>
              <Text variant="titleMedium" style={styles.statusTitle}>
                Order Delivered Successfully!
              </Text>
              <Text variant="bodySmall" style={styles.statusSubtitle}>
                Hope you enjoy your fresh items. Thank you for shopping with FreshMart!
              </Text>
            </View>
          ) : (
            /* Cancelled Status Block (Sad UI) */
            <View style={[styles.statusBlockContainer, styles.cancelledCard]}>
              <Text style={styles.statusEmoji}>😔</Text>
              <Text variant="titleMedium" style={styles.statusTitle}>
                Order Cancelled
              </Text>
              <Text variant="bodySmall" style={styles.statusSubtitle}>
                This order was cancelled. If you have any questions, please contact support.
              </Text>
            </View>
          )}

          {/* Order Details & Summary Info Card */}
          {renderOrderInfoCard()}
        </ScrollView>
      ) : (
        <View style={{ flex: 1 }}>
          {/* Full background interactive map - dynamically contracts as sheet slides up */}
          <Animated.View style={[styles.mapContainer, animatedMapStyle]}>
            {renderMapView()}
            <TouchableOpacity
              style={styles.fullScreenMapBtn}
              onPress={toggleMapExpand}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel={
                isMapFullScreen
                  ? 'Restore order details sheet'
                  : 'Hide sheet to expand map full screen'
              }
            >
              <MaterialCommunityIcons
                name={isMapFullScreen ? 'fullscreen-exit' : 'fullscreen'}
                size={22}
                color={Colors[theme]?.text}
              />
            </TouchableOpacity>
          </Animated.View>

          <BottomSheet
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            onChange={(index) => setSheetIndex(index)}
            animatedPosition={animatedPosition}
            animationConfigs={animationConfigs}
            handleIndicatorStyle={styles.dragHandle}
            backgroundStyle={{ backgroundColor: Colors[theme]?.surface }}
          >
            <BottomSheetScrollView
              contentContainerStyle={styles.scrollViewContent}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={refresh}
                  tintColor={Colors[theme]?.primary}
                />
              }
            >
              {/* Delivery Partner Details Card */}
              <View style={styles.card}>
                <View style={styles.iconView}>
                  <Text style={styles.avatarEmoji}>👨‍✈️</Text>
                </View>

                <View style={styles.centerText}>
                  <Text variant="titleSmall" style={styles.textColor} numberOfLines={1}>
                    {Strings.TrackOrder.deliveryPartner}
                  </Text>
                  <Text variant="caption" style={styles.secondaryText} numberOfLines={1}>
                    {Strings.TrackOrder.deliveryPartnerRole}
                  </Text>
                </View>

                <View style={styles.rightIcons}>
                  <TouchableOpacity
                    style={[styles.rightIcon, styles.callBg]}
                    onPress={openTel}
                    activeOpacity={0.7}
                    accessibilityRole="button"
                    accessibilityLabel="Call delivery partner"
                  >
                    <MaterialCommunityIcons name="phone" size={18} color={Colors[theme]?.primary} />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.rightIcon, styles.chatBg]}
                    onPress={openSMS}
                    activeOpacity={0.7}
                    accessibilityRole="button"
                    accessibilityLabel="Send SMS to delivery partner"
                  >
                    <MaterialCommunityIcons
                      name="message-reply-outline"
                      size={18}
                      color={Colors[theme]?.orange}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Dynamic Animated Step-by-Step Order Status Timeline */}
              <OrderStatus status={order?.status} />

              {/* Order Details & Summary Info Card */}
              {renderOrderInfoCard()}
            </BottomSheetScrollView>
          </BottomSheet>
        </View>
      )}
    </View>
  );
};

TrackOrderScreen.displayName = 'TrackOrderScreen';

export default TrackOrderScreen;
