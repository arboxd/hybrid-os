/**
 * ui.js
 * Módulo para manejar la interfaz de usuario: navegación, temas y componentes globales.
 */

// ============================
// Estado local del módulo
// ============================
let currentView = 'dashboard';
let currentTheme = 'light';
let isNavigating = false;

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
// Render principal
// ============================

export function renderUI() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = '';

  const header = createHeader();
  app.appendChild(header);

  const nav = createNav();
  app.appendChild(nav);

  const main = document.createElement('main');
  main.className = 'main-content';
  main.id = 'main-content';

  Object.entries(VIEWS).forEach(([viewName, containerId]) => {
    const viewContainer = document.createElement('div');
    viewContainer.id = containerId;
    viewContainer.className = 'view-container';
    viewContainer.style.display = viewName === currentView ? 'block' : 'none';
    main.appendChild(viewContainer);
  });

  app.appendChild(main);

  const footer = createFooter();
  app.appendChild(footer);

  applyTheme(currentTheme);
}

// ============================
// Componentes
// ============================

function createHeader() {
  const header = document.createElement('header');
  header.className = 'app-header';

  const logo = document.createElement('div');
  logo.className = 'app-logo';
  logo.textContent = '⚡ Hybrid OS';

  const controls = document.createElement('div');
  controls.className = 'header-controls';

  const themeToggle = document.createElement('button');
  themeToggle.className = 'theme-toggle-btn';
  themeToggle.textContent = currentTheme === 'light' ? '🌙' : '☀️';
  themeToggle.title = 'Cambiar tema';
  themeToggle.addEventListener('click', toggleTheme);

  controls.appendChild(themeToggle);
  header.appendChild(logo);
  header.appendChild(controls);

  return header;
}

function createNav() {
  const nav = document.createElement('nav');
  nav.className = 'app-nav';

  const navItems = [
    { view: 'dashboard',     label: 'Dashboard',      icon: '📊' },
    { view: 'training',      label: 'Entrenamiento',  icon: '🏋️' },
    { view: 'history',       label: 'Historial',      icon: '📅' },
    { view: 'statistics',    label: 'Estadísticas',   icon: '📈' },
    { view: 'workoutEditor', label: 'Editor',         icon: '✏️' },
    { view: 'importExport',  label: 'Datos',          icon: '💾' },
    { view: 'profile',       label: 'Perfil',         icon: '👤' }
  ];

  const navList = document.createElement('ul');
  navList.className = 'nav-list';

  navItems.forEach(item => {
    const li = document.createElement('li');
    li.className = 'nav-item';

    const btn = document.createElement('button');
    btn.className = `nav-btn \${currentView === item.view ? 'active' : ''}`;
    btn.dataset.view = item.view;
    btn.innerHTML = `${item.icon} <span>${item.label}</span>`;
    btn.addEventListener('click', () => navigateTo(item.view));

    li.appendChild(btn);
    navList.appendChild(li);
  });

  nav.appendChild(navList);
  return nav;
}

function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'app-footer';

  const text = document.createElement('p');
  text.textContent = `Hybrid OS © \${new Date().getFullYear()} — Tracker v1.0.0`;
  text.className = 'footer-text';

  footer.appendChild(text);
  return footer;
}

// ============================
// Navegación (con fix anti-bucle)
// ============================

export function navigateTo(view) {
  // Fix: evitar bucle infinito entre ui.js y tracker.js
  if (isNavigating) return;
  if (!VIEWS[view]) {
    console.error(`Vista no encontrada: \${view}`);
    return;
  }

  isNavigating = true;

  // Ocultar vista actual
  const currentContainer = document.getElementById(VIEWS[currentView]);
  if (currentContainer) currentContainer.style.display = 'none';

  // Mostrar nueva vista
  const newContainer = document.getElementById(VIEWS[view]);
  if (newContainer) newContainer.style.display = 'block';

  // Actualizar nav activo
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === view);
  });

  // Actualizar estado
  currentView = view;

  // Disparar evento marcado con source:'ui' para que tracker.js no lo re-procese
  window.dispatchEvent(new CustomEvent('hybrid-os:navigate', {
    detail: { view, source: 'ui' }
  }));

  isNavigating = false;
}

// ============================
// Tema
// ============================

export function toggleTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(currentTheme);
  saveThemePreference(currentTheme);

  const themeBtn = document.querySelector('.theme-toggle-btn');
  if (themeBtn) themeBtn.textContent = currentTheme === 'light' ? '🌙' : '☀️';
}

export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  currentTheme = theme;
}

function saveThemePreference(theme) {
  try {
    localStorage.setItem('hybrid_os_theme', theme);
  } catch (error) {
    console.error('Error al guardar tema:', error);
  }
}

function loadThemePreference() {
  try {
    return localStorage.getItem('hybrid_os_theme') || 'light';
  } catch (error) {
    return 'light';
  }
}

// ============================
// Toast
// ============================

export function showToast(message, type = 'success', duration = 3000) {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('toast-visible');
  });

  setTimeout(() => {
    toast.classList.remove('toast-visible');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }, duration);
}

// ============================
// Modal
// ============================

export function showModal(title, content, onConfirm) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'modal-overlay';

  const modal = document.createElement('div');
  modal.className = 'modal';

  const modalTitle = document.createElement('h2');
  modalTitle.className = 'modal-title';
  modalTitle.textContent = title;

  const modalContent = document.createElement('p');
  modalContent.className = 'modal-content';
  modalContent.textContent = content;

  const modalButtons = document.createElement('div');
  modalButtons.className = 'modal-buttons';

  const confirmBtn = document.createElement('button');
  confirmBtn.className = 'modal-confirm-btn';
  confirmBtn.textContent = 'Confirmar';
  confirmBtn.addEventListener('click', () => {
    if (onConfirm) onConfirm();
    closeModal();
  });

  const cancelBtn = document.createElement('button');
  cancelBtn.className = 'modal-cancel-btn';
  cancelBtn.textContent = 'Cancelar';
  cancelBtn.addEventListener('click', closeModal);

  modalButtons.appendChild(confirmBtn);
  modalButtons.appendChild(cancelBtn);
  modal.appendChild(modalTitle);
  modal.appendChild(modalContent);
  modal.appendChild(modalButtons);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
}

export function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) overlay.remove();
}

// ============================
// Inicialización
// ============================

export function initUI() {
  currentTheme = loadThemePreference();
  renderUI();

  // Fix: ignorar eventos que generó el propio ui.js (source: 'ui')
  // Solo procesar los que vienen del orquestador (source: 'orchestrator')
  window.addEventListener('hybrid-os:navigate', (e) => {
    const { view, source } = e.detail;
    if (source === 'ui') return;
    if (view && VIEWS[view]) navigateTo(view);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initUI);
} else {
  initUI();
}
