import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  href = "/",
  className,
  size = "md",
}: {
  href?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeText =
    size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-lg";
  return (
    <Link
      href={href}
      className={cn("inline-flex items-center gap-2 font-bold", className)}
    >
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-brand-700 text-white">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 11.5L12 4l9 7.5V20a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1v-8.5z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className={cn("tracking-tight text-slate-900", sizeText)}>
        ハナタ
      </span>
    </Link>
  );
}
