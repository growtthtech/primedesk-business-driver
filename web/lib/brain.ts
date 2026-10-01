export function getLevel(how: string) {
  if (how.includes("many")) return { level: "CONNECT", why: "You use many tools but they are not linked — lots of hand copying." };
  if (how.includes("few")) return { level: "ORGANIZE", why: "You use WhatsApp + notebook/transfers but track by hand." };
  return { level: "START", why: "Mostly manual — start simple, no stress." };
}
