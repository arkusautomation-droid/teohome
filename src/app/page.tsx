import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  getCategories,
  getNewProducts,
  getFeaturedProducts,
  formatPrice,
  getProductImage,
} from "@/lib/api";

/* -------------------------------------------------------------------------- */
/*  STATIC DATA                                                               */
/* -------------------------------------------------------------------------- */

const designers = [
  {
    name: "Anna Kowalska",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    description:
      "Specjalistka od aranżacji kuchni z ponad 10-letnim doświadczeniem. Pomoże Ci zaprojektować przestrzeń, która łączy funkcjonalność z pięknym designem.",
  },
  {
    name: "Marek Nowicki",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    description:
      "Projektant wnętrz z pasją do nowoczesnych rozwiązań. Tworzy projekty szaf i zabudów, które maksymalnie wykorzystują dostępną przestrzeń.",
  },
  {
    name: "Katarzyna Wiśniowska",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    description:
      "Ekspertka od mebli tapicerowanych i projektowania stref wypoczynku. Doradzi w doborze tkanin, kolorów i stylu Twojego wnętrza.",
  },
];

const testimonials = [
  {
    name: "Joanna Mazur",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
    text: "Kuchnia z TeoHome to strzał w dziesiątkę! Projekt idealnie wpasował się w nasze mieszkanie, a jakość wykonania przeszła nasze oczekiwania. Polecam każdemu!",
  },
  {
    name: "Tomasz Król",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    text: "Profesjonalna obsługa od początku do końca. Projektant pomógł dobrać idealne szafki do naszego małego mieszkania. Wszystko zmieszczono co do milimetra.",
  },
  {
    name: "Marta Zielińska",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=100&q=80",
    text: "Zamawiałam szafę DIY i jestem zachwycona. Prosta konfiguracja, świetne materiały i szybka dostawa. Na pewno wrócę po kolejne meble do TeoHome.",
  },
  {
    name: "Paweł Sikorski",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    text: "Sofa OSLO to najwygodniejszy mebel jaki kiedykolwiek kupiłem. Materiały są premium, a design pasuje do każdego wnętrza. Gorąco polecam TeoHome.",
  },
];

const blogPosts = [
  {
    title: "Jak zaplanować kuchnię na wymiar, żeby była funkcjonalna na lata?",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    excerpt: "Projektowanie kuchni to coś więcej niż wybór frontów i kolorów. Dobrze zaplanowana kuchnia na wymiar powinna odpowiadać na codzienne potrzeby, styl życia i realną przestrzeń, którą mamy do dyspozycji. W Teo Home wychodzimy z założenia, że funkcjonalność zaczyna się już na etapie projektu.",
    href: "/blog/planowanie-kuchni",
  },
  {
    title: "Jak zaplanować kuchnię na wymiar, żeby była funkcjonalna na lata?",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80",
    href: "/blog/planowanie-kuchni-2",
  },
  {
    title: "Jak zaplanować kuchnię na wymiar, żeby była funkcjonalna na lata?",
    image: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=400&q=80",
    href: "/blog/planowanie-kuchni-3",
  },
  {
    title: "Jak zaplanować kuchnię na wymiar, żeby była funkcjonalna na lata?",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80",
    href: "/blog/planowanie-kuchni-4",
  },
];

const inspirationImages = [
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=500&q=80",
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&q=80",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=500&q=80",
  "https://images.unsplash.com/photo-1616137466211-f939a420be84?w=500&q=80",
];


/* -------------------------------------------------------------------------- */
/*  PAGE                                                                      */
/* -------------------------------------------------------------------------- */

