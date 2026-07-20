import { NextResponse } from "next/server";
import { catalogCategories } from "@/lib/catalog";

export async function GET() {
  return NextResponse.json(catalogCategories);
}
