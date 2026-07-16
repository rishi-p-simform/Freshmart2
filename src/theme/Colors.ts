/**
 * A collection of colors used in the theme.
 */

export const palette = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8', // Base Primary
    800: '#1e40af',
    900: '#1e3a8a',
  },
  secondary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb', // Base Secondary
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  orange: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316', // Base Orange
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
  },
  gray: {
    50: '#f8fafc', // Background
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  error: {
    50: '#fef2f2',
    500: '#ef4444',
    900: '#7f1d1d',
  },
  success: {
    50: '#f0fdf4',
    500: '#22c55e',
    900: '#14532d',
  },
  common: {
    white: '#FFFFFF', // Surface
    black: '#000000',
    transparent: 'transparent',
    transparentBlack: '#00000000',
    transparentWhite: '#FFFFFF00',
  },
  gradients: {
    primary: ['#1E3A8A', '#2563EB'],
    light: ['#EFF6FF', '#DBEAFE'],
  }
};

// Define the keys for theme colors to maintain backward compatibility
type Keys =
  | 'primary'
  | 'secondary'
  | 'gray'
  | 'error'
  | 'pink'
  | 'orange'
  | 'lightBlue'
  | 'red'
  | 'darkBlue'
  | 'transparent'
  | 'green'
  | 'background'
  | 'surface'
  | 'text';

type CommonKeys = 'white' | 'black' | 'transparentBlack' | 'transparentWhite' | 'solidWhite';

// Define theme colors with corresponding color values
const themeColors: Record<Keys, string> = {
  primary: palette.primary[700],
  secondary: palette.secondary[600],
  gray: palette.gray[500],
  error: palette.error[500],
  pink: '#BA25EB', // Kept for backward compatibility
  orange: palette.orange[500],
  lightBlue: palette.primary[400],
  red: palette.error[500],
  darkBlue: palette.primary[900],
  transparent: palette.common.transparent,
  green: palette.success[500],
  background: palette.gray[50],
  surface: palette.common.white,
  text: palette.gray[900],
};

export const commonColors: Record<CommonKeys, string> = {
  white: palette.common.white,
  black: palette.common.black,
  transparentBlack: palette.common.transparentBlack,
  transparentWhite: palette.common.transparentWhite,
  solidWhite: palette.common.white
};

type ThemeColors = Record<Keys, string> & Record<CommonKeys, string> & {
  gradients: typeof palette.gradients;
  palette: typeof palette;
  /**
   * Adds opacity to a given hex color.
   * @param hexColor The hex color string (e.g. '#2563EB')
   * @param opacity A number between 0 and 1 (e.g. 0.5 for 50% opacity)
   * @returns The updated hex color string with alpha channel appended.
   */
  alpha: (hexColor: string, opacity: number) => string;
};

/**
 * Helper function to add opacity to a hex color.
 * Used internally by the theme `alpha` property.
 */
const alphaHelper = (hexColor: string, opacity: number): string => {
  const validOpacity = Math.max(0, Math.min(1, opacity));
  const alphaHex = Math.round(validOpacity * 255)
    .toString(16)
    .padStart(2, '0');
  return `${hexColor}${alphaHex}`;
};

/**
 * A light theme object.
 */
const light: ThemeColors = {
  ...themeColors,
  black: commonColors.black,
  white: commonColors.white,
  transparentWhite: commonColors.transparentWhite,
  transparentBlack: commonColors.transparentBlack,
  solidWhite: commonColors.solidWhite,
  gradients: palette.gradients,
  palette,
  alpha: alphaHelper,
};

type PaletteColor = { 50: string; 100: string; 200: string; 300: string; 400: string; 500: string; 600: string; 700: string; 800: string; 900: string };
const reverseColor = (c: PaletteColor): PaletteColor => ({
  50: c[900], 100: c[800], 200: c[700], 300: c[600], 400: c[500],
  500: c[400], 600: c[300], 700: c[200], 800: c[100], 900: c[50]
});

type StatusColor = { 50: string; 500: string; 900: string };
const reverseStatusColor = (c: StatusColor): StatusColor => ({
  50: c[900], 500: c[500], 900: c[50]
});

const darkPalette: typeof palette = {
  ...palette,
  primary: reverseColor(palette.primary),
  secondary: reverseColor(palette.secondary),
  orange: reverseColor(palette.orange),
  gray: reverseColor(palette.gray),
  error: reverseStatusColor(palette.error),
  success: reverseStatusColor(palette.success),
};

/**
 * A dark theme object.
 */
const dark: ThemeColors = {
  ...themeColors,
  primary: palette.primary[700],
  secondary: palette.secondary[300],
  background: palette.gray[900],
  surface: palette.gray[800],
  text: palette.gray[50],
  black: commonColors.white,
  white: commonColors.black,
  transparentWhite: commonColors.transparentBlack,
  transparentBlack: commonColors.transparentWhite,
  solidWhite: commonColors.solidWhite,
  gradients: {
    primary: ['#2563EB', '#1E3A8A'],
    light: ['#1e293b', '#0f172a'],
  },
  palette: darkPalette,
  alpha: alphaHelper,
};

export enum ThemeModeEnum {
  'light' = 'light',
  'dark' = 'dark',
  'system' = 'system'
}

export type ThemeMode = ThemeModeEnum.light | ThemeModeEnum.dark;

export default { light, dark };
