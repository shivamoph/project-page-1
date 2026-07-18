"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { products } from "@/lib/product";

export function RelatedProducts({ title = "Related Products" }: { title?: string }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {products.map((product) => (
        <motion.article
          key={`${title}-${product.id}`}
          whileHover={{ y: -6, scale: 1.01 }}
          className="min-w-[240px] rounded-2xl bg-white p-4 shadow-sm transition"
        >
          <div className="relative h-44 overflow-hidden rounded-2xl bg-slate-50">
            <Image src={product.image} alt={product.name} fill sizes="240px" className="object-cover" loading="lazy" />
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-indigo-600">{product.tag}</span>
          </div>
          <h3 className="mt-4 font-semibold text-slate-900">{product.name}</h3>
          <p className="mt-1 text-sm text-slate-500">Premium everyday comfort</p>
          <div className="mt-4 flex items-center justify-between">
            <strong className="text-lg text-slate-900">${product.price}</strong>
            <button aria-label={`Add ${product.name} to cart`} className="rounded-xl bg-slate-900 p-3 text-white">
              <ShoppingCart size={16} />
            </button>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
