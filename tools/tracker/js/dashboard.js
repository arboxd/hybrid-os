/**
 * dashboard.js
 * Módulo para manejar la vista de dashboard: resumen, KPIs y estadísticas.
 * Optimizado y extraído de tracker.js
 */

// ============================
// Estado local del módulo
// ============================
let dashboardData = {
  totalWorkouts: 0,
  completedWorkouts: 0,
  totalExercises: 0,
  completedExercises: 0,
  currentDay: 0,
  progressPercentage: 0
};

// ============================
// Funciones extraídas
// ============================

/**
 * renderDashboard()
 * Renderiza el dashboard con KPIs y resumen general.
 * Optimizada: usa template literals y evita repeticiones de DOM.
 */
export function renderDashboard() {
  const container = document.getElementById('dashboard-container');
  if (!container) return;

  // Limpiar contenedor
  container.innerHTML = '';

  // Título
  const title = document.createElement('h1');
  title.textContent = 'Dashboard General';
  title.className = 'dashboard-title';
  container.appendChild(title);

  // KPIs principales
  const kpiGrid = document.createElement('div');
  kpiGrid.className = 'kpi-grid';

  // KPI 1: Total de entrenamientos
  const kpi1 = createKPICard(
    'Total Entrenamientos',
    dashboardData.totalWorkouts,
    '🏋️'
  );
  kpiGrid.appendChild(kpi1);

  // KPI 2: Entrenamientos completados
  const kpi2 = createKPICard(
    'Completados',
    dashboardData.completedWorkouts,
    '✅'
  );
  kpiGrid.appendChild(kpi2);

  // KPI 3: Total de ejercicios
  const kpi3 = createKPICard(
    'Total Ejercicios',
    dashboardData.totalExercises,
    '💪'
  );
  kpiGrid.appendChild(kpi3);

  // KPI 4: Progreso
  const kpi4 = createKPICard(
    'Progreso',
    `${dashboardData.progressPercentage}%`,
    '📈'
  );
  kpiGrid.appendChild(kpi4);

  container.appendChild(kpiGrid);

  // Resumen del día actual
  const daySummary = document.createElement('div');
  daySummary.className = 'day-summary';

  const dayTitle = document.createElement('h2');
  dayTitle.textContent = `Día \${dashboardData.currentDay + 1}`;
  dayTitle.className = 'day-summary-title';

  const dayProgress = document.createElement('p');
  dayProgress.textContent = `Ejercicios: \${dashboardData.completedExercises}/${dashboardData.totalExercises}`;
  dayProgress.className = 'day-progress';

  daySummary.appendChild(dayTitle);
  daySummary.appendChild(dayProgress);
  container.appendChild(daySummary);

  // Barra de progreso visual
  const progressSection = document.createElement('div');
  progressSection.className = 'progress-section';

  const progressLabel = document.createElement('span');
  progressLabel.textContent = 'Progreso del plan';
  progressLabel.className = 'progress-label';

  const progressBar = document.createElement('div');
  progressBar.className = 'progress-bar';

  const progressFill = document.createElement('div');
  progressFill.className = 'progress-fill';
  progressFill.style.width = `${dashboardData.progressPercentage}%`;

  progressBar.appendChild(progressFill);
  progressSection.appendChild(progressLabel);
  progressSection.appendChild(progressBar);
  container.appendChild(progressSection);
}

/**
 * updateDashboardData()
 * Actualiza los datos del dashboard desde localStorage.
 * Optimizada: calcula KPIs en una sola iteración.
 */
export function updateDashboardData() {
  const storageKey = 'hybrid_os_training_data';
  const stored = localStorage.getItem(storageKey);

  if (!stored) {
    dashboardData = {
      totalWorkouts: 0,
      completedWorkouts: 0,
      totalExercises: 0,
      completedExercises: 0,
      currentDay: 0,
      progressPercentage: 0
    };
    return;
  }

  try {
    const data = JSON.parse(stored);
    const exercisesByDay = data.exercisesByDay || {};
    const totalDays = 12;

    // Calcular KPIs en una sola iteración
    let totalWorkouts = 0;
    let completedWorkouts = 0;
    let totalExercises = 0;
    let completedExercises = 0;

    for (let day = 0; day < totalDays; day++) {
      const exercises = exercisesByDay[day] || [];
      if (exercises.length > 0) {
        totalWorkouts++;
        totalExercises += exercises.length;
        const completed = exercises.filter(ex => ex.completed).length;
        completedWorkouts++;
        completedExercises += completed;
      }
    }

    // Calcular progreso
    const progressPercentage = totalExercises > 0 
      ? Math.round((completedExercises / totalExercises) * 100)
      : 0;

    dashboardData = {
      totalWorkouts,
      completedWorkouts,
      totalExercises,
      completedExercises,
      currentDay: data.currentDay || 0,
      progressPercentage
    };

  } catch (error) {
    console.error('Error al actualizar datos del dashboard:', error);
    dashboardData = {
      totalWorkouts: 0,
      completedWorkouts: 0,
      totalExercises: 0,
      completedExercises: 0,
      currentDay: 0,
      progressPercentage: 0
    };
  }
}

// ============================
// Funciones de ayuda
// ============================

/**
 * createKPICard(title, value, icon)
 * Crea una tarjeta KPI con formato consistente.
 * Optimizada: usa template literal para evitar concatenaciones.
 */
function createKPICard(title, value, icon) {
  const card = document.createElement('div');
  card.className = 'kpi-card';

  const iconSpan = document.createElement('span');
  iconSpan.className = 'kpi-icon';
  iconSpan.textContent = icon;

  const valueSpan = document.createElement('span');
  valueSpan.className = 'kpi-value';
  valueSpan.textContent = value;

  const titleSpan = document.createElement('span');
  titleSpan.className = 'kpi-title';
  titleSpan.textContent = title;

  card.appendChild(iconSpan);
  card.appendChild(valueSpan);
  card.appendChild(titleSpan);

  return card;
}

// ============================
// Inicialización
// ============================

/**
 * initDashboard()
 * Inicializa el módulo y renderiza el dashboard.
 */
export function initDashboard() {
  updateDashboardData();
  renderDashboard();
}

// Inicializar automáticamente si existe el DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDashboard);
} else {
  initDashboard();
}

// Actualizar datos cuando se guardan cambios
window.addEventListener('storage', () => {
  updateDashboardData();
  renderDashboard();
});
