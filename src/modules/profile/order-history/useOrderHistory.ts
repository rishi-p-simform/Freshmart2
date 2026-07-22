import { useCallback, useMemo, useState } from 'react';
import { useCart } from '../../../hooks/useCart';
import { useOrders } from '../../../redux/orders/useOrders';
import type { Order } from '../../../types';
import type { OrderHistoryHookReturnType } from './OrderHistoryTypes';

/**
 * Custom hook for managing OrderHistory business logic.
 * Handles tab switching, filtering, fetching orders, pull-to-refresh, pagination, and reordering.
 *
 * @returns {OrderHistoryHookReturnType} Hook state and handlers.
 */
export const useOrderHistory = (): OrderHistoryHookReturnType => {
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const { fetchOrders, orders, ordersList, fetchOrderDetail } = useOrders();
  const { addToCart } = useCart();

  const filters = useMemo(() => {
    switch (selectedTab) {
      case 'active':
        return { status: 'pending' };
      case 'delivered':
        return { status: 'delivered' };
      case 'cancelled':
        return { status: 'cancelled' };
      default:
        return {};
    }
  }, [selectedTab]);

  const loadInitial = useCallback(() => {
    fetchOrders({}, true);
  }, [fetchOrders]);

  const refresh = useCallback(() => {
    fetchOrders({}, true);
  }, [fetchOrders]);

  const loadMore = useCallback(() => {
    if (ordersList.hasNext && !ordersList.loadingMore && !ordersList.loading) {
      fetchOrders({ ...filters, page: ordersList.page + 1 });
    }
  }, [
    fetchOrders,
    filters,
    ordersList.hasNext,
    ordersList.loadingMore,
    ordersList.loading,
    ordersList.page
  ]);

  const reorder = useCallback(
    async (order: Order) => {
      let fullOrder = order;
      if (!order.order_items || order.order_items.length === 0) {
        const res = await fetchOrderDetail(order.id).unwrap();
        if (res?.data) {
          fullOrder = res.data;
        }
      }

      if (fullOrder?.order_items) {
        for (const item of fullOrder.order_items) {
          await addToCart(item.product_id, item.quantity);
        }
      }
    },
    [addToCart, fetchOrderDetail]
  );

  // Filter orders client-side if orders list contains all fetched items
  const filteredOrders = useMemo(() => {
    if (selectedTab === 'all') return orders;
    return orders.filter((o) => {
      if (selectedTab === 'active')
        return o.status === 'pending' || o.status === 'processing' || o.status === 'shipped';
      return o.status === selectedTab;
    });
  }, [orders, selectedTab]);

  return {
    orders: filteredOrders,
    loading: ordersList.loading,
    refreshing: ordersList.refreshing,
    loadingMore: ordersList.loadingMore,
    selectedTab,
    setSelectedTab,
    loadInitial,
    loadMore,
    refresh,
    reorder
  };
};

export default useOrderHistory;
