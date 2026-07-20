export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string;
  parent_id: string | null;
  is_active: boolean;
  sort_order: number;
  subcategories?: Category[];
}

export interface CategoryListResponse {
  success: boolean;
  data: Category[];
  message?: string;
}

export interface CategoryResponse {
  success: boolean;
  data: Category;
  message?: string;
}
