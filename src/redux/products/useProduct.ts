import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PAGINATION } from '../../constants';
import type { ProductFilters } from '../../types';
import type { RootStateType } from '../Store';
import { ProductsActions } from './ProductsSlice';
import ProductsSelectors from './ProductsSelectors';

export const useProduct = (listId: string) => {
  const dispatch = useDispatch<any>();

  const listState = useSelector((state: RootStateType) =>
    ProductsSelectors.getListState(state, listId)
  );

  const fetchList = useCallback(
    (filters: ProductFilters = {}) => {
      dispatch(
        ProductsActions.fetchProducts({
          params: {
            ...filters,
            page: PAGINATION.DEFAULT_PAGE,
            limit: filters.limit || PAGINATION.DEFAULT_LIMIT
          },
          data: { listId, page: PAGINATION.DEFAULT_PAGE, isRefresh: false }
        })
      );
    },
    [dispatch, listId]
  );

  const loadMore = useCallback(
    (filters: ProductFilters = {}) => {
      if (listState && listState.hasNext && !listState.loadingMore && !listState.loading) {
        const nextPage = listState.page + 1;
        dispatch(
          ProductsActions.fetchProducts({
            params: {
              ...filters,
              page: nextPage,
              limit: filters.limit || PAGINATION.DEFAULT_LIMIT
            },
            data: { listId, page: nextPage, isRefresh: false }
          })
        );
      }
    },
    [dispatch, listId, listState]
  );

  const refreshList = useCallback(
    (filters: ProductFilters = {}) => {
      dispatch(
        ProductsActions.fetchProducts({
          params: {
            ...filters,
            page: PAGINATION.DEFAULT_PAGE,
            limit: filters.limit || PAGINATION.DEFAULT_LIMIT
          },
          data: { listId, page: PAGINATION.DEFAULT_PAGE, isRefresh: true }
        })
      );
    },
    [dispatch, listId]
  );

  const searchList = useCallback(
    (q: string, filters: ProductFilters = {}) => {
      dispatch(
        ProductsActions.searchProducts({
          params: {
            q,
            ...filters,
            page: PAGINATION.DEFAULT_PAGE,
            limit: filters.limit || PAGINATION.DEFAULT_LIMIT
          },
          data: { listId, page: PAGINATION.DEFAULT_PAGE, isRefresh: false }
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
    fetchList,
    loadMore,
    refreshList,
    searchList
  };
};
