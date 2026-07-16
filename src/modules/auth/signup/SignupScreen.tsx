import React from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { useTheme } from '../../../hooks';
import { SignupForm } from './signup-form';
import styleSheet from './SignupStyles';
import type { SignupHookReturnType } from './SignupTypes';
import useSignup from './useSignup';

/**
 * The SignupScreen component. It renders a Formik form that renders a SignupForm component.
 * @returns A ReactElement.
 */
const SignupScreen = (): React.ReactElement  => {
  const { styles } = useTheme(styleSheet);
  const signupHook = useSignup();

  return (
    <Animated.ScrollView style={StyleSheet.flatten([styles.screen, styles.screenView])}
      bounces={false}
    >
      <SignupForm {...signupHook} />
    </Animated.ScrollView>
  );
}


export default SignupScreen;
