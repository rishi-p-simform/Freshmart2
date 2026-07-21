import { Stack } from 'expo-router';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { CheckoutStepper, CustomButton, CustomHeader, CustomRadio, Text } from '../../components';
import { Strings } from '../../constants';
import { useTheme } from '../../hooks';
import styleSheet from './PaymentStyles';
import usePayment from './usePayment';

/**
 * PaymentScreen
 * The second step in the checkout flow. Allows selecting a payment method
 * (UPI, Card, Cash on Delivery) and placing the order.
 *
 * @returns {React.ReactElement} The PaymentScreen component.
 */
const PaymentScreen: React.FC = (): React.ReactElement => {
  const { styles } = useTheme(styleSheet);

  const {
    selectedPaymentId,
    onSelectPayment,
    selectedAddressId,
    itemCount,
    subtotal,
    totalMrp,
    deliveryFee,
    isPlacingOrder,
    handlePlaceOrder,
    paymentOptions
  } = usePayment();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <CustomHeader title={Strings.Payment.title} />
        }}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        keyboardDismissMode="interactive"
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.inner}>
          {/* Animated 3-step progress stepper — step 2 is Payment */}
          <CheckoutStepper currentStep={2} />

          <Text variant="titleSmall" style={styles.sectionTitle}>
            {Strings.Payment.selectPaymentMethod}
          </Text>

          {paymentOptions.map((item) => (
            <CustomRadio
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              leftIcon={item.icon}
              leftIconBg={item.color}
              selected={selectedPaymentId === item.id}
              onPress={() => onSelectPayment(item.id)}
              testID={`payment-option-${item.id}`}
              accessibilityLabel={`${item.title}, ${item.subtitle}`}
            />
          ))}

          <View style={styles.card}>
            <Text variant="titleSmall" style={styles.sectionTitle}>
              {Strings.Payment.orderSummary}
            </Text>

            <View style={styles.priceRow}>
              <Text variant="bodySmall" style={styles.secondaryText}>
                {itemCount} {itemCount === 1 ? Strings.Products.item : Strings.Products.items}
              </Text>

              <Text variant="bodySmall" style={styles.secondaryText}>
                ₹{totalMrp}
              </Text>
            </View>

            <View style={styles.priceRow}>
              <Text variant="bodySmall" style={styles.secondaryText}>
                {Strings.Payment.delivery}
              </Text>

              {deliveryFee === 0 ? (
                <Text variant="labelMedium" style={styles.greenText}>
                  {Strings.Payment.free}
                </Text>
              ) : (
                <Text variant="labelMedium" style={styles.orangeText}>
                  ₹{deliveryFee}
                </Text>
              )}
            </View>

            <View style={styles.dashLines} />

            <View style={styles.priceRow}>
              <Text variant="titleMedium" style={styles.textColor}>
                {Strings.Payment.total}
              </Text>
              <Text variant="titleLarge" style={styles.textColor}>
                ₹{subtotal + deliveryFee}
              </Text>
            </View>
          </View>
        </View>

        <CustomButton
          title={
            isPlacingOrder
              ? `${Strings.Payment.placingOrder}`
              : `${Strings.Payment.placeOrder} • ₹${subtotal + deliveryFee}`
          }
          onPress={handlePlaceOrder}
          disabled={isPlacingOrder || !selectedAddressId}
          loading={isPlacingOrder}
          style={styles.placeOrderBtn}
          testID="place-order-btn"
          accessibilityLabel="Place Order"
        />
      </ScrollView>
    </View>
  );
};

export default PaymentScreen;
