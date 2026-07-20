import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/useRedux';
import { CartActions, CartSelectors } from '../redux/cart';

export const useCart = () => {
  const dispatch = useAppDispatch();
  const cartData = useAppSelector(CartSelectors.getData);
  const loading = useAppSelector(CartSelectors.getLoading);
  const updatingCart = useAppSelector(CartSelectors.getUpdatingCart);
  const error = useAppSelector(CartSelectors.getError);
  const serverItemCount = useAppSelector(CartSelectors.getCartItemCount);

  const items = cartData?.items || [];
  const subtotal = cartData?.subtotal || 0;
  const itemCount = cartData?.item_count || 0;

  const getItemCount = useCallback((productId: string) => {
    const cartItem = items.find(item => item.product_id === productId);
    return cartItem?.quantity || 0;
  }, [items]);

  const fetchCart = useCallback(() => {
    return dispatch(CartActions.getCart({}));
  }, [dispatch]);

  const clearCart = useCallback(() => {
    return dispatch(CartActions.clearCart({}));
  }, [dispatch]);

  const addToCart = useCallback(async (productId: string, quantity: number = 1) => {
    await dispatch(CartActions.addToCart({ data: { product_id: productId, quantity } })).unwrap();
    await dispatch(CartActions.getCart({})).unwrap();
  }, [dispatch]);

  const updateCartItem = useCallback(async (productId: string, quantity: number) => {
    await dispatch(CartActions.updateCartItem({ paths: { id: productId }, data: { quantity } })).unwrap();
    await dispatch(CartActions.getCart({})).unwrap();
  }, [dispatch]);

  const removeFromCart = useCallback(async (productId: string) => {
    await dispatch(CartActions.removeFromCart({ paths: { id: productId } })).unwrap();
    await dispatch(CartActions.getCart({})).unwrap();
  }, [dispatch]);

  const clearError = useCallback(() => {
    dispatch(CartActions.clearError());
  }, [dispatch]);

  return {
    cartData,
    loading,
    updatingCart,
    error,
    serverItemCount,
    itemCount,
    items,
    subtotal,
    fetchCart,
    clearCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearError,
    getItemCount
  };
};

export default useCart;
