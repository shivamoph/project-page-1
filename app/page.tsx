import Image from "next/image";
import {
  BadgeHelp,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  CreditCard,
  Headphones,
  HeartHandshake,
  PackageCheck,
  Search,
  ShoppingCart,
  Star,
  Truck
} from "lucide-react";
import { CategoryBrowser } from "@/components/CategoryBrowser";

const products = [
  ["Toner Cartridge Black Compatible", "Ships within 24 hrs", "Pack of 1 piece", 412, 14, "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=500&q=80"],
  ["Black PVC Insulation Tape", "Ships within 10 days", "Pack of 30 piece", 152, 20, "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80"],
  ["Cotton Knitted Safety Gloves", "Ships within 24 hrs", "Pack of 24 pair", 156, 17, "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80"],
  ["Permanent Gold Marker", "Ships within 24 hrs", "Pack of 10 piece", 149, 1, "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=500&q=80"],
  ["Heavy Duty Silicone Spray", "Ships within 24 hrs", "Pack of 1 piece", 317, 6, "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=500&q=80"],
  ["Self Locking Nylon Cable Ties", "Ships within 24 hrs", "Pack of 1000 piece", 150, 32, "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=500&q=80"],
  ["Blended Polyester Coverall", "Ships within 24 hrs", "Pack of 1 piece", 314, 8, "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=500&q=80"],
  ["Classic Use Ball Pens Blue", "Ships within 24 hrs", "Pack of 40 piece", 110, 20, "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?auto=format&fit=crop&w=500&q=80"]
] as const;

const sections = ["Deal of the Day", "Recommended For You", "Best Sellers", "Similar Products", "Trending Products"];

export default function Home() {
  return (
    <div className="h-screen overflow-hidden bg-[#eef1f5] text-slate-900">
      <header className="flex h-16 items-center gap-4 border-b border-slate-200 bg-white px-5 shadow-sm">
        <div className="flex shrink-0 items-center gap-2 text-2xl font-bold">
          <span>Industry</span>
          <span className="text-[#f04b16]">buying</span>
        </div>
        <div className="hidden rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-4 py-2 text-center text-xs font-extrabold uppercase leading-tight text-white lg:block">
          Daily essentials<br />special deals
        </div>
        <form className="flex min-w-0 flex-1 overflow-hidden rounded border border-slate-300 bg-white">
          <input className="min-w-0 flex-1 px-4 text-sm outline-none" placeholder="Search Products by title, sku, category, brand etc.." />
          <button className="grid w-14 place-items-center bg-[#f04b16] text-white" aria-label="Search">
            <Search size={22} />
          </button>
        </form>
        <HeaderAction icon={<ClipboardList size={24} />} label="Smart Quotation" />
        <HeaderAction icon={<CreditCard size={25} />} label="Buy On Credit" />
        <button className="hidden items-center gap-2 rounded-full bg-[#f04b16] px-4 py-3 text-sm font-bold text-white xl:flex">
          <BadgeHelp size={19} /> Help Center
        </button>
        <button className="rounded border border-slate-900 px-8 py-3 text-sm">Login</button>
        <button className="relative text-slate-800" aria-label="Cart">
          <ShoppingCart size={28} />
          <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-red-600 text-xs font-bold text-white">1</span>
        </button>
      </header>

      <div className="h-[calc(100vh-4rem)] p-4">
        <main className="mx-auto h-full max-w-[1480px] overflow-y-auto pr-2">
          <section className="grid gap-3">
            <div className="relative min-h-[292px] overflow-hidden rounded-sm bg-[#083854]">
              <Image src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=1800&q=85" alt="Office supplies offer" fill priority className="object-cover opacity-75" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/20 via-slate-950/5 to-slate-950/70" />
              <div className="absolute right-10 top-12 max-w-md text-white">
                <p className="text-2xl font-semibold">Upgrade Your Office Supplies Today</p>
                <h1 className="mt-8 text-5xl font-light">FLAT <span className="font-black text-amber-300">₹300</span> OFF</h1>
                <p className="mt-4 inline-block rounded-full border border-white/60 px-5 py-2 text-lg font-bold">USE CODE: GET300</p>
              </div>
              <span className="absolute right-8 top-5 bg-amber-400 px-3 py-2 text-2xl font-black text-slate-950">24 HOURS<br /><span className="text-lg">SHIPPING</span></span>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <Promo title="Unbeatable Prices" text="Restock Today! Shipping Within 24 Hr" />
              <Promo title="Procurement made easy" text="Zero interest. Repay in 30 days." />
            </div>
          </section>

          <CategoryBrowser />

          {sections.map((section) => (
            <ProductSection key={section} title={section} />
          ))}

          <Footer />
        </main>
      </div>

      <div className="fixed bottom-6 right-5 flex items-center gap-3">
        <div className="rounded-lg bg-white px-5 py-3 text-sm shadow-lg">
          <b>Hi! I&apos;m IB Assist</b>
          <p className="text-slate-500">How can we help you?</p>
        </div>
        <button className="grid h-14 w-14 place-items-center rounded-full bg-[#ff4b26] text-white shadow-lg" aria-label="Chat support">
          <BadgeHelp />
        </button>
      </div>
    </div>
  );
}

