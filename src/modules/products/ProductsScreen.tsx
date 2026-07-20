import { fontSizeStyles } from '@/src/components/text/TextStyles';
import { Stack } from 'expo-router';
import React, { type FC, useMemo } from 'react';
import { View } from 'react-native';
import { CustomHeader, ProductsListItems, Text } from '../../components';
import { Strings } from '../../constants';
import { useTheme } from '../../hooks';
import { useProduct } from '../../redux/products/useProduct';
import { Colors, scale } from '../../theme';
import styleSheet from './ProductsStyles';
import type { ProductsScreenProps } from './ProductsTypes';

/**
 * ProductsScreen component
 * Displays the category products screen container.
 *
 * @param {ProductsScreenProps} props - The component props containing id and slug.
 * @returns {React.ReactElement} The ProductsScreen component.
 */
const ProductsScreen: FC<ProductsScreenProps> = (props) => {
  const { id, slug } = props;
  const { styles, theme } = useTheme(styleSheet);
  const { items } = useProduct(id);

  // Derive a user-friendly title from the slug, e.g., "fresh-vegetables" -> "Fresh Vegetables"
  const title = slug
    ? slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    : Strings.Products.productsTitle;

  const filters = useMemo(() => {
    return id === 'bestSellers' ? { featured: true } : { category_id: id };
  }, [id]);

  const itemCountLabel = items?.length === 1 ? Strings.Products.item : Strings.Products.items;
  const countText = `${items?.length || 0} ${itemCountLabel}`;

  const rightActions = [
    {
      icon: (
        <View style={{
          backgroundColor: Colors[theme].alpha(Colors[theme].solidWhite, 0.18),
          paddingHorizontal: scale(8),
          paddingVertical: scale(8),
          borderRadius: scale(7),
        }}>
          <Text variant="labelSmall" style={{ color: '#FFFFFF', fontWeight: '700' }}>
            {countText}
          </Text>
        </View>
      ),
    }
  ];

  return (
    <View style={styles.screen}>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => (
            <CustomHeader
              title={title}
              showGradientBG
              titleStyle={{ ...fontSizeStyles.displayXS }}
              rightActions={rightActions}
            />
          ),
        }}
      />
      <ProductsListItems listKey={id} filters={filters} showSearch={true} />
    </View>
  );
};

ProductsScreen.displayName = 'ProductsScreen';
export default ProductsScreen;
