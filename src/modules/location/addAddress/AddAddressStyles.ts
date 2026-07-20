import { ApplicationStyles, Colors, scale, type ThemeMode } from '@/src/theme';
import { StyleSheet } from 'react-native';

const styleSheet = (theme: ThemeMode, isDark?: boolean) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    container: {
      flex: 1,
      backgroundColor: Colors[theme]?.white,
    },
    mapContainer: {
      flex: 1,
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    loadingOverlay: {
      backgroundColor: Colors[theme]?.alpha(Colors[theme]?.white, 0.5),
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
    },
    backBtn: {
      position: 'absolute',
      top: scale(40),
      left: scale(16),
      width: scale(40),
      height: scale(40),
      borderRadius: scale(12),
      backgroundColor: Colors[theme]?.palette?.gray?.[100],
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: Colors[theme]?.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    backBtnIcon: {
      color: Colors[theme]?.text,
    },
    bottomOverlay: {
      paddingHorizontal: scale(20),
      paddingBottom: scale(40),
      shadowColor: Colors[theme]?.black,
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 20,
    },
    dragHandleContainer: {
      alignItems: 'center',
      marginBottom: scale(20),
    },
    dragHandle: {
      width: scale(40),
      height: scale(4),
      borderRadius: scale(2),
      backgroundColor: Colors[theme]?.alpha(Colors[theme]?.gray, 0.3),
    },
    headerText: {
      color: Colors[theme]?.black,
    },
    subHeaderText: {
      color: Colors[theme]?.alpha(Colors[theme]?.gray, 0.6),
    },
    useLocationBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: scale(14),
      borderRadius: scale(12),
      backgroundColor: Colors[theme]?.alpha(Colors[theme]?.primary, 0.08),
      borderWidth: 1,
      borderColor: Colors[theme]?.alpha(Colors[theme]?.primary, 0.2),
      marginBottom: scale(24),
    },
    useLocationText: {
      color: Colors[theme]?.primary,
      marginLeft: scale(8),
    },
    confirmBtn: {
      backgroundColor: Colors[theme]?.primary,
      paddingVertical: scale(14),
      borderRadius: scale(12),
      alignItems: 'center',
      justifyContent: 'center',
    },
    confirmBtnText: {
      color: Colors[theme]?.white,
      fontFamily: 'PlusJakartaSans_700Bold',
    },
    formContainer: {
      marginTop: scale(8),
      marginBottom: scale(8),
    },
    inputStyle: {
      marginBottom: scale(8),
    },
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: scale(10)
    },
    halfInput: {
      flex: 1,
    },
    halfInputRight: {
      flex: 1,
    },
    addressTypeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: scale(16),
      marginTop: scale(8),
    },
    addressTypeChip: {
      paddingHorizontal: scale(16),
      paddingVertical: scale(8),
      borderRadius: scale(20),
      borderWidth: 1,
      borderColor: Colors[theme]?.palette?.gray?.[300],
      marginRight: scale(12),
      backgroundColor: Colors[theme]?.white,
    },
    addressTypeChipSelected: {
      borderColor: Colors[theme]?.primary,
      backgroundColor: Colors[theme]?.alpha(Colors[theme]?.primary, 0.1),
    },
    addressTypeChipText: {
      color: Colors[theme]?.palette?.gray?.[600],
    },
    addressTypeChipTextSelected: {
      color: Colors[theme]?.primary,
      fontFamily: 'PlusJakartaSans_600SemiBold',
    },
  });

export default styleSheet;
