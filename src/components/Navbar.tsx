"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Domov", href: "/" },
  { label: "O nás", href: "/o-nas" },   // Opravený link!
  { label: "Blog", href: "/blog" },
  { label: "Poistná kalkulačka", href: "/poistna-kalkulacka" },
  { label: "Daňová kalkulačka", href: "/danova-kalkulacka" },
  { label: "Úverová kalkulačka", href: "/uverova-kalkulacka" },
  { label: "Investičná kalkulačka", href: "/investicna-kalkulacka" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/60 dark:bg-gray-900/50 border-b border-white/30 shadow-md">
      <div className="max-w-none mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo alebo názov */}
        <div className="text-2xl font-extrabold tracking-tight text-sky-700 select-none whitespace-nowrap drop-shadow">
          UniverzálKalkulačka
        </div>
        {/* Navigačné linky */}
        <div
          className="flex gap-1 sm:gap-2 flex-nowrap overflow-x-auto scrollbar-thin"
          style={{ maxWidth: "100vw" }}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all whitespace-nowrap border border-white/40 shadow hover:scale-105 hover:bg-sky-100/70 hover:shadow-lg
                ${pathname === link.href
                  ? "bg-sky-200 text-indigo-900 dark:bg-sky-800/80 dark:text-white font-bold"
                  : "bg-white/60 dark:bg-gray-900/40 text-sky-700 dark:text-indigo-200 backdrop-blur-md"}
              `}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

