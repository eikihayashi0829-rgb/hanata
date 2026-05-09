import { Sparkles } from "lucide-react";

export default function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dim = size === "lg" ? 36 : size === "sm" ? 22 : 28;
  const text = size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-xl";
  return (
    <div className="flex items-center gap-2">
      <div
        className="flex items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-soft"
        style={{ width: dim, height: dim }}
      >
        <Sparkles size={dim * 0.55} strokeWidth={2.5} />
      </div>
      <div className="flex items-baseline gap-1">
        <span className={`${text} font-extrabold tracking-tight text-slate-900`}>全任</span>
        <span className="text-[11px] font-semibold tracking-[0.18em] text-brand-600">ZENIN</span>
      </div>
    </div>
  );
}
