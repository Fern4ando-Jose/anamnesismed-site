// scripts/validar-enfermidades.js — valida as guias de enfermidade e os casos (docs/ESQUEMA-ENFERMIDADE.md §5).
// Uso:  node scripts/validar-enfermidades.js   → imprime erros/avisos; exit 1 se houver erro
//       require('./validar-enfermidades').validar(reg, espIds) → { erros:[], avisos:[] }  [usado por build.js, verify.sh e testes]
// `reg` = { motivos:{id:...}, enf:{id:...} } (registro montado por scripts/build.js).
const STATUS = ['rascunho', 'revisado', 'publicado'];
const REVISOR = ['dono', 'agente', 'externo'];
const TIPO_REF = ['livro', 'diretriz', 'artigo'];

// Campos traduzíveis: cada `x` exige `xEs` do mesmo tipo (e mesmo tamanho, se lista).
const TOP_TXT = ['name', 'definicao', 'epidemiologia', 'fisiopatologia', 'prognostico'];
const TOP_LST = ['complicacoes', 'sinaisAlarme'];
const QC_LST = ['sintomas', 'sinais', 'formasAtipicas'];
const OBRIGATORIOS = ['name', 'especialidade', 'definicao', 'quadroClinico', 'diagnostico', 'tratamento', 'refs'];

const vazio = (v) => v === undefined || v === null || (typeof v === 'string' && !v.trim()) || (Array.isArray(v) && !v.length);

