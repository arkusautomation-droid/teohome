"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Facebook,
  Instagram,
  Linkedin,
  ChevronRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Contact details data                                               */
/* ------------------------------------------------------------------ */
const contactDetails = [
  {
    icon: Phone,
    label: "Telefon",
    value: "+48 123 456 789",
    href: "tel:+48123456789",
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "kontakt@teohome.pl",
    href: "mailto:kontakt@teohome.pl",
  },
  {
    icon: MapPin,
    label: "Adres",
    value: "ul. Przykładowa 1, 12-345 Miasto, Polska",
    href: "https://maps.google.com/?q=ul.+Przykładowa+1,+Miasto,+Polska",
  },
] as const;

const workingHours = [
  { day: "Pon-Pt", hours: "8:00 - 18:00" },
  { day: "Sob", hours: "9:00 - 14:00" },
  { day: "Ndz", hours: "Zamknięte" },
] as const;

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
] as const;

const subjectOptions = [
  "Pytanie ogólne",
  "Zamówienie",
  "Reklamacja",
  "Współpraca",
] as const;

/* ------------------------------------------------------------------ */
/*  Hero Banner                                                        */
/* ------------------------------------------------------------------ */
function HeroBanner() {
  return (
    <section
      className="relative flex h-[280px] items-center justify-center overflow-hidden bg-bg-dark sm:h-[320px]"
      aria-label="Baner kontaktowy"
    >
      {/* Background image placeholder with dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1920&q=80')",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-4 px-6 text-center">
        <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl">
          Kontakt
        </h1>

        {/* Breadcrumb */}
        <nav aria-label="Nawigacja okruszkowa">
          <ol className="flex items-center gap-1.5 text-sm text-white/70">
            <li>
              <Link
                href="/"
                className="transition-colors hover:text-white"
              >
                Strona główna
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li>
              <span className="text-white font-medium">Kontakt</span>
            </li>
          </ol>
        </nav>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact Info (Left Column)                                         */
/* ------------------------------------------------------------------ */
function ContactInfo() {
  return (
    <div className="flex flex-col gap-8">
      {/* Heading */}
      <div>
        <h2 className="font-heading text-2xl font-semibold text-text-primary sm:text-3xl">
          Skontaktuj się z nami
        </h2>
        <p className="mt-3 leading-relaxed text-text-secondary">
          Masz pytania dotyczące naszych produktów lub usług? Skontaktuj się
          z nami &mdash; chętnie pomożemy!
        </p>
      </div>

      {/* Contact details */}
      <div className="flex flex-col gap-5">
        {contactDetails.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="group flex items-start gap-4 transition-colors"
            target={item.icon === MapPin ? "_blank" : undefined}
            rel={item.icon === MapPin ? "noopener noreferrer" : undefined}
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
              <item.icon className="h-5 w-5" strokeWidth={1.8} />
            </span>
            <span className="flex flex-col gap-0.5 pt-0.5">
              <span className="text-xs font-medium uppercase tracking-wider text-text-light">
                {item.label}
              </span>
              <span className="text-sm font-medium text-text-primary transition-colors group-hover:text-primary">
                {item.value}
              </span>
            </span>
          </a>
        ))}
      </div>

      {/* Working hours */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Clock className="h-5 w-5" strokeWidth={1.8} />
          </span>
          <span className="text-xs font-medium uppercase tracking-wider text-text-light">
            Godziny pracy
          </span>
        </div>
        <div className="ml-[3.25rem] flex flex-col gap-1.5">
          {workingHours.map((item) => (
            <div
              key={item.day}
              className="flex items-center justify-between max-w-[200px] text-sm"
            >
              <span className="font-medium text-text-primary">
                {item.day}:
              </span>
              <span
                className={
                  item.hours === "Zamknięte"
                    ? "text-red-500"
                    : "text-text-secondary"
                }
              >
                {item.hours}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Social media */}
      <div className="flex flex-col gap-3">
        <span className="text-xs font-medium uppercase tracking-wider text-text-light">
          Znajdź nas
        </span>
        <div className="flex gap-3">
          {socialLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border
                text-text-secondary transition-colors hover:border-primary hover:bg-primary hover:text-white"
            >
              <item.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact Form (Right Column)                                        */
/* ------------------------------------------------------------------ */
function ContactForm() {
  const [agreed, setAgreed] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Form submission logic would go here
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border-light bg-bg-light p-6 sm:p-8 lg:p-10"
      noValidate
    >
      <h3 className="mb-6 font-heading text-xl font-semibold text-text-primary sm:text-2xl">
        Wyślij wiadomość
      </h3>

      <div className="flex flex-col gap-5">
        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-name"
            className="text-sm font-medium text-text-primary"
          >
            Imię i nazwisko
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jan Kowalski"
            className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-text-primary
              placeholder:text-text-light outline-none transition-colors
              focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-email"
            className="text-sm font-medium text-text-primary"
          >
            Adres e-mail
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jan@przyklad.pl"
            className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-text-primary
              placeholder:text-text-light outline-none transition-colors
              focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-phone"
            className="text-sm font-medium text-text-primary"
          >
            Telefon
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+48 123 456 789"
            className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-text-primary
              placeholder:text-text-light outline-none transition-colors
              focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Subject */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-subject"
            className="text-sm font-medium text-text-primary"
          >
            Temat
          </label>
          <select
            id="contact-subject"
            name="subject"
            required
            defaultValue=""
            className="w-full appearance-none rounded-lg border border-border bg-white px-4 py-3 text-sm text-text-primary
              outline-none transition-colors
              focus:border-primary focus:ring-2 focus:ring-primary/20
              invalid:text-text-light"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%236B6B6B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m4 6 4 4 4-4'/%3E%3C/svg%3E")`,
              backgroundPosition: "right 12px center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <option value="" disabled>
              Wybierz temat
            </option>
            {subjectOptions.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-message"
            className="text-sm font-medium text-text-primary"
          >
            Wiadomość
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            placeholder="Napisz swoją wiadomość..."
            className="w-full resize-y rounded-lg border border-border bg-white px-4 py-3 text-sm text-text-primary
              placeholder:text-text-light outline-none transition-colors
              focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Consent checkbox */}
        <label
          htmlFor="contact-consent"
          className="flex cursor-pointer items-start gap-3"
        >
          <input
            id="contact-consent"
            name="consent"
            type="checkbox"
            required
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-border text-primary accent-primary
              focus:ring-2 focus:ring-primary/20"
          />
          <span className="text-sm leading-relaxed text-text-secondary">
            Wyrażam zgodę na przetwarzanie danych osobowych zgodnie z{" "}
            <Link
              href="/polityka-prywatnosci"
              className="text-primary underline underline-offset-2 transition-colors hover:text-primary-dark"
            >
              polityką prywatności
            </Link>
            .
          </span>
        </label>

        {/* Submit button */}
        <button
          type="submit"
          className="mt-1 flex w-full items-center justify-center gap-2 rounded-lg bg-bg-dark px-6 py-3.5
            text-sm font-medium text-white transition-all
            hover:bg-text-primary active:scale-[0.98]
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
            disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send className="h-4 w-4" strokeWidth={1.8} />
          Wyślij wiadomość
        </button>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/*  Map Section                                                        */
/* ------------------------------------------------------------------ */
function MapSection() {
  return (
    <section className="bg-white" aria-label="Lokalizacja na mapie">
      <div className="mx-auto max-w-[1400px] px-6 pb-16 lg:px-8 lg:pb-24">
        <h2 className="mb-6 font-heading text-2xl font-semibold text-text-primary sm:text-3xl">
          Nasza lokalizacja
        </h2>
        <div
          className="flex h-[400px] items-center justify-center rounded-2xl bg-neutral-100 border border-border-light"
          role="img"
          aria-label="Mapa z lokalizacją sklepu TeoHome - ul. Przykładowa 1, 12-345 Miasto"
        >
          <div className="flex flex-col items-center gap-3 text-text-light">
            <MapPin className="h-10 w-10" strokeWidth={1.2} />
            <span className="text-lg font-medium">Mapa</span>
            <span className="text-sm">
              ul. Przykładowa 1, 12-345 Miasto
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */
export default function KontaktPage() {
  return (
    <>
      {/* Hero banner */}
      <HeroBanner />

      {/* Main content: Contact info + Form */}
      <section className="bg-white py-16 lg:py-24" aria-label="Formularz kontaktowy">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
            {/* Left column - Contact info (~40%) */}
            <div className="lg:col-span-2">
              <ContactInfo />
            </div>

            {/* Right column - Contact form (~60%) */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map section */}
      <MapSection />
    </>
  );
}
