import { Ionicons } from '@expo/vector-icons';
import React, { type FC } from 'react';
import { FlatList, Keyboard, Pressable, RefreshControl, View } from 'react-native';
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  CustomInput,
  FilterSelector,
  ProductCard,
  ProductCardSkeleton,
  Spinner,
  Text
} from '../../components';
import { Strings } from '../../constants';
import { useTheme } from '../../hooks';
import { Colors, scale } from '../../theme';
import { styleSheet } from './SearchStyles';
import type { SearchScreenProps } from './SearchTypes';
import useSearch from './useSearch';

/**
 * SearchScreen Component
 * Renders product search results with smooth transitions, Skeleton loaders, and error/empty states.
 */
const SearchScreen: FC<SearchScreenProps> = (props) => {
  const { testID } = props;
  const { styles, theme } = useTheme(styleSheet);
  const insets = useSafeAreaInsets();
  const {
    searchQuery,
    setSearchQuery,
    selectedCategoryId,
    onSelectCategory,
    onBackPress,
    items,
    loading,
    loadingMore,
    refreshing,
    initialized,
    hasNext,
    onRefresh,
    onLoadMore
  } = useSearch();

  const skeletonData = Array.from({ length: 6 }, (_, i) => ({
    id: `skeleton-${i}`
  }));

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
            {Strings.Products?.dataFetchingCompleted ?? 'No more products'}
          </Text>
        </View>
      );
    }
    return null;
  };

  const renderContent = () => {
    if (loading) {
      return (
        <Animated.View entering={FadeIn.duration(300)} exiting={FadeOut.duration(200)}>
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
        </Animated.View>
      );
    }

    if (initialized && items.length === 0 && !loading && !refreshing) {
      return (
        <Animated.View
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(200)}
          style={{ flex: 1 }}
        >
          <Animated.ScrollView
            contentContainerStyle={styles.emptyContainer}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={Colors[theme]?.primary}
              />
            }
          >
            <Ionicons
              name="search-outline"
              size={scale(56)}
              color={Colors[theme]?.palette.gray[400]}
            />
            <Text variant="titleMedium" style={styles.emptyTitle}>
              No products found
            </Text>
            <Text variant="bodySmall" style={styles.emptySubtitle}>
              Try checking spelling or filtering by a different category.
            </Text>
          </Animated.ScrollView>
        </Animated.View>
      );
    }

    return (
      <Animated.View
        style={{ flex: 1 }}
        entering={FadeIn.duration(300)}
        layout={Layout.springify()}
      >
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Animated.View layout={Layout.springify()} style={styles.cardWrapper}>
              <ProductCard item={item} />
            </Animated.View>
          )}
          numColumns={2}
          contentContainerStyle={styles.contentStyle}
          columnWrapperStyle={styles.columnWrapperStyle}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.3}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors[theme]?.primary}
            />
          }
          ListHeaderComponent={
            searchQuery ? (
              <Text variant="bodyMedium" style={styles.resultsText}>
                {`Results for "${searchQuery}" (${items.length})`}
              </Text>
            ) : null
          }
          ListFooterComponent={renderFooter}
        />
      </Animated.View>
    );
  };

  return (
    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <View style={[styles.container, { paddingTop: insets.top }]} testID={testID}>
        {/* Header with back icon on left & search input to the right */}
        <View style={styles.headerRow}>
          <Pressable
            style={styles.backButton}
            onPress={onBackPress}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Ionicons
              name="arrow-back"
              size={scale(22)}
              color={Colors[theme]?.black ?? '#111827'}
            />
          </Pressable>

          <CustomInput
            leftIcon="search"
            placeholder="Search items..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
            customStyle={styles.searchCustomStyle}
            accessibilityRole="search"
            accessibilityLabel="Search items input"
          />
        </View>

        {/* Filter Selector with 'All' included */}
        <FilterSelector
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={onSelectCategory}
        />

        {/* Main Search Results Content */}
        <View style={styles.contentArea}>{renderContent()}</View>
      </View>
    </Pressable>
  );
};

SearchScreen.displayName = 'SearchScreen';
export default SearchScreen;
