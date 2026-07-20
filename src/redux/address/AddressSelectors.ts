import type { RootStateType } from '../Store';
import type { AddressStateType } from './AddressInitial';
import type { AddressData, ErrorResponse } from '../../types';

interface AddressSelectorsType {
  getAddressState: (state: RootStateType) => AddressStateType;
  getLoading: (state: RootStateType) => boolean;
  getError: (state: RootStateType) => ErrorResponse | undefined;
  getAddresses: (state: RootStateType) => AddressData[];
  getDefaultAddress: (state: RootStateType) => AddressData | null;
  getSelectedAddressId: (state: RootStateType) => string | null;
}

const AddressSelectors: AddressSelectorsType = {
  getAddressState: (state) => state.address,
  getLoading: (state) => state.address.loading,
  getError: (state) => state.address.error || undefined,
  getAddresses: (state) => state.address.addresses,
  getDefaultAddress: (state) => state.address.defaultAddress,
  getSelectedAddressId: (state) => state.address.selectedAddressId
};

export default AddressSelectors;
