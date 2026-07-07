# Skill Tree Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rediseñar la sección de Habilidades para que las conexiones entre nodos formen un árbol dibujado con ramas SVG Bezier luminosas (tech-glow azul), íconos SVG inline en cada nodo hexagonal, y un panel de detalle completamente estilizado.

**Architecture:** El SVG existente (`#skillTreeLines`, viewBox 0 0 100 100) cambia de `<line>` a `<path>` con curvas Bezier cúbicas + tronco + filtro glow. Los nodos hexagonales pasan de texto interior a íconos SVG. El `SKILL_TREE` se reposiciona para que el árbol crezca de abajo hacia arriba (core en y=76, ramas en y=54/32, tips en y=11).

**Tech Stack:** Vanilla JS (ES6+), CSS3, SVG 1.1 — sin dependencias externas. Íconos de Lucide (stroke) y Simple Icons (fill), embebidos como paths inline.

---

## Archivos modificados

| Archivo | Qué cambia |
|---------|-----------|
| `index.html` | Añadir `<div class="skilltree-legend" id="skillLegend"></div>` en skills-wrapper |
| `css/main.css` | Sección skills: reemplazar line→path selectors, actualizar .skill-node, eliminar .skill-tip (bloque completo), añadir .skill-node-label + .skilltree-detail + .sd-* CSS, actualizar responsive |
| `js/main.js` | Reemplazar SKILL_TREE array (posiciones + iconos), reescribir renderSkillTree() |

---

## Task 1: Añadir elemento de leyenda en HTML

**Files:**
- Modify: `index.html:115-124` (sección skills-wrapper)

- [ ] **Step 1: Editar skills-wrapper en index.html**

Reemplazar:
```html
        <div class="skills-wrapper">
          <div class="skilltree" id="skillTree">
            <svg class="skilltree-lines" id="skillTreeLines" viewBox="0 0 100 100" preserveAspectRatio="none"></svg>
          </div>
          <div class="skilltree-detail" id="skillDetail">
            <span class="sd-hint mono">▸ SELECCIONA UN NODO DEL ÁRBOL PARA VER DETALLES · LAS BLOQUEADAS SON HABILIDADES POR DESBLOQUEAR</span>
          </div>
        </div>
```

Con:
```html
        <div class="skills-wrapper">
          <div class="skilltree" id="skillTree">
            <svg class="skilltree-lines" id="skillTreeLines" viewBox="0 0 100 100" preserveAspectRatio="none"></svg>
          </div>
          <div class="skilltree-legend" id="skillLegend"></div>
          <div class="skilltree-detail" id="skillDetail">
            <span class="sd-hint mono">▸ SELECCIONA UN NODO DEL ÁRBOL PARA VER DETALLES</span>
          </div>
        </div>
```

- [ ] **Step 2: Verificar en browser que la estructura existe**

Abrir `index.html` en browser → navegar a sección Habilidades. El árbol existente debe seguir mostrándose (aún sin cambios visuales).

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add skilltree-legend element to skills wrapper"
```

---

## Task 2: Actualizar CSS — sección skills

**Files:**
- Modify: `css/main.css` (sección `③ HABILIDADES`, líneas ~302-351, y responsive ~485-487)

- [ ] **Step 1: Reemplazar selectores de línea SVG con selectores de path**

Reemplazar exactamente este bloque en `css/main.css`:
```css
.skilltree-lines line { stroke: var(--text-muted); stroke-width: 1.5; }
.skilltree-lines line.active { stroke: var(--accent); stroke-width: 2.5; opacity: 0.9; filter: drop-shadow(0 0 3px var(--accent)); }
.skilltree-lines line.locked { stroke: var(--text-muted); opacity: 0.32; stroke-dasharray: 4 4; }
```

Con:
```css
.skilltree-lines path.branch-trunk { stroke: var(--accent); stroke-width: 6; fill: none; }
.skilltree-lines path.branch-active { stroke: var(--accent); stroke-width: 2; fill: none; opacity: 0.85; }
.skilltree-lines path.branch-locked { stroke: var(--text-muted); stroke-width: 1.2; fill: none; stroke-dasharray: 4 3; opacity: 0.4; }
```

- [ ] **Step 2: Reemplazar el bloque completo de nodos hexagonales**

Reemplazar exactamente este bloque:
```css
/* Nodo hexagonal (engranaje/cubo) */
.skill-node { position: absolute; transform: translate(-50%, -50%); z-index: 2; width: 56px; height: 62px; display: flex; align-items: center; justify-content: center; cursor: pointer; clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%); transition: transform 0.3s ease, filter 0.3s ease; }
.skill-node::before { content: ''; position: absolute; inset: 2px; clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%); background: rgba(3,5,10,0.9); z-index: 0; }
[data-theme="light"] .skill-node::before { background: rgba(238,240,243,0.92); }
.skill-node svg { position: relative; z-index: 1; width: 24px; height: 24px; }

