import Link from "next/link";
import {
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
} from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

/* ------------------------------------------------------------------ */
/*  Newsletter Section                                                 */
/* ------------------------------------------------------------------ */
function NewsletterSection() {
  return (
    <section
      aria-label="Newsletter"
      className="bg-bg-light overflow-hidden"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-16">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-stretch lg:gap-16">
          {/* Decorative image */}
          <div
            aria-hidden="true"
            className="relative hidden w-[320px] shrink-0 overflow-hidden rounded-2xl lg:block"
          >
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&q=80"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
            <h2 className="font-heading text-xl font-medium text-text-primary md:text-2xl">
              Zapisz si&#281; do newslettera i zyskaj
            </h2>

            <p className="mt-2 font-heading text-4xl font-bold text-accent md:text-5xl lg:text-[3.25rem]">
              10% rabatu
              <br />
              <span className="text-3xl font-semibold md:text-4xl lg:text-[2.5rem]">
                na pierwsze zakupy!
              </span>
            </p>

            {/* Form */}
            <NewsletterForm />

            <p className="mt-4 max-w-lg text-xs leading-relaxed text-text-light">
              Zapisuj&#261;c si&#281; potwierdzam zapoznanie si&#281; z regulaminem
              rabat&oacute;w ByBrands zakupionych przez firm&#281; TeoHome.
            </p>
          </div>
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
    <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-white">
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
        className="text-sm text-neutral-400 transition-colors hover:text-white"
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
    <Link href="/" aria-label="TeoHome - strona g&#322;&oacute;wna">
      <span className="font-heading text-2xl font-bold tracking-wide text-white">
        Teo<span className="text-accent">Home</span>
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Footer export                                                 */
/* ------------------------------------------------------------------ */
export default function Footer() {
  return (
    <footer>
      {/* ---- Newsletter ---- */}
      <NewsletterSection />

      {/* ---- Dark footer ---- */}
      <div className="bg-bg-dark">
        <div className="mx-auto max-w-[1440px] px-6 py-14 lg:px-16">
          {/* Logo row */}
          <div className="mb-12">
            <TeoHomeLogo />
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
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
          <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-2 px-6 py-5 lg:flex-row lg:px-16">
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
