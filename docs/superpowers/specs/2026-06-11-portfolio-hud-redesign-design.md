# Diseño: Rediseño HUD del portfolio ELIEZERDEV

**Fecha:** 2026-06-11
**Estado:** Aprobado (diseño) — pendiente revisión de spec

## Contexto

Portfolio personal vanilla HTML/CSS/JS (sin frameworks, sin build tools). El sitio actual funciona pero el usuario quiere reconstruirlo desde cero con una organización del contenido más atractiva y poco convencional — explícitamente evitando el "típico diseño de página web hecha con IA" (todo centrado, simétrico, apilado).

Se conserva la identidad visual ya establecida (dark theme, acento azul eléctrico `#2979ff`, sin border-radius, glassmorphism, clip-paths angulares, videos de fondo) y el formato de navegación tipo presentación a pantalla completa.

**Decisión de dirección (acordada en brainstorming):**
- Navegación: pantallas completas tipo OS/presentación (se mantiene).
- Estética: **interfaz de videojuego AAA / HUD**.
- Videos: nítidos como protagonistas, con paneles de cristal flotando encima (blur localizado).
- Contenido: mismas 6 secciones y mismos datos. Solo cambia la presentación.
- Constraint: vanilla JS, sin build (regla del proyecto, ver `AGENTCONTEXT/project.md`).
- Patrón de layout: **A+B** = marco de telemetría persistente (A) + composiciones asimétricas "Command Deck" por sección (B), con número de sección gigante fantasma tomado de la idea C como acento.

## Objetivo / criterios de éxito

1. El sitio se siente como una interfaz de videojuego AAA en vivo, no como un template.
2. Cada sección tiene una distribución espacial distinta (asimétrica), nunca el mismo molde repetido.
3. Los videos se ven nítidos; el contenido vive en paneles de cristal con blur localizado.
4. Se conserva toda la funcionalidad actual: navegación wheel/teclado/nav/hash, tema dark/light, detalle de proyectos, formulario mailto.
5. Responsive funcional en móvil/tablet.
6. Cero dependencias nuevas, sin build.

## Arquitectura

### Estructura de archivos
```
index.html      → marco HUD global + 6 secciones semánticas
css/main.css    → reescrito completo
js/main.js      → reescrito en módulos IIFE
src/videos/     → reutiliza mp4 existentes (fondoweb1-5.mp4, fondo6.mp4)
```

### Módulos JS (IIFE, encapsulados)
- **Navegación de secciones:** wheel, flechas teclado, clicks nav/riel, hash `pushState`/`popstate`. Reutiliza la lógica `goToSection` actual.
- **Render de datos:** `PROJECTS`, `SKILLS`, `CONTACT_CELLS` (mismos arrays actuales, solo cambia el markup generado).
- **Telemetría del marco:** anima coordenadas/status/progreso de la barra inferior y el número activo del riel.
- **Tema dark/light:** `localStorage` (`eliezertheme`), respeta `prefers-color-scheme`.
- **Panel detalle de proyectos:** overlay full-screen con botón "◀ VOLVER" grande.
- **Formulario:** `mailto:` con campos codificados.
- **Hover de proyectos:** flex-expand lateral (patrón ya implementado y aprobado).

## Componentes

### 1. Marco de Telemetría global (chrome persistente)
Vive fuera de las secciones; nunca se desmonta. Solo cambian indicadores al navegar.

- **Esquinas:** corchetes angulares dibujados con bordes (sin border-radius).
- **Top bar:** logo con glifo hexagonal + nav horizontal compacta (tabs de sistema) + toggle de tema.
- **Riel izquierdo:** índice vertical de secciones; número activo agrandado; línea de escáner animada; click navega.
- **Bottom status bar:** telemetría decorativa — status (`SYS·ONLINE`), coordenadas falsas (LAT/LON), barra de progreso (= sección actual), año, hint de scroll. Detalles en fuente monoespaciada (`ui-monospace`).

### 2. Sistema visual (tokens)
- Paleta intacta: `--bg-primary #03050a`, `--accent #2979ff`, `--text-primary #f0f2f5`, `--text-secondary #8892a4`, `--text-muted #4a5568`. Variantes light theme conservadas.
- **Sin border-radius en ningún elemento.** Esquinas rectas o recortadas con `clip-path`.
- Tipografía: Inter (existente) + detalles monoespaciados para telemetría/etiquetas técnicas (contraste tipográfico HUD).
- **Video-tras-cristal:** `<video>` nítido al 100%; paneles encima con `backdrop-filter: blur()` localizado + borde accent tenue + fondo `rgba(3,5,10,0.4)`.
- Acentos: líneas de escáner / grid sutil + número de sección gigante fantasma sangrando fuera del borde.

