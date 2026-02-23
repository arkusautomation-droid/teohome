"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ChevronRight, Grid, List } from "lucide-react";
import type { WooProduct, WooCategory } from "@/types/woocommerce";
import { formatPrice, getProductImage } from "@/lib/api";

/* ------------------------------------------------------------------ */
/*  Category Sidebar Item                                              */
/* ------------------------------------------------------------------ */

function CategoryItem({
  category,
  currentSlug,
  childCategories,
}: {
  category: WooCategory;
  currentSlug?: string;
  childCategories: WooCategory[];
}) {
  const isActive = category.slug === currentSlug;
  const [open, setOpen] = useState(isActive);
  const hasChildren = childCategories.length > 0;

  return (
    <li>
      <div className="flex items-center justify-between">
        <Link
          href={`/kategoria/${category.slug}`}
          className={`flex-1 py-2.5 text-left text-sm transition-colors hover:text-primary ${
            isActive
              ? "font-semibold text-primary"
              : "text-text-primary"
          }`}
          aria-current={isActive ? "page" : undefined}
        >
          {category.name}
          {category.count > 0 && (
            <span className="ml-1 text-text-light">({category.count})</span>
          )}
        </Link>
        {hasChildren && (
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex h-8 w-8 items-center justify-center text-text-light transition-transform duration-200"
            aria-expanded={open}
            aria-label={`${open ? "Zwi\u0144" : "Rozwi\u0144"} podkategorie ${category.name}`}
          >
            <ChevronDown
              size={16}
              strokeWidth={2}
              className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </button>
        )}
      </div>

      {/* Subcategories */}
      {hasChildren && (
        <ul
          className={`overflow-hidden transition-all duration-300 ${
            open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {childCategories.map((sub) => (
            <li key={sub.id}>
              <Link
                href={`/kategoria/${sub.slug}`}
                className={`block py-1.5 pl-4 text-sm transition-colors hover:text-primary ${
                  sub.slug === currentSlug
                    ? "font-semibold text-primary"
                    : "text-text-secondary"
                }`}
                aria-current={sub.slug === currentSlug ? "page" : undefined}
              >
                {sub.name}
                {sub.count > 0 && (
                  <span className="ml-1 text-text-light">({sub.count})</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

/* ------------------------------------------------------------------ */
/*  Price Range Slider                                                 */
/* ------------------------------------------------------------------ */

function PriceFilter() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const MIN = 0;
  const MAX = 5000;

  const minPercent = (minPrice / MAX) * 100;
  const maxPercent = (maxPrice / MAX) * 100;

  return (
    <div>
      {/* Input fields */}
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <label htmlFor="price-from" className="sr-only">
            Cena od
          </label>
          <input
            id="price-from"
            type="number"
            min={MIN}
            max={MAX}
            value={minPrice}
            onChange={(e) => {
              const val = Math.min(Number(e.target.value), maxPrice);
              setMinPrice(val);
            }}
            placeholder="Cena od"
            className="h-10 w-full rounded-md border border-border bg-white px-3 text-sm text-text-primary placeholder:text-text-light focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          />
        </div>
        <span className="text-text-light" aria-hidden="true">
          &ndash;
        </span>
        <div className="flex-1">
          <label htmlFor="price-to" className="sr-only">
            Cena do
          </label>
          <input
            id="price-to"
            type="number"
            min={MIN}
            max={MAX}
            value={maxPrice}
            onChange={(e) => {
              const val = Math.max(Number(e.target.value), minPrice);
              setMaxPrice(val);
            }}
            placeholder="Cena do"
            className="h-10 w-full rounded-md border border-border bg-white px-3 text-sm text-text-primary placeholder:text-text-light focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          />
        </div>
      </div>

      {/* Dual range slider */}
      <div className="relative mt-4 h-6" aria-hidden="true">
        {/* Track background */}
        <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-border" />
        {/* Active track */}
        <div
          className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-primary"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />

        {/* Min thumb */}
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={50}
          value={minPrice}
          onChange={(e) => {
            const val = Math.min(Number(e.target.value), maxPrice - 50);
            setMinPrice(val);
          }}
          className="pointer-events-none absolute top-0 h-6 w-full appearance-none bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-white"
          aria-label="Minimalna cena"
        />

        {/* Max thumb */}
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={50}
          value={maxPrice}
          onChange={(e) => {
            const val = Math.max(Number(e.target.value), minPrice + 50);
            setMaxPrice(val);
          }}
          className="pointer-events-none absolute top-0 h-6 w-full appearance-none bg-transparent [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-white"
          aria-label="Maksymalna cena"
        />
      </div>

      {/* Labels */}
      <div className="mt-1 flex justify-between text-xs text-text-light">
        <span>{minPrice} zl</span>
        <span>{maxPrice} zl</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Attribute Checkboxes                                               */
/* ------------------------------------------------------------------ */

function AttributeFilter({ attributes }: { attributes: string[] }) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  return (
    <ul className="space-y-3">
      {attributes.map((attr) => (
        <li key={attr}>
          <label className="flex cursor-pointer items-center gap-3 text-sm text-text-primary transition-colors hover:text-primary">
            <input
              type="checkbox"
              checked={!!checked[attr]}
              onChange={() =>
                setChecked((prev) => ({ ...prev, [attr]: !prev[attr] }))
              }
              className="h-4 w-4 rounded border-border text-primary accent-primary focus:ring-primary/30"
            />
            {attr}
          </label>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/*  Product Card (Grid View)                                           */
/* ------------------------------------------------------------------ */

function ProductCardGrid({ product }: { product: WooProduct }) {
  const imageUrl = getProductImage(product);
  const hasLowestPrice = product.on_sale && product.regular_price;

  return (
    <Link
      href={`/produkt/${product.slug}`}
      className="group block overflow-hidden rounded-lg border border-border-light bg-white transition-shadow duration-300 hover:shadow-lg"
    >
      {/* Image container */}
      <div className="relative aspect-square overflow-hidden bg-bg-light">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badge */}
        {product.on_sale && (
          <span className="absolute right-3 top-3 rounded bg-badge-new px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            Promocja
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-text-primary transition-colors group-hover:text-primary">
          {product.name}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-text-secondary">
          {product.short_description.replace(/<[^>]*>/g, "")}
        </p>
        <p className="mt-3 text-lg font-bold text-text-primary">
          {formatPrice(product.price)}
        </p>
        {hasLowestPrice && (
          <p className="mt-0.5 text-xs text-text-light">
            Najnizsza cena z 30 dni:{" "}
            <span className="line-through">{formatPrice(product.regular_price)}</span>
          </p>
        )}
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Product Card (List View)                                           */
/* ------------------------------------------------------------------ */

function ProductCardList({ product }: { product: WooProduct }) {
  const imageUrl = getProductImage(product);
  const hasLowestPrice = product.on_sale && product.regular_price;

  return (
    <Link
      href={`/produkt/${product.slug}`}
      className="group flex gap-5 overflow-hidden rounded-lg border border-border-light bg-white p-4 transition-shadow duration-300 hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-md bg-bg-light sm:h-40 sm:w-40">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          sizes="160px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.on_sale && (
          <span className="absolute right-2 top-2 rounded bg-badge-new px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
            Promocja
          </span>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-col justify-center">
        <h3 className="text-sm font-semibold text-text-primary transition-colors group-hover:text-primary">
          {product.name}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-text-secondary">
          {product.short_description.replace(/<[^>]*>/g, "")}
        </p>
        <p className="mt-3 text-lg font-bold text-text-primary">
          {formatPrice(product.price)}
        </p>
        {hasLowestPrice && (
          <p className="mt-0.5 text-xs text-text-light">
            Najnizsza cena z 30 dni:{" "}
            <span className="line-through">{formatPrice(product.regular_price)}</span>
          </p>
        )}
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Pagination                                                         */
/* ------------------------------------------------------------------ */

function Pagination({
  currentPage,
  totalPages,
  basePath,
}: {
  currentPage: number;
  totalPages: number;
  basePath: string;
}) {
  const pages: (number | "...")[] = [];

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <nav aria-label="Paginacja" className="flex items-center justify-center gap-1">
      {pages.map((page, idx) =>
        page === "..." ? (
          <span
            key={`ellipsis-${idx}`}
            className="flex h-10 w-10 items-center justify-center text-sm text-text-light"
          >
            ...
          </span>
        ) : (
          <Link
            key={page}
            href={`${basePath}?page=${page}`}
            className={`flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium transition-colors ${
              page === currentPage
                ? "bg-primary text-white"
                : "text-text-secondary hover:bg-bg-light hover:text-text-primary"
            }`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </Link>
        )
      )}
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Category Content (Client Component)                           */
/* ------------------------------------------------------------------ */

interface CategoryContentProps {
  products: WooProduct[];
  allCategories: WooCategory[];
  currentSlug?: string;
  categoryName: string;
  categoryDescription?: string;
  basePath: string;
  uniqueAttributes: string[];
}

export default function CategoryContent({
  products,
  allCategories,
  currentSlug,
  categoryName,
  categoryDescription,
  basePath,
  uniqueAttributes,
}: CategoryContentProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Build category tree: top-level (parent=0) with their children
  const topLevelCategories = allCategories.filter((c) => c.parent === 0);
  const getChildren = (parentId: number) =>
    allCategories.filter((c) => c.parent === parentId);

  // Calculate total pages (assume 12 per page for now)
  const totalPages = Math.max(1, Math.ceil(products.length / 12));

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-10 lg:px-8 lg:py-14">
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
        {/* ======================================================== */}
        {/*  MOBILE FILTER TOGGLE                                     */}
        {/* ======================================================== */}
        <button
          type="button"
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="flex items-center gap-2 self-start rounded-md border border-border px-4 py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-bg-light lg:hidden"
          aria-expanded={mobileSidebarOpen}
          aria-controls="sidebar-filters"
        >
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${
              mobileSidebarOpen ? "rotate-180" : ""
            }`}
          />
          Filtry
        </button>

        {/* ======================================================== */}
        {/*  LEFT SIDEBAR                                             */}
        {/* ======================================================== */}
        <aside
          id="sidebar-filters"
          className={`w-full shrink-0 lg:w-[280px] ${
            mobileSidebarOpen ? "block" : "hidden lg:block"
          }`}
          aria-label="Filtry produktow"
        >
          {/* --- KATEGORIE --- */}
          <div className="mb-8">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-text-primary">
              Kategorie
            </h2>
            <ul className="space-y-0.5">
              {/* "All products" link */}
              <li>
                <Link
                  href="/kategoria"
                  className={`block py-2.5 text-sm transition-colors hover:text-primary ${
                    !currentSlug
                      ? "font-semibold text-primary"
                      : "text-text-primary"
                  }`}
                  aria-current={!currentSlug ? "page" : undefined}
                >
                  Wszystkie produkty
                </Link>
              </li>
              {topLevelCategories.map((cat) => (
                <CategoryItem
                  key={cat.id}
                  category={cat}
                  currentSlug={currentSlug}
                  childCategories={getChildren(cat.id)}
                />
              ))}
            </ul>
          </div>

          {/* Divider */}
          <hr className="mb-8 border-border-light" />

          {/* --- CENA --- */}
          <div className="mb-8">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-text-primary">
              Cena
            </h2>
            <PriceFilter />
          </div>

          {/* Divider */}
          <hr className="mb-8 border-border-light" />

          {/* --- ATRYBUTY --- */}
          {uniqueAttributes.length > 0 && (
            <div>
              <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-text-primary">
                Atrybuty
              </h2>
              <AttributeFilter attributes={uniqueAttributes} />
            </div>
          )}
        </aside>

        {/* ======================================================== */}
        {/*  RIGHT CONTENT AREA                                       */}
        {/* ======================================================== */}
        <div className="min-w-0 flex-1">
          {/* --- Category intro --- */}
          <div className="mb-10">
            <h2 className="font-heading text-2xl font-semibold text-text-primary sm:text-3xl">
              {categoryName}
            </h2>
            {categoryDescription && (
              <div
                className="mt-4 max-w-3xl space-y-4 text-sm leading-relaxed text-text-secondary"
                dangerouslySetInnerHTML={{ __html: categoryDescription }}
              />
            )}
          </div>

          {/* --- Toolbar: view toggle & sorting --- */}
          <div className="mb-6 flex items-center justify-between border-b border-border-light pb-4">
            <p className="text-sm text-text-light">
              Wyswietlanie{" "}
              <span className="font-medium text-text-primary">
                {products.length}
              </span>{" "}
              produktow
            </p>

            <div className="flex items-center gap-2">
              {/* View modes */}
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`flex h-9 w-9 items-center justify-center rounded-md transition-colors ${
                  viewMode === "grid"
                    ? "bg-primary text-white"
                    : "text-text-light hover:bg-bg-light hover:text-text-primary"
                }`}
                aria-label="Widok siatki"
                aria-pressed={viewMode === "grid"}
              >
                <Grid size={18} strokeWidth={1.8} />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`flex h-9 w-9 items-center justify-center rounded-md transition-colors ${
                  viewMode === "list"
                    ? "bg-primary text-white"
                    : "text-text-light hover:bg-bg-light hover:text-text-primary"
                }`}
                aria-label="Widok listy"
                aria-pressed={viewMode === "list"}
              >
                <List size={18} strokeWidth={1.8} />
              </button>
            </div>
          </div>

          {/* --- Product Grid / List --- */}
          {products.length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <ProductCardGrid key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {products.map((product) => (
                  <ProductCardList key={product.id} product={product} />
                ))}
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-lg font-medium text-text-primary">
                Brak produktow w tej kategorii
              </p>
              <p className="mt-2 text-sm text-text-secondary">
                Sprawdz inne kategorie lub wrocz do wszystkich produktow.
              </p>
              <Link
                href="/kategoria"
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
              >
                Wszystkie produkty
              </Link>
            </div>
          )}

          {/* --- Pagination --- */}
          {totalPages > 1 && (
            <div className="mt-12">
              <Pagination
                currentPage={1}
                totalPages={totalPages}
                basePath={basePath}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
