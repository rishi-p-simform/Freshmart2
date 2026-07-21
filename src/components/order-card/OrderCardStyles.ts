import applicationStyles from '@/src/theme/ApplicationStyles';
import { StyleSheet } from 'react-native';
import { Colors, scale, type ThemeMode } from '../../theme';

/**
 * Stylesheet for the OrderCard component.
 * @param {ThemeMode} theme - The theme to use.
 * @returns {StyleSheet} The theme-specific styles.
 */
const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    card: {
      marginHorizontal: scale(14),
      backgroundColor: Colors[theme]?.surface,
      borderRadius: scale(18),
      padding: scale(14),
      gap: scale(8),
      ...applicationStyles(theme).cardShadow
    },

    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: scale(4)
    },

    bottom: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: scale(4)
    },

    title: {
      color: Colors[theme]?.text
    },

    secondaryText: {
      color: Colors[theme]?.gray
    },

    primaryText: {
      color: Colors[theme]?.primary
    },

    reorderBtn: {
      backgroundColor: Colors[theme].palette.primary[50],
      borderWidth: scale(1),
      borderColor: Colors[theme].palette.primary[200],
      borderRadius: scale(8),
      minWidth: scale(80),
      height: scale(36),
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: scale(14)
    },

    reorderBtnDisabled: {
      opacity: 0.7
    }
  });

export default styleSheet;
