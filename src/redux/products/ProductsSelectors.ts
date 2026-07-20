import type { RootStateType } from '../Store';
import type { ProductsStateType, ProductListState } from './ProductsInitial';
import type { Product, ErrorResponse } from '../../types';

interface ProductsSelectorsType {
  getProductsState: (state: RootStateType) => ProductsStateType;
  getListState: (state: RootStateType, listId: string) => ProductListState | undefined;
  getProductDetail: (state: RootStateType) => Product | null;
  getDetailLoading: (state: RootStateType) => boolean;
  getError: (state: RootStateType) => ErrorResponse | undefined;
}

const getProductsState = (state: RootStateType) => state.products;

const ProductsSelectors: ProductsSelectorsType = {
  getProductsState,
  getListState: (state, listId) => state.products.lists[listId],
  getProductDetail: (state) => state.products.productDetail,
  getDetailLoading: (state) => state.products.detailLoading,
  getError: (state) => state.products?.error || undefined
};

export default ProductsSelectors;
