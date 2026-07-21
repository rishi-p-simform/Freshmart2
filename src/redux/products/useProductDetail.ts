import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootStateType } from '../Store';
import ProductsSelectors from './ProductsSelectors';
import { ProductsActions } from './ProductsSlice';

/**
 * Custom hook to manage single product detail state.
 * @param {string} [id] - Optional product ID to fetch on mount or change.
 * @returns Object containing productDetail, loading state, error, and fetch function.
 */
export const useProductDetail = (id?: string) => {
  const dispatch = useDispatch<any>();

  const productDetail = useSelector((state: RootStateType) =>
    ProductsSelectors.getProductDetail(state)
  );

  const detailLoading = useSelector((state: RootStateType) =>
    ProductsSelectors.getDetailLoading(state)
  );

  const error = useSelector((state: RootStateType) => ProductsSelectors.getError(state));

  const fetchDetail = useCallback(
    (productId: string) => {
      if (productId) {
        dispatch(ProductsActions.fetchProductDetail({ paths: { id: productId } }));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (id) {
      fetchDetail(id);
    }
  }, [id, fetchDetail]);

  return {
    productDetail,
    detailLoading,
    error,
    fetchDetail
  };
};

export default useProductDetail;
