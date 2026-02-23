"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import type { WooProduct } from "@/types/woocommerce";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

const tabs = [
  { id: "opis", label: "Opis" },
  { id: "specyfikacja", label: "Specyfikacja" },
  { id: "opinie", label: "Opinie" },
] as const;

type TabId = (typeof tabs)[number]["id"];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface ProductTabsProps {
  product: WooProduct;
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("opis");

  /* Build specification rows from attributes */
  const specRows: [string, string][] = product.attributes
    ?.filter((a) => a.visible)
    .map((a) => [a.name, a.options.join(" / ")] as [string, string]) || [];

  return (
    <section aria-label="Szczegóły produktu">
      {/* Tab navigation */}
      <div
        className="flex border-b border-border"
        role="tablist"
        aria-label="Zakładki opisu produktu"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-5 py-3.5 text-sm font-medium transition-colors sm:px-8 ${
              activeTab === tab.id
                ? "text-text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-primary"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab panels */}
      <div className="py-8 lg:py-10">
        {/* Opis panel */}
        <div
          role="tabpanel"
          id="panel-opis"
          aria-labelledby="tab-opis"
          hidden={activeTab !== "opis"}
          className="max-w-3xl"
        >
          {product.description ? (
            <div
              className="prose prose-sm max-w-none space-y-4 text-[15px] leading-relaxed text-text-secondary [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-text-primary [&_h3]:font-heading [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-text-primary [&_p]:text-[15px] [&_p]:leading-relaxed [&_p]:text-text-secondary"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          ) : (
            <p className="text-[15px] leading-relaxed text-text-secondary">
              Brak opisu produktu.
            </p>
          )}
        </div>

        {/* Specyfikacja panel */}
        <div
          role="tabpanel"
          id="panel-specyfikacja"
          aria-labelledby="tab-specyfikacja"
          hidden={activeTab !== "specyfikacja"}
          className="max-w-2xl"
        >
          {specRows.length > 0 ? (
            <table className="w-full text-sm">
              <tbody>
                {specRows.map(([label, value], index) => (
                  <tr
                    key={label}
                    className={index % 2 === 0 ? "bg-bg-light" : "bg-white"}
                  >
                    <td className="px-4 py-3 font-medium text-text-primary">
                      {label}
                    </td>
                    <td className="px-4 py-3 text-text-secondary">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-sm text-text-secondary">
              Brak danych specyfikacji.
            </p>
          )}
        </div>

        {/* Opinie panel */}
        <div
          role="tabpanel"
          id="panel-opinie"
          aria-labelledby="tab-opinie"
          hidden={activeTab !== "opinie"}
          className="max-w-3xl"
        >
          {/* Placeholder reviews (static for now, can be replaced with WooCommerce reviews API) */}
          <div className="mb-8 flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="text-3xl font-bold text-text-primary">4.8</span>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= 4
                        ? "fill-accent text-accent"
                        : "fill-accent/40 text-accent/40"
                    }`}
                  />
                ))}
              </div>
            </div>
            <span className="text-sm text-text-secondary">
              na podstawie 12 opinii
            </span>
          </div>

          <div className="space-y-6">
            {[
              {
                author: "Anna K.",
                date: "15.01.2026",
                rating: 5,
                text: "Świetna jakość wykonania! Szuflady domykają się cicho i płynnie. Szafka wygląda pięknie w mojej kuchni. Polecam!",
              },
              {
                author: "Marek W.",
                date: "02.01.2026",
                rating: 5,
                text: "Bardzo dobrze wykonana szafka. Montaż był prosty, a instrukcja czytelna. Front dębowy wygląda elegancko i naturalnie.",
              },
              {
                author: "Katarzyna M.",
                date: "20.12.2025",
                rating: 4,
                text: "Meble dobrej jakości, jedynie czas dostawy był trochę długi. Ale efekt końcowy jest rewelacyjny -- szafka pasuje idealnie do reszty kuchni.",
              },
            ].map((review, index) => (
              <article
                key={index}
                className="border-b border-border-light pb-6 last:border-0"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-bg-light text-xs font-semibold text-primary">
                      {review.author.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-text-primary">
                      {review.author}
                    </span>
                  </div>
                  <time className="text-xs text-text-light">{review.date}</time>
                </div>
                <div className="mt-2 flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-3.5 w-3.5 ${
                        star <= review.rating
                          ? "fill-accent text-accent"
                          : "fill-border text-border"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {review.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
