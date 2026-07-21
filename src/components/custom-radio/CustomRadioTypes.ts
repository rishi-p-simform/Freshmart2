import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

/**
 * Props for the CustomRadio component.
 */
export interface CustomRadioProps {
  /** The primary label displayed in the card */
  title: string;
  /** The secondary/description text displayed below the title */
  subtitle: string;
  /** Whether this radio option is currently selected */
  selected?: boolean;
  /** Callback fired when the card is pressed */
  onPress?: () => void;
  /** Optional icon node rendered on the left side */
  leftIcon?: ReactNode;
  /** Background color for the left icon container */
  leftIconBg?: string;
  /** Optional custom style for the root container */
  customStyle?: StyleProp<ViewStyle>;
  /** Test ID for automated testing */
  testID?: string;
  /** Accessibility label for screen readers */
  accessibilityLabel?: string;
}

export const CustomRadioDefaultProps: Partial<CustomRadioProps> = {
  selected: false,
  testID: 'custom-radio'
} as const;
