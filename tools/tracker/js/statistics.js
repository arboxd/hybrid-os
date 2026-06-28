/**
 * statistics.js
 * Módulo para manejar estadísticas: gráficos, tendencias y métricas avanzadas.
 * Optimizado y extraído de tracker.js
 */

// ============================
// Estado local del módulo
// ============================
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

// ============================
// Funciones extraídas
// ============================

/**
 * renderStatistics()
 * Renderiza las estadísticas con gráficos y métricas.
 * Optimizada: usa canvas para gráficos y evita repeticiones de cálculos.
 */
export function renderStatistics() {
  const container = document.getElementById('statistics-container');
  if (!container) return;

  // Limpiar contenedor
  container.innerHTML = '';

  // Título
  const title = document.createElement('h1');
  title.textContent = 'Estadísticas y Análisis';
  title.className = 'statistics-title';
  container.appendChild(title);

  // Métricas principales
  const metricsGrid = createMetricsGrid();
  container.appendChild(metricsGrid);

  // Gráfico de progreso semanal
  const weeklyChart = createWeeklyChart();
  container.appendChild(weeklyChart);

  // Gráfico de progreso mensual
  const monthlyChart = createMonthlyChart();
  container.appendChild(monthlyChart);

  // Tendencias
  const trendsSection = createTrendsSection();
  container.appendChild(trendsSection);
}

/**
 * createMetricsGrid()
 * Crea grid de métricas principales.
 */
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

/**
 * createWeeklyChart()
 * Crea gráfico de progreso semanal.
 */
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

  // Renderizar gráfico
  renderChart(canvas, statsData.weeklyProgress, 'Completados por semana');

  return section;
}

/**
 * createMonthlyChart()
 * Crea gráfico de progreso mensual.
 */
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

  // Renderizar gráfico
  renderChart(canvas, statsData.monthlyProgress, 'Completados por mes');

  return section;
}

/**
 * renderChart(canvas, data, label)
 * Renderiza gráfico en canvas.
 * Optimizada: usa números simples y evita librerías externas.
 */
function renderChart(canvas, data, label) {
  const ctx = canvas.getContext('2d');

  // Limpiar canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Configuración
  const padding = 40;
  const chartWidth = canvas.width - padding * 2;
  const chartHeight = canvas.height - padding * 2;
  const barWidth = chartWidth / data.length - 10;

  // Máximo valor
  const maxValue = Math.max(...data, 1);

  // Título
  ctx.fillStyle = '#333';
  ctx.font = '14px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(label, canvas.width / 2, 20);

  // Renderizar barras
  for (let i = 0; i < data.length; i++) {
    const barHeight = (data[i] / maxValue) * chartHeight;
    const x = padding + i * (barWidth + 10);
    const y = padding + chartHeight - barHeight;

    // Barra
    ctx.fillStyle = '#4CAF50';
    ctx.fillRect(x, y, barWidth, barHeight);

    // Etiqueta
    ctx.fillStyle = '#666';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(i + 1, x + barWidth / 2, padding + chartHeight + 20);

    // Valor
    ctx.fillStyle = '#333';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(data[i], x + barWidth / 2, y - 5);
  }

  // Línea base
  ctx.strokeStyle = '#ccc';
  ctx.beginPath();
  ctx.moveTo(padding, padding + chartHeight);
  ctx.lineTo(padding + chartWidth, padding + chartHeight);
  ctx.stroke();
}

/**
 * createTrendsSection()
 * Crea sección de tendencias.
 */
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
          ? 'Buen progreso, mantén el Progreso'
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

    item
