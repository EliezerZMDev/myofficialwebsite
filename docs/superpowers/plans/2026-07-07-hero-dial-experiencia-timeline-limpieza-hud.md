# Hero Dial + Experiencia Timeline + Limpieza HUD — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar la terminal del hero por un dial circular partido en vertical, convertir Experiencia en una timeline horizontal, y eliminar scanlines + la barra inferior de estado HUD.

**Architecture:** Sitio estático vanilla (HTML/CSS/JS, sin build ni tests). Cambios localizados en `index.html`, `css/main.css`, `js/main.js`. La navegación del dial reutiliza el handler existente de `[data-section]` (`js/main.js:313`), así que no requiere JS nuevo.

**Tech Stack:** HTML5, CSS3 (Flexbox, clip/border-radius, custom properties), JavaScript ES6+ vanilla.

## Global Constraints

- **Sin frameworks ni build tools.** Editar directamente los 3 archivos fuente.
- **Sin `border-radius` en el diseño general** — EXCEPCIÓN intencional: el dial del hero y los nodos de la timeline SÍ usan `border-radius` (son círculos por diseño).
- **Sin gradientes.** Usar colores sólidos y `var(--accent)`.
- **Todo color vía tokens** (`var(--accent)`, `var(--bg-primary)`, etc.) para que dark/light funcionen automáticamente.
- **Conservar `.hud-led`** (lo usan `.hero-status-badge` y el boot) — NO eliminar.
- **No tocar** el `hud-rail` lateral, el boot screen, ni otras secciones fuera de las indicadas.
- **Verificación:** no hay tests automatizados. Cada tarea se verifica abriendo `index.html` en el navegador (doble-click o `Start-Process index.html`) y observando el comportamiento descrito. Revisar la consola del navegador: sin errores.
- **Commits frecuentes:** un commit por tarea, en español, prefijos `feat:`/`refactor:`/`style:`.
- **Tras cada commit:** registrar la entrada en `AGENTCONTEXT/changelog.md` con el SHA (`git rev-parse HEAD`).

---

### Task 1: Eliminar scanlines (barra de escaneo vertical)

**Files:**
- Modify: `index.html` (2 divs `scanline`)
- Modify: `css/main.css` (keyframe + reglas)

**Interfaces:**
- Consumes: nada.
- Produces: nada (eliminación pura).

- [ ] **Step 1: Eliminar los 2 divs scanline del HTML**

En `index.html`, eliminar la línea (dentro de `.projects-gallery`):
```html
            <div class="scanline"></div>
```
Y eliminar la línea (dentro de `.exp-grid`):
```html
            <div class="scanline"></div>
```

- [ ] **Step 2: Eliminar el CSS de scanline**

En `css/main.css`, eliminar estas dos reglas (están juntas, ~líneas 450-451):
```css
@keyframes scanSweep { 0% { transform: translateY(-100%); } 100% { transform: translateY(120vh); } }
.scanline { position: absolute; left: 0; right: 0; top: 0; height: 2px; background: var(--accent); opacity: 0.18; pointer-events: none; z-index: 4; animation: scanSweep 5s linear infinite; }
```
Y en el bloque responsive (~línea 513), eliminar:
```css
  .scanline { display: none; }
```

- [ ] **Step 3: Verificar en el navegador**

Abrir `index.html`. Navegar a Proyectos y a Experiencia. Expected: NO aparece ninguna barra horizontal que se desplaza verticalmente (escaneo). Consola sin errores.

- [ ] **Step 4: Commit y changelog**

```bash
git add index.html css/main.css
git commit -m "style: eliminar scanlines (barra de escaneo vertical) de todas las secciones"
git rev-parse HEAD
```
Registrar la entrada en `AGENTCONTEXT/changelog.md` con el SHA obtenido, luego:
```bash
git add AGENTCONTEXT/changelog.md
git commit -m "docs: changelog eliminar scanlines"
```

---

### Task 2: Eliminar la barra inferior de estado HUD

**Files:**
- Modify: `index.html` (footer `.hud-status`)
- Modify: `css/main.css` (reglas de la barra)
- Modify: `js/main.js` (funciones de telemetría + llamadas)

**Interfaces:**
- Consumes: nada.
- Produces: nada (eliminación pura). `TOTAL_SECTIONS` permanece (se usa en `goToSection`).

- [ ] **Step 1: Eliminar el footer del HTML**

