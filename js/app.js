/* js/app.js */

const SECTIONS = ['landing', 'questionnaire', 'eval-result', 'checkout', 'portal', 'kine-admin', 'academy-portal'];
const FORM_PANELS = ['formStep1', 'formStep2A', 'formStep2B', 'formStep3A', 'formStep3B', 'formStep4A', 'formStep4B', 'formStep5'];
const TOTAL_STEPS = 5;

let formStep = 1;
let formType = '';
let isDoneEx = false;
let pendingCourse = { title: '', price: '' };

document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  bindQuestionnaireCards();
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeAllModals();
  });
});

function showSection(id) {
  SECTIONS.forEach((sec) => {
    const el = document.getElementById(`section-${sec}`);
    if (el) el.classList.add('hidden');
  });

  const targetEl = document.getElementById(`section-${id}`);
  if (targetEl) {
    targetEl.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    lucide.createIcons();
  }
}

function goToLanding(anchorId) {
  closeAllModals();
  showSection('landing');
  if (!anchorId) return;
  window.setTimeout(() => {
    const target = document.getElementById(anchorId);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 80);
}

function openAppModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('hidden');
  lucide.createIcons();
}

function closeAppModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('hidden');
}

function closeAllModals() {
  document.querySelectorAll('.app-modal, #generalModal').forEach((el) => el.classList.add('hidden'));
}

function backdropClose(event, id) {
  if (event.target.id === id) closeAppModal(id);
}

function openPatientLogin() {
  openAppModal('loginPatientModal');
}

function openSpecialistLogin() {
  openAppModal('loginSpecialistModal');
}

function openAcademyLogin() {
  openAppModal('loginAcademyModal');
}

function openAgendaModal() {
  const hint = document.getElementById('agendaHint');
  if (hint) hint.classList.add('hidden');
  openAppModal('agendaModal');
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.toggle('hidden');
}

function closeGeneralModal() {
  closeAppModal('generalModal');
}

function enterPortal(sectionId) {
  closeAllModals();
  showSection(sectionId);
}

function submitAgenda() {
  const name = document.getElementById('agendaName')?.value.trim();
  const phone = document.getElementById('agendaPhone')?.value.trim();
  const comuna = document.getElementById('agendaComuna')?.value.trim();
  const hint = document.getElementById('agendaHint');

  if (!name || !phone || !comuna) {
    if (hint) {
      hint.textContent = 'Por favor completa nombre, teléfono y comuna.';
      hint.classList.remove('hidden');
    }
    return;
  }

  closeAppModal('agendaModal');
  playExerciseDemo(
    'Solicitud enviada',
    `Gracias, ${name}. Un coordinador te contactará al ${phone} para confirmar un kinesiólogo a domicilio en ${comuna}.`,
    true
  );
}

function openCoursePurchase(title, price) {
  pendingCourse = { title, price };
  const titleEl = document.getElementById('courseModalTitle');
  const priceEl = document.getElementById('courseModalPrice');
  if (titleEl) titleEl.textContent = title;
  if (priceEl) priceEl.textContent = price;
  openAppModal('courseModal');
}

function confirmCoursePurchase() {
  closeAppModal('courseModal');
  showSection('academy-portal');
}

function openArticle(title, body) {
  playExerciseDemo(title, body, true);
}

function startQuestionnaire() {
  formStep = 1;
  formType = '';
  document.getElementById('kineForm')?.reset();
  document.querySelectorAll('.q-card.is-selected').forEach((card) => card.classList.remove('is-selected'));
  hideFormHint();
  updateStepUIForm();
  showSection('questionnaire');
}

function bindQuestionnaireCards() {
  document.querySelectorAll('#kineForm .q-card, #section-checkout .q-card').forEach((card) => {
    card.addEventListener('click', () => {
      const input = card.querySelector('input[type="radio"]');
      if (!input) return;
      input.checked = true;
      markSelectedCards(input.name);
      if (input.name === 'consultaTipo') updateFormBranch();
      hideFormHint();
    });
  });
  markSelectedCards('plan');
}

function markSelectedCards(groupName) {
  document.querySelectorAll(`input[name="${groupName}"]`).forEach((input) => {
    const card = input.closest('.q-card');
    if (card) card.classList.toggle('is-selected', input.checked);
  });
}

