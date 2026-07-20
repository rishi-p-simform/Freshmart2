import { StyleSheet } from 'react-native';
import { Colors, scale, type ThemeMode } from '../../theme';

/**
 * Stylesheet for the ProductsListItems component.
 * @param {ThemeMode} theme - The theme to use.
 * @returns {StyleSheet} The theme-specific styles.
 */
const styles = (theme: ThemeMode, _isDark?: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
    },
    columnWrapperStyle: {
      gap: scale(12),
      justifyContent: 'space-between',
    },
    contentStyle: {
      gap: scale(12),
      paddingHorizontal: scale(16),
      paddingVertical: scale(16),
    },
    searchContainer: {
      paddingHorizontal: scale(16),
      paddingTop: scale(12),
    },
    searchInput: {
      height: scale(44),
      borderRadius: scale(10),
      paddingHorizontal: scale(14),
      backgroundColor: Colors[theme]?.surface,
      color: Colors[theme]?.text,
      borderWidth: 1,
      borderColor: Colors[theme]?.palette.gray[200],
    },
    cardWrapper: {
      flex: 0.5,
    },
    footerContainer: {
      paddingVertical: scale(16),
      alignItems: 'center',
      justifyContent: 'center',
    },
    footerText: {
      color: Colors[theme]?.palette.gray[500],
      textAlign: 'center',
    },
  });

export default styles;
