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
- Sin border-radius en ninguna parte — estética industrial/HUD
- Sin gradientes ni box-shadow — colores sólidos planos
- `.section-wipe` overlay con clip-path polygon para diagonal reveal (bottom-right → top-left)
- Esquineros L (`card-bracket-tl/tr/bl/br`): spans con 2 bordes cada uno (top/left, top/right, bottom/left, bottom/right) de 2px, gap de 6px entre líneas
- Skills grid: `gap: 0` con bordes compartidos (`border: 1px solid` en cada celda), hover → `border-top: 2px solid var(--accent)`

### Convenciones JS
- IIFE para encapsulamiento
- Array `PROJECTS` con objetos de proyecto — campo `bg` (color sólido hex), no `gradient`
- Funciones de navegación entre secciones
- Scroll wheel capturado con `wheel` event + transiciones fade 300ms
- Videos gestionados con `play()`/`pause()` según sección activa (solo uno reproduce a la vez)

## Workarounds y notas técnicas

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
