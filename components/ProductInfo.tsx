"use client";

import { motion } from "framer-motion";
import { Check, CircleDollarSign, PackageCheck, RotateCcw, Shield, Star, Truck } from "lucide-react";
import { useState } from "react";
import { FAQ } from "./FAQ";
import { OfferCard } from "./OfferCard";
import { SpecificationTable } from "./SpecificationTable";

const colors = ["Slate", "Indigo", "Emerald", "White"];
const sizes = ["US 7", "US 8", "US 9", "US 10", "US 11"];

export function ProductInfo() {
  const [color, setColor] = useState("Indigo");
  const [size, setSize] = useState("US 9");
  const [qty, setQty] = useState(1);

  return (
    <main className="min-h-0 lg:h-[calc(100vh-3rem)] lg:overflow-y-auto lg:scroll-smooth lg:pr-2" aria-label="Product information">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-white p-6 shadow-premium">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">Auralux Atelier</p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-slate-900">Auralux Runner Pro Indigo Emerald Edition</h1>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-sm font-bold text-white">
            4.8 <Star size={14} fill="currentColor" />
          </span>
          <span className="text-sm text-slate-500">2,416 reviews</span>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-600">In stock</span>
          <span className="text-sm text-slate-400">SKU: ALX-RP-IND-09</span>
        </div>

        <div className="mt-6 flex flex-wrap items-end gap-3">
          <strong className="text-4xl text-slate-900">$189</strong>
          <span className="pb-1 text-lg text-slate-400 line-through">$249</span>
          <span className="mb-1 rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-700">Save 24%</span>
        </div>
        <p className="mt-2 text-sm text-slate-500">Inclusive of all taxes. Free express shipping on prepaid orders.</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {["Breathable knit upper", "Responsive all-day cushioning", "City grip outsole", "12-month warranty"].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 text-sm font-medium text-slate-700">
              <Check className="text-emerald-500" size={17} /> {item}
            </div>
          ))}
        </div>
      </motion.div>

      <InfoCard title="Choose Your Finish">
        <div className="flex flex-wrap gap-3">
          {colors.map((item) => (
            <button
              key={item}
              onClick={() => setColor(item)}
              className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                color === item ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-slate-200 bg-white text-slate-600 hover:border-indigo-200"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </InfoCard>

      <InfoCard title="Size & Quantity">
        <div className="flex flex-wrap gap-3">
          {sizes.map((item) => (
            <button key={item} onClick={() => setSize(item)} className={`rounded-2xl px-4 py-3 text-sm font-bold ${size === item ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}>
              {item}
            </button>
          ))}
        </div>
        <div className="mt-4 inline-flex items-center gap-4 rounded-2xl bg-slate-50 p-2">
          <button aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))} className="h-10 w-10 rounded-xl bg-white shadow-sm">-</button>
          <span className="w-8 text-center font-bold">{qty}</span>
          <button aria-label="Increase quantity" onClick={() => setQty(qty + 1)} className="h-10 w-10 rounded-xl bg-white shadow-sm">+</button>
        </div>
      </InfoCard>

      <InfoCard title="Delivery, Offers & Protection">
        <div className="grid gap-3 sm:grid-cols-2">
          <DeliveryCard icon={<Truck size={18} />} title="Estimated delivery" text="Tomorrow to 3 business days with carbon-aware routing." />
          <DeliveryCard icon={<CircleDollarSign size={18} />} title="EMI available" text="No-cost EMI from $31.50 per month with partner banks." />
          <DeliveryCard icon={<Shield size={18} />} title="Warranty" text="12 months against manufacturing defects." />
          <DeliveryCard icon={<RotateCcw size={18} />} title="Returns" text="30-day easy returns on unused products." />
        </div>
        <div className="mt-4 grid gap-3">
          <OfferCard title="Bank offer" text="10% instant discount with select premium credit cards." />
          <OfferCard title="Bundle coupon" text="Buy socks or cleaner with this pair and save an extra 15%." />
        </div>
      </InfoCard>

      <InfoCard title="Seller Information">
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <PackageCheck className="text-emerald-500" />
            <div>
              <h3 className="font-semibold text-slate-900">Sold by Auralux Direct</h3>
              <p className="text-sm text-slate-500">98% positive rating, premium packaging, invoice included.</p>
            </div>
          </div>
        </div>
      </InfoCard>

      <InfoCard title="About Product">
        <p className="leading-7 text-slate-600">
          Built for people who move between offices, airports, workouts, and late dinners, Runner Pro balances a sculpted profile with quiet technical comfort. The palette blends slate structure, indigo depth, and emerald detailing for a polished everyday sneaker.
        </p>
      </InfoCard>

      <InfoCard title="Specifications">
        <SpecificationTable />
      </InfoCard>

      <InfoCard title="Package Contents">
        <ul className="grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
          {["One pair of sneakers", "Two lace colors", "Organic cotton dust bag", "Care guide", "Warranty card", "Recyclable premium box"].map((item) => (
            <li key={item} className="rounded-xl bg-slate-50 p-3">{item}</li>
          ))}
        </ul>
      </InfoCard>

      <InfoCard title="FAQs">
        <FAQ />
      </InfoCard>

      <InfoCard title="Customer Reviews">
        <div className="space-y-3">
          {["Feels premium from the first wear.", "Clean design, excellent grip, and surprisingly light.", "The emerald detail looks better in person."].map((review) => (
            <div key={review} className="rounded-2xl bg-slate-50 p-4">
              <div className="flex text-amber-400">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={15} fill="currentColor" />)}</div>
              <p className="mt-2 text-sm text-slate-600">{review}</p>
            </div>
          ))}
        </div>
      </InfoCard>

      <InfoCard title="Related Information">
        <p className="leading-7 text-slate-600">Pairs well with neutral tailoring, active commute kits, and lightweight travel wardrobes. For best comfort, rotate with another pair every other day.</p>
      </InfoCard>
    </main>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.section initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-5 rounded-2xl bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-slate-900">{title}</h2>
      {children}
    </motion.section>
  );
}

function DeliveryCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="text-emerald-500">{icon}</div>
      <h3 className="mt-3 font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm leading-6 text-slate-500">{text}</p>
    </div>
  );
}
