# No-Videos Color Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove all video backgrounds and gradients, replace with solid dark/light color scheme (dark: #13151c + blue lines, light: #f2f0ec + red lines) and CSS-only decorative accent elements.

**Architecture:** Three-file vanilla HTML/CSS/JS portfolio. Changes touch all three files: tokens rebuilt in CSS, video elements removed from HTML, video management JS stripped out. No new files created.

**Tech Stack:** Vanilla HTML5, CSS3 custom properties, vanilla JS (no build tools)

---

### Task 1: CSS — Actualizar tokens de color

**Files:**
- Modify: `css/main.css:6-48`

- [ ] **Step 1: Reemplazar bloque `:root` completo (líneas 6–30)**

```css
:root {
  --bg-primary: #13151c;
  --bg-secondary: #1a1d27;
  --surface: rgba(255, 255, 255, 0.03);
  --surface-hover: rgba(255, 255, 255, 0.06);
  --surface-active: rgba(41, 121, 255, 0.1);
  --border: rgba(255, 255, 255, 0.06);
  --border-accent: rgba(41, 121, 255, 0.25);
  --accent: #2979ff;
  --accent-dim: rgba(41, 121, 255, 0.12);
  --accent-hover: #4a8eff;
  --text-primary: #f0f2f5;
  --text-secondary: #8892a4;
  --text-muted: #4a5568;
  --transition: 300ms;

  /* HUD */
  --hud-line: rgba(41, 121, 255, 0.35);
  --hud-panel: rgba(255, 255, 255, 0.05);
  --mono: ui-monospace, "SF Mono", "Cascadia Code", Consolas, monospace;
  --frame-pad: 18px;
  --rail-w: 64px;
  --top-h: 56px;
  --status-h: 40px;
}
```

- [ ] **Step 2: Reemplazar bloque `[data-theme="light"]` completo (líneas 32–48)**

```css
[data-theme="light"] {
  --bg-primary: #f2f0ec;
  --bg-secondary: #e8e4dc;
  --surface: rgba(0, 0, 0, 0.02);
  --surface-hover: rgba(0, 0, 0, 0.04);
  --surface-active: rgba(192, 57, 43, 0.06);
  --border: rgba(0, 0, 0, 0.06);
  --border-accent: rgba(192, 57, 43, 0.25);
  --accent: #c0392b;
  --accent-dim: rgba(192, 57, 43, 0.08);
  --accent-hover: #e74c3c;
  --text-primary: #111318;
  --text-secondary: #4a5263;
  --text-muted: #8892a4;
  --hud-line: rgba(192, 57, 43, 0.35);
  --hud-panel: rgba(0, 0, 0, 0.04);
}
```

- [ ] **Step 3: Commit**

```bash
git add css/main.css
git commit -m "style: nuevos tokens dark #13151c+blue / light #f2f0ec+red"
```

---

### Task 2: CSS — Eliminar reglas de video, overlay y gradientes

**Files:**
- Modify: `css/main.css:108-131` (video/overlay) y líneas de gradientes en otros selectores

- [ ] **Step 1: Eliminar el bloque `.section-video` (líneas 108–115)**

Borrar todo el bloque:
```css
/* ELIMINAR */
.section-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}
```

- [ ] **Step 2: Eliminar los tres bloques de `.section-overlay` (líneas 117–131)**

Borrar:
```css
/* ELIMINAR */
.section-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(3,5,10,0.82) 0%, rgba(3,5,10,0.45) 50%, rgba(3,5,10,0.7) 100%);
  z-index: 1;
}

[data-theme="light"] .section-overlay {
  background: linear-gradient(135deg, rgba(238,240,243,0.85) 0%, rgba(238,240,243,0.4) 50%, rgba(238,240,243,0.7) 100%);
}

#experiencia .section-overlay {
  background: linear-gradient(135deg, rgba(3,5,10,0.45) 0%, rgba(3,5,10,0.18) 50%, rgba(3,5,10,0.38) 100%);
}
```

- [ ] **Step 3: Eliminar `.skilltree::before` (el radial-gradient del árbol, línea ~308)**

Borrar todo el bloque:
```css
/* ELIMINAR */
.skilltree::before { content: ''; position: absolute; left: 50%; top: 50%; width: 72%; height: 86%; transform: translate(-50%, -50%); background: radial-gradient(ellipse at center, var(--accent-dim), transparent 70%); opacity: 0.6; pointer-events: none; z-index: 0; }
```

- [ ] **Step 4: Eliminar `.project-card::after` (el gradient fade inferior de cards, línea ~267)**

Borrar:
```css
/* ELIMINAR */
.project-card::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 35%, var(--bg-primary) 100%); z-index: 1; pointer-events: none; }
```

- [ ] **Step 5: Reemplazar gradient del `.scanline` por color sólido (línea ~448)**

