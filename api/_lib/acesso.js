/**
 * Gate de acesso compartilhado das Vercel Functions (api/_lib não vira rota: o prefixo `_`
 * é ignorado pela Vercel).
 *
 * Autentica o token do Supabase e decide, NO SERVIDOR, se o usuário pode usar o recurso:
 *   exigir:'pago'           → plano pago ativo (assistente-dx)
 *   exigir:'pago_ou_trial'  → plano pago OU trial vigente (gerar-hc)
 *   exigir:'logado'         → só autenticação (checkout: quem vai assinar ainda não é pago)
 *
 * O plano vem sempre de `profiles` lido com a service_role — nunca do corpo da requisição.
 * Retorno: { ok:true, userId, email, sbAdmin, perfil, plano } ou { ok:false, status, body }.
 */

const { createClient } = require('@supabase/supabase-js');

// 'pro' é o plano pago atual; 'estudante' e 'medico' são os planos da Fase 1 (MAPA.md).
const PLANOS_PAGOS = ['pro', 'estudante', 'medico'];

function extrairToken(req) {
  const h = (req.headers && (req.headers['authorization'] || req.headers['Authorization'])) || '';
  return /^Bearer\s+(.+)$/i.test(h) ? h.replace(/^Bearer\s+/i, '').trim() : '';
}

// Trial vigente = plano 'trial' com trial_end no futuro. trial_end ausente/ inválido = vencido
// (mesma regra do front, profileCheckAccess).
function avaliarPlano(perfil, agora) {
  const plano = perfil && perfil.plano ? String(perfil.plano) : null;
  const pago = PLANOS_PAGOS.indexOf(plano) >= 0;
  const fim = perfil && perfil.trial_end ? new Date(perfil.trial_end).getTime() : NaN;
  const trialAtivo = plano === 'trial' && Number.isFinite(fim) && fim > (agora || Date.now());
  return { plano, pago, trialAtivo };
}

async function exigirAcesso(req, opts) {
  const o = opts || {};
  const msg = o.msg || function (p) { return p; };
  const exigir = o.exigir || 'logado';
  const falha = function (status, error, code) {
    const body = { error: error };
    if (code) body.code = code;
    return { ok: false, status: status, body: body };
  };

  const token = extrairToken(req);
  if (!token) return falha(401, msg('Não autenticado', 'No autenticado'));

  const sbAdmin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

  let user = null;
  try {
    const r = await sbAdmin.auth.getUser(token);
    if (r.error || !r.data || !r.data.user) return falha(401, msg('Sessão inválida', 'Sesión inválida'));
    user = r.data.user;
  } catch (e) {
    return falha(401, msg('Falha ao validar sessão', 'Error al validar la sesión'));
  }

  const base = { ok: true, userId: user.id, email: user.email || null, sbAdmin: sbAdmin };
  if (exigir === 'logado') return base;

  let perfil = null;
  try {
    const r = await sbAdmin.from('profiles').select('plano, trial_end').eq('id', user.id).single();
    if (r.error && r.error.code !== 'PGRST116') {
      // erro de banco (≠ "linha não existe"): não é culpa do plano do usuário → 503, fail-closed
      console.error('[acesso] leitura de profiles falhou (fail-closed):', r.error.message || r.error.code);
      return falha(503, msg('Não foi possível confirmar o plano agora. Tente novamente.', 'No se pudo confirmar el plan ahora. Inténtalo de nuevo.'), 'plan_unavailable');
    }
    perfil = r.data || null;
  } catch (e) {
    console.error('[acesso] exceção ao ler profiles (fail-closed):', e && e.message ? e.message : e);
    return falha(503, msg('Não foi possível confirmar o plano agora. Tente novamente.', 'No se pudo confirmar el plan ahora. Inténtalo de nuevo.'), 'plan_unavailable');
  }

  const av = avaliarPlano(perfil);
  const liberado = exigir === 'pago' ? av.pago : (av.pago || av.trialAtivo);
  if (!liberado) {
    return falha(403,
      exigir === 'pago'
        ? msg('Recurso exclusivo do plano pago', 'Recurso exclusivo del plan de pago')
        : msg('Seu período de teste terminou. Assine para continuar usando a IA.', 'Tu período de prueba terminó. Suscríbete para seguir usando la IA.'),
      'upgrade');
  }
  return Object.assign(base, { perfil: perfil, plano: av.plano });
}

module.exports = { exigirAcesso, avaliarPlano, extrairToken, PLANOS_PAGOS };
