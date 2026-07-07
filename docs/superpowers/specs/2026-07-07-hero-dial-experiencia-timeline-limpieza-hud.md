# Spec: Hero dial circular + Experiencia timeline + limpieza HUD

**Fecha:** 2026-07-07
**Secciones afectadas:** Inicio (hero), Experiencia, chrome global (scanlines + barra inferior)
**Archivos:** `index.html`, `css/main.css`, `js/main.js`

---

## 1. Objetivo

Cuatro cambios de diseño solicitados por el usuario:

1. **Hero:** eliminar la ventana de terminal animada y reemplazar los 2 botones por un **dial circular partido en vertical** con expansión completa en hover.
2. **Experiencia:** rediseñar de 3 columnas altas y vacías a una **timeline horizontal conectada**; eliminar `LOG_00x` y la fecha.
3. **Scanlines:** eliminar la barra de escaneo vertical animada de todas las secciones.
4. **Barra inferior HUD:** eliminar por completo el footer de estado (SYS·ONLINE, coordenadas, progreso, contador, fecha, hint).

No se toca: el `hud-rail` lateral (índice de secciones), el boot screen, el badge "DISPONIBLE PARA PROYECTOS".

---

## 2. Hero — Dial circular partido en vertical

### Comportamiento
- La zona derecha del hero (`.hero-right`, donde estaba `.hero-terminal` + 2 botones) se reemplaza por un **círculo** centrado.
- El círculo está dividido por una línea **vertical** en dos mitades-botón:
  - **Izquierda** → "Ver proyectos" (`data-section="1"`)
  - **Derecha** → "Contactar" (`data-section="5"`)
- **Estado normal:** fondo transparente, borde de acento, línea divisoria vertical al centro. Cada mitad muestra solo su título.
- **Hover** en una mitad → esa mitad **se expande hasta rellenar el círculo completo**, tapando la otra mitad. Se rellena con `--accent`, el texto se invierte (color de fondo), aparece la flecha `▸` y un subtítulo:
  - Izquierda: *"Explora mi trabajo"*
  - Derecha: *"Hablemos de tu idea"*
- Al retirar el cursor, vuelve a las dos mitades.
- Cada mitad conserva `data-section` para que el manejador de navegación existente funcione **sin cambios en JS**.

### Estructura HTML (reemplaza el contenido de `.hero-right`)
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

### CSS (enfoque)
- `.hero-dial`: contenedor cuadrado (`aspect-ratio: 1`), `max-width`/`max-height` para caber en la columna, centrado (`margin: auto`), `border-radius: 50%`, `position: relative`, `overflow: hidden`, borde de acento.
- `.hero-dial-half`: `position: absolute; top: 0; height: 100%; width: 50%`. La izquierda en `left: 0`, la derecha en `right: 0`. Fondo transparente, texto centrado, transición suave de `width`/`background`.
- `.hero-dial-half.left:hover`, `.right:hover`: `width: 100%; z-index: 2; background: var(--accent); color: var(--bg-primary)`. Al ocupar el 100% del círculo redondo, tapa la otra mitad → "rellena el círculo completo".
- `.hd-sub`: oculto por defecto (`opacity: 0`), visible en hover de su mitad. La flecha `▸` se añade vía contenido/pseudo-elemento en hover.
- Divisoria vertical: borde entre mitades o `::after` central (se oculta cuando una mitad está en hover, o queda tapada por la expansión).

### Responsive (≤1024px)
- El hover no aplica en táctil. `.hero-dial` cambia a **dos botones apilados** (o en fila) rectangulares con título + subtítulo **siempre visibles**. Buen área de toque, sin depender de hover.

---

## 3. Experiencia — Timeline horizontal conectada

### Comportamiento
- `.exp-grid` pasa de 3 paneles altos a 3 ítems en fila conectados por una **línea horizontal** de acento.
- Cada ítem tiene un **nodo circular** con número (`01`/`02`/`03`) sobre la línea, y debajo: título, descripción, tags y aprendizajes.
- **Se eliminan** `LOG_00x` (`.exp-log`) y la fecha `2026` (`.exp-date`) — HTML, CSS y cualquier referencia.
- **Hover** en un ítem → su nodo se rellena de acento y se resalta la tarjeta (borde/título).

