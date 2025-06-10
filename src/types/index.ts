export interface Product {
  id: string;
  sku_code: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  work?: string;
  character_name?: string;
  size?: string;
  material?: string;
  image: string;
  images?: string[];
  description: string;
  rating: number;
  reviews: number;
  stock_quantity: number;
  status: 'active' | 'preorder' | 'coming' | 'soldout';
  // 商品属性标记
  is_limited?: boolean;
  is_made_to_order?: boolean;
  is_lottery?: boolean;
  is_exclusive?: boolean;
  is_returnable?: boolean;
  release_date?: string;
  order_start_date?: string;
  order_end_date?: string;
  discount?: number;
  tags?: string[];
  specifications?: Record<string, string>;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  shueisha_id?: string;
  avatar?: string;
  address?: string;
  phone?: string;
}

export interface Order {
  id: string;
  order_number: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  payment_method: string;
  receiver_name: string;
  address: string;
  phone: string;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parent_id?: string;
  image: string;
  productCount: number;
  sort_order: number;
}

export interface Work {
  id: string;
  name: string;
  kana: string;
  description: string;
  image: string;
  productCount: number;
}

export interface News {
  id: string;
  title: string;
  content: string;
  category: 'announcement' | 'new_product' | 'campaign';
  date: string;
  image?: string;
}

export interface Favorite {
  id: string;
  type: 'product' | 'work';
  product_id?: string;
  work_id?: string;
  created_at: string;
}