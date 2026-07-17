import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks';
import { Colors } from '../../theme';
import { Text } from '../text';
import styleSheet from './CustomHeaderStyles';
import { defaultProps, type CustomHeaderPropsType, type HeaderAction } from './CustomHeaderTypes';

const BackButton = memo(({ onPress }: { onPress: () => void }) => {
  const { styles, theme } = useTheme(styleSheet);
  return (
    <TouchableOpacity style={styles.backButton} onPress={onPress} activeOpacity={0.7}>
      <Ionicons name="arrow-back" size={24} color={Colors[theme]?.text} />
    </TouchableOpacity>
  );
});

BackButton.displayName = 'BackButton';

const CustomHeader = ({
  title,
  leftActions = [],
  rightActions = [],
  containerStyle,
  headerContent,
  titleStyle,
}: CustomHeaderPropsType): React.ReactElement  => {
  const { styles } = useTheme(styleSheet);
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
    if (navigation.canGoBack()) {
      return <BackButton onPress={handleBack} />;
    }
    return null;
  };

  return (
    <View
      style={StyleSheet.flatten([
        styles.container,
        { paddingTop: insets.top },
        containerStyle,
      ])}
    >
      <View style={styles.leftContainer}>{renderLeftActions()}</View>

      <View style={styles.centerContainer}>
        {headerContent ? (
          headerContent
        ) : title ? (
          <Text variant='headlineSmall' numberOfLines={1} style={StyleSheet.flatten([styles.textTitle, titleStyle])}>
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
    </View>
  );
}

CustomHeader.defaultProps = defaultProps;

export default memo(CustomHeader);
