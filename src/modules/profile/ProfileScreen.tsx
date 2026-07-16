import React, { type FC, useState } from 'react';
import { View, Alert } from 'react-native';
import { CustomButton } from '../../components';
import { Strings } from '../../constants';
import { useTheme } from '../../hooks';
import { setHeaders } from '../../configs';
import { AuthActions, UserActions, useAppDispatch } from '../../redux';
import styleSheet from './ProfileStyles';

/**
 * The ProfileScreen component
 * @returns {React.ReactElement} A React element.
 */
const ProfileScreen: FC = (): React.ReactElement => {
  const { styles } = useTheme(styleSheet);
  const dispatch = useAppDispatch();
  const [deleting, setDeleting] = useState(false);

  const handleDeleteAccount = () => {
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
  };

  return (
    <View style={styles.screenView}>
      <CustomButton
        style={styles.logoutButton}
        title={Strings.Profile.btnLogout}
        variant="solid"
        onPress={async () => {
          try {
            await dispatch(AuthActions.logout({})).unwrap();
          } catch (error) {
            console.warn('API logout failed, performing local cleanup:', error);
          } finally {
            setHeaders({ Authorization: '' });
            dispatch(AuthActions.clearSession());
            dispatch(UserActions.clearProfile());
          }
        }}
      />
      <CustomButton
        style={styles.deleteButton}
        title={Strings.Profile.btnDeleteAccount}
        variant="solid"
        loading={deleting}
        onPress={handleDeleteAccount}
      />
    </View>
  );
};

export default ProfileScreen;
