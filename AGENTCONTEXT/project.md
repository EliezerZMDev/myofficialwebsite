<!-- ============================================================
  INSTRUCCIONES PARA EL AGENTE IA
  ============================================================
  Propósito: Define la visión, el stack, objetivos, audiencia y estado.
  Leer: Segundo, justo después de _index.md.
  Actualizar: Cuando cambie el stack, los objetivos, o el estado.
  Formato: Markdown. Mantener secciones: Qué, Stack, Objetivos, Usuarios, Estado.
  Relación: architecture.md se basa en el stack. decisions.md registra cambios.
  ============================================================ -->

# project.md — Propósito y Visión del Proyecto

## ¿Qué estamos construyendo?

**Portfolio Personal Oficial** — Sitio web de portafolio interactivo con tema oscuro, transiciones tipo presentación entre secciones, y galería de proyectos estilo Regions. El sitio muestra habilidades técnicas, proyectos destacados y proporciona medios de contacto.

## Stack tecnológico

- **HTML5** Semántico
- **CSS3** (Flexbox, Grid, Variables CSS, Animaciones, Custom Properties)
- **JavaScript** ES6+ (Vanilla JS — sin frameworks ni librerías externas)
- **Fuentes:** Google Fonts (Inter)
- **Sin build tools** — proyecto estático puro. No hay npm, Webpack, Vite, etc.

> **Nota:** Este proyecto usa vanilla HTML/CSS/JS. No uses React, Vue, TypeScript ni ningún framework sin consultar antes al usuario.

## Objetivos

1. Presentar trabajo profesional de forma atractiva visualmente (tema oscuro, animaciones, transiciones)
2. Demostrar habilidades técnicas de frontend mediante la propia implementación del sitio
3. Navegación fluida tipo presentación de diapositivas (slide-show entre secciones)
4. Galería de proyectos con diseño tipo Regions (3 imágenes verticales, navegación por flechas)
5. Facilitar contacto para oportunidades profesionales
6. Mantener alto rendimiento y accesibilidad básica

## Usuarios / Público objetivo

- Reclutadores técnicos y gerentes de contratación
- Clientes potenciales para trabajo freelance o contractual
- Comunidad de desarrolladores interesados en técnicas de frontend

## Estado actual

**Commit de referencia:** `be70779`
**SHA completo:** `be70779e4d07c60cf44e99b27e0efba9a1c6e631`

- Portfolio funcional con tema dark, transiciones tipo presentación
- Proyectos con layout estilo Regions (3 imágenes verticales, navegación por flechas)
- Archivos fuente: `index.html`, `css/main.css`, `js/main.js`
- **Nota:** Los archivos fuente han sido eliminados del disco pero existen en git. Para restaurarlos: `git restore .`

---

*Última actualización: 2026-06-01*
