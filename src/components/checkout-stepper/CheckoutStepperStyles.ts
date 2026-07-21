import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, type ThemeMode } from '../../theme';

/**
 * Stylesheet for the CheckoutStepper component.
 * Provides styles for the stepper row, step circles (done/active/pending),
 * and background connector lines.
 *
 * @param {ThemeMode} theme - The current theme mode.
 * @returns {StyleSheet} Theme-specific styles.
 */
const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    container: {
      width: '100%',
      height: scale(32),
      justifyContent: 'center'
    },
    connectorsContainer: {
      position: 'absolute',
      left: scale(14),
      right: scale(14),
      flexDirection: 'row',
      alignItems: 'center'
    },
    connectorWrapper: {
      flex: 1,
      height: scale(2),
      backgroundColor: Colors[theme]?.palette.gray[200]
    },
    connectorFill: {
      height: '100%'
    },
    circlesContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      zIndex: 1
    },
    circle: {
      width: scale(28),
      height: scale(28),
      borderRadius: scale(14),
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: scale(2),
      borderColor: Colors[theme]?.palette.gray[300],
      backgroundColor: Colors[theme]?.surface
    },
    circleDone: {
      backgroundColor: Colors[theme]?.green,
      borderColor: Colors[theme]?.green
    },
    circleActive: {
      backgroundColor: Colors[theme]?.primary,
      borderColor: Colors[theme]?.primary
    },
    circlePending: {
      backgroundColor: Colors[theme]?.surface,
      borderColor: Colors[theme]?.palette.gray[200]
    },
    stepNumber: {
      fontSize: scale(12),
      fontWeight: '700',
      color: Colors[theme]?.palette.gray[400]
    },
    stepNumberActive: {
      color: Colors[theme]?.white
    }
  });

export default styleSheet;
