import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../useRedux';
import AddressSelectors from '../address/AddressSelectors';
import OrdersSelectors from './OrdersSelectors';
import { OrdersActions } from './OrdersSlice';
import type { CancelOrderRequest, CreateOrderRequest, GetOrdersQueryParams } from '../../types';

export const useOrders = () => {
  const dispatch = useAppDispatch();

  const selectedAddressId = useAppSelector(AddressSelectors.getSelectedAddressId);
  const defaultAddress = useAppSelector(AddressSelectors.getDefaultAddress);
  const ordersList = useAppSelector(OrdersSelectors.getOrdersList);
  const orders = useAppSelector(OrdersSelectors.getOrders);
  const orderDetail = useAppSelector(OrdersSelectors.getOrderDetail);
  const loading = useAppSelector(OrdersSelectors.getLoading);
  const detailLoading = useAppSelector(OrdersSelectors.getDetailLoading);
  const createLoading = useAppSelector(OrdersSelectors.getCreateLoading);
  const cancelLoading = useAppSelector(OrdersSelectors.getCancelLoading);
  const error = useAppSelector(OrdersSelectors.getError);

  const handleFetchOrders = useCallback(
    (params?: GetOrdersQueryParams, isRefresh = false) => {
      return dispatch(
        OrdersActions.fetchOrders({
          data: {
            ...params,
            isRefresh
          }
        })
      );
    },
    [dispatch]
  );

  const handleCreateOrder = useCallback(
    (data: CreateOrderRequest) => {
      const addressId = data.address_id || selectedAddressId || defaultAddress?.id || '';
      return dispatch(
        OrdersActions.createOrder({
          data: {
            ...data,
            address_id: addressId
          }
        })
      );
    },
    [dispatch, selectedAddressId, defaultAddress]
  );

  const handleFetchOrderDetail = useCallback(
    (id: string) => {
      return dispatch(
        OrdersActions.fetchOrderDetail({
          paths: { id }
        })
      );
    },
    [dispatch]
  );

  const handleCancelOrder = useCallback(
    (id: string, data: CancelOrderRequest) => {
      return dispatch(
        OrdersActions.cancelOrder({
          paths: { id },
          data
        })
      );
    },
    [dispatch]
  );

  const handleClearError = useCallback(() => {
    dispatch(OrdersActions.clearError());
  }, [dispatch]);

  const handleResetState = useCallback(() => {
    dispatch(OrdersActions.resetState());
  }, [dispatch]);

  return {
    ordersList,
    orders,
    orderDetail,
    loading,
    detailLoading,
    createLoading,
    cancelLoading,
    error,
    fetchOrders: handleFetchOrders,
    createOrder: handleCreateOrder,
    fetchOrderDetail: handleFetchOrderDetail,
    cancelOrder: handleCancelOrder,
    clearError: handleClearError,
    resetState: handleResetState
  };
};

export default useOrders;
