import { StyleSheet } from 'react-native';
import { Colors, scale, type ThemeMode } from '../../theme';

/**
 * A StyleSheet object that contains all of the explore screen styles.
 * @param {ThemeMode} theme - The theme to use for the styles.
 * @returns {StyleSheet} A StyleSheet object containing all of the explore screen styles.
 */
const styles = (theme: ThemeMode, isDark?: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[theme]?.background,
    },
    searchContainer: {
      paddingHorizontal: scale(16),
      paddingTop: scale(16),
      paddingBottom: scale(8),
    },
    listContent: {
      paddingHorizontal: scale(10),
      paddingBottom: scale(20),
    },
    columnWrapper: {
      justifyContent: 'flex-start',
    },
    cardWrapper: {
      width: '28%',
      marginHorizontal: '2.7%',
      marginVertical: scale(8),
      backgroundColor: Colors[theme]?.surface,
      borderRadius: scale(12),
      paddingVertical: scale(10),
      paddingHorizontal: scale(14),
      alignItems: 'center',
      justifyContent: 'flex-start',
      // Shadow styles for premium look
      shadowColor: Colors[theme]?.black || '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.4 : 0.06,
      shadowRadius: scale(8),
      elevation: 3,
    },
    categoryCardOverride: {
      width: '100%',
      alignItems: 'center',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default styles;
