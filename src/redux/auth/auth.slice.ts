import { createSlice, type Draft, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState } from './auth.types';

const INITIAL_STATE: AuthState = {
  accessToken: null,
  refreshToken: null,
  expiresIn: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

/**
 * Redux slice containing authorization state management.
 */
const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    /**
     * Set the session token details upon successful login/verification.
     */
    setSession: (
      state: Draft<AuthState>,
      action: PayloadAction<{ accessToken: string; refreshToken?: string; expiresIn?: number }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken ?? null;
      state.expiresIn = action.payload.expiresIn ?? null;
      state.isAuthenticated = true;
      state.error = null;
    },
    /**
     * Clear session token details upon logout.
     */
    clearSession: () => INITIAL_STATE,
    /**
     * Set loading status.
     */
    setLoading: (state: Draft<AuthState>, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    /**
     * Set error message.
     */
    setError: (state: Draft<AuthState>, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const { setSession, clearSession, setLoading, setError } = authSlice.actions;
export const AuthReducer = authSlice.reducer;
export default authSlice;
