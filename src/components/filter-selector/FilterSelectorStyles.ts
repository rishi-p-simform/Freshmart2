import { StyleSheet } from 'react-native';
import { Colors, scale, type ThemeMode } from '../../theme';

export const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      paddingVertical: scale(10),
      backgroundColor: 'transparent'
    },
    contentContainer: {
      paddingHorizontal: scale(16),
      gap: scale(8)
    },
    chip: {
      paddingHorizontal: scale(16),
      paddingVertical: scale(8),
      borderRadius: scale(20),
      borderWidth: 1,
      borderColor: Colors[theme]?.palette.gray[200] ?? '#e5e7eb',
      backgroundColor: Colors[theme]?.white ?? '#ffffff'
    },
    chipSelected: {
      backgroundColor: Colors[theme]?.primary ?? '#2563eb',
      borderColor: Colors[theme]?.primary ?? '#2563eb'
    },
    chipText: {
      color: Colors[theme]?.black ?? '#111827'
    },
    chipTextSelected: {
      color: Colors[theme]?.solidWhite ?? '#ffffff'
    }
  });

export default styleSheet;
