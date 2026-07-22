import type { StyleProp, ViewStyle } from 'react-native';
import type { OrderStatus } from '../../types';

export interface OrderStatusStep {
  key: string;
  label: string;
  isCompleted: boolean;
  isCurrent: boolean;
  estTime?: string;
  estimatedTime?: string;
  iconName?: string;
}

export interface OrderStatusProps {
  /** The current order status string (e.g. 'pending', 'confirmed', 'packing', 'out_for_delivery', 'delivered', 'cancelled') */
  status?: OrderStatus | string;
  /** Optional custom container style */
  customStyle?: StyleProp<ViewStyle>;
  /** Optional testID */
  testID?: string;
}

export const OrderStatusDefaultProps: Partial<OrderStatusProps> = {
  testID: 'order-status'
} as const;
