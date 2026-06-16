<!-- ============================================================
  INSTRUCCIONES PARA EL AGENTE IA
  ============================================================
  Propósito: Conocimiento técnico que NO es derivable leyendo el código actual.
  Leer: Octavo. Consultar cuando enfrentes un problema técnico o un workaround.
  Actualizar: Solo cuando descubras algo genuinamente no obvio (bugs, decisiones ocultas, trucos).

  REGLA DE PODA — antes de añadir algo, pregúntate:
    ¿Puede un agente derivar esto leyendo el código hoy?   → Si sí: NO va aquí
    ¿Es un workaround o comportamiento inesperado?         → Sí va aquí
    ¿Es una convención que no está escrita en el código?   → Sí va aquí
    ¿Es un dato que envejece rápido (conteos, tamaños)?   → NO va aquí

  ELIMINAR cuando:
    - La información ya está documentada en el código mismo
    - El workaround fue corregido en un commit posterior
    - La sección CONTEXTUAL lleva más de 2 sesiones sin verificarse

  Secciones:
    PERMANENTE — convenciones, workarounds, recursos. Envejece lento.
    CONTEXTUAL — estado actual de partes del proyecto. Envejece rápido. Fecha de verificación obligatoria.
  ============================================================ -->

# knowledge.md — Conocimiento Acumulado

---

## PERMANENTE — Convenciones y decisiones no escritas en el código

### Diseño visual: reglas que no están en el CSS como comentarios

- **Sin border-radius** en ninguna parte del diseño — es una decisión estética consciente, no un olvido
- **Sin gradientes** — eliminados en 2026-06-16. Cualquier gradiente que encuentres es un residuo a limpiar
- **Sin backdrop-filter en la mayoría de elementos** — era para glass sobre video; ya no aplica
- **Dualidad de color:** dark = azul eléctrico (`#2979ff`), light = rojo suave (`#c0392b`). Son intencionalmente diferentes, no solo un toggle de luminosidad

### Convenciones JS que no son obvias

- IIFE para encapsulamiento: `;(function () { 'use strict' ... })()`
- Helpers internos `q()` y `qa()` equivalen a `querySelector` / `querySelectorAll`
- `FORM_ENDPOINT`: si contiene `'YOUR_FORMSPREE_ID'` el formulario cae a fallback `mailto:` automáticamente — es intencionado para que funcione antes de configurar Formspree
- **Ya no hay gestión de video** — si encuentras llamadas a `.play()` / `.pause()` en el JS, son residuos

### SVG Skill Tree — detalles que no se leen fácil en el código

- `viewBox="0 0 100 100" preserveAspectRatio="none"` → las coordenadas x/y de los nodos son directamente porcentajes CSS
- `vector-effect="non-scaling-stroke"` en todos los paths — sin esto el stroke se distorsiona al redimensionar
- Ramas bloqueadas: `stroke-dasharray: 4 3`, opacity 0.4 — no es un bug, es el estado "locked"
- `iconType: 'stroke'` = Lucide (outline), `iconType: 'fill'` = Simple Icons (logo de marca)

---

## PERMANENTE — Workarounds

- **`clip-path` en hijos de flex:** No usar `clip-path` en elementos que necesitan mostrar overflow (hijos, tooltips, dropdowns) — el clip los corta. Usar `::before/::after` para diagonales decorativas.
- **Unsplash premium:** Fotos de `plus.unsplash.com` requieren suscripción. Usar solo las de `images.unsplash.com`. Las de plus dan 403 o imagen degradada sin login.
- **Git LF/CRLF en Windows:** Los warnings de LF→CRLF en commits son normales en Windows, no indican error.

---

## PERMANENTE — Recursos externos

- Lucide icons SVG paths: https://lucide.dev/icons/
- Simple Icons SVG paths: https://simpleicons.org/
- CSS clip-path generator: https://bennettfeely.com/clippy/
- Formspree (formulario gratis): https://formspree.io

---

## CONTEXTUAL — Estado verificado: 2026-06-16

> Verificar en cada sesión. Si algo cambió, actualizar o eliminar la entrada.

### Paleta de tokens CSS activos

**Dark mode (`:root`):**
```css
--bg-primary: #13151c;
--bg-secondary: #1a1d27;
--accent: #2979ff;
--accent-hover: #4a8eff;
--hud-line: rgba(41, 121, 255, 0.35);
--hud-panel: rgba(255, 255, 255, 0.05);
--text-primary: #f0f2f5;
--text-secondary: #8892a4;
--text-muted: #4a5568;
```

**Light mode (`[data-theme="light"]`):**
```css
--bg-primary: #f2f0ec;
--bg-secondary: #e8e4dc;
--accent: #c0392b;
--accent-hover: #e74c3c;
--hud-line: rgba(192, 57, 43, 0.35);
--hud-panel: rgba(0, 0, 0, 0.04);
--text-primary: #111318;
--text-secondary: #4a5263;
```

### Imágenes Unsplash de proyectos (URLs base — añadir `?w=800&q=70&fit=crop&auto=format`)

| Proyecto | URL base |
|---|---|
| Corazón Azul VH | `https://images.unsplash.com/photo-1453749024858-4bca89bd9edc` |
| Artista Musical | `https://images.unsplash.com/photo-1574232861722-d1e837e4b0f0` |
| Ecommerce | `https://images.unsplash.com/photo-1658297063569-162817482fb6` |
| Dashboard Analytics | `https://images.unsplash.com/photo-1551288049-bebda4e38f71` |
| API RESTful | `https://images.unsplash.com/photo-1760670399462-f5e479452c27` |

### Pendiente de configurar

- `FORM_ENDPOINT` en `js/main.js` (buscar `YOUR_FORMSPREE_ID`) — crear cuenta gratis en formspree.io

### Deploy activo

- **URL:** https://eliezerzmdev.github.io/myofficialwebsite/
- **Repo:** https://github.com/EliezerZMDev/myofficialwebsite
- **Branch:** `master` → raíz `/`
- `src/videos/` y `src/images/` eliminadas del repo y del disco (2026-06-16)

---

*Última actualización: 2026-06-16*
