import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../../../components';
import { Strings } from '../../../constants';
import { useTheme } from '../../../hooks';
import { Colors, scale } from '../../../theme';
import styleSheet from './LoginHeaderStyles';

const LoginHeader = (): React.ReactElement => {
  const { styles, theme } = useTheme(styleSheet);
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + scale(24) }]}>
      <LinearGradient
        colors={(Colors[theme]?.gradients?.primary as [string, string]) || ['#3B82F6', '#2563EB']}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.iconStyle}>
        <Ionicons name="cart" size={scale(36)} color={Colors[theme]?.solidWhite} />
      </View>
      <Text variant="displaySmall" style={styles.whiteText}>
        {Strings.Auth.signInTitle}
      </Text>
      <Text variant="labelSmall" style={styles.mutedText}>
        {Strings.Auth.signInSubtitle}
      </Text>
    </View>
  );
};

export default LoginHeader;
