"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Truck,
  RotateCcw,
  Shield,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { WooProduct, WooImage } from "@/types/woocommerce";

/* ------------------------------------------------------------------ */
/*  Color swatch map (attribute option name -> hex)                     */
/* ------------------------------------------------------------------ */

const colorMap: Record<string, { hex: string; label: string }> = {
  "Dąb naturalny": { hex: "#C4A35A", label: "Dąb naturalny" },
  "Dab naturalny": { hex: "#C4A35A", label: "Dąb naturalny" },
  "Biały": { hex: "#F5F0E8", label: "Biały" },
  "Bialy": { hex: "#F5F0E8", label: "Biały" },
  "Ciemny": { hex: "#2C2C2C", label: "Ciemny" },
};

function getColorHex(option: string): string {
  return colorMap[option]?.hex || "#999999";
}

function getColorLabel(option: string): string {
  return colorMap[option]?.label || option;
}

/* ------------------------------------------------------------------ */
/*  ProductActions Component                                           */
/* ------------------------------------------------------------------ */

interface ProductActionsProps {
  product: WooProduct;
}

export default function ProductActions({ product }: ProductActionsProps) {
  const cart = useCart();

  /* ---- Gallery state ---- */
  const images: WooImage[] =
    product.images?.length > 0
      ? product.images
      : [{ id: 0, src: "/images/placeholder-product.svg", name: "placeholder", alt: product.name }];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  /* ---- Attribute state ---- */
  const colorAttribute = product.attributes?.find(
    (a) => a.slug === "kolor-frontu" || a.name.toLowerCase().includes("kolor")
  );
  const sizeAttribute = product.attributes?.find(
    (a) => a.slug === "szerokosc" || a.name.toLowerCase().includes("szerokoś") || a.name.toLowerCase().includes("szeroko")
  );

  const [selectedColor, setSelectedColor] = useState(
    colorAttribute?.options?.[0] || ""
  );
  const [selectedSize, setSelectedSize] = useState(
    sizeAttribute?.options?.[0] || ""
  );

  /* ---- Quantity state ---- */
  const [quantity, setQuantity] = useState(1);

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const incrementQuantity = () => {
    setQuantity((prev) => Math.min(99, prev + 1));
  };

  /* ---- Favorites state ---- */
  const [isFavorite, setIsFavorite] = useState(false);

  /* ---- Add to cart handler ---- */
  const handleAddToCart = () => {
    const attributes: Record<string, string> = {};
    if (selectedColor) attributes["kolor-frontu"] = selectedColor;
    if (selectedSize) attributes["szerokosc"] = selectedSize;

    cart.addItem(product, quantity, undefined, attributes);
  };

  /* ---- Price helpers ---- */
  const priceNum = parseFloat(product.price || "0");
  const regularPriceNum = parseFloat(product.regular_price || "0");
  const formatPrice = (p: number) => (isNaN(p) ? "0 zł" : `${p.toFixed(0)} zł`);

  return (
    <>
      {/* ============================================================ */}
      {/*  GALLERY (left column on desktop)                             */}
      {/* ============================================================ */}
      <div className="flex flex-col gap-4">
        {/* Main image */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-bg-light">
          <Image
            src={images[activeImageIndex].src}
            alt={images[activeImageIndex].alt || product.name}
            fill
            className="object-cover transition-opacity duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 55vw"
            priority
          />
          {/* Badge on image */}
          {product.on_sale && (
            <span className="absolute left-4 top-4 rounded-full bg-accent px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
              Promocja
            </span>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-3">
            {images.map((img, index) => (
              <button
                key={img.id || index}
                type="button"
                onClick={() => setActiveImageIndex(index)}
                className={`relative aspect-square overflow-hidden rounded-xl bg-bg-light transition-all ${
                  activeImageIndex === index
                    ? "ring-2 ring-primary ring-offset-2"
                    : "ring-1 ring-border hover:ring-text-light"
                }`}
                aria-label={`Zdjęcie produktu ${index + 1}`}
                aria-pressed={activeImageIndex === index}
              >
                <Image
                  src={img.src}
                  alt={img.alt || `${product.name} - miniatura ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="120px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/*  PRODUCT INFO (right column on desktop)                       */}
      {/* ============================================================ */}
      <div className="flex flex-col">
        {/* Category tag */}
        {product.categories?.[0] && (
          <span className="text-xs font-medium uppercase tracking-wider text-text-light">
            {product.categories[0].name}
          </span>
        )}

        {/* Product name */}
        <h1 className="mt-2 font-heading text-2xl font-bold text-text-primary md:text-[32px] md:leading-tight">
          {product.name}
        </h1>

        {/* Short description */}
        {product.short_description && (
          <p
            className="mt-3 text-sm leading-relaxed text-text-secondary"
            dangerouslySetInnerHTML={{
              __html: product.short_description,
            }}
          />
        )}

        {/* Price section */}
        <div className="mt-6 flex items-baseline gap-3">
          <p className="text-[28px] font-bold text-text-primary">
            {formatPrice(priceNum)}
          </p>
          {product.on_sale && regularPriceNum > priceNum && (
            <p className="text-base text-text-light line-through">
              {formatPrice(regularPriceNum)}
            </p>
          )}
        </div>
        {product.on_sale && regularPriceNum > priceNum && (
          <p className="mt-1 text-xs text-text-light">
            Najniższa cena z 30 dni: {formatPrice(regularPriceNum)}
          </p>
        )}

        {/* Divider */}
        <hr className="my-6 border-border" />

        {/* Color selector */}
        {colorAttribute && colorAttribute.options.length > 0 && (
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-text-primary">
              {colorAttribute.name}:
            </span>
            <div
              className="flex items-center gap-3"
              role="radiogroup"
              aria-label={colorAttribute.name}
            >
              {colorAttribute.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSelectedColor(option)}
                  className={`relative h-9 w-9 rounded-full transition-all ${
                    selectedColor === option
                      ? "ring-2 ring-primary ring-offset-2"
                      : "ring-1 ring-border hover:ring-text-light"
                  }`}
                  style={{ backgroundColor: getColorHex(option) }}
                  role="radio"
                  aria-checked={selectedColor === option}
                  aria-label={getColorLabel(option)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Size / width selector */}
        {sizeAttribute && sizeAttribute.options.length > 0 && (
          <div className="mt-5 flex flex-col gap-3">
            <span className="text-sm font-medium text-text-primary">
              {sizeAttribute.name}:
            </span>
            <div
              className="flex flex-wrap gap-2"
              role="radiogroup"
              aria-label={sizeAttribute.name}
            >
              {sizeAttribute.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSelectedSize(option)}
                  className={`rounded-full border px-5 py-2 text-sm font-medium transition-all ${
                    selectedSize === option
                      ? "border-bg-dark bg-bg-dark text-white"
                      : "border-border bg-white text-text-primary hover:border-text-light"
                  }`}
                  role="radio"
                  aria-checked={selectedSize === option}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity + Add to cart */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          {/* Quantity selector */}
          <div className="flex h-12 w-fit items-center rounded-full border border-border">
            <button
              type="button"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
              className="flex h-full w-11 items-center justify-center text-text-secondary transition-colors hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Zmniejsz ilość"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span
              className="flex h-full w-11 items-center justify-center border-x border-border text-sm font-medium text-text-primary"
              aria-live="polite"
              aria-label={`Ilość: ${quantity}`}
            >
              {quantity}
            </span>
            <button
              type="button"
              onClick={incrementQuantity}
              disabled={quantity >= 99}
              className="flex h-full w-11 items-center justify-center text-text-secondary transition-colors hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Zwiększ ilość"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {/* Add to cart button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex h-12 flex-1 items-center justify-center gap-2.5 rounded-full bg-accent text-sm font-semibold text-white transition-colors hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2"
          >
            <ShoppingCart className="h-5 w-5" strokeWidth={1.8} />
            Dodaj do koszyka
          </button>
        </div>

        {/* Add to favorites */}
        <button
          type="button"
          onClick={() => setIsFavorite(!isFavorite)}
          className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-border px-5 py-2 text-sm text-text-secondary transition-colors hover:border-primary hover:text-primary"
        >
          <Heart
            className={`h-4 w-4 ${
              isFavorite ? "fill-primary text-primary" : ""
            }`}
            strokeWidth={1.8}
          />
          {isFavorite ? "Dodano do ulubionych" : "Dodaj do ulubionych"}
        </button>

        {/* Divider */}
        <hr className="my-6 border-border" />

        {/* Product perks */}
        <div className="rounded-2xl bg-bg-light p-5">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-accent">
                <Truck className="h-4.5 w-4.5" strokeWidth={1.8} />
              </div>
              <div>
                <span className="text-sm font-medium text-text-primary">
                  Darmowa dostawa
                </span>
                <p className="text-xs text-text-light">od 500 zł</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-accent">
                <RotateCcw className="h-4.5 w-4.5" strokeWidth={1.8} />
              </div>
              <div>
                <span className="text-sm font-medium text-text-primary">
                  30 dni na zwrot
                </span>
                <p className="text-xs text-text-light">Bezpłatna wymiana</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-accent">
                <Shield className="h-4.5 w-4.5" strokeWidth={1.8} />
              </div>
              <div>
                <span className="text-sm font-medium text-text-primary">
                  Gwarancja 24 miesiące
                </span>
                <p className="text-xs text-text-light">Pełna ochrona</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
