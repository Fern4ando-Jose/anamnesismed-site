// Testes do validador de guias de enfermidade (scripts/validar-enfermidades.js) e da regra de
// publicação do build (rascunho NÃO vai para o arquivo público). Sem rede.
const test = require('node:test');
const assert = require('node:assert');
const { validar } = require('../scripts/validar-enfermidades');
const { assemble } = require('../scripts/build');

const clone = (o) => JSON.parse(JSON.stringify(o));
const ESP = ['clinica', 'cirurgia'];
const REG_BASE = { motivos: { 'dor-abdominal': {}, apendicite: {} } };

function guiaValida() {
  return {
    name: 'Doença X', nameEs: 'Enfermedad X', especialidade: 'cirurgia', cid10: ['K35'], motivos: ['dor-abdominal'],
    definicao: 'd', definicaoEs: 'd',
    quadroClinico: { sintomas: ['a', 'b'], sintomasEs: ['a', 'b'] },
    diagnostico: { criterios: ['c'], criteriosEs: ['c'], exames: [{ nome: 'n', nomeEs: 'n', achado: 'a', achadoEs: 'a', quando: 'q', quandoEs: 'q' }], diferenciais: [{ id: 'apendicite', pista: 'p', pistaEs: 'p' }, { nome: 'Livre', nomeEs: 'Libre', pista: 'p', pistaEs: 'p' }] },
    tratamento: { medidas: ['m'], medidasEs: ['m'], farmacologico: [{ classe: 'c', classeEs: 'c', nota: 'n', notaEs: 'n', refs: [0] }] },
    casos: [{ titulo: 't', tituloEs: 't', nivel: 'basico', apresentacao: 'a', apresentacaoEs: 'a', diagnostico: 'x', etapas: [{ dados: 'd', dadosEs: 'd', pergunta: 'p', perguntaEs: 'p', opcoes: ['a', 'b'], opcoesEs: ['a', 'b'], correta: 1, comentario: 'c', comentarioEs: 'c' }] }],
    refs: [{ tipo: 'livro', citacao: 'L', verificada: false }, { tipo: 'artigo', citacao: 'A', verificada: false }],
    status: 'rascunho',
  };
}
const reg = (g) => Object.assign({}, REG_BASE, { enf: { x: g } });
const erros = (g) => validar(reg(g), ESP).erros;
const tem = (lista, trecho) => lista.some((e) => e.includes(trecho));

test('guia válida não gera erro', () => {
  assert.deepEqual(erros(guiaValida()), []);
});

test('regra 1: campo obrigatório ausente', () => {
  const g = guiaValida(); delete g.definicao; delete g.definicaoEs;
  assert.ok(tem(erros(g), 'campo obrigatório ausente: definicao'));
});

test('regra 2: falta tradução ES e tamanho diferente de lista', () => {
  let g = guiaValida(); delete g.definicaoEs;
  assert.ok(tem(erros(g), 'falta tradução ES: definicaoEs'));
  g = guiaValida(); g.quadroClinico.sintomasEs = ['a'];
  assert.ok(tem(erros(g), 'tamanho diferente PT/ES'));
  g = guiaValida(); delete g.casos[0].etapas[0].comentarioEs;
  assert.ok(tem(erros(g), 'casos[0].etapas[0].comentarioEs'));
});

test('regra 3: refs — mínimo 2, ao menos 1 livro/diretriz, campo verificada obrigatório', () => {
  let g = guiaValida(); g.refs = [g.refs[0]];
  assert.ok(tem(erros(g), 'mínimo de 2 referências'));
  g = guiaValida(); g.refs = [{ tipo: 'artigo', citacao: 'A', verificada: false }, { tipo: 'artigo', citacao: 'B', verificada: false }];
  assert.ok(tem(erros(g), 'ao menos 1 referência do tipo livro ou diretriz'));
  g = guiaValida(); delete g.refs[0].verificada;
  assert.ok(tem(erros(g), 'refs[0].verificada'));
});

test('regra 4: ids inexistentes (especialidade, motivo, diferencial)', () => {
  let g = guiaValida(); g.especialidade = 'nao-existe';
  assert.ok(tem(erros(g), 'especialidade inexistente'));
  g = guiaValida(); g.motivos = ['fantasma'];
  assert.ok(tem(erros(g), 'motivo inexistente: fantasma'));
  g = guiaValida(); g.diagnostico.diferenciais[0].id = 'fantasma';
  assert.ok(tem(erros(g), 'diferencial aponta id inexistente'));
  g = guiaValida(); g.diagnostico.diferenciais.push({ pista: 'p', pistaEs: 'p' });
  assert.ok(tem(erros(g), 'precisa de id ou nome'));
});

test('regra 5: fármaco sem refs ou com índice inexistente', () => {
  let g = guiaValida(); delete g.tratamento.farmacologico[0].refs;
  assert.ok(tem(erros(g), 'sem refs'));
  g = guiaValida(); g.tratamento.farmacologico[0].refs = [5];
  assert.ok(tem(erros(g), 'índice inexistente'));
});

test('regra 6: publicado exige revisadoEm, revisor e refs verificadas', () => {
  let g = guiaValida(); g.status = 'publicado';
  const e = erros(g);
  assert.ok(tem(e, 'revisadoEm') && tem(e, 'revisor') && tem(e, 'verificada:true'));
  g.revisadoEm = '2026-10-01'; g.revisor = 'dono'; g.refs.forEach((r) => { r.verificada = true; });
  assert.deepEqual(erros(g), []);
  g.status = 'qualquer';
  assert.ok(tem(erros(g), 'status inválido'));
});

test('regra 7: CID em formato estranho é aviso, não erro', () => {
  const g = guiaValida(); g.cid10 = ['xx'];
  const r = validar(reg(g), ESP);
  assert.deepEqual(r.erros, []);
  assert.ok(r.avisos.some((a) => a.includes('CID')));
});

test('regra 8: caso — correta fora do intervalo, nivel inválido, diagnóstico inexistente', () => {
  let g = guiaValida(); g.casos[0].etapas[0].correta = 2;
  assert.ok(tem(erros(g), 'correta fora do intervalo'));
  g = guiaValida(); g.casos[0].nivel = 'impossivel';
  assert.ok(tem(erros(g), 'nivel inválido'));
  g = guiaValida(); g.casos[0].diagnostico = 'fantasma';
  assert.ok(tem(erros(g), 'diagnostico aponta id inexistente'));
});

test('build: guias em rascunho NÃO entram no arquivo público; --rascunhos inclui', () => {
  const pub = assemble().enfSrc;
  assert.ok(!pub.includes('apendicite-aguda'), 'rascunho vazou para o bundle público');
  assert.match(pub, /const ENFERMIDADES = \{\}/);
  const prev = assemble({ rascunhos: true }).enfSrc;
  assert.ok(prev.includes('apendicite-aguda'));
});

test('piloto real: apendicite-aguda é válida e está em rascunho', () => {
  const { montar } = require('../scripts/build');
  const { reg: r, espIds } = montar();
  assert.deepEqual(validar(r, espIds).erros, []);
  assert.equal(r.enf['apendicite-aguda'].status, 'rascunho');
  assert.ok(r.enf['apendicite-aguda'].refs.every((x) => x.verificada === false), 'refs não conferidas não podem estar como verificadas');
});
