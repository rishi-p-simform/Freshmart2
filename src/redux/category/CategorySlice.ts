import { createSlice, type ActionReducerMapBuilder, type Draft, type PayloadAction } from '@reduxjs/toolkit';
import { APIConst, ToolkitAction } from '../../constants';
import { authorizedAPI } from '../../configs';
import { createAsyncThunkWithCancelToken } from '../../configs/APIConfig';
import type { CategoryListResponse, CategoryResponse, ErrorResponse } from '../../types';
import INITIAL_STATE, { type CategoryStateType } from './CategoryInitial';

export const fetchCategories = createAsyncThunkWithCancelToken<CategoryListResponse>(
  ToolkitAction.fetchCategories,
  'GET',
  APIConst.categories,
  authorizedAPI
);

export const fetchCategoryDetail = createAsyncThunkWithCancelToken<CategoryResponse>(
  ToolkitAction.fetchCategoryDetail,
  'GET',
  `${APIConst.categories}/{slug}`,
  authorizedAPI
);

const categorySlice = createSlice({
  name: 'category',
  initialState: INITIAL_STATE,
  reducers: {
    clearError: (state: Draft<CategoryStateType>) => {
      state.error = null;
    },
    resetState: () => INITIAL_STATE
  },
  extraReducers: (builder: ActionReducerMapBuilder<CategoryStateType>) => {
    // Fetch Categories List
    builder
      .addCase(fetchCategories.pending, (state: Draft<CategoryStateType>) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state: Draft<CategoryStateType>, action: PayloadAction<CategoryListResponse>) => {
        state.loading = false;
        state.categories = action.payload?.data || [];
        state.lastUpdated = Date.now();
      })
      .addCase(fetchCategories.rejected, (state: Draft<CategoryStateType>, action: PayloadAction<ErrorResponse | undefined>) => {
        state.loading = false;
        state.error = action.payload || null;
      });

    // Fetch Category Detail
    builder
      .addCase(fetchCategoryDetail.pending, (state: Draft<CategoryStateType>) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryDetail.fulfilled, (state: Draft<CategoryStateType>, action: PayloadAction<CategoryResponse>) => {
        state.loading = false;
        state.categoryDetail = action.payload?.data || null;
        state.lastUpdated = Date.now();
      })
      .addCase(fetchCategoryDetail.rejected, (state: Draft<CategoryStateType>, action: PayloadAction<ErrorResponse | undefined>) => {
        state.loading = false;
        state.error = action.payload || null;
      });
  }
});

export const CategoryActions = {
  ...categorySlice.actions,
  fetchCategories,
  fetchCategoryDetail
};

export const CategoryReducer = categorySlice.reducer;