Cambiar de:
```css
.scanline { position: absolute; left: 0; right: 0; top: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--accent), transparent); opacity: 0.18; pointer-events: none; z-index: 4; animation: scanSweep 5s linear infinite; }
```
A:
```css
.scanline { position: absolute; left: 0; right: 0; top: 0; height: 2px; background: var(--accent); opacity: 0.18; pointer-events: none; z-index: 4; animation: scanSweep 5s linear infinite; }
```

- [ ] **Step 6: Actualizar fondos hardcodeados a `var(--bg-secondary)`**

Cambiar `.exp-panel` (línea ~362) de:
```css
.exp-panel { flex: 1; height: 100%; display: flex; flex-direction: column; padding: 40px 32px; background: rgba(3,5,10,0.72); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); border: 1px solid var(--hud-line); transition: background 0.3s ease; overflow-y: auto; clip-path: polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%); }
```
A:
```css
.exp-panel { flex: 1; height: 100%; display: flex; flex-direction: column; padding: 40px 32px; background: var(--bg-secondary); border: 1px solid var(--hud-line); transition: background 0.3s ease; overflow-y: auto; clip-path: polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%); }
```

Eliminar la regla de override de light mode `[data-theme="light"] .exp-panel { background: ... }` (línea ~363) — ya no es necesaria, el token lo maneja.

Cambiar `.project-info-panel` (línea ~279) de:
```css
.project-info-panel { ... background: rgba(3,5,10,0.86); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); ... }
```
A (mantener las demás propiedades, solo cambiar el background):
```css
.project-info-panel { position: absolute; inset: 0; display: none; z-index: 10; background: var(--bg-secondary); border: 1px solid var(--hud-line); animation: panelIn 0.4s cubic-bezier(0.23,1,0.32,1); }
```
Y eliminar `[data-theme="light"] .project-info-panel { background: ... }` (línea ~280).

Cambiar `.contact-form-view` (línea ~420) de:
```css
.contact-form-view { position: absolute; inset: 0; z-index: 5; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px; background: rgba(3,5,10,0.92); backdrop-filter: blur(22px); -webkit-backdrop-filter: blur(22px); transform: translateY(100%); transition: transform 0.5s cubic-bezier(0.23,1,0.32,1); }
```
A:
```css
.contact-form-view { position: absolute; inset: 0; z-index: 5; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px; background: var(--bg-primary); transform: translateY(100%); transition: transform 0.5s cubic-bezier(0.23,1,0.32,1); }
```
Y eliminar `[data-theme="light"] .contact-form-view { background: ... }` (línea ~421).

- [ ] **Step 7: Commit**

```bash
git add css/main.css
git commit -m "style: eliminar section-video, overlays, gradientes y glassmorphism de video"
```

---

### Task 3: CSS — Añadir línea decorativa horizontal

**Files:**
- Modify: `css/main.css` — añadir regla después de `.section-content`

- [ ] **Step 1: Actualizar `.section-content` y añadir `::before` decorativo**

La regla actual `.section-content` está en línea ~132. Reemplazarla con:
```css
.section-content {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  padding: calc(var(--top-h) + 40px) var(--frame-pad) calc(var(--status-h) + 24px) calc(var(--rail-w) + 24px);
  display: flex;
  flex-direction: column;
}

.section-content::before {
  content: '';
  position: absolute;
  left: calc(var(--rail-w) + 24px);
  top: calc(var(--top-h) + 28px);
  width: 65%;
  height: 2px;
  background: var(--accent);
  z-index: 1;
  pointer-events: none;
}
```

- [ ] **Step 2: Verificar que la línea se ve en el navegador**

Abrir `index.html` en el navegador. Debe verse una línea horizontal delgada de color azul (dark mode) o rojo (light mode) justo encima del encabezado de cada sección.

- [ ] **Step 3: Commit**

```bash
git add css/main.css
git commit -m "style: linea decorativa horizontal de acento en section-content"
```

---

### Task 4: HTML — Eliminar elementos video y overlay

**Files:**
- Modify: `index.html:61-62, 82-83, 106-107, 129-130, 172-173, 204-205`

- [ ] **Step 1: Eliminar `<video>` y `<div class="section-overlay">` de `#inicio` (líneas 61–62)**

Borrar:
```html
      <video class="section-video" src="src/videos/fondoweb3.mp4" autoplay muted loop playsinline></video>
      <div class="section-overlay"></div>
```

- [ ] **Step 2: Eliminar de `#proyectos` (líneas 82–83)**

Borrar:
```html
      <video class="section-video" src="src/videos/fondoweb5.mp4" muted loop playsinline></video>
      <div class="section-overlay"></div>
```

- [ ] **Step 3: Eliminar de `#habilidades` (líneas 106–107)**

