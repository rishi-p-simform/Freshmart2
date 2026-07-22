import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../useRedux';
import ProductsSelectors from './ProductsSelectors';
import { ProductsActions } from './ProductsSlice';

/**
 * Custom hook to manage single product detail state.
 * @param {string} [id] - Optional product ID to fetch on mount or change.
 * @returns Object containing productDetail, loading state, error, and fetch function.
 */
export const useProductDetail = (id?: string) => {
  const dispatch = useAppDispatch();

  const productDetail = useAppSelector((state) => ProductsSelectors.getProductDetail(state));

  const detailLoading = useAppSelector((state) => ProductsSelectors.getDetailLoading(state));

  const error = useAppSelector((state) => ProductsSelectors.getError(state));

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
