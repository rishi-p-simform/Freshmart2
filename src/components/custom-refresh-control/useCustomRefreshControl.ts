import { useEffect, useMemo, useRef } from 'react';
import { PanResponder } from 'react-native';
import {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated';

interface UseCustomRefreshControlParams {
  refreshing: boolean;
  onRefresh: () => void | Promise<void>;
  pullThreshold: number;
}

export const useCustomRefreshControl = ({
  refreshing,
  onRefresh,
  pullThreshold
}: UseCustomRefreshControlParams) => {
  const pullDistance = useSharedValue(0);
  const scrollOffset = useSharedValue(0);
  const isRefreshing = useSharedValue(refreshing);

  /** Keep a stable ref to onRefresh so PanResponder always calls the latest version */
  const onRefreshRef = useRef(onRefresh);
  onRefreshRef.current = onRefresh;

  useEffect(() => {
    isRefreshing.value = refreshing;
    if (refreshing) {
      pullDistance.value = withSpring(pullThreshold, { damping: 15, stiffness: 120 });
    } else {
      pullDistance.value = withSpring(0, { damping: 20, stiffness: 150 });
    }
  }, [refreshing, pullThreshold, pullDistance, isRefreshing]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y;
    }
  });

  /**
   * PanResponder uses React Native's cross-platform responder system.
   *
   * – onStartShouldSetPanResponder → false: taps pass through to children (Pressable etc.)
   * – onMoveShouldSetPanResponderCapture: runs in the capture phase (parent → child),
   *   BEFORE the ScrollView can consume the touch. Returns true only when at the scroll
   *   top AND the user has pulled down > 10 px.
   * – Once claimed, onPanResponderMove drives the pull animation.
   */
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onStartShouldSetPanResponderCapture: () => false,
        onMoveShouldSetPanResponder: () => false,
        onMoveShouldSetPanResponderCapture: (_evt, gestureState) => {
          // Only capture when at the scroll top, pulling down, and not already refreshing
          return (
            !isRefreshing.value &&
            scrollOffset.value <= 1 &&
            gestureState.dy > 10 &&
            Math.abs(gestureState.dx) < gestureState.dy
          );
        },
        onPanResponderMove: (_evt, gestureState) => {
          if (gestureState.dy > 0) {
            pullDistance.value = Math.min(gestureState.dy * 0.5, pullThreshold * 1.5);
          }
        },
        onPanResponderRelease: () => {
          if (pullDistance.value >= pullThreshold * 0.7) {
            pullDistance.value = withSpring(pullThreshold, { damping: 15, stiffness: 120 });
            onRefreshRef.current();
          } else {
            pullDistance.value = withTiming(0, { duration: 200 });
          }
        },
        onPanResponderTerminate: () => {
          if (!isRefreshing.value) {
            pullDistance.value = withTiming(0, { duration: 200 });
          }
        }
      }),
    // Shared values are stable refs; onRefreshRef is a stable ref.
    // pullThreshold is the only primitive that could change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pullThreshold]
  );

  const animatedSpinnerStyle = useAnimatedStyle(() => {
    const progress = Math.min(pullDistance.value / pullThreshold, 1);
    const opacity = Math.min(pullDistance.value / (pullThreshold * 0.4), 1);
    return {
      opacity,
      transform: [{ scale: progress }, { translateY: 10 + pullDistance.value * 0.6 }]
    };
  });

  return {
    scrollHandler,
    animatedSpinnerStyle,
    panHandlers: panResponder.panHandlers
  };
};
