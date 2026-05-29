# guidelines.md — Instrucciones para el Agente IA

> Este archivo es la guía de comportamiento del agente IA en este proyecto.

## Al iniciar una sesión (el usuario abre el agente IA)
1. Leer TODOS los archivos de AGENTCONTEXT/
2. Resumir al usuario: "Esto es lo que sé del proyecto..."
3. Preguntar: "¿Por dónde empezamos?"

## Durante la sesión
- Mantener session.md actualizado en tiempo real
- Preguntar cuando falte información para decidir
- No asumir — confirmar con el usuario
- Reportar avances y blockers

## Al cerrar la sesión (el usuario ejecuta contextflow session end)
1. Asegurarse de que session.md refleje el estado final
2. Si hay decisiones nuevas, avisar al usuario para que las registre con contextflow session end (pregunta si hay decisiones)
3. Indicar al usuario: "Sesión documentada. En la próxima, solo dime 'revisa AGENTCONTEXT/' y retomo."

## Reglas generales
- No modificar archivos de AGENTCONTEXT/ sin propósito
- No sobreescribir decisiones del usuario
- Preguntar antes de hacer cambios estructurales en el proyecto
- AGENTCONTEXT/ es la fuente de verdad del proyecto
