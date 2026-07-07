# Spec: Árbol de Habilidades — Rediseño Árbol-Dibujo Tech-Luminoso

**Fecha:** 2026-06-16
**Sección:** Habilidades (index 2)
**Archivos afectados:** `css/main.css`, `js/main.js`

---

## 1. Objetivo

Rediseñar la sección de habilidades para que las conexiones entre nodos tomen la forma visual de un árbol dibujado, con estética tech-luminosa (glow azul, ramas SVG curvas). Corregir CSS/JS huérfanos. Añadir iconos SVG inline en cada nodo hexagonal.

---

## 2. Layout del árbol (coordenadas %, Y=0 arriba)

El árbol crece de abajo hacia arriba. Un tronco SVG sube desde la base del contenedor hasta el nodo raíz (core).

| ID | Nombre | x% | y% | Estado |
|----|--------|----|----|--------|
| core | Desarrollo | 50 | 76 | unlocked, core |
| frontend | Frontend | 20 | 54 | unlocked |
| backend | Backend | 50 | 54 | unlocked |
| arquitectura | Arquitectura | 80 | 54 | unlocked |
| uxui | UX/UI | 8 | 32 | unlocked |
| ia | IA | 38 | 32 | unlocked |
| automatizacion | Automatización | 62 | 32 | unlocked |
| gestion | Gestión | 90 | 32 | unlocked |
| web-avanzado | Web Avanzado | 8 | 11 | locked |
| movil | Móvil | 28 | 11 | locked |
| desktop | Desktop | 48 | 11 | locked |
| cloud | Cloud / DevOps | 68 | 11 | locked |
| videojuegos | Videojuegos | 88 | 11 | locked |

---

## 3. SVG — Tronco y ramas Bezier

### Defs (glow filter)
```xml
<defs>
  <filter id="branch-glow" x="-20%" y="-20%" width="140%" height="140%">
    <feGaussianBlur stdDeviation="2.5" result="blur"/>
    <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
</defs>
```

