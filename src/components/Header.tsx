"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, User, ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { href: "/o-nas", label: "O nas" },
  { href: "/kuchnie", label: "Kuchnie" },
  { href: "/szafy-diy", label: "Szafy DIY" },
  { href: "/sofy", label: "Sofy" },
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
      {/* ROW 1: Logo + Action Icons */}
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-1.5"
            aria-label="TeoHome - strona główna"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary transition-colors group-hover:text-primary-dark"
              aria-hidden="true"
            >
              <path
                d="M14 3C14 3 6 9 6 15C6 19.4183 9.58172 23 14 23C18.4183 23 22 19.4183 22 15C22 9 14 3 14 3Z"
                fill="currentColor"
                opacity="0.15"
              />
              <path
                d="M14 4L7 11V22C7 23.1046 7.89543 24 9 24H12V18C12 16.8954 12.8954 16 14 16C15.1046 16 16 16.8954 16 18V24H19C20.1046 24 21 23.1046 21 22V11L14 4Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M10 8C12 6 14 5 14 5C14 5 18 8 20 12"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                opacity="0.5"
              />
            </svg>
            <span className="font-heading text-2xl font-semibold tracking-tight text-text-primary">
              Teo
              <span className="text-primary">Home</span>
            </span>
          </Link>

          {/* Right side actions */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-bg-light hover:text-text-primary"
              aria-label="Szukaj"
            >
              <Search size={20} strokeWidth={1.8} />
            </button>

            <Link
              href="/konto"
              className="flex h-10 w-10 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-bg-light hover:text-text-primary"
              aria-label="Moje konto"
            >
              <User size={20} strokeWidth={1.8} />
            </Link>

            <Link
              href="/koszyk"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-bg-light hover:text-text-primary"
              aria-label="Koszyk"
            >
              <ShoppingCart size={20} strokeWidth={1.8} />
              {totalItems > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium leading-none text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-bg-light hover:text-text-primary xl:hidden"
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

      {/* ROW 2: Desktop Navigation */}
      <div className="hidden border-b border-border-light xl:block">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <nav aria-label="Nawigacja główna">
            <ul className="flex items-center justify-center gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="relative px-4 py-3 text-sm font-normal text-text-secondary transition-colors hover:text-text-primary after:absolute after:bottom-0 after:left-4 after:right-4 after:h-[2px] after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 top-[57px] z-40 bg-black/30 transition-opacity duration-300 xl:hidden ${
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
        className={`fixed right-0 top-[57px] z-50 h-[calc(100dvh-57px)] w-full max-w-sm overflow-y-auto bg-white shadow-xl transition-transform duration-300 ease-out xl:hidden ${
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
            Umów wizytę w salonie
          </Link>
        </div>
      </nav>
    </header>
  );
}
