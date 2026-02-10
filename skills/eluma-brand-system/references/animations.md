# Eluma Animations & Gamification Reference

## Table of Contents
- CSS Keyframes
- Scroll Animations (Intersection Observer)
- 3D Transforms
- Particle Systems
- Celebration Effects
- Micro-interactions
- Gamification: Achievements
- Gamification: XP & Progress
- Gamification: Leaderboard
- Gamification: Level Roadmap

## CSS Keyframes Library

### spin - Rotation (spinners, loading)
```css
@keyframes spin { to { transform: rotate(360deg); } }
/* Usage: animation: spin 1.2s linear infinite; */
```

### pulse - Scale pulse (dots, indicators)
```css
@keyframes pulse {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; }
  40% { transform: scale(1); opacity: 1; }
}
/* Usage: animation: pulse 1.4s ease-in-out infinite; stagger with animation-delay */
```

### wave - Height wave (wave bars)
```css
@keyframes wave {
  0%, 100% { height: 12px; opacity: 0.4; }
  50% { height: 32px; opacity: 1; }
}
```

### float - Gentle floating (empty states, illustrations)
```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
/* Usage: animation: float 4s ease-in-out infinite; */
```

### shimmer - Skeleton loading
```css
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
/* Usage: background-size: 200% 100%; animation: shimmer 1.8s ease-in-out infinite; */
```

### beam - Progress beam
```css
@keyframes beam {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(350%); }
}
```

### morph - Shape morphing (square to circle)
```css
@keyframes morph {
  0% { border-radius: 0; transform: rotate(0deg) scale(1); }
  25% { border-radius: 50%; transform: rotate(90deg) scale(0.8); }
  50% { border-radius: 4px; transform: rotate(180deg) scale(1); }
  75% { border-radius: 50%; transform: rotate(270deg) scale(0.8); }
  100% { border-radius: 0; transform: rotate(360deg) scale(1); }
}
```

### toastIn / toastOut - Toast slide
```css
@keyframes toastIn {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
@keyframes toastOut {
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(100%); opacity: 0; }
}
```

### stepFade - Wizard step transitions
```css
@keyframes stepFade {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}
```

### badgePulse - Achievement glow
```css
@keyframes badgePulse {
  0%, 100% { filter: drop-shadow(0 0 6px rgba(79,209,197,0.15)); }
  50% { filter: drop-shadow(0 0 14px rgba(79,209,197,0.35)); }
}
/* Usage: animation: badgePulse 3s ease-in-out infinite; */
```

### pulse-dot - Live indicator
```css
@keyframes pulse-dot {
  0%,100% { opacity: 1; box-shadow: 0 0 0 0 rgba(16,185,129,0.4); }
  50% { opacity: 0.7; box-shadow: 0 0 0 6px rgba(16,185,129,0); }
}
```

### meshMove - Gradient orb background
```css
@keyframes meshMove {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -20px) scale(1.1); }
  66% { transform: translate(-20px, 30px) scale(0.9); }
}
/* Apply to blurred gradient orbs, durations: 8s, 10s, 12s */
```

### checkPop - Success checkmark
```css
@keyframes checkPop {
  0% { transform: scale(0); }
  100% { transform: scale(1); }
}
/* Usage: animation: checkPop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); */
```

## Scroll Animations (Intersection Observer)

