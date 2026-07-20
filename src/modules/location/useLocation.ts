import { router } from 'expo-router';
import { useState, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux';
import AddressSelectors from '../../redux/address/AddressSelectors';
import { AddressActions } from '../../redux/address/AddressSlice';

/**
 * Custom hook for the Location screen logic.
 */
const useLocation = () => {
  const dispatch = useAppDispatch();
  const addresses = useAppSelector(AddressSelectors.getAddresses);
  const loading = useAppSelector(AddressSelectors.getLoading);
  const userProfile = useAppSelector((state) => state.user.profile);
  const selectedAddressId = useAppSelector(AddressSelectors.getSelectedAddressId);

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [settingDefaultId, setSettingDefaultId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(AddressActions.fetchAddresses({}));
  }, [dispatch]);

  const onAddAddress = useCallback((type: 'current' | 'new') => {
    router.push({ pathname: '/(protected)/addAddress', params: { type } });
  }, []);

  const onSelectAddress = useCallback(
    (id: string) => {
      dispatch(AddressActions.setSelectedAddressId(id));
    },
    [dispatch]
  );

  const onDeleteAddress = useCallback(
    async (id: string) => {
      setDeletingId(id);
      try {
        await dispatch(AddressActions.deleteAddress({ paths: { id } })).unwrap();
      } finally {
        setDeletingId(null);
      }
    },
    [dispatch]
  );

  const onSetDefault = useCallback(
    async (id: string) => {
      const addressToUpdate = addresses.find((addr) => addr.id === id);
      if (!addressToUpdate) return;

      setSettingDefaultId(id);
      try {
        const payload = {
          label: addressToUpdate.label,
          address_line1: addressToUpdate.address_line1,
          address_line2: addressToUpdate.address_line2,
          city: addressToUpdate.city,
          state: addressToUpdate.state,
          pincode: addressToUpdate.pincode,
          latitude: addressToUpdate.latitude,
          longitude: addressToUpdate.longitude,
          is_default: true
        };

        await dispatch(AddressActions.updateAddress({ paths: { id }, data: payload })).unwrap();
      } finally {
        setSettingDefaultId(null);
      }
    },
    [dispatch, addresses]
  );

  return {
    onAddAddress,
    addresses,
    loading,
    userProfile,
    selectedAddressId,
    onSelectAddress,
    onDeleteAddress,
    onSetDefault,
    deletingId,
    settingDefaultId
  };
};

export default useLocation;
