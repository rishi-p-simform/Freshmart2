import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, type ThemeMode } from '../../theme';

/**
 * Stylesheet for PaymentScreen component.
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
    card: {
      alignSelf: 'stretch',
      paddingHorizontal: scale(16),
      paddingVertical: scale(12),
      borderRadius: scale(12),
      backgroundColor: Colors[theme]?.surface,
      gap: scale(8),
      shadowColor: Colors[theme]?.black || '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: scale(3),
      elevation: 1
    },
    priceRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    dashLines: {
      height: 1,
      backgroundColor: Colors[theme]?.palette.gray[200],
      marginVertical: scale(4)
    },
    secondaryText: {
      color: Colors[theme]?.palette.gray[500]
    },
    textColor: {
      color: Colors[theme]?.text
    },
    greenText: {
      color: Colors[theme]?.green
    },
    orangeText: {
      color: Colors[theme]?.orange
    },
    placeOrderBtn: {
      marginTop: scale(8)
    }
  });

export default styleSheet;
