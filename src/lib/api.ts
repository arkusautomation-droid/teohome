import * as woo from "./woocommerce";
import { mockProducts, mockCategories, getMockProducts } from "./mock-data";
import type { WooProduct, WooCategory } from "@/types/woocommerce";

const USE_MOCK = !process.env.WOOCOMMERCE_CONSUMER_KEY || process.env.WOOCOMMERCE_CONSUMER_KEY === "ck_your_consumer_key_here";

// Products
export async function getProducts(params: Record<string, string | number> = {}): Promise<WooProduct[]> {
  if (USE_MOCK) return getMockProducts({ per_page: Number(params.per_page) || 12, category: params.category as string });
  try {
    return await woo.getProducts(params);
  } catch {
    console.warn("WooCommerce API unavailable, using mock data");
    return getMockProducts({ per_page: Number(params.per_page) || 12 });
  }
}

export async function getProduct(slugOrId: string | number): Promise<WooProduct | null> {
  if (USE_MOCK) {
    const id = typeof slugOrId === "number" ? slugOrId : undefined;
    const slug = typeof slugOrId === "string" ? slugOrId : undefined;
    return mockProducts.find((p) => (id ? p.id === id : p.slug === slug)) || mockProducts[0];
  }
  try {
    return await woo.getProduct(slugOrId);
  } catch {
    return mockProducts[0];
  }
}

export async function getFeaturedProducts(): Promise<WooProduct[]> {
  if (USE_MOCK) return getMockProducts({ featured: true, per_page: 4 });
  try {
    return await woo.getFeaturedProducts();
  } catch {
    return getMockProducts({ featured: true, per_page: 4 });
  }
}

export async function getNewProducts(): Promise<WooProduct[]> {
  if (USE_MOCK) return mockProducts.slice(0, 4);
  try {
    return await woo.getNewProducts();
  } catch {
    return mockProducts.slice(0, 4);
  }
}

// Categories
export async function getCategories(): Promise<WooCategory[]> {
  if (USE_MOCK) return mockCategories;
  try {
    return await woo.getCategories();
  } catch {
    return mockCategories;
  }
}

export async function getCategory(slugOrId: string | number): Promise<WooCategory | null> {
  if (USE_MOCK) {
    const slug = typeof slugOrId === "string" ? slugOrId : undefined;
    return mockCategories.find((c) => c.slug === slug) || mockCategories[0];
  }
  try {
    return await woo.getCategory(slugOrId);
  } catch {
    return mockCategories[0];
  }
}

export async function getProductsByCategory(categorySlug: string): Promise<WooProduct[]> {
  if (USE_MOCK) return getMockProducts({ category: categorySlug });
  try {
    return await woo.getProductsByCategory(categorySlug);
  } catch {
    return getMockProducts({ category: categorySlug });
  }
}

export async function getRelatedProducts(productId: number): Promise<WooProduct[]> {
  if (USE_MOCK) return mockProducts.filter((p) => p.id !== productId).slice(0, 4);
  try {
    return await woo.getRelatedProducts(productId);
  } catch {
    return mockProducts.filter((p) => p.id !== productId).slice(0, 4);
  }
}

// Re-export helpers
export { formatPrice, getProductImage } from "./woocommerce";
export { createOrder, searchProducts } from "./woocommerce";
