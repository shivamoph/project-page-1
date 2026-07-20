"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { PackageOpen, ShoppingCart, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { CatalogProduct, Category } from "@/lib/catalog";

export function CategoryBrowser() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [isCategoryLoading, setIsCategoryLoading] = useState(true);
  const [isProductLoading, setIsProductLoading] = useState(false);

  useEffect(() => {
    let isActive = true;

    async function loadCategories() {
      setIsCategoryLoading(true);
      const response = await fetch("/api/categories");
      const data = (await response.json()) as Category[];

      if (!isActive) return;
      setCategories(data);
      setSelectedCategory(data[0]?.id ?? "");
      setIsCategoryLoading(false);
    }

    loadCategories();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;
    let isActive = true;

    async function loadProducts() {
      setIsProductLoading(true);
      const [response] = await Promise.all([
        fetch(`/api/products?category=${encodeURIComponent(selectedCategory)}`),
        new Promise((resolve) => setTimeout(resolve, 320))
      ]);
      const data = (await response.json()) as CatalogProduct[];

      if (!isActive) return;
      setProducts(data);
      setIsProductLoading(false);
    }

    loadProducts();

    return () => {
      isActive = false;
    };
  }, [selectedCategory]);

  const selectedName = useMemo(
    () => categories.find((category) => category.id === selectedCategory)?.name ?? "Products",
    [categories, selectedCategory]
  );

  return (
    <section id="all-categories" className="mt-7 rounded-lg bg-white shadow-sm">
      <div className="border-b border-slate-200 px-4 py-4">
        <p className="text-xs font-bold uppercase tracking-wide text-[#f04b16]">Dynamic category browsing</p>
        <h2 className="mt-1 text-xl font-black text-[#062a4f]">Shop by Category</h2>
      </div>

      <div className="grid min-h-[520px] grid-cols-1 md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="border-b border-slate-200 md:border-b-0 md:border-r">
          <div className="flex gap-2 overflow-x-auto p-3 md:block md:space-y-1 md:overflow-visible">
            {isCategoryLoading
              ? Array.from({ length: 7 }).map((_, index) => <CategorySkeleton key={index} />)
              : categories.map((category) => {
                  const isSelected = category.id === selectedCategory;

                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`min-w-max rounded-md border px-4 py-3 text-left text-sm font-semibold transition md:flex md:w-full md:min-w-0 md:items-center md:justify-between md:border-0 ${
                        isSelected
                          ? "bg-orange-50 text-[#f04b16] ring-1 ring-orange-200 md:border-r-4 md:border-r-[#f04b16] md:ring-0"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-[#f04b16]"
                      }`}
                    >
                      <span>{category.name}</span>
                      {isSelected && <span className="hidden text-[#f04b16] md:inline">✓</span>}
                    </button>
                  );
                })}
          </div>
        </aside>

        <div className="min-w-0 bg-[#f6f7f9] p-4">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <h3 className="text-lg font-black text-slate-900">{selectedName}</h3>
              <p className="text-sm text-slate-500">Products update instantly without page refresh.</p>
            </div>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600 shadow-sm">
              {isProductLoading ? "Loading..." : `${products.length} products`}
            </span>
          </div>

          <AnimatePresence mode="wait">
            {isProductLoading ? (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
              >
                {Array.from({ length: 8 }).map((_, index) => <ProductSkeleton key={index} />)}
              </motion.div>
            ) : products.length === 0 ? (
              <EmptyState key="empty" />
            ) : (
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.22 }}
                className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
              >
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: CatalogProduct }) {
  return (
    <Link href={`/products/${product.id}`} className="flex min-h-[330px] flex-col overflow-hidden rounded-md bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative h-36 border-b border-slate-100 bg-white">
        <Image src={product.image} alt={product.name} fill sizes="(min-width: 1280px) 220px, 45vw" className="object-contain p-4" />
        <span className="absolute left-3 top-3 rounded-sm bg-[#f04b16] px-2 py-1 text-xs font-black text-white">
          {product.discount}% OFF
        </span>
      </div>
      <div className="flex flex-1 flex-col p-3">
        <p className="text-xs font-bold uppercase text-slate-400">{product.brand}</p>
        <h4 className="product-title-clamp mt-1 text-sm font-semibold leading-5 text-slate-900">{product.name}</h4>
        <div className="mt-3 flex items-center gap-1 text-sm">
          <span className="flex items-center gap-1 rounded bg-emerald-600 px-2 py-1 text-xs font-bold text-white">
            {product.rating} <Star size={12} fill="currentColor" />
          </span>
          <span className="text-xs text-slate-500">Verified rating</span>
        </div>
        <strong className="mt-3 text-xl text-slate-950">₹{product.price.toLocaleString("en-IN")}</strong>
        <span className="mt-auto flex items-center justify-center gap-2 rounded-sm bg-[#f04b16] px-3 py-3 text-sm font-black text-white transition hover:bg-[#d93d0f]">
          <ShoppingCart size={16} /> Add to Cart
        </span>
      </div>
    </Link>
  );
}

function EmptyState() {
  return (
    <motion.div
      key="empty"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="grid min-h-[360px] place-items-center rounded-lg border border-dashed border-orange-200 bg-white p-8 text-center"
    >
      <div>
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-orange-50 text-[#f04b16]">
          <PackageOpen size={36} />
        </div>
        <h3 className="mt-5 text-2xl font-black text-slate-900">No products available</h3>
        <p className="mt-2 max-w-md text-sm text-slate-500">This category is ready for new stock. Try another category from the list.</p>
      </div>
    </motion.div>
  );
}

function CategorySkeleton() {
  return <div className="h-11 min-w-32 animate-pulse rounded-md bg-slate-100 md:w-full" />;
}

function ProductSkeleton() {
  return (
    <div className="min-h-[330px] rounded-md bg-white p-3 shadow-sm">
      <div className="h-36 animate-pulse rounded bg-slate-100" />
      <div className="mt-4 h-3 w-20 animate-pulse rounded bg-slate-100" />
      <div className="mt-3 h-4 animate-pulse rounded bg-slate-100" />
      <div className="mt-2 h-4 w-2/3 animate-pulse rounded bg-slate-100" />
      <div className="mt-5 h-8 w-24 animate-pulse rounded bg-slate-100" />
      <div className="mt-10 h-11 animate-pulse rounded bg-slate-100" />
    </div>
  );
}
