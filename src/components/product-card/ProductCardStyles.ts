import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, type ThemeMode } from '../../theme';

/**
 * Stylesheet for the ProductCard component.
 * @param {ThemeMode} theme - The theme to use.
 * @returns {StyleSheet} The theme-specific styles.
 */
const styles = (theme: ThemeMode, isDark?: boolean) =>
  StyleSheet.create({
    container: {
      backgroundColor: Colors[theme]?.surface,
      padding: scale(10),
      borderRadius: scale(12),
      gap: scale(6),
      width: '100%',
      flex: 1,
      ...ApplicationStyles(theme).cardShadow
    },
    navSec: {
      gap: scale(6),
      flex: 1
    },
    imageStyle: {
      width: '100%',
      height: scale(100),
      borderRadius: scale(8),
      backgroundColor: Colors[theme]?.palette.gray[200]
    },
    productNameText: {
      color: Colors[theme]?.text,
      fontWeight: '600',
      flexShrink: 1
    },
    ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scale(4),
      marginTop: scale(2)
    },
    secondaryText: {
      color: Colors[theme]?.palette.gray[500]
    },
    priceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: scale(4)
    },
    price: {
      color: Colors[theme]?.text
    }
  });

export default styles;
