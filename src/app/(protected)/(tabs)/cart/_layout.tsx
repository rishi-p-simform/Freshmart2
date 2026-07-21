import { Stack } from 'expo-router';
import React, { type FC } from 'react';
import { useTheme } from '../../../../hooks';
import { Colors, scale } from '../../../../theme';

/**
 * CartStackLayout
 * Defines a nested Stack navigator for the Cart tab.
 * Includes Cart (index) and Checkout screens as stack routes.
 * The header is hidden at this level — each screen manages its own header via CustomHeader.
 *
 * @returns {React.ReactElement} The CartStackLayout component.
 */
const CartStackLayout: FC = (): React.ReactElement => {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: Colors[theme]?.background
        },
        headerStyle: {
          backgroundColor: Colors[theme]?.surface
        },
        headerTintColor: Colors[theme]?.text,
        headerTitleStyle: {
          fontSize: scale(17),
          fontWeight: '700',
          color: Colors[theme]?.text
        },
        navigationBarColor: Colors[theme]?.surface
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="checkout" />
      <Stack.Screen name="payment" />
      <Stack.Screen name="confirmation" />
    </Stack>
  );
};

export default CartStackLayout;
