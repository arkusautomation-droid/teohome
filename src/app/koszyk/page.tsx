"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Minus, Plus, ArrowLeft, ShoppingCart, Lock, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice, getProductImage } from "@/lib/woocommerce";

export default function KoszykPage() {
  const { items, totalItems, totalPrice, updateQuantity, removeItem } = useCart();
  const [couponCode, setCouponCode] = useState("");

  const shippingCost = totalPrice >= 500 ? 0 : 49;
  const total = totalPrice + shippingCost;

  return (
    <div className="min-h-screen bg-bg-light">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-border-light">
        <div className="mx-auto max-w-[1440px] px-6 py-3 lg:px-16">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-text-light">
              <li>
                <Link href="/" className="transition-colors hover:text-text-primary">
                  Strona główna
                </Link>
              </li>
              <li aria-hidden="true" className="text-text-light">/</li>
              <li>
                <span className="text-text-primary font-medium">Koszyk</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Page Content */}
      <div className="mx-auto max-w-[1440px] px-6 py-8 lg:px-16 lg:py-12">
        <h1 className="font-heading text-2xl font-bold text-text-primary md:text-3xl">
          Koszyk ({totalItems})
        </h1>

        {items.length === 0 ? (
          <div className="mt-16 flex flex-col items-center justify-center rounded-2xl bg-white p-12 text-center shadow-sm">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-bg-light">
              <ShoppingCart size={32} className="text-text-light" strokeWidth={1.5} />
            </div>
            <h2 className="mt-6 font-heading text-2xl font-bold text-text-primary">
              Twój koszyk jest pusty
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              Dodaj produkty do koszyka, aby kontynuować zakupy.
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-accent/90"
            >
              <ArrowLeft size={16} strokeWidth={2} />
              Przejdź do sklepu
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-[1fr_400px] xl:gap-10">
            {/* LEFT - Cart Items */}
            <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
              <div className="hidden border-b border-border pb-3 md:grid md:grid-cols-[2fr_1fr_1fr_1fr_40px] md:gap-4">
                <span className="text-xs font-medium uppercase tracking-wider text-text-light">Produkt</span>
                <span className="text-xs font-medium uppercase tracking-wider text-text-light text-center">Cena</span>
                <span className="text-xs font-medium uppercase tracking-wider text-text-light text-center">Ilość</span>
                <span className="text-xs font-medium uppercase tracking-wider text-text-light text-right">Suma</span>
                <span />
              </div>

              <div className="divide-y divide-border-light">
                {items.map((item) => {
                  const price = item.variation
                    ? parseFloat(item.variation.price || "0")
                    : parseFloat(item.product.price || "0");
                  const imageUrl = item.variation?.image?.src || getProductImage(item.product);
                  const attrs = item.selectedAttributes
                    ? Object.entries(item.selectedAttributes).map(([k, v]) => `${k}: ${v}`).join(", ")
                    : "";

                  return (
                    <div
                      key={item.id}
                      className="grid grid-cols-[80px_1fr] gap-4 py-6 md:grid-cols-[2fr_1fr_1fr_1fr_40px] md:items-center md:gap-4"
                    >
                      <div className="col-span-2 flex items-start gap-4 md:col-span-1">
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-bg-light md:h-24 md:w-24">
                          <Image
                            src={imageUrl}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-sm font-bold text-text-primary md:text-base">
                            {item.product.name}
                          </h3>
                          {attrs && (
                            <p className="mt-0.5 text-xs text-text-light">{attrs}</p>
                          )}
                          <p className="mt-2 text-sm font-bold text-text-primary md:hidden">
                            {formatPrice(price * item.quantity)}
                          </p>
                        </div>
                      </div>

                      <div className="hidden text-center text-sm font-medium text-text-primary md:block">
                        {formatPrice(price)}
                      </div>

                      <div className="col-start-2 flex items-center md:col-start-auto md:justify-center">
                        <div className="inline-flex items-center rounded-full border border-border">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="flex h-9 w-9 items-center justify-center text-text-secondary transition-colors hover:bg-bg-light hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-40"
                            aria-label="Zmniejsz ilość"
                          >
                            <Minus size={14} strokeWidth={2} />
                          </button>
                          <span className="flex h-9 w-10 items-center justify-center border-x border-border text-sm font-medium text-text-primary">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex h-9 w-9 items-center justify-center text-text-secondary transition-colors hover:bg-bg-light hover:text-text-primary"
                            aria-label="Zwiększ ilość"
                          >
                            <Plus size={14} strokeWidth={2} />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="ml-3 flex h-9 w-9 items-center justify-center rounded-full text-text-light transition-colors hover:bg-red-50 hover:text-red-500 md:hidden"
                          aria-label={`Usuń ${item.product.name} z koszyka`}
                        >
                          <X size={16} strokeWidth={2} />
                        </button>
                      </div>

                      <div className="hidden text-right text-sm font-bold text-text-primary md:block">
                        {formatPrice(price * item.quantity)}
                      </div>

                      <div className="hidden md:flex md:justify-center">
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-full text-text-light transition-colors hover:bg-red-50 hover:text-red-500"
                          aria-label={`Usuń ${item.product.name} z koszyka`}
                        >
                          <X size={16} strokeWidth={2} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-2 border-t border-border pt-6">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm font-medium text-text-secondary transition-colors hover:border-primary hover:text-primary"
                >
                  <ArrowLeft size={16} strokeWidth={2} />
                  Kontynuuj zakupy
                </Link>
              </div>
            </div>

            {/* RIGHT - Order Summary */}
            <div className="xl:sticky xl:top-[80px] xl:self-start">
              <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
                <h2 className="font-heading text-lg font-bold text-text-primary">
                  Podsumowanie
                </h2>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-secondary">Produkty ({totalItems}):</span>
                    <span className="font-medium text-text-primary">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex items-start justify-between text-sm">
                    <div>
                      <span className="text-text-secondary">Dostawa:</span>
                      {totalPrice >= 500 && (
                        <p className="mt-0.5 text-xs text-green-600">Darmowa dostawa!</p>
                      )}
                    </div>
                    <span className="font-medium text-text-primary">
                      {shippingCost === 0 ? (
                        <span className="text-green-600">Gratis</span>
                      ) : (
                        formatPrice(shippingCost)
                      )}
                    </span>
                  </div>
                </div>

                <div className="my-5 border-t border-border" />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-text-secondary">Razem do zapłaty:</span>
                  <span className="font-heading text-2xl font-bold text-text-primary">
                    {formatPrice(total)}
                  </span>
                </div>

                <div className="mt-6 rounded-xl bg-bg-light p-4">
                  <p className="text-xs font-medium text-text-secondary">Kod rabatowy</p>
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Wpisz kod"
                      className="h-10 flex-1 rounded-full border border-border bg-white px-4 text-sm text-text-primary placeholder:text-text-light outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/30"
                    />
                    <button
                      type="button"
                      className="h-10 shrink-0 rounded-full bg-bg-dark px-5 text-sm font-medium text-white transition-colors hover:bg-text-primary"
                    >
                      Zastosuj
                    </button>
                  </div>
                </div>

                <Link
                  href="/kasa"
                  className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent text-sm font-semibold text-white transition-all hover:bg-accent/90 active:scale-[0.98]"
                >
                  Przejdź do kasy
                </Link>

                <div className="mt-5 flex items-center justify-center gap-6">
                  <div className="flex items-center gap-1.5 text-text-light">
                    <Lock size={14} strokeWidth={1.8} />
                    <span className="text-xs">Bezpieczna płatność</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-text-light">
                    <Truck size={14} strokeWidth={1.8} />
                    <span className="text-xs">Szybka dostawa</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
