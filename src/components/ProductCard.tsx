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
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-bg-light mb-4">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
        />
        {showBadge && (
          <span className="absolute top-3 left-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
            {badge}
          </span>
        )}
      </div>
      <h3 className="font-heading text-base font-bold text-text-primary mb-1">
        {product.name}
      </h3>
      <p className="text-sm text-text-secondary mb-2">
        {product.short_description?.replace(/<[^>]*>/g, "") || ""}
      </p>
      <p className="text-xl font-bold text-text-primary">
        {formatPrice(product.price)}
      </p>
      {hasLowestPrice && (
        <p className="text-xs text-text-light mt-1">
          Najniższa cena z 30 dni: <span className="line-through">{formatPrice(product.regular_price)}</span>
        </p>
      )}
    </Link>
  );
}
