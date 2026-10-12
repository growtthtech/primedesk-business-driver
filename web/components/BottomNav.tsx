"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/map", label: "Map" },
  { href: "/plan", label: "Plan" },
  { href: "/drive", label: "Drive" },
];

// Workspace tabs stay hidden until the agency finishes its first process.
// Anything else (logged out, no profile, zero mapped) renders nothing —
// the dashboard is the only entry point until then.
export default function BottomNav() {
  const path = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetch("/api/my-map")
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (j?.ok && (j.progress?.mapped || 0) > 0) setShow(true);
      })
      .catch(() => {});
  }, []);

  if (!show) return null;
  const profileOn = path === "/profile";

  return (
    <nav
      aria-label="Workspace"
      style={{
        position: "sticky",
        bottom: 0,
        display: "flex",
        gap: 8,
        alignItems: "center",
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
            <span aria-hidden="true" style={{ color: on ? "#E8B62A" : "#E8590C", fontWeight: 800 }}>●</span> {t.label}
          </Link>
        );
      })}
      <Link
        href="/profile"
        aria-label="Your account"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 44,
          height: 44,
          borderRadius: "50%",
          textDecoration: "none",
          fontSize: 20,
          background: profileOn ? "#E8590C" : "#F2F4F7",
          border: profileOn ? "2px solid #E8590C" : "1px solid #E6EAF0",
          flexShrink: 0,
        }}
      >
        <span aria-hidden="true" style={{ filter: profileOn ? "brightness(0) invert(1)" : "none" }}>👤</span>
      </Link>
    </nav>
  );
}
