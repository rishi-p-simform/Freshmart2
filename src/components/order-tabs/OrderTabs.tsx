import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks';
import { Text } from '../text';
import styleSheet from './OrderTabsStyles';
import { OrderTabsDefaultProps, type OrderTabsProps } from './OrderTabsTypes';

/**
 * OrderTabs Component
 * Horizontal filter tabs for filtering orders (All, Active, Delivered, Cancelled).
 * Uses Text component from components.
 *
 * @param {OrderTabsProps} props - Props for OrderTabs component.
 * @returns {JSX.Element} The rendered OrderTabs component.
 */
const OrderTabs: React.FC<OrderTabsProps> = (props) => {
  const {
    tabs,
    selected,
    onChange,
    customStyle,
    testID = OrderTabsDefaultProps.testID
  } = {
    ...OrderTabsDefaultProps,
    ...props
  };

  const { styles } = useTheme(styleSheet);

  return (
    <View style={[styles.container, customStyle]} testID={testID}>
      {tabs.map((tab) => {
        const active = selected === tab.id;

        return (
          <TouchableOpacity
            key={tab.id}
            activeOpacity={0.8}
            style={[styles.tab, active && styles.activeTab]}
            onPress={() => onChange(tab.id)}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            accessibilityLabel={`${tab.title} tab`}
          >
            <Text
              variant={active ? 'titleSmall' : 'bodyMedium'}
              style={[styles.text, active && styles.activeText]}
            >
              {tab.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

OrderTabs.displayName = 'OrderTabs';

export default OrderTabs;
