import LottieView from 'lottie-react-native';
import React, { useMemo, useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomButton, Spinner, Text } from '../../components';
import { Strings } from '../../constants';
import { useTheme } from '../../hooks';
import styleSheet from './ConfirmationStyles';
import type { ConfirmationScreenProps } from './ConfirmationTypes';
import useConfirmation from './useConfirmation';

/**
 * ConfirmationScreen
 * The 3rd screen in the checkout and payment flow.
 * Displays order confirmation details, order number, summary chips,
 * and navigation actions to track order or continue shopping.
 *
 * @param {ConfirmationScreenProps} props - Component props.
 * @returns {React.ReactElement} The ConfirmationScreen component.
 */
const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  customStyle
}): React.ReactElement => {
  const { styles } = useTheme(styleSheet);
  const insets = useSafeAreaInsets();
  const animation = useRef<LottieView>(null);

  const containerStyle = useMemo(
    () => StyleSheet.flatten([styles.container, { paddingTop: insets.top }, customStyle]),
    [styles.container, insets.top, customStyle]
  );

  const {
    loading,
    totalQuantity,
    totalAmount,
    formattedOrderId,
    handleTrackOrder,
    handleContinueShopping
  } = useConfirmation();

  if (loading) {
    return <Spinner />;
  }

  return (
    <View style={containerStyle}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <LottieView
          ref={animation}
          source={require('../../assets/lotties/success.json')}
          autoPlay
          loop={false}
          style={styles.animation}
        />

        <View style={styles.header}>
          <Text variant="displaySmall" style={[styles.textColor, styles.textCenter]}>
            {Strings.Confirmation.orderPlaced}
          </Text>

          <Text variant="bodyMedium" style={[styles.secondaryText, styles.textCenter]}>
            {Strings.Confirmation.orderConfirmedDesc}
          </Text>
        </View>

        <View style={styles.orderSection}>
          <Text variant="bodySmall" style={[styles.secondaryText, styles.textCenter]}>
            {Strings.Confirmation.orderNumber}
          </Text>
          <Text
            variant="headlineLarge"
            style={[styles.primaryColor, styles.textCenter]}
            numberOfLines={1}
          >
            {formattedOrderId}
          </Text>
        </View>

        <View style={styles.iconRow}>
          <View style={[styles.iconContainer, styles.zumthorBg]}>
            <Text style={styles.icon}>📦</Text>
            <Text variant="labelMedium" style={styles.secondaryText}>
              {totalQuantity} {totalQuantity === 1 ? Strings.Products.item : Strings.Products.items}
            </Text>
          </View>

          <View style={[styles.iconContainer, styles.gray96Bg]}>
            <Text style={styles.icon}>💰</Text>
            <Text variant="labelMedium" style={styles.secondaryText}>
              ₹{totalAmount}
            </Text>
          </View>

          <View style={[styles.iconContainer, styles.fetaBg]}>
            <Text style={styles.icon}>⏱️</Text>
            <Text variant="labelMedium" style={styles.secondaryText}>
              {Strings.Confirmation.estimatedTime}
            </Text>
          </View>
        </View>

        <CustomButton
          title={Strings.Confirmation.trackMyOrder}
          onPress={handleTrackOrder}
          leftIcon="time-outline"
          style={styles.btnStyle}
          testID="track-my-order-btn"
          accessibilityLabel="Track My Order"
        />

        <CustomButton
          title={Strings.Confirmation.continueShopping}
          onPress={handleContinueShopping}
          style={[styles.btnStyle, styles.continueBtn]}
          titleStyle={styles.secondaryText}
          testID="continue-shopping-btn"
          accessibilityLabel="Continue Shopping"
        />
      </ScrollView>
    </View>
  );
};

export default ConfirmationScreen;