function validar(reg, espIds) {
  const erros = [], avisos = [];
  const enf = (reg && reg.enf) || {};
  const motivos = (reg && reg.motivos) || {};
  const esp = espIds || [];

  Object.keys(enf).forEach((id) => {
    const e = enf[id] || {};
    const E = (m) => erros.push(id + ': ' + m);
    const A = (m) => avisos.push(id + ': ' + m);

    // 1) obrigatórios
    OBRIGATORIOS.forEach((k) => { if (vazio(e[k])) E('campo obrigatório ausente: ' + k); });

    // 2) paridade PT/ES
    const par = (obj, k, onde) => {
      if (!obj || vazio(obj[k])) return;
      const es = obj[k + 'Es'];
      if (vazio(es)) return E('falta tradução ES: ' + onde + k + 'Es');
      if (Array.isArray(obj[k]) !== Array.isArray(es)) return E('tipo diferente PT/ES: ' + onde + k);
      if (Array.isArray(es) && es.length !== obj[k].length) E('tamanho diferente PT/ES (' + obj[k].length + ' x ' + es.length + '): ' + onde + k);
    };
    TOP_TXT.concat(TOP_LST).forEach((k) => par(e, k, ''));
    QC_LST.forEach((k) => par(e.quadroClinico, k, 'quadroClinico.'));
    par(e.diagnostico, 'criterios', 'diagnostico.');
    (e.diagnostico && e.diagnostico.exames || []).forEach((x, i) => ['nome', 'achado', 'quando'].forEach((k) => par(x, k, 'diagnostico.exames[' + i + '].')));
    (e.diagnostico && e.diagnostico.diferenciais || []).forEach((x, i) => { par(x, 'nome', 'diagnostico.diferenciais[' + i + '].'); par(x, 'pista', 'diagnostico.diferenciais[' + i + '].'); });
    par(e.tratamento, 'medidas', 'tratamento.');
    par(e.tratamento, 'cirurgico', 'tratamento.');
    par(e.tratamento, 'encaminhar', 'tratamento.');
    (e.tratamento && e.tratamento.farmacologico || []).forEach((x, i) => ['classe', 'nota'].forEach((k) => par(x, k, 'tratamento.farmacologico[' + i + '].')));
    (e.casos || []).forEach((c, ci) => {
      const w = 'casos[' + ci + '].';
      ['titulo', 'apresentacao'].forEach((k) => par(c, k, w));
      par(c, 'perolas', w);
      (c.etapas || []).forEach((et, i) => ['dados', 'pergunta', 'comentario', 'opcoes'].forEach((k) => par(et, k, w + 'etapas[' + i + '].')));
    });

    // 3) referências
    const refs = Array.isArray(e.refs) ? e.refs : [];
    if (refs.length < 2) E('mínimo de 2 referências (tem ' + refs.length + ')');
    if (!refs.some((r) => r && (r.tipo === 'livro' || r.tipo === 'diretriz'))) E('precisa de ao menos 1 referência do tipo livro ou diretriz');
    refs.forEach((r, i) => {
      if (!r || TIPO_REF.indexOf(r.tipo) < 0) E('refs[' + i + '].tipo inválido (livro|diretriz|artigo)');
      if (!r || vazio(r.citacao)) E('refs[' + i + '].citacao ausente');
      if (!r || typeof r.verificada !== 'boolean') E('refs[' + i + '].verificada deve ser true/false');
    });

    // 4) ids existentes
    if (!vazio(e.especialidade) && esp.indexOf(e.especialidade) < 0) E('especialidade inexistente: ' + e.especialidade);
    (e.motivos || []).forEach((m) => { if (!motivos[m]) E('motivo inexistente: ' + m); });
    // diferencial: `id` (ligado a enfermidade/motivo existente) OU `nome` (texto livre, sem link ainda)
    (e.diagnostico && e.diagnostico.diferenciais || []).forEach((d, i) => {
      if (!d) return E('diagnostico.diferenciais[' + i + '] vazio');
      if (d.id) { if (!enf[d.id] && !motivos[d.id]) E('diferencial aponta id inexistente: ' + d.id); }
      else if (vazio(d.nome)) E('diagnostico.diferenciais[' + i + '] precisa de id ou nome');
    });

    // 5) fármacos referenciados
    (e.tratamento && e.tratamento.farmacologico || []).forEach((f, i) => {
      const rs = f && f.refs;
      if (!Array.isArray(rs) || !rs.length) E('tratamento.farmacologico[' + i + '] sem refs (índices de refs[])');
      else rs.forEach((n) => { if (!Number.isInteger(n) || n < 0 || n >= refs.length) E('tratamento.farmacologico[' + i + '].refs aponta índice inexistente: ' + n); });
    });

    // 6) status
    if (STATUS.indexOf(e.status) < 0) E('status inválido (rascunho|revisado|publicado)');
    if (e.status === 'publicado') {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(e.revisadoEm || '')) E('publicado exige revisadoEm (AAAA-MM-DD)');
      if (REVISOR.indexOf(e.revisor) < 0) E('publicado exige revisor (dono|agente|externo)');
      if (refs.some((r) => r && r.verificada !== true)) E('publicado exige todas as refs com verificada:true');
    }

    // 7) CID
    (e.cid10 || []).concat(e.cie10 || []).forEach((c) => { if (!/^[A-Z]\d{2}(\.\d{1,2})?$/.test(c)) A('código CID/CIE em formato estranho: ' + c); });

    // 8) casos
    (e.casos || []).forEach((c, ci) => {
      const w = 'casos[' + ci + ']';
      if (!c.diagnostico || !enf[c.diagnostico]) E(w + '.diagnostico aponta id inexistente: ' + c.diagnostico);
      if (['basico', 'intermediario', 'avancado'].indexOf(c.nivel) < 0) E(w + '.nivel inválido');
      if (vazio(c.etapas)) E(w + ' sem etapas');
      (c.etapas || []).forEach((et, i) => {
        if (et.livre === true) return;
        const n = Array.isArray(et.opcoes) ? et.opcoes.length : 0;
        if (n < 2) E(w + '.etapas[' + i + '] precisa de ≥2 opcoes (ou livre:true)');
        else if (!Number.isInteger(et.correta) || et.correta < 0 || et.correta >= n) E(w + '.etapas[' + i + '].correta fora do intervalo de opcoes');
      });
    });
  });
  return { erros, avisos };
}

module.exports = { validar };

if (require.main === module) {
  const { montar } = require('./build');
  const { reg, espIds } = montar();
  const { erros, avisos } = validar(reg, espIds);
  avisos.forEach((a) => console.log('  AVISO ' + a));
  erros.forEach((e) => console.log('  ERRO  ' + e));
  const n = Object.keys(reg.enf).length;
  console.log(erros.length ? 'enfermidades: ' + erros.length + ' erro(s) em ' + n + ' guia(s)' : 'enfermidades OK (' + n + ' guia(s), ' + avisos.length + ' aviso(s))');
  process.exit(erros.length ? 1 : 0);
}
