import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Star,
  Shield,
  CheckCircle,
  Heart,
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
    excerpt: "Dowiedz się, jak zaplanować wymarzoną kuchnię krok po kroku, by służyła Ci przez lata.",
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

const heroThumbs = [
  { src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&q=80", alt: "Kuchnia nowoczesna" },
  { src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&q=80", alt: "Salon z kuchnią" },
  { src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&q=80", alt: "Wnętrze domu" },
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
      {/* 1. HERO SECTION — 60/40 split with thumbnails                     */}
      {/* ================================================================== */}
      <section className="relative w-full overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Main hero — left ~60% */}
          <div className="relative h-[500px] w-full lg:h-[620px] lg:w-[60%]">
            <img
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=80"
              alt="Nowoczesna kuchnia na wymiar TeoHome"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

            <div className="relative flex h-full items-center px-6 lg:px-16">
              <div className="max-w-lg">
                <h1 className="font-heading text-3xl leading-tight font-semibold text-white md:text-4xl lg:text-[46px] lg:leading-[1.08]">
                  Kuchnie dopasowane do Twojego stylu
                </h1>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/80 md:text-base">
                  Tworzymy funkcjonalne i estetyczne kuchnie na zamówienie, które łączą design oraz jakość.
                </p>
                <Link
                  href="/kuchnie"
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-text-primary transition-colors hover:bg-white/90"
                >
                  Zobacz więcej
                  <ArrowRight size={15} strokeWidth={2} />
                </Link>
              </div>
            </div>

            {/* Dot pagination — bottom center */}
            <div className="absolute bottom-5 left-6 z-10 flex gap-2 lg:left-16">
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

          {/* Thumbnails — right ~40% */}
          <div className="hidden flex-col gap-[2px] lg:flex lg:w-[40%]">
            {heroThumbs.map((thumb, i) => (
              <div key={i} className="relative flex-1 overflow-hidden">
                <img
                  src={thumb.src}
                  alt={thumb.alt}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 2. BENEFITS BAR                                                    */}
      {/* ================================================================== */}
      <section className="bg-bg-light py-5 lg:py-6">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                <Shield size={22} strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-text-primary">Bezpieczne zakupy</h3>
                <p className="mt-0.5 text-xs text-text-secondary">Gwarancja zwrotu i ochrona płatności</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                <CheckCircle size={22} strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-text-primary">Gwarancja najwyższej jakości</h3>
                <p className="mt-0.5 text-xs text-text-secondary">Starannie wybrane materiały i wykonanie</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                <Heart size={22} strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-text-primary">Z miłością tworzone w TeoHome</h3>
                <p className="mt-0.5 text-xs text-text-secondary">Polska marka z pasją do meblarstwa</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 3. CATEGORIES SECTION                                              */}
      {/* ================================================================== */}
      <section className="py-10 lg:py-14">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="font-heading text-2xl font-semibold text-text-primary md:text-[26px]">
              Wybierz coś dla siebie
            </h2>
            <Link
              href="/kategoria"
              className="group flex items-center gap-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-primary"
            >
              Zobacz wszystkie
              <ArrowRight size={15} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
            {categories.slice(0, 4).map((cat) => (
              <Link key={cat.id} href={`/kategoria/${cat.slug}`} className="group">
                <div className="aspect-square overflow-hidden rounded-2xl bg-bg-light">
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
      <section className="py-10 lg:py-14">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-14">
            <div className="lg:w-[55%]">
              <h2 className="font-heading text-2xl font-semibold text-text-primary md:text-[26px]">
                Witaj w TeoHome!
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-text-secondary">
                Teo Home to marka mebli na wymiar dostępnych online. Projektujemy i realizujemy rozwiązania dopasowane do konkretnych przestrzeni, typów szafek, funkcjonalności i indywidualnych potrzeb.
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">
                Wiemy, że wybór mebli na wymiar to decyzja, która wymaga wsparcia. Dlatego zapewniamy pomoc doświadczonych projektantów na każdym etapie od pierwszej konsultacji, przez dobór szafek i materiałów, aż po finalny projekt.
              </p>
              <div className="mt-7">
                <p className="mb-3 text-sm text-text-secondary">
                  Dowiedz się więcej &mdash; kontaktuj i zamów na stronie, przez:
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/kategoria"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-text-primary transition-colors hover:border-primary hover:text-primary"
                  >
                    Sklep
                    <ArrowRight size={14} strokeWidth={2} />
                  </Link>
                  <Link
                    href="/strefa-projektowa"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-text-primary transition-colors hover:border-primary hover:text-primary"
                  >
                    Strefa projektowania
                    <ArrowRight size={14} strokeWidth={2} />
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:w-[45%]">
              <div className="aspect-[4/3] overflow-hidden rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80"
                  alt="Nowoczesne wnętrze zaprojektowane przez TeoHome"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 5. DESIGNERS SECTION                                               */}
      {/* ================================================================== */}
      <section className="bg-bg-warm py-10 lg:py-14">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-2xl font-semibold text-text-primary md:text-[26px]">
              Zaprojektuj wnętrze z pomocą naszych projektantów!
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-text-secondary">
              Nasi doświadczeni projektanci pomogą Ci stworzyć wnętrze marzeń. Od pierwszego szkicu po finalny projekt &mdash; jesteś w dobrych rękach.
            </p>
            <Link
              href="/kontakt"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary-dark"
            >
              Skontaktuj się ze specjalistą od aranżacji
              <ArrowRight size={14} strokeWidth={2} />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {designers.map((designer) => (
              <div
                key={designer.name}
                className="flex flex-col items-center rounded-2xl border border-border bg-white px-6 py-8 text-center shadow-sm"
              >
                <div className="h-[72px] w-[72px] overflow-hidden rounded-full bg-bg-light">
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
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-text-primary px-5 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-text-primary hover:text-white"
                >
                  Zamów projekt
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 6. NEW PRODUCTS SECTION                                            */}
      {/* ================================================================== */}
      <section className="py-10 lg:py-14">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Left - dark CTA */}
            <div className="relative flex flex-col justify-center overflow-hidden rounded-2xl bg-bg-dark px-7 py-10 lg:w-[220px] lg:shrink-0 lg:px-8 lg:py-14">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover opacity-20"
              />
              <div className="relative z-10">
                <h2 className="font-heading text-xl leading-snug font-semibold text-white md:text-2xl">
                  Nowe rozwiązania do Twojej przestrzeni
                </h2>
                <p className="mt-2 text-sm text-white/70">Rozpocznij podróż</p>
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
                      <span className="absolute left-2.5 top-2.5 rounded-md bg-badge-new px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-white uppercase">
                        Nowość
                      </span>
                    </div>
                    <div className="mt-2.5">
                      <h3 className="text-sm font-semibold text-text-primary">{product.name}</h3>
                      <p className="mt-0.5 text-xs text-text-secondary line-clamp-1">
                        {product.short_description.replace(/<[^>]*>/g, "")}
                      </p>
                      <p className="mt-1.5 text-base font-semibold text-text-primary">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 7. FEATURED PRODUCT SECTION                                        */}
      {/* ================================================================== */}
      <section className="bg-bg-dark py-10 lg:py-14">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
            <div className="lg:w-[35%]">
              <h2 className="font-heading text-2xl font-semibold text-white md:text-[26px]">
                Polecane produkty
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-white/60">
                Poznaj nasze najczęściej wybierane meble. Każdy produkt łączy w sobie staranność wykonania, nowoczesny design i trwałość na lata. Przekonaj się, dlaczego nasi klienci do nas wracają.
              </p>
            </div>

            <div className="lg:w-[65%]">
              {bestsellerProduct ? (
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src={getProductImage(bestsellerProduct)}
                    alt={`Polecany produkt - ${bestsellerProduct.name}`}
                    width={900}
                    height={500}
                    className="aspect-[16/9] w-full object-cover"
                    sizes="(max-width: 1024px) 100vw, 65vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-5 lg:p-7">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <span className="inline-block rounded-md bg-badge-bestseller px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-white uppercase">
                          Bestseller
                        </span>
                        <h3 className="mt-2.5 text-lg font-semibold text-white">{bestsellerProduct.name}</h3>
                        <p className="mt-1 text-sm text-white/70 line-clamp-1">
                          {bestsellerProduct.short_description.replace(/<[^>]*>/g, "")}
                        </p>
                        <p className="mt-1.5 text-xl font-bold text-white">{formatPrice(bestsellerProduct.price)}</p>
                        {bestsellerProduct.on_sale && bestsellerProduct.regular_price && (
                          <p className="mt-0.5 text-xs text-white/50">
                            Najniższa cena z 30 dni: {formatPrice(bestsellerProduct.regular_price)}
                          </p>
                        )}
                      </div>
                      <Link
                        href={`/produkt/${bestsellerProduct.slug}`}
                        className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-white/90"
                      >
                        Zobacz produkt
                        <ArrowRight size={14} strokeWidth={2} />
                      </Link>
                    </div>
                    <div className="mt-4 flex justify-center gap-2">
                      {featuredProducts.slice(0, 4).map((_, i) => (
                        <span key={i} className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-white" : "bg-white/40"}`} />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex aspect-[16/9] items-center justify-center rounded-2xl bg-bg-light text-text-light">
                  <p>Brak polecanych produktów</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 8. BLOG SECTION                                                    */}
      {/* ================================================================== */}
      <section className="py-10 lg:py-14">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
          <h2 className="mb-8 font-heading text-2xl font-semibold text-text-primary md:text-[26px]">
            Porady od TeoHome
          </h2>

          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Featured post */}
            <Link href={blogPosts[0].href} className="group lg:w-1/2">
              <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-bg-light">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 lg:p-7">
                  <h3 className="font-heading text-lg font-semibold leading-snug text-white md:text-xl">
                    {blogPosts[0].title}
                  </h3>
                  <p className="mt-2 text-sm text-white/70">{blogPosts[0].excerpt}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-white transition-colors group-hover:text-primary-light">
                    Przejdź do artykułu
                    <ArrowRight size={14} strokeWidth={2} />
                  </span>
                </div>
              </div>
            </Link>

            {/* Smaller posts */}
            <div className="grid flex-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {blogPosts.slice(1).map((post, i) => (
                <Link
                  key={i}
                  href={post.href}
                  className="group flex flex-col gap-3 sm:flex-col lg:flex-row lg:gap-4"
                >
                  <div className="aspect-[16/10] overflow-hidden rounded-xl bg-bg-light sm:aspect-[4/3] lg:aspect-[4/3] lg:w-[170px] lg:shrink-0">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-sm font-medium leading-snug text-text-primary line-clamp-2">{post.title}</h3>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary transition-colors group-hover:text-primary-dark">
                      Czytaj
                      <ArrowRight size={12} strokeWidth={2} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 9. TESTIMONIALS SECTION                                            */}
      {/* ================================================================== */}
      <section className="bg-white py-10 lg:py-14">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-heading text-2xl font-semibold text-text-primary md:text-[26px]">
              Zobacz, co mówią nasi klienci
            </h2>
            <div className="hidden items-center gap-2 sm:flex">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className={`h-2 w-2 rounded-full ${i === 0 ? "bg-primary" : "bg-border"}`} />
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-xl border border-border-light bg-white p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 overflow-hidden rounded-full bg-bg-light">
                    <img src={t.avatar} alt={t.name} className="h-full w-full object-cover" />
                  </div>
                  <span className="text-sm font-semibold text-text-primary">{t.name}</span>
                </div>
                <div className="mt-2.5 flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} className="fill-accent text-accent" />
                  ))}
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-text-secondary">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 10. INSPIRATION GALLERY                                            */}
      {/* ================================================================== */}
      <section className="py-10 lg:py-14">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="relative flex flex-col justify-center overflow-hidden rounded-2xl bg-bg-dark px-7 py-10 lg:w-[45%] lg:px-10 lg:py-14">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover opacity-25"
              />
              <div className="relative z-10">
                <h2 className="font-heading text-2xl leading-snug font-semibold text-white md:text-[28px]">
                  Zainspiruj się realizacjami TeoHome
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                  Przeglądaj galerię naszych projektów i znajdź inspirację do aranżacji własnego wnętrza. Każda realizacja to unikalna historia naszych klientów.
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <Link
                    href="/realizacje"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-white/90"
                  >
                    Zobacz galerię
                    <ArrowRight size={14} strokeWidth={2} />
                  </Link>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
                      aria-label="Poprzednia realizacja"
                    >
                      <ChevronLeft size={16} strokeWidth={2} />
                    </button>
                    <button
                      type="button"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
                      aria-label="Następna realizacja"
                    >
                      <ChevronRight size={16} strokeWidth={2} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid flex-1 grid-cols-2 gap-3">
              {inspirationImages.map((img, i) => (
                <div key={i} className="aspect-[3/4] overflow-hidden rounded-xl bg-bg-light">
                  <img
                    src={img}
                    alt={`Realizacja TeoHome ${i + 1}`}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
