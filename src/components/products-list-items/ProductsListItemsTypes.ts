import { type StyleProp, type ViewStyle } from 'react-native';
import type { ProductFilters } from '../../types';

export interface ProductsListItemsProps {
  /** Uniquely identifies this product list (usually category ID) */
  listKey: string;
  /** Filters to apply to the API call (e.g. category_id) */
  filters: ProductFilters;
  /** Whether to show the local search input bar */
  showSearch?: boolean;
  /** Optional custom styling for the container */
  customStyle?: StyleProp<ViewStyle>;
  /** Optional testID for testing */
  testID?: string;
  /** Optional accessibility label */
  accessibilityLabel?: string;
  /** Whether scrolling is enabled on the FlatList */
  scrollEnabled?: boolean;
}

export const ProductsListItemsDefaultProps: Partial<ProductsListItemsProps> = {
  testID: 'products-list-items',
  showSearch: false,
  scrollEnabled: true
} as const;
