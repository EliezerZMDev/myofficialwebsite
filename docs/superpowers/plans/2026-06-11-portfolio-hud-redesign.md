# Rediseño HUD del Portfolio — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reconstruir el portfolio ELIEZERDEV desde cero con estética HUD de videojuego AAA — marco de telemetría persistente + composiciones asimétricas por sección — conservando identidad visual, datos y navegación full-screen.

**Architecture:** Single-page vanilla HTML/CSS/JS sin build. Un marco HUD fijo (chrome) envuelve un contenedor de 6 secciones full-screen que se intercambian con transiciones fade. CSS con custom properties y clip-paths angulares; JS en IIFE con módulos para navegación, render de datos, telemetría, tema y panel de detalle.

**Tech Stack:** HTML5 semántico, CSS3 (custom properties, grid, flexbox, clip-path, backdrop-filter, keyframes), JavaScript ES6+ vanilla, Google Fonts (Inter), videos mp4 existentes.

**Verificación:** No hay test runner. Cada tarea se verifica abriendo `index.html` en navegador (doble-click o `start index.html`) y observando el comportamiento descrito. Usar DevTools (F12) para revisar errores de consola en cada tarea.

**Referencia de diseño:** `docs/superpowers/specs/2026-06-11-portfolio-hud-redesign-design.md`

**Datos a conservar (no cambian):** Los arrays `PROJECTS` (5), `SKILLS` (7), `CONTACT_CELLS` (7) del `js/main.js` actual. Copiarlos verbatim al nuevo archivo. Misma copia de textos de Experiencia y Sobre mí del `index.html` actual (la versión Sobre mí con `<strong>`/`.text-dim` ya aplicada).

---

## File Structure

```
index.html      → marco HUD (chrome) + 6 <section> semánticas + contenedores de render
css/main.css    → reescrito: tokens, reset, marco, secciones, motion, responsive
js/main.js      → reescrito: IIFE con módulos (nav, render, telemetría, tema, detalle, form)
src/videos/     → SIN CAMBIOS (reutiliza fondoweb1-5.mp4, fondo6.mp4)
AGENTCONTEXT/   → changelog.md, session.md, decisions.md (actualizar al final)
```

Tres archivos cambian juntos en cada sección (HTML estructura + CSS estilo + JS comportamiento). Por eso las tareas se organizan por **bloque funcional**, no por archivo.

---

## Estrategia de respaldo

Antes de reescribir, los archivos actuales viven en git (commits previos) y en el working tree. La tarea 0 hace un commit de respaldo del estado actual para poder volver con `git revert`/`git checkout` si algo sale mal.

---

### Task 0: Respaldo y rama de trabajo

**Files:** ninguno (solo git)

- [ ] **Step 1: Commit del estado actual como respaldo**

Hay cambios sin commitear de la sesión previa (fixes de cards/skills/experiencia/about). Commitearlos como punto de retorno.

```bash
cd "C:/Users/USER/Documents/ProyectosVSCode/myofficialwebsite"
git add index.html css/main.css js/main.js
git commit -m "chore: respaldo pre-rediseño HUD (fixes de secciones previos)"
```

- [ ] **Step 2: Verificar árbol limpio**

Run: `git status`
Expected: "nothing to commit, working tree clean" (salvo archivos de AGENTCONTEXT/docs que se tocarán luego).

---

### Task 1: Tokens CSS + reset + estructura HTML base + contenedor de secciones

**Files:**
- Modify: `index.html` (reescritura de estructura)
- Modify: `css/main.css` (reescritura — empezar por tokens y reset)

- [ ] **Step 1: Reescribir `<head>` y esqueleto de `index.html`**

Conservar el `<head>` actual (meta, preconnect, Inter, link a css). El `<body>` tendrá: marco HUD (chrome) vacío por ahora + `.sections-container` con 6 `<section>` que solo contienen `<video>`, `.section-overlay` y un `.section-content` vacío con su número fantasma. Estructura:

```html
<body>
  <!-- HUD FRAME (chrome persistente) -->
  <div class="hud-frame" id="hudFrame">
    <span class="hud-corner tl"></span><span class="hud-corner tr"></span>
    <span class="hud-corner bl"></span><span class="hud-corner br"></span>

    <header class="hud-top">
      <a href="#inicio" class="hud-logo"><span class="hud-logo-glyph"></span>ELIEZERDEV</a>
      <nav class="hud-tabs" id="hudTabs">
        <a href="#" class="hud-tab" data-section="0">Inicio</a>
        <a href="#" class="hud-tab" data-section="1">Proyectos</a>
        <a href="#" class="hud-tab" data-section="2">Habilidades</a>
        <a href="#" class="hud-tab" data-section="3">Experiencia</a>
        <a href="#" class="hud-tab" data-section="4">Sobre mí</a>
        <a href="#" class="hud-tab" data-section="5">Contacto</a>
      </nav>
      <button class="hud-theme" id="themeToggle" aria-label="Cambiar tema">
        <!-- iconos sun/moon SVG del index actual -->
      </button>
    </header>

    <aside class="hud-rail" id="hudRail">
      <!-- render por JS: lista de índices verticales -->
    </aside>

    <footer class="hud-status" id="hudStatus">
      <span class="hud-stat"><i class="hud-led"></i> SYS·ONLINE</span>
      <span class="hud-stat mono" id="statCoords">LAT 19.4° · LON -99.1°</span>
      <span class="hud-progress"><i id="statProgress"></i></span>
      <span class="hud-stat mono" id="statSection">00 / 06</span>
      <span class="hud-stat mono">2026.06</span>
      <span class="hud-stat hud-hint">⏎ SCROLL / ↑↓</span>
    </footer>
  </div>

  <!-- SECCIONES -->
  <main class="sections-container" id="sectionsContainer">
    <section id="inicio" class="section active" data-index="0">
      <video class="section-video" src="src/videos/fondoweb1.mp4" autoplay muted loop playsinline></video>
      <div class="section-overlay"></div>
      <div class="section-content">
        <span class="section-ghost">00</span>
        <!-- contenido por tarea -->
      </div>
    </section>
    <!-- repetir para proyectos(fondoweb2,01), habilidades(fondoweb3,02),
         experiencia(fondoweb4,03), sobre-mi(fondoweb5,04), contacto(fondo6,05) -->
  </main>

  <script src="js/main.js"></script>
</body>
```

- [ ] **Step 2: Escribir tokens + reset + base en `css/main.css`**

Conservar los tokens `:root` y `[data-theme="light"]` del CSS actual (paleta idéntica). Añadir tokens nuevos:

```css
:root {
  /* ...paleta existente... */
  --hud-line: rgba(41,121,255,0.35);
  --hud-panel: rgba(3,5,10,0.40);
  --mono: ui-monospace, "SF Mono", "Cascadia Code", Consolas, monospace;
  --frame-pad: 18px;       /* margen del chrome al borde */
  --rail-w: 64px;
  --top-h: 56px;
  --status-h: 40px;
}
```

Reset idéntico al actual (`* { margin:0; padding:0; box-sizing:border-box }`, scrollbar oculto, `body { overflow:hidden; width:100vw; height:100vh }`). **Regla global: ningún `border-radius`.**

- [ ] **Step 3: Estilos del contenedor de secciones (igual que el actual)**

