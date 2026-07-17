import debounce from 'lodash/debounce';
import React from 'react';
import { Pressable, type GestureResponderEvent, View } from 'react-native';
import { useTheme } from '../../hooks';
import { Spinner } from '../spinner';
import { Text } from '../text';
import { Ionicons } from '@expo/vector-icons';
import { scale } from '../../theme/Metrics';
import {
  activityIndicatorColor,
  buttonDefaultStyles,
  buttonVariantStyles,
  getTextVariant,
  textColor
} from './CustomButtonStyles';
import type { CustomButtonProps } from './CustomButtonTypes';

/**
 * The button component.
 * @param {CustomButtonProps} props - the props for the button component.
 * @returns {React.ReactElement} A React Element.
 */
const CustomButton = ({
  variant = 'solid',
  title,
  loading = false,
  disabled,
  onPress,
  titleProps,
  debounceTime = 300,
  enableDebounce = true,
  style,
  titleStyle,
  color,
  ...rest
}: CustomButtonProps) => {
  const { styles: buttonStyles, theme } = useTheme(buttonDefaultStyles);
  const { styles: variantStyles } = useTheme(buttonVariantStyles);

  const titleVariant = titleProps?.variant ?? getTextVariant(variant);

  // Debounce the onPress function only if enableDebounce is true
  const handleOnPress = enableDebounce
    ? debounce(
        (event: GestureResponderEvent) => {
          if (onPress) {
            onPress(event);
          }
        },
        debounceTime,
        { leading: true, trailing: false }
      )
    : onPress;

  return (
    <Pressable
      style={(state) => [
        buttonStyles.defaultButtonStyle,
        variantStyles[variant],
        state.pressed && buttonStyles.pressedStyle,
        disabled && buttonStyles.disabledButtonStyle,
        typeof style === 'function' ? style(state) : style
      ]}
      disabled={loading || disabled}
      onPress={handleOnPress}
      {...rest}
    >
      {loading ? (
        <Spinner color={color || activityIndicatorColor(variant, theme)} />
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          {rest.leftIcon && (
            <Ionicons
              name={rest.leftIcon}
              size={20}
              color={color || textColor(variant, theme)}
              style={{ marginRight: scale(8) }}
            />
          )}
          <Text
            variant={titleVariant}
            {...titleProps}
            style={[{ color: color || textColor(variant, theme) }, titleStyle, titleProps?.style]}
          >
            {title}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

export default CustomButton;
