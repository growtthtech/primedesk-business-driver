"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "../../lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [biz, setBiz] = useState<Record<string, string> | null>(null);
  const [loadingBiz, setLoadingBiz] = useState(true);

  useEffect(() => {
    if (isPending) return;
    if (!session) { router.push("/login"); return; }
    fetch("/api/business")
      .then((r) => r.json())
      .then((j) => { if (j.ok) setBiz(j.business); })
      .catch(() => {})
      .finally(() => setLoadingBiz(false));
  }, [isPending, session, router]);

  async function logout() {
    await authClient.signOut();
    router.push("/");
  }

  if (isPending || loadingBiz) return <div className="card"><p className="hint">Loading your account...</p></div>;
  if (!session) return null;

  return (
    <div className="fade-in">
      <div className="card">
        <h2>Your account</h2>
        <p style={{ margin: "6px 0" }}><b>Email:</b> {session.user?.email}</p>
        <p className="hint">Logged in with a code — no password to remember.</p>
      </div>
      <div className="card">
        <h2>Your business</h2>
        {biz ? (
          <>
            <p style={{ margin: "6px 0" }}><b>{biz.name}</b></p>
            <p className="hint" style={{ margin: 0 }}>{biz.category}{biz.subtype ? ` • ${biz.subtype}` : ""} • {biz.size} • {biz.years}</p>
            <Link href="/business-profile" style={{ display: "block", marginTop: 10, color: "#1A56DB", fontSize: 14 }}>Edit business profile →</Link>
          </>
        ) : (
          <>
            <p className="hint">No business yet.</p>
            <Link href="/business-profile" className="btn-primary" style={{ display: "block", textDecoration: "none", textAlign: "center" }}>Set up my business →</Link>
          </>
        )}
      </div>
      <button className="btn-ghost" onClick={logout}>Log out</button>
    </div>
  );
}
