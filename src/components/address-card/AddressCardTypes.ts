import { StyleProp, ViewStyle } from 'react-native';

/**
 * Props for the AddressCard component
 */
export interface AddressCardProps {
  /** The name of the person */
  name: string;
  /** The label/type of the address (e.g., home, work, other) */
  label: string;
  /** The first line of the address */
  addressLine1: string;
  /** The second line of the address (city, state, pincode) */
  addressLine2: string;
  /** Callback fired when the Edit button is pressed */
  onEditPress?: () => void;
  /** Callback fired when the Set Default icon is pressed */
  onSetDefaultPress?: () => void;
  /** Callback fired when the Delete icon is pressed */
  onDeletePress?: () => void;
  /** Is the default action currently loading? */
  isSettingDefault?: boolean;
  /** Is the delete action currently loading? */
  isDeleting?: boolean;
  /** Component variant layout */
  variant?: 'standard' | 'manage';
  /** Callback fired when the card is pressed */
  onPress?: () => void;
  /** Is the address currently selected or default? Used for styling (e.g. blue border) */
  isDefault?: boolean;
  /** Is the address currently selected? Applies primary border if true */
  isSelected?: boolean;
  /** Custom style for the card container */
  customStyle?: StyleProp<ViewStyle>;
  /** Test ID for the component */
  testID?: string;
  /** Accessibility label for the component */
  accessibilityLabel?: string;
}

export const AddressCardDefaultProps: Partial<AddressCardProps> = {
  testID: 'address-card',
  isDefault: false
} as const;
