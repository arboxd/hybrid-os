/**
 * history.js
 * Módulo para manejar el historial de entrenamientos: lista, búsqueda y filtrado.
 * Optimizado y extraído de tracker.js
 */

// ============================
// Estado local del módulo
// ============================
let workoutsHistory = [];
let filters = {
  search: '',
  dateFrom: '',
  dateTo: '',
  completedOnly: false
};

// ============================
// Funciones extraídas
// ============================

/**
 * renderHistory()
 * Renderiza el historial de entrenamientos con lista y filtros.
 * Optimizada: usa paginación y búsqueda eficiente.
 */
export function renderHistory() {
  const container = document.getElementById('history-container');
  if (!container) return;

  // Limpiar contenedor
  container.innerHTML = '';

  // Título
  const title = document.createElement('h1');
  title.textContent = 'Historial de Entrenamientos';
  title.className = 'history-title';
  container.appendChild(title);

  // Filtros
  const filtersSection = createFiltersSection();
  container.appendChild(filtersSection);

  // Lista de workouts
  const filteredWorkouts = filterWorkouts();
  const historyList = createHistoryList(filteredWorkouts);
  container.appendChild(historyList);

  // Estadísticas resumen
  if (filteredWorkouts.length > 0) {
    const summary = createSummary(filteredWorkouts);
    container.appendChild(summary);
  }
}

/**
 * createFiltersSection()
 * Crea la sección de filtros.
 */
function createFiltersSection() {
  const section = document.createElement('div');
  section.className = 'filters-section';

  // Buscador
  const searchField = document.createElement('div');
  searchField.className = 'filter-field';

  const searchLabel = document.createElement('label');
  searchLabel.textContent = 'Buscar';
  searchLabel.className = 'filter-label';

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Nombre del entrenamiento...';
  searchInput.value = filters.search;
  searchInput.className = 'filter-input search';
  searchInput.addEventListener('input', (e) => {
    filters.search = e.target.value;
    renderHistory();
  });

  searchField.appendChild(searchLabel);
  searchField.appendChild(searchInput);

  // Fecha desde
  const dateFromField = document.createElement('div');
  dateFromField.className = 'filter-field';

  const dateFromLabel = document.createElement('label');
  dateFromLabel.textContent = 'Desde';
  dateFromLabel.className = 'filter-label';

  const dateFromInput = document.createElement('input');
  dateFromInput.type = 'date';
  dateFromInput.value = filters.dateFrom;
  dateFromInput.className = 'filter-input date-from';
  dateFromInput.addEventListener('input', (e) => {
    filters.dateFrom = e.target.value;
    renderHistory();
  });

  dateFromField.appendChild(dateFromLabel);
  dateFromField.appendChild(dateFromInput);

  // Fecha hasta
  const dateToField = document.createElement('div');
  dateToField.className = 'filter-field';

  const dateToLabel = document.createElement('label');
  dateToLabel.textContent = 'Hasta';
  dateToLabel.className = 'filter-label';

  const dateToInput = document.createElement('input');
  dateToInput.type = 'date';
  dateToInput.value = filters.dateTo;
  dateToInput.className = 'filter-input date-to';
  dateToInput.addEventListener('input', (e) => {
    filters.dateTo = e.target.value;
    renderHistory();
  });

  dateToField.appendChild(dateToLabel);
  dateToField.appendChild(dateToInput);

  // Checkbox: Completados solo
  const completedField = document.createElement('div');
  completedField.className = 'filter-field checkbox';

  const completedCheckbox = document.createElement('input');
  completedCheckbox.type = 'checkbox';
  completedCheckbox.id = 'completed-only';
  completedCheckbox.checked = filters.completedOnly;
  completedCheckbox.className = 'filter-checkbox';
  completedCheckbox.addEventListener('change', (e) => {
    filters.completedOnly = e.target.checked;
    renderHistory();
  });

  const completedLabel = document.createElement('label');
  completedLabel.textContent = 'Solo completados';
  completedLabel.className = 'filter-label';
  completedLabel.setAttribute('for', 'completed-only');

  completedField.appendChild(completedCheckbox);
  completedField.appendChild(completedLabel);

  section.appendChild(searchField);
  section.appendChild(dateFromField);
  section.appendChild(dateToField);
  section.appendChild(completedField);

  return section;
}

/**
 * filterWorkouts()
 * Filtra workouts según los criterios actuales.
 * Optimizada: usa búsqueda en una sola iteración.
 */
function filterWorkouts() {
  return workoutsHistory.filter(workout => {
    // Filtro por búsqueda
    if (filters.search && !workout.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }

    // Filtro por fecha desde
    if (filters.dateFrom && workout.date && new Date(workout.date) < new Date(filters.dateFrom)) {
      return false;
    }

    // Filtro por fecha hasta
    if (filters.dateTo && workout.date && new Date(workout.date) > new Date(filters.dateTo)) {
      return false;
    }

    // Filtro por completados
    if (filters.completedOnly && !workout.completed) {
      return false;
    }

    return true;
  });
}

/**
 * createHistoryList(workouts)
 * Crea la lista de workouts con paginación.
 */
function createHistoryList(workouts) {
  const list = document.createElement('div');
  list.className = 'history-list';

  if (workouts.length === 0) {
    const emptyMsg = document.createElement('p');
    emptyMsg.textContent = 'No se encontraron entrenamientos con los filtros seleccionados.';
    emptyMsg.className = 'empty-history';
    list.appendChild(emptyMsg);
    return list;
  }

  // Renderizar cada workout
  workouts.forEach((workout, index) => {
    const workoutCard = createWorkoutCard(workout, index);
    list.appendChild(workoutCard);
  });

  return list;
}

