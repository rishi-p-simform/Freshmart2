import type { StyleProp, ViewStyle } from 'react-native';
import type { Order } from '../../types';

export interface ConfirmationRouteParams {
  id?: string;
}

export interface ConfirmationScreenProps {
  customStyle?: StyleProp<ViewStyle>;
}

export interface ConfirmationHookReturnType {
  id?: string;
  order: Order | null;
  loading: boolean;
  totalQuantity: number;
  totalAmount: number;
  formattedOrderId: string;
  handleTrackOrder: () => void;
  handleContinueShopping: () => void;
}
