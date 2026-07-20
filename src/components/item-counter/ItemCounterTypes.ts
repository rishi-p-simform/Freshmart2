import { type StyleProp, type ViewStyle } from 'react-native';
import type { Product } from '../../types';

export interface ItemCounterProps {
  /** The product data */
  product: Product;
  /** Optional custom styling for the container */
  customStyle?: StyleProp<ViewStyle>;
  /** Optional testID for testing */
  testID?: string;
  /** Optional accessibility label */
  accessibilityLabel?: string;
}

export const ItemCounterDefaultProps: Partial<ItemCounterProps> = {
  testID: 'item-counter',
} as const;
