# Frontend Component Patterns Document
**Version 1.0 — Production Grade**
**Status: ACTIVE — All component enhancements must conform to this system**

> This document defines how to systematically elevate every UI component into a unified, premium system. It is not a style guide. It is a pattern contract. Every value here is exact. Every rule is enforced.

---

## 1. Component Philosophy

### 1.1 — Consistency Over Creativity
Every component must feel like it was designed by the same hand at the same moment. Novelty at the component level destroys system cohesion. Before introducing any new visual property, verify it exists in the token system. If it doesn't, it doesn't ship.

### 1.2 — Subtlety Over Loud Design
Premium UI is not loud. It is precise. Shadows are barely there. Transitions are felt, not watched. Color is used to communicate state, not decorate. Every visual element must earn its presence.

### 1.3 — Every Component Is Part of One System
No component is an island. A button, a card, and a modal are all the same product. They share spacing, radius, shadow, timing, and color logic. If you can tell which component a visual decision belongs to, the system has fragmented.

### 1.4 — Interaction Must Feel Smooth and Intentional
Every interactive state (hover, press, focus, loading) must be defined, not left to the browser. Default browser states are forbidden in a premium system. Motion must respond in the direction of intent: lift on hover signals openness, compression on press signals acknowledgment.

---

## 2. Global Component Rules

These values are absolute. They apply to every component in the system without exception.

### 2.1 — Spacing Scale (4px Base Unit)

All spacing — padding, margin, gap — must be a multiple of 4px. No exceptions.

```
--space-1:   4px
--space-2:   8px
--space-3:  12px
--space-4:  16px
--space-5:  20px
--space-6:  24px
--space-8:  32px
--space-10: 40px
--space-12: 48px
--space-16: 64px
```

**Rule:** If a spacing value is not in this scale, it is not permitted. `padding: 13px` is a violation. `padding: 14px` is a violation. `padding: 12px` is valid.

### 2.2 — Border Radius Scale

```
--radius-xs:  4px    /* inline elements, tags, badges */
--radius-sm:  6px    /* inputs, small buttons */
--radius-md:  8px    /* standard buttons, dropdowns */
--radius-lg:  12px   /* cards, modals, panels */
--radius-xl:  16px   /* large surface areas */
--radius-full: 9999px /* pill buttons, avatars */
```

**Rule:** Never mix radii within a single component. A card with `border-radius: 12px` must have `12px` on all four corners — not 8px on the bottom.

### 2.3 — Shadow System (5 Levels)

```css
--shadow-0: none;
--shadow-1: 0 1px 2px rgba(0, 0, 0, 0.05);                          /* resting — cards */
--shadow-2: 0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);   /* hover — cards */
--shadow-3: 0 4px 16px rgba(0, 0, 0, 0.10), 0 2px 4px rgba(0, 0, 0, 0.06);  /* elevated — modals */
--shadow-4: 0 8px 32px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08);  /* high elevation */
--shadow-focus: 0 0 0 3px rgba(var(--color-accent-rgb), 0.20);               /* focus ring */
```

**Rule:** Use only sequential shadow steps. Never jump from `--shadow-1` to `--shadow-4` within one component's state transitions. Modals start at `--shadow-3`. Cards start at `--shadow-1`.

### 2.4 — Transition Timing Scale

```
--duration-fast:   120ms   /* micro-interactions: color, opacity, border */
--duration-base:   200ms   /* standard: hover states, focus rings */
--duration-medium: 280ms   /* entry/exit: dropdowns, tooltips */
--duration-slow:   380ms   /* large surface: modals, panels, page transitions */

--ease-standard: cubic-bezier(0.2, 0, 0, 1)       /* default for most transitions */
--ease-enter:    cubic-bezier(0, 0, 0.2, 1)        /* elements entering the viewport */
--ease-exit:     cubic-bezier(0.4, 0, 1, 1)        /* elements leaving the viewport */
--ease-press:    cubic-bezier(0.4, 0, 0.6, 1)      /* press feedback */
```

**Rule:** Never use `ease`, `ease-in-out`, or `linear` for interactive transitions. Only the above named curves are permitted. `linear` is only valid for looping animations (spinners).

### 2.5 — Visual Hierarchy Rules

Every view must enforce exactly three levels of visual weight:

| Level | Usage | CSS Properties |
|---|---|---|
| Primary | Main action, heading, focal point | Full opacity, `--shadow-2` or higher, primary color |
| Secondary | Supporting content, secondary actions | 80% opacity or subdued color, `--shadow-1` |
| Tertiary | Metadata, hints, disabled states | 50% opacity, `--shadow-0`, muted color |

**Rule:** If more than three distinct weight levels appear in a single view, the hierarchy has collapsed. Audit and reduce.

