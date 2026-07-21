import type { StyleProp, ViewStyle } from 'react-native';

/** The steps available in the checkout flow */
export type CheckoutStep = 1 | 2 | 3;

/**
 * Props for the CheckoutStepper component.
 */
export interface CheckoutStepperProps {
  /** The currently active step in the checkout flow (1 = Cart, 2 = Checkout, 3 = Payment) */
  currentStep: CheckoutStep;
  /** Optional labels to override the default step labels */
  stepLabels?: [string, string, string];
  /** Optional custom style for the root container */
  customStyle?: StyleProp<ViewStyle>;
  /** Test ID for automated testing */
  testID?: string;
  /** Accessibility label for screen readers */
  accessibilityLabel?: string;
}

export const CheckoutStepperDefaultProps: Partial<CheckoutStepperProps> = {
  currentStep: 1,
  stepLabels: ['Cart', 'Checkout', 'Payment'],
  testID: 'checkout-stepper'
} as const;
