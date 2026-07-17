import { StyleSheet } from 'react-native';
import { Fonts } from '../../assets';
import { Colors, scale, type ThemeMode } from '../../theme';

/**
 * Font weight styles.
 */
export const fontWeightStyles = StyleSheet.create({
  bold: {
    fontFamily: Fonts.bold
  },
  medium: {
    fontFamily: Fonts.medium
  },
  regular: {
    fontFamily: Fonts.regular
  },
  semiBold: {
    fontFamily: Fonts.semiBold
  }
});

/**
 * Font size styles with responsive scaling.
 */
export const fontSizeStyles = StyleSheet.create({
  displayLG: {
    fontSize: scale(48, true),
  },
  displayMD: {
    fontSize: scale(36, true),
  },
  displaySM: {
    fontSize: scale(30, true),
  },
  displayXS: {
    fontSize: scale(22, true),
  },
  textLG: {
    fontSize: scale(16, true),
  },
  textMD: {
    fontSize: scale(14, true),
  },
  textSM: {
    fontSize: scale(12, true),
  },
  textXL: {
    fontSize: scale(18, true),
  },
  textXS: {
    fontSize: scale(10, true),
  }
});

/**
 * Text variant styles based on the theme.
 * @param theme - The current theme mode (light or dark).
 * @returns A StyleSheet object containing styles for different text variants.
 */
export const textVariantsStyles = (theme: ThemeMode) =>
  StyleSheet.create({
    // Displays
    displayLarge: {
      ...fontSizeStyles.displayLG,
      ...fontWeightStyles.bold,
      color: Colors[theme].text,
    },
    displayMedium: {
      ...fontSizeStyles.displayMD,
      ...fontWeightStyles.bold,
      color: Colors[theme].text,
    },
    displaySmall: {
      ...fontSizeStyles.displaySM,
      ...fontWeightStyles.bold,
      color: Colors[theme].text,
    },

    // Headlines
    headlineLarge: {
      ...fontSizeStyles.displayXS,
      ...fontWeightStyles.bold,
      color: Colors[theme].text,
    },
    headlineMedium: {
      ...fontSizeStyles.textXL,
      ...fontWeightStyles.bold,
      color: Colors[theme].text,
    },
    headlineSmall: {
      ...fontSizeStyles.textLG,
      ...fontWeightStyles.bold,
      color: Colors[theme].text,
    },

    // Titles
    titleLarge: {
      ...fontSizeStyles.textXL,
      ...fontWeightStyles.semiBold,
      color: Colors[theme].text,
    },
    titleMedium: {
      ...fontSizeStyles.textLG,
      ...fontWeightStyles.semiBold,
      color: Colors[theme].text,
    },
    titleSmall: {
      ...fontSizeStyles.textMD,
      ...fontWeightStyles.bold,
      color: Colors[theme].text,
    },

    // Body
    bodyLarge: {
      ...fontSizeStyles.textLG,
      ...fontWeightStyles.regular,
      color: Colors[theme].text,
    },
    bodyMedium: {
      ...fontSizeStyles.textMD,
      ...fontWeightStyles.regular,
      color: Colors[theme].text,
    },
    bodySmall: {
      ...fontSizeStyles.textSM,
      ...fontWeightStyles.regular,
      color: Colors[theme].text,
    },

    // Labels
    labelLarge: {
      ...fontSizeStyles.textMD,
      ...fontWeightStyles.medium,
      color: Colors[theme].text,
    },
    labelMedium: {
      ...fontSizeStyles.textSM,
      ...fontWeightStyles.medium,
      color: Colors[theme].text,
    },
    labelSmall: {
      ...fontSizeStyles.textXS,
      ...fontWeightStyles.medium,
      color: Colors[theme].text,
    },

    // Captions
    caption: {
      ...fontSizeStyles.textXS,
      ...fontWeightStyles.regular,
      color: Colors[theme].gray,
    },
    captionMedium: {
      ...fontSizeStyles.textXS,
      ...fontWeightStyles.medium,
      color: Colors[theme].gray,
    },
    captionBold: {
      ...fontSizeStyles.textXS,
      ...fontWeightStyles.bold,
      color: Colors[theme].gray,
    },

    // Status
    error: {
      ...fontWeightStyles.medium,
      color: Colors[theme].error,
    },
    success: {
      ...fontSizeStyles.textSM,
      ...fontWeightStyles.medium,
      color: Colors[theme].green,
    },
    warning: {
      ...fontSizeStyles.textSM,
      ...fontWeightStyles.medium,
      color: Colors[theme].orange,
    },
    info: {
      ...fontSizeStyles.textSM,
      ...fontWeightStyles.medium,
      color: Colors[theme].primary,
    },
  });