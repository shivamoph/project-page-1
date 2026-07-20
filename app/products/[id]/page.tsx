import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BadgeCheck,
  ChevronRight,
  CreditCard,
  Heart,
  LockKeyhole,
  MapPin,
  Minus,
  PackageCheck,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Star,
  Store,
  Truck
} from "lucide-react";
import { ProductDetailsGallery } from "@/components/ProductDetailsGallery";
import { catalogCategories, catalogProducts } from "@/lib/catalog";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = catalogProducts.find((item) => item.id === id);

  if (!product) notFound();

  const category = catalogCategories.find((item) => item.id === product.categoryId);
  const oldPrice = Math.round(product.price / (1 - product.discount / 100));
  const images = [product.image, product.image, product.image, product.image];
  const related = catalogProducts.filter((item) => item.id !== product.id).slice(0, 6);

  return (
    <div className="min-h-screen bg-[#eef1f5] pb-24 font-sans text-slate-900 lg:pb-0">
      <Header />

      <main className="mx-auto max-w-[1480px] px-3 py-4 sm:px-5">
        <div className="mb-3 flex flex-wrap items-center gap-1 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#f04b16]">Home</Link>
          <ChevronRight size={13} />
          <span>{category?.name ?? "Products"}</span>
          <ChevronRight size={13} />
          <span className="font-semibold text-slate-700">{product.name}</span>
        </div>

        <div className="grid gap-4 lg:grid-cols-[360px_minmax(0,1fr)_330px] xl:grid-cols-[410px_minmax(0,1fr)_350px]">
          <ProductDetailsGallery name={product.name} images={images} />

          <section className="space-y-4">
            <Card>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-[#f04b16]">{category?.name ?? "Industrial Supply"}</p>
                  <h1 className="mt-2 text-2xl font-black leading-8 text-slate-950">{product.name}</h1>
                </div>
                <span className="rounded bg-green-50 px-3 py-2 text-sm font-bold text-green-700">In Stock</span>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                <span>Brand: <b className="text-[#f04b16]">{product.brand}</b></span>
                <span className="text-slate-300">|</span>
                <span>SKU: IB-{product.id.toUpperCase()}</span>
                <span className="flex items-center gap-1 rounded bg-green-600 px-2 py-1 font-bold text-white">
                  {product.rating} <Star size={13} fill="currentColor" />
                </span>
                <span className="font-semibold">3 Reviews</span>
              </div>
              <p className="mt-5 leading-7 text-slate-600">
                Reliable B2B-grade product selected for daily procurement needs. Built for consistent performance, easy ordering, and quick replenishment across offices, factories, workshops, and field teams.
              </p>
            </Card>

            <InfoSection title="Key Highlights">
              <div className="grid gap-3 sm:grid-cols-2">
                {["Commercial grade quality", "Ready GST invoice", "Bulk purchase support", "Fast dispatch available"].map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded-md bg-slate-50 p-3 text-sm font-semibold">
                    <BadgeCheck size={17} className="text-green-600" /> {item}
                  </div>
                ))}
              </div>
            </InfoSection>

            <InfoSection title="Features">
              <ul className="grid gap-2 text-sm leading-6 text-slate-700 sm:grid-cols-2">
                <li>Designed for frequent industrial use</li>
                <li>Quality checked by verified seller</li>
                <li>Suitable for procurement teams</li>
                <li>Compatible with standard business workflows</li>
              </ul>
            </InfoSection>

            <InfoSection title="Specifications">
              <div className="overflow-hidden rounded-md border border-slate-200">
                {[
                  ["Brand", product.brand],
                  ["Category", category?.name ?? "Industrial Supply"],
                  ["Model No", product.id],
                  ["Package Contains", "1 piece"],
                  ["Warranty", "6 months manufacturer warranty"],
                  ["Country of Origin", "India"]
                ].map(([label, value], index) => (
                  <div key={label} className={`grid grid-cols-2 px-4 py-3 text-sm ${index % 2 === 0 ? "bg-slate-50" : "bg-white"}`}>
                    <span>{label}</span>
                    <b>{value}</b>
                  </div>
                ))}
              </div>
            </InfoSection>

            <InfoSection title="Offers">
              <div className="space-y-3">
                {["Get flat 10% off on first order above Rs.3,000", "Extra discount on prepaid orders", "Request bulk quote for better pricing"].map((offer) => (
                  <div key={offer} className="rounded-md border border-orange-100 bg-orange-50 px-4 py-3 text-sm font-semibold text-slate-800">
                    {offer}
                  </div>
                ))}
              </div>
            </InfoSection>

            <InfoSection title="Warranty">
              <p className="text-sm leading-7 text-slate-600">Covered by standard seller warranty against manufacturing defects. Warranty support requires original invoice and product packaging.</p>
            </InfoSection>

            <InfoSection title="FAQs">
              {["Is GST invoice available?", "Can I place a bulk order?", "What is the return window?"].map((question) => (
                <details key={question} className="border-b border-slate-100 py-3 text-sm">
                  <summary className="cursor-pointer font-bold">{question}</summary>
                  <p className="mt-2 text-slate-600">Yes. This product supports business purchase workflows and standard seller policies.</p>
                </details>
              ))}
            </InfoSection>
          </section>

          <BuyBox price={product.price} oldPrice={oldPrice} discount={product.discount} brand={product.brand} />
        </div>

        <BelowSections related={related} />
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1fr_1fr] border-t border-slate-200 bg-white p-3 shadow-2xl lg:hidden">
        <div>
          <p className="text-xs text-slate-500">Price</p>
          <b className="text-lg">₹{product.price.toLocaleString("en-IN")}</b>
        </div>
        <button className="rounded bg-[#f04b16] font-black text-white">Add to Cart</button>
        <button className="ml-2 rounded bg-[#173654] font-black text-white">Buy Now</button>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-[1480px] items-center justify-between gap-4 px-4">
        <Link href="/" className="text-2xl font-black">
          Industry<span className="text-[#f04b16]">buying</span>
        </Link>
        <div className="hidden min-w-0 flex-1 rounded border border-slate-300 bg-white md:flex">
          <input className="min-w-0 flex-1 px-4 text-sm outline-none" placeholder="Search Products by title, sku, category, brand etc.." />
          <button className="bg-[#f04b16] px-5 font-bold text-white">Search</button>
        </div>
        <button className="rounded border border-slate-900 px-5 py-2 text-sm">Login</button>
      </div>
    </header>
  );
}

