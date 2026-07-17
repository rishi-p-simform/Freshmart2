import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, type ThemeMode } from '../../../../theme';

/**
 * A StyleSheet object that contains all of the sign up form styles.
 * @param {ThemeMode} theme - The theme to use for the styles.
 * @returns {StyleSheet} A StyleSheet object containing all of the sign up form styles.
 */
const styles = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    buttonText: {
      color: Colors[theme]?.white
    },
    formContainer: {
      flex: 1,
      paddingHorizontal: scale(20),
      gap: scale(10)
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
    labelText: {
      color: Colors[theme]?.palette.gray[500],
    },
    linkActionText: {
      color: Colors[theme]?.lightBlue,
    },
    linkContainer: {
      alignItems: 'center',
    },
    linkText: {
      color: Colors[theme]?.lightBlue,
      fontSize: scale(14)
    },
    subtitleText: {
      color: Colors[theme]?.gray,
      fontSize: scale(14),
      lineHeight: scale(20),
    },
    textInput: {
      backgroundColor: Colors[theme]?.black,
      borderRadius: scale(5),
      color: Colors[theme]?.white,
      fontSize: scale(16),
      paddingHorizontal: scale(10),
      paddingVertical: scale(10)
    },
    titleText: {
      color: Colors[theme]?.black,
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: scale(4)
    },
    checkbox: {
      width: scale(20),
      height: scale(20),
      borderRadius: scale(4),
      borderWidth: 2,
      borderColor: Colors[theme]?.primary || Colors[theme]?.lightBlue,
      marginRight: scale(10),
      justifyContent: 'center',
      alignItems: 'center'
    },
    checkboxChecked: {
      backgroundColor: Colors[theme]?.primary || Colors[theme]?.lightBlue,
      borderColor: Colors[theme]?.primary || Colors[theme]?.lightBlue
    },
    termsText: {
      flex: 1,
      color: Colors[theme]?.gray
    },
  });

export default styles;
