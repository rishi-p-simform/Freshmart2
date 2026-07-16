import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Linking } from 'react-native';
import { setHeaders } from '../../../configs';
import { AuthActions, AuthSelectors, UserActions, useAppDispatch, useAppSelector } from '../../../redux';
import { ToastHelper } from '../../../utils/ToastHelper';
import type { VerifyEmailHookReturnType } from './VerifyEmailTypes';

const useVerifyEmail = (): VerifyEmailHookReturnType => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(AuthSelectors.getLoading);
  const router = useRouter();
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

      const rawResult = result as any;
      const accessToken = rawResult.accessToken || rawResult.token || rawResult.access_token || rawResult.data?.token || rawResult.data?.accessToken || rawResult.data?.access_token || rawResult.data?.session?.access_token;
      const refreshToken = rawResult.refreshToken || rawResult.refresh_token || rawResult.data?.refreshToken || rawResult.data?.refresh_token || rawResult.data?.session?.refresh_token;
      const expiresIn = rawResult.expiresIn || rawResult.data?.expiresIn || rawResult.data?.session?.expires_in || 3600;

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
      const rawProfile = profileResult as any;
      const profile = rawProfile.data || rawProfile;
      dispatch(UserActions.setProfile(profile));

    } catch (error: any) {
      ToastHelper.showError('Error', error?.message || 'Verification failed');
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
    } catch (error: any) {
      setTargetTime(0);
      setTimer(0);
      ToastHelper.showError('Error', error?.message || 'Failed to resend code');
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
