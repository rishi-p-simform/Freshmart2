import { useLocalSearchParams, useRouter } from 'expo-router';
import { useFormik, type FormikProps } from 'formik';
import { useEffect, useState } from 'react';
import { setHeaders } from '../../../configs';
import { ROUTES } from '../../../constants';
import { AuthActions, UserActions, useAppDispatch } from '../../../redux';
import { SigninFormSchema } from '../../../utils';
import type { SigninFormValues, SigninHookReturnType, SigninRouteParamList } from './SigninTypes';

/**
 * Hook that returns the ref to the sign in form and the function to submit the form.
 * @returns formik props
 */
const useSignin = (): SigninHookReturnType & {
  apiError: string | null;
  setApiError: (err: string | null) => void;
} => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useLocalSearchParams<SigninRouteParamList>();
  const [apiError, setApiError] = useState<string | null>(null);

  /* Creating a formik object that is used to submit the form. */
  const formik: FormikProps<SigninFormValues> = useFormik<SigninFormValues>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: SigninFormSchema,
    onSubmit: async (values: SigninFormValues) => {
      try {
        dispatch(AuthActions.setLoading(true));
        setApiError(null);

        // 1. POST /login using async thunk
        const loginResult = await dispatch(
          AuthActions.login({
            data: { email: values.email, password: values.password }
          })
        ).unwrap();

        // 2. Set auth session state
        const rawResult = loginResult as unknown as Record<string, unknown>;
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

        if (!accessToken) {
          throw new Error('Access token is missing from the login response.');
        }

        // 3. Set auth header for subsequent requests
        setHeaders({ Authorization: `Bearer ${accessToken}` });

        // 4. Fetch user profile (GET /me)
        dispatch(UserActions.setLoading(true));
        const profileResult = await dispatch(UserActions.fetchProfile({})).unwrap();
        const rawProfile = profileResult as unknown as Record<string, unknown>;
        const profile = (rawProfile.data || rawProfile) as typeof profileResult;
        dispatch(UserActions.setProfile(profile));
      } catch (error: unknown) {
        const err = error as { message?: string };
        const errorMessage = err?.message || 'Sign in failed. Please try again.';
        setApiError(errorMessage);
        if (errorMessage === 'Email not confirmed') {
          dispatch(AuthActions.resendConfirmation({ data: { email: values.email } }));
          router.navigate({
            pathname: ROUTES.VerifyEmail,
            params: { email: values.email }
          });
        }
      } finally {
        dispatch(AuthActions.setLoading(false));
        dispatch(UserActions.setLoading(false));
      }
    }
  });

  useEffect(() => {
    formik?.setFieldValue('email', params?.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.email]);

  return {
    ...formik,
    apiError,
    setApiError
  };
};

export default useSignin;
