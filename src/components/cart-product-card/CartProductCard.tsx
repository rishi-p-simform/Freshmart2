import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { useTheme, useCart } from '../../hooks';
import { Colors } from '../../theme';
import ItemCounter from '../item-counter';
import { Text } from '../text';
import styleSheet from './CartProductCardStyles';
import { CartProductCardDefaultProps, type CartProductCardProps } from './CartProductCardTypes';

/**
 * CartProductCard Component
 * Displays product details in the cart, incorporating the ItemCounter and a trash action.
 *
 * @param {CartProductCardProps} props - The component props.
 * @returns {React.ReactElement} The CartProductCard component.
 */
const CartProductCard: React.FC<CartProductCardProps> = (props) => {
  const {
    product,
    customStyle,
    testID,
    accessibilityLabel,
  } = { ...CartProductCardDefaultProps, ...props };

  const { styles, theme } = useTheme(styleSheet);
  const { removeFromCart } = useCart();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (deleting) return;
    setDeleting(true);
    try {
      await removeFromCart(product.id);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <View style={[styles.card, customStyle]} testID={testID}>
      {product.images && product.images.length > 0 ? (
        <Image
          source={{ uri: product.images[0] }}
          style={styles.imageStyle}
          contentFit="cover"
          transition={200}
        />
      ) : (
        <View style={styles.imageStyle} />
      )}

      <View style={styles.textSection}>
        <Text
          variant="titleSmall"
          numberOfLines={2}
          style={styles.productName}
        >
          {product.name}
        </Text>
        <Text
          variant="caption"
          style={styles.unitText}
        >
          {product.unit}
        </Text>
        <Text
          variant="titleSmall"
          style={styles.priceText}
        >
          ₹{Math.round(product.price)}
        </Text>
      </View>

      <View style={styles.rightSection}>
        <ItemCounter product={product} />
        <TouchableOpacity
          style={styles.transIcon}
          onPress={handleDelete}
          disabled={deleting}
          accessibilityRole="button"
          accessibilityLabel={accessibilityLabel || `Remove ${product.name} from cart`}
          accessibilityHint="Removes item entirely from cart"
          testID={`${testID}-remove-btn`}
        >
          {deleting ? (
            <ActivityIndicator size={14} color={Colors[theme]?.error} />
          ) : (
            <Ionicons
              name="trash-outline"
              color={Colors[theme]?.error}
              size={14}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

CartProductCard.displayName = 'CartProductCard';
export default CartProductCard;

