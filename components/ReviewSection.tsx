import { Star } from "lucide-react";

export function ReviewSection() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {["Design", "Comfort", "Delivery"].map((label, index) => (
        <article key={label} className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex text-amber-400">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}</div>
          <h3 className="mt-4 font-semibold text-slate-900">{label} review</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            {index === 0 ? "Minimal silhouette with just enough color." : index === 1 ? "Cushioned without feeling bulky." : "Arrived fast in excellent packaging."}
          </p>
        </article>
      ))}
    </div>
  );
}
