/* =========================================
   profile-setup.js
   Hybrid Tracker v0.1.0-alpha
   Pantalla de bienvenida y configuración
   inicial de perfil.
   Script clásico — sin módulos ES
   ========================================= */

const ProfileSetup = {

  // ============================
  // Perfil por defecto de Obed
  // ============================
  defaultProfile: {
    name:      'Obed',
    age:       38,
    weight:    80,
    height:    171,
    goal:      'spartan',
    recovery:  85,
    sleep:     7,
    hydration: 2,
    hrv:       65,
    restingHR: 55,
    setupDone: true
  },

  // ============================
  // Verificar si necesita setup
  // ============================
  needsSetup() {
    try {
      const raw = localStorage.getItem('hybrid_os_profile_data');
      if (!raw) return true;
      const profile = JSON.parse(raw);
      return !profile || !profile.setupDone;
    } catch {
      return true;
    }
  },

  // ============================
  // Render pantalla de bienvenida
  // ============================
  render(onComplete) {
    const app = document.getElementById('app');
    if (!app) return;

    // Ocultar header y nav mientras dura el setup
    const header = document.querySelector('.header');
    const nav    = document.querySelector('.navigation');
    if (header) header.style.display = 'none';
    if (nav)    nav.style.display    = 'none';

    const screen = document.createElement('div');
    screen.className = 'setup-screen';
    screen.id = 'setup-screen';

    screen.innerHTML = `
      <div class="setup-container">

        <!-- Logo -->
        <div class="setup-logo">
          <span class="setup-logo-icon">⚡</span>
          <p class="setup-logo-title">HYBRID TRACKER</p>
          <p class="setup-logo-subtitle">Hybrid Athlete Training Platform</p>
        </div>

        <!-- Bienvenida -->
        <div class="setup-welcome">
          <h2 class="setup-welcome-title">Bienvenido 👋</h2>
          <p class="setup-welcome-text">
            Configura tu perfil para comenzar. Puedes actualizar estos datos
            en cualquier momento desde la sección de Recovery.
          </p>
        </div>

        <!-- Formulario -->
        <form class="setup-form" id="setup-form" novalidate>

          <!-- Paso 1: Datos personales -->
          <div class="setup-step active" id="step-1">

            <h3 class="step-title">Datos Personales</h3>

            <div class="form-group">
              <label class="form-label" for="setup-name">Nombre</label>
              <input
                class="form-input"
                type="text"
                id="setup-name"
                placeholder="Tu nombre"
                value="${this.defaultProfile.name}"
                required>
              <span class="form-hint">Así te identificarás en el tracker</span>
            </div>

            <div class="form-row">

              <div class="form-group">
                <label class="form-label" for="setup-age">Edad</label>
                <input
                  class="form-input"
                  type="number"
                  id="setup-age"
                  min="10" max="99"
                  placeholder="${this.defaultProfile.age}"
                  value="${this.defaultProfile.age}">
              </div>

              <div class="form-group">
                <label class="form-label" for="setup-weight">Peso (kg)</label>
                <input
                  class="form-input"
                  type="number"
                  id="setup-weight"
                  min="30" max="300" step="0.1"
                  placeholder="${this.defaultProfile.weight}"
                  value="${this.defaultProfile.weight}">
              </div>

              <div class="form-group">
                <label class="form-label" for="setup-height">Altura (cm)</label>
                <input
                  class="form-input"
                  type="number"
                  id="setup-height"
                  min="100" max="250"
                  placeholder="${this.defaultProfile.height}"
                  value="${this.defaultProfile.height}">
              </div>

            </div>

            <div class="form-group">
              <label class="form-label" for="setup-goal">Objetivo Principal</label>
              <select class="form-select" id="setup-goal">
                <option value="spartan"   selected>🏔️ Spartan Race</option>
                <option value="hyrox">⚡ Hyrox</option>
                <option value="triathlon">🏊 Triatlón</option>
                <option value="marathon">🏃 Maratón</option>
                <option value="general">💪 Fitness General</option>
              </select>
            </div>

            <button type="button" class="btn-setup-next" id="step-1-next">
              Siguiente →
            </button>

          </div>

          <!-- Paso 2: Métricas de recovery -->
          <div class="setup-step" id="step-2">

            <h3 class="step-title">Métricas de Recovery</h3>
            <p class="step-subtitle">
              Estos valores se usarán como punto de partida.
              Puedes actualizarlos diariamente.
            </p>

            <div class="form-row">

              <div class="form-group">
                <label class="form-label" for="setup-sleep">😴 Sueño (h)</label>
                <input
                  class="form-input"
                  type="number"
                  id="setup-sleep"
                  min="0" max="24" step="0.5"
                  value="${this.defaultProfile.sleep}">
              </div>

              <div class="form-group">
                <label class="form-label" for="setup-hydration">💧 Hidratación (L)</label>
                <input
                  class="form-input"
                  type="number"
                  id="setup-hydration"
                  min="0" max="10" step="0.1"
                  value="${this.defaultProfile.hydration}">
              </div>

            </div>

            <div class="form-row">

              <div class="form-group">
                <label class="form-label" for="setup-hrv">💪 HRV (ms)</label>
                <input
                  class="form-input"
                  type="number"
                  id="setup-hrv"
                  min="0"
                  value="${this.defaultProfile.hrv}">
              </div>

              <div class="form-group">
                <label class="form-label" for="setup-hr">❤️ FC Reposo (bpm)</label>
                <input
                  class="form-input"
                  type="number"
                  id="setup-hr"
                  min="0"
                  value="${this.defaultProfile.restingHR}">
              </div>

            </div>

            <div class="setup-buttons">
              <button type="button" class="btn-setup-back" id="step-2-back">
                ← Atrás
              </button>
              <button type="button" class="btn-setup-next" id="step-2-next">
                Siguiente →
              </button>
            </div>

          </div>

          <!-- Paso 3: Confirmación -->
          <div class="setup-step" id="step-3">

            <h3 class="step-title">¡Todo listo! 🎉</h3>

            <div class="setup-summary" id="setup-summary">
              <!-- Se llena dinámicamente -->
            </div>

            <p class="setup-note">
              Estos son tus datos por defecto. Puedes editarlos en cualquier
              momento desde la sección de Recovery.
            </p>

            <div class="setup-buttons">
              <button type="button" class="btn-setup-back" id="step-3-back">
                ← Atrás
              </button>
              <button type="submit" class="btn-setup-confirm" id="setup-confirm">
                🚀 Comenzar Entrenamiento
              </button>
            </div>

          </div>

        </form>

        <!-- Indicador de pasos -->
        <div class="setup-steps-indicator">
          <span class="step-dot active" data-step="1"></span>
          <span class="step-dot" data-step="2"></span>
          <span class="step-dot" data-step="3"></span>
        </div>

      </div>
    `;

    app.appendChild(screen);
    this._bindEvents(onComplete);
  },

  // ============================
  // Lógica de pasos
  // ============================
  _bindEvents(onComplete) {
    const self = this;

    function goToStep(step) {
      document.querySelectorAll('.setup-step').forEach(el => {
        el.classList.remove('active');
      });
      document.getElementById(`step-${step}`).classList.add('active');

      document.querySelectorAll('.step-dot').forEach(dot => {
        dot.classList.toggle('active', parseInt(dot.dataset.step) <= step);
      });

      if (step === 3) self._fillSummary();
    }

    // Paso 1 → 2
    document.getElementById('step-1-next').addEventListener('click', () => {
      const name = document.getElementById('setup-name').value.trim();
      if (!name) {
        document.getElementById('setup-name').focus();
        return;
      }
      goToStep(2);
    });

    // Paso 2 → 1
    document.getElementById('step-2-back').addEventListener('click', () => goToStep(1));

    // Paso 2 → 3
    document.getElementById('step-2-next').addEventListener('click', () => goToStep(3));

    // Paso 3 → 2
    document.getElementById('step-3-back').addEventListener('click', () => goToStep(2));

    // Submit final
    document.getElementById('setup-form').addEventListener('submit', (e) => {
      e.preventDefault();
      self._saveProfile(onComplete);
    });
  },

  // ============================
  // Resumen en paso 3
  // ============================
  _fillSummary() {
    const summary = document.getElementById('setup-summary');
    if (!summary) return;

    const goalLabels = {
      spartan:   '🏔️ Spartan Race',
      hyrox:     '⚡ Hyrox',
      triathlon: '🏊 Triatlón',
      marathon:  '🏃 Maratón',
      general:   '💪 Fitness General'
    };

    const name      = document.getElementById('setup-name').value      || 'Obed';
    const age       = document.getElementById('setup-age').value       || 38;
    const weight    = document.getElementById('setup-weight').value    || 80;
    const height    = document.getElementById('setup-height').value    || 171;
    const goal      = document.getElementById('setup-goal').value      || 'spartan';
    const sleep     = document.getElementById('setup-sleep').value     || 7;
    const hydration = document.getElementById('setup-hydration').value || 2;
    const hrv       = document.getElementById('setup-hrv').value       || 65;
    const hr        = document.getElementById('setup-hr').value        || 55;

    summary.innerHTML = `
      <div class="summary-grid">
        <div class="summary-item">
          <span class="summary-label">Nombre</span>
          <span class="summary-value">${name}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Edad</span>
          <span class="summary-value">${age} años</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Peso</span>
          <span class="summary-value">${weight} kg</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Altura</span>
          <span class="summary-value">${height} cm</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Objetivo</span>
          <span class="summary-value">${goalLabels[goal]}</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Sueño</span>
          <span class="summary-value">${sleep}h</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">Hidratación</span>
          <span class="summary-value">${hydration}L</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">HRV</span>
          <span class="summary-value">${hrv} ms</span>
        </div>
        <div class="summary-item">
          <span class="summary-label">FC Reposo</span>
          <span class="summary-value">${hr} bpm</span>
        </div>
      </div>
    `;
  },

  // ============================
  // Guardar perfil
  // ============================
  _saveProfile(onComplete) {
    const profile = {
      name:      document.getElementById('setup-name').value.trim()           || 'Obed',
      age:       parseInt(document.getElementById('setup-age').value)         || 38,
      weight:    parseFloat(document.getElementById('setup-weight').value)    || 80,
      height:    parseInt(document.getElementById('setup-height').value)      || 171,
      goal:      document.getElementById('setup-goal').value                  || 'spartan',
      recovery:  85,
      sleep:     parseFloat(document.getElementById('setup-sleep').value)     || 7,
      hydration: parseFloat(document.getElementById('setup-hydration').value) || 2,
      hrv:       parseInt(document.getElementById('setup-hrv').value)         || 65,
      restingHR: parseInt(document.getElementById('setup-hr').value)          || 55,
      setupDone: true,
      createdAt: new Date().toISOString()
    };

    try {
      localStorage.setItem('hybrid_os_profile_data', JSON.stringify(profile));
      console.log(`✅ Perfil guardado: ${profile.name}`);

      // Remover pantalla de setup
      const screen = document.getElementById('setup-screen');
      if (screen) screen.remove();

      // Restaurar header y nav
      const header = document.querySelector('.header');
      const nav    = document.querySelector('.navigation');
      if (header) header.style.display = '';
      if (nav)    nav.style.display    = '';

      if (onComplete) onComplete(profile);

    } catch (error) {
      console.error('❌ Error al guardar perfil:', error);
    }
  },

  // ============================
  // Resetear setup (para testing)
  // ============================
  reset() {
    localStorage.removeItem('hybrid_os_profile_data');
    console.log('🔄 Setup reseteado — recarga la página para ver el setup');
  }

};
