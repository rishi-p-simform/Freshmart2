import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../hooks';
import { Text } from '../text';
import styleSheet from './BadgeStyles';
import { BadgeDefaultProps, type BadgeProps } from './BadgeTypes';

/**
 * A reusable status Badge component.
 * Displays a pill badge with variant-based colors.
 *
 * @param {BadgeProps} props - The props for Badge component.
 * @returns {JSX.Element} The rendered Badge component.
 */
const Badge: React.FC<BadgeProps> = (props) => {
  const {
    label,
    variant = BadgeDefaultProps.variant,
    customStyle,
    testID = BadgeDefaultProps.testID,
    accessibilityLabel
  } = {
    ...BadgeDefaultProps,
    ...props
  };

  const { styles } = useTheme(styleSheet);

  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return { bg: styles.bgSuccess, text: styles.textSuccess };
      case 'error':
        return { bg: styles.bgError, text: styles.textError };
      case 'active':
        return { bg: styles.bgActive, text: styles.textActive };
      case 'warning':
        return { bg: styles.bgWarning, text: styles.textWarning };
      default:
        return { bg: styles.bgDefault, text: styles.textDefault };
    }
  };

  const currentVariantStyle = getVariantStyles();

  return (
    <View
      style={[styles.badge, currentVariantStyle.bg, customStyle]}
      testID={testID}
      accessibilityRole="text"
      accessibilityLabel={accessibilityLabel || `Status: ${label}`}
    >
      <Text variant="caption" style={[styles.label, currentVariantStyle.text]}>
        {label}
      </Text>
    </View>
  );
};

Badge.displayName = 'Badge';

export default Badge;
