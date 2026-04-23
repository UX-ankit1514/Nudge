# Frontend UI Patch Rules Document
**Version 1.0 — Enforcement Edition**
**Status: ACTIVE — All patches must comply before merge**

> This document is a guardrail system. It is not advisory. Every rule here exists because someone broke something by ignoring it. Treat violations as blockers.

---

## 1. Core Philosophy

### Rule 1.1 — Do Not Break Existing UI
The existing UI is the contract. Your patch must not alter any behavior, layout, or visual output that was intentional in the base system. If you are unsure whether something is intentional, **assume it is**.

**DO:** Apply scoped, reversible CSS targeting a specific component class.
**DO NOT:** Override base element styles and assume the impact is contained.

### Rule 1.2 — Enhance, Don't Fight the System
If a patch requires fighting existing rules — stacking specificity endlessly, forcing values, or working around base behavior — **stop**. The patch strategy is wrong. Redesign the approach.

**DO:** Work with existing specificity, class structure, and cascade order.
**DO NOT:** Add increasingly aggressive overrides to win a specificity war you caused.

### Rule 1.3 — Small Controlled Changes Over Aggressive Overrides
Every patch must be the minimum intervention required to achieve the desired result. Larger surface area = larger risk. Patches must be surgical.

**DO:** Change one property at a time. Validate. Then continue.
**DO NOT:** Bundle multiple visual changes into one untested block.

---

## 2. CSS Override Rules (STRICT)

### Rule 2.1 — When to Override vs. When to Leave Alone

Override only when:
- The base style produces a measurable visual defect.
- A design system enhancement cannot be achieved without targeting that property.
- The override is scoped to a named component class.

Do not override when:
- The output is "close enough" and only subjectively wrong.
- The property is layout-critical and you have not mapped all downstream effects.
- No class boundary exists to scope the change safely.

### Rule 2.2 — Specificity Strategy

All patches must follow this escalation ladder. **Do not skip levels.**

```
Level 1 — Single class selector:       .component-name { }
Level 2 — Two-class chain:             .parent-class .component-name { }
Level 3 — Attribute + class combo:     .component-name[data-state="active"] { }
Level 4 — !important (see Rule 2.4)
```

Start at Level 1. Only escalate if the base styles override your patch at the current level. Document the reason for escalation in a comment above the rule.

### Rule 2.3 — Selector Structure Rules

- **Selectors must start with a component-level class.** No patch selector may begin with a generic element tag.
- **Maximum selector depth is 4 levels.** Anything deeper signals a structural problem, not a styling one.
- **Sibling and child combinators (`>`, `+`, `~`) are allowed** only when the relationship is stable and not DOM-position-dependent.
- **Pseudo-classes (`:hover`, `:focus`, `:active`, `:focus-visible`) are required** on any patch that changes interactive state appearance.

### Rule 2.4 — Conditions Where `!important` Is Allowed

`!important` is permitted **only** under all three of these conditions simultaneously:

1. The base style uses inline styles or is applied by a third-party library with no class hook.
2. You have exhausted Levels 1–3 of the specificity ladder.
3. The override is scoped to a single named class — not a tag, not a wildcard.

`!important` is **forbidden** when:

- You are overriding your own previously written CSS.
- The target selector is a generic element (`div`, `span`, `p`, `a`, `ul`).
- You are using it to fix a specificity conflict you created.
- It appears in more than one rule targeting the same property on the same component.

### Rule 2.5 — Hard Limits on `!important`

- Maximum **2 uses** of `!important` per component patch file.
- Maximum **1 use** of `!important` per individual property per component.
- Every `!important` declaration must have a comment stating: why it was necessary, what it overrides, and when it can be removed.

```css
/* REASON: InlineStyle override from ThirdPartyLib v2.3 — remove when lib updated */
.card-header {
  background-color: var(--color-surface-elevated) !important;
}
```

---

## 3. Safe Targeting Strategy

### Rule 3.1 — Prefer Class-Based Targeting

