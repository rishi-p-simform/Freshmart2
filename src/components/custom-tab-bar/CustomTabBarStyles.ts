import { StyleSheet } from 'react-native';
import { Colors, scale, type ThemeMode } from '../../theme';

/**
 * Creates StyleSheet styles for the custom bottom tab bar.
 * @param {ThemeMode} theme - The active theme mode.
 * @param {number} bottomInset - The safe area bottom inset to avoid overlapping the home indicator.
 * @returns {StyleSheet} A stylesheet containing all tab bar styles.
 */
const styles = (theme: ThemeMode, bottomInset: number) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: Colors[theme]?.white,
      height: scale(50) + bottomInset,
      borderTopWidth: 2,
      borderColor: Colors[theme]?.palette.gray[200],
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0
    },
    tabItem: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: scale(6)
    },
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative'
    },
    badgeContainer: {
      position: 'absolute',
      right: scale(-8),
      top: scale(-6),
      backgroundColor: Colors[theme]?.orange,
      borderRadius: scale(8),
      minWidth: scale(16),
      height: scale(16),
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: scale(3)
    },
    badgeText: {
      color: Colors[theme]?.white,
      fontSize: scale(9, true),
      fontWeight: 'bold',
      lineHeight: scale(12, true),
      textAlign: 'center'
    },
    label: {
      marginTop: scale(4),
      fontWeight: '500'
    }
  });

export default styles;