En `index.html`, eliminar el bloque completo (~líneas 46-53):
```html
    <footer class="hud-status" id="hudStatus">
      <span class="hud-stat"><i class="hud-led"></i> SYS·ONLINE</span>
      <span class="hud-stat mono" id="statCoords">LAT 19.40° · LON -99.10°</span>
      <span class="hud-progress"><i id="statProgress"></i></span>
      <span class="hud-stat mono" id="statSection">00 / 06</span>
      <span class="hud-stat mono">2026.06</span>
      <span class="hud-stat hud-hint">⏎ SCROLL / ↑↓</span>
    </footer>
```

- [ ] **Step 2: Eliminar las llamadas JS a telemetría**

En `js/main.js`, dentro de `goToSection()`, eliminar la línea (~258):
```js
    updateTelemetry(index)
```
En el bloque INIT (~líneas 708-710), eliminar estas tres líneas:
```js
  initHeroTerminal()
  updateTelemetry(0)
  initTelemetryFlicker()
```
> Nota: `initHeroTerminal()` se elimina aquí porque su llamada queda huérfana; la función se elimina en la Task 3. Está bien eliminar la llamada ahora.

- [ ] **Step 3: Eliminar las funciones de telemetría**

En `js/main.js`, eliminar la función completa `updateTelemetry` (~líneas 337-342):
```js
  function updateTelemetry (index) {
    var prog = q('#statProgress')
    var sec = q('#statSection')
    if (prog) prog.style.width = (((index + 1) / TOTAL_SECTIONS) * 100).toFixed(0) + '%'
    if (sec) sec.textContent = String(index).padStart(2, '0') + ' / 0' + TOTAL_SECTIONS
  }
```
Y eliminar la función completa `initTelemetryFlicker` (~líneas 344-353):
```js
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

- [ ] **Step 4: Eliminar el CSS de la barra**

En `css/main.css`, eliminar las reglas exclusivas de la barra: `.hud-status`, `.hud-stat`, `.hud-progress` (y su `i` interno si existe), `.hud-hint`. Buscar cada selector y eliminar su regla completa.
> **NO eliminar `.hud-led`** — lo usan `.hero-status-badge` y el boot. Dejarlo intacto.
> Si `.hud-stat` está en un selector combinado con `.hud-led` (p. ej. `.hud-stat .hud-led`), conservar solo lo relativo a `.hud-led`.

- [ ] **Step 5: Verificar en el navegador**

Abrir `index.html`. Expected: no hay barra inferior de estado. El índice lateral (`hud-rail`) sigue visible y funcional. Navegar entre secciones con scroll/flechas funciona. El badge "DISPONIBLE PARA PROYECTOS" (con su LED) sigue visible. Consola sin errores (ninguna referencia rota a `statProgress`/`statCoords`/`statSection`).

- [ ] **Step 6: Commit y changelog**

```bash
git add index.html css/main.css js/main.js
git commit -m "refactor: eliminar barra inferior de estado HUD y su telemetria JS"
git rev-parse HEAD
```
Registrar en `AGENTCONTEXT/changelog.md` con el SHA, luego commit del changelog.

---

### Task 3: Hero — eliminar terminal y construir dial circular

**Files:**
- Modify: `index.html` (contenido de `.hero-right`)
- Modify: `css/main.css` (reemplazar `.hero-module` + bloque terminal; añadir `.hero-dial`; ajustar responsive)
- Modify: `js/main.js` (eliminar función `initHeroTerminal`)

**Interfaces:**
- Consumes: handler existente `document.querySelectorAll('[data-section]')` en `js/main.js:313` — las mitades del dial llevan `data-section` y navegan automáticamente.
- Produces: nada que otras tareas consuman.

- [ ] **Step 1: Reemplazar el contenido de `.hero-right` en el HTML**

En `index.html`, reemplazar este bloque:
```html
          <div class="hero-right">
            <div class="hero-terminal" id="heroTerminal"></div>
            <button class="hero-module" data-section="1"><span class="mono">▸</span> Ver proyectos</button>
            <button class="hero-module" data-section="5"><span class="mono">▸</span> Contactar</button>
          </div>
```
por:
```html
          <div class="hero-right">
            <div class="hero-dial">
              <button class="hero-dial-half left" data-section="1">
                <span class="hd-label">Ver proyectos</span>
                <span class="hd-sub">Explora mi trabajo</span>
              </button>
              <button class="hero-dial-half right" data-section="5">
                <span class="hd-label">Contactar</span>
                <span class="hd-sub">Hablemos de tu idea</span>
              </button>
            </div>
          </div>
