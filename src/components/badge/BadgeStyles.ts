import { StyleSheet } from 'react-native';
import { Colors, scale, type ThemeMode } from '../../theme';

/**
 * Stylesheet for the Badge component.
 * @param {ThemeMode} theme - The theme to use.
 * @returns {StyleSheet} The theme-specific styles.
 */
const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    badge: {
      paddingHorizontal: scale(10),
      paddingVertical: scale(4),
      borderRadius: scale(12),
      alignSelf: 'flex-start',
      justifyContent: 'center',
      alignItems: 'center'
    },
    label: {
      textTransform: 'capitalize'
    },
    // Variant background colors
    bgSuccess: {
      backgroundColor: Colors[theme]?.palette.success[50]
    },
    textSuccess: {
      color: Colors[theme]?.palette.success[500]
    },
    bgError: {
      backgroundColor: Colors[theme]?.palette.error[50]
    },
    textError: {
      color: Colors[theme]?.palette.error[500]
    },
    bgActive: {
      backgroundColor: Colors[theme]?.palette.orange[50]
    },
    textActive: {
      color: Colors[theme]?.palette.orange[600]
    },
    bgWarning: {
      backgroundColor: Colors[theme]?.palette.orange[50]
    },
    textWarning: {
      color: Colors[theme]?.palette.orange[500]
    },
    bgDefault: {
      backgroundColor: Colors[theme]?.palette.gray[100]
    },
    textDefault: {
      color: Colors[theme]?.palette.gray[700]
    }
  });

export default styleSheet;
