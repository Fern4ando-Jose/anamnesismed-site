/**
 * AnamnesísMed — Supabase Integration
 * ─────────────────────────────────────────────────────────────────────────
 * Arquivo: supabase-integration.js
 * Inclui em TODOS os HTMLs antes do </body>:
 *   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
 *   <script src="supabase-integration.js"></script>
 *
 * CONFIGURAR as duas linhas abaixo com suas chaves do Supabase:
 * ─────────────────────────────────────────────────────────────────────────
 */

const SUPABASE_URL      = 'https://zrntgfsciiwhwghadosg.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_qkwzDeGxE_AGcxftwH83tg_nRI_Umts';

// ── Inicializar cliente Supabase ──────────────────────────────────────────
const { createClient } = supabase;
const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── Detectar em qual página estamos ──────────────────────────────────────
const PAGE = (() => {
  const p = window.location.pathname;
  if (p.includes('landing') || p === '/' || p.endsWith('index.html')) return 'landing';
  if (p.includes('auth'))      return 'auth';
  if (p.includes('config'))    return 'config';
  if (p.includes('dashboard')) return 'dashboard';
  if (p.includes('app'))       return 'app';
  return 'unknown';
})();

// ═══════════════════════════════════════════════════════════════════════════
// AUTH — Funções de autenticação
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Envia Magic Link para o email
 * Substitui o submitLogin() e submitSignup() falsos nos HTMLs
 */
async function authSendMagicLink(email) {
  try {
    const { error } = await sb.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin + '/anamnesismed-dashboard.html'
      }
    });
    if (error) throw error;
    return { ok: true };
  } catch (err) {
    console.error('Magic link error:', err);
    return { ok: false, error: err.message };
  }
}

/**
 * Login/Cadastro com Google (OAuth)
 * Redireciona o usuário para o fluxo do Google e volta para o dashboard
 */
async function authGoogleLogin() {
  try {
    const { error } = await sb.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/anamnesismed-dashboard.html'
      }
    });
    if (error) throw error;
  } catch (err) {
    console.error('Google OAuth error:', err);
    alert('Erro ao iniciar login com Google. Tente novamente.');
  }
}

/**
 * Cadastro — salva dados extras do estudante
 * Chamado após o magic link ser clicado
 */
async function authSaveProfile(data) {
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return;

  // Verifica se já existe perfil — se não existir, é um cadastro novo
  // e precisa iniciar o trial de 30 dias (senão o paywall aparece na hora)
  const { data: existing } = await sb
    .from('profiles')
    .select('id, plano, trial_end')
    .eq('id', user.id)
    .maybeSingle();

  const payload = {
    id: user.id,
    email: user.email,
    nome: data.nome,
    sobrenome: data.sobrenome,
    universidade: data.universidade,
    ano_curso: data.ano_curso,
    idioma: data.idioma || 'es',
  };

  if (!existing || !existing.plano || (existing.plano === 'trial' && !existing.trial_end)) {
    payload.plano = 'trial';
    payload.trial_end = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  }

  const { error } = await sb.from('profiles').upsert(payload);

  if (error) console.error('Profile save error:', error);
}

/**
 * Logout
 */
async function authLogout() {
  await sb.auth.signOut();
  window.location.href = 'anamnesismed-auth.html';
}

/**
 * Obter sessão atual
 */
async function authGetSession() {
  const { data: { session } } = await sb.auth.getSession();
  return session;
}

/**
 * Obter usuário atual
 */
async function authGetUser() {
  // OBS: sb.auth.getUser() faz uma chamada de rede ao servidor de Auth que pode
  // travar/deadlockar o navegador (bug conhecido do supabase-js v2 com navigator.locks).
  // getSession() lê a sessão local (instantâneo) e já contém o usuário — usamos isso.
  const { data: { session } } = await sb.auth.getSession();
  return session ? session.user : null;
}

// ═══════════════════════════════════════════════════════════════════════════
// PROFILES — Perfil e plano do usuário
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Buscar perfil completo do usuário logado
 */
async function profileGet() {
  const user = await authGetUser();
  if (!user) return null;

  const { data, error } = await sb
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) { console.error('Profile get error:', error); return null; }
  return data;
}

/**
 * Salvar aceite dos termos de uso
 */
async function profileAcceptTerms() {
  const user = await authGetUser();
  if (!user) return { ok: false, error: 'no_user' };
  const { data, error } = await sb.from('profiles').update({ termos_aceitos: true }).eq('id', user.id).select();
  if (error) { console.error('Accept terms error:', error); return { ok: false, error }; }
  if (!data || data.length === 0) {
    console.error('Accept terms: 0 linhas atualizadas (RLS bloqueou ou perfil não existe) — user.id=', user.id);
    return { ok: false, error: 'zero_rows_updated' };
  }
  return { ok: true };
}

/**
 * Salvar tipo de usuário (medico | estudante)
 */