function updateFormBranch() {
  const selected = document.querySelector('input[name="consultaTipo"]:checked');
  if (selected) formType = selected.value;
}

function currentPanelId() {
  if (formStep === 1) return 'formStep1';
  if (formStep === 2) return formType === 'prevencion' ? 'formStep2B' : 'formStep2A';
  if (formStep === 3) return formType === 'prevencion' ? 'formStep3B' : 'formStep3A';
  if (formStep === 4) return formType === 'prevencion' ? 'formStep4B' : 'formStep4A';
  return 'formStep5';
}

function requiredNameForStep() {
  if (formStep === 1) return 'consultaTipo';
  if (formStep === 2) return formType === 'prevencion' ? 'caidas' : 'bodyZone';
  if (formStep === 3) return formType === 'prevencion' ? 'apoyo' : 'intensidad';
  if (formStep === 4) return formType === 'prevencion' ? 'silla' : 'limitacion';
  return 'evalRole';
}

function showFormHint(message) {
  const hint = document.getElementById('formHint');
  if (!hint) return;
  hint.textContent = message;
  hint.classList.remove('hidden');
}

function hideFormHint() {
  const hint = document.getElementById('formHint');
  if (!hint) return;
  hint.classList.add('hidden');
  hint.textContent = '';
}

function validateCurrentStep() {
  if (formStep < 5) {
    const name = requiredNameForStep();
    const selected = document.querySelector(`input[name="${name}"]:checked`);
    if (!selected) {
      showFormHint('Por favor elige una opción antes de continuar.');
      return false;
    }
    return true;
  }

  const role = document.querySelector('input[name="evalRole"]:checked');
  const name = document.getElementById('evalName')?.value.trim();
  const email = document.getElementById('evalEmail')?.value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || '');

  if (!role) {
    showFormHint('Indica si respondes tú o un familiar.');
    return false;
  }
  if (!name) {
    showFormHint('Escribe un nombre o apodo para reconocerte.');
    return false;
  }
  if (!emailOk) {
    showFormHint('Escribe un correo válido, por ejemplo nombre@correo.com');
    return false;
  }
  return true;
}

function nextStepForm() {
  if (!validateCurrentStep()) return;
  hideFormHint();

  if (formStep < TOTAL_STEPS) {
    formStep += 1;
    updateStepUIForm();
    return;
  }

  renderEvalResult();
  showSection('eval-result');
}

function prevStepForm() {
  if (formStep > 1) {
    formStep -= 1;
    hideFormHint();
    updateStepUIForm();
  }
}

function updateStepUIForm() {
  FORM_PANELS.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });

  const panel = document.getElementById(currentPanelId());
  if (panel) panel.classList.remove('hidden');

  const pct = Math.round((formStep / TOTAL_STEPS) * 100);
  const stepEl = document.getElementById('stepIndicator');
  const pctEl = document.getElementById('stepPercent');
  const bar = document.getElementById('progressBar');
  if (stepEl) stepEl.textContent = `Pregunta ${formStep} de ${TOTAL_STEPS}`;
  if (pctEl) pctEl.textContent = `${pct}%`;
  if (bar) bar.style.width = `${pct}%`;

  document.getElementById('prevStepBtn')?.classList.toggle('hidden', formStep === 1);

  const nxtBtn = document.getElementById('nextStepBtn');
  if (nxtBtn) {
    nxtBtn.innerHTML = formStep === TOTAL_STEPS
      ? '<span>Enviar evaluación gratis</span><i data-lucide="check" class="w-5 h-5"></i>'
      : '<span>Continuar</span><i data-lucide="arrow-right" class="w-5 h-5"></i>';
  }

  lucide.createIcons();
}

function selectedValue(name) {
  return document.querySelector(`input[name="${name}"]:checked`)?.value || '';
}

function collectAnswers() {
  return {
    tipo: selectedValue('consultaTipo'),
    zona: selectedValue('bodyZone'),
    intensidad: selectedValue('intensidad'),
    limitacion: selectedValue('limitacion'),
    caidas: selectedValue('caidas'),
    apoyo: selectedValue('apoyo'),
    silla: selectedValue('silla'),
    rol: selectedValue('evalRole'),
    nombre: document.getElementById('evalName')?.value.trim() || '',
    correo: document.getElementById('evalEmail')?.value.trim() || ''
  };
}

