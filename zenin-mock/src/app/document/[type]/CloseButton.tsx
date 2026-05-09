"use client";

import { useRouter } from "next/navigation";
import { X } from "lucide-react";

export default function CloseButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
    >
      <X size={14} />
      閉じる
    </button>
  );
}
