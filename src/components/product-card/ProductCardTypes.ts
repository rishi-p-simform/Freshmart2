import { type StyleProp, type ViewStyle } from 'react-native';
import type { Product } from '../../types';

export interface ProductCardProps {
  /** The product data to display */
  item: Product;
  /** Optional custom styling for the container */
  customStyle?: StyleProp<ViewStyle>;
  /** Optional testID for testing */
  testID?: string;
  /** Optional accessibility label */
  accessibilityLabel?: string;
}

export const ProductCardDefaultProps: Partial<ProductCardProps> = {
  testID: 'product-card'
} as const;