.skill-node.unlocked { background: var(--accent); filter: drop-shadow(0 0 6px rgba(41,121,255,0.7)); }
.skill-node.unlocked svg { color: var(--accent); }
.skill-node.unlocked:hover { transform: translate(-50%, -50%) scale(1.14); filter: drop-shadow(0 0 13px rgba(41,121,255,0.95)); z-index: 5; }

.skill-node.core { width: 78px; height: 86px; background: var(--accent); filter: drop-shadow(0 0 14px rgba(41,121,255,0.9)); }
.skill-node.core::before { background: rgba(41,121,255,0.22); }
.skill-node.core svg { width: 34px; height: 34px; color: #fff; }
.skill-node.core:hover { transform: translate(-50%, -50%) scale(1.1); }

.skill-node.locked { background: var(--text-muted); filter: grayscale(0.7); opacity: 0.5; }
.skill-node.locked svg { color: var(--text-secondary); }
.skill-node.locked:hover { opacity: 0.85; transform: translate(-50%, -50%) scale(1.08); z-index: 5; }
```

Con:
```css
/* Nodo hexagonal */
.skill-node { position: absolute; transform: translate(-50%, -50%); z-index: 2; width: 56px; height: 62px; display: flex; align-items: center; justify-content: center; cursor: pointer; clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%); transition: transform 0.3s ease, filter 0.3s ease; }
.skill-node::before { content: ''; position: absolute; inset: 2px; clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%); background: rgba(3,5,10,0.9); z-index: 0; }
[data-theme="light"] .skill-node::before { background: rgba(238,240,243,0.92); }
.skill-node svg { position: relative; z-index: 1; width: 22px; height: 22px; }

.skill-node.unlocked { background: var(--accent); filter: drop-shadow(0 0 6px rgba(41,121,255,0.7)); }
.skill-node.unlocked svg { color: var(--accent); }
.skill-node.unlocked:hover { transform: translate(-50%, -50%) scale(1.14); filter: drop-shadow(0 0 13px rgba(41,121,255,0.95)); z-index: 5; }
.skill-node.selected { transform: translate(-50%, -50%) scale(1.12) !important; filter: drop-shadow(0 0 18px rgba(41,121,255,1)) !important; z-index: 6 !important; }

.skill-node.core { width: 78px; height: 86px; background: var(--accent); filter: drop-shadow(0 0 14px rgba(41,121,255,0.9)); }
.skill-node.core::before { background: rgba(41,121,255,0.22); }
.skill-node.core svg { width: 32px; height: 32px; color: #fff; }
.skill-node.core:hover { transform: translate(-50%, -50%) scale(1.1); }

.skill-node.locked { background: var(--text-muted); filter: grayscale(0.7); opacity: 0.4; }
.skill-node.locked svg { color: var(--text-secondary); }
.skill-node.locked:hover { opacity: 0.7; transform: translate(-50%, -50%) scale(1.08); z-index: 5; }

/* Etiqueta debajo del nodo */
.skill-node-label { position: absolute; transform: translateX(-50%); z-index: 3; font-family: var(--mono); font-size: 0.5rem; letter-spacing: 0.09em; text-transform: uppercase; color: var(--text-muted); white-space: nowrap; pointer-events: none; text-align: center; }
```

- [ ] **Step 3: Reemplazar el bloque `.skill-tip` completo con CSS del panel de detalle**

Reemplazar exactamente:
```css
/* Tooltip flotante */
.skill-tip { position: absolute; z-index: 30; min-width: 178px; max-width: 240px; padding: 12px 14px; background: rgba(3,5,10,0.95); border: 1px solid var(--accent); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); pointer-events: none; opacity: 0; transition: opacity 0.2s ease; clip-path: polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px); }
[data-theme="light"] .skill-tip { background: rgba(238,240,243,0.97); }
.skill-tip.locked { border-color: var(--text-muted); }
.skill-tip.show { opacity: 1; }
.skill-tip-name { font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent); margin-bottom: 5px; }
.skill-tip.locked .skill-tip-name { color: var(--text-secondary); }
.skill-tip-desc { font-size: 0.68rem; color: var(--text-secondary); line-height: 1.5; }
.skill-tip-status { display: inline-block; margin-top: 8px; font-family: var(--mono); font-size: 0.54rem; letter-spacing: 0.12em; padding: 2px 8px; border: 1px solid; }
.skill-tip-status.on { color: var(--accent); border-color: var(--border-accent); }
.skill-tip-status.off { color: var(--text-muted); border-color: var(--border); }
```

Con:
```css
/* Panel de detalle */
.skilltree-detail { flex-shrink: 0; padding: 14px 20px; min-height: 80px; background: var(--hud-panel); border: 1px solid var(--border); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); display: flex; flex-direction: column; justify-content: center; }
.sd-hint { font-family: var(--mono); font-size: 0.6rem; letter-spacing: 0.12em; color: var(--text-muted); text-align: center; }
.sd-head { display: flex; align-items: center; gap: 16px; margin-bottom: 10px; }
.sd-name { font-size: 1rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; color: var(--accent); }
.sd-status { font-family: var(--mono); font-size: 0.56rem; letter-spacing: 0.12em; padding: 3px 10px; border: 1px solid; }
.sd-status.on { color: var(--accent); border-color: var(--border-accent); }
.sd-status.off { color: var(--text-muted); border-color: var(--border); }
.sd-items { display: flex; gap: 6px; flex-wrap: wrap; }
.sd-items span { padding: 3px 10px; font-size: 0.65rem; font-weight: 600; letter-spacing: 0.04em; background: var(--accent-dim); border: 1px solid var(--border-accent); color: var(--accent); }
.sd-items.off span { background: var(--surface); border-color: var(--border); color: var(--text-muted); }
```

- [ ] **Step 4: Actualizar responsive para skills (dentro del bloque @media (max-width: 768px))**

Reemplazar:
```css
  .skill-node { min-width: 82px; padding: 8px 9px; }
  .skill-node-title { font-size: 0.58rem; }
  .skill-node-sub { font-size: 0.44rem; }
