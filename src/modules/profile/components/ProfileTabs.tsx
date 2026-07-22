import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '../../../components';
import { profileTabs } from '../../../constants/Profile';
import { useTheme } from '../../../hooks';
import Colors from '../../../theme/Colors';
import styleSheet from '../ProfileStyles';

export const ProfileTabs: React.FC = () => {
  const { theme, styles } = useTheme(styleSheet);
  const router = useRouter();
  const currentColors = Colors[theme] ?? Colors.light;

  return (
    <View style={styles.tabsContainer}>
      {profileTabs.map((item) => {
        const iconBg = theme === 'dark' ? item.colorDark : item.colorLight;

        return (
          <TouchableOpacity
            key={item.id}
            style={styles.tabCard}
            activeOpacity={0.7}
            onPress={() => {
              if (item.route) {
                router.push(item.route as import('expo-router').Href);
              }
            }}
          >
            <View style={[styles.tabIconBox, { backgroundColor: iconBg }]}>
              <Text style={styles.tabIconText}>{item.icon}</Text>
            </View>

            <Text variant="labelLarge" style={styles.tabTitleText}>
              {item.title}
            </Text>

            <Feather name="chevron-right" size={18} color={currentColors.gray} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ProfileTabs;
