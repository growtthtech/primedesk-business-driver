import "./globals.css";

export const metadata = { title: "PrimeDesk - Business Driver (MVP)", description: "Process-first guidance for Nigeria SMEs" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div style={{ maxWidth: 480, margin: "0 auto", padding: 16 }}>
          <div style={{ background: "#F2F6FB", border: "1px solid #DDE7F3", borderRadius: 16, padding: "12px 16px", marginBottom: 12 }}>
            <b>PrimeDesk</b> <span style={{ fontSize: 12, color: "#5B6B80" }}>Business Driver — MVP scaffold</span>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
