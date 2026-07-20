import { CustomHeader } from '@/src/components';
import { Strings } from '@/src/constants';
import { Stack } from 'expo-router';
import React, { type FC } from 'react';
import { useTheme } from '../../hooks';
import { Colors } from '../../theme';

/**
 * The PublicLayout Component
 * Defines the navigation structure for unauthenticated users.
 * @returns {React.ReactElement} The PublicLayout component.
 */
const PublicLayout: FC = (): React.ReactElement => {
  const { theme } = useTheme();

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: Colors[theme]?.white
        },
        navigationBarColor: Colors[theme]?.white
      }}
    >
      <Stack.Screen name="signin/index" options={{ title: 'Sign In', headerShown: false }} />
      <Stack.Screen
        name="signup/index"
        options={{
          title: 'Sign Up',
          header: () => <CustomHeader title={Strings.Auth.signUpTitle} />
        }}
      />
      <Stack.Screen
        name="verify-email/index"
        options={{
          title: 'Verify Email',
          header: () => <CustomHeader title={Strings.Auth.verifyEmailTitle} />
        }}
      />
    </Stack>
  );
};

export default PublicLayout;
