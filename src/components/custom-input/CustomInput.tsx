import React, { useState, forwardRef, useRef, useImperativeHandle, useEffect } from 'react';
import { TextInput, View, Pressable, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks';
import { Colors } from '../../theme';
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
    inputStyle,
    leftIcon,
    isPassword,
    testID,
    accessibilityLabel,
    ...rest
  } = { ...CustomInputDefaultProps, ...props };

  const { styles, theme } = useTheme(styleSheet);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<TextInput>(null);

  const focusAnim = useRef(new Animated.Value(0)).current;

  useImperativeHandle(ref, () => inputRef.current as TextInput);

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, focusAnim]);

  const handleContainerPress = () => {
    inputRef.current?.focus();
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const iconColor = Colors[theme]?.gray;
  
  const animatedBorderColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', Colors[theme]?.primary || '#000']
  });

  return (
    <AnimatedPressable 
      style={[
        styles.container, 
        customStyle,
        { borderColor: animatedBorderColor }
      ]} 
      testID={`${testID}-container`}
      accessibilityRole="none"
      onPress={handleContainerPress}
    >
      {leftIcon && (
        <View style={styles.leftIconContainer}>
          <Ionicons name={leftIcon} size={20} color={isFocused ? Colors[theme]?.primary : iconColor} />
        </View>
      )}

      <TextInput
        ref={inputRef}
        style={[styles.input, inputStyle]}
        secureTextEntry={isPassword && !isPasswordVisible}
        placeholderTextColor={iconColor}
        testID={testID}
        accessibilityLabel={accessibilityLabel}
        onFocus={(e) => {
          setIsFocused(true);
          rest.onFocus?.(e);
        }}
        onBlur={(e) => {
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
  );
});

CustomInput.displayName = 'CustomInput';

export default CustomInput;
