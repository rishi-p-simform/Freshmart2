import { useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { ROUTES } from '../../../constants';
import { useCart } from '../../../hooks';
import { useProductDetail } from '../../../redux/products';
import type { DetailsProductHookReturnType } from './DetailsProductTypes';

/**
 * Business logic hook for DetailsProductScreen.
 * @param {string} id - Product ID.
 * @returns {DetailsProductHookReturnType} Hook return state and callbacks.
 */
export const useDetailsProduct = (id: string): DetailsProductHookReturnType => {
  const router = useRouter();
  const { productDetail, detailLoading } = useProductDetail(id);
  const { getItemCount, addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);

  const quantity = getItemCount(id);

  const discountPercentage = useMemo(() => {
    if (
      !productDetail ||
      typeof productDetail.mrp !== 'number' ||
      typeof productDetail.price !== 'number'
    ) {
      return 0;
    }
    if (productDetail.mrp <= 0 || productDetail.price >= productDetail.mrp) {
      return 0;
    }
    const discount = ((productDetail.mrp - productDetail.price) / productDetail.mrp) * 100;
    return Math.round(discount * 10) / 10;
  }, [productDetail]);

  const ratingValue = useMemo(() => 4.5, []);
  const reviewCount = useMemo(() => {
    if (!id) return 120;
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = (hash << 5) - hash + id.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash % 800) + 50;
  }, [id]);

  const [actionLoading, setActionLoading] = useState(false);

  const handleBackPress = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace(ROUTES.Home as any);
    }
  }, [router]);

  const handleFavoriteToggle = useCallback(() => {
    setIsFavorite((prev) => !prev);
  }, []);

  const handleAddToCartAction = useCallback(async () => {
    if (quantity > 0) {
      router.navigate(ROUTES.Cart as any);
    } else if (id) {
      if (actionLoading) return;
      setActionLoading(true);
      try {
        await addToCart(id, 1);
      } finally {
        setActionLoading(false);
      }
    }
  }, [quantity, id, addToCart, router, actionLoading]);

  return {
    data: productDetail,
    loading: detailLoading,
    quantity,
    isFavorite,
    discountPercentage,
    reviewCount,
    ratingValue,
    actionLoading,
    handleBackPress,
    handleFavoriteToggle,
    handleAddToCartAction
  };
};

export default useDetailsProduct;
