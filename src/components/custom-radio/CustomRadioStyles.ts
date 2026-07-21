import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, type ThemeMode } from '../../theme';

/**
 * Stylesheet for the CustomRadio component.
 * Provides themed styles for the radio option card, selected state,
 * left icon slot, title/subtitle text, and the radio indicator circle.
 *
 * @param {ThemeMode} theme - The current theme mode ('light' | 'dark').
 * @returns {StyleSheet} Theme-specific styles.
 */
const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    container: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: scale(16),
      paddingVertical: scale(12),
      borderRadius: scale(12),
      borderWidth: 1,
      borderColor: Colors[theme]?.palette.gray[200],
      backgroundColor: Colors[theme]?.surface,
      columnGap: scale(9)
    },
    selectedContainer: {
      borderWidth: 2,
      borderColor: Colors[theme]?.primary,
      backgroundColor: Colors[theme].alpha(Colors[theme].primary, 0.1)
    },
    textContainer: {
      flex: 1,
      gap: scale(3)
    },
    leftIconContainer: {
      width: scale(32),
      height: scale(32),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: scale(9)
    },
    leftIconText: {
      fontSize: scale(16)
    },
    titleText: {
      color: Colors[theme]?.text
    },
    titleTextSelected: {
      color: Colors[theme]?.primary
    },
    subtitleText: {
      color: Colors[theme]?.palette.gray[500],
      fontSize: scale(11)
    },
    radio: {
      width: scale(20),
      height: scale(20),
      borderRadius: scale(10),
      borderWidth: scale(2),
      borderColor: Colors[theme]?.palette.gray[300],
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors[theme]?.surface
    },
    radioSelected: {
      backgroundColor: Colors[theme]?.primary,
      borderColor: Colors[theme]?.primary
    }
  });

export default styleSheet;
