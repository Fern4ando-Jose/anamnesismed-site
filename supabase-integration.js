/**
 * AnamnesísMed — Supabase Integration
 * ─────────────────────────────────────────────────────────────────────────
 * Arquivo: supabase-integration.js
 * Inclui em TODOS os HTMLs antes do </body>:
 *   <script src="/vendor/supabase-2.110.2.js"></script>   (hospedado no próprio domínio; v2.110.2)
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

// ── Escape de HTML — usar SEMPRE que dado do usuário/paciente entrar em innerHTML.
// (nome do paciente, motivo etc. são dados livres → risco de XSS armazenado num app médico)
function escHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

// ── Aviso acessível reutilizável (substitui alert()) ─────────────────────────
// amNotify('texto') ou amNotify({pt:'...', es:'...'}, {type:'error'|'info', timeout:ms})
// Renderiza um toast com role="alert" (erro) / role="status" (info) + aria-live; sem bloquear a página.
function amNotify(msg, opts) {
  opts = opts || {};
  var lang = document.documentElement.getAttribute('data-lang') === 'pt' ? 'pt' : 'es';
  var text = (msg && typeof msg === 'object') ? (msg[lang] || msg.pt || msg.es || '') : String(msg || '');
  var isErr = opts.type !== 'info';
  var wrap = document.getElementById('am-toast-wrap');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.id = 'am-toast-wrap';
    wrap.className = 'am-toast-wrap';
    document.body.appendChild(wrap);
    if (!document.getElementById('am-toast-style')) {
      // Fallback de estilo para páginas sem anamnesismed-theme.css
      var st = document.createElement('style');
      st.id = 'am-toast-style';
      st.textContent = '.am-toast-wrap{position:fixed;left:50%;bottom:20px;transform:translateX(-50%);z-index:10000;display:flex;flex-direction:column;gap:8px;width:min(92vw,420px)}' +
        '.am-toast{background:#0A1A24;color:#fff;border-left:4px solid #0FA3B1;border-radius:10px;padding:12px 14px;font:500 14px/1.45 system-ui,sans-serif;box-shadow:0 8px 28px rgba(10,26,36,.35);display:flex;gap:10px;align-items:flex-start}' +
        '.am-toast.error{border-left-color:#FF5C49}.am-toast button{margin-left:auto;background:none;border:0;color:#fff;font-size:16px;cursor:pointer}';
      document.head.appendChild(st);
    }
  }
  var t = document.createElement('div');
  t.className = 'am-toast' + (isErr ? ' error' : '');
  t.setAttribute('role', isErr ? 'alert' : 'status');
  t.setAttribute('aria-live', isErr ? 'assertive' : 'polite');
  var span = document.createElement('span');
  span.textContent = text;
  var close = document.createElement('button');
  close.type = 'button';
  close.setAttribute('aria-label', lang === 'pt' ? 'Fechar aviso' : 'Cerrar aviso');
  close.textContent = '\u2715';
  close.addEventListener('click', function () { t.remove(); });
  t.appendChild(span); t.appendChild(close);
  wrap.appendChild(t);
  setTimeout(function () { if (t.parentNode) t.remove(); }, opts.timeout || 8000);
  return t;
}
window.amNotify = amNotify;

// ── Aviso fixo inline (não some sozinho) — ex.: "você já tem assinatura ativa" ──
// amShowBanner({id, msg:{pt,es}, link:{href,pt,es}}) → role="alert", com botão de fechar. Reaproveita o mesmo id.
function amShowBanner(o) {
  var lang = document.documentElement.getAttribute('data-lang') === 'pt' ? 'pt' : 'es';
  var old = document.getElementById(o.id);
  if (old) old.remove();
  var b = document.createElement('div');
  b.id = o.id;
  b.className = 'am-banner';
  b.setAttribute('role', 'alert');
  var m = document.createElement('span');
  m.className = 'am-banner-msg';
  m.textContent = o.msg[lang] || o.msg.pt;
  b.appendChild(m);
  if (o.link) {
    var a = document.createElement('a');
    a.href = o.link.href;
    a.textContent = o.link[lang] || o.link.pt;
    b.appendChild(a);
  }
  var x = document.createElement('button');
  x.type = 'button';
  x.setAttribute('aria-label', lang === 'pt' ? 'Fechar aviso' : 'Cerrar aviso');
  x.textContent = '\u2715';
  x.addEventListener('click', function () { b.remove(); });
  b.appendChild(x);
  document.body.appendChild(b);
  return b;
}
window.amShowBanner = amShowBanner;

// ── Detectar em qual página estamos ──────────────────────────────────────
const PAGE = (() => {
  const p = window.location.pathname;
  if (p.includes('landing') || p === '/' || p.endsWith('index.html')) return 'landing';
  if (p.includes('auth'))      return 'auth';
  if (p.includes('config'))    return 'config';
  if (p.includes('dashboard')) return 'dashboard';
  if (p.includes('especialidades') || p.includes('explorar') || p.includes('-ref-') || p.includes('referencias') || p.includes('mnemonicas')) return 'especialidades';
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
    return { ok: false, error: err && err.message, rate: !!(err && (err.status === 429 || /rate limit/i.test(err.message || ''))) };
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
    return { ok: true };
  } catch (err) {
    console.error('Google OAuth error:', err);
    amNotify({ pt: 'Erro ao iniciar login com Google. Tente novamente.', es: 'Error al iniciar sesión con Google. Inténtalo de nuevo.' });
    return { ok: false, error: err && err.message };
  }
}

/**
 * Cadastro — salva dados extras do estudante
 * Chamado após o magic link ser clicado
 */
