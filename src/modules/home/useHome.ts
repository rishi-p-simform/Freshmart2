import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTheme } from '../../hooks';
import {
  AddressActions,
  CategoryActions,
  CategorySelectors,
  useAppDispatch,
  useAppSelector,
  useGetBannersQuery,
  UserSelectors
} from '../../redux';
import { CartActions } from '../../redux/cart';
import { ProductsActions } from '../../redux/products/ProductsSlice';
import styleSheet from './HomeStyles';

/**
 * Custom hook for the Home screen logic.
 */
const useHome = () => {
  const dispatch = useAppDispatch();
  const { styles, changeTheme, theme } = useTheme(styleSheet);
  const [refreshing, setRefreshing] = useState(false);
  const profile = useAppSelector(UserSelectors.getProfile);
  const categories = useAppSelector(CategorySelectors.getCategories);
  const categoriesLoading = useAppSelector(CategorySelectors.getLoading);
  const { refetch: refetchBanners } = useGetBannersQuery();

  useEffect(() => {
    // Fetch addresses, categories, and cart when home screen mounts
    dispatch(AddressActions.fetchAddresses({}));
    dispatch(CategoryActions.fetchCategories({}));
    dispatch(CartActions.getCart({}));
  }, [dispatch]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        dispatch(AddressActions.fetchAddresses({})).unwrap(),
        dispatch(CategoryActions.fetchCategories({})).unwrap(),
        dispatch(
          ProductsActions.fetchProducts({
            params: { featured: true, page: 1, limit: 20 },
            data: { listId: 'bestSellers', page: 1, isRefresh: true }
          })
        ).unwrap(),
        refetchBanners()
      ]);
    } catch (error) {
      console.error('Error refreshing home data:', error);
    } finally {
      setRefreshing(false);
    }
  }, [dispatch, refetchBanners]);

  const greetingText = useMemo(() => {
    const hour = new Date().getHours();
    let greeting = 'Good morning';
    if (hour >= 12 && hour < 17) {
      greeting = 'Good afternoon';
    } else if (hour >= 17 && hour < 22) {
      greeting = 'Good evening';
    } else if (hour >= 22 || hour < 5) {
      greeting = 'Good night';
    }
    const firstName = profile?.full_name?.split(' ')[0] || 'Guest';
    return `${greeting}, ${firstName}!`;
  }, [profile]);

  return {
    styles,
    changeTheme,
    theme,
    refreshing,
    onRefresh,
    greetingText,
    categories,
    categoriesLoading
  };
};

export default useHome;
