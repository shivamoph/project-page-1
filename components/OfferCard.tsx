import { BadgePercent } from "lucide-react";

export function OfferCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-indigo-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-premium">
      <div className="flex items-start gap-3">
        <span className="rounded-xl bg-emerald-50 p-2 text-emerald-500">
          <BadgePercent size={18} aria-hidden />
        </span>
        <div>
          <h3 className="font-semibold text-slate-800">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-500">{text}</p>
        </div>
      </div>
    </div>
  );
}
