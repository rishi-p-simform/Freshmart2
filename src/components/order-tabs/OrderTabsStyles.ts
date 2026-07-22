import { StyleSheet } from 'react-native';
import { Colors, scale, type ThemeMode } from '../../theme';

/**
 * Stylesheet for the OrderTabs component.
 * @param {ThemeMode} theme - The theme to use.
 * @returns {StyleSheet} The theme-specific styles.
 */
const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: '100%',
      backgroundColor: Colors[theme]?.surface,
      borderBottomWidth: scale(1),
      borderColor: Colors[theme]?.palette.gray[200]
    },
    tab: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: scale(12),
      backgroundColor: Colors[theme]?.surface
    },
    activeTab: {
      borderBottomWidth: scale(2),
      borderColor: Colors[theme]?.primary,
      marginBottom: -scale(1)
    },
    text: {
      color: Colors[theme]?.gray
    },
    activeText: {
      color: Colors[theme]?.primary
    }
  });

export default styleSheet;
