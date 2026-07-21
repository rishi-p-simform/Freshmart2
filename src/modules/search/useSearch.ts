import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector, CategoryActions, CategorySelectors } from '../../redux';
import { useProduct, useProductSearch } from '../../redux/products';
import type { SearchHookReturnType } from './SearchTypes';

/**
 * Custom hook managing search screen logic, API search triggers, category selection, and state.
 */
const useSearch = (): SearchHookReturnType => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const categories = useAppSelector(CategorySelectors.getCategories);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const {
    items,
    loading,
    loadingMore,
    refreshing,
    initialized,
    hasNext,
    search,
    loadMore: loadMoreSearch,
    refresh: refreshSearch
  } = useProductSearch('search_screen');

  const {
    items: fetchItems,
    loading: fetchLoading,
    loadingMore: fetchLoadingMore,
    refreshing: fetchRefreshing,
    initialized: fetchInitialized,
    hasNext: fetchHasNext,
    fetchList,
    loadMore: loadMoreFetch,
    refreshList
  } = useProduct('search_screen');

  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(CategoryActions.fetchCategories({}));
    }
  }, [categories, dispatch]);

  const [isPending, setIsPending] = useState(false);

  // Trigger search or fetch API call when query or category changes
  useEffect(() => {
    setIsPending(true);
    const filters = selectedCategoryId ? { category_id: selectedCategoryId } : {};
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        search(searchQuery, filters);
      } else {
        fetchList(filters);
      }
      setIsPending(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategoryId, search, fetchList]);

  const onSelectCategory = useCallback((id: string | null) => {
    setIsPending(true);
    setSelectedCategoryId(id);
  }, []);

  const handleSetSearchQuery = useCallback((query: string) => {
    setIsPending(true);
    setSearchQuery(query);
  }, []);

  const onRefresh = useCallback(() => {
    const filters = selectedCategoryId ? { category_id: selectedCategoryId } : {};
    if (searchQuery.trim()) {
      refreshSearch(searchQuery, filters);
    } else {
      refreshList(filters);
    }
  }, [refreshSearch, refreshList, searchQuery, selectedCategoryId]);

  const onLoadMore = useCallback(() => {
    const filters = selectedCategoryId ? { category_id: selectedCategoryId } : {};
    if (searchQuery.trim()) {
      loadMoreSearch(searchQuery, filters);
    } else {
      loadMoreFetch(filters);
    }
  }, [loadMoreSearch, loadMoreFetch, searchQuery, selectedCategoryId]);

  const onBackPress = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(protected)/(tabs)/home');
    }
  }, [router]);

  const rawItems = searchQuery.trim() ? items : fetchItems;
  const activeItems = selectedCategoryId
    ? rawItems.filter((item) => item.category_id === selectedCategoryId)
    : rawItems;
  const activeLoading = isPending || (searchQuery.trim() ? loading : fetchLoading);
  const activeLoadingMore = searchQuery.trim() ? loadingMore : fetchLoadingMore;
  const activeRefreshing = searchQuery.trim() ? refreshing : fetchRefreshing;
  const activeInitialized = searchQuery.trim() ? initialized : fetchInitialized;
  const activeHasNext = searchQuery.trim() ? hasNext : fetchHasNext;

  return {
    searchQuery,
    setSearchQuery: handleSetSearchQuery,
    categories,
    selectedCategoryId,
    onSelectCategory,
    onBackPress,
    items: activeItems,
    loading: activeLoading,
    loadingMore: activeLoadingMore,
    refreshing: activeRefreshing,
    initialized: activeInitialized,
    hasNext: activeHasNext,
    onRefresh,
    onLoadMore
  };
};

export default useSearch;
