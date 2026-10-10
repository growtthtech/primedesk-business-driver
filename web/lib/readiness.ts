// Deterministic digital-readiness assessment (PRD §5.6). No AI, no self-report
// alone: profile facts + actual mapping activity decide the level.
export type Readiness = { level: 1 | 2 | 3 | 4; name: string; explanation: string };

const NAMES = ["", "Start", "Organize", "Connect", "Optimize"];

export function assessReadiness(
  profile: { size: string; years: string; operatingModel: string; techUsage: string },
  activity: { mapped: number; problems: number }
): Readiness {
  let score = 0;
  const why: string[] = [];
  if (["6–10", "11–50", "50+"].includes(profile.size)) { score += 2; why.push("your team size"); }
  else if (profile.size === "2–5") { score += 1; why.push("your small team"); }
  if (profile.years === "5+ years") { score += 2; why.push("years of operation"); }
  else if (profile.years === "3–5 years" || profile.years === "1–3 years") { score += 1; why.push("time in business"); }
  if (profile.operatingModel === "Employees" || profile.operatingModel === "Mixed") { score += 1; why.push("your team setup"); }
  if ((profile.techUsage || "").length > 60) { score += 1; why.push("tools you already use"); }
  if (activity.mapped >= 3) { score += 1; why.push("processes you have mapped"); }
  if (activity.problems >= 3) { score += 1; why.push("the volume of issues found"); }
  const level = (score <= 2 ? 1 : score <= 4 ? 2 : score <= 6 ? 3 : 4) as 1 | 2 | 3 | 4;
  const advice = [
    "Start with the simplest tools that fix one painful step. Avoid anything complex for now.",
    "Standardize one process at a time and keep information in one shared place before connecting tools.",
    "Your workflows look steady enough to link tools so information moves by itself. Connect one pair first.",
    "You can consider automation and performance tracking, one workflow at a time. Measure before expanding.",
  ][level - 1];
  return {
    level,
    name: NAMES[level],
    explanation: `Level ${level} — ${NAMES[level]}, based on ${why.slice(0, 3).join(", ") || "your current setup"}. ${advice} Readiness can differ by process: start with your most painful one.`,
  };
}
