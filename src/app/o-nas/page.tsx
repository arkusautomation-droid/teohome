import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Users,
  Leaf,
  Clock,
  Smile,
  Shield,
  Paintbrush,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Metadata                                                           */
/* ------------------------------------------------------------------ */
export const metadata: Metadata = {
  title: "O nas - TeoHome | Meble na wymiar z pasja",
  description:
    "Poznaj historie TeoHome - od malego warsztatu stolarskiego do wiodacego producenta mebli na wymiar w Polsce. Jakosc, indywidualne podejscie i zrownowazony rozwoj.",
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const values = [
  {
    icon: Heart,
    title: "Jakosc",
    description:
      "Kazdy mebel wykonujemy z najwyzszej jakosci materialow, dbajac o kazdy detal wykonczenia.",
  },
  {
    icon: Users,
    title: "Indywidualne podejscie",
    description:
      "Projektujemy meble dopasowane do Twojej przestrzeni i stylu zycia.",
  },
  {
    icon: Leaf,
    title: "Zrownowazony rozwoj",
    description:
      "Dbamy o srodowisko, stosujac ekologiczne materialy i procesy produkcyjne.",
  },
] as const;

const team = [
  {
    name: "Anna Kowalska",
    role: "Projektant wnetrz",
    bio: "Z ponad 8-letnim doswiadczeniem w projektowaniu wnetrz, Anna tworzy przestrzenie, ktore lacza funkcjonalnosc z estetyka.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face&q=80",
  },
  {
    name: "Tomasz Nowak",
    role: "Stolarz",
    bio: "Mistrz rzemiosla z 15-letnim doswiadczeniem. Kazdy mebel traktuje jak dzielo sztuki, dbajac o najdrobniejsze detale.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&q=80",
  },
  {
    name: "Maria Wisniewska",
    role: "Doradca klienta",
    bio: "Pasjonatka designu, ktora pomoze Ci wybrac idealne rozwiazanie dla Twojego domu. Zawsze z usmiechnieciem.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face&q=80",
  },
  {
    name: "Piotr Zielinski",
    role: "Kierownik produkcji",
    bio: "Odpowiada za to, by kazde zamowienie zostalo zrealizowane na czas i z najwyzsza precyzja wykonania.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&q=80",
  },
] as const;

const reasons = [
  {
    icon: Clock,
    text: "Ponad 10 lat doswiadczenia",
  },
  {
    icon: Smile,
    text: "Tysiace zadowolonych klientow",
  },
  {
    icon: Shield,
    text: "Gwarancja jakosci na kazdy produkt",
  },
  {
    icon: Paintbrush,
    text: "Indywidualny projekt bez dodatkowych kosztow",
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */
export default function AboutPage() {
  return (
    <>
      {/* ============================================================ */}
      {/*  HERO BANNER                                                  */}
      {/* ============================================================ */}
      <section className="relative h-[320px] w-full sm:h-[380px] lg:h-[440px]">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
          alt="Nowoczesne wnetrze z meblami TeoHome"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
          <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            O nas
          </h1>
          <nav aria-label="Breadcrumb" className="mt-4">
            <ol className="flex items-center gap-2 text-sm text-white/80">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-white"
                >
                  Strona glowna
                </Link>
              </li>
              <li aria-hidden="true" className="text-white/50">
                &gt;
              </li>
              <li aria-current="page" className="text-white">
                O nas
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  OUR STORY                                                    */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-6 lg:grid-cols-2 lg:gap-16 lg:px-16">
          {/* Image */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl lg:aspect-[3/4]">
            <Image
              src="https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=960&q=80"
              alt="Warsztat stolarski TeoHome - reczna produkcja mebli"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Text */}
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Nasza historia
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-text-primary sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              Od warsztatu stolarskiego do nowoczesnej manufaktury
            </h2>

            <div className="mt-8 space-y-5 text-base leading-relaxed text-text-secondary sm:text-lg">
              <p>
                TeoHome to marka mebli na wymiar, ktora powstala z pasji do
                tworzenia pieknych i funkcjonalnych przestrzeni. Od poczatku
                nasza misja bylo dostarczanie klientom mebli najwyzszej
                jakosci, dopasowanych do ich indywidualnych potrzeb.
              </p>
              <p>
                Zaczynalismy jako maly warsztat stolarski, a dzis jestesmy
                jednym z wiodacych producentow mebli na wymiar w Polsce.
                Nasza droga od malego warsztatu do nowoczesnej manufaktury
                to historia pasji, ciezkiej pracy i nieustannego dazenia do
                doskonalosci.
              </p>
            </div>

            {/* Quick stats */}
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-10">
              <div>
                <p className="font-heading text-3xl font-bold text-primary sm:text-4xl">
                  10+
                </p>
                <p className="mt-1 text-sm text-text-secondary">
                  lat doswiadczenia
                </p>
              </div>
              <div>
                <p className="font-heading text-3xl font-bold text-primary sm:text-4xl">
                  2k+
                </p>
                <p className="mt-1 text-sm text-text-secondary">
                  zadowolonych klientow
                </p>
              </div>
              <div>
                <p className="font-heading text-3xl font-bold text-primary sm:text-4xl">
                  5k+
                </p>
                <p className="mt-1 text-sm text-text-secondary">
                  zrealizowanych projektow
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  VALUES                                                       */}
      {/* ============================================================ */}
      <section className="bg-bg-warm py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
          {/* Section header */}
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              To, w co wierzymy
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-text-primary sm:text-4xl">
              Nasze wartosci
            </h2>
          </div>

          {/* Cards */}
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <article
                key={value.title}
                className="group rounded-2xl bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-10"
              >
                {/* Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  <value.icon size={28} strokeWidth={1.8} />
                </div>

                <h3 className="mt-6 font-heading text-xl font-semibold text-text-primary">
                  {value.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-text-secondary">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TEAM                                                         */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
          {/* Section header */}
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Poznaj nas blizej
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-text-primary sm:text-4xl">
              Nasz zespol
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-text-secondary sm:text-lg">
              Kazdy z nas wnosi unikalne umiejetnosci i pasje, dzieki czemu
              tworzymy meble, ktore zachwycaja.
            </p>
          </div>

          {/* Team grid */}
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <article
                key={member.name}
                className="group text-center"
              >
                {/* Avatar */}
                <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full border-4 border-bg-warm transition-all duration-300 group-hover:border-primary/30 sm:h-44 sm:w-44">
                  <Image
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="176px"
                  />
                </div>

                <h3 className="mt-5 font-heading text-lg font-semibold text-text-primary">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-primary">
                  {member.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {member.bio}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  WHY US                                                       */}
      {/* ============================================================ */}
      <section className="bg-bg-light py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
          {/* Section header */}
          <div className="text-center">
            <h2 className="font-heading text-3xl font-bold text-text-primary sm:text-4xl">
              Dlaczego TeoHome?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-text-secondary sm:text-lg">
              Wybierajac nas, wybierasz jakosc, doswiadczenie i indywidualne
              podejscie do kazdego projektu.
            </p>
          </div>

          {/* Feature grid */}
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:gap-8">
            {reasons.map((reason) => (
              <div
                key={reason.text}
                className="flex items-center gap-5 rounded-2xl bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-8"
              >
                {/* Icon */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <reason.icon size={28} strokeWidth={1.8} />
                </div>

                <p className="text-lg font-medium text-text-primary">
                  {reason.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CTA                                                          */}
      {/* ============================================================ */}
      <section className="bg-bg-dark py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-6 text-center lg:px-16">
          <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Zacznij swoja przygode z TeoHome
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-neutral-400 sm:text-lg">
            Opowiedz nam o swoim pomysle, a my stworzymy meble idealnie
            dopasowane do Twojej przestrzeni.
          </p>
          <Link
            href="/kontakt"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-base font-medium text-white transition-colors duration-300 hover:bg-accent/90 sm:text-lg"
          >
            Skontaktuj sie z nami
          </Link>
        </div>
      </section>
    </>
  );
}
