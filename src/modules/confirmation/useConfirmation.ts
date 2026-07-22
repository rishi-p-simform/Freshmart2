import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { ROUTES } from '../../constants';
import { useOrders } from '../../redux';
import type { ConfirmationHookReturnType } from './ConfirmationTypes';

/**
 * Custom hook for managing confirmation screen business logic.
 *
 * @returns {ConfirmationHookReturnType} State and handlers for ConfirmationScreen.
 */
const useConfirmation = (): ConfirmationHookReturnType => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();

  const { orderDetail, detailLoading, fetchOrderDetail } = useOrders();

  useEffect(() => {
    if (id) {
      fetchOrderDetail(id);
    }
  }, [id, fetchOrderDetail]);

  const totalQuantity =
    orderDetail?.order_items.reduce((total, item) => total + Number(item.quantity || 0), 0) ?? 0;

  const totalAmount = orderDetail
    ? (orderDetail.subtotal ?? 0) + (orderDetail.delivery_fee ?? 0)
    : 0;

  const formattedOrderId = orderDetail?.id
    ? orderDetail.id.includes('-')
      ? `#${orderDetail.id.split('-')[0]}-${orderDetail.id.split('-')[1]}`
      : `#${orderDetail.id}`
    : '#--';

  const handleTrackOrder = useCallback(() => {
    if (id) {
      router.push({
        pathname: ROUTES.TrackOrder as any,
        params: { id }
      } as any);
    }
  }, [id, router]);

  const handleContinueShopping = useCallback(() => {
    router.dismissAll();
    router.replace(ROUTES.Home as any);
  }, [router]);

  return {
    id,
    order: orderDetail,
    loading: detailLoading,
    totalQuantity,
    totalAmount,
    formattedOrderId,
    handleTrackOrder,
    handleContinueShopping
  };
};

export default useConfirmation;
