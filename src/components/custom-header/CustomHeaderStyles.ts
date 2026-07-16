import { StyleSheet } from 'react-native';
import { Colors, scale, type ThemeMode } from '../../theme';

const styles = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: scale(16),
      paddingVertical: scale(18),
      backgroundColor: Colors[theme]?.background || Colors[theme]?.white,
      gap: scale(10),
    },
    leftContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scale(10),
    },
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    rightContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scale(10),
    },
    textTitle: {
      color: Colors[theme]?.text,
    },
    backButton: {
      width: scale(40),
      height: scale(40),
      borderRadius: scale(12),
      backgroundColor: Colors[theme]?.palette?.gray?.[50],
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default styles;
