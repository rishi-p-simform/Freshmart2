import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';
import { View } from 'react-native';
import { Strings } from '../../constants';
import { useTheme } from '../../hooks';
import { Colors } from '../../theme';
import { Text } from '../text';
import styleSheet from './OrderStatusStyles';
import {
  OrderStatusDefaultProps,
  type OrderStatusProps,
  type OrderStatusStep
} from './OrderStatusTypes';

/**
 * Animated OrderStatus Component
 * Displays step-by-step progress tracking for order status (pending -> confirmed -> packing -> out_for_delivery -> delivered).
 * Renders icons, connecting lines, and status labels dynamically.
 *
 * @param {OrderStatusProps} props Component props.
 * @returns {React.ReactElement} OrderStatus element.
 */
const OrderStatus: React.FC<OrderStatusProps> = (props) => {
  const {
    status = 'pending',
    customStyle,
    testID = OrderStatusDefaultProps.testID
  } = {
    ...OrderStatusDefaultProps,
    ...props
  };

  const { styles, theme } = useTheme(styleSheet);

  const isCancelled = status === 'cancelled';

  const stepsConfig = [
    { key: 'pending', label: Strings.TrackOrder.orderPlaced },
    { key: 'confirmed', label: Strings.TrackOrder.confirmed },
    { key: 'packing', label: Strings.TrackOrder.packing },
    {
      key: 'out_for_delivery',
      label: Strings.TrackOrder.outForDelivery,
      estTime: Strings.TrackOrder.estTime
    },
    { key: 'delivered', label: Strings.TrackOrder.delivered }
  ];

  const getStatusIndex = (st: string) => {
    switch (st) {
      case 'pending':
        return 0;
      case 'confirmed':
        return 1;
      case 'packing':
        return 2;
      case 'out_for_delivery':
      case 'shipped':
        return 3;
      case 'delivered':
        return 4;
      default:
        return 0;
    }
  };

  const currentIndex = getStatusIndex(status);

  if (isCancelled) {
    return (
      <View style={[styles.container, customStyle]} testID={testID}>
        <View style={styles.stepRow}>
          <View style={styles.indicatorContainer}>
            <View style={[styles.iconCircle, styles.cancelledCircle]}>
              <Ionicons name="close" size={14} color={Colors[theme]?.solidWhite} />
            </View>
          </View>
          <View style={styles.stepContent}>
            <Text variant="titleMedium" style={styles.cancelledText}>
              {Strings.TrackOrder.cancelled}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  const steps: OrderStatusStep[] = stepsConfig.map((step, idx) => ({
    ...step,
    isCompleted: idx < currentIndex,
    isCurrent: idx === currentIndex
  }));

  return (
    <View style={[styles.container, customStyle]} testID={testID}>
      {steps.map((step, idx) => {
        const isLast = idx === steps.length - 1;

        return (
          <View key={step.key} style={styles.stepRow}>
            <View style={styles.indicatorContainer}>
              <View
                style={[
                  styles.iconCircle,
                  step.isCompleted
                    ? styles.completedCircle
                    : step.isCurrent
                      ? styles.currentCircle
                      : styles.pendingCircle
                ]}
              >
                {step.isCompleted ? (
                  <Ionicons name="checkmark" size={14} color={Colors[theme]?.solidWhite} />
                ) : step.isCurrent ? (
                  <MaterialCommunityIcons
                    name="moped"
                    size={14}
                    color={Colors[theme]?.solidWhite}
                  />
                ) : null}
              </View>

              {!isLast && (
                <View
                  style={[
                    styles.connectingLine,
                    step.isCompleted ? styles.completedLine : styles.pendingLine
                  ]}
                />
              )}
            </View>

            <View style={styles.stepContent}>
              <Text
                variant={step.isCurrent || step.isCompleted ? 'titleSmall' : 'bodyMedium'}
                style={[
                  step.isCompleted
                    ? styles.completedText
                    : step.isCurrent
                      ? styles.currentText
                      : styles.pendingText
                ]}
              >
                {step.label}
              </Text>

              {step.isCurrent && step.estTime ? (
                <Text variant="bodySmall" style={styles.timeText}>
                  {step.estTime}
                </Text>
              ) : null}
            </View>
          </View>
        );
      })}
    </View>
  );
};

OrderStatus.displayName = 'OrderStatus';

export default OrderStatus;
