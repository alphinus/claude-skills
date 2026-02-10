---
name: eluma-brand-system
description: >
  Apply the complete Eluma design system to any app or component. Includes dark/light themes, 124 UI component patterns, animations, gamification elements, responsive layouts, and brand assets. Use when building any Eluma-related UI, applying Eluma branding to a new app, creating pages/components in the Eluma style, or when the user says "apply Eluma design", "Eluma style", "Eluma branding", "use Eluma UI", or references the Eluma design system. Also use when building any app for eluma.ch. Covers: React, Vue, Svelte, HTML/CSS, Tailwind, Next.js - any web stack.
---

# Eluma Brand System

Complete design system for the Eluma event-driven ecosystem (eluma.ch). Apply to any new app to get
the full Eluma look: dark glassmorphism UI, cyan accents, smooth animations, gamification, and responsive layouts.

## Workflow

1. **Detect stack** - Identify the project's tech stack (React, Vue, HTML, Tailwind, etc.)
2. **Apply design tokens** - Copy `assets/design-tokens.css` or adapt `assets/design-tokens.json` for the stack
3. **Apply theme system** - Set up dark/light theme switching with CSS custom properties
4. **Apply component patterns** - Use reference patterns for buttons, cards, modals, forms, etc.
5. **Apply layout patterns** - Use sidebar+main, dashboard grids, responsive breakpoints
6. **Apply animations** - Add transitions, scroll animations, micro-interactions
7. **Apply gamification** (if applicable) - Achievements, XP bars, leaderboards, progress systems
8. **Apply brand assets** - Logo SVGs from `assets/` directory

## Quick Reference: Core Variables

```css
:root {
  --dark-bg: #0f172a;
  --card-bg: #141e33;
  --surface: #1e293b;
  --cyan: #4fd1c5;
  --cyan-dark: #38b2ac;
  --cloud: #f8fafc;
  --muted: #718096;
  --border: rgba(255,255,255,0.06);
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
  --info: #3b82f6;
}
```

Light theme override: `[data-theme="light"]` swaps all surface/text colors. See `assets/design-tokens.css`.

## Quick Reference: Font Stack

```css
font-family: system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif;
```

Monospace: `'SF Mono', Monaco, 'Fira Code', monospace`

## Quick Reference: Key Patterns

**Gradient text:**
```css
background: linear-gradient(135deg, #4fd1c5, #38b2ac);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

**Glass card:**
```css
background: rgba(255,255,255,0.02);
border: 1px solid rgba(255,255,255,0.06);
border-radius: 14px;
backdrop-filter: blur(16px);
```

**Primary button:**
```css
background: linear-gradient(135deg, #4fd1c5, #38b2ac);
color: #0f172a; border: none; border-radius: 10px;
padding: 12px 28px; font-weight: 600;
transition: all 0.3s;
/* hover: transform: translateY(-2px); box-shadow: 0 8px 24px rgba(79,209,197,0.25); */
```

**Ghost button:**
```css
background: rgba(79,209,197,0.1);
border: 1px solid rgba(79,209,197,0.3);
color: #4fd1c5; border-radius: 8px;
/* hover: background: rgba(79,209,197,0.2); */
```

**Status badges:**
```css
.badge { padding: 3px 10px; border-radius: 20px; font-size: 12px; }
/* success: bg rgba(16,185,129,0.1) color #10b981 */
/* warning: bg rgba(245,158,11,0.1) color #f59e0b */
/* error:   bg rgba(239,68,68,0.1)  color #ef4444 */
/* info:    bg rgba(79,209,197,0.1)  color #4fd1c5 */
```

## Detailed References

Read these reference files based on what you need:

- **UI Components** (buttons, cards, modals, forms, inputs, toasts, tables, toggles, badges, empty states, spinners, skeletons): See `references/components.md`
- **Animations & Gamification** (keyframes, transitions, scroll animations, 3D transforms, particles, confetti, achievements, XP bars, leaderboards, level systems): See `references/animations.md`
- **Layouts & Navigation** (sidebar+main, dashboard grids, responsive breakpoints, theme switching, tables, wizards, command palette, navigation): See `references/layouts.md`

## Assets

- `assets/eluma-logo-light.svg` - Full logo for light backgrounds
- `assets/eluma-logo-dark.svg` - Full logo for dark backgrounds
- `assets/eluma-icon.svg` - Icon mark only (hexagonal E)
- `assets/design-tokens.css` - Complete CSS custom properties (copy to project)
- `assets/design-tokens.json` - JSON format (for JS/Tailwind config)

## Framework-Specific Integration

### React / Next.js
Import design-tokens.css in root layout. Use CSS modules or styled-components with token values.
For theme switching, use `useEffect` to toggle `data-theme` attribute on `<html>`.

### Tailwind CSS
Extend `tailwind.config.js` with values from design-tokens.json:
```js
theme: { extend: { colors: { cyan: { DEFAULT: '#4fd1c5', dark: '#38b2ac' }, dark: { bg: '#0f172a' } } } }
```

### Vue / Svelte
Import design-tokens.css globally. Use CSS custom properties directly in components.

## Design Principles

1. **Dark-first** - Dark backgrounds (#0f172a), light text (#f8fafc), cyan accents (#4fd1c5)
2. **Glassmorphism** - Translucent surfaces with subtle borders and backdrop blur
3. **Minimal** - Thin font weights (200-400 for headings), generous whitespace
4. **Micro-interactions** - Every interactive element has a transition (0.2-0.3s)
5. **Hexagonal motif** - The hexagon shape appears in icons, badges, decorative elements
6. **German-first i18n** - All UI text uses proper Unicode (ae->ä, oe->ö, ue->ü, ss->ß)
