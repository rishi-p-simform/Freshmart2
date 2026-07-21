import type { AddressData } from './AddressResponse';

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export type OrderProductSummary = {
  id: string;
  name: string;
  images: string[];
  unit: string;
};

export type OrderItem = {
  id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  product?: OrderProductSummary;
};

export type OrderTracking = {
  id: string;
  status: string;
  message: string;
  created_at: string;
};

export type Order = {
  id: string;
  user_id: string;
  address_id: string;
  status: OrderStatus;
  subtotal: number;
  delivery_fee: number;
  discount: number;
  total: number;
  payment_method: string;
  payment_status: PaymentStatus;
  notes?: string;
  created_at: string;
  address?: AddressData;
  order_items: OrderItem[];
  tracking: OrderTracking[];
};

export type OrderListMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type CreateOrderRequest = {
  address_id: string;
  payment_method: string;
  notes?: string;
};

export type CreateOrderResponse = {
  success: boolean;
  message?: string;
  data: Order;
};

export type GetOrdersQueryParams = {
  page?: number;
  limit?: number;
  status?: string;
};

export type OrdersListResponse = {
  success: boolean;
  message?: string;
  data: Order[];
  meta: OrderListMeta;
};

export type OrderDetailResponse = {
  success: boolean;
  message?: string;
  data: Order;
};

export type CancelOrderRequest = {
  reason: string;
};

export type CancelOrderResponse = {
  success: boolean;
  message?: string;
  data: {
    message: string;
  };
};