### 2.6 — Interactive Feedback — Required States for All Components

Every interactive component must define all six states. Undefined states are not acceptable.

| State | Visual Signal | Timing |
|---|---|---|
| Default | Resting visual | — |
| Hover | Lift or color shift | `--duration-base` |
| Active / Press | Compression or darken | `--duration-fast` |
| Focus | Focus ring (`--shadow-focus`) | `--duration-fast` |
| Disabled | 40% opacity, no pointer events | — |
| Loading | Spinner or shimmer | continuous |

---

## 3. Component Pattern Structure

Each component pattern in this document follows the same structure. Deviations from this structure signal that a component has not been fully defined.

```
Component Name
├── Purpose
├── Visual Structure
├── CSS Enhancement Strategy
├── States (default / hover / active / focus / disabled / loading / error)
├── Interaction Behavior
├── Motion Guidelines
├── Accessibility Considerations
└── Common Fixes
```

---

## 4. Core Component Patterns

---

### 4.1 — Button

#### Purpose
The button is the primary action trigger. It communicates rank through three visual tiers: primary, secondary, and ghost. Each tier is immediately distinct at a glance.

#### Visual Structure

```
┌──────────────────────────┐
│  [Icon?]   Label Text    │   height: 40px (default) / 36px (sm) / 48px (lg)
└──────────────────────────┘   padding: 0 --space-4
                               border-radius: --radius-md
```

**Primary Button**
- Background: `--color-accent`
- Text: `--color-on-accent` (white or high-contrast)
- Border: none
- Shadow: `--shadow-1`

**Secondary Button**
- Background: transparent
- Text: `--color-accent`
- Border: `1px solid --color-accent` (40% opacity)
- Shadow: none

**Ghost Button**
- Background: transparent
- Text: `--color-text-secondary`
- Border: none
- Shadow: none

#### CSS Enhancement Strategy

```css
/* ── LAYER 1: OVERRIDE ── */

/* Normalize all button base properties */
.btn,
.button,
[class*="btn-"] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  height: 40px;
  padding: 0 var(--space-4);
  border-radius: var(--radius-md);
  font-size: 0.9375rem; /* 15px */
  font-weight: 500;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition:
    background-color var(--duration-fast) var(--ease-standard),
    box-shadow var(--duration-base) var(--ease-standard),
    transform var(--duration-fast) var(--ease-press),
    opacity var(--duration-fast) var(--ease-standard);
}

/* ── LAYER 2: ENHANCEMENT ── */

.btn-primary:hover {
  box-shadow: var(--shadow-2);
  transform: translateY(-1px);
}

.btn-primary:active {
  transform: translateY(0px) scale(0.98);
  box-shadow: var(--shadow-1);
}

.btn-secondary:hover {
  background-color: rgba(var(--color-accent-rgb), 0.06);
}

.btn-ghost:hover {
  background-color: var(--color-surface-hover);
}

/* Shared focus */
.btn:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
}

/* Shared disabled */
.btn:disabled,
.btn[aria-disabled="true"] {
  opacity: 0.4;
  pointer-events: none;
  box-shadow: none;
  transform: none;
}
```

#### States

| State | Primary | Secondary | Ghost |
|---|---|---|---|
| Default | Accent bg, shadow-1 | Transparent, accent border | Transparent, no border |
| Hover | shadow-2, translateY(-1px) | Accent bg 6% | Surface hover bg |
| Active | scale(0.98), shadow-1 | scale(0.98) | scale(0.98) |
| Focus | shadow-focus ring | shadow-focus ring | shadow-focus ring |
| Disabled | 40% opacity, no events | 40% opacity, no events | 40% opacity, no events |
| Loading | Spinner replaces label, pointer-events: none | Same | Same |

#### Loading State — JS Patch

```javascript
// Minimal loading state toggle
function setButtonLoading(btn, isLoading) {
  if (isLoading) {
    btn.dataset.originalText = btn.textContent;
    btn.innerHTML = `<span class="btn-spinner" aria-hidden="true"></span>
                     <span class="sr-only">Loading</span>`;
    btn.setAttribute('aria-disabled', 'true');
    btn.style.pointerEvents = 'none';
  } else {
    btn.textContent = btn.dataset.originalText;
    btn.removeAttribute('aria-disabled');
    btn.style.pointerEvents = '';
  }
}
```

```css
.btn-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: btn-spin 600ms linear infinite;
}

@keyframes btn-spin {
  to { transform: rotate(360deg); }
}
```

#### Motion Guidelines
- Hover lift: `translateY(-1px)` at `200ms --ease-standard`
- Press: `scale(0.98) translateY(0)` at `120ms --ease-press`
- Never animate width, height, or padding on a button

