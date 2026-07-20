import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, type ThemeMode } from '../../theme';

export const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    container: {
      flex: 1,
      backgroundColor: Colors[theme].background
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: scale(16),
      paddingVertical: scale(10),
      gap: scale(10)
    },
    backButton: {
      width: scale(38),
      height: scale(38),
      borderRadius: scale(12),
      backgroundColor: Colors[theme]?.palette.gray[100] ?? '#f3f4f6',
      justifyContent: 'center',
      alignItems: 'center'
    },
    searchCustomStyle: {
      flex: 1
    },
    searchContainer: {
      flex: 1,
      marginBottom: 0
    },
    contentArea: {
      flex: 1
    },
    columnWrapperStyle: {
      gap: scale(12),
      justifyContent: 'space-between'
    },
    contentStyle: {
      gap: scale(12),
      paddingHorizontal: scale(16),
      paddingVertical: scale(16)
    },
    cardWrapper: {
      flex: 0.5
    },
    resultsText: {
      marginTop: scale(8),
      marginBottom: scale(8),
      paddingHorizontal: scale(16),
      color: Colors[theme]?.gray ?? '#6b7280'
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: scale(32),
      paddingTop: scale(40)
    },
    emptyTitle: {
      marginTop: scale(16),
      color: Colors[theme]?.black ?? '#111827',
      textAlign: 'center'
    },
    emptySubtitle: {
      marginTop: scale(8),
      color: Colors[theme]?.gray ?? '#6b7280',
      textAlign: 'center'
    },
    footerContainer: {
      paddingVertical: scale(16),
      alignItems: 'center',
      justifyContent: 'center'
    },
    footerText: {
      color: Colors[theme]?.palette.gray[500],
      textAlign: 'center'
    }
  });

export default styleSheet;
