# Instrucciones para Codex — Entre Silencios

## Contexto del proyecto

- Aplicación web con React, React Router y TypeScript; el repositorio incluye configuración de Vite, Supabase y Vercel.
- Comprobar siempre `package.json`, la configuración y los archivos implicados antes de asumir versiones, comandos o arquitectura.
- Seguir las convenciones existentes en `app/routes`, `app/components`, `app/services`, `app/lib`, `app/config`, `app/types` y `app/utils` cuando correspondan.
- Responder a Marcos en español, explicando las decisiones técnicas con claridad y sin jerga innecesaria.

## Alcance y forma de trabajar

1. Entender la petición, inspeccionar el código relacionado y proponer el cambio más pequeño que resuelva el problema.
2. Respetar modificaciones preexistentes y no tocar archivos ajenos a la tarea.
3. Si se solicita **revisión, diagnóstico o propuesta**, no editar archivos hasta recibir autorización expresa.
4. Si se solicita implementar un cambio, modificar solo lo necesario y revisar el resultado antes de terminar.
5. Pedir confirmación antes de refactorizaciones amplias, nuevas dependencias o cambios con consecuencias difíciles de revertir.

## Compatibilidad y calidad

- Mantener las rutas, las interfaces públicas, las respuestas de API, los tipos compartidos y los contratos usados por otros módulos.
- Preservar el comportamiento, el diseño visible, la experiencia móvil, la accesibilidad y el SEO salvo que la tarea indique lo contrario.
- No eliminar validaciones, comprobaciones de errores, restricciones de acceso ni defensas de seguridad para reducir líneas de código.
- Preferir código legible y coherente con el proyecto; evitar duplicación evidente y abstracciones sin utilidad clara.
- No cambiar textos visibles para los usuarios o flujos de formularios sin que la tarea lo requiera.

## Seguridad y operaciones delicadas

- Nunca revelar, copiar a respuestas ni introducir en Git secretos, tokens, credenciales o valores de `.env`.
- No modificar autenticación, permisos, políticas RLS de Supabase, bases de datos, migraciones ni configuración de seguridad sin una petición específica y una revisión de consecuencias.
- No publicar en Vercel, ejecutar migraciones, borrar datos, hacer `git commit` o `git push` sin una petición expresa.
- No ejecutar pruebas de carga (por ejemplo, Grafana k6) contra webs desplegadas sin autorización explícita.
- No desactivar medidas de seguridad ni solicitar permisos de acceso más amplios solo por comodidad.

## Code Simplifier

- Utilizar la skill `code-simplifier-sst` como revisión final después de cambios de código significativos.
- Aplicarla únicamente al código afectado; simplificar sin alterar comportamiento, seguridad ni contratos públicos.
- Si la tarea es solo revisar o evaluar la calidad del código, informar de hallazgos y sugerencias **sin editar**.
- Ante una simplificación dudosa, explicar el riesgo y pedir permiso antes de aplicarla.

## Comprobaciones y entrega

- Consultar los scripts reales de `package.json` y ejecutar las comprobaciones relevantes disponibles: tipos, lint, pruebas y/o compilación, según el alcance de la modificación.
- Revisar el diff para detectar cambios involuntarios. No afirmar que las pruebas pasan si no se han ejecutado.
- Al terminar, resumir qué se ha cambiado, qué se ha conservado, qué se ha comprobado y qué queda pendiente.
