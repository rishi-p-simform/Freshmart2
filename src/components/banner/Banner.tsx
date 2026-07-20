import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useRef } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import Text from '../text/Text';

import { useGetBannersQuery, type BANNER } from '../../redux';
import useTheme from '../../hooks/useTheme';
import Colors from '../../theme/Colors';
import { scale } from '../../theme/Metrics';
import { ITEM_GAP, ITEM_WIDTH, styleSheet } from './BannerStyles';
import { BannerDefaultProps, type BannerProps } from './BannerTypes';

const AUTO_SCROLL_INTERVAL = 10000;

/**
 * Banner component to display a horizontal list of banners
 * @param props BannerProps
 * @returns React.FC
 */
const Banner: React.FC<BannerProps> = (props) => {
  const { customStyle, testID, accessibilityLabel } = { ...BannerDefaultProps, ...props };
  const { theme, styles } = useTheme(styleSheet);

  const { data: banners = [], isLoading: loading } = useGetBannersQuery();

  const flatListRef = useRef<FlatList<BANNER>>(null);
  const currentIndex = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /** Clears the current auto-scroll interval and starts a fresh one. */
  const resetAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (!banners.length) return;

    intervalRef.current = setInterval(() => {
      currentIndex.current =
        currentIndex.current === banners.length - 1 ? 0 : currentIndex.current + 1;

      flatListRef.current?.scrollToIndex({
        index: currentIndex.current,
        animated: true
      });
    }, AUTO_SCROLL_INTERVAL);
  }, [banners]);

  useEffect(() => {
    resetAutoScroll();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [resetAutoScroll]);

  const handlePress = (action_type: string, action_value: string) => {
    if (action_type === 'category') {
      router.navigate({
        pathname: '/(protected)/products/[id]',
        params: {
          slug: action_value,
          id: action_value
        }
      });
    } else if (action_type === 'url') {
      router.navigate('/(protected)/search/Search');
    }
  };

  if (loading) {
    return (
      <View
        style={[styles.skeletonContainer, customStyle]}
        testID={testID}
        accessibilityRole="none"
      >
        <View style={styles.container}>
          <View style={styles.circle} />
          <View style={styles.containerLeft}>
            <View style={styles.skeletonTitle} />
            <View style={styles.skeletonSubtitle} />
            <View style={styles.skeletonButton} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <FlatList
      ref={flatListRef}
      data={banners}
      horizontal
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      snapToAlignment="center"
      snapToInterval={ITEM_WIDTH + ITEM_GAP}
      keyExtractor={(item) => item.id}
      contentContainerStyle={[styles.scrollViewStyle, customStyle]}
      getItemLayout={(_, index) => ({
        length: ITEM_WIDTH + ITEM_GAP,
        offset: (ITEM_WIDTH + ITEM_GAP) * index,
        index
      })}
      onScrollToIndexFailed={() => {}}
      onMomentumScrollEnd={(e) => {
        currentIndex.current = Math.round(e.nativeEvent.contentOffset.x / (ITEM_WIDTH + ITEM_GAP));
        resetAutoScroll();
      }}
      renderItem={({ item }) => (
        <View
          style={styles.container}
          testID={`${testID}-${item.id}`}
          accessibilityLabel={accessibilityLabel || 'Banner item'}
        >
          <View style={styles.circle} />
          <Image
            source={{ uri: item.image_url }}
            style={styles.imageStyle}
            accessibilityRole="image"
          />
          <LinearGradient
            colors={Colors[theme].gradients.orangeToTransparent}
            style={styles.gradient}
            start={{ x: 0.44, y: 0.0 }}
            end={{ x: 0.56, y: 1.0 }}
          />
          <View style={styles.containerLeft}>
            <Text style={styles.title} accessibilityRole="text" variant="bodyMedium">
              {item.title}
            </Text>
            <Text variant="titleLarge" style={styles.whiteText} accessibilityRole="text">
              {item.subtitle}
            </Text>
            <View style={styles.shopNowSection}>
              <TouchableOpacity
                style={styles.shopNow}
                onPress={() => handlePress(item.action_type, item.action_value)}
                accessibilityRole="button"
                accessibilityLabel="Shop Now"
                accessibilityHint={`Navigate to ${item.action_type}`}
                testID={`shop-now-${item.id}`}
              >
                <Text variant="captionBold" style={styles.orangeText}>
                  Shop Now
                </Text>
                <Ionicons name="arrow-forward" color={Colors[theme]?.orange} size={scale(10)} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    />
  );
};

Banner.displayName = 'Banner';
export default Banner;
