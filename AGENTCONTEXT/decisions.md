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

## [2026-06-16] Eliminar videos de fondo — colores sólidos

### Contexto
El portfolio tenía 6 videos de fondo (`<video>`) que hacían la página pesada y complicaban el mantenimiento. El usuario quería quitar videos y gradientes para un diseño más limpio y nítido.

### Opciones consideradas
- **Colores sólidos con gradientes sutiles:** Más suave visualmente, pero el usuario pidió explícitamente sin gradientes
- **Colores completamente planos:** Limpio pero quizá aburrido — el usuario pidió algún elemento de diseño
- **Colores sólidos + elemento decorativo puntual:** Línea horizontal de acento — limpio, con personalidad

### Decisión
Colores sólidos sin gradientes. Una línea decorativa horizontal de 2px en `--accent` sobre el encabezado de cada sección (`.section-content::before`) como único elemento de diseño no-plano.

### Consecuencias
- Página carga más rápido (sin 6 videos de video)
- CSS más simple y mantenible (sin `backdrop-filter` en la mayoría de elementos)
- `src/videos/` puede eliminarse para liberar espacio en el repo
- Commits: `4f379c2`, `78af328`, `dd68a1f`

---

## [2026-06-16] Dualidad de color dark/light (azul vs. rojo)

### Contexto
Con la decisión de usar colores sólidos, se necesitaba una paleta concreta. El usuario quería dark mode y light mode con personalidad. Su color favorito es el azul, pero también le gustaba la idea de rojo para el modo claro.

### Opciones consideradas
- **Ambos modos con azul:** Consistente pero sin contraste de personalidad entre temas
- **Ambos modos con rojo:** Sin el azul favorito del usuario
- **Dark=azul / Light=rojo:** Dualidad, cada modo tiene su propia identidad de color

### Decisión
Dark mode con `--accent: #2979ff` (azul eléctrico) sobre fondo `#13151c` (negro grisáceo). Light mode con `--accent: #c0392b` (rojo suave) sobre fondo `#f2f0ec` (blanco cremoso). El usuario aprobó esta "dualidad" explícitamente.

### Consecuencias
- Todo el CSS usa `var(--accent)` / `var(--hud-line)` — el color cambia automáticamente al cambiar tema
- Los marcos HUD, la línea decorativa, los bordes activos, las partículas — todo sigue al tema
- Light mode se siente como un tema distinto, no solo "el mismo con fondo blanco"
- Commit: `940f7a1`

---

## [2026-06-16] Sección "Sobre mí" — split diagonal foto/contenido

### Contexto
La sección "Sobre mí" tenía un placeholder de foto y bio genérica. El usuario aportó su foto real (`src/me.png`) y quería una presentación con más personalidad. Se iteró sobre varias opciones de layout.

### Opciones consideradas
- **Avatar pequeño + bio completa + grid de 6 stats:** informativa, pero cargada y con la foto minimizada
- **Split diagonal foto/contenido (opción 3):** foto grande en panel diagonal, contenido con headline y meta inline — más visual y coherente con la estética de diagonales del resto del sitio
- **Foto centrada tradicional:** segura pero sin personalidad

### Decisión
Split diagonal (opción 3): la foto llena un panel diagonal (`.about-photo` con `position: absolute`) y el contenido va al lado con headline y metadatos inline. Coherente con las diagonales usadas en hero y proyectos.

### Consecuencias
- `.about-photo` requiere `position: absolute` para llenar el panel diagonal sin dejar huecos
- La foto real `src/me.png` (~1.8 MB) vive en el repo — único asset binario grande restante
- Commits: `c047ff5`, `81481f3`, `51ca561`, `51439b7`

---

## [2026-07-07] Hero dial circular + Experiencia timeline + limpieza de HUD

### Contexto
El usuario consideró innecesarios varios elementos "de relleno" tipo HUD de videojuego: la ventana de terminal animada del hero, la barra de escaneo vertical (scanlines) de las secciones, y la barra inferior de telemetría falsa (SYS·ONLINE, coordenadas, fecha, progreso). Además, la sección de Experiencia (3 columnas altas) se veía vacía.

### Opciones consideradas
- **Hero:** botones apilados grandes / botones con índice+subtítulo / **dial circular partido** con expansión en hover → el usuario eligió el dial circular partido en vertical.
- **Experiencia:** filas numeradas / **timeline horizontal conectada** / 3 paneles con número marca de agua → el usuario eligió la timeline horizontal.
- **Barra inferior:** conservar contador+hint / **eliminar completa** → el usuario eligió eliminarla completa.

### Decisión
- Hero: círculo partido en vertical, cada mitad un botón; hover expande la mitad hasta rellenar el círculo completo, con subtítulo y flecha. Fallback móvil a 2 botones apilados.
- Experiencia: timeline horizontal con nodos numerados (01/02/03) conectados por línea de acento; sin `LOG_00x` ni fecha.
- Se eliminan scanlines y la barra inferior HUD por completo (se conserva `.hud-led`, compartida con el badge y el boot; y el `hud-rail` lateral).

### Consecuencias
- Menos "ruido" visual tipo HUD; la página se siente más limpia y enfocada.
- El dial es el elemento distintivo del hero; usa `border-radius` (excepción consciente a la regla "sin border-radius", igual que los nodos de la timeline).
- Se eliminó JS de telemetría y de la terminal (`updateTelemetry`, `initTelemetryFlicker`, `initHeroTerminal`).
- Commits: `18ffaff`, `4436fad`, `dd3031f`, `8e2b590`

---

*Próxima entrada aquí tras la próxima decisión importante.*
