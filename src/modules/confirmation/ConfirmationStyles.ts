import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, type ThemeMode } from '../../theme';

/**
 * Stylesheet generator for ConfirmationScreen.
 */
const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    container: {
      flex: 1,
      backgroundColor: Colors[theme]?.background
    },
    scrollView: {
      flex: 1
    },
    contentContainer: {
      paddingHorizontal: scale(16),
      paddingBottom: scale(24),
      gap: scale(14),
      alignItems: 'center'
    },
    animation: {
      width: scale(160),
      height: scale(160)
    },
    textColor: {
      color: Colors[theme]?.text
    },
    primaryColor: {
      color: Colors[theme]?.primary
    },
    whiteText: {
      color: Colors[theme]?.solidWhite
    },
    secondaryText: {
      color: Colors[theme]?.palette.gray[500]
    },
    header: {
      alignItems: 'center',
      gap: scale(6)
    },
    textCenter: {
      textAlign: 'center'
    },
    orderSection: {
      paddingVertical: scale(10),
      borderWidth: scale(1),
      backgroundColor: Colors[theme]?.surface,
      alignSelf: 'stretch',
      borderColor: Colors[theme]?.palette.gray[200],
      borderRadius: scale(12),
      gap: scale(2)
    },
    iconRow: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignSelf: 'stretch',
      gap: scale(8)
    },
    iconContainer: {
      alignItems: 'center',
      flex: 1,
      padding: scale(6),
      borderRadius: scale(10)
    },
    icon: {
      fontSize: scale(14)
    },
    zumthorBg: {
      backgroundColor: Colors[theme]?.palette.primary[50]
    },
    gray96Bg: {
      backgroundColor: Colors[theme]?.palette.gray[100]
    },
    fetaBg: {
      backgroundColor: Colors[theme]?.palette.success[50]
    },
    btnStyle: {
      alignSelf: 'stretch'
    },
    continueBtn: {
      backgroundColor: Colors[theme]?.surface,
      borderWidth: scale(1),
      borderColor: Colors[theme]?.palette.gray[200]
    }
  });

export default styleSheet;
