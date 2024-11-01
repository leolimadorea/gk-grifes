import { createPayment } from "@/app/db/payment/createPayment";
import { NextResponse } from "next/server";

export async function POST(request) {
  const input = await request.json();

  try {
    const payment = await createPayment(input);
    return NextResponse.json(payment, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/payments:", error);
    return NextResponse.json(
      { error: "Failed to create payment" },
      { status: 500 }
    );
  }
}
