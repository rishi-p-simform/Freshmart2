import { useLocalSearchParams, useRouter } from 'expo-router';
import { useFormik, type FormikProps } from 'formik';
import { useEffect, useState } from 'react';
import { setHeaders } from '../../../configs';
import { AuthActions, UserActions, useAppDispatch } from '../../../redux';
import { SigninFormSchema } from '../../../utils';
import type { SigninFormValues, SigninHookReturnType, SigninRouteParamList } from './SigninTypes';

/**
 * Hook that returns the ref to the sign in form and the function to submit the form.
 * @returns formik props
 */
const useSignin = (): SigninHookReturnType & { apiError: string | null; setApiError: (err: string | null) => void } => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useLocalSearchParams<SigninRouteParamList>();
  const [apiError, setApiError] = useState<string | null>(null);

  /* Creating a formik object that is used to submit the form. */
  const formik: FormikProps<SigninFormValues> = useFormik<SigninFormValues>({
    initialValues: {
      email: 'rishipatodiya12@gmail.com',
      password: 'Rishi@123'
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
        const rawResult = loginResult as any;
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

        if (!accessToken) {
          throw new Error('Access token is missing from the login response.');
        }

        // 3. Set auth header for subsequent requests
        setHeaders({ Authorization: `Bearer ${accessToken}` });

        // 4. Fetch user profile (GET /me)
        dispatch(UserActions.setLoading(true));
        const profileResult = await dispatch(UserActions.fetchProfile({})).unwrap();
        const rawProfile = profileResult as any;
        const profile = rawProfile.data || rawProfile;
        dispatch(UserActions.setProfile(profile));
      } catch (error: any) {
        const errorMessage = error?.message || 'Sign in failed. Please try again.';
        setApiError(errorMessage);
        if (errorMessage === 'Email not confirmed') {
          dispatch(AuthActions.resendConfirmation({ data: { email: values.email } }));
          router.navigate({
            pathname: '/(public)/verify-email',
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
}


export default useSignin;
