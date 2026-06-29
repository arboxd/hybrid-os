/**
 * dashboard.js
 * Módulo para manejar la vista de dashboard: resumen, KPIs y estadísticas.
 * Hybrid Tracker v0.3.0
 */

// ============================
// Estado local del módulo
// ============================
let dashboardData = {
  totalWorkouts:      0,
  completedWorkouts:  0,
  totalExercises:     0,
  completedExercises: 0,
  currentDay:         0,
  progressPercentage: 0
};

// ============================
// renderDashboard()
// ============================
export function renderDashboard() {
  const container = document.getElementById('dashboard-container');
  if (!container) return;

  container.innerHTML = '';

  // Título
  const title = document.createElement('h2');
  title.textContent = 'Dashboard General';
  title.className = 'dashboard-title';
  container.appendChild(title);

  // KPIs
  const kpiGrid = document.createElement('div');
  kpiGrid.className = 'kpi-grid';

  kpiGrid.appendChild(createKPICard('Total Entrenamientos', dashboardData.totalWorkouts,      '🏋️'));
  kpiGrid.appendChild(createKPICard('Completados',          dashboardData.completedWorkouts,  '✅'));
  kpiGrid.appendChild(createKPICard('Total Ejercicios',     dashboardData.totalExercises,     '💪'));
  kpiGrid.appendChild(createKPICard('Progreso',             `${dashboardData.progressPercentage}%`, '📈'));

  container.appendChild(kpiGrid);

  // Resumen del día actual
  const daySummary = document.createElement('div');
  daySummary.className = 'day-summary';

  const dayTitle = document.createElement('h2');
  dayTitle.textContent = `Día ${dashboardData.currentDay + 1}`;
  dayTitle.className = 'day-summary-title';

  const dayProgress = document.createElement('p');
  dayProgress.textContent = `Ejercicios: ${dashboardData.completedExercises}${dashboardData.totalExercises}`;
  dayProgress.className = 'day-progress';

  daySummary.appendChild(dayTitle);
  daySummary.appendChild(dayProgress);
  container.appendChild(daySummary);

  // Barra de progreso
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

  // Año en footer
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// ============================
// updateDashboardData()
// ============================
export function updateDashboardData() {
  const stored = localStorage.getItem('hybrid_os_training_data');
  const data   = stored ? JSON.parse(stored) : {};

  const exercisesByDay   = data.exercisesByDay || {};
  let totalWorkouts      = 0;
  let completedWorkouts  = 0;
  let totalExercises     = 0;
  let completedExercises = 0;

  if (typeof WorkoutData !== 'undefined') {
    const week = WorkoutData.week1 || {};

    Object.values(week).forEach((workout, dayIndex) => {
      const exercises = workout.exercises || [];
      if (exercises.length === 0) return;

      totalWorkouts++;
      totalExercises += exercises.length;

      const savedDay  = exercisesByDay[dayIndex] || [];
      const completed = savedDay.filter(ex => ex.completed).length;
      completedExercises += completed;

      if (completed === exercises.length) completedWorkouts++;
    });

  } else {
    // Fallback: solo lo guardado en storage
    Object.values(exercisesByDay).forEach(exercises => {
      if (exercises.length === 0) return;
      totalWorkouts++;
      totalExercises    += exercises.length;
      const completed    = exercises.filter(ex => ex.completed).length;
      completedExercises += completed;
      if (completed === exercises.length) completedWorkouts++;
    });
  }

  const progressPercentage = totalExercises > 0
    ? Math.round((completedExercises / totalExercises) * 100)
    : 0;

  dashboardData = {
    totalWorkouts,
    completedWorkouts,
    totalExercises,
    completedExercises,
    currentDay:         data.currentDay || 0,
    progressPercentage
  };
}

// ============================
// createKPICard()
// ============================
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
// initDashboard()
// ============================
export function initDashboard() {
  updateDashboardData();
  renderDashboard();
}

// ============================
// Auto-inicialización
// ============================
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDashboard);
} else {
  initDashboard();
}

// Actualizar cuando cambia el storage
window.addEventListener('storage', () => {
  updateDashboardData();
  renderDashboard();
});

// Función para actualizar el Dashboard desde el módulo de entrenamiento
export function refreshDashboard() {
  updateDashboardData();
  renderDashboard();
}
