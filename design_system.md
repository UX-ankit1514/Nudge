# Nudge 2.0 Universal Design System

This document outlines the formalized design system for Nudge 2.0 based on the premium, dark-themed aesthetic of the Hero section. **All new components, sections, and pages MUST strictly adhere to these variables, typography rules, and component patterns.** Do not introduce new colors, fonts, or styling paradigms without explicit permission.

## 1. Global CSS Variables (`index.css`)

These variables define the core aesthetic of the application. They are pre-configured in `index.css` and should be used throughout the app (via Tailwind arbitrary values or custom classes).

```css
:root {
  /* Colors */
  --bg-base: #030303;
  --text-primary: #FFFFFF; /* Or #F5F5F7 for slightly softer white */
  --text-secondary: rgba(255, 255, 255, 0.5); /* or #8E8E93 */
  --accent: #efa339;
  --accent-secondary: #7c3aed; /* Used in gradient meshes */
  
  /* Semantic Accents (from Cards) */
  --color-warm-up: #34D399;
  --color-stretch: #FB923C;
  --color-brave: #FF927E;

  /* Surfaces & Glassmorphism */
  --card-bg: rgba(18, 18, 20, 0.9);
  --border-subtle: rgba(255, 255, 255, 0.08); /* Tailwind: border-white/[0.08] or border-white/10 */
  --glass-blur: blur(60px) saturate(180%);
  
  /* Shadows */
  --shadow-premium: 0 32px 64px -16px rgba(0,0,0,0.6);
  --shadow-premium-hover: 0 48px 80px -20px rgba(0,0,0,0.8);
  --shadow-accent: 0 20px 40px rgba(239, 163, 57, 0.15);
  
  /* Animation */
  --ease-premium: cubic-bezier(0.2, 0, 0, 1);
}
```

## 2. Typography Rules (`tailwind.config.js`)

The application uses three distinct fonts to create its aesthetic.

*   **Heading Font (`font-heading`):** `Instrument Serif`, serif
    *   **Usage:** H1, H2, large display numbers, short impactful statements.
    *   **Styling:** Often used with extreme tracking (e.g., `tracking-[-0.05em]` or `tracking-display`), very tight line-height (e.g., `leading-[0.8]`), and sometimes italicized for the accent word.
*   **Body Font (`font-body`):** `Inter`, sans-serif
    *   **Usage:** Paragraphs, UI elements, buttons, small metadata (pills).
    *   **Styling:** Clean, highly legible. Secondary text often uses light font weights (`font-light`) and lower opacity (`text-white/50`).
*   **Script Font (`font-script`):** `Caveat`, cursive
    *   **Usage:** Card quotes, personalized/handwritten accents.

### Typography Hierarchy Defaults
*   **H1 (Display):** `font-heading text-6xl md:text-8xl lg:text-[130px] leading-[0.8] tracking-[-0.05em] text-white`
*   **H2 (Section Title):** `font-heading text-4xl md:text-5xl leading-tight tracking-tight text-white`
*   **Body (Large):** `font-body text-lg lg:text-[22px] text-white/50 tracking-premium leading-relaxed font-light text-balance`
*   **Body (Standard):** `font-body text-base text-white/70`
*   **Microcopy / UI Labels:** `font-body text-[11px] uppercase tracking-wider font-semibold text-white/50`

## 3. The "Nudge" Grid Background (Global Layout Wrapper)

The background aesthetic consists of a solid dark base, a technical grid, a grain overlay, and subtle gradient meshes. This should be applied globally, not just in the Hero.

**Implementation Pattern:**
Wrap the main application layout in a container that applies these elements:

1.  **Base:** `bg-[#030303]`
2.  **Gradient Meshes:** Soft, large radial gradients (`blur-[140px]`, low opacity `0.08` - `0.12`). Primary orange (`#efa339`) top right, secondary purple (`#7c3aed`) bottom left.
3.  **Technical Grid:**
    ```css
    background-image: linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px);
    background-size: 40px 40px;
    opacity: 0.04;
    ```
4.  **Grain Overlay:** SVG fractal noise applied with `mix-blend-overlay` and very low opacity (`0.04`).

## 4. Reusable Components

### Primary Button
The main call-to-action button, heavily styled with the accent color and glowing shadows.

**Tailwind Classes:**
`bg-[#efa339] text-black font-body font-semibold rounded-full text-[16px] tracking-tight shadow-[0_20px_40px_rgba(239,163,57,0.15)] hover:shadow-[0_25px_50px_rgba(239,163,57,0.3)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-700 flex items-center justify-center`

### Secondary / Ghost Button
Used for secondary actions, featuring a glassmorphism border and subtle hover state.

**Tailwind Classes:**
`border border-white/10 backdrop-blur-md text-white/70 font-body font-medium rounded-full text-[15px] tracking-tight hover:bg-white/5 hover:text-white hover:-translate-y-1 active:scale-[0.98] transition-all duration-700 flex items-center justify-center`

### Glass Card
The standard container for content (like the interaction cards in the Hero).

**Tailwind Classes (Base structure):**
`bg-[rgba(18,18,20,0.9)] backdrop-blur-[60px] saturate-180 border border-white/[0.1] rounded-[32px] shadow-[0_10px_20px_rgba(0,0,0,0.4)] overflow-hidden relative`

*Note: Glass cards often include a very subtle, low-opacity radial gradient mesh "inside" them to give them depth, colored according to their semantic purpose (e.g., green for warm-up).*

### Status / Tag Pills
Small rounded indicators for metadata.

**Tailwind Classes:**
`flex flex-row justify-center items-center px-[12px] py-[6px] rounded-full w-auto whitespace-nowrap backdrop-blur-md bg-white/[0.05] border border-white/[0.1]`
*(Adjust text color and background/border tint based on semantic meaning, e.g., orange, green, red).*