Target named component classes only. Every selector must anchor to a class that unambiguously identifies the component or sub-element being patched.

**VALID:**
```css
.nav-item-label { }
.modal-overlay .close-button { }
```

**INVALID:**
```css
div > span { }
header ul li a { }
```

### Rule 3.2 — Avoid Targeting Generic Tags

The following selectors are **forbidden** as primary selectors in any patch:

`div`, `span`, `p`, `a`, `ul`, `li`, `section`, `article`, `main`, `header`, `footer`, `button` (unscoped), `input` (unscoped)

They may appear as **secondary selectors** only when preceded by a scoped component class.

**VALID:** `.search-box input { }`
**INVALID:** `input { }` or `div span { }`

### Rule 3.3 — Avoid Deeply Nested Selectors

Selectors deeper than 4 levels are prohibited. They are brittle, difficult to debug, and signal a targeting approach that will break on any DOM refactor.

```css
/* FORBIDDEN — 5 levels deep */
.sidebar .menu .item .label span { }

/* REQUIRED — use a direct class hook */
.menu-item-label { }
```

If no class exists at the required depth, request one to be added — do not write a fragile depth-based selector.

### Rule 3.4 — Avoid Fragile Selectors Tied to DOM Order

The following patterns are **forbidden** in patch CSS:

```css
/* Forbidden — nth-child tied to position */
.list > div:nth-child(3) { }

/* Forbidden — first-child assumptions */
.card > *:first-child > span { }

/* Forbidden — adjacent sibling on unmarked elements */
div + div { }
```

Position-based selectors break silently. They produce no error, they just stop working after a DOM change.

### Rule 3.5 — Handling Unknown or Dynamic Class Names

When the base system uses dynamic or generated class names (e.g., CSS Modules, hashed classes, framework-generated):

1. Do not target generated class names directly. They will change.
2. Target a stable ancestor class and use a descendant selector with a structural element hook **only** if it is the element type that will not change.
3. Request a stable `data-*` attribute hook from the team if no reliable class exists.
4. If neither is possible, **do not patch that component with CSS**. Escalate to JS patch using Rule 8 constraints.

---

## 4. Layering System

All patch CSS must be organized in exactly three layers, separated into clearly commented blocks or separate files loaded in order.

### Layer 0 — Base (Existing System)
Do not touch. Do not import into patch files. This is the foundation.

```css
/* ============================================================
   LAYER 0: BASE SYSTEM — DO NOT MODIFY
   Loaded by: main.css / bundler
   ============================================================ */
```

### Layer 1 — Override Layer
Controlled fixes only. Corrects visual defects. No decorative additions.

```css
/* ============================================================
   LAYER 1: OVERRIDES
   Purpose: Fix measurable visual defects in base system
   Constraint: Must be reversible, scoped, justified
   ============================================================ */

.card-title {
  /* Override: base system line-height causes text clipping on mobile */
  line-height: 1.4;
}
```

### Layer 2 — Enhancement Layer
Polish, animation, and premium visual additions. Must not affect layout.

```css
/* ============================================================
   LAYER 2: ENHANCEMENTS
   Purpose: Animations, transitions, refined visual polish
   Constraint: No layout properties. No overrides of Layer 1.
   ============================================================ */

.card {
  transition: box-shadow 200ms ease;
}

.card:hover {
  box-shadow: var(--shadow-elevated);
}
```

**Rule:** Layer 2 must never re-override anything in Layer 1. If it does, the Layer 1 fix was incomplete or incorrectly scoped.

---

## 5. Non-Breaking Rules

### Rule 5.1 — Never Change Layout-Critical Properties Without Mapping Impact

The following properties are layout-critical. They must not be changed in any override without first documenting all components affected by the change:

`display`, `position`, `width`, `height`, `min-width`, `max-width`, `min-height`, `max-height`, `overflow`, `float`, `clear`, `top`, `right`, `bottom`, `left`, `margin` (on block containers)

If you must change one of these, write a comment above it listing every component verified post-change.

### Rule 5.2 — Never Remove Properties Without Checking Impact

