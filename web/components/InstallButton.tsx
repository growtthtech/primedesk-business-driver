"use client";
import { useState, useEffect } from "react";

// "Install app" button. Appears only where the browser offers installation.
export default function InstallButton() {
  const [prompt, setPrompt] = useState<Event | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setPrompt(e);
    };
    const onInstalled = () => {
      setPrompt(null);
      setDone(true);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (done || !prompt) return null;
  return (
    <button
      className="btn-ghost"
      style={{ marginTop: 8 }}
      onClick={async () => {
        const p = prompt as unknown as { prompt: () => void };
        p.prompt();
        setPrompt(null);
      }}
    >
      📲 Install PrimeDesk app
    </button>
  );
}
