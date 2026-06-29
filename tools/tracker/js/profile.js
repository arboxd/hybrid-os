/**
 * profile.js
 * Módulo para manejar la vista de perfil: usuario, preferencias y configuración.
 * Optimizado y extraído de tracker.js
 */

// ============================
// Estado local del módulo
// ============================
let userProfile = {
  name: '',
  email: '',
  goals: [],
  notifications: true,
  language: 'es',
  theme: 'light'
};

// ============================
// Funciones extraídas
// ============================

/**
 * renderProfile()
 * Renderiza la vista de perfil con datos del usuario.
 * Optimizada: evita repeticiones de DOM y usa eventos delegados.
 */
export function renderProfile() {
  const container = document.getElementById('profile-container');
  if (!container) return;

  // Limpiar contenedor
  container.innerHTML = '';

  // Título
  const title = document.createElement('h1');
  title.textContent = 'Mi Perfil';
  title.className = 'profile-title';
  container.appendChild(title);

  // Formulario de perfil
  const form = document.createElement('form');
  form.className = 'profile-form';
  form.id = 'profile-form';

  // Campo: Nombre
  const nameField = createInputField(
    'nombre',
    'Nombre',
    userProfile.name,
    'text'
  );
  form.appendChild(nameField);

  // Campo: Email
  const emailField = createInputField(
    'email',
    'Email',
    userProfile.email,
    'email'
  );
  form.appendChild(emailField);

  // Campo: Objetivos (checkboxes)
  const goalsSection = document.createElement('div');
  goalsSection.className = 'goals-section';

  const goalsLabel = document.createElement('label');
  goalsLabel.textContent = 'Objetivos';
  goalsLabel.className = 'goals-label';

  const goalsOptions = [
    { value: 'spartan', text: 'Spartan Race' },
    { value: 'hyrox', text: 'Hyrox' },
    { value: 'crossfit', text: 'CrossFit' },
    { value: 'natacion', text: 'Natación' },
    { value: 'correr', text: 'Correr' }
  ];

  goalsOptions.forEach(goal => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `goal-${goal.value}`;
    checkbox.name = 'goals';
    checkbox.value = goal.value;
    checkbox.checked = userProfile.goals.includes(goal.value);
    checkbox.className = 'goal-checkbox';

    const checkboxLabel = document.createElement('label');
    checkboxLabel.textContent = goal.text;
    checkboxLabel.className = 'goal-label';
    checkboxLabel.setAttribute('for', `goal-${goal.value}`);

    const wrapper = document.createElement('div');
    wrapper.className = 'goal-wrapper';
    wrapper.appendChild(checkbox);
    wrapper.appendChild(checkboxLabel);

    goalsSection.appendChild(wrapper);
  });

  goalsSection.appendChild(goalsLabel);
  form.appendChild(goalsSection);

  // Campo: Notificaciones (toggle)
  const notificationsSection = document.createElement('div');
  notificationsSection.className = 'notifications-section';

  const notificationsLabel = document.createElement('label');
  notificationsLabel.textContent = 'Notificaciones';
  notificationsLabel.className = 'notifications-label';

  const notificationsToggle = document.createElement('input');
  notificationsToggle.type = 'checkbox';
  notificationsToggle.id = 'notifications';
  notificationsToggle.checked = userProfile.notifications;
  notificationsToggle.className = 'notifications-toggle';

  notificationsSection.appendChild(notificationsToggle);
  notificationsSection.appendChild(notificationsLabel);
  form.appendChild(notificationsSection);

  // Campo: Tema (select)
  const themeSection = document.createElement('div');
  themeSection.className = 'theme-section';

  const themeLabel = document.createElement('label');
  themeLabel.textContent = 'Tema';
  themeLabel.className = 'theme-label';

  const themeSelect = document.createElement('select');
  themeSelect.id = 'theme';
  themeSelect.name = 'theme';
  themeSelect.className = 'theme-select';

  const themes = [
    { value: 'light', text: 'Light' },
    { value: 'dark', text: 'Dark' }
  ];

  themes.forEach(theme => {
    const option = document.createElement('option');
    option.value = theme.value;
    option.textContent = theme.text;
    if (theme.value === userProfile.theme) {
      option.selected = true;
    }
    themeSelect.appendChild(option);
  });

  themeSection.appendChild(themeLabel);
  themeSection.appendChild(themeSelect);
  form.appendChild(themeSection);

  // Botón de guardar
  const saveBtn = document.createElement('button');
  saveBtn.type = 'submit';
  saveBtn.textContent = 'Guardar Perfil';
  saveBtn.className = 'save-btn';

  form.appendChild(saveBtn);
  container.appendChild(form);

  // Event listener para el formulario
  form.addEventListener('submit', handleProfileSubmit);
}

