/**
 * training.js
 * Módulo para manejar la lógica de entrenamiento: días, ejercicios y guardado.
 * Optimizado y extraído de tracker.js
 */

// ============================
// Estado local del módulo
// ============================
let currentDay = 0;
let exercises = [];

// ============================
// Funciones extraídas
// ============================

/**
 * renderTraining()
 * Renderiza la vista de entrenamiento con el día actual y ejercicios.
 * Optimizada: usa DOM más eficiente y evita repeticiones.
 */
export function renderTraining() {
  const container = document.getElementById('training-container');
  if (!container) return;

  // Limpiar contenedor
  container.innerHTML = '';

  // Título del día
  const dayTitle = document.createElement('h2');
  dayTitle.textContent = `Día \${currentDay + 1}`;
  dayTitle.className = 'training-day-title';
  container.appendChild(dayTitle);

  // Lista de ejercicios
  const exerciseList = document.createElement('ul');
  exerciseList.className = 'exercise-list';

  if (exercises.length === 0) {
    const emptyMsg = document.createElement('p');
    emptyMsg.textContent = 'No hay ejercicios registrados para este día.';
    emptyMsg.className = 'empty-exercises';
    container.appendChild(emptyMsg);
  } else {
    exercises.forEach((exercise, index) => {
      const item = document.createElement('li');
      item.className = 'exercise-item';

      // Checkbox para toggle
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = exercise.completed;
      checkbox.className = 'exercise-checkbox';
      checkbox.addEventListener('change', () => toggleExercise(index));

      // Texto del ejercicio
      const name = document.createElement('span');
      name.textContent = exercise.name;
      name.className = 'exercise-name';

      // Botón de eliminar
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '×';
      deleteBtn.className = 'exercise-delete';
      deleteBtn.addEventListener('click', () => {
        exercises.splice(index, 1);
        saveExerciseData();
        renderTraining();
      });

      item.appendChild(checkbox);
      item.appendChild(name);
      item.appendChild(deleteBtn);
      exerciseList.appendChild(item);
    });
  }

  container.appendChild(exerciseList);

  // Botón para cambiar día
  const dayControls = document.createElement('div');
  dayControls.className = 'day-controls';

  const prevBtn = document.createElement('button');
  prevBtn.textContent = '←';
  prevBtn.className = 'day-btn prev';
  prevBtn.addEventListener('click', () => changeDay(-1));

  const nextBtn = document.createElement('button');
  nextBtn.textContent = '→';
  nextBtn.className = 'day-btn next';
  nextBtn.addEventListener('click', () => changeDay(1));

  dayControls.appendChild(prevBtn);
  dayControls.appendChild(nextBtn);
  container.appendChild(dayControls);
}

/**
 * changeDay(delta)
 * Cambia al día anterior o siguiente.
 * Optimizada: valida límites y refresca automáticamente.
 */
export function changeDay(delta) {
  const totalDays = 12; // Número total de días en el plan
  const newDay = currentDay + delta;

  if (newDay < 0 || newDay >= totalDays) return;

  currentDay = newDay;
  exercises = getExercisesForDay(currentDay);
  renderTraining();
}

/**
 * toggleExercise(index)
 * Marca o desmarca un ejercicio como completado.
 * Optimizada: usa actualización directa en lugar de re-render completo.
 */
export function toggleExercise(index) {
  if (index < 0 || index >= exercises.length) return;

  exercises[index].completed = !exercises[index].completed;
  saveExerciseData();

  // Actualizar solo el checkbox visualmente
  const checkboxes = document.querySelectorAll('.exercise-checkbox');
  if (checkboxes[index]) {
    checkboxes[index].checked = exercises[index].completed;
  }
}

/**
 * saveExerciseData()
 * Guarda los ejercicios en localStorage.
 * Optimizada: estructura de datos más limpia y evita serializaciones repetidas.
 */
export function saveExerciseData() {
  const storageKey = 'hybrid_os_training_data';
  const data = {
    currentDay: currentDay,
    exercisesByDay: {}
  };

  // Organizar ejercicios por día
  data.exercisesByDay[currentDay] = exercises;

  try {
    localStorage.setItem(storageKey, JSON.stringify(data));
  } catch (error) {
    console.error('Error al guardar datos de entrenamiento:', error);
  }
}

// ============================
// Funciones de ayuda
// ============================

/**
 * getExercisesForDay(dayIndex)
 * Recupera ejercicios guardados para un día específico.
 */
function getExercisesForDay(dayIndex) {
  const storageKey = 'hybrid_os_training_data';
  const stored = localStorage.getItem(storageKey);

  if (!stored) return [];

  try {
    const data = JSON.parse(stored);
    return data.exercisesByDay[dayIndex] || [];
  } catch (error) {
    console.error('Error al leer datos de entrenamiento:', error);
    return [];
  }
}

// ============================
// Inicialización
// ============================

/**
 * initTraining()
 * Inicializa el módulo con datos guardados.
 */
export function initTraining() {
  const storageKey = 'hybrid_os_training_data';
  const stored = localStorage.getItem(storageKey);

  if (stored) {
    try {
      const data = JSON.parse(stored);
      currentDay = data.currentDay || 0;
      exercises = data.exercisesByDay[currentDay] || [];
    } catch (error) {
      console.error('Error al inicializar entrenamiento:', error);
      currentDay = 0;
      exercises = [];
    }
  } else {
    currentDay = 0;
    exercises = [];
  }

  renderTraining();
}

// Inicializar automáticamente si existe el DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTraining);
} else {
  initTraining();
}
