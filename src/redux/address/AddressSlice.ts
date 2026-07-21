import {
  createSlice,
  type ActionReducerMapBuilder,
  type Draft,
  type PayloadAction
} from '@reduxjs/toolkit';
import { APIConst, ToolkitAction } from '../../constants';
import { authorizedAPI } from '../../configs';
import { createAsyncThunkWithCancelToken } from '../../configs/APIConfig';
import type {
  AddressListResponse,
  AddressResponse,
  DeleteAddressResponse,
  ErrorResponse
} from '../../types';
import INITIAL_STATE, { type AddressStateType } from './AddressInitial';

export const fetchAddresses = createAsyncThunkWithCancelToken<AddressListResponse>(
  ToolkitAction.fetchAddresses,
  'GET',
  APIConst.addresses,
  authorizedAPI
);

export const createAddress = createAsyncThunkWithCancelToken<AddressResponse>(
  ToolkitAction.createAddress,
  'POST',
  APIConst.addresses,
  authorizedAPI
);

export const updateAddress = createAsyncThunkWithCancelToken<AddressResponse>(
  ToolkitAction.updateAddress,
  'PUT',
  `${APIConst.addresses}/{id}`,
  authorizedAPI
);

export const deleteAddress = createAsyncThunkWithCancelToken<DeleteAddressResponse>(
  ToolkitAction.deleteAddress,
  'DELETE',
  `${APIConst.addresses}/{id}`,
  authorizedAPI
);

export const setDefaultAddress = createAsyncThunkWithCancelToken<AddressResponse>(
  ToolkitAction.setDefaultAddress,
  'PUT',
  `${APIConst.addresses}/{id}/default`,
  authorizedAPI
);

const addressSlice = createSlice({
  name: 'address',
  initialState: INITIAL_STATE,
  reducers: {
    clearError: (state: Draft<AddressStateType>) => {
      state.error = null;
    },
    setSelectedAddressId: (
      state: Draft<AddressStateType>,
      action: PayloadAction<string | null>
    ) => {
      state.selectedAddressId = action.payload;
    },
    resetState: () => INITIAL_STATE
  },
  extraReducers: (builder: ActionReducerMapBuilder<AddressStateType>) => {
    // Fetch Addresses
    builder
      .addCase(fetchAddresses.pending, (state: Draft<AddressStateType>) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAddresses.fulfilled,
        (state: Draft<AddressStateType>, action: PayloadAction<AddressListResponse>) => {
          state.loading = false;
          state.addresses = action.payload?.data || [];
          state.defaultAddress = state.addresses.find((addr) => addr.is_default) || null;
          if (!state.defaultAddress) {
            state.selectedAddressId = null;
          } else if (!state.selectedAddressId) {
            state.selectedAddressId = state.defaultAddress.id;
          }
          state.lastUpdated = Date.now();
        }
      )
      .addCase(
        fetchAddresses.rejected,
        (state: Draft<AddressStateType>, action: PayloadAction<ErrorResponse | undefined>) => {
          state.loading = false;
          state.error = action.payload || null;
        }
      );

    // Create Address
    builder
      .addCase(createAddress.pending, (state: Draft<AddressStateType>) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createAddress.fulfilled,
        (state: Draft<AddressStateType>, action: PayloadAction<AddressResponse>) => {
          state.loading = false;
          if (action.payload?.data) {
            state.addresses.push(action.payload.data);
            if (action.payload.data.is_default) {
              state.defaultAddress = action.payload.data;
              // set other addresses to not default
              state.addresses = state.addresses.map((addr) =>
                addr.id === action.payload.data.id ? addr : { ...addr, is_default: false }
              );
            }
          }
        }
      )
      .addCase(
        createAddress.rejected,
        (state: Draft<AddressStateType>, action: PayloadAction<ErrorResponse | undefined>) => {
          state.loading = false;
          state.error = action.payload || null;
        }
      );

    // Update Address
    builder
      .addCase(updateAddress.pending, (state: Draft<AddressStateType>) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateAddress.fulfilled,
        (state: Draft<AddressStateType>, action: PayloadAction<AddressResponse>) => {
          state.loading = false;
          if (action.payload?.data) {
            const index = state.addresses.findIndex((addr) => addr.id === action.payload.data.id);
            if (index !== -1) {
              state.addresses[index] = action.payload.data;
            }
            if (action.payload.data.is_default) {
              state.defaultAddress = action.payload.data;
              state.addresses = state.addresses.map((addr) =>
                addr.id === action.payload.data.id ? addr : { ...addr, is_default: false }
              );
            } else if (state.defaultAddress?.id === action.payload.data.id) {
              state.defaultAddress = null; // Removed default
            }
          }
        }
      )
      .addCase(
        updateAddress.rejected,
        (state: Draft<AddressStateType>, action: PayloadAction<ErrorResponse | undefined>) => {
          state.loading = false;
          state.error = action.payload || null;
        }
      );

    // Delete Address
    builder
      .addCase(deleteAddress.pending, (state: Draft<AddressStateType>) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAddress.fulfilled, (state: Draft<AddressStateType>, action) => {
        state.loading = false;
        const deletedId = action.meta.arg.paths?.id;
        if (deletedId) {
          state.addresses = state.addresses.filter((addr) => addr.id !== deletedId);
          if (state.defaultAddress?.id === deletedId) {
            state.defaultAddress = null;
          }
          if (state.selectedAddressId === deletedId) {
            state.selectedAddressId = null;
          }
        }
      })
      .addCase(
        deleteAddress.rejected,
        (state: Draft<AddressStateType>, action: PayloadAction<ErrorResponse | undefined>) => {
          state.loading = false;
          state.error = action.payload || null;
        }
      );

    // Set Default Address
    builder
      .addCase(setDefaultAddress.pending, (state: Draft<AddressStateType>) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        setDefaultAddress.fulfilled,
        (state: Draft<AddressStateType>, action: PayloadAction<AddressResponse>) => {
          state.loading = false;
          if (action.payload?.data) {
            state.defaultAddress = action.payload.data;
            state.addresses = state.addresses.map((addr) =>
              addr.id === action.payload.data.id
                ? action.payload.data
                : { ...addr, is_default: false }
            );
          }
        }
      )
      .addCase(
        setDefaultAddress.rejected,
        (state: Draft<AddressStateType>, action: PayloadAction<ErrorResponse | undefined>) => {
          state.loading = false;
          state.error = action.payload || null;
        }
      );
  }
});

export const AddressActions = {
  ...addressSlice.actions,
  fetchAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress
};
export const AddressReducer = addressSlice.reducer;
