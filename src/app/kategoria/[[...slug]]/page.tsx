import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import {
  getCategories,
  getProductsByCategory,
  getProducts,
  getCategory,
} from "@/lib/api";
import type { WooCategory } from "@/types/woocommerce";
import CategoryContent from "./CategoryFilters";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const categorySlug = slug?.[0];

  if (!categorySlug) {
    return {
      title: "Wszystkie produkty | TeoHome",
      description:
        "Przeglądaj całą ofertę mebli TeoHome - kuchnie, szafy, sofy i projekty wnętrz.",
    };
  }

  const category = await getCategory(categorySlug).catch(() => null);
  return {
    title: `${category?.name || "Kategoria"} | TeoHome`,
    description:
      category?.description ||
      `Produkty w kategorii ${category?.name || categorySlug} - TeoHome`,
  };
}

/* ------------------------------------------------------------------ */
/*  Helper: build breadcrumbs from category hierarchy                   */
/* ------------------------------------------------------------------ */

function buildBreadcrumbs(
  currentCategory: WooCategory | null,
  allCategories: WooCategory[]
): { name: string; href: string }[] {
  const crumbs: { name: string; href: string }[] = [];

  if (!currentCategory) return crumbs;

  // Walk up the parent chain
  let cat: WooCategory | undefined = currentCategory;
  while (cat) {
    crumbs.unshift({ name: cat.name, href: `/kategoria/${cat.slug}` });
    if (cat.parent === 0) break;
    cat = allCategories.find((c) => c.id === cat!.parent);
  }

  return crumbs;
}

/* ------------------------------------------------------------------ */
/*  Helper: extract unique attributes from products                    */
/* ------------------------------------------------------------------ */

function extractUniqueAttributes(
  products: { attributes: { name: string; options: string[] }[] }[]
): string[] {
  const attrSet = new Set<string>();
  for (const product of products) {
    for (const attr of product.attributes) {
      for (const option of attr.options) {
        attrSet.add(option);
      }
    }
  }
  return Array.from(attrSet);
}

/* ------------------------------------------------------------------ */
/*  Page Component (Server)                                            */
/* ------------------------------------------------------------------ */

export default async function KategoriaPage({ params }: PageProps) {
  const { slug } = await params;
  const categorySlug = slug?.[0];

  // Fetch data in parallel
  const [allCategories, products, currentCategory] = await Promise.all([
    getCategories(),
    categorySlug ? getProductsByCategory(categorySlug) : getProducts(),
    categorySlug ? getCategory(categorySlug).catch(() => null) : null,
  ]);

  const categoryName = currentCategory?.name || "Wszystkie produkty";
  const categoryDescription = currentCategory?.description || "";

  // Hero image: use category image if available, otherwise default
  const heroImage =
    currentCategory?.image?.src ||
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=80";

  // Build breadcrumbs
  const breadcrumbs = buildBreadcrumbs(currentCategory, allCategories);

  // Extract unique attribute options for filter sidebar
  const uniqueAttributes = extractUniqueAttributes(products);

  // Base path for pagination links
  const basePath = categorySlug
    ? `/kategoria/${categorySlug}`
    : "/kategoria";

  return (
    <>
      {/* ============================================================ */}
      {/*  HERO BANNER                                                  */}
      {/* ============================================================ */}
      <section className="relative h-[280px] w-full overflow-hidden sm:h-[340px] lg:h-[400px]">
        {/* Background image */}
        <Image
          src={heroImage}
          alt={categoryName}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col items-start justify-end px-6 pb-12 lg:px-16">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-sm text-white/70">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-white"
                >
                  Strona główna
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={14} strokeWidth={2} />
              </li>
              {breadcrumbs.length === 0 ? (
                <li className="font-medium text-white" aria-current="page">
                  Kategorie
                </li>
              ) : (
                <>
                  <li>
                    <Link
                      href="/kategoria"
                      className="transition-colors hover:text-white"
                    >
                      Kategorie
                    </Link>
                  </li>
                  {breadcrumbs.map((crumb, index) => (
                    <li key={crumb.href} className="flex items-center gap-2">
                      <span aria-hidden="true">
                        <ChevronRight size={14} strokeWidth={2} />
                      </span>
                      {index === breadcrumbs.length - 1 ? (
                        <span
                          className="font-medium text-white"
                          aria-current="page"
                        >
                          {crumb.name}
                        </span>
                      ) : (
                        <Link
                          href={crumb.href}
                          className="transition-colors hover:text-white"
                        >
                          {crumb.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </>
              )}
            </ol>
          </nav>

          <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            {categoryName}
          </h1>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  MAIN CONTENT (Client Component)                              */}
      {/* ============================================================ */}
      <CategoryContent
        products={products}
        allCategories={allCategories}
        currentSlug={categorySlug}
        categoryName={categoryName}
        categoryDescription={categoryDescription}
        basePath={basePath}
        uniqueAttributes={uniqueAttributes}
      />
    </>
  );
}