### Tronco
- Path: `M 50,100 C 50,92 50,84 50,76`
- `stroke-width`: 6
- `stroke`: var(--accent)
- `filter`: url(#branch-glow)
- `class`: branch-trunk

### Ramas activas (unlocked → unlocked)
- `<path>` con curva cúbica bezier
- `stroke-width`: 2
- `stroke`: var(--accent)
- `filter`: url(#branch-glow)
- `class`: branch-active
- `fill`: none

### Ramas bloqueadas (unlocked → locked)
- Mismo path pero `stroke-width`: 1.2
- `stroke`: var(--text-muted)
- `stroke-dasharray`: 4 3
- sin filter
- `class`: branch-locked
- `opacity`: 0.45

### Paths de ramas (M = origen nodo padre, C = bezier cubic, endpoint = nodo hijo)
```
core→frontend:      M 50,76 C 50,65 20,65 20,54
core→backend:       M 50,76 C 50,65 50,65 50,54
core→arquitectura:  M 50,76 C 50,65 80,65 80,54
frontend→uxui:      M 20,54 C 20,43 8,43 8,32
backend→ia:         M 50,54 C 50,43 38,43 38,32
arquitectura→auto:  M 80,54 C 80,43 62,43 62,32
arquitectura→gest:  M 80,54 C 80,43 90,43 90,32
uxui→web-avanzado:  M 8,32 C 8,21 8,21 8,11
frontend→movil:     M 20,54 C 20,32 28,21 28,11
backend→desktop:    M 50,54 C 50,32 48,21 48,11
automatizacion→cloud: M 62,32 C 62,21 68,21 68,11
gestion→videojuegos:  M 90,32 C 90,21 88,21 88,11
```

---

## 4. Nodos hexagonales

### Tamaños
- core: `width: 78px; height: 86px`
- unlocked: `width: 56px; height: 62px`
- locked: `width: 46px; height: 52px`

### Estructura DOM por nodo
```html
<div class="skill-node [core|unlocked|locked] [selected]"
     style="left: X%; top: Y%"
     title="Nombre del nodo">
  <svg viewBox="0 0 24 24"><!-- path del icono --></svg>
</div>
<div class="skill-node-label" style="left: X%; top: Y%">NOMBRE</div>
```
El `.skill-node-label` se posiciona absolutamente debajo del hexágono, centrado con `transform: translate(-50%, 0)`.

### Estados visuales
- **core**: background accent sólido, glow 16px accent, svg color #fff
- **unlocked**: border accent (via clip-path outline via `::before`), svg color accent, glow 6px on hover
- **locked**: background text-muted 40%, opacity 0.4, svg color text-muted, sin glow
- **selected**: scale(1.12), glow aumentado, border accent bright

---

## 5. Iconos SVG inline

| Nodo | SVG (viewBox 0 0 24 24) | Tipo |
|------|------------------------|------|
| core | Terminal Lucide: `<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>` stroke | Lucide |
| frontend | HTML5 Simple Icons path (fill) | Simple Icons |
| backend | Node.js Simple Icons path (fill) | Simple Icons |
| arquitectura | Layers Lucide: `<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>` stroke | Lucide |
| uxui | Figma Simple Icons (multi-path, fill) | Simple Icons |
| ia | CPU Lucide (rect + grid lines) stroke | Lucide |
| automatizacion | Zap Lucide: `<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>` stroke | Lucide |
| gestion | GitBranch Lucide stroke | Lucide |
| web-avanzado | React Simple Icons path (fill) | Simple Icons |
| movil | Smartphone Lucide stroke | Lucide |
| desktop | Monitor Lucide stroke | Lucide |
| cloud | Cloud Lucide stroke | Lucide |
| videojuegos | Gamepad2 Lucide stroke | Lucide |

Todos los Lucide usan `fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`.
Los Simple Icons usan `fill="currentColor"`.

---

## 6. Panel de detalle (`.skilltree-detail`)

### CSS nuevo
```css
.skilltree-detail {
  flex-shrink: 0;
  min-height: 76px;
  padding: 14px 20px;
  background: var(--hud-panel);
  border: 1px solid var(--border);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
}
.sd-hint { font-family: var(--mono); font-size: 0.6rem; letter-spacing: 0.12em; color: var(--text-muted); }
.sd-head { display: flex; align-items: center; gap: 16px; margin-bottom: 10px; }
.sd-name { font-size: 1rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; color: var(--accent); }
.sd-status { font-family: var(--mono); font-size: 0.56rem; letter-spacing: 0.12em; padding: 3px 10px; border: 1px solid; }
.sd-status.on { color: var(--accent); border-color: var(--border-accent); }
.sd-status.off { color: var(--text-muted); border-color: var(--border); }
.sd-items { display: flex; gap: 6px; flex-wrap: wrap; }
.sd-items span { padding: 3px 10px; font-size: 0.65rem; font-weight: 600; letter-spacing: 0.04em; background: var(--accent-dim); border: 1px solid var(--border-accent); color: var(--accent); }
.sd-items.off span { background: var(--surface); border-color: var(--border); color: var(--text-muted); }
```

### Layout del panel
- Cuando no hay selección: `.sd-hint` centrado
- Al seleccionar: columna con `.sd-head` (nombre + badge) y `.sd-items` (chips)
- Transición fadeIn en el contenido

---

## 7. CSS a eliminar / limpiar

- `.skill-tip`, `.skill-tip.locked`, `.skill-tip.show`, `.skill-tip-name`, `.skill-tip-desc`, `.skill-tip-status` — eliminar (no se usa en JS actual)
- `.skilltree-legend`, `.lg-dot` — mantener, conectar con JS que renderice la leyenda

---

## 8. Leyenda

El JS debe renderizar en `.skilltree-legend` (existe en CSS) dentro de `.skills-wrapper` (después del árbol, antes del detail panel o integrado en él). Contenido:
- `●  Desbloqueada` (punto accent)
- `○  Bloqueada` (punto muted, dashed)

---

## 9. Responsive

En ≤768px el árbol escala con `transform: scale(0.8)` en `.skilltree` y los labels reducen tamaño.
`.skilltree-detail` pasa a `min-height: 96px` para acomodar texto en más líneas.

---

## 10. Archivos modificados

| Archivo | Cambios |
|---------|---------|
| `js/main.js` | Actualizar `SKILL_TREE` coords, añadir `icon` por nodo, reescribir `renderSkillTree()` con paths bezier, tronco SVG, labels, leyenda |
| `css/main.css` | Añadir CSS para `.skilltree-detail` y `.sd-*`, limpiar `.skill-tip`, ajustar `.skill-node` para SVG interior, añadir `.skill-node-label`, ajustar `.branch-trunk`, `.branch-active`, `.branch-locked` |
