import LottieView from 'lottie-react-native';
import React, { FC } from 'react';
import { Platform, RefreshControl, ScrollViewProps, StyleSheet, View } from 'react-native';
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

  const { scrollHandler, animatedSpinnerStyle, panHandlers } = useCustomRefreshControl({
    refreshing,
    onRefresh,
    pullThreshold
  });

  if (Platform.OS === 'android') {
    return (
      <View style={StyleSheet.flatten([styles.container, style])}>
        <Animated.ScrollView
          {...scrollViewProps}
          contentContainerStyle={contentContainerStyle}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[currentColors.primary]}
              tintColor={currentColors.primary}
            />
          }
        >
          {children}
        </Animated.ScrollView>
      </View>
    );
  }

  return (
    <View style={StyleSheet.flatten([styles.container, style])} {...panHandlers}>
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

      {/* Spinner overlay — renders on top of content, does not block touches */}
      <Animated.View style={[styles.spinnerContainer, animatedSpinnerStyle]} pointerEvents="none">
        <View style={styles.spinnerCircle}>
          <LottieView
            source={require('../../assets/lotties/cartLoading.json')}
            autoPlay
            loop
            style={{ width: 70, height: 70 }}
            speed={1.5}
          />
        </View>
      </Animated.View>
    </View>
  );
};

export default CustomRefreshControl;
