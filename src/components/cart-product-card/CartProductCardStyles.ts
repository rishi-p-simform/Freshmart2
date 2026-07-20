import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, type ThemeMode } from '../../theme';

/**
 * Stylesheet for the CartProductCard component.
 * @param {ThemeMode} theme - The theme to use.
 * @returns {StyleSheet} The theme-specific styles.
 */
const styles = (theme: ThemeMode, isDark?: boolean) =>
  StyleSheet.create({
    card: {
      backgroundColor: Colors[theme]?.surface,
      padding: scale(9),
      borderRadius: scale(12),
      flexDirection: 'row',
      gap: scale(8),
      alignItems: 'center',
      ...ApplicationStyles(theme).cardShadow
    },
    imageStyle: {
      width: scale(54),
      height: scale(54),
      borderRadius: scale(10),
      backgroundColor: Colors[theme]?.palette.gray[100]
    },
    textSection: {
      flex: 1,
      gap: scale(2)
    },
    productName: {
      color: Colors[theme]?.text,
      fontWeight: '600',
      flexShrink: 1
    },
    unitText: {
      color: Colors[theme]?.palette.gray[500]
    },
    priceText: {
      color: Colors[theme]?.text,
      fontWeight: '700'
    },
    rightSection: {
      justifyContent: 'center',
      alignItems: 'flex-end',
      gap: scale(6)
    },
    transIcon: {
      alignSelf: 'flex-end',
      padding: scale(6),
      borderRadius: scale(6),
      backgroundColor:
        theme === 'dark' ? Colors[theme]?.palette.error[900] : Colors[theme]?.palette.error[50],
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });

export default styles;
