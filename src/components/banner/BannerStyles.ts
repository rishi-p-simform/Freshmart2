import { StyleSheet } from 'react-native';
import ApplicationStyles from '../../theme/ApplicationStyles';
import Colors, { type ThemeMode } from '../../theme/Colors';
import { scale, width } from '../../theme/Metrics';

export const ITEM_WIDTH = width - scale(28);
export const ITEM_GAP = scale(28);

/**
 * Styles for the Banner component
 */
export const styleSheet = (theme: ThemeMode, isDark?: boolean) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    scrollViewStyle: {
      gap: ITEM_GAP,
      paddingHorizontal: (width - ITEM_WIDTH) / 2
    },
    skeletonContainer: {
      flexDirection: 'row',
      gap: ITEM_GAP,
      paddingHorizontal: (width - ITEM_WIDTH) / 2,
      minHeight: scale(130)
    },
    container: {
      width: ITEM_WIDTH,
      padding: scale(12),
      borderRadius: scale(14),
      overflow: 'hidden',
      backgroundColor: Colors[theme]?.orange,
      gap: scale(6),
      minHeight: scale(130)
    },
    containerLeft: {
      flex: 1,
      flexShrink: 1
    },
    imageStyle: {
      width: ITEM_WIDTH,
      height: '140%',
      position: 'absolute'
    },
    circle: {
      position: 'absolute',
      top: -scale(10),
      right: -scale(10),
      width: scale(72),
      height: scale(72),
      borderRadius: scale(36),
      backgroundColor: Colors.light.alpha(Colors[theme]?.white, 0.1),
      zIndex: 99
    },
    gradient: {
      ...StyleSheet.absoluteFillObject
    },
    title: {
      color: Colors.light.alpha(Colors[theme]?.solidWhite, 0.85)
    },
    whiteText: {
      color: Colors[theme]?.solidWhite
    },
    orangeText: {
      color: Colors[theme]?.orange
    },
    shopNowSection: {
      flex: 1,
      flexDirection: 'row'
    },
    shopNow: {
      marginTop: scale(7),
      paddingHorizontal: scale(9),
      paddingVertical: scale(9),
      borderRadius: scale(7),
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-end',
      gap: scale(2),
      backgroundColor: Colors[theme]?.white
    },
    skeletonTitle: {
      width: scale(70),
      height: scale(10),
      marginBottom: scale(8),
      borderRadius: scale(4),
      backgroundColor: Colors.light.alpha(Colors[theme]?.white, 0.5)
    },
    skeletonSubtitle: {
      width: scale(100),
      height: scale(16),
      marginBottom: scale(12),
      borderRadius: scale(4),
      backgroundColor: Colors.light.alpha(Colors[theme]?.white, 0.5)
    },
    skeletonButton: {
      width: scale(75),
      height: scale(30),
      borderRadius: scale(7),
      backgroundColor: Colors.light.alpha(Colors[theme]?.white, 0.5)
    }
  });