Reusar las reglas `.sections-container`, `.section`, `.section.active`, `.section.leaving`, `.section-video`, `.section-overlay`, `.section-content` del CSS actual (fade transitions, video object-fit cover, overlay gradiente). Añadir:

```css
.section-content {
  position: relative; z-index: 2; width: 100%; height: 100%;
  padding: calc(var(--top-h) + 40px) var(--frame-pad) calc(var(--status-h) + 24px) calc(var(--rail-w) + 24px);
  display: flex; flex-direction: column;
}
.section-ghost {
  position: absolute; top: 4%; right: 2%;
  font-size: clamp(8rem, 22vw, 20rem); font-weight: 900;
  line-height: 0.8; color: rgba(255,255,255,0.025);
  letter-spacing: -0.05em; pointer-events: none; z-index: 0; user-select: none;
}
```

- [ ] **Step 4: Verificar en navegador**

Run: abrir `index.html`.
Expected: se ve el video de fondo de Inicio, overlay oscuro, y un "00" gigante muy tenue en la esquina. El chrome aún sin estilo (texto plano arriba). Sin errores en consola (F12) — `main.js` aún es el viejo; si truena, vaciar temporalmente no es necesario porque se reescribe en Task 2-3. Si hay errores por IDs faltantes, ignorar hasta Task 2.

- [ ] **Step 5: Commit**

```bash
git add index.html css/main.css
git commit -m "feat: estructura HTML del marco HUD + tokens CSS + contenedor de secciones"
```

---

### Task 2: Estilos del marco HUD (chrome) + JS de navegación y tema

**Files:**
- Modify: `css/main.css` (estilos del chrome)
- Modify: `js/main.js` (reescritura: IIFE, nav, tema, hash)

- [ ] **Step 1: CSS del marco HUD**

```css
.hud-frame { position: fixed; inset: 0; z-index: 100; pointer-events: none; }
.hud-frame > * { pointer-events: auto; }

.hud-corner { position: absolute; width: 22px; height: 22px; border: 2px solid var(--hud-line); }
.hud-corner.tl { top: var(--frame-pad); left: var(--frame-pad); border-right: 0; border-bottom: 0; }
.hud-corner.tr { top: var(--frame-pad); right: var(--frame-pad); border-left: 0; border-bottom: 0; }
.hud-corner.bl { bottom: var(--frame-pad); left: var(--frame-pad); border-right: 0; border-top: 0; }
.hud-corner.br { bottom: var(--frame-pad); right: var(--frame-pad); border-left: 0; border-top: 0; }

.hud-top {
  position: absolute; top: var(--frame-pad); left: calc(var(--frame-pad) + 32px);
  right: calc(var(--frame-pad) + 32px); height: var(--top-h);
  display: flex; align-items: center; justify-content: space-between;
}
.hud-logo { display: flex; align-items: center; gap: 10px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; font-size: 0.9rem; color: var(--text-primary); }
.hud-logo-glyph { width: 14px; height: 16px; background: var(--accent); clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%); }
.hud-tabs { display: flex; gap: 2px; }
.hud-tab { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-muted); padding: 7px 14px; transition: all var(--transition) ease; border-bottom: 2px solid transparent; }
.hud-tab:hover { color: var(--text-secondary); }
.hud-tab.active { color: var(--accent); border-bottom-color: var(--accent); }
.hud-theme { width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; color: var(--text-secondary); border: 1px solid var(--border); background: var(--surface); transition: all var(--transition) ease; }
.hud-theme:hover { color: var(--text-primary); border-color: var(--hud-line); }
.hud-theme svg { width: 16px; height: 16px; }

.hud-rail { position: absolute; left: var(--frame-pad); top: 50%; transform: translateY(-50%); width: var(--rail-w); display: flex; flex-direction: column; gap: 4px; align-items: center; }
.hud-rail-item { font-family: var(--mono); font-size: 0.6rem; color: var(--text-muted); cursor: pointer; padding: 6px 4px; letter-spacing: 0.1em; transition: all var(--transition) ease; writing-mode: vertical-rl; }
.hud-rail-item:hover { color: var(--text-secondary); }
.hud-rail-item.active { color: var(--accent); font-size: 0.85rem; font-weight: 700; }

.hud-status {
  position: absolute; bottom: var(--frame-pad); left: calc(var(--frame-pad) + 32px);
  right: calc(var(--frame-pad) + 32px); height: var(--status-h);
  display: flex; align-items: center; gap: 24px; font-size: 0.62rem;
  letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted);
}
.hud-stat { display: flex; align-items: center; gap: 6px; white-space: nowrap; }
.hud-stat.mono { font-family: var(--mono); }
.hud-led { width: 7px; height: 7px; background: var(--accent); display: inline-block; }
.hud-progress { flex: 1; max-width: 160px; height: 2px; background: var(--border); position: relative; }
.hud-progress i { position: absolute; left: 0; top: 0; height: 100%; background: var(--accent); width: 16%; transition: width 0.4s ease; }
.hud-hint { margin-left: auto; }

/* iconos tema (del CSS actual) */
[data-theme="dark"] .icon-sun { display: block } [data-theme="dark"] .icon-moon { display: none }
[data-theme="light"] .icon-sun { display: none } [data-theme="light"] .icon-moon { display: block }
```

Pegar los dos `<svg>` (sun/moon) del botón tema dentro de `.hud-theme` en el HTML (copiados del index actual).

- [ ] **Step 2: Reescribir `js/main.js` — IIFE + datos + navegación + tema**

Estructura base. Copiar los arrays `PROJECTS`, `SKILLS`, `CONTACT_CELLS` verbatim del archivo actual. Helpers `q`/`qa`. Lógica de navegación adaptada del actual (`goToSection`, wheel, teclado, hash, popstate) pero referenciando `.hud-tab` y `.hud-rail-item` en vez de `.nav-link`:

```js
;(function () {
  'use strict'
  /* ---- DATA (copiar verbatim del main.js actual) ---- */
  const PROJECTS = [ /* ...5 objetos... */ ]
  const SKILLS = [ /* ...7 objetos... */ ]
  const CONTACT_CELLS = [ /* ...7 objetos... */ ]
  const TOTAL_SECTIONS = 6
  const SECTION_NAMES = ['Inicio','Proyectos','Habilidades','Experiencia','Sobre mí','Contacto']

  function q (s, c) { return (c || document).querySelector(s) }
  function qa (s, c) { return [...(c || document).querySelectorAll(s)] }

  const sections = qa('.section')
  const tabs = qa('.hud-tab')
  const sectionsContainer = q('#sectionsContainer')
  const themeToggle = q('#themeToggle')
  const html = document.documentElement
  let currentIndex = 0
  let isTransitioning = false
  let isProjectOpen = false

  /* ---- RAIL (índice vertical) ---- */
  function renderRail () {
    var rail = q('#hudRail')
    SECTION_NAMES.forEach(function (name, i) {
      var item = document.createElement('div')
      item.className = 'hud-rail-item' + (i === 0 ? ' active' : '')
      item.textContent = String(i).padStart(2, '0')
      item.title = name
      item.addEventListener('click', function () { goToSection(i) })
      rail.appendChild(item)
    })
  }

  /* ---- NAVEGACIÓN (adaptado del actual) ---- */
  function goToSection (index) {
    if (isTransitioning || index === currentIndex || index < 0 || index >= TOTAL_SECTIONS) return
    isTransitioning = true
    closeProjectInfo()
    var current = sections[currentIndex], next = sections[index]
    var cv = q('.section-video', current), nv = q('.section-video', next)
    if (cv) { cv.pause(); cv.muted = true }
    if (nv) { nv.play().catch(function(){}); nv.muted = true }
    current.classList.remove('active'); current.classList.add('leaving'); next.classList.add('active')
    setTimeout(function () { current.classList.remove('leaving'); isTransitioning = false }, 350)
    tabs.forEach(function (t, i) { t.classList.toggle('active', i === index) })
    qa('.hud-rail-item').forEach(function (r, i) { r.classList.toggle('active', i === index) })
    updateTelemetry(index)
    var id = sections[index].id
    if (window.location.hash !== '#' + id) history.pushState(null, null, '#' + id)
    currentIndex = index
  }
  function nextSection () { goToSection(currentIndex + 1) }
  function prevSection () { goToSection(currentIndex - 1) }

  sectionsContainer.addEventListener('wheel', function (e) {
    e.preventDefault()
    if (isTransitioning || isProjectOpen) return
    if (e.deltaY > 0) nextSection(); else prevSection()
  }, { passive: false })

  document.addEventListener('keydown', function (e) {
    if (isProjectOpen) { if (e.key === 'Escape') closeProjectInfo(); return }
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); nextSection() }
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); prevSection() }
  })

  tabs.forEach(function (t, i) { t.addEventListener('click', function (e) { e.preventDefault(); goToSection(i) }) })
  document.querySelectorAll('[data-section]').forEach(function (btn) {
    btn.addEventListener('click', function (e) { e.preventDefault(); goToSection(parseInt(this.dataset.section, 10)) })
  })
  window.addEventListener('popstate', function () {
    var hash = window.location.hash || '#inicio', t = 0
    sections.forEach(function (s, i) { if ('#' + s.id === hash) t = i }); goToSection(t)
  })
  if (window.location.hash) {
    sections.forEach(function (s, i) { if ('#' + s.id === window.location.hash) setTimeout(function(){ goToSection(i) }, 100) })
  }
  setTimeout(function () { var v = q('#inicio .section-video'); if (v) v.play().catch(function(){}) }, 200)

  /* ---- TEMA (idéntico al actual) ---- */
  function getPreferredTheme () { var s = localStorage.getItem('eliezertheme'); return s || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark') }
  function setTheme (t) { html.setAttribute('data-theme', t); localStorage.setItem('eliezertheme', t) }
  setTheme(getPreferredTheme())
  themeToggle.addEventListener('click', function () { setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark') })

  /* ---- placeholders, se llenan en tareas siguientes ---- */
  function updateTelemetry (index) { /* Task 3 */ }
  function closeProjectInfo () { /* Task 5 */ }

  /* ---- INIT ---- */
  renderRail()
})()
```

- [ ] **Step 3: Verificar navegación y tema**

Run: abrir `index.html`, usar scroll/flechas/click en tabs y en el riel.
Expected: las 6 secciones cambian con fade; el tab y el item del riel activos se marcan en azul; el hash de la URL cambia; el botón de tema alterna dark/light y persiste al recargar. Consola sin errores.

- [ ] **Step 4: Commit**

```bash
git add index.html css/main.css js/main.js
git commit -m "feat: marco HUD estilizado + navegación, riel y tema en JS"
```

---

### Task 3: Telemetría viva del marco (status bar animada)

**Files:**
- Modify: `js/main.js` (función `updateTelemetry` + animación)

- [ ] **Step 1: Implementar `updateTelemetry` y parpadeo de coordenadas**

```js
function updateTelemetry (index) {
  var prog = q('#statProgress'), sec = q('#statSection')
  if (prog) prog.style.width = (((index + 1) / TOTAL_SECTIONS) * 100).toFixed(0) + '%'
  if (sec) sec.textContent = String(index).padStart(2, '0') + ' / 0' + TOTAL_SECTIONS
}

/* parpadeo sutil de coordenadas — respeta reduced-motion */
function initTelemetryFlicker () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  var coords = q('#statCoords')
  if (!coords) return
  setInterval(function () {
    var lat = (19.4 + (Math.random() - 0.5) * 0.04).toFixed(2)
    var lon = (-99.1 + (Math.random() - 0.5) * 0.04).toFixed(2)
    coords.textContent = 'LAT ' + lat + '° · LON ' + lon + '°'
  }, 1800)
}
```

Llamar `updateTelemetry(0)` e `initTelemetryFlicker()` en INIT.

- [ ] **Step 2: Verificar**

Run: abrir `index.html`, observar la barra inferior; navegar entre secciones.
Expected: la barra de progreso crece al avanzar; el contador "NN / 06" cambia; las coordenadas parpadean ligeramente cada ~2s. Con reduced-motion activado en el SO, las coordenadas quedan fijas.

- [ ] **Step 3: Commit**

```bash
git add js/main.js
git commit -m "feat: telemetría viva del marco HUD (progreso, contador, parpadeo coordenadas)"
```

---

### Task 4: Sección INICIO (Hero asimétrico)

**Files:**
- Modify: `index.html` (`#inicio .section-content`)
- Modify: `css/main.css` (estilos hero)

- [ ] **Step 1: HTML del hero**

```html
<div class="hero">
  <div class="hero-left">
    <h1 class="hero-name">ELIEZER<span>DEV</span></h1>
    <div class="hero-roles mono">DESARROLLADOR · ARQUITECTO DE SISTEMAS</div>
    <p class="hero-desc">Construyo experiencias digitales con enfoque arquitectónico. Sistemas escalables, interfaces precisas y soluciones que funcionan.</p>
    <div class="hero-status-badge"><i class="hud-led"></i> DISPONIBLE PARA PROYECTOS</div>
  </div>
  <div class="hero-right">
    <button class="hero-module" data-section="1"><span class="mono">▸</span> Ver proyectos</button>
    <button class="hero-module" data-section="5"><span class="mono">▸</span> Contactar</button>
  </div>
</div>
```

- [ ] **Step 2: CSS del hero (asimétrico, módulos diagonales)**

```css
.hero { flex: 1; display: flex; align-items: center; gap: 48px; }
.hero-left { flex: 0 0 58%; }
.hero-name { font-size: clamp(3rem, 8vw, 7rem); font-weight: 900; line-height: 0.92; letter-spacing: -0.04em; text-transform: uppercase; }
.hero-name span { color: var(--accent); }
.hero-roles { font-size: 0.75rem; letter-spacing: 0.25em; color: var(--text-secondary); margin: 18px 0; }
.hero-desc { font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7; max-width: 460px; }
.hero-status-badge { display: inline-flex; align-items: center; gap: 8px; margin-top: 24px; padding: 8px 16px; font-size: 0.65rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--accent); border: 1px solid var(--hud-line); background: var(--hud-panel); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); }
.hero-right { flex: 1; display: flex; flex-direction: column; gap: 12px; }
.hero-module { display: flex; align-items: center; gap: 12px; padding: 28px 32px; font-size: clamp(0.95rem, 1.6vw, 1.35rem); font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-primary); background: var(--hud-panel); border: 1px solid var(--hud-line); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); clip-path: polygon(0 0, 100% 0, 100% 100%, 24px 100%); transition: all var(--transition) ease; }
.hero-module:hover { background: var(--surface-active); color: var(--accent); padding-left: 44px; }
.hero-module .mono { color: var(--accent); }
```