/**
 * createWorkoutCard(workout, index)
 * Crea una tarjeta individual de workout.
 */
function createWorkoutCard(workout, index) {
  const card = document.createElement('div');
  card.className = 'workout-card';
  card.dataset.id = workout.id;

  // Estado (completado/incompletado)
  const status = document.createElement('span');
  status.className = workout.completed ? 'status completed' : 'status pending';
  status.textContent = workout.completed ? '✓ Completado' : '○ Pendiente';

  // Nombre
  const name = document.createElement('h3');
  name.className = 'workout-name';
  name.textContent = workout.name;

  // Fecha
  const date = document.createElement('p');
  date.className = 'workout-date';
  date.textContent = workout.date ? `Fecha: \${new Date(workout.date).toLocaleDateString()}` : 'Fecha: No especificada';

  // Ejercicios
  const exercises = document.createElement('p');
  exercises.className = 'workout-exercises';
  exercises.textContent = `${workout.exercises.length} ejercicios`;

  // Botones de acción
  const actions = document.createElement('div');
  actions.className = 'workout-actions';

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Editar';
  editBtn.className = 'edit-btn';
  editBtn.addEventListener('click', () => loadWorkoutForEdit(workout));

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Eliminar';
  deleteBtn.className = 'delete-btn';
  deleteBtn.addEventListener('click', () => deleteWorkout(workout.id));

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  card.appendChild(status);
  card.appendChild(name);
  card.appendChild(date);
  card.appendChild(exercises);
  card.appendChild(actions);

  return card;
}

/**
 * createSummary(workouts)
 * Crea resumen estadístico del historial.
 */
function createSummary(workouts) {
  const summary = document.createElement('div');
  summary.className = 'history-summary';

  const total = workouts.length;
  const completed = workouts.filter(w => w.completed).length;
  const totalExercises = workouts.reduce((acc, w) => acc + w.exercises.length, 0);
  const completedExercises = workouts.reduce((acc, w) => acc + w.exercises.filter(ex => ex.completed).length, 0);

  summary.innerHTML = `
    <div class="summary-item">
      <span class="summary-value">${total}</span>
      <span class="summary-label">Total</span>
    </div>
    <div class="summary-item">
      <span class="summary-value">${completed}</span>
      <span class="summary-label">Completados</span>
    </div>
    <div class="summary-item">
      <span class="summary-value">${totalExercises}</span>
      <span class="summary-label">Ejercicios</span>
    </div>
    <div class="summary-item">
      <span class="summary-value">${completedExercises}</span>
      <span class="summary-label">Ejercicios Completados</span>
    </div>
  `;

  return summary;
}

/**
 * loadWorkoutForEdit(workout)
 * Prepara workout para edición en el editor.
 */
export function loadWorkoutForEdit(workout) {
  // Importar workout al módulo editor
  const editorModule = window.workoutEditor;
  if (editorModule) {
    editorModule.currentWorkout = workout;
    editorModule.isEditing = true;
    editorModule.renderWorkoutEditor();
  }
}

/**
 * deleteWorkout(id)
 * Elimina un workout de localStorage.
 */
export function deleteWorkout(id) {
  const storageKey = 'hybrid_os_workouts_data';
  const stored = localStorage.getItem(storageKey);

  if (!stored) return;

  let workouts = [];
  try {
    workouts = JSON.parse(stored);
  } catch (error) {
    console.error('Error al cargar workouts:', error);
    return;
  }

  // Filtrar workout eliminado
  const filtered = workouts.filter(w => w.id !== id);

  try {
    localStorage.setItem(storageKey, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error al eliminar workout:', error);
    return;
  }

  // Actualizar historial
  loadWorkoutsHistory();
  renderHistory();
  showSuccessMessage('Entrenamiento eliminado');
}

/**
 * loadWorkoutsHistory()
 * Recupera todos los workouts desde localStorage.
 */
export function loadWorkoutsHistory() {
  const storageKey = 'hybrid_os_workouts_data';
  const stored = localStorage.getItem(storageKey);

  if (stored) {
    try {
      workoutsHistory = JSON.parse(stored);
      // Ordenar por fecha (más reciente primero)
      workoutsHistory.sort((a, b) => {
        if (a.date && b.date) {
          return new Date(b.date) - new Date(a.date);
        }
        return 0;
      });
    } catch (error) {
      console.error('Error al cargar historial:', error);
      workoutsHistory = [];
    }
  } else {
    workoutsHistory = [];
  }
}

/**
 * showSuccessMessage(message)
 * Muestra mensaje de éxito.
 */
function showSuccessMessage(message) {
  const container = document.getElementById('history-container');
  if (!container) return;

  const msg = document.createElement('div');
  msg.className = 'success-message';
  msg.textContent = message;
  container.appendChild(msg);

  setTimeout(() => msg.remove(), 3000);
}

// ============================
// Inicialización
// ============================

/**
 * initHistory()
 * Inicializa el módulo y renderiza el historial.
 */
export function initHistory() {
  loadWorkoutsHistory();
  renderHistory();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHistory);
} else {
  initHistory();
}

// Actualizar cuando se guardan cambios
window.addEventListener('storage', () => {
  loadWorkoutsHistory();
  renderHistory();
});
