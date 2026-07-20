import { StyleProp, ViewStyle } from 'react-native';

/**
 * Props for the CategoryCard component
 */
export interface CategoryCardProps {
  /** The unique identifier of the category */
  id: string;
  /** The URL of the category image */
  image_url: string;
  /** The display title of the category */
  title: string;
  /** The URL slug of the category */
  slug: string;
  /** Custom style for the category card container */
  customStyle?: StyleProp<ViewStyle>;
  /** Test ID for the component */
  testID?: string;
  /** Accessibility label for the component */
  accessibilityLabel?: string;
}

export const CategoryCardDefaultProps: Partial<CategoryCardProps> = {
  testID: 'category-card'
} as const;
