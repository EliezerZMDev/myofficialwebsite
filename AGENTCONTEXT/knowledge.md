<!-- ============================================================
  INSTRUCCIONES PARA EL AGENTE IA
  ============================================================
  Propósito: Acumular conocimiento técnico, workarounds, y recursos útiles.
  Leer: Octavo. Consultar cuando enfrentes un problema técnico.
  Actualizar: Cuando descubras algo útil que deba recordarse (bugs, soluciones, trucos).
  Formato: Markdown. Secciones: Dominio, Código, Workarounds, Recursos.
  Relación: Complementa decisions.md (por qué) con el cómo concreto.
  ============================================================ -->

# knowledge.md — Conocimiento Acumulado

> Este archivo almacena todo lo que se aprende durante el desarrollo. Úsalo para no repetir errores y para que futuros agentes IA se beneficien de experiencias pasadas.

---

## Sobre el dominio

<!-- Portfolio personal. Ver project.md para visión y objetivos. -->

## Sobre el código

<!--
Ejemplos de qué registrar:
- Convenciones de nombres usadas en CSS/JS
- Estructura de datos de los proyectos (formato del array PROJECTS)
- Cómo se manejan las transiciones entre secciones
- Dependencia de Google Fonts Inter
-->

### Convenciones CSS
- Variables CSS: `--bg-primary` (#03050a), `--accent` (#2979ff), `--text-primary` (#f0f2f5)
- Sin `border-radius` en ninguna parte del diseño
- Glassmorphism via `background: var(--surface)` + `backdrop-filter: blur(12px)`
- Diagonales decorativas: no clip-path en elementos individuales de layout, sino `::after` en cada card con `linear-gradient(135deg, ...)` para líneas finas accent entre cards
- Hexágonos en skills: `clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)`
- Circuito en experiencia: `::before` en container con `repeating-linear-gradient` para línea punteada, dots rotados 45deg, body con clip-path angulado

### Convenciones JS
- IIFE para encapsulamiento
- Array `PROJECTS` con objetos de proyecto (campo `gradient` para fondo glassmorphism)
- Array `SKILLS` con honeycomb rows: `rowLayout = [[null,null,0,1,null], [2,null,3,null,4], [null,null,5,6,null]]`
- Array `CONTACT_CELLS` con iconos SVG embebidos, labels, hrefs
- Navegación entre secciones: scroll wheel capturado, keyboard arrows, nav clicks, hash pushState/popstate
- Videos gestionados: solo el de la sección activa reproduce, los demás pausan

## Workarounds y notas técnicas

### Hero
- Layout: flex container con 2 hijos (left 65%, right 35%) + `::before` con `linear-gradient(135deg)` para línea diagonal decorativa entre ellos
- Left: ELIEZERDEV título + descripción. Sin roles, sin botones, sin tech-grid, sin partículas
- Right: 2 botones apilados (cada uno 50% height, full width) "Ver proyectos" y "Contactar" con `data-section`
- Sin clip-path en los hijos — la diagonal es puramente decorativa via pseudo-elemento

### Proyectos
- 5 cards en flex row, glassmorphism, gradient tint con opacity 0.12
- Diagonales decorativas entre cards: cada card tiene `::after` con `linear-gradient(135deg, transparent 47%, var(--accent) 49%, transparent 51%)` en `right: -1px`, `width: 20px`, `opacity: 0.3`. En hover: opacity 0.8
- Hover: flex grow + dim al resto
- Click: panel detalle 100% width (sin thumbnails a la derecha)
- Botón X con `background: var(--accent)` + `color: #fff`

### Habilidades
- Grid 4 columnas, honeycomb pattern via `rowLayout` en JS
- 7 hexágonos + espacios invisibles para patrón 2-3-2
- Hexágonos: clip-path + margin-bottom negativo para overlap visual
- Click: expande items internos

### Experiencia
- Circuito PCB con línea punteada vertical (repeating-linear-gradient), dots cuadrados rotados 45°, body con clip-path angulado
- Click: expande aprendizajes (.is-expanded)

### Sobre mí
- Split zigzag con clip-path en cada lado (foto: 100%/92%, bio: 8%/0%) y margin-left -1px entre ellos
- Glassmorphism en lado foto. Hover: flex-expand

<!--
Ejemplos:
- Si X no funciona en Y navegador, usar Z polyfill
- La fuente Inter tarda en cargar, considerar preload
- Problemas conocidos y sus soluciones
-->

## Recursos útiles

- Google Fonts: https://fonts.google.com/specimen/Inter
- CSS Custom Properties: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
- Git revert docs: https://git-scm.com/docs/git-revert

---

*Última actualización: 2026-06-01*
