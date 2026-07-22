import type { StyleProp, ViewStyle } from 'react-native';
import type { Order } from '../../types';

export interface OrderCardProps {
  /** Order details object */
  order: Order;
  /** Async callback triggered when user taps Reorder */
  onReorder: () => Promise<any>;
  /** Optional custom container style */
  customStyle?: StyleProp<ViewStyle>;
  /** Optional testID */
  testID?: string;
  /** Optional accessibility label */
  accessibilityLabel?: string;
}

export const OrderCardDefaultProps: Partial<OrderCardProps> = {
  testID: 'order-card'
} as const;
