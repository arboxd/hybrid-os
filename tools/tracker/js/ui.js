/**
 * ui.js
 * Módulo para manejar la interfaz de usuario: navegación, temas y componentes globales.
 * Optimizado y extraído de tracker.js
 */

// ============================
// Estado local del módulo
// ============================
let currentView = 'dashboard';
let currentTheme = 'light';

const VIEWS = {
  dashboard: 'dashboard-container',
  training: 'training-container',
  history: 'history-container',
  statistics: 'statistics-container',
  workoutEditor: 'workout-editor-container',
  importExport: 'import-export-container',
  profile: 'profile-container'
};

// ============================
// Funciones extraídas
// ============================

/**
 * renderUI()
 * Renderiza la estructura base de la interfaz.
 * Optimizada: genera nav dinámico y evita repeticiones de DOM.
 */
export function renderUI() {
  const app = document.getElementById('app');
  if (!app) return;

  // Limpiar app
  app.innerHTML = '';

  // Header
  const header = createHeader();
  app.appendChild(header);

  // Navegación
  const nav = createNav();
  app.appendChild(nav);

  // Contenido principal
  const main = document.createElement('main');
  main.className = 'main-content';
  main.id = 'main-content';

  // Crear contenedores de vistas
  Object.entries(VIEWS).forEach(([viewName, containerId]) => {
    const viewContainer = document.createElement('div');
    viewContainer.id = containerId;
    viewContainer.className = 'view-container';
    viewContainer.style.display = viewName === currentView ? 'block' : 'none';
    main.appendChild(viewContainer);
  });

  app.appendChild(main);

  // Footer
  const footer = createFooter();
  app.appendChild(footer);

  // Aplicar tema guardado
  applyTheme(currentTheme);
}

/**
 * createHeader()
 * Crea el header de