async function profileSetTipoUsuario(tipo) {
  const user = await authGetUser();
  if (!user) return { ok: false, error: 'no_user' };
  const { data, error } = await sb.from('profiles').update({ tipo_usuario: tipo }).eq('id', user.id).select();
  if (error) { console.error('Set tipo_usuario error:', error); return { ok: false, error }; }
  if (!data || data.length === 0) {
    console.error('Set tipo_usuario: 0 linhas atualizadas (RLS bloqueou ou perfil não existe) — user.id=', user.id);
    return { ok: false, error: 'zero_rows_updated' };
  }
  return { ok: true };
}

// ═══════════════════════════════════════════════════════════════════════════
// ONBOARDING GATE — Termos de uso + Médico ou Estudante (1ª vez após login)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Verifica o perfil e, se faltar aceitar os termos ou escolher o tipo de
 * usuário, exibe um overlay bloqueante em sequência (passo 1 → passo 2)
 * antes de liberar o uso do app/dashboard.
 */
async function onboardingCheckAndShow(profile) {
  if (!profile) return;
  const needsTerms = !profile.termos_aceitos;
  const needsTipo  = !profile.tipo_usuario;
  if (!needsTerms && !needsTipo) return;

  const lang = document.documentElement.dataset.lang || 'pt';

  const overlay = document.createElement('div');
  overlay.id = 'onboarding-gate';
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:9999;
    background:rgba(13,45,61,0.72);
    display:flex;align-items:center;justify-content:center;
    padding:20px;font-family:'Source Sans 3',system-ui,sans-serif`;

  const card = document.createElement('div');
  card.style.cssText = `
    background:#fff;border-radius:14px;max-width:460px;width:100%;
    padding:28px 26px;box-shadow:0 20px 60px rgba(0,0,0,.35);
    color:#0d2d3d`;
  overlay.appendChild(card);
  document.body.appendChild(overlay);

  function renderTerms() {
    card.innerHTML = `
      <h2 style="font-family:'Libre Baskerville',Georgia,serif;font-size:20px;margin-bottom:12px">
        ${lang==='pt' ? 'Antes de continuar' : 'Antes de continuar'}
      </h2>
      <p style="font-size:14px;line-height:1.6;color:#4b6070;margin-bottom:14px">
        ${lang==='pt'
          ? 'Para usar o AnamnesísMed você precisa ler e aceitar nossos Termos de Uso e Política de Privacidade.'
          : 'Para usar AnamnesísMed necesitas leer y aceptar nuestros Términos de Uso y Política de Privacidad.'}
      </p>
      <a href="anamnesismed-terms.html" target="_blank" rel="noopener"
         style="font-size:13px;color:#0e7490;font-weight:600;text-decoration:underline">
        ${lang==='pt' ? 'Ler os Termos de Uso e Privacidade' : 'Leer los Términos de Uso y Privacidad'}
      </a>
      <div style="display:flex;flex-direction:column;gap:12px;margin:16px 0">
        <label style="display:flex;gap:10px;align-items:flex-start;font-size:13px;line-height:1.5;cursor:pointer">
          <input type="checkbox" class="og-terms-check" style="margin-top:3px;width:16px;height:16px;flex-shrink:0;accent-color:#0e7490">
          <span>${lang==='pt'
            ? 'Entendo que o AnamnesísMed é uma <strong>ferramenta educacional</strong> e não substitui o julgamento clínico ou a responsabilidade médica.'
            : 'Entiendo que AnamnesísMed es una <strong>herramienta educativa</strong> y no sustituye el juicio clínico ni la responsabilidad médica.'}</span>
        </label>
        <label style="display:flex;gap:10px;align-items:flex-start;font-size:13px;line-height:1.5;cursor:pointer">
          <input type="checkbox" class="og-terms-check" style="margin-top:3px;width:16px;height:16px;flex-shrink:0;accent-color:#0e7490">
          <span>${lang==='pt'
            ? 'Responsabilizo-me pelo uso correto das informações e pela obtenção do <strong>consentimento dos pacientes</strong> cujos dados inserir na plataforma.'
            : 'Me responsabilizo por el uso correcto de la información y por obtener el <strong>consentimiento de los pacientes</strong> cuyos datos ingrese en la plataforma.'}</span>
        </label>
        <label style="display:flex;gap:10px;align-items:flex-start;font-size:13px;line-height:1.5;cursor:pointer">
          <input type="checkbox" class="og-terms-check" style="margin-top:3px;width:16px;height:16px;flex-shrink:0;accent-color:#0e7490">
          <span>${lang==='pt'
            ? 'Li e concordo com a <strong>Isenção de Responsabilidade Clínica</strong> (Artigo 2) e com as <strong>Limitações Técnicas</strong> (Artigo 5).'
            : 'He leído y acepto la <strong>Exención de Responsabilidad Clínica</strong> (Artículo 2) y las <strong>Limitaciones Técnicas</strong> (Artículo 5).'}</span>
        </label>
      </div>
      <button id="og-terms-btn" disabled style="
        width:100%;padding:12px;border:none;border-radius:8px;
        background:#cbd5d9;color:#fff;font-weight:700;font-size:14px;
        cursor:not-allowed;transition:background .2s">
        ${lang==='pt' ? 'Aceitar e continuar' : 'Aceptar y continuar'}
      </button>`;

    const checks = card.querySelectorAll('.og-terms-check');
    const btn    = card.querySelector('#og-terms-btn');
    function allChecked() { return Array.from(checks).every(c => c.checked); }
    checks.forEach(c => c.addEventListener('change', () => {
      btn.disabled = !allChecked();
      btn.style.background = allChecked() ? '#0e7490' : '#cbd5d9';
      btn.style.cursor = allChecked() ? 'pointer' : 'not-allowed';
    }));
    btn.addEventListener('click', async () => {
      if (!allChecked()) return;
      btn.textContent = lang==='pt' ? 'Salvando…' : 'Guardando…';
      const r = await profileAcceptTerms();
      if (!r.ok) {
        btn.textContent = lang==='pt'
          ? (r.error === 'zero_rows_updated' ? 'Não foi possível salvar (perfil não encontrado) — toque para tentar de novo' : 'Erro ao salvar — tentar novamente')
          : (r.error === 'zero_rows_updated' ? 'No se pudo guardar (perfil no encontrado) — toca para reintentar' : 'Error al guardar — reintentar');
        btn.disabled = false;
        return;
      }
      if (needsTipo) renderTipo();
      else overlay.remove();
    });
  }

  function renderTipo() {
    card.innerHTML = `
      <h2 style="font-family:'Libre Baskerville',Georgia,serif;font-size:20px;margin-bottom:12px">
        ${lang==='pt' ? 'Para personalizar sua experiência' : 'Para personalizar tu experiencia'}
      </h2>
      <p style="font-size:14px;line-height:1.6;color:#4b6070;margin-bottom:18px">
        ${lang==='pt' ? 'Você é médico(a) ou estudante de medicina?' : '¿Eres médico(a) o estudiante de medicina?'}
      </p>
      <div style="display:flex;flex-direction:column;gap:10px">
        <button class="og-tipo-btn" data-tipo="medico" style="
          padding:14px;border:1.5px solid rgba(13,45,61,0.16);border-radius:10px;
          background:#f0f4f8;color:#0d2d3d;font-weight:600;font-size:14px;
          text-align:left;cursor:pointer;transition:border-color .15s,background .15s">
          🩺 ${lang==='pt' ? 'Sou médico(a)' : 'Soy médico(a)'}
        </button>
        <button class="og-tipo-btn" data-tipo="estudante" style="
          padding:14px;border:1.5px solid rgba(13,45,61,0.16);border-radius:10px;
          background:#f0f4f8;color:#0d2d3d;font-weight:600;font-size:14px;
          text-align:left;cursor:pointer;transition:border-color .15s,background .15s">
          🎓 ${lang==='pt' ? 'Sou estudante de medicina' : 'Soy estudiante de medicina'}
        </button>
      </div>`;

    card.querySelectorAll('.og-tipo-btn').forEach(b => {
      b.addEventListener('mouseenter', () => { b.style.borderColor = '#0e7490'; });
      b.addEventListener('mouseleave', () => { b.style.borderColor = 'rgba(13,45,61,0.16)'; });
      b.addEventListener('click', async () => {
        b.textContent = lang==='pt' ? 'Salvando…' : 'Guardando…';
        const r = await profileSetTipoUsuario(b.dataset.tipo);
        if (!r.ok) {
          b.textContent = lang==='pt'
            ? (r.error === 'zero_rows_updated' ? 'Não foi possível salvar (perfil não encontrado) — toque para tentar de novo' : 'Erro ao salvar — toque para tentar novamente')
            : (r.error === 'zero_rows_updated' ? 'No se pudo guardar (perfil no encontrado) — toca para reintentar' : 'Error al guardar — toca para reintentar');
          return;
        }
        overlay.remove();
      });
    });
  }

  if (needsTerms) renderTerms();
  else renderTipo();
}

