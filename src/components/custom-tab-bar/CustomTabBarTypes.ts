import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

export interface TabConfig {
  name: string; // The route name (e.g. 'home/index')
  label: string;
  activeIcon: 'home' | 'grid' | 'cart' | 'person';
  inactiveIcon: 'home-outline' | 'grid-outline' | 'cart-outline' | 'person-outline';
  badgeKey?: 'cart'; // Add key name for resolving dynamic badge values
}

export type CustomTabBarProps = BottomTabBarProps;
