import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated';
import { ANIMATION_DURATION, SKELETON } from '../../constants';
import { useTheme } from '../../hooks';
import styleSheet from './ProductCardStyles';

/**
 * ProductCardSkeleton Component
 * Renders a placeholder skeleton card with a pulsing animation to indicate loading.
 *
 * @returns {React.ReactElement} The ProductCardSkeleton component.
 */
export const ProductCardSkeleton: React.FC = () => {
  const { styles } = useTheme(styleSheet);
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(SKELETON.PULSE_OPACITY, { duration: ANIMATION_DURATION.SLOW }),
      SKELETON.INFINITE_REPEAT,
      true
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {/* Image Skeleton */}
      <View style={styles.imageStyle} />

      {/* Title Skeleton */}
      <View
        style={{
          height: 16,
          backgroundColor: styles.imageStyle.backgroundColor,
          borderRadius: 4,
          width: '85%',
          marginTop: 6
        }}
      />
      <View
        style={{
          height: 16,
          backgroundColor: styles.imageStyle.backgroundColor,
          borderRadius: 4,
          width: '55%',
          marginTop: 4
        }}
      />

      {/* Rating Row Skeleton */}
      <View
        style={{
          height: 12,
          backgroundColor: styles.imageStyle.backgroundColor,
          borderRadius: 4,
          width: '40%',
          marginTop: 6
        }}
      />

      {/* Price Row Skeleton */}
      <View style={[styles.priceRow, { marginTop: 10 }]}>
        <View
          style={{
            height: 20,
            backgroundColor: styles.imageStyle.backgroundColor,
            borderRadius: 4,
            width: '30%'
          }}
        />
        <View
          style={{
            height: 28,
            backgroundColor: styles.imageStyle.backgroundColor,
            borderRadius: 14,
            width: '40%'
          }}
        />
      </View>
    </Animated.View>
  );
};

export default ProductCardSkeleton;
