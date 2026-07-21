import type { Product } from '../../../types';

export interface DetailsProductScreenProps {
  id: string;
}

export interface DetailsProductHookReturnType {
  data: Product | null;
  loading: boolean;
  quantity: number;
  isFavorite: boolean;
  discountPercentage: number;
  reviewCount: number;
  ratingValue: number;
  actionLoading: boolean;
  handleBackPress: () => void;
  handleFavoriteToggle: () => void;
  handleAddToCartAction: () => void;
}
