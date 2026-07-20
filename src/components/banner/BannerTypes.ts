import { StyleProp, ViewStyle } from 'react-native';

/**
 * Props for the Banner component
 */
export interface BannerProps {
  /** Custom style for the banner container */
  customStyle?: StyleProp<ViewStyle>;
  /** TestID for testing */
  testID?: string;
  /** Accessibility label for the banner */
  accessibilityLabel?: string;
}

export const BannerDefaultProps: Partial<BannerProps> = {
  testID: 'banner'
} as const;