function HeaderAction({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="hidden items-center gap-2 text-sm text-slate-900 lg:flex">
      {icon}
      <span>{label}</span>
    </div>
  );
}

function Promo({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex min-h-40 items-center justify-end bg-gradient-to-r from-cyan-200 via-teal-300 to-emerald-300 px-8 text-right">
      <div>
        <h2 className="text-2xl font-black">{title}</h2>
        <p className="mt-2 font-semibold">{text}</p>
        <button className="mt-5 rounded-full bg-slate-900 px-8 py-3 text-sm font-bold text-white">Shop Now</button>
      </div>
    </div>
  );
}

function ProductSection({ title, id }: { title: string; id?: string }) {
  return (
    <section id={id} className="mt-7">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-black uppercase text-[#062a4f]">{title}</h2>
        <div className="flex gap-2">
          <button className="grid h-9 w-9 place-items-center rounded border border-slate-200 bg-white" aria-label={`Previous ${title}`}>
            <ChevronLeft size={18} />
          </button>
          <button className="grid h-9 w-9 place-items-center rounded border border-slate-200 bg-white" aria-label={`Next ${title}`}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {products.map(([name, shipping, pack, price, rating, image]) => (
          <article key={`${title}-${name}`} className="flex min-h-[292px] w-[154px] shrink-0 flex-col overflow-hidden rounded-md bg-white shadow-sm sm:w-[174px]">
            <div className="bg-red-50 px-2 py-1 text-[11px] text-red-700">
              <Truck className="mr-1 inline" size={12} /> {shipping}
            </div>
            <div className="relative h-28 bg-white">
              <Image src={image} alt={name} fill sizes="180px" className="object-contain p-3" />
            </div>
            <div className="flex flex-1 flex-col px-2">
              <h3 className="product-title-clamp text-sm font-medium leading-5">{name}</h3>
              <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                <span className="flex text-amber-400">{Array.from({ length: 5 }).map((_, index) => <Star key={index} size={11} fill="currentColor" />)}</span>
                {rating}
              </div>
              <p className="mt-2 text-sm text-slate-600">{pack}</p>
              <strong className="mt-2 text-sm">₹{price}</strong>
              <button className="mt-auto -mx-2 bg-[#f04b16] py-3 text-sm font-bold text-white">Add to Cart</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  const guarantees = [
    [Headphones, "Helpline Number", "Call: +91 9650660070"],
    [PackageCheck, "Return within 7 days", "of receiving your order"],
    [CreditCard, "100% Safe & Secure Payments", "Pay using secure payment methods"],
    [CheckCircle2, "100% Original", "guarantee for all products"],
    [BriefcaseBusiness, "Complete products", "20,00,000+ products from 12,000+ brands"],
    [HeartHandshake, "Buyer Protection", "Committed to buyer interests"]
  ] as const;

  return (
    <footer className="mt-8">
      <div className="grid gap-6 bg-[#173654] p-7 text-white md:grid-cols-3">
        {guarantees.map(([Icon, title, text]) => (
          <div key={title} className="flex gap-4">
            <Icon size={38} />
            <div>
              <h3 className="font-black">{title}</h3>
              <p className="text-sm">{text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="grid gap-8 bg-lime-50 p-7 md:grid-cols-[1fr_1fr_1fr_1.4fr]">
        {["Company", "Sister Site", "Help"].map((title) => (
          <div key={title}>
            <h3 className="font-black uppercase text-[#062a4f]">{title}</h3>
            <ul className="mt-3 list-disc pl-5 text-sm leading-6">
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Careers</li>
              <li>Special Offers</li>
            </ul>
          </div>
        ))}
        <form className="rounded-md bg-white p-5 shadow">
          <h3 className="text-center text-lg font-bold">Subscribe to Newsletter</h3>
          <div className="mt-4 flex overflow-hidden rounded-full bg-slate-100">
            <input className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none" placeholder="Enter your email address." />
            <button className="rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white">SUBMIT NOW</button>
          </div>
        </form>
      </div>
    </footer>
  );
}