/**
 * Verificar se o acesso está ativo (trial ou plano pago)
 * Retorna: { active: bool, type: 'trial'|'pro'|'expired', daysLeft: number }
 */
async function profileCheckAccess() {
  const profile = await profileGet();
  if (!profile) return { active: false, type: 'no_profile', daysLeft: 0 };

  if (profile.plano === 'pro') {
    return { active: true, type: 'pro', daysLeft: 999 };
  }

  if (profile.plano === 'trial') {
    const trialEnd = new Date(profile.trial_end);
    const now = new Date();
    const daysLeft = Math.ceil((trialEnd - now) / (1000 * 60 * 60 * 24));

    if (daysLeft > 0) {
      return { active: true, type: 'trial', daysLeft };
    } else {
      return { active: false, type: 'expired', daysLeft: 0 };
    }
  }

  return { active: false, type: 'unknown', daysLeft: 0 };
}

// ═══════════════════════════════════════════════════════════════════════════
// HCs — Salvar, carregar, listar
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Salvar ou atualizar uma HC no banco
 */
async function hcSave(motivoId, motivo, especialidade, dados) {
  const user = await authGetUser();
  if (!user) return { ok: false, error: 'Não autenticado' };

  // Verifica se já existe uma HC para este motivo
  const { data: existing } = await sb
    .from('historias_clinicas')
    .select('id')
    .eq('user_id', user.id)
    .eq('motivo_id', motivoId)
    .order('criado_em', { ascending: false })
    .limit(1)
    .single();

  let result;
  if (existing) {
    // Atualiza existente
    result = await sb
      .from('historias_clinicas')
      .update({
        dados,
        status: 'rascunho',
        atualizado_em: new Date().toISOString()
      })
      .eq('id', existing.id);
  } else {
    // Insere nova
    result = await sb
      .from('historias_clinicas')
      .insert({
        user_id: user.id,
        motivo_id: motivoId,
        motivo,
        especialidade,
        dados,
        status: 'rascunho'
      });
  }

  if (result.error) {
    console.error('HC save error:', result.error);
    return { ok: false, error: result.error.message };
  }
  return { ok: true };
}

