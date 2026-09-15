---
name: day-mode-ui-contrast
description: >-
  Mandatory day-mode (theme-light) contrast rules for Plegueviation Exam PWA UI.
  Use when creating or editing dashboard panels, SOP cards, TABLAS, modals, forms,
  or any new screen section that has dark cockpit defaults and needs .theme-light overrides.
---

# Day Mode UI Contrast (Plegueviation Exam)

## Hard rule

Every new UI surface that ships **dark cockpit defaults** MUST also ship a complete
`.theme-light …` override block in `apps/web-pwa/src/index.css` **in the same PR**.

If the panel looks correct only in night mode, the work is **not done**.

## Checklist (required before merge)

For each new semantic class prefix (e.g. `ops-com-*`, `ops-events-*`, `procedure-*`):

1. **Panel/card root** — light background (`#ffffff` or soft tint), visible border, dark text (`#0f172a`).
2. **Header / title / kicker / sub** — dark readable text (`#0f172a` / `#334155` / brand accent). Never leave night whites/grays (`#fff`, `#94a3b8`, `#cbd5e1`) as the only colors.
3. **Inputs / textareas** — white/light fill, dark text, `#94a3b8+` border; placeholder `#64748b` or darker.
4. **Buttons** — light inactive fill + dark label, or solid brand fill + **white** label with enough contrast.
5. **Nested boxes** (dropzones, import boxes, alerts, chips) — each needs its own `.theme-light` rule; children do not inherit enough from the root alone when dark backgrounds are set with high specificity.
6. Use `!important` on day overrides when dark rules set background/color directly (this codebase already does).

## Anti-patterns (do not ship)

- Dark `#0b1426` / `#0e1933` panels still visible in day mode.
- Light gray instructional text on dark leftover backgrounds.
- Day overrides for titles only, forgetting the **panel background**.
- Relying on Tailwind `text-slate-*` utilities without semantic CSS day overrides for custom panels.

## Verify

In browser/device with **Modo Día** (`body.theme-light`):

- Open the new panel expanded.
- Confirm background is light and all labels/inputs are dark and readable.
- Screenshot day mode before calling the UI done.

## Related surfaces

- Dashboard search: `.dashboard-info-search`
- Vivencias: `.ops-events-*`
- Comunicados: `.ops-com-*`
- SOP: `.procedure-*`
- TABLAS: `.ops-tables-*`
