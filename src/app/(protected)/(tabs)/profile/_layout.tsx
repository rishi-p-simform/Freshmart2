import { Stack } from 'expo-router';
import React, { type FC } from 'react';
import { useTheme } from '../../../../hooks';
import { Colors, scale } from '../../../../theme';

/**
 * ProfileStackLayout
 * Defines a nested Stack navigator for the Profile tab.
 * Includes Profile (index) and Order History screens as stack routes.
 * The header is hidden at this level — each screen manages its own header via CustomHeader.
 *
 * @returns {React.ReactElement} The ProfileStackLayout component.
 */
const ProfileStackLayout: FC = (): React.ReactElement => {
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
      <Stack.Screen name="orders" />
    </Stack>
  );
};

export default ProfileStackLayout;
