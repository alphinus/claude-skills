# {{BRAND_NAME}} Layouts & Navigation Reference

## Table of Contents
- Sidebar + Main Layout
- Dashboard Grid
- Two-Column Split
- Top Bar Layout
- Responsive Breakpoints
- Theme Switching
- Sidebar Navigation
- Breadcrumbs & Tabs
- Command Palette
- Wizard/Stepper
- Login/Auth Layout
- Chart Patterns

## Sidebar + Main Layout

Primary layout pattern used in dashboard, admin, settings.

```css
body {
  display: flex;
  min-height: 100vh;
  background: {{BG}};
}
.sidebar {
  width: 240px;
  flex-shrink: 0;
  background: {{SIDEBAR_BG}};
  border-right: 1px solid rgba(255,255,255,0.06);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0; left: 0; bottom: 0;
  z-index: 10;
}
.main {
  flex: 1;
  margin-left: 240px;
  padding: 28px 32px;
  overflow-y: auto;
}
```

### Sidebar Structure
```html
<aside class="sidebar">
  <div class="sidebar-logo">{{BRAND_NAME}}</div>
  <nav class="sidebar-nav">
    <a class="nav-item active">Dashboard</a>
    <a class="nav-item">Events</a>
    <a class="nav-item">Streams</a>
  </nav>
  <div class="sidebar-footer">
    <div class="avatar-sm">MK</div>
    <div class="user-info">...</div>
  </div>
</aside>
```

### Sidebar Logo
```css
.sidebar-logo {
  padding: 20px 24px;
  font-size: 14px;
  letter-spacing: 5px;
  color: {{PRIMARY}};
  font-weight: 300;
  border-bottom: 1px solid rgba(255,255,255,0.04);
}
```

### Navigation Items
```css
.sidebar-nav { flex: 1; padding: 12px 0; display: flex; flex-direction: column; }
.nav-item {
  display: flex; align-items: center; gap: 12px;
  padding: 11px 20px;
  color: {{MUTED}}; font-size: 13px; font-weight: 400;
  border-left: 3px solid transparent;
  transition: all 0.2s; cursor: pointer; text-decoration: none;
}
.nav-item:hover { color: {{TEXT}}; background: rgba(255,255,255,0.02); }
.nav-item.active {
  color: {{PRIMARY}};
  background: rgba({{PRIMARY_RGB}},0.1);
  border-left-color: {{PRIMARY}};
}
```

### Sidebar Footer
```css
.sidebar-footer {
  padding: 16px 20px;
  border-top: 1px solid rgba(255,255,255,0.04);
  display: flex; align-items: center; gap: 12px;
}
.avatar-sm {
  width: 32px; height: 32px; border-radius: 8px;
  background: linear-gradient(135deg, {{PRIMARY_DARK}}, {{PRIMARY}});
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 700; color: {{BG}};
}
```

## Dashboard Grid

### Stats Row (4 columns)
```css
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}
```

### Content Row (2/3 + 1/3)
```css
.content-row {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
}
```

### Metrics Grid (6 columns)
```css
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 14px;
}
```

### Main Grid with Side Panel
```css
.main-grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 20px;
}
```

### Chart Area
```css
.chart-area {
  height: 200px;
  display: flex;
  align-items: flex-end;
  gap: 4px;
  padding: 0 8px;
}
.chart-bar {
  flex: 1;
  border-radius: 4px 4px 0 0;
  min-height: 8px;
  background: linear-gradient(to top, rgba({{PRIMARY_RGB}},0.2), rgba({{PRIMARY_RGB}},0.6));
  transition: all 0.3s;
}
.chart-bar:hover {
  background: linear-gradient(to top, rgba({{PRIMARY_RGB}},0.3), {{PRIMARY}});
}
```

### Sparkline
```css
.sparkline { display: flex; align-items: flex-end; gap: 2px; height: 28px; }
.spark-bar {
  width: 4px; border-radius: 2px;
  background: rgba({{PRIMARY_RGB}},0.4);
  transition: height 0.3s;
}
```

## Two-Column Split (Auth)

```css
body { display: flex; min-height: 100vh; }
.brand-panel {
  flex: 1;
  display: flex; flex-direction: column;
  justify-content: center; align-items: center;
  padding: 60px; position: relative; overflow: hidden;
  background: linear-gradient(135deg, rgba(30,58,95,0.3), {{BG}});
}
.form-panel {
  width: 480px;
  display: flex; flex-direction: column;
  justify-content: center; padding: 60px;
  background: rgba(20,30,51,0.5);
  border-left: 1px solid rgba(255,255,255,0.04);
}
```

