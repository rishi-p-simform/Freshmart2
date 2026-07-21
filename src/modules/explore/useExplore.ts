import { useEffect, useState, useMemo } from 'react';
import { CategoryActions, CategorySelectors, useAppDispatch, useAppSelector } from '../../redux';
import type { ExploreHookReturnType } from './ExploreTypes';

/**
 * Custom hook containing all the business logic for the Explore screen.
 *
 * @returns {ExploreHookReturnType} An object containing:
 * - searchQuery: Current search text input value
 * - setSearchQuery: Setter function for search text input
 * - filteredCategories: List of categories filtered by search query
 * - loading: Boolean indicating if category list is fetching
 * - categories: Full list of fetched categories
 */
const useExplore = (): ExploreHookReturnType => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const categories = useAppSelector(CategorySelectors.getCategories);
  const loading = useAppSelector(CategorySelectors.getLoading);

  useEffect(() => {
    dispatch(CategoryActions.fetchCategories({}));
  }, [dispatch]);

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) {
      return categories;
    }
    const query = searchQuery.toLowerCase();
    return categories.filter((category) => category.name.toLowerCase().includes(query));
  }, [categories, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredCategories,
    loading,
    categories
  };
};

export default useExplore;
