<!-- ============================================================
  INSTRUCCIONES PARA EL AGENTE IA
  ============================================================
  Propósito: Historial de cambios del proyecto con SHAs de commits.
  Leer: Sexto. También consultar cuando el usuario pida revertir cambios.
  Actualizar: INMEDIATAMENTE DESPUÉS DE CADA COMMIT.
  Formato:
    ## [YYYY-MM-DD] — Sesión #[número]
    ### Commit: `sha`
    ### Mensaje: tipo: descripción
    ### Archivos: lista de archivos
    ### Detalle: qué se hizo y por qué
    ### Revertir: git revert <sha>
  Relación: Cada entrada corresponde a un commit. workflow.md describe el ciclo.
  ============================================================ -->

# changelog.md — Historial de Cambios

> **⚠️ CADA ENTRADA DEBE INCLUIR EL SHA DEL COMMIT.** Los SHAs permiten a futuros agentes IA revertir cambios exactos cuando el usuario lo solicite.

---

## [2026-06-01] — Sesión #1 (inicial)

### Commit: `28a0858`
### Mensaje: feat: portfolio inicial con tema dark, transiciones tipo presentación y proyectos estilo Regions
### Archivos: `index.html`, `css/main.css`, `js/main.js`
### Detalle:
- Creación del portfolio con estructura HTML semántica
- Tema dark con acentos dorados (`--accent: #c8a84e`)
- Transiciones tipo presentación (slide-show) entre secciones
- Secciones: Inicio, Sobre mí, Habilidades, Proyectos, Contacto
- Array de proyectos con datos de ejemplo
- Sin frameworks ni build tools — vanilla HTML/CSS/JS
### Revertir: `git revert 28a0858`

---

## [2026-06-01] — Sesión #2

### Commit: `be70779`
### Mensaje: feat: proyectos estilo Regions con 3 imágenes verticales, navegación por flechas y transiciones tipo presentación
### Archivos: `index.html`, `css/main.css`, `js/main.js`
### Detalle:
- Layout de proyectos estilo Regions (3 imágenes verticales por proyecto)
- Navegación por flechas izquierda/derecha entre proyectos
- Transiciones suaves al cambiar de proyecto
- Mejora visual de la sección de proyectos
### Revertir: `git revert be70779`

---

## [2026-06-01] — Sesión #3

### Commit: `89ca84a`
### Mensaje: feat: documentar AGENTCONTEXT/ con instrucciones IA, SHAs obligatorios y estructura de contexto
### Archivos:
- `AGENTCONTEXT/_index.md` (nuevo)
- `AGENTCONTEXT/project.md`
- `AGENTCONTEXT/architecture.md`
- `AGENTCONTEXT/guidelines.md`
- `AGENTCONTEXT/workflow.md`
- `AGENTCONTEXT/changelog.md`
- `AGENTCONTEXT/decisions.md`
- `AGENTCONTEXT/knowledge.md`
- `AGENTCONTEXT/session.md`
### Detalle:
- Creado `_index.md` como archivo de entrada obligatorio con orden de lectura
- Cada archivo ahora tiene un bloque de **instrucciones para el agente IA** al inicio (propósito, cuándo leer, cuándo actualizar, formato, relación)
- `project.md`: corregido stack (vanilla HTML/CSS/JS, no React), agregado commit de referencia
- `architecture.md`: poblado con árbol real, stack detallado, tabla de decisiones técnicas con commits, patrones y flujo de datos
- `guidelines.md`: sección de onboarding para agente sin contexto previo, reglas de commits obligatorios y revert workflow
- `workflow.md`: ciclo de 4 fases con pasos concretos (inicio, ejecución, revert, cierre)
- `changelog.md`: formato nuevo con SHA obligatorio por entrada + commits históricos registrados
- `decisions.md`: 3 ADRs poblados (dark theme, vanilla JS, Regions layout) con sus commits de referencia
- `knowledge.md`: secciones con ejemplos de qué registrar
- `session.md`: tracking de commits con SHA, checklist de cierre
- Los SHAs en changelog permiten a futuros agentes revertir cambios exactos
### Revertir: `git revert 89ca84a`

