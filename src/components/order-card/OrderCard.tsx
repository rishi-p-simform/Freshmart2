import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { ROUTES } from '../../constants';
import { useTheme } from '../../hooks';
import { Colors } from '../../theme';
import Badge from '../badge';
import { Text } from '../text';
import styleSheet from './OrderCardStyles';
import { OrderCardDefaultProps, type OrderCardProps } from './OrderCardTypes';

/**
 * OrderCard Component
 * Renders an order summary card displaying ID, status, date, product summary, price, and a Reorder button.
 * Uses Text from components and proper theme integration.
 *
 * @param {OrderCardProps} props - Props for OrderCard component.
 * @returns {JSX.Element} The rendered OrderCard component.
 */
const OrderCard: React.FC<OrderCardProps> = (props) => {
  const {
    order,
    onReorder,
    customStyle,
    testID = OrderCardDefaultProps.testID,
    accessibilityLabel
  } = {
    ...OrderCardDefaultProps,
    ...props
  };

  const router = useRouter();
  const { styles, theme } = useTheme(styleSheet);
  const [reordering, setReordering] = useState(false);

  const orderIdPrefix = order.id ? order.id.slice(0, 8).toUpperCase() : '';

  return (
    <TouchableOpacity
      style={[styles.card, customStyle]}
      activeOpacity={0.7}
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || `Order #${orderIdPrefix}, status ${order.status}`}
      onPress={() => {
        router.push({
          pathname: ROUTES.TrackOrder,
          params: { id: order.id }
        });
      }}
    >
      <View style={styles.header}>
        <Text variant="titleMedium" style={styles.title}>
          #{orderIdPrefix}
        </Text>

        <Badge
          label={order.status}
          variant={
            order.status === 'delivered'
              ? 'success'
              : order.status === 'cancelled'
                ? 'error'
                : 'active'
          }
        />
      </View>

      <Text numberOfLines={1} variant="bodySmall" style={styles.secondaryText}>
        {new Date(order.created_at).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short'
        })}
        {' • '}
        {order.order_items?.[0]?.product_name || 'Item'}
        {order.order_items && order.order_items.length > 1
          ? ` +${order.order_items.length - 1}`
          : ''}
      </Text>

      <View style={styles.bottom}>
        <Text variant="titleMedium" style={styles.title}>
          ₹{order.total}
        </Text>

        <TouchableOpacity
          style={[styles.reorderBtn, reordering && styles.reorderBtnDisabled]}
          activeOpacity={0.7}
          disabled={reordering}
          accessibilityRole="button"
          accessibilityLabel="Reorder items"
          onPress={async (e) => {
            e.stopPropagation();
            try {
              setReordering(true);
              await onReorder();
              router.navigate(ROUTES.Cart);
            } finally {
              setReordering(false);
            }
          }}
        >
          {reordering ? (
            <ActivityIndicator size="small" color={Colors[theme]?.primary} />
          ) : (
            <Text variant="labelMedium" style={styles.primaryText}>
              Reorder
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

OrderCard.displayName = 'OrderCard';

export default OrderCard;
