# PrimeDesk Design System v2 — Business Navy + Gold (Review Guide)

Open `DESIGN-PREVIEW.html` (double-click it) alongside this file.

**Change log v1 → v2:** Removed green #0E7A5F. New theme communicates business + entrepreneurship.

## 1. Why Navy + Gold?
- **Business Navy #102845:** trust, structure, corporate seriousness. Says "we handle your business well." Used for main buttons, headers, map borders, Done state.
- **Entrepreneur Gold #E8B62A:** ambition, growth, success, premium hustle. Says "we move you forward." Used sparingly for timeline, arrows, Start Now border, badges, button underline.
- **Warm Paper #FAF8F3 background + Deep Navy #0B1D33 top bar:** premium paper feel, works in bright sunlight on cheap Androids.

Green felt like health/fintech. Navy+Gold feels like a business club / chamber of commerce — right for owners who want to grow.

## 2. Colors (see preview Section 1)
- Primary Navy #102845: main buttons (white text), selected states.
- Gold #E8B62A: accents only, never large backgrounds (hard to read). 3px underline on primary button, 6px left border on Start Now, timeline line, arrows #C8962E darker gold for contrast.
- Background #FAF8F3, Cards white with #EDE6D6 border.
- Text Charcoal #1A1D21.
- Status: Done = navy tint #E6EDF5 / #102845 (professional, not playful green), Waiting = warm #FEF0DC / #9A6200, Stuck = red #FDE8E8 / #B42323 only when action needed.

## 3. Text (unchanged)
- Font Inter, Title 24 bold, Section 20, Body 16, Hint 14 grey.
- Voice: Simple English + WhatsApp examples. "Your tools", "Waiting", never tech words.

## 4. Components (match preview)
1. Button: full width 48px, Navy + gold bottom border. Ghost Back light grey + navy text.
2. Process Card: white + navy border on select.
3. Stage Node: white box navy border + gold ↓ arrow, Rename/Delete, +Add.
4. Status Pill: Done/Waiting/Stuck as above, tappable.
5. Plan Card: Start Now gold border + GOLD badge, Next navy border, Later grey.
6. Tool Row: Name + What for + Which stage + When to upgrade.
7. Growth Timeline: gold vertical line, Today → Next-Scale → Future-Lead.

## 5. Layout rules (unchanged)
- Max 480px centered, one primary action per screen, no side menu, <100KB per screen.

## 6. Review actions
Reply with one:
- Keep Navy+Gold
- More Gold (e.g., gold headers)
- Less Gold (e.g., arrows navy)
- Try Blue-Only (no gold)

Next after approval: update Tailwind tokens in `/web` to these hex codes, then Figma.
