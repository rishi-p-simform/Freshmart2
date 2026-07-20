import { scale } from '@/src/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { View } from 'react-native';
import { Text } from '../../../components';
import { useTheme } from '../../../hooks';
import Colors from '../../../theme/Colors';
import styleSheet from '../ProfileStyles';

export const ProfileStats: React.FC = () => {
  const { theme, styles } = useTheme(styleSheet);
  const currentColors = Colors[theme] ?? Colors.light;

  return (
    <View style={styles.statsContainer}>
      <View style={styles.statChip}>
        <Text variant="headlineLarge" style={[styles.statValueText, styles.primaryText]}>
          24
        </Text>
        <Text variant="bodySmall" style={styles.statLabelText}>
          Orders
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.statChip}>
        <View style={styles.ratingRow}>
          <Text variant="headlineLarge" style={[styles.statValueText, styles.orangeText]}>
            4.8
          </Text>
          <Ionicons name="star" size={scale(18)} color={currentColors.orange} />
        </View>
        <Text variant="bodySmall" style={styles.statLabelText}>
          Rating
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.statChip}>
        <Text variant="headlineLarge" style={[styles.statValueText, styles.greenText]}>
          ₹540
        </Text>
        <Text variant="bodySmall" style={styles.statLabelText}>
          Saved
        </Text>
      </View>
    </View>
  );
};

export default ProfileStats;