function renderEvalResult() {
  const answers = collectAnswers();
  const lead = document.getElementById('evalResultLead');
  const list = document.getElementById('evalResultList');
  const greeting = answers.rol === 'Familiar'
    ? `Gracias, ${answers.nombre}. Recibimos la evaluación de tu familiar.`
    : `Gracias, ${answers.nombre}. Recibimos tu evaluación.`;

  const items = [];
  if (answers.tipo === 'dolor') {
    items.push(`Objetivo: tratar dolor en ${answers.zona.toLowerCase()}.`);
    items.push(`Molestia en el día a día: ${answers.intensidad.toLowerCase()}.`);
    items.push(`Movimiento más difícil: ${answers.limitacion.toLowerCase()}.`);
  } else {
    items.push('Objetivo: ganar seguridad al caminar y prevenir caídas.');
    items.push(`Caídas en el último año: ${answers.caidas.toLowerCase()}.`);
    items.push(`Apoyo al caminar: ${answers.apoyo.toLowerCase()}.`);
    items.push(`Levantarse de la silla: ${answers.silla.toLowerCase()}.`);
  }
  items.push(`Enviaremos la orientación a ${answers.correo}.`);

  if (lead) lead.textContent = greeting;
  if (list) {
    list.innerHTML = items.map((item) => `<li class="flex gap-2"><span class="text-mint-600 font-black">•</span><span>${item}</span></li>`).join('');
  }
}

function simulateEmailLink() {
  showSection('checkout');
}

function simulatePayment() {
  const consent = document.querySelector('#section-checkout input[type="checkbox"]');
  if (consent && !consent.checked) {
    playExerciseDemo('Falta el consentimiento', 'Marca el consentimiento informado para continuar con el pago de demostración.');
    return;
  }
  showSection('portal');
}

function switchPatientTab(tabName) {
  ['rutina', 'progreso', 'asistente'].forEach((tab) => {
    document.getElementById(`tab-${tab}`)?.classList.add('hidden');
    const btnEl = document.getElementById(`tab-btn-${tab}`);
    if (btnEl) btnEl.className = 'flex-1 min-w-[120px] py-3 text-sm font-bold rounded-xl text-slate-500 hover:text-slate-700';
  });

  document.getElementById(`tab-${tabName}`)?.classList.remove('hidden');
  const targetBtn = document.getElementById(`tab-btn-${tabName}`);
  if (targetBtn) targetBtn.className = 'flex-1 min-w-[120px] py-3 text-sm font-bold rounded-xl transition-all bg-white text-primary-700 shadow-sm';
}

function toggleExercise(num) {
  isDoneEx = !isDoneEx;
  const btn = document.getElementById(`btn-ex-${num}`);

  if (btn) {
    if (isDoneEx) {
      btn.innerHTML = '<i data-lucide="check-circle-2" class="w-5 h-5"></i> Sesión Registrada';
      btn.className = 'w-full py-4 rounded-xl border-2 border-emerald-500 bg-emerald-50 text-emerald-700 font-black text-sm uppercase transition-all flex justify-center items-center gap-2';
    } else {
      btn.innerHTML = '<i data-lucide="circle" class="w-5 h-5"></i> Registrar Sesión Completada';
      btn.className = 'w-full py-4 rounded-xl border-2 border-slate-300 bg-slate-50 text-slate-600 font-black text-sm uppercase transition-all flex justify-center items-center gap-2';
    }
  }
  lucide.createIcons();
}

function playExerciseDemo(title, description, hideVideo) {
  const titleEl = document.getElementById('modalTitle');
  const descEl = document.getElementById('modalBodyText');
  const media = document.getElementById('modalMedia');
  const modal = document.getElementById('generalModal');
  if (titleEl) titleEl.innerText = title;
  if (descEl) descEl.innerText = description;
  if (media) media.classList.toggle('hidden', Boolean(hideVideo));
  if (modal) modal.classList.remove('hidden');
  lucide.createIcons();
}
