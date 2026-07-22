import type { RootStateType } from '../Store';
import type { OrderListState, OrdersStateType } from './OrdersInitial';
import type { ErrorResponse, Order } from '../../types';

interface OrdersSelectorsType {
  getOrdersState: (state: RootStateType) => OrdersStateType;
  getOrdersList: (state: RootStateType) => OrderListState;
  getOrders: (state: RootStateType) => Order[];
  getOrderDetail: (state: RootStateType) => Order | null;
  getLoading: (state: RootStateType) => boolean;
  getDetailLoading: (state: RootStateType) => boolean;
  getCreateLoading: (state: RootStateType) => boolean;
  getCancelLoading: (state: RootStateType) => boolean;
  getError: (state: RootStateType) => ErrorResponse | undefined;
}

const OrdersSelectors: OrdersSelectorsType = {
  getOrdersState: (state) => state.orders,
  getOrdersList: (state) =>
    state.orders?.ordersList || {
      items: [],
      page: 1,
      hasNext: false,
      loading: false,
      loadingMore: false,
      refreshing: false,
      initialized: false
    },
  getOrders: (state) => state.orders?.ordersList?.items || [],
  getOrderDetail: (state) => state.orders?.orderDetail || null,
  getLoading: (state) => state.orders?.ordersList?.loading || false,
  getDetailLoading: (state) => state.orders?.detailLoading || false,
  getCreateLoading: (state) => state.orders?.createLoading || false,
  getCancelLoading: (state) => state.orders?.cancelLoading || false,
  getError: (state) => state.orders?.error || undefined
};

export default OrdersSelectors;
