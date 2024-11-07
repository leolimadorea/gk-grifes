import { checkPaymentStatus } from "@/app/db/payment/checkPaymentStatus";
import { NextResponse } from "next/server";

export async function GET({ params }) {
  try {
    const { paymentId } = params;
    console.log("CHECK PAYMENT STATUS", paymentId);
    const payment = await checkPaymentStatus(paymentId);

    return NextResponse.json(payment, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
