"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, MessageCircle } from "lucide-react";

const faqItems = [
  {
    question: "Jak zamówić meble na wymiar?",
    answer:
      "Aby zamówić meble na wymiar, skontaktuj się z naszym projektantem poprzez formularz kontaktowy lub telefonicznie. Umówimy bezpłatną konsultację, podczas której omówimy Twoje potrzeby i preferencje.",
  },
  {
    question: "Jaki jest czas realizacji zamówienia?",
    answer:
      "Standardowy czas realizacji to 4-6 tygodni od zatwierdzenia projektu. Czas może się różnić w zależności od złożoności projektu.",
  },
  {
    question: "Czy oferujecie bezpłatny pomiar?",
    answer:
      "Tak, oferujemy bezpłatny pomiar w promieniu 50 km od naszej siedziby. Dla dalszych lokalizacji ustalamy indywidualnie.",
  },
  {
    question: "Jakie materiały stosujecie?",
    answer:
      "Stosujemy materiały najwyższej jakości od renomowanych dostawców europejskich - płyty MDF, laminowane, drewno lite, blaty kwarcowe i granitowe.",
  },
  {
    question: "Czy mogę zobaczyć próbki materiałów?",
    answer:
      "Oczywiście! Zapraszamy do naszego showroomu lub możemy wysłać próbki materiałów pocztą.",
  },
  {
    question: "Jaka jest gwarancja na meble?",
    answer:
      "Udzielamy 24-miesięcznej gwarancji na wszystkie nasze produkty. Gwarancja obejmuje wady materiałowe i produkcyjne.",
  },
  {
    question: "Czy montaż jest w cenie?",
    answer:
      "Tak, montaż jest wliczony w cenę zamówienia. Nasi doświadczeni monterzy zadbają o profesjonalny montaż.",
  },
  {
    question: "Jakie formy płatności akceptujecie?",
    answer:
      "Akceptujemy przelewy bankowe, płatności kartą, BLIK oraz raty 0%. Szczegóły ustalimy przy składaniu zamówienia.",
  },
] as const;

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      {/* Hero Banner */}
      <section className="bg-bg-warm">
        <div className="mx-auto max-w-[1440px] px-6 py-12 lg:px-16 lg:py-16">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-text-light">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-primary"
                >
                  Strona główna
                </Link>
              </li>
              <li aria-hidden="true" className="text-border">
                /
              </li>
              <li>
                <span className="text-text-secondary">FAQ</span>
              </li>
            </ol>
          </nav>

          <h1 className="font-heading text-3xl font-semibold text-text-primary sm:text-4xl lg:text-5xl">
            Najczęściej zadawane pytania
          </h1>
          <p className="mt-4 max-w-2xl text-base text-text-secondary lg:text-lg">
            Znajdź odpowiedzi na najczęstsze pytania dotyczące naszych usług,
            procesu realizacji i warunków współpracy.
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-[800px] px-6">
          <div className="divide-y divide-border">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div key={index} className="group">
                  <button
                    type="button"
                    onClick={() => toggleItem(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-question-${index}`}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-primary"
                  >
                    <span className="text-base font-medium text-text-primary group-hover:text-primary sm:text-lg">
                      {item.question}
                    </span>
                    <ChevronDown
                      size={20}
                      strokeWidth={1.8}
                      className={`shrink-0 text-text-light transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-primary" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 text-text-secondary leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-bg-light">
        <div className="mx-auto max-w-[800px] px-6 py-16 text-center lg:py-20">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-bg-warm">
            <MessageCircle
              size={24}
              strokeWidth={1.8}
              className="text-primary"
            />
          </div>

          <h2 className="mt-6 font-heading text-2xl font-semibold text-text-primary sm:text-3xl">
            Nie znalazłeś odpowiedzi?
          </h2>
          <p className="mt-3 text-text-secondary">
            Skontaktuj się z nami — chętnie odpowiemy na wszystkie Twoje pytania.
          </p>

          <Link
            href="/kontakt"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-accent/90"
          >
            Skontaktuj się z nami
          </Link>
        </div>
      </section>
    </>
  );
}
