import { createAsyncThunkWithCancelToken, authorizedAPI } from '../../configs';
import { APIConst, ToolkitAction } from '../../constants';
import { setProfile, clearProfile, setLoading, setError } from './user.slice';
import type { User, DeleteAccountResponse } from './user.types';

/**
 * Async thunk for fetching user profile.
 */
export const fetchProfile = createAsyncThunkWithCancelToken<User>(
  ToolkitAction.fetchProfile,
  'GET',
  APIConst.me,
  authorizedAPI
);

/**
 * Async thunk for deleting user account.
 */
export const deleteAccount = createAsyncThunkWithCancelToken<DeleteAccountResponse>(
  ToolkitAction.deleteAccount,
  'DELETE',
  APIConst.deleteAccount,
  authorizedAPI
);

export const UserActions = {
  setProfile,
  clearProfile,
  setLoading,
  setError,
  fetchProfile,
  deleteAccount
};
