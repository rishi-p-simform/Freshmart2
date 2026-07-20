import { StyleSheet } from 'react-native';
import { Colors, scale, type ThemeMode } from '../../theme';

/**
 * A StyleSheet object that contains all of the home screen styles.
 * @param {ThemeMode} theme - The theme to use for the styles.
 * @returns {StyleSheet} A StyleSheet object containing all of the home screen styles.
 */
const styles = (theme: ThemeMode) =>
  StyleSheet.create({
    screenView: {
      backgroundColor: Colors[theme]?.background,
      flex: 1
    },
    contentContainer: {
      paddingBottom: scale(66)
    },

    textView: {
      color: Colors[theme]?.black
    },
    greetingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: scale(16),
      marginVertical: scale(10)
    },
    greetingText: {
      color: Colors[theme]?.text || Colors[theme]?.black
    },
    lottieWave: {
      width: scale(22),
      height: scale(22),
      marginLeft: scale(6),
      transform: [{ rotate: '-25deg' }]
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: scale(16),
      marginTop: scale(10)
    },
    sectionTitle: {
      color: Colors[theme]?.text || Colors[theme]?.black
    },
    seeAllText: {
      color: Colors[theme]?.primary || Colors[theme]?.orange
    },
    categoriesList: {
      paddingHorizontal: scale(16),
      paddingVertical: scale(10),
      gap: scale(16)
    }
  });

export default styles;
