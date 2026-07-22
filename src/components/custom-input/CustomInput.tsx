import { Ionicons } from '@expo/vector-icons';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  TextInput,
  View,
  type NativeSyntheticEvent,
  type TextInputFocusEventData
} from 'react-native';
import { ANIMATION_DURATION } from '../../constants';
import { useTheme } from '../../hooks';
import { Colors } from '../../theme';
import { Text } from '../text';
import { styleSheet } from './CustomInputStyles';
import { CustomInputDefaultProps, CustomInputProps } from './CustomInputTypes';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/**
 * CustomInput component for text entry.
 * Supports an optional left icon and a password variant that shows an eye icon.
 *
 * @param props CustomInputProps
 * @returns JSX.Element
 */
const CustomInput = forwardRef<TextInput, CustomInputProps>((props, ref) => {
  const {
    customStyle,
    containerStyle,
    inputStyle,
    leftIcon,
    iconColor: propIconColor,
    isPassword,
    testID,
    accessibilityLabel,
    label,
    InputComponent,
    ...rest
  } = { ...CustomInputDefaultProps, ...props };

  const Input = (InputComponent || TextInput) as React.ComponentType<any>;

  const { styles, theme } = useTheme(styleSheet);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<TextInput>(null);

  const focusAnim = useRef(new Animated.Value(0)).current;

  useImperativeHandle(ref, () => inputRef.current as TextInput);

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused ? 1 : 0,
      duration: ANIMATION_DURATION.FAST,
      useNativeDriver: false
    }).start();
  }, [isFocused, focusAnim]);

  const handleContainerPress = () => {
    inputRef.current?.focus();
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const iconColor = propIconColor || Colors[theme]?.gray;

  const animatedBorderColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors[theme]?.palette.gray[200], Colors[theme]?.primary || '#000']
  });

  return (
    <View style={customStyle}>
      {label && (
        <Text variant="labelSmall" style={styles.label}>
          {label}
        </Text>
      )}
      <AnimatedPressable
        style={[styles.container, { borderColor: animatedBorderColor }, containerStyle]}
        testID={`${testID}-container`}
        accessibilityRole="none"
        onPress={handleContainerPress}
      >
        {leftIcon && (
          <View style={styles.leftIconContainer}>
            <Ionicons
              name={leftIcon}
              size={20}
              color={isFocused ? Colors[theme]?.primary : iconColor}
            />
          </View>
        )}

        <Input
          ref={inputRef}
          style={[styles.input, inputStyle]}
          secureTextEntry={isPassword && !isPasswordVisible}
          placeholderTextColor={iconColor}
          testID={testID}
          accessibilityLabel={accessibilityLabel}
          onFocus={(e: NativeSyntheticEvent<TextInputFocusEventData>) => {
            setIsFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e: NativeSyntheticEvent<TextInputFocusEventData>) => {
            setIsFocused(false);
            rest.onBlur?.(e);
          }}
          {...rest}
        />

        {isPassword && (
          <Pressable
            onPress={togglePasswordVisibility}
            style={styles.rightIconContainer}
            accessibilityRole="button"
            accessibilityLabel={isPasswordVisible ? 'Hide password' : 'Show password'}
            accessibilityHint="Toggles the visibility of the password field"
            testID={`${testID}-toggle-visibility`}
          >
            <Ionicons
              name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color={iconColor}
            />
          </Pressable>
        )}
      </AnimatedPressable>
    </View>
  );
});

CustomInput.displayName = 'CustomInput';

export default CustomInput;
