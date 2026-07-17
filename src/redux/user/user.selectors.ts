import type { RootStateType } from '../Store';
import type { UserState, User } from './user.types';

interface UserSelectorsType {
  getUserState: (state: RootStateType) => UserState;
  getProfile: (state: RootStateType) => User | null;
  getLoading: (state: RootStateType) => boolean;
  getError: (state: RootStateType) => string | null;
}

const UserSelectors: UserSelectorsType = {
  getUserState: (state) => state.user,
  getProfile: (state) => state.user.profile,
  getLoading: (state) => state.user.loading,
  getError: (state) => state.user.error
};

export default UserSelectors;
