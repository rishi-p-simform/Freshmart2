import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { CART_CONSTANTS, ROUTES } from '../../constants';
import { useCart } from '../../hooks';
import { AddressSelectors, useAppSelector, useOrders } from '../../redux';
import { PAYMENT_OPTIONS, type PaymentHookReturnType } from './PaymentTypes';

/**
 * Custom hook for managing payment screen business logic.
 */
const usePayment = (): PaymentHookReturnType => {
  const router = useRouter();
  const [selectedPaymentId, setSelectedPaymentId] = useState<number>(
    CART_CONSTANTS.DEFAULT_PAYMENT_OPTION_ID
  );

  const { items, subtotal, itemCount, fetchCart } = useCart();
  const selectedAddressId = useAppSelector(AddressSelectors.getSelectedAddressId);
  const { createOrder, createLoading } = useOrders();

  const totalMrp = items.reduce((total, item) => {
    return total + (item.product?.mrp || item.product?.price || 0) * item.quantity;
  }, 0);

  const deliveryFee =
    subtotal >= CART_CONSTANTS.FREE_DELIVERY_THRESHOLD ? 0 : CART_CONSTANTS.DEFAULT_DELIVERY_FEE;

  const onSelectPayment = useCallback((id: number) => {
    setSelectedPaymentId(id);
  }, []);

  const handlePlaceOrder = useCallback(async () => {
    if (!selectedAddressId || createLoading) return;

    try {
      const selectedOption = PAYMENT_OPTIONS.find((opt) => opt.id === selectedPaymentId);
      const paymentMethod = selectedOption ? selectedOption.value : 'cod';

      const response = await createOrder({
        address_id: selectedAddressId,
        payment_method: paymentMethod
      }).unwrap();

      const createdOrder = response?.data;

      if (createdOrder?.id) {
        // Refresh cart from server since backend clears cart after order creation
        fetchCart();

        // Dismiss cart stack screens (checkout & payment) back to cart index
        if (router.canDismiss()) {
          router.dismissAll();
        }

        // Navigate to confirmation screen with created order ID
        router.push({
          pathname: ROUTES.Confirmation,
          params: { id: createdOrder.id }
        });
      }
    } catch (err) {
      console.error('Failed to create order:', err);
    }
  }, [selectedAddressId, createLoading, selectedPaymentId, createOrder, fetchCart, router]);

  return {
    selectedPaymentId,
    onSelectPayment,
    selectedAddressId,
    itemCount,
    subtotal,
    totalMrp,
    deliveryFee,
    isPlacingOrder: createLoading,
    handlePlaceOrder,
    paymentOptions: PAYMENT_OPTIONS
  };
};

export default usePayment;
