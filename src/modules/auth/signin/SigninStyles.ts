import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, type ThemeMode, scale } from '../../../theme';

const styles = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    screenView: {
      backgroundColor: Colors[theme]?.background,
      flex: 1
    },
    bottomContainer: {
      flex: 1,
      paddingTop: scale(24),
      paddingHorizontal: scale(24)
    }
  });

export default styles;
