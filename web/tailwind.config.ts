import type { Config } from "tailwindcss";

export const tokens = {
  primary: "#1A56DB",
  ink: "#2B3440",
  mist: "#F8FAFD",
  line: "#E6EAF0",
  action: "#E8590C",
  actionDark: "#C94A08",
  actionBg: "#FFF7F0",
  growthBg: "#F2FBF4",
  growthBox: "#DFF5E3",
  growthBorder: "#A9DFBF",
  growthLine: "#34A853",
  growthText: "#1B7A3D",
};

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: tokens.primary,
        ink: tokens.ink,
        mist: tokens.mist,
        action: tokens.action,
        growthline: tokens.growthLine,
      },
      borderRadius: { xl2: "16px" },
    },
  },
  plugins: [],
};
export default config;
