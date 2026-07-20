import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks';
import { Colors } from '../../theme';
import { Text } from '../text';
import styleSheet from './CustomHeaderStyles';
import { defaultProps, type CustomHeaderPropsType, type HeaderAction } from './CustomHeaderTypes';

const BackButton = memo(
  ({ onPress, showGradientBG }: { onPress: () => void; showGradientBG?: boolean }) => {
    const { styles, theme } = useTheme(styleSheet);
    return (
      <TouchableOpacity
        style={StyleSheet.flatten([
          styles.backButton,
          showGradientBG && {
            backgroundColor: Colors[theme]?.alpha(Colors[theme]?.solidWhite, 0.15)
          }
        ])}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color={showGradientBG ? Colors[theme]?.solidWhite : Colors[theme]?.text}
        />
      </TouchableOpacity>
    );
  }
);

BackButton.displayName = 'BackButton';

const CustomHeader = ({
  title,
  leftActions = [],
  rightActions = [],
  containerStyle,
  headerContent,
  titleStyle,
  showGradientBG,
  hideBackButton
}: CustomHeaderPropsType): React.ReactElement => {
  const { styles, theme } = useTheme(styleSheet);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const renderLeftActions = () => {
    if (leftActions.length > 0) {
      return leftActions.map((item: HeaderAction, index: number) => (
        <TouchableOpacity key={index} onPress={item.onPress} activeOpacity={0.7}>
          {item.icon}
        </TouchableOpacity>
      ));
    }
    // Automatically render back button if no left actions are provided and we can go back
    if (!hideBackButton && navigation.canGoBack()) {
      return <BackButton onPress={handleBack} showGradientBG={showGradientBG} />;
    }
    return null;
  };

  const headerInner = (
    <>
      <View style={styles.leftContainer}>{renderLeftActions()}</View>

      <View style={styles.centerContainer}>
        {headerContent ? (
          headerContent
        ) : title ? (
          <Text
            variant="headlineSmall"
            numberOfLines={1}
            style={StyleSheet.flatten([
              styles.textTitle,
              showGradientBG && { color: Colors[theme]?.solidWhite },
              titleStyle
            ])}
          >
            {title}
          </Text>
        ) : null}
      </View>

      {rightActions.length > 0 && (
        <View style={styles.rightContainer}>
          {rightActions.map((item: HeaderAction, index: number) => (
            <TouchableOpacity key={index} onPress={item.onPress} activeOpacity={0.7}>
              {item.icon}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );

  if (showGradientBG) {
    return (
      <LinearGradient
        colors={Colors[theme]?.gradients.primary}
        start={{ x: 0.32, y: 0.03 }}
        end={{ x: 0.68, y: 0.97 }}
        style={StyleSheet.flatten([
          styles.container,
          { backgroundColor: 'transparent' },
          { paddingTop: insets.top },
          containerStyle
        ])}
      >
        {headerInner}
      </LinearGradient>
    );
  }

  return (
    <View
      style={StyleSheet.flatten([styles.container, { paddingTop: insets.top }, containerStyle])}
    >
      {headerInner}
    </View>
  );
};

CustomHeader.defaultProps = defaultProps;

export default memo(CustomHeader);
