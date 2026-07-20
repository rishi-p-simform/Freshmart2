import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, RefreshControl, TextInput, View } from 'react-native';
import { useTheme } from '../../hooks';
import { Strings } from '../../constants';
import { useProduct } from '../../redux/products/useProduct';
import ProductCard, { ProductCardSkeleton } from '../product-card';
import styleSheet from './ProductsListItemsStyles';
import Text from '../text/Text';
import Spinner from '../spinner/Spinner';
import {
  ProductsListItemsDefaultProps,
  type ProductsListItemsProps
} from './ProductsListItemsTypes';

/**
 * ProductsListItems Component
 * Renders a grid list of product cards with pull-to-refresh, pagination, and local filtering by search query.
 *
 * @param {ProductsListItemsProps} props - Component props.
 * @returns {React.ReactElement} The ProductsListItems component.
 */
const ProductsListItems: React.FC<ProductsListItemsProps> = (props) => {
  const { listKey, filters, showSearch, customStyle, testID, scrollEnabled } = {
    ...ProductsListItemsDefaultProps,
    ...props
  };

  const { styles } = useTheme(styleSheet);
  const [search, setSearch] = useState('');

  const { items, loading, refreshing, fetchList, refreshList, loadMore, loadingMore, hasNext } =
    useProduct(listKey);

  const serializedFilters = JSON.stringify(filters);
  useEffect(() => {
    fetchList(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listKey, fetchList, serializedFilters]);

  const filteredItems = useMemo(() => {
    if (!search.trim()) {
      return items;
    }
    const query = search.toLowerCase();
    return items.filter((item) => item.name.toLowerCase().includes(query));
  }, [items, search]);

  const onRefresh = () => {
    refreshList(filters);
  };

  const onEndReached = () => {
    loadMore(filters);
  };

  const renderFooter = () => {
    if (loadingMore) {
      return (
        <View style={styles.footerContainer}>
          <Spinner size="small" />
        </View>
      );
    }

    if (!hasNext && items.length > 0 && !loading && !refreshing) {
      return (
        <View style={styles.footerContainer}>
          <Text variant="bodyMedium" style={styles.footerText}>
            {Strings.Products.dataFetchingCompleted}
          </Text>
        </View>
      );
    }

    return null;
  };

  if (loading && items.length === 0) {
    const skeletonData = Array.from({ length: 6 }, (_, i) => ({ id: `skeleton-${i}` }));
    return (
      <View style={[styles.container, customStyle]} testID={testID}>
        {showSearch && (
          <View style={styles.searchContainer}>
            <TextInput
              placeholder={Strings.Products.searchPlaceholder}
              placeholderTextColor="#999"
              value={search}
              onChangeText={setSearch}
              style={styles.searchInput}
              accessibilityRole="search"
              accessibilityLabel="Search products in this list"
              editable={false}
            />
          </View>
        )}
        <FlatList
          data={skeletonData}
          keyExtractor={(item) => item.id}
          renderItem={() => (
            <View style={styles.cardWrapper}>
              <ProductCardSkeleton />
            </View>
          )}
          numColumns={2}
          contentContainerStyle={styles.contentStyle}
          columnWrapperStyle={styles.columnWrapperStyle}
          scrollEnabled={false}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, customStyle]} testID={testID}>
      {showSearch && (
        <View style={styles.searchContainer}>
          <TextInput
            placeholder={Strings.Products.searchPlaceholder}
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
            accessibilityRole="search"
            accessibilityLabel="Search products in this list"
          />
        </View>
      )}

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <ProductCard item={item} />
          </View>
        )}
        numColumns={2}
        contentContainerStyle={styles.contentStyle}
        columnWrapperStyle={styles.columnWrapperStyle}
        scrollEnabled={scrollEnabled}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.2}
        refreshControl={
          scrollEnabled ? (
            <RefreshControl
              refreshing={refreshing || (loading && items.length === 0)}
              onRefresh={onRefresh}
            />
          ) : undefined
        }
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

ProductsListItems.displayName = 'ProductsListItems';
export default ProductsListItems;
