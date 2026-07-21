import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Pressable, ActivityIndicator } from 'react-native';
import { useTheme } from '../../hooks';
import { Colors, scale } from '../../theme';
import { Text } from '../text';
import styleSheet from './AddressCardStyles';
import { AddressCardDefaultProps, AddressCardProps } from './AddressCardTypes';

/**
 * AddressCard
 * A shared UI component that displays an address card with a name, badge, and address lines.
 *
 * @param {AddressCardProps} props - The props for the AddressCard component.
 * @returns {React.ReactElement} The AddressCard component.
 */
const AddressCard: React.FC<AddressCardProps> = (props) => {
  const {
    name,
    label,
    addressLine1,
    addressLine2,
    onEditPress,
    onSetDefaultPress,
    onDeletePress,
    isSettingDefault,
    isDeleting,
    variant = 'standard',
    onPress,
    isDefault,
    isSelected,
    customStyle,
    testID,
    accessibilityLabel
  } = { ...AddressCardDefaultProps, ...props };

  const { styles, theme } = useTheme(styleSheet);
  const primary = Colors[theme]?.palette?.primary?.[600] ?? '#2563eb';

  const cardStyle = [styles.cardContainer, isSelected && styles.cardContainerSelected, customStyle];

  const content = (
    <>
      <View style={styles.contentContainer}>
        <View style={styles.nameAndBadgeContainer}>
          <Text variant="titleSmall" style={styles.nameText}>
            {name}
          </Text>
          <View style={styles.badgeContainer}>
            <Text variant="labelSmall" style={styles.badgeText}>
              {label}
            </Text>
          </View>
        </View>

        <Text variant="bodySmall" style={styles.addressText}>
          {addressLine1}
        </Text>
        <Text variant="bodySmall" style={styles.addressText}>
          {addressLine2}
        </Text>
      </View>

      <View style={styles.actionsContainer}>
        {onEditPress && (
          <Pressable
            style={styles.editButton}
            onPress={onEditPress}
            accessibilityRole="button"
            accessibilityLabel="Edit address"
            testID={`${testID}-edit-button`}
          >
            <Text variant="labelMedium" style={styles.editText}>
              Edit
            </Text>
          </Pressable>
        )}

        {variant === 'manage' && (
          <>
            {onSetDefaultPress && (
              <Pressable
                style={styles.editButton}
                onPress={onSetDefaultPress}
                accessibilityRole="button"
                accessibilityLabel="Set as Default"
                disabled={isSettingDefault}
              >
                {isSettingDefault ? (
                  <ActivityIndicator size="small" color={primary} />
                ) : (
                  <Ionicons
                    name={isDefault ? 'star' : 'star-outline'}
                    size={scale(15)}
                    color={primary}
                  />
                )}
              </Pressable>
            )}

            {onDeletePress && (
              <Pressable
                style={styles.editButton}
                onPress={onDeletePress}
                accessibilityRole="button"
                accessibilityLabel="Delete address"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <ActivityIndicator size="small" color={Colors[theme]?.error} />
                ) : (
                  <Ionicons name="trash-outline" size={scale(15)} color={Colors[theme]?.error} />
                )}
              </Pressable>
            )}
          </>
        )}
      </View>
    </>
  );

  if (onPress) {
    return (
      <Pressable
        style={cardStyle}
        onPress={onPress}
        testID={testID}
        accessibilityLabel={accessibilityLabel || `Address card for ${name}`}
        accessibilityRole="button"
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View
      style={cardStyle}
      testID={testID}
      accessibilityLabel={accessibilityLabel || `Address card for ${name}`}
      accessibilityRole="none"
    >
      {content}
    </View>
  );
};

AddressCard.displayName = 'AddressCard';
export default AddressCard;