#### Accessibility
- Minimum touch target: 44×44px (use padding to extend, not height)
- `aria-busy="true"` during loading state
- `aria-disabled="true"` instead of `disabled` where appropriate to keep element focusable
- Label text must never disappear — use `sr-only` class for screen reader text during loading

#### Common Fixes

**Problem:** Inconsistent button heights across the page.
**Fix:** Set `height: 40px` explicitly. Do not rely on `padding` alone for height.

**Problem:** Text misaligned vertically inside button.
**Fix:** Add `display: inline-flex; align-items: center;` to the button selector.

**Problem:** Button shrinks inside flex containers.
**Fix:** Add `flex-shrink: 0` to buttons that should not compress.

---

### 4.2 — Card

#### Purpose
Cards contain related content as discrete surface units. They communicate grouping through elevation, not borders. Their hover state is the primary affordance that signals interactivity.

#### Visual Structure

```
┌─────────────────────────────────┐  ← border-radius: --radius-lg
│  [Optional Media / Image]       │
│  ─────────────────────────────  │
│  Title                          │  ← font-weight: 600
│  Body text / description        │  ← color: --color-text-secondary
│                                 │
│  [Footer / Action zone]         │
└─────────────────────────────────┘
  padding: --space-6
  background: --color-surface
  shadow: --shadow-1 (resting)
```

#### CSS Enhancement Strategy

```css
/* ── LAYER 1: OVERRIDE ── */
.card,
[class*="card-"] {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-1);
  border: 1px solid var(--color-border-subtle); /* replaces harsh borders */
  padding: var(--space-6);
  transition:
    box-shadow var(--duration-base) var(--ease-standard),
    transform var(--duration-base) var(--ease-standard),
    border-color var(--duration-base) var(--ease-standard);
}

/* ── LAYER 2: ENHANCEMENT ── */
.card[role="button"],
.card--interactive,
a.card {
  cursor: pointer;
}

.card--interactive:hover,
a.card:hover {
  box-shadow: var(--shadow-2);
  transform: translateY(-2px);
  border-color: var(--color-border-hover);
}

.card--interactive:active,
a.card:active {
  transform: translateY(-1px);
  box-shadow: var(--shadow-1);
}

.card--interactive:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus), var(--shadow-1);
}
```

#### Elevation System

| Level | Use Case | Shadow | Transform on Hover |
|---|---|---|---|
| Flat | Non-interactive content block | none, border only | — |
| Resting | Standard interactive card | `--shadow-1` | `translateY(-2px)`, `--shadow-2` |
| Raised | Featured or hero card | `--shadow-2` | `translateY(-3px)`, `--shadow-3` |
| Floating | Notification, popover card | `--shadow-3` | No hover lift |

#### States

| State | Visual |
|---|---|
| Default | `--shadow-1`, `border-color: --color-border-subtle` |
| Hover | `--shadow-2`, `translateY(-2px)`, `border-color: --color-border-hover` |
| Active | `--shadow-1`, `translateY(-1px)` |
| Focus | `--shadow-focus` + `--shadow-1` combined |
| Disabled | `opacity: 0.5`, no hover effect, `pointer-events: none` |

#### Motion Guidelines
- Lift distance: `translateY(-2px)` for standard, `-3px` for raised
- Never lift more than `4px`
- Duration: `200ms --ease-standard` for all card transitions
- Do not animate border-radius or padding

#### Accessibility
- Interactive cards must have `role="button"` or be wrapped in `<a>`
- Include `aria-label` if the card's purpose isn't clear from its text content
- Cards with images must have `alt` text — do not patch away an empty `alt`

#### Common Fixes

**Problem:** Cards have harsh visible borders on all sides.
**Fix:** Replace with `border: 1px solid var(--color-border-subtle)` + `--shadow-1`. The border becomes a subtle edge definition, not a box.

**Problem:** Card padding is inconsistent — some cards use 16px, others 24px.
**Fix:** Set `padding: var(--space-6)` globally on `.card`. Use `padding: var(--space-4)` only for compact variant with an explicit `.card--compact` class.

**Problem:** Card content has no visual hierarchy — all text looks the same weight.
**Fix:** Ensure title has `font-weight: 600` and body text has `color: var(--color-text-secondary)` and `font-size: 0.875rem`.

---

### 4.3 — Input (Text Field & Textarea)

#### Purpose
Inputs are trust surfaces. Users hand over data here. They must feel precise, stable, and calm. The focus state is the single most important visual event in a form — it must be unmistakable without being aggressive.

#### Visual Structure

```
Label Text                         ← font-size: 0.8125rem (13px), font-weight: 500
┌─────────────────────────────┐
│  Placeholder / Value        │   ← height: 44px (text field), auto (textarea)
└─────────────────────────────┘   ← border: 1px solid --color-border
  Hint or error message            ← font-size: 0.8125rem, margin-top: --space-1
```

