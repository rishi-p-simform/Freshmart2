import { fontSizeStyles } from '@/src/components/text/TextStyles';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React, { useRef, type FC } from 'react';
import { FlatList, TextInput, View } from 'react-native';
import { CategoryCard, CategoryCardSkeleton, CustomHeader, CustomInput } from '../../components';
import { Strings } from '../../constants';
import { useTheme } from '../../hooks';
import { Colors } from '../../theme';
import styleSheet from './ExploreStyles';
import useExplore from './useExplore';

/**
 * ExploreScreen
 * Displays a list of all categories with search functionality.
 * Clicking the search icon in the header focuses the search input.
 *
 * @returns {React.ReactElement} The ExploreScreen component.
 */
const ExploreScreen: FC = (): React.ReactElement => {
  const { styles, theme } = useTheme(styleSheet);
  const { searchQuery, setSearchQuery, filteredCategories, loading } = useExplore();
  const searchInputRef = useRef<TextInput>(null);

  const handleSearchPress = () => {
    searchInputRef.current?.focus();
  };

  return (
    <View style={styles.container}>
      <Tabs.Screen
        options={{
          headerShown: true,
          header: () => (
            <CustomHeader
              title={Strings.Explore.title}
              showGradientBG
              hideBackButton
              rightActions={[
                {
                  icon: <Ionicons name="search" size={24} color={Colors[theme]?.solidWhite} />,
                  onPress: handleSearchPress
                }
              ]}
              titleStyle={{ ...fontSizeStyles.displayXS }}
            />
          )
        }}
      />

      {/* Search Input Bar */}
      <View style={styles.searchContainer}>
        <CustomInput
          ref={searchInputRef}
          leftIcon="search"
          placeholder="Search categories..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          testID="explore-search-input"
        />
      </View>

      {/* Categories Grid List */}
      {loading && filteredCategories.length === 0 ? (
        <FlatList
          data={Array.from({ length: 12 }, (_, i) => ({ id: `skeleton-${i}` }))}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
          renderItem={() => (
            <View style={styles.cardWrapper}>
              <CategoryCardSkeleton />
            </View>
          )}
        />
      ) : (
        <FlatList
          data={filteredCategories}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <CategoryCard
                id={item.id}
                title={item.name}
                image_url={item.image_url}
                slug={item.slug}
                customStyle={styles.categoryCardOverride}
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default ExploreScreen;