function BuyBox({ price, oldPrice, discount, brand }: { price: number; oldPrice: number; discount: number; brand: string }) {
  return (
    <aside className="lg:sticky lg:top-20 lg:self-start">
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-sm text-slate-500">₹{Math.round(price * 1.05).toLocaleString("en-IN")} (Incl. of all taxes)</p>
        <div className="mt-2 flex flex-wrap items-end gap-2">
          <strong className="text-3xl">₹{price.toLocaleString("en-IN")}</strong>
          <span className="pb-1 text-sm text-slate-400 line-through">₹{oldPrice.toLocaleString("en-IN")}</span>
          <span className="mb-1 rounded bg-green-50 px-2 py-1 text-xs font-black text-green-700">{discount}% OFF</span>
        </div>
        <p className="mt-1 text-sm font-semibold">+ 5% GST</p>

        <div className="mt-5 flex items-center justify-between rounded-full border border-slate-200 p-2">
          <button className="grid h-8 w-8 place-items-center rounded-full border" aria-label="Decrease quantity"><Minus size={15} /></button>
          <span className="font-bold">1</span>
          <button className="grid h-8 w-8 place-items-center rounded-full border" aria-label="Increase quantity"><Plus size={15} /></button>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 rounded bg-[#f04b16] py-3 font-black text-white"><ShoppingCart size={17} /> Add to Cart</button>
          <button className="rounded bg-[#173654] py-3 font-black text-white">Buy Now</button>
        </div>
        <button className="mt-3 flex w-full items-center justify-center gap-2 rounded border border-slate-200 py-3 font-bold text-slate-700"><Heart size={17} /> Wishlist</button>

        <div className="mt-5 rounded-md border border-slate-200 p-3">
          <h3 className="flex items-center gap-2 font-black"><MapPin size={17} /> Delivery Pincode Checker</h3>
          <div className="mt-3 flex overflow-hidden rounded border">
            <input className="min-w-0 flex-1 px-3 py-3 text-sm outline-none" placeholder="Enter Pincode" />
            <button className="bg-[#f04b16] px-4 font-bold text-white">Check</button>
          </div>
          <p className="mt-3 text-sm font-semibold text-green-700">Delivery by Tomorrow, 24 Jul</p>
        </div>

        <div className="mt-4 space-y-3 text-sm">
          <p className="flex items-center gap-2"><RotateCcw size={17} className="text-green-600" /> 7 days return policy</p>
          <p className="flex items-center gap-2"><Store size={17} className="text-green-600" /> Seller: {brand} Authorized Store</p>
          <p className="flex items-center gap-2"><PackageCheck size={17} className="text-green-600" /> GST invoice available</p>
        </div>

        <div className="mt-5 rounded-md bg-slate-50 p-3">
          <h3 className="font-black">Secure Payments</h3>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs font-bold text-slate-600">
            <span className="rounded bg-white p-2"><CreditCard className="mx-auto mb-1" size={18} /> Cards</span>
            <span className="rounded bg-white p-2"><ShieldCheck className="mx-auto mb-1" size={18} /> UPI</span>
            <span className="rounded bg-white p-2"><LockKeyhole className="mx-auto mb-1" size={18} /> Safe</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

function InfoSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card>
      <h2 className="mb-4 text-lg font-black uppercase text-[#062a4f]">{title}</h2>
      {children}
    </Card>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">{children}</div>;
}

function BelowSections({ related }: { related: typeof catalogProducts }) {
  return (
    <div className="mt-6 space-y-6">
      <BundleSection />
      <ProductRail title="Similar Products" products={related} />
      <ProductRail title="Recommended Products" products={related.slice().reverse()} />
      <ProductRail title="Recently Viewed" products={related.slice(0, 4)} />
      <InfoSection title="Customer Reviews">
        <div className="grid gap-5 md:grid-cols-[240px_1fr]">
          <div>
            <p className="text-4xl font-black">4.7</p>
            <p className="mt-2 text-[#f04b16]">★★★★★</p>
            <p className="mt-2 text-sm text-slate-500">3 Ratings, 3 Reviews</p>
          </div>
          <div className="space-y-4">
            {["Excellent procurement experience", "Good quality for the price", "Fast delivery and proper invoice"].map((review) => (
              <div key={review}>
                <span className="rounded-full bg-green-600 px-3 py-1 text-sm font-bold text-white">5 ★</span>
                <h3 className="mt-2 font-bold">{review}</h3>
                <p className="mt-1 text-sm text-slate-600">Verified buyer review with reliable product quality and smooth delivery.</p>
              </div>
            ))}
          </div>
        </div>
      </InfoSection>
      <InfoSection title="Related Categories">
        <div className="flex flex-wrap gap-3">
          {catalogCategories.map((category) => (
            <Link key={category.id} href="/#all-categories" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold hover:border-[#f04b16] hover:text-[#f04b16]">
              {category.name}
            </Link>
          ))}
        </div>
      </InfoSection>
    </div>
  );
}

function BundleSection() {
  return (
    <InfoSection title="Frequently Bought Together">
      <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
        {["Main Product", "Safety Gloves", "Packaging Tape"].map((item, index) => (
          <div key={item} className="rounded-md bg-slate-50 p-4">
            <p className="text-sm font-black">{item}</p>
            <p className="mt-1 text-sm text-slate-500">Add and save extra {index + 5}%</p>
          </div>
        ))}
        <span className="hidden text-2xl font-black text-slate-300 md:block">+</span>
        <span className="hidden text-2xl font-black text-slate-300 md:block">+</span>
      </div>
    </InfoSection>
  );
}

function ProductRail({ title, products }: { title: string; products: typeof catalogProducts }) {
  return (
    <section>
      <h2 className="mb-3 text-lg font-black uppercase text-[#062a4f]">{title}</h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {products.map((product) => (
          <Link key={`${title}-${product.id}`} href={`/products/${product.id}`} className="w-48 shrink-0 overflow-hidden rounded-lg bg-white shadow-sm">
            <div className="relative h-32 border-b border-slate-100">
              <Image src={product.image} alt={product.name} fill sizes="192px" className="object-contain p-3" />
              <span className="absolute left-2 top-2 rounded bg-[#f04b16] px-2 py-1 text-xs font-black text-white">{product.discount}% OFF</span>
            </div>
            <div className="p-3">
              <p className="text-xs font-bold uppercase text-slate-400">{product.brand}</p>
              <h3 className="product-title-clamp mt-1 text-sm font-semibold">{product.name}</h3>
              <b className="mt-2 block">₹{product.price.toLocaleString("en-IN")}</b>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
