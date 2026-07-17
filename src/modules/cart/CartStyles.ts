import { StyleSheet } from 'react-native';
import { Colors, type ThemeMode } from '../../theme';

/**
 * A StyleSheet object that contains all of the cart screen styles.
 * @param {ThemeMode} theme - The theme to use for the styles.
 * @returns {StyleSheet} A StyleSheet object containing all of the cart screen styles.
 */
const styles = (theme: ThemeMode) =>
  StyleSheet.create({
    screenView: {
      backgroundColor: Colors[theme]?.background,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    textView: {
      color: Colors[theme]?.black
    }
  });

export default styles;