- [ ] **Step 3: Verificar**

Run: abrir `index.html` en Inicio.
Expected: nombre gigante a la izquierda con "DEV" en azul, roles monoespaciados, descripción, badge "DISPONIBLE" con cristal. A la derecha dos botones-módulo con borde diagonal (clip-path) y blur; al hover se iluminan y empujan el texto. Click navega a Proyectos/Contacto.

- [ ] **Step 4: Commit**

```bash
git add index.html css/main.css
git commit -m "feat: seccion INICIO hero asimetrico con modulos diagonales y badge HUD"
```

---

### Task 5: Sección PROYECTOS (cards trapezoidales + flex-expand + panel detalle)

**Files:**
- Modify: `index.html` (`#proyectos .section-content`)
- Modify: `css/main.css` (estilos proyectos + panel)
- Modify: `js/main.js` (`renderProjects`, `initProjectHover`, `openProjectInfo`, `closeProjectInfo`)

- [ ] **Step 1: HTML contenedor**

```html
<div class="section-head"><span class="section-num mono">01</span><h2 class="section-name">Proyectos</h2><span class="section-counter mono" id="projCounter">05 REGISTROS</span></div>
<div class="projects-wrapper">
  <div class="projects-gallery" id="projectsGallery"></div>
  <div class="project-info-panel" id="projectInfoPanel">
    <div class="info-body" id="infoBody"></div>
    <button class="info-close" id="infoClose">◀ VOLVER</button>
  </div>
</div>
```

- [ ] **Step 2: CSS — reutilizar el patrón de cards trapezoidales ya validado**

Encabezado de sección reutilizable (todas las secciones lo usan):
```css
.section-head { display: flex; align-items: baseline; gap: 16px; margin-bottom: 20px; }
.section-num { font-size: 0.8rem; font-weight: 700; color: var(--accent); letter-spacing: 0.2em; }
.section-name { font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.15em; color: var(--text-secondary); }
.section-counter { margin-left: auto; font-size: 0.62rem; color: var(--text-muted); letter-spacing: 0.1em; }
```

Cards (clip-path en píxeles fijos + margen negativo idéntico — ya validado para no dejar huecos):
```css
.projects-wrapper { flex: 1; display: flex; overflow: hidden; position: relative; }
.projects-gallery { display: flex; width: 100%; height: 100%; position: relative; }
.project-card { flex: 1; height: 100%; position: relative; cursor: pointer; clip-path: polygon(40px 0%, 100% 0%, calc(100% - 40px) 100%, 0% 100%); transition: flex 0.4s cubic-bezier(0.23,1,0.32,1); overflow: hidden; background: var(--hud-panel); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border-left: 1px solid var(--hud-line); }
.project-card + .project-card { margin-left: -40px; }
.project-card:hover { z-index: 5; }
.project-card-bg { position: absolute; inset: 0; z-index: 0; opacity: 0.14; }
.project-card::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 35%, var(--bg-primary) 100%); z-index: 1; pointer-events: none; }
.card-tel { position: absolute; top: 20px; left: 48px; z-index: 3; font-family: var(--mono); font-size: 0.55rem; letter-spacing: 0.1em; color: var(--text-muted); }
.card-label-v { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; z-index: 2; writing-mode: vertical-rl; text-orientation: mixed; font-size: clamp(1.1rem, 2vw, 1.8rem); font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; color: var(--text-primary); text-shadow: 0 2px 8px rgba(0,0,0,0.5); pointer-events: none; transition: opacity 0.3s ease; }
.project-card:hover .card-label-v { opacity: 0; }
.card-content { position: absolute; inset: 0; z-index: 3; display: flex; flex-direction: column; justify-content: center; padding: 32px 52px; opacity: 0; transition: opacity 0.3s ease 0.15s; pointer-events: none; }
.project-card:hover .card-content { opacity: 1; }
.projects-gallery.is-panel-open .project-card:hover .card-content { opacity: 0; }
.card-content-title { font-size: clamp(1.2rem, 2.4vw, 1.9rem); font-weight: 900; text-transform: uppercase; letter-spacing: -0.02em; line-height: 1.1; color: var(--text-primary); margin-bottom: 8px; }
.card-content-tech { display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 10px; }
.card-content-tech span { font-size: 0.55rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 3px 8px; border: 1px solid var(--border); color: var(--text-secondary); }
.card-content-desc { font-size: 0.72rem; color: var(--text-secondary); line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
```

Panel de detalle con "◀ VOLVER" grande abajo:
```css
.project-info-panel { position: absolute; inset: 0; display: none; z-index: 10; background: rgba(3,5,10,0.86); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid var(--hud-line); animation: panelIn 0.4s cubic-bezier(0.23,1,0.32,1); }
.project-info-panel.open { display: flex; }
@keyframes panelIn { from { opacity: 0; transform: translateX(24px) } to { opacity: 1; transform: none } }
.info-body { flex: 1; padding: 48px 56px 88px; overflow-y: auto; display: flex; flex-direction: column; justify-content: center; max-width: 760px; }
.info-body h2 { font-size: 2rem; font-weight: 900; text-transform: uppercase; letter-spacing: -0.02em; margin-bottom: 6px; }
.info-tech { display: flex; flex-wrap: wrap; gap: 6px; margin: 16px 0; }
.info-tech span { padding: 4px 12px; font-size: 0.68rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; background: var(--accent-dim); border: 1px solid var(--border-accent); color: var(--accent); }
.info-desc { color: var(--text-secondary); font-size: 0.95rem; line-height: 1.7; margin-bottom: 12px; }
.info-section { margin-top: 16px; }
.info-section h4 { font-family: var(--mono); font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: var(--accent); margin-bottom: 4px; }
.info-section p { color: var(--text-secondary); font-size: 0.88rem; line-height: 1.6; }
.info-actions { display: flex; gap: 10px; margin-top: 24px; }
.info-actions .ibtn { padding: 11px 24px; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; border: 1px solid var(--hud-line); color: var(--text-primary); background: var(--surface); transition: all var(--transition) ease; }
.info-actions .ibtn.primary { background: var(--accent); color: #fff; border-color: var(--accent); }
.info-actions .ibtn:hover { background: var(--surface-hover); }
.info-actions .ibtn.primary:hover { background: var(--accent-hover); }
.info-close { position: absolute; bottom: 0; left: 0; width: 100%; height: 56px; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 0.85rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; background: var(--accent); color: #fff; z-index: 20; transition: background var(--transition) ease; }
.info-close:hover { background: var(--accent-hover); }
```

- [ ] **Step 3: JS — render, hover flex-expand, panel**

