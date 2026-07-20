import type { Category, ErrorResponse } from '../../types';

export interface CategoryStateType {
  categories: Category[];
  categoryDetail: Category | null;
  loading: boolean;
  error: ErrorResponse | null;
  lastUpdated: number | null;
}

const INITIAL_STATE: CategoryStateType = {
  categories: [],
  categoryDetail: null,
  loading: false,
  error: null,
  lastUpdated: null
};

export default INITIAL_STATE;
