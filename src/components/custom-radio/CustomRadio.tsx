import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from '../../hooks';
import { Colors } from '../../theme';
import styleSheet from './CustomRadioStyles';
import { CustomRadioDefaultProps, type CustomRadioProps } from './CustomRadioTypes';

/**
 * CustomRadio
 * A styled radio-option card with title, subtitle, optional left icon,
 * and an animated check indicator for the selected state.
 *
 * @param {CustomRadioProps} props - The component props.
 * @returns {React.ReactElement} The CustomRadio component.
 */
const CustomRadio: React.FC<CustomRadioProps> = (props) => {
  const {
    title,
    subtitle,
    selected,
    onPress,
    leftIcon,
    leftIconBg,
    customStyle,
    testID,
    accessibilityLabel
  } = { ...CustomRadioDefaultProps, ...props };

  const { styles, theme } = useTheme(styleSheet);

  return (
    <Pressable
      style={[styles.container, selected && styles.selectedContainer, customStyle]}
      onPress={onPress}
      testID={testID}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityHint="Tap to select this option"
    >
      {/* Left icon slot */}
      {leftIcon != null && (
        <View
          style={[
            styles.leftIconContainer,
            leftIconBg ? { backgroundColor: leftIconBg } : undefined
          ]}
        >
          <Text style={styles.leftIconText}>{leftIcon}</Text>
        </View>
      )}

      {/* Title + Subtitle */}
      <View style={styles.textContainer}>
        <Text style={[styles.titleText, selected && styles.titleTextSelected]}>{title}</Text>
        <Text style={styles.subtitleText}>{subtitle}</Text>
      </View>

      {/* Radio indicator */}
      <View
        style={[styles.radio, selected && styles.radioSelected]}
        accessibilityElementsHidden
        importantForAccessibility="no"
      >
        {selected && <Ionicons name="checkmark" size={12} color={Colors[theme]?.white} />}
      </View>
    </Pressable>
  );
};

CustomRadio.displayName = 'CustomRadio';
export default CustomRadio;
