// Aplicación de gestión de tareas con persistencia local y renderizado dinámico.
const STORAGE_KEY = 'taskManager.tasks';

const state = {
  tasks: [],
  filters: {
    priority: 'Todas',
    status: 'Todas'
  }
};

const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const priorityFilter = document.getElementById('priority-filter');
const statusFilter = document.getElementById('status-filter');
const pendingCount = document.getElementById('pending-count');
const completedCount = document.getElementById('completed-count');
const formMessage = document.getElementById('form-message');
const editModal = document.getElementById('edit-modal');
const editForm = document.getElementById('edit-form');
const closeModalButton = document.getElementById('close-modal');
const cancelEditButton = document.getElementById('cancel-edit');

// Carga las tareas desde localStorage y las normaliza para mantener compatibilidad.
function loadTasks() {
  try {
    const rawTasks = localStorage.getItem(STORAGE_KEY);
    const parsedTasks = rawTasks ? JSON.parse(rawTasks) : [];

    state.tasks = Array.isArray(parsedTasks) ? parsedTasks.map(normalizeTask) : [];
  } catch (error) {
    console.error('No se pudieron cargar las tareas:', error);
    state.tasks = [];
  }
}

// Guarda el estado actual de las tareas en localStorage.
function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
  } catch (error) {
    console.error('No se pudieron guardar las tareas:', error);
  }
}

// Normaliza un objeto de tarea para asegurar que siempre tenga los campos esperados.
function normalizeTask(task) {
  return {
    id: task.id || crypto.randomUUID(),
    title: String(task.title || '').trim(),
    description: String(task.description || '').trim(),
    priority: ['Alta', 'Media', 'Baja'].includes(task.priority) ? task.priority : 'Media',
    status: ['Pendiente', 'En Progreso', 'Completada'].includes(task.status) ? task.status : 'Pendiente',
    createdAt: Number(task.createdAt) || Date.now(),
    updatedAt: Number(task.updatedAt) || Date.now()
  };
}

// Crea una nueva tarea con valores por defecto y la agrega al estado principal.
function createTask(taskData) {
  const newTask = normalizeTask({
    ...taskData,
    priority: taskData.priority || 'Media',
    status: taskData.status || 'Pendiente',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    id: crypto.randomUUID()
  });

  state.tasks.unshift(newTask);
  saveTasks();
  renderTasks();
}

// Actualiza una tarea existente en base a su id.
function updateTask(taskId, updatedData) {
  const taskIndex = state.tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return;
  }

  const currentTask = state.tasks[taskIndex];
  const nextTask = normalizeTask({
    ...currentTask,
    ...updatedData,
    updatedAt: Date.now()
  });

  state.tasks[taskIndex] = nextTask;
  saveTasks();
  renderTasks();
}

// Elimina una tarea con confirmación nativa para evitar borrados accidentales.
function deleteTask(taskId) {
  const task = state.tasks.find((item) => item.id === taskId);

  if (!task) {
    return;
  }

  const confirmed = window.confirm(`¿Seguro que deseas eliminar la tarea "${task.title}"?`);

  if (!confirmed) {
    return;
  }

  state.tasks = state.tasks.filter((item) => item.id !== taskId);
  saveTasks();
  renderTasks();
}

// Alterna el estado de una tarea entre pendiente y completada con un solo clic.
function toggleTaskStatus(taskId) {
  const task = state.tasks.find((item) => item.id === taskId);

  if (!task) {
    return;
  }

  const nextStatus = task.status === 'Completada' ? 'Pendiente' : 'Completada';
  updateTask(taskId, { status: nextStatus });
}

// Obtiene la lista visible aplicando filtros activos de prioridad y estado.
function getFilteredTasks() {
  return state.tasks
    .filter((task) => {
      const matchesPriority =
        state.filters.priority === 'Todas' || task.priority === state.filters.priority;
      const matchesStatus =
        state.filters.status === 'Todas' || task.status === state.filters.status;
      return matchesPriority && matchesStatus;
    })
    .sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
}

// Actualiza los contadores de pendientes y completadas.
function updateCounters() {
  const pending = state.tasks.filter((task) => task.status !== 'Completada').length;
  const completed = state.tasks.filter((task) => task.status === 'Completada').length;

  pendingCount.textContent = String(pending);
  completedCount.textContent = String(completed);
}

