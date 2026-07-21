import Toast from 'react-native-toast-message';

export const ToastHelper = {
  showSuccess: (text1: string, text2?: string) => {
    Toast.show({
      type: 'success',
      text1,
      text2,
      position: 'bottom'
    });
  },
  showError: (text1: string, text2?: string) => {
    Toast.show({
      type: 'error',
      text1,
      text2,
      position: 'bottom'
    });
  },
  showInfo: (text1: string, text2?: string) => {
    Toast.show({
      type: 'info',
      text1,
      text2,
      position: 'bottom'
    });
  }
};
