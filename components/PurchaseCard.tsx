"use client";

import { motion } from "framer-motion";
import { Heart, LockKeyhole, MapPin, Minus, Plus, ShieldCheck, ShoppingBag, Truck, UserRoundCheck } from "lucide-react";
import { useState } from "react";

export function PurchaseCard() {
  const [qty, setQty] = useState(1);

  return (
    <aside className="lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)]">
      <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl bg-white p-5 shadow-premium">
        <p className="text-sm text-slate-500">Premium price</p>
        <div className="mt-1 flex items-end gap-2">
          <strong className="text-3xl text-slate-900">$189</strong>
          <span className="pb-1 text-sm text-slate-400 line-through">$249</span>
          <span className="mb-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-600">24% OFF</span>
        </div>

        <div className="mt-5 flex items-center justify-between rounded-2xl bg-slate-50 p-2">
          <span className="pl-2 text-sm font-semibold text-slate-700">Quantity</span>
          <div className="flex items-center gap-2">
            <button aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))} className="rounded-xl bg-white p-2 shadow-sm">
              <Minus size={16} />
            </button>
            <span className="w-8 text-center font-semibold">{qty}</span>
            <button aria-label="Increase quantity" onClick={() => setQty(qty + 1)} className="rounded-xl bg-white p-2 shadow-sm">
              <Plus size={16} />
            </button>
          </div>
        </div>

        <div className="mt-5 grid gap-3">
          <button className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-500 px-5 py-4 font-bold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5">
            <ShoppingBag size={18} /> Add to Cart
          </button>
          <button className="rounded-2xl bg-slate-900 px-5 py-4 font-bold text-white transition hover:-translate-y-0.5">Buy Now</button>
          <button className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:border-indigo-200 hover:text-indigo-600">
            <Heart size={18} /> Wishlist
          </button>
        </div>

        <div className="mt-5 rounded-2xl border border-slate-200 p-3">
          <label htmlFor="pin" className="text-sm font-semibold text-slate-800">Delivery pincode</label>
          <div className="mt-2 flex overflow-hidden rounded-xl border border-slate-200">
            <span className="grid place-items-center px-3 text-emerald-500"><MapPin size={17} /></span>
            <input id="pin" inputMode="numeric" placeholder="Enter pincode" className="min-w-0 flex-1 py-3 text-sm outline-none" />
            <button className="px-3 text-sm font-bold text-indigo-600">Check</button>
          </div>
        </div>

        <div className="mt-5 space-y-3 text-sm text-slate-600">
          {[
            [ShieldCheck, "Secure payment badge"],
            [Truck, "30-day return policy"],
            [UserRoundCheck, "Verified seller badge"],
            [LockKeyhole, "Priority customer support"]
          ].map(([Icon, text]) => (
            <div key={text as string} className="flex items-center gap-3">
              <Icon className="text-emerald-500" size={18} />
              <span>{text as string}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </aside>
  );
}
