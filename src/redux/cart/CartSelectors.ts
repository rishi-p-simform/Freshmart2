import type { RootStateType } from '../Store';
import type { CartStateType } from './CartInitial';
import type { CartData, ErrorResponse } from '../../types';

interface CartSelectorsType {
  getCartState: (state: RootStateType) => CartStateType;
  getLoading: (state: RootStateType) => boolean;
  getUpdatingCart: (state: RootStateType) => boolean;
  getError: (state: RootStateType) => ErrorResponse | undefined;
  getData: (state: RootStateType) => CartData | null;
  getCartItemCount: (state: RootStateType) => number;
}

const CartSelectors: CartSelectorsType = {
  getCartState: (state) => state.cart,
  getLoading: (state) => state.cart.loading,
  getUpdatingCart: (state) => state.cart.updatingCart,
  getError: (state) => state.cart?.error || undefined,
  getData: (state) => state.cart.data,
  getCartItemCount: (state) => {
    const items = state.cart.data?.items;
    if (items && items.length > 0) {
      return items.reduce((sum, item) => sum + (item.quantity || 0), 0);
    }
    return state.cart.data?.item_count || 0;
  }
};

export default CartSelectors;
