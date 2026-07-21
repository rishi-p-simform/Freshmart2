import { Feather, Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { type FC } from 'react';
import { ActivityIndicator, ScrollView, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomButton, ItemCounter, Text } from '../../../components';
import { Strings } from '../../../constants';
import { useTheme } from '../../../hooks';
import { Colors, scale } from '../../../theme';
import { styleSheet } from './DetailsProductStyles';
import type { DetailsProductScreenProps } from './DetailsProductTypes';
import { useDetailsProduct } from './useDetailsProduct';

/**
 * DetailsProductScreen component
 * Displays dynamic product details including images, price, stock status, ratings, description, and cart action.
 *
 * @param {DetailsProductScreenProps} props - Component props containing product ID.
 * @returns {React.ReactElement} The DetailsProductScreen component.
 */
const DetailsProductScreen: FC<DetailsProductScreenProps> = ({ id }) => {
  const { styles, theme } = useTheme(styleSheet);
  const insets = useSafeAreaInsets();
  const {
    data,
    loading,
    quantity,
    isFavorite,
    discountPercentage,
    reviewCount,
    ratingValue,
    actionLoading,
    handleBackPress,
    handleFavoriteToggle,
    handleAddToCartAction
  } = useDetailsProduct(id);

  if (loading || !data) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color={Colors[theme]?.primary} />
      </View>
    );
  }

  const topInset = Math.max(insets.top, scale(10));
  const bottomInset = Math.max(insets.bottom, scale(12));

  return (
    <View style={styles.screen}>
      <TouchableOpacity
        style={[styles.headerIconLeft, { top: topInset }]}
        onPress={handleBackPress}
        accessibilityRole="button"
        accessibilityLabel="Go back"
        accessibilityHint="Navigates back to the previous screen"
        testID="product-detail-back-btn"
      >
        <Feather name="arrow-left" size={scale(20)} color={Colors[theme]?.text} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.headerIconRight, { top: topInset }]}
        onPress={handleFavoriteToggle}
        accessibilityRole="button"
        accessibilityLabel={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
        testID="product-detail-wishlist-btn"
      >
        <Feather
          name="heart"
          size={scale(20)}
          color={isFavorite ? Colors[theme]?.error : Colors[theme]?.text}
        />
      </TouchableOpacity>

      <View style={styles.imageView}>
        {data.images && data.images.length > 0 ? (
          <Image
            source={{ uri: data.images[0] }}
            style={styles.image}
            contentFit="cover"
            transition={200}
          />
        ) : (
          <View style={[styles.image, styles.centeredContainer]}>
            <Text variant="bodyMedium">{Strings.Products.noImage}</Text>
          </View>
        )}

        {discountPercentage > 0 && (
          <View style={styles.discountBadge}>
            <Text variant="labelSmall" style={styles.discountText}>
              {discountPercentage}% OFF
            </Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.productTitleSection}>
            <View style={styles.productTitleView}>
              <Text variant="headlineSmall" style={styles.productName}>
                {data.name}
              </Text>
              <View style={styles.tagsRow}>
                {data.tags && data.tags.length > 0 && (
                  <Text variant="bodySmall" style={styles.secondaryText}>
                    {data.tags.join(' ')} •{' '}
                  </Text>
                )}
                <View style={styles.ratingRow}>
                  <Text variant="bodySmall" style={styles.secondaryText}>
                    {ratingValue}{' '}
                  </Text>
                  <Ionicons name="star" color={Colors[theme]?.palette.gray[400]} size={scale(12)} />
                </View>
                <Text variant="bodySmall" style={styles.secondaryText}>
                  {' '}
                  ({reviewCount}) reviews
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.stockTag,
                data.stock_quantity > 0 ? styles.inStockTag : styles.outStockTag
              ]}
            >
              <Text
                variant="labelSmall"
                style={data.stock_quantity > 0 ? styles.inStockText : styles.outStockText}
              >
                {data.stock_quantity > 0 ? 'In Stock' : 'Out Stock'}
              </Text>
            </View>
          </View>

          <View style={styles.priceRow}>
            <Text variant="headlineMedium" style={styles.priceText}>
              ₹{Math.round(data.price)}
            </Text>
            {data.mrp > data.price && (
              <Text variant="titleMedium" style={styles.mrpText}>
                ₹{Math.round(data.mrp)}
              </Text>
            )}
            <Text variant="titleSmall" style={styles.unitText}>
              /{data.unit}
            </Text>
          </View>

          <View style={styles.aboutSection}>
            <Text variant="titleMedium" style={styles.aboutTitle}>
              About
            </Text>
            <Text variant="bodyMedium" style={styles.aboutDescription}>
              {data.description}
            </Text>
          </View>
        </ScrollView>
      </View>

      <View style={[styles.addToCartSection, { paddingBottom: bottomInset }]}>
        <View style={styles.addToCartView}>
          {quantity > 0 && (
            <View style={styles.counterWrapper}>
              <ItemCounter product={data} />
            </View>
          )}
          <CustomButton
            onPress={handleAddToCartAction}
            title={quantity > 0 ? 'Go to Cart' : 'Add to Cart'}
            loading={actionLoading}
            leftIcon="cart"
            style={styles.btnContainer}
            testID="product-detail-cart-action-btn"
          />
        </View>
      </View>
    </View>
  );
};

DetailsProductScreen.displayName = 'DetailsProductScreen';
export default DetailsProductScreen;
