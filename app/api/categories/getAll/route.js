import { getAllCategories } from "@/app/db/categories/GetAllCategories";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await getAllCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
