import { specs } from "@/lib/product";

export function SpecificationTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {specs.map(([label, value]) => (
        <div key={label} className="grid grid-cols-3 border-b border-slate-100 last:border-0">
          <div className="bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600">{label}</div>
          <div className="col-span-2 px-4 py-3 text-sm text-slate-600">{value}</div>
        </div>
      ))}
    </div>
  );
}
