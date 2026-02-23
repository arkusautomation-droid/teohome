import type { WooProduct, WooCategory } from "@/types/woocommerce";

// Fallback data when WooCommerce API is not available
export const mockCategories: WooCategory[] = [
  {
    id: 1, name: "Kuchnie", slug: "kuchnie", parent: 0,
    description: "Kuchnie na wymiar", count: 24,
    image: { id: 1, src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80", name: "Kuchnie", alt: "Kuchnie" },
  },
  {
    id: 2, name: "Szafy DIY", slug: "szafy-diy", parent: 0,
    description: "Szafy do samodzielnego montażu", count: 18,
    image: { id: 2, src: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80", name: "Szafy DIY", alt: "Szafy DIY" },
  },
  {
    id: 3, name: "Sofy", slug: "sofy", parent: 0,
    description: "Sofy i kanapy", count: 12,
    image: { id: 3, src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80", name: "Sofy", alt: "Sofy" },
  },
  {
    id: 4, name: "Projekty wnętrz", slug: "projekty-wnetrz", parent: 0,
    description: "Projekty wnętrz na wymiar", count: 8,
    image: { id: 4, src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80", name: "Projekty wnętrz", alt: "Projekty wnętrz" },
  },
];

const mockProductBase = {
  type: "simple",
  status: "publish",
  featured: false,
  description: "Szafka kuchenna PARIS to połączenie klasycznej elegancji z nowoczesną funkcjonalnością. Korpus wykonany z wytrzymałej płyty laminowanej w kolorze białym, a fronty z naturalnego forniru dębowego nadają meblowi ciepła i przytulności.",
  short_description: "Szuflady 3 szt, szerokość do wyboru",
  sku: "",
  on_sale: false,
  stock_status: "instock" as const,
  tags: [],
  attributes: [
    { id: 1, name: "Kolor frontu", slug: "kolor-frontu", position: 0, visible: true, variation: true, options: ["Dąb naturalny", "Biały", "Ciemny"] },
    { id: 2, name: "Szerokość", slug: "szerokosc", position: 1, visible: true, variation: true, options: ["40cm", "60cm", "80cm"] },
  ],
  variations: [],
  related_ids: [],
  meta_data: [],
};

export const mockProducts: WooProduct[] = [
  {
    ...mockProductBase, id: 1, name: "Szafka kuchenna PARIS", slug: "szafka-kuchenna-paris",
    price: "250", regular_price: "300", sale_price: "250", on_sale: true, featured: true,
    categories: [{ id: 1, name: "Kuchnie", slug: "kuchnie" }],
    images: [
      { id: 1, src: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80", name: "PARIS", alt: "Szafka kuchenna PARIS" },
      { id: 2, src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80", name: "PARIS 2", alt: "Szafka kuchenna PARIS" },
    ],
  },
  {
    ...mockProductBase, id: 2, name: "Szafka kuchenna LYON", slug: "szafka-kuchenna-lyon",
    price: "320", regular_price: "320", sale_price: "",
    short_description: "Szuflady 2 szt, drzwiczki",
    categories: [{ id: 1, name: "Kuchnie", slug: "kuchnie" }],
    images: [
      { id: 3, src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80", name: "LYON", alt: "Szafka kuchenna LYON" },
    ],
  },
  {
    ...mockProductBase, id: 3, name: "Szafka kuchenna ROMA", slug: "szafka-kuchenna-roma",
    price: "410", regular_price: "410", sale_price: "",
    short_description: "Szuflady 4 szt, organizer",
    categories: [{ id: 1, name: "Kuchnie", slug: "kuchnie" }],
    images: [
      { id: 4, src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80", name: "ROMA", alt: "Szafka kuchenna ROMA" },
    ],
  },
  {
    ...mockProductBase, id: 4, name: "Szafka kuchenna OSLO", slug: "szafka-kuchenna-oslo",
    price: "280", regular_price: "280", sale_price: "",
    short_description: "Szuflady 2 szt, szerokość 60 cm",
    categories: [{ id: 1, name: "Kuchnie", slug: "kuchnie" }],
    images: [
      { id: 5, src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80", name: "OSLO", alt: "Szafka kuchenna OSLO" },
    ],
  },
  {
    ...mockProductBase, id: 5, name: "Szafka kuchenna NICE", slug: "szafka-kuchenna-nice",
    price: "350", regular_price: "350", sale_price: "",
    short_description: "Szuflady 3 szt, front ciemny",
    featured: true,
    categories: [{ id: 1, name: "Kuchnie", slug: "kuchnie" }],
    images: [
      { id: 6, src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", name: "NICE", alt: "Szafka kuchenna NICE" },
    ],
  },
  {
    ...mockProductBase, id: 6, name: "Szafka kuchenna MARSEILLE", slug: "szafka-kuchenna-marseille",
    price: "380", regular_price: "380", sale_price: "",
    short_description: "Szuflady 4 szt, front dąb",
    categories: [{ id: 1, name: "Kuchnie", slug: "kuchnie" }],
    images: [
      { id: 7, src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80", name: "MARSEILLE", alt: "Szafka kuchenna MARSEILLE" },
    ],
  },
];

export function getMockProducts(params?: { featured?: boolean; per_page?: number; category?: string }): WooProduct[] {
  let products = [...mockProducts];
  if (params?.featured) products = products.filter((p) => p.featured);
  if (params?.category) products = products.filter((p) => p.categories.some((c) => c.slug === params.category));
  if (params?.per_page) products = products.slice(0, params.per_page);
  return products;
}