Do not delete or set to `unset` / `initial` any property from the base system without verifying:

1. What visual effect the original property produced.
2. Whether any child element or pseudo-element depends on that value through inheritance.
3. Whether the removal affects responsive breakpoints.

Removal with no documentation is a blocker.

### Rule 5.3 — Avoid Overriding Flex and Grid Unless Necessary

Flex and grid properties affect multiple children simultaneously. Overriding `flex-direction`, `justify-content`, `align-items`, `grid-template-columns`, or `gap` on a container without understanding all its children is **prohibited**.

If a flex/grid override is required, list every direct child in the component and verify the change against each.

### Rule 5.4 — Preserve Responsiveness

Every patch must be tested at a minimum of three breakpoints: mobile (375px), tablet (768px), and desktop (1280px). A patch that fixes a desktop issue and breaks mobile is not a patch — it is a regression.

Responsive overrides must be inside the same media query blocks used by the base system. Do not introduce new breakpoint values.

### Rule 5.5 — Do Not Break Scroll Behavior

The following properties directly affect scroll behavior and are forbidden in patch CSS unless you have explicitly verified scroll behavior before and after:

`overflow`, `overflow-x`, `overflow-y`, `height` (on scroll containers), `position: fixed`, `position: sticky`, `scroll-behavior`, `overscroll-behavior`

---

## 6. Visual Consistency Rules

### Rule 6.1 — Do Not Introduce New Spacing Systems

All spacing values must come from the existing spacing scale in the design system. Arbitrary pixel or rem values are forbidden.

**VALID:** `padding: var(--space-4);`
**INVALID:** `padding: 13px;` or `margin: 1.3rem;`

If the design token doesn't exist, request it. Do not invent values.

### Rule 6.2 — Stick to the Existing Spacing Scale

The permitted spacing scale is whatever the base system defines. Do not add intermediate values. Do not use `calc()` to create values between steps. Consistency across the UI depends on this being absolute.

### Rule 6.3 — Maintain Consistent Border Radius, Shadows, and Typography

Every visual attribute in this list must use a design token from the existing system:

- **Border radius:** `var(--radius-*)` tokens only.
- **Box shadows:** `var(--shadow-*)` tokens only.
- **Font size:** `var(--text-*)` or `var(--font-size-*)` tokens only.
- **Font weight:** `var(--font-weight-*)` tokens only.
- **Color:** `var(--color-*)` semantic tokens only — never raw hex values.

Using a hardcoded value where a token exists is a violation.

### Rule 6.4 — Avoid Mixing Visual Styles

A single component must not contain properties from more than one visual era or design pattern. If the base uses flat design tokens, do not add skeuomorphic gradients. If the base uses border-radius-sm, do not add a pill shape override to a single instance.

---

## 7. Animation Safety Rules

### Rule 7.1 — Only Animate `transform` and `opacity` Where Possible

These are the only GPU-composited properties. Animating any other property triggers layout or paint recalculation.

**SAFE to animate:** `transform`, `opacity`
**UNSAFE to animate:** `width`, `height`, `top`, `left`, `margin`, `padding`, `border-width`, `font-size`, `background-color` (except in controlled, non-performance-critical contexts)

If a design requirement mandates animating an unsafe property, escalate — do not proceed without review.

### Rule 7.2 — Avoid Layout-Triggering Animations

Animating any property that causes layout reflow is **prohibited** in the Enhancement Layer. This includes all box model properties, positioning properties, and content-affecting properties.

### Rule 7.3 — Keep Durations Consistent

All transitions and animations must use duration tokens from the design system. If none exist, these are the only permitted values:

- Micro-interactions: `150ms`
- Component transitions: `200ms`
- Page-level transitions: `300ms`

Durations above 400ms are forbidden in component-level patches unless explicitly approved.

### Rule 7.4 — Avoid Stacking Multiple Animations on the Same Element

No element may have more than one animation applied simultaneously in patch CSS. If the base system already applies an animation, the patch must not add another via `animation` or additional `transition` properties that conflict.

