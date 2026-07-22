import React, { FC } from 'react';
import { ActivityIndicator, ScrollViewProps, StyleSheet, View } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { useTheme } from '../../hooks';
import Colors from '../../theme/Colors';
import styleSheet from './CustomRefreshControlStyles';
import type { CustomRefreshControlProps } from './CustomRefreshControlTypes';
import { useCustomRefreshControl } from './useCustomRefreshControl';

const DEFAULT_THRESHOLD = 70;

export interface CustomRefreshScrollViewProps extends CustomRefreshControlProps {
  contentContainerStyle?: ScrollViewProps['contentContainerStyle'];
  scrollViewProps?: Omit<ScrollViewProps, 'refreshControl'>;
}

export const CustomRefreshControl: FC<CustomRefreshScrollViewProps> = ({
  refreshing,
  onRefresh,
  children,
  pullThreshold = DEFAULT_THRESHOLD,
  style,
  contentContainerStyle,
  scrollViewProps
}) => {
  const { styles, theme } = useTheme(styleSheet);
  const currentColors = Colors[theme] ?? Colors.light;

  const { composedGesture, scrollHandler, animatedSpinnerStyle } = useCustomRefreshControl({
    refreshing,
    onRefresh,
    pullThreshold
  });

  return (
    <View style={StyleSheet.flatten([styles.container, style])}>
      <GestureDetector gesture={composedGesture}>
        <Animated.View style={styles.container}>
          <Animated.ScrollView
            {...scrollViewProps}
            contentContainerStyle={contentContainerStyle}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            bounces={false}
            overScrollMode="never"
            showsVerticalScrollIndicator={false}
          >
            {children}
          </Animated.ScrollView>
        </Animated.View>
      </GestureDetector>

      {/* Spinner overlay — renders on top of content, does not block touches */}
      <Animated.View style={[styles.spinnerContainer, animatedSpinnerStyle]} pointerEvents="none">
        <View style={styles.spinnerCircle}>
          <ActivityIndicator size="small" color={currentColors.primary} />
        </View>
      </Animated.View>
    </View>
  );
};

export default CustomRefreshControl;
