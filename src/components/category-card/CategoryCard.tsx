import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable } from 'react-native';
import { useTheme } from '../../hooks';
import { ROUTES } from '../../constants';
import { Text } from '../text';
import styleSheet from './CategoryCardStyles';
import { CategoryCardDefaultProps, CategoryCardProps } from './CategoryCardTypes';

/**
 * CategoryCard
 * A reusable UI component that displays a category icon and name.
 * Pressing the card navigates to the products screen for the given category.
 *
 * @param {CategoryCardProps} props - The props for the CategoryCard component.
 * @returns {React.ReactElement} The CategoryCard component.
 */
const CategoryCard: React.FC<CategoryCardProps> = (props) => {
  const { id, image_url, title, slug, customStyle, testID, accessibilityLabel } = {
    ...CategoryCardDefaultProps,
    ...props
  };

  const { styles } = useTheme(styleSheet);
  const router = useRouter();

  const handlePress = () => {
    router.navigate({
      pathname: ROUTES.ProductDetails,
      params: {
        slug,
        id
      }
    });
  };

  return (
    <Pressable
      style={[styles.container, customStyle]}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || `Category ${title}`}
      accessibilityHint={`Navigates to products in ${title}`}
      testID={testID}
    >
      <Image source={{ uri: image_url }} style={styles.imageStyle} resizeMode="cover" />

      <Text
        numberOfLines={2}
        ellipsizeMode="tail"
        variant="labelSmall"
        style={[styles.textStyle, styles.textColor]}
      >
        {title}
      </Text>
    </Pressable>
  );
};

CategoryCard.displayName = 'CategoryCard';
export default CategoryCard;
