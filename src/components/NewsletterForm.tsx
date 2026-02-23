"use client";

import { Send } from "lucide-react";

export default function NewsletterForm() {
  return (
    <form
      className="mt-8 flex w-full max-w-lg flex-col gap-2 sm:flex-row"
      onSubmit={(e) => e.preventDefault()}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Adres e-mail
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="Adres e-mail"
        className="h-12 flex-1 rounded-lg border border-border bg-white px-4 text-sm
          text-text-primary transition-colors
          placeholder:text-text-light
          focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
      />
      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-lg
          bg-bg-dark px-7 text-sm font-semibold text-white
          transition-colors hover:bg-secondary focus:ring-2
          focus:ring-accent/40 focus:ring-offset-2 focus:outline-none"
      >
        <Send className="h-4 w-4" />
        Zapisz si&#281;
      </button>
    </form>
  );
}
