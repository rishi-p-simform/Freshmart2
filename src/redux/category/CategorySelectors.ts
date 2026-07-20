import type { RootStateType } from '../Store';
import type { CategoryStateType } from './CategoryInitial';
import type { Category, ErrorResponse } from '../../types';

interface CategorySelectorsType {
  getCategoryState: (state: RootStateType) => CategoryStateType;
  getLoading: (state: RootStateType) => boolean;
  getError: (state: RootStateType) => ErrorResponse | undefined;
  getCategories: (state: RootStateType) => Category[];
  getCategoryDetail: (state: RootStateType) => Category | null;
}

const CategorySelectors: CategorySelectorsType = {
  getCategoryState: (state) => state.category,
  getLoading: (state) => state.category.loading,
  getError: (state) => state.category.error || undefined,
  getCategories: (state) => state.category.categories,
  getCategoryDetail: (state) => state.category.categoryDetail
};

export default CategorySelectors;