### Fade In from Bottom
```css
.fade-item {
  opacity: 0;
  transform: translateY(60px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.fade-item.visible {
  opacity: 1;
  transform: translateY(0);
}
```

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.fade-item').forEach(el => observer.observe(el));
```

### Slide In from Left/Right
```css
.slide-item {
  opacity: 0; transform: translateX(-80px);
  transition: all 0.7s ease;
}
.slide-item.reverse { transform: translateX(80px); }
.slide-item.visible { opacity: 1; transform: translateX(0); }
```

### Scale Up with Spring
```css
.scale-item {
  opacity: 0; transform: scale(0.5);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.scale-item.visible { opacity: 1; transform: scale(1); }
```

### Staggered Grid
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 150);
    }
  });
}, { threshold: 0.15 });
```

### Counter Animation
```javascript
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const start = performance.now();
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target).toLocaleString('de-CH') + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
```

### Word-by-Word Text Reveal
```css
.reveal-word {
  opacity: 0; transform: translateY(20px);
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.reveal-word.visible { opacity: 1; transform: translateY(0); }
```
Stagger delay: index * 80ms per word.

## 3D Transforms

### Card Flip
```css
.flip-container { perspective: 1000px; }
.flip-inner {
  transition: transform 0.7s;
  transform-style: preserve-3d;
}
.flip-container:hover .flip-inner { transform: rotateY(180deg); }
.flip-front, .flip-back { backface-visibility: hidden; }
.flip-back { transform: rotateY(180deg); }
```

### Mouse-Tracked 3D Tilt
```javascript
card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const rotateX = ((y - rect.height/2) / (rect.height/2)) * -15;
  const rotateY = ((x - rect.width/2) / (rect.width/2)) * 15;
  card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
});
card.addEventListener('mouseleave', () => {
  card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale(1)';
});
```

### 3D Cube
```css
.cube { transform-style: preserve-3d; animation: cubeRotate 8s linear infinite; }
.cube-face { position: absolute; backface-visibility: hidden; }
.face-front { transform: translateZ(70px); }
.face-back { transform: rotateY(180deg) translateZ(70px); }
.face-right { transform: rotateY(90deg) translateZ(70px); }
.face-left { transform: rotateY(-90deg) translateZ(70px); }
@keyframes cubeRotate {
  0% { transform: rotateX(-20deg) rotateY(0deg); }
  100% { transform: rotateX(-20deg) rotateY(360deg); }
}
```

### Perspective Zoom Layers
```css
.zoom-container { perspective: 800px; }
.zoom-layer { transition: transform 0.5s ease; }
.zoom-layer.l1 { transform: translateZ(-40px); }
.zoom-layer.l2 { transform: translateZ(-20px); }
.zoom-layer.l3 { transform: translateZ(0); }
.zoom-container:hover .zoom-layer.l3 { transform: translateZ(20px); }
```

## Particle System

```javascript
class Particle {
  constructor(x, y) {
    this.x = x || Math.random() * W;
    this.y = y || Math.random() * H;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
    this.size = 1.5 + Math.random() * 2.5;
    this.life = 1;
  }
  update() {
    this.vx *= 0.99; this.vy *= 0.99;
    this.x += this.vx; this.y += this.vy;
    // Wrap edges
    if (this.x < 0) this.x = W; if (this.x > W) this.x = 0;
    if (this.y < 0) this.y = H; if (this.y > H) this.y = 0;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(79,209,197, ${this.life * 0.8})`;
    ctx.fill();
  }
}

