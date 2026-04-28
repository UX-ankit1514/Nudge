# FRONTEND UI ENHANCEMENT SKILL DOCUMENT
### A Constraint-Aware System for Upgrading Existing UIs to Premium Quality

> **Context**: You have a Vite-bundled frontend with minified JS/CSS. You cannot touch `index.html` or rewrite JS. You work exclusively through CSS overrides and lightweight JS scripts. The goal is not a rebuild — it is a **surgical upgrade**.

> **Visual Target**: Apple-level minimal with slight cinematic depth. Medium-rounded corners. Neutral palette with one controlled accent. Balanced density. Calm, confident, high-end. Not playful.

---

## 1. ENHANCEMENT PHILOSOPHY

### The Core Constraint Mindset

You are not redesigning. You are **revealing** what the UI should have been. The structure is fixed. Your tools are limited. That forces precision — which is what makes premium feel different from average in the first place.

Average UI looks the way it does not because of bad HTML, but because of:
- Arbitrary spacing that was never normalized
- Typography that was never given a hierarchy
- Interactions that were never considered
- Colors that were turned on but never tuned

All of those are CSS problems. All of them are solvable without touching a single HTML element.

### Working Principles Under Constraints

**1. Add, don't fight.**
Work with the existing specificity. Extend it. Don't declare war on the existing system with `!important` on every line — that path leads to cascading breakage that's impossible to debug.

**2. One enhancement layer, clearly separated.**
All your CSS lives in one file: `enhancements.css`. Loaded after the bundle. Never edit the bundle. Never inline.

**3. Smallest intervention, biggest visual impact.**
Target the highest-leverage properties first: spacing normalization, typography sharpening, color noise reduction. These three alone will eliminate 60% of the "cheap" feeling.

**4. Never break, then enhance.**
Before touching any component, verify its default behavior. Open the app. Note what breaks easily. Override conservatively. Check after every change.

**5. The structure is a skeleton. You are adding the skin.**
The HTML defines what exists. CSS defines what it feels like. You have full control over feel.

### What Makes Average UI Feel Cheap

| Problem | Symptom | CSS Lever |
|---|---|---|
| Uncontrolled spacing | Padding varies by 3-5px between similar elements | Normalize with component selectors |
| Flat type hierarchy | Body and label look the same weight | `font-weight`, `letter-spacing`, `font-size` |
| Harsh borders | Solid 1px #ccc on every input/card | Replace with `rgba` subtle borders |
| No interaction feedback | Buttons change nothing on hover | `transition` + `transform` + `background` |
| Color noise | Too many grays, no clear hierarchy | Override to a tighter neutral scale |
| Sharp radius | `border-radius: 4px` or 0 everywhere | Normalize to 10-14px |
| Abrupt state changes | No transitions anywhere | `transition: all 0.15s ease` baseline |

---

## 2. CSS OVERRIDE STRATEGY

### File Structure

```
enhancements.css
├── 1. CSS Custom Properties (override tokens)
├── 2. Base resets (normalize)
├── 3. Typography overrides
├── 4. Color and surface overrides
├── 5. Spacing corrections
├── 6. Component-level overrides
├── 7. Motion layer
└── 8. Utility patches
```

Load this file last. If you cannot modify HTML, inject it via your lightweight JS entry point:

```javascript
// inject-enhancements.js
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = '/enhancements.css';
document.head.appendChild(link);
```

### Specificity Handling

Inspect the bundled CSS in DevTools. Note the specificity pattern before overriding anything.

**Specificity escalation ladder:**

```css
/* Level 1 — Match their class */
.btn { background: var(--color-primary); }

/* Level 2 — Element + class (higher than class alone) */
button.btn { background: var(--color-primary); }

/* Level 3 — Parent + class */
.header .btn { ... }

/* Level 4 — !important (last resort, documented) */
.btn { color: white !important; /* Overrides inline style set by JS */ }
```

### When to Use `!important`

**Allowed:**
- The bundle uses `!important` on the same property and you must override it
- A JS widget sets inline styles you cannot control
- Browser default styles on form elements that survive specificity escalation

**Never allowed:**
- General styling preference
- Laziness when a higher-specificity selector would work
- More than 10 occurrences per file (if you hit 10, something is architecturally wrong)

**Document every `!important`:**
```css
.input:focus {
  outline: none !important; /* Override: bundle sets outline: 2px solid blue !important */
  box-shadow: 0 0 0 3px rgba(var(--accent-rgb), 0.25); /* Custom focus ring replacement */
}
```

