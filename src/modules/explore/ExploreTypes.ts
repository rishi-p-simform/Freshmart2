import type { Category } from '../../types';

export interface ExploreHookReturnType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredCategories: Category[];
  loading: boolean;
  categories: Category[];
}
