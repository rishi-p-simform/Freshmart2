import { Tabs, useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { type FC } from 'react';
import { FlatList, Pressable, RefreshControl, ScrollView, View } from 'react-native';
import {
  Banner,
  CategoryCard,
  CategoryCardSkeleton,
  ProductsListItems,
  Text
} from '../../components';
import { Strings } from '../../constants';
import { HomeHeader } from './components/home-header';
import useHome from './useHome';

/**
 * The HomeScreen component with navigation and theme buttons.
 * @returns {React.ReactElement} A React element.
 */
const HomeScreen: FC = (): React.ReactElement => {
  const { styles, refreshing, onRefresh, greetingText, categories, categoriesLoading } = useHome();
  const router = useRouter();

  const handleSeeAllBestSellers = () => {
    router.navigate({
      pathname: '/products/[id]',
      params: {
        id: 'bestSellers',
        slug: 'best-sellers'
      }
    });
  };

  return (
    <ScrollView
      style={styles.screenView}
      contentContainerStyle={styles.contentContainer}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      keyboardShouldPersistTaps="handled"
    >
      <Tabs.Screen
        options={{
          headerShown: true,
          header: () => <HomeHeader />
        }}
      />
      <View style={styles.greetingContainer}>
        <Text variant="titleLarge" style={styles.greetingText}>
          {greetingText}
        </Text>
        <LottieView
          source={require('@/src/assets/lotties/handWave.json')}
          autoPlay
          loop
          style={styles.lottieWave}
          speed={0.5}
        />
      </View>
      <Banner />

      {/* Categories Section */}
      <View style={styles.sectionHeader}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          {Strings.Home.categories}
        </Text>
        <Pressable accessibilityRole="button" accessibilityLabel="See all categories">
          <Text variant="labelMedium" style={styles.seeAllText}>
            {Strings.Home.seeAll}
          </Text>
        </Pressable>
      </View>

      {categoriesLoading && categories.length === 0 ? (
        <FlatList
          data={Array.from({ length: 6 }, (_, i) => ({ id: `skeleton-${i}` }))}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
          renderItem={() => <CategoryCardSkeleton />}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
          renderItem={({ item }) => (
            <CategoryCard
              id={item.id}
              title={item.name}
              image_url={item.image_url}
              slug={item.slug}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}

      {/* Best Sellers Section */}
      <View style={styles.sectionHeader}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          {Strings.Home.bestSellers}
        </Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="See all best sellers"
          onPress={handleSeeAllBestSellers}
        >
          <Text variant="labelMedium" style={styles.seeAllText}>
            {Strings.Home.seeAll}
          </Text>
        </Pressable>
      </View>

      <ProductsListItems
        listKey="bestSellers"
        filters={{ featured: true }}
        showSearch={false}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

export default HomeScreen;
