<!-- ============================================================
  INSTRUCCIONES PARA EL AGENTE IA
  ============================================================
  Propósito: Archivo de entrada. Primera lectura obligatoria.
  Leer: AL INICIO DE CADA SESIÓN, antes que cualquier otro archivo.
  Actualizar: Raramente. Solo si cambia la estructura de AGENTCONTEXT/.
  Formato: Markdown. Mantener secciones claras y orden de lectura.
  Relación: Referencia a TODOS los archivos de AGENTCONTEXT/.
  ============================================================ -->

# AGENTCONTEXT — Centro de Contexto del Proyecto

> Lee este archivo PRIMERO. Contiene el orden de lectura obligatorio y el propósito de cada archivo.

## ¿Qué es esto?

`AGENTCONTEXT/` es la **memoria del proyecto**. Aquí se almacena todo lo que un agente IA necesita saber para trabajar sin perder contexto entre sesiones. Cuando se acaban los tokens, se reinicia el contexto, o cambias de IA, simplemente dile:

> "Revisa AGENTCONTEXT/ y ponte al día."

## Orden de lectura obligatorio

Cada vez que inicies una sesión sin contexto previo, lee LOS 9 ARCHIVOS en este orden:

| Orden | Archivo | Propósito |
|-------|---------|-----------|
| 1 | `_index.md` | **← Este archivo.** Te dice cómo leer el resto. |
| 2 | `project.md` | Visión, objetivos, stack, estado actual del proyecto. |
| 3 | `architecture.md` | Estructura técnica, árbol de directorios, patrones. |
| 4 | `guidelines.md` | **Reglas de comportamiento.** Léelo y SÍGUELO. |
| 5 | `workflow.md` | Ciclo operativo: cómo hacer cambios, commits, reverts. |
| 6 | `changelog.md` | Historial de cambios con SHAs de commits. |
| 7 | `decisions.md` | ADRs (Architecture Decision Records). |
| 8 | `knowledge.md` | Conocimiento acumulado, workarounds, recursos. |
| 9 | `session.md` | Estado VIVO de la sesión actual. Se actualiza en tiempo real. |

## Onboarding rápido

Después de leer TODOS los archivos, debes:

1. **Resumir al usuario:**
   > "Este proyecto es [project.md:¿Qué construimos?]. El stack es [project.md:Stack]. Estamos en [project.md:Estado actual]. El último commit es [changelog.md:última entrada]. La sesión anterior dejó [session.md:resumen]."

2. **Preguntar:**
   > "¿Por dónde empezamos?"

3. **Actualizar `session.md`** con la fecha, objetivo de la sesión y los archivos que planeas tocar.

## Notas importantes

- **No modifiques** `AGENTCONTEXT/` sin propósito. Cada cambio aquí debe tener una razón clara.
- **Siempre haz commit** después de cada cambio significativo, y registra el SHA en `changelog.md`.
- **Para revertir cambios:** busca el SHA en `changelog.md` y usa `git revert <SHA>` o `git reset <SHA>`.

---

*Documento mantenido por agentes IA. Última actualización: 2026-06-01.*
