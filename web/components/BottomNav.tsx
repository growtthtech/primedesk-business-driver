"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/map", label: "🗺 Map" },
  { href: "/plan", label: "⚡ Plan" },
  { href: "/home", label: "🌱 Home" },
];

export default function BottomNav() {
  const path = usePathname();
  return (
    <nav
      style={{
        position: "sticky",
        bottom: 0,
        display: "flex",
        gap: 8,
        background: "#fff",
        border: "1px solid #E6EAF0",
        borderRadius: 16,
        padding: 8,
        marginTop: 16,
      }}
    >
      {tabs.map((t) => {
        const on = path === t.href;
        return (
          <Link
            key={t.href}
            href={t.href}
            style={{
              flex: 1,
              textAlign: "center",
              textDecoration: "none",
              padding: "10px 4px",
              borderRadius: 12,
              fontWeight: on ? 800 : 400,
              fontSize: 14,
              background: on ? "#1A56DB" : "#F2F4F7",
              color: on ? "#fff" : "#1A3A5C",
            }}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
