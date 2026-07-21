import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, type ThemeMode } from '../../theme';

/**
 * Stylesheet for the CheckoutScreen module.
 *
 * @param {ThemeMode} theme - The current theme mode.
 * @returns {StyleSheet} Theme-specific styles.
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
      gap: scale(12),
      flexGrow: 1
    },
    inner: {
      flex: 1,
      gap: scale(12)
    },
    sectionTitle: {
      color: Colors[theme]?.text,
      alignSelf: 'flex-start'
    },
    addressWrapper: {
      alignSelf: 'stretch'
    },
    addAddressBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'stretch',
      gap: scale(4),
      borderRadius: scale(10),
      paddingVertical: scale(12),
      borderStyle: 'dashed',
      borderWidth: 1,
      borderColor: Colors[theme]?.palette.gray[300]
    },
    addAddressBtnText: {
      color: Colors[theme]?.palette.gray[500]
    },
    slotsContainer: {
      gap: scale(8)
    },
    spacer: {
      flex: 1
    },
    proceedBtn: {
      marginTop: scale(4)
    }
  });

export default styleSheet;
