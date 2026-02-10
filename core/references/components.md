# {{BRAND_NAME}} UI Components Reference

## Table of Contents
- Buttons
- Cards
- Modals & Dialogs
- Forms & Inputs
- Toast Notifications
- Tables
- Badges & Status
- Toggle Switches
- Empty States
- Loading Spinners
- Skeleton Screens
- Accordion
- Tabs
- Tooltips
- Icons (SVG)

## Buttons

### Primary Button
```css
.btn-primary {
  background: linear-gradient(135deg, {{PRIMARY}}, {{PRIMARY_DARK}});
  color: {{BG}};
  border: none;
  border-radius: 10px;
  padding: 12px 28px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  font-family: inherit;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba({{PRIMARY_RGB}},0.25);
}
```

### Ghost Button
```css
.btn-ghost {
  background: rgba({{PRIMARY_RGB}},0.1);
  border: 1px solid rgba({{PRIMARY_RGB}},0.3);
  color: {{PRIMARY}};
  border-radius: 8px;
  padding: 10px 24px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s;
  font-family: inherit;
}
.btn-ghost:hover {
  background: rgba({{PRIMARY_RGB}},0.2);
  transform: translateY(-1px);
}
```

### Danger Button
```css
.btn-danger {
  background: rgba({{ERROR_RGB}},0.1);
  border: 1px solid rgba({{ERROR_RGB}},0.3);
  color: {{ERROR}};
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.3s;
}
.btn-danger:hover {
  background: rgba({{ERROR_RGB}},0.2);
}
```

### Icon Button
```css
.btn-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.03);
  color: {{MUTED}};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-icon:hover {
  color: {{TEXT}};
  border-color: rgba(255,255,255,0.12);
}
```

## Cards

### Glass Card
```css
.card {
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px;
  padding: 24px;
  transition: all 0.3s;
}
.card:hover {
  border-color: rgba({{PRIMARY_RGB}},0.3);
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.3);
}
```

### Stat Card (with colored top border)
```css
.stat-card {
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 14px;
  padding: 20px;
  position: relative;
  overflow: hidden;
}
.stat-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--cyan), transparent);
}
.stat-value { font-size: 28px; font-weight: 200; color: {{TEXT}}; }
.stat-label { font-size: 12px; color: {{MUTED}}; letter-spacing: 1px; }
.stat-change { font-size: 12px; }
.stat-change.up { color: {{SUCCESS}}; }
.stat-change.down { color: {{ERROR}}; }
```

### Panel
```css
.panel {
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 14px;
  padding: 20px;
}
.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.panel-title { font-size: 14px; font-weight: 400; }
```

## Modals & Dialogs

### Modal Overlay
```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}
.modal-overlay.open {
  opacity: 1;
  pointer-events: auto;
}
```

### Modal Content
```css
.modal {
  background: {{SURFACE}};
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  padding: 32px;
  width: 90%;
  max-width: 480px;
  transform: scale(0.9) translateY(20px);
  transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
}
.modal-overlay.open .modal {
  transform: scale(1) translateY(0);
}
.modal-title { font-size: 20px; font-weight: 400; margin-bottom: 8px; }
.modal-desc { font-size: 13px; color: {{MUTED}}; line-height: 1.6; }
.modal-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 24px; }
```

### Confirm Dialog
```css
.confirm-icon {
  width: 56px; height: 56px;
  border-radius: 14px;
  background: rgba({{ERROR_RGB}},0.1);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 16px; font-size: 24px;
}
```

## Forms & Inputs

### Text Input
```css
.input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 14px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  color: {{TEXT}};
  font-family: inherit;
  transition: all 0.3s;
}
.input:focus {
  outline: none;
  border-color: rgba({{PRIMARY_RGB}},0.4);
  background: rgba(255,255,255,0.05);
  box-shadow: 0 0 0 3px rgba({{PRIMARY_RGB}},0.08);
}
.input::placeholder { color: {{MUTED}}; }
```

### Input with Label
```css
.field-label {
  display: block;
  font-size: 12px;
  color: {{MUTED}};
  margin-bottom: 6px;
  font-weight: 400;
  letter-spacing: 0.5px;
}
```

### Select
```css
.select {
  width: 100%;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 14px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  color: {{TEXT}};
  font-family: inherit;
  appearance: none;
  cursor: pointer;
}
```

### Textarea
```css
.textarea {
  width: 100%;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 14px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  color: {{TEXT}};
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  transition: all 0.3s;
}
```

### Checkbox & Radio
```css
.checkbox {
  width: 18px; height: 18px;
  border-radius: 4px;
  border: 2px solid rgba(255,255,255,0.15);
  background: transparent;
  cursor: pointer;
  accent-color: {{PRIMARY}};
}
```

### Radio Card (Selection)
```css
.radio-card {
  background: rgba(255,255,255,0.02);
  border: 2px solid rgba(255,255,255,0.06);
  border-radius: 10px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}
.radio-card:hover { border-color: rgba({{PRIMARY_RGB}},0.3); }
.radio-card.selected {
  border-color: {{PRIMARY}};
  background: rgba({{PRIMARY_RGB}},0.06);
  color: {{PRIMARY}};
}
```

