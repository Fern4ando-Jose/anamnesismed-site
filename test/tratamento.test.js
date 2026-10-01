// Testa a lógica pura de tratamento (Dr./Dra.) de supabase-integration.js,
// extraída entre os marcadores AM_TRATAMENTO_BEGIN/END (o arquivo inteiro exige browser + supabase-js).
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const src = fs.readFileSync(path.join(__dirname, '..', 'supabase-integration.js'), 'utf8');
const m = src.match(/\/\/ AM_TRATAMENTO_BEGIN[\s\S]*?\n([\s\S]*?)\/\/ AM_TRATAMENTO_END/);
assert.ok(m, 'marcadores AM_TRATAMENTO_BEGIN/END ausentes');
const ctx = {};
vm.runInNewContext(m[1] + '\nthis.amTratamento=amTratamento;this.amNomeExibicao=amNomeExibicao;this.amGeneroNorm=amGeneroNorm;', ctx);
const { amTratamento, amNomeExibicao, amGeneroNorm } = ctx;

test('médico F → Dra.', () => {
  const p = { tipo_usuario: 'medico', genero: 'F', nome: 'fernanda' };
  assert.equal(amTratamento(p), 'Dra.');
  assert.equal(amNomeExibicao(p), 'Dra. Fernanda');
});
test('médico M → Dr.', () => {
  const p = { tipo_usuario: 'medico', genero: 'M', nome: 'João' };
  assert.equal(amTratamento(p), 'Dr.');
  assert.equal(amNomeExibicao(p), 'Dr. João');
});
test('médico sem gênero (cadastro antigo) → Dr(a).', () => {
  for (const g of [null, undefined, '', 'X']) {
    const p = { tipo_usuario: 'medico', genero: g, nome: 'Ana' };
    assert.equal(amTratamento(p), 'Dr(a).');
    assert.equal(amNomeExibicao(p), 'Dr(a). Ana');
  }
});
test('estudante nunca recebe título, mesmo com genero', () => {
  assert.equal(amNomeExibicao({ tipo_usuario: 'estudante', genero: 'F', nome: 'Bia' }), 'Bia');
  assert.equal(amTratamento({ tipo_usuario: 'estudante', genero: 'M', nome: 'Caio' }), '');
  assert.equal(amNomeExibicao({ tipo_usuario: null, genero: 'F', nome: 'Duda' }), 'Duda');
  assert.equal(amTratamento(null), '');
});
test('nome que já traz Dr./Dra. não duplica o título', () => {
  assert.equal(amNomeExibicao({ tipo_usuario: 'medico', genero: 'F', nome: 'Dra. Fernanda' }), 'Dra. Fernanda');
  assert.equal(amNomeExibicao({ tipo_usuario: 'medico', genero: 'M', nome: 'Dr(a). Paulo' }), 'Dr. Paulo');
  assert.equal(amNomeExibicao({ tipo_usuario: 'medico', genero: 'F', nome: 'dr. dra. Lia' }), 'Dra. Lia');
  assert.equal(amNomeExibicao({ tipo_usuario: 'estudante', nome: 'Dr. Teo' }), 'Teo');
  assert.equal(amNomeExibicao({ tipo_usuario: 'medico', genero: 'M', nome: 'Draco' }), 'Dr. Draco');
});
test('fallback para e-mail e normalização de genero', () => {
  assert.equal(amNomeExibicao({ tipo_usuario: 'medico', genero: 'f', email: 'marta@x.com' }), 'Dra. Marta');
  assert.equal(amGeneroNorm(' m '), 'M');
  assert.equal(amGeneroNorm('O'), null);
});
