import {
  createSlice,
  type ActionReducerMapBuilder,
  type Draft,
  type PayloadAction
} from '@reduxjs/toolkit';
import { unauthorizedAPI } from '../../configs';
import { createAsyncThunkWithCancelToken } from '../../configs/APIConfig';
import { APIConst, ToolkitAction } from '../../constants';
import type { ErrorResponse, ProductDetailResponse, ProductsResponse } from '../../types';
import INITIAL_STATE, { createInitialListState, type ProductsStateType } from './ProductsInitial';

// Fetch paginated products list
export const fetchProducts = createAsyncThunkWithCancelToken<ProductsResponse>(
  ToolkitAction.fetchProducts,
  'GET',
  APIConst.products,
  unauthorizedAPI
);

// Search products
export const searchProducts = createAsyncThunkWithCancelToken<ProductsResponse>(
  ToolkitAction.searchProducts,
  'GET',
  APIConst.productsSearch,
  unauthorizedAPI
);

// Fetch product detail
export const fetchProductDetail = createAsyncThunkWithCancelToken<ProductDetailResponse>(
  ToolkitAction.fetchProductDetail,
  'GET',
  `${APIConst.productDetail}{id}`,
  unauthorizedAPI
);

const productsSlice = createSlice({
  name: 'products',
  initialState: INITIAL_STATE,
  reducers: {
    clearError: (state: Draft<ProductsStateType>) => {
      state.error = null;
    },
    resetState: () => INITIAL_STATE
  },
  extraReducers: (builder: ActionReducerMapBuilder<ProductsStateType>) => {
    // Fetch Products List
    builder
      .addCase(fetchProducts.pending, (state: Draft<ProductsStateType>, action) => {
        const listId = action.meta.arg?.data?.listId;
        const page = action.meta.arg?.data?.page || 1;
        const isRefresh = action.meta.arg?.data?.isRefresh;

        if (listId) {
          if (!state.lists[listId]) {
            state.lists[listId] = createInitialListState();
          }
          if (isRefresh) {
            state.lists[listId].refreshing = true;
          } else if (page > 1) {
            state.lists[listId].loadingMore = true;
          } else {
            state.lists[listId].loading = true;
          }
        }
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state: Draft<ProductsStateType>, action: PayloadAction<ProductsResponse>) => {
          // We have to read meta from action.meta if we attached it there
          // Note: The redux toolkit action for createAsyncThunk attaches the original arg in action.meta.arg
          // @ts-ignore
          const listId = action.meta.arg?.data?.listId;
          // @ts-ignore
          const page = action.meta.arg?.data?.page || 1;
          // @ts-ignore
          const isRefresh = action.meta.arg?.data?.isRefresh;

          if (listId) {
            const listState = state.lists[listId];
            if (listState) {
              const items = action.payload?.data || [];
              const meta = action.payload?.meta;

              if (isRefresh || page === 1) {
                listState.items = items;
              } else {
                listState.items = [...listState.items, ...items];
              }

              listState.page = page;
              listState.hasNext = meta ? page < meta.totalPages : false;
              listState.loading = false;
              listState.loadingMore = false;
              listState.refreshing = false;
              listState.initialized = true;
            }
          }
          state.lastUpdated = Date.now();
        }
      )
      .addCase(
        fetchProducts.rejected,
        (state: Draft<ProductsStateType>, action: PayloadAction<ErrorResponse | undefined>) => {
          // @ts-ignore
          const listId = action.meta.arg?.data?.listId;
          if (listId && state.lists[listId]) {
            state.lists[listId].loading = false;
            state.lists[listId].loadingMore = false;
            state.lists[listId].refreshing = false;
          }
          state.error = action.payload || null;
        }
      );

    // Search Products
    builder
      .addCase(searchProducts.pending, (state: Draft<ProductsStateType>, action) => {
        const listId = action.meta.arg?.data?.listId || 'search';
        const page = action.meta.arg?.data?.page || 1;
        const isRefresh = action.meta.arg?.data?.isRefresh;

        if (!state.lists[listId]) {
          state.lists[listId] = createInitialListState();
        }
        if (isRefresh) {
          state.lists[listId].refreshing = true;
        } else if (page > 1) {
          state.lists[listId].loadingMore = true;
        } else {
          state.lists[listId].loading = true;
        }
        state.error = null;
      })
      .addCase(
        searchProducts.fulfilled,
        (state: Draft<ProductsStateType>, action: PayloadAction<ProductsResponse>) => {
          // @ts-ignore
          const listId = action.meta.arg?.data?.listId || 'search';
          // @ts-ignore
          const page = action.meta.arg?.data?.page || 1;
          // @ts-ignore
          const isRefresh = action.meta.arg?.data?.isRefresh;

          const listState = state.lists[listId];
          if (listState) {
            const items = action.payload?.data || [];
            const meta = action.payload?.meta;

            if (isRefresh || page === 1) {
              listState.items = items;
            } else {
              listState.items = [...listState.items, ...items];
            }

            listState.page = page;
            listState.hasNext = meta ? page < meta.totalPages : false;
            listState.loading = false;
            listState.loadingMore = false;
            listState.refreshing = false;
            listState.initialized = true;
          }
          state.lastUpdated = Date.now();
        }
      )
      .addCase(
        searchProducts.rejected,
        (state: Draft<ProductsStateType>, action: PayloadAction<ErrorResponse | undefined>) => {
          // @ts-ignore
          const listId = action.meta.arg?.data?.listId || 'search';
          if (state.lists[listId]) {
            state.lists[listId].loading = false;
            state.lists[listId].loadingMore = false;
            state.lists[listId].refreshing = false;
          }
          state.error = action.payload || null;
        }
      );

    // Fetch Product Detail
    builder
      .addCase(fetchProductDetail.pending, (state: Draft<ProductsStateType>) => {
        state.detailLoading = true;
        state.error = null;
      })
      .addCase(
        fetchProductDetail.fulfilled,
        (state: Draft<ProductsStateType>, action: PayloadAction<ProductDetailResponse>) => {
          state.detailLoading = false;
          state.productDetail = action.payload?.data || null;
          state.lastUpdated = Date.now();
        }
      )
      .addCase(
        fetchProductDetail.rejected,
        (state: Draft<ProductsStateType>, action: PayloadAction<ErrorResponse | undefined>) => {
          state.detailLoading = false;
          state.error = action.payload || null;
        }
      );
  }
});

export const ProductsActions = {
  ...productsSlice.actions,
  fetchProducts,
  searchProducts,
  fetchProductDetail
};

export const ProductsReducer = productsSlice.reducer;
