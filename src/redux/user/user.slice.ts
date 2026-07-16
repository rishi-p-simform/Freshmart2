import { createSlice, type Draft, type PayloadAction } from '@reduxjs/toolkit';
import type { User, UserState } from './user.types';

const INITIAL_STATE: UserState = {
  profile: null,
  loading: false,
  error: null
};

/**
 * Redux slice containing user profile state management.
 */
const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    /**
     * Set the user profile data.
     */
    setProfile: (state: Draft<UserState>, action: PayloadAction<User>) => {
      state.profile = action.payload;
      state.error = null;
    },
    /**
     * Clear the user profile data.
     */
    clearProfile: () => INITIAL_STATE,
    /**
     * Set loading status.
     */
    setLoading: (state: Draft<UserState>, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    /**
     * Set error message.
     */
    setError: (state: Draft<UserState>, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const { setProfile, clearProfile, setLoading, setError } = userSlice.actions;
export const UserReducer = userSlice.reducer;
export default userSlice;
