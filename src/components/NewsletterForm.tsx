"use client";


export default function NewsletterForm() {
  return (
    <form
      className="flex w-full max-w-lg"
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
        className="h-12 flex-1 rounded-l-full border border-r-0 border-border bg-white px-5 text-sm
          text-text-primary transition-colors
          placeholder:text-text-light
          focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
      />
      <button
        type="submit"
        className="inline-flex h-12 items-center justify-center gap-2 rounded-r-full
          bg-bg-dark px-7 text-sm font-semibold text-white
          transition-colors hover:bg-secondary focus:ring-2
          focus:ring-accent/40 focus:ring-offset-2 focus:outline-none"
      >
        Zapisz si&#281;
      </button>
    </form>
  );
}
