import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import {
  getProduct,
  getRelatedProducts,
  formatPrice,
  getProductImage,
} from "@/lib/api";
import type { WooProduct } from "@/types/woocommerce";
import ProductActions from "@/components/ProductActions";
import ProductTabs from "@/components/ProductTabs";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface PageProps {
  params: Promise<{ slug: string }>;
}

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return { title: "Produkt nie znaleziony - TeoHome" };
  }

  return {
    title: `${product.name} - TeoHome`,
    description:
      product.short_description?.replace(/<[^>]*>/g, "") ||
      product.description?.replace(/<[^>]*>/g, "").slice(0, 160) ||
      `${product.name} - kup w TeoHome`,
  };
}

/* ------------------------------------------------------------------ */
/*  Breadcrumb                                                         */
/* ------------------------------------------------------------------ */

function Breadcrumb({ product }: { product: WooProduct }) {
  const category = product.categories?.[0];

  return (
    <nav aria-label="Ścieżka nawigacji" className="py-4">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-text-secondary">
        <li>
          <Link
            href="/"
            className="transition-colors hover:text-text-primary"
          >
            Strona główna
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="h-3.5 w-3.5 text-text-light" />
        </li>
        {category && (
          <>
            <li>
              <Link
                href={`/kategoria/${category.slug}`}
                className="transition-colors hover:text-text-primary"
              >
                {category.name}
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5 text-text-light" />
            </li>
          </>
        )}
        <li>
          <span className="text-text-primary" aria-current="page">
            {product.name}
          </span>
        </li>
      </ol>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Related Product Card                                               */
/* ------------------------------------------------------------------ */

function RelatedProductCard({ product }: { product: WooProduct }) {
  const imageUrl = getProductImage(product);
  const hasLowestPrice = product.on_sale && product.regular_price;

  return (
    <article className="group flex flex-col">
      <Link
        href={`/produkt/${product.slug}`}
        className="relative aspect-[4/5] overflow-hidden rounded-lg bg-bg-light"
      >
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {product.on_sale && (
          <span className="absolute left-3 top-3 rounded-sm bg-badge-new px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
            Promocja
          </span>
        )}
      </Link>
      <div className="mt-3 flex flex-col gap-1">
        <Link href={`/produkt/${product.slug}`}>
          <h3 className="text-sm font-medium text-text-primary transition-colors group-hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-text-light">
          {product.short_description?.replace(/<[^>]*>/g, "") || ""}
        </p>
        <p className="mt-1 text-base font-bold text-text-primary">
          {formatPrice(product.price)}
        </p>
        {hasLowestPrice && (
          <p className="text-xs text-text-light">
            Najniższa cena z 30 dni:{" "}
            <span className="line-through">
              {formatPrice(product.regular_price)}
            </span>
          </p>
        )}
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Product Page (Server Component)                               */
/* ------------------------------------------------------------------ */

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.id);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb product={product} />

        {/* Product section - Two column layout */}
        <section
          aria-label="Informacje o produkcie"
          className="grid grid-cols-1 gap-8 pb-12 lg:grid-cols-[55%_1fr] lg:gap-12 xl:gap-16"
        >
          {/* ProductActions renders both gallery (left) and info (right) */}
          <ProductActions product={product} />
        </section>

        {/* Divider */}
        <hr className="border-border" />

        {/* Product description tabs */}
        <ProductTabs product={product} />
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section
          aria-label="Podobne produkty"
          className="border-t border-border bg-bg-light"
        >
          <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-8 lg:py-20">
            <h2 className="font-heading text-2xl font-semibold text-text-primary md:text-3xl">
              Podobne produkty
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((relProduct) => (
                <RelatedProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
