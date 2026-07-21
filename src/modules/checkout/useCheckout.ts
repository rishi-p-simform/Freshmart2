import { useCallback, useState } from 'react';
import {
  AddressActions,
  AddressSelectors,
  UserSelectors,
  useAppDispatch,
  useAppSelector
} from '../../redux';
import type { CheckoutHookReturnType, DeliverySlot, DeliverySlotId } from './CheckoutTypes';

/** Static list of available delivery slots */
const DELIVERY_SLOTS: DeliverySlot[] = [
  {
    id: 'today',
    title: 'Today, 6:00–8:00 PM',
    subtitle: 'Express · Free'
  },
  {
    id: 'tomorrow',
    title: 'Tomorrow, 8–10 AM',
    subtitle: 'Standard · Free'
  }
];

/**
 * useCheckout
 * Manages all business logic for the CheckoutScreen.
 * Reads saved addresses and the selected address ID from Redux,
 * dispatches address selection, and handles delivery slot state locally.
 *
 * @returns {CheckoutHookReturnType} State and handlers for the Checkout screen.
 */
const useCheckout = (): CheckoutHookReturnType => {
  const dispatch = useAppDispatch();

  const addresses = useAppSelector(AddressSelectors.getAddresses);
  const selectedAddressId = useAppSelector(AddressSelectors.getSelectedAddressId);
  const userProfile = useAppSelector(UserSelectors.getProfile);
  const userName = userProfile?.full_name || 'User';

  const [selectedSlot, setSelectedSlot] = useState<DeliverySlotId>('today');

  const onSelectAddress = useCallback(
    (id: string) => {
      dispatch(AddressActions.setSelectedAddressId(id));
    },
    [dispatch]
  );

  const onSelectSlot = useCallback((slot: DeliverySlotId) => {
    setSelectedSlot(slot);
  }, []);

  return {
    userName,
    addresses,
    selectedAddressId,
    onSelectAddress,
    selectedSlot,
    onSelectSlot,
    deliverySlots: DELIVERY_SLOTS
  };
};

export default useCheckout;
