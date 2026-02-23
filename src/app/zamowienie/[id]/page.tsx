import Link from "next/link";
import { CheckCircle, Package, ArrowRight, Mail } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ZamowieniePage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-border-light">
        <div className="mx-auto max-w-[1400px] px-6 py-3 lg:px-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-text-light">
              <li>
                <Link href="/" className="transition-colors hover:text-text-primary">
                  Strona główna
                </Link>
              </li>
              <li aria-hidden="true">&gt;</li>
              <li>
                <span className="text-text-primary font-medium">Potwierdzenie zamówienia</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-[700px] px-6 py-16 lg:px-8 lg:py-24 text-center">
        {/* Success icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
          <CheckCircle size={40} className="text-success" strokeWidth={1.5} />
        </div>

        <h1 className="mt-8 font-[var(--font-heading)] text-3xl font-semibold text-text-primary md:text-4xl">
          Dziękujemy za zamówienie!
        </h1>

        <p className="mt-4 text-lg text-text-secondary">
          Twoje zamówienie <span className="font-semibold text-text-primary">#{id}</span> zostało przyjęte do realizacji.
        </p>

        {/* Info cards */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 text-left">
          <div className="rounded-xl border border-border-light p-5">
            <div className="flex items-center gap-2 text-text-primary">
              <Mail size={20} strokeWidth={1.8} />
              <span className="text-sm font-semibold">Potwierdzenie email</span>
            </div>
            <p className="mt-2 text-sm text-text-secondary">
              Szczegóły zamówienia zostały wysłane na Twój adres email.
            </p>
          </div>
          <div className="rounded-xl border border-border-light p-5">
            <div className="flex items-center gap-2 text-text-primary">
              <Package size={20} strokeWidth={1.8} />
              <span className="text-sm font-semibold">Realizacja</span>
            </div>
            <p className="mt-2 text-sm text-text-secondary">
              Zamówienie zostanie wysłane w ciągu 2-5 dni roboczych.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-bg-dark px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-text-primary active:scale-[0.98]"
          >
            Kontynuuj zakupy
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 rounded-xl border border-border px-8 py-3.5 text-sm font-medium text-text-primary transition-colors hover:bg-bg-light"
          >
            Masz pytania? Skontaktuj się
          </Link>
        </div>
      </div>
    </div>
  );
}
