# architecture.md — Estructura Técnica del Portfolio

## Estructura del proyecto
```
myofficialwebsite/
├── index.html              # Punto de entrada principal (5 secciones)
├── css/
│   └── main.css            # Estilos completos: variables, layout full-width, tema dark, animaciones
├── js/
│   └── main.js             # Toda la lógica: navbar, scroll, proyectos, detail panel, contacto
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
  - Flexbox para detail panel de proyectos (45% info + 55% imagen)
  - Grid para skills (auto-fill minmax)
  - Transiciones cubic-bezier para animaciones fluidas
  - Ocultar scrollbar: scrollbar-width: none + ::-webkit-scrollbar { display: none }
- **JavaScript ES6+**:
  - Sin módulos (un solo archivo main.js) — simplificado para portafolio pequeño
  - Intersection Observer para scroll animations
  - Detail panel con fixed positioning y transiciones slide
  - Labels flotantes en formulario de contacto
- **Posibles extensiones futuras**:
  - GSAP para animaciones más complejas
  - React/Vue si el portfolio crece significativamente

## Decisiones técnicas importantes
- **Layout full-width**: Aprovechar todo el espacio horizontal, sin contenedores max-width centrados
- **Tema dark**: Fondo oscuro (#0a0a0f) con acentos dorados (#c8a84e) inspirado en Wuthering Waves
- **Proyectos estilo lore**: Cards apiladas a la derecha, hover expand, click abre detail panel
- **Un solo JS file**: Consolidado en main.js para mantener simplicidad
- **Responsive**: Mobile-first con breakpoints en 480px, 768px, 1024px

## Flujo de datos e interacciones
```
Usuario → [Scroll]
         → Navbar actualiza estado activo (Intersection Observer)
         → Secciones hacen fade-in al entrar en viewport
         → Skill cards stagger animation
         
Usuario → [Hover en project card]
         → Card se expande (340px→520px) y muestra título
         
Usuario → [Click en project card]
         → Detail panel se abre (fixed, full-screen)
         → Info side hace slide-in desde izquierda
         → Image side hace fade-in desde derecha con scale
         → Close: click ×, click outside, o tecla Escape
         
Usuario → [Formulario contacto]
         → Labels flotantes se animan al escribir
         → Submit muestra feedback visual
```