#### CSS Enhancement Strategy

```css
/* ── LAYER 1: OVERRIDE ── */
.input,
input[type="text"],
input[type="email"],
input[type="password"],
input[type="search"],
input[type="url"],
input[type="tel"],
textarea {
  width: 100%;
  height: 44px;
  padding: 0 var(--space-3);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: 0.9375rem;
  color: var(--color-text-primary);
  transition:
    border-color var(--duration-fast) var(--ease-standard),
    box-shadow var(--duration-fast) var(--ease-standard);
  -webkit-appearance: none;
  appearance: none;
}

textarea {
  height: auto;
  min-height: 100px;
  padding: var(--space-3);
  resize: vertical;
  line-height: 1.6;
}

/* ── LAYER 2: ENHANCEMENT ── */
.input:hover,
input[type="text"]:hover {
  border-color: var(--color-border-hover);
}

.input:focus,
input[type="text"]:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(var(--color-accent-rgb), 0.15);
}

/* Error state */
.input--error,
.input[aria-invalid="true"] {
  border-color: var(--color-error);
}

.input--error:focus,
.input[aria-invalid="true"]:focus {
  box-shadow: 0 0 0 3px rgba(var(--color-error-rgb), 0.15);
}

/* Disabled */
.input:disabled {
  background: var(--color-surface-disabled);
  color: var(--color-text-disabled);
  cursor: not-allowed;
  opacity: 0.6;
}
```

#### Label Enhancement

```css
/* ── LAYER 1: OVERRIDE ── */
label,
.form-label {
  display: block;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--color-text-secondary);
  margin-bottom: var(--space-1);
  letter-spacing: 0.01em;
}
```

#### States

| State | Border | Shadow | Background |
|---|---|---|---|
| Default | `--color-border` | none | `--color-surface` |
| Hover | `--color-border-hover` | none | `--color-surface` |
| Focus | `--color-accent` | focus ring 3px 15% opacity | `--color-surface` |
| Error | `--color-error` | none (error ring on focus) | `--color-surface` |
| Error + Focus | `--color-error` | error ring 3px 15% opacity | `--color-surface` |
| Disabled | `--color-border` | none | `--color-surface-disabled` |

#### Motion Guidelines
- Border color transition: `120ms --ease-standard`
- Focus ring expansion: `120ms --ease-standard`
- Never animate height, width, or font-size on inputs

#### Accessibility
- Every input must have an associated `<label>` or `aria-label`
- Error messages must be linked via `aria-describedby` on the input
- `aria-invalid="true"` must be set on inputs in error state
- Do not rely on color alone to communicate error — include an icon or text

#### Common Fixes

**Problem:** Input has no visible focus state beyond browser default.
**Fix:** Apply the focus ring override. Explicitly remove the browser default outline and replace with the `box-shadow` focus ring.

**Problem:** Label and input are vertically misaligned or too far apart.
**Fix:** Set `margin-bottom: var(--space-1)` on labels. Set `margin-bottom: var(--space-4)` on the field group wrapper for consistent form rhythm.

**Problem:** Placeholder text is same size as input text, making it hard to read when value is present.
**Fix:** Ensure `color: var(--color-text-placeholder)` is set with at least 3:1 contrast. Do not use 30% opacity — it fails contrast requirements.

---

### 4.4 — Navbar / Header

#### Purpose
The navbar establishes the top of the visual hierarchy. It must be immediately calm, clean, and authoritative. It contains navigation — it must not compete with page content for attention. Scroll behavior must reinforce depth.

#### Visual Structure

```
┌──────────────────────────────────────────────────────────┐
│  Logo            Nav Links              [CTA] [Avatar]   │  height: 60px
└──────────────────────────────────────────────────────────┘
  padding: 0 --space-8
  background: --color-surface / 80% with backdrop-filter
```

#### CSS Enhancement Strategy

```css
/* ── LAYER 1: OVERRIDE ── */
.navbar,
.header,
nav[class*="nav"] {
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 var(--space-8);
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border-subtle);
  position: sticky;
  top: 0;
  z-index: var(--z-navbar); /* define in z-index scale */
  transition:
    box-shadow var(--duration-base) var(--ease-standard),
    background var(--duration-base) var(--ease-standard);
}

/* ── LAYER 2: ENHANCEMENT — scrolled state via JS class ── */
.navbar--scrolled {
  background: rgba(var(--color-surface-rgb), 0.85);
  backdrop-filter: blur(12px) saturate(1.4);
  -webkit-backdrop-filter: blur(12px) saturate(1.4);
  box-shadow: var(--shadow-1);
  border-bottom-color: transparent;
}

/* Nav link refinement */
.nav-link,
.navbar a {
  font-size: 0.9375rem;
  font-weight: 450;
  color: var(--color-text-secondary);
  text-decoration: none;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-sm);
  transition: color var(--duration-fast) var(--ease-standard),
              background var(--duration-fast) var(--ease-standard);
}

.nav-link:hover {
  color: var(--color-text-primary);
  background: var(--color-surface-hover);
}

.nav-link--active,
.nav-link[aria-current="page"] {
  color: var(--color-accent);
  font-weight: 500;
}
```

