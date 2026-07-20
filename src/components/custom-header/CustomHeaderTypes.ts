import React from 'react';
import { type TextStyle, type ViewStyle } from 'react-native';

export type HeaderAction = {
  icon: React.ReactNode;
  onPress?: () => void;
};

export interface CustomHeaderPropsType {
  title?: string;
  leftActions?: HeaderAction[];
  rightActions?: HeaderAction[];
  headerContent?: React.ReactNode;
  containerStyle?: ViewStyle | ViewStyle[];
  titleStyle?: TextStyle | TextStyle[];
  showGradientBG?: boolean;
  hideBackButton?: boolean;
}

export const defaultProps = {
  isBottomLine: false,
  leftActions: [],
  rightActions: [],
  showGradientBG: false,
  hideBackButton: false
};
