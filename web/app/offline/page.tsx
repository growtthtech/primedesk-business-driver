import Link from "next/link";

export default function OfflinePage() {
  return (
    <div className="card" style={{ textAlign: "center", padding: "36px 20px" }}>
      <p style={{ fontSize: 40, margin: 0 }}>📡</p>
      <h2>No connection</h2>
      <p className="hint">PrimeDesk needs internet for login and saving. Your trip answers stay saved on this phone and will sync when you are back.</p>
      <Link href="/" className="btn-primary" style={{ display: "block", textDecoration: "none", textAlign: "center" }}>Retry →</Link>
    </div>
  );
}
