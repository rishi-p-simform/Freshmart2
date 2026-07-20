export interface AddressData {
  id: string;
  user_id: string;
  label: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  pincode: string;
  latitude: number;
  longitude: number;
  is_default: boolean;
  created_at: string;
}

export interface AddressListResponse {
  success: boolean;
  data: AddressData[];
  message?: string;
}

export interface AddressResponse {
  success: boolean;
  data: AddressData;
  message?: string;
}

export interface DeleteAddressResponse {
  success: boolean;
  data: {
    message: string;
  };
  message?: string;
}

export interface AddressPayload {
  label: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  pincode: string;
  latitude: number;
  longitude: number;
  is_default: boolean;
}