### Rule 7.5 — Disable Animation on Critical Interactions If It Reduces Usability

Animations must not delay user feedback on:

- Form submissions
- Button clicks with immediate consequence
- Error state displays
- Navigation transitions where speed signals responsiveness

If an animation on a critical interaction creates even 100ms of perceived delay, remove it.

---

## 8. JS Patch Rules (Minimal Intervention)

### Rule 8.1 — Only Use JS When CSS Cannot Solve the Problem

Before writing any JS patch, document why CSS cannot solve the problem. If a CSS-only solution exists, it is mandatory. JS is a last resort.

Acceptable reasons to use JS:
- Dynamic class toggling based on scroll position, user input, or async state.
- Adding accessible `aria-*` attributes that the base system fails to include.
- Calculating values that CSS `var()` or `calc()` cannot handle.

Unacceptable reasons:
- CSS feels complicated.
- The JS approach is faster to write.
- You want to manipulate styles directly via `element.style.*`.

### Rule 8.2 — Do Not Manipulate Core Logic

JS patches must not:
- Intercept, replace, or modify event handlers attached by the base system.
- Override functions on any globally scoped object from the minified core.
- Redefine or shadow variables in the base system's closure.

### Rule 8.3 — Avoid Heavy DOM Mutations

Permitted DOM operations in patches:
- Adding or removing a single class on an existing element.
- Setting a single `data-*` or `aria-*` attribute.
- Inserting a small, pre-built element into a stable container.

Prohibited DOM operations:
- Rebuilding sections of the DOM.
- Cloning and replacing nodes to work around styling limitations.
- Injecting `<style>` blocks dynamically — use static CSS files instead.
- Modifying innerHTML of any base system component.

### Rule 8.4 — Use Event Listeners Carefully

- Always use `addEventListener` — never assign to `on*` properties (overwrites base handlers).
- Always remove listeners when the component unmounts or the patch is deactivated.
- Never attach listeners to `document` or `window` for component-level concerns.
- Use event delegation at the nearest stable ancestor, not the document root.

### Rule 8.5 — Avoid Performance-Heavy Scripts

Forbidden in patch JS:
- Unthrottled `scroll` event handlers — use `IntersectionObserver` instead.
- Unthrottled `resize` handlers — debounce at minimum 100ms.
- `setInterval` for visual polling — use CSS transitions or `requestAnimationFrame`.
- Synchronous DOM reads inside loops — batch reads before writes.

---

## 9. Debugging & Validation Rules

### Rule 9.1 — Test Each Change in Isolation

Apply one patch at a time. Validate. Then apply the next. Never batch multiple unverified patches into a single commit.

### Rule 9.2 — Document Before/After Impact

For every patch, record:
- The element and property before the patch (screenshot or computed style value).
- The element and property after the patch.
- Which components were cross-checked for unintended effects.

### Rule 9.3 — Verify No Layout Shift

After applying a patch, measure Cumulative Layout Shift (CLS) on the affected view. Any measurable layout shift introduced by a patch is a blocker. Use browser DevTools Performance panel or Lighthouse to confirm.

### Rule 9.4 — Check Responsiveness (Mobile + Desktop)

Required breakpoints for validation of every patch:

| Breakpoint | Viewport Width |
|---|---|
| Mobile (small) | 375px |
| Mobile (large) | 430px |
| Tablet | 768px |
| Desktop | 1280px |
| Wide Desktop | 1440px |

Failure at any breakpoint = the patch is not ready.

### Rule 9.5 — Check All Interactive States

For any element a patch touches, verify all of the following states visually:

- `:default` (resting state)
- `:hover`
- `:focus` and `:focus-visible`
- `:active`
- `:disabled` (if applicable)
- Error state (if applicable)
- Loading state (if applicable)

Patches that fix the default state but break the focus state are not complete.

---

## 10. Anti-Patterns (STRICTLY FORBIDDEN)

The following patterns are grounds for immediate rejection of any patch.

