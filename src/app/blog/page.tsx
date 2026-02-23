import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, ChevronRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */
export const metadata: Metadata = {
  title: "Blog - TeoHome",
  description:
    "Porady, inspiracje i trendy w aranżacji kuchni i wnętrz. Dowiedz się, jak zaplanować kuchnię na wymiar, dobrać materiały i stworzyć wymarzony dom.",
};

/* ------------------------------------------------------------------ */
/*  Data types                                                         */
/* ------------------------------------------------------------------ */
type Category = "PORADY" | "INSPIRACJE" | "TRENDY";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: Category;
  image: string;
}

/* ------------------------------------------------------------------ */
/*  Category styling map                                               */
/* ------------------------------------------------------------------ */
const categoryStyles: Record<Category, string> = {
  PORADY: "bg-primary/10 text-primary",
  INSPIRACJE: "bg-accent/15 text-accent",
  TRENDY: "bg-emerald-50 text-emerald-700",
};

/* ------------------------------------------------------------------ */
/*  Mock data                                                          */
/* ------------------------------------------------------------------ */
const featuredPost: BlogPost = {
  slug: "jak-zaplanowac-kuchnie-na-wymiar",
  title: "Jak zaplanować kuchnię na wymiar, żeby była funkcjonalna na lata?",
  excerpt:
    "Planowanie kuchni na wymiar to proces, który wymaga przemyślenia wielu aspektów — od układu roboczego, przez dobór materiałów, aż po detale, które sprawiają, że codzienna praca w kuchni staje się przyjemnością. W tym artykule podpowiemy, na co zwrócić szczególną uwagę.",
  date: "15 stycznia 2025",
  category: "PORADY",
  image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
};

const blogPosts: BlogPost[] = [
  {
    slug: "jak-zaplanowac-kuchnie-na-wymiar",
    title: "Jak zaplanować kuchnię na wymiar, żeby była funkcjonalna?",
    excerpt:
      "Praktyczny przewodnik po planowaniu kuchni — od trójkąta roboczego po wybór frontów i blatów.",
    date: "15 stycznia 2025",
    category: "PORADY",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
  },
  {
    slug: "5-trendow-aranzacji-kuchni-2025",
    title: "5 trendów w aranżacji kuchni na 2025",
    excerpt:
      "Naturalne materiały, ciemne fronty i inteligentne rozwiązania — poznaj najgorętsze trendy nadchodzącego roku.",
    date: "10 stycznia 2025",
    category: "TRENDY",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  },
  {
    slug: "materialy-na-blat-kuchenny",
    title: "Materiały na blat kuchenny - co wybrać?",
    excerpt:
      "Porównanie najpopularniejszych materiałów na blaty: kwarc, granit, drewno, laminat i konglomerat.",
    date: "5 stycznia 2025",
    category: "PORADY",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
  },
  {
    slug: "szafy-na-wymiar-jak-zmierzyc-przestrzen",
    title: "Szafy na wymiar - jak zmierzyć przestrzeń",
    excerpt:
      "Dokładny pomiar to klucz do idealnie dopasowanej szafy. Sprawdź, jak uniknąć najczęstszych błędów.",
    date: "28 grudnia 2024",
    category: "PORADY",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  },
  {
    slug: "kolory-w-kuchni-jak-dobrac-palete",
    title: "Kolory w kuchni - jak dobrać paletę",
    excerpt:
      "Harmonia kolorów wpływa na nastrój wnętrza. Podpowiadamy, jak łączyć barwy, by kuchnia zachwycała.",
    date: "20 grudnia 2024",
    category: "INSPIRACJE",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
  },
  {
    slug: "organizacja-przestrzeni-w-malej-kuchni",
    title: "Organizacja przestrzeni w małej kuchni",
    excerpt:
      "Mała kuchnia nie musi oznaczać kompromisów. Sprytne rozwiązania, które pomogą Ci zyskać miejsce.",
    date: "15 grudnia 2024",
    category: "INSPIRACJE",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
  },
];

