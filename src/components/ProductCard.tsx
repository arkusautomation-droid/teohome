import Link from "next/link";
import Image from "next/image";
import type { WooProduct } from "@/types/woocommerce";
import { formatPrice, getProductImage } from "@/lib/api";

interface ProductCardProps {
  product: WooProduct;
  showBadge?: boolean;
  badgeText?: string;
}

export default function ProductCard({ product, showBadge = true, badgeText }: ProductCardProps) {
  const imageUrl = getProductImage(product);
  const badge = badgeText || (product.on_sale ? "PROMOCJA" : "NOWOŚĆ");
  const hasLowestPrice = product.on_sale && product.regular_price;

  return (
    <Link href={`/produkt/${product.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
        />
        {showBadge && (
          <span className="absolute top-3 left-3 bg-[var(--color-badge-new)] text-white text-xs font-semibold px-3 py-1 rounded">
            {badge}
          </span>
        )}
      </div>
      <h3 className="font-[var(--font-heading)] text-lg font-semibold text-[var(--color-text-primary)] mb-1">
        {product.name}
      </h3>
      <p className="text-sm text-[var(--color-text-secondary)] mb-2">
        {product.short_description.replace(/<[^>]*>/g, "")}
      </p>
      <p className="text-xl font-bold text-[var(--color-text-primary)]">
        {formatPrice(product.price)}
      </p>
      {hasLowestPrice && (
        <p className="text-xs text-[var(--color-text-light)] mt-1">
          Najniższa cena z 30 dni: <span className="line-through">{formatPrice(product.regular_price)}</span>
        </p>
      )}
    </Link>
  );
}
