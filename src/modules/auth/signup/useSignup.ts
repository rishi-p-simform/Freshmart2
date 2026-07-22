import { useRouter } from 'expo-router';
import { useFormik, type FormikProps } from 'formik';
import { useState } from 'react';
import { ROUTES } from '../../../constants';
import { AuthActions, UserActions, useAppDispatch } from '../../../redux';
import { SignupFormSchema } from '../../../utils';
import type { SignupFormValues, SignupHookReturnType } from './SignupTypes';

/**
 * Hook that returns the ref to the sign up form and the function to submit the form.
 * @returns formik props
 */
const useSignup = (): SignupHookReturnType & {
  apiError: string | null;
  setApiError: (err: string | null) => void;
} => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);

  /* Creating a formik object that is used to submit the form. */
  const formik: FormikProps<SignupFormValues> = useFormik<SignupFormValues>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false
    },
    validationSchema: SignupFormSchema,
    onSubmit: async (values: SignupFormValues) => {
      try {
        dispatch(AuthActions.setLoading(true));
        setApiError(null);

        // 1. POST /signup using async thunk
        await dispatch(
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
          pathname: ROUTES.VerifyEmail,
          params: { email: values.email }
        });
      } catch (error: unknown) {
        const err = error as { message?: string };
        const errorMessage = err?.message || 'Sign up failed. Please try again.';
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
