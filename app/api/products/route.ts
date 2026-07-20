import { NextRequest, NextResponse } from "next/server";
import { catalogProducts } from "@/lib/catalog";

export async function GET(request: NextRequest) {
  const categoryId = request.nextUrl.searchParams.get("category");
  const products = categoryId ? catalogProducts.filter((product) => product.categoryId === categoryId) : catalogProducts;

  return NextResponse.json(products);
}
