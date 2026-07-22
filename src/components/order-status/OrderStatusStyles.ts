import { StyleSheet } from 'react-native';
import { Colors, scale, type ThemeMode } from '../../theme';

/**
 * Stylesheet for OrderStatus vertical progress tracking component.
 * @param {ThemeMode} theme - Theme mode.
 * @returns {StyleSheet} Calculated styles.
 */
const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      paddingVertical: scale(12),
      paddingHorizontal: scale(16),
      gap: scale(16)
    },
    stepRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      position: 'relative'
    },
    indicatorContainer: {
      alignItems: 'center',
      width: scale(28),
      marginRight: scale(12)
    },
    iconCircle: {
      width: scale(26),
      height: scale(26),
      borderRadius: scale(13),
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2
    },
    completedCircle: {
      backgroundColor: Colors[theme]?.palette.success[500]
    },
    currentCircle: {
      backgroundColor: Colors[theme]?.palette.orange[500],
      borderWidth: scale(3),
      borderColor: Colors[theme]?.palette.orange[50]
    },
    pendingCircle: {
      backgroundColor: Colors[theme]?.palette.gray[100],
      borderWidth: scale(1.5),
      borderColor: Colors[theme]?.palette.gray[300]
    },
    cancelledCircle: {
      backgroundColor: Colors[theme]?.palette.error[500]
    },
    connectingLine: {
      width: scale(2),
      height: scale(32),
      position: 'absolute',
      top: scale(24),
      left: scale(12),
      zIndex: 1
    },
    completedLine: {
      backgroundColor: Colors[theme]?.palette.success[500]
    },
    pendingLine: {
      backgroundColor: Colors[theme]?.palette.gray[200]
    },
    stepContent: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: scale(26)
    },
    completedText: {
      color: Colors[theme]?.palette.success[500]
    },
    currentText: {
      color: Colors[theme]?.palette.orange[500]
    },
    pendingText: {
      color: Colors[theme]?.gray
    },
    cancelledText: {
      color: Colors[theme]?.error
    },
    timeText: {
      color: Colors[theme]?.gray,
      marginLeft: scale(8)
    }
  });

export default styleSheet;
