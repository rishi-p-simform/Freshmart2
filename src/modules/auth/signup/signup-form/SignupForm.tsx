import { Ionicons } from '@expo/vector-icons';
import React, { createRef } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
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
  setFieldValue,
  values,
  errors,
  ...props
}: SignupFormPropsType & {
  apiError?: string | null;
  setApiError?: (err: string | null) => void;
}): React.ReactElement {
  const { styles, theme } = useTheme(styleSheet);
  const loading = useAppSelector<boolean>(AuthSelectors.getLoading);
  const { apiError, setApiError } = props;
  const inputEmailRef: React.LegacyRef<TextInput> = createRef();
  const inputPasswordRef: React.LegacyRef<TextInput> = createRef();
  const inputConfirmPasswordRef: React.LegacyRef<TextInput> = createRef();
  const disabled: boolean = isRemainingToFillForm(values, errors);

  const fieldErrorName: string | undefined = (values.name?.length ?? 0) ? errors.name : '';
  const fieldErrorEmail: string | undefined = (values.email?.length ?? 0) ? errors.email : '';
  const fieldErrorPassword: string | undefined =
    (values.password?.length ?? 0) ? errors.password : '';
  const fieldErrorConfirmPassword: string | undefined =
    (values.confirmPassword?.length ?? 0) ? errors.confirmPassword : '';
  const fieldErrorTerms: string | undefined =
    !values.agreeToTerms && errors.agreeToTerms ? errors.agreeToTerms : '';

  return (
    <View style={styles.formContainer}>
      <CustomInput
        autoFocus
        value={values.name}
        returnKeyType="next"
        keyboardType="default"
        autoCapitalize="words"
        label={Strings.Auth.lblName}
        placeholder={Strings.Auth.hintName}
        leftIcon="person-outline"
        onChangeText={(text) => {
          handleChange('name')(text);
          setApiError?.(null);
        }}
        onSubmitEditing={() => {
          inputEmailRef.current?.focus();
        }}
      />
      <Text variant="error">{fieldErrorName}</Text>

      <CustomInput
        ref={inputEmailRef}
        value={values.email}
        returnKeyType="next"
        keyboardType="email-address"
        autoCapitalize="none"
        label={Strings.Auth.lblEmail}
        placeholder={Strings.Auth.hintEmail}
        leftIcon="mail-outline"
        onChangeText={(text) => {
          handleChange('email')(text);
          setApiError?.(null);
        }}
        onSubmitEditing={() => {
          inputPasswordRef.current?.focus();
        }}
      />
      <Text variant="error">{fieldErrorEmail}</Text>

      <CustomInput
        isPassword
        ref={inputPasswordRef}
        value={values.password}
        returnKeyType="next"
        keyboardType="default"
        autoCapitalize="none"
        label={Strings.Auth.lblPassword}
        placeholder={Strings.Auth.hintPassword}
        leftIcon="lock-closed-outline"
        onChangeText={(text) => {
          handleChange('password')(text);
          setApiError?.(null);
        }}
        onSubmitEditing={() => {
          inputConfirmPasswordRef.current?.focus();
        }}
      />
      <Text variant="error">{fieldErrorPassword}</Text>

      <CustomInput
        isPassword
        ref={inputConfirmPasswordRef}
        value={values.confirmPassword}
        returnKeyType="done"
        keyboardType="default"
        autoCapitalize="none"
        label={Strings.Auth.lblConfirmPassword}
        placeholder={Strings.Auth.hintPassword}
        leftIcon="lock-closed-outline"
        onChangeText={(text) => {
          handleChange('confirmPassword')(text);
          setApiError?.(null);
        }}
        onSubmitEditing={() => {
          handleSubmit();
        }}
      />
      <Text variant="error">{fieldErrorConfirmPassword}</Text>

      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={[styles.checkbox, values.agreeToTerms && styles.checkboxChecked]}
          onPress={() => setFieldValue('agreeToTerms', !values.agreeToTerms)}
          activeOpacity={0.7}
        >
          {values.agreeToTerms && (
            <Ionicons name="checkmark" size={14} color={Colors[theme]?.white} />
          )}
        </TouchableOpacity>
        <Text variant="bodySmall" style={styles.termsText}>
          {Strings.Auth.agreeTo}
          <Text variant="info">{Strings.Auth.termsOfService}</Text>
          {Strings.Auth.and}
          <Text variant="info">{Strings.Auth.privacyPolicy}</Text>
        </Text>
      </View>
      <Text variant="error">{fieldErrorTerms}</Text>

      {apiError ? (
        <View style={styles.errorBanner}>
          <Text variant="bodySmall" style={styles.errorBannerText}>
            {apiError}
          </Text>
        </View>
      ) : null}

      <CustomButton
        style={StyleSheet.flatten([styles.buttonContainer, styles.buttonTopMargin])}
        disabled={disabled}
        loading={loading}
        title={Strings.Auth.btnSignUp}
        onPress={() => handleSubmit()}
      />
      <View style={styles.linkContainer}>
        <Text variant="labelMedium" style={styles.labelText}>
          {Strings.Auth.hasAccountLabel}
          <Text variant="labelMedium" style={styles.linkActionText} onPress={() => navigateBack()}>
            {Strings.Auth.signInAction}
          </Text>
        </Text>
      </View>
    </View>
  );
}
