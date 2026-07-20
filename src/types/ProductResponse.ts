export type Product = {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string;
  images: string[];
  price: number;
  mrp: number;
  unit: string;
  stock_quantity: number;
  is_active: boolean;
  is_featured: boolean;
  tags: string[];
};

export type ProductFilters = {
  category_id?: string;
  featured?: boolean;
  sort?: string;
  limit?: number;
};

export type ProductListMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type ProductsResponse = {
  success: boolean;
  message?: string;
  data: Product[];
  meta: ProductListMeta;
};

export type ProductDetailResponse = {
  success: boolean;
  message?: string;
  data: Product;
};
