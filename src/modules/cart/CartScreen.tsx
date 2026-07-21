import { Ionicons } from '@expo/vector-icons';
import { Stack, useNavigation, useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInRight,
  FadeInUp,
  FadeOutLeft,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { CartProductCard, CustomButton, CustomHeader, Text } from '../../components';
import { Strings } from '../../constants';
import { useCart, useTheme } from '../../hooks';
import { Colors } from '../../theme';
import styleSheet from './CartStyles';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

/**
 * The CartScreen component.
 * Displays list of items in the cart, delivery progress bar, coupons, and order summary.
 *
 * @returns {React.ReactElement} A React element.
 */
const CartScreen: React.FC = (): React.ReactElement => {
  const router = useRouter();
  const navigation = useNavigation();
  const { styles, theme } = useTheme(styleSheet);

  const { items, subtotal, itemCount, fetchCart } = useCart();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchCart();
    } finally {
      setRefreshing(false);
    }
  }, [fetchCart]);

  // Calculate total MRP to display discount details
  const totalMrp = useMemo(() => {
    return items.reduce((total, item) => {
      return total + (item.product?.mrp || item.product?.price || 0) * item.quantity;
    }, 0);
  }, [items]);

  const discount = Math.max(0, totalMrp - subtotal);
  const deliveryFee = subtotal >= 500 ? 0 : 49;
  const totalToPay = subtotal + deliveryFee;
  const progressPercent = Math.min((subtotal / 500) * 100, 100);

  // Animated progress bar width
  const progressWidth = useSharedValue(0);
  useEffect(() => {
    progressWidth.value = withTiming(progressPercent, { duration: 600 });
  }, [progressPercent, progressWidth]);

  const animatedProgressStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`
  }));

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => (
            <CustomHeader
              title={Strings.Cart.title}
              leftActions={[
                {
                  icon: <Ionicons name="arrow-back" size={24} color={Colors[theme]?.text} />,
                  onPress: () => {
                    if (navigation.canGoBack()) {
                      navigation.goBack();
                    } else {
                      router.replace('/(protected)/(tabs)/home');
                    }
                  }
                }
              ]}
              rightActions={[
                {
                  icon: (
                    <Text
                      variant="labelMedium"
                      style={{ color: Colors[theme]?.palette.gray[500], marginRight: 8 }}
                    >
                      {itemCount} {itemCount === 1 ? Strings.Products.item : Strings.Products.items}
                    </Text>
                  )
                }
              ]}
            />
          )
        }}
      />

      {itemCount === 0 ? (
        <View style={styles.emptyContainer}>
          <Animated.View entering={FadeIn.duration(500)} style={styles.emptyIcon}>
            <LottieView
              source={require('../../assets/lotties/empty.json')}
              style={{ width: '100%', height: '100%' }}
              autoPlay
              loop
            />
          </Animated.View>
          <Animated.View entering={FadeInUp.delay(300).duration(500)}>
            <Text variant="headlineSmall" style={styles.emptyTitle}>
              {Strings.Cart.emptyTitle}
            </Text>
          </Animated.View>
          <Animated.View entering={FadeInUp.delay(450).duration(500)}>
            <Text variant="bodyMedium" style={styles.emptyDescription}>
              {Strings.Cart.emptyDescription}
            </Text>
          </Animated.View>
          <Animated.View entering={FadeInUp.delay(600).duration(500)} style={{ width: '100%' }}>
            <CustomButton
              title={Strings.Cart.startShopping}
              onPress={() => router.replace('/(protected)/(tabs)/home')}
              style={styles.shopButton}
            />
          </Animated.View>
        </View>
      ) : (
        <AnimatedScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardDismissMode="interactive"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors[theme]?.primary}
              colors={[Colors[theme]?.primary || '#3B82F6']}
            />
          }
        >
          <Animated.View style={styles.mainContentContainer}>
            {/* Free Delivery Banner */}
            <Animated.View
              entering={FadeInDown.duration(400).springify()}
              style={styles.freeDeliverySection}
            >
              <Text style={styles.truckIcon}>🚚</Text>
              <View style={styles.freeDeliveryRight}>
                <Text variant="labelMedium" style={styles.freeDeliveryText}>
                  {subtotal < 500
                    ? `Add ₹${500 - subtotal} more for FREE delivery!`
                    : 'You unlocked Free delivery!'}
                </Text>
                <View style={styles.progressBar}>
                  <Animated.View style={[styles.progressedBar, animatedProgressStyle]} />
                </View>
              </View>
            </Animated.View>

            {/* Cart Items List */}
            <Animated.View
              style={styles.itemsContainer}
              layout={LinearTransition.springify().damping(18).stiffness(120)}
            >
              {items.map((item, index) => (
                <Animated.View
                  key={item.product?.id || item.id}
                  entering={FadeInRight.delay(index * 80)
                    .duration(350)
                    .springify()}
                  exiting={FadeOutLeft.duration(300)}
                  layout={LinearTransition.springify().damping(18).stiffness(120)}
                >
                  <CartProductCard product={item.product} />
                </Animated.View>
              ))}
            </Animated.View>
          </Animated.View>
          {/* Coupon & Summary Footer */}
          <Animated.View
            entering={FadeInUp.delay(200).duration(400)}
            style={styles.checkoutSection}
          >
            {/* Coupon Code Section */}
            <View style={styles.couponSection}>
              <Text style={styles.percentIcon}>%</Text>
              <Text variant="bodyMedium" style={styles.couponTitle}>
                {Strings.Cart.applyCoupon}
              </Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text variant="labelLarge" style={styles.couponApplyText}>
                  {Strings.Cart.apply}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Order Summary Calculations */}
            <View style={styles.summarySection}>
              <View style={styles.priceRow}>
                <Text variant="bodyMedium" style={styles.rowLabel}>
                  {Strings.Cart.subtotalMrp}
                </Text>
                <Text variant="bodyMedium" style={styles.rowValue}>
                  ₹{totalMrp}
                </Text>
              </View>

              <View style={styles.priceRow}>
                <Text variant="bodyMedium" style={styles.rowLabel}>
                  {Strings.Cart.delivery}
                </Text>
                {deliveryFee === 0 ? (
                  <Text
                    variant="bodyMedium"
                    style={[styles.rowValue, { color: Colors[theme]?.green }]}
                  >
                    {Strings.Cart.free}
                  </Text>
                ) : (
                  <Text variant="bodyMedium" style={styles.rowValue}>
                    ₹{deliveryFee}
                  </Text>
                )}
              </View>

              {discount > 0 && (
                <View style={styles.priceRow}>
                  <Text variant="bodyMedium" style={styles.rowLabel}>
                    {Strings.Cart.discount}
                  </Text>
                  <Text variant="bodyMedium" style={styles.discountValue}>
                    -₹{discount}
                  </Text>
                </View>
              )}

              <View style={styles.divider} />

              <View style={styles.priceRow}>
                <Text variant="titleMedium" style={styles.totalLabel}>
                  {Strings.Cart.total}
                </Text>
                <Text variant="titleLarge" style={styles.totalValue}>
                  ₹{totalToPay}
                </Text>
              </View>
            </View>

            {/* Checkout Button */}
            <CustomButton
              title={Strings.Cart.proceedToCheckout}
              onPress={() => {
                router.navigate('/(protected)/(tabs)/cart/checkout');
              }}
              style={styles.checkoutButton}
            />
          </Animated.View>
        </AnimatedScrollView>
      )}
    </View>
  );
};

export default CartScreen;
