import { Product } from './ProductResponse';

export type CartItem = {
  id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
  product: Product;
};

export type CartData = {
  items: CartItem[];
  subtotal: number;
  item_count: number;
};

export type CartResponse = {
  success: boolean;
  message?: string;
  data: CartData;
};

export type CartItemResponse = {
  success: boolean;
  message?: string;
  data: CartItem;
};

export type CartMessageResponse = {
  success: boolean;
  message?: string;
  data: {
    message: string;
  };
};
