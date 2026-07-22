import { StyleProp, TextInputProps, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface CustomInputProps extends TextInputProps {
  /** Optional custom outer wrapper style */
  customStyle?: StyleProp<ViewStyle>;
  /** Optional custom container style for the inner wrapper */
  containerStyle?: StyleProp<ViewStyle>;
  /** Optional custom input text style */
  inputStyle?: StyleProp<TextStyle>;
  /** Optional left icon name (from Ionicons) */
  leftIcon?: keyof typeof Ionicons.glyphMap;
  /** Optional color for the icons */
  iconColor?: string;
  /** Is it a password field? If true, right icon will toggle visibility. */
  isPassword?: boolean;
  /** Test ID for testing */
  testID?: string;
  /** Accessibility Label */
  accessibilityLabel?: string;
  /** Optional label text shown above the input */
  label?: string;
  /** Optional custom input component (defaults to React Native TextInput) */
  InputComponent?: React.ComponentType<TextInputProps>;
}

export const CustomInputDefaultProps: Partial<CustomInputProps> = {
  testID: 'custom-input',
  isPassword: false
} as const;