```

Con:
```css
  .skill-node { width: 40px; height: 44px; }
  .skill-node svg { width: 16px; height: 16px; }
  .skill-node.core { width: 54px; height: 60px; }
  .skill-node.core svg { width: 22px; height: 22px; }
  .skill-node.locked { width: 34px; height: 38px; }
  .skill-node-label { font-size: 0.42rem; }
  .skilltree-detail { min-height: 96px; }
```

- [ ] **Step 5: Commit**

```bash
git add css/main.css
git commit -m "feat: actualizar CSS skills — paths bezier, nodos con SVG, panel detalle, limpiar skill-tip"
```

---

## Task 3: Actualizar SKILL_TREE con nuevas posiciones e íconos SVG

**Files:**
- Modify: `js/main.js:102-121` (SKILL_TREE array + SKILL_EDGES)

- [ ] **Step 1: Reemplazar el array SKILL_TREE completo**

Reemplazar desde `const SKILL_TREE = [` hasta el cierre `]` del array (líneas 102-116):

```javascript
  const SKILL_TREE = [
    {
      id: 'core', name: 'Desarrollo', x: 50, y: 76, unlocked: true, core: true,
      items: ['Fundamentos', 'Lógica', 'Algoritmos'],
      iconType: 'stroke',
      icon: '<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>'
    },
    {
      id: 'frontend', name: 'Frontend', x: 20, y: 54, unlocked: true,
      items: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
      iconType: 'fill',
      icon: '<path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>'
    },
    {
      id: 'backend', name: 'Backend', x: 50, y: 54, unlocked: true,
      items: ['PHP', 'Node.js', 'APIs REST'],
      iconType: 'stroke',
      icon: '<rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>'
    },
    {
      id: 'arquitectura', name: 'Arquitectura', x: 80, y: 54, unlocked: true,
      items: ['Diseño de Sistemas', 'Patrones', 'Escalabilidad'],
      iconType: 'stroke',
      icon: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>'
    },
    {
      id: 'uxui', name: 'UX/UI', x: 8, y: 32, unlocked: true,
      items: ['Figma', 'Prototipado', 'Sistemas Diseño'],
      iconType: 'fill',
      icon: '<path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"/><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"/>'
    },
    {
      id: 'ia', name: 'IA', x: 38, y: 32, unlocked: true,
      items: ['Agentes IA', 'Context Engineering', 'Prompting'],
      iconType: 'stroke',
      icon: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>'
    },
    {
      id: 'automatizacion', name: 'Automatización', x: 62, y: 32, unlocked: true,
      items: ['Docs Automatizada', 'Workflows', 'DevOps'],
      iconType: 'stroke',
      icon: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'
    },
    {
      id: 'gestion', name: 'Gestión', x: 90, y: 32, unlocked: true,
      items: ['Git/GitHub', 'VS Code', 'Opencode'],
      iconType: 'fill',
      icon: '<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>'
    },
    {
      id: 'web-avanzado', name: 'Web Avanzado', x: 8, y: 11, unlocked: false,
      items: ['PWA', 'SPA Frameworks', 'WebGL / Three.js'],
      iconType: 'stroke',
      icon: '<circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5z"/><path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5z"/>'
    },
    {
      id: 'movil', name: 'Móvil', x: 28, y: 11, unlocked: false,
      items: ['React Native', 'Flutter', 'Kotlin / Swift'],
      iconType: 'stroke',
      icon: '<rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>'
    },
    {
      id: 'desktop', name: 'Desktop', x: 48, y: 11, unlocked: false,
      items: ['Electron', '.NET', 'Tauri'],
      iconType: 'stroke',
      icon: '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>'
    },
    {
      id: 'cloud', name: 'Cloud / DevOps', x: 68, y: 11, unlocked: false,
      items: ['AWS / Azure', 'Docker', 'Kubernetes'],
      iconType: 'stroke',
      icon: '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>'
    },
    {
      id: 'videojuegos', name: 'Videojuegos', x: 88, y: 11, unlocked: false,
      items: ['Unity', 'Godot', 'Unreal'],
      iconType: 'stroke',
      icon: '<line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect x="2" y="6" width="20" height="12" rx="2"/>'
    }
  ]