#### Scroll Behavior — JS Patch

```javascript
// Minimal scroll-aware navbar
const navbar = document.querySelector('.navbar, .header');
if (navbar) {
  const onScroll = () => {
    navbar.classList.toggle('navbar--scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}
```

#### States

| State | Background | Shadow | Border |
|---|---|---|---|
| Default (top) | `--color-surface` | none | subtle border-bottom |
| Scrolled | 85% opacity + blur | `--shadow-1` | transparent |

#### Common Fixes

**Problem:** Nav links have inconsistent spacing and some are flush to edges.
**Fix:** Set `gap: var(--space-1)` on the nav links container. Apply `padding: var(--space-1) var(--space-3)` on each link.

**Problem:** Logo and nav items are vertically misaligned.
**Fix:** Apply `display: flex; align-items: center;` to the navbar container.

**Problem:** Navbar has aggressive background color that competes with content.
**Fix:** Soften to `--color-surface` with the `backdrop-filter` scroll enhancement.

---

### 4.5 — Modal / Dialog

#### Purpose
Modals interrupt. They must earn that interruption by being visually composed and behaviorally respectful. Entry must be smooth. The backdrop must create depth without crushing the background content. Exit must be as clean as entry.

#### Visual Structure

```
████████████████████████████████████  ← backdrop: rgba(0,0,0,0.4) + blur(2px)
█                                  █
█   ┌──────────────────────────┐   █
█   │  Header / Title  [×]     │   █  ← padding: --space-6
█   │  ────────────────────    │   █
█   │  Body content            │   █  ← max-width: 560px
█   │                          │   █  ← border-radius: --radius-xl
█   │  [Cancel]  [Confirm]     │   █  ← shadow: --shadow-4
█   └──────────────────────────┘   █
█                                  █
████████████████████████████████████
```

#### CSS Enhancement Strategy

```css
/* ── LAYER 1: OVERRIDE ── */
.modal-backdrop,
.dialog-overlay,
[class*="modal-overlay"] {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.40);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-modal-backdrop);
  padding: var(--space-4);
}

.modal,
.dialog,
[class*="modal-content"] {
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-4);
  padding: var(--space-6);
  width: 100%;
  max-width: 560px;
  border: 1px solid var(--color-border-subtle);
  position: relative;
}

/* ── LAYER 2: ENHANCEMENT — Entry/Exit animation ── */
.modal-backdrop {
  animation: backdrop-in var(--duration-medium) var(--ease-enter) forwards;
}

.modal-backdrop--exit {
  animation: backdrop-out var(--duration-medium) var(--ease-exit) forwards;
}

.modal {
  animation: modal-in var(--duration-medium) var(--ease-enter) forwards;
}

.modal-backdrop--exit .modal {
  animation: modal-out var(--duration-medium) var(--ease-exit) forwards;
}

@keyframes backdrop-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes backdrop-out {
  from { opacity: 1; }
  to   { opacity: 0; }
}

@keyframes modal-in {
  from {
    opacity: 0;
    transform: scale(0.96) translateY(8px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes modal-out {
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.96) translateY(8px);
  }
}
```

#### Motion Guidelines
- Entry: `scale(0.96) → scale(1)` + `translateY(8px) → translateY(0)` + `opacity: 0 → 1`
- Exit: reverse of entry
- Duration: `280ms --ease-enter` (in) / `200ms --ease-exit` (out)
- Exit is always faster than entry — departure should not feel slow

#### Accessibility
- Modal must trap focus when open — implement a focus trap with JS patch
- `aria-modal="true"` and `role="dialog"` on the modal container
- `aria-labelledby` pointing to the modal title
- `Escape` key must close the modal — do not intercept other key events
- Background scroll must be locked while modal is open: `document.body.style.overflow = 'hidden'`

#### Common Fixes

**Problem:** Backdrop is too dark and makes the page feel buried.
**Fix:** Set `rgba(0, 0, 0, 0.40)` — not 0.5 or higher. Add `backdrop-filter: blur(2px)` to create depth without darkness.

**Problem:** Modal appears instantly with no transition.
**Fix:** Apply the `modal-in` keyframe animation.

