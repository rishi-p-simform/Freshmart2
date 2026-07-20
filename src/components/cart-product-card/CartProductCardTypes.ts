import { type StyleProp, type ViewStyle } from 'react-native';
import type { Product } from '../../types';

export interface CartProductCardProps {
  /** The product data to display in the cart card */
  product: Product;
  /** Optional custom styling for the container */
  customStyle?: StyleProp<ViewStyle>;
  /** Optional testID for testing */
  testID?: string;
  /** Optional accessibility label */
  accessibilityLabel?: string;
}

export const CartProductCardDefaultProps: Partial<CartProductCardProps> = {
  testID: 'cart-product-card'
} as const;
