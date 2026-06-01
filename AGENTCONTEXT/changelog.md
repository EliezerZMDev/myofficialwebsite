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
- *(pendiente)* — feat: connected-tiles rediseño completo

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
### Revertir: `git revert <sha-tras-commit>`

---

*Próxima entrada aquí tras el siguiente commit.*
