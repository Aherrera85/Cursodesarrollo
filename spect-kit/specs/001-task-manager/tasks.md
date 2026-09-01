# Tasks: Task Manager

**Input**: Design documents from `/specs/001-task-manager/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

## Sprint 1 - Estructura base y modelo de datos

### [x] TASK-001 - Crear estructura HTML principal
- **Descripción corta**: Definir la estructura visual base de la aplicación con formulario, lista, filtros, contadores y modal de edición.
- **Prioridad**: P0
- **Estimación**: 2 horas
- **Dependencias**: Ninguna
- **Criterios de aceptación**:
  - La página muestra un formulario para crear tareas con título, descripción, prioridad y estado.
  - La vista incluye filtros, contador de pendientes/completadas y una lista de tareas vacía o con contenido.
  - El modal de edición existe en el DOM, pero se mantiene oculto por defecto.

### [x] TASK-002 - Diseñar estilos mobile-first
- **Descripción corta**: Implementar el layout responsivo y los estilos base de la interfaz en CSS puro.
- **Prioridad**: P0
- **Estimación**: 3 horas
- **Dependencias**: TASK-001
- **Criterios de aceptación**:
  - La interfaz funciona correctamente en móvil y escritorio con un diseño adaptable.
  - Los colores de prioridad se visualizan con rojo, amarillo y verde según el valor de la tarea.
  - Los elementos principales tienen espaciado, tamaño y contraste apropiados para accesibilidad.

### [x] TASK-003 - Definir modelo de datos en JavaScript
- **Descripción corta**: Crear el array de tareas en memoria con el esquema necesario para guardar título, descripción, prioridad, estado y fechas.
- **Prioridad**: P0
- **Estimación**: 1.5 horas
- **Dependencias**: Ninguna
- **Criterios de aceptación**:
  - Cada tarea incluye id, título, descripción, prioridad, estado, fecha de creación y fecha de actualización.
  - Los valores por defecto de prioridad y estado son Media y Pendiente.
  - El modelo puede ser usado por las funciones de renderizado y almacenamiento.

### [x] TASK-004 - Preparar funciones base de estado y almacenamiento
- **Descripción corta**: Crear funciones auxiliares para cargar, guardar y sincronizar tareas con localStorage.
- **Prioridad**: P0
- **Estimación**: 2 horas
- **Dependencias**: TASK-003
- **Criterios de aceptación**:
  - La aplicación puede leer tareas guardadas desde localStorage sin romper la carga inicial.
  - La función de guardado escribe el contenido en formato JSON válido.
  - Si localStorage no contiene datos, se inicializa con un arreglo vacío.

---

## Sprint 2 - CRUD completo

### [x] TASK-005 - Implementar creación de tareas
- **Descripción corta**: Añadir la lógica para crear una nueva tarea desde el formulario principal.
- **Prioridad**: P0
- **Estimación**: 2.5 horas
- **Dependencias**: TASK-001, TASK-003, TASK-004
- **Criterios de aceptación**:
  - Al enviar un título válido, la tarea se agrega a la lista y se persiste en localStorage.
  - Si el título está vacío, la tarea no se guarda y se muestra una validación.
  - La nueva tarea aparece al inicio de la lista por fecha de creación.

### [x] TASK-006 - Implementar renderizado de la lista de tareas
- **Descripción corta**: Crear la función que dibuja dinámicamente las tareas y maneja el estado vacío.
- **Prioridad**: P0
- **Estimación**: 2 horas
- **Dependencias**: TASK-003, TASK-005
- **Criterios de aceptación**:
  - La lista renderiza todas las tareas correctamente en el contenedor principal.
  - Cuando no hay tareas, se muestra un mensaje claro de lista vacía.
  - El contenido se actualiza al momento de cambios en el estado.

### [x] TASK-007 - Implementar edición inline/modal de tareas
- **Descripción corta**: Permitir editar título, descripción, prioridad y estado desde un modal.
- **Prioridad**: P0
- **Estimación**: 3 horas
- **Dependencias**: TASK-001, TASK-006
- **Criterios de aceptación**:
  - El modal se abre al seleccionar una tarea para editar.
  - El usuario puede cambiar los cuatro campos principales sin recargar la página.
  - Los cambios se guardan correctamente y se reflejan en la lista.

### [x] TASK-008 - Implementar eliminación con confirmación
- **Descripción corta**: Añadir la eliminación de tareas con validación nativa usando confirm().
- **Prioridad**: P0
- **Estimación**: 1.5 horas
- **Dependencias**: TASK-006
- **Criterios de aceptación**:
  - Al pulsar eliminar, aparece el diálogo nativo de confirmación.
  - Si el usuario cancela, la tarea permanece sin cambios.
  - Si confirma, la tarea se elimina de la lista y del almacenamiento local.

### [x] TASK-009 - Validar CRUD completo con pruebas manuales
- **Descripción corta**: Revisar todas las operaciones principales para confirmar que la funcionalidad del CRUD responde como se espera.
- **Prioridad**: P0
- **Estimación**: 2 horas
- **Dependencias**: TASK-005, TASK-007, TASK-008
- **Criterios de aceptación**:
  - Se ejecutan manualmente las pruebas de creación, lectura, edición y eliminación.
  - Las tareas persistidas se visualizan al recargar la página.
  - No se observan errores funcionales en el flujo principal.

---

## Sprint 3 - Filtros, contadores y persistencia final

### [x] TASK-010 - Implementar filtros por prioridad
- **Descripción corta**: Añadir el selector de prioridad para filtrar la lista según Alta, Media, Baja o Todas.
- **Prioridad**: P0
- **Estimación**: 2 horas
- **Dependencias**: TASK-006
- **Criterios de aceptación**:
  - El filtro por prioridad actualiza la lista sin recargar la página.
  - Las opciones disponibles son Todas, Alta, Media y Baja.
  - El filtro combina correctamente con la demás lógica de visualización.

### [x] TASK-011 - Implementar filtros por estado
- **Descripción corta**: Añadir el selector de estado para visualizar tareas por Pendiente, En Progreso, Completada o Todas.
- **Prioridad**: P0
- **Estimación**: 2 horas
- **Dependencias**: TASK-006
- **Criterios de aceptación**:
  - El filtro por estado actualiza la vista en tiempo real.
  - Las opciones disponibles son Todas, Pendientes, En Progreso y Completadas.
  - La selección vacía no rompe la interfaz ni el renderizado.

### [x] TASK-012 - Implementar toggle de completado
- **Descripción corta**: Permitir marcar una tarea como completa o pendiente con un solo clic.
- **Prioridad**: P0
- **Estimación**: 1.5 horas
- **Dependencias**: TASK-006, TASK-004
- **Criterios de aceptación**:
  - El usuario puede cambiar el estado de una tarea sin abrir el modal.
  - El cambio se refleja inmediatamente en la vista y en el almacenamiento local.
  - El contador total se actualiza al mismo tiempo.

### [x] TASK-013 - Calcular contador de pendientes y completadas
- **Descripción corta**: Mostrar estadísticas resumidas de tareas pendientes y completadas.
- **Prioridad**: P0
- **Estimación**: 1 hora
- **Dependencias**: TASK-006, TASK-012
- **Criterios de aceptación**:
  - El contador refleja exactamente el número de tareas realizadas y pendientes.
  - La información se actualiza en tiempo real tras cambios de estado o filtros.
  - La UI muestra los dos valores de forma clara y legible.

### [x] TASK-014 - Asegurar persistencia y recarga segura
- **Descripción corta**: Garantizar que la lista se recupere desde localStorage al iniciar la aplicación y que no se pierdan datos.
- **Prioridad**: P0
- **Estimación**: 1.5 horas
- **Dependencias**: TASK-004, TASK-009, TASK-012
- **Criterios de aceptación**:
  - Al recargar la página, las tareas guardadas siguen presentes.
  - Si el almacenamiento no tiene información válida, la app carga una lista vacía sin fallar.
  - Los filtros y contadores se calculan sobre la estructura persistida correctamente.

### [x] TASK-015 - Pruebas manuales finales de sprint
- **Descripción corta**: Validar el comportamiento de filtros, contadores, toggle y persistencia en navegador.
- **Prioridad**: P1
- **Estimación**: 2 horas
- **Dependencias**: TASK-010, TASK-011, TASK-012, TASK-013, TASK-014
- **Criterios de aceptación**:
  - Se ejecutan pruebas para cada filtro y combinación de estados.
  - Se confirma que la aplicación funciona en móvil y escritorio.
  - Se registran los resultados en una checklist de verificación manual.

---

## Matriz de prioridad

- **P0 (Crítico)**: tareas que representan la base funcional del producto y deben completarse antes de cualquier validación final.
- **P1 (Importante)**: validaciones y ajustes que mejoran la experiencia y la confianza del usuario.
- **P2 (Opcional)**: refinamientos o mejoras no bloqueantes para la funcionalidad principal.

## Dependencias globales

- TASK-001 → TASK-002
- TASK-003 → TASK-004
- TASK-003 → TASK-005
- TASK-001 + TASK-003 + TASK-004 → TASK-005
- TASK-006 depende de TASK-005
- TASK-007 depende de TASK-006
- TASK-008 depende de TASK-006
- TASK-009 depende de TASK-005, TASK-007, TASK-008
- TASK-010 y TASK-011 dependen de TASK-006
- TASK-012 depende de TASK-006 y TASK-004
- TASK-013 depende de TASK-012
- TASK-014 depende de TASK-004, TASK-009, TASK-012
- TASK-015 depende del conjunto de Sprint 3
