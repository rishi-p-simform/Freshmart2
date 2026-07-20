import { StyleSheet } from 'react-native';
import { Colors, scale, type ThemeMode } from '../../theme';

/**
 * Stylesheet for the ItemCounter component.
 * @param {ThemeMode} theme - The theme to use.
 * @returns {StyleSheet} The theme-specific styles.
 */
const styles = (theme: ThemeMode, _isDark?: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scale(4)
    },
    button: {
      width: scale(22),
      height: scale(22),
      borderRadius: scale(6),
      alignItems: 'center',
      justifyContent: 'center'
    },
    addBtn: {
      backgroundColor: Colors[theme]?.orange
    },
    minusBtn: {
      backgroundColor: Colors[theme]?.palette.gray[200]
    },
    countText: {
      color: Colors[theme]?.text,
      minWidth: scale(12),
      textAlign: 'center'
    }
  });

export default styles;