### Layering Strategy

```css
/* LAYER 1: TOKEN OVERRIDES */
:root {
  --color-primary: #1A1A1A;
  --color-accent: #0066FF;
  --radius-base: 10px;
  --transition-base: 150ms cubic-bezier(0.0, 0.0, 0.2, 1);
}

/* LAYER 2: BASE NORMALIZATION */
*, *::before, *::after {
  box-sizing: border-box;
}

/* LAYER 3: GLOBAL TYPE/COLOR RESETS */
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

/* LAYER 4: COMPONENT OVERRIDES */
/* Targeted. Specific. One component at a time. */

/* LAYER 5: MOTION */
/* Transitions and animations added last */
```

---

## 3. VISUAL UPGRADE SYSTEM

### 3.1 Typography Improvements

**Step 1: Enable font smoothing globally.**
This alone makes any UI look noticeably more premium on macOS and iOS.

```css
html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
```

**Step 2: Tighten display and heading letter-spacing.**

```css
h1, h2, h3, .heading, [class*="title"] {
  letter-spacing: -0.015em;
  font-weight: 600;
  line-height: 1.15;
}

h1, [class*="display"] {
  letter-spacing: -0.025em;
  font-weight: 700;
}
```

**Step 3: Normalize body text.**

```css
p, li, td, [class*="body"], [class*="text"] {
  font-size: 15px;
  line-height: 1.65;
  letter-spacing: 0.001em;
}
```

**Step 4: Upgrade labels and small text.**

```css
label, [class*="label"], [class*="caption"], small {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.025em;
}

[class*="tag"], [class*="badge"], [class*="chip"] {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
```

**Step 5: Establish visible type hierarchy.**

```css
[class*="secondary"], [class*="meta"], [class*="subtitle"] {
  font-weight: 400;
  color: var(--text-secondary);
}
```

### 3.2 Color Refinement

**Step 1: Kill pure black and pure white.**

```css
:root {
  --text-primary: #111114;
  --text-secondary: #6B6B78;
  --text-tertiary: #9999A6;
  --bg-base: #FAFAFA;
  --bg-surface: #FFFFFF;
  --bg-elevated: #F5F5F7;
  --border-subtle: rgba(0, 0, 0, 0.07);
  --border-default: rgba(0, 0, 0, 0.11);
  --accent: #0066FF;
  --accent-rgb: 0, 102, 255;
}
```

**Dark mode token override:**
```css
@media (prefers-color-scheme: dark) {
  :root {
    --text-primary: #F0F0F3;
    --text-secondary: #8E8E9A;
    --bg-base: #09090B;
    --bg-surface: #111113;
    --bg-elevated: #18181B;
    --border-subtle: rgba(255, 255, 255, 0.06);
    --border-default: rgba(255, 255, 255, 0.10);
  }
}
```

**Step 2: Reduce color noise.**

Identify every color used in the bundled UI. If there are more than 3 background colors, collapse to 2. If more than 4 gray text tones, collapse to 3. If more than 1 accent color, collapse to 1. Override the excess to your token scale.

**Step 3: Replace harsh borders.**

```css
.card, [class*="panel"], [class*="box"] {
  border-color: var(--border-subtle) !important;
}

input, select, textarea, [class*="input"] {
  border-color: var(--border-default) !important;
}
```

### 3.3 Spacing Normalization

**Step 1: Detect inconsistencies using DevTools.**
Look at padding inside cards, buttons, list items. Note the deviations. Target only the outliers.

**Step 2: Apply targeted normalization.**

```css
.card, [class*="card"] { padding: 20px 24px; }
button, .btn, [class*="button"] { padding: 10px 20px; }
input, textarea, select { padding: 10px 14px; }
section, [class*="section"] {
  padding-top: 64px;
  padding-bottom: 64px;
}
```

**Step 3: Fix gap inconsistencies.**

```css
.grid, [class*="grid"] { gap: 20px; }
.flex-list, [class*="list"] > * + * { margin-top: 12px; }
```

### 3.4 Border and Shadow Refinement

**Radius normalization:**

```css
:root {
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-xl: 20px;
}

button, .btn, [class*="button"] { border-radius: var(--radius-md); }
input, select, textarea { border-radius: var(--radius-md); }
.card, [class*="card"], [class*="panel"] { border-radius: var(--radius-lg); }
.modal, [class*="modal"], [class*="dialog"] { border-radius: var(--radius-xl); }
```

