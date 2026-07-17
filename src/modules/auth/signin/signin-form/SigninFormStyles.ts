import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, type ThemeMode } from '../../../../theme';

/**
 * A StyleSheet object that contains all of the sign in form styles.
 * @param {ThemeMode} theme - The theme to use for the styles.
 * @returns {StyleSheet} A StyleSheet object containing all of the sign in form styles.
 */
const styles = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    buttonText: {
      color: Colors[theme]?.white
    },
    formContainer: {
      flex: 1,
      paddingHorizontal: scale(16),
      paddingVertical: scale(18),
      gap: scale(5)
    },
    errorBanner: {
      backgroundColor: '#fef2f2',
      borderWidth: 1,
      borderColor: '#fecaca',
      borderRadius: scale(8),
      paddingHorizontal: scale(12),
      paddingVertical: scale(10),
    },
    errorBannerText: {
      color: '#dc2626',
      textAlign: 'center',
    },
    forgotPassword: {
      textAlign: 'right',
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: scale(10)
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: Colors[theme]?.palette.gray[300],
    },
    dividerText: {
      color: Colors[theme]?.palette.gray[400],
      paddingHorizontal: scale(16),
    },
    googleButton: {
      borderColor: Colors[theme]?.palette.gray[300],
      borderWidth: 1,
      backgroundColor: Colors[theme]?.surface,
    },
    labelText: {
      color: Colors[theme]?.palette.gray[500],
    },
    linkActionText: {
      color: Colors[theme]?.primary,
      fontWeight: 'bold'
    },
    linkContainer: {
      alignItems: 'center',
      paddingVertical: scale(10)
    },
    textInput: {
      backgroundColor: Colors[theme]?.palette.gray[100],
      borderRadius: scale(12),
      color: Colors[theme]?.text,
      fontSize: scale(12),
      paddingHorizontal: scale(11),
      paddingVertical: scale(11)
    },
  });

export default styles;