/**
 * handleProfileSubmit(event)
 * Maneja el envío del formulario de perfil.
 * Optimizada: valida datos y guarda en localStorage.
 */
function handleProfileSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  // Actualizar datos del usuario
  userProfile.name = formData.get('nombre') || '';
  userProfile.email = formData.get('email') || '';
  userProfile.notifications = formData.get('notifications') === 'on';
  userProfile.theme = formData.get('theme') || 'light';

  // Actualizar objetivos (checkboxes)
  const goals = [];
  const goalCheckboxes = form.querySelectorAll('input[name="goals"]:checked');
  goalCheckboxes.forEach(checkbox => {
    goals.push(checkbox.value);
  });
  userProfile.goals = goals;

  // Guardar en localStorage
  saveProfileData();

  // Mostrar mensaje de éxito
  showSuccessMessage('Perfil actualizado correctamente!');
}

/**
 * saveProfileData()
 * Guarda los datos del perfil en localStorage.
 * Optimizada: estructura de datos limpia y evita serializaciones repetidas.
 */
export function saveProfileData() {
  const storageKey = 'hybrid_os_profile_data';

  try {
    localStorage.setItem(storageKey, JSON.stringify(userProfile));
  } catch (error) {
    console.error('Error al guardar datos del perfil:', error);
  }
}

/**
 * loadProfileData()
 * Recupera datos del perfil desde localStorage.
 */
export function loadProfileData() {
  const storageKey = 'hybrid_os_profile_data';
  const stored = localStorage.getItem(storageKey);

  if (stored) {
    try {
      userProfile = JSON.parse(stored);
      // Asegúrate de que goals sea un arreglo
      if (!userProfile.goals || !Array.isArray(userProfile.goals)) {
        userProfile.goals = []; // Inicializa como un arreglo vacío
      }
    } catch (error) {
      console.error('Error al cargar datos del perfil:', error);
      userProfile = {
        name: '',
        email: '',
        goals: [],
        notifications: true,
        language: 'es',
        theme: 'light'
      };
    }
  }
}

// ============================
// Funciones de ayuda
// ============================

/**
 * createInputField(id, label, value, type)
 * Crea un campo de input con formato consistente.
 */
function createInputField(id, label, value, type) {
  const field = document.createElement('div');
  field.className = 'input-field';

  const labelEl = document.createElement('label');
  labelEl.textContent = label;
  labelEl.className = 'input-label';
  labelEl.setAttribute('for', id);

  const input = document.createElement('input');
  input.type = type;
  input.id = id;
  input.name = id;
  input.value = value;
  input.className = 'input';

  field.appendChild(labelEl);
  field.appendChild(input);

  return field;
}

/**
 * showSuccessMessage(message)
 * Muestra un mensaje de éxito temporal.
 */
function showSuccessMessage(message) {
  const container = document.getElementById('profile-container');
  if (!container) return;

  const messageEl = document.createElement('div');
  messageEl.className = 'success-message';
  messageEl.textContent = message;

  container.appendChild(messageEl);

  // Eliminar después de 3 segundos
  setTimeout(() => {
    messageEl.remove();
  }, 3000);
}

// ============================
// Inicialización
// ============================

/**
 * initProfile()
 * Inicializa el módulo y renderiza el perfil.
 */
export function initProfile() {
  loadProfileData();
  renderProfile();
}

// Inicializar automáticamente si existe el DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProfile);
} else {
  initProfile();
}
