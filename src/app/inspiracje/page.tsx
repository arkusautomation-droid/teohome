"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Eye, ChevronRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const filterTabs = [
  { id: "all", label: "Wszystkie" },
  { id: "kuchnie", label: "Kuchnie" },
  { id: "salony", label: "Salony" },
  { id: "sypialnie", label: "Sypialnie" },
  { id: "lazienki", label: "Lazienki" },
  { id: "biura", label: "Biura" },
] as const;

type FilterId = (typeof filterTabs)[number]["id"];

interface GalleryItem {
  id: number;
  src: string;
  category: FilterId;
  categoryLabel: string;
  title: string;
  href: string;
  /** Masonry height variant: "tall" items span ~420px, "normal" ~280px */
  variant: "tall" | "normal";
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    category: "kuchnie",
    categoryLabel: "Kuchnia",
    title: "Nowoczesna kuchnia w bieli",
    href: "/inspiracje/1",
    variant: "tall",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    category: "salony",
    categoryLabel: "Salon",
    title: "Przestronny salon z drewnianymi akcentami",
    href: "/inspiracje/2",
    variant: "normal",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
    category: "salony",
    categoryLabel: "Salon",
    title: "Minimalistyczny salon w stylu skandynawskim",
    href: "/inspiracje/3",
    variant: "normal",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80",
    category: "sypialnie",
    categoryLabel: "Sypialnia",
    title: "Przytulna sypialnia w cieplych tonach",
    href: "/inspiracje/4",
    variant: "tall",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80",
    category: "kuchnie",
    categoryLabel: "Kuchnia",
    title: "Kuchnia z wyspa i marmurowymi blatami",
    href: "/inspiracje/5",
    variant: "normal",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
    category: "lazienki",
    categoryLabel: "Lazienka",
    title: "Elegancka lazienka z wolnostojaca wanna",
    href: "/inspiracje/6",
    variant: "tall",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80",
    category: "biura",
    categoryLabel: "Biuro",
    title: "Domowe biuro z widokiem na ogrod",
    href: "/inspiracje/7",
    variant: "normal",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80",
    category: "kuchnie",
    categoryLabel: "Kuchnia",
    title: "Industrialna kuchnia z czarnymi akcentami",
    href: "/inspiracje/8",
    variant: "normal",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&q=80",
    category: "sypialnie",
    categoryLabel: "Sypialnia",
    title: "Sypialnia w stylu boho z naturalnymi materialami",
    href: "/inspiracje/9",
    variant: "tall",
  },
];

/* ------------------------------------------------------------------ */
/*  Gallery Card                                                       */
/* ------------------------------------------------------------------ */

function GalleryCard({ item }: { item: GalleryItem }) {
  return (
    <article className="group mb-5 break-inside-avoid overflow-hidden rounded-lg">
      <Link href={item.href} className="relative block">
        <div
          className={`relative w-full overflow-hidden ${
            item.variant === "tall" ? "h-[420px]" : "h-[280px]"
          }`}
        >
          <Image
            src={item.src}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 flex flex-col items-start justify-end bg-gradient-to-t from-black/70 via-black/20 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {/* Category tag */}
            <span className="mb-2 inline-block rounded-sm bg-white/20 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
              {item.categoryLabel}
            </span>

            {/* Title */}
            <h3 className="mb-3 font-heading text-lg font-semibold leading-snug text-white">
              {item.title}
            </h3>

            {/* CTA link */}
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white/90 transition-colors group-hover:text-white">
              Zobacz realizacje
              <ArrowRight size={16} strokeWidth={2} />
            </span>
          </div>

          {/* Eye icon - top right, visible on hover */}
          <div className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
            <Eye size={18} strokeWidth={2} />
          </div>
        </div>
      </Link>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */

export default function InspiracjePage() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");

  const filteredItems =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <>
      {/* ============================================================ */}
      {/*  HERO BANNER                                                  */}
      {/* ============================================================ */}
      <section className="relative h-[280px] w-full overflow-hidden sm:h-[340px] lg:h-[400px]">
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=80"
          alt="Nowoczesne wnetrze kuchni"
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
                  Strona glowna
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={14} strokeWidth={2} />
              </li>
              <li className="font-medium text-white" aria-current="page">
                Inspiracje
              </li>
            </ol>
          </nav>

          <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Inspiracje
          </h1>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FILTER TABS                                                  */}
      {/* ============================================================ */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-[1440px] px-6 py-8 lg:px-16">
          <div
            className="flex flex-wrap items-center justify-center gap-3"
            role="tablist"
            aria-label="Filtruj galerie wg kategorii"
          >
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeFilter === tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                  activeFilter === tab.id
                    ? "bg-text-primary text-white shadow-sm"
                    : "border border-border text-text-secondary hover:border-text-primary hover:text-text-primary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  MASONRY GALLERY                                              */}
      {/* ============================================================ */}
      <section className="bg-bg-light">
        <div className="mx-auto max-w-[1440px] px-6 py-12 lg:px-16 lg:py-16">
          {/* Masonry grid using CSS columns */}
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {filteredItems.map((item) => (
              <GalleryCard key={item.id} item={item} />
            ))}
          </div>

          {/* Empty state */}
          {filteredItems.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg text-text-secondary">
                Brak inspiracji w tej kategorii. Sprawdz inne kategorie lub
                wrocisz pozniej.
              </p>
            </div>
          )}

          {/* Load More button */}
          {filteredItems.length > 0 && (
            <div className="mt-12 flex justify-center">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-text-primary px-8 py-3 text-sm font-medium text-text-primary transition-all duration-200 hover:bg-text-primary hover:text-white"
              >
                Zaladuj wiecej
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CTA SECTION                                                  */}
      {/* ============================================================ */}
      <section className="bg-bg-warm">
        <div className="mx-auto max-w-[1440px] px-6 py-16 text-center lg:px-16 lg:py-24">
          <h2 className="font-heading text-3xl font-bold text-text-primary sm:text-4xl">
            Chcesz takie wnetrze?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
            Skontaktuj sie z naszym projektantem i stworz swoja wymarzona
            przestrzen.
          </p>
          <Link
            href="/kontakt"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-text-primary px-8 py-3.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-primary-dark"
          >
            Umow konsultacje
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
        </div>
      </section>
    </>
  );
}
