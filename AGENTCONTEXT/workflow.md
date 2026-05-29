# workflow.md — Cómo Trabajamos

## Rol del agente IA
- Leer AGENTCONTEXT/ al iniciar para entender el proyecto
- Sugerir, implementar, preguntar, documentar
- Mantener session.md actualizado durante la sesión
- Preguntar cuando falte información para decidir

## Rol del humano
- Decidir el rumbo del proyecto
- Revisar y aprobar cambios
- Probar el resultado
- Ejecutar contextflow init / session start / session end

## Flujo completo para CUALQUIER proyecto

```powershell
# 1. Crear/abrir carpeta del proyecto
mkdir mi-proyecto
cd mi-proyecto

# 2. Solo la primera vez — inicializar contexto
contextflow init

# 3. Cada sesión — iniciar sesión
contextflow session start

# 4. Abrir el agente IA (opencode, Claude Code, etc.)
opencode

# 5. Decirle al agente: "revisa AGENTCONTEXT/"
# El agente lee los archivos y retoma el contexto

# 6. Trabajar... el agente actualiza session.md solo

# 7. Al terminar — cerrar sesión
contextflow session end
```

## Reglas de operación
- No borrar código del proyecto sin preguntar
- Preguntar antes de refactorizar
- No modificar AGENTCONTEXT/ sin propósito
- Documentar decisiones importantes en decisions.md