### Estructura HTML (por ítem, ×3)
```html
<article class="exp-item">
  <span class="exp-node">01</span>
  <h3 class="exp-title">Portfolio Profesional</h3>
  <p class="exp-desc">…</p>
  <div class="exp-tags"><span>HTML</span>…</div>
  <p class="exp-learn">…</p>
</article>
```
(Se elimina el `<div class="scanline">` del grid.)

### CSS (enfoque)
- `.exp-grid`: `display: flex; position: relative`. Línea conectora vía `::before` — barra horizontal de 2px en `--accent` a la altura del centro de los nodos, detrás de ellos (`z-index` menor).
- `.exp-item`: `flex: 1`, columna, con padding; el nodo arriba centrado sobre la línea.
- `.exp-node`: círculo (`border-radius: 50%`), borde de acento, número centrado, fondo `--bg-primary` (para "cortar" la línea). Hover → relleno acento.
- Se conservan estilos de `.exp-title`, `.exp-desc`, `.exp-tags`, `.exp-learn` (ajustados a la nueva disposición).
- Se elimina el `clip-path` trapezoidal de los paneles (ya no aplica).

### Responsive (≤1024px)
- La timeline pasa a **vertical**: la línea conectora se vuelve vertical y los ítems se apilan (nodo a la izquierda, contenido a la derecha), o simplemente ítems apilados con nodos. Scroll vertical si hace falta.

---

## 4. Scanlines — eliminación

- **HTML:** eliminar los 2 `<div class="scanline"></div>` (en `.projects-gallery` y en `.exp-grid`).
- **CSS:** eliminar `@keyframes scanSweep`, la regla `.scanline` y la regla móvil `.scanline { display: none; }`.
- Sin JS asociado.

---

## 5. Barra inferior HUD — eliminación completa

- **HTML:** eliminar el `<footer class="hud-status" id="hudStatus">…</footer>` completo (SYS·ONLINE, `statCoords`, `hud-progress`/`statProgress`, `statSection`, fecha, `hud-hint`).
- **CSS:** eliminar reglas exclusivas de la barra: `.hud-status`, `.hud-stat`, `.hud-progress`, `.hud-hint`. **Conservar `.hud-led`** (lo usa `.hero-status-badge` y el boot).
- **JS:**
  - Eliminar `updateTelemetry()` (actualiza `statProgress`/`statSection`) y sus llamadas (en `goToSection()` y en el bloque INIT).
  - Eliminar `initTelemetryFlicker()` (actualiza `statCoords`) y su llamada en INIT.
  - Eliminar `initHeroTerminal()` (terminal del hero) y su llamada en INIT.
- **No tocar:** `renderRail()` / `hud-rail` (índice lateral), `TOTAL_SECTIONS` (aún se usa en `goToSection`).

---

## 6. Criterios de aceptación

- [ ] El hero no muestra terminal; muestra un círculo partido en vertical con 2 mitades-botón.
- [ ] Hover en una mitad la expande hasta llenar el círculo, tapando la otra, con subtítulo y flecha.
- [ ] Cada mitad navega a su sección (Proyectos / Contacto).
- [ ] En móvil, las opciones son accesibles sin hover.
- [ ] Experiencia se ve como timeline horizontal conectada, sin `LOG_00x` ni fecha.
- [ ] No hay barra de escaneo vertical en ninguna sección.
- [ ] No existe la barra inferior de estado.
- [ ] Sin errores en consola; el `hud-rail` lateral y el toggle de tema siguen funcionando.
- [ ] Dark y light mode se ven correctos en todas las zonas modificadas.

---

## 7. Fuera de alcance

- No se modifican Proyectos (salvo quitar su scanline), Habilidades, Sobre mí, Contacto ni el navbar.
- No se cambian los datos de experiencia (títulos/descripciones se conservan).
- No se toca el `hud-rail` lateral ni el boot screen.
