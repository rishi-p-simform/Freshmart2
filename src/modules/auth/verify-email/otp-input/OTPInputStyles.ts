import { StyleSheet } from 'react-native';
import { Colors, scale, type ThemeMode } from '../../../../theme';

export const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    otpBoxesContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%'
    },
    otpBox: {
      width: scale(42),
      height: scale(55),
      borderWidth: 1,
      borderColor: Colors[theme].gray,
      borderRadius: scale(10),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors[theme].surface
    },
    otpText: {
      color: Colors[theme].text
    },
    cursor: {
      width: 2,
      height: scale(24),
      backgroundColor: Colors[theme].orange
    },
    hiddenInput: {
      position: 'absolute',
      width: 1,
      height: 1,
      opacity: 0
    }
  });
