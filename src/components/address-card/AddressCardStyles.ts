import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, type ThemeMode } from '../../theme';

/**
 * Creates a StyleSheet object based on the provided theme.
 * @param {ThemeMode} theme - The theme object containing color definitions.
 * @param {boolean} [isDark] - Whether the dark mode is currently active.
 * @returns {StyleSheet} A StyleSheet object with styles for the AddressCard.
 */
const styleSheet = (theme: ThemeMode, isDark?: boolean) => {
  const primary = Colors[theme]?.palette?.primary;
  const gray = Colors[theme]?.palette?.gray;

  return StyleSheet.create({
    ...ApplicationStyles(theme),
    cardContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: scale(12),
      borderRadius: scale(10),
      borderWidth: 1,
      borderColor: Colors[theme]?.alpha(Colors[theme]?.gray, 0.2),
      backgroundColor: Colors[theme]?.white
    },
    cardContainerSelected: {
      borderColor: primary?.[600] ?? '#2563eb'
    },
    contentContainer: {
      flex: 1,
      paddingRight: scale(8)
    },
    actionsContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    nameAndBadgeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: scale(4)
    },
    nameText: {
      color: Colors[theme]?.text,
      marginRight: scale(6)
    },
    badgeContainer: {
      backgroundColor: primary?.[50] ?? '#eff6ff',
      paddingHorizontal: scale(6),
      paddingVertical: scale(2),
      borderRadius: scale(4)
    },
    badgeText: {
      color: primary?.[600] ?? '#2563eb',
      textTransform: 'uppercase',
      letterSpacing: 0.5
    },
    editButton: {
      padding: scale(2)
    },
    editText: {
      color: primary?.[600] ?? '#2563eb'
    },
    addressText: {
      color: gray?.[500] ?? '#64748b'
    }
  });
};

export default styleSheet;
