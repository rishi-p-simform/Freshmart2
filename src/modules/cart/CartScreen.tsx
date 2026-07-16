import React, { type FC } from 'react';
import { Text, View } from 'react-native';
import { Strings } from '../../constants';
import { useTheme } from '../../hooks';
import styleSheet from './CartStyles';

/**
 * The CartScreen component.
 * @returns {React.ReactElement} A React element.
 */
const CartScreen: FC = (): React.ReactElement => {
  const { styles } = useTheme(styleSheet);

  return (
    <View style={styles.screenView}>
      <Text style={styles.textView}>{Strings.Cart.title}</Text>
    </View>
  );
};

export default CartScreen;
