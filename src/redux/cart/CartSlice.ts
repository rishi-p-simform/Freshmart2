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
  CartItemResponse,
  CartMessageResponse,
  CartResponse,
  ErrorResponse
} from '../../types';
import INITIAL_STATE, { type CartStateType } from './CartInitial';

export const getCart = createAsyncThunkWithCancelToken<CartResponse>(
  ToolkitAction.getCart,
  'GET',
  APIConst.cart,
  authorizedAPI
);

export const clearCart = createAsyncThunkWithCancelToken<CartMessageResponse>(
  ToolkitAction.clearCart,
  'DELETE',
  APIConst.cart,
  authorizedAPI
);

export const addToCart = createAsyncThunkWithCancelToken<CartItemResponse>(
  ToolkitAction.addToCart,
  'POST',
  APIConst.cartItems,
  authorizedAPI
);

// We assume paths: { id: string } and data: { quantity: number } are passed via ThunkArg
export const updateCartItem = createAsyncThunkWithCancelToken<CartItemResponse>(
  ToolkitAction.updateCartItem,
  'PUT',
  APIConst.cartItems + '/{id}',
  authorizedAPI
);

// We assume paths: { id: string } is passed via ThunkArg
export const removeFromCart = createAsyncThunkWithCancelToken<CartMessageResponse>(
  ToolkitAction.removeFromCart,
  'DELETE',
  APIConst.cartItems + '/{id}',
  authorizedAPI
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: INITIAL_STATE,
  reducers: {
    clearError: (state: Draft<CartStateType>) => {
      state.error = null;
    },
    resetState: () => INITIAL_STATE
  },
  extraReducers: (builder: ActionReducerMapBuilder<CartStateType>) => {
    // getCart
    builder
      .addCase(getCart.pending, (state: Draft<CartStateType>) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getCart.fulfilled,
        (state: Draft<CartStateType>, action: PayloadAction<CartResponse>) => {
          state.loading = false;
          state.data = action.payload.data;
          state.lastUpdated = Date.now();
        }
      )
      .addCase(
        getCart.rejected,
        (state: Draft<CartStateType>, action: PayloadAction<ErrorResponse | undefined>) => {
          state.loading = false;
          state.error = action.payload || { message: 'Unknown error' };
        }
      );

    // clearCart
    builder
      .addCase(clearCart.pending, (state: Draft<CartStateType>) => {
        state.updatingCart = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state: Draft<CartStateType>) => {
        state.updatingCart = false;
        if (state.data) {
          state.data.items = [];
          state.data.item_count = 0;
          state.data.subtotal = 0;
        }
      })
      .addCase(
        clearCart.rejected,
        (state: Draft<CartStateType>, action: PayloadAction<ErrorResponse | undefined>) => {
          state.updatingCart = false;
          state.error = action.payload || { message: 'Unknown error' };
        }
      );

    // addToCart
    builder
      .addCase(addToCart.pending, (state: Draft<CartStateType>) => {
        state.updatingCart = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state: Draft<CartStateType>) => {
        state.updatingCart = false;
      })
      .addCase(
        addToCart.rejected,
        (state: Draft<CartStateType>, action: PayloadAction<ErrorResponse | undefined>) => {
          state.updatingCart = false;
          state.error = action.payload || { message: 'Unknown error' };
        }
      );

    // updateCartItem
    builder
      .addCase(updateCartItem.pending, (state: Draft<CartStateType>) => {
        state.updatingCart = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state: Draft<CartStateType>) => {
        state.updatingCart = false;
      })
      .addCase(
        updateCartItem.rejected,
        (state: Draft<CartStateType>, action: PayloadAction<ErrorResponse | undefined>) => {
          state.updatingCart = false;
          state.error = action.payload || { message: 'Unknown error' };
        }
      );

    // removeFromCart
    builder
      .addCase(removeFromCart.pending, (state: Draft<CartStateType>) => {
        state.updatingCart = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state: Draft<CartStateType>) => {
        state.updatingCart = false;
      })
      .addCase(
        removeFromCart.rejected,
        (state: Draft<CartStateType>, action: PayloadAction<ErrorResponse | undefined>) => {
          state.updatingCart = false;
          state.error = action.payload || { message: 'Unknown error' };
        }
      );
  }
});

export const CartActions = {
  ...cartSlice.actions,
  getCart,
  clearCart,
  addToCart,
  updateCartItem,
  removeFromCart
};

export const CartReducer = cartSlice.reducer;