export default async function HomePage() {
  const [categories, newProducts, featuredProducts] = await Promise.all([
    getCategories(),
    getNewProducts(),
    getFeaturedProducts(),
  ]);

  const bestsellerProduct = featuredProducts[0] || newProducts[0];

  return (
    <>
      {/* ================================================================== */}
      {/* 1. HERO SECTION — Figma: main image left + 2x2 thumbnails right  */}
      {/* ================================================================== */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[500px] lg:h-[560px]">
          <img
            src="/images/hero/hero-bg.jpg"
            alt="Nowoczesna kuchnia na wymiar TeoHome"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

          <div className="relative mx-auto flex h-full max-w-[1440px] items-center px-6 lg:px-16">
            <div className="max-w-lg">
              <h1 className="font-heading text-3xl leading-tight font-bold text-white md:text-4xl lg:text-[48px] lg:leading-[1.08]">
                Kuchnie dopasowane do Twojego stylu
              </h1>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/80 md:text-base">
                Tworzymy funkcjonalne i estetyczne kuchnie na zamówienie, które łączą design oraz jakość.
              </p>
              <Link
                href="/kuchnie"
                className="mt-7 inline-flex items-center gap-0 rounded-full border border-white/40 py-1.5 pl-6 pr-1.5 transition-colors hover:border-white/70"
              >
                <span className="text-sm font-semibold text-white">Zobacz więcej</span>
                <span className="ml-4 flex h-[44px] w-[44px] items-center justify-center rounded-full bg-accent">
                  <ArrowRight size={18} strokeWidth={2} className="text-white" />
                </span>
              </Link>
            </div>
          </div>

          {/* Dot pagination */}
          <div className="absolute bottom-8 left-6 z-10 flex gap-2 lg:left-[calc((100%-1440px)/2+64px)]">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                type="button"
                className={`h-2.5 w-2.5 rounded-full border border-white/60 transition-colors ${
                  i === 0 ? "bg-white" : "bg-transparent hover:bg-white/40"
                }`}
                aria-label={`Slajd ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 2. CATEGORIES SECTION                                              */}
      {/* ================================================================== */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="font-heading text-2xl font-bold text-text-primary md:text-[32px]">
              Wybierz coś dla siebie
            </h2>
            <Link
              href="/kategoria"
              className="inline-flex items-center rounded-full border border-border px-5 py-2 text-sm font-medium text-text-primary transition-colors hover:border-primary hover:text-primary"
            >
              Zobacz wszystkie
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
            {categories.slice(0, 4).map((cat) => (
              <Link key={cat.id} href={`/kategoria/${cat.slug}`} className="group">
                <div className="aspect-[4/3] overflow-hidden rounded-[24px] bg-bg-light">
                  {cat.image?.src ? (
                    <Image
                      src={cat.image.src}
                      alt={cat.image.alt || cat.name}
                      width={600}
                      height={600}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-bg-light text-text-light">
                      <span className="text-sm">{cat.name}</span>
                    </div>
                  )}
                </div>
                <h3 className="mt-3 text-center text-sm font-medium text-text-primary md:text-base">
                  {cat.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 4. ABOUT SECTION                                                   */}
      {/* ================================================================== */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
          <div className="p-6 lg:p-0">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-14">
              <div className="lg:w-[55%]">
                <h2 className="font-heading text-2xl font-bold text-text-primary md:text-[32px]">
                  Witaj w TeoHome!
                </h2>
                <p className="mt-5 text-[15px] leading-relaxed text-text-secondary">
                  Teo Home to marka mebli na wymiar dostępnych online. Projektujemy i realizujemy rozwiązania dopasowane do konkretnych przestrzeni, typów szafek, funkcjonalności i indywidualnych potrzeb.
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">
                  Wiemy, że wybór mebli na wymiar to decyzja, która wymaga wsparcia. Dlatego zapewniamy pomoc doświadczonych projektantów na każdym etapie od pierwszej konsultacji, przez dobór szafek i materiałów, aż po finalny projekt.
                </p>
                <div className="mt-7">
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/o-nas"
                      className="inline-flex items-center gap-0 rounded-full bg-accent py-1.5 pl-5 pr-1.5 text-sm font-medium text-white transition-colors hover:bg-accent/90"
                    >
                      <span>Poznaj nas bliżej</span>
                      <span className="ml-3 flex h-[36px] w-[36px] items-center justify-center rounded-full bg-white/20">
                        <ArrowRight size={14} strokeWidth={2} />
                      </span>
                    </Link>
                    <Link
                      href="/strefa-projektowa"
                      className="inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm font-medium text-text-primary transition-colors hover:border-primary hover:text-primary"
                    >
                      Strefa projektowania
                    </Link>
                  </div>
                </div>
              </div>
              <div className="lg:w-[45%]">
                <div className="aspect-[3/2] overflow-hidden rounded-xl">
                  <img
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80"
                    alt="Nowoczesne wnętrze zaprojektowane przez TeoHome"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 5. DESIGNERS SECTION                                               */}
      {/* ================================================================== */}
      <section className="relative py-14 lg:py-20">
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=80"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative mx-auto max-w-[1440px] px-6 lg:px-16">
          {/* White overlay card */}
          <div className="mx-auto max-w-5xl rounded-3xl bg-white px-6 py-10 lg:px-16 lg:py-14">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-heading text-2xl font-bold text-text-primary md:text-[32px]">
                Zaprojektuj wnętrze z pomocą naszych projektantów!
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">
                Nasi doświadczeni projektanci pomogą Ci stworzyć wnętrze marzeń. Od pierwszego szkicu po finalny projekt &mdash; jesteś w dobrych rękach.
              </p>
              <p className="mt-4 text-sm font-medium text-text-secondary">
                Skontaktuj się ze specjalistą od aranżacji:
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {designers.map((designer) => (
                <div
                  key={designer.name}
                  className="flex flex-col items-center rounded-2xl border border-border-light bg-white px-6 py-8 text-center shadow-sm"
                >
                  <div className="h-[100px] w-[100px] overflow-hidden rounded-full border-2 border-primary-light">
                    <img src={designer.avatar} alt={designer.name} className="h-full w-full object-cover" />
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-text-primary">
                    {designer.name}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-text-secondary">
                    {designer.description}
                  </p>
                  <Link
                    href="/kontakt"
                    className="mt-auto pt-5 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent/90"
                  >
                    Zamów projekt
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 6. NEW PRODUCTS SECTION                                            */}
      {/* ================================================================== */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Left - dark CTA */}
            <div className="relative flex flex-col justify-center overflow-hidden rounded-2xl bg-[#312E29] px-7 py-10 lg:w-[260px] lg:shrink-0 lg:px-8 lg:py-14">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover opacity-20"
              />
              <div className="relative z-10">
                <span className="mb-4 inline-block rounded-full border border-white/50 px-4 py-1 text-[11px] font-semibold tracking-wide text-white uppercase">
                  Nowości
                </span>
                <h2 className="font-heading text-xl leading-snug font-semibold text-white md:text-2xl">
                  Nowe rozwiązania do Twojej przestrzeni
                </h2>
                <p className="mt-2 text-sm text-white/70">Najnowsze meble w ofercie TeoHome</p>
                <Link
                  href="/nowosci"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-white/90"
                >
                  Zobacz wszystkie produkty
                  <ArrowRight size={14} strokeWidth={2} />
                </Link>
              </div>
            </div>

            {/* Right - product cards */}
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {newProducts.slice(0, 4).map((product) => (
                  <Link
                    key={product.id}
                    href={`/produkt/${product.slug}`}
                    className="group"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-bg-light">
                      <Image
                        src={getProductImage(product)}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 1024px) 50vw, 200px"
                      />
                      <span className="absolute left-2.5 top-2.5 rounded-full bg-badge-new px-3 py-0.5 text-[11px] font-semibold tracking-wide text-white uppercase">
                        Nowość
                      </span>
                    </div>
                    <div className="mt-2.5">
                      <h3 className="text-base font-bold text-text-primary">{product.name}</h3>
                      <p className="mt-0.5 text-xs text-text-secondary line-clamp-1">
                        {product.short_description.replace(/<[^>]*>/g, "")}
                      </p>
                      <p className="mt-1.5 text-xl font-bold text-text-primary">
                        {formatPrice(product.price)}
                      </p>
                      <p className="mt-0.5 text-xs text-text-light">
                        Najniższa cena z 30 dni: {formatPrice(product.regular_price || product.price)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              {/* Pagination dots */}
              <div className="mt-5 flex justify-center gap-2">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className={`h-2.5 w-2.5 rounded-full ${i === 0 ? "bg-text-primary" : "bg-[#eaeaea]"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 7. FEATURED PRODUCT SECTION                                        */}
      {/* ================================================================== */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
          {bestsellerProduct ? (
            <div className="flex flex-col overflow-hidden rounded-2xl lg:flex-row">
              {/* Left — lifestyle image with overlaid title */}
              <div className="relative aspect-[4/3] lg:aspect-auto lg:w-[50%]">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80"
                  alt="Wnętrze TeoHome"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-0 flex flex-col justify-between p-8 lg:p-10">
                  <div>
                    <h2 className="font-heading text-2xl font-bold text-white md:text-[32px]">
                      Polecane produkty
                    </h2>
                    <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-white/80">
                      Meble, które najlepiej łączą najwyższą funkcjonalność, design i dopasowanie do przestrzeni. Sprawdź rozwiązania, które możesz łatwo dostosować do swoich potrzeb.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {featuredProducts.slice(0, 4).map((_, i) => (
                      <span key={i} className={`h-2.5 w-2.5 rounded-full ${i === 0 ? "bg-white" : "bg-white/40"}`} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right — product info on light bg */}
              <div className="flex flex-col justify-center bg-bg-light p-8 lg:w-[50%] lg:p-12">
                {/* Product image */}
                <div className="mb-4 flex justify-center">
                  <Image
                    src={getProductImage(bestsellerProduct)}
                    alt={bestsellerProduct.name}
                    width={280}
                    height={350}
                    className="max-h-[240px] w-auto object-contain"
                  />
                </div>
                <span className="inline-block w-fit rounded-full bg-badge-bestseller px-3 py-1 text-[11px] font-semibold tracking-wide text-white uppercase">
                  Bestseller
                </span>
                <h3 className="mt-4 font-heading text-xl font-semibold text-text-primary lg:text-2xl">
                  {bestsellerProduct.name}
                </h3>
                <p className="mt-2 text-sm text-text-secondary line-clamp-2">
                  {bestsellerProduct.short_description.replace(/<[^>]*>/g, "")}
                </p>
                <div className="mt-3 flex items-baseline gap-3">
                  <p className="text-[22px] font-bold text-text-primary">
                    {formatPrice(bestsellerProduct.price)}
                  </p>
                  {bestsellerProduct.on_sale && bestsellerProduct.regular_price && (
                    <p className="text-xs text-text-light">
                      Najniższa cena z 30 dni: {formatPrice(bestsellerProduct.regular_price)}
                    </p>
                  )}
                </div>
                <div className="mt-6 flex justify-end">
                  <Link
                    href={`/produkt/${bestsellerProduct.slug}`}
                    className="inline-flex items-center gap-0 rounded-full border border-border py-1.5 pl-5 pr-1.5 text-sm font-medium text-text-primary transition-colors hover:border-primary hover:text-primary"
                  >
                    <span>Zobacz produkt</span>
                    <span className="ml-3 flex h-[36px] w-[36px] items-center justify-center rounded-full bg-primary/10">
                      <ArrowRight size={14} strokeWidth={2} />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex aspect-[16/9] items-center justify-center rounded-2xl bg-bg-light text-text-light">
              <p>Brak polecanych produktów</p>
            </div>
          )}
        </div>
      </section>

      {/* ================================================================== */}
      {/* 8. BLOG SECTION                                                    */}
      {/* ================================================================== */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
          <h2 className="mb-8 font-heading text-2xl font-bold text-text-primary md:text-[24px]">
            Porady od TeoHome
          </h2>

          {/* Featured post — image + content side-by-side (Figma: 842+678, rounded-xl, bg #f4f4f4) */}
          <Link href={blogPosts[0].href} className="group mb-8 flex flex-col overflow-hidden rounded-xl lg:flex-row">
            <div className="aspect-[3/2] overflow-hidden lg:aspect-auto lg:w-[50%] lg:shrink-0">
              <img
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-between bg-[#f4f4f4] p-8 lg:p-[80px]">
              <div>
                <h3 className="font-heading text-lg font-bold leading-snug text-text-primary md:text-[24px] md:leading-[1.2]">
                  {blogPosts[0].title}
                </h3>
                <p className="mt-5 text-base leading-relaxed text-text-primary font-medium">
                  {blogPosts[0].excerpt}
                </p>
              </div>
              <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-bold text-text-primary transition-colors group-hover:text-primary">
                Przejdź do artykułu
                <ArrowRight size={15} strokeWidth={2} />
              </span>
            </div>
          </Link>

          {/* Smaller posts — 3-column grid (Figma: 490x360, image 200px + content 160px, bg #f4f4f4) */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.slice(1).map((post, i) => (
              <Link
                key={i}
                href={post.href}
                className="group flex flex-col overflow-hidden rounded-xl"
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between bg-[#f4f4f4] px-8 py-6">
                  <h3 className="text-base font-bold leading-snug text-text-primary line-clamp-2">{post.title}</h3>
                  <span className="mt-4 inline-flex items-center gap-1.5 self-end text-sm font-bold text-text-primary transition-colors group-hover:text-primary">
                    Czytaj
                    <ArrowRight size={15} strokeWidth={2} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
        <hr className="border-border" />
      </div>

      {/* ================================================================== */}
      {/* 9. TESTIMONIALS SECTION                                            */}
      {/* ================================================================== */}
      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-heading text-2xl font-bold text-text-primary md:text-[32px]">
              Zobacz, co mówią nasi klienci
            </h2>
            <div className="hidden items-center gap-2 sm:flex">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className={`h-3 w-3 rounded-full ${i === 0 ? "bg-text-primary" : "bg-[#eaeaea]"}`} />
              ))}
            </div>
          </div>

          <div className="grid gap-[30px] sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl bg-[#f4f4f4] p-8">
                <div className="flex flex-col items-center text-center">
                  <div className="h-[77px] w-[77px] shrink-0 overflow-hidden rounded-full bg-accent">
                    <img src={t.avatar} alt={t.name} className="h-full w-full object-cover" />
                  </div>
                  <span className="mt-3 text-base font-bold text-text-primary">{t.name}</span>
                  <div className="mt-1.5 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-accent-gold text-accent-gold" />
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed font-medium text-text-primary">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 10. INSPIRATION GALLERY                                            */}
      {/* ================================================================== */}
      <section className="relative">
        {/* Full-width background image */}
        <div className="relative h-[500px] lg:h-[600px]">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=80"
            alt="Realizacje TeoHome"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />

          {/* Content overlay */}
          <div className="relative mx-auto flex h-full max-w-[1440px] items-end px-6 pb-12 lg:px-16 lg:pb-16">
            <div className="max-w-md rounded-2xl bg-white/95 p-8 shadow-lg backdrop-blur-sm lg:p-10">
              <h2 className="font-heading text-2xl leading-snug font-bold text-text-primary md:text-[28px]">
                Zainspiruj się realizacjami TeoHome
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">
                Zobacz, jak nasze meble na wymiar sprawdzają się w projektach. Poznaj gotowe aranżacje, detale i rozwiązania, które pomogą Ci znaleźć kierunek i dobrać meble dopasowane do Twojej przestrzeni.
              </p>
              <div className="mt-6">
                <Link
                  href="/realizacje"
                  className="inline-flex items-center gap-0 rounded-full bg-accent py-1.5 pl-5 pr-1.5 text-sm font-medium text-white transition-colors hover:bg-accent/90"
                >
                  <span>Zobacz galerię realizacji</span>
                  <span className="ml-3 flex h-[36px] w-[36px] items-center justify-center rounded-full bg-white/20">
                    <ArrowRight size={14} strokeWidth={2} />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
