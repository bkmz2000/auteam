"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/children", label: "Детям" },
  { href: "/teens", label: "Подросткам" },
  { href: "/adults", label: "Взрослым" },
  { href: "/parents", label: "Родителям" },
];

export function AgeNav() {
  const pathname = usePathname();

  return (
    <div className="bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex gap-1 py-3 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = pathname?.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-accent text-white"
                    : "text-textSecondary hover:text-textPrimary hover:bg-hoverSurface"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}