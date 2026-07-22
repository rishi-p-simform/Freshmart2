import {
  createSlice,
  type ActionReducerMapBuilder,
  type Draft,
  type PayloadAction
} from '@reduxjs/toolkit';
import { authorizedAPI } from '../../configs';
import { createAsyncThunkWithCancelToken } from '../../configs/APIConfig';
import { APIConst, ToolkitAction } from '../../constants';
import type {
  CancelOrderResponse,
  CreateOrderResponse,
  ErrorResponse,
  OrderDetailResponse,
  OrdersListResponse
} from '../../types';
import INITIAL_STATE, { type OrdersStateType } from './OrdersInitial';

// POST /api/v1/orders/ - Create Order
export const createOrder = createAsyncThunkWithCancelToken<CreateOrderResponse>(
  ToolkitAction.createOrder,
  'POST',
  APIConst.orders,
  authorizedAPI
);

// GET /api/v1/orders/ - List Orders
export const fetchOrders = createAsyncThunkWithCancelToken<OrdersListResponse>(
  ToolkitAction.fetchOrders,
  'GET',
  APIConst.orders,
  authorizedAPI
);

// GET /api/v1/orders/{id} - Get Order Detail
export const fetchOrderDetail = createAsyncThunkWithCancelToken<OrderDetailResponse>(
  ToolkitAction.fetchOrderDetail,
  'GET',
  `${APIConst.orders}/{id}`,
  authorizedAPI
);

// POST /api/v1/orders/{id}/cancel - Cancel Order
export const cancelOrder = createAsyncThunkWithCancelToken<CancelOrderResponse>(
  ToolkitAction.cancelOrder,
  'POST',
  `${APIConst.cancelOrder}{id}/cancel`,
  authorizedAPI
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: INITIAL_STATE,
  reducers: {
    clearError: (state: Draft<OrdersStateType>) => {
      state.error = null;
    },
    resetState: () => INITIAL_STATE
  },
  extraReducers: (builder: ActionReducerMapBuilder<OrdersStateType>) => {
    // Create Order
    builder
      .addCase(createOrder.pending, (state: Draft<OrdersStateType>) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(
        createOrder.fulfilled,
        (state: Draft<OrdersStateType>, action: PayloadAction<CreateOrderResponse>) => {
          state.createLoading = false;
          if (action.payload?.data) {
            state.ordersList.items = [action.payload.data, ...state.ordersList.items];
          }
          state.lastUpdated = Date.now();
        }
      )
      .addCase(
        createOrder.rejected,
        (state: Draft<OrdersStateType>, action: PayloadAction<ErrorResponse | undefined>) => {
          state.createLoading = false;
          state.error = action.payload || null;
        }
      );

    // Fetch Orders List
    builder
      .addCase(fetchOrders.pending, (state: Draft<OrdersStateType>, action) => {
        const page = action.meta.arg?.data?.page || 1;
        const isRefresh = action.meta.arg?.data?.isRefresh;

        if (isRefresh) {
          state.ordersList.refreshing = true;
        } else if (page > 1) {
          state.ordersList.loadingMore = true;
        } else {
          state.ordersList.loading = true;
        }
        state.error = null;
      })
      .addCase(
        fetchOrders.fulfilled,
        (state: Draft<OrdersStateType>, action: PayloadAction<OrdersListResponse>) => {
          // @ts-ignore
          const page = action.meta.arg?.data?.page || 1;
          // @ts-ignore
          const isRefresh = action.meta.arg?.data?.isRefresh;

          const items = action.payload?.data || [];
          const meta = action.payload?.meta;

          if (isRefresh || page === 1) {
            state.ordersList.items = items;
          } else {
            state.ordersList.items = [...state.ordersList.items, ...items];
          }

          state.ordersList.page = page;
          state.ordersList.hasNext = meta ? page < meta.totalPages : false;
          state.ordersList.loading = false;
          state.ordersList.loadingMore = false;
          state.ordersList.refreshing = false;
          state.ordersList.initialized = true;
          state.lastUpdated = Date.now();
        }
      )
      .addCase(
        fetchOrders.rejected,
        (state: Draft<OrdersStateType>, action: PayloadAction<ErrorResponse | undefined>) => {
          state.ordersList.loading = false;
          state.ordersList.loadingMore = false;
          state.ordersList.refreshing = false;
          state.error = action.payload || null;
        }
      );

    // Fetch Order Detail
    builder
      .addCase(fetchOrderDetail.pending, (state: Draft<OrdersStateType>) => {
        state.detailLoading = true;
        state.error = null;
      })
      .addCase(
        fetchOrderDetail.fulfilled,
        (state: Draft<OrdersStateType>, action: PayloadAction<OrderDetailResponse>) => {
          state.detailLoading = false;
          state.orderDetail = action.payload?.data || null;
          state.lastUpdated = Date.now();
        }
      )
      .addCase(
        fetchOrderDetail.rejected,
        (state: Draft<OrdersStateType>, action: PayloadAction<ErrorResponse | undefined>) => {
          state.detailLoading = false;
          state.error = action.payload || null;
        }
      );

    // Cancel Order
    builder
      .addCase(cancelOrder.pending, (state: Draft<OrdersStateType>) => {
        state.cancelLoading = true;
        state.error = null;
      })
      .addCase(cancelOrder.fulfilled, (state: Draft<OrdersStateType>, action) => {
        state.cancelLoading = false;
        // @ts-ignore
        const orderId = action.meta.arg?.paths?.id;

        if (orderId) {
          state.ordersList.items = state.ordersList.items.map((item) =>
            item.id === orderId ? { ...item, status: 'cancelled' } : item
          );
          if (state.orderDetail && state.orderDetail.id === orderId) {
            state.orderDetail = { ...state.orderDetail, status: 'cancelled' };
          }
        }
        state.lastUpdated = Date.now();
      })
      .addCase(
        cancelOrder.rejected,
        (state: Draft<OrdersStateType>, action: PayloadAction<ErrorResponse | undefined>) => {
          state.cancelLoading = false;
          state.error = action.payload || null;
        }
      );
  }
});

export const OrdersActions = {
  ...ordersSlice.actions,
  createOrder,
  fetchOrders,
  fetchOrderDetail,
  cancelOrder
};

export const OrdersReducer = ordersSlice.reducer;