Borrar:
```html
      <video class="section-video" src="src/videos/fondoweb1.mp4" muted loop playsinline></video>
      <div class="section-overlay"></div>
```

- [ ] **Step 4: Eliminar de `#experiencia` (líneas 129–130)**

Borrar:
```html
      <video class="section-video" src="src/videos/fondo6.mp4" muted loop playsinline></video>
      <div class="section-overlay"></div>
```

- [ ] **Step 5: Eliminar de `#sobre-mi` (líneas 172–173)**

Borrar:
```html
      <video class="section-video" src="src/videos/fondoweb2.mp4" muted loop playsinline></video>
      <div class="section-overlay"></div>
```

- [ ] **Step 6: Eliminar de `#contacto` (líneas 204–205)**

Borrar:
```html
      <video class="section-video" src="src/videos/fondoweb4.mp4" muted loop playsinline></video>
      <div class="section-overlay"></div>
```

- [ ] **Step 7: Commit**

```bash
git add index.html
git commit -m "chore: eliminar elementos video y section-overlay de las 6 secciones"
```

---

### Task 5: JS — Eliminar gestión de video y actualizar colores de proyectos

**Files:**
- Modify: `js/main.js:244-245, 333-336, 428-429, 437-438` (video logic) y `js/main.js:8-79` (PROJECTS)

- [ ] **Step 1: Eliminar lógica de video en `goToSection()` (líneas 244–245)**

Borrar estas 4 líneas de dentro de `goToSection`:
```js
    var cv = q('.section-video', current)
    var nv = q('.section-video', next)
    if (cv) { cv.pause(); cv.muted = true }
    if (nv) { nv.play().catch(function () {}); nv.muted = true }
```

- [ ] **Step 2: Eliminar el `setTimeout` de play inicial (líneas 333–336)**

Borrar:
```js
  setTimeout(function () {
    var v = q('#inicio .section-video')
    if (v) v.play().catch(function () {})
  }, 200)
```

- [ ] **Step 3: Eliminar pausa de video en `openProjectInfo` (líneas 428–429)**

Borrar:
```js
    var v = q('#proyectos .section-video')
    if (v) v.pause()
```

- [ ] **Step 4: Eliminar play de video en `closeProjectInfo` (líneas 437–438)**

Borrar:
```js
    var v = q('#proyectos .section-video')
    if (v) v.play().catch(function () {})
```

- [ ] **Step 5: Reemplazar `gradient` por `color` sólido en cada objeto de PROJECTS**

En el array `PROJECTS` (líneas 8–79), cambiar la propiedad `gradient` por `color` con el primer tono del gradiente:

```js
// Proyecto 0 — Corazón Azul VH
gradient: 'linear-gradient(135deg, #1a5fd9, #0d3a8c)',
// → reemplazar con:
color: '#1a5fd9',

// Proyecto 1 — Artista Musical
gradient: 'linear-gradient(135deg, #7c3aed, #4c1d95)',
// → reemplazar con:
color: '#7c3aed',

// Proyecto 2 — Ecommerce
gradient: 'linear-gradient(135deg, #0d9488, #065f46)',
// → reemplazar con:
color: '#0d9488',

// Proyecto 3 — Dashboard Analytics
gradient: 'linear-gradient(135deg, #dc2626, #991b1b)',
// → reemplazar con:
color: '#dc2626',

// Proyecto 4 — API RESTful
gradient: 'linear-gradient(135deg, #ca8a04, #854d0e)',
// → reemplazar con:
color: '#ca8a04',
```

- [ ] **Step 6: Actualizar `renderProjects()` para usar `p.color` en lugar de `p.gradient`**

En `renderProjects()` (línea ~385), cambiar:
```js
'<div class="project-card-bg" style="background:' + p.gradient + '"></div>' +
```
A:
```js
'<div class="project-card-bg" style="background:' + p.color + '"></div>' +
```

- [ ] **Step 7: Verificación visual**

Abrir `index.html` en el navegador y verificar:
1. Dark mode: fondo gris oscuro `#13151c`, esquinas y acentos en azul `#2979ff`, línea horizontal azul en cada sección
2. Light mode (toggle): fondo blanco cálido `#f2f0ec`, esquinas y acentos en rojo `#c0392b`, línea horizontal roja en cada sección
3. Sin videos cargando (inspeccionar Network — no debe haber requests a `/src/videos/`)
4. Proyectos: cards con color sólido sutil (sin gradient), panel de detalle con fondo sólido
5. Skill tree: visible sin radial-gradient de fondo
6. Experiencia: paneles con fondo `#1a1d27` (dark) o `#e8e4dc` (light)
7. Contacto: formulario con fondo sólido al hacer scroll

- [ ] **Step 8: Commit**

```bash
git add js/main.js
git commit -m "refactor: eliminar gestión de video en JS, colores sólidos en proyectos"
```