## Toast Notifications

### Toast Container
```css
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
```

### Toast
```css
.toast {
  background: {{SURFACE}};
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 320px;
  max-width: 420px;
  animation: toastIn 0.4s cubic-bezier(0.34,1.56,0.64,1);
  border-left: 3px solid;
}
.toast.success { border-left-color: {{SUCCESS}}; }
.toast.error { border-left-color: {{ERROR}}; }
.toast.warning { border-left-color: {{WARNING}}; }
.toast.info { border-left-color: {{PRIMARY}}; }

@keyframes toastIn {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
@keyframes toastOut {
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(100%); opacity: 0; }
}
```

### Toast Icon
```css
.toast-icon {
  width: 28px; height: 28px;
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; font-size: 14px;
}
.toast-icon.success { background: rgba({{SUCCESS_RGB}},0.15); color: {{SUCCESS}}; }
.toast-icon.error { background: rgba({{ERROR_RGB}},0.15); color: {{ERROR}}; }
.toast-icon.warning { background: rgba({{WARNING_RGB}},0.15); color: {{WARNING}}; }
.toast-icon.info { background: rgba({{PRIMARY_RGB}},0.15); color: {{PRIMARY}}; }
```

## Tables

### Data Table
```css
.table-wrap {
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 12px;
  overflow: hidden;
}
table { width: 100%; border-collapse: collapse; }
thead th {
  text-align: left;
  padding: 14px 16px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: rgba(0,0,0,0.2);
  border-bottom: 1px solid rgba(255,255,255,0.05);
  font-weight: 600;
  color: {{MUTED}};
}
tbody td {
  padding: 14px 16px;
  border-bottom: 1px solid rgba(255,255,255,0.03);
  font-size: 14px;
}
tr:last-child td { border-bottom: none; }
tbody tr:hover { background: rgba({{PRIMARY_RGB}},0.04); }
```

### Pagination
```css
.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
}
.page-btn {
  width: 34px; height: 34px;
  border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.06);
  background: transparent;
  color: {{MUTED}};
  font-size: 13px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}
.page-btn:hover { border-color: {{PRIMARY}}; color: {{PRIMARY}}; }
.page-btn.active {
  background: {{PRIMARY}}; color: {{BG}};
  border-color: {{PRIMARY}}; font-weight: 600;
}
```

## Badges & Status

### Semantic Badges
```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}
.badge-success { background: rgba({{SUCCESS_RGB}},0.1); color: {{SUCCESS}}; }
.badge-warning { background: rgba({{WARNING_RGB}},0.1); color: {{WARNING}}; }
.badge-error { background: rgba({{ERROR_RGB}},0.1); color: {{ERROR}}; }
.badge-info { background: rgba({{PRIMARY_RGB}},0.1); color: {{PRIMARY}}; }
.badge-admin { background: rgba({{PRIMARY_RGB}},0.15); color: {{PRIMARY}}; }
.badge-editor { background: rgba({{INFO_RGB}},0.15); color: {{INFO}}; }
```

### Status Dots
```css
.status-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  display: inline-block;
}
.status-dot.online { background: {{SUCCESS}}; box-shadow: 0 0 6px rgba({{SUCCESS_RGB}},0.5); }
.status-dot.warning { background: {{WARNING}}; animation: pulse-dot 1.5s infinite; }
.status-dot.error { background: {{ERROR}}; animation: pulse-dot 1s infinite; }

@keyframes pulse-dot {
  0%,100% { opacity: 1; box-shadow: 0 0 0 0 rgba({{SUCCESS_RGB}},0.4); }
  50% { opacity: 0.7; box-shadow: 0 0 0 6px rgba({{SUCCESS_RGB}},0); }
}
```

## Toggle Switches

```css
.toggle-switch {
  position: relative;
  width: 44px; height: 24px;
}
.toggle-switch input { display: none; }
.toggle-track {
  position: absolute; inset: 0;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
}
.toggle-track::after {
  content: '';
  position: absolute;
  width: 18px; height: 18px;
  border-radius: 50%;
  background: {{MUTED}};
  top: 2px; left: 2px;
  transition: all 0.3s;
}
.toggle-switch input:checked + .toggle-track {
  background: {{PRIMARY}};
  border-color: {{PRIMARY}};
}
.toggle-switch input:checked + .toggle-track::after {
  background: {{BG}};
  left: 22px;
}
```

## Empty States

```css
.empty-state {
  text-align: center;
  padding: 60px 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.empty-illust {
  width: 100px; height: 100px;
  margin-bottom: 20px;
  animation: float 4s ease-in-out infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
.empty-title { font-size: 16px; font-weight: 400; margin-bottom: 8px; }
.empty-desc { font-size: 13px; color: {{MUTED}}; line-height: 1.6; max-width: 240px; margin-bottom: 20px; }
```