// Connection lines between nearby particles
function drawConnections(particles, ctx, maxDist = 120) {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < maxDist) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(79,209,197,${0.15 * (1 - dist/maxDist)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}
```

## Celebration Effects

### Confetti Burst
```javascript
function fireConfetti(canvas, ctx) {
  const colors = ['#4fd1c5','#38b2ac','#f59e0b','#ed64a6','#9f7aea','#48bb78'];
  for (let i = 0; i < 150; i++) {
    particles.push({
      x: canvas.width/2, y: canvas.height*0.6,
      vx: (Math.random()-0.5)*16, vy: -Math.random()*18-4,
      gravity: 0.4, life: 1, decay: 0.008+Math.random()*0.008,
      w: 6+Math.random()*4, h: 4+Math.random()*3,
      rot: Math.random()*360, rotSpeed: (Math.random()-0.5)*12,
      color: colors[Math.floor(Math.random()*colors.length)]
    });
  }
}
```

### Fireworks
```javascript
function fireFireworks(canvas) {
  const points = [
    { x: canvas.width*0.3, y: canvas.height*0.3 },
    { x: canvas.width*0.5, y: canvas.height*0.25 },
    { x: canvas.width*0.7, y: canvas.height*0.35 }
  ];
  points.forEach((p, i) => {
    setTimeout(() => {
      for (let j = 0; j < 60; j++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;
        particles.push({
          x: p.x, y: p.y,
          vx: Math.cos(angle)*speed, vy: Math.sin(angle)*speed,
          gravity: 0.05, life: 1, decay: 0.015,
          size: Math.random()*3+1, trail: []
        });
      }
    }, i * 300);
  });
}
```

## Micro-interactions

### Hover Lift
```css
.hover-lift { transition: all 0.3s; }
.hover-lift:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.3);
}
```

### Hover Glow
```css
.hover-glow { transition: all 0.3s; }
.hover-glow:hover {
  box-shadow: 0 0 20px rgba(79,209,197,0.15);
  border-color: rgba(79,209,197,0.3);
}
```

### Click Feedback
```css
.click-feedback:active { transform: scale(0.97); }
```

### Focus Ring
```css
.focus-ring:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(79,209,197,0.08);
  border-color: rgba(79,209,197,0.4);
}
```

## Easing Functions

| Name | Value | Use |
|------|-------|-----|
| Default | `ease` | General animations |
| Spring | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Scale/pop effects |
| Material | `cubic-bezier(0.4, 0, 0.2, 1)` | UI transitions |
| Linear | `linear` | Continuous rotation |
| Smooth | `ease-in-out` | Long animations |

## Gamification: Achievement Badges

### Badge Card
```css
.badge-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 16px;
  padding: 28px 20px;
  text-align: center;
  transition: transform 0.25s, box-shadow 0.25s;
}
.badge-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.3);
}
.badge-card.locked { opacity: 0.45; filter: grayscale(0.7); }
.badge-card.unlocked .badge-icon { animation: badgePulse 3s ease-in-out infinite; }
```

### Rarity System
```css
.rarity {
  font-size: 0.7rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: 1.2px; padding: 4px 12px; border-radius: 20px;
}
.rarity.bronze { color: #cd7f32; border: 1px solid rgba(205,127,50,0.3); }
.rarity.silver { color: #c0c0c0; border: 1px solid rgba(192,192,192,0.3); }
.rarity.gold { color: #ffd700; border: 1px solid rgba(255,215,0,0.3); }
.rarity.rare { color: #9f7aea; border: 1px solid rgba(159,122,234,0.3); }
.rarity.epic { color: #ed64a6; border: 1px solid rgba(237,100,166,0.3); }
.rarity.legendary { color: #ed8936; border: 1px solid rgba(237,137,54,0.3); }
```

### Hexagon Badge SVG
```html
<svg viewBox="0 0 60 60">
  <polygon points="30,2 52,16 52,44 30,58 8,44 8,16"
           fill="COLOR33" stroke="COLOR" stroke-width="1.5" opacity=".9"/>
  <!-- icon content inside -->
</svg>
```

## Gamification: XP & Progress

### XP Bar
```css
.xp-bar {
  height: 14px;
  background: rgba(255,255,255,0.08);
  border-radius: 10px;
  overflow: hidden;
}
.xp-fill {
  height: 100%;
  background: linear-gradient(90deg, #38b2ac, #4fd1c5);
  border-radius: 10px;
  transition: width 1s ease;
}
.xp-fill::after {
  content: '';
  position: absolute; right: 0; top: 0; bottom: 0;
  width: 40px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25));
  border-radius: 0 10px 10px 0;
}
```

### Profile Avatar
```css
.profile-avatar {
  width: 80px; height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #38b2ac, #4fd1c5);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.8rem; font-weight: 800; color: #0f172a;
}
```

### Activity Log Entry
```css
.activity-item {
  display: flex; justify-content: space-between; align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.activity-dot { width: 8px; height: 8px; border-radius: 50%; background: #4fd1c5; }
.activity-xp { font-weight: 700; color: #48bb78; }
```

### Perk Items
```css
.perk-item {
  display: flex; align-items: center; gap: 12px;
  padding: 12px; border-radius: 10px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.06);
}
.perk-item.locked { opacity: 0.5; }
.perk-icon {
  width: 36px; height: 36px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
}
.perk-icon.active { background: rgba(79,209,197,0.12); }
```

## Gamification: Leaderboard

Use a card-based grid: `grid-template-columns: repeat(auto-fill, minmax(260px, 1fr))`

Top 3 have special styling:
- Gold (#ffd700): larger card, gold border glow
- Silver (#c0c0c0): medium card
- Bronze (#cd7f32): standard card

Each entry shows: rank, avatar, username, stats (Events, Days, Streak).

## Gamification: Level Roadmap

### Horizontal Roadmap
```css
.roadmap { display: flex; align-items: center; overflow-x: auto; padding: 20px 0; }
.rm-node { display: flex; flex-direction: column; align-items: center; flex-shrink: 0; }
.rm-circle {
  width: 40px; height: 40px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; border: 2px solid; transition: all 0.3s;
}
.rm-circle.completed { background: rgba(79,209,197,0.15); border-color: #4fd1c5; color: #4fd1c5; }
.rm-circle.current { background: #4fd1c5; color: #0f172a; box-shadow: 0 0 20px rgba(79,209,197,0.4); }
.rm-circle.locked { background: rgba(255,255,255,0.02); border-color: rgba(255,255,255,0.1); color: #718096; }
.rm-circle.milestone { width: 48px; height: 48px; }
.rm-line { width: 32px; height: 2px; flex-shrink: 0; }
.rm-line.done { background: #4fd1c5; }
.rm-line.pending { background: rgba(255,255,255,0.08); }
.rm-label { font-size: 0.7rem; color: #718096; margin-top: 8px; }
```

### Level Data Structure
```javascript
const levels = [
  { n: 1, label: "Starter" },
  { n: 5, label: "Event-Lehrling", milestone: true },
  { n: 10, label: "Stream-Kenner", milestone: true },
  { n: 15, label: "KI-Spezialist", milestone: true },
  { n: 20, label: "Eluma-Meister", milestone: true }
];
```

## Performance Tips

- Use `transform` and `opacity` for animations (GPU-accelerated)
- Add `will-change: transform` to frequently animated elements
- Use `requestAnimationFrame` for JS animations
- Apply damping (`velocity *= 0.99`) for physics simulations
- Limit particle count (~100 for performance)
- Use `Intersection Observer` instead of scroll events
