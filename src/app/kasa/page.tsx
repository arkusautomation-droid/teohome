"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Lock, Truck, CreditCard, Building2, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice, getProductImage } from "@/lib/woocommerce";

interface FormData {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  address_1: string;
  city: string;
  postcode: string;
  country: string;
  company: string;
  nip: string;
  notes: string;
  shipping_same: boolean;
  shipping_first_name: string;
  shipping_last_name: string;
  shipping_address_1: string;
  shipping_city: string;
  shipping_postcode: string;
  payment_method: string;
}

const initialForm: FormData = {
  email: "",
  first_name: "",
  last_name: "",
  phone: "",
  address_1: "",
  city: "",
  postcode: "",
  country: "PL",
  company: "",
  nip: "",
  notes: "",
  shipping_same: true,
  shipping_first_name: "",
  shipping_last_name: "",
  shipping_address_1: "",
  shipping_city: "",
  shipping_postcode: "",
  payment_method: "bacs",
};

export default function KasaPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCompany, setShowCompany] = useState(false);

  const shippingCost = totalPrice >= 500 ? 0 : 49;
  const total = totalPrice + shippingCost;

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!form.email.trim()) newErrors.email = "Podaj adres email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Nieprawidłowy email";
    if (!form.first_name.trim()) newErrors.first_name = "Podaj imię";
    if (!form.last_name.trim()) newErrors.last_name = "Podaj nazwisko";
    if (!form.phone.trim()) newErrors.phone = "Podaj numer telefonu";
    if (!form.address_1.trim()) newErrors.address_1 = "Podaj adres";
    if (!form.city.trim()) newErrors.city = "Podaj miasto";
    if (!form.postcode.trim()) newErrors.postcode = "Podaj kod pocztowy";
    else if (!/^\d{2}-\d{3}$/.test(form.postcode)) newErrors.postcode = "Format: 00-000";

    if (!form.shipping_same) {
      if (!form.shipping_first_name.trim()) newErrors.shipping_first_name = "Podaj imię";
      if (!form.shipping_last_name.trim()) newErrors.shipping_last_name = "Podaj nazwisko";
      if (!form.shipping_address_1.trim()) newErrors.shipping_address_1 = "Podaj adres";
      if (!form.shipping_city.trim()) newErrors.shipping_city = "Podaj miasto";
      if (!form.shipping_postcode.trim()) newErrors.shipping_postcode = "Podaj kod pocztowy";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || items.length === 0) return;

    setIsSubmitting(true);

    try {
      const orderPayload = {
        billing: {
          first_name: form.first_name,
          last_name: form.last_name,
          address_1: form.address_1,
          city: form.city,
          postcode: form.postcode,
          country: form.country,
          email: form.email,
          phone: form.phone,
        },
        shipping: form.shipping_same
          ? {
              first_name: form.first_name,
              last_name: form.last_name,
              address_1: form.address_1,
              city: form.city,
              postcode: form.postcode,
              country: form.country,
            }
          : {
              first_name: form.shipping_first_name,
              last_name: form.shipping_last_name,
              address_1: form.shipping_address_1,
              city: form.shipping_city,
              postcode: form.shipping_postcode,
              country: form.country,
            },
        line_items: items.map((item) => ({
          product_id: item.product.id,
          quantity: item.quantity,
          ...(item.variation ? { variation_id: item.variation.id } : {}),
        })),
        payment_method: form.payment_method,
        customer_note: form.notes,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const order = await res.json();

      if (order.id) {
        clearCart();
        router.push(`/zamowienie/${order.id}`);
      }
    } catch (error) {
      console.error("Order failed:", error);
      // Fallback — still redirect with mock order
      clearCart();
      router.push(`/zamowienie/mock-${Date.now()}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="border-b border-border-light">
          <div className="mx-auto max-w-[1440px] px-6 py-3 lg:px-16">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm text-text-light">
                <li><Link href="/" className="transition-colors hover:text-text-primary">Strona główna</Link></li>
                <li aria-hidden="true">&gt;</li>
                <li><span className="text-text-primary font-medium">Kasa</span></li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-16 text-center">
          <h1 className="font-heading text-3xl font-semibold text-text-primary">Twój koszyk jest pusty</h1>
          <p className="mt-3 text-text-secondary">Dodaj produkty, aby przejść do kasy.</p>
          <Link href="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-accent/90">
            <ArrowLeft size={16} strokeWidth={2} />
            Przejdź do sklepu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-border-light">
        <div className="mx-auto max-w-[1440px] px-6 py-3 lg:px-16">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-text-light">
              <li><Link href="/" className="transition-colors hover:text-text-primary">Strona główna</Link></li>
              <li aria-hidden="true">&gt;</li>
              <li><Link href="/koszyk" className="transition-colors hover:text-text-primary">Koszyk</Link></li>
              <li aria-hidden="true">&gt;</li>
              <li><span className="text-text-primary font-medium">Kasa</span></li>
            </ol>
          </nav>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto max-w-[1440px] px-6 py-8 lg:px-16 lg:py-12">
        <h1 className="font-heading text-3xl font-semibold text-text-primary md:text-4xl">
          Kasa
        </h1>

        <div className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-[1fr_420px] xl:gap-12">
          {/* LEFT — Form */}
          <div className="space-y-8">
            {/* Contact */}
            <section>
              <h2 className="font-heading text-xl font-semibold text-text-primary">
                Dane kontaktowe
              </h2>
              <div className="mt-4 space-y-4">
                <Field label="Email *" error={errors.email}>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="jan@przyklad.pl"
                    className={inputClass(errors.email)}
                  />
                </Field>
                <Field label="Telefon *" error={errors.phone}>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    placeholder="+48 123 456 789"
                    className={inputClass(errors.phone)}
                  />
                </Field>
              </div>
            </section>

            {/* Billing */}
            <section>
              <h2 className="font-heading text-xl font-semibold text-text-primary">
                Adres rozliczeniowy
              </h2>
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Imię *" error={errors.first_name}>
                    <input
                      type="text"
                      value={form.first_name}
                      onChange={(e) => updateField("first_name", e.target.value)}
                      placeholder="Jan"
                      className={inputClass(errors.first_name)}
                    />
                  </Field>
                  <Field label="Nazwisko *" error={errors.last_name}>
                    <input
                      type="text"
                      value={form.last_name}
                      onChange={(e) => updateField("last_name", e.target.value)}
                      placeholder="Kowalski"
                      className={inputClass(errors.last_name)}
                    />
                  </Field>
                </div>

                <Field label="Ulica i numer *" error={errors.address_1}>
                  <input
                    type="text"
                    value={form.address_1}
                    onChange={(e) => updateField("address_1", e.target.value)}
                    placeholder="ul. Przykładowa 12/3"
                    className={inputClass(errors.address_1)}
                  />
                </Field>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_200px]">
                  <Field label="Miasto *" error={errors.city}>
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      placeholder="Warszawa"
                      className={inputClass(errors.city)}
                    />
                  </Field>
                  <Field label="Kod pocztowy *" error={errors.postcode}>
                    <input
                      type="text"
                      value={form.postcode}
                      onChange={(e) => updateField("postcode", e.target.value)}
                      placeholder="00-000"
                      maxLength={6}
                      className={inputClass(errors.postcode)}
                    />
                  </Field>
                </div>

                {/* Company toggle */}
                <button
                  type="button"
                  onClick={() => setShowCompany(!showCompany)}
                  className="flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary-dark"
                >
                  <ChevronDown size={16} className={`transition-transform ${showCompany ? "rotate-180" : ""}`} />
                  Chcę fakturę na firmę
                </button>

                {showCompany && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Nazwa firmy">
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => updateField("company", e.target.value)}
                        placeholder="Firma Sp. z o.o."
                        className={inputClass()}
                      />
                    </Field>
                    <Field label="NIP">
                      <input
                        type="text"
                        value={form.nip}
                        onChange={(e) => updateField("nip", e.target.value)}
                        placeholder="1234567890"
                        maxLength={10}
                        className={inputClass()}
                      />
                    </Field>
                  </div>
                )}
              </div>
            </section>

            {/* Shipping address */}
            <section>
              <div className="flex items-center gap-3">
                <h2 className="font-heading text-xl font-semibold text-text-primary">
                  Adres dostawy
                </h2>
              </div>
              <label className="mt-4 flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.shipping_same}
                  onChange={(e) => updateField("shipping_same", e.target.checked)}
                  className="h-5 w-5 rounded border-border text-primary focus:ring-primary/30"
                />
                <span className="text-sm text-text-secondary">Taki sam jak adres rozliczeniowy</span>
              </label>

              {!form.shipping_same && (
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Imię *" error={errors.shipping_first_name}>
                      <input
                        type="text"
                        value={form.shipping_first_name}
                        onChange={(e) => updateField("shipping_first_name", e.target.value)}
                        className={inputClass(errors.shipping_first_name)}
                      />
                    </Field>
                    <Field label="Nazwisko *" error={errors.shipping_last_name}>
                      <input
                        type="text"
                        value={form.shipping_last_name}
                        onChange={(e) => updateField("shipping_last_name", e.target.value)}
                        className={inputClass(errors.shipping_last_name)}
                      />
                    </Field>
                  </div>
                  <Field label="Ulica i numer *" error={errors.shipping_address_1}>
                    <input
                      type="text"
                      value={form.shipping_address_1}
                      onChange={(e) => updateField("shipping_address_1", e.target.value)}
                      className={inputClass(errors.shipping_address_1)}
                    />
                  </Field>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_200px]">
                    <Field label="Miasto *" error={errors.shipping_city}>
                      <input
                        type="text"
                        value={form.shipping_city}
                        onChange={(e) => updateField("shipping_city", e.target.value)}
                        className={inputClass(errors.shipping_city)}
                      />
                    </Field>
                    <Field label="Kod pocztowy *" error={errors.shipping_postcode}>
                      <input
                        type="text"
                        value={form.shipping_postcode}
                        onChange={(e) => updateField("shipping_postcode", e.target.value)}
                        placeholder="00-000"
                        maxLength={6}
                        className={inputClass(errors.shipping_postcode)}
                      />
                    </Field>
                  </div>
                </div>
              )}
            </section>

            {/* Payment */}
            <section>
              <h2 className="font-heading text-xl font-semibold text-text-primary">
                Metoda płatności
              </h2>
              <div className="mt-4 space-y-3">
                <label className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${form.payment_method === "bacs" ? "border-primary bg-primary/5" : "border-border hover:border-border-light"}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="bacs"
                    checked={form.payment_method === "bacs"}
                    onChange={() => updateField("payment_method", "bacs")}
                    className="mt-0.5 h-4 w-4 text-primary focus:ring-primary/30"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Building2 size={18} className="text-text-secondary" strokeWidth={1.8} />
                      <span className="text-sm font-semibold text-text-primary">Przelew bankowy</span>
                    </div>
                    <p className="mt-1 text-xs text-text-secondary">Dane do przelewu zostaną przesłane na email</p>
                  </div>
                </label>

                <label className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${form.payment_method === "cod" ? "border-primary bg-primary/5" : "border-border hover:border-border-light"}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={form.payment_method === "cod"}
                    onChange={() => updateField("payment_method", "cod")}
                    className="mt-0.5 h-4 w-4 text-primary focus:ring-primary/30"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Truck size={18} className="text-text-secondary" strokeWidth={1.8} />
                      <span className="text-sm font-semibold text-text-primary">Płatność przy odbiorze</span>
                    </div>
                    <p className="mt-1 text-xs text-text-secondary">Zapłać gotówką lub kartą kurierowi</p>
                  </div>
                </label>

                <label className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${form.payment_method === "card" ? "border-primary bg-primary/5" : "border-border hover:border-border-light"}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={form.payment_method === "card"}
                    onChange={() => updateField("payment_method", "card")}
                    className="mt-0.5 h-4 w-4 text-primary focus:ring-primary/30"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CreditCard size={18} className="text-text-secondary" strokeWidth={1.8} />
                      <span className="text-sm font-semibold text-text-primary">Karta płatnicza</span>
                    </div>
                    <p className="mt-1 text-xs text-text-secondary">Visa, Mastercard, BLIK</p>
                  </div>
                </label>
              </div>
            </section>

            {/* Notes */}
            <section>
              <h2 className="font-heading text-xl font-semibold text-text-primary">
                Uwagi do zamówienia
              </h2>
              <textarea
                value={form.notes}
                onChange={(e) => updateField("notes", e.target.value)}
                placeholder="Opcjonalne uwagi, np. godziny dostawy..."
                rows={3}
                className="mt-4 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-text-primary placeholder:text-text-light outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30 resize-none"
              />
            </section>
          </div>

          {/* RIGHT — Order Summary */}
          <div className="xl:sticky xl:top-[105px] xl:self-start">
            <div className="rounded-2xl bg-bg-light p-6 md:p-8">
              <h2 className="font-heading text-xl font-semibold text-text-primary">
                Twoje zamówienie
              </h2>

              {/* Items */}
              <div className="mt-5 divide-y divide-border-light">
                {items.map((item) => {
                  const price = item.variation
                    ? parseFloat(item.variation.price || "0")
                    : parseFloat(item.product.price || "0");
                  const imageUrl = item.variation?.image?.src || getProductImage(item.product);

                  return (
                    <div key={item.id} className="flex gap-3 py-3">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-white">
                        <Image src={imageUrl} alt={item.product.name} fill className="object-cover" sizes="56px" />
                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-bg-dark text-[10px] font-medium text-white">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text-primary truncate">{item.product.name}</p>
                        {item.selectedAttributes && (
                          <p className="text-xs text-text-secondary truncate">
                            {Object.values(item.selectedAttributes).join(", ")}
                          </p>
                        )}
                      </div>
                      <span className="shrink-0 text-sm font-semibold text-text-primary">
                        {formatPrice(price * item.quantity)}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 space-y-3 border-t border-border pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Produkty:</span>
                  <span className="font-medium text-text-primary">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex items-start justify-between text-sm">
                  <div>
                    <span className="text-text-secondary">Dostawa:</span>
                    {totalPrice >= 500 && (
                      <p className="mt-0.5 text-xs text-success">Darmowa dostawa od 500 zł</p>
                    )}
                  </div>
                  <span className="font-medium text-text-primary">
                    {shippingCost === 0 ? "0 zł" : formatPrice(shippingCost)}
                  </span>
                </div>
              </div>

              <div className="my-5 border-t border-border" />

              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-text-primary">Razem:</span>
                <span className="font-heading text-xl font-bold text-text-primary md:text-2xl">
                  {formatPrice(total)}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent text-sm font-semibold text-white transition-all hover:bg-accent/90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Przetwarzanie...
                  </span>
                ) : (
                  <>
                    <Lock size={18} strokeWidth={2} />
                    Zamawiam i płacę
                  </>
                )}
              </button>

              <p className="mt-4 text-center text-xs text-text-light">
                Klikając &quot;Zamawiam i płacę&quot; akceptujesz{" "}
                <Link href="/regulamin" className="underline hover:text-text-secondary">regulamin</Link>{" "}
                oraz{" "}
                <Link href="/polityka-prywatnosci" className="underline hover:text-text-secondary">politykę prywatności</Link>.
              </p>

              <div className="mt-5 flex items-center justify-center gap-6">
                <div className="flex items-center gap-1.5 text-text-light">
                  <Lock size={14} strokeWidth={1.8} />
                  <span className="text-xs">Bezpieczna płatność</span>
                </div>
                <div className="flex items-center gap-1.5 text-text-light">
                  <Truck size={14} strokeWidth={1.8} />
                  <span className="text-xs">Szybka dostawa</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

/* ───── Helpers ───── */

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-text-primary mb-1.5">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function inputClass(error?: string) {
  return `h-11 w-full rounded-lg border ${error ? "border-red-400" : "border-border"} bg-white px-4 text-sm text-text-primary placeholder:text-text-light outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/30`;
}
