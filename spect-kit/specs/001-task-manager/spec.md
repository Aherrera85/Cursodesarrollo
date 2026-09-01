# Feature Specification: Task Manager

**Feature Branch**: `001-task-manager`

**Created**: 2026-09-01

**Status**: Draft

**Input**: User description: "/speckit-specify Construir una aplicación web de gestión de tareas con las siguientes características: Historias de Usuario: Como usuario, quiero ver todas mis tareas en una lista ordenada por fecha de creación (más reciente primero). Como usuario, quiero agregar una nueva tarea con título (obligatorio), descripción (opcional), prioridad (Alta/Media/Baja, por defecto Media) y estado (Pendiente/En Progreso/Completada, por defecto Pendiente). Como usuario, quiero editar el título, descripción, prioridad y estado de una tarea existente. Como usuario, quiero eliminar una tarea (con confirmación para evitar eliminaciones accidentales). Como usuario, quiero filtrar las tareas por prioridad (Mostrar todas / Solo Alta / Solo Media / Solo Baja). Como usuario, quiero filtrar las tareas por estado (Mostrar todas / Solo Pendientes / Solo En Progreso / Solo Completadas). Como usuario, quiero marcar una tarea como "Completada" con un solo clic (toggle). Como usuario, quiero ver un contador que muestre cuántas tareas están pendientes vs completadas. Como usuario, quiero que mis tareas persistan entre sesiones (usando localStorage). Criterios de Aceptación: La interfaz debe ser responsiva (funcionar en móvil y escritorio). Los filtros deben aplicarse instantáneamente sin recargar la página. La edición debe hacerse inline o en un modal simple. La confirmación de eliminación debe ser un diálogo nativo (confirm()). El código debe estar bien comentado en español. No debe usar librerías externas ni frameworks."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Ver y ordenar tareas (Priority: P1)
Como usuario, quiero ver todas mis tareas en una lista ordenada por fecha de creación, con la más reciente primero, para poder comprender rápidamente el estado actual de mi trabajo.

**Why this priority**: La lista principal es la base del producto y permite a los usuarios interpretar su trabajo sin esfuerzo adicional.

**Independent Test**: Se puede probar abriendo la aplicación con tareas preexistentes y verificando que se muestran en orden descendente por fecha de creación.

**Acceptance Scenarios**:

1. **Given** que el usuario abre la aplicación con varias tareas guardadas, **When** la lista se carga, **Then** las tareas deben mostrarse ordenadas desde la más reciente hasta la más antigua.
2. **Given** que se crea una nueva tarea, **When** se guarda, **Then** debe aparecer al inicio de la lista por su fecha de creación.

---

### User Story 2 - Crear y guardar tareas (Priority: P1)
Como usuario, quiero agregar una nueva tarea con título obligatorio, descripción opcional, prioridad y estado por defecto, para registrar actividades de trabajo con la información necesaria.

**Why this priority**: La creación de tareas es la acción principal y la base del flujo de gestión.

**Independent Test**: Se puede probar creando una tarea válida, confirmando el guardado local y verificando que la tarea aparece en la lista.

**Acceptance Scenarios**:

1. **Given** que el usuario completa el formulario con un título válido, **When** envía la tarea, **Then** la aplicación debe guardarla y mostrarla en la lista.
2. **Given** que el usuario intenta guardar una tarea sin título, **When** presiona guardar, **Then** la aplicación debe bloquear la operación y mostrar un mensaje de validación.
3. **Given** que el usuario no elige prioridad ni estado, **When** crea la tarea, **Then** el sistema debe asignar Media y Pendiente por defecto.

---

### User Story 3 - Editar y actualizar tareas (Priority: P1)
Como usuario, quiero editar el título, la descripción, la prioridad y el estado de una tarea existente, para corregir cambios o actualizar su progreso.

**Why this priority**: La edición permite corregir errores y mantener la información precisa a lo largo del tiempo.

**Independent Test**: Se puede probar abriendo la edición de una tarea existente, cambiar varios campos y confirmar que la nueva información se guarda.

**Acceptance Scenarios**:

1. **Given** que el usuario abre una tarea en modo edición, **When** modifica título, descripción, prioridad o estado, **Then** la tarea debe actualizarse y reflejar los cambios inmediatamente.
2. **Given** que el usuario intenta guardar un título vacío al editar, **When** confirma la edición, **Then** no debe permitirse el guardado y debe mostrarse un mensaje de validación.

---

### User Story 4 - Eliminar tareas con confirmación (Priority: P1)
Como usuario, quiero eliminar una tarea con confirmación para evitar borrados accidentales y mantener control sobre mi lista.

**Why this priority**: La eliminación debe ser segura, ya que afecta al contenido principal del usuario.

**Independent Test**: Se puede probar pulsando eliminar, aceptar el confirm() y comprobar que la tarea desaparece de la lista y del almacenamiento local.

**Acceptance Scenarios**:

1. **Given** que el usuario selecciona eliminar una tarea, **When** aparece la confirmación nativa del navegador, **Then** la acción debe ejecutarse solo si confirma.
2. **Given** que el usuario cancela la confirmación, **When** responde negativamente, **Then** la tarea debe mantenerse intacta.