/**
 * Carregar dados de uma HC específica
 */
async function hcLoad(motivoId) {
  const user = await authGetUser();
  if (!user) return null;

  const { data, error } = await sb
    .from('historias_clinicas')
    .select('*')
    .eq('user_id', user.id)
    .eq('motivo_id', motivoId)
    .order('atualizado_em', { ascending: false })
    .limit(1)
    .single();

  if (error) return null;
  return data;
}

/**
 * Listar todas as HCs do usuário (para o dashboard)
 */
async function hcListAll(limit = 20) {
  const user = await authGetUser();
  if (!user) return [];

  const { data, error } = await sb
    .from('historias_clinicas')
    .select('id, motivo, motivo_id, especialidade, status, criado_em, atualizado_em')
    .eq('user_id', user.id)
    .order('atualizado_em', { ascending: false })
    .limit(limit);

  if (error) { console.error('HC list error:', error); return []; }
  return data || [];
}

/**
 * Marcar HC como completa
 */
async function hcMarkComplete(hcId) {
  const { error } = await sb
    .from('historias_clinicas')
    .update({ status: 'completa', atualizado_em: new Date().toISOString() })
    .eq('id', hcId);

  return !error;
}

/**
 * Deletar uma HC
 */
async function hcDelete(hcId) {
  const user = await authGetUser();
  if (!user) return false;

  const { error } = await sb
    .from('historias_clinicas')
    .delete()
    .eq('id', hcId)
    .eq('user_id', user.id); // garantia de segurança

  return !error;
}

// ═══════════════════════════════════════════════════════════════════════════
// GUARDS — Proteção de páginas
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Redireciona para login se não estiver autenticado
 * Usar em: dashboard.html, app.html
 */
async function guardRequireAuth() {
  const session = await authGetSession();
  if (!session) {
    window.location.href = 'anamnesismed-auth.html';
    return false;
  }
  return true;
}

/**
 * Redireciona para dashboard se já estiver autenticado
 * Usar em: auth.html, landing.html
 */
async function guardRedirectIfAuth() {
  const session = await authGetSession();
  if (session) {
    window.location.href = 'anamnesismed-dashboard.html';
    return true;
  }
  return false;
}

/**
 * Verificar acesso e mostrar paywall se expirado
 * Usar em: app.html
 */
async function guardCheckAccess() {
  const access = await profileCheckAccess();

  if (!access.active) {
    // Mostra paywall
    showPaywall(access.type);
    return false;
  }

  // Atualiza UI com dias restantes
  updateTrialUI(access);
  return true;
}

// ═══════════════════════════════════════════════════════════════════════════
// UI HELPERS — Atualizar interface com dados reais
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Preenche o nome do usuário em todos os lugares da UI
 */
async function uiUpdateUserInfo() {
  const profile = await profileGet();
  if (!profile) return;

  const nome = profile.nome || profile.email?.split('@')[0] || 'Estudante';

  // Atualiza em todos os elementos que mostram o nome
  document.querySelectorAll('[data-user-name]').forEach(el => el.textContent = nome);
  document.querySelectorAll('.sb-uname').forEach(el => el.textContent = nome);
  document.querySelectorAll('.user-name').forEach(el => el.textContent = nome);

  // Avatar com inicial
  document.querySelectorAll('.sb-avatar, .user-avatar').forEach(el => {
    el.textContent = nome.charAt(0).toUpperCase();
  });

  // Plano e dias restantes
  const access = await profileCheckAccess();
  const lang = document.documentElement.dataset.lang || 'es';

  document.querySelectorAll('.sb-uplan, .user-plan').forEach(el => {
    if (access.type === 'pro') {
      el.textContent = 'Pro';
    } else if (access.type === 'trial') {
      el.textContent = lang === 'es'
        ? `Trial — ${access.daysLeft} días`
        : `Trial — ${access.daysLeft} dias`;
    }
  });

  // Trial pill no dashboard
  const trialDaysEl = document.querySelector('.trial-days');
  if (trialDaysEl && access.type === 'trial') {
    trialDaysEl.textContent = access.daysLeft;
  }

  // Topbar trial badge
  document.querySelectorAll('.topbar-trial').forEach(el => {
    if (access.type === 'pro') {
      el.style.display = 'none';
    } else {
      el.textContent = lang === 'es'
        ? `${access.daysLeft} días gratis`
        : `${access.daysLeft} dias grátis`;
    }
  });
}

