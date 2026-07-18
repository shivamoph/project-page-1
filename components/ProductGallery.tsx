"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, Share2 } from "lucide-react";
import { useState } from "react";
import { productImages } from "@/lib/product";

export function ProductGallery() {
  const [active, setActive] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const next = () => setActive((value) => (value + 1) % productImages.length);
  const prev = () => setActive((value) => (value - 1 + productImages.length) % productImages.length);

  return (
    <aside className="lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
      <div className="relative h-full rounded-2xl bg-white p-4 shadow-premium">
        <div className="absolute right-5 top-5 z-10 flex gap-2">
          <button aria-label="Share product" className="rounded-full bg-white/90 p-3 text-slate-700 shadow-sm transition hover:scale-105">
            <Share2 size={18} />
          </button>
          <button aria-label="Add to wishlist" className="rounded-full bg-white/90 p-3 text-slate-700 shadow-sm transition hover:scale-105 hover:text-rose-500">
            <Heart size={18} />
          </button>
        </div>

        <div className="flex h-full flex-col gap-4 md:flex-row lg:flex-col xl:flex-row">
          <div className="order-2 flex gap-3 overflow-x-auto md:order-1 md:w-20 md:flex-col lg:w-full lg:flex-row xl:w-20 xl:flex-col">
            {productImages.map((image, index) => (
              <button
                key={image}
                aria-label={`View image ${index + 1}`}
                onClick={() => setActive(index)}
                className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border transition ${
                  active === index ? "border-indigo-500 ring-4 ring-indigo-100" : "border-slate-200"
                }`}
              >
                <Image src={image} alt="" fill sizes="64px" className="object-cover" />
              </button>
            ))}
          </div>

          <div
            className="group relative order-1 min-h-[420px] flex-1 overflow-hidden rounded-2xl bg-slate-50 md:order-2"
            onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
            onTouchEnd={(event) => {
              if (touchStart === null) return;
              const delta = touchStart - event.changedTouches[0].clientX;
              if (Math.abs(delta) > 40) delta > 0 ? next() : prev();
              setTouchStart(null);
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={productImages[active]}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.28 }}
                className="absolute inset-0"
              >
                <Image
                  src={productImages[active]}
                  alt="Auralux Runner Pro product view"
                  fill
                  priority={active === 0}
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
              </motion.div>
            </AnimatePresence>
            <button aria-label="Previous image" onClick={prev} className="absolute left-4 top-1/2 rounded-full bg-white/90 p-3 shadow-sm transition hover:scale-105">
              <ChevronLeft size={20} />
            </button>
            <button aria-label="Next image" onClick={next} className="absolute right-4 top-1/2 rounded-full bg-white/90 p-3 shadow-sm transition hover:scale-105">
              <ChevronRight size={20} />
            </button>
            <div className="absolute bottom-4 left-4 rounded-full bg-slate-900/80 px-3 py-1 text-sm font-medium text-white">
              {active + 1} / {productImages.length}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
