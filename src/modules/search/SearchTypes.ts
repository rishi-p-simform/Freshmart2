import type { Category, Product } from '../../types';

export interface SearchScreenProps {
  testID?: string;
}

export interface SearchHookReturnType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categories: Category[];
  selectedCategoryId: string | null;
  onSelectCategory: (id: string | null) => void;
  onBackPress: () => void;
  items: Product[];
  loading: boolean;
  loadingMore: boolean;
  refreshing: boolean;
  initialized: boolean;
  hasNext: boolean;
  onRefresh: () => void;
  onLoadMore: () => void;
}
