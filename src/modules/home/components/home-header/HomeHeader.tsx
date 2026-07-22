import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomInput from '../../../../components/custom-input/CustomInput';
import { Text } from '../../../../components/text';
import { useTheme } from '../../../../hooks';
import { ANIMATION_DURATION } from '../../../../constants';
import { Colors, scale } from '../../../../theme';
import { CartSelectors } from '../../../../redux/cart';
import { useAppSelector } from '../../../../redux/useRedux';
import styleSheet from './HomeHeaderStyles';
import { HomeHeaderDefaultProps, type HomeHeaderProps } from './HomeHeaderTypes';
import useHomeHeader from './useHomeHeader';

/**
 * HomeHeader Component
 * Displays the location, cart, and search bar with fluid animations.
 * @param {HomeHeaderProps} props - Component props.
 * @returns {React.ReactElement} The rendered component.
 */
const HomeHeader: React.FC<HomeHeaderProps> = (props) => {
  const { customStyle, testID } = { ...HomeHeaderDefaultProps, ...props };
  const { styles, theme } = useTheme(styleSheet);
  const { displayAddress, onLocationPress, searchQuery, setSearchQuery } = useHomeHeader();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const cartItemCount = useAppSelector(CartSelectors.getCartItemCount);

  // Animation values
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-20);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: ANIMATION_DURATION.NORMAL });
    translateY.value = withSpring(0, { damping: 12, stiffness: 90 });
  }, [opacity, translateY]);

  const containerStyle = useMemo(
    () => StyleSheet.flatten([styles.container, { paddingTop: insets.top }, customStyle]),
    [styles.container, insets.top, customStyle]
  );

  return (
    <LinearGradient
      colors={Colors[theme]?.gradients.primary}
      style={containerStyle}
      testID={testID}
      start={{ x: 0.32, y: 0.03 }}
      end={{ x: 0.68, y: 0.97 }}
    >
      <View style={styles.topRow}>
        <Pressable
          style={styles.locationSection}
          onPress={onLocationPress}
          accessibilityRole="button"
          accessibilityLabel="Set Location"
        >
          <View style={styles.locationPinContainer}>
            <Ionicons name="location" size={scale(24)} color={Colors[theme]?.orange} />
          </View>
          <View style={styles.textContainer}>
            <Text variant="bodySmall" style={styles.deliverToText}>
              Deliver to
            </Text>
            <View style={styles.addressRow}>
              <Text variant="headlineSmall" style={styles.addressText} numberOfLines={1}>
                {displayAddress}
              </Text>
              <Ionicons name="caret-down" size={scale(12)} color={Colors[theme]?.solidWhite} />
            </View>
          </View>
        </Pressable>

        <Pressable
          style={styles.cartIconContainer}
          onPress={() => router.push('/cart')}
          accessibilityRole="button"
          accessibilityLabel="Cart"
        >
          <Ionicons name="cart" size={scale(24)} color={Colors[theme]?.solidWhite} />
          {cartItemCount > 0 && (
            <View style={styles.badge}>
              <Text variant="captionBold" style={styles.badgeText}>
                {cartItemCount}
              </Text>
            </View>
          )}
        </Pressable>
      </View>

      <Pressable onPress={() => router.push('/search')}>
        <View pointerEvents="none">
          <CustomInput
            leftIcon="search"
            iconColor={Colors[theme]?.solidWhite}
            placeholder="Search groceries..."
            placeholderTextColor={Colors[theme]?.alpha(Colors[theme]?.solidWhite, 0.5)}
            value={searchQuery}
            onChangeText={setSearchQuery}
            accessibilityRole="search"
            accessibilityLabel="Search groceries"
            containerStyle={styles.searchContainer}
          />
        </View>
      </Pressable>
    </LinearGradient>
  );
};

HomeHeader.displayName = 'HomeHeader';

export default HomeHeader;
