/**
 * training.js
 * Módulo para manejar la lógica de entrenamiento: días, ejercicios y guardado.
 */

// ============================
// Estado local del módulo
// ============================
let currentDay = 0;
let exercises = [];

// Nombres de los días de la semana
const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

// ============================
// Funciones extraídas
// ============================

export function renderTraining() {
    const container = document.getElementById('training-container');
    if (!container) return;

    // Limpiar contenedor
    container.innerHTML = '';

    // Título del día
    const dayTitle = document.createElement('h2');
    dayTitle.textContent = `${daysOfWeek[currentDay]}, Día ${currentDay + 1}`;
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

            // Campos editables para repeticiones y peso
            const repsInput = document.createElement('input');
            repsInput.type = 'number';
            repsInput.value = exercise.reps;
            repsInput.className = 'exercise-reps';
            repsInput.addEventListener('change', () => {
                exercise.reps = repsInput.value;
                saveExerciseData();
            });

            const weightInput = document.createElement('input');
            weightInput.type = 'number';
            weightInput.value = exercise.weight;
            weightInput.className = 'exercise-weight';
            weightInput.addEventListener('change', () => {
                exercise.weight = weightInput.value;
                saveExerciseData();
            });

            // Botón de completar ejercicio
            const completeBtn = document.createElement('button');
            completeBtn.textContent = 'Marcar como completado';
            completeBtn.className = 'exercise-complete';
            completeBtn.addEventListener('click', () => {
                exercise.completed = true; // Cambiar estado a completado
                checkbox.checked = true; // Marcar el checkbox
                saveExerciseData(); // Guardar los datos
                completeBtn.disabled = true; // Desactivar el botón
                completeBtn.textContent = 'Completado'; // Cambiar texto
                updateDashboard(); // Actualizar el Dashboard
            });

            // Botón de eliminar con confirmación
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '×';
            deleteBtn.className = 'exercise-delete';
            deleteBtn.addEventListener('click', () => {
                if (confirm('¿Estás seguro de que deseas eliminar este ejercicio?')) {
                    exercises.splice(index, 1);
                    saveExerciseData();
                    renderTraining();
                }
            });

            item.appendChild(checkbox);
            item.appendChild(name);
            item.appendChild(document.createTextNode(' - Reps: '));
            item.appendChild(repsInput);
            item.appendChild(document.createTextNode(' - Weight: '));
            item.appendChild(weightInput);
            item.appendChild(completeBtn); // Agregar botón de completar
            item.appendChild(deleteBtn);
            exerciseList.appendChild(item);
        });
    }

    container.appendChild(exerciseList);

    // Botones para cambiar día
    const dayControls = createDayControls();
    container.appendChild(dayControls);

    // Opción para resetear a valores predeterminados
    const resetBtn = document.createElement('button');
    resetBtn.textContent = 'Resetear Ejercicios';
    resetBtn.className = 'reset-btn';
    resetBtn.addEventListener('click', resetExercises);
    container.appendChild(resetBtn);

    // Año en footer
    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function createDayControls() {
    const dayControls = document.createElement('div');
    dayControls.className = 'day-controls';

    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '<i class="fas fa-arrow-left"></i>'; // Ícono de flecha izquierda
    prevBtn.className = 'day-btn prev';
    prevBtn.addEventListener('click', () => changeDay(-1));

    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '<i class="fas fa-arrow-right"></i>'; // Ícono de flecha derecha
    nextBtn.className = 'day-btn next';
    nextBtn.addEventListener('click', () => changeDay(1));

    dayControls.appendChild(prevBtn);
    dayControls.appendChild(nextBtn);

    return dayControls;
}

export function changeDay(delta) {
    const totalDays = 7; // Número total de días en la semana
    const newDay = currentDay + delta;

    if (newDay < 0 || newDay >= totalDays) return;

    currentDay = newDay;  
    exercises = getExercisesForDay(currentDay); // Cargar ejercicios para el nuevo día
    renderTraining();
}

export function toggleExercise(index) {
    if (index < 0 || index >= exercises.length) return;

    exercises[index].completed = !exercises[index].completed;
    saveExerciseData(); // Guardar el estado actualizado

    // Actualizar visualmente el checkbox
    const checkboxes = document.querySelectorAll('.exercise-checkbox');
    if (checkboxes[index]) {
        checkboxes[index].checked = exercises[index].completed;
    }
}

export function saveExerciseData() {
    const storageKey = 'hybrid_os_training_data';
    const data = {
        currentDay: currentDay,
        exercisesByDay: {}
    };

    data.exercisesByDay[currentDay] = exercises.map(exercise => ({
        name: exercise.name,
        reps: exercise.reps,
        weight: exercise.weight,
        completed: exercise.completed // Asegúrate de que este valor se guarde
    }));

    try {
        localStorage.setItem(storageKey, JSON.stringify(data));
    } catch (error) {
        console.error('Error al guardar datos de entrenamiento:', error);
    }
}

function getExercisesForDay(dayIndex) {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const dayName = days[dayIndex % days.length];

    const workout = WorkoutData.week1[dayName];
    const exercisesData = workout ? workout.exercises.map(exercise => ({ ...exercise, completed: false })) : [];
    
    // Cargar estado de completado si hay datos almacenados
    const storedData = JSON.parse(localStorage.getItem('hybrid_os_training_data'));
    if (storedData && storedData.exercisesByDay[dayIndex]) {
        storedData.exercisesByDay[dayIndex].forEach((storedExercise, index) => {
            if (exercisesData[index]) {
                exercisesData[index].completed = storedExercise.completed; // Actualiza el estado
            }
        });
    }

    return exercisesData;
}

function resetExercises() {
    if (confirm('¿Estás seguro de que deseas resetear todos los ejercicios?')) {
        exercises = getExercisesForDay(currentDay); // Cargar los ejercicios predeterminados
        saveExerciseData(); // Guardar la configuración
        renderTraining(); // Volver a renderizar la lista de ejercicios
    }
}

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
        exercises = getExercisesForDay(currentDay); // Cargar ejercicios por defecto en caso de que no haya datos
    }

    renderTraining();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTraining);
} else {
    initTraining();
}

function updateDashboard() {
    const dashboardModule = window.dashboardModule; // Asegúrate de que el módulo del Dashboard esté accesible
    if (dashboardModule) {
        dashboardModule.refreshDashboard(); // Llama a la función de actualización del Dashboard
    }
}
