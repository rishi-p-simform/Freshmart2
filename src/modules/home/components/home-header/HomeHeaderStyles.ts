import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, type ThemeMode } from '../../../../theme';

/**
 * Creates a StyleSheet for the HomeHeader component based on the provided theme.
 * @param {ThemeMode} theme - The theme object containing color definitions.
 * @returns {StyleSheet} A StyleSheet object.
 */
const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    container: {
      paddingHorizontal: scale(16),
      paddingBottom: scale(16),
      gap: scale(8),
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    locationSection: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1
    },
    locationPinContainer: {
      marginRight: scale(8)
    },
    textContainer: {
      flex: 1
    },
    deliverToText: {
      color: Colors[theme]?.alpha(Colors[theme]?.solidWhite, 0.5),
      marginBottom: scale(2)
    },
    addressRow: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    addressText: {
      color: Colors[theme]?.solidWhite,
      marginRight: scale(4)
    },
    cartIconContainer: {
      position: 'relative',
      padding: scale(8)
    },
    badge: {
      position: 'absolute',
      top: 0,
      right: 0,
      backgroundColor: Colors[theme]?.orange,
      borderRadius: scale(10),
      minWidth: scale(20),
      height: scale(20),
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: scale(4)
    },
    badgeText: {
      color: Colors[theme]?.solidWhite,
      fontWeight: 'bold'
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors[theme]?.alpha(Colors[theme]?.solidWhite, 0.15),
      borderRadius: scale(10),
      paddingHorizontal: scale(12),
      height: scale(48),
      borderWidth: scale(1),
      borderColor: Colors[theme]?.alpha(Colors[theme]?.solidWhite, 0.18)
    },
    searchIcon: {
      marginRight: scale(8)
    },

  });

export default styleSheet;
