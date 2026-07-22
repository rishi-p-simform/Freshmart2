import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scale } from '@/src/theme';
import Feather from '@expo/vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '../../../components';
import { useTheme } from '../../../hooks';
import Colors from '../../../theme/Colors';
import styleSheet from '../ProfileStyles';

interface ProfileHeaderProps {
  fullName?: string;
  email?: string;
  avatarUrl?: string | null;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  fullName = 'User',
  email = 'user@example.com',
  avatarUrl
}) => {
  const { theme, styles } = useTheme(styleSheet);
  const currentColors = Colors[theme] ?? Colors.light;
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.headerContainer, { paddingTop: insets.top + 16 }]}>
      <LinearGradient
        colors={currentColors.gradients.primary}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.linearGradient}
      />
      <View style={styles.avatarWrapper}>
        <LinearGradient
          colors={currentColors.gradients.yellow}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.avatarBadge}
        >
          <View style={styles.innerBorder}>
            {avatarUrl ? (
              <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.avatarEmoji}>👨‍💼</Text>
            )}
          </View>
        </LinearGradient>
        <TouchableOpacity style={styles.editBadge} activeOpacity={0.8}>
          <Feather name="edit-2" size={scale(12)} color={currentColors.solidWhite} />
        </TouchableOpacity>
      </View>

      <Text variant="displayExtraSmall" style={styles.headerNameText}>
        {fullName}
      </Text>
      <Text variant="bodySmall" style={styles.headerEmailText}>
        {email}
      </Text>

      <View style={styles.goldBadge}>
        <Text variant="titleSmall" style={styles.goldBadgeText}>
          ⭐ Gold Member
        </Text>
      </View>
    </View>
  );
};

export default ProfileHeader;