```js
const projectsGallery = q('#projectsGallery')
const projectInfoPanel = q('#projectInfoPanel')
const infoBody = q('#infoBody')

function renderProjects () {
  PROJECTS.forEach(function (p, i) {
    var card = document.createElement('div')
    card.className = 'project-card'; card.dataset.index = i
    card.innerHTML =
      '<div class="project-card-bg" style="background:' + p.gradient + '"></div>' +
      '<div class="card-tel">P-0' + i + ' · 2026 · ' + p.tech.slice(0,2).join('/') + '</div>' +
      '<div class="card-label-v">' + p.name + '</div>' +
      '<div class="card-content">' +
        '<h3 class="card-content-title">' + p.name + '</h3>' +
        '<div class="card-content-tech">' + p.tech.map(function(t){return '<span>'+t+'</span>'}).join('') + '</div>' +
        '<p class="card-content-desc">' + p.description + '</p>' +
      '</div>'
    card.addEventListener('click', function () { openProjectInfo(i) })
    projectsGallery.appendChild(card)
  })
}
function initProjectHover () {
  var cards = qa('.project-card', projectsGallery)
  cards.forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      if (isProjectOpen) return
      card.style.flex = '2.5'; card.style.zIndex = '5'
      cards.forEach(function (c) { if (c !== card) { c.style.flex = '0.65'; c.style.zIndex = '1' } })
    })
    card.addEventListener('mouseleave', function () {
      cards.forEach(function (c) { c.style.flex = ''; c.style.zIndex = '' })
    })
  })
}
function openProjectInfo (index) {
  if (isProjectOpen) return
  isProjectOpen = true
  var p = PROJECTS[index]
  projectsGallery.classList.add('is-panel-open')
  infoBody.innerHTML =
    '<h2>' + p.name + '</h2>' +
    '<div class="info-tech">' + p.tech.map(function(t){return '<span>'+t+'</span>'}).join('') + '</div>' +
    '<p class="info-desc">' + p.description + '</p>' +
    '<div class="info-section"><h4>Rol</h4><p>' + p.role + '</p></div>' +
    '<div class="info-section"><h4>Problema</h4><p>' + p.problem + '</p></div>' +
    '<div class="info-section"><h4>Aprendizajes</h4><p>' + p.learnings + '</p></div>' +
    '<div class="info-actions"><a href="' + p.url + '" class="ibtn primary">Ver proyecto</a><a href="' + p.repo + '" class="ibtn">Repositorio</a></div>'
  projectInfoPanel.classList.add('open')
  var v = q('#proyectos .section-video'); if (v) v.pause()
}
function closeProjectInfo () {
  if (!isProjectOpen) return
  isProjectOpen = false
  projectInfoPanel.classList.remove('open')
  projectsGallery.classList.remove('is-panel-open')
  var v = q('#proyectos .section-video'); if (v) v.play().catch(function(){})
}
q('#infoClose').addEventListener('click', closeProjectInfo)
```

Reemplazar el `closeProjectInfo` placeholder de Task 2 por esta versión real (definir las funciones antes del INIT; mover la asignación del listener de `#infoClose` después de que exista en el DOM). Añadir a INIT: `renderProjects(); initProjectHover();`

- [ ] **Step 4: Verificar**

Run: abrir `index.html`, ir a Proyectos.
Expected: 5 cards trapezoidales con etiqueta de telemetría arriba y título vertical; al hover una se expande lateralmente SIN huecos entre cards y muestra título+tech+desc; click abre panel con blur, datos completos y botón "◀ VOLVER" ancho abajo que cierra. ESC también cierra. El video de la sección se pausa con el panel abierto.

- [ ] **Step 5: Commit**

```bash
git add index.html css/main.css js/main.js
git commit -m "feat: seccion PROYECTOS cards trapezoidales flex-expand + panel detalle HUD"
```

---

### Task 6: Sección HABILIDADES (grid limpio + glow + expand)

**Files:**
- Modify: `index.html` (`#habilidades .section-content`)
- Modify: `css/main.css`
- Modify: `js/main.js` (`renderSkills`)

- [ ] **Step 1: HTML**

```html
<div class="section-head"><span class="section-num mono">02</span><h2 class="section-name">Habilidades</h2><span class="section-counter mono">07 MÓDULOS</span></div>
<div class="skills-wrapper"><div class="skills-grid" id="skillsGrid"></div></div>
```

- [ ] **Step 2: CSS — grid 4 columnas, paneles de cristal, glow en hover**

```css
.skills-wrapper { flex: 1; display: flex; align-items: center; justify-content: center; overflow: hidden; }
.skills-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; max-width: 880px; width: 100%; }
.skill-cell { position: relative; background: var(--hud-panel); border: 1px solid var(--border); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); padding: 22px 16px; min-height: 92px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; cursor: pointer; transition: all 0.3s ease; clip-path: polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%); }
.skill-cell-num { font-family: var(--mono); font-size: 0.5rem; color: var(--text-muted); letter-spacing: 0.1em; margin-bottom: 6px; }
.skill-cell-title { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--accent); transition: all 0.3s ease; }
.skill-cell:hover { border-color: var(--hud-line); background: var(--surface-hover); }
.skill-cell:hover .skill-cell-title { color: var(--accent-hover); text-shadow: 0 0 12px rgba(41,121,255,0.55); }
.skill-cell.is-expanded { border-color: var(--accent); background: var(--surface-active); }
.skill-items { display: none; flex-direction: column; gap: 3px; margin-top: 10px; }
.skill-cell.is-expanded .skill-items { display: flex; }
.skill-items span { font-size: 0.58rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; }
```

- [ ] **Step 3: JS — render plano (sin rowLayout)**

```js
function renderSkills () {
  var grid = q('#skillsGrid'); if (!grid) return
  var expandId = null
  SKILLS.forEach(function (skill, i) {
    var cell = document.createElement('div')
    cell.className = 'skill-cell'; cell.dataset.id = skill.id
    cell.innerHTML =
      '<div class="skill-cell-num">MOD·0' + i + '</div>' +
      '<div class="skill-cell-title">' + skill.name + '</div>' +
      '<div class="skill-items">' + skill.items.map(function(it){return '<span>'+it+'</span>'}).join('') + '</div>'
    cell.addEventListener('click', function () {
      if (expandId === skill.id) { expandId = null; cell.classList.remove('is-expanded'); return }
      var prev = grid.querySelector('.skill-cell.is-expanded'); if (prev) prev.classList.remove('is-expanded')
      expandId = skill.id; cell.classList.add('is-expanded')
    })
    grid.appendChild(cell)
  })
}
```

Añadir `renderSkills()` al INIT.

- [ ] **Step 4: Verificar**

Run: abrir `index.html`, ir a Habilidades.
Expected: 7 celdas en grid 4 columnas (fila 4 + fila 3), ordenadas, cada una con "MOD·0N" y título azul, esquina recortada y blur; hover = glow azul en el título; click despliega los items y colapsa al hacer click de nuevo o en otra. Sin desorden ni solapamientos.

- [ ] **Step 5: Commit**

```bash
git add index.html css/main.css js/main.js
git commit -m "feat: seccion HABILIDADES grid limpio con glow y despliegue de items"
```

---

### Task 7: Sección EXPERIENCIA (3 paneles full-height "registros")

**Files:**
- Modify: `index.html` (`#experiencia .section-content`)
- Modify: `css/main.css`

- [ ] **Step 1: HTML — 3 paneles (texto verbatim del index actual)**

```html
<div class="section-head"><span class="section-num mono">03</span><h2 class="section-name">Experiencia</h2><span class="section-counter mono">03 REGISTROS</span></div>
<div class="exp-wrapper">
  <div class="exp-grid">
    <article class="exp-panel">
      <span class="exp-log mono">LOG_001</span>
      <span class="exp-date mono">2026</span>
      <h3 class="exp-title">Portfolio Profesional</h3>
      <p class="exp-desc">Diseño y desarrollo de portafolio personal con identidad visual ELIEZERDEV, inspirándose en interfaces de videojuegos AAA y sistemas operativos futuristas.</p>
      <div class="exp-tags"><span>HTML</span><span>CSS</span><span>JavaScript</span></div>
      <p class="exp-learn">Arquitectura visual cinematográfica, transiciones de estado, diseño de interacción.</p>
    </article>
    <!-- LOG_002 Sistema AGENTCONTEXT (Markdown/Git/Prompt Engineering) y
         LOG_003 Primer Cliente Recurrente (PHP/MySQL/Hosting) — textos del index actual -->
  </div>
</div>
```