```

- [ ] **Step 2: Commit**

```bash
git add js/main.js
git commit -m "feat: actualizar SKILL_TREE — posiciones árbol bottom-up + íconos SVG inline"
```

---

## Task 4: Reescribir renderSkillTree()

**Files:**
- Modify: `js/main.js:380-427` (función renderSkillTree)

- [ ] **Step 1: Reemplazar la función renderSkillTree() completa**

Reemplazar desde `function renderSkillTree ()` hasta el cierre `}` de la función:

```javascript
  function renderSkillTree () {
    var tree = q('#skillTree')
    var svg = q('#skillTreeLines')
    var detail = q('#skillDetail')
    var legend = q('#skillLegend')
    if (!tree || !svg) return

    var NS = 'http://www.w3.org/2000/svg'

    /* --- SVG: defs (filtro glow) + tronco + ramas --- */
    svg.innerHTML = ''

    var defs = document.createElementNS(NS, 'defs')
    defs.innerHTML =
      '<filter id="branch-glow" x="-30%" y="-30%" width="160%" height="160%">' +
        '<feGaussianBlur stdDeviation="2" result="blur"/>' +
        '<feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>' +
      '</filter>'
    svg.appendChild(defs)

    /* Tronco */
    var trunk = document.createElementNS(NS, 'path')
    trunk.setAttribute('d', 'M 50,100 C 50,90 50,83 50,76')
    trunk.setAttribute('class', 'branch-trunk')
    trunk.setAttribute('filter', 'url(#branch-glow)')
    trunk.setAttribute('vector-effect', 'non-scaling-stroke')
    svg.appendChild(trunk)

    /* Ramas como Bezier cúbicos */
    var byId = {}
    SKILL_TREE.forEach(function (n) { byId[n.id] = n })

    SKILL_EDGES.forEach(function (e) {
      var a = byId[e[0]], b = byId[e[1]]
      if (!a || !b) return
      var midY = (a.y + b.y) / 2
      var d = 'M ' + a.x + ',' + a.y +
              ' C ' + a.x + ',' + midY +
              ' ' + b.x + ',' + midY +
              ' ' + b.x + ',' + b.y
      var path = document.createElementNS(NS, 'path')
      path.setAttribute('d', d)
      var isActive = a.unlocked && b.unlocked
      path.setAttribute('class', isActive ? 'branch-active' : 'branch-locked')
      if (isActive) path.setAttribute('filter', 'url(#branch-glow)')
      path.setAttribute('vector-effect', 'non-scaling-stroke')
      svg.appendChild(path)
    })

    /* --- Nodos y etiquetas --- */
    /* Limpiar nodos previos (los que no son el SVG) */
    qa('.skill-node, .skill-node-label', tree).forEach(function (el) { el.remove() })

    var selected = null

    function showDetail (n) {
      detail.innerHTML =
        '<div class="sd-head">' +
          '<span class="sd-name">' + n.name + '</span>' +
          '<span class="sd-status ' + (n.unlocked ? 'on' : 'off') + '">' +
          (n.unlocked ? 'DESBLOQUEADA' : 'BLOQUEADA · POR DESBLOQUEAR') +
          '</span>' +
        '</div>' +
        '<div class="sd-items' + (n.unlocked ? '' : ' off') + '">' +
        n.items.map(function (it) { return '<span>' + it + '</span>' }).join('') +
        '</div>'
    }

    SKILL_TREE.forEach(function (n) {
      /* Hexágono */
      var node = document.createElement('div')
      node.className = 'skill-node ' + (n.core ? 'core ' : '') + (n.unlocked ? 'unlocked' : 'locked')
      node.style.left = n.x + '%'
      node.style.top = n.y + '%'

      var svgAttrs = n.iconType === 'stroke'
        ? 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"'
        : 'fill="currentColor"'
      node.innerHTML = '<svg viewBox="0 0 24 24" ' + svgAttrs + '>' + n.icon + '</svg>'

      node.addEventListener('click', function () {
        if (selected) selected.classList.remove('selected')
        node.classList.add('selected')
        selected = node
        showDetail(n)
      })
      tree.appendChild(node)

      /* Etiqueta debajo del hexágono */
      var label = document.createElement('div')
      label.className = 'skill-node-label'
      label.textContent = n.name
      label.style.left = n.x + '%'
      var halfH = n.core ? 43 : (n.unlocked ? 31 : 26)
      label.style.top = 'calc(' + n.y + '% + ' + halfH + 'px + 5px)'
      tree.appendChild(label)
    })

    /* --- Leyenda --- */
    if (legend) {
      legend.innerHTML =
        '<span><i class="lg-dot on"></i> Desbloqueada</span>' +
        '<span><i class="lg-dot off"></i> Bloqueada</span>'
    }
  }
