import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, ThemeMode } from '../../theme';
import { fontSizeStyles } from '../text/TextStyles';

/**
 * Styles for the CustomInput component
 */
export const styleSheet = (theme: ThemeMode, isDark?: boolean) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? Colors[theme]?.surface : Colors[theme]?.palette.gray[100],
      borderColor: Colors[theme]?.palette.gray[200],
      borderRadius: scale(12),
      borderWidth: scale(1),
      paddingHorizontal: scale(11),
      minHeight: scale(44)
    },
    input: {
      flex: 1,
      color: Colors[theme]?.text,
      paddingVertical: scale(11),
      paddingHorizontal: scale(8),
      ...fontSizeStyles.textMD
    },
    leftIconContainer: {
      marginRight: scale(4)
    },
    rightIconContainer: {
      padding: scale(4),
      marginLeft: scale(4)
    },
    label: {
      letterSpacing: 0,
      color: Colors[theme]?.palette.gray[500],
      marginBottom: scale(8)
    }
  });
