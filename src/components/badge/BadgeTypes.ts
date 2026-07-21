import { type StyleProp, type ViewStyle } from 'react-native';

export type BadgeVariant = 'success' | 'error' | 'active' | 'warning' | 'default';

export interface BadgeProps {
  /** The text label to display in the badge */
  label: string;
  /** Variant of the badge determining colors */
  variant?: BadgeVariant;
  /** Optional custom container style */
  customStyle?: StyleProp<ViewStyle>;
  /** Optional testID */
  testID?: string;
  /** Optional accessibility label */
  accessibilityLabel?: string;
}

export const BadgeDefaultProps: Partial<BadgeProps> = {
  variant: 'default',
  testID: 'badge'
} as const;