- [ ] **Step 2: CSS — overlay más ligero + 3 columnas full-height glassmorphism**

```css
#experiencia .section-overlay { background: linear-gradient(135deg, rgba(3,5,10,0.45) 0%, rgba(3,5,10,0.18) 50%, rgba(3,5,10,0.38) 100%); }
.exp-wrapper { flex: 1; display: flex; overflow: hidden; }
.exp-grid { display: flex; width: 100%; height: 100%; gap: 1px; }
.exp-panel { flex: 1; height: 100%; display: flex; flex-direction: column; padding: 40px 32px; background: rgba(3,5,10,0.5); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid var(--border); transition: background 0.3s ease; overflow-y: auto; clip-path: polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%); }
.exp-panel:hover { background: rgba(3,5,10,0.66); border-color: var(--hud-line); }
.exp-log { font-size: 0.6rem; letter-spacing: 0.2em; color: var(--accent); }
.exp-date { font-size: 0.6rem; letter-spacing: 0.15em; color: var(--text-muted); margin-top: 4px; }
.exp-title { font-size: 1.15rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.02em; margin: 16px 0 12px; }
.exp-desc { font-size: 0.82rem; color: var(--text-secondary); line-height: 1.7; }
.exp-tags { display: flex; flex-wrap: wrap; gap: 4px; margin: 16px 0; }
.exp-tags span { padding: 3px 9px; font-size: 0.58rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; border: 1px solid var(--border-accent); color: var(--accent); }
.exp-learn { margin-top: auto; font-size: 0.75rem; color: var(--text-muted); font-style: italic; border-top: 1px solid var(--border); padding-top: 14px; }
```

- [ ] **Step 3: Verificar**

Run: abrir `index.html`, ir a Experiencia.
Expected: 3 paneles que ocupan todo el alto y ancho, con esquina recortada; el video se ve difuminado a través de cada panel; hover oscurece e ilumina el borde; el texto de aprendizajes queda anclado abajo con línea separadora. Legible sobre el video.

- [ ] **Step 4: Commit**

```bash
git add index.html css/main.css
git commit -m "feat: seccion EXPERIENCIA 3 paneles full-height tipo registros con blur"
```

---

### Task 8: Sección SOBRE MÍ (focal + satélite)

**Files:**
- Modify: `index.html` (`#sobre-mi .section-content`)
- Modify: `css/main.css`

- [ ] **Step 1: HTML — panel focal con bio (jerarquía ya definida) + satélite**

```html
<div class="section-head"><span class="section-num mono">04</span><h2 class="section-name">Sobre mí</h2></div>
<div class="about-grid">
  <div class="about-focal">
    <div class="about-id"><span class="about-initials">EZ</span><span class="about-id-tag mono">ID · ELIEZERDEV</span></div>
    <div class="about-bio">
      <p><strong>Ingeniero en Sistemas</strong>. <span class="text-dim">Empecé construyendo soluciones para problemas reales y descubrí que el desarrollo de software es</span> <strong>mi forma de crear impacto</strong>.</p>
      <p><strong>Construyo sistemas completos — desde la arquitectura hasta la interfaz</strong>. <span class="text-dim">Me interesa la</span> <strong>inteligencia artificial, el diseño de experiencias, los videojuegos como medio artístico y el ecosistema startup</strong>.</p>
      <p>Mi visión: <strong>cada línea de código debe tener un propósito</strong>. <strong>No construyo páginas, construyo herramientas que resuelven problemas</strong>.</p>
    </div>
  </div>
  <aside class="about-sat">
    <div class="about-stat"><span class="mono">ROL</span><b>Ing. en Sistemas</b></div>
    <div class="about-stat"><span class="mono">UBIC</span><b>México</b></div>
    <div class="about-stat"><span class="mono">IDIOMAS</span><b>ES / EN</b></div>
    <div class="about-stat"><span class="mono">FOCO</span><b>IA · Sistemas · UX</b></div>
  </aside>
</div>
```

- [ ] **Step 2: CSS — focal 65% + satélite con costura diagonal**

```css
.about-grid { flex: 1; display: flex; gap: 1px; overflow: hidden; }
.about-focal { flex: 0 0 64%; display: flex; flex-direction: column; justify-content: center; padding: 40px 48px; background: var(--hud-panel); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid var(--border); clip-path: polygon(0 0, 100% 0, calc(100% - 40px) 100%, 0 100%); }
.about-id { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
.about-initials { font-size: 2.6rem; font-weight: 900; color: var(--accent); letter-spacing: 0.04em; }
.about-id-tag { font-size: 0.6rem; letter-spacing: 0.2em; color: var(--text-muted); border-left: 1px solid var(--hud-line); padding-left: 16px; }
.about-bio { display: flex; flex-direction: column; gap: 16px; max-width: 600px; }
.about-bio p { font-size: 1rem; color: var(--text-secondary); line-height: 1.8; }
.about-bio strong { color: var(--text-primary); font-weight: 700; }
.about-bio .text-dim { color: var(--text-muted); }
.about-sat { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 1px; margin-left: -40px; padding-left: 52px; }
.about-stat { background: var(--surface); border: 1px solid var(--border); padding: 18px 20px; display: flex; flex-direction: column; gap: 4px; transition: all 0.3s ease; }
.about-stat:hover { border-color: var(--hud-line); background: var(--surface-hover); }
.about-stat span { font-size: 0.55rem; letter-spacing: 0.18em; color: var(--text-muted); }
.about-stat b { font-size: 0.9rem; color: var(--text-primary); font-weight: 700; }
```

- [ ] **Step 3: Verificar**

Run: abrir `index.html`, ir a Sobre mí.
Expected: panel focal grande a la izquierda con "EZ" + tag de ID y la bio con frases clave en negrita brillante y transiciones atenuadas; a la derecha 4 fichas de datos (ROL/UBIC/IDIOMAS/FOCO) tipo "stats de personaje"; costura diagonal entre focal y satélite.

- [ ] **Step 4: Commit**

```bash
git add index.html css/main.css
git commit -m "feat: seccion SOBRE MI panel focal + satelite con ficha de datos"
```

---

### Task 9: Sección CONTACTO (canales + formulario terminal)

**Files:**
- Modify: `index.html` (`#contacto .section-content`)
- Modify: `css/main.css`
- Modify: `js/main.js` (`renderContact` + form, `getIconSVG`)

- [ ] **Step 1: HTML**

```html
<div class="section-head"><span class="section-num mono">05</span><h2 class="section-name">Contacto</h2></div>
<div class="contact-grid">
  <div class="contact-channels" id="contactChannels"></div>
  <form class="contact-term" id="contactForm">
    <div class="term-line"><span class="mono term-prompt">&gt;</span><input type="text" id="formName" placeholder="NOMBRE" required></div>
    <div class="term-line"><span class="mono term-prompt">&gt;</span><input type="email" id="formEmail" placeholder="CORREO" required></div>
    <div class="term-line term-area"><span class="mono term-prompt">&gt;</span><textarea id="formMessage" rows="5" placeholder="MENSAJE" required></textarea></div>
    <button type="submit" class="term-send"><span class="mono">▸</span> ENVIAR TRANSMISIÓN</button>
  </form>
</div>
```