**Problem:** Modal is too wide and feels unconstrained.
**Fix:** Set `max-width: 560px` on the modal container. For small confirmations, use `max-width: 400px`.

---

### 4.6 — Lists & Tables

#### Purpose
Lists communicate structured information. Tables communicate relational data. Both must be scannable in under two seconds. Row spacing and typography hierarchy are the primary tools.

#### List CSS Enhancement

```css
/* ── LAYER 1: OVERRIDE ── */
.list-item,
[class*="list-"] > li,
[class*="list-"] > [class*="item"] {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-sm);
  transition: background var(--duration-fast) var(--ease-standard);
}

/* ── LAYER 2: ENHANCEMENT ── */
.list-item--interactive:hover {
  background: var(--color-surface-hover);
  cursor: pointer;
}

.list-item--interactive:active {
  background: var(--color-surface-active);
}

/* Dividers — between items, not around items */
.list-item + .list-item {
  border-top: 1px solid var(--color-border-subtle);
}
```

#### Table CSS Enhancement

```css
/* ── LAYER 1: OVERRIDE ── */
table,
.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9375rem;
}

th,
.table-header-cell {
  text-align: left;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text-tertiary);
  padding: var(--space-2) var(--space-4);
  border-bottom: 1px solid var(--color-border);
}

td,
.table-cell {
  padding: var(--space-3) var(--space-4);
  color: var(--color-text-primary);
  border-bottom: 1px solid var(--color-border-subtle);
  vertical-align: middle;
}

/* ── LAYER 2: ENHANCEMENT ── */
tbody tr {
  transition: background var(--duration-fast) var(--ease-standard);
}

tbody tr:hover {
  background: var(--color-surface-hover);
}

tbody tr:last-child td {
  border-bottom: none;
}
```

#### Common Fixes

**Problem:** Table rows are too tight — content feels cramped.
**Fix:** Set `padding: var(--space-3) var(--space-4)` on all `td` and `th` elements.

**Problem:** Table headers look the same as body text.
**Fix:** Apply uppercase, tracking, and `--color-text-tertiary` to `th`. This creates immediate visual hierarchy.

---

### 4.7 — Badges & Tags

#### Purpose
Badges communicate status. Tags communicate categorization. Both must be small, controlled, and never decorative. The color of a badge must carry semantic meaning — not visual interest.

#### Visual Structure

```
┌──────────────┐   height: 22px
│  Label text  │   padding: 0 --space-2
└──────────────┘   border-radius: --radius-xs
                   font-size: 0.6875rem (11px)
                   font-weight: 600
                   letter-spacing: 0.04em
                   text-transform: uppercase
```

#### CSS Enhancement Strategy

```css
/* ── LAYER 1: OVERRIDE ── */
.badge,
.tag,
[class*="badge-"],
[class*="tag-"] {
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 var(--space-2);
  border-radius: var(--radius-xs);
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  white-space: nowrap;
  line-height: 1;
}

/* Semantic color system — backgrounds are tinted, never saturated */
.badge--success { background: rgba(var(--color-success-rgb), 0.12); color: var(--color-success); }
.badge--warning { background: rgba(var(--color-warning-rgb), 0.12); color: var(--color-warning); }
.badge--error   { background: rgba(var(--color-error-rgb), 0.12);   color: var(--color-error);   }
.badge--info    { background: rgba(var(--color-info-rgb), 0.12);    color: var(--color-info);    }
.badge--neutral { background: var(--color-surface-hover);           color: var(--color-text-secondary); }
```

#### Color Restraint Rule
Badges may only use the 5 semantic colors defined above. **No custom badge colors.** If a new semantic state is required, define it as a design token — do not introduce an ad-hoc color.

---

### 4.8 — Form Button Hierarchy

#### Purpose
Forms contain multiple actions of different rank. The hierarchy of those actions must be unmistakable: one primary action, at most one secondary, destructive actions always isolated.

#### Hierarchy Rules

```
[Cancel]  ←── Ghost button, left-aligned or first in group
[Submit]  ←── Primary button, right-aligned or last in group
```

```
[Delete]  ←── Destructive button, isolated from primary action group
              (separated by space or positioned on opposite side)
```

#### CSS Enhancement Strategy

```css
/* ── LAYER 1: OVERRIDE ── */
.form-actions,
.button-group,
[class*="form-footer"] {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-3);
  margin-top: var(--space-6);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border-subtle);
}

/* Destructive button isolation */
.btn--destructive {
  margin-right: auto; /* pushes to left, separating from confirm group */
}

/* Destructive styling */
.btn--destructive {
  color: var(--color-error);
  background: transparent;
  border: 1px solid rgba(var(--color-error-rgb), 0.30);
}

.btn--destructive:hover {
  background: rgba(var(--color-error-rgb), 0.06);
  border-color: var(--color-error);
}
```

