import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductsActions } from './ProductsSlice';
import ProductsSelectors from './ProductsSelectors';
import type { RootStateType } from '../Store';
import type { ProductFilters } from '../../types';

/**
 * Custom hook to execute search API calls on demand with list isolation.
 * Uses searchProducts thunk from ProductsSlice.
 */
export const useProductSearch = (listId: string = 'search') => {
  const dispatch = useDispatch<any>();

  const listState = useSelector((state: RootStateType) =>
    ProductsSelectors.getListState(state, listId)
  );

  const search = useCallback(
    (query: string, filters: ProductFilters = {}) => {
      dispatch(
        ProductsActions.searchProducts({
          params: { q: query, ...filters, page: 1, limit: filters.limit || 20 },
          data: { listId, page: 1, isRefresh: false }
        })
      );
    },
    [dispatch, listId]
  );

  const loadMore = useCallback(
    (query: string, filters: ProductFilters = {}) => {
      if (listState && listState.hasNext && !listState.loadingMore && !listState.loading) {
        const nextPage = listState.page + 1;
        dispatch(
          ProductsActions.searchProducts({
            params: { q: query, ...filters, page: nextPage, limit: filters.limit || 20 },
            data: { listId, page: nextPage, isRefresh: false }
          })
        );
      }
    },
    [dispatch, listId, listState]
  );

  const refresh = useCallback(
    (query: string, filters: ProductFilters = {}) => {
      dispatch(
        ProductsActions.searchProducts({
          params: { q: query, ...filters, page: 1, limit: filters.limit || 20 },
          data: { listId, page: 1, isRefresh: true }
        })
      );
    },
    [dispatch, listId]
  );

  return {
    items: listState?.items || [],
    loading: listState?.loading || false,
    loadingMore: listState?.loadingMore || false,
    refreshing: listState?.refreshing || false,
    initialized: listState?.initialized || false,
    hasNext: listState?.hasNext || false,
    search,
    loadMore,
    refresh
  };
};

export default useProductSearch;