/* ------------------------------------------------------------------ */
/*  Category Badge component                                           */
/* ------------------------------------------------------------------ */
function CategoryBadge({ category }: { category: Category }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${categoryStyles[category]}`}
    >
      {category}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Blog Card component                                                */
/* ------------------------------------------------------------------ */
function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white transition-shadow duration-300 hover:shadow-lg">
      {/* Image */}
      <Link
        href={`/blog/${post.slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-bg-warm"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={post.image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <CategoryBadge category={post.category} />

        <h3 className="mt-3 font-heading text-lg font-semibold leading-snug text-text-primary transition-colors group-hover:text-primary">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
          {post.excerpt}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-border-light pt-4">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary-dark"
          >
            Czytaj
            <ArrowRight size={14} strokeWidth={2} />
          </Link>

          <time
            dateTime="2025-01-15"
            className="flex items-center gap-1.5 text-xs text-text-light"
          >
            <Calendar size={13} strokeWidth={1.6} />
            {post.date}
          </time>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Pagination component                                               */
/* ------------------------------------------------------------------ */
function Pagination() {
  const currentPage = 1;
  const pages = [1, 2, 3, null, 5] as const;

  return (
    <nav aria-label="Paginacja bloga" className="flex items-center justify-center gap-1">
      {pages.map((page, index) => {
        if (page === null) {
          return (
            <span
              key={`ellipsis-${index}`}
              className="flex h-10 w-10 items-center justify-center text-sm text-text-light"
              aria-hidden="true"
            >
              ...
            </span>
          );
        }

        const isActive = page === currentPage;

        return (
          <Link
            key={page}
            href={page === 1 ? "/blog" : `/blog?strona=${page}`}
            aria-current={isActive ? "page" : undefined}
            className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? "bg-primary text-white"
                : "text-text-secondary hover:bg-bg-light hover:text-text-primary"
            }`}
          >
            {page}
          </Link>
        );
      })}
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */
export default function BlogPage() {
  return (
    <>
      {/* ============================================================ */}
      {/*  HERO BANNER                                                  */}
      {/* ============================================================ */}
      <section className="relative flex min-h-[280px] items-center justify-center overflow-hidden bg-bg-dark sm:min-h-[340px]">
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55" aria-hidden="true" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center px-6 py-16 text-center sm:py-20">
          <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Blog
          </h1>

          {/* Breadcrumb */}
          <nav aria-label="Nawigacja okruszkowa" className="mt-4">
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
              <li>
                <span className="text-white font-medium">Blog</span>
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FEATURED POST                                                */}
      {/* ============================================================ */}
      <section className="bg-white" aria-label="Wyróżniony artykuł">
        <div className="mx-auto max-w-[1440px] px-6 py-14 lg:px-16 lg:py-20">
          <article className="group overflow-hidden rounded-2xl border border-border bg-white transition-shadow duration-300 hover:shadow-xl">
            <div className="flex flex-col lg:flex-row">
              {/* Image - 60% on desktop */}
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="relative block aspect-[16/10] overflow-hidden bg-bg-warm lg:aspect-auto lg:w-[60%]"
                tabIndex={-1}
                aria-hidden="true"
              >
                <Image
                  src={featuredPost.image}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </Link>

              {/* Text content - 40% on desktop */}
              <div className="flex flex-1 flex-col justify-center p-6 sm:p-8 lg:p-10 xl:p-14">
                <CategoryBadge category={featuredPost.category} />

                <h2 className="mt-4 font-heading text-2xl font-bold leading-snug text-text-primary sm:text-3xl lg:text-[2rem] xl:text-[2.25rem] xl:leading-tight">
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="transition-colors hover:text-primary"
                  >
                    {featuredPost.title}
                  </Link>
                </h2>

                <p className="mt-4 text-base leading-relaxed text-text-secondary lg:mt-5">
                  {featuredPost.excerpt}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4 lg:mt-8">
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent/90"
                  >
                    Czytaj więcej
                    <ArrowRight size={16} strokeWidth={2} />
                  </Link>

                  <time
                    dateTime="2025-01-15"
                    className="flex items-center gap-1.5 text-sm text-text-light"
                  >
                    <Calendar size={15} strokeWidth={1.6} />
                    {featuredPost.date}
                  </time>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  BLOG GRID                                                    */}
      {/* ============================================================ */}
      <section className="bg-bg-light" aria-label="Najnowsze artykuły">
        <div className="mx-auto max-w-[1440px] px-6 py-14 lg:px-16 lg:py-20">
          {/* Section heading */}
          <div className="mb-10 text-center lg:mb-14">
            <h2 className="font-heading text-3xl font-bold text-text-primary sm:text-4xl">
              Najnowsze artykuły
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-text-secondary">
              Porady, inspiracje i trendy — wszystko, czego potrzebujesz, by
              stworzyć wymarzone wnętrze.
            </p>
          </div>

          {/* Grid - 3 columns on desktop, 2 on tablet, 1 on mobile */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 lg:mt-16">
            <Pagination />
          </div>
        </div>
      </section>
    </>
  );
}