### Decorative Orbs (Background)
```css
.brand-orb {
  position: absolute; border-radius: 50%;
  filter: blur(80px); pointer-events: none;
}
.brand-orb-1 {
  width: 300px; height: 300px;
  background: rgba({{PRIMARY_RGB}},0.08);
  top: 20%; left: 10%;
}
.brand-orb-2 {
  width: 200px; height: 200px;
  background: rgba(30,58,95,0.15);
  bottom: 20%; right: 20%;
}
```

## Top Bar Layout

```css
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 24px;
  background: rgba(255,255,255,0.02);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.topbar-left { display: flex; align-items: center; gap: 16px; }
.topbar-right { display: flex; align-items: center; gap: 16px; }
.topbar-logo { font-size: 13px; letter-spacing: 4px; color: {{PRIMARY}}; font-weight: 300; }
```

### Live Badge
```css
.live-badge {
  display: flex; align-items: center; gap: 8px;
  padding: 6px 14px; border-radius: 20px;
  background: rgba({{SUCCESS_RGB}},0.1);
  border: 1px solid rgba({{SUCCESS_RGB}},0.2);
  font-size: 12px; font-weight: 600; color: {{SUCCESS}};
}
.live-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: {{SUCCESS}};
  animation: pulse-dot 1.5s infinite;
}
```

## Responsive Breakpoints

| Breakpoint | Width | Columns | Usage |
|------------|-------|---------|-------|
| Mobile | 375px | 1 | Stacked, no sidebar |
| Tablet | 768px | 2 | Collapsed sidebar, 2-col grid |
| Desktop | 1024px | 3-4 | Full sidebar, multi-panel |
| Wide | 1440px | 4-6 | Extended metrics grid |

### Responsive Grid Pattern
```css
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}
```

### Mobile Adaptation
```css
@media (max-width: 768px) {
  .sidebar { display: none; }
  .main { margin-left: 0; padding: 16px; }
  .stats-row { grid-template-columns: 1fr; }
  .content-row { grid-template-columns: 1fr; }
}
@media (max-width: 1024px) {
  .stats-row { grid-template-columns: 1fr 1fr; }
  .metrics-grid { grid-template-columns: repeat(3, 1fr); }
}
```

## Theme Switching (Dark/Light)

### CSS Custom Properties
```css
:root {
  --bg: {{BG}};
  --surface: #1e293b;
  --border: #334155;
  --text: {{TEXT}};
  --text-secondary: {{MUTED}};
  --cyan: {{PRIMARY}};
  --sidebar-bg: {{SIDEBAR_BG}};
}

[data-theme="light"] {
  --bg: #f1f5f9;
  --surface: #ffffff;
  --border: #e2e8f0;
  --text: #1a202c;
  --text-secondary: {{MUTED}};
  --hover: #edf2f7;
  --sidebar-bg: #ffffff;
}
```

### Theme Toggle JavaScript
```javascript
const toggle = document.getElementById('themeSwitch');
toggle.addEventListener('change', () => {
  if (toggle.checked) {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
});

// Persist preference
localStorage.setItem('{{brand_name}}-theme', toggle.checked ? 'light' : 'dark');
```

### Smooth Theme Transition
```css
body { transition: background 0.3s, color 0.3s; }
.sidebar { transition: background 0.3s, border-color 0.3s; }
.card, .panel { transition: background 0.3s, border-color 0.3s; }
```

## Breadcrumbs & Tabs

### Panel Tabs
```css
.panel-tabs { display: flex; gap: 4px; }
.panel-tab {
  padding: 4px 12px; border-radius: 6px;
  font-size: 11px; cursor: pointer;
  transition: all 0.2s; background: transparent;
  border: none; color: {{MUTED}}; font-family: inherit;
}
.panel-tab.active {
  background: rgba({{PRIMARY_RGB}},0.08);
  color: {{PRIMARY}};
}
```

### Section Header Tabs
```css
.tabs { display: flex; gap: 8px; margin-bottom: 24px; }
.tab-btn {
  padding: 8px 20px; border-radius: 8px;
  font-size: 13px; font-weight: 400;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  color: {{MUTED}}; cursor: pointer; transition: all 0.2s;
}
.tab-btn.active {
  color: {{PRIMARY}};
  border-color: rgba({{PRIMARY_RGB}},0.3);
  background: rgba({{PRIMARY_RGB}},0.06);
}
```

## Command Palette

### Overlay + Modal
```css
.cmd-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex; align-items: flex-start; justify-content: center;
  padding-top: 15vh;
  opacity: 0; pointer-events: none; transition: opacity 0.2s;
}
.cmd-overlay.open { opacity: 1; pointer-events: auto; }

.cmd-palette {
  width: 580px; max-height: 440px;
  background: {{SURFACE}};
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
  transform: translateY(-10px) scale(0.98);
  transition: transform 0.2s;
}
.cmd-overlay.open .cmd-palette {
  transform: translateY(0) scale(1);
}
```

