// Shared journey state: localStorage-first (works offline), Postgres on confirm.
export type BizState = {
  name: string;
  type: string;
  how: string;
  size: string;
  templateKey: string;
  raw: string;
  stages: string[];
  statuses: Record<string, string>;
  tools: Record<string, string>; // tool name -> "yes" | "later"
  level: string;
  levelWhy: string;
  started: boolean; // true once owner passes Start step 1 (gate for Map/Plan/Drive)
};

const KEY = "primedesk_state_v1";

export const defaultState: BizState = {
  name: "",
  type: "Beauty / Wellness",
  how: "I use a few tools like WhatsApp + notebook",
  size: "3-10",
  templateKey: "booking",
  raw: "",
  stages: [],
  statuses: {},
  tools: {},
  level: "",
  levelWhy: "",
  started: false,
};

export function loadState(): BizState {
  if (typeof window === "undefined") return { ...defaultState };
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { ...defaultState };
    return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    return { ...defaultState };
  }
}

export function saveState(s: BizState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(s));
}

export function clearState() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}