**Shadow refinement:**

```css
:root {
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04);
  --shadow-lg: 0 12px 32px rgba(0,0,0,0.10), 0 4px 8px rgba(0,0,0,0.05);
}

.card, [class*="card"] {
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border-subtle);
}

.modal, [class*="modal"] { box-shadow: var(--shadow-lg); }

input, textarea { box-shadow: none; }
input:focus, textarea:focus {
  box-shadow: 0 0 0 3px rgba(var(--accent-rgb), 0.18);
}
```

---

## 4. LAYOUT POLISH TECHNIQUES

### Fix Alignment Without Touching HTML

```css
/* Center icon + text that's misaligned */
[class*="nav-item"], [class*="menu-item"], [class*="list-item"] {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Fix label + input vertical drift */
.form-group, [class*="field"] {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

/* Baseline alignment for icon + text */
[class*="icon"] + span, svg + span {
  vertical-align: middle;
}

/* Fix container width bleed on desktop */
.container, [class*="container"], [class*="wrapper"] {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 24px;
  padding-right: 24px;
}
```

### Improve Visual Hierarchy With CSS Only

```css
/* De-emphasize secondary information */
[class*="meta"], [class*="timestamp"], [class*="helper"] {
  color: var(--text-tertiary);
  font-size: 13px;
}

/* Visually separate footer from body within a card */
[class*="card-footer"], [class*="card__footer"] {
  border-top: 1px solid var(--border-subtle);
  padding-top: 16px;
  margin-top: 16px;
}

/* Make section headings commanding */
[class*="section-title"], [class*="section__heading"] {
  font-size: clamp(22px, 3vw, 32px);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
}
```

### Overflow and Responsiveness Fixes

```css
h1, h2, h3, h4 {
  overflow-wrap: break-word;
  word-break: break-word;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

table {
  width: 100%;
  overflow-x: auto;
  display: block;
}
```

---

## 5. MOTION AND MICRO-INTERACTION LAYER

### Global Transition Baseline

```css
button, .btn, [class*="button"],
input, textarea, select,
.card, [class*="card"],
a, [class*="link"],
[class*="nav-item"],
[class*="menu-item"] {
  transition:
    background-color 150ms cubic-bezier(0.0, 0.0, 0.2, 1),
    border-color 150ms cubic-bezier(0.0, 0.0, 0.2, 1),
    box-shadow 150ms cubic-bezier(0.0, 0.0, 0.2, 1),
    color 150ms cubic-bezier(0.0, 0.0, 0.2, 1),
    opacity 150ms cubic-bezier(0.0, 0.0, 0.2, 1),
    transform 150ms cubic-bezier(0.0, 0.0, 0.2, 1);
}
```

### Easing Tokens

```css
:root {
  --ease-out: cubic-bezier(0.0, 0.0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0.0, 1, 1);
  --ease-inout: cubic-bezier(0.4, 0.0, 0.2, 1);
  --ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
}
```

### Button Interactions

```css
button, .btn, [class*="button"] {
  cursor: pointer;
  transition:
    transform 120ms var(--ease-out),
    box-shadow 150ms var(--ease-out),
    background-color 150ms var(--ease-smooth);
}

button:hover, .btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

button:active, .btn:active {
  transform: scale(0.97) translateY(0px);
  box-shadow: none;
  transition-duration: 80ms;
}

button:disabled, .btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  transform: none;
  pointer-events: none;
}
```

### Input Focus Interactions

```css
input, textarea, select {
  outline: none;
  border: 1px solid var(--border-default);
  transition:
    border-color 150ms var(--ease-smooth),
    box-shadow 150ms var(--ease-smooth);
}

input:focus, textarea:focus, select:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(var(--accent-rgb), 0.15);
}

input:hover:not(:focus), textarea:hover:not(:focus) {
  border-color: rgba(0,0,0,0.2);
}
```

### Card Interactions

```css
.card, [class*="card"] {
  transition:
    transform 200ms var(--ease-out),
    box-shadow 200ms var(--ease-out);
}

.card:hover, [class*="card"]:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
```

### Link Hover (Underline Draw)

```css
a:not([class]) {
  position: relative;
  text-decoration: none;
  color: var(--accent);
}

a:not([class])::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 200ms var(--ease-out);
}

a:not([class]):hover::after {
  transform: scaleX(1);
}
```

### Scroll Reveal (Lightweight JS)