### 3. Composiciones por sección (asimétricas)

Todas heredan el marco. Misma gramática (número grande, etiquetas técnicas, paneles de cristal, costuras diagonales), distinta distribución espacial.

- **① INICIO:** nombre `ELIEZERDEV` en bloque gigante a la izquierda; módulos de acción (Ver proyectos / Contactar) apilados a la derecha con costura diagonal; badge de estado HUD "◉ DISPONIBLE PARA PROYECTOS". Número fantasma "00".
- **② PROYECTOS:** 5 cards trapezoidales (clip-path píxeles fijos + `margin-left` negativo, ya implementado) en fila, hover = flex-expand lateral sin huecos, click = panel detalle full-screen con "◀ VOLVER" grande. Cada card con etiquetas de telemetría (índice, año, stack mini).
- **③ HABILIDADES:** grid limpio 4 columnas (7 skills, bug de rowLayout ya corregido) reinterpretado como "loadout/árbol de sistema"; encabezados tipo "MÓDULO 01"; líneas conectoras finas entre celdas; hover = glow azul en título; click = despliega items.
- **④ EXPERIENCIA:** 3 paneles gigantes full-height con glassmorphism (ya implementado) enmarcados como "registros de misión" (LOG_001/002/003); video difuminado detrás; click = expande aprendizajes.
- **⑤ SOBRE MÍ:** panel focal ~65% con la bio (jerarquía negritas/tenue ya aplicada) + módulo satélite "ficha de personaje" (Ing. Sistemas, México, ES/EN). Costura diagonal entre ambos.
- **⑥ CONTACTO:** lista de "canales" a la izquierda (celdas de contacto) + formulario estilo terminal a la derecha (prompts `>`), con botón "ENVIAR ▸".

## Motion / interacción

- **Transición entre secciones:** contenido interno sale con desplazamiento angular rápido (clip-path + translate, ~350ms); video hace crossfade; marco fijo (solo cambia número de riel y barra de progreso).
- **Entrada de paneles:** ensamblaje con barrido de línea de escáner + fade escalonado (stagger ~60ms).
- **Hover:** brillo accent en bordes + líneas de escáner intensificadas. Sutil.
- **Telemetría viva:** coordenadas/status con parpadeo ligero (efecto sistema en vivo).
- **Boot intro (opcional):** secuencia "SYSTEM ONLINE" al cargar (~1s), fácil de desactivar.
- **`prefers-reduced-motion`:** desactiva parpadeos, escáneres y animaciones de ensamblaje; deja fades simples.

## Responsive

- Móvil/tablet: el marco se simplifica — riel y telemetría se colapsan o reducen.
- Composiciones asimétricas → apiladas verticales.
- Clip-paths angulares desactivados en breakpoints pequeños (patrón ya en uso).
- Breakpoints existentes: 1024px, 768px, 480px.

## Accesibilidad

- Foco visible en elementos interactivos.
- `aria-label`s en botones de icono y navegación.
- Contraste suficiente texto/fondo (paneles oscurecen el video bajo el contenido).
- `prefers-reduced-motion` respetado.

## Flujo de trabajo (reglas AGENTCONTEXT)

Reescritura grande → commits atómicos por bloque:
1. Marco HUD + sistema de tokens
2. Cada sección (una por commit)
3. Motion + telemetría
4. Responsive + accesibilidad

Registrar cada commit en `AGENTCONTEXT/changelog.md` con su SHA. Actualizar `session.md` y `decisions.md` (nuevo ADR: rediseño HUD).

## Fuera de alcance (YAGNI)

- No se cambian los datos de proyectos/skills/contacto.
- No se añade backend ni envío real de formularios (sigue siendo `mailto:`).
- No se añaden dependencias, frameworks ni build tools.
- No se cambia el formato de navegación (sigue siendo slide-show full-screen).

## Verificación

Abrir `index.html` en navegador y comprobar:
1. Marco HUD visible y persistente; telemetría animada; riel marca sección activa.
2. Navegación funciona: wheel, flechas, clicks nav/riel, hash en URL.
3. Cada sección con su layout asimétrico; video nítido detrás de paneles con blur.
4. Proyectos: hover flex-expand sin huecos; click abre detalle con "◀ VOLVER".
5. Habilidades ordenadas; hover glow; click despliega items.
6. Experiencia: 3 paneles full-height con blur.
7. Sobre mí: focal + satélite, bio con jerarquía.
8. Contacto: canales + formulario terminal; mailto funciona.
9. Tema dark/light persiste.
10. Responsive en móvil; `prefers-reduced-motion` desactiva parpadeos.
