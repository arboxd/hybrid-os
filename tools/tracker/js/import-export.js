/**
 * import-export.js
 * Módulo para manejar importación y exportación de datos del tracker.
 * Optimizado y extraído de tracker.js
 */

// ============================
// Constantes de almacenamiento
// ============================
const STORAGE_KEYS = {
  training: 'hybrid_os_training_data',
  workouts: 'hybrid_os_workouts_data',
  profile: 'hybrid_os_profile_data'
};

// ============================
// Funciones extraídas
// ============================

/**
 * renderImportExport()
 * Renderiza la vista de importación y exportación.
 * Optimizada: usa eventos delegados y evita repeticiones de DOM.
 */
export function renderImportExport() {
  const container = document.getElementById('import-export-container');
  if (!container) return;

  // Limpiar contenedor
  container.innerHTML = '';

  // Título
  const title = document.createElement('h1');
  title.textContent = 'Importar / Exportar Datos';
  title.className = 'import-export-title';
  container.appendChild(title);

  // Sección de exportación
  const exportSection = createExportSection();
  container.appendChild(exportSection);

  // Separador
  const divider = document.createElement('hr');
  divider.className = 'section-divider';
  container.appendChild(divider);

  // Sección de importación
  const importSection = createImportSection();
  container.appendChild(importSection);

  // Separador
  const divider2 = document.createElement('hr');
  divider2.className = 'section-divider';
  container.appendChild(divider2);

  // Sección de reset
  const resetSection = createResetSection();
  container.appendChild(resetSection);
}

/**
 * createExportSection()
 * Crea la sección de exportación de datos.
 */
function createExportSection() {
  const section = document.createElement('div');
  section.className = 'export-section';

  const title = document.createElement('h2');
  title.textContent = 'Exportar Datos';
  title.className = 'section-title';

  const description = document.createElement('p');
  description.textContent = 'Descarga todos tus datos en formato JSON para hacer un backup o transferirlos a otro dispositivo.';
  description.className = 'section-description';

  // Opciones de exportación
  const optionsGrid = document.createElement('div');
  optionsGrid.className = 'export-options-grid';

  const exportOptions = [
    { label: 'Exportar Todo', type: 'all', icon: '📦' },
    { label: 'Solo Entrenamientos', type: 'training', icon: '🏋️' },
    { label: 'Solo Workouts', type: 'workouts', icon
 