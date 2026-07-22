import { StyleSheet } from 'react-native';
import ApplicationStyles from '../../theme/ApplicationStyles';
import Colors, { type ThemeMode } from '../../theme/Colors';
import { scale } from '../../theme/Metrics';

/**
 * A StyleSheet function that returns responsive and dark-mode compatible profile styles.
 * @param {ThemeMode} theme - Current theme mode ('light' | 'dark').
 * @returns {StyleSheet} Calculated stylesheet object.
 */
const styleSheet = (theme: ThemeMode) => {
  const currentColors = Colors[theme] ?? Colors.light;
  const commonShadow = ApplicationStyles(theme).cardShadow;

  return StyleSheet.create({
    container: {
      backgroundColor: currentColors.background,
      flex: 1
    },
    scrollViewContent: {
      gap: scale(14),
      paddingBottom: scale(100)
    },
    linearGradient: {
      ...StyleSheet.absoluteFillObject
    },
    // Profile Header
    headerContainer: {
      alignItems: 'center',
      backgroundColor: currentColors.primary,
      borderBottomLeftRadius: scale(36),
      borderBottomRightRadius: scale(36),
      gap: scale(8),
      paddingBottom: scale(48),
      paddingTop: scale(22),
      overflow: 'hidden'
    },
    avatarWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: scale(4),
      position: 'relative'
    },
    avatarBadge: {
      alignItems: 'center',
      borderRadius: scale(99),
      height: scale(90),
      justifyContent: 'center',
      width: scale(90)
    },
    innerBorder: {
      alignItems: 'center',
      borderColor: Colors[theme].alpha(currentColors.solidWhite, 0.5),
      borderRadius: scale(99),
      borderWidth: scale(4),
      height: '100%',
      justifyContent: 'center',
      width: '100%',
      overflow: 'hidden'
    },
    avatarImage: {
      height: '100%',
      width: '100%',
      borderRadius: scale(99),
      resizeMode: 'cover'
    },
    avatarEmoji: {
      fontSize: scale(80),
      position: 'absolute',
      bottom: -scale(20),
      left: scale(0)
    },
    editBadge: {
      alignItems: 'center',
      backgroundColor: currentColors.orange,
      borderColor: currentColors.primary,
      borderRadius: scale(99),
      borderWidth: scale(2),
      bottom: scale(4),
      height: scale(30),
      justifyContent: 'center',
      position: 'absolute',
      right: scale(-2),
      width: scale(30)
    },
    headerNameText: {
      color: currentColors.solidWhite
    },
    headerEmailText: {
      color: currentColors.alpha(currentColors.solidWhite, 0.8)
    },
    goldBadge: {
      backgroundColor: currentColors.orange,
      borderRadius: scale(99),
      marginTop: scale(4),
      paddingHorizontal: scale(12),
      paddingVertical: scale(10)
    },
    goldBadgeText: {
      color: currentColors.solidWhite
    },

    // Stats Section
    statsContainer: {
      alignItems: 'center',
      backgroundColor: currentColors.surface,
      borderRadius: scale(16),
      flexDirection: 'row',
      marginHorizontal: scale(16),
      paddingVertical: scale(12),
      ...commonShadow
    },
    statChip: {
      alignItems: 'center',
      flex: 1,
      gap: scale(2),
      justifyContent: 'center',
      minHeight: scale(48)
    },
    statValueText: {},
    statLabelText: {
      color: currentColors.gray
    },
    ratingRow: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: scale(3)
    },
    divider: {
      backgroundColor: currentColors.alpha(currentColors.gray, 0.2),
      height: '100%',
      width: scale(1)
    },
    primaryText: {
      color: currentColors.primary
    },
    orangeText: {
      color: currentColors.orange
    },
    greenText: {
      color: currentColors.green
    },

    // Nav Tabs Section
    tabsContainer: {
      gap: scale(2),
      paddingHorizontal: scale(16)
    },
    tabCard: {
      alignItems: 'center',
      backgroundColor: currentColors.surface,
      borderRadius: scale(12),
      flexDirection: 'row',
      gap: scale(12),
      paddingHorizontal: scale(14),
      paddingVertical: scale(12)
    },
    tabIconBox: {
      alignItems: 'center',
      borderRadius: scale(10),
      height: scale(36),
      justifyContent: 'center',
      width: scale(36)
    },
    tabIconText: {},
    tabTitleText: {
      color: currentColors.text,
      flex: 1
    },

    // Settings & Theme Toggle Section
    settingsContainer: {
      gap: scale(12),
      marginTop: scale(4),
      paddingHorizontal: scale(16)
    },
    themeCard: {
      alignItems: 'center',
      backgroundColor: currentColors.surface,
      borderRadius: scale(12),
      flexDirection: 'row',
      gap: scale(12),
      justifyContent: 'space-between',
      paddingHorizontal: scale(14),
      paddingVertical: scale(10),
      ...commonShadow
    },
    themeIconBox: {
      alignItems: 'center',
      backgroundColor: currentColors.primary,
      borderRadius: scale(8),
      height: scale(32),
      justifyContent: 'center',
      width: scale(32)
    },
    themeLabelText: {
      color: currentColors.text,
      flex: 1
    },
    switchContainer: {
      backgroundColor: currentColors.alpha(currentColors.gray, 0.15),
      borderRadius: scale(20),
      flexDirection: 'row',
      padding: scale(3)
    },
    switchButton: {
      borderRadius: scale(16),
      paddingHorizontal: scale(10),
      paddingVertical: scale(4)
    },
    switchActive: {
      backgroundColor: currentColors.surface
    },
    switchText: {
      color: currentColors.gray
    },
    switchTextActive: {
      color: currentColors.text
    },

    // Action Buttons
    logoutButton: {
      alignSelf: 'center',
      backgroundColor: currentColors.orange,
      borderColor: currentColors.orange,
      width: '100%'
    },
    deleteButton: {
      alignSelf: 'center',
      backgroundColor: currentColors.error,
      borderColor: currentColors.error,
      marginTop: scale(4),
      width: '100%'
    }
  });
};

export default styleSheet;
