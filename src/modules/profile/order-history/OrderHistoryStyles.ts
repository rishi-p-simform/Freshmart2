import { StyleSheet } from 'react-native';
import { Colors, scale, type ThemeMode } from '../../../theme';

/**
 * Stylesheet for OrderHistoryScreen.
 * @param {ThemeMode} theme - Active theme.
 * @returns {StyleSheet} Calculated styles.
 */
const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[theme]?.background
    },
    list: {
      gap: scale(10),
      paddingBottom: scale(20),
      justifyContent: 'flex-start'
    },
    footer: {
      marginVertical: scale(20)
    },
    emptyList: {
      flex: 1
    },
    empty: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: scale(40),
      paddingHorizontal: scale(32)
    },
    emptyIcon: {
      width: '100%',
      height: scale(200)
    },
    emptyTitle: {
      marginTop: scale(16),
      color: Colors[theme]?.text
    },
    emptySubtitle: {
      marginTop: scale(6),
      textAlign: 'center',
      color: Colors[theme]?.gray
    }
  });

export default styleSheet;