---

### User Story 5 - Filtrar y alternar estado de tareas (Priority: P2)
Como usuario, quiero filtrar por prioridad y estado, y marcar tareas como completadas con un clic, para gestionar mi trabajo de manera rápida y enfocada.

**Why this priority**: La clasificación y la marca rápida de tareas mejoran la productividad y la usabilidad del flujo diario.

**Independent Test**: Se puede probar aplicar filtros y usar el toggle de completado para verificar que la vista y el contador cambian de forma inmediata.

**Acceptance Scenarios**:

1. **Given** que el usuario selecciona un filtro de prioridad, **When** cambia la opción, **Then** la lista debe actualizarse sin recargar la página.
2. **Given** que el usuario selecciona un filtro de estado, **When** cambia la opción, **Then** solo deben mostrarse tareas del estado seleccionado.
3. **Given** que el usuario pulsa el toggle de una tarea, **When** cambia su estado a completada o pendiente, **Then** el contador de pendientes y completadas debe actualizarse al instante.

---

### User Story 6 - Persistencia y contadores (Priority: P2)
Como usuario, quiero que mis tareas permanezcan guardadas entre sesiones y ver un contador de pendientes versus completadas, para tener una visión clara del progreso actual.

**Why this priority**: La persistencia y la información resumida aumentan la confianza y la utilidad del sistema como herramienta diaria.

**Independent Test**: Se puede probar recargando la página para confirmar que las tareas siguen guardadas y que los contadores reflejan el estado real.

**Acceptance Scenarios**:

1. **Given** que el usuario crea o modifica tareas, **When** recarga la página, **Then** la aplicación debe leer el estado desde localStorage y mostrar las mismas tareas.
2. **Given** varias tareas con estados distintos, **When** la aplicación renderiza la lista, **Then** el contador debe mostrar la cantidad de tareas pendientes y completadas correctamente.

---

### Edge Cases

- ¿Qué ocurre si el usuario crea una tarea con un título repetido? El sistema debe permitirlo si cumple la validación, pero debe evitar suplantar la identidad de otra tarea y mantener la lista funcional.
- ¿Cómo maneja el sistema una lista vacía? Debe mostrar un estado vacío claro con texto informativo y sin romper la UI.
- ¿Qué ocurre si localStorage está lleno o no está disponible? La aplicación debe manejar errores con una respuesta segura y no romper la navegación.
- ¿Cómo reacciona la aplicación si el usuario intenta editar con contenido vacío? Debe bloquear la acción y mantener los datos previos intactos.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST display all tasks in a list ordered by creation date, with the most recent tasks first.
- **FR-002**: The system MUST allow users to create a task with a required title, optional description, default priority set to Media, and default status set to Pendiente.
- **FR-003**: The system MUST allow users to edit the title, description, priority, and status of an existing task.
- **FR-004**: The system MUST allow users to delete a task only after a native browser confirmation dialog is accepted.
- **FR-005**: The system MUST support priority filtering with options for Todas, Alta, Media, and Baja.
- **FR-006**: The system MUST support status filtering with options for Todas, Pendientes, En Progreso, and Completadas.
- **FR-007**: The system MUST provide a single-click toggle for marking a task as completed or pending.
- **FR-008**: The system MUST show summary counters for pending and completed tasks.
- **FR-009**: The system MUST persist task data between sessions using localStorage.
- **FR-010**: The system MUST update the visible task list instantly when filters or task states change without page reload.
- **FR-011**: The system MUST work responsively on mobile and desktop layouts without external libraries or frameworks.
- **FR-012**: The system MUST document code comments in Spanish to explain the main logic and data flow.
- **FR-013**: The system MUST validate required input fields before saving or updating a task.
- **FR-014**: The system MUST preserve a clear and accessible user experience for keyboard and touch interactions.

### Key Entities *(include if feature involves data)*

- **Tarea**: Representa una actividad del usuario con atributos como título, descripción, prioridad, estado, fecha de creación y fecha de actualización.
- **Lista de tareas**: Contiene todas las tareas del usuario y define el orden, los filtros y el resumen de contadores.
- **Persistencia local**: Repositorio en localStorage que conserva el estado entre sesiones y soporta la recuperación de datos al iniciar la aplicación.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can create, edit, filter, toggle, and delete tasks without reloading the page.
- **SC-002**: The task list displays tasks in descending creation order in all standard sessions after reload and after new task creation.
- **SC-003**: At least 90% of task lifecycle actions are completed successfully during manual verification in a browser on mobile and desktop screen sizes.
- **SC-004**: The app preserves user data across page refreshes and browser restarts using localStorage.
- **SC-005**: The task counters accurately reflect the current number of pending and completed tasks after every state change.

## Assumptions

- Los usuarios usan un único navegador local para gestionar sus tareas sin autenticación multiusuario.
- La aplicación será ejecutada como una app web estática sin backend ni API externa.
- La prioridad y el estado están limitados a los valores definidos en la especificación para mantener consistencia.
- La experiencia móvil es prioritaria, pero la interfaz debe seguir funcionando correctamente en pantallas de escritorio.
- Los datos se almacenan únicamente en localStorage y no se sincronizan entre dispositivos ni navegadores.
