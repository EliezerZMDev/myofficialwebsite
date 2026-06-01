<!-- ============================================================
  INSTRUCCIONES PARA EL AGENTE IA
  ============================================================
  Propósito: Registro de Decisiones Arquitectónicas (ADRs).
  Leer: Séptimo. Consultar cuando necesites entender por qué se hizo algo.
  Actualizar: Cuando se tome una decisión importante (stack, estructura, diseño).
  Formato:
    ## [YYYY-MM-DD] Título
    ### Contexto: situación que llevó a la decisión
    ### Opciones: alternativas consideradas
    ### Decisión: qué se eligió y por qué
    ### Consecuencias: impacto hacia adelante
    ### Commit: sha donde se implementó
  Relación: decisions.md explica el POR QUÉ. architecture.md explica el CÓMO.
  ============================================================ -->

# decisions.md — Registro de Decisiones (ADRs)

---

## [2026-06-01] Tema oscuro (dark theme) con acentos dorados

### Contexto
El portfolio debe verse moderno, profesional y atractivo para reclutadores técnicos. El dark theme es el estándar en portafolios de desarrolladores.

### Opciones consideradas
- **Dark theme con acentos dorados:** Elegante, profesional, contrasta bien con fondo oscuro
- **Light theme:** Menos impactante visualmente, más común
- **Dark theme con acentos azules:** Más corporativo, menos personalidad

### Decisión
Dark theme con acentos dorados (`--accent: #c8a84e`). El dorado transmite calidad y experiencia.

### Consecuencias
- Todo el CSS debe usar variables de color para mantener consistencia
- Las imágenes deben verse bien sobre fondo oscuro
- Commit: `28a0858`

---

## [2026-06-01] Vanilla JS sin frameworks

### Contexto
Proyecto de portafolio personal. No requiere estado complejo ni enrutamiento.

### Opciones consideradas
- **Vanilla JS:** Zero dependencias, rendimiento puro, sin build steps
- **React:** Overkill para un sitio estático de una página
- **Vue/Svelte:** Similar a React, innecesario

### Decisión
Vanilla JS (ES6+). No hay necesidad de un framework para un sitio de una página.

### Consecuencias
- Sin npm, sin Webpack, sin build tooling
- Fácil deploy (GitHub Pages, Netlify, cualquier static host)
- El código es directamente ejecutable en el navegador
- Commit: `28a0858`

---

## [2026-06-01] Layout de proyectos estilo Regions (3 imágenes verticales + flechas)

### Contexto
La sección de proyectos necesita ser visualmente atractiva y mostrar múltiples capturas por proyecto.

### Opciones consideradas
- **Regions layout:** 3 imágenes verticales por proyecto con navegación por flechas
- **Cards grid:** Cada proyecto como una card, menos visual
- **Carrusel horizontal:** Similar pero más común

### Decisión
Regions layout — cada proyecto muestra 3 imágenes en vertical con flechas de navegación y transiciones suaves.

### Consecuencias
- El JS debe manejar el estado del proyecto activo y las transiciones
- Las imágenes deben tener una relación de aspecto consistente
- Commit: `be70779`

---

## [2026-06-01] Estética industrial HUD — sin border-radius, sin gradientes, sin glassmorphism

### Contexto
Tras el rediseño Wuthering Waves (sesión #5), el usuario rechazó las esquinas redondeadas, los gradientes y el glassmorphism. Solicitó explícitamente bordes rectos, colores sólidos, línea técnica tipo HUD industrial.

### Opciones consideradas
- **Industrial HUD:** Bordes rectos, diagonal wipe, esquineros L, colores sólidos, paneles conectados
- **Minimalista limpio:** Menos agresivo, pero no era lo que el usuario pedía
- **Retro/CRT:** Demasiado niche, no encaja con portfolio profesional

### Decisión
Industrial HUD con:
- Cero `border-radius` en todo el CSS
- Colores sólidos planos (sin `gradient`, sin `box-shadow`)
- `.section-wipe` con animación diagonal (clip-path polygon) para transiciones entre secciones
- `.card-bracket-*` (tl/tr/bl/br) con spans de 2 bordes cada uno para esquineros tipo L
- `.section-header-bar` como separador técnico (línea de 2px + label)
- Skills grid con `gap:0` y bordes compartidos entre celdas
- Videos intercambiados temporalmente para testing visual
- PROJECTS usa `bg` (hex sólido) en vez de `gradient`

### Consecuencias
- La paleta se simplifica: sin stops de gradiente, solo hex values
- El CSS se vuelve más predecible (colores sólidos no interpolan)
- Los esquineros requieren 4 spans por card → más markup en JS
- El wipe diagonal necesita clip-path con animación → polyfill no requerido (browsers modernos)
- Las transiciones son más rápidas visualmente (wipe en vez de fade)
- Commit: `166f789`

---

*Próxima entrada aquí tras la próxima decisión importante.*
