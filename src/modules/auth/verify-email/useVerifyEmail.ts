import { useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Linking } from 'react-native';
import { setHeaders } from '../../../configs';
import {
  AuthActions,
  AuthSelectors,
  UserActions,
  useAppDispatch,
  useAppSelector
} from '../../../redux';
import { ToastHelper } from '../../../utils/ToastHelper';
import type { VerifyEmailHookReturnType } from './VerifyEmailTypes';

const useVerifyEmail = (): VerifyEmailHookReturnType => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(AuthSelectors.getLoading);
  const params = useLocalSearchParams<{ email: string }>();
  const [code, setCode] = useState('');
  const [targetTime, setTargetTime] = useState<number>(Date.now() + 60 * 1000);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (targetTime > Date.now()) {
      interval = setInterval(() => {
        const remaining = Math.max(0, Math.floor((targetTime - Date.now()) / 1000));
        setTimer(remaining);
        if (remaining === 0) {
          clearInterval(interval);
        }
      }, 1000);
    } else {
      setTimer(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [targetTime]);

  const onSubmit = useCallback(async () => {
    if (code.length !== 6) {
      ToastHelper.showError('Error', 'Please enter a valid 6-digit code');
      return;
    }
    try {
      dispatch(AuthActions.setLoading(true));

      const result = await dispatch(
        AuthActions.verifySignup({
          data: { email: params?.email, token: code }
        })
      ).unwrap();

      const rawResult = result as unknown as Record<string, unknown>;
      const dataObj = rawResult.data as Record<string, unknown> | undefined;
      const sessionObj = dataObj?.session as Record<string, unknown> | undefined;
      const accessToken =
        (rawResult.accessToken as string) ||
        (rawResult.token as string) ||
        (rawResult.access_token as string) ||
        (dataObj?.token as string) ||
        (dataObj?.accessToken as string) ||
        (dataObj?.access_token as string) ||
        (sessionObj?.access_token as string);
      const refreshToken =
        (rawResult.refreshToken as string) ||
        (rawResult.refresh_token as string) ||
        (dataObj?.refreshToken as string) ||
        (dataObj?.refresh_token as string) ||
        (sessionObj?.refresh_token as string);
      const expiresIn =
        (rawResult.expiresIn as number) ||
        (dataObj?.expiresIn as number) ||
        (sessionObj?.expires_in as number) ||
        3600;

      dispatch(
        AuthActions.setSession({
          accessToken,
          refreshToken,
          expiresIn
        })
      );

      if (!accessToken) throw new Error('Access token is missing.');

      setHeaders({ Authorization: `Bearer ${accessToken}` });

      dispatch(UserActions.setLoading(true));
      const profileResult = await dispatch(UserActions.fetchProfile({})).unwrap();
      const rawProfile = profileResult as unknown as Record<string, unknown>;
      const profile = (rawProfile.data || rawProfile) as typeof profileResult;
      dispatch(UserActions.setProfile(profile));
    } catch (error: unknown) {
      const err = error as { message?: string };
      ToastHelper.showError('Error', err?.message || 'Verification failed');
    } finally {
      dispatch(AuthActions.setLoading(false));
      dispatch(UserActions.setLoading(false));
    }
  }, [code, dispatch, params?.email]);

  const onResend = useCallback(async () => {
    if (timer > 0) return;
    try {
      setTargetTime(Date.now() + 60 * 1000);
      dispatch(AuthActions.setLoading(true));
      await dispatch(
        AuthActions.resendConfirmation({
          data: { email: params?.email }
        })
      ).unwrap();
    } catch (error: unknown) {
      const err = error as { message?: string };
      setTargetTime(0);
      setTimer(0);
      ToastHelper.showError('Error', err?.message || 'Failed to resend code');
    } finally {
      dispatch(AuthActions.setLoading(false));
    }
  }, [dispatch, params?.email, timer]);

  const onOpenEmail = useCallback(async () => {
    try {
      const canOpen = await Linking.canOpenURL('mailto:');
      if (canOpen) {
        await Linking.openURL('mailto:');
      } else {
        console.warn('Mail app is not installed');
      }
    } catch (error) {
      console.warn('Unable to open URL: mailto:', error);
    }
  }, []);

  return {
    code,
    setCode,
    onSubmit,
    onResend,
    onOpenEmail,
    timer,
    isLoading,
    email: params?.email
  };
};

export default useVerifyEmail;
