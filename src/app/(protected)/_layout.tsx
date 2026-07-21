import { Stack } from 'expo-router';
import React, { type FC } from 'react';
import { useLocationPermission, useTheme } from '../../hooks';
import { Colors } from '../../theme';

/**
 * The ProtectedLayout Component
 * Defines the navigation structure for authenticated users.
 * @returns {React.ReactElement} The ProtectedLayout component.
 */
const ProtectedLayout: FC = (): React.ReactElement => {
  const { theme } = useTheme();
  useLocationPermission(true);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTintColor: Colors[theme]?.black,
        headerStyle: {
          backgroundColor: Colors[theme]?.white
        },
        headerTitleStyle: {
          color: Colors[theme]?.black
        },
        contentStyle: {
          backgroundColor: Colors[theme]?.white
        },
        navigationBarColor: Colors[theme]?.white
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="location"
        options={{
          presentation: 'formSheet',
          sheetAllowedDetents: [0.6, 0.8, 1],
          headerShown: false
        }}
      />
      <Stack.Screen
        name="search"
        options={{
          presentation: 'containedTransparentModal',
          headerShown: false
        }}
      />
      <Stack.Screen
        name="addAddress"
        options={{
          headerShown: false,
          presentation: 'fullScreenModal'
        }}
      />
      <Stack.Screen
        name="trackOrder"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  );
};

export default ProtectedLayout;
