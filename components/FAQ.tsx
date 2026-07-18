import { faqs } from "@/lib/product";

export function FAQ() {
  return (
    <div className="space-y-3">
      {faqs.map(([q, a]) => (
        <details key={q} className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <summary className="cursor-pointer list-none font-semibold text-slate-800">{q}</summary>
          <p className="mt-3 text-sm leading-6 text-slate-500">{a}</p>
        </details>
      ))}
    </div>
  );
}
