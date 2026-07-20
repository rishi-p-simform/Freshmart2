import type { StyleProp, ViewStyle } from 'react-native';

/**
 * Props for the HomeHeader component.
 */
export interface HomeHeaderProps {
  /** Optional custom style for the container */
  customStyle?: StyleProp<ViewStyle>;
  /** Optional testID */
  testID?: string;
}

export const HomeHeaderDefaultProps: Partial<HomeHeaderProps> = {
  testID: 'home-header'
} as const;