async function authSaveProfile(data) {
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return { ok: false, error: 'no_user' };

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
  // genero só entra no payload quando informado ('F'|'M') — o cadastro inicial não o apaga
  if (data.genero !== undefined) payload.genero = amGeneroNorm(data.genero);

  if (!existing || !existing.plano || (existing.plano === 'trial' && !existing.trial_end)) {
    payload.plano = 'trial';
    payload.trial_end = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  }

  const { error } = await sb.from('profiles').upsert(payload);

  if (error) console.error('Profile save error:', error);
  _profileCache = null; // invalida cache após gravar (ver profileGet)
  return error ? { ok: false, error } : { ok: true };
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
 * Obter o access_token da sessão atual (para chamar APIs autenticadas do backend,
 * ex.: /api/assistente-dx, que valida o token e o plano no servidor).
 */
async function authGetToken() {
  const { data: { session } } = await sb.auth.getSession();
  return session ? session.access_token : null;
}
window.authGetToken = authGetToken;

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
 * Buscar perfil completo do usuário logado.
 * #7 — Memoizado por carregamento de página: no init de dashboard/app/config o perfil
 * era buscado 3x em sequência (guardCheckAccess + uiUpdateUserInfo + onboarding),
 * cada uma um round-trip ao Supabase → atraso perceptível. Agora a 1ª busca é
 * compartilhada (cache + promessa em voo) e as seguintes retornam na hora.
 * authSaveProfile() invalida o cache (_profileCache=null).
 */
let _profileCache = null;
let _profilePromise = null;
async function profileGet(force) {
  if (!force && _profileCache) return _profileCache;
  if (!force && _profilePromise) return _profilePromise;

  _profilePromise = (async () => {
    const user = await authGetUser();
    if (!user) return null;
    const { data, error } = await sb
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();
    if (error) { console.error('Profile get error:', error); return null; }
    _profileCache = data;
    return data;
  })();

  try {
    return await _profilePromise;
  } finally {
    _profilePromise = null;
  }
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
async function profileSetTipoUsuario(tipo, genero) {
  const user = await authGetUser();
  if (!user) return { ok: false, error: 'no_user' };
  const upd = { tipo_usuario: tipo };
  if (tipo === 'medico' && amGeneroNorm(genero)) upd.genero = amGeneroNorm(genero); // 'F' | 'M'
  const { data, error } = await sb.from('profiles').update(upd).eq('id', user.id).select();
  if (error) { console.error('Set tipo_usuario error:', error); return { ok: false, error }; }
  if (!data || data.length === 0) {
    console.error('Set tipo_usuario: 0 linhas atualizadas (RLS bloqueou ou perfil não existe) — user.id=', user.id);
    return { ok: false, error: 'zero_rows_updated' };
  }
  _profileCache = null;
  return { ok: true };
}

// ═══════════════════════════════════════════════════════════════════════════
// TRATAMENTO (Dr./Dra.) — só médicos recebem título; estudantes só o nome
// ═══════════════════════════════════════════════════════════════════════════

// AM_TRATAMENTO_BEGIN (bloco puro — testado em test/tratamento.test.js)
function amGeneroNorm(g) {
  const v = String(g == null ? '' : g).trim().toUpperCase();
  return (v === 'F' || v === 'M') ? v : null;
}

/** médico+F → "Dra."; médico+M → "Dr."; médico sem gênero → "Dr(a)."; demais → "" */
function amTratamento(perfil) {
  if (!perfil || perfil.tipo_usuario !== 'medico') return '';
  const g = amGeneroNorm(perfil.genero);
  return g === 'F' ? 'Dra.' : g === 'M' ? 'Dr.' : 'Dr(a).';
}

/** Nome sem título digitado pelo usuário ("Dr. Ana" → "Ana"), 1ª letra maiúscula. */
function amNomeBase(perfil) {
  const p = perfil || {};
  const strip = (s) => String(s == null ? '' : s).trim().replace(/^(?:(?:dr\(a\)|dra|dr)\.?\s+)+/i, '').trim();
  let n = strip(p.nome);
  if (!n) n = strip(p.email ? String(p.email).split('@')[0] : '');
  if (!n) n = 'Usuário';
  return n.charAt(0).toUpperCase() + n.slice(1);
}

/** "Dra. Fernanda" / "Dr. João" / "Dr(a). Ana" / "Maria" (estudante) — nunca título duplicado. */
function amNomeExibicao(perfil) {
  const t = amTratamento(perfil);
  return (t ? t + ' ' : '') + amNomeBase(perfil);
}
// AM_TRATAMENTO_END

/** Grava o gênero (F|M) — o check constraint do banco só aceita esses valores. */
async function profileSetGenero(genero) {
  const g = amGeneroNorm(genero);
  if (!g) return { ok: false, error: 'invalid_genero' };
  const user = await authGetUser();
  if (!user) return { ok: false, error: 'no_user' };
  const { data, error } = await sb.from('profiles').update({ genero: g }).eq('id', user.id).select();
  if (error) { console.error('Set genero error:', error); return { ok: false, error }; }
  if (!data || data.length === 0) return { ok: false, error: 'zero_rows_updated' };
  _profileCache = null;
  return { ok: true };
}

function amGeneroErroMsg(lang, r) {
  const zero = r && r.error === 'zero_rows_updated';
  return lang === 'es'
    ? (zero ? 'No se pudo guardar (perfil no encontrado). Inténtalo de nuevo.' : 'No se pudo guardar tu tratamiento. Revisa tu conexión e inténtalo de nuevo.')
    : (zero ? 'Não foi possível salvar (perfil não encontrado). Tente novamente.' : 'Não foi possível salvar seu tratamento. Verifique a conexão e tente novamente.');
}

/** HTML do radio group acessível (fieldset/legend, alvos ≥44px, ES/PT). */
function amGeneroFieldsetHtml(lang, name, value) {
  const es = lang === 'es';
  const opt = (v, label, sub) =>
    '<label class="am-genero-opt"><input type="radio" name="' + name + '" value="' + v + '"' + (value === v ? ' checked' : '') + '>' +
    '<span><strong>' + label + '</strong> <span class="am-genero-sub">(' + sub + ')</span></span></label>';
  return '<fieldset class="am-genero" aria-required="true">' +
    '<legend>' + (es ? 'Tratamiento / Género' : 'Tratamento / Gênero') + ' <span aria-hidden="true">*</span></legend>' +
    '<div class="am-genero-opts">' +
    opt('F', 'Dra.', es ? 'femenino' : 'feminino') +
    opt('M', 'Dr.', es ? 'masculino' : 'masculino') +
    '</div></fieldset>';
}

/** Modal para completar o tratamento (usado pelo aviso do dashboard). */
function amAskGenero(onDone) {
  if (document.getElementById('am-genero-modal')) return;
  const lang = document.documentElement.dataset.lang === 'es' ? 'es' : 'pt';
  const es = lang === 'es';
  const opener = document.activeElement;
  const ov = document.createElement('div');
  ov.id = 'am-genero-modal';
  ov.className = 'am-genero-overlay';
  ov.innerHTML = '<div class="am-genero-card" role="dialog" aria-modal="true" aria-labelledby="am-genero-title">' +
    '<h2 id="am-genero-title">' + (es ? 'Informa tu tratamiento' : 'Informe seu tratamento') + '</h2>' +
    '<p>' + (es ? 'Usaremos "Dr." o "Dra." en tu saludo y en tu perfil.' : 'Vamos usar "Dr." ou "Dra." na sua saudação e no seu perfil.') + '</p>' +
    amGeneroFieldsetHtml(lang, 'am-genero-modal-r', null) +
    '<p class="am-genero-msg" role="alert" aria-live="assertive" hidden></p>' +
    '<div class="am-genero-actions"><button type="button" class="am-genero-cancel">' + (es ? 'Cancelar' : 'Cancelar') + '</button>' +
    '<button type="button" class="am-genero-save">' + (es ? 'Guardar' : 'Salvar') + '</button></div></div>';
  document.body.appendChild(ov);
  const msg = ov.querySelector('.am-genero-msg');
  const save = ov.querySelector('.am-genero-save');
  const close = () => { ov.remove(); try { opener && opener.focus && opener.focus(); } catch (e) {} };
  ov.querySelector('.am-genero-cancel').addEventListener('click', close);
  ov.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  ov.addEventListener('click', (e) => { if (e.target === ov) close(); });
  save.addEventListener('click', async () => {
    const sel = ov.querySelector('input[name="am-genero-modal-r"]:checked');
    if (!sel) { msg.hidden = false; msg.textContent = es ? 'Elige "Dra." o "Dr." para continuar.' : 'Escolha "Dra." ou "Dr." para continuar.'; return; }
    save.disabled = true; save.textContent = es ? 'Guardando…' : 'Salvando…';
    const r = await profileSetGenero(sel.value);
    if (!r.ok) {
      save.disabled = false; save.textContent = es ? 'Guardar' : 'Salvar';
      msg.hidden = false; msg.textContent = amGeneroErroMsg(lang, r);
      return;
    }
    ov.remove();
    const av = document.getElementById('am-genero-aviso'); if (av) av.remove();
    await uiUpdateUserInfo();
    if (typeof onDone === 'function') onDone();
  });
  const first = ov.querySelector('input[type=radio]'); if (first) first.focus();
}

/** Aviso discreto e dispensável (dashboard) para médicos sem gênero cadastrado. */
function amGeneroAvisoShow(profile) {
  const need = profile && profile.tipo_usuario === 'medico' && !amGeneroNorm(profile.genero);
  const existing = document.getElementById('am-genero-aviso');
  if (!need) { if (existing) existing.remove(); return; }
  try { if (sessionStorage.getItem('am-genero-aviso-off') === '1') return; } catch (e) {}
  if (existing) return;
  const hero = document.getElementById('dash-hero');
  if (!hero || !hero.parentNode) return;
  const el = document.createElement('div');
  el.id = 'am-genero-aviso';
  el.className = 'am-genero-aviso';
  el.setAttribute('role', 'status');
  el.innerHTML =
    '<span class="pt">Informe seu tratamento (Dr. ou Dra.) para personalizar sua saudação.</span>' +
    '<span class="es">Informa tu tratamiento (Dr. o Dra.) para personalizar tu saludo.</span>' +
    '<button type="button" class="am-genero-aviso-go"><span class="pt">Informar tratamento</span><span class="es">Informar tratamiento</span></button>' +
    '<button type="button" class="am-genero-aviso-x" aria-label="' + (document.documentElement.dataset.lang === 'es' ? 'Descartar aviso' : 'Dispensar aviso') + '">&times;</button>';
  hero.parentNode.insertBefore(el, hero);
  el.querySelector('.am-genero-aviso-go').addEventListener('click', () => amAskGenero());
  el.querySelector('.am-genero-aviso-x').addEventListener('click', () => {
    try { sessionStorage.setItem('am-genero-aviso-off', '1'); } catch (e) {}
    el.remove();
  });
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
    padding:20px;font-family:'Inter',system-ui,sans-serif`;

  const card = document.createElement('div');
  card.style.cssText = `
    background:#fff;border-radius:14px;max-width:460px;width:100%;
    padding:28px 26px;box-shadow:0 20px 60px rgba(0,0,0,.35);
    color:#0d2d3d`;
  overlay.appendChild(card);
  document.body.appendChild(overlay);

  function renderTerms() {
    card.innerHTML = `
      <h2 style="font-family:'Space Grotesk',system-ui,sans-serif;font-size:20px;margin-bottom:12px">
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
      <h2 style="font-family:'Space Grotesk',system-ui,sans-serif;font-size:20px;margin-bottom:12px">
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
        // Médico: antes de gravar, pergunta o tratamento (Dr./Dra.) — gravado junto com o tipo
        if (b.dataset.tipo === 'medico') { renderGenero(); return; }
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

  // Passo extra só para médicos: tratamento (Dr./Dra.) obrigatório; grava tipo + genero juntos.
  function renderGenero() {
    card.innerHTML = `
      <h2 style="font-family:'Space Grotesk',system-ui,sans-serif;font-size:20px;margin-bottom:12px">
        ${lang==='pt' ? 'Como devemos tratar você?' : '¿Cómo debemos tratarte?'}
      </h2>
      <p style="font-size:14px;line-height:1.6;color:#4b6070;margin-bottom:14px">
        ${lang==='pt' ? 'Usaremos "Dr." ou "Dra." na sua saudação e no seu perfil.' : 'Usaremos "Dr." o "Dra." en tu saludo y en tu perfil.'}
      </p>
      ${amGeneroFieldsetHtml(lang, 'og-genero', null)}
      <p class="og-genero-msg am-genero-msg" role="alert" aria-live="assertive" hidden></p>
      <div class="am-genero-actions">
        <button type="button" class="am-genero-cancel og-genero-back">${lang==='pt' ? 'Voltar' : 'Volver'}</button>
        <button type="button" class="am-genero-save og-genero-save">${lang==='pt' ? 'Continuar' : 'Continuar'}</button>
      </div>`;
    const msg = card.querySelector('.og-genero-msg');
    const save = card.querySelector('.og-genero-save');
    card.querySelectorAll('input[name="og-genero"]').forEach(i => i.addEventListener('change', () => { msg.hidden = true; }));
    card.querySelector('.og-genero-back').addEventListener('click', renderTipo);
    save.addEventListener('click', async () => {
      const sel = card.querySelector('input[name="og-genero"]:checked');
      if (!sel) {
        msg.hidden = false;
        msg.textContent = lang==='pt' ? 'Escolha "Dra." ou "Dr." para continuar.' : 'Elige "Dra." o "Dr." para continuar.';
        return;
      }
      save.disabled = true;
      save.textContent = lang==='pt' ? 'Salvando…' : 'Guardando…';
      const r = await profileSetTipoUsuario('medico', sel.value);
      if (!r.ok) {
        save.disabled = false;
        save.textContent = lang==='pt' ? 'Continuar' : 'Continuar';
        msg.hidden = false;
        msg.textContent = amGeneroErroMsg(lang, r); // mantém a seleção; nada é perdido
        return;
      }
      overlay.remove();
      uiUpdateUserInfo();
    });
    const first = card.querySelector('input[type=radio]'); if (first) first.focus();
  }

  if (needsTerms) renderTerms();
  else renderTipo();
}

/**
 * Verificar se o acesso está ativo (trial ou plano pago)
 * Retorna: { active: bool, type: 'trial'|'pro'|'expired', daysLeft: number }
 */
async function profileCheckAccess() {
  let profile = await profileGet();

  // Perfil inexistente = primeiro acesso do usuário (ex: Google OAuth sem onboarding)
  // Cria automaticamente com trial de 30 dias para não bloquear o acesso na hora
  if (!profile) {
    const { data: { user } } = await sb.auth.getUser();
    if (user) {
      const trialEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
      const { data: newProfile } = await sb.from('profiles').upsert({
        id: user.id,
        email: user.email,
        plano: 'trial',
        trial_end: trialEnd
      }).select().maybeSingle();
      profile = newProfile;
    }
    if (!profile) return { active: false, type: 'no_profile', daysLeft: 0 };
  }

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
 * Registrar uma exportação de PDF (contador "PDFs exportados" do dashboard).
 * Persiste no banco (tabela pdf_exports, cross-device) COM fallback para localStorage:
 * enquanto a migration 2026-07-11-pdf-exports não roda em produção, o insert falha e a
 * contagem segue local (comportamento anterior). Assim que a tabela existir, vira
 * cross-device sem nova mudança de código.
 */
function pdfExportsKey(userId) { return 'am-pdf-exports-' + userId; }

async function pdfExportRecord(meta) {
  const user = await authGetUser();
  if (!user) return { ok: false, error: 'Não autenticado' };
  const ts = new Date().toISOString();
  const motivo = (meta && meta.motivo) || null;
  const motivoId = (meta && meta.motivoId) || null;

  // Sempre grava local (offline / tabela ainda não migrada).
  const key = pdfExportsKey(user.id);
  let arr = [];
  try { arr = JSON.parse(localStorage.getItem(key) || '[]'); } catch (e) {}
  arr.push({ ts, motivo, motivoId });
  try { localStorage.setItem(key, JSON.stringify(arr)); } catch (e) {}

  // Best-effort no banco (RLS garante user_id = auth.uid()).
  try {
    const { error } = await sb.from('pdf_exports')
      .insert({ user_id: user.id, motivo, motivo_id: motivoId, exported_at: ts });
    if (error) console.warn('pdf_exports insert (fallback local):', error.message || error.code);
  } catch (e) { console.warn('pdf_exports indisponível (fallback local):', e && e.message ? e.message : e); }

  return { ok: true, total: arr.length };
}

async function pdfExportList() {
  const user = await authGetUser();
  if (!user) return [];

  // Local (compat: registros antigos eram strings ISO simples).
  let local = [];
  try { local = JSON.parse(localStorage.getItem(pdfExportsKey(user.id)) || '[]'); } catch (e) {}
  local = local.map(e => typeof e === 'string' ? { ts: e, motivo: null, motivoId: null } : e);

  // Banco (se a tabela existir). União com o local, deduplicada por ts — evita o
  // contador "cair" quando a migration é aplicada e ainda há registros só locais.
  try {
    const { data, error } = await sb.from('pdf_exports')
      .select('motivo, motivo_id, exported_at')
      .eq('user_id', user.id);
    if (!error && Array.isArray(data)) {
      const db = data.map(r => ({ ts: r.exported_at, motivo: r.motivo, motivoId: r.motivo_id }));
      const seen = new Set();
      return db.concat(local).filter(e => {
        if (seen.has(e.ts)) return false;
        seen.add(e.ts); return true;
      });
    }
  } catch (e) { /* tabela ausente ou offline → só local */ }
  return local;
}

window.pdfExportRecord = pdfExportRecord;
window.pdfExportList = pdfExportList;

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
    .select('id, motivo, motivo_id, especialidade, status, criado_em, atualizado_em, dados')
    .eq('user_id', user.id)
    .order('atualizado_em', { ascending: false })
    .limit(limit);

  window.__hcsError = !!error; // o dashboard distingue "falhou" de "não tem HC"
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
 * Nome do motivo nos DOIS idiomas, resolvido por motivo_id em MOTIVOS (anamnesismed-motivos.js).
 * O HC grava o nome no idioma em que foi criada (hc.motivo); aqui a tela sempre mostra o idioma ativo.
 * Sem MOTIVOS carregado (ou id desconhecido) cai no nome gravado, igual nos dois idiomas.
 */
let _motivoNomeMap = null;
function amMotivoNomes(id, fallback) {
  if (!_motivoNomeMap) {
    _motivoNomeMap = {};
    try {
      if (typeof MOTIVOS !== 'undefined') {
        Object.keys(MOTIVOS).forEach(esp => (MOTIVOS[esp] || []).forEach(cat => (cat.items || []).forEach(it => {
          if (!_motivoNomeMap[it.id]) _motivoNomeMap[it.id] = { pt: it.name, es: it.nameEs || it.name };
        })));
      }
    } catch (e) { _motivoNomeMap = {}; }
  }
  const m = id && _motivoNomeMap[id];
  const base = fallback || id || '';
  return m ? { pt: m.pt, es: m.es } : { pt: base, es: base };
}
window.amMotivoNomes = amMotivoNomes;
const _amBi = (pt, es) => `<span class="pt">${escHtml(pt)}</span><span class="es">${escHtml(es)}</span>`;

/**
 * Preenche o nome do usuário em todos os lugares da UI
 */
async function uiUpdateUserInfo() {
  const profile = await profileGet();
  if (!profile) return;

  // Só médicos recebem título (Dra./Dr./Dr(a).); estudantes e perfis sem tipo usam só o nome.
  // amNomeBase remove "Dr."/"Dra." já digitado no nome → nunca "Dra. Dra. Ana".
  const nomeBase = amNomeBase(profile);
  const nome = amNomeExibicao(profile);

  // Cache local p/ exibição instantânea do nome (elimina o "delay" ao recarregar)
  try { localStorage.setItem('am-uname', nome); } catch(e) {}

  // Atualiza em todos os elementos que mostram o nome
  document.querySelectorAll('[data-user-name]').forEach(el => el.textContent = nome);
  document.querySelectorAll('.sb-uname').forEach(el => el.textContent = nome);
  document.querySelectorAll('.user-name').forEach(el => el.textContent = nome);

  // Saudação no topbar do dashboard (ids page-title / page-title-es)
  const lang = document.documentElement.dataset.lang || 'pt';
  const saudPt = document.getElementById('page-title');
  const saudEs = document.getElementById('page-title-es');
  if (saudPt) saudPt.textContent = 'Olá, ' + nome + ' 👋';
  if (saudEs) saudEs.textContent = 'Hola, ' + nome + ' 👋';

  // Aviso para médicos antigos sem gênero (só no dashboard)
  if (PAGE === 'dashboard') amGeneroAvisoShow(profile);

  // Avatar com inicial (após o prefixo, usar inicial do nome base)
  document.querySelectorAll('.sb-avatar, .user-avatar').forEach(el => {
    el.textContent = nomeBase.charAt(0).toUpperCase();
  });

  // Plano e dias restantes
  const access = await profileCheckAccess();

  document.querySelectorAll('.sb-uplan, .user-plan').forEach(el => {
    // No dashboard, .user-plan contém o contador dinâmico "Plano Gratuito · X/5 HCs"
    // (span#hcs-count-pt/es, populado por uiLoadStats). Sobrescrever o textContent aqui
    // destruiria esse span — pular esses elementos e deixar uiLoadStats cuidar deles.
    if (el.querySelector('[id^="hcs-count-"]')) return;
    // O sidebar tem .user-plan.pt e .user-plan.es separados: cada um recebe o SEU idioma.
    const es = el.classList.contains('es') ? true : (el.classList.contains('pt') ? false : lang === 'es');
    if (access.type === 'pro') {
      el.textContent = 'Pro';
    } else if (access.type === 'trial') {
      el.textContent = es ? `Prueba — ${access.daysLeft} días` : `Teste — ${access.daysLeft} dias`;
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
async function uiLoadRecentHCs(limit, preHcs) {
  const container = document.querySelector('.hc-list');
  if (!container) return;

  const hcs = preHcs ? preHcs.slice(0, limit || 5) : await hcListAll(limit || 5);

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

  const specColors = { clinica: '#0e7490', cirurgia: '#c0392b' };
  const statusLabels = {
    rascunho: { es: 'Borrador', pt: 'Rascunho', cls: 'draft' },
    completa: { es: 'Completa', pt: 'Completa', cls: 'complete' },
  };

  container.innerHTML = hcs.map(hc => {
    const color = specColors[hc.especialidade] || '#6b7c8a';
    const st = statusLabels[hc.status] || statusLabels.rascunho;
    const _d = new Date(hc.atualizado_em || hc.criado_em);
    const date = isNaN(_d.getTime()) ? '—' // nunca mostra "Invalid Date"
      : `<span class="pt">${_d.toLocaleDateString('pt-BR')}</span><span class="es">${_d.toLocaleDateString('es-ES')}</span>`;
    const mn = amMotivoNomes(hc.motivo_id, hc.motivo);
    const nomePaciente = (hc.dados && hc.dados.campos && hc.dados.campos['dp-nome']) || '';
    const specLabel = hc.especialidade === 'clinica'
      ? '<span class="pt">Clínica Médica</span><span class="es">Clínica Médica</span>'
      : '<span class="pt">Cirurgia Geral</span><span class="es">Cirugía General</span>';

    return `
    <div class="hc-card" onclick="window.location.href='anamnesismed-app.html?hc='+encodeURIComponent('${hc.motivo_id}')" role="button" tabindex="0" onkeydown="if(event.target===this&&(event.key==='Enter'||event.key===' ')){event.preventDefault();this.click()}" style="cursor:pointer">
      <div class="hc-color" style="background:${color}"></div>
      <div class="hc-info">
        <div class="hc-name">${_amBi(mn.pt, mn.es)}${nomePaciente ? ' — ' + escHtml(nomePaciente) : ''}</div>
        <div class="hc-meta">
          <span>${specLabel}</span>
          <span class="hc-dot"></span>
          <span>${date}</span>
        </div>
      </div>
      <div class="hc-actions">
        <span class="hc-status ${st.cls} es">${st.es}</span>
        <span class="hc-status ${st.cls} pt">${st.pt}</span>
        <button class="hc-btn hc-btn-edit" onclick="event.stopPropagation();window.location.href='anamnesismed-app.html?hc='+encodeURIComponent('${hc.motivo_id}')" title="Editar" aria-label="Editar"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg><span class="pt">Editar</span><span class="es">Editar</span></button>
        <button class="hc-btn hc-btn-del" onclick="event.stopPropagation();amConfirmDeleteHC('${hc.id}')" title="Eliminar / Excluir" aria-label="Excluir"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg><span class="pt">Excluir</span><span class="es">Eliminar</span></button>
      </div>
    </div>`;
  }).join('');
}


/**
 * Confirmação antes de excluir uma HC (antes o botão apagava na hora, sem volta).
 * Diálogo acessível: foco no botão seguro (Cancelar), Esc/fora/Cancelar fecham, foco volta ao botão de origem.
 */
function amConfirmDeleteHC(hcId) {
  const opener = document.activeElement;
  const old = document.getElementById('hc-del-modal'); if (old) old.remove();
  const m = document.createElement('div');
  m.className = 'am-modal'; m.id = 'hc-del-modal';
  m.innerHTML = `
    <div class="am-modal-backdrop" data-modal-close></div>
    <div class="am-modal-box" role="alertdialog" aria-modal="true" aria-labelledby="hcdel-t" aria-describedby="hcdel-d" tabindex="-1">
      <h2 class="am-modal-title" id="hcdel-t"><span class="pt">Excluir esta HC?</span><span class="es">¿Eliminar esta HC?</span></h2>
      <div class="am-modal-body" id="hcdel-d">
        <p class="pt">Esta ação não pode ser desfeita.</p><p class="es">Esta acción no se puede deshacer.</p>
      </div>
      <p class="priv-status error" role="alert" hidden id="hcdel-err"></p>
      <div class="am-modal-actions">
        <button type="button" class="am-btn am-btn--secondary" data-modal-close><span class="pt">Cancelar</span><span class="es">Cancelar</span></button>
        <button type="button" class="am-btn am-btn--danger" id="hcdel-ok"><span class="pt">Excluir</span><span class="es">Eliminar</span></button>
      </div>
    </div>`;
  document.body.appendChild(m);
  document.body.classList.add('am-modal-open');
  const close = () => {
    document.removeEventListener('keydown', onKey, true);
    m.remove(); document.body.classList.remove('am-modal-open');
    try { if (opener && document.body.contains(opener)) opener.focus(); } catch (e) {}
  };
  const onKey = (e) => {
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key === 'Tab') {
      const f = [...m.querySelectorAll('button')].filter(b => !b.disabled);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      else if (!m.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
    }
  };
  document.addEventListener('keydown', onKey, true);
  m.querySelectorAll('[data-modal-close]').forEach(el => el.addEventListener('click', close));
  m.querySelector('#hcdel-ok').addEventListener('click', async (ev) => {
    const btn = ev.currentTarget; btn.disabled = true;
    const ok = await hcDelete(hcId);
    if (ok) {
      close();
      window.__hcsAll = null;
      uiLoadRecentHCs(window.currentDashView === 'hcs' ? 100 : 5);
    } else {
      btn.disabled = false;
      const er = m.querySelector('#hcdel-err');
      er.innerHTML = '<span class="pt">Não foi possível excluir. Tente de novo.</span><span class="es">No se pudo eliminar. Inténtalo de nuevo.</span>';
      er.hidden = false;
    }
  });
  const cancel = m.querySelector('.am-modal-actions [data-modal-close]');
  (cancel || m.querySelector('.am-modal-box')).focus();
}
window.amConfirmDeleteHC = amConfirmDeleteHC;

/**
 * Calcula e preenche os cards de estatísticas do dashboard
 * (HCs criadas, PDFs exportados, Motivos consultados) com dados reais do usuário.
 * Para um usuário novo, tudo começa zerado — nada de números fixos de exemplo.
 */
async function uiLoadStats(preHcs, prePdf) {
  const hcs = preHcs || await hcListAll(100);
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

  // PDFs exportados — rastreados localmente por usuário via pdfExportRecord()
  const pdfExports = prePdf || (window.pdfExportList ? await window.pdfExportList() : []);
  const pdfsValueEl = document.getElementById('stat-pdfs-value');
  if (pdfsValueEl) pdfsValueEl.textContent = String(pdfExports.length);
  const pdfsDeltaPt = document.getElementById('stat-pdfs-delta-pt');
  const pdfsDeltaEs = document.getElementById('stat-pdfs-delta-es');
  if (pdfsDeltaPt && pdfsDeltaEs) {
    const weekAgoPdf = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const novosEstaSemanaPdf = pdfExports.filter(e => new Date(e.ts).getTime() >= weekAgoPdf).length;
    if (novosEstaSemanaPdf > 0) {
      pdfsDeltaPt.textContent = `+${novosEstaSemanaPdf} essa semana`;
      pdfsDeltaEs.textContent = `+${novosEstaSemanaPdf} esta semana`;
    } else {
      pdfsDeltaPt.textContent = pdfExports.length === 0 ? 'Nenhum ainda' : '';
      pdfsDeltaEs.textContent = pdfExports.length === 0 ? 'Ninguno aún' : '';
    }
  }

  // Motivos consultados (distintos)
  const motivosMap = new Map();
  hcs.forEach(hc => { const k = hc.motivo_id || hc.motivo; if (k && !motivosMap.has(k)) motivosMap.set(k, amMotivoNomes(hc.motivo_id, hc.motivo)); });
  const motivosUnicos = [...motivosMap.values()];
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
      motivosDeltaPt.textContent = resto > 0 ? `${primeiro.pt} + ${resto} mais` : primeiro.pt;
      motivosDeltaEs.textContent = resto > 0 ? `${primeiro.es} + ${resto} más` : primeiro.es;
    }
  }
}

/**
 * Formata um timestamp ISO em rótulo relativo bilíngue (Hoje/Hoy, Ontem/Ayer, ou data)
 */
function activityFormatTime(iso) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return { pt: '', es: '' };
  const now = new Date();
  const startOf = (dt) => new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()).getTime();
  const diffDias = Math.round((startOf(now) - startOf(d)) / (24 * 60 * 60 * 1000));
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  if (diffDias === 0) return { pt: `Hoje · ${hh}h${mm}`, es: `Hoy · ${hh}:${mm}` };
  if (diffDias === 1) return { pt: `Ontem · ${hh}h${mm}`, es: `Ayer · ${hh}:${mm}` };
  const dd = String(d.getDate()).padStart(2, '0');
  const mo = String(d.getMonth() + 1).padStart(2, '0');
  return { pt: `${dd}/${mo} · ${hh}h${mm}`, es: `${dd}/${mo} · ${hh}:${mm}` };
}

/**
 * Carrega a "Atividade recente" do dashboard a partir de dados reais
 * (HCs criadas/editadas + PDFs exportados) — substitui a lista estática de exemplo.
 */
async function uiLoadRecentActivity(limit = 6, preHcs, prePdf) {
  const list = document.querySelector('.activity-list');
  if (!list) return;

  const hcs = preHcs ? preHcs.slice(0, 20) : await hcListAll(20);
  const pdfExports = prePdf || (window.pdfExportList ? await window.pdfExportList() : []);

  const eventos = [];
  hcs.forEach(hc => {
    const nome = amMotivoNomes(hc.motivo_id, hc.motivo || '—');
    const criado = hc.criado_em;
    const atualizado = hc.atualizado_em;
    if (atualizado && atualizado !== criado) {
      eventos.push({ tipo: 'edited', motivo: nome, ts: atualizado });
    }
    if (criado) {
      eventos.push({ tipo: 'created', motivo: nome, ts: criado });
    }
  });
  // PDF exports: deduplicar por motivoId — manter apenas o mais recente de cada motivo
  const pdfSeen = new Set();
  pdfExports
    .sort((a, b) => new Date(b.ts).getTime() - new Date(a.ts).getTime())
    .forEach(exp => {
      const key = exp.motivoId || exp.motivo || 'unknown';
      if (!pdfSeen.has(key)) {
        pdfSeen.add(key);
        eventos.push({ tipo: 'exported', motivo: amMotivoNomes(exp.motivoId, exp.motivo || ''), ts: exp.ts });
      }
    });

  eventos.sort((a, b) => new Date(b.ts).getTime() - new Date(a.ts).getTime());
  const recentes = eventos.slice(0, limit);

  if (recentes.length === 0) {
    list.innerHTML = `
      <div class="act-item">
        <div>
          <div class="act-text pt">Nenhuma atividade ainda — crie sua primeira história clínica para começar.</div>
          <div class="act-text es">Ninguna actividad todavía — crea tu primera historia clínica para empezar.</div>
        </div>
      </div>`;
    return;
  }

  const labels = {
    created: { dot: 'created', pt: 'HC criada', es: 'HC creada' },
    edited:  { dot: 'edited',  pt: 'HC editada', es: 'HC editada' },
    exported:{ dot: 'exported',pt: 'PDF exportado', es: 'PDF exportado' }
  };

  list.innerHTML = recentes.map(ev => {
    const lab = labels[ev.tipo] || labels.created;
    const time = activityFormatTime(ev.ts);
    const mt = ev.motivo || { pt: '', es: '' };
    const motivoPt = mt.pt ? ` — ${escHtml(mt.pt)}` : '';
    const motivoEs = mt.es ? ` — ${escHtml(mt.es)}` : '';
    return `
      <div class="act-item">
        <div class="act-dot ${lab.dot}"></div>
        <div>
          <div class="act-text pt"><strong>${lab.pt}</strong>${motivoPt}</div>
          <div class="act-text es"><strong>${lab.es}</strong>${motivoEs}</div>
          <div class="act-time pt">${time.pt}</div>
          <div class="act-time es">${time.es}</div>
        </div>
      </div>`;
  }).join('');
}
window.uiLoadRecentActivity = uiLoadRecentActivity;

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
      <h2 style="font-family:'Space Grotesk',system-ui,sans-serif;font-size:24px;font-weight:900;margin-bottom:10px">
        ${lang === 'es' ? 'Tu trial ha terminado' : 'Seu trial acabou'}
      </h2>
      <p style="font-size:14px;color:#6b6660;margin-bottom:24px;line-height:1.6">
        ${lang === 'es'
          ? 'Activa tu plan por solo <strong>$1.99/mes</strong> y sigue usando AnamnesísMed sin límites.'
          : 'Ative seu plano por apenas <strong>$1,99/mês</strong> e continue usando o AnamnesísMed sem limites.'}
      </p>
      <button onclick="window.location.href='anamnesismed-landing.html#pricing'"
        style="background:#c0392b;color:#fff;border:none;border-radius:8px;
        padding:14px 32px;font-size:15px;font-weight:600;cursor:pointer;width:100%;margin-bottom:10px">
        ${lang === 'es' ? 'Activar plan — $1.99/mes →' : 'Ativar plano — $1,99/mês →'}
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
      background:#1e6b3c;color:#fff;font-size:12px;font-weight:700;
      padding:6px 12px;border-radius:20px;
      opacity:0;transition:opacity .3s;font-family:'JetBrains Mono',ui-monospace,monospace`;
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
        amNotify({ pt: 'Erro ao enviar o link. Tente novamente.', es: 'Error al enviar el link. Inténtalo de nuevo.' });
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
        amNotify({ pt: 'Erro ao criar conta. Tente novamente.', es: 'Error al crear la cuenta. Inténtalo de nuevo.' });
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

    // Atualizar UI — busca HCs e PDFs UMA vez e em paralelo, reaproveitando nas 3
    // funções (antes: 3 buscas sequenciais de historias + 2 de PDFs => dashboard lento).
    uiUpdateUserInfo();   // nome aparece assim que a sessão resolve (não bloqueia a lista)
    window.amDashLoad = async function () {
      window.__hcsError = false;
      const [hcsAll, pdfAll] = await Promise.all([
        hcListAll(100),
        window.pdfExportList ? window.pdfExportList() : Promise.resolve([])
      ]);
      if (window.__hcsError) { // falha de carga: mensagem + "Tentar novamente" (não mostra "Sem HC" e zeros)
        window.__hcsAll = null;
        const c = document.querySelector('.hc-list');
        if (c) c.innerHTML = `
          <div class="empty-state error-state" role="alert">
            <div class="empty-title es">No se pudieron cargar tus historias clínicas</div>
            <div class="empty-title pt">Não foi possível carregar suas histórias clínicas</div>
            <div class="empty-sub es">Revisa tu conexión e inténtalo de nuevo.</div>
            <div class="empty-sub pt">Verifique sua conexão e tente novamente.</div>
            <button type="button" class="empty-btn es" onclick="window.amDashLoad()">Intentar de nuevo</button>
            <button type="button" class="empty-btn pt" onclick="window.amDashLoad()">Tentar novamente</button>
          </div>`;
        ['stat-hcs-value', 'stat-pdfs-value', 'stat-motivos-value'].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = '—'; });
        return;
      }
      window.__hcsAll = hcsAll; // cache reusado pelo setView (evita refetch ao trocar de view)
      uiLoadRecentHCs(window.currentDashView === 'hcs' ? 100 : 5, hcsAll);
      uiLoadStats(hcsAll, pdfAll);
      uiLoadRecentActivity(6, hcsAll, pdfAll);
    };
    // Card "Plano": lê o plano real do perfil (pro / estudante / teste)
    try {
      const prof = await profileGet();
      const k = !prof ? 'trial' : (prof.plano === 'pro' ? 'pro' : (prof.tipo_usuario === 'estudante' ? 'estudante' : 'trial'));
      const pc = document.getElementById('stat-plano-card');
      if (pc) pc.dataset.plano = k;
    } catch (e) { console.warn('plano card:', e); }
    await window.amDashLoad();

    // Deep-link: retorno do Stripe Checkout (?payment=success) — mostra confirmação,
    // re-checa o plano (o webhook pode ter atualizado o acesso) e limpa a URL
    try {
      const payParams = new URLSearchParams(window.location.search);
      if (payParams.get('payment') === 'success') {
        const lang = document.documentElement.getAttribute('data-lang') || 'es';
        const msg = lang === 'es'
          ? '✅ ¡Pago confirmado! Tu plan fue actualizado.'
          : '✅ Pagamento confirmado! Seu plano foi atualizado.';
        const banner = document.createElement('div');
        banner.textContent = msg;
        banner.style.cssText = 'position:fixed;top:16px;left:50%;transform:translateX(-50%);background:#0e7490;color:#fff;padding:12px 24px;border-radius:8px;font-size:14px;font-weight:600;z-index:9999;box-shadow:0 4px 16px rgba(0,0,0,.2)';
        document.body.appendChild(banner);
        setTimeout(function(){ banner.remove(); }, 6000);

        payParams.delete('payment');
        const cleanQuery = payParams.toString();
        window.history.replaceState({}, '', window.location.pathname + (cleanQuery ? '?' + cleanQuery : ''));

        await uiUpdateUserInfo();
      }
    } catch (e) { console.warn('aviso de pagamento erro:', e); }

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

      // Tratamento (Dr./Dra.) — só médicos
      const gField = document.getElementById('cfg-genero-field');
      if (gField && profile.tipo_usuario === 'medico') {
        gField.hidden = false;
        const g = amGeneroNorm(profile.genero);
        const r = g && gField.querySelector('input[name="cfg-genero"][value="' + g + '"]');
        if (r) r.checked = true;
      }

      const planoEl = document.getElementById('cfg-plano');
      if (planoEl) {
        if (profile.plano === 'pro') {
          planoEl.textContent = lang === 'pt' ? 'Pro' : 'Pro';
        } else {
          const trialEnd = profile.trial_end ? new Date(profile.trial_end) : null;
          const daysLeft = trialEnd ? Math.max(0, Math.ceil((trialEnd - new Date()) / (1000*60*60*24))) : 0;
          planoEl.textContent = lang === 'pt' ? `Teste — ${daysLeft} dias restantes` : `Prueba — ${daysLeft} días restantes`;
        }
      }
    }

    const form = document.getElementById('cfg-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('cfg-save-btn');
        const st = document.getElementById('cfg-status');
        const L = document.documentElement.dataset.lang === 'es' ? 'es' : 'pt';
        const say = (kind, pt, es) => {
          if (!st) return;
          st.hidden = false;
          st.className = 'cfg-status ' + kind;
          st.setAttribute('role', kind === 'error' ? 'alert' : 'status');
          st.textContent = L === 'es' ? es : pt;
        };
        const gField = document.getElementById('cfg-genero-field');
        const isMed = gField && !gField.hidden;
        const gSel = isMed && gField.querySelector('input[name="cfg-genero"]:checked');
        if (isMed && !gSel) {
          say('error', 'Escolha seu tratamento: "Dra." ou "Dr.".', 'Elige tu tratamiento: "Dra." o "Dr.".');
          const f = gField.querySelector('input[type=radio]'); if (f) f.focus();
          return;
        }
        if (btn) { btn.disabled = true; btn.setAttribute('aria-busy', 'true'); }
        say('info', 'Salvando…', 'Guardando…');

        const payload = {
          nome: document.getElementById('cfg-nome')?.value,
          sobrenome: document.getElementById('cfg-sobrenome')?.value,
          universidade: document.getElementById('cfg-universidade')?.value,
          ano_curso: document.getElementById('cfg-ano-curso')?.value,
          idioma: document.getElementById('cfg-idioma')?.value,
        };
        if (gSel) payload.genero = gSel.value;
        const res = await authSaveProfile(payload);

        if (btn) { btn.disabled = false; btn.removeAttribute('aria-busy'); }
        if (res && res.ok) {
          say('ok', 'Alterações salvas.', 'Cambios guardados.');
          await uiUpdateUserInfo();
        } else {
          // Campos preenchidos permanecem no formulário — nada é perdido
          say('error', 'Não foi possível salvar. Verifique a conexão e tente novamente.', 'No se pudo guardar. Revisa tu conexión e inténtalo de nuevo.');
        }
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

  if (PAGE === 'especialidades') {
    const ok = await guardRequireAuth();
    if (!ok) return;

    // Nome/plano do usuário no sidebar (mesma sequência do dashboard/app:
    // só popula DEPOIS que a sessão resolve — senão o nome fica vazio)
    await uiUpdateUserInfo();

    const logoutBtn = document.querySelector('[data-action="logout"]');
    if (logoutBtn) logoutBtn.addEventListener('click', authLogout);
  }

  if (PAGE === 'landing') {
    // Se já logado, mostrar botão "Ir ao app" em vez de "Cadastrar"
    const session = await authGetSession();
    if (session) {
      document.querySelectorAll('.nav-cta, .btn-primary').forEach(el => {
        el.innerHTML = '<span class="pt">Ir ao App →</span><span class="es">Ir al App →</span>';
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
    // O back end identifica o usuário pelo token (userId/email do body são ignorados)
    const { data: sessData } = await sb.auth.getSession();
    const token = sessData && sessData.session && sessData.session.access_token;
    if (!token) {
      window.location.href = 'anamnesismed-auth.html';
      return;
    }
    // Chama a Vercel Function que cria a sessão no Stripe
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify({})
    });
    if (res.status === 401) {
      amNotify({ pt: 'Sua sessão expirou. Entre novamente para continuar.', es: 'Tu sesión expiró. Inicia sesión de nuevo para continuar.' });
      setTimeout(() => { window.location.href = 'anamnesismed-auth.html'; }, 2500);
      return;
    }
    const body = await res.json().catch(() => ({}));
    if (res.status === 409 && body && body.code === 'already_subscribed') {
      amShowBanner({
        id: 'am-banner-subscribed',
        msg: { pt: 'Você já tem uma assinatura ativa.', es: 'Ya tienes una suscripción activa.' },
        link: { href: 'anamnesismed-config.html#plano', pt: 'Gerenciar assinatura', es: 'Gestionar suscripción' }
      });
      return;
    }
    if (!res.ok || !body.url) throw new Error('checkout sem url (HTTP ' + res.status + ')');
    window.location.href = body.url; // Redireciona para o Stripe Checkout
  } catch (err) {
    console.error('Stripe checkout error:', err);
    amNotify({ pt: 'Erro ao iniciar pagamento. Tente novamente.', es: 'Error al iniciar el pago. Inténtalo de nuevo.' });
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
window.amTratamento       = amTratamento;
window.amNomeExibicao     = amNomeExibicao;
window.amAskGenero        = amAskGenero;
window.profileSetGenero   = profileSetGenero;
