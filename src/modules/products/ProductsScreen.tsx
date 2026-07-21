import { fontSizeStyles } from '@/src/components/text/TextStyles';
import { Stack } from 'expo-router';
import React, { type FC } from 'react';
import { View } from 'react-native';
import { CustomHeader, ProductsListItems } from '../../components';
import { useTheme } from '../../hooks';
import styleSheet from './ProductsStyles';
import type { ProductsScreenProps } from './ProductsTypes';
import useProducts from './useProducts';

/**
 * ProductsScreen component
 * Displays the category products screen container.
 * Business logic is encapsulated in the useProducts custom hook.
 *
 * @param {ProductsScreenProps} props - The component props containing id and slug.
 * @returns {React.ReactElement} The ProductsScreen component.
 */
const ProductsScreen: FC<ProductsScreenProps> = (props) => {
  const { styles } = useTheme(styleSheet);
  const { title, listKey, filters, rightActions } = useProducts(props);

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
          )
        }}
      />
      <ProductsListItems listKey={listKey} filters={filters} showSearch={true} />
    </View>
  );
};

ProductsScreen.displayName = 'ProductsScreen';
export default ProductsScreen;
