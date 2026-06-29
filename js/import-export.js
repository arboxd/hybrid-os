/**
 * import-export.js
 * Módulo para manejar importación y exportación de datos del tracker.
 */

const STORAGE_KEYS = {
  training: 'hybrid_os_training_data',
  workouts: 'hybrid_os_workouts_data',
  profile: 'hybrid_os_profile_data'
};

export function renderImportExport() {
  const container = document.getElementById('import-export-container');
  if (!container) return;

  container.innerHTML = '';

  const title = document.createElement('h2');
  title.textContent = 'Importar / Exportar Datos';
  title.className = 'import-export-title';
  container.appendChild(title);

  const exportSection = createExportSection();
  container.appendChild(exportSection);

  const divider = document.createElement('hr');
  divider.className = 'section-divider';
  container.appendChild(divider);

  const importSection = createImportSection();
  container.appendChild(importSection);

  const divider2 = document.createElement('hr');
  divider2.className = 'section-divider';
  container.appendChild(divider2);

  const resetSection = createResetSection();
  container.appendChild(resetSection);
}

function createExportSection() {
  const section = document.createElement('div');
  section.className = 'export-section';

  const title = document.createElement('h2');
  title.textContent = 'Exportar Datos';
  title.className = 'section-title';

  const description = document.createElement('p');
  description.textContent = 'Descarga todos tus datos en formato JSON.';
  description.className = 'section-description';

  const optionsGrid = document.createElement('div');
  optionsGrid.className = 'export-options-grid';

  const exportOptions = [
    { label: 'Exportar Todo', type: 'all', icon: '📦' },
    { label: 'Solo Entrenamientos', type: 'training', icon: '🏋️' },
    { label: 'Solo Workouts', type: 'workouts', icon: '💪' },
    { label: 'Solo Perfil', type: 'profile', icon: '👤' }
  ];

  exportOptions.forEach(option => {
    const btn = document.createElement('button');
    btn.className = 'export-btn';
    btn.innerHTML = `${option.icon} \${option.label}`;
    btn.addEventListener('click', () => exportData(option.type));
    optionsGrid.appendChild(btn);
  });

  section.appendChild(title);
  section.appendChild(description);
  section.appendChild(optionsGrid);

  return section;
}

function createImportSection() {
  const section = document.createElement('div');
  section.className = 'import-section';

  const title = document.createElement('h2');
  title.textContent = 'Importar Datos';
  title.className = 'section-title';

  const description = document.createElement('p');
  description.textContent = 'Carga un archivo JSON previamente exportado.';
  description.className = 'section-description';

  const dropZone = document.createElement('div');
  dropZone.className = 'drop-zone';
  dropZone.id = 'drop-zone';
  dropZone.textContent = '📂 Arrastra tu archivo JSON aquí o haz clic para seleccionar';

  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.json';
  fileInput.className = 'file-input';
  fileInput.id = 'file-input';
  fileInput.style.display = 'none';

  dropZone.addEventListener('click', () => fileInput.click());

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file) handleFileImport(file);
  });

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) handleFileImport(file);
  });

  const warning = document.createElement('p');
  warning.className = 'import-warning';
  warning.textContent = '⚠️ Importar datos sobreescribirá los datos actuales.';

  section.appendChild(title);
  section.appendChild(description);
  section.appendChild(dropZone);
  section.appendChild(fileInput);
  section.appendChild(warning);

  return section;
}

function createResetSection() {
  const section = document.createElement('div');
  section.className = 'reset-section';

  const title = document.createElement('h2');
  title.textContent = 'Resetear Datos';
  title.className = 'section-title';

  const description = document.createElement('p');
  description.textContent = 'Elimina todos los datos almacenados. Esta acción no se puede deshacer.';
  description.className = 'section-description';

  const resetBtn = document.createElement('button');
  resetBtn.className = 'reset-btn danger';
  resetBtn.textContent = '🗑️ Resetear Todo';
  resetBtn.addEventListener('click', handleReset);

  section.appendChild(title);
  section.appendChild(description);
  section.appendChild(resetBtn);

  return section;
}

export function exportData(type = 'all') {
  let data = {};

  try {
    if (type === 'all' || type === 'training') {
      const training = localStorage.getItem(STORAGE_KEYS.training);
      if (training) data.training = JSON.parse(training);
    }
    if (type === 'all' || type === 'workouts') {
      const workouts = localStorage.getItem(STORAGE_KEYS.workouts);
      if (workouts) data.workouts = JSON.parse(workouts);
    }
    if (type === 'all' || type === 'profile') {
      const profile = localStorage.getItem(STORAGE_KEYS.profile);
      if (profile) data.profile = JSON.parse(profile);
    }

    data.exportedAt = new Date().toISOString();
    data.version = '1.0.0';
    data.type = type;

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `hybrid-os-backup-${type}-${Date.now()}.json`;
    link.click();

    URL.revokeObjectURL(url);
    showMessage('Datos exportados correctamente', 'success');

  } catch (error) {
    console.error('Error al exportar datos:', error);
    showMessage('Error al exportar datos', 'error');
  }
}

function handleFileImport(file) {
  if (!file || file.type !== 'application/json') {
    showMessage('Por favor selecciona un archivo JSON válido', 'error');
    return;
  }

  const reader = new FileReader();

  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);

      if (!data.version || !data.exportedAt) {
        showMessage('El archivo no es un backup válido de Hybrid OS', 'error');
        return;
      }

      importData(data);
      showMessage('Datos importados correctamente', 'success');

    } catch (error) {
      console.error('Error al importar datos:', error);
      showMessage('Error al leer el archivo JSON', 'error');
    }
  };

  reader.onerror = () => {
    showMessage('Error al leer el archivo', 'error');
  };

  reader.readAsText(file);
}

export function importData(data) {
  try {
    if (data.training) localStorage.setItem(STORAGE_KEYS.training, JSON.stringify(data.training));
    if (data.workouts) localStorage.setItem(STORAGE_KEYS.workouts, JSON.stringify(data.workouts));
    if (data.profile) localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(data.profile));

    window.dispatchEvent(new Event('storage'));

  } catch (error) {
    console.error('Error al importar datos:', error);
    throw error;
  }
}

function handleReset() {
  const confirmed = window.confirm(
    '¿Estás seguro de que quieres eliminar todos los datos?'
  );

  if (!confirmed) return;

  try {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    window.dispatchEvent(new Event('storage'));
    showMessage('Todos los datos han sido eliminados', 'success');
    renderImportExport();
  } catch (error) {
    console.error('Error al resetear datos:', error);
    showMessage('Error al resetear datos', 'error');
  }
}

function showMessage(message, type = 'success') {
  const container = document.getElementById('import-export-container');
  if (!container) return;

  const msg = document.createElement('div');
  msg.className = `${type}-message`;
  msg.textContent = message;
  container.appendChild(msg);

  setTimeout(() => msg.remove(), 3000);
}

export function initImportExport() {
  renderImportExport();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initImportExport);
} else {
  initImportExport();
}
