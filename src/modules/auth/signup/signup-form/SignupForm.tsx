import { fontSizeStyles } from '@/src/components/text/TextStyles';
import React, { createRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { CustomButton, CustomInput, Text } from '../../../../components';
import { Strings } from '../../../../constants';
import { useTheme } from '../../../../hooks';
import { AuthSelectors, useAppSelector } from '../../../../redux';
import { Colors } from '../../../../theme';
import { navigateBack } from '../../../../utils';
import styleSheet from './SignupFormStyles';
import type { SignupFormPropsType } from './SignupFormTypes';
import { isRemainingToFillForm } from './SignupFormUtils';

/**
 * The sign up form component.
 * @param {SignupFormPropsType} props - The props for the sign up form.
 * @returns A sign up form component.
 */
export default function SignupForm({
  handleSubmit,
  handleChange,
  values,
  errors
}: SignupFormPropsType): React.ReactElement {
  const { styles, theme } = useTheme(styleSheet);
  const loading = useAppSelector<boolean>(AuthSelectors.getLoading);
  const inputEmailRef: React.LegacyRef<TextInput> = createRef();
  const inputPasswordRef: React.LegacyRef<TextInput> = createRef();
  const disabled: boolean = isRemainingToFillForm(values, errors);

  const fieldErrorName: string | undefined = (values.name?.length ?? 0) ? errors.name : '';
  const fieldErrorEmail: string | undefined = (values.email?.length ?? 0) ? errors.email : '';
  const fieldErrorPassword: string | undefined =
    (values.password?.length ?? 0) ? errors.password : '';

  return (
    <View style={styles.formContainer}>
      <Text variant="displayLarge" style={fontSizeStyles.displayMD}>{Strings.Auth.signUpTitle}</Text>
      <Text style={styles.subtitleText}>{Strings.Auth.signUpSubtitle}</Text>
      <CustomInput
        autoFocus
        returnKeyType="next"
        keyboardType="default"
        autoCapitalize="words"
        placeholder={Strings.Auth.hintName}
        leftIcon="person-outline"
        onChangeText={handleChange('name')}
        onSubmitEditing={() => {
          inputEmailRef.current?.focus();
        }}
      />
      <Text style={styles.errorMsg}>{fieldErrorName}</Text>
      <CustomInput
        ref={inputEmailRef}
        returnKeyType="next"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder={Strings.Auth.hintEmail}
        leftIcon="mail-outline"
        onChangeText={handleChange('email')}
        onSubmitEditing={() => {
          inputPasswordRef.current?.focus();
        }}
      />
      <Text style={styles.errorMsg}>{fieldErrorEmail}</Text>
      <CustomInput
        isPassword
        ref={inputPasswordRef}
        returnKeyType="done"
        keyboardType="default"
        placeholder={Strings.Auth.hintPassword}
        leftIcon="lock-closed-outline"
        onChangeText={handleChange('password')}
        onSubmitEditing={() => {
          handleSubmit();
        }}
      />
      <Text style={styles.errorMsg}>{fieldErrorPassword}</Text>
      <CustomButton
        style={StyleSheet.flatten([styles.buttonContainer, styles.buttonTopMargin])}
        disabled={disabled}
        loading={loading}
        title={Strings.Auth.btnSignUp}
        onPress={() => handleSubmit()}
      />
      <View style={styles.linkContainer}>
        <Text style={styles.labelText}>
          {Strings.Auth.hasAccountLabel}
          <Text style={styles.linkActionText} onPress={() => navigateBack()}>
            {Strings.Auth.signInAction}
          </Text>
        </Text>
      </View>
    </View>
  );
}