### 10.1 — Overusing `!important`
Using `!important` more than twice in a patch file, or using it without a documented justification comment, is a hard blocker.

### 10.2 — Global Overrides
The following selectors are **absolutely forbidden** in patch files:

```css
/* FORBIDDEN */
* { }
body { }
html { }
:root { /* only for adding new tokens — never for overriding base tokens */ }
```

### 10.3 — Random Z-Index Values Without a System
Using a z-index value that is not part of the project's established z-index scale is forbidden. Do not use values like `z-index: 9999`, `z-index: 100`, or any arbitrary number. If a z-index scale does not exist, define one in a shared token file before applying any z-index override.

### 10.4 — Breaking Component Structure Visually
Patches must not alter a component's visual structure: the relationship between header, body, and footer zones; the order of interactive elements; or the alignment system of a component's internal grid.

### 10.5 — Inconsistent Spacing Hacks
Negative margins used to visually compensate for misalignment, `margin: auto` applied without understanding the flex/grid context, and `padding` used to simulate `gap` are all forbidden. Fix the root alignment issue.

### 10.6 — Fixing One Issue While Creating Another
A patch that resolves a defect in one component while introducing a defect in another is not a valid patch. Both must be resolved before the patch ships. There is no "follow-up ticket" exception for regressions introduced by a patch.

---

## 11. Override Decision Framework

Before writing any line of override CSS or patch JS, answer all five questions:

| # | Question | If No → |
|---|---|---|
| 1 | Is this change visually necessary? | Stop. Do not patch. |
| 2 | Can this be solved at a lower specificity level? | Use the lower level. |
| 3 | Have I identified every component this selector could affect? | Map the impact first. |
| 4 | Is the output consistent with the existing design system? | Revise the approach. |
| 5 | Can this patch be fully reverted in under 2 minutes? | Redesign until it can. |

Only proceed if all five answers are "yes" (or the "If No" action has been completed).

---

## 12. Patch Quality Checklist

Every patch must satisfy all items before it is considered complete. This checklist is not optional. Partial completion is the same as failure.

```
PATCH QUALITY CHECKLIST
──────────────────────────────────────────────────────────

SCOPE
[ ] The patch targets a named component class — not a generic element
[ ] The selector depth is 4 levels or fewer
[ ] The change is scoped to the intended component only

MINIMALISM
[ ] Only the required properties are changed — nothing extra
[ ] No properties are changed "while I'm here" without separate validation
[ ] The patch is the smallest possible intervention for the desired result

REVERSIBILITY
[ ] The patch can be fully reverted by deleting its CSS block
[ ] No base system files were modified to make this patch work
[ ] No inline styles were added to HTML

LAYOUT INTEGRITY
[ ] No layout-critical properties were changed without impact mapping
[ ] CLS (Cumulative Layout Shift) is 0 after applying the patch
[ ] No scroll behavior was altered

VISUAL QUALITY
[ ] The change improves visual quality by a measurable standard
[ ] Spacing values use design system tokens
[ ] Colors use design system semantic tokens
[ ] Typography uses design system tokens

PERFORMANCE
[ ] No unthrottled event listeners were added
[ ] No layout-triggering animations were introduced
[ ] No heavy DOM mutations were performed

CROSS-COMPONENT VERIFICATION
[ ] All sibling components of the patched component were checked
[ ] All breakpoints (375px → 1440px) were validated
[ ] All interactive states (:hover, :focus, :active) were checked
[ ] Dark mode / theme variants were checked (if applicable)

DOCUMENTATION
[ ] Every !important has a justification comment
[ ] Every Level 3+ specificity escalation has a justification comment
[ ] The patch layer (Override or Enhancement) is declared in a comment

──────────────────────────────────────────────────────────
RESULT: ALL BOXES CHECKED = PATCH READY
        ANY BOX UNCHECKED = PATCH NOT READY
──────────────────────────────────────────────────────────
```

---

*This document is version-controlled. Proposed amendments require review from the lead frontend engineer. No exceptions are granted without documented justification and written approval.*
