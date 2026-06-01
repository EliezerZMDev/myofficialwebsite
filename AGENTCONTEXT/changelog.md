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

*Próxima entrada aquí tras el siguiente commit.*