- [ ] **Step 2: CSS**

```css
.contact-grid { flex: 1; display: flex; gap: 32px; overflow: hidden; align-items: center; }
.contact-channels { flex: 0 0 36%; display: flex; flex-direction: column; gap: 1px; }
.contact-cell { display: flex; align-items: center; gap: 14px; padding: 16px 18px; background: var(--hud-panel); border: 1px solid var(--border); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); cursor: pointer; transition: all 0.3s ease; }
.contact-cell:hover { border-color: var(--hud-line); background: var(--surface-hover); transform: translateX(6px); }
.contact-cell svg { width: 18px; height: 18px; color: var(--accent); flex-shrink: 0; }
.contact-cell-label { font-size: 0.6rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text-muted); }
.contact-cell-value { font-size: 0.78rem; color: var(--text-primary); margin-left: auto; }
.contact-term { flex: 1; max-width: 560px; display: flex; flex-direction: column; gap: 10px; padding: 28px; background: var(--hud-panel); border: 1px solid var(--hud-line); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); clip-path: polygon(24px 0, 100% 0, 100% 100%, 0 100%, 0 24px); }
.term-line { display: flex; align-items: flex-start; gap: 10px; border-bottom: 1px solid var(--border); padding-bottom: 8px; }
.term-prompt { color: var(--accent); padding-top: 10px; }
.term-line input, .term-line textarea { flex: 1; background: none; border: none; color: var(--text-primary); font-size: 0.85rem; padding: 10px 0; outline: none; font-family: var(--mono); letter-spacing: 0.04em; resize: none; }
.term-line input::placeholder, .term-line textarea::placeholder { color: var(--text-muted); letter-spacing: 0.1em; }
.term-send { align-self: flex-start; margin-top: 8px; display: flex; align-items: center; gap: 8px; padding: 12px 24px; background: var(--accent); color: #fff; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; transition: background var(--transition) ease; }
.term-send:hover { background: var(--accent-hover); }
.term-send .mono { font-family: var(--mono); }
```

- [ ] **Step 3: JS — `getIconSVG`, `renderContact`, form (copiar del actual y adaptar markup)**

Copiar `getIconSVG` verbatim del main.js actual. `renderContact` adaptado al nuevo markup (label + value en línea, click abre href):

```js
function renderContact () {
  var box = q('#contactChannels'); if (!box) return
  CONTACT_CELLS.forEach(function (cell) {
    var el = document.createElement('div'); el.className = 'contact-cell'
    el.innerHTML = getIconSVG(cell.icon) + '<span class="contact-cell-label">' + cell.label + '</span><span class="contact-cell-value">' + cell.value + '</span>'
    if (cell.href) el.addEventListener('click', function () { window.open(cell.href, '_blank') })
    box.appendChild(el)
  })
}
q('#contactForm').addEventListener('submit', function (e) {
  e.preventDefault()
  var name = q('#formName').value.trim(), email = q('#formEmail').value.trim(), msg = q('#formMessage').value.trim()
  if (!name || !email || !msg) { alert('Completa todos los campos.'); return }
  window.location.href = 'mailto:eliezerzm0312@gmail.com?subject=' + encodeURIComponent('Contacto desde portfolio - ' + name) + '&body=' + encodeURIComponent('Nombre: ' + name + '\nCorreo: ' + email + '\n\nMensaje:\n' + msg)
  this.reset()
})
```

Añadir `renderContact()` al INIT.

- [ ] **Step 4: Verificar**

Run: abrir `index.html`, ir a Contacto.
Expected: a la izquierda lista de canales (Email/GitHub/LinkedIn/Instagram/Facebook/Ubicación/Idiomas) con icono, label y valor; hover desplaza a la derecha; click abre el enlace. A la derecha formulario estilo terminal con prompts ">" y placeholders monoespaciados; al enviar abre el cliente de correo con los datos. La esquina del formulario está recortada.

- [ ] **Step 5: Commit**

```bash
git add index.html css/main.css js/main.js
git commit -m "feat: seccion CONTACTO canales + formulario terminal mailto"
```

---

### Task 10: Motion — entrada de paneles (ensamblaje escalonado) + escáner

**Files:**
- Modify: `css/main.css` (keyframes + clases de animación)
- Modify: `js/main.js` (disparar animación al activar sección)

- [ ] **Step 1: CSS — keyframes de ensamblaje + línea de escáner**

```css
@keyframes assembleIn { from { opacity: 0; transform: translateY(14px); clip-path: inset(0 100% 0 0); } to { opacity: 1; transform: none; clip-path: inset(0 0 0 0); } }
.section.active .section-content > :not(.section-ghost) { animation: assembleIn 0.5s cubic-bezier(0.23,1,0.32,1) both; }
.section.active .section-content > :nth-child(2) { animation-delay: 0.05s; }
.section.active .section-content > :nth-child(3) { animation-delay: 0.12s; }
.section.active .section-content > :nth-child(4) { animation-delay: 0.18s; }

/* línea de escáner sobre paneles de cristal */
@keyframes scanSweep { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
.scanline { position: absolute; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--accent), transparent); opacity: 0.18; pointer-events: none; z-index: 4; animation: scanSweep 5s linear infinite; }
@media (prefers-reduced-motion: reduce) {
  .section.active .section-content > :not(.section-ghost) { animation: none; }
  .scanline { display: none; }
}
```

Añadir un `<div class="scanline"></div>` dentro de `.projects-gallery` y de `.exp-grid` en el HTML (paneles donde el escáner luce bien).

- [ ] **Step 2: JS — re-trigger de la animación al navegar**

La animación CSS se dispara con `.section.active`. Para re-ejecutarla cada vez que se entra a una sección, forzar reflow al activar:

```js
/* dentro de goToSection, después de next.classList.add('active'): */
var content = q('.section-content', next)
if (content && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  content.querySelectorAll(':scope > :not(.section-ghost)').forEach(function (el) {
    el.style.animation = 'none'; void el.offsetWidth; el.style.animation = ''
  })
}
```

- [ ] **Step 3: Verificar**

Run: abrir `index.html`, navegar entre secciones varias veces.
Expected: al entrar a cada sección los elementos del contenido "se ensamblan" con un barrido (clip-path) escalonado; en Proyectos y Experiencia una línea de escáner azul cruza lentamente. Con reduced-motion activo: aparición instantánea, sin escáner. Sin parpadeos molestos al re-navegar.

- [ ] **Step 4: Commit**

```bash
git add index.html css/main.css js/main.js
git commit -m "feat: motion HUD - ensamblaje escalonado de paneles + linea de escaner"
```

---

### Task 11: Responsive + accesibilidad

**Files:**
- Modify: `css/main.css` (media queries)

- [ ] **Step 1: CSS responsive (1024 / 768 / 480)**

