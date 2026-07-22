import type { HeaderAction } from '../../components/custom-header/CustomHeaderTypes';
import type { ProductFilters } from '../../types';

export interface ProductsScreenProps {
  id: string;
  slug: string;
}

export interface ProductsHookReturnType {
  title: string;
  listKey: string;
  filters: ProductFilters;
  rightActions: HeaderAction[];
  itemsCount: number;
}