/**
 * Atualiza UI de trial
 */
function updateTrialUI(access) {
  const lang = document.documentElement.dataset.lang || 'es';
  document.querySelectorAll('.topbar-trial').forEach(el => {
    if (access.type === 'pro') {
      el.style.display = 'none';
    } else {
      el.textContent = lang === 'es'
        ? `${access.daysLeft} días gratis`
        : `${access.daysLeft} dias grátis`;
    }
  });
}

/**
 * Preenche lista de HCs recentes no dashboard
 */
async function uiLoadRecentHCs() {
  const container = document.querySelector('.hc-list');
  if (!container) return;

  const hcs = await hcListAll(5);

  if (hcs.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">📋</span>
        <div class="empty-title es">Sin historias clínicas aún</div>
        <div class="empty-title pt">Sem histórias clínicas ainda</div>
        <div class="empty-sub es">Abre el app y empieza tu primera HC</div>
        <div class="empty-sub pt">Abre o app e comece sua primeira HC</div>
        <a href="anamnesismed-app.html" class="empty-btn es">+ Nueva HC</a>
        <a href="anamnesismed-app.html" class="empty-btn pt">+ Nova HC</a>
      </div>`;
    return;
  }

  const specColors = { clinica: 'teal', cirurgia: 'red' };
  const statusLabels = {
    rascunho: { es: 'Borrador', pt: 'Rascunho', cls: 'st-draft' },
    completa: { es: 'Completa', pt: 'Completa', cls: 'st-complete' },
  };

  container.innerHTML = hcs.map(hc => {
    const color = specColors[hc.especialidade] || 'slate';
    const st = statusLabels[hc.status] || statusLabels.rascunho;
    const date = new Date(hc.atualizado_em).toLocaleDateString('pt-BR');

    return `
    <div class="hc-item" onclick="window.location.href='anamnesismed-app.html'">
      <div class="hc-type-dot" style="background:var(--${color})"></div>
      <div class="hc-item-info">
        <div class="hc-item-title">${hc.motivo || hc.motivo_id}</div>
        <div class="hc-item-meta">
          <span>${hc.especialidade === 'clinica' ? 'Clínica Médica' : 'Cirugía General'}</span>
          <span>${date}</span>
        </div>
      </div>
      <div class="hc-item-right">
        <span class="hc-status ${st.cls} es">${st.es}</span>
        <span class="hc-status ${st.cls} pt">${st.pt}</span>
        <div class="hc-actions">
          <button class="hc-action-btn" onclick="event.stopPropagation();hcDelete('${hc.id}').then(()=>uiLoadRecentHCs())" title="Eliminar">🗑️</button>
        </div>
      </div>
    </div>`;
  }).join('');
}

/**
 * Calcula e preenche os cards de estatísticas do dashboard
 * (HCs criadas, PDFs exportados, Motivos consultados) com dados reais do usuário.
 * Para um usuário novo, tudo começa zerado — nada de números fixos de exemplo.
 */
async function uiLoadStats() {
  const hcs = await hcListAll(100);
  const lang = document.documentElement.dataset.lang || 'es';

  // HCs criadas
  const hcsValueEl = document.getElementById('stat-hcs-value');
  if (hcsValueEl) hcsValueEl.textContent = String(hcs.length);

  // Badge "Minhas HCs" e contador no rodapé da sidebar — refletem o usuário real
  document.querySelectorAll('.hcs-badge').forEach(el => { el.textContent = String(hcs.length); });
  const hcsCountPt = document.getElementById('hcs-count-pt');
  const hcsCountEs = document.getElementById('hcs-count-es');
  if (hcsCountPt) hcsCountPt.textContent = String(hcs.length);
  if (hcsCountEs) hcsCountEs.textContent = String(hcs.length);

  const hcsDeltaPt = document.getElementById('stat-hcs-delta-pt');
  const hcsDeltaEs = document.getElementById('stat-hcs-delta-es');
  if (hcsDeltaPt && hcsDeltaEs) {
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const novasEstaSemana = hcs.filter(hc => new Date(hc.criado_em).getTime() >= weekAgo).length;
    if (novasEstaSemana > 0) {
      hcsDeltaPt.textContent = `+${novasEstaSemana} essa semana`;
      hcsDeltaEs.textContent = `+${novasEstaSemana} esta semana`;
    } else {
      hcsDeltaPt.textContent = hcs.length === 0 ? 'Nenhuma ainda' : '';
      hcsDeltaEs.textContent = hcs.length === 0 ? 'Ninguna aún' : '';
    }
  }

  // PDFs exportados — ainda não há rastreamento real de exportações no banco;
  // mostrar 0 em vez de um número de exemplo até essa funcionalidade existir.
  const pdfsValueEl = document.getElementById('stat-pdfs-value');
  if (pdfsValueEl) pdfsValueEl.textContent = '0';
  const pdfsDeltaPt = document.getElementById('stat-pdfs-delta-pt');
  const pdfsDeltaEs = document.getElementById('stat-pdfs-delta-es');
  if (pdfsDeltaPt && pdfsDeltaEs) {
    pdfsDeltaPt.textContent = 'Nenhum ainda';
    pdfsDeltaEs.textContent = 'Ninguno aún';
  }

  // Motivos consultados (distintos)
  const motivosUnicos = [...new Set(hcs.map(hc => hc.motivo || hc.motivo_id).filter(Boolean))];
  const motivosValueEl = document.getElementById('stat-motivos-value');
  if (motivosValueEl) motivosValueEl.textContent = String(motivosUnicos.length);

  const motivosDeltaPt = document.getElementById('stat-motivos-delta-pt');
  const motivosDeltaEs = document.getElementById('stat-motivos-delta-es');
  if (motivosDeltaPt && motivosDeltaEs) {
    if (motivosUnicos.length === 0) {
      motivosDeltaPt.textContent = 'Nenhum ainda';
      motivosDeltaEs.textContent = 'Ninguno aún';
    } else {
      const primeiro = motivosUnicos[0];
      const resto = motivosUnicos.length - 1;
      motivosDeltaPt.textContent = resto > 0 ? `${primeiro} + ${resto} mais` : primeiro;
      motivosDeltaEs.textContent = resto > 0 ? `${primeiro} + ${resto} más` : primeiro;
    }
  }
}

/**
 * Mostra paywall quando trial expirou
 */
function showPaywall(reason) {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:9999;
    background:rgba(10,12,16,.85);backdrop-filter:blur(8px);
    display:flex;align-items:center;justify-content:center;padding:20px`;

  const lang = document.documentElement.dataset.lang || 'es';
  overlay.innerHTML = `
    <div style="background:#fff;border-radius:16px;padding:40px;max-width:400px;width:100%;text-align:center">
      <div style="font-size:48px;margin-bottom:16px">⏰</div>
      <h2 style="font-family:'Playfair Display',serif;font-size:24px;font-weight:900;margin-bottom:10px">
        ${lang === 'es' ? 'Tu trial ha terminado' : 'Seu trial acabou'}
      </h2>
      <p style="font-size:14px;color:#6b6660;margin-bottom:24px;line-height:1.6">
        ${lang === 'es'
          ? 'Activa tu plan por solo <strong>$0.99/mes</strong> y sigue usando AnamnesísMed sin límites.'
          : 'Ative seu plano por apenas <strong>$0,99/mês</strong> e continue usando o AnamnesísMed sem limites.'}
      </p>
      <button onclick="window.location.href='anamnesismed-landing.html#pricing'"
        style="background:#c0392b;color:#fff;border:none;border-radius:8px;
        padding:14px 32px;font-size:15px;font-weight:600;cursor:pointer;width:100%;margin-bottom:10px">
        ${lang === 'es' ? 'Activar plan — $0.99/mes →' : 'Ativar plano — $0,99/mês →'}
      </button>
      <a href="anamnesismed-auth.html"
        style="font-size:12px;color:#6b6660;text-decoration:none;display:block">
        ${lang === 'es' ? 'Cambiar de cuenta' : 'Trocar de conta'}
      </a>
    </div>`;

  document.body.appendChild(overlay);
}

// ═══════════════════════════════════════════════════════════════════════════
// AUTO-SAVE — Salva HC automaticamente no Supabase
// ═══════════════════════════════════════════════════════════════════════════

let autoSaveTimer = null;

/**
 * Agenda autosave 2s após última alteração
 * Substitui o saveData() local do app.html
 */
function autoSaveHC(motivoId, motivo, especialidade) {
  clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(async () => {
    // Coleta todos os dados do formulário
    const dados = {};
    document.querySelectorAll('#hc-screen input, #hc-screen textarea, #hc-screen select').forEach(el => {
      if (el.id) dados[el.id] = el.value;
    });

    // Checkboxes marcados
    dados._checks = [];
    document.querySelectorAll('#hc-screen .f-check.on').forEach(el => {
      dados._checks.push(el.textContent.replace('✓', '').trim());
    });

    const result = await hcSave(motivoId, motivo, especialidade, dados);
    if (result.ok) {
      showSaveFeedback();
    }
  }, 2000);
}

/**
 * Feedback visual de salvo
 */
function showSaveFeedback() {
  let badge = document.getElementById('save-badge');
  if (!badge) {
    badge = document.createElement('div');
    badge.id = 'save-badge';
    badge.style.cssText = `
      position:fixed;bottom:80px;right:16px;z-index:500;
      background:#1e6b3c;color:#fff;font-size:11px;font-weight:700;
      padding:6px 12px;border-radius:20px;
      opacity:0;transition:opacity .3s;font-family:'DM Mono',monospace`;
    badge.textContent = '✓ Salvo';
    document.body.appendChild(badge);
  }
  badge.style.opacity = '1';
  setTimeout(() => badge.style.opacity = '0', 2000);
}

// ═══════════════════════════════════════════════════════════════════════════
// INIT — Executado automaticamente por página
// ═══════════════════════════════════════════════════════════════════════════

(async function init() {
  // Detectar mudança de auth (magic link clicado)
  sb.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && PAGE === 'auth') {
      // Magic link clicado — redirecionar para dashboard
      window.location.href = 'anamnesismed-dashboard.html';
    }
    if (event === 'SIGNED_OUT') {
      if (PAGE === 'dashboard' || PAGE === 'app') {
        window.location.href = 'anamnesismed-auth.html';
      }
    }
  });

  // Ações por página
  if (PAGE === 'auth') {
    // Se já logado, redireciona
    await guardRedirectIfAuth();

    // Substituir submitLogin e submitSignup pelos reais
    window.submitLogin = async function() {
      const emailEl = document.getElementById('login-email');
      if (!emailEl) return;
      const email = emailEl.value.trim();
      if (!email || !email.includes('@')) {
        emailEl.style.borderColor = 'var(--red)';
        return;
      }

      const btn = document.querySelector('#form-login .submit-btn');
      if (btn) { btn.classList.add('loading'); }

      const result = await authSendMagicLink(email);

      if (btn) btn.classList.remove('loading');

      if (result.ok) {
        document.getElementById('success-email-display').textContent = email;
        try { document.getElementById('success-email-pt').textContent = email; } catch(e) {}
        document.getElementById('form-wrap').style.display = 'none';
        document.getElementById('success-state').style.display = 'block';
      } else {
        alert(result.error || 'Erro ao enviar o link. Tente novamente.');
      }
    };

    window.submitSignup = async function() {
      const name  = document.getElementById('signup-name')?.value.trim();
      const email = document.getElementById('signup-email')?.value.trim();
      if (!name || !email || !email.includes('@')) return;

      const btn = document.querySelector('#form-signup .submit-btn');
      if (btn) btn.classList.add('loading');

      // Salvar dados extras temporariamente para recuperar após o click no link
      sessionStorage.setItem('am_signup_data', JSON.stringify({
        nome: name,
        sobrenome: document.getElementById('signup-last')?.value || '',
        universidade: document.getElementById('signup-uni')?.value || '',
        ano_curso: document.getElementById('signup-year')?.value || '',
        idioma: document.getElementById('signup-lang')?.value || 'es',
      }));

      const result = await authSendMagicLink(email);
      if (btn) btn.classList.remove('loading');

      if (result.ok) {
        document.getElementById('success-email-display').textContent = email;
        document.getElementById('form-wrap').style.display = 'none';
        document.getElementById('success-state').style.display = 'block';
      } else {
        alert(result.error || 'Erro ao criar conta. Tente novamente.');
      }
    };
  }

  if (PAGE === 'dashboard') {
    const ok = await guardRequireAuth();
    if (!ok) return;

    // Se tem dados de cadastro pendentes, salvar agora
    const signupData = sessionStorage.getItem('am_signup_data');
    if (signupData) {
      await authSaveProfile(JSON.parse(signupData));
      sessionStorage.removeItem('am_signup_data');
    }

    // Trava de onboarding — termos de uso + médico ou estudante (1ª vez)
    await onboardingCheckAndShow(await profileGet());

    // Atualizar UI
    await uiUpdateUserInfo();
    await uiLoadRecentHCs();
    await uiLoadStats();

    // Logout button
    const logoutBtn = document.querySelector('[data-action="logout"]');
    if (logoutBtn) logoutBtn.addEventListener('click', authLogout);
  }

  if (PAGE === 'config') {
    const ok = await guardRequireAuth();
    if (!ok) return;

    const lang = document.documentElement.dataset.lang || 'pt';
    await uiUpdateUserInfo();

    const profile = await profileGet();
    if (profile) {
      const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ''; };
      setVal('cfg-nome', profile.nome);
      setVal('cfg-sobrenome', profile.sobrenome);
      setVal('cfg-email', profile.email);
      setVal('cfg-universidade', profile.universidade);
      setVal('cfg-ano-curso', profile.ano_curso);
      setVal('cfg-idioma', profile.idioma || lang);

      const planoEl = document.getElementById('cfg-plano');
      if (planoEl) {
        if (profile.plano === 'pro') {
          planoEl.textContent = lang === 'pt' ? 'Pro' : 'Pro';
        } else {
          const trialEnd = profile.trial_end ? new Date(profile.trial_end) : null;
          const daysLeft = trialEnd ? Math.max(0, Math.ceil((trialEnd - new Date()) / (1000*60*60*24))) : 0;
          planoEl.textContent = lang === 'pt' ? `Trial — ${daysLeft} dias restantes` : `Prueba — ${daysLeft} días restantes`;
        }
      }
    }

    const form = document.getElementById('cfg-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('cfg-save-btn');
        if (btn) { btn.disabled = true; btn.textContent = lang === 'pt' ? 'Salvando...' : 'Guardando...'; }

        await authSaveProfile({
          nome: document.getElementById('cfg-nome')?.value,
          sobrenome: document.getElementById('cfg-sobrenome')?.value,
          universidade: document.getElementById('cfg-universidade')?.value,
          ano_curso: document.getElementById('cfg-ano-curso')?.value,
          idioma: document.getElementById('cfg-idioma')?.value,
        });

        if (btn) { btn.disabled = false; btn.textContent = lang === 'pt' ? 'Salvo ✓' : 'Guardado ✓'; }
        setTimeout(() => { if (btn) btn.textContent = lang === 'pt' ? 'Salvar alterações' : 'Guardar cambios'; }, 2000);
      });
    }

    const logoutBtn = document.querySelector('[data-action="logout"]');
    if (logoutBtn) logoutBtn.addEventListener('click', authLogout);
  }

  if (PAGE === 'app') {
    const ok = await guardRequireAuth();
    if (!ok) return;

    await guardCheckAccess();
    await uiUpdateUserInfo();

    // Trava de onboarding — termos de uso + médico ou estudante (1ª vez)
    await onboardingCheckAndShow(await profileGet());

    // Sobrescrever saveData para salvar no Supabase também
    const originalSave = window.saveData;
    window.saveData = function() {
      if (typeof originalSave === 'function') originalSave();
      // Auto-save no Supabase se há HC aberta
      if (window.currentHC) {
        autoSaveHC(
          window.currentHC.id,
          window.currentHC.esName,
          window.currentSpec || 'clinica'
        );
      }
    };

    // Ao abrir uma HC, carregar dados do Supabase
    const originalOpenHC = window.openHC;
    window.openHC = async function(id, esName, ptName, icon, colorVar) {
      if (typeof originalOpenHC === 'function') originalOpenHC(id, esName, ptName, icon, colorVar);

      // Carregar dados salvos do Supabase (sobrescreve localStorage)
      const hcData = await hcLoad(id);
      if (hcData?.dados) {
        const dados = hcData.dados;
        Object.entries(dados).forEach(([fid, val]) => {
          if (fid === '_checks') return;
          const el = document.getElementById(fid);
          if (el) el.value = val;
        });
        // Restaurar radio buttons
        document.querySelectorAll('#hc-screen input[type=hidden]').forEach(h => {
          if (!h.value || !h.id) return;
          h.closest('.f-radios')?.querySelectorAll('.f-radio').forEach(btn => {
            if ((btn.getAttribute('onclick') || '').includes("'" + h.value + "'")) {
              btn.classList.add('sel');
            }
          });
        });
      }
    };
  }

  if (PAGE === 'landing') {
    // Se já logado, mostrar botão "Ir ao app" em vez de "Cadastrar"
    const session = await authGetSession();
    if (session) {
      document.querySelectorAll('.nav-cta, .btn-primary').forEach(el => {
        el.textContent = document.documentElement.dataset.lang === 'pt'
          ? 'Ir ao App →'
          : 'Ir al App →';
        el.href = 'anamnesismed-dashboard.html';
        el.onclick = null;
      });
    }
  }

})();

