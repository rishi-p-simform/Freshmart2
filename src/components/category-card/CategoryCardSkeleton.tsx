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
import { Colors } from '../../theme';
import styleSheet from './CategoryCardStyles';

/**
 * CategoryCardSkeleton Component
 * Renders a placeholder skeleton card for a category with a pulsing animation.
 *
 * @returns {React.ReactElement} The CategoryCardSkeleton component.
 */
export const CategoryCardSkeleton: React.FC = () => {
  const { styles, theme } = useTheme(styleSheet);
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

  const placeholderColor = Colors[theme]?.palette.gray[200] || '#e2e8f0';

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={[styles.imageStyle, { backgroundColor: placeholderColor }]} />
      <View
        style={{
          height: 10,
          backgroundColor: placeholderColor,
          borderRadius: 3,
          width: '90%',
          marginTop: 4
        }}
      />
    </Animated.View>
  );
};

export default CategoryCardSkeleton;
