import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, type ThemeMode } from '../../theme';
import { type TextVariant } from '../text';
import { type CustomButtonVariant } from './CustomButtonTypes';

/**
 * Maps the button variant to the corresponding text variant.
 *
 * @param {CustomButtonVariant} buttonVariant - The variant of the button.
 * @returns {TextVariant} The corresponding text variant.
 */
export const getTextVariant = (buttonVariant: CustomButtonVariant): TextVariant => {
  switch (buttonVariant) {
    case 'outline':
      return 'titleMedium';
    case 'solid':
      return 'titleMedium';
    case 'hyperlink':
      return 'bodyMedium';
    default:
      return 'bodyMedium';
  }
};

/**
 * Determines the color of the activity indicator based on the button variant.
 *
 * @param {CustomButtonVariant} buttonVariant - The variant of the button.
 * @param {ThemeMode} theme - The theme mode of the application. (Unused)
 * @returns {keyof ThemeColors} The color of the activity indicator.
 */
export const activityIndicatorColor = (
  buttonVariant: CustomButtonVariant,
  theme: ThemeMode
): string => {
  switch (buttonVariant) {
    case 'outline':
      return Colors[theme]?.primary;
    case 'solid':
      return Colors[theme]?.white;
    case 'hyperlink':
      return Colors[theme]?.primary;
    default:
      return Colors[theme]?.white;
  }
};

/**
 * Determines the color of the activity indicator based on the button variant.
 *
 * @param {CustomButtonVariant} buttonVariant - The variant of the button.
 * @param {ThemeMode} theme - The theme mode of the application. (Unused)
 * @returns {keyof ThemeColors} The color of the activity indicator.
 */
export const textColor = (buttonVariant: CustomButtonVariant, theme: ThemeMode): string => {
  switch (buttonVariant) {
    case 'outline':
      return Colors[theme]?.primary;
    case 'solid':
      return Colors[theme]?.white;
    case 'hyperlink':
      return Colors[theme]?.primary;
    default:
      return Colors[theme]?.white;
  }
};

/**
 * Creates a style sheet for button variants based on the given theme.
 * @param {ThemeMode} theme - The theme to use for styling.
 * @returns {StyleSheet} A style sheet containing styles for button variants.
 */
export const buttonVariantStyles = (theme: ThemeMode) =>
  StyleSheet.create({
    hyperlink: {
      backgroundColor: Colors[theme]?.transparent,
      height: scale(24)
    },
    outline: {
      backgroundColor: Colors[theme]?.transparent,
      borderColor: Colors[theme]?.primary,
      borderRadius: scale(16),
      borderWidth: 1
    },
    solid: {
      backgroundColor: Colors[theme]?.primary,
      borderColor: Colors[theme]?.primary,
      borderRadius: scale(16),
      borderWidth: 1
    }
  });

/**
 * Create a custom style sheet for the given theme.
 * @param {StyleSheetOption} theme - The theme to create the style sheet for.
 * @returns A custom style sheet that can be injected into the component.
 */
export const buttonDefaultStyles = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    container: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    defaultButtonStyle: {
      alignItems: 'center',
      backgroundColor: Colors[theme]?.primary,
      height: scale(52), // Larger touch target
      justifyContent: 'center',
      width: '100%',
      borderRadius: scale(16)
    },
    disabledButtonStyle: {
      opacity: 0.5,
      borderRadius: scale(16)
    },
    pressedStyle: {
      opacity: 0.6
    }
  });