### Search Input
```css
.cmd-input {
  width: 100%; padding: 16px 20px 16px 48px;
  background: transparent;
  border: none; border-bottom: 1px solid rgba(255,255,255,0.06);
  font-size: 15px; color: {{TEXT}}; font-family: inherit;
}
```

### Keyboard Shortcut
```javascript
document.addEventListener('keydown', e => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    toggle();
  }
  if (e.key === 'Escape') overlay.classList.remove('open');
});
```

### Footer Hints
```css
.cmd-footer {
  padding: 10px 16px;
  display: flex; justify-content: space-between;
  border-top: 1px solid rgba(255,255,255,0.06);
  font-size: 11px; color: {{MUTED}};
}
kbd {
  padding: 2px 6px; border-radius: 4px;
  background: rgba(255,255,255,0.06);
  font-size: 10px;
}
```

## Wizard / Stepper

### Progress Indicator
```css
.wizard-progress { display: flex; align-items: center; margin-bottom: 48px; }
.step-dot {
  width: 36px; height: 36px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 500;
  background: rgba(255,255,255,0.04);
  border: 2px solid rgba(255,255,255,0.08);
  color: {{MUTED}}; transition: all 0.4s; flex-shrink: 0;
}
.step-dot.active {
  background: rgba({{PRIMARY_RGB}},0.1);
  border-color: {{PRIMARY}}; color: {{PRIMARY}};
  box-shadow: 0 0 16px rgba({{PRIMARY_RGB}},0.15);
}
.step-dot.done {
  background: {{PRIMARY}};
  border-color: {{PRIMARY}};
  color: {{BG}};
}
.step-line { flex: 1; height: 2px; background: rgba(255,255,255,0.06); margin: 0 8px; overflow: hidden; }
.step-line-fill { height: 100%; background: {{PRIMARY}}; width: 0; transition: width 0.6s ease; }
```

### Wizard Card
```css
.wizard-card {
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 20px;
  padding: 40px;
  min-height: 380px;
}
.wizard-step { display: none; animation: stepFade 0.4s ease; }
.wizard-step.active { display: flex; flex-direction: column; }
@keyframes stepFade {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}
```

### Option Card Grid
```css
.option-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.option-card {
  padding: 16px; border-radius: 10px; cursor: pointer;
  text-align: center; font-size: 13px; color: {{MUTED}};
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.06);
  transition: all 0.3s;
}
.option-card.selected {
  border-color: rgba({{PRIMARY_RGB}},0.4);
  background: rgba({{PRIMARY_RGB}},0.06);
  color: {{PRIMARY}};
}
```

## Login / Auth Layout

### Social Login Button
```css
.social-btn {
  width: 100%; padding: 12px;
  border-radius: 10px; font-size: 13px;
  display: flex; align-items: center; justify-content: center; gap: 10px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  color: {{TEXT}}; cursor: pointer; transition: all 0.3s;
}
.social-btn:hover { background: rgba(255,255,255,0.06); }
```

### Divider
```css
.divider {
  display: flex; align-items: center; gap: 16px;
  margin: 24px 0; color: {{MUTED}}; font-size: 12px;
}
.divider::before, .divider::after {
  content: ''; flex: 1; height: 1px;
  background: rgba(255,255,255,0.06);
}
```

### Form Link
```css
.form-link {
  font-size: 12px; color: {{PRIMARY}};
  text-decoration: none; transition: color 0.2s;
}
.form-link:hover { color: {{PRIMARY_DARK}}; }
```

## Event Log (Realtime)

```css
.event-row {
  display: grid;
  grid-template-columns: 90px 1fr 100px 70px 60px;
  align-items: center;
  padding: 10px 18px;
  font-size: 13px;
  transition: background 0.15s;
  border-bottom: 1px solid rgba(255,255,255,0.03);
}
.event-row:hover { background: rgba({{PRIMARY_RGB}},0.04); }

.event-log {
  max-height: 420px;
  overflow-y: auto;
}
```

## Page Header
```css
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}
.page-title { font-size: 24px; font-weight: 300; }
.header-actions { display: flex; gap: 10px; }
```

## Activity Feed
```css
.activity-list { display: flex; flex-direction: column; }
.activity-item {
  display: flex; align-items: flex-start; gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255,255,255,0.03);
}
.activity-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: {{PRIMARY}}; margin-top: 6px; flex-shrink: 0;
}
.activity-text { font-size: 13px; color: {{MUTED}}; line-height: 1.5; }
.activity-time { font-size: 11px; color: rgba(113,128,150,0.6); margin-top: 4px; }
```

## Overflow Handling
```css
/* Horizontal scroll for tables */
.table-wrap { overflow-x: auto; }

/* Vertical scroll for content areas */
.main { overflow-y: auto; }
.event-log { max-height: 420px; overflow-y: auto; }

/* Smooth scrolling */
html { scroll-behavior: smooth; }
```
