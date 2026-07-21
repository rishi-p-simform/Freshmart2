import { StyleSheet } from 'react-native';
import { Colors, scale, type ThemeMode } from '../../../theme';

/**
 * Stylesheet for TrackOrderScreen.
 * @param {ThemeMode} theme Theme mode.
 * @returns {StyleSheet} Calculated styles.
 */
const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[theme]?.background,
      gap: scale(12)
    },
    textColor: {
      color: Colors[theme]?.text
    },
    secondaryText: {
      color: Colors[theme]?.gray
    },
    scrollViewContent: {
      paddingHorizontal: scale(16),
      paddingBottom: scale(24),
      gap: scale(12)
    },
    mapContainer: {
      flex: 1
    },
    map: {
      ...StyleSheet.absoluteFillObject
    },
    dragHandle: {
      width: scale(40),
      height: scale(4),
      borderRadius: scale(2),
      backgroundColor: Colors[theme]?.palette.gray[300]
    },
    fullScreenMapBtn: {
      position: 'absolute',
      bottom: scale(16),
      right: scale(16),
      width: scale(40),
      height: scale(40),
      borderRadius: scale(12),
      backgroundColor: Colors[theme]?.surface,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: Colors[theme]?.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: scale(4),
      elevation: 5,
      zIndex: 10
    },
    customMarker: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    pinImage: {
      width: scale(38),
      height: scale(38),
      resizeMode: 'contain'
    },
    pinOverlayHome: {
      position: 'absolute',
      bottom: scale(35),
      left: scale(75),
      zIndex: 10
    },
    pinOverlayStore: {
      position: 'absolute',
      top: scale(35),
      right: scale(75),
      zIndex: 10
    },
    content: {
      gap: scale(12)
    },
    card: {
      flexDirection: 'row',
      backgroundColor: Colors[theme]?.surface,
      borderRadius: scale(16),
      padding: scale(12),
      gap: scale(10),
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: scale(1),
      borderColor: Colors[theme]?.palette.gray[200]
    },
    iconView: {
      height: scale(44),
      width: scale(44),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: scale(22),
      backgroundColor: Colors[theme]?.palette.primary[50]
    },
    avatarEmoji: {
      fontSize: scale(22)
    },
    centerText: {
      flex: 1,
      gap: scale(2)
    },
    rightIcons: {
      flexDirection: 'row',
      gap: scale(8)
    },
    rightIcon: {
      width: scale(36),
      height: scale(36),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: scale(10)
    },
    callBg: {
      backgroundColor: Colors[theme]?.palette.primary[50]
    },
    chatBg: {
      backgroundColor: Colors[theme]?.palette.orange[50]
    },
    statusBlockContainer: {
      backgroundColor: Colors[theme]?.surface,
      borderRadius: scale(16),
      padding: scale(24),
      alignItems: 'center',
      justifyContent: 'center',
      gap: scale(10),
      borderWidth: scale(1),
      borderColor: Colors[theme]?.palette.gray[200],
      marginTop: scale(12)
    },
    deliveredCard: {
      backgroundColor: Colors[theme]?.palette.success[50]
    },
    cancelledCard: {
      backgroundColor: Colors[theme]?.palette.error[50]
    },
    statusEmoji: {
      fontSize: scale(48)
    },
    statusTitle: {
      color: Colors[theme]?.text,
      textAlign: 'center'
    },
    statusSubtitle: {
      color: Colors[theme]?.gray,
      textAlign: 'center'
    },
    orderInfoCard: {
      backgroundColor: Colors[theme]?.surface,
      borderRadius: scale(16),
      padding: scale(16),
      gap: scale(12),
      borderWidth: scale(1),
      borderColor: Colors[theme]?.palette.gray[200]
    },
    orderInfoTitle: {
      color: Colors[theme]?.text,
      marginBottom: scale(4)
    },
    orderItemRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    orderItemName: {
      color: Colors[theme]?.text,
      flex: 1,
      marginRight: scale(8)
    },
    orderItemQty: {
      color: Colors[theme]?.gray,
      marginRight: scale(12)
    },
    orderItemPrice: {
      color: Colors[theme]?.text
    },
    divider: {
      height: scale(1),
      backgroundColor: Colors[theme]?.palette.gray[200],
      marginVertical: scale(4)
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    summaryLabel: {
      color: Colors[theme]?.gray
    },
    summaryValue: {
      color: Colors[theme]?.text
    },
    totalLabel: {
      color: Colors[theme]?.text,
      fontWeight: 'bold'
    },
    totalValue: {
      color: Colors[theme]?.primary,
      fontWeight: 'bold'
    }
  });

export default styleSheet;
