import { useEffect, useRef, useState } from 'react';
import { NativeSyntheticEvent, TextInput, TextInputKeyPressEventData } from 'react-native';
import { OTPInputProps } from './OTPInputTypes';

export const useOTPInput = ({ length = 6, value = '', onChange, onComplete }: OTPInputProps) => {
  const refs = useRef<TextInput[]>([]);
  const [otp, setOtp] = useState(value.split('').slice(0, length));

  useEffect(() => {
    if (value === '') {
      setOtp(Array(length).fill(''));
    }
  }, [value, length]);

  const update = (text: string, index: number) => {
    let newChar = text;

    if (text.length > 1) {
      if (text.length === 2 && text[0] === otp[index]) {
        newChar = text[1];
      } else if (text.length === 2 && text[1] === otp[index]) {
        newChar = text[0];
      } else {
        const values = text.slice(0, length).split('');
        setOtp(values);
        const code = values.join('');

        setTimeout(() => {
          onChange?.(code);
          if (code.length === length) {
            onComplete?.(code);
          }
        }, 0);

        refs.current[Math.min(values.length - 1, length - 1)]?.focus();
        return;
      }
    }

    setOtp((prev) => {
      const next = [...prev];
      next[index] = newChar;

      // Fix for React Native TextInput sync issue:
      // If the user types the exact same character (e.g., '5' over '5'), the text becomes '55',
      // but the React state stays '5'. Since state didn't change, React doesn't force a native update.
      // This leaves the native input stuck at '55', preventing further typing because maxLength=2.
      if (text.length > 1 && prev[index] === newChar) {
        refs.current[index]?.setNativeProps({ text: newChar });
      }

      const code = next.join('');

      setTimeout(() => {
        onChange?.(code);
        if (code.length === length) {
          onComplete?.(code);
        }
      }, 0);

      if (newChar && index < length - 1) {
        refs.current[index + 1]?.focus();
      }

      return next;
    });
  };

  const backspace = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      setOtp((prev) => {
        const next = [...prev];

        if (!prev[index] && index > 0) {
          // If current box is empty, move back and clear previous box
          refs.current[index - 1]?.focus();
          next[index - 1] = '';
        } else if (prev[index]) {
          // If current box has a value, just clear it
          next[index] = '';
        }

        setTimeout(() => onChange?.(next.join('')), 0);
        return next;
      });
    }
  };

  return {
    otp,
    refs,
    update,
    backspace
  };
};
