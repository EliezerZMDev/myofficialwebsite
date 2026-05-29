# decisions.md — Registro de Decisiones (ADRs)

## [2026-05-21] Estructura del estándar AGENTCONTEXT/ (Meta-Decisión)
 
### Contexto
Se necesita un sistema de contexto persistente para que el agente IA retome proyectos sin perder información entre sesiones, específicamente para este proyecto de portfolio personal.
 
### Opciones consideradas
- **Opción A (elegida):** 8 archivos planos en una carpeta, cada uno con propósito específico (project, architecture, session, decisions, knowledge, workflow, changelog, guidelines).
- **Opción B:** Subcarpetas por categoría (session/, decisions/, etc.)
- **Opción C:** Un solo archivo grande con todo el contexto.
 
### Decisión
Se eligió la Opción A porque:
- Archivos planos son más fáciles de leer/escribir por la IA en una sola operación
- Cada archivo tiene un propósito claro y tamaño manejable
- Sin anidamiento que complique el acceso
- Suficiente separación de concerns sin llegar a sobreingeniería
 
### Consecuencias
- La IA puede leer los 8 archivos en paralelo al iniciar sesión
- El usuario puede editar cualquier archivo con cualquier editor de texto
- Si el proyecto crece mucho, se puede migrar a subcarpetas sin romper compatibilidad
 
## [2026-05-28] Selección de Stack Tecnológico Inicial
 
### Contexto
Necesitamos decidir qué tecnologías usar para construir el portfolio que cumple con los requisitos de interactividad avanzada (transiciones suaves, animations basadas en scroll, efectos específicos por sección) mientras demostramos habilidades técnicas fundamentales.
 
### Opciones consideradas
- **Opción A (elegida):** HTML5 semántico + CSS3 moderno + JavaScript ES6+ (Vanilla JS) inicialmente
- **Opción B:** React + CSS Modules/Styled Components desde el inicio
- **Opción C:** Vue 3 + Composition API desde el inicio
- **Opción D:** Svelte para menor bundle size y reactividad compilada
 
### Decisión
Se eligió la Opción A porque:
- Permite demostrar dominio profundo de las tecnologías web fundamentales
- Evita sobrecarga inicial de configuración y abstracciones
- Facilita optimizaciones de rendimiento desde cero
- Proporciona base sólida para posible migración futura a frameworks si se justifica
- Menor tamaño inicial de bundle y mejor control sobre exactamente qué se envía al navegador
 
### Consecuencias
- El código inicial será más verbose pero más transparente y educativo
- Ciertas interacciones complejas requerirán más código manual
- Se establece un punto de comparación claro si posteriormente se evalúa migrar a un framework
- Enfoque en principios de web estándar antes de abstracciones de framework
 
## [2026-05-28] Enfoque para Transiciones Suaves entre Secciones y Ocultar Scrollbar
 
### Contexto
El diseño requiere: 1) eliminar la visualización de la scrollbar manteniendo su funcionalidad, 2) hacer que el scroll no sea simplemente arrastre sino transición suave entre secciones casi como cambiar de pantalla, 3) tener efectos específicos por sección (ej: objeto que gira y se posiciona al entrar en vista).
 
### Opciones consideradas
- **Opción A:** CSS `scroll-behavior: smooth` + JS personalizado para snap a secciones + `::-webkit-scrollbar { display: none; }`
- **Opción B:** Biblioteca completa como fullPage.js o similar
- **Opción C:** Intersection Observer + manual manipulation de scroll con requestAnimationFrame
- **Opción D:** CSS Scroll Snap + JS mínimo para mejoras
 
### Decisión
Se eligió una combinación de Opción A y D mejorada:
- **Para scrollbar oculto:** `::-webkit-scrollbar { width: 0; }` con `scrollbar-width: none; firefox` para mantener funcionalidad visualmente oculta
- **Para transiciones entre secciones:** 
  - CSS `scroll-behavior: smooth` en html element para comportamiento base suave
  - JavaScript personalizado usando `Intersection Observer API` para detectar cuando secciones entran/salen del viewport
  - Manipulación sutil de scroll position con `requestAnimationFrame` para ajustes precisos y efectos de entrada/salida
  - No se usa snap estricto para permitir experiencia más natural, pero se mejoran las transiciones con easing personalizado
- **Para efectos específicos por sección:** Cada sección tendrá su propio manejador de animaciones basado en progreso de scroll dentro de esa sección (usando técnicas de parallax y transformaciones 3D simples)
 
### Consecuencias
- Requiere más código JavaScript personalizado pero ofrece control total sobre la experiencia
- Mantiene la sitio ligero sin dependencias externas pesadas
- Permite efectos altamente personalizados que serían difíciles de lograr con bibliotecas genéricas
- Mayor responsabilidad en manejo de rendimiento y corrección de bugs de scroll
- Experiencia más única y adaptada a la visión específica del diseñador
 
