import { ReactNode } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { Bell, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type Role = "manager" | "contractor" | "admin";

const roleLabel: Record<Role, string> = {
  manager: "管理会社モード",
  contractor: "業者モード",
  admin: "運営",
};

const homeLink: Record<Role, string> = {
  manager: "/manager/dashboard",
  contractor: "/contractor/dashboard",
  admin: "/admin/stats",
};

export function AppShell({
  role,
  title,
  back,
  rightSlot,
  children,
  containerClassName,
}: {
  role: Role;
  title?: string;
  back?: string;
  rightSlot?: ReactNode;
  children: ReactNode;
  containerClassName?: string;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            {back ? (
              <Link
                href={back}
                className="-ml-2 inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100"
                aria-label="戻る"
              >
                <ChevronLeft className="h-5 w-5" />
              </Link>
            ) : (
              <Logo href={homeLink[role]} size="sm" />
            )}
            <div>
              {title ? (
                <div className="text-[15px] font-semibold leading-tight">
                  {title}
                </div>
              ) : null}
              {!back ? (
                <div className="text-[11px] font-medium text-brand-700">
                  {roleLabel[role]}
                </div>
              ) : null}
            </div>
          </div>
          <div className="flex items-center gap-1">
            {rightSlot}
            <button
              type="button"
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100"
              aria-label="通知"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger-600" />
            </button>
          </div>
        </div>
      </header>
      <main className={cn("mx-auto max-w-3xl px-4 py-5", containerClassName)}>
        {children}
      </main>
    </div>
  );
}
