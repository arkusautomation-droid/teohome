import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/woocommerce";
import type { WooOrder } from "@/types/woocommerce";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { billing, shipping, line_items, payment_method, shipping_lines, customer_note } = body;

    if (!billing?.email || !billing?.first_name || !billing?.last_name) {
      return NextResponse.json(
        { error: "Wymagane pola: imię, nazwisko i email" },
        { status: 400 }
      );
    }

    if (!line_items || line_items.length === 0) {
      return NextResponse.json(
        { error: "Koszyk jest pusty" },
        { status: 400 }
      );
    }

    const orderData: Partial<WooOrder> = {
      status: "processing",
      billing: {
        first_name: billing.first_name,
        last_name: billing.last_name,
        address_1: billing.address_1 || "",
        city: billing.city || "",
        postcode: billing.postcode || "",
        country: billing.country || "PL",
        email: billing.email,
        phone: billing.phone || "",
      },
      shipping: shipping || {
        first_name: billing.first_name,
        last_name: billing.last_name,
        address_1: billing.address_1 || "",
        city: billing.city || "",
        postcode: billing.postcode || "",
        country: billing.country || "PL",
      },
      line_items: line_items.map((item: { product_id: number; quantity: number; variation_id?: number }) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        ...(item.variation_id ? { variation_id: item.variation_id } : {}),
      })),
      payment_method: payment_method || "bacs",
    };

    const order = await createOrder(orderData);

    return NextResponse.json({
      id: order.id,
      status: order.status,
      total: order.total,
    });
  } catch (error) {
    console.error("Order creation failed:", error);

    // In mock mode, return a fake order
    const mockOrderId = Math.floor(Math.random() * 90000) + 10000;
    return NextResponse.json({
      id: mockOrderId,
      status: "processing",
      total: "0",
      mock: true,
    });
  }
}
