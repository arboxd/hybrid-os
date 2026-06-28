/*
===========================================
HYBRID TRACKER
Orchestrator Module
Version 0.3.0
===========================================

Este archivo NO contiene lógica propia.
Solo importa, inicializa y coordina todos los módulos.

Módulos clásicos (window.*):
  - TrackerConfig   → config.js
  - TrackerUtils    → utils.js
  - TrackerStorage  → storage.js
  - WorkoutData     → workouts-data.js

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

  // Referencias a módulos clásicos (disponibles en window)
  config: null,
  utils: null,
  storage: null,
  workoutData: null,

  // ============================
  // Inicialización principal
  // ============================

  /**
   * init()
   * Punto de entrada único del tracker.
   * Verifica módulos clásicos y lanza módulos ES.
   */
  init() {
    if (this.initialized) {
      console.warn('⚠️ Tracker ya está inicializado');
      return;
    }

    console.log('🚀 Iniciando Hybrid Tracker v' + TrackerConfig.VERSION);

    // 1. Verificar módulos clásicos
    if (!this._verifyClassicModules()) {
      console.error('❌ Módulos clásicos no disponibles. Abortando.');
      return;
    }

    // 2. Asignar referencias
    this.config = TrackerConfig;
    this.utils = TrackerUtils;
    this.storage = TrackerStorage;
    this.workoutData = WorkoutData;

    // 3. Cargar estado guardado
    this._loadSavedState();

    // 4. Inicializar módulos ES (via eventos)
    this._initESModules();

    // 5. Marcar como inicializado
    this.initialized = true;

    console.log('✅ Hybrid Tracker inicializado correctamente');
  },

  // ============================
  // Verificación de módulos
  // ============================

  /**
   * _verifyClassicModules()
   * Verifica que los 4 módulos clásicos estén disponibles en window.
   */
  _verifyClassicModules() {
    const required = [
      { name: 'TrackerConfig', ref: typeof TrackerConfig !== 'undefined' },
      { name: 'TrackerUtils', ref: typeof TrackerUtils !== 'undefined' },
      { name: 'TrackerStorage', ref: typeof TrackerStorage !== 'undefined' },
      { name: 'WorkoutData', ref: typeof WorkoutData !== 'undefined' }
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

  /**
   * _loadSavedState()
   * Carga el estado guardado desde storage.
   */
  _loadSavedState() {
    const profile = TrackerStorage.loadProfile();
    const training = TrackerStorage.loadTraining();
    const history = TrackerStorage.loadHistory();
    const exercises = TrackerStorage.loadExercises();

    if (profile) {
      console.log(`👤 Perfil cargado: \${profile.name}`);
    } else {
      // Usar perfil por defecto de config
      TrackerStorage.saveProfile(TrackerConfig.DEFAULT_PROFILE);
      console.log('👤 Perfil por defecto cargado');
    }

    console.log(`📅 Semana actual: \${TrackerConfig.DEFAULT_STATE.week}`);
    console.log(`📋 Historial: \${history.length} registros`);
  },

  // ============================
  // Inicialización de módulos ES
  // ============================

  /**
   * _initESModules()
   * Coordina la inicialización de los módulos ES via eventos del DOM.
   * Los módulos ES se auto-inicializan, aquí solo coordinamos el orden.
   */
  _initESModules() {
    // Escuchar navegación desde módulos ES
    window.addEventListener('hybrid-os:navigate', (e) => {
      const { view } = e.detail;
      this.currentView = view;
      console.log(`📍 Vista activa: \${view}`);
    });

    // Escuchar cambios en storage desde módulos ES
    window.addEventListener('storage', () => {
      console.log('💾 Storage actualizado, sincronizando...');
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

  /**
   * _syncModules()
   * Sincroniza el estado entre módulos clásicos y ES.
   */
  _syncModules() {
    // Re-cargar estado desde storage
    const training = TrackerStorage.loadTraining();
    const history = TrackerStorage.loadHistory();

    // Notificar a módulos ES via evento
    window.dispatchEvent(new CustomEvent('hybrid-os:sync', {
      detail: { training, history }
    }));
  },

  // ============================
  // API pública del orquestador
  // ============================

  /**
   * navigate(view)
   * Navega a una vista específica.
   */
  navigate(view) {
    if (!this.initialized) {
      console.warn('⚠️ Tracker no inicializado');
      return;
    }

    window.dispatchEvent(new CustomEvent('hybrid-os:navigate', {
      detail: { view }
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
   * Retorna el workout de un día específico.
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
   * Retorna el workout del día actual.
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
      id: TrackerUtils.uuid()
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
      profile: TrackerStorage.loadProfile(),
      training: TrackerStorage.loadTraining(),
      exercises: TrackerStorage.loadExercises(),
      history: TrackerStorage.loadHistory(),
      exportedAt: new Date().toISOString(),
      version: TrackerConfig.VERSION
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

      if (data.profile) TrackerStorage.saveProfile(data.profile);
      if (data.training) TrackerStorage.saveTraining(data.training);
      if (data.exercises) TrackerStorage.saveExercises(data.exercises);
      if (data.history) TrackerStorage.saveHistory(data.history);

      // Sincronizar módulos ES
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
      initialized: this.initialized,
      currentView: this.currentView,
      version: TrackerConfig.VERSION,
      profile: this.getProfile(),
      storageKeys: TrackerConfig.STORAGE_KEYS
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
