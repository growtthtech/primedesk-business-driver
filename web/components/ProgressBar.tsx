"use client";

const labels = ["Setup", "Process", "Map", "Plan", "Home"];

export default function ProgressBar({ step }: { step: number }) {
  // step: 1..5 across the journey
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#7A8699", marginBottom: 6 }}>
        <span>Step {step} of 5</span>
        <span>{labels[step - 1]}</span>
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {labels.map((l, i) => (
          <div
            key={l}
            style={{
              flex: 1,
              height: 8,
              borderRadius: 8,
              background: i + 1 <= step ? (step === 4 ? "#E8590C" : step === 5 ? "#34A853" : "#1A56DB") : "#E6EAF0",
              transition: "background .3s",
            }}
          />
        ))}
      </div>
    </div>
  );
}