// ═══════════════════════════════════════════════════════════════════════════
// STRIPE — Checkout (adicionar quando tiver conta Stripe)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Iniciar checkout do Stripe
 * Requer: incluir <script src="https://js.stripe.com/v3/"></script>
 * e criar uma Vercel Function em /api/create-checkout-session.js
 */
async function stripeCheckout() {
  const user = await authGetUser();
  if (!user) {
    window.location.href = 'anamnesismed-auth.html';
    return;
  }

  try {
    // Chama a Vercel Function que cria a sessão no Stripe
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, userId: user.id })
    });
    const { url } = await res.json();
    window.location.href = url; // Redireciona para o Stripe Checkout
  } catch (err) {
    console.error('Stripe checkout error:', err);
    alert('Erro ao iniciar pagamento. Tente novamente.');
  }
}

// Expõe funções globalmente para uso nos HTMLs
window.authLogout         = authLogout;
window.authSendMagicLink  = authSendMagicLink;
window.authGoogleLogin    = authGoogleLogin;
window.stripeCheckout     = stripeCheckout;
window.hcSave             = hcSave;
window.hcDelete           = hcDelete;
window.hcListAll          = hcListAll;
window.uiLoadRecentHCs    = uiLoadRecentHCs;
window.profileCheckAccess = profileCheckAccess;
window.onboardingCheckAndShow = onboardingCheckAndShow;
