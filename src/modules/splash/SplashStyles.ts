import fonts from '@/src/assets/fonts';
import { fontSizeStyles } from '@/src/components/text/TextStyles';
import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, type ThemeMode } from '../../theme';

const styles = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    topCircle: {
      position: 'absolute',
      width: scale(180),
      height: scale(180),
      borderRadius: scale(999),
      backgroundColor: Colors[theme]?.alpha(Colors[theme]?.solidWhite, 0.06),
      top: scale(362),
      left: -scale(50),
    },
    bottomCircle: {
      position: 'absolute',
      width: scale(220), // Using scale(220) as 2220 is likely a typo for a circle, but let's support a responsive layout
      height: scale(220),
      borderRadius: scale(999),
      backgroundColor: Colors[theme]?.alpha(Colors[theme]?.solidWhite, 0.06),
      top: -scale(40),
      left: scale(102),
    },
    logoContainer: {
      alignItems: 'center',
    },
    logoBox: {
      width: scale(80),
      height: scale(80),
      borderRadius: scale(24),
      backgroundColor: Colors[theme]?.alpha(Colors[theme]?.solidWhite, 0.18),
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: scale(20),
      borderWidth: scale(1),
      borderColor: Colors[theme]?.alpha(Colors[theme]?.solidWhite, 0.3),
    },
    textWhite: {
      color: Colors[theme]?.solidWhite,
      textAlign: 'center',
      ...fontSizeStyles.displayMD,
      fontFamily: fonts.bold
    },
    subtitle: {
      color: Colors[theme]?.alpha(Colors[theme]?.solidWhite, 0.65),
      textAlign: 'center',
      marginTop: scale(8),
      ...fontSizeStyles.textLG,
      fontFamily: fonts.medium
    },
  });

export default styles;