```

- [ ] **Step 2: Verificar que la referencia a `SKILL_EDGES` sigue existiendo**

`SKILL_EDGES` está definido en las líneas 117-121. No se modifica. Verificar que no fue eliminado accidentalmente.

- [ ] **Step 3: Commit**

```bash
git add js/main.js
git commit -m "feat: reescribir renderSkillTree — bezier paths, tronco, íconos SVG, etiquetas, leyenda"
```

---

## Task 5: Verificación visual completa

**Files:** ninguno — solo verificación en browser

- [ ] **Step 1: Abrir index.html en browser y navegar a Habilidades**

Verificar:
- [ ] El árbol crece de abajo hacia arriba — el nodo DESARROLLO aparece cerca de la base
- [ ] Un tronco azul luminoso sube desde la base hasta DESARROLLO
- [ ] Las 3 ramas principales (Frontend, Backend, Arquitectura) salen del tronco con curvas Bezier
- [ ] Las sub-ramas se curvan desde cada rama principal hacia los nodos de nivel 2
- [ ] Las ramas hacia nodos bloqueados (los de arriba) son punteadas y grises
- [ ] Cada nodo hexagonal tiene un ícono SVG visible en su interior
- [ ] Los nodos unlocked tienen ícono en azul accent; el core en blanco sobre azul sólido; los locked en gris opaco
- [ ] Las etiquetas de texto aparecen debajo de cada hexágono
- [ ] Al hacer clic en un nodo, el panel inferior muestra nombre + badge + chips de habilidades
- [ ] La leyenda aparece con los dos puntos (activa / bloqueada)

- [ ] **Step 2: Verificar tema claro**

Hacer clic en el toggle de tema → verificar que los nodos, ramas y panel mantienen legibilidad en el tema claro.

- [ ] **Step 3: Verificar que el resto de las secciones no se rompió**

Navegar por todas las secciones (Inicio, Proyectos, Experiencia, Sobre mí, Contacto) y confirmar que funcionan normalmente.

- [ ] **Step 4: Commit final**

```bash
git add AGENTCONTEXT/changelog.md
git commit -m "docs: actualizar changelog — sesión skill tree redesign"
```

---

## Notas de implementación

**SVG coordinate system:** El viewBox="0 0 100 100" con preserveAspectRatio="none" hace que x=50, y=76 en SVG coincida exactamente con `left: 50%; top: 76%` en CSS. Los bezier paths usan las mismas coordenadas que los nodos.

**vector-effect="non-scaling-stroke":** Crucial para que el stroke-width en pantalla sea constante aunque el SVG se estire. Sin este atributo, una rama diagonal se vería más gruesa horizontalmente que verticalmente.

**Orden de paths en SVG:** El tronco se dibuja primero (abajo del todo), luego las ramas. Los nodos DOM se dibujan encima (z-index: 2 en CSS vs z-index: 1 del SVG).

**Filtro glow:** Definido en `<defs>` dentro del mismo SVG — funciona en todos los browsers modernos. El `feGaussianBlur` con stdDeviation="2" + `feMerge` crea el halo azul.
