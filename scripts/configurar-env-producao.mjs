#!/usr/bin/env node
/**
 * configurar-env-producao.mjs — repõe no servidor (Vercel) as configurações que o
 * site precisa para falar com o banco, SEM que o valor da chave passe pelo terminal,
 * pelo log ou pelo texto de uma sessão (P3).
 *
 * COMO evita expor o segredo: o valor nunca é impresso nem escrito em disco por este
 * script. Ele viaja de máquina para máquina — o Node lê a chave de dentro da aba do
 * painel do Supabase (via CDP) e a injeta direto na chamada da API da Vercel, feita
 * de dentro da aba já autenticada da Vercel. Aqui só se imprime "ok" ou o erro.
 *
 * PRÉ-REQUISITO: o Chrome de automação (porta 9222) no ar, com sessão aberta em
 * supabase.com/dashboard e em vercel.com (contas do dono).
 *
 * Uso:
 *   node scripts/configurar-env-producao.mjs            → confere e repõe o que faltar
 *   node scripts/configurar-env-producao.mjs --so-ver   → só relata, não escreve
 */
import http from 'node:http';

const PORTA = 9222;
const REF = 'zrntgfsciiwhwghadosg';
const PROJETO_VERCEL = 'anamnesismed-site';
const SO_VER = process.argv.includes('--so-ver');

const j = (caminho) => new Promise((ok, ruim) => {
  http.get({ host: '127.0.0.1', port: PORTA, path: caminho }, (r) => {
    let d = ''; r.on('data', (c) => d += c); r.on('end', () => { try { ok(JSON.parse(d)); } catch (e) { ruim(e); } });
  }).on('error', ruim);
});

/** Avalia uma expressão dentro de uma aba e devolve o valor (nunca imprime). */
async function naAba(alvoUrl, expr) {
  const abas = await j('/json/list');
  const aba = abas.find((t) => t.type === 'page' && alvoUrl.test(t.url));
  if (!aba) throw new Error(`nenhuma aba aberta em ${alvoUrl}`);
  // WebSocket nativo do Node (>=22) — mesmo caminho que .claude/lib/chrome-cdp.mjs usa.
  return await new Promise((ok, ruim) => {
    const s = new WebSocket(aba.webSocketDebuggerUrl);
    const tempo = setTimeout(() => { try { s.close(); } catch {} ruim(new Error('tempo esgotado')); }, 45000);
    s.onopen = () => s.send(JSON.stringify({
      id: 1, method: 'Runtime.evaluate',
      params: { expression: expr, awaitPromise: true, returnByValue: true },
    }));
    s.onmessage = (ev) => {
      const r = JSON.parse(String(ev.data));
      if (r.id !== 1) return;
      clearTimeout(tempo); s.close();
      if (r.error) return ruim(new Error(r.error.message));
      if (r.result?.exceptionDetails) return ruim(new Error(r.result.exceptionDetails.text));
      ok(r.result?.result?.value);
    };
    s.onerror = () => { clearTimeout(tempo); ruim(new Error('falha na conexão com o navegador')); };
  });
}

const escapar = (s) => JSON.stringify(String(s));

(async () => {
  // 1) A chave de serviço, lida de dentro da aba do painel do Supabase.
  const chave = await naAba(/supabase\.com\/dashboard/, `
    (async () => {
      const t = JSON.parse(localStorage.getItem('supabase.dashboard.auth.token'));
      const at = t.access_token || (t.currentSession && t.currentSession.access_token);
      const ks = await (await fetch('https://api.supabase.com/v1/projects/${REF}/api-keys',
        { headers: { Authorization: 'Bearer ' + at } })).json();
      const sr = (ks.find(k => k.name === 'service_role') || {}).api_key;
      return sr || '';
    })()`);
  if (!chave) throw new Error('não consegui obter a chave de serviço no painel do Supabase');
  console.log('· chave de serviço obtida do painel (valor não exibido)');

  const querido = {
    SUPABASE_URL: `https://${REF}.supabase.co`,
    SUPABASE_SERVICE_KEY: chave,
    NEXT_PUBLIC_URL: 'https://www.anamnesismed.com',
  };

  // 2) O que já existe lá.
  const existentes = await naAba(/vercel\.com/, `
    (async () => {
      const r = await fetch('https://vercel.com/api/v9/projects/${PROJETO_VERCEL}/env?decrypt=false',
        { credentials: 'include' });
      const j = await r.json();
      return (j.envs || []).map(e => e.key);
    })()`);
  console.log('· já configuradas no servidor:', existentes.join(', ') || '(nenhuma)');

  const faltando = Object.keys(querido).filter((k) => !existentes.includes(k));
  if (!faltando.length) { console.log('✅ nada a repor — tudo já está lá'); return; }
  console.log('· faltando:', faltando.join(', '));
  if (SO_VER) { console.log('(--so-ver: não escrevi nada)'); return; }

  // 3) Cria as que faltam — o valor vai embutido na chamada feita DENTRO da aba.
  for (const k of faltando) {
    const saida = await naAba(/vercel\.com/, `
      (async () => {
        const r = await fetch('https://vercel.com/api/v10/projects/${PROJETO_VERCEL}/env?upsert=true', {
          method: 'POST', credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key: ${escapar(k)}, value: ${escapar(querido[k])},
                                 type: 'encrypted', target: ['production','preview'] })
        });
        const j = await r.json().catch(() => ({}));
        return r.status + (j.error ? ' — ' + (j.error.message || j.error.code) : ' ok');
      })()`);
    console.log(`· ${k}: ${saida}`);
  }
  console.log('⚠️  configuração nova só passa a valer no próximo envio do site ao ar (redeploy).');
})().catch((e) => { console.error('❌', e.message); process.exit(1); });
