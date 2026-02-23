import Link from "next/link";
import {
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  ShoppingCart,
  Diamond,
  Factory,
} from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

/* ------------------------------------------------------------------ */
/*  Benefits Bar (Figma: bg #9e8984, 3 icons with white text)          */
/* ------------------------------------------------------------------ */
function BenefitsBar() {
  return (
    <div className="bg-accent">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-center gap-8 px-6 py-5 lg:justify-between lg:px-16">
        <div className="flex items-center gap-5">
          <ShoppingCart size={32} strokeWidth={1.5} className="shrink-0 text-white" />
          <span className="text-base text-white">Bezpieczne zakupy</span>
        </div>
        <div className="flex items-center gap-5">
          <Diamond size={32} strokeWidth={1.5} className="shrink-0 text-white" />
          <span className="text-base text-white">Gwarancja najwyższej jakości</span>
        </div>
        <div className="flex items-center gap-5">
          <Factory size={32} strokeWidth={1.5} className="shrink-0 text-white" />
          <span className="text-base text-white">Meble produkowane w Polsce</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Newsletter Section                                                 */
/* ------------------------------------------------------------------ */
function NewsletterSection() {
  return (
    <section
      aria-label="Newsletter"
      className="overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row">
        {/* Left — decorative image (Figma: 860x630, full half) */}
        <div
          aria-hidden="true"
          className="relative hidden h-auto min-h-[400px] overflow-hidden lg:block lg:w-1/2"
        >
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        {/* Right — content (Figma: 860px, vertical layout, gap 60) */}
        <div className="flex flex-col justify-center bg-bg-light px-6 py-12 lg:w-1/2 lg:px-16 lg:py-16">
          <h2 className="font-heading text-lg font-bold text-text-primary md:text-[24px]">
            Zapisz si&#281; do newslettera i zyskaj
          </h2>

          <p className="mt-1 font-heading text-[40px] font-bold leading-tight text-accent">
            10% rabatu
          </p>

          <div className="mt-10">
            <NewsletterForm />
          </div>

          <p className="mt-5 max-w-lg text-xs leading-relaxed text-text-light">
            Zapisuj&#261;c si&#281; potwierdzam zapoznanie si&#281; z regulaminem
            rabat&oacute;w ByBrands zakupionych przez firm&#281; TeoHome.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer column heading                                              */
/* ------------------------------------------------------------------ */
function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-4 font-heading text-xs font-semibold uppercase tracking-wider text-white">
      {children}
    </h3>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer link                                                        */
/* ------------------------------------------------------------------ */
function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-[13px] text-neutral-400 transition-colors hover:text-white"
      >
        {children}
      </Link>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/*  Social icon button                                                 */
/* ------------------------------------------------------------------ */
function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-600
        text-neutral-400 transition-colors hover:border-accent hover:text-accent"
    >
      {children}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Logo                                                               */
/* ------------------------------------------------------------------ */
function TeoHomeLogo() {
  return (
    <Link href="/" aria-label="TeoHome - strona główna">
      <img
        src="/images/logo-teohome.svg"
        alt="TeoHome"
        width={196}
        height={50}
        className="h-[36px] w-auto brightness-0 invert"
      />
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Footer export                                                 */
/* ------------------------------------------------------------------ */
export default function Footer() {
  return (
    <footer>
      {/* ---- Benefits Bar ---- */}
      <BenefitsBar />

      {/* ---- Newsletter ---- */}
      <NewsletterSection />

      {/* ---- Dark footer ---- */}
      <div className="bg-bg-dark">
        <div className="mx-auto max-w-[1440px] px-6 py-8 lg:px-16">
          {/* Logo row */}
          <div className="mb-10">
            <TeoHomeLogo />
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {/* Column 1 - Company info + Contact */}
            <div>
              <FooterHeading>Dane Firmy</FooterHeading>
              <address className="space-y-1 text-sm not-italic leading-relaxed text-neutral-400">
                <p className="font-medium text-neutral-300">Teo Home</p>
                <p>ul. Przyk&#322;adowa 1</p>
                <p>12-345 Miasto</p>
                <p>Polska</p>
                <p className="pt-1">
                  tel:{" "}
                  <a
                    href="tel:+48123456789"
                    className="transition-colors hover:text-white"
                  >
                    +48 123 456 789
                  </a>
                </p>
              </address>

              <div className="mt-8">
                <FooterHeading>Kontakt</FooterHeading>
                <ul className="space-y-1.5 text-sm text-neutral-400">
                  <li>
                    Telefon:{" "}
                    <a
                      href="tel:+48123456789"
                      className="transition-colors hover:text-white"
                    >
                      +48 123 456 789
                    </a>
                  </li>
                  <li>
                    E-mail:{" "}
                    <a
                      href="mailto:kontakt@teohome.pl"
                      className="transition-colors hover:text-white"
                    >
                      kontakt@teohome.pl
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Column 2 - Na skroty + Platnosci */}
            <div>
              <FooterHeading>Na skr&oacute;ty</FooterHeading>
              <ul className="space-y-2">
                <FooterLink href="/o-nas">O nas</FooterLink>
                <FooterLink href="/kategoria?promo=true">Promocje</FooterLink>
                <FooterLink href="/kategoria?nowe=true">Nowo&#347;ci</FooterLink>
                <FooterLink href="/blog">Blog</FooterLink>
                <FooterLink href="/kontakt">Kontakt</FooterLink>
              </ul>

              <div className="mt-8">
                <FooterHeading>P&#322;atno&#347;ci i dostawy</FooterHeading>
                <ul className="space-y-2">
                  <FooterLink href="/dostawa">Czas i koszty dostawy</FooterLink>
                  <FooterLink href="/platnosci">Formy p&#322;atno&#347;ci</FooterLink>
                </ul>
              </div>
            </div>

            {/* Column 3 - Product categories */}
            <div>
              <FooterHeading>Kategorie produktowe</FooterHeading>
              <ul className="space-y-2">
                <FooterLink href="/kategoria/kuchnie">Kuchnie</FooterLink>
                <FooterLink href="/kategoria/szafy-diy">Szafy DIY</FooterLink>
                <FooterLink href="/kategoria/sofy">Sofy</FooterLink>
                <FooterLink href="/kategoria/oswietlenie">O&#347;wietlenie</FooterLink>
                <FooterLink href="/kategoria/meble">Meble</FooterLink>
                <FooterLink href="/kategoria/projekty">Projekty</FooterLink>
                <FooterLink href="/kategoria/dekoracje">Dekoracje</FooterLink>
                <FooterLink href="/kategoria/bestsellery">Bestsellery</FooterLink>
              </ul>
            </div>

            {/* Column 4 - Etcetera + Socials */}
            <div>
              <FooterHeading>Etcetera</FooterHeading>
              <ul className="space-y-2">
                <FooterLink href="/faq">FAQ</FooterLink>
                <FooterLink href="/reklamacja">Reklamacja</FooterLink>
                <FooterLink href="/polityka-prywatnosci">
                  Polityka prywatno&#347;ci
                </FooterLink>
                <FooterLink href="/dla-mediow">Dla medi&oacute;w</FooterLink>
              </ul>

              <div className="mt-8">
                <FooterHeading>Media spo&#322;eczno&#347;ciowe</FooterHeading>
                <div className="flex gap-3">
                  <SocialIcon href="https://linkedin.com" label="LinkedIn">
                    <Linkedin className="h-4 w-4" />
                  </SocialIcon>
                  <SocialIcon href="https://twitter.com" label="X (Twitter)">
                    <Twitter className="h-4 w-4" />
                  </SocialIcon>
                  <SocialIcon href="https://facebook.com" label="Facebook">
                    <Facebook className="h-4 w-4" />
                  </SocialIcon>
                  <SocialIcon href="https://instagram.com" label="Instagram">
                    <Instagram className="h-4 w-4" />
                  </SocialIcon>
                </div>
              </div>
            </div>

            {/* Column 5 - My account */}
            <div>
              <FooterHeading>Moje konto</FooterHeading>
              <ul className="space-y-2">
                <FooterLink href="/logowanie">Logowanie</FooterLink>
                <FooterLink href="/konto/zamowienia">Moje zam&oacute;wienia</FooterLink>
                <FooterLink href="/konto/dane-wysylki">Dane wysy&#322;ki</FooterLink>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-neutral-700">
          <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-2 px-6 py-4 lg:flex-row lg:px-16">
            <p className="text-xs text-neutral-500">
              Copyright &copy; 2025 All Rights Reserved
            </p>
            <p className="text-xs uppercase tracking-widest text-neutral-600">
              Designed and crafted by{" "}
              <span className="text-neutral-500">MG eCommerce</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