---

## 5. Motion Patterns (Component Level)

### 5.1 — Hover Lift

Used on: Cards, elevated buttons, interactive thumbnails.

```css
.component:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-2);
  transition:
    transform var(--duration-base) var(--ease-standard),
    box-shadow var(--duration-base) var(--ease-standard);
}
```

**Rule:** Maximum lift is `-4px`. Never use negative Y values beyond this for component-level interactions.

### 5.2 — Press Compression

Used on: Buttons, list items with click action, icon buttons.

```css
.component:active {
  transform: scale(0.97) translateY(0);
  transition:
    transform var(--duration-fast) var(--ease-press);
}
```

### 5.3 — Fade + Slide Entry

Used on: Modals, dropdowns, tooltips, notification toasts.

```css
@keyframes fade-slide-in {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.component--entering {
  animation: fade-slide-in var(--duration-medium) var(--ease-enter) forwards;
}
```

**Rule:** Entry translate distance is always `6–8px`. Never slide from more than 12px — it will feel slow and heavy.

### 5.4 — Focus Highlight Transition

Used on: All interactive elements.

```css
.component:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(var(--color-accent-rgb), 0.20);
  transition: box-shadow var(--duration-fast) var(--ease-standard);
}
```

### 5.5 — Timing Reference Table

| Interaction | Duration | Easing |
|---|---|---|
| Color change (hover) | 120ms | `--ease-standard` |
| Focus ring appear | 120ms | `--ease-standard` |
| Button hover lift | 200ms | `--ease-standard` |
| Button press | 120ms | `--ease-press` |
| Card hover lift | 200ms | `--ease-standard` |
| Dropdown open | 200ms | `--ease-enter` |
| Dropdown close | 150ms | `--ease-exit` |
| Modal enter | 280ms | `--ease-enter` |
| Modal exit | 200ms | `--ease-exit` |
| Toast enter | 280ms | `--ease-enter` |
| Toast exit | 200ms | `--ease-exit` |
| Skeleton shimmer | 1400ms | `linear` (loop) |
| Spinner rotation | 600ms | `linear` (loop) |

---

## 6. Visual Refinement Rules

### 6.1 — Reduce Noise

Before adding anything visual, audit what can be removed:

- **Borders:** If a surface has a shadow, it does not need a border. If it has a border, the shadow should be `--shadow-0`. Never both at full strength.
- **Colors:** Reduce the number of distinct colors on any single view to a maximum of 3 (excluding black/white/grey neutrals).
- **Decorative icons:** Icons that do not communicate function must be removed or replaced with whitespace.
- **Hairlines:** Never use `1px solid` borders between items that are already separated by padding — the padding is the divider.

### 6.2 — Improve Contrast Hierarchy

Every view must pass this three-second test: cover the view and reveal it. Within three seconds, you must immediately know what the primary action or content is.

If you cannot — the contrast hierarchy has failed. Fix the font weight, color lightness, or size of the primary content until it is immediately dominant.

### 6.3 — Normalize Spacing Inconsistencies

Audit all components for these common spacing violations and fix them:

| Violation | Fix |
|---|---|
| Padding is different on left vs right | Set symmetric padding: `padding: Y var(--space-N)` |
| Sibling components have different vertical gaps | Set `gap: var(--space-4)` on their container |
| Labels float too far from their inputs | Set `margin-bottom: var(--space-1)` on labels |
| Section headings have no breathing room | Set `margin-bottom: var(--space-4)` below headings |
| Cards inside a grid have mismatched padding | Set padding once on the card class, not inline |

### 6.4 — Visual Alignment

- **All text must align to the same horizontal grid.** Use consistent left padding — never let elements have arbitrary left offsets.
- **Icons must be vertically centered to their adjacent text** — use `display: inline-flex; align-items: center; gap: var(--space-2)` on icon+label containers.
- **Section titles and their content must share the same left edge** — no section title should be indented differently than its content block.

---

## 7. Component Anti-Patterns

### 7.1 — Inconsistent Padding
**Forbidden:** `padding: 10px 15px` on one button, `padding: 12px 20px` on the next.
**Required:** All buttons of the same size variant use identical padding from the spacing scale.

### 7.2 — Random Border Radius
**Forbidden:** `border-radius: 5px` on a card, `border-radius: 3px` on its button, `border-radius: 10px` on its input.
**Required:** Each element type uses its designated radius token. No exceptions.

### 7.3 — Harsh Shadows
**Forbidden:** `box-shadow: 0 4px 20px rgba(0,0,0,0.4)` — this is a heavy, aggressive shadow that breaks the calm premium feel.
**Required:** Shadows above `--shadow-2` are only for modals and overlays. Never on cards or buttons.

