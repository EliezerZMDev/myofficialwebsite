<!-- ============================================================
  INSTRUCCIONES PARA EL AGENTE IA
  ============================================================
  Propósito: Documenta la estructura técnica, stack, patrones y datos.
  Leer: Tercero, para entender cómo está organizado el código.
  Actualizar: Cuando cambie la estructura, se añadan archivos, o se tome una decisión técnica.
  Formato: Markdown. Secciones: Estructura, Stack, Decisiones técnicas, Patrones, Flujo.
  Relación: Se basa en project.md. decisions.md registra por qué.
  ============================================================ -->

# architecture.md — Estructura Técnica y Decisiones de Arquitectura

## Estructura del proyecto

```
myofficialwebsite/
├── AGENTCONTEXT/         # ← Contexto para agentes IA (este directorio)
│   ├── _index.md
│   ├── architecture.md
│   ├── changelog.md
│   ├── decisions.md
│   ├── guidelines.md
│   ├── knowledge.md
│   ├── project.md
│   ├── session.md
│   └── workflow.md
├── css/
│   └── main.css          # Estilos principales (769 líneas)
├── js/
│   └── main.js           # Lógica JS (297 líneas)
├── index.html            # Página principal (147 líneas)
└── .git/
```

## Stack detallado

| Capa | Tecnología | Versión/Detalle |
|------|-----------|----------------|
| **HTML** | HTML5 | Semántico, single-page |
| **CSS** | CSS3 | Variables CSS, Flexbox, Grid, animaciones |
| **JS** | ES6+ | Vanilla, sin librerías |
| **Fuentes** | Google Fonts | Inter |
| **Build** | Ninguno | Sin npm, sin bundlers |
| **Hosting** | — | Pendiente de definir |

## Decisiones técnicas importantes

| Decisión | Opción elegida | Alternativas | Commit |
|----------|---------------|--------------|--------|
| Tema visual | Dark theme con acentos dorados (#c8a84e) | Light theme, otros colores | `28a0858` |
| Transiciones | Slide-show tipo presentación entre secciones | Scroll suave, tabs, routing | `28a0858` |
| Layout proyectos | Regions (3 imágenes verticales + flechas) | Cards, grid simple, carrusel | `be70779` |
| Framework | Vanilla JS | React, Vue, Svelte | `28a0858` |

## Patrones de diseño

- **CSS Custom Properties** para theming y consistencia de colores
- **Módulo IIFE** en JS para encapsulamiento (patrón módulo clásico)
- **Renderizado condicional** de secciones tipo presentación
- **Array de objetos** para datos de proyectos (PROJECTS en main.js)

## Flujo de datos

```
Usuario → index.html
            ├── css/main.css → Estilos visuales
            └── js/main.js → Lógica:
                 ├── Manejo de navegación/secciones
                 ├── Renderizado de proyectos (PROJECTS array)
                 └── Interacciones (flechas, transiciones)
```

---

*Última actualización: 2026-06-01*