```

- [ ] **Step 2: Eliminar la función `initHeroTerminal` del JS**

En `js/main.js`, eliminar la función completa `initHeroTerminal` (desde `function initHeroTerminal () {` en ~línea 583 hasta su llave de cierre `}` en ~línea 647, inclusive). El bloque termina justo antes del comentario `/* ... CONTACT FORM ... */`.
> La llamada `initHeroTerminal()` ya se eliminó en la Task 2. Verificar que no queden referencias: `grep -n "initHeroTerminal\|heroTerminal" js/main.js` no debe devolver nada.

- [ ] **Step 3: Eliminar el CSS del hero-terminal y de hero-module**

En `css/main.css`, eliminar todo el bloque de la terminal (~líneas 242-255):
```css
/* Hero terminal */
.hero-terminal { flex: 1; min-height: 160px; background: var(--bg-secondary); border: 1px solid var(--hud-line); display: flex; flex-direction: column; overflow: hidden; }
.hero-terminal-bar { display: flex; align-items: center; gap: 6px; padding: 9px 14px; border-bottom: 1px solid var(--hud-line); flex-shrink: 0; }
.ht-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.ht-dot.r { background: #ff5f57; }
.ht-dot.y { background: #ffbd2e; }
.ht-dot.g { background: #28c840; }
.ht-title { font-family: var(--mono); font-size: 0.58rem; color: var(--text-muted); letter-spacing: 0.08em; margin-left: 6px; }
.hero-terminal-body { flex: 1; min-height: 0; padding: 14px 16px; display: flex; flex-direction: column; justify-content: flex-end; gap: 2px; overflow: hidden; }
.ht-line { display: flex; align-items: baseline; gap: 8px; font-family: var(--mono); font-size: 0.72rem; line-height: 1.6; white-space: nowrap; overflow: hidden; }
.ht-prompt { color: var(--accent); flex-shrink: 0; }
.ht-text { color: var(--text-primary); }
.ht-output { color: var(--text-muted); padding-left: 16px; font-size: 0.68rem; }
.ht-cursor { display: inline-block; width: 7px; height: 0.85em; background: var(--accent); vertical-align: text-bottom; margin-left: 1px; animation: blink 0.8s step-end infinite; }
```
Y eliminar las 3 reglas de `.hero-module` (~líneas 237-240):
```css
.hero-module { ... }
.hero-module .mono { ... }
.hero-module:hover { ... }
.hero-module:hover .mono { ... }
```

- [ ] **Step 4: Ajustar `.hero-right` y añadir el CSS del dial**

En `css/main.css`, reemplazar la regla `.hero-right` (~línea 236):
```css
.hero-right { flex: 1; display: flex; flex-direction: column; gap: 12px; }
```
por el nuevo bloque del dial:
```css
.hero-right { flex: 1; display: flex; align-items: center; justify-content: center; }

/* Hero dial — círculo partido en vertical */
.hero-dial {
  position: relative;
  width: 100%;
  max-width: 360px;
  aspect-ratio: 1;
  margin: auto;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--accent);
  box-shadow: 0 8px 32px rgba(0,0,0,0.4);
}
.hero-dial-half {
  position: absolute;
  top: 0;
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 0 22px;
  background: var(--hud-panel);
  color: var(--text-primary);
  font-size: clamp(0.95rem, 1.7vw, 1.3rem);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  text-align: center;
  cursor: pointer;
  border: none;
  overflow: hidden;
  transition: width var(--transition) ease, background var(--transition) ease, color var(--transition) ease;
}
.hero-dial-half.left { left: 0; border-right: 1px solid var(--hud-line); }
.hero-dial-half.right { right: 0; }
.hero-dial-half:hover {
  width: 100%;
  z-index: 2;
  background: var(--accent);
  color: var(--bg-primary);
  border-right: none;
}
.hd-label { line-height: 1.1; }
.hero-dial-half:hover .hd-label::after { content: ' \25B8'; }
.hd-sub {
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: none;
  opacity: 0;
  max-height: 0;
  transition: opacity var(--transition) ease;
}
.hero-dial-half:hover .hd-sub { opacity: 1; max-height: 2em; }
```

- [ ] **Step 5: Ajustar el responsive del hero**

En `css/main.css`, en el bloque `@media (max-width: 1024px)`, reemplazar estas tres líneas (~472-474):
```css
  .hero-terminal { display: none; }
  .hero-right { flex: none; width: 100%; flex-direction: row; }
  .hero-module { flex: 1; flex-basis: auto; clip-path: none; min-height: 96px; }
```
por el fallback del dial (dos botones apilados, subtítulos siempre visibles, sin depender de hover):
```css
  .hero-right { flex: none; width: 100%; }
  .hero-dial {
    max-width: none;
    aspect-ratio: auto;
    border-radius: 0;
    border: none;
    box-shadow: none;
    overflow: visible;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .hero-dial-half {
    position: static;
    width: 100%;
    height: auto;
    min-height: 88px;
    flex-direction: row;
    justify-content: space-between;
    gap: 4px;
    padding: 18px 24px;
    border: 1px solid var(--hud-line);
    text-align: left;
  }
  .hero-dial-half.left { border-right: 1px solid var(--hud-line); }
  .hero-dial-half:hover { width: 100%; }
  .hd-sub { opacity: 1; max-height: none; font-size: 0.6rem; }
```

- [ ] **Step 6: Verificar en el navegador (desktop)**

Abrir `index.html` en pantalla ancha. Expected en Inicio:
- La zona derecha muestra un **círculo** partido por una línea vertical: izquierda "Ver proyectos", derecha "Contactar".
- **Hover** en la mitad izquierda → se expande hasta llenar todo el círculo (tapa la derecha), se rellena de color de acento, aparece la flecha `▸` y el subtítulo "Explora mi trabajo".
- **Hover** en la mitad derecha → mismo efecto con "Hablemos de tu idea".
- Click en "Ver proyectos" navega a Proyectos; click en "Contactar" navega a Contacto.
- Alternar tema (dark/light): los colores del dial cambian con el acento.
- Consola sin errores.

- [ ] **Step 7: Verificar en el navegador (móvil)**

Reducir el ancho de la ventana a <1024px (o DevTools responsive). Expected: el dial se convierte en dos botones apilados rectangulares con título + subtítulo visibles; ambos navegan correctamente.

- [ ] **Step 8: Commit y changelog**

```bash
git add index.html css/main.css js/main.js
git commit -m "feat: hero dial circular partido en vertical (reemplaza terminal animada)"
git rev-parse HEAD
```
Registrar en `AGENTCONTEXT/changelog.md` con el SHA, luego commit del changelog.

---

### Task 4: Experiencia — timeline horizontal conectada

**Files:**
- Modify: `index.html` (3 `article.exp-panel` → `article.exp-item`, sin log/date)
- Modify: `css/main.css` (reemplazar reglas `.exp-*`; ajustar responsive)

**Interfaces:**
- Consumes: nada.
- Produces: nada.

- [ ] **Step 1: Reescribir el HTML de los 3 paneles**

En `index.html`, reemplazar el contenido de `.exp-grid` (los 3 `<article class="exp-panel">`, ya sin el `<div class="scanline">` eliminado en Task 1) por:
```html
            <article class="exp-item">
              <span class="exp-node">01</span>
              <h3 class="exp-title">Portfolio Profesional</h3>
              <p class="exp-desc">Diseño y desarrollo de portafolio personal con identidad visual ELIEZERDEV, inspirándose en interfaces de videojuegos AAA y sistemas operativos futuristas.</p>
              <div class="exp-tags"><span>HTML</span><span>CSS</span><span>JavaScript</span></div>
              <p class="exp-learn">Arquitectura visual cinematográfica, transiciones de estado, diseño de interacción.</p>
            </article>
            <article class="exp-item">
              <span class="exp-node">02</span>
              <h3 class="exp-title">Sistema AGENTCONTEXT</h3>
              <p class="exp-desc">Creación de sistema de contexto persistente para agentes IA, permitiendo desarrollo asistido con memoria de proyecto entre sesiones.</p>
              <div class="exp-tags"><span>Markdown</span><span>Git</span><span>Prompt Engineering</span></div>
              <p class="exp-learn">Ingeniería de contexto, documentación automatizada, flujo de trabajo IA-humano.</p>
            </article>
            <article class="exp-item">
              <span class="exp-node">03</span>
              <h3 class="exp-title">Primer Cliente Recurrente</h3>
              <p class="exp-desc">Establecimiento de relación profesional con cliente para mantenimiento y desarrollo web continuo, sentando bases de trabajo freelance.</p>
              <div class="exp-tags"><span>PHP</span><span>MySQL</span><span>Hosting</span></div>
              <p class="exp-learn">Gestión de proyectos freelance, comunicación con cliente, entregas iterativas.</p>
            </article>
```
> Se eliminan los `<span class="exp-log">` y `<span class="exp-date">`. Los títulos, descripciones, tags y aprendizajes se conservan textualmente.

- [ ] **Step 2: Reemplazar el CSS de Experiencia**

En `css/main.css`, reemplazar el bloque de reglas de la sección ④ EXPERIENCIA (`.exp-grid`, `.exp-panel`, `.exp-panel:hover`, `[data-theme="light"] .exp-panel:hover`, `.exp-log`, `.exp-date`, `.exp-title`, `.exp-desc`, `.exp-tags`, `.exp-tags span`, `.exp-learn`) por:
```css
.exp-grid { display: flex; width: 100%; height: 100%; gap: 24px; position: relative; padding: 60px 12px 12px; }
.exp-grid::before {
  content: '';
  position: absolute;
  top: 84px;
  left: 10%;
  right: 10%;
  height: 2px;
  background: var(--accent);
  opacity: 0.5;
  z-index: 0;
}
.exp-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  padding: 0 18px;
  overflow-y: auto;
}
.exp-node {
  align-self: center;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 2px solid var(--accent);
  background: var(--bg-primary);
  color: var(--accent);
  font-family: var(--mono);
  font-size: 0.9rem;
  font-weight: 700;
  margin-bottom: 28px;
  transition: all 0.3s ease;
}
.exp-item:hover .exp-node { background: var(--accent); color: var(--bg-primary); box-shadow: 0 0 16px var(--accent); }
.exp-title { font-size: 1.1rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.02em; margin: 0 0 12px; text-align: center; }
.exp-desc { font-size: 0.82rem; color: var(--text-secondary); line-height: 1.7; }
.exp-tags { display: flex; flex-wrap: wrap; gap: 4px; margin: 16px 0; }
.exp-tags span { padding: 3px 9px; font-size: 0.58rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; border: 1px solid var(--border-accent); color: var(--accent); }
.exp-learn { margin-top: auto; font-size: 0.75rem; color: var(--text-muted); font-style: italic; border-top: 1px solid var(--border); padding-top: 14px; }
```

- [ ] **Step 3: Ajustar el responsive de Experiencia**

En `css/main.css`, en el bloque `@media (max-width: 1024px)`, reemplazar estas dos líneas (~491-492):
```css
  .exp-grid { flex-direction: column; overflow-y: auto; }
  .exp-panel { flex: none; min-height: 200px; clip-path: none; }
```
por:
```css
  .exp-grid { flex-direction: column; overflow-y: auto; gap: 20px; padding: 20px 10px; }
  .exp-grid::before { display: none; }
  .exp-item { flex: none; padding: 0; overflow-y: visible; }
  .exp-node { align-self: flex-start; margin-bottom: 16px; }
  .exp-title { text-align: left; }
```

- [ ] **Step 4: Verificar en el navegador (desktop)**

Abrir `index.html`, ir a Experiencia. Expected:
- 3 columnas conectadas por una **línea horizontal** de acento que pasa por 3 nodos circulares numerados (01/02/03).
- Bajo cada nodo: título, descripción, tags y aprendizajes. **No** aparece `LOG_00x` ni la fecha `2026`.
- **Hover** en un ítem → su nodo se rellena de acento con glow.
- Dark/light: colores correctos.
- Consola sin errores.

- [ ] **Step 5: Verificar en el navegador (móvil)**

Ancho <1024px. Expected: los ítems se apilan verticalmente, sin la línea horizontal, con el nodo arriba-izquierda de cada uno.

- [ ] **Step 6: Commit y changelog**

```bash
git add index.html css/main.css
git commit -m "feat: experiencia como timeline horizontal conectada (sin log ni fecha)"
git rev-parse HEAD
```
Registrar en `AGENTCONTEXT/changelog.md` con el SHA, luego commit del changelog.

---

## Cierre (tras las 4 tareas)

- [ ] Verificación final: recorrer las 6 secciones en dark y light, ancho desktop y móvil. Sin scanlines, sin barra inferior, hero con dial funcional, experiencia como timeline. Consola limpia.
- [ ] Actualizar `AGENTCONTEXT/session.md` (cerrar sesión) y `AGENTCONTEXT/decisions.md` si aplica (ADR del dial y de la timeline).
- [ ] Preguntar al usuario si desea `git push` (deploy en GitHub Pages).

## Self-Review (verificación del plan contra el spec)

- **Cobertura del spec:** ① Hero dial → Task 3 ✓. ② Experiencia timeline → Task 4 ✓. ③ Scanlines → Task 1 ✓. ④ Barra inferior → Task 2 ✓. Criterios de aceptación cubiertos por los pasos de verificación de cada tarea.
- **Placeholders:** ninguno; todo el CSS/HTML se da completo y las eliminaciones JS tienen anclajes exactos.
- **Consistencia de nombres:** clases `.hero-dial`, `.hero-dial-half`, `.hd-label`, `.hd-sub`, `.exp-item`, `.exp-node` usadas de forma idéntica en HTML y CSS. `data-section="1"`/`"5"` coinciden con el handler existente.
