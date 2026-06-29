/*
===========================================
HYBRID TRACKER
Orchestrator Module
Version 0.3.0
===========================================

Este archivo NO contiene lógica propia.
Solo importa, inicializa y coordina todos los módulos.

Módulos clásicos (window.*):
  - TrackerConfig     → config.js
  - TrackerUtils      → utils.js
  - TrackerStorage    → storage.js
  - WorkoutData       → workouts-data.js

Módulos ES (import/export):
  - ui.js
  - dashboard.js
  - training.js
  - history.js
  - statistics.js
  - workout-editor.js
  - import-export.js
  - profile.js
*/

// ============================
// Estado del orquestador
// ============================
const TrackerOrchestrator = {
  initialized: false,
  currentView: 'dashboard',

  config: null,
  utils: null,
  storage: null,
  workoutData: null,

// ============================
// Inicialización principal
// ============================

init() {
  if (this.initialized) {
    console.warn('⚠️ Tracker ya está inicializado');
    return;
  }

  if (ProfileSetup.needsSetup()) {
    ProfileSetup.render((profile) => {
      console.log(`👋 Bienvenido \${profile.name}!`);
      this.init();
    });
    return;
  }

  console.log('🚀 Iniciando Hybrid Tracker v' + TrackerConfig.VERSION);

  if (!this._verifyClassicModules()) {
    console.error('❌ Módulos clásicos no disponibles. Abortando.');
    return;
  }

  this.config      = TrackerConfig;
  this.utils       = TrackerUtils;
  this.storage     = TrackerStorage;
  this.workoutData = WorkoutData;

  this._loadSavedState();
  this._initESModules();

  this.initialized = true;

  console.log('✅ Hybrid Tracker inicializado correctamente');
},

  // ============================
  // Verificación de módulos
  // ============================

  _verifyClassicModules() {
    const required = [
      { name: 'TrackerConfig',  ref: typeof TrackerConfig  !== 'undefined' },
      { name: 'TrackerUtils',   ref: typeof TrackerUtils   !== 'undefined' },
      { name: 'TrackerStorage', ref: typeof TrackerStorage !== 'undefined' },
      { name: 'WorkoutData',    ref: typeof WorkoutData    !== 'undefined' }
    ];

    let allOk = true;

    required.forEach(mod => {
      if (!mod.ref) {
        console.error(`❌ Módulo no encontrado: \${mod.name}`);
        allOk = false;
      } else {
        console.log(`✅ \${mod.name} cargado`);
      }
    });

    return allOk;
  },

  // ============================
  // Carga de estado
  // ============================

  _loadSavedState() {
    const profile  = TrackerStorage.loadProfile();
    const history  = TrackerStorage.loadHistory();

    if (profile) {
      console.log(`👤 Perfil cargado: \${profile.name}`);
    } else {
      TrackerStorage.saveProfile(TrackerConfig.DEFAULT_PROFILE);
      console.log('👤 Perfil por defecto cargado');
    }

    console.log(`📅 Semana actual: \${TrackerConfig.DEFAULT_STATE.week}`);
    console.log(`📋 Historial: \${history.length} registros`);
  },

  // ============================
  // Coordinación de módulos ES
  // ============================

  _initESModules() {
    // Fix: solo actualizar estado interno, NO re-disparar navegación
    // para evitar el bucle infinito con ui.js
    window.addEventListener('hybrid-os:navigate', (e) => {
      const { view } = e.detail;
      this.currentView = view;
    });

    // Sincronizar módulos cuando cambia el storage
    window.addEventListener('storage', () => {
      this._syncModules();
    });

    // Escuchar errores de módulos ES
    window.addEventListener('hybrid-os:error', (e) => {
      const { module, message } = e.detail;
      console.error(`❌ Error en módulo \${module}: \${message}`);
    });

    console.log('🔗 Módulos ES coordinados');
  },

  // ============================
  // Sincronización
  // ============================

  _syncModules() {
    const training = TrackerStorage.loadTraining();
    const history  = TrackerStorage.loadHistory();

    window.dispatchEvent(new CustomEvent('hybrid-os:sync', {
      detail: { training, history }
    }));
  },

  // ============================
  // API pública
  // ============================

  /**
   * navigate(view)
   * Navega a una vista. Dispara evento marcado como 'orchestrator'
   * para que ui.js lo procese sin generar bucle.
   */
  navigate(view) {
    if (!this.initialized) {
      console.warn('⚠️ Tracker no inicializado');
      return;
    }

    window.dispatchEvent(new CustomEvent('hybrid-os:navigate', {
      detail: { view, source: 'orchestrator' }
    }));
  },

  /**
   * getProfile()
   * Retorna el perfil activo del usuario.
   */
  getProfile() {
    return TrackerStorage.loadProfile() || TrackerConfig.DEFAULT_PROFILE;
  },

  /**
   * getWorkoutForDay(week, day)
   * Retorna el workout de un día específico del plan.
   */
  getWorkoutForDay(week = 1, day = 'monday') {
    const weekKey = `week${week}`;
    if (WorkoutData[weekKey] && WorkoutData[weekKey][day]) {
      return WorkoutData[weekKey][day];
    }
    return null;
  },

  /**
   * getTodayWorkout()
   * Retorna el workout del día actual según el estado.
   */
  getTodayWorkout() {
    const state = TrackerConfig.DEFAULT_STATE;
    return this.getWorkoutForDay(state.week, state.selectedDay);
  },

  /**
   * saveProgress(data)
   * Guarda progreso de entrenamiento.
   */
  saveProgress(data) {
    if (!this.initialized) return false;
    return TrackerStorage.saveTraining(data);
  },

  /**
   * saveToHistory(entry)
   * Agrega una entrada al historial.
   */
  saveToHistory(entry) {
    if (!this.initialized) return false;

    const history = TrackerStorage.loadHistory();
    history.push({
      ...entry,
      date: TrackerUtils.today(),
      id:   TrackerUtils.uuid()
    });

    return TrackerStorage.saveHistory(history);
  },

  /**
   * exportData()
   * Exporta todos los datos usando TrackerUtils.
   */
  exportData() {
    if (!this.initialized) return;

    const data = {
      profile:    TrackerStorage.loadProfile(),
      training:   TrackerStorage.loadTraining(),
      exercises:  TrackerStorage.loadExercises(),
      history:    TrackerStorage.loadHistory(),
      exportedAt: new Date().toISOString(),
      version:    TrackerConfig.VERSION
    };

    TrackerUtils.downloadJSON(
      `hybrid-tracker-backup-${TrackerUtils.today()}.json`,
      data
    );

    console.log('📦 Datos exportados correctamente');
  },

  /**
   * importData(file)
   * Importa datos desde un archivo JSON usando TrackerUtils.
   */
  async importData(file) {
    if (!this.initialized) return;

    try {
      const data = await TrackerUtils.readJSONFile(file);

      if (!data.version) {
        console.error('❌ Archivo de backup inválido');
        return false;
      }

      if (data.profile)   TrackerStorage.saveProfile(data.profile);
      if (data.training)  TrackerStorage.saveTraining(data.training);
      if (data.exercises) TrackerStorage.saveExercises(data.exercises);
      if (data.history)   TrackerStorage.saveHistory(data.history);

      this._syncModules();

      console.log('✅ Datos importados correctamente');
      return true;

    } catch (error) {
      console.error('❌ Error al importar datos:', error);
      return false;
    }
  },

  /**
   * getState()
   * Retorna el estado actual del orquestador (para debugging).
   */
  getState() {
    return {
      initialized:  this.initialized,
      currentView:  this.currentView,
      version:      TrackerConfig.VERSION,
      profile:      this.getProfile(),
      storageKeys:  TrackerConfig.STORAGE_KEYS
    };
  }
};

// ============================
// Auto-inicialización
// ============================
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    TrackerOrchestrator.init();
  });
} else {
  TrackerOrchestrator.init();
}
