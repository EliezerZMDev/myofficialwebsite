<!-- ============================================================
  INSTRUCCIONES PARA EL AGENTE IA
  ============================================================
  Propósito: Define las reglas de comportamiento del agente IA.
  Leer: Cuarto. MUY IMPORTANTE — debes cumplir estas reglas SIEMPRE.
  Actualizar: Cuando se acuerden nuevas reglas con el usuario.
  Formato: Markdown. Secciones: Onboarding, Sesión, Cierre, Commits, Reverts.
  Relación: workflow.md ejecuta el ciclo. session.md registra el estado.
  ============================================================ -->

# guidelines.md — Reglas de Comportamiento para el Agente IA

> **⚠️ REGLA FUNDAMENTAL:** Cuando inicies una sesión SIN contexto previo (contexto perdido, tokens agotados, cambio de IA, reinicio), debes leer TODOS los archivos de `AGENTCONTEXT/` en el orden de `_index.md` antes de hacer cualquier otra cosa.

---

## 1. Onboarding (sesión sin contexto previo)

Al comenzar una sesión donde no tienes memoria de conversaciones anteriores:

1. Lee `_index.md` (sabrás el orden de lectura)
2. Lee TODOS los archivos de AGENTCONTEXT/ en orden
3. Resume al usuario:
   > "Este proyecto es [project.md:¿Qué construimos?]. Stack: [project.md:Stack]. Estado: [project.md:Estado actual]. Último commit: [changelog.md:última entrada]."
4. Pregunta: "¿Por dónde empezamos?"

## 2. Durante la sesión

- Mantén `session.md` actualizado en tiempo real (cada cambio significativo)
- Pregunta cuando falte información para decidir — no asumas
- Cada cambio en el código DEBE tener su propio commit
- No hagas múltiples cambios no relacionados en un solo commit

## 3. Commits obligatorios

- **Cada cambio significativo** → `git add` + `git commit -m "tipo: descripción"`
- Tipos de commit: `feat:`, `fix:`, `refactor:`, `docs:`, `style:`, `chore:`
- El mensaje debe ser descriptivo en español o inglés (consistente con el proyecto)
- **Inmediatamente después del commit**, registra la entrada en `changelog.md` con el SHA
- Para obtener el SHA: `git rev-parse HEAD` (o `git log --oneline -1`)

## 4. Reverts (cómo deshacer cambios)

Cuando el usuario pida revertir un cambio anterior:

1. Busca en `changelog.md` el SHA del commit que contiene el cambio
2. Si es el commit más reciente: `git revert HEAD` o `git reset --soft HEAD~1`
3. Si es un commit anterior: `git revert <SHA>`
4. Registra el revert en `changelog.md` con el SHA del nuevo commit

## 5. Al cerrar la sesión

1. Asegúrate de que todos los cambios tengan commit
2. Verifica que `changelog.md` tenga todas las entradas con sus SHAs
3. Actualiza `session.md` con resumen final
4. Si hay decisiones nuevas, agrégalas a `decisions.md`
5. Dile al usuario:
   > "Sesión documentada en AGENTCONTEXT/. En la próxima, dime 'revisa AGENTCONTEXT/' y retomo."

## Reglas generales

- No modifiques archivos de AGENTCONTEXT/ sin propósito
- No sobreescribas decisiones del usuario
- Pregunta antes de hacer cambios estructurales
- AGENTCONTEXT/ es la fuente de verdad del proyecto
- Prefiere editar archivos existentes sobre crear nuevos

---

*Última actualización: 2026-06-01*
