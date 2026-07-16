import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, ThemeMode } from '../../theme';

/**
 * Styles for the CustomInput component
 */
export const styleSheet = (theme: ThemeMode, isDark?: boolean) => StyleSheet.create({
  ...ApplicationStyles(theme),
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors[theme]?.palette.gray[100],
    borderColor: 'transparent',
    borderRadius: scale(12),
    borderWidth: scale(1),
    paddingHorizontal: scale(11),
    minHeight: scale(44),
  },
  input: {
    flex: 1,
    color: Colors[theme]?.text,
    fontSize: scale(12),
    paddingVertical: scale(11),
    paddingHorizontal: scale(8),
  },
  leftIconContainer: {
    marginRight: scale(4),
  },
  rightIconContainer: {
    padding: scale(4),
    marginLeft: scale(4),
  }
});
