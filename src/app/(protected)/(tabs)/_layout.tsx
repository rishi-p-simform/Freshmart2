import { Tabs } from 'expo-router';
import React, { type FC } from 'react';
import { CustomTabBar } from '../../../components';
import { useTheme } from '../../../hooks';
import { Colors, scale } from '../../../theme';

/**
 * The TabsLayout Component
 * Defines the tab navigation structure for authenticated users.
 * Uses a CustomTabBar component to render the bottom tab bar.
 * @returns {React.ReactElement} The TabsLayout component.
 */
const TabsLayout: FC = (): React.ReactElement => {
  const { theme } = useTheme();

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerTintColor: Colors[theme]?.black,
        headerStyle: {
          backgroundColor: Colors[theme]?.white
        },
        headerTitleStyle: {
          color: Colors[theme]?.black,
          fontSize: scale(18)
        }
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: 'Home',
          headerTitle: 'Home'
        }}
      />
      <Tabs.Screen
        name="explore/index"
        options={{
          title: 'Explore',
          headerTitle: 'Explore'
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          headerTitle: 'Cart',
          headerShown: false,
          tabBarStyle: { display: 'none' }
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Account',
          headerTitle: 'Account',
          headerShown: false
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
