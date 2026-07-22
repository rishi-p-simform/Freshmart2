import { useRouter } from 'expo-router';
import { useCallback, useEffect, useRef } from 'react';
import { FlatList, Linking } from 'react-native';
import { ROUTES } from '../../constants';
import useTheme from '../../hooks/useTheme';
import { useGetBannersQuery, type BANNER } from '../../redux';
import { type ThemeMode } from '../../theme';
import { ITEM_GAP, ITEM_WIDTH, styleSheet } from './BannerStyles';

const AUTO_SCROLL_INTERVAL = 10000;

export interface UseBannerReturnType {
  theme: ThemeMode;
  styles: ReturnType<typeof styleSheet>;
  banners: BANNER[];
  loading: boolean;
  flatListRef: React.RefObject<FlatList<BANNER> | null>;
  resetAutoScroll: () => void;
  handleMomentumScrollEnd: (xOffset: number) => void;
  handlePress: (action_type?: string, action_value?: string) => void;
}

/**
 * Custom hook to separate business and state logic for Banner component
 */
export const useBanner = (): UseBannerReturnType => {
  const { theme, styles } = useTheme(styleSheet);
  const router = useRouter();

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

  const handleMomentumScrollEnd = useCallback(
    (xOffset: number) => {
      currentIndex.current = Math.round(xOffset / (ITEM_WIDTH + ITEM_GAP));
      resetAutoScroll();
    },
    [resetAutoScroll]
  );

  const handlePress = useCallback(
    (action_type?: string, action_value?: string) => {
      if (!action_type) {
        router.navigate(ROUTES.Explore as any);
        return;
      }

      const type = action_type.toLowerCase();

      switch (type) {
        case 'category':
          router.navigate({
            pathname: ROUTES.ProductDetails as any,
            params: {
              id: action_value || 'all',
              slug: action_value || 'all'
            }
          });
          break;

        case 'product':
          router.navigate({
            pathname: ROUTES.Search as any,
            params: {
              id: action_value
            }
          });
          break;

        case 'search':
          router.navigate(ROUTES.Search as any);
          break;

        case 'url':
          if (action_value?.startsWith('http://') || action_value?.startsWith('https://')) {
            Linking.openURL(action_value).catch(() => {});
          } else if (action_value?.startsWith('/')) {
            router.navigate(action_value as any);
          } else {
            router.navigate(ROUTES.Search as any);
          }
          break;

        default:
          if (action_value) {
            router.navigate({
              pathname: ROUTES.ProductDetails as any,
              params: {
                id: action_value,
                slug: action_value
              }
            });
          } else {
            router.navigate(ROUTES.Explore as any);
          }
          break;
      }
    },
    [router]
  );

  return {
    theme,
    styles: styles as ReturnType<typeof styleSheet>,
    banners,
    loading,
    flatListRef,
    resetAutoScroll,
    handleMomentumScrollEnd,
    handlePress
  };
};

export default useBanner;
