# Regras do projeto AnamnesísMed

Estas regras existem para evitar o looping de "corrige um erro, outra mudança desfaz a correção, o erro antigo volta". Siga-as sempre, em qualquer sessão de trabalho neste repositório.

## 1. Commit + push a cada correção concluída

Depois de implementar e validar UMA correção pontual (não um lote de várias), faça commit e push antes de seguir para a próxima:

```
git add -A
git commit -m "descrição curta da correção"
git push origin main
```

Não acumule várias correções não commitadas — se algo der errado no meio do caminho, perde-se trabalho validado e abre espaço para regressões silenciosas.

## 2. Nunca deixar valores estáticos onde deveria haver dado dinâmico

Exemplo do bug do "Trial — 27 dias restantes": o texto fixo no HTML voltava a aparecer porque o HTML era reescrito sem reconectar a função que populava o valor real.

Regra: no HTML, usar sempre um placeholder neutro (ex: `<span id="trial-days">—</span>` ou `Carregando...`) e popular o valor real exclusivamente via JS no carregamento da página (ex: `uiUpdateUserInfo()`, `profileCheckAccess()`). Nunca escrever o número/texto real diretamente no HTML.

## 3. Confirmar que a correção anterior continua no arquivo antes de prosseguir

Antes de começar a próxima tarefa, rodar um grep rápido pelas âncoras da correção anterior (nome de função, id de elemento, string-chave) para garantir que ainda está lá. Não assumir que "ficou pronto" só porque foi implementado uma vez.

## 4. Preferir edições cirúrgicas a reescritas completas de arquivo

Usar find-and-replace pontual (Edit) em vez de reescrever o arquivo inteiro. Reescritas grandes são a causa mais provável de truncamentos (arquivo cortado no meio de uma string, tags de fechamento sumindo etc.).

Se uma reescrita grande for inevitável, fazer em pedaços e validar a integridade depois (`wc -l`, presença de `</html>`, `</body>`, funções-chave).

## 5. Funções já existentes em `supabase-integration.js` devem ser conectadas, não reimplementadas

Antes de escrever uma função nova, verificar se já existe equivalente em `supabase-integration.js` (ex: `profileCheckAccess`, `onboardingCheckAndShow`, `hcSave`, `uiUpdateUserInfo`, `guardCheckAccess`, `profileGet`). O problema raiz mais comum até agora foi: a função existe mas não é chamada em lugar nenhum do HTML.

## 6. Cuidado com a ordem de carregamento dos scripts

`supabase-integration.js` é carregado DEPOIS do primeiro bloco `<script>` inline em `anamnesismed-app.html`. Qualquer código que dependa de funções dele (`hcLoad`, `hcSave`, `authGetUser` etc.) deve rodar dentro do bloco de integração Supabase (o segundo `<script>`, após `guardCheckAccess`), nunca no primeiro bloco/INIT — senão `window.hcLoad` (etc.) ainda será `undefined` e o `if(window.hcLoad)` falha silenciosamente.

## 7. Cada arquivo tem responsabilidade única — editar somente o arquivo certo

O projeto segue separação estrita de responsabilidades:

| Arquivo | O que contém | Quando editar |
|---|---|---|
| `src/motivos/<id>.js` | **FONTE CANÔNICA de cada motivo**: metadados, `aeaGuide`, `guidePt`, `guideEs` (ou `guideFrom` para herdar o guia de outro motivo) | Novo motivo, nova pergunta AEA, mnemônico, DDx, tradução ES de um motivo |
| `src/especialidades/<esp>.js` | Ordem das categorias + lista de **ids** de motivos (referência, não duplica) | Adicionar/reordenar motivos numa especialidade |
| `src/ras.js` | `RAS_SYSTEMS` (Revisão por Aparelhos e Sistemas) | Mudar perguntas da RAS |
| `anamnesismed-motivos.js` / `anamnesismed-guide-es.js` | ⚙️ **GERADOS** por `scripts/build.js` — NÃO editar à mão | (nunca; rode o build) |
| `anamnesismed-narrativa.js` | Geradores de texto da HC (`gerarNarrativaAEA_*`) | Melhorar narrativa, adicionar gerador específico por motivo |
| `anamnesismed-pdf.js` | Função `exportPDF` — layout e montagem do PDF | Mudar layout do PDF, adicionar seção ao documento |
| `anamnesismed-guide.js` | Builders HTML do painel guia (`buildAEAGuideHTML`, `buildMnemonicsHTML`, etc.) | Mudar visual do painel AEA ou das mnemônicas |
| `supabase-integration.js` | Auth, perfil, salvamento no Supabase | Persistência, autenticação, trial |
| `anamnesismed-app.html` | Markup HTML + CSS + lógica de UI (navegação, formulário, snapshots) | Telas, botões, CSS, fluxo de navegação |

**Fonte modular + build:** os dados clínicos vivem em `src/` (1 arquivo por motivo, 1 por especialidade). Após editar `src/`, rode **`node scripts/build.js`** para regenerar `anamnesismed-motivos.js` e `anamnesismed-guide-es.js`. Um motivo compartilhado (ex.: `febre`) é definido **uma única vez** em `src/motivos/febre.js`; outros (ex.: `semio-febre`) herdam o guia via `guideFrom:'febre'`. O `verify.sh` confere que produção == `build(src/)`.

**Nunca** editar `anamnesismed-motivos.js`/`anamnesismed-guide-es.js` à mão, nem inserir dados clínicos, geradores de narrativa, código do PDF ou builders de guia dentro de `anam