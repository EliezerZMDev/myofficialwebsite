<!-- ============================================================
  INSTRUCCIONES PARA EL AGENTE IA
  ============================================================
  Propósito: Historial de cambios del proyecto con SHAs de commits.
  Leer: Sexto. También consultar cuando el usuario pida revertir cambios.
  Actualizar: INMEDIATAMENTE DESPUÉS DE CADA COMMIT.
  Formato:
    ## [YYYY-MM-DD] — Sesión #[número]
    ### Commit: `sha`
    ### Mensaje: tipo: descripción
    ### Archivos: lista de archivos
    ### Detalle: qué se hizo y por qué
    ### Revertir: git revert <sha>
  Relación: Cada entrada corresponde a un commit. workflow.md describe el ciclo.
  ============================================================ -->

# changelog.md — Historial de Cambios

> **⚠️ CADA ENTRADA DEBE INCLUIR EL SHA DEL COMMIT.** Los SHAs permiten a futuros agentes IA revertir cambios exactos cuando el usuario lo solicite.

---

## [2026-06-01] — Sesión #1 (inicial)

### Commit: `28a0858`
### Mensaje: feat: portfolio inicial con tema dark, transiciones tipo presentación y proyectos estilo Regions
### Archivos: `index.html`, `css/main.css`, `js/main.js`
### Detalle:
- Creación del portfolio con estructura HTML semántica
- Tema dark con acentos dorados (`--accent: #c8a84e`)
- Transiciones tipo presentación (slide-show) entre secciones
- Secciones: Inicio, Sobre mí, Habilidades, Proyectos, Contacto
- Array de proyectos con datos de ejemplo
- Sin frameworks ni build tools — vanilla HTML/CSS/JS
### Revertir: `git revert 28a0858`

---

## [2026-06-01] — Sesión #2

### Commit: `be70779`
### Mensaje: feat: proyectos estilo Regions con 3 imágenes verticales, navegación por flechas y transiciones tipo presentación
### Archivos: `index.html`, `css/main.css`, `js/main.js`
### Detalle:
- Layout de proyectos estilo Regions (3 imágenes verticales por proyecto)
- Navegación por flechas izquierda/derecha entre proyectos
- Transiciones suaves al cambiar de proyecto
- Mejora visual de la sección de proyectos
### Revertir: `git revert be70779`

---

## [2026-06-01] — Sesión #3

### Commit: `89ca84a`
### Mensaje: feat: documentar AGENTCONTEXT/ con instrucciones IA, SHAs obligatorios y estructura de contexto
### Archivos:
- `AGENTCONTEXT/_index.md` (nuevo)
- `AGENTCONTEXT/project.md`
- `AGENTCONTEXT/architecture.md`
- `AGENTCONTEXT/guidelines.md`
- `AGENTCONTEXT/workflow.md`
- `AGENTCONTEXT/changelog.md`
- `AGENTCONTEXT/decisions.md`
- `AGENTCONTEXT/knowledge.md`
- `AGENTCONTEXT/session.md`
### Detalle:
- Creado `_index.md` como archivo de entrada obligatorio con orden de lectura
- Cada archivo ahora tiene un bloque de **instrucciones para el agente IA** al inicio (propósito, cuándo leer, cuándo actualizar, formato, relación)
- `project.md`: corregido stack (vanilla HTML/CSS/JS, no React), agregado commit de referencia
- `architecture.md`: poblado con árbol real, stack detallado, tabla de decisiones técnicas con commits, patrones y flujo de datos
- `guidelines.md`: sección de onboarding para agente sin contexto previo, reglas de commits obligatorios y revert workflow
- `workflow.md`: ciclo de 4 fases con pasos concretos (inicio, ejecución, revert, cierre)
- `changelog.md`: formato nuevo con SHA obligatorio por entrada + commits históricos registrados
- `decisions.md`: 3 ADRs poblados (dark theme, vanilla JS, Regions layout) con sus commits de referencia
- `knowledge.md`: secciones con ejemplos de qué registrar
- `session.md`: tracking de commits con SHA, checklist de cierre
- Los SHAs en changelog permiten a futuros agentes revertir cambios exactos
### Revertir: `git revert 89ca84a`

---

## [2026-06-01] — Sesión #4

### Commit: `2af1c1b`
### Mensaje: feat: portafolio ELIEZERDEV completo con diseño spec, hash-nav, tema dark/light y proyectos interactivos
### Archivos:
- `index.html` (reescrito)
- `css/main.css` (reescrito)
- `js/main.js` (reescrito)
- `AGENTCONTEXT/session.md`
- `ELIEZERDEV_Portafolio_DesignSpec.txt` (nuevo — spec del usuario)
### Detalle:
- Portfolio construido desde cero basado en  `ELIEZERDEV_Portafolio_DesignSpec.txt`
- **Hash-based navigation:** `pushState` al clickear nav, `popstate` para back/forward, el hash en URL cambia sin recargar página
- **Navbar glassmorphism:** sticky, blur, semitransparente, active link con indicador
- **Tema dark/light:** paleta completa (negro azulado/gris grafito/azul eléctrico/violeta — blanco grisáceo/azul profundo), toggle con iconos minimalistas, persiste en localStorage
- **Hero:** 100vh, left=texto+botones, right=visual dinámico (gradiente+grid+glow)
- **Proyectos:** 3 tarjetas verticales estilo Wuthering Waves gallery — hover expande una (flex 2.5), contrae las demás (flex 0.6), click abre detail overlay con animación panelIn
- **Habilidades:** grid de categorías con glassmorphism cards, hover elevate
- **Experiencia:** timeline vertical con dots y hover effect
- **Sobre mí:** split layout (foto placeholder + texto + topic tags)
- **Contacto:** email + formulario con mailto:
- **Footer:** brand + redes sociales (GitHub, LinkedIn, Instagram, Facebook)
- **Sin scrollbar visible** — scrollbar-width: none
- **Sin emojis** — iconos SVG minimalistas
- **Responsive:** mobile menu, layout adjustments para tablets y móviles
- **IntersectionObserver** para actualizar nav active y hash en scroll
- **Datos de proyectos** en array JS modificable (PROJECTS)
### Revertir: `git revert 2af1c1b`

---

*Próxima entrada aquí tras el siguiente commit.*
