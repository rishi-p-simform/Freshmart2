import { StyleSheet } from 'react-native';
import { Colors, scale, type ThemeMode } from '../../theme';

/**
 * Stylesheet for the CartScreen component.
 * @param {ThemeMode} theme - The current theme mode.
 * @returns {StyleSheet} The theme-specific styles.
 */
const styles = (theme: ThemeMode, isDark?: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[theme]?.background,
    },
    scrollViewContent: {
      paddingHorizontal: scale(14),
      paddingTop: scale(8),
      paddingBottom: scale(24),
      gap: scale(12),
      flexGrow: 1,
    },
    mainContentContainer: {
      flexGrow: 1,
      width: '100%',
      gap: scale(12),
    },
    itemsContainer: {
      gap: scale(10),
    },
    freeDeliverySection: {
      flexDirection: 'row',
      gap: scale(8),
      paddingHorizontal: scale(12),
      paddingVertical: scale(10),
      borderRadius: scale(10),
      alignItems: 'center',
      backgroundColor: Colors[theme]?.palette.success[50],
    },
    freeDeliveryRight: {
      flex: 1,
      gap: scale(6),
    },
    truckIcon: {
      fontSize: scale(18),
    },
    freeDeliveryText: {
      color: Colors[theme]?.green,
      fontWeight: '600',
    },
    progressBar: {
      height: scale(5),
      width: '100%',
      backgroundColor: theme === 'dark' ? Colors[theme]?.palette.gray[700] : Colors[theme]?.palette.gray[200],
      borderRadius: scale(4),
      overflow: 'hidden',
    },
    progressedBar: {
      height: '100%',
      backgroundColor: Colors[theme]?.green,
      borderRadius: scale(4),
    },
    checkoutSection: {
      gap: scale(8),
      marginTop: scale(8),
      width: '100%',
    },
    couponSection: {
      flexDirection: 'row',
      backgroundColor: Colors[theme]?.surface,
      paddingHorizontal: scale(11),
      paddingVertical: scale(10),
      gap: scale(7),
      borderRadius: scale(10),
      borderWidth: 1,
      borderColor: Colors[theme]?.primary,
      borderStyle: 'dashed',
      alignItems: 'center',
    },
    percentIcon: {
      padding: scale(3),
      borderWidth: 1,
      borderColor: Colors[theme]?.primary,
      borderRadius: scale(4),
      color: Colors[theme]?.primary,
      fontWeight: '600',
    },
    couponTitle: {
      color: Colors[theme]?.primary,
      flex: 1,
      fontWeight: '600',
    },
    couponApplyText: {
      color: Colors[theme]?.primary,
      fontWeight: '700',
    },
    summarySection: {
      backgroundColor: Colors[theme]?.surface,
      padding: scale(10),
      borderRadius: scale(12),
      gap: scale(4),
      shadowColor: Colors[theme]?.black || '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: scale(3),
      elevation: 1,
    },
    priceRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    rowLabel: {
      color: Colors[theme]?.palette.gray[500],
    },
    rowValue: {
      color: Colors[theme]?.text,
    },
    discountValue: {
      color: Colors[theme]?.orange,
    },
    divider: {
      height: 1,
      backgroundColor: Colors[theme]?.palette.gray[200],
      marginVertical: scale(4),
    },
    totalLabel: {
      color: Colors[theme]?.text,
      fontWeight: '700',
    },
    totalValue: {
      color: Colors[theme]?.text,
      fontWeight: '800',
    },
    checkoutButton: {
      marginTop: scale(4),
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: scale(32),
      backgroundColor: Colors[theme]?.background,
    },
    emptyIcon: {
      width: '100%',
      height: scale(200),
    },
    emptyTitle: {
      color: Colors[theme]?.text,
      fontWeight: '700',
      textAlign: 'center',
      marginTop: scale(16),
    },
    emptyDescription: {
      color: Colors[theme]?.palette.gray[500],
      textAlign: 'center',
      marginTop: scale(6),
      marginBottom: scale(24),
    },
    shopButton: {
      width: '100%',
    },
    loadingOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.15)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
    },
  });

export default styles;
