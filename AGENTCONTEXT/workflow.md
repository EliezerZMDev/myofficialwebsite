<!-- ============================================================
  INSTRUCCIONES PARA EL AGENTE IA
  ============================================================
  Propósito: Define el ciclo de trabajo operativo: cómo se hacen cambios, commits y reverts.
  Leer: Quinto. Implementa este ciclo en cada sesión.
  Actualizar: Cuando se mejore o cambie el proceso de trabajo.
  Formato: Markdown. Ciclo paso a paso.
  Relación: guidelines.md define las reglas. changelog.md registra los resultados.
  ============================================================ -->

# workflow.md — Ciclo de Trabajo

## Rol del agente IA

- Leer y entender el contexto (AGENTCONTEXT/)
- Sugerir e implementar cambios
- Hacer commits por cada cambio significativo
- Documentar todo en AGENTCONTEXT/
- Preguntar cuando algo no esté claro

## Rol del humano (usuario)

- Decidir prioridades y dirección
- Revisar y aprobar cambios
- Probar funcionalmente
- Proveer feedback y requerimientos

---

## Ciclo de trabajo estándar

### Fase 1: Inicio de sesión

```
1. Leer _index.md
2. Leer TODOS los archivos de AGENTCONTEXT/ en orden
3. Leer session.md → saber dónde se quedó la sesión anterior
4. Resumir al usuario
5. Actualizar session.md con fecha y objetivo de la sesión actual
```

### Fase 2: Ejecución de cambios

```
1. Preguntar al usuario: "¿Qué sigue?"
2. Entender el requerimiento
3. Hacer los cambios en el código
4. git add <archivos>
5. git commit -m "tipo: descripción clara"
6. Obtener el SHA: git rev-parse HEAD
7. Registrar en changelog.md con el SHA
8. Actualizar session.md (archivos modificados, progreso)
```

### Fase 3: Revertir cambios (cuando el usuario lo pida)

```
1. Preguntar: "¿Qué cambio quieres revertir? (describe o dame el SHA)"
2. Si da descripción: buscar en changelog.md la entrada que coincida
3. Si da SHA: usar directamente
4. Ejecutar: git revert <SHA>
5. Registrar el revert en changelog.md con el nuevo SHA
6. Actualizar session.md
```

### Fase 4: Cierre de sesión

```
1. Verificar que NO haya cambios sin commit (git status debe estar limpio)
2. Confirmar que changelog.md tenga todas las entradas con SHAs
3. Actualizar session.md con resumen final
4. Si hay decisiones nuevas → agregar a decisions.md
5. Si hay nuevo conocimiento → agregar a knowledge.md
6. Informar al usuario: "Sesión documentada en AGENTCONTEXT/."
```

---

## Notas importantes

- **No avances** a la siguiente fase sin completar la actual
- **Cada commit debe ser atómico**: un cambio lógico por commit
- **Los SHAs son obligatorios** en changelog.md — sin SHA no vale
- **Si el usuario dice "revisa AGENTCONTEXT/"** → ve directo a Fase 1

---

*Última actualización: 2026-06-01*