Use inline SVG illustrations with {{PRIMARY}} strokes (opacity 0.3) for empty state icons.
Common motifs: hexagons, search glass, bell, user silhouette, document.

## Loading Spinners

### Orbital Spinner
```css
.spinner-orbital { width: 48px; height: 48px; position: relative; }
.spinner-orbital .ring {
  position: absolute; inset: 0;
  border: 2px solid transparent;
  border-radius: 50%;
  border-top-color: {{PRIMARY}};
  animation: spin 1.2s linear infinite;
}
.spinner-orbital .ring:nth-child(2) {
  inset: 6px; border-top-color: {{PRIMARY_DARK}};
  animation-duration: 0.8s; animation-direction: reverse;
}
@keyframes spin { to { transform: rotate(360deg); } }
```

### Pulse Dots
```css
.spinner-pulse { display: flex; gap: 6px; }
.spinner-pulse span {
  width: 10px; height: 10px; border-radius: 50%;
  background: {{PRIMARY}}; animation: pulse 1.4s ease-in-out infinite;
}
.spinner-pulse span:nth-child(2) { animation-delay: 0.2s; }
.spinner-pulse span:nth-child(3) { animation-delay: 0.4s; }
@keyframes pulse {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; }
  40% { transform: scale(1); opacity: 1; }
}
```

### Wave Bars
```css
.spinner-wave { display: flex; gap: 4px; align-items: center; }
.spinner-wave span {
  width: 4px; height: 20px; border-radius: 2px;
  background: {{PRIMARY}}; animation: wave 1.2s ease-in-out infinite;
}
.spinner-wave span:nth-child(n) { animation-delay: calc(n * 0.1s); }
@keyframes wave {
  0%, 100% { height: 12px; opacity: 0.4; }
  50% { height: 32px; opacity: 1; }
}
```

### Gradient Ring
```css
.spinner-gradient {
  width: 48px; height: 48px; border-radius: 50%;
  background: conic-gradient(from 0deg, transparent, {{PRIMARY}});
  animation: spin 1s linear infinite;
  position: relative;
}
.spinner-gradient::after {
  content: ''; position: absolute; inset: 4px;
  border-radius: 50%; background: {{BG}};
}
```

### Progress Beam
```css
.spinner-beam {
  width: 120px; height: 3px;
  background: rgba({{PRIMARY_RGB}},0.15);
  border-radius: 2px; overflow: hidden;
}
.spinner-beam span {
  display: block; width: 40%; height: 100%;
  background: linear-gradient(90deg, transparent, {{PRIMARY}}, transparent);
  animation: beam 1.5s ease-in-out infinite;
}
@keyframes beam { 0% { transform: translateX(-100%); } 100% { transform: translateX(350%); } }
```

## Skeleton Screens

```css
.shimmer {
  background: linear-gradient(90deg, rgba({{PRIMARY_RGB}},0.03) 25%, rgba({{PRIMARY_RGB}},0.08) 50%, rgba({{PRIMARY_RGB}},0.03) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.8s ease-in-out infinite;
}
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

.skel-line { height: 12px; border-radius: 6px; }
.skel-line-short { width: 40%; }
.skel-line-med { width: 70%; }
.skel-line-long { width: 95%; }
.skel-avatar { width: 48px; height: 48px; border-radius: 12px; }
.skel-img { height: 140px; border-radius: 12px; }
```

## Accordion

```css
.acc-item {
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 12px;
  margin-bottom: 8px;
  overflow: hidden;
}
.acc-header {
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  transition: all 0.2s;
}
.acc-header:hover { background: rgba(255,255,255,0.02); }
.acc-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}
.acc-item.open .acc-body { max-height: 200px; }
.acc-content {
  padding: 0 20px 16px;
  font-size: 13px;
  color: {{MUTED}};
  line-height: 1.6;
}
```

## Tabs

```css
.tabs { display: flex; gap: 4px; }
.tab {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  background: transparent;
  border: none;
  color: {{MUTED}};
  font-family: inherit;
}
.tab:hover { color: {{TEXT}}; background: rgba(255,255,255,0.04); }
.tab.active {
  background: rgba({{PRIMARY_RGB}},0.08);
  color: {{PRIMARY}};
}
```

## Common SVG Icon Patterns

All icons use inline SVG with the following defaults:
```html
<svg width="20" height="20" viewBox="0 0 24 24" fill="none"
     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
```

Common icon paths (Feather-style):
- Check: `<polyline points="20 6 9 17 4 12"/>`
- X: `<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>`
- Arrow right: `<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>`
- Search: `<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>`
- Bell: `<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>`
- Settings: `<circle cx="12" cy="12" r="3"/><path d="M19.4 15..."/>`
- Plus: `<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>`

Hexagon badge icon (for gamification):
```html
<svg viewBox="0 0 60 60">
  <polygon points="30,2 52,16 52,44 30,58 8,44 8,16"
           fill="rgba({{PRIMARY_RGB}},0.2)" stroke="{{PRIMARY}}" stroke-width="1.5"/>
</svg>
```
