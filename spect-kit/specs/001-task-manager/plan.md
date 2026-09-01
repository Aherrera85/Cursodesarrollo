# Implementation Plan: Task Manager

**Branch**: `001-task-manager` | **Date**: 2026-09-01 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-task-manager/spec.md`

**Note**: This plan defines the implementation architecture, technical decisions, and delivery phases for the Task Manager web application.

## Summary

Task Manager is a small web application for creating, editing, filtering, and deleting tasks. The solution uses a single-page structure built with HTML5, CSS3, and JavaScript ES6+ without external dependencies. Persistencia is handled with localStorage to simulate a lightweight database and maintain user data between refreshes or sessions.

## Technical Context

**Language/Version**: JavaScript ES6+ (modern browser runtime)

**Primary Dependencies**: None; native browser APIs only

**Storage**: localStorage for persistence of tasks and UI state

**Testing**: Manual browser verification for CRUD flows, filters, and persistence

**Target Platform**: Web browser (desktop + mobile)

**Project Type**: Web application

**Performance Goals**: Fast UI updates, instant filtering, responsive behavior under small task sets in-browser

**Constraints**: No external libraries, no build tools, no backend services, mobile-first design, data must remain accessible without network connectivity

**Scale/Scope**: Small single-user task manager with a few dozen tasks and focused CRUD operations

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- ✅ Code clean and maintainable: the app will use modular functions, simple naming conventions, and Spanish comments on key sections.
- ✅ Accessibility and responsiveness: app layout will be mobile-first, semantic HTML, focus states, and touch-friendly controls will be included.
- ✅ Simplicity by default: only HTML, CSS and vanilla JavaScript will be used; no external frameworks or dependencies.
- ✅ localStorage persistence: task data will be saved/retrieved from localStorage to simulate a data layer.
- ✅ Manual verification required: all critical CRUD flows and edge cases must be checked by manual tests documented in the task list.
- ✅ Self-contained delivery: app runs directly from static files without install steps or external services.

## Project Structure

### Documentation (this feature)

```text
specs/001-task-manager/
├── plan.md
├── spec.md
├── tasks.md
├── checklists/
│   └── requirements.md
└── research.md
```

### Source Code (repository root)

```text
.
├── index.html
├── styles.css
├── app.js
└── README.md (optional)
```

**Structure Decision**: A single-page static web application will be created with three root files: index.html, styles.css, and app.js. This keeps the project self-contained and aligns with the no-dependencies constraint.

## Phase Plan

### Phase 0: Research and Decisions

- Confirm task data shape: each task contains id, title, description, priority, status, createdAt, updatedAt.
- Define default values: priority = Media, status = Pendiente, title required.
- Validate the interaction rules for editing, filtering, and toggle behavior.
- Confirm there is no backend or auth requirement; the app works as a local single-user tool.

### Phase 1: Core UI and State Model

**Goal**: Build the base structure and initial data model.

Implementation tasks:

- Create index.html with app layout, form, filter controls, counters, task list container, and modal edit form.
- Create styles.css with mobile-first layout, priority colors, responsive breakpoints, and modal styling.
- Create app.js with the in-memory array `tasks` and helper functions.
- Add default sample tasks only for manual testing if needed, but keep data persistence at runtime.

### Phase 2: CRUD and Data Flow

**Goal**: Complete create, read, update, and delete behaviors.

Implementation tasks:

- Add form submission logic for createTask.
- Validate required title before saving.
- Add task rendering logic with tasks sorted by creation date descending.
- Add modal logic for editing the selected task.
- Use confirm() for delete confirmation.
- Save changes to localStorage after each mutation.

### Phase 3: Filters, Toggles, and summary counters

**Goal**: Make the app fully usable and reactive.

Implementation tasks:

- Add priority and status filters with immediate update logic.
- Add event listeners to update the displayed list without page reload.
- Implement toggle complete/incomplete action with a single click.
- Calculate summary counters for pending and completed tasks.
- Synchronize filtered view with persisted data on page load.
- Perform manual validation for mobile and desktop flows.

## Detailed Design

### Data Model

```javascript
const task = {
  id: "timestamp-or-uuid",
  title: "",
  description: "",
  priority: "Alta | Media | Baja",
  status: "Pendiente | En Progreso | Completada",
  createdAt: 1710000000000,
  updatedAt: 1710000000000
};
```

Rules:

- `title` is required.
- `description` is optional and may be empty.
- `priority` defaults to `Media`.
- `status` defaults to `Pendiente`.
- `createdAt` and `updatedAt` are stored as timestamps for ordering and display.

### View Layer

- The page will render tasks dynamically using `innerHTML` for simplicity.
- The task list will be rebuilt after any CRUD operation.
- The modal will be hidden by default and shown with `display: block` when editing.
- A “no tasks” empty state will be shown when the filtered list is empty.

### Controller Layer

Responsibilities:

- Listen for submit events on the add-task form.
- Listen for click events on edit, delete, and toggle actions.
- Listen for filter change events for priority and status.
- Call render and persist functions after every mutation.
- Keep state synchronized between memory array and localStorage.

### Persistence Strategy

- Use `localStorage.setItem('tasks', JSON.stringify(tasks));` after writes.
- Use `JSON.parse(localStorage.getItem('tasks')) || [];` when initializing the app.
- If the stored payload is corrupted or invalid, fall back to an empty array.
- Keep storage logic centralized in functions such as `saveTasks` and `loadTasks`.

## Design Decisions

- Priority colors: `Alta` = red, `Media` = yellow, `Baja` = green.
- Icons: use emojis for simplicity (`🔴`, `🟡`, `🟢`).
- Edit method: modal-based editing with a hidden form and explicit save/cancel actions.
- Filter behavior: priority and state filters are independent controls, so they combine in the rendered results (AND logic) while preserving the ability to show all values from each dimension.
- Sort order: tasks will be sorted by `createdAt` descending, newest first.
- Tie-breaking: if two tasks share the same creation timestamp, maintain insertion order; newer tasks remain before older tasks by the order they were added to the array.

## Sprint Breakdown

### Sprint 1 - Estructura HTML + estilos base + modelo de datos

**Objective**: Create the static layout and initial data structure.

Deliverables:

- Base HTML skeleton with form, filter controls, counter section, list area, and modal placeholder.
- CSS styling for mobile-first, responsive layout, and visual priority indicators.
- Task data model in JavaScript with default task values and in-memory array.

### Sprint 2 - CRUD completo

**Objective**: Implement full create, read, update, and delete behavior.

Deliverables:

- Add task form behavior with validation.
- Render tasks from state.
- Edit task data using modal.
- Delete with native `confirm()` dialog.
- Persist changes to localStorage.

### Sprint 3 - Filtros, contadores y persistencia

**Objective**: Finalize the interactive experience and make it reliable.

Deliverables:

- Priority and status filters with instant re-render.
- Completed toggle action.
- Pending vs completed counters.
- Persistence across page reloads.
- Manual browser verification across mobile and desktop sizes.

## Risk and Mitigation

- Risk: localStorage invalid data may break parsing.
  - Mitigation: guard parsing with try/catch and fallback to empty array.
- Risk: complex UI logic may be difficult to maintain.
  - Mitigation: keep functions separated into clear responsibilities (`createTask`, `renderTasks`, `filterTasks`, `saveTasks`, `loadTasks`, etc.).
- Risk: inaccessible controls may reduce usability.
  - Mitigation: maintain semantic labels, visible focus states, and keyboard support.

## Complexity Tracking

No constitution violations require justification. The chosen approach remains intentionally simple and aligns with the project’s non-negotiable constraints.
