import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, type ThemeMode } from '../../../theme';

const styles = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: scale(30),
      overflow: 'hidden',
      borderBottomLeftRadius: scale(32),
      borderBottomRightRadius: scale(32)
    },
    iconStyle: {
      backgroundColor: Colors[theme]?.alpha(Colors[theme]?.solidWhite, 0.24),
      justifyContent: 'center',
      alignItems: 'center',
      width: scale(64),
      height: scale(64),
      borderRadius: scale(16),
      borderWidth: 1,
      borderColor: Colors[theme]?.alpha(Colors[theme]?.solidWhite, 0.28),
      marginBottom: scale(10)
    },
    whiteText: {
      color: Colors[theme]?.solidWhite,
      fontWeight: 'bold'
    },
    mutedText: {
      color: Colors[theme]?.alpha(Colors[theme]?.solidWhite, 0.65)
    }
  });

export default styles;
