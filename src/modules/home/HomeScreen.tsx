import { Tabs } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { type FC } from 'react';
import { FlatList, Pressable, RefreshControl, ScrollView, View } from 'react-native';
import { Banner, CategoryCard, Text } from '../../components';
import { Strings } from '../../constants';
import { HomeHeader } from './components/home-header';
import useHome from './useHome';

/**
 * The HomeScreen component with navigation and theme buttons.
 * @returns {React.ReactElement} A React element.
 */
const HomeScreen: FC = (): React.ReactElement => {
  const { styles, changeTheme, refreshing, onRefresh, greetingText, categories } = useHome();

  return (
    <ScrollView
      style={styles.screenView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
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

      {/* Best Sellers Section */}
      <View style={styles.sectionHeader}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          {Strings.Home.bestSellers}
        </Text>
        <Pressable accessibilityRole="button" accessibilityLabel="See all best sellers">
          <Text variant="labelMedium" style={styles.seeAllText}>
            {Strings.Home.seeAll}
          </Text>
        </Pressable>
      </View>

    </ScrollView>
  );
};

export default HomeScreen;
