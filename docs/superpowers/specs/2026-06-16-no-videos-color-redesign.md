# No-Videos Color Redesign — Design Spec

**Date:** 2026-06-16  
**Status:** Approved

---

## Goal

Remove all video backgrounds and gradient overlays from the 6-section portfolio. Replace with solid, clean backgrounds and CSS-only decorative elements in a dual-color scheme (blue for dark mode, red for light mode).

---

## Color System

### Dark Mode (default, `data-theme="dark"`)
| Token | Value | Use |
|---|---|---|
| `--bg-primary` | `#13151c` | Section background |
| `--bg-secondary` | `#1a1d27` | Content area background |
| `--accent` | `#2979ff` | Interactive elements, borders, decorative lines |
| `--border-color` | `#2979ff` | Decorative lines and frames |
| `--text-primary` | `#f0f2f5` | (unchanged) |
| `--text-secondary` | `#8892a4` | (unchanged) |

### Light Mode (`[data-theme="light"]`)
| Token | Value | Use |
|---|---|---|
| `--bg-primary` | `#f2f0ec` | Section background |
| `--bg-secondary` | `#e8e4dc` | Content area background |
| `--accent` | `#c0392b` | Interactive elements, borders, decorative lines |
| `--border-color` | `#c0392b` | Decorative lines and frames |
| `--text-primary` | `#111318` | Dark text on light |
| `--text-secondary` | `#4a5263` | Subdued text on light |

---

## Decorative Elements (CSS-only, no images)

Three types of decorative detail replace the visual richness previously provided by videos:

### 1. Horizontal Accent Line
- A `2px` solid line in `--accent` color
- Width: `~70%` of section width, aligned left with a small offset (`margin-left: 48px` or `left: 48px`)
- Position: just above the section content area (top of `.section-content`, before the section heading)
- Implemented via `::before` pseudo-element on `.section-content`

### 2. Left Content Border
- A `3px` left border on the section-content wrapper in `--accent` color
- Gives a vertical structural anchor to each section
- `padding-left` adjusted to accommodate the border

### 3. HUD Corner Accents
- The existing `.hud-corner` elements already provide corner accents
- Update their color to use `--accent` (currently they may be hardcoded)
- Result: corners change color with the theme (blue in dark, red in light)

---

## What Gets Removed

### HTML (`index.html`)
- 6 `<video class="section-video" src="...">` elements (one per section)
- 6 `<div class="section-overlay"></div>` elements (one per section)

### CSS (`css/main.css`)
- `.section-video` rule block (position, inset, object-fit, z-index)
- `.section-overlay` rule block (background gradient)
- `#experiencia .section-overlay` variant rule
- Any other per-section overlay overrides

### JS (`js/main.js`)
- In `goToSection()`: video `pause()`/`play()` calls (`cv.pause()`, `nv.play()`)
- The `const cv` / `const nv` video queries inside `goToSection()`
- The `setTimeout(() => sections[currentSection]...play(), 500)` initial video autoplay block (if present)

---

## Section Backgrounds

All 6 sections share the same `--bg-primary` background. Differentiation comes from content layout only. The `.section-content` wrapper sits on `--bg-secondary` to create a subtle panel effect without gradients.

No per-section color variation — uniformity is intentional for a clean, professional feel.

---

## Out of Scope

- No changes to layout, typography, or component structure
- No changes to the skill tree, projects gallery, contact form, or experience section content
- No new animations or transitions — existing fade transitions between sections are unchanged
- No font changes
