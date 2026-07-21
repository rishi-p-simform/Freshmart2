import { Colors } from '@/src/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks';
import { ROUTES, Strings } from '../../constants';
import ItemCounter from '../item-counter';
import { Text } from '../text';
import styleSheet from './ProductCardStyles';
import { ProductCardDefaultProps, type ProductCardProps } from './ProductCardTypes';

/**
 * ProductCard Component
 * Displays individual product details including image, name, rating, price, and counter.
 * Clicking on the product navigates to the Details screen.
 *
 * @param {ProductCardProps} props - The component props.
 * @returns {React.ReactElement} The ProductCard component.
 */
const ProductCard: React.FC<ProductCardProps> = (props) => {
  const { item, customStyle, testID, accessibilityLabel } = {
    ...ProductCardDefaultProps,
    ...props
  };

  const { styles, theme } = useTheme(styleSheet);
  const router = useRouter();

  // Consistent rating
  const rating = 4.5;

  const handlePress = () => {
    router.navigate({
      pathname: ROUTES.DetailsProduct as any,
      params: { id: item.id }
    });
  };

  return (
    <View style={[styles.container, customStyle]} testID={testID}>
      <TouchableOpacity
        style={styles.navSec}
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel || `View details for ${item.name}`}
        accessibilityHint="Navigates to product details screen"
      >
        {item.images && item.images.length > 0 ? (
          <Image source={{ uri: item.images[0] }} style={styles.imageStyle} resizeMode="cover" />
        ) : (
          <View style={[styles.imageStyle, { justifyContent: 'center', alignItems: 'center' }]}>
            <Text variant="bodySmall">{Strings.Products.noImage}</Text>
          </View>
        )}
        <View>
          <Text variant="titleSmall" numberOfLines={2} style={styles.productNameText}>
            {item.name}
          </Text>
          <View style={styles.ratingRow}>
            <Text variant="bodySmall" style={styles.secondaryText}>
              {item.unit} • {rating}
            </Text>
            <Ionicons name="star" color={Colors[theme].palette.gray[400]} size={12} />
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.priceRow}>
        <Text variant="titleSmall" style={styles.price}>
          ₹{Math.round(item.price)}
        </Text>
        <ItemCounter product={item} />
      </View>
    </View>
  );
};

ProductCard.displayName = 'ProductCard';
export default ProductCard;
