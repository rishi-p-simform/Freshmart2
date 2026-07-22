import { Strings } from '../../constants';

/** Payment option item configuration */
export interface PaymentOption {
  id: number;
  value: string;
  icon: string;
  title: string;
  subtitle: string;
  color: string;
}

// cspell:disable-next-line
/** Static list of payment options */
export const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    id: 1,
    value: 'upi',
    icon: '📲',
    title: Strings.Payment.upi,
    subtitle: Strings.Payment.upiSubtitle,
    color: '#F3E8FF'
  },
  {
    id: 2,
    value: 'card',
    icon: '💳',
    title: Strings.Payment.card,
    subtitle: Strings.Payment.cardSubtitle,
    color: '#DBEAFE'
  },
  {
    id: 3,
    value: 'cod',
    icon: '💵',
    title: Strings.Payment.cod,
    subtitle: Strings.Payment.codSubtitle,
    color: '#EFF6FF'
  }
];

/** Return type for usePayment hook */
export interface PaymentHookReturnType {
  selectedPaymentId: number;
  onSelectPayment: (id: number) => void;
  selectedAddressId: string | null;
  itemCount: number;
  subtotal: number;
  totalMrp: number;
  deliveryFee: number;
  isPlacingOrder: boolean;
  handlePlaceOrder: () => Promise<void>;
  paymentOptions: PaymentOption[];
}
