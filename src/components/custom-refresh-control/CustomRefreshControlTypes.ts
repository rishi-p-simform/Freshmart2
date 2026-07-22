import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

export interface CustomRefreshControlProps {
  /** Whether the component is currently refreshing */
  refreshing: boolean;
  /** Function called when pull-down threshold is met */
  onRefresh: () => void | Promise<void>;
  /** Children content (scrollable view or content list) */
  children: ReactNode;
  /** Pull threshold distance in pixels to trigger onRefresh (default 70) */
  pullThreshold?: number;
  /** Optional container style override */
  style?: StyleProp<ViewStyle>;
  /** Optional content container style */
  contentContainerStyle?: StyleProp<ViewStyle>;
}
