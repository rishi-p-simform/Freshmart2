import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, type ThemeMode } from '../../theme';

/**
 * Creates a StyleSheet object based on the provided theme.
 * @param {ThemeMode} theme - The theme object containing color definitions.
 * @param {boolean} [isDark] - Whether the dark mode is currently active.
 * @returns {StyleSheet} A StyleSheet object with styles for the CategoryCard.
 */
const styleSheet = (theme: ThemeMode, isDark?: boolean) => {
  const gray = Colors[theme]?.palette?.gray;

  return StyleSheet.create({
    ...ApplicationStyles(theme),
    container: {
      width: scale(52),
      gap: scale(3),
      alignItems: 'center'
    },
    imageStyle: {
      width: scale(52),
      height: scale(52),
      borderRadius: scale(12)
    },
    textStyle: {
      textAlign: 'center'
    },
    textColor: {
      color: gray?.[600] ?? '#475569'
    }
  });
};

export default styleSheet;
