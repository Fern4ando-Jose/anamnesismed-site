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

**Limpeza junto com o commit:** sempre que houver mudanças, limpar os temporários (apagar `_*.png/mp4/txt`, exports de teste; mídia reutilizável vai para `_arquivo-midia/<projeto>/`, que é gitignored) ANTES de commitar. Não perguntar a cada arquivo — fazer a curadoria e commitar.

## 1b. Pendências vão para `PENDENCIAS.md` (não só na memória)

Toda pendência do projeto é registrada no arquivo canônico **`PENDENCIAS.md`** na raiz do repositório — versionado no Git, não apenas na memória do Claude. Ao identificar uma pendência, adicioná-la lá (ordenada por urgência); ao concluir, marcar `[x]` e mover para o histórico com a data. A memória do Claude pode guardar contexto de arquitetura, mas a **lista de pendências em si vive no `PENDENCIAS.md`**.

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

**Nunca** editar `anamnesismed-motivos.js`/`anamnesismed-guide-es.js` à mão, nem inserir dados clínicos, geradores de narrativa, código do PDF ou builders de guia dentro de `anamnesismed-app.html`.

## 8. Rodar `bash scripts/verify.sh` antes de cada commit

Após qualquer edição, executar o script de verificação de integridade antes de commitar:

```
bash scripts/verify.sh
```

O script verifica: contagem de linhas, fechamento correto de HTML, presença de funções-chave, integridade do motivos.js e do vercel.json. **Não commitar se houver erros.**

Se um arquivo estiver truncado (erro de linha ou função ausente), restaurar com:
```
git checkout HEAD -- <arquivo>
```

## 9. Arquivos modificados pelo filesystem Linux podem ser truncados

O mount Windows↔Linux pode truncar arquivos grandes ao gravá-los via bash. Para gravar arquivos grandes (>500 linhas), usar sempre `cat > arquivo << 'EOF' ... EOF` ou `cp /tmp/arquivo_preparado destino` em vez de ferramentas que fazem write incremental. Verificar com `wc -l` e `tail -3` imediatamente após gravar.

## 10. Sidebar é um componente único — nunca duplicar inline

O sidebar da área autenticada vive exclusivamente em **`sidebar.js`** (HTML + lógica de toggle + active state) e **`sidebar.css`** (todos os estilos). Esses dois arquivos são a fonte canônica.

**Para incluir o sidebar em qualquer página nova:**
```html
<!-- no <head>, após o </style> -->
<link rel="stylesheet" href="sidebar.css">

<!-- no <body> -->
<div id="sidebar-root"></div>

<!-- antes do </body> -->
<script src="sidebar.js"></script>
```

**Regras:**
- **Nunca** copiar o HTML do sidebar dentro de uma página `.html` — toda página usa `<div id="sidebar-root"></div>`.
- **Nunca** reescrever CSS do sidebar dentro de uma página — editar somente `sidebar.css`.
- Para mudar conteúdo ou estilo do sidebar (links, ícones, cores, contadores), editar `sidebar.js` ou `sidebar.css` — a mudança reflete automaticamente em todas as páginas.
- Ao adicionar uma nova página na área autenticada, sempre incluir os 3 trechos acima.
- Ao adicionar uma nova página ao app, atualizar também as regras de active state dentro de `sidebar.js` (objeto `rules` na função `_sidebarSetActive`).

**Estrutura do sidebar (referência):**
- PRINCIPAL: Início (`anamnesismed-dashboard.html`), Nova HC (`anamnesismed-app.html`), Minhas HCs (`anamnesismed-dashboard.html?view=hcs`)
- ESPECIALIDADES: semiologia, respiratório, clínica médica, cirurgia (com contadores de motivos)
- FERRAMENTAS: Mnemônicas, Configurações, Upgrade Pro, Sair

## Contexto do produto

Meta: 100 mil usuários até o fim de 2026 — tratar tudo como produto profissional, sem "detalhes menores".