```css
@media (max-width: 1024px) {
  .hud-rail { display: none; }
  .section-content { padding-left: 24px; padding-right: 24px; }
  .hero { flex-direction: column; align-items: flex-start; gap: 24px; }
  .hero-left { flex: none; } .hero-right { flex: none; width: 100%; flex-direction: row; }
  .hero-module { flex: 1; clip-path: none; }
  .about-grid { flex-direction: column; }
  .about-focal { flex: none; clip-path: none; }
  .about-sat { margin-left: 0; padding-left: 0; flex-direction: row; flex-wrap: wrap; }
  .about-stat { flex: 1 1 45%; }
  .contact-grid { flex-direction: column; align-items: stretch; gap: 16px; overflow-y: auto; }
  .contact-channels, .contact-term { flex: none; max-width: none; }
}
@media (max-width: 768px) {
  .hud-tabs { display: none; }   /* nav compacta: el logo lleva a inicio; navegacion por scroll */
  .skills-grid { grid-template-columns: repeat(2, 1fr); }
  .project-card { clip-path: none; }
  .project-card + .project-card { margin-left: 0; }
  .project-card:hover { z-index: 2; }
  .exp-grid { flex-direction: column; overflow-y: auto; }
  .exp-panel { flex: none; min-height: 200px; clip-path: none; }
  .section-ghost { font-size: 30vw; }
}
@media (max-width: 480px) {
  .skills-grid { grid-template-columns: 1fr 1fr; }
  .hero-name { font-size: clamp(2.2rem, 12vw, 3.4rem); }
  .hud-status { gap: 12px; font-size: 0.55rem; }
  .hud-hint, #statCoords { display: none; }
}
```

Nota: en móvil ≤768 las pestañas se ocultan; la navegación queda por scroll/swipe y el logo vuelve a Inicio. (Opcional futuro: menú hamburguesa; fuera de alcance.)

- [ ] **Step 2: Accesibilidad — foco visible y aria**

```css
a:focus-visible, button:focus-visible, input:focus-visible, textarea:focus-visible, .skill-cell:focus-visible, .contact-cell:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
```

Verificar que botones de icono tengan `aria-label` (el toggle de tema ya lo tiene). Añadir `aria-label` al logo si hace toggle.

- [ ] **Step 3: Verificar**

Run: abrir `index.html`, reducir el ancho de la ventana (DevTools responsive ~375px, ~768px, ~1024px).
Expected: el riel y las pestañas se ocultan en breakpoints chicos; hero, about, contacto y experiencia pasan a apilado vertical; skills a 2 columnas; cards de proyectos sin clip-path; nada se desborda horizontalmente. Tab navega con foco visible.

- [ ] **Step 4: Commit**

```bash
git add css/main.css index.html
git commit -m "feat: responsive (1024/768/480) + foco accesible para el rediseño HUD"
```

---

### Task 12: Boot intro opcional (SYSTEM ONLINE)

**Files:**
- Modify: `index.html` (overlay de boot)
- Modify: `css/main.css`
- Modify: `js/main.js`

> Esta tarea es OPCIONAL. Si el usuario no la quiere, omitir y saltar a Task 13.

- [ ] **Step 1: HTML — overlay de arranque**

```html
<div class="boot" id="boot"><span class="boot-text mono">SYSTEM ONLINE<i class="boot-cursor">_</i></span></div>
```
(justo después de `<body>`)

- [ ] **Step 2: CSS**

```css
.boot { position: fixed; inset: 0; z-index: 2000; background: var(--bg-primary); display: flex; align-items: center; justify-content: center; transition: opacity 0.6s ease, visibility 0.6s ease; }
.boot.done { opacity: 0; visibility: hidden; }
.boot-text { font-size: 1rem; letter-spacing: 0.4em; color: var(--accent); text-transform: uppercase; }
@keyframes blink { 50% { opacity: 0; } }
.boot-cursor { animation: blink 0.8s step-end infinite; }
@media (prefers-reduced-motion: reduce) { .boot { transition: none; } }
```

- [ ] **Step 3: JS — ocultar tras ~1s**

```js
var boot = q('#boot')
if (boot) {
  var delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 200 : 1000
  setTimeout(function () { boot.classList.add('done') }, delay)
}
```

- [ ] **Step 4: Verificar**

Run: recargar `index.html`.
Expected: ~1s de pantalla "SYSTEM ONLINE_" con cursor parpadeante, luego fade al sitio. Con reduced-motion desaparece casi inmediato.

- [ ] **Step 5: Commit**

```bash
git add index.html css/main.css js/main.js
git commit -m "feat: boot intro opcional SYSTEM ONLINE"
```

---

### Task 13: Documentar en AGENTCONTEXT + verificación final

**Files:**
- Modify: `AGENTCONTEXT/changelog.md`, `AGENTCONTEXT/session.md`, `AGENTCONTEXT/decisions.md`

- [ ] **Step 1: Registrar en changelog.md**

Añadir una entrada de sesión con los SHAs de los commits del rediseño (obtenerlos con `git log --oneline`), siguiendo el formato del archivo (fecha, commit, mensaje, archivos, detalle, revertir).

- [ ] **Step 2: Nuevo ADR en decisions.md**

```
## [2026-06-11] Rediseño HUD (marco de telemetría + composiciones asimétricas)
### Contexto: el usuario pidió reconstruir el sitio con organización más atractiva y poco convencional.
### Opciones: A) marco persistente, B) command deck asimétrico, C) eje diagonal.
### Decisión: A+B con número fantasma de C como acento. Estética HUD de videojuego AAA.
### Consecuencias: marco fijo fuera de las secciones; cada sección con layout propio; tokens nuevos (--hud-*, --mono).
### Commit: <SHA del primer commit del rediseño>
```

- [ ] **Step 3: Actualizar session.md**

Fecha 2026-06-11, objetivo "rediseño HUD", lista de commits, checklist de cierre.

- [ ] **Step 4: Verificación final completa (recorrido manual)**

Run: abrir `index.html` y recorrer las 6 secciones con scroll, flechas, tabs y riel; abrir/cerrar un proyecto; expandir una skill; enviar el formulario; alternar tema; recargar con un `#hash` directo (ej. `index.html#experiencia`); probar responsive y reduced-motion.
Expected: todo según la sección de Verificación del spec (los 10 puntos). Consola sin errores.

- [ ] **Step 5: Commit**

```bash
git add AGENTCONTEXT/
git commit -m "docs: registrar rediseño HUD en AGENTCONTEXT (changelog, ADR, session)"
```

---

## Notas de ejecución

- **Orden de definición en JS:** definir funciones (`renderProjects`, `openProjectInfo`, `closeProjectInfo`, etc.) antes del bloque INIT. El `closeProjectInfo` real (Task 5) reemplaza el placeholder de Task 2. Asignar listeners a elementos (`#infoClose`, `#contactForm`) solo después de que existan en el DOM (están en el HTML estático, así que es seguro al final del IIFE).
- **Gotcha clip-path + stacking:** el `flex-expand` de proyectos usa `z-index` inline en flex-children; funciona porque `.projects-gallery` crea su propio contexto de apilamiento (backdrop-filter). No envolver las cards en otro `transform`.
- **Gotcha backdrop-filter:** requiere fondo semitransparente (`rgba`). Si un panel se ve negro sólido en vez de difuminado, revisar que su `background` no sea opaco y que el overlay de la sección no esté en `opacity: 1`.
- **Reduced-motion:** todas las animaciones (parpadeo telemetría, ensamblaje, escáner, boot) deben anularse bajo `prefers-reduced-motion: reduce`.
- **Datos:** nunca reescribir a mano los arrays `PROJECTS/SKILLS/CONTACT_CELLS` ni `getIconSVG` — copiarlos verbatim del `js/main.js` actual (en git).
```
