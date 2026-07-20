import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '../../../hooks';
import LoginHeader from './LoginHeader';
import { SigninForm } from './signin-form';
import styleSheet from './SigninStyles';
import useSignin from './useSignin';

/**
 * The SigninScreen component. It renders a Formik form that renders a SigninForm component
 * @returns A ReactElement.
 */
const SigninScreen = (): React.ReactElement => {
  const { styles } = useTheme(styleSheet);
  const signinHook = useSignin();

  return (
    <ScrollView style={StyleSheet.flatten([styles.screen, styles.screenView])} bounces={false}>
      <LoginHeader />
      <SigninForm {...signinHook} />
    </ScrollView>
  );
};

export default SigninScreen;
