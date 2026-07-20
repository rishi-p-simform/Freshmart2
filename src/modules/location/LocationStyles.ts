import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, type ThemeMode } from '../../theme';

/**
 * Creates a StyleSheet object based on the provided theme.
 * @param {ThemeMode} theme - The theme object containing color definitions.
 * @returns {StyleSheet} A StyleSheet object with styles for the location screen.
 */
const styleSheet = (theme: ThemeMode, isDark?: boolean) => {
  const orange = Colors[theme]?.palette?.orange;

  return StyleSheet.create({
    ...ApplicationStyles(theme),
    container: {
      flex: 1,
      backgroundColor: Colors[theme]?.white,
    },
    scrollContent: {
      flexGrow: 1,
      paddingBottom: scale(40),
    },
    /** Drag handle */
    handleContainer: {
      alignItems: 'center',
      paddingTop: scale(8),
      paddingBottom: scale(10),
    },
    handle: {
      width: scale(32),
      height: scale(4),
      borderRadius: scale(2),
      backgroundColor: Colors[theme]?.alpha(Colors[theme]?.gray, 0.25),
    },

    /** Current location — primary CTA */
    currentLocationBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: scale(16),
      paddingVertical: scale(10),
      paddingHorizontal: scale(12),
      borderRadius: scale(10),
      backgroundColor: orange?.[50] ?? '#fff7ed',
      borderWidth: 1,
      borderColor: orange?.[300] ?? '#fdba74',
    },
    currentLocationIcon: {
      width: scale(30),
      height: scale(30),
      borderRadius: scale(8),
      backgroundColor: orange?.[500] ?? '#f97316',
      alignItems: 'center',
      justifyContent: 'center',
    },
    currentLocationContent: {
      flex: 1,
      marginLeft: scale(10),
    },
    currentLocationTitle: {
      color: orange?.[700] ?? '#c2410c',
    },
    currentLocationSub: {
      color: orange?.[400] ?? '#fb923c',
      marginTop: scale(1),
    },

    /** Add address — secondary action */
    addAddressBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: scale(16),
      paddingVertical: scale(10),
      paddingHorizontal: scale(12),
      borderRadius: scale(10),
      borderWidth: 1,
      borderColor: Colors[theme]?.alpha(Colors[theme]?.gray, 0.15),
      borderStyle: 'dashed',
      backgroundColor: Colors[theme]?.alpha(Colors[theme]?.background, 0.5),
    },
    addAddressIcon: {
      width: scale(30),
      height: scale(30),
      borderRadius: scale(8),
      backgroundColor: Colors[theme]?.alpha(Colors[theme]?.gray, 0.08),
      alignItems: 'center',
      justifyContent: 'center',
    },
    addAddressContent: {
      flex: 1,
      marginLeft: scale(10),
    },
    addAddressTitle: {
      color: Colors[theme]?.text,
    },
    addAddressSub: {
      color: Colors[theme]?.alpha(Colors[theme]?.gray, 0.5),
      marginTop: scale(1),
    },
    /** Section label */
    sectionLabel: {
      marginHorizontal: scale(18),
      marginTop: scale(14),
      marginBottom: scale(6),
      color: Colors[theme]?.alpha(Colors[theme]?.gray, 0.45),
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    /** Empty state */
    emptyStateContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: scale(20),
      paddingHorizontal: scale(24),
    },
    emptyStateIconContainer: {
      width: scale(56),
      height: scale(56),
      borderRadius: scale(28),
      backgroundColor: Colors[theme]?.alpha(orange?.[100] ?? '#ffedd5', 0.6),
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: scale(10),
    },
    emptyStateTitle: {
      marginBottom: scale(4),
      textAlign: 'center',
    },
    emptyStateDesc: {
      textAlign: 'center',
      color: Colors[theme]?.alpha(Colors[theme]?.gray, 0.55),
      lineHeight: scale(17),
    },
    /** Saved address list item */
    addressItem: {
      flexDirection: 'row',
      paddingHorizontal: scale(16),
      paddingVertical: scale(12),
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: Colors[theme]?.alpha(Colors[theme]?.gray, 0.1),
    },
    addressIconContainer: {
      width: scale(36),
      height: scale(36),
      borderRadius: scale(18),
      backgroundColor: Colors[theme]?.alpha(orange?.[100] ?? '#ffedd5', 0.5),
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: scale(2),
    },
    addressItemContent: {
      flex: 1,
      marginLeft: scale(12),
    },
    addressItemHeader: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    addressItemLabel: {
      fontWeight: '600',
    },
    defaultBadge: {
      marginLeft: scale(8),
      paddingHorizontal: scale(6),
      paddingVertical: scale(2),
      backgroundColor: orange?.[100] ?? '#ffedd5',
      borderRadius: scale(4),
    },
    defaultBadgeText: {
      color: orange?.[700] ?? '#c2410c',
      fontSize: scale(10),
    },
    addressItemDesc: {
      color: Colors[theme]?.gray,
      marginTop: scale(2),
      lineHeight: scale(18),
    },
  });
};

export default styleSheet;
