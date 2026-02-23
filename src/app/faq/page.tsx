"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, MessageCircle } from "lucide-react";

const faqItems = [
  {
    question: "Jak zamowic meble na wymiar?",
    answer:
      "Aby zamowic meble na wymiar, skontaktuj sie z naszym projektantem poprzez formularz kontaktowy lub telefonicznie. Umowimy bezplatna konsultacje, podczas ktorej omowimy Twoje potrzeby i preferencje.",
  },
  {
    question: "Jaki jest czas realizacji zamowienia?",
    answer:
      "Standardowy czas realizacji to 4-6 tygodni od zatwierdzenia projektu. Czas moze sie roznic w zaleznosci od zlozonosci projektu.",
  },
  {
    question: "Czy oferujecie bezplatny pomiar?",
    answer:
      "Tak, oferujemy bezplatny pomiar w promieniu 50 km od naszej siedziby. Dla dalszych lokalizacji ustalamy indywidualnie.",
  },
  {
    question: "Jakie materialy stosujecie?",
    answer:
      "Stosujemy materialy najwyzszej jakosci od renomowanych dostawcow europejskich - plyty MDF, laminowane, drewno lite, blaty kwarcowe i granitowe.",
  },
  {
    question: "Czy moge zobaczyc probki materialow?",
    answer:
      "Oczywiscie! Zapraszamy do naszego showroomu lub mozemy wyslac probki materialow poczta.",
  },
  {
    question: "Jaka jest gwarancja na meble?",
    answer:
      "Udzielamy 24-miesiecznej gwarancji na wszystkie nasze produkty. Gwarancja obejmuje wady materialowe i produkcyjne.",
  },
  {
    question: "Czy montaz jest w cenie?",
    answer:
      "Tak, montaz jest wliczony w cene zamowienia. Nasi doswiadczeni monterzy zadbaja o profesjonalny montaz.",
  },
  {
    question: "Jakie formy platnosci akceptujecie?",
    answer:
      "Akceptujemy przelewy bankowe, platnosci karta, BLIK oraz raty 0%. Szczegoly ustalimy przy skladaniu zamowienia.",
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
        <div className="mx-auto max-w-[1400px] px-6 py-12 lg:px-8 lg:py-16">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-text-light">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-primary"
                >
                  Strona glowna
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
            Najczesciej zadawane pytania
          </h1>
          <p className="mt-4 max-w-2xl text-base text-text-secondary lg:text-lg">
            Znajdz odpowiedzi na najczestsze pytania dotyczace naszych uslug,
            procesu realizacji i warunkow wspolpracy.
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
            Nie znalazles odpowiedzi?
          </h2>
          <p className="mt-3 text-text-secondary">
            Skontaktuj sie z nami — chetnie odpowiemy na wszystkie Twoje pytania.
          </p>

          <Link
            href="/kontakt"
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
          >
            Skontaktuj sie z nami
          </Link>
        </div>
      </section>
    </>
  );
}
