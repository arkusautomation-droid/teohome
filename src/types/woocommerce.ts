export interface WooImage {
  id: number;
  src: string;
  name: string;
  alt: string;
}

export interface WooCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  image: WooImage | null;
  count: number;
}

export interface WooProductAttribute {
  id: number;
  name: string;
  slug: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options: string[];
}

export interface WooProduct {
  id: number;
  name: string;
  slug: string;
  type: string;
  status: string;
  featured: boolean;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  stock_status: string;
  categories: { id: number; name: string; slug: string }[];
  tags: { id: number; name: string; slug: string }[];
  images: WooImage[];
  attributes: WooProductAttribute[];
  variations: number[];
  related_ids: number[];
  meta_data: { key: string; value: string }[];
}

export interface WooProductVariation {
  id: number;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  stock_status: string;
  image: WooImage;
  attributes: { id: number; name: string; option: string }[];
}

export interface CartItem {
  id: string;
  product: WooProduct;
  quantity: number;
  variation?: WooProductVariation;
  selectedAttributes?: Record<string, string>;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export interface WooOrder {
  id: number;
  status: string;
  total: string;
  billing: {
    first_name: string;
    last_name: string;
    address_1: string;
    city: string;
    postcode: string;
    country: string;
    email: string;
    phone: string;
  };
  shipping: {
    first_name: string;
    last_name: string;
    address_1: string;
    city: string;
    postcode: string;
    country: string;
  };
  line_items: {
    product_id: number;
    quantity: number;
    variation_id?: number;
  }[];
  payment_method: string;
}
