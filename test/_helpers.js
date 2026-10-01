// Helpers compartilhados pelos testes das rotas /api (sem rede, sem chaves reais).
// Prefixo "_" e sem ".test" no nome: o `node --test` não o executa como teste.
const Module = require('node:module');

// Carrega uma instância fresca do handler com os módulos injetados via Module._load.
function loadWithMocks(handlerPath, mocks) {
  const origLoad = Module._load;
  Module._load = function (request) {
    if (Object.prototype.hasOwnProperty.call(mocks, request)) return mocks[request];
    return origLoad.apply(this, arguments);
  };
  try {
    delete require.cache[require.resolve(handlerPath)];
    return require(handlerPath);
  } finally {
    Module._load = origLoad;
  }
}

function makeRes() {
  const res = { code: null, body: null, headers: {}, ended: false };
  res.status = (c) => { res.code = c; return res; };
  res.json = (b) => { res.body = b; return res; };
  res.end = () => { res.ended = true; return res; };
  res.setHeader = (k, v) => { res.headers[k] = v; };
  return res;
}

module.exports = { loadWithMocks, makeRes };
