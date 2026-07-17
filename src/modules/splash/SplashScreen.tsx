import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { type FC } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { Strings } from '../../constants';
import { useTheme } from '../../hooks';
import { Colors, scale } from '../../theme';
import styleSheet from './SplashStyles';
import type { SplashScreenProps } from './SplashTypes';
import { useSplash } from './useSplash';

/**
 * Splash Screen Component.
 * Displays a beautiful animated entry screen with a logo and subtitle,
 * then triggers onFinish after a 2500ms timeout.
 * 
 * @param {SplashScreenProps} props - Props containing onFinish callback.
 * @returns {React.ReactElement} The animated SplashScreen.
 */
const SplashScreen: FC<SplashScreenProps> = ({ onFinish }): React.ReactElement => {
  const { styles, theme } = useTheme(styleSheet);
  useSplash(onFinish);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={(Colors[theme]?.gradients?.primary as [string, string]) || ['#3B82F6', '#2563EB']}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.topCircle} />
      <View style={styles.bottomCircle} />

      <Animated.View
        entering={FadeInDown.duration(600)}
        style={styles.logoContainer}
      >
        <View style={styles.logoBox}>
          <Ionicons
            name="cart"
            size={scale(42)}
            color={Colors[theme]?.solidWhite}
          />
        </View>

        <Animated.Text
          entering={FadeIn.delay(300)}
          style={styles.textWhite}
        >
          {Strings.Splash.title}
        </Animated.Text>

        <Animated.Text
          entering={FadeIn.delay(500)}
          style={styles.subtitle}
        >
          {Strings.Splash.subtitle}
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
