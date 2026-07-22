import React from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import Text from '../text/Text';
import Colors from '../../theme/Colors';
import { scale } from '../../theme/Metrics';
import { ITEM_GAP, ITEM_WIDTH } from './BannerStyles';
import { BannerDefaultProps, type BannerProps } from './BannerTypes';
import { useBanner } from './useBanner';

/**
 * Banner component to display a horizontal list of banners
 * @param props BannerProps
 * @returns React.FC
 */
const Banner: React.FC<BannerProps> = (props) => {
  const { customStyle, testID, accessibilityLabel } = { ...BannerDefaultProps, ...props };
  const { theme, styles, banners, loading, flatListRef, handleMomentumScrollEnd, handlePress } =
    useBanner();

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
        handleMomentumScrollEnd(e.nativeEvent.contentOffset.x);
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
