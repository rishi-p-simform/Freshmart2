import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { ANIMATION_DURATION, STEPPER } from '../../constants';
import { useTheme } from '../../hooks';
import { Colors } from '../../theme';
import styleSheet from './CheckoutStepperStyles';
import {
  CheckoutStepperDefaultProps,
  type CheckoutStep,
  type CheckoutStepperProps
} from './CheckoutStepperTypes';

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Returns 'done' | 'active' | 'pending' for a given step index (1-based). */
const stepState = (stepIndex: number, currentStep: CheckoutStep): 'done' | 'active' | 'pending' => {
  if (stepIndex < currentStep) return 'done';
  if (stepIndex === currentStep) return 'active';
  return 'pending';
};

// ─── Animated Connector ──────────────────────────────────────────────────────

interface ConnectorProps {
  filled: boolean;
  fillColor: string;
  styles: ReturnType<typeof styleSheet>;
}

const AnimatedConnector: React.FC<ConnectorProps> = ({ filled, fillColor, styles }) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(filled ? 1 : 0, { duration: ANIMATION_DURATION.NORMAL });
  }, [filled, progress]);

  const animatedFill = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
    backgroundColor: fillColor
  }));

  return (
    <View style={styles.connectorWrapper}>
      <Animated.View style={[styles.connectorFill, animatedFill]} />
    </View>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────

/**
 * CheckoutStepper
 * An animated 3-step progress indicator for the checkout flow.
 * Steps: 1 (Checkout), 2 (Payment), 3 (Confirmation/Complete).
 *
 * @param {CheckoutStepperProps} props - The component props.
 * @returns {React.ReactElement} The CheckoutStepper component.
 */
const CheckoutStepper: React.FC<CheckoutStepperProps> = (props) => {
  const { currentStep, customStyle, testID, accessibilityLabel } = {
    ...CheckoutStepperDefaultProps,
    ...props
  };

  const { styles, theme } = useTheme(styleSheet);
  const whiteColor = Colors[theme]?.white;
  const primaryColor = Colors[theme]?.primary;

  const steps: CheckoutStep[] = [1, 2, 3];

  return (
    <View
      style={[styles.container, customStyle]}
      testID={testID}
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel ?? `Step ${currentStep} of ${STEPPER.MAX_STEP}`}
      accessibilityValue={{ min: STEPPER.MIN_STEP, max: STEPPER.MAX_STEP, now: currentStep }}
    >
      {/* Background Connectors */}
      <View style={styles.connectorsContainer}>
        {steps.slice(0, -1).map((step) => (
          <AnimatedConnector
            key={`connector-${step}`}
            filled={currentStep > step}
            fillColor={primaryColor}
            styles={styles}
          />
        ))}
      </View>

      {/* Foreground Step Circles */}
      <View style={styles.circlesContainer}>
        {steps.map((step) => {
          const state = stepState(step, currentStep);
          const circleStyle = [
            styles.circle,
            state === 'done' && styles.circleDone,
            state === 'active' && styles.circleActive,
            state === 'pending' && styles.circlePending
          ];

          return (
            <View key={`circle-${step}`} style={circleStyle}>
              {state === 'done' ? (
                <Ionicons name="checkmark" size={14} color={whiteColor} />
              ) : (
                <Text style={[styles.stepNumber, state === 'active' && styles.stepNumberActive]}>
                  {step}
                </Text>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

CheckoutStepper.displayName = 'CheckoutStepper';
export default CheckoutStepper;
