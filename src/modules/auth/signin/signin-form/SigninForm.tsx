import React, { createRef } from 'react';
import { TextInput, View } from 'react-native';
import { CustomButton, CustomInput, Text } from '../../../../components';
import { ROUTES, Strings } from '../../../../constants';
import { useTheme } from '../../../../hooks';
import { AuthSelectors, useAppSelector } from '../../../../redux';
import { Colors } from '../../../../theme';
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
  errors
}: SigninFormPropsType): React.ReactElement {
  const { styles, theme } = useTheme(styleSheet);
  const loading = useAppSelector<boolean>(AuthSelectors.getLoading);
  const inputPasswordRef: React.LegacyRef<TextInput> = createRef();
  const disabled: boolean = isRemainingToFillForm(values, errors);
  const fieldErrorEmail: string | undefined = (values.email?.length ?? 0) ? errors.email : '';
  const fieldErrorPassword: string | undefined =
    (values.password?.length ?? 0) ? errors.password : '';

  return (
    <View style={styles.formContainer}>
      <Text variant="displayMedium" >{Strings.Auth.signInTitle}</Text>
      <Text style={styles.subtitleText}>{Strings.Auth.signInSubtitle}</Text>
      <CustomInput
        autoFocus
        returnKeyType="next"
        keyboardType="email-address"
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
        style={styles.buttonTopMargin}
        disabled={disabled}
        loading={loading}
        title={Strings.Auth.btnSignIn}
        onPress={() => handleSubmit()}
        titleProps={{ variant: 'titleMedium' }}
      />
      <View style={styles.linkContainer}>
        <Text style={styles.labelText}>
          {Strings.Auth.noAccountLabel}
          <Text style={styles.linkActionText} onPress={() => navigateWithParam(ROUTES.SignUp)}>
            {Strings.Auth.signUpAction}
          </Text>
        </Text>
      </View>
    </View>
  );
}