```javascript
// scroll-reveal.js — add to inject-enhancements.js
(function() {
  const style = document.createElement('style');
  style.textContent = `
    .sr-hidden {
      opacity: 0;
      transform: translateY(16px);
      transition: opacity 400ms cubic-bezier(0.0, 0.0, 0.2, 1),
                  transform 400ms cubic-bezier(0.0, 0.0, 0.2, 1);
    }
    .sr-visible {
      opacity: 1;
      transform: translateY(0);
    }
    @media (prefers-reduced-motion: reduce) {
      .sr-hidden { opacity: 1; transform: none; transition: none; }
    }
  `;
  document.head.appendChild(style);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('sr-visible');
        }, i * 60); // 60ms stagger between siblings
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.card, section > *, [class*="feature"], [class*="section"] > *')
    .forEach(el => {
      el.classList.add('sr-hidden');
      observer.observe(el);
    });
})();
```

### CSS-Only Loading States

**Skeleton shimmer:**
```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton, [class*="skeleton"], [aria-busy="true"] {
  background: linear-gradient(
    90deg,
    rgba(0,0,0,0.06) 25%,
    rgba(0,0,0,0.12) 37%,
    rgba(0,0,0,0.06) 63%
  );
  background-size: 400% 100%;
  animation: shimmer 1.4s ease-in-out infinite;
  border-radius: var(--radius-md);
  color: transparent !important;
}
```

**CSS-only spinner:**
```css
@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading::after, [aria-label="loading"]::after {
  content: '';
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(0,0,0,0.12);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 600ms linear infinite;
  vertical-align: middle;
  margin-left: 8px;
}
```

### Timing Reference

| Interaction | Duration | Easing |
|---|---|---|
| Button press | 80-120ms | ease-in |
| Button hover | 150ms | ease-out |
| Input focus | 150ms | ease-smooth |
| Card hover | 200ms | ease-out |
| Dropdown open | 200ms | ease-out |
| Modal open | 280ms | ease-out |
| Modal close | 200ms | ease-in |
| Scroll reveal | 400ms | ease-out |
| Skeleton shimmer | 1400ms | ease-in-out infinite |

### When to Avoid Animation

- Any element that already has transitions from the bundle (doubling causes jank)
- Tables, data grids, raw data lists
- Error messages (appear instantly — delay feels broken)
- When `prefers-reduced-motion` is set
- Elements that repaint frequently (avoid animating `filter` or `box-shadow` on 60+ item lists)

---

## 6. COMPONENT ENHANCEMENT RULES

### 6.1 Buttons

**Visual fixes:**
```css
button, .btn, [class*="btn"] {
  font-weight: 500;
  letter-spacing: 0.005em;
  border-radius: var(--radius-md);
  padding: 10px 20px;
  font-size: 14px;
  line-height: 1.4;
  cursor: pointer;
}

[class*="btn-primary"], [class*="btn--primary"] {
  background: var(--accent);
  color: #fff;
}

[class*="btn-secondary"], [class*="btn-outline"] {
  background: transparent;
  border: 1px solid var(--border-default);
  color: var(--text-primary);
}
```

**Loading state (JS class toggle):**
```css
button.is-loading {
  pointer-events: none;
  opacity: 0.7;
  position: relative;
}
```

### 6.2 Cards

**Visual fixes:**
```css
.card, [class*="card"] {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: 20px 24px;
  overflow: hidden;
}

/* Image bleed for top-image cards */
[class*="card"] img:first-child {
  margin: -20px -24px 20px;
  width: calc(100% + 48px);
  max-width: none;
  border-radius: 0;
}
```

Hover lift defined in Section 5.

### 6.3 Inputs

**Visual fixes:**
```css
input, textarea, select {
  background: var(--bg-surface);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  padding: 10px 14px;
  font-size: 15px;
  color: var(--text-primary);
  width: 100%;
  appearance: none;
  -webkit-appearance: none;
}

input::placeholder, textarea::placeholder {
  color: var(--text-tertiary);
}

input[aria-invalid="true"], [class*="input--error"] {
  border-color: #E53E3E;
  box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.12);
}

label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 6px;
  letter-spacing: 0.01em;
}
```

### 6.4 Modals

**Visual fixes:**
```css
[class*="modal"], [class*="dialog"], [role="dialog"] {
  background: var(--bg-surface);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-subtle);
  padding: 28px 32px;
  max-width: 520px;
  width: calc(100% - 48px);
}

[class*="overlay"], [class*="backdrop"] {
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}
```

