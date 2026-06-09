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
| `anamnesismed-motivos.js` | Dados clínicos: `MOTIVOS`, `RAS_SYSTEMS`, `GUIDE_CONTENT` | Novo motivo, nova pergunta AEA, mnemônico, DDx |
| `anamnesismed-narrativa.js` | Geradores de texto da HC (`gerarNarrativaAEA_*`) | Melhorar narrativa, adicionar gerador específico por motivo |
| `anamnesismed-pdf.js` | Função `exportPDF` — layout e montagem do PDF | Mudar layout do PDF, adicionar seção ao documento |
| `anamnesismed-guide.js` | Builders HTML do painel guia (`buildAEAGuideHTML`, `buildMnemonicsHTML`, etc.) | Mudar visual do painel AEA ou das mnemônicas |
| `supabase-integration.js` | Auth, perfil, salvamento no Supabase | Persistência, autenticação, trial |
| `anamnesismed-app.html` | Markup HTML + CSS + lógica de UI (navegação, formulário, snapshots) | Telas, botões, CSS, fluxo de navegação |

**Nunca** inserir dados clínicos, geradores de narrativa, código do PDF ou builders de guia dentro de `anamnesismed-app.html`.

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

## Contexto do produto

Meta: 100 mil usuários até o fim de 2026 — tratar tudo como produto profissional, sem "detalhes menores".
