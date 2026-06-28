/**
 * statistics.js
 * Módulo para manejar estadísticas: gráficos, tendencias y métricas avanzadas.
 */

let statsData = {
  totalWorkouts: 0,
  completedWorkouts: 0,
  totalExercises: 0,
  completedExercises: 0,
  averageDuration: 0,
  weeklyProgress: [],
  monthlyProgress: [],
  streakDays: 0,
  bestDay: null,
  completionRate: 0
};

export function renderStatistics() {
  const container = document.getElementById('statistics-container');
  if (!container) return;

  container.innerHTML = '';

  const title = document.createElement('h2');
  title.textContent = 'Estadísticas y Análisis';
  title.className = 'statistics-title';
  container.appendChild(title);

  const metricsGrid = createMetricsGrid();
  container.appendChild(metricsGrid);

  const weeklyChart = createWeeklyChart();
  container.appendChild(weeklyChart);

  const monthlyChart = createMonthlyChart();
  container.appendChild(monthlyChart);

  const trendsSection = createTrendsSection();
  container.appendChild(trendsSection);
}

function createMetricsGrid() {
  const grid = document.createElement('div');
  grid.className = 'metrics-grid';

  const metrics = [
    { label: 'Total Entrenamientos', value: statsData.totalWorkouts, icon: '🏋️' },
    { label: 'Completados', value: statsData.completedWorkouts, icon: '✅' },
    { label: 'Total Ejercicios', value: statsData.totalExercises, icon: '💪' },
    { label: 'Ejercicios Completados', value: statsData.completedExercises, icon: '🎯' },
    { label: 'Duración Avg (min)', value: statsData.averageDuration, icon: '⏱️' },
    { label: 'Tasa de Completado', value: `${statsData.completionRate}%`, icon: '📊' },
    { label: 'Racha (días)', value: statsData.streakDays, icon: '🔥' },
    { label: 'Mejor Día', value: statsData.bestDay || 'N/A', icon: '🏆' }
  ];

  metrics.forEach(metric => {
    const card = document.createElement('div');
    card.className = 'metric-card';

    const icon = document.createElement('span');
    icon.className = 'metric-icon';
    icon.textContent = metric.icon;

    const value = document.createElement('span');
    value.className = 'metric-value';
    value.textContent = metric.value;

    const label = document.createElement('span');
    label.className = 'metric-label';
    label.textContent = metric.label;

    card.appendChild(icon);
    card.appendChild(value);
    card.appendChild(label);
    grid.appendChild(card);
  });

  return grid;
}

function createWeeklyChart() {
  const section = document.createElement('div');
  section.className = 'chart-section';

  const title = document.createElement('h2');
  title.textContent = 'Progreso Semanal';
  title.className = 'chart-title';

  const canvas = document.createElement('canvas');
  canvas.id = 'weekly-chart';
  canvas.width = 400;
  canvas.height = 200;
  canvas.className = 'chart-canvas';

  section.appendChild(title);
  section.appendChild(canvas);

  renderChart(canvas, statsData.weeklyProgress, 'Completados por semana');

  return section;
}

function createMonthlyChart() {
  const section = document.createElement('div');
  section.className = 'chart-section';

  const title = document.createElement('h2');
  title.textContent = 'Progreso Mensual';
  title.className = 'chart-title';

  const canvas = document.createElement('canvas');
  canvas.id = 'monthly-chart';
  canvas.width = 400;
  canvas.height = 200;
  canvas.className = 'chart-canvas';

  section.appendChild(title);
  section.appendChild(canvas);

  renderChart(canvas, statsData.monthlyProgress, 'Completados por mes');

  return section;
}

