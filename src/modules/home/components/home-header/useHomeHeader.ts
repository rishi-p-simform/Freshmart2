import { useCallback, useState, useEffect, useRef } from 'react';

import { ROUTES } from '../../../../constants';
import { useLocationPermission } from '../../../../hooks';
import { AddressSelectors, useAppSelector } from '../../../../redux';
import { navigateWithParam } from '../../../../utils';

const useHomeHeader = () => {
  const addresses = useAppSelector(AddressSelectors.getAddresses);
  const selectedAddressId = useAppSelector(AddressSelectors.getSelectedAddressId);
  const defaultAddress = useAppSelector(AddressSelectors.getDefaultAddress);
  const loading = useAppSelector(AddressSelectors.getLoading);
  const [searchQuery, setSearchQuery] = useState('');
  const hasAlertedRef = useRef(false);

  let displayAddress = 'Add Address';
  if (addresses.length > 0) {
    displayAddress = 'Select Address';
  }

  const activeAddress = addresses.find((addr) => addr.id === selectedAddressId) || defaultAddress;

  if (activeAddress) {
    displayAddress = `${activeAddress.address_line1}, ${activeAddress.city}`;
  }

  const { requestPermissions, permissionStatus } = useLocationPermission(false);

  const onLocationPress = useCallback(() => {
    if (permissionStatus !== 'granted' && permissionStatus !== 'limited') {
      requestPermissions();
    } else {
      navigateWithParam(ROUTES.Location);
    }
  }, [permissionStatus, requestPermissions]);

  useEffect(() => {
    if (!loading && !activeAddress && !hasAlertedRef.current) {
      hasAlertedRef.current = true;
      onLocationPress();
    }
  }, [loading, activeAddress, onLocationPress]);

  return {
    displayAddress,
    onLocationPress,
    searchQuery,
    setSearchQuery
  };
};

export default useHomeHeader;
