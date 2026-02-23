"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, User, ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { href: "/o-nas", label: "O nas" },
  { href: "/kuchnie", label: "Kuchnie" },
  { href: "/kategoria/sciany-rtv", label: "Ściany RTV" },
  { href: "/kategoria/szafy", label: "Szafy" },
  { href: "/nowosci", label: "Nowości" },
  { href: "/strefa-projektowa", label: "Strefa projektowa" },
  { href: "/realizacje", label: "Realizacje" },
  { href: "/blog", label: "Blog" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      {/* Single-row header: Logo | Nav | Icons+CTA */}
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-2.5 lg:px-16">
          {/* Logo */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-1.5"
            aria-label="TeoHome - strona główna"
          >
            <img
              src="/images/logo-teohome.svg"
              alt="TeoHome"
              width={196}
              height={50}
              className="h-[36px] w-auto"
            />
          </Link>

          {/* Desktop Navigation — center */}
          <nav aria-label="Nawigacja główna" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="relative px-3.5 py-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right side: search + icons */}
          <div className="flex items-center gap-2">
            {/* Search input — desktop */}
            <div className="hidden items-center rounded-full border border-border px-3 py-1.5 xl:flex">
              <input
                type="text"
                placeholder="Szukaj..."
                className="w-[120px] bg-transparent text-sm text-text-primary placeholder:text-text-light outline-none"
              />
              <Search size={16} strokeWidth={1.8} className="ml-1 text-text-secondary" />
            </div>
            {/* Search icon — mobile */}
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-bg-light hover:text-text-primary xl:hidden"
              aria-label="Szukaj"
            >
              <Search size={18} strokeWidth={1.8} />
            </button>

            <Link
              href="/konto"
              className="flex h-9 w-9 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-bg-light hover:text-text-primary"
              aria-label="Moje konto"
            >
              <User size={18} strokeWidth={1.8} />
            </Link>

            <Link
              href="/koszyk"
              className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary-dark"
              aria-label="Koszyk"
            >
              <ShoppingCart size={16} strokeWidth={1.8} />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-medium leading-none text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="ml-1 flex h-9 w-9 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-bg-light hover:text-text-primary xl:hidden"
              aria-label={mobileMenuOpen ? "Zamknij menu" : "Otwórz menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X size={22} strokeWidth={1.8} />
              ) : (
                <Menu size={22} strokeWidth={1.8} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 top-[53px] z-40 bg-black/30 transition-opacity duration-300 xl:hidden ${
          mobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Navigation Panel */}
      <nav
        id="mobile-menu"
        className={`fixed right-0 top-[53px] z-50 h-[calc(100dvh-53px)] w-full max-w-sm overflow-y-auto bg-white shadow-xl transition-transform duration-300 ease-out xl:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Menu mobilne"
        aria-hidden={!mobileMenuOpen}
      >
        <ul className="flex flex-col px-6 py-4">
          {navLinks.map((link, index) => (
            <li
              key={link.href}
              className={`${index > 0 ? "border-t border-border-light" : ""}`}
            >
              <Link
                href={link.href}
                className="flex py-3.5 text-base font-normal text-text-secondary transition-colors hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="border-t border-border px-6 py-6">
          <Link
            href="/kontakt"
            className="flex w-full items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
            onClick={() => setMobileMenuOpen(false)}
          >
            Kontakt
          </Link>
        </div>
      </nav>
    </header>
  );
}
