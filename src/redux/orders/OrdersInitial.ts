import { PAGINATION } from '../../constants';
import type { ErrorResponse, Order } from '../../types';

export interface OrderListState {
  items: Order[];
  page: number;
  hasNext: boolean;
  loading: boolean;
  loadingMore: boolean;
  refreshing: boolean;
  initialized: boolean;
}

export interface OrdersStateType {
  ordersList: OrderListState;
  orderDetail: Order | null;
  detailLoading: boolean;
  createLoading: boolean;
  cancelLoading: boolean;
  error: ErrorResponse | null;
  lastUpdated: number | null;
}

export const createInitialListState = (): OrderListState => ({
  items: [],
  page: PAGINATION.DEFAULT_PAGE,
  hasNext: false,
  loading: false,
  loadingMore: false,
  refreshing: false,
  initialized: false
});

const INITIAL_STATE: OrdersStateType = {
  ordersList: createInitialListState(),
  orderDetail: null,
  detailLoading: false,
  createLoading: false,
  cancelLoading: false,
  error: null,
  lastUpdated: null
};

export default INITIAL_STATE;
