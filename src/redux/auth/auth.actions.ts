import { createAsyncThunkWithCancelToken, authorizedAPI, unauthorizedAPI } from '../../configs';
import { APIConst, ToolkitAction } from '../../constants';
import { setSession, clearSession, setLoading, setError } from './auth.slice';
import type { LoginResponse, SignupResponse, VerifySignupResponse, ResendConfirmationResponse } from './auth.types';

/**
 * Async thunk for logging in.
 */
export const login = createAsyncThunkWithCancelToken<LoginResponse>(
  ToolkitAction.login,
  'POST',
  APIConst.login,
  unauthorizedAPI
);

/**
 * Async thunk for signing up.
 */
export const signup = createAsyncThunkWithCancelToken<SignupResponse>(
  ToolkitAction.signup,
  'POST',
  APIConst.signup,
  unauthorizedAPI
);

/**
 * Async thunk for logging out.
 */
export const logout = createAsyncThunkWithCancelToken<{ message?: string }>(
  ToolkitAction.logout,
  'POST',
  APIConst.logout,
  authorizedAPI
);

/**
 * Async thunk for verify signup.
 */
export const verifySignup = createAsyncThunkWithCancelToken<VerifySignupResponse>(
  ToolkitAction.verifySignup,
  'POST',
  APIConst.verifySignup,
  unauthorizedAPI
);

/**
 * Async thunk for resend confirmation.
 */
export const resendConfirmation = createAsyncThunkWithCancelToken<ResendConfirmationResponse>(
  ToolkitAction.resendConfirmation,
  'POST',
  APIConst.resendConfirmation,
  unauthorizedAPI
);

export const AuthActions = {
  setSession,
  clearSession,
  setLoading,
  setError,
  login,
  signup,
  logout,
  verifySignup,
  resendConfirmation
};

