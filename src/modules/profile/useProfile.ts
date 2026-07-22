import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { setHeaders } from '../../configs';
import { Strings } from '../../constants';
import { useTheme } from '../../hooks';
import {
  AuthActions,
  UserActions,
  UserSelectors,
  useAppDispatch,
  useAppSelector
} from '../../redux';
import { ThemeModeEnum, type ThemeMode } from '../../theme';
import type { ProfileHookReturnType } from './ProfileTypes';

/**
 * Custom hook managing business logic, state, and user actions for Profile screen.
 * @returns {ProfileHookReturnType} Typed state and action handlers.
 */
export const useProfile = (): ProfileHookReturnType => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(UserSelectors.getProfile);
  const { theme, isDark, changeTheme } = useTheme();
  const [deleting, setDeleting] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const result = await dispatch(UserActions.fetchProfile({})).unwrap();
      const rawProfile = result as unknown as Record<string, unknown>;
      const profile = (rawProfile?.data || rawProfile) as unknown as typeof result;
      if (profile) {
        dispatch(UserActions.setProfile(profile));
      }
    } catch (error) {
      console.warn('Failed to refresh profile:', error);
    } finally {
      setRefreshing(false);
    }
  }, [dispatch]);

  const toggleThemeSwitch = useCallback(() => {
    changeTheme(isDark ? ThemeModeEnum.light : ThemeModeEnum.dark);
  }, [changeTheme, isDark]);

  const setThemeMode = useCallback(
    (mode: ThemeMode) => {
      changeTheme(mode);
    },
    [changeTheme]
  );

  const handleLogout = useCallback(async () => {
    try {
      await dispatch(AuthActions.logout({})).unwrap();
    } catch (error) {
      console.warn('API logout failed, performing local cleanup:', error);
    } finally {
      setHeaders({ Authorization: '' });
      dispatch(AuthActions.clearSession());
      dispatch(UserActions.clearProfile());
    }
  }, [dispatch]);

  const handleDeleteAccount = useCallback(() => {
    Alert.alert(
      Strings.Profile.deleteAccountConfirmTitle,
      Strings.Profile.deleteAccountConfirmMessage,
      [
        {
          text: Strings.Profile.btnCancel,
          style: 'cancel'
        },
        {
          text: Strings.Profile.btnConfirmDelete,
          style: 'destructive',
          onPress: async () => {
            try {
              setDeleting(true);
              await dispatch(UserActions.deleteAccount({})).unwrap();
              Alert.alert('Success', 'Your account has been deleted successfully.');
            } catch (error: any) {
              const errorMessage = error?.message || 'Failed to delete account. Please try again.';
              Alert.alert('Error', errorMessage);
              console.error('Delete account failed:', error);
            } finally {
              setHeaders({ Authorization: '' });
              dispatch(AuthActions.clearSession());
              dispatch(UserActions.clearProfile());
              setDeleting(false);
            }
          }
        }
      ]
    );
  }, [dispatch]);

  return {
    user,
    isDark,
    theme,
    deleting,
    refreshing,
    onRefresh,
    handleLogout,
    handleDeleteAccount,
    toggleThemeSwitch,
    setThemeMode
  };
};

export default useProfile;
