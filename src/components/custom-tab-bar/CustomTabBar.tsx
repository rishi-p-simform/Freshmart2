import { Ionicons } from '@expo/vector-icons';
import React, { type FC } from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks';
import { CartSelectors } from '../../redux/cart';
import { useAppSelector } from '../../redux/useRedux';
import { Colors, scale } from '../../theme';
import Text from '../text/Text';
import styleSheet from './CustomTabBarStyles';
import { CustomTabBarProps, TabConfig } from './CustomTabBarTypes';

// Scalable Tab Configurations
const TABS_CONFIG: TabConfig[] = [
  {
    name: 'home/index',
    label: 'Home',
    activeIcon: 'home',
    inactiveIcon: 'home-outline'
  },
  {
    name: 'explore/index',
    label: 'Explore',
    activeIcon: 'grid',
    inactiveIcon: 'grid-outline'
  },
  {
    name: 'cart',
    label: 'Cart',
    activeIcon: 'cart',
    inactiveIcon: 'cart-outline',
    badgeKey: 'cart'
  },
  {
    name: 'profile/index',
    label: 'Account',
    activeIcon: 'person',
    inactiveIcon: 'person-outline'
  }
];

/**
 * Custom bottom tab bar component.
 * Renders the tabs as per the layout requirement (top rounded corners, elegant icons and labels).
 * @param {CustomTabBarProps} props - Navigation tab bar props.
 * @returns {React.ReactElement} The CustomTabBar component.
 */
const CustomTabBar: FC<CustomTabBarProps> = (props): React.ReactElement => {
  const { state, navigation, descriptors } = props;
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const cartItemCount = useAppSelector(CartSelectors.getCartItemCount);

  const focusedRoute = state.routes[state.index];
  const focusedOptions = descriptors[focusedRoute.key]?.options;
  const tabBarStyle = focusedOptions?.tabBarStyle;

  if (tabBarStyle && (tabBarStyle as any).display === 'none') {
    return <></>;
  }

  // Custom stylesheet that takes the theme and safe-area inset
  const styles = styleSheet(theme, insets.bottom);

  // Dynamic badge infrastructure
  const dynamicBadges = {
    cart: cartItemCount
  };

  return (
    <View style={styles.container}>
      {TABS_CONFIG.map((tab, index) => {
        // Find if this tab matches the current route state
        const route = state.routes.find((r) => r.name === tab.name);
        const isFocused = state.index === state.routes.findIndex((r) => r.name === tab.name);

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route?.key || '',
            canPreventDefault: true
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(tab.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route?.key || ''
          });
        };

        const iconName = tab.activeIcon;
        const iconColor = isFocused ? Colors[theme]?.primary : Colors[theme]?.palette.gray[300];
        const textColor = isFocused ? Colors[theme]?.primary : Colors[theme]?.palette.gray[300];
        const badgeValue = tab.badgeKey ? dynamicBadges[tab.badgeKey] : 0;

        return (
          <Pressable
            key={tab.name}
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItem}
          >
            <View style={styles.iconContainer}>
              <Ionicons name={iconName} size={scale(20)} color={iconColor} />
              {badgeValue > 0 && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>{badgeValue}</Text>
                </View>
              )}
            </View>
            <Text variant="labelSmall" style={[styles.label, { color: textColor }]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default CustomTabBar;
