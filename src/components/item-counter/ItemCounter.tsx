import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, View, LayoutAnimation, Platform, UIManager, ActivityIndicator } from 'react-native';
import { useTheme } from '../../hooks';
import { Colors } from '../../theme';
import { Text } from '../text';
import styleSheet from './ItemCounterStyles';
import { ItemCounterDefaultProps, type ItemCounterProps } from './ItemCounterTypes';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

/**
 * ItemCounter Component
 * A reusable UI component that manages the quantity of a product with Add, Plus, and Minus actions.
 * Shows a single "+" button when quantity is 0, and increments/decrements with layout updates.
 *
 * @param {ItemCounterProps} props - Component props.
 * @returns {React.ReactElement} The ItemCounter component.
 */
const ItemCounter: React.FC<ItemCounterProps> = (props) => {
  const {
    product,
    customStyle,
    testID,
    accessibilityLabel,
  } = { ...ItemCounterDefaultProps, ...props };

  const { styles, theme } = useTheme(styleSheet);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleIncrement = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setLoading(true);
    setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setCount((prev) => prev + 1);
      setLoading(false);
    }, 300);
  };

  const handleDecrement = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setLoading(true);
    setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setCount((prev) => Math.max(0, prev - 1));
      setLoading(false);
    }, 300);
  };

  if (count === 0) {
    return (
      <Pressable
        style={[styles.button, styles.addBtn, customStyle]}
        onPress={handleIncrement}
        disabled={loading}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel || `Add ${product.name} to cart`}
        testID={`${testID}-add-btn`}
      >
        {loading ? (
          <ActivityIndicator size="small" color={Colors[theme]?.white} />
        ) : (
          <Ionicons name="add" size={14} color={Colors[theme]?.white} />
        )}
      </Pressable>
    );
  }

  return (
    <View style={[styles.container, customStyle]} testID={testID}>
      <Pressable
        style={[styles.button, styles.minusBtn]}
        onPress={handleDecrement}
        disabled={loading}
        accessibilityRole="button"
        accessibilityLabel={`Decrease quantity of ${product.name}`}
        testID={`${testID}-minus-btn`}
      >
        <Ionicons name="remove" size={14} color={Colors[theme]?.palette.gray[700]} />
      </Pressable>

      {loading ? (
        <View style={{ width: 14, height: 14, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="small" color={Colors[theme]?.orange} />
        </View>
      ) : (
        <Text
          variant="labelMedium"
          style={styles.countText}
          testID={`${testID}-count`}
        >
          {count}
        </Text>
      )}

      <Pressable
        style={[styles.button, styles.addBtn]}
        onPress={handleIncrement}
        disabled={loading}
        accessibilityRole="button"
        accessibilityLabel={`Increase quantity of ${product.name}`}
        testID={`${testID}-plus-btn`}
      >
        <Ionicons name="add" size={14} color={Colors[theme]?.white} />
      </Pressable>
    </View>
  );
};

ItemCounter.displayName = 'ItemCounter';
export default ItemCounter;
