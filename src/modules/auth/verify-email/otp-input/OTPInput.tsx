import { Text } from '@/src/components';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, ZoomIn } from 'react-native-reanimated';
import { useTheme } from '../../../../hooks';
import { Colors, scale } from '../../../../theme';
import { styleSheet } from './OTPInputStyles';
import { OTPInputProps } from './OTPInputTypes';

const OTPInput: React.FC<OTPInputProps> = (props) => {
  const { length = 6, value = '', onChange, onComplete } = props;
  const { styles, theme } = useTheme(styleSheet);
  const themeColors = Colors[theme];

  const [otp, setOtp] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (value === '') {
      setOtp('');
    }
  }, [value]);

  const handleFocus = () => {
    setIsFocused(true);
    inputRef.current?.focus();
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    setOtp(cleaned);
    onChange?.(cleaned);
    if (cleaned.length === length) {
      onComplete?.(cleaned);
    }
  };

  return (
    <Pressable style={styles.otpBoxesContainer} onPress={handleFocus}>
      {Array.from({ length }).map((_, index) => {
        const char = otp[index] || '';

        // The box is active if it has a character, or if it's the currently focused box ready for input
        const isCurrentBox = isFocused && (index === otp.length || (index === length - 1 && otp.length === length));
        const isActive = !!char || isCurrentBox;

        const animatedStyle = useAnimatedStyle(() => ({
          borderColor: withTiming(isActive ? themeColors.primary : themeColors.gray, { duration: 200 }),
        }));

        // Blinking cursor animation
        const cursorStyle = useAnimatedStyle(() => ({
          opacity: withTiming(isCurrentBox && !char ? 1 : 0, { duration: 400 }), // simplified blinking by just showing it, we can use repeat if we import withRepeat
        }));

        return (
          <Animated.View key={`${index + 1}`} entering={ZoomIn.delay(index * 50 + 400).duration(300)}>
            <Animated.View style={[styles.otpBox, animatedStyle]}>
              {char ? (
                <Text style={{ color: themeColors.text }} variant='headlineLarge'>
                  {char}
                </Text>
              ) : (
                isCurrentBox && (
                  <View style={{ width: 2, height: scale(24), backgroundColor: themeColors.primary }} />
                )
              )}
            </Animated.View>
          </Animated.View>
        );
      })}

      <TextInput
        ref={inputRef}
        value={otp}
        onChangeText={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        keyboardType="number-pad"
        maxLength={length}
        textContentType="oneTimeCode"
        autoFocus
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          opacity: 0,
        }}
      />
    </Pressable>
  );
};

export default OTPInput;