function renderChart(canvas, data, label) {
  if (!data || data.length === 0) return;

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const padding = 40;
  const chartWidth = canvas.width - padding * 2;
  const chartHeight = canvas.height - padding * 2;
  const barWidth = chartWidth / data.length - 10;
  const maxValue = Math.max(...data, 1);

  ctx.fillStyle = '#333';
  ctx.font = '14px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(label, canvas.width / 2, 20);

  for (let i = 0; i < data.length; i++) {
    const barHeight = (data[i] / maxValue) * chartHeight;
    const x = padding + i * (barWidth + 10);
    const y = padding + chartHeight - barHeight;

    ctx.fillStyle = '#4CAF50';
    ctx.fillRect(x, y, barWidth, barHeight);

    ctx.fillStyle = '#666';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(i + 1, x + barWidth / 2, padding + chartHeight + 20);

    ctx.fillStyle = '#333';
    ctx.font = '10px Arial';
    ctx.fillText(data[i], x + barWidth / 2, y - 5);
  }

  ctx.strokeStyle = '#ccc';
  ctx.beginPath();
  ctx.moveTo(padding, padding + chartHeight);
  ctx.lineTo(padding + chartWidth, padding + chartHeight);
  ctx.stroke();
}

function createTrendsSection() {
  const section = document.createElement('div');
  section.className = 'trends-section';

  const title = document.createElement('h2');
  title.textContent = 'Tendencias y Análisis';
  title.className = 'trends-title';

  const trendsList = document.createElement('ul');
  trendsList.className = 'trends-list';

  const trends = [
    {
      text: statsData.completionRate >= 80
        ? '¡Excelente! Tasa de completado muy alta'
        : statsData.completionRate >= 60
          ? 'Buen progreso, mantén el ritmo'
          : 'Necesitas mejorar tu tasa de completado',
      icon: statsData.completionRate >= 80 ? '🌟' : statsData.completionRate >= 60 ? '👍' : '💪'
    },
    {
      text: statsData.streakDays >= 7
        ? `¡Increíble! Racha de \${statsData.streakDays} días`
        : statsData.streakDays >= 3
          ? `Racha de \${statsData.streakDays} días, sigue así`
          : `Racha de \${statsData.streakDays} días, intenta mejorar`,
      icon: statsData.streakDays >= 7 ? '🔥' : statsData.streakDays >= 3 ? '⭐' : '🎯'
    },
    {
      text: statsData.averageDuration >= 60
        ? `Entrenamientos intensos: \${statsData.averageDuration} min avg`
        : statsData.averageDuration >= 30
          ? `Entrenamientos moderados: \${statsData.averageDuration} min avg`
          : `Entrenamientos cortos: \${statsData.averageDuration} min avg`,
      icon: statsData.averageDuration >= 60 ? '⚡' : statsData.averageDuration >= 30 ? '⚖️' : '🕐'
    }
  ];

  trends.forEach(trend => {
    const item = document.createElement('li');
    item.className = 'trend-item';

    const icon = document.createElement('span');
    icon.className = 'trend-icon';
    icon.textContent = trend.icon;

    const text = document.createElement('span');
    text.className = 'trend-text';
    text.textContent = trend.text;

    item.appendChild(icon);
    item.appendChild(text);
    trendsList.appendChild(item);
  });

  section.appendChild(title);
  section.appendChild(trendsList);

  return section;
}

export function updateStatsData() {
  const storageKey = 'hybrid_os_workouts_data';
  const stored = localStorage.getItem(storageKey);

  if (!stored) return;

  try {
    const workouts = JSON.parse(stored);

    let totalExercises = 0;
    let completedExercises = 0;
    let totalDuration = 0;

    workouts.forEach(workout => {
      totalExercises += workout.exercises ? workout.exercises.length : 0;
      completedExercises += workout.exercises
        ? workout.exercises.filter(ex => ex.completed).length
        : 0;
      totalDuration += workout.duration || 0;
    });

    statsData = {
      totalWorkouts: workouts.length,
      completedWorkouts: workouts.filter(w => w.completed).length,
      totalExercises,
      completedExercises,
      averageDuration: workouts.length > 0 ? Math.round(totalDuration / workouts.length) : 0,
      weeklyProgress: [],
      monthlyProgress: [],
      streakDays: 0,
      bestDay: null,
      completionRate: totalExercises > 0
        ? Math.round((completedExercises / totalExercises) * 100)
        : 0
    };
  } catch (error) {
    console.error('Error al actualizar estadísticas:', error);
  }
}

export function initStatistics() {
  updateStatsData();
  renderStatistics();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initStatistics);
} else {
  initStatistics();
}

window.addEventListener('storage', () => {
  updateStatsData();
  renderStatistics();
});
