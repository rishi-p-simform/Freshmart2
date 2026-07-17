import { useFormik, type FormikProps } from 'formik';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { setHeaders } from '../../../configs';
import { AuthActions, UserActions, useAppDispatch } from '../../../redux';
import { SignupFormSchema } from '../../../utils';
import type { SignupFormValues, SignupHookReturnType } from './SignupTypes';

/**
 * Hook that returns the ref to the sign up form and the function to submit the form.
 * @returns formik props
 */
const useSignup = (): SignupHookReturnType & { apiError: string | null; setApiError: (err: string | null) => void } => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);

  /* Creating a formik object that is used to submit the form. */
  const formik: FormikProps<SignupFormValues> = useFormik<SignupFormValues>({
    initialValues: {
      name: 'Rishi',
      email: 'rishipatodiya12@gmail.com',
      password: 'Rishi@123',
      confirmPassword: 'Rishi@123',
      agreeToTerms: false
    },
    validationSchema: SignupFormSchema,
    onSubmit: async (values: SignupFormValues) => {
      try {
        dispatch(AuthActions.setLoading(true));
        setApiError(null);

        // 1. POST /signup using async thunk
        const signupResult = await dispatch(
          AuthActions.signup({
            data: {
              email: values.email,
              password: values.password,
              full_name: values.name
            }
          })
        ).unwrap();

        // We do not set auth session here because signup does not return a session
        // Instead, redirect to VerifyEmail
        router.navigate({
          pathname: '/(public)/verify-email',
          params: { email: values.email }
        });
      } catch (error: any) {
        const errorMessage = error?.message || 'Sign up failed. Please try again.';
        setApiError(errorMessage);
      } finally {
        dispatch(AuthActions.setLoading(false));
        dispatch(UserActions.setLoading(false));
      }
    }
  });

  return {
    ...formik,
    apiError,
    setApiError
  };
};

export default useSignup;
