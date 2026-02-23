import Link from "next/link";
import {
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
    <div className="bg-primary">
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
        {/* Left — decorative diagonal stripes (Figma: 860x630) */}
        <div
          aria-hidden="true"
          className="relative hidden min-h-[400px] overflow-hidden bg-[#f0ece8] lg:block lg:w-1/2"
        >
          {/* Diagonal stripe 1 */}
          <div
            className="absolute inset-0 origin-center -rotate-[25deg] scale-[1.6]"
            style={{ top: "-10%", left: "-15%" }}
          >
            <div className="flex h-full gap-4">
              <div className="w-[30%] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="w-[25%] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="w-[30%] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right — content (Figma: 860px, vertical layout, gap 60) */}
        <div className="flex flex-col justify-center bg-bg-light px-6 py-12 lg:w-1/2 lg:px-16 lg:py-16">
          <h2 className="font-heading text-lg font-bold text-text-primary md:text-[24px]">
            Zapisz si&#281; do newslettera i zyskaj
          </h2>

          <p className="mt-1 font-heading text-[48px] font-bold leading-tight text-text-primary md:text-[56px]">
            10% rabatu na pierwsze zakupy!
          </p>

          <div className="mt-10">
            <NewsletterForm />
          </div>

          <label className="mt-4 flex cursor-pointer items-start gap-2.5">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-border text-primary accent-primary"
            />
            <span className="text-xs leading-relaxed text-text-light">
              Wyrażam zgodę na przetwarzanie moich danych osobowych przez firmę Teo Home
            </span>
          </label>
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
    <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-wider text-white">
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
                <p>NIP: 123 456 789</p>
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
                <FooterLink href="/kategoria">Produkty</FooterLink>
                <FooterLink href="/inspiracje">Inspiracje</FooterLink>
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
                <FooterLink href="/kategoria/sciany-rtv">&#346;ciany RTV</FooterLink>
                <FooterLink href="/kategoria/szafy">Szafy</FooterLink>
                <FooterLink href="/kategoria/projekty">Projekty</FooterLink>
                <FooterLink href="/kategoria/nowosci">Nowo&#347;ci</FooterLink>
                <FooterLink href="/kategoria/promocje">Promocje</FooterLink>
                <FooterLink href="/kategoria/bestsellery">Bestsellery</FooterLink>
              </ul>
            </div>

            {/* Column 4 - Etcetera + Socials */}
            <div>
              <FooterHeading>Pomoc</FooterHeading>
              <ul className="space-y-2">
                <FooterLink href="/faq">FAQ</FooterLink>
                <FooterLink href="/reklamacja">Reklamacja</FooterLink>
                <FooterLink href="/polityka-prywatnosci">
                  Polityka prywatno&#347;ci
                </FooterLink>
                <FooterLink href="/pliki-cookies">Pliki cookies</FooterLink>
              </ul>

              <div className="mt-8">
                <FooterHeading>Media spo&#322;eczno&#347;ciowe</FooterHeading>
                <div className="flex gap-3">
                  <SocialIcon href="https://youtube.com" label="YouTube">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </SocialIcon>
                  <SocialIcon href="https://tiktok.com" label="TikTok">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
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
              Copyright &copy; 2025. All Rights Reserved
            </p>
            <p className="text-xs uppercase tracking-widest text-neutral-600">
              Created with{" "}
              <span className="text-red-400">&hearts;</span>{" "}
              by <span className="text-neutral-500">AG ADAWARDS</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
