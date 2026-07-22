import { useEffect } from 'react';
import { Gesture } from 'react-native-gesture-handler';
import {
  runOnJS,
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
  const startTouchY = useSharedValue(0);
  const isRefreshing = useSharedValue(refreshing);

  useEffect(() => {
    isRefreshing.value = refreshing;
    if (refreshing) {
      pullDistance.value = withSpring(pullThreshold, { damping: 15, stiffness: 120 });
    } else {
      pullDistance.value = withSpring(0, { damping: 20, stiffness: 150 });
    }
  }, [refreshing, pullThreshold, pullDistance, isRefreshing]);

  const triggerRefresh = () => {
    onRefresh();
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y;
    }
  });

  const panGesture = Gesture.Pan()
    .manualActivation(true)
    .onTouchesDown((event) => {
      if (event.allTouches.length > 0) {
        startTouchY.value = event.allTouches[0].absoluteY;
      }
    })
    .onTouchesMove((event, stateManager) => {
      if (isRefreshing.value) {
        stateManager.fail();
        return;
      }
      if (event.allTouches.length === 0) return;

      const currentY = event.allTouches[0].absoluteY;
      const diffY = currentY - startTouchY.value;

      if (scrollOffset.value <= 1 && diffY > 8) {
        stateManager.activate();
      } else if (diffY < -3 || scrollOffset.value > 1) {
        stateManager.fail();
      }
    })
    .onUpdate((event) => {
      if (event.translationY > 0) {
        pullDistance.value = Math.min(event.translationY * 0.5, pullThreshold * 1.5);
      } else {
        pullDistance.value = 0;
      }
    })
    .onEnd(() => {
      if (pullDistance.value >= pullThreshold * 0.7) {
        pullDistance.value = withSpring(pullThreshold, { damping: 15, stiffness: 120 });
        runOnJS(triggerRefresh)();
      } else {
        pullDistance.value = withTiming(0, { duration: 200 });
      }
    })
    .onFinalize(() => {
      if (!isRefreshing.value && pullDistance.value < pullThreshold * 0.7) {
        pullDistance.value = withTiming(0, { duration: 200 });
      }
    });

  const nativeGesture = Gesture.Native();
  const composedGesture = Gesture.Simultaneous(panGesture, nativeGesture);

  const animatedSpinnerStyle = useAnimatedStyle(() => {
    const progress = Math.min(pullDistance.value / pullThreshold, 1);
    const opacity = Math.min(pullDistance.value / (pullThreshold * 0.4), 1);
    return {
      opacity,
      transform: [{ scale: progress }, { translateY: 10 + pullDistance.value * 0.6 }]
    };
  });

  return {
    composedGesture,
    scrollHandler,
    animatedSpinnerStyle
  };
};
