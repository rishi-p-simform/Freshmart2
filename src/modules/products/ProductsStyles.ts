import { StyleSheet } from 'react-native';
import { Colors, scale, type ThemeMode } from '../../theme';

/**
 * A StyleSheet object that contains all of the products screen styles.
 * @param {ThemeMode} theme - The theme to use for the styles.
 * @returns {StyleSheet} A StyleSheet object containing all of the products screen styles.
 */
const styles = (theme: ThemeMode, _isDark?: boolean) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: Colors[theme]?.background,
    },
    scrollView: {
      flex: 1,
    },
    contentContainer: {
      paddingBottom: scale(20),
    },
    listContent: {
      paddingHorizontal: scale(16),
      paddingVertical: scale(16),
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: scale(20),
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: scale(40),
    },
    emptyText: {
      color: Colors[theme]?.palette.gray[300],
      fontSize: scale(16),
      textAlign: 'center',
    },
  });

export default styles;
