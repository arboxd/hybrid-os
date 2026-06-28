/**
 * workout-editor.js
 * Módulo para manejar el editor de entrenamientos: crear, editar y eliminar workouts.
 * Optimizado y extraído de tracker.js
 */

// ============================
// Estado local del módulo
// ============================
let currentWorkout = {
  id: null,
  name: '',
  date: null,
  exercises: [],
  completed: false
};

let isEditing = false;

// ============================
// Funciones extraídas
// ============================

/**
 * renderWorkoutEditor()
 * Renderiza el editor de entrenamientos con formulario.
 * Optimizada: usa eventos delegados y evita repeticiones de DOM.
 */
export function renderWorkoutEditor() {
  const container = document.getElementById('workout-editor-container');
  if (!container) return;

  // Limpiar contenedor
  container.innerHTML = '';

  // Título
  const title = document.createElement('h2');
  title.textContent = isEditing ? 'Editar Entrenamiento' : 'Crear Nuevo Entrenamiento';
  title.className = 'editor-title';
  container.appendChild(title);

  // Formulario
  const form = document.createElement('form');
  form.className = 'workout-form';
  form.id = 'workout-form';

  // Campo: Nombre
  const nameField = createInputField(
    'workout-name',
    'Nombre del Entrenamiento',
    currentWorkout.name,
    'text'
  );
  form.appendChild(nameField);

  // Campo: Fecha
  const dateField = createInputField(
    'workout-date',
    'Fecha',
    currentWorkout.date || '',
    'date'
  );
  form.appendChild(dateField);

  // Campo: Ejercicios (lista dinámica)
  const exercisesSection = document.createElement('div');
  exercisesSection.className = 'exercises-section';

  const exercisesLabel = document.createElement('label');
  exercisesLabel.textContent = 'Ejercicios';
  exercisesLabel.className = 'exercises-label';

  const exercisesList = document.createElement('div');
  exercisesList.className = 'exercises-list';
  exercisesList.id = 'exercises-list';

  // Renderizar ejercicios actuales
  if (currentWorkout.exercises.length > 0) {
    currentWorkout.exercises.forEach((exercise, index) => {
      addExerciseToList(exercise, index, exercisesList);
    });
  } else {
    // Ejercicio inicial
    addExerciseToList({ name: '', duration: 0 }, 0, exercisesList);
  }

  // Botón para añadir ejercicio
  const addExerciseBtn = document.createElement('button');
  addExerciseBtn.type = 'button';
  addExerciseBtn.textContent = '+ Añadir Ejercicio';
  addExerciseBtn.className = 'add-exercise-btn';
  addExerciseBtn.addEventListener('click', () => {
    addExerciseToList({ name: '', duration: 0 }, currentWorkout.exercises.length, exercisesList);
  });

  exercisesSection.appendChild(exercisesLabel);
  exercisesSection.appendChild(exercisesList);
  exercisesSection.appendChild(addExerciseBtn);
  form.appendChild(exercisesSection);

  // Campo: Completado (checkbox)
  const completedSection = document.createElement('div');
  completedSection.className = 'completed-section';

  const completedCheckbox = document.createElement('input');
  completedCheckbox.type = 'checkbox';
  completedCheckbox.id = 'workout-completed';
  completedCheckbox.name = 'completed';
  completedCheckbox.checked = currentWorkout.completed;
  completedCheckbox.className = 'completed-checkbox';

  const completedLabel = document.createElement('label');
  completedLabel.textContent = 'Entrenamiento completado';
  completedLabel.className = 'completed-label';
  completedLabel.setAttribute('for', 'workout-completed');

  completedSection.appendChild(completedCheckbox);
  completedSection.appendChild(completedLabel);
  form.appendChild(completedSection);

  // Botones de acción
  const buttonsSection = document.createElement('div');
  buttonsSection.className = 'buttons-section';

  const saveBtn = document.createElement('button');
  saveBtn.type = 'submit';
  saveBtn.textContent = isEditing ? 'Actualizar' : 'Guardar';
  saveBtn.className = 'save-btn';

  const cancelBtn = document.createElement('button');
  cancelBtn.type = 'button';
  cancelBtn.textContent = 'Cancelar';
  cancelBtn.className = 'cancel-btn';
  cancelBtn.addEventListener('click', handleCancel);

  buttonsSection.appendChild(saveBtn);
  buttonsSection.appendChild(cancelBtn);
  form.appendChild(buttonsSection);

  container.appendChild(form);

  // Event listener para el formulario
  form.addEventListener('submit', handleWorkoutSubmit);
}

/**
 * handleWorkoutSubmit(event)
 * Maneja el envío del formulario de workout.
 * Optimizada: valida datos y guarda en localStorage.
 */
function handleWorkoutSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  // Actualizar datos del workout
  currentWorkout.name = formData.get('workout-name') || '';
  currentWorkout.date = formData.get('workout-date') || null;
  currentWorkout.completed = formData.get('completed') === 'on';

  // Recoger ejercicios del formulario
  const exerciseNames = form.querySelectorAll('.exercise-name-input');
  const exerciseDurations = form.querySelectorAll('.exercise-duration-input');

  currentWorkout.exercises = [];
  for (let i = 0; i < exerciseNames.length; i++) {
    const name = exerciseNames[i].value;
    const duration = parseInt(exerciseDurations[i].value) || 0;
    if (name.trim()) {
      currentWorkout.exercises.push({ name, duration });
    }
  }

  // Validar mínimo
  if (currentWorkout.exercises.length === 0) {
    showErrorMessage('Debe añadir al menos un ejercicio');
    return;
  }

  // Guardar en localStorage
  if (isEditing && currentWorkout.id) {
    updateWorkout(currentWorkout);
  } else {
    createWorkout(currentWorkout);
  }

  // Resetear estado
  resetWorkoutEditor();
  showSuccessMessage(isEditing ? 'Entrenamiento actualizado!' : 'Entrenamiento creado!');
}

/**
 * createWorkout(workout)
 * Crea un nuevo workout en localStorage.
 */
export function createWorkout(workout) {
  const storageKey = 'hybrid_os_workouts_data';
  const stored = localStorage.getItem(storageKey);

  let workouts = [];
  if (stored) {
    try {
      workouts = JSON.parse(stored);
    } catch (error) {
      console.error('Error al cargar workouts:', error);
    }
  }

  // Generar ID único
  workout.id = Date.now().toString();
  workout.createdAt = new Date().toISOString();

  workouts.push(workout);

  try {
    localStorage.setItem(storageKey, JSON.stringify(workouts));
  } catch (error) {
    console.error('Error al guardar workout:', error);
  }
}

/**
 * updateWorkout(workout)
 * Actualiza un workout existente en localStorage.
 */
export function updateWorkout(workout) {
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

  // Buscar y actualizar
  const index = workouts.findIndex(w => w.id === workout.id);
  if (index !== -1) {
    workouts[index] = workout;
    workouts[index].updatedAt = new Date().toISOString();

    try {
      localStorage.setItem(storageKey, JSON.stringify(workouts));
    } catch (error) {
      console.error('Error al actualizar workout:', error);
    }
  }
}

// ============================
// Funciones de ayuda
// ============================

/**
 * createInputField(id, label, value, type)
 * Crea un campo de input con formato consistente.
 */
function createInputField(id, label, value, type) {
  const field = document.createElement('div');
  field.className = 'input-field';

  const labelEl = document.createElement('label');
  labelEl.textContent = label;
  labelEl.className = 'input-label';
  labelEl.setAttribute('for', id);

  const input = document.createElement('input');
  input.type = type;
  input.id = id;
  input.name = id;
  input.value = value;
  input.className = 'input';

  field.appendChild(labelEl);
  field.appendChild(input);

  return field;
}

/**
 * addExerciseToList(exercise, index, container)
 * Añade un ejercicio a la lista dinámica.
 */
function addExerciseToList(exercise, index, container) {
  const exerciseItem = document.createElement('div');
  exerciseItem.className = 'exercise-item';
  exerciseItem.id = `exercise-${index}`;

  // Input: Nombre
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.className = 'exercise-name-input';
  nameInput.placeholder = 'Nombre del ejercicio';
  nameInput.value = exercise.name;
  nameInput.name = `exercise-name-${index}`;

  // Input: Duración
  const durationInput = document.createElement('input');
  durationInput.type = 'number';
  durationInput.className = 'exercise-duration-input';
  durationInput.placeholder = 'Duración (min)';
  durationInput.value = exercise.duration;
  durationInput.name = `exercise-duration-${index}`;
  durationInput.min = 0;

  // Botón: Eliminar
  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.textContent = '×';
  deleteBtn.className = 'delete-exercise-btn';
  deleteBtn.addEventListener('click', () => {
    exerciseItem.remove();
  });

  exerciseItem.appendChild(nameInput);
  exerciseItem.appendChild(durationInput);
  exerciseItem.appendChild(deleteBtn);
  container.appendChild(exerciseItem);
}

/**
 * resetWorkoutEditor()
 * Resetear el editor para nuevo workout.
 */
export function resetWorkoutEditor() {
  currentWorkout = {
    id: null,
    name: '',
    date: null,
    exercises: [],
    completed: false
  };
  isEditing = false;
  renderWorkoutEditor();
}

/**
 * handleCancel()
 * Cancelar edición y resetear.
 */
function handleCancel() {
  if (isEditing) {
    // Si estaba editando, volver al estado anterior
    showSuccessMessage('Edición cancelada');
  }
  resetWorkoutEditor();
}

/**
 * showSuccessMessage(message)
 * Muestra mensaje de éxito.
 */
function showSuccessMessage(message) {
  const container = document.getElementById('workout-editor-container');
  if (!container) return;

  const msg = document.createElement('div');
  msg.className = 'success-message';
  msg.textContent = message;
  container.appendChild(msg);

  setTimeout(() => msg.remove(), 3000);
}

/**
 * showErrorMessage(message)
 * Muestra mensaje de error.
 */
function showErrorMessage(message) {
  const container = document.getElementById('workout-editor-container');
  if (!container) return;

  const msg = document.createElement('div');
  msg.className = 'error-message';
  msg.textContent = message;
  container.appendChild(msg);

  setTimeout(() => msg.remove(), 3000);
}

// ============================
// Inicialización
// ============================

/**
 * initWorkoutEditor()
 * Inicializa el módulo y renderiza el editor.
 */
export function initWorkoutEditor() {
  resetWorkoutEditor();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWorkoutEditor);
} else {
  initWorkoutEditor();
}
