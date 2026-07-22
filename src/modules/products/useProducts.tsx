import React, { useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { Text } from '../../components';
import { Strings } from '../../constants';
import { useTheme } from '../../hooks';
import { CategoryActions, CategorySelectors, useAppDispatch, useAppSelector } from '../../redux';
import { useProduct } from '../../redux/products/useProduct';
import { Colors, scale } from '../../theme';
import type { ProductsHookReturnType, ProductsScreenProps } from './ProductsTypes';

/**
 * Custom hook for ProductsScreen logic.
 * Encapsulates category resolution, title formatting, filter computation, and header action state.
 *
 * @param {ProductsScreenProps} props - The screen props containing id and slug.
 * @returns {ProductsHookReturnType} Screen title, list key, filters, rightActions, and item count.
 */
export const useProducts = (props: ProductsScreenProps): ProductsHookReturnType => {
  const { id, slug } = props;
  const dispatch = useAppDispatch();
  const { theme } = useTheme();

  const categories = useAppSelector(CategorySelectors.getCategories);

  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(CategoryActions.fetchCategories({}));
    }
  }, [dispatch, categories]);

  // Resolve matching category object by id, slug, or name match
  const category = useMemo(() => {
    if (!categories || categories.length === 0) return null;
    const searchKey = (id || slug || '').toLowerCase();
    return (
      categories.find(
        (c) =>
          c.id === id ||
          c.slug === slug ||
          c.slug === id ||
          c.id === slug ||
          c.name.toLowerCase() === searchKey
      ) || null
    );
  }, [categories, id, slug]);

  // Derive display title for header
  const title = useMemo(() => {
    if (category?.name) return category.name;
    if (slug) {
      return slug
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    if (id && id !== 'bestSellers') {
      return id
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    return Strings.Products.productsTitle;
  }, [category, slug, id]);

  // Compute filters object for products API
  const filters = useMemo(() => {
    if (id === 'bestSellers') {
      return { featured: true };
    }
    const resolvedCategoryId = category?.id || id || slug;
    return resolvedCategoryId ? { category_id: resolvedCategoryId } : {};
  }, [id, slug, category]);

  const listKey = useMemo(() => {
    return category?.id || id || slug || 'all';
  }, [category, id, slug]);

  const { items } = useProduct(listKey);

  const itemCountLabel = items?.length === 1 ? Strings.Products.item : Strings.Products.items;
  const countText = `${items?.length || 0} ${itemCountLabel}`;

  const rightActions = useMemo(() => {
    const alphaBg = Colors[theme]?.solidWhite
      ? Colors[theme].alpha(Colors[theme].solidWhite, 0.18)
      : 'rgba(255, 255, 255, 0.18)';

    return [
      {
        icon: (
          <View
            style={{
              backgroundColor: alphaBg,
              paddingHorizontal: scale(8),
              paddingVertical: scale(8),
              borderRadius: scale(7)
            }}
          >
            <Text variant="labelSmall" style={{ color: '#FFFFFF', fontWeight: '700' }}>
              {countText}
            </Text>
          </View>
        )
      }
    ];
  }, [theme, countText]);

  return {
    title,
    listKey,
    filters,
    rightActions,
    itemsCount: items?.length || 0
  };
};

export default useProducts;
