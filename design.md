# Design System Strategy: The Kinetic Obsidian

## 1. Overview & Creative North Star

The Creative North Star for this design system is **"The Kinetic Obsidian."**

We are moving away from the static, boxy nature of traditional SaaS dashboards. Instead, we are building a "Luxury Command Center"—a high-fidelity environment where data feels like it is projected onto layers of dark glass. This system breaks the standard "template" look through intentional asymmetry, overlapping card structures, and a dramatic high-contrast typography scale. By utilizing deep tonal layering and controlled "light-leaks" (glows), we create an interface that feels responsive to the high-stakes energy of competitive gaming.

## 2. Colors & Surface Philosophy

This system utilizes a sophisticated dark-mode palette that prioritizes depth over flat separation.

### The "No-Line" Rule

Designers are prohibited from using 1px solid borders for sectioning or layout containment. Structural boundaries must be defined solely through background color shifts. For example, a `surface_container_low` sidebar should sit directly against a `surface` background. The eye should perceive the edge through the change in value, not a stroke.

### Surface Hierarchy & Nesting

Treat the UI as a series of physical layers stacked in 3D space.

- **Base Layer:** `surface` (#131313) or `surface_container_lowest` (#0e0e0e).
- **Sectional Layers:** Use `surface_container` (#201f1f) for large content areas.
- **Interactive Layers:** Use `surface_container_high` (#2a2a2a) for hover states or nested cards.
- **Nesting Logic:** An inner container must always be at least one "step" higher or lower than its parent to maintain visual clarity.

### The "Glass & Gradient" Rule

To achieve the "Futuristic High-Tech" aesthetic, use Glassmorphism for floating elements (like modals or tooltips).

- **Recipe:** Use `surface_variant` at 40% opacity with a `backdrop-filter: blur(20px)`.
- **Signature Textures:** For primary CTAs and hero analytics (e.g., Win Rate), use a linear gradient from `primary` (#ffb77d) to `primary_container` (#ff8c00) at a 135-degree angle. This provides a "metallic energy" that flat colors lack.

## 3. Typography

We use a dual-typeface approach to balance editorial authority with technical precision.

- **Display & Headlines:** We utilize **Space Grotesk**. Its wide apertures and geometric construction feel like high-end engineering. Use `display-lg` for critical "Tilt Scores" and `headline-md` for section titles.
- **Body & Labels:** We utilize **Inter**. It is the workhorse of the system, providing maximum legibility for dense match history data.
- **Hierarchy Note:** High-contrast sizing is mandatory. A `display-lg` tilt score should sit adjacent to a `label-sm` timestamp to create a clear informational hierarchy that mirrors high-end editorial magazines.

## 4. Elevation & Depth

In this design system, depth is a functional tool, not just an ornament.

### The Layering Principle

Avoid traditional structural lines. Instead, stack `surface-container` tiers. A `surface_container_lowest` match-card placed on a `surface_container_low` feed creates a "recessed" look that feels more premium and integrated than a floating shadow.

### Ambient Shadows

Shadows should rarely be used. When a "floating" effect is required (e.g., a dropdown), use an extra-diffused shadow:

- **Blur:** 32px to 64px.
- **Opacity:** 8% of the `on_surface` color.
- **Color:** Tint the shadow with a hint of `primary_container` to simulate the orange glow reflecting off the obsidian surface.

### The "Ghost Border" & Glow

While 1px layout lines are forbidden, 1px **Functional Glows** are encouraged for high-priority states.

- **Victory State:** A 1px border using `secondary` (#e9c349) with a 4px outer bloom.
- **Defeat/Tilt State:** A 1px border using `error` (#ffb4ab) with a 4px outer bloom.
- **Interactive Elements:** Use the `outline_variant` token at 15% opacity for "Ghost Borders" on inactive cards.

## 5. Components

### Buttons

- **Primary:** A solid gradient from `primary` to `primary_container`. Text should be `on_primary_fixed` (#2f1500) for maximum punch. Use `DEFAULT` (0.25rem) roundedness for a sharp, aggressive look.
- **Secondary:** Ghost style. No fill. 1px border using `outline` (#a48c7a) at 30% opacity. On hover, transition to 100% opacity.

### Navigation Sidebar

- **Style:** `surface_container_lowest` background.
- **Active State:** No background pill. Instead, use a 2px vertical "light bar" of `primary` on the far left and change the icon/text to `primary`.

### Cards & Lists

- **Forbid Dividers:** Do not use lines to separate list items. Use the Spacing Scale (e.g., `4` or `1rem` vertical gaps) and subtle background shifts between even/odd items using `surface_container` and `surface_container_low`.
- **Data Density:** Use `body-sm` for secondary stats (KDA, CS/min) to keep the interface feeling "high-tech" and data-rich without being cluttered.

### Status Indicators (The "Pulse")

For "Live" matches, use a small circular indicator with a keyframe animation.

- **Color:** `primary_container`.
- **Effect:** A dual-ring pulse using `surface_tint` at 20% opacity expanding outwards.

## 6. Do's and Don'ts

### Do:

- Use **intentional asymmetry**. Align text-heavy blocks to the left while keeping large "Tilt Gauges" centered or offset to the right.
- Use `spacing-12` (3rem) and `spacing-16` (4rem) to give high-level analytics "breathing room."
- Utilize `secondary_fixed` (Brushed Gold) sparingly—only for "Mastery" levels or "Rank Up" moments.

### Don't:

- **Don't use pure white (#FFFFFF).** Always use `on_surface` (#e5e2e1) for text to prevent eye strain against the deep black background.
- **Don't use "Standard" shadows.** If the shadow looks like a default CSS drop-shadow, it is too heavy. It should feel like an ambient atmospheric occlusion.
- **Don't use fully opaque panels.** This system relies on "The Kinetic Obsidian" feel; let background glows or gradients bleed through panels using 80-90% opacity.

### Accessibility Note:

Despite the dark aesthetic, ensure that all `on_surface_variant` text on `surface_container` backgrounds meets a contrast ratio of at least 4.5:1. Use the `outline` token for critical icons to ensure they are never lost in the shadows.
