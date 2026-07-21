import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { useCart } from '../../hooks';
import { AddressSelectors, useAppSelector } from '../../redux';
import { PAYMENT_OPTIONS, type PaymentHookReturnType } from './PaymentTypes';

/**
 * Custom hook for managing payment screen business logic.
 */
const usePayment = (): PaymentHookReturnType => {
  const router = useRouter();
  const [selectedPaymentId, setSelectedPaymentId] = useState<number>(3);
  const [isPlacingOrder, setIsPlacingOrder] = useState<boolean>(false);

  const { items, subtotal, itemCount, clearCart } = useCart();
  const selectedAddressId = useAppSelector(AddressSelectors.getSelectedAddressId);

  const totalMrp = items.reduce((total, item) => {
    return total + (item.product?.mrp || item.product?.price || 0) * item.quantity;
  }, 0);

  const deliveryFee = subtotal >= 500 ? 0 : 49;

  const onSelectPayment = useCallback((id: number) => {
    setSelectedPaymentId(id);
  }, []);

  const handlePlaceOrder = useCallback(async () => {
    if (!selectedAddressId || isPlacingOrder) return;

    try {
      setIsPlacingOrder(true);
      // Simulate order placement API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await clearCart();
      router.replace('/(protected)/(tabs)/home');
    } catch {
      // Error handling if needed
    } finally {
      setIsPlacingOrder(false);
    }
  }, [selectedAddressId, isPlacingOrder, clearCart, router]);

  return {
    selectedPaymentId,
    onSelectPayment,
    selectedAddressId,
    itemCount,
    subtotal,
    totalMrp,
    deliveryFee,
    isPlacingOrder,
    handlePlaceOrder,
    paymentOptions: PAYMENT_OPTIONS
  };
};

export default usePayment;
