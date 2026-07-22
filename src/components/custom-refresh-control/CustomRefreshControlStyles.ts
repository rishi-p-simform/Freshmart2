import { StyleSheet } from 'react-native';
import type { ThemeMode } from '../../theme';
import Colors from '../../theme/Colors';

const createStyles = (theme: ThemeMode) => {
  const currentColors = Colors[theme] ?? Colors.light;

  return StyleSheet.create({
    container: {
      flex: 1,
      overflow: 'hidden'
    },
    spinnerContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
      paddingVertical: 12
    },
    spinnerCircle: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: currentColors.alpha(currentColors.surface, 0.8),
      borderWidth: 1.5,
      borderColor: currentColors.alpha(currentColors.primary, 0.15),
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: currentColors.gray,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4
    }
  });
};

export default createStyles;
