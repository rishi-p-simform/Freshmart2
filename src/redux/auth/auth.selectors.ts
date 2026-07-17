import type { RootStateType } from '../Store';
import type { AuthState } from './auth.types';

interface AuthSelectorsType {
  getAuth: (state: RootStateType) => AuthState;
  getLoading: (state: RootStateType) => boolean;
  getIsAuthenticated: (state: RootStateType) => boolean;
  getAccessToken: (state: RootStateType) => string | null;
  getError: (state: RootStateType) => string | null;
}

const AuthSelectors: AuthSelectorsType = {
  getAuth: (state) => state.auth,
  getLoading: (state) => state.auth.loading,
  getIsAuthenticated: (state) => state.auth.isAuthenticated,
  getAccessToken: (state) => state.auth.accessToken,
  getError: (state) => state.auth.error
};

export default AuthSelectors;