**Enter animation:**
```css
[class*="modal"].is-open, [class*="dialog"][open] {
  animation: modalEnter 280ms cubic-bezier(0.0, 0.0, 0.2, 1) forwards;
}

@keyframes modalEnter {
  from { opacity: 0; transform: translateY(12px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
```

### 6.5 Navbars

**Visual fixes:**
```css
nav, header, [class*="navbar"], [class*="nav"] {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border-subtle);
  position: sticky;
  top: 0;
  z-index: 100;
}

@media (prefers-color-scheme: dark) {
  nav, header, [class*="navbar"] {
    background: rgba(9, 9, 11, 0.85);
  }
}
```

**Nav link states:**
```css
[class*="nav-link"], [class*="nav__item"] a {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  padding: 6px 10px;
  border-radius: var(--radius-sm);
  transition:
    color 150ms var(--ease-smooth),
    background 150ms var(--ease-smooth);
}

[class*="nav-link"]:hover {
  color: var(--text-primary);
  background: rgba(0,0,0,0.05);
}

[class*="nav-link"].active,
[class*="nav-link"][aria-current="page"] {
  color: var(--accent);
  font-weight: 600;
}
```

---

## 7. ACCESSIBILITY FIX LAYER

### Focus States

The most common accessibility failure in bundled UIs is suppressed focus rings.

```css
/* Restore and improve */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Hide for mouse, show for keyboard */
:focus:not(:focus-visible) {
  outline: none;
}
```

### Contrast Fixes

```css
/* 5.2:1 against white — passes WCAG AA */
[class*="muted"], [class*="secondary-text"], [class*="helper"] {
  color: #6B6B78;
}
```

Verify all text against WCAG AA (4.5:1 minimum) using DevTools accessibility audit before shipping.

### Typography Readability

```css
body, p, li {
  font-size: max(15px, 1rem);
  line-height: 1.65;
}

p, [class*="body-text"] {
  max-width: 68ch;
}
```

### ARIA Support

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

[disabled], [aria-disabled="true"] {
  opacity: 0.45;
  cursor: not-allowed;
  pointer-events: none;
}

[aria-busy="true"] {
  cursor: wait;
}
```

---

## 8. PERFORMANCE CONSTRAINTS

### Only Animate Composited Properties

```css
/* SAFE */
transform: translateX() translateY() scale() rotate();
opacity: 0 to 1;

/* NEVER animate — causes layout/paint */
/* width, height, top, left, right, bottom */
/* margin, padding, border-width, font-size */
```

### Prevent Layout Thrash in JS

```javascript
// WRONG — reads and writes interleaved
elements.forEach(el => {
  const height = el.offsetHeight; // read
  el.style.height = height + 'px'; // write — triggers reflow
});

// RIGHT — batch reads, then writes
const heights = elements.map(el => el.offsetHeight);
elements.forEach((el, i) => el.style.height = heights[i] + 'px');
```

### Intersection Observer Over Scroll Listeners

```javascript
// NEVER — fires on every scroll frame
window.addEventListener('scroll', handler);

// ALWAYS — fires only on enter/exit
const observer = new IntersectionObserver(callback, options);
```

### CSS Containment

```css
.card, [class*="card"] {
  contain: layout style; /* Isolates reflow to this element */
}
```

### Limits

- Maximum 6 simultaneously animated elements on screen
- Never animate elements outside the viewport
- Debounce any resize listeners: 100ms minimum

---

## 9. ANTI-PATTERNS (CRITICAL)

### CSS Anti-Patterns

| Anti-Pattern | Consequence | Fix |
|---|---|---|
| `!important` on every override | Undebuggable specificity wars | Use proper specificity escalation first |
| Overriding `display`, `position` | Breaks JS-controlled behavior | Target cosmetic properties only |
| `transition: all` | Animates unintended properties | List specific properties explicitly |
| Redefining `z-index` globally | Destroys stacking context | Only fix confirmed z-index conflicts |
| Removing `pointer-events` without replacement | Breaks interaction patterns | Add `cursor: not-allowed` if disabling |
| Deep descendant selectors (4+ levels) | Specificity too high to override later | Max 3 levels |
| Overriding responsive breakpoints | Breaks mobile layout | Match or extend existing breakpoints |

### JS Anti-Patterns

```javascript
// WRONG — manipulating all DOM elements synchronously
document.querySelectorAll('*').forEach(el => el.style.fontFamily = '...');
// Fix: Override font globally in CSS

