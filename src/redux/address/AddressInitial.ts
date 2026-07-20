import type { AddressData, ErrorResponse } from '../../types';

export interface AddressStateType {
  addresses: AddressData[];
  defaultAddress: AddressData | null;
  loading: boolean;
  error: ErrorResponse | null;
  lastUpdated: number | null;
  selectedAddressId: string | null;
}

const INITIAL_STATE: AddressStateType = {
  addresses: [],
  defaultAddress: null,
  loading: false,
  error: null,
  lastUpdated: null,
  selectedAddressId: null
};

export default INITIAL_STATE;
