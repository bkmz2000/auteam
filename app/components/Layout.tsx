"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ageGroups = [
  { href: "/children", label: "Детям" },
  { href: "/teens", label: "Подросткам" },
  { href: "/adults", label: "Взрослым" },
  { href: "/parents", label: "Родителям" },
];

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/about", label: "О нас" },
  { href: "/teachers", label: "Участники" },
  { href: "/materials", label: "Материалы" },
  { href: "/news", label: "Новости" },
  { href: "/join", label: "Присоединиться к сообществу" },
  { href: "/contacts", label: "Контакты" },
];

function AgeGroupDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isActive = ["/children", "/teens", "/adults", "/parents"].some((p) =>
    pathname?.startsWith(p),
  );

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          isActive
            ? "text-accent bg-hoverSurface"
            : "text-textSecondary hover:text-textPrimary hover:bg-hoverSurface"
        }`}
      >
        Что можем предложить
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 bg-surface border border-border rounded-xl shadow-lg py-1 min-w-[160px] z-50">
          {ageGroups.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-textSecondary hover:text-textPrimary hover:bg-hoverSurface transition-colors"
            >
              {g.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-textPrimary">
                <span
                  className="text-background font-bold text-lg"
                  style={{ letterSpacing: "-0.5px" }}
                >
                  Н
                </span>
              </div>
              <span
                className="font-semibold text-textPrimary hidden sm:block"
                style={{ fontSize: "17px" }}
              >
                Нейроотличные нейроотличным
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                href="/"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === "/" ? "text-accent bg-hoverSurface font-semibold" : "text-textSecondary hover:text-textPrimary hover:bg-hoverSurface"}`}
              >
                Главная
              </Link>
              <Link
                href="/about"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname?.startsWith("/about") ? "text-accent bg-hoverSurface font-semibold" : "text-textSecondary hover:text-textPrimary hover:bg-hoverSurface"}`}
              >
                О нас
              </Link>
              <AgeGroupDropdown />
              <Link
                href="/teachers"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname?.startsWith("/teachers") ? "text-accent bg-hoverSurface font-semibold" : "text-textSecondary hover:text-textPrimary hover:bg-hoverSurface"}`}
              >
                Участники
              </Link>
              <Link
                href="/materials"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname?.startsWith("/materials") ? "text-accent bg-hoverSurface font-semibold" : "text-textSecondary hover:text-textPrimary hover:bg-hoverSurface"}`}
              >
                Материалы
              </Link>
              <Link
                href="/news"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname?.startsWith("/news") ? "text-accent bg-hoverSurface font-semibold" : "text-textSecondary hover:text-textPrimary hover:bg-hoverSurface"}`}
              >
                Новости
              </Link>
              <Link
                href="/join"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname?.startsWith("/join") ? "text-accent bg-hoverSurface font-semibold" : "text-textSecondary hover:text-textPrimary hover:bg-hoverSurface"}`}
              >
                Присоединиться к сообществу
              </Link>
              <Link
                href="/contacts"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname?.startsWith("/contacts") ? "text-accent bg-hoverSurface font-semibold" : "text-textSecondary hover:text-textPrimary hover:bg-hoverSurface"}`}
              >
                Контакты
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-textSecondary hover:bg-hoverSurface transition-colors"
              aria-label="Меню"
            >
              {mobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="lg:hidden py-4 border-t border-border">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-lg text-sm font-medium text-textSecondary hover:text-textPrimary hover:bg-hoverSurface transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="px-4 py-2 text-xs font-semibold text-textSecondary uppercase tracking-wider">
                  Занятия
                </div>
                {ageGroups.map((g) => (
                  <Link
                    key={g.href}
                    href={g.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-lg text-sm font-medium text-textSecondary hover:text-textPrimary hover:bg-hoverSurface transition-colors"
                  >
                    {g.label}
                  </Link>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-surface border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div>
              <div className="font-bold text-textPrimary mb-2">
                Нейроотличные нейроотличным
              </div>
              <p className="text-textSecondary text-sm max-w-sm">
                Платформа для нейроотличных детей, подростков, взрослых и их
                близких в Армении.
              </p>
            </div>
            <div className="flex gap-6 flex-wrap">
              <Link
                href="/join"
                className="text-sm text-textSecondary hover:text-textPrimary transition-colors"
              >
                Присоединиться к сообществу
              </Link>
              <Link
                href="/contacts"
                className="text-sm text-textSecondary hover:text-textPrimary transition-colors"
              >
                Контакты
              </Link>
              <Link
                href="/support"
                className="text-sm text-textSecondary hover:text-textPrimary transition-colors"
              >
                Поддержать
              </Link>
              <Link
                href="/login"
                className="text-sm text-textSecondary hover:text-textPrimary transition-colors"
              >
                Вход
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
