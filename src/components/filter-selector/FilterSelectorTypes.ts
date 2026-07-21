import type { ViewStyle } from 'react-native';

export interface FilterOptionItem {
  id: string;
  name: string;
}

export interface FilterSelectorProps {
  options?: FilterOptionItem[];
  selectedCategoryId: string | null;
  onSelectCategory: (id: string | null) => void;
  customStyle?: ViewStyle;
  testID?: string;
}
