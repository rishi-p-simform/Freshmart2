import React, { type FC } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { CustomButton, Text } from '../../components';
import { Strings } from '../../constants';
import { useTheme } from '../../hooks';
import Colors, { ThemeModeEnum } from '../../theme/Colors';
import { ProfileHeader } from './components/ProfileHeader';
import { ProfileStats } from './components/ProfileStats';
import { ProfileTabs } from './components/ProfileTabs';
import styleSheet from './ProfileStyles';
import { useProfile } from './useProfile';

/**
 * The ProfileScreen component displaying user account information, navigation tabs,
 * appearance preferences (Dark / Light mode), and account actions.
 * @returns {React.ReactElement} React component element.
 */
const ProfileScreen: FC = (): React.ReactElement => {
  const { styles, theme } = useTheme(styleSheet);
  const currentColors = Colors[theme] ?? Colors.light;

  const { user, isDark, deleting, handleLogout, handleDeleteAccount, setThemeMode } = useProfile();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader
          fullName={user?.full_name}
          email={user?.email}
          avatarUrl={user?.avatar_url}
        />

        <ProfileStats />

        <ProfileTabs />

        <View style={styles.settingsContainer}>
          <View style={styles.themeCard}>
            <View style={styles.themeIconBox}>
              <MaterialCommunityIcons
                name={isDark ? 'weather-night' : 'white-balance-sunny'}
                size={18}
                color={currentColors.solidWhite}
              />
            </View>

            <Text variant="titleSmall" style={styles.themeLabelText}>
              Theme
            </Text>

            <View style={styles.switchContainer}>
              <TouchableOpacity
                onPress={() => setThemeMode(ThemeModeEnum.light)}
                style={[styles.switchButton, !isDark && styles.switchActive]}
                activeOpacity={0.8}
              >
                <Text
                  variant="captionMedium"
                  style={[styles.switchText, !isDark && styles.switchTextActive]}
                >
                  Light
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setThemeMode(ThemeModeEnum.dark)}
                style={[styles.switchButton, isDark && styles.switchActive]}
                activeOpacity={0.8}
              >
                <Text
                  variant="captionMedium"
                  style={[styles.switchText, isDark && styles.switchTextActive]}
                >
                  Dark
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <CustomButton
            style={styles.logoutButton}
            title={Strings.Profile.btnLogout}
            variant="solid"
            onPress={handleLogout}
          />

          <CustomButton
            style={styles.deleteButton}
            title="Delete User"
            variant="solid"
            loading={deleting}
            onPress={handleDeleteAccount}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
