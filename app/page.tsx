import { BrandInfo } from "@/components/BrandInfo";
import { Footer } from "@/components/Footer";
import { FAQ } from "@/components/FAQ";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductInfo } from "@/components/ProductInfo";
import { PurchaseCard } from "@/components/PurchaseCard";
import { RelatedProducts } from "@/components/RelatedProducts";
import { ReviewSection } from "@/components/ReviewSection";
import { Section } from "@/components/Section";
import { PlayCircle, Send } from "lucide-react";

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/70 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <strong className="text-xl tracking-tight text-slate-900">Auralux</strong>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex" aria-label="Primary navigation">
            <a href="#reviews" className="hover:text-indigo-600">Reviews</a>
            <a href="#questions" className="hover:text-indigo-600">Questions</a>
            <a href="#similar" className="hover:text-indigo-600">Similar</a>
          </nav>
          <button className="rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-200">
            Cart
          </button>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-6 sm:px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:h-[calc(100vh-4.5rem)] lg:grid-cols-[30%_45%_25%] lg:overflow-visible lg:px-8">
        <ProductGallery />
        <ProductInfo />
        <div className="md:col-span-2 lg:col-span-1">
          <PurchaseCard />
        </div>
      </section>

      <Section title="Related Products Slider" eyebrow="Complete the edit">
        <RelatedProducts />
      </Section>

      <Section title="Frequently Bought Together">
        <div className="grid gap-4 rounded-2xl bg-white p-5 shadow-sm md:grid-cols-3">
          {["Performance socks", "Foam cleaner", "Travel shoe pouch"].map((item) => (
            <div key={item} className="rounded-2xl bg-slate-50 p-5">
              <h3 className="font-semibold text-slate-900">{item}</h3>
              <p className="mt-2 text-sm text-slate-500">Add and save an extra 15% at checkout.</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Recommended Products">
        <RelatedProducts title="Recommended Products" />
      </Section>

      <Section title="Recently Viewed">
        <RelatedProducts title="Recently Viewed" />
      </Section>

      <Section title="Customer Reviews" eyebrow="Verified buyers">
        <div id="reviews">
          <ReviewSection />
        </div>
      </Section>

      <Section title="Question & Answers">
        <div id="questions" className="rounded-2xl bg-white p-5 shadow-sm">
          <FAQ />
        </div>
      </Section>

      <Section title="Product Videos">
        <div className="grid gap-4 md:grid-cols-2">
          {["Fit walkthrough", "Material close-up"].map((video) => (
            <div key={video} className="flex min-h-56 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-premium">
              <div className="text-center">
                <PlayCircle className="mx-auto text-emerald-300" size={48} />
                <h3 className="mt-4 font-semibold">{video}</h3>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Brand Story">
        <BrandInfo />
      </Section>

      <Section title="Similar Products">
        <div id="similar">
          <RelatedProducts title="Similar Products" />
        </div>
      </Section>

      <Section title="Newsletter">
        <div className="glass flex flex-col gap-4 rounded-2xl p-5 shadow-premium md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Get first access to limited releases.</h2>
            <p className="mt-1 text-slate-500">No noise, just premium launches and member-only offers.</p>
          </div>
          <form className="flex overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <input aria-label="Email address" type="email" placeholder="you@example.com" className="min-w-0 px-4 py-3 outline-none" />
            <button aria-label="Subscribe" className="bg-slate-900 px-4 text-white">
              <Send size={18} />
            </button>
          </form>
        </div>
      </Section>

      <Footer />
    </>
  );
}