// WRONG — removing JS-managed state classes
el.classList.remove('is-active');
// Fix: Let existing JS own state; style the state in CSS

// WRONG — restructuring HTML
el.innerHTML = `<div class="wrapper">${el.innerHTML}</div>`;
// Fix: Style existing structure; never restructure
```

### Override Anti-Patterns

- **Fighting the system**: If overriding a class requires 3+ specificity levels, the approach is wrong. Find a parent class or data attribute instead.
- **Inconsistent overrides**: Overriding `.card` in 4 different places with different padding. Consolidate to one declaration.
- **One-off instance fixes**: Adding a special class for one specific card. Fix the system, not the instance.
- **Incomplete vendor prefixes**: If you override `backdrop-filter`, always include `-webkit-backdrop-filter`.

---

## 10. PREMIUM UI HEURISTICS (UNDER CONSTRAINTS)

### How to Judge Success When You Cannot Change Structure

**Test 1 — The Squint Test**
Squint until the screen blurs. Is there a clear visual winner per section? If it looks like equal-weight noise: hierarchy is failing.

**Test 2 — The Spacing Consistency Test**
Open DevTools. Inspect 10 instances of the same component type. Does padding match within 4px? If not: normalization is incomplete.

**Test 3 — The Motion Test**
Interact with every element. Does every button, input, link, and card respond immediately to hover? If anything snaps without a transition: the baseline motion layer is incomplete.

**Test 4 — The Color Reduction Test**
Sample every unique color using a color picker. Premium UIs use fewer than 8 unique colors. If you're above 10: color noise is the problem.

**Test 5 — The Contrast Test**
Run a DevTools accessibility audit. Every body text must pass 4.5:1. Fix any fails before shipping.

**Test 6 — The Before/After Test**
Screenshot original. Screenshot enhanced. Stack them. The enhanced version should feel calmer, more spaced, typographically sharper, smoother in motion, and more cohesive in color. If the improvement is not immediately visible: the enhancement layer is not doing enough.

---

## 11. FINAL ENHANCEMENT CHECKLIST

### Visual Quality

- [ ] Font smoothing enabled globally (`-webkit-font-smoothing: antialiased`)
- [ ] All headings have negative letter-spacing
- [ ] Body text is 15-16px minimum with 1.6+ line-height
- [ ] Color palette reduced to 8 or fewer unique values
- [ ] No pure black or pure white in text or backgrounds
- [ ] All borders use `rgba` soft tones, not solid mid-gray
- [ ] Border-radius consistent across all component types
- [ ] Cards and inputs use the same subtle border token
- [ ] Shadows follow sm/md/lg scale

### Spacing and Alignment

- [ ] Card padding consistent across all instances
- [ ] Button padding consistent across all instances
- [ ] Input padding consistent across all instances
- [ ] Section vertical padding is 64px+ on mobile
- [ ] All icons and adjacent labels are vertically centered
- [ ] No content clips or overflows at 375px viewport width

### Motion and Interaction

- [ ] All buttons have hover (translateY -1px) and active (scale 0.97) states
- [ ] All inputs have visible focus ring beyond border color change
- [ ] All interactive cards have hover lift
- [ ] All transitions use non-linear easing
- [ ] No transition exceeds 300ms for feedback elements
- [ ] `prefers-reduced-motion` handled
- [ ] No layout-triggering properties are being animated

### Accessibility

- [ ] Focus ring visible for keyboard navigation (`:focus-visible`)
- [ ] All body text passes 4.5:1 contrast
- [ ] No text below 13px
- [ ] Disabled states have `cursor: not-allowed` and reduced opacity
- [ ] Error states use color plus text indication, not color alone

### Stability

- [ ] No existing functionality broken by overrides
- [ ] No JS-managed classes removed in CSS
- [ ] No `display` or `position` overrides applied without full breakpoint testing
- [ ] Mobile (375px) renders correctly
- [ ] Desktop (1280px) renders correctly
- [ ] Dark mode renders correctly with token overrides

### The Final Gut Check

- [ ] Is the improvement immediately visible next to the original?
- [ ] Does the UI feel calmer, more consistent, and more intentional?
- [ ] Do all interactions feel immediate and smooth?
- [ ] Is there remaining visual noise that needs to be removed?
- [ ] Would a non-designer describe this as polished?

---

*One file. One enhancement layer. No rebuild. Maximum visual upgrade.*

*Every rule here exists because an average UI failed at exactly that point.*
