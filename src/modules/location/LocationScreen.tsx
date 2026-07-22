import { Ionicons } from '@expo/vector-icons';
import React, { type FC } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { AddressCard, Text } from '../../components';
import { useTheme } from '../../hooks';
import { Colors, scale } from '../../theme';
import styleSheet from './LocationStyles';
import useLocation from './useLocation';

/**
 * The LocationScreen component for setting the user's location.
 * Presents a modern bottom-sheet UI with a primary "use current location"
 * CTA, an "or" divider, and a secondary "add new address" action.
 * @returns {React.ReactElement} A React element.
 */
const LocationScreen: FC = (): React.ReactElement => {
  const { styles, theme } = useTheme(styleSheet);
  const {
    onAddAddress,
    addresses,
    userProfile,
    selectedAddressId,
    onSelectAddress,
    onDeleteAddress,
    onSetDefault,
    deletingId,
    settingDefaultId
  } = useLocation();

  const orange500 = Colors[theme]?.palette?.orange?.[500];
  const orange700 = Colors[theme]?.palette?.orange?.[700];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      {/* Drag handle */}
      <View style={styles.handleContainer}>
        <View style={styles.handle} />
      </View>

      {/* Primary — Use current location */}
      <Pressable
        style={styles.currentLocationBtn}
        accessibilityRole="button"
        accessibilityLabel="Use current location"
        onPress={() => onAddAddress('current')}
      >
        <View style={styles.currentLocationIcon}>
          <Ionicons name="navigate" size={scale(15)} color="#fff" />
        </View>
        <View style={styles.currentLocationContent}>
          <Text variant="labelLarge" style={styles.currentLocationTitle}>
            Use Current Location
          </Text>
          <Text variant="caption" style={styles.currentLocationSub}>
            Using GPS
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={scale(16)} color={orange700} />
      </Pressable>

      <View style={{ height: scale(10) }} />

      {/* Secondary — Add new address */}
      <Pressable
        style={styles.addAddressBtn}
        accessibilityRole="button"
        accessibilityLabel="Add new address"
        onPress={() => onAddAddress('new')}
      >
        <View style={styles.addAddressIcon}>
          <Ionicons name="add" size={scale(15)} color={orange500} />
        </View>
        <View style={styles.addAddressContent}>
          <Text variant="labelLarge" style={styles.addAddressTitle}>
            Add New Address
          </Text>
          <Text variant="caption" style={styles.addAddressSub}>
            Enter address manually
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={scale(16)} color={Colors[theme]?.gray} />
      </Pressable>

      {/* Section label */}
      <Text variant="captionBold" style={styles.sectionLabel}>
        Saved Addresses
      </Text>

      {/* Saved Addresses List */}
      {addresses && addresses.length > 0 ? (
        addresses.map((address) => (
          <AddressCard
            key={address.id}
            variant="manage"
            name={userProfile?.full_name || 'Home Delivery'}
            label={address.label}
            addressLine1={address.address_line1}
            addressLine2={
              address.address_line2
                ? `${address.address_line2}, ${address.city}, ${address.state} ${address.pincode}`
                : `${address.city}, ${address.state} ${address.pincode}`
            }
            isDefault={address.is_default}
            isSelected={selectedAddressId === address.id}
            isSettingDefault={settingDefaultId === address.id}
            isDeleting={deletingId === address.id}
            onPress={() => onSelectAddress(address.id)}
            onEditPress={() => console.log('Edit address', address.id)}
            onSetDefaultPress={() => onSetDefault(address.id)}
            onDeletePress={() => onDeleteAddress(address.id)}
            customStyle={{ marginBottom: scale(10), marginHorizontal: scale(16) }}
          />
        ))
      ) : (
        /* Empty state */
        <View style={styles.emptyStateContainer}>
          <View style={styles.emptyStateIconContainer}>
            <Ionicons name="map-outline" size={scale(26)} color={orange500} />
          </View>
          <Text variant="titleSmall" style={styles.emptyStateTitle}>
            No Saved Addresses
          </Text>
          <Text variant="bodySmall" style={styles.emptyStateDesc}>
            Add an address to get your groceries{'\n'}delivered faster.
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default LocationScreen;
