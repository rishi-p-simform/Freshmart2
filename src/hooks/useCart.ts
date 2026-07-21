import { useCallback, useMemo } from 'react';
import { CartActions, CartSelectors } from '../redux/cart';
import { useAppDispatch, useAppSelector } from '../redux/useRedux';

export const useCart = () => {
  const dispatch = useAppDispatch();
  const cartData = useAppSelector(CartSelectors.getData);
  const loading = useAppSelector(CartSelectors.getLoading);
  const updatingCart = useAppSelector(CartSelectors.getUpdatingCart);
  const error = useAppSelector(CartSelectors.getError);
  const serverItemCount = useAppSelector(CartSelectors.getCartItemCount);

  const items = useMemo(() => cartData?.items || [], [cartData?.items]);
  const subtotal = useMemo(() => cartData?.subtotal || 0, [cartData?.subtotal]);
  const itemCount = serverItemCount;

  const getItemCount = useCallback(
    (productId: string) => {
      const cartItem = items.find((item) => item.product_id === productId);
      return cartItem?.quantity || 0;
    },
    [items]
  );

  const fetchCart = useCallback(() => {
    return dispatch(CartActions.getCart({}));
  }, [dispatch]);

  const clearCart = useCallback(() => {
    return dispatch(CartActions.clearCart({}));
  }, [dispatch]);

  const addToCart = useCallback(
    async (productId: string, quantity: number = 1) => {
      await dispatch(CartActions.addToCart({ data: { product_id: productId, quantity } })).unwrap();
      await dispatch(CartActions.getCart({})).unwrap();
    },
    [dispatch]
  );

  const updateCartItem = useCallback(
    async (productId: string, quantity: number) => {
      await dispatch(
        CartActions.updateCartItem({ paths: { id: productId }, data: { quantity } })
      ).unwrap();
      await dispatch(CartActions.getCart({})).unwrap();
    },
    [dispatch]
  );

  const removeFromCart = useCallback(
    async (productId: string) => {
      await dispatch(CartActions.removeFromCart({ paths: { id: productId } })).unwrap();
      await dispatch(CartActions.getCart({})).unwrap();
    },
    [dispatch]
  );

  const clearError = useCallback(() => {
    dispatch(CartActions.clearError());
  }, [dispatch]);

  return {
    cartData,
    items,
    subtotal,
    loading,
    updatingCart,
    error,
    itemCount,
    fetchCart,
    clearCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearError,
    getItemCount
  };
};
