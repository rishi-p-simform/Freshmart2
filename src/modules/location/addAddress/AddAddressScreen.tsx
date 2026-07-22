import { FilterSelector, CustomInput, Spinner, Text } from '@/src/components';
import Strings from '@/src/constants/Strings';
import { useTheme } from '@/src/hooks';
import { scale } from '@/src/theme';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { AppleMaps, GoogleMaps } from 'expo-maps';
import React, { useMemo, useRef, type FC } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  useWindowDimensions
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import styleSheet from './AddAddressStyles';
import { useAddAddress } from './useAddAddress';

/**
 * The Add Address Component
 * Provides a screen for selecting an address on a map.
 * @returns {React.ReactElement} The Add Address Screen.
 */
const AddAddressScreen: FC = (): React.ReactElement => {
  const { styles, isDark } = useTheme(styleSheet);
  const {
    isCurrent,
    coordinate,
    goBack,
    addressType,
    setAddressType,
    addressLine1,
    setAddressLine1,
    addressLine2,
    setAddressLine2,
    city,
    setCity,
    state,
    setState,
    pincode,
    setPincode,
    errors,
    isLoadingLocation,
    isSubmitting,
    onConfirm
  } = useAddAddress();
  const { height: screenHeight } = useWindowDimensions();

  const addressLine2Ref = useRef<TextInput>(null);
  const cityRef = useRef<TextInput>(null);
  const stateRef = useRef<TextInput>(null);
  const pincodeRef = useRef<TextInput>(null);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['40%', '80%'], []);
  const animatedPosition = useSharedValue(screenHeight);

  // Slower animation config for BottomSheet
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
    // If the bottom sheet hasn't calculated its layout, keep it full screen
    if (animatedPosition.value === screenHeight) {
      return { flex: 1 };
    }
    // Make the map's height strictly equal to the top edge of the bottom sheet
    // so it 'contracts' rather than getting hidden under the sheet
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: animatedPosition.value
    };
  });

  /**
   * Renders the platform-specific map view.
   * Uses AppleMaps.View on iOS and GoogleMaps.View on Android.
   */
  const renderMap = () => {
    const cameraPosition = {
      coordinates: coordinate,
      zoom: 14
    };

    const markers = isCurrent
      ? [{ id: 'current-location', coordinates: coordinate, title: 'Current Location' }]
      : [];

    if (Platform.OS === 'ios') {
      return (
        <AppleMaps.View
          style={styles.map}
          cameraPosition={cameraPosition}
          markers={markers}
          uiSettings={{ myLocationButtonEnabled: false }}
          properties={{
            mapType: isDark ? AppleMaps.MapType.HYBRID : AppleMaps.MapType.STANDARD
          }}
        />
      );
    }

    return (
      <GoogleMaps.View
        style={styles.map}
        cameraPosition={cameraPosition}
        markers={markers}
        colorScheme={isDark ? GoogleMaps.MapColorScheme.DARK : GoogleMaps.MapColorScheme.LIGHT}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.mapContainer, animatedMapStyle]}>
        {renderMap()}
        {isLoadingLocation && (
          <View style={[StyleSheet.absoluteFillObject, styles.loadingOverlay]}>
            <Spinner />
          </View>
        )}
        <Pressable
          style={styles.backBtn}
          onPress={goBack}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={scale(22)} color={styles.backBtnIcon.color} />
        </Pressable>
      </Animated.View>

      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        animatedPosition={animatedPosition}
        animationConfigs={animationConfigs}
        keyboardBehavior="extend"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
        handleIndicatorStyle={styles.dragHandle}
        backgroundStyle={{ backgroundColor: styles.container.backgroundColor }}
      >
        <BottomSheetScrollView
          contentContainerStyle={styles.bottomOverlay}
          showsVerticalScrollIndicator={false}
        >
          <Text variant="titleLarge" style={styles.headerText}>
            {Strings.Location.setDeliveryLocation}
          </Text>
          <Text variant="bodySmall" style={styles.subHeaderText}>
            {Strings.Location.deliveryLocationSubtitle}
          </Text>

          <View style={styles.formContainer}>
            <CustomInput
              InputComponent={BottomSheetTextInput}
              label={Strings.Location.addressLine1Label}
              placeholder={Strings.Location.addressLine1Placeholder}
              value={addressLine1}
              onChangeText={setAddressLine1}
              containerStyle={styles.inputStyle}
              returnKeyType="next"
              onSubmitEditing={() => addressLine2Ref.current?.focus()}
            />
            {errors.addressLine1 ? <Text variant="error">{errors.addressLine1}</Text> : null}

            <CustomInput
              InputComponent={BottomSheetTextInput}
              ref={addressLine2Ref}
              label={Strings.Location.addressLine2Label}
              placeholder={Strings.Location.addressLine2Placeholder}
              value={addressLine2}
              onChangeText={setAddressLine2}
              containerStyle={styles.inputStyle}
              returnKeyType="next"
              onSubmitEditing={() => cityRef.current?.focus()}
            />

            <CustomInput
              InputComponent={BottomSheetTextInput}
              ref={cityRef}
              label={Strings.Location.cityLabel}
              placeholder={Strings.Location.cityPlaceholder}
              value={city}
              onChangeText={setCity}
              customStyle={[styles.inputStyle]}
              returnKeyType="next"
              onSubmitEditing={() => stateRef.current?.focus()}
            />
            {errors.city ? <Text variant="error">{errors.city}</Text> : null}

            <View style={styles.rowContainer}>
              <View style={styles.halfInput}>
                <CustomInput
                  InputComponent={BottomSheetTextInput}
                  ref={stateRef}
                  label={Strings.Location.stateLabel}
                  placeholder={Strings.Location.statePlaceholder}
                  value={state}
                  onChangeText={setState}
                  customStyle={[styles.inputStyle]}
                  returnKeyType="next"
                  onSubmitEditing={() => pincodeRef.current?.focus()}
                />
                {errors.state ? <Text variant="error">{errors.state}</Text> : null}
              </View>

              <View style={styles.halfInputRight}>
                <CustomInput
                  InputComponent={BottomSheetTextInput}
                  ref={pincodeRef}
                  label={Strings.Location.pincodeLabel}
                  placeholder={Strings.Location.pincodePlaceholder}
                  value={pincode}
                  onChangeText={setPincode}
                  customStyle={[styles.inputStyle]}
                  keyboardType="numeric"
                  returnKeyType="done"
                  onSubmitEditing={onConfirm}
                />
                {errors.pincode ? <Text variant="error">{errors.pincode}</Text> : null}
              </View>
            </View>
          </View>

          <Text variant="labelLarge">{Strings.Location.saveAs}</Text>
          <FilterSelector
            options={[
              { id: 'Home', name: 'Home' },
              { id: 'Work', name: 'Work' },
              { id: 'Other', name: 'Other' }
            ]}
            selectedCategoryId={addressType}
            onSelectCategory={(id) => id && setAddressType(id as 'Home' | 'Work' | 'Other')}
            customStyle={{ paddingVertical: scale(8) }}
          />

          {!isCurrent && (
            <Pressable
              style={styles.useLocationBtn}
              accessibilityRole="button"
              accessibilityLabel="Use My Current Location"
            >
              <Ionicons name="locate" size={scale(20)} color={styles.useLocationText.color} />
              <Text variant="labelLarge" style={styles.useLocationText}>
                {Strings.Location.useCurrentLocation}
              </Text>
            </Pressable>
          )}

          <Pressable
            style={[styles.confirmBtn, isSubmitting && { opacity: 0.7 }]}
            onPress={onConfirm}
            disabled={isSubmitting}
            accessibilityRole="button"
            accessibilityLabel={Strings.Location.confirmLocation}
          >
            {isSubmitting ? (
              <Spinner size="small" color={styles.confirmBtnText.color} />
            ) : (
              <Text variant="labelLarge" style={styles.confirmBtnText}>
                {Strings.Location.confirmLocation}
              </Text>
            )}
          </Pressable>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

export default AddAddressScreen;
