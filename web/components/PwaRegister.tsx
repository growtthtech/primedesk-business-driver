"use client";
import { useState, useEffect } from "react";

// Registers the service worker + shows a tiny online/offline pill.
// Rendered in the layout footer; silent otherwise.
export default function PwaRegister() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    setOnline(navigator.onLine);
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  return (
    <span
      role="status"
      aria-live="polite"
      style={{
        display: "inline-block",
        fontSize: 11,
        fontWeight: 700,
        padding: "3px 10px",
        borderRadius: 20,
        marginLeft: 8,
        background: online ? "#E9F7EF" : "#FFF1F1",
        color: online ? "#1B7A3D" : "#C03636",
        border: `1px solid ${online ? "#A9DFBF" : "#F3C2C2"}`,
      }}
    >
      {online ? "● Online" : "○ Offline"}
    </span>
  );
}