### 7.4 — Too Many Colors
**Forbidden:** More than 3 distinct brand/accent colors appearing in one component or view.
**Required:** Use semantic color tokens (`--color-success`, `--color-error`, `--color-accent`) and nothing else.

### 7.5 — Heavy Animations
**Forbidden:** Any transition above `380ms` on a component-level interaction. Any `bounce` or spring easing. Any animation on layout properties.
**Required:** All component transitions are within the timing table in Section 5.5.

### 7.6 — Unclear Click Targets
**Forbidden:** Click targets smaller than 36×36px. Invisible interactive areas. Text links without hover feedback.
**Required:** All interactive elements have a minimum 44×44px touch target, a visible hover state, and a focus ring.

---

## 8. Constraint-Based Enhancement Strategy

### 8.1 — How to Improve Components Without Changing HTML

**Strategy 1 — Class Injection via JS**
If the existing HTML has no class hooks, add one class to the component root with JS, then use CSS descendant selectors from that root.

```javascript
// Add a stable hook to the component root
document.querySelectorAll('.product-item').forEach(el => {
  el.classList.add('ui-card'); // your enhancement class
});
```

**Strategy 2 — CSS Attribute Selectors**
When classes are unreliable, target stable HTML attributes.

```css
/* Target inputs by type */
input[type="text"] { }
input[type="checkbox"] + label { }

/* Target buttons by role */
[role="button"] { }
```

**Strategy 3 — Adjacent and Child Combinators**
When the immediate parent has a stable class, use direct child selectors — not deeply nested ones.

```css
/* Stable parent, unknown children */
.form-section > input { }
.form-section > select { }
```

### 8.2 — How to Handle Messy or Deeply Nested Structures

1. **Identify the deepest stable class.** Work upward from the target element until you find a class that will not be dynamically generated or removed.
2. **Add a class at that point using JS.** This gives you a stable CSS hook.
3. **Target downward from that stable class using a maximum of 2 descendant levels.**
4. **If 2 levels is not enough** — the structure is too deeply nested to safely patch with CSS. Use a JS patch to add a class directly on the target element.

### 8.3 — Overriding Safely Without Breaking Layout

Before applying any CSS override to a constrained component:

1. Open DevTools and inspect the computed styles on the target element.
2. Identify which properties are set by the base system.
3. Set only the properties you need to change — do not copy the full rule and modify it.
4. After applying, check `display`, `position`, `width`, and `height` in computed styles — none of these should have changed unless the override explicitly and intentionally targets them.

---

## 9. Component Quality Checklist

Before any component enhancement is finalized, it must pass all items in this checklist.

```
COMPONENT QUALITY CHECKLIST
──────────────────────────────────────────────────────────

VISUAL PREMIUM
[ ] The component looks and feels high-end — refined, calm, confident
[ ] No visual clutter (unnecessary borders, shadows, colors) present
[ ] Spacing is clean and based on the 4px scale
[ ] Border radius uses the correct token for this component type
[ ] Shadow level is appropriate for this component's elevation

SYSTEM CONSISTENCY
[ ] This component uses the same spacing scale as all other components
[ ] This component uses the same radius scale as all other components
[ ] This component uses the same shadow system as all other components
[ ] This component uses the same transition timing as all other components
[ ] This component uses semantic color tokens — no hardcoded color values

INTERACTION QUALITY
[ ] All 6 states are defined: default, hover, active, focus, disabled, loading
[ ] Hover state feels responsive — transition is smooth, not instant or slow
[ ] Press feedback is immediate and satisfying
[ ] Focus ring is visible and consistent with all other components
[ ] Disabled state is clearly muted and not interactive

MOTION QUALITY
[ ] Only transform and opacity are animated (unless layout animation is justified)
[ ] Durations are within the permitted timing scale
[ ] Easing uses only the approved cubic-bezier curves
[ ] Entry/exit animations are directionally intentional
[ ] No animation stacks on the same element

ACCESSIBILITY
[ ] Focus is visible and meets WCAG 2.4.7
[ ] Interactive elements have accessible labels
[ ] Color is not the only differentiator for state
[ ] Touch targets are at least 44×44px
[ ] Keyboard interaction is fully functional

PERFORMANCE
[ ] No layout-triggering properties in transitions
[ ] No unthrottled scroll or resize listeners introduced
[ ] No heavy DOM mutations in the JS patch
[ ] CLS remains 0 after the component is rendered

──────────────────────────────────────────────────────────
RESULT: ALL BOXES CHECKED = COMPONENT READY
        ANY BOX UNCHECKED = COMPONENT NOT READY
──────────────────────────────────────────────────────────
```

---

*This document is version-controlled alongside the patch rules document. Both must be consulted together. The patch rules define how to change. This document defines what to change toward.*
