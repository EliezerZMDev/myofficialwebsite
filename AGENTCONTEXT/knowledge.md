# knowledge.md — Conocimiento Acumulado

## Sobre el dominio
- Un portfolio personal efectivo combina demostración de habilidades técnicas con narrativa visual atractiva
- Las experiencias web modernas priorizan rendimiento (<3s LCP), accesibilidad básica y microinteracciones que guían al usuario
- Los efectos de scroll-driven (como los vistos en Wuthering Waves) requieren sincronización precisa entre scroll position y cambios visuales
- La ocultación de scrollbar manteniendo funcionalidad es una técnica común en experiencias inmersivas (`::-webkit-scrollbar { display: none; }` con zachas para Firefox)

## Sobre el código
- Para transiciones suaves entre secciones: combinar CSS `scroll-behavior: smooth` con JavaScript que usa `Intersection Observer` para detectar visibilidad y aplicar clases de transición
- Para efectos específicos por sección (ej: objeto que gira): usar CSS variables actualizadas mediante `requestAnimationFrame` basado en progreso de scroll dentro de la sección (0-1 rango)
- Para animaciones de entrada/salida entre secciones: manipular `opacity` y `transform` en contenedores de secciones, coordinado mediante puntos de ruptura detectados con `Intersection Observer`
- Para rendimiento: usar `will-change: transform` en elementos animados, limitar capas de parallax, comprimir imágenes y usar lazy loading
- El proyecto usa estructura de carpetas estándar para web: HTML semántico, CSS modularizado, JavaScript en módulos ES6

## Workarounds y notas técnicas
- En Safari, para ocultar scrollbar completamente se necesita `scrollbar-width: none;` además de `-webkit-scrollbar`
- Algunas animaciones intensivas en rendimiento (como múltiples capas de parallax) pueden requerir detección de capacidades y reducción automática en dispositivos de bajo rendimiento
- Al usar `requestAnimationFrame` para scroll-linked effects, siempre comparar con timestamp anterior para evitar actualizaciones innecesarias
- Para mantener estado entre recargas durante desarrollo, considerar usar `sessionStorage` para posiciones de scroll o estados de animación temporales
- Si se migra posteriormente a React/Vue, mantener la lógica de scroll/animations en hooks o composables separados para facilitar testing

## Recursos útiles
- MDN: Intersection Observer API - https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
- CSS-Tricks: Guide to CSS Custom Properties - https://css-tricks.com/css-custom-properties/
- Web.dev: Scroll-linked effects with ScrollTimeline - https://web.dev/articles/scroll-timeline
- GSAP Docs (para referencia futura): https://greensock.com/docs/
- HTML5 Semantic Elements Reference: https://developer.mozilla.org/en-US/docs/Glossary/Semantic#semantic_elements_in_html5
- W3C Web Content Accessibility Guidelines (WCAG) 2.1: https://www.w3.org/TR/WCAG21/
