# architecture.md — Estructura Técnica del Portfolio

## Estructura del proyecto
```
myofficialwebsite/
├── index.html              # Punto de entrada principal (5 secciones)
├── css/
│   └── main.css            # Estilos completos: variables, layout full-width, tema dark, animaciones
├── js/
│   └── main.js             # Toda la lógica: navbar, wheel navigation, proyectos, detail panel, contacto
├── assets/
│   ├── images/             # Screenshots de proyectos, fotos personales
│   └── fonts/              # Tipografías personalizadas si se usan
└── AGENTCONTEXT/           # Contexto persistente para IA-humanía
```

## Stack detallado
- **HTML5**: Uso semántico de elementos (section, nav, main, form)
- **CSS3**: 
  - Variables CSS (:root) para tema dark (#0a0a0f fondo, #c8a84e acentos dorados)
  - Layout full-width con padding 5vw (sin contenedores centrados)
  - Flexbox para detail panel de proyectos (50% info + 50% imagen)
  - Grid para skills (auto-fill minmax)
  - Transiciones cubic-bezier para animaciones fluidas
  - Ocultar scrollbar: scrollbar-width: none + ::-webkit-scrollbar { display: none }
- **JavaScript ES6+**:
  - Sin módulos (un solo archivo main.js) — simplificado para portafolio pequeño
  - Wheel event listener para transiciones tipo presentación entre secciones
  - Touch event listener para swipe navigation en mobile
  - Detail panel con fixed positioning y transiciones slide/fade
  - Labels flotantes en formulario de contacto
- **Posibles extensiones futuras**:
  - GSAP para animaciones más complejas
  - React/Vue si el portfolio crece significativamente

## Decisiones técnicas importantes
- **Transiciones tipo presentación**: En lugar de scroll natural, las secciones usan position absolute con fade-in/fade-out al cambiar (efecto diapositiva)
- **Layout full-width**: Aprovechar todo el espacio horizontal, sin contenedores max-width centrados
- **Tema dark**: Fondo oscuro (#0a0a0f) con acentos dorados (#c8a84e) inspirado en Wuthering Waves
- **Proyectos estilo Regions**: Imágenes apiladas horizontalmente con gap negativo, central más grande, click abre panel lateral
- **Un solo JS file**: Consolidado en main.js para mantener simplicidad
- **Responsive**: Mobile-first con breakpoints en 480px, 768px, 1024px que ajustan tamaños y espaciados

## Flujo de datos e interacciones
```
Usuario → [Gira rueda del mouse]
         → wheel event previene scroll nativo
         → determina dirección (deltaY > 0 = siguiente, < 0 = anterior)
         → llama a goToSection() con índice calculado
         → sección actual: remove class 'active' (fade-out)
         → nueva sección: add class 'active' (fade-in)
         → actualiza navbar link activo
         
Usuario → [Swipe en mobile]
         → touchstart/touchend detecta dirección
         → mismo flujo que wheel event
         
Usuario → [Click en nav link]
         → previene comportamiento default
         → llama a goToSection() con índice del enlace
         → misma animación de transición
         
Usuario → [Hover en project card]
         → card img: scale(1.05) + brightness increase
         → card overlay: opacity transition to 1
         
Usuario → [Click en project card]
         → detail panel: add class 'active' (fade-in)
         → body: overflow hidden (prevent scroll detrás)
         → actualiza título, descripción, tags, stats, enlaces
         
Usuario → [Click × en detail panel / click fuera / Escape]
         → detail panel: remove class 'active' (fade-out)
         → body: overflow restaurado
         
Usuario → [Formulario contacto]
         → input focus: label se mueve arriba y cambia color
         → input blur: label vuelve si está vacío
         → submit: feedback visual + reset después de 2s
```
