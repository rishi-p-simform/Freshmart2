import type { CartData, ErrorResponse } from '../../types';

export interface CartStateType {
  data: CartData | null;
  loading: boolean;
  updatingCart: boolean;
  error: ErrorResponse | null;
  lastUpdated: number | null;
}

const INITIAL_STATE: CartStateType = {
  data: null,
  loading: false,
  updatingCart: false,
  error: null,
  lastUpdated: null
};

export default INITIAL_STATE;
