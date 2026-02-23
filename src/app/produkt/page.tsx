import { redirect } from "next/navigation";

// Old static product page - redirect to category or home
export default function OldProductPage() {
  redirect("/kategoria");
}