---

## [2026-06-01] — Sesión #4

### Commit: `2af1c1b`
### Mensaje: feat: portafolio ELIEZERDEV completo con diseño spec, hash-nav, tema dark/light y proyectos interactivos
### Archivos:
- `index.html` (reescrito)
- `css/main.css` (reescrito)
- `js/main.js` (reescrito)
- `AGENTCONTEXT/session.md`
- `ELIEZERDEV_Portafolio_DesignSpec.txt` (nuevo — spec del usuario)
### Detalle:
- Portfolio construido desde cero basado en  `ELIEZERDEV_Portafolio_DesignSpec.txt`
- **Hash-based navigation:** `pushState` al clickear nav, `popstate` para back/forward, el hash en URL cambia sin recargar página
- **Navbar glassmorphism:** sticky, blur, semitransparente, active link con indicador
- **Tema dark/light:** paleta completa (negro azulado/gris grafito/azul eléctrico/violeta — blanco grisáceo/azul profundo), toggle con iconos minimalistas, persiste en localStorage
- **Hero:** 100vh, left=texto+botones, right=visual dinámico (gradiente+grid+glow)
- **Proyectos:** 3 tarjetas verticales estilo Wuthering Waves gallery — hover expande una (flex 2.5), contrae las demás (flex 0.6), click abre detail overlay con animación panelIn
- **Habilidades:** grid de categorías con glassmorphism cards, hover elevate
- **Experiencia:** timeline vertical con dots y hover effect
- **Sobre mí:** split layout (foto placeholder + texto + topic tags)
- **Contacto:** email + formulario con mailto:
- **Footer:** brand + redes sociales (GitHub, LinkedIn, Instagram, Facebook)
- **Sin scrollbar visible** — scrollbar-width: none
- **Sin emojis** — iconos SVG minimalistas
- **Responsive:** mobile menu, layout adjustments para tablets y móviles
- **IntersectionObserver** para actualizar nav active y hash en scroll
- **Datos de proyectos** en array JS modificable (PROJECTS)
### Revertir: `git revert 2af1c1b`

---

## [2026-06-01] — Sesión #5

### Commit: `2ec7d08`
### Mensaje: feat: rediseño completo ELIEZERDEV — estética Wuthering Waves, video backgrounds, galería proyectos interactiva, transiciones fade
### Archivos:
- `index.html` (reescrito)
- `css/main.css` (reescrito)
- `js/main.js` (reescrito)
- `AGENTCONTEXT/session.md`
- `src/videos/fondoweb1.mp4` a `fondoweb5.mp4` + `fondo6.mp4` (nuevos — backgrounds)
### Detalle:
- **Rediseño completo** del portafolio con estética de videojuego AAA / sistema operativo futurista
- **6 pantallas completas** (100vw x 100vh), cada una con video background, overlay, y layout específico
- **Sin scroll tradicional** — scroll wheel capturado con transiciones fade out/in de 300ms
- **Navbar glassmorphism** (80px, blur 20px), logo izq, nav centro, theme toggle der
- **Hero:** split 40/60. Izquierda: ELIEZERDEV enorme con gradiente, roles, descripción, botones. Derecha: composición técnica con grid interactivo + partículas reactivas al mouse
- **Proyectos:** 5 columnas verticales (220x520px). Hover: scale(1.05) + dim resto (brightness 0.3). Click: panel detalle con info body 65% + selector thumbnails 35%
- **Habilidades:** 7 categorías en grid glassmorphism. Sin barras, sin círculos, sin porcentajes
- **Experiencia:** timeline vertical con nodos, tags tecnológicos y aprendizajes
- **Sobre mí:** split con frame visual + texto de historia personal
- **Contacto:** grid 1/1 con formulario elegante + email/socials
- **Theme toggle dark/light** con paleta completa (negro profundo → gris claro, azul eléctrico → azul profundo)
- **Hash navigation** con `pushState`/`popstate` sincronizado
- **Keyboard nav** (flechas arriba/abajo/izq/der)
- **Videos:** se gestionan con play/pausa según sección activa (solo uno reproduce a la vez)
- **Paleta:** `#03050a` (negro profundo), `#2979ff` (azul eléctrico), `#f0f2f5` (blanco), `#8892a4` (gris suave)
- Sin márgenes laterales, sin centrado genérico, sin tarjetas típicas
### Revertir: `git revert 2ec7d08`

