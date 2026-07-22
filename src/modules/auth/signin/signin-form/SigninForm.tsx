import { Colors } from '@/src/theme';
import React, { createRef } from 'react';
import { TextInput, View } from 'react-native';
import { CustomButton, CustomInput, Text } from '../../../../components';
import { ROUTES, Strings } from '../../../../constants';
import { useTheme } from '../../../../hooks';
import { AuthSelectors, useAppSelector } from '../../../../redux';
import { navigateWithParam } from '../../../../utils';
import styleSheet from './SigninFormStyles';
import type { SigninFormPropsType } from './SigninFormTypes';
import { isRemainingToFillForm } from './SigninFormUtils';

/**
 * The sign in form component.
 * @param {SigninFormPropsType} props - The props for the sign in form.
 * @returns A sign in form component.
 */
export default function SigninForm({
  handleSubmit,
  handleChange,
  values,
  errors,
  ...props
}: SigninFormPropsType & {
  apiError?: string | null;
  setApiError?: (err: string | null) => void;
}): React.ReactElement {
  const { styles, theme } = useTheme(styleSheet);
  const loading = useAppSelector<boolean>(AuthSelectors.getLoading);
  const { apiError, setApiError } = props;
  const inputPasswordRef: React.LegacyRef<TextInput> = createRef();
  const disabled: boolean = isRemainingToFillForm(values, errors);
  const fieldErrorEmail: string | undefined = (values.email?.length ?? 0) ? errors.email : '';
  const fieldErrorPassword: string | undefined =
    (values.password?.length ?? 0) ? errors.password : '';

  return (
    <View style={styles.formContainer}>
      <CustomInput
        autoFocus
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
        value={values.password}
        ref={inputPasswordRef}
        returnKeyType="done"
        keyboardType="default"
        label={Strings.Auth.lblPassword}
        placeholder={Strings.Auth.hintPassword}
        leftIcon="lock-closed-outline"
        onChangeText={(text) => {
          handleChange('password')(text);
          setApiError?.(null);
        }}
        onSubmitEditing={() => {
          handleSubmit();
        }}
      />
      <Text variant="error">{fieldErrorPassword}</Text>

      <Text variant="info" style={styles.forgotPassword} onPress={() => {}}>
        {Strings.Auth.forgotPassword}
      </Text>

      {apiError ? (
        <View style={styles.errorBanner}>
          <Text variant="bodySmall" style={styles.errorBannerText}>
            {apiError}
          </Text>
        </View>
      ) : null}

      <CustomButton
        style={styles.buttonTopMargin}
        disabled={disabled}
        loading={loading}
        title={Strings.Auth.btnSignIn}
        onPress={() => handleSubmit()}
        titleProps={{ variant: 'labelLarge' }}
      />

      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text variant="labelLarge" style={styles.dividerText}>
          {Strings.Auth.orContinueWith}
        </Text>
        <View style={styles.dividerLine} />
      </View>

      <CustomButton
        variant="solid"
        style={styles.googleButton}
        title={Strings.Auth.btnGoogle}
        onPress={() => {}}
        titleProps={{ variant: 'labelLarge' }}
        leftIcon="logo-google"
        color={Colors[theme].text}
      />

      <View style={styles.linkContainer}>
        <Text variant="bodyMedium" style={styles.labelText}>
          {Strings.Auth.newHereLabel}
          <Text
            variant="titleSmall"
            style={styles.linkActionText}
            onPress={() => navigateWithParam(ROUTES.SignUp)}
          >
            Create Account
          </Text>
        </Text>
      </View>
    </View>
  );
}
