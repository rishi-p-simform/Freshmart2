import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, type ThemeMode } from '../../../theme';

export const styleSheet = (theme: ThemeMode, isDark?: boolean) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    container: {
      flex: 1,
      backgroundColor: Colors[theme].background
    },
    scrollView: {
      flex: 1,
    },
    contentContainer: {
      paddingHorizontal: scale(16),
      paddingBottom: scale(40),
    },
    headerContainer: {
      gap: scale(18),
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: scale(140),
    },
    icon: {
      fontSize: scale(44 * 1.4),
    },
    gradientStyle: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: scale(16),
    },
    exclamation: {
      backgroundColor: Colors[theme].orange,
      width: scale(28),
      height: scale(28),
      borderRadius: 999,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: scale(10),
      right: scale(20),
    },
    whiteText: {
      color: Colors[theme].solidWhite,
      fontWeight: 'bold',
      fontSize: scale(18),
    },
    title: {
      marginTop: scale(20),
      marginBottom: scale(10),
      textAlign: 'center',
    },
    subtitle: {
      textAlign: 'center',
      marginBottom: scale(30),
      color: Colors[theme].gray,
    },
    boldEmail: {
      fontWeight: 'bold',
      color: Colors[theme].primary,
    },
    enterCodeText: {
      marginBottom: scale(10),
      color: Colors[theme].text,
    },
    codeContainer: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: scale(20),
    },
    resendContainer: {
      alignItems: 'center',
      marginBottom: scale(30),
    },
    resendText: {
      color: Colors[theme].gray,
    },
    resendTimer: {
      color: Colors[theme].orange,
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: scale(20),
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: Colors[theme].gray,
      opacity: 0.2,
    },
    dividerText: {
      marginHorizontal: scale(10),
      color: Colors[theme].gray,
    },
    magicLinkContainer: {
      padding: scale(20),
      borderWidth: 1,
      borderColor: Colors[theme].gray,
      borderRadius: scale(16),
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: scale(20),
      backgroundColor: Colors[theme].surface,
    },
    magicLinkIcon: {
      width: scale(40),
      height: scale(40),
      borderRadius: scale(20),
      backgroundColor: Colors[theme].background,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: scale(15),
    },
    magicLinkTextContainer: {
      flex: 1,
    },
    magicLinkTitle: {
      fontWeight: 'bold',
      marginBottom: scale(4),
    },
    magicLinkSubtitle: {
      color: Colors[theme].gray,
      fontSize: scale(12),
    },
  });
