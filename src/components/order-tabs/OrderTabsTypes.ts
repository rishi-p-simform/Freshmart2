import type { StyleProp, ViewStyle } from 'react-native';

export interface OrderTabItem {
  id: string;
  title: string;
}

export interface OrderTabsProps {
  /** Array of tab objects */
  tabs: OrderTabItem[];
  /** Currently selected tab id */
  selected: string;
  /** Callback triggered when tab selection changes */
  onChange: (value: string) => void;
  /** Optional custom container style */
  customStyle?: StyleProp<ViewStyle>;
  /** Optional testID */
  testID?: string;
}

export const OrderTabsDefaultProps: Partial<OrderTabsProps> = {
  testID: 'order-tabs'
} as const;
