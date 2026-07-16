import type { FormikProps } from 'formik';

/**
 * The values that are passed into the sign up form.
 * @typedef {Object} SignupFormValues
 * @property {string} name - The full name of the user.
 * @property {string} email - The email address of the user.
 * @property {string} password - The password of the user.
 * @property {string} confirmPassword - The password confirmation.
 * @property {boolean} agreeToTerms - Whether the user agreed to terms.
 */
export interface SignupFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export type SignupHookReturnType = FormikProps<SignupFormValues>;
