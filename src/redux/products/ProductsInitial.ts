import { PAGINATION } from '../../constants';
import type { ErrorResponse, Product } from '../../types';

export type ProductListState = {
  items: Product[];
  page: number;
  hasNext: boolean;
  loading: boolean;
  loadingMore: boolean;
  refreshing: boolean;
  initialized: boolean;
};

export type ProductsStateType = {
  lists: Record<string, ProductListState>;
  productDetail: Product | null;
  detailLoading: boolean;
  error: ErrorResponse | null;
  lastUpdated: number | null;
};

export const createInitialListState = (): ProductListState => ({
  items: [],
  page: PAGINATION.DEFAULT_PAGE,
  hasNext: false,
  loading: false,
  loadingMore: false,
  refreshing: false,
  initialized: false
});

const INITIAL_STATE: ProductsStateType = {
  lists: {},
  productDetail: null,
  detailLoading: false,
  error: null,
  lastUpdated: null
};

export default INITIAL_STATE;
