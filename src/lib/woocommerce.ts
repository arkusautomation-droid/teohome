import type {
  WooProduct,
  WooCategory,
  WooProductVariation,
  WooOrder,
} from "@/types/woocommerce";

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || "http://localhost:8080";
const CONSUMER_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY || "";
const CONSUMER_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET || "";

function getAuthParams(): string {
  if (!CONSUMER_KEY || !CONSUMER_SECRET) return "";
  return `consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`;
}

async function wooFetch<T>(
  endpoint: string,
  params: Record<string, string | number> = {},
  options: RequestInit = {}
): Promise<T> {
  const searchParams = new URLSearchParams();

  const authParams = getAuthParams();
  if (authParams) {
    searchParams.set("consumer_key", CONSUMER_KEY);
    searchParams.set("consumer_secret", CONSUMER_SECRET);
  }

  Object.entries(params).forEach(([key, value]) => {
    searchParams.set(key, String(value));
  });

  const url = `${API_URL}/wp-json/wc/v3/${endpoint}?${searchParams.toString()}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`WooCommerce API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// Products
export async function getProducts(params: Record<string, string | number> = {}): Promise<WooProduct[]> {
  return wooFetch<WooProduct[]>("products", { per_page: 12, ...params });
}

export async function getProduct(slugOrId: string | number): Promise<WooProduct> {
  if (typeof slugOrId === "number" || !isNaN(Number(slugOrId))) {
    return wooFetch<WooProduct>(`products/${slugOrId}`);
  }
  const products = await wooFetch<WooProduct[]>("products", { slug: slugOrId });
  if (!products.length) throw new Error(`Product not found: ${slugOrId}`);
  return products[0];
}

export async function getProductVariations(productId: number): Promise<WooProductVariation[]> {
  return wooFetch<WooProductVariation[]>(`products/${productId}/variations`, {
    per_page: 100,
  });
}

export async function getFeaturedProducts(): Promise<WooProduct[]> {
  return getProducts({ featured: 1, per_page: 4 });
}

export async function getNewProducts(): Promise<WooProduct[]> {
  return getProducts({ orderby: "date", order: "desc", per_page: 4 });
}

export async function getOnSaleProducts(): Promise<WooProduct[]> {
  return getProducts({ on_sale: 1, per_page: 4 });
}

export async function getRelatedProducts(productId: number): Promise<WooProduct[]> {
  const product = await getProduct(productId);
  if (!product.related_ids?.length) return [];
  const related = await Promise.all(
    product.related_ids.slice(0, 4).map((id) => getProduct(id).catch(() => null))
  );
  return related.filter(Boolean) as WooProduct[];
}

// Categories
export async function getCategories(params: Record<string, string | number> = {}): Promise<WooCategory[]> {
  return wooFetch<WooCategory[]>("products/categories", {
    per_page: 100,
    hide_empty: 1,
    ...params,
  });
}

export async function getCategory(slugOrId: string | number): Promise<WooCategory> {
  if (typeof slugOrId === "number" || !isNaN(Number(slugOrId))) {
    return wooFetch<WooCategory>(`products/categories/${slugOrId}`);
  }
  const cats = await wooFetch<WooCategory[]>("products/categories", { slug: slugOrId });
  if (!cats.length) throw new Error(`Category not found: ${slugOrId}`);
  return cats[0];
}

export async function getProductsByCategory(
  categorySlug: string,
  params: Record<string, string | number> = {}
): Promise<WooProduct[]> {
  const category = await getCategory(categorySlug);
  return getProducts({ category: category.id, ...params });
}

// Orders
export async function createOrder(orderData: Partial<WooOrder>): Promise<WooOrder> {
  return wooFetch<WooOrder>("orders", {}, {
    method: "POST",
    body: JSON.stringify(orderData),
  });
}

// Search
export async function searchProducts(query: string): Promise<WooProduct[]> {
  return getProducts({ search: query });
}

// Helper: format price
export function formatPrice(price: string | number): string {
  const num = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(num)) return "0 zł";
  return `${num.toFixed(0)} zł`;
}

// Helper: get primary image
export function getProductImage(product: WooProduct): string {
  return product.images?.[0]?.src || "/images/placeholder-product.svg";
}

// Helper: check if product is new (created within last 30 days)
export function isNewProduct(product: WooProduct): boolean {
  return product.meta_data?.some((m) => m.key === "_is_new" && m.value === "yes") || false;
}