---

## [2026-06-01] — Sesión #7

### Commits relacionados:
- `670d08b` — feat: connected-tiles rediseño completo

### Archivos:
- `css/main.css` (reescrito)
- `index.html` (reescrito)
- `js/main.js` (reescrito)
- `AGENTCONTEXT/session.md`
- `AGENTCONTEXT/changelog.md`

### Detalle:
- **Revertidas sesión #6** (industrial HUD) para volver a base Wuthering Waves
- **Hero:** split diagonal con clip-path polygon (izquierda 100%/88%, derecha 12%/0%). Hover → flex-expand del lado hovereado
- **Proyectos:** 5 cards en flex row ocupando 100% del ancho, glassmorphism + backdrop-filter, gradiente de fondo con opacidad 0.12. Sin border-radius. Hover → dim resto (brightness 0.3). Click → info panel con X visible (fondo accent)
- **Habilidades:** panal hexagonal con clip-path polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%). Grid 4 columnas, 7 hexágonos en patrón honeycomb (filas 2-3-2). Click → expande items
- **Experiencia:** circuito PCB con línea punteada intermitente (repeating-linear-gradient), nodos cuadrados rotados 45°, body con clip-path angulado. Click → expande aprendizajes
- **Sobre mí:** split zigzag con clip-path (foto 100%/92%, bio 8%/0%). Glassmorphism en lado foto. Hover → flex-expand
- **Contacto:** grid matricial 4 columnas con celdas tipo teclado. Click → expande valor + abre link. Formulario directo debajo
- **Info close button:** fondo solid accent (#2979ff) + texto blanco para visibilidad inmediata
- **Sin border-radius en ninguna parte**
### Revertir: `git revert 670d08b`

---

## [2026-06-01] — Sesión #7 (fix)

### Commits relacionados:
- `87d3be5`
### Mensaje: feat: hero 3-zone layout, project diagonal overlay, remove thumbs
### Archivos:
- `css/main.css`
- `index.html`
- `js/main.js`
- `AGENTCONTEXT/knowledge.md`
- `AGENTCONTEXT/changelog.md`

### Detalle:
- **Hero:** removidos tech-grid y partículas. Reestructurado a 3 zonas: left (65%, título+desc), right (35%, 2 botones gigantes apilados "Ver proyectos" / "Contactar"). Diagonal decorativa via `::before` en `hero-container` (no clip-path en hijos, evita clipping de texto)
- **Proyectos:** diagonales decorativas entre cards via `::after` pseudo-elemento con `linear-gradient(135deg)`, opacity 0.3-0.9 on hover. Removido info-thumbnails panel derecho (info-body ahora 100% width)
- **JS:** removidas funciones `createParticles()`, `initMouseReaction()`, hero hover flex, info-thumbnails rendering. Queries huérfanos eliminados
- **CSS:** orphans removidos (`hero-side-inner`, `hero-right-inner`, `tech-grid`, `tech-particle`)
- Mantenido about hover flex, circuit PCB, hexagonal honeycomb, contact matrix
### Revertir: `git revert 87d3be5`

---

## [2026-06-01] — Sesión #7 (fix 2)

### Commits relacionados:
- `1f95c22`

### Mensaje: fix: hero clip-path diagonal, trapezoidal buttons, project flex-expand
### Archivos:
- `css/main.css`
- `AGENTCONTEXT/session.md`

### Detalle:
- **Hero:** restaurado clip-path diagonal. Left 65% con padding generoso (48px 64px). Right side con `clip-path: polygon(40% 0%, 100% 0%, 100% 100%, 0% 100%)` que crea zona trapezoidal para botones (más angostos arriba, más anchos abajo). Sin `::before` decorativo ni hover flex en sides. Hover button: `rgba(240,242,245,0.06)` (blanco apagado, no azul)
- **Projects:** añadido flex-expand real: `.hovered { flex: 2.2 }`, `.dimmed { flex: 0.6 }`

### Revertir: `git revert 1f95c22`

---

## [2026-06-16] — Sesión Skill Tree Redesign

### Commits relacionados:
- `0fb21bd` — feat: add skilltree-legend element to skills wrapper
- `4bfa8b9` — feat: actualizar CSS skills — paths bezier, nodos con SVG, panel detalle, limpiar skill-tip
- `80629cb` — feat: actualizar SKILL_TREE — posiciones árbol bottom-up + íconos SVG inline
- `c4e2463` — feat: reescribir renderSkillTree — bezier paths, tronco, íconos SVG, etiquetas, leyenda

### Archivos:
- `index.html`
- `css/main.css`
- `js/main.js`

### Detalle:
- **Árbol de habilidades** rediseñado como árbol-dibujo tech-luminoso (crece de abajo hacia arriba)
- **Tronco SVG** desde la base del contenedor hasta el nodo raíz (DESARROLLO en y=76%)
- **Ramas Bezier cúbicas** reemplazan las `<line>` rectas — curvas S orgánicas entre nodos
- **Filtro glow SVG** (`feGaussianBlur` + `feMerge`) en tronco y ramas activas
- **Ramas bloqueadas** en gris punteado (`stroke-dasharray: 4 3`, opacity 0.4)
- **Íconos SVG inline** en cada hexágono: Lucide (stroke) para conceptos, Simple Icons (fill) para marcas
  - core: Terminal, frontend: HTML5, backend: Server, arquitectura: Layers, uxui: Figma
  - ia: CPU, automatizacion: Zap, gestion: GitHub
  - locked: React Atom, Smartphone, Monitor, Cloud, Gamepad
- **Etiquetas** bajo cada hexágono (`.skill-node-label`)
- **Panel de detalle** estilizado con `.sd-head`, `.sd-name`, `.sd-status`, `.sd-items`
- **Leyenda** renderizada por JS en `#skillLegend`
- **Limpieza:** eliminado bloque `.skill-tip` completo (CSS huérfano)
- **Responsive** actualizado para nuevos tamaños de nodo

### Revertir: `git revert c4e2463 80629cb 4bfa8b9 0fb21bd`

---

## [2026-06-16] — Sesión No-Videos Color Redesign

### Commits relacionados:
- `4f17232` — docs: spec rediseno sin videos, sin gradientes, colores dark/light
- `940f7a1` — style: nuevos tokens dark #13151c+blue / light #f2f0ec+red
- `4f379c2` — style: eliminar section-video, overlays, gradientes y glassmorphism de video
- `3eb653c` — style: linea decorativa horizontal de acento en section-content
- `78af328` — chore: eliminar elementos video y section-overlay de las 6 secciones
- `dd68a1f` — refactor: eliminar gestion de video en JS, colores solidos en proyectos

### Archivos:
- `css/main.css`
- `index.html`
- `js/main.js`
- `docs/superpowers/specs/2026-06-16-no-videos-color-redesign.md`
- `docs/superpowers/plans/2026-06-16-no-videos-color-redesign.md`

### Detalle:
- **Tokens dark mode:** `--bg-primary: #13151c`, `--bg-secondary: #1a1d27`, `--accent: #2979ff`, `--hud-panel: rgba(255,255,255,0.05)`
- **Tokens light mode:** `--bg-primary: #f2f0ec`, `--bg-secondary: #e8e4dc`, `--accent: #c0392b`, `--hud-line: rgba(192,57,43,0.35)` — rojo en modo claro
- **Eliminados:** `.section-video`, `.section-overlay` y sus variantes de light mode y #experiencia
- **Eliminados:** `radial-gradient` de `.skilltree::before`, `linear-gradient` de `.project-card::after`
- **Reemplazado:** `.scanline` gradient por `background: var(--accent)` sólido
- **Actualizados:** `.exp-panel`, `.project-info-panel`, `.contact-form-view` de rgba hardcodeado a `var(--bg-secondary)` / `var(--bg-primary)`
- **Añadido:** `.section-content::before` — línea horizontal de 2px en `--accent`, 65% ancho, posicionada encima del encabezado de sección
- **HTML:** removidos 6 `<video>` y 6 `<div class="section-overlay">` (12 elementos)
- **JS:** removido play/pause en `goToSection()`, `openProjectInfo()`, `closeProjectInfo()` y setTimeout inicial de video
- **JS:** PROJECTS — propiedad `gradient` renombrada a `color` con valor sólido hex

### Revertir: `git revert dd68a1f 78af328 3eb653c 4f379c2 940f7a1`

---

## [2026-06-16] — Sesión No-Videos Color Redesign (docs)

### Commit: `1e0e6f9`
### Mensaje: docs: changelog + plan rediseno sin videos
### Archivos:
- `AGENTCONTEXT/changelog.md`
- `docs/superpowers/plans/2026-06-16-no-videos-color-redesign.md`

### Detalle:
- Plan de implementación escrito y guardado en `docs/superpowers/plans/`
- Changelog actualizado con entradas de Skill Tree y No-Videos Color Redesign

### Revertir: `git revert 1e0e6f9`

---

## [2026-06-16] — Sesión UX Improvements (terminal + imágenes + formulario)

### Commit: `8894a45`
### Mensaje: feat: terminal animado en hero, imagenes reales en proyectos, formulario con fetch

### Archivos:
- `index.html`
- `css/main.css`
- `js/main.js`

### Detalle:
- **Terminal animado en hero:** `<div class="hero-terminal" id="heroTerminal">` en `.hero-right`. Simula CLI con typewriter (`setTimeout` recursivo, 52ms/char). Secuencia: git clone → npm install → npm run dev → fetch API → reinicia tras 3s. Los 2 botones hero quedan debajo con `flex: 0 0 80px` (altura fija). Terminal oculto en ≤1024px.
- **Imágenes Unsplash en proyectos:** 5 fotos relevantes al tipo de cada proyecto. Opacity 0.28, sube a 0.5 en hover. `object-fit: cover`. URLs base sin query — se añaden `?w=800&q=70&fit=crop&auto=format` al renderizar.
- **Formulario con fetch/Formspree:** `FORM_ENDPOINT` constante en JS. Si contiene `YOUR_FORMSPREE_ID` → fallback a `mailto:`. Si está configurado → POST JSON a Formspree, muestra `.form-success` en éxito. El usuario debe crear cuenta en formspree.io y reemplazar el placeholder.
- **CSS nuevas clases:** `.hero-terminal`, `.hero-terminal-bar`, `.ht-dot.r/y/g`, `.ht-title`, `.hero-terminal-body`, `.ht-line`, `.ht-prompt`, `.ht-text`, `.ht-output`, `.ht-cursor`, `.form-success`
- **JS nueva función:** `initHeroTerminal()` — llamada en bloque INIT

### Revertir: `git revert 8894a45`

---

## [2026-06-16] — Sesión Deploy + Limpieza

### Commits relacionados:
- `752ab78` — chore: eliminar videos grandes del repo (fondoweb3.mp4, fondoweb4.mp4)
- `a52ba1e` — chore: eliminar carpetas videos e images del repo

### Archivos:
- `src/videos/` (eliminada)
- `src/images/` (eliminada)

### Detalle:
- **Deploy:** Repo creado en GitHub (`EliezerZMDev/myofficialwebsite`), GitHub Pages activado. URL: https://eliezerzmdev.github.io/myofficialwebsite/
- **Limpieza:** Eliminados todos los archivos de `src/videos/` (6 mp4) y `src/images/` del repo y del disco. Los videos ya no se usaban desde la sesión No-Videos Color Redesign.

### Revertir: `git revert a52ba1e 752ab78`
