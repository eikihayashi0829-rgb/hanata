"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Users,
  Wrench,
  FileText,
  Wallet,
  UserCircle2,
  FolderOpen,
  MessageSquare,
  Settings,
} from "lucide-react";
import Logo from "./Logo";

const items = [
  { href: "/dashboard", label: "ダッシュボード", icon: LayoutDashboard },
  { href: "/properties", label: "物件管理", icon: Building2 },
  { href: "/tenants", label: "入居者管理", icon: Users },
  { href: "/repairs", label: "修繕管理", icon: Wrench },
  { href: "/billing", label: "請求管理", icon: FileText },
  { href: "/accounting", label: "会計管理", icon: Wallet },
  { href: "/owners", label: "オーナー管理", icon: UserCircle2 },
  { href: "/documents", label: "書類管理", icon: FolderOpen },
  { href: "/messages", label: "メッセージ", icon: MessageSquare },
  { href: "/settings", label: "設定", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-slate-200 bg-white">
      <div className="flex flex-col gap-2 border-b border-slate-200 px-5 py-5">
        <Logo />
        <div className="text-[11px] text-slate-500">不動産管理システム</div>
        <div className="mt-2 rounded-md bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700">
          株式会社スマート管理
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin">
        <ul className="space-y-1">
          {items.map((it) => {
            const active =
              (it.href === "/dashboard" && pathname.startsWith("/dashboard")) ||
              (it.href === "/repairs" && (pathname.startsWith("/repair") || pathname.startsWith("/approved"))) ||
              pathname === it.href;
            const Icon = it.icon;
            return (
              <li key={it.href}>
                <Link
                  href={it.href === "/dashboard" ? "/dashboard" : "/dashboard"}
                  prefetch={false}
                  className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                    active
                      ? "bg-brand-50 font-semibold text-brand-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon size={18} className={active ? "text-brand-600" : "text-slate-400 group-hover:text-slate-600"} />
                  <span>{it.label}</span>
                  {active && <span className="ml-auto h-2 w-2 rounded-full bg-brand-500" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-slate-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-sm font-semibold text-white">
            山
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-slate-900">山田 太郎</div>
            <div className="text-[11px] text-slate-500">管理部</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
