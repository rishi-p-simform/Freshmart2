import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import {
  AddressCard,
  CheckoutStepper,
  CustomButton,
  CustomHeader,
  CustomRadio,
  Text
} from '../../components';
import { Strings } from '../../constants';
import { useTheme } from '../../hooks';
import { Colors } from '../../theme';
import styleSheet from './CheckoutStyles';
import useCheckout from './useCheckout';

/**
 * CheckoutScreen
 * The second step in the checkout flow. Allows the user to select a
 * delivery address from their saved addresses (or add a new one), and
 * choose a preferred delivery slot before proceeding to payment.
 *
 * @returns {React.ReactElement} The CheckoutScreen component.
 */
const CheckoutScreen: React.FC = (): React.ReactElement => {
  const router = useRouter();
  const { styles, theme } = useTheme(styleSheet);

  const {
    userName,
    addresses,
    selectedAddressId,
    onSelectAddress,
    selectedSlot,
    onSelectSlot,
    deliverySlots
  } = useCheckout();

  return (
    <View style={styles.container}>
      {/* Header configured via Stack.Screen */}
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <CustomHeader title={Strings.Checkout.title} />
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
          {/* Animated 3-step progress stepper — step 1 is Checkout */}
          <CheckoutStepper currentStep={1} />

          {/* ── Delivery Address ─────────────────────────────── */}
          <Text variant="titleSmall" style={styles.sectionTitle}>
            {Strings.Checkout.deliveryAddress}
          </Text>

          {addresses.map((address) => (
            <View style={styles.addressWrapper} key={address.id}>
              <AddressCard
                name={userName}
                label={address.label}
                addressLine1={address.address_line1}
                addressLine2={[address.city, address.state, address.pincode]
                  .filter(Boolean)
                  .join(', ')}
                isSelected={selectedAddressId === address.id}
                onPress={() => onSelectAddress(address.id)}
                onEditPress={() => {}}
                testID={`address-card-${address.id}`}
                accessibilityLabel={`Address: ${address.address_line1}`}
              />
            </View>
          ))}

          {/* Add New Address — dashed button */}
          <TouchableOpacity
            style={styles.addAddressBtn}
            onPress={() => router.navigate('/(protected)/addAddress')}
            accessibilityRole="button"
            accessibilityLabel="Add new address"
            testID="add-new-address-btn"
          >
            <Ionicons name="add" color={Colors[theme]?.palette.gray[500]} size={14} />
            <Text variant="labelMedium" style={styles.addAddressBtnText}>
              {Strings.Checkout.addNewAddress}
            </Text>
          </TouchableOpacity>

          {/* ── Delivery Slot ─────────────────────────────────── */}
          <Text variant="titleSmall" style={styles.sectionTitle}>
            {Strings.Checkout.deliverySlot}
          </Text>

          <View style={styles.slotsContainer}>
            {deliverySlots.map((slot) => (
              <CustomRadio
                key={slot.id}
                title={slot.title}
                subtitle={slot.subtitle}
                selected={selectedSlot === slot.id}
                onPress={() => onSelectSlot(slot.id)}
                testID={`delivery-slot-${slot.id}`}
                accessibilityLabel={`${slot.title}, ${slot.subtitle}`}
              />
            ))}
          </View>
        </View>

        {/* ── Proceed to Payment ───────────────────────────────── */}
        <CustomButton
          title={Strings.Checkout.proceedToPayment}
          onPress={() => router.navigate('/(protected)/(tabs)/cart/payment')}
          style={styles.proceedBtn}
          testID="proceed-to-payment-btn"
          accessibilityLabel="Proceed to Payment"
        />
      </ScrollView>
    </View>
  );
};

export default CheckoutScreen;