## [2026-05-28] Estrategia para Animaciones y Efectos Específicos por Sección
 
### Contexto
Queremos implementar efectos como: al hacer scroll en una sección, el contenido actual desaparece lentamente y aparece el nuevo (como en Wuthering Waves), y en ciertas secciones objetos específicos tienen animaciones particulares (ej: una moto que gira y se posiciona al entrar).
 
### Opciones consideradas
- **Opción A:** Usar una biblioteca de animations avanzada como GSAP o Framer Motion
- **Opción B:** CSS Animations + Keyframes manipulados mediante JavaScript y variables CSS personalizadas
- **Opción C:** WebGL/Three.js para efectos 3D complejos (solo si es absolutamente necesario)
- **Opción D:** Intersection Observer para trigger + CSS transitions/animations con delays calculados
 
### Decisión
Se eligió la Opción B mejorada con elementos de D:
- **Base:** CSS Animations y @keyframes definidos en archivos CSS separados
- **Control:** JavaScript usa Intersection Observer para detectar visibilidad de secciones y elementos clave
- **Manipulación fina:** En lugar de simplemente agregar/quitar clases, se usan propiedades CSS personalizadas (CSS variables) que se actualizan en función del progreso de scroll dentro de la sección (0-1 range) para animaciones más fluidas y reactivas
- **Ejemplo específico:** Para efecto tipo "moto girando": 
  - Elemento tiene transición definida en CSS para rotateY/rotateX
  - JavaScript calcula porcentaje de scroll dentro de la sección y actualiza una CSS variable `--section-scroll-progress`
  - CSS usa `var(--section-scroll-progress)` en funciones de transform para rotación suave proporcional al scroll
  - Al llegar ciertos thresholds, se activan clases que añaden transiciones de salida o activan siguientes etapas
- **Transiciones entre secciones:** Se usa una combinación de opacity y transform en el contenedor de secciones, donde la sección actual hace fade out mientras la siguiente hace fade in, coordinado mediante Intersection Observer en puntos de ruptura
 
### Consecuencias
- Requiere más coordinación entre CSS y JavaScript pero evita dependencias externas
- Permite efectos totalmente personalizados y sincronizados con scroll
- Mantiene todo el código de animación dentro del proyecto para facilitar depuración y aprendizaje
- Enfoque progresivo: empezar con efectos básicos de fade y complejizar según se necesite
- Posible refactorización futura a una pequeña biblioteca interna si patrones se repiten mucho
 
## [2026-05-28] Metodología de Diseño y Enfoque Mobile-First
 
### Contexto
Determinar cómo abordar el diseño responsive dado que el portfolio debe verse bien en dispositivos móviles y de escritorio, considerando las animaciones complejas planeadas.
 
### Opciones consideradas
- **Opción A:** Mobile-first estricto: diseñar para móvil primero, luego mejorar para tablet y desktop
- **Opción B:** Desktop-first: diseñar experiencia completa para desktop, luego adaptar hacia abajo
- **Opción C:** Enfoque adaptativo donde ciertos efectos complejos se desactivan o simplifican en móvil
- **Opción D:** Diseñar independientes para cada breakpoint significativo
 
### Decisión
Se eligió la Opción A con elementos de C:
- **Base mobile-first:** Todas las estilos básicos comienzan considerando limitaciones de móvil (touch, pantalla pequeña, rendimiento)
- **Mejoras progresivas:** Media queries se usan para añadir/layout complejo y efectos adicionales en pantallas más grandes
- **Selective complex effects:** Algunas animaciones intensivas en rendimiento (como parallax multi-capa o transformaciones 3D complejas) se implementan con detección de capacidades y pueden reducirse o desactivarse en dispositivos de bajo rendimiento detectados mediante heurísticas básicas o `navigator.connection` cuando esté disponible
- **Breakpoints definidos basados en contenido:** En lugar de dispositivos específicos, breakpoints ocurren cuando el diseño naturalmente necesita ajustarse (ej: cuando los elementos ya no caben cómodamente en una fila)
 
### Consecuencias
- Garantiza experiencia funcional y aceptable en todos los dispositivos desde el inicio
- Permite que la experiencia en desktop sea más rica sin sacrificar la usabilidad móvil
- Requiere prueba constante en múltiples dispositivos y condiciones de red
- Enfoque en accesibilidad básica desde el inicio (tamaño de toque, contraste, navegación teclado)
- Posible acumulación de complejidad en media queries que requerirá organización cuidadosa (posiblemente usando CSS custom properties para temas de breakpoint)