// Renderiza el listado filtrado con botones para editar, eliminar y completar.
function renderTasks() {
  const filteredTasks = getFilteredTasks();

  if (filteredTasks.length === 0) {
    taskList.innerHTML = `
      <li class="empty-state">
        No hay tareas para mostrar con los filtros actuales.
      </li>
    `;
    updateCounters();
    return;
  }

  taskList.innerHTML = filteredTasks
    .map((task) => {
      const priorityIcon = task.priority === 'Alta' ? '🔴' : task.priority === 'Media' ? '🟡' : '🟢';
      const isCompleted = task.status === 'Completada';

      return `
        <li class="task-item ${isCompleted ? 'completed' : ''}" data-id="${task.id}">
          <div class="priority-badge priority-${task.priority.toLowerCase()}">
            ${priorityIcon}
          </div>

          <div class="task-content">
            <h3 class="task-title">${escapeHtml(task.title)}</h3>
            <p class="task-description">${escapeHtml(task.description || 'Sin descripción')}</p>
            <div class="task-meta">
              <span class="status-pill">${task.status}</span>
              <span>${formatDate(task.createdAt)}</span>
            </div>
          </div>

          <div class="actions">
            <button
              type="button"
              class="toggle-button"
              data-action="toggle"
              data-id="${task.id}"
              aria-label="Cambiar estado de la tarea"
            >
              ${isCompleted ? '↺' : '✓'}
            </button>
            <button
              type="button"
              class="edit-button"
              data-action="edit"
              data-id="${task.id}"
              aria-label="Editar tarea"
            >
              ✎
            </button>
            <button
              type="button"
              class="delete-button"
              data-action="delete"
              data-id="${task.id}"
              aria-label="Eliminar tarea"
            >
              🗑
            </button>
          </div>
        </li>
      `;
    })
    .join('');

  updateCounters();
}

// Guarda el texto con seguridad para evitar inyección en el HTML renderizado.
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Formatea fechas a un formato legible para usuarios finales.
function formatDate(timestamp) {
  return new Date(timestamp).toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Muestra un mensaje de validación para el formulario principal.
function showFormMessage(message, isError = true) {
  formMessage.textContent = message;
  formMessage.style.color = isError ? 'var(--danger)' : 'var(--success)';
}

// Valida el título antes de guardar una tarea.
function validateTaskTitle(title) {
  return title.trim().length > 0;
}

// Crea una nueva tarea a partir del formulario principal.
function handleCreateTask(event) {
  event.preventDefault();

  const formData = new FormData(taskForm);
  const title = String(formData.get('title') || '').trim();
  const description = String(formData.get('description') || '').trim();
  const priority = String(formData.get('priority') || 'Media');
  const status = String(formData.get('status') || 'Pendiente');

  if (!validateTaskTitle(title)) {
    showFormMessage('El título es obligatorio. Ingresa un nombre para la tarea.');
    return;
  }

  createTask({
    title,
    description,
    priority,
    status
  });

  taskForm.reset();
  document.getElementById('task-priority').value = 'Media';
  document.getElementById('task-status').value = 'Pendiente';
  showFormMessage('Tarea creada correctamente.', false);
}

// Abre el modal de edición con los datos de la tarea seleccionada.
function openEditModal(taskId) {
  const task = state.tasks.find((item) => item.id === taskId);

  if (!task) {
    return;
  }

  document.getElementById('edit-task-id').value = task.id;
  document.getElementById('edit-task-title').value = task.title;
  document.getElementById('edit-task-description').value = task.description;
  document.getElementById('edit-task-priority').value = task.priority;
  document.getElementById('edit-task-status').value = task.status;

  editModal.classList.remove('hidden');
  editModal.setAttribute('aria-hidden', 'false');
  document.getElementById('edit-task-title').focus();
}

// Cierra el modal de edición.
function closeEditModal() {
  editModal.classList.add('hidden');
  editModal.setAttribute('aria-hidden', 'true');
  editForm.reset();
}

// Guarda los cambios realizados en el modal de edición.
function handleEditTask(event) {
  event.preventDefault();

  const taskId = document.getElementById('edit-task-id').value;
  const title = document.getElementById('edit-task-title').value.trim();
  const description = document.getElementById('edit-task-description').value.trim();
  const priority = document.getElementById('edit-task-priority').value;
  const status = document.getElementById('edit-task-status').value;

  if (!validateTaskTitle(title)) {
    window.alert('El título no puede quedar vacío.');
    return;
  }

  updateTask(taskId, {
    title,
    description,
    priority,
    status
  });

  closeEditModal();
}

// Delegación de eventos para manejar acciones de la lista.
function handleTaskListClick(event) {
  const target = event.target.closest('button');

  if (!target) {
    return;
  }

  const taskId = target.dataset.id;
  const action = target.dataset.action;

  if (!taskId || !action) {
    return;
  }

  if (action === 'toggle') {
    toggleTaskStatus(taskId);
  }

  if (action === 'edit') {
    openEditModal(taskId);
  }

  if (action === 'delete') {
    deleteTask(taskId);
  }
}

// Inicializa la página cargando datos y configurando listeners.
function initializeApp() {
  loadTasks();
  renderTasks();

  taskForm.addEventListener('submit', handleCreateTask);
  taskList.addEventListener('click', handleTaskListClick);
  priorityFilter.addEventListener('change', (event) => {
    state.filters.priority = event.target.value;
    renderTasks();
  });
  statusFilter.addEventListener('change', (event) => {
    state.filters.status = event.target.value;
    renderTasks();
  });
  editForm.addEventListener('submit', handleEditTask);
  closeModalButton.addEventListener('click', closeEditModal);
  cancelEditButton.addEventListener('click', closeEditModal);
  editModal.addEventListener('click', (event) => {
    const shouldClose = event.target.matches('[data-close-modal="true"]');
    if (shouldClose) {
      closeEditModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !editModal.classList.contains('hidden')) {
      closeEditModal();
    }
  });
}

initializeApp();
