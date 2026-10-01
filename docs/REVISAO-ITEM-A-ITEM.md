# Revisão item a item — o que foi aplicado e o que você decide

> Instrução do dono: *aplicar tudo o que os revisores sugeriram; o dono analisa item por item e propõe mudanças antes de qualquer coisa ir ao público.*
> Nada disto está no `main` nem no site: está só no PR #5. Cada linha tem **Decisão do dono**: marque `[x] manter`, `[x] mudar` (e escreva o que muda) ou `[x] remover`.
>
> **Como ler a coluna "Fonte":**
> **V** = o revisor confirmou em resumo/busca · **M** = veio da memória do revisor ou do assistente, **não confirmado no texto** · marcação `[conferir]` aparece também no próprio texto da guia.
> Limite de todas as revisões: nenhum livro-texto foi consultado e o texto integral das diretrizes estava bloqueado. **Nada aqui substitui a sua conferência pelos livros.**
> Relatórios completos: `docs/auditoria/06-…` (apendicite) e `07-…` (pancreatite e colecistite).

## A. Apendicite — guia do motivo (`src/motivos/apendicite.js`)

| # | Mudança | Fonte | Decisão do dono |
|---|---|---|---|
| A1 | AIR refeito: rebote/defesa = 1 item (leve 1, moderada 2, forte 3); incluídos neutrófilos (70-84% = 1; ≥85% = 2); soma máx. 12 | M (artigo não aberto); cortes 0-4/5-8/9-12 V | [ ] manter [ ] mudar |
| A2 | Mnemônico ES "A. MAESTRO" trocado por MANTRELS | V (Alvarado 1986) | [ ] manter [ ] mudar |
| A3 | Temperatura e leucocitose: `>` (era `≥` em um ponto) | M | [ ] manter [ ] mudar |
| A4 | Analgesia: "inclusive opioide (não mascara nem retarda)"; dipirona/tramadol retirados | V (Cochrane CD005660 só cobre opioides) | [ ] manter [ ] mudar |
| A5 | Antibiótico pré-op: cefazolina 2 g + **metronidazol 500 mg**, até 60 min antes da incisão | M | [ ] manter [ ] mudar |
| A6 | Forma perfurada: metronidazol 500 mg 8/8h + ceftriaxona 1-2 g 24/24h; duração curta conforme o controle do foco | M | [ ] manter [ ] mudar |
| A7 | TC "gold standard" → "se USG inconclusivo ou dúvida"; Rx só se suspeita de perfuração/obstrução | M | [ ] manter [ ] mudar |
| A8 | "Grito de Laffont" removido do título do sinal de Chandelier | M | [ ] manter [ ] mudar |
| A9 | Removidos cortes sem fonte: leucocitose >18.000, T >38,5 °C, anorexia >90% | sem fonte | [ ] manter [ ] mudar |
| A10 | Alvarado não decide cirurgia sozinho em mulher, criança e idoso (imagem antes) | M (WSES 2020) | [ ] manter [ ] mudar |

## B. Apendicite — guia de estudo (`src/enfermidades/apendicite-aguda.js`, rascunho)

| # | Mudança | Fonte | Decisão do dono |
|---|---|---|---|
| B1 | β-HCG: só o resultado negativo afasta gravidez | lógica | [ ] manter [ ] mudar |
| B2 | Título completo do artigo do AIR; ref do Cochrane (Manterola 2011, CD005660) adicionada e ligada à analgesia | V (existência) | [ ] manter [ ] mudar |
| B3 | Manejo não operatório com antibiótico em casos selecionados | V (WSES 2020/2025, resumo) | [ ] manter [ ] mudar |
| B4 | Epidemiologia: leve predomínio masculino; risco ao longo da vida ~7-8% | M | [ ] manter [ ] mudar |
| B5 | Fisiopatologia: nem todo caso é progressivo (não complicado × complicado) | M | [ ] manter [ ] mudar |
| B6 | Atípicas: gestante com dor em QSD; maior taxa de perfuração em idosos/crianças/gestantes | M | [ ] manter [ ] mudar |
| B7 | USG: apêndice >6 mm | M | [ ] manter [ ] mudar |
| B8 | Diferenciais acrescentados: linfadenite mesentérica/ileíte, Crohn, cisto ovariano (torção/ruptura), torção testicular, hérnia encarcerada | M | [ ] manter [ ] mudar |
| B9 | Cirurgia: atraso de até 24 h seguro na forma não complicada; abscesso: drenagem percutânea e apendicectomia de intervalo | V (prazo <24 h, resumo); resto M | [ ] manter [ ] mudar |
| B10 | Complicações: íleo, abscesso residual, aderências | M | [ ] manter [ ] mudar |
| B11 | Nota na ref da WSES: existe edição 2025 — qual usar | V | [ ] manter [ ] mudar |

## C. Pancreatite aguda — guia do motivo (`src/motivos/pancreatite-aguda.js`)

| # | Mudança | Fonte | Decisão do dono |
|---|---|---|---|
| C1 | "Hidratação vigorosa / reposição agressiva" → **moderadamente agressiva, guiada por metas, Ringer lactato, evitando excesso** (PT e ES) | V (ACG 2024, resumo); WATERFALL M | [ ] manter [ ] mudar |
| C2 | "CPRE se colangite/obstrução biliar" → **CPRE urgente só se colangite** (obstrução sem colangite: avaliar) | V (ACG 2024 contra CPRE precoce sem colangite) | [ ] manter [ ] mudar |
| C3 | Nutrição: dieta oral precoce (24-48 h); enteral se não tolerar (preferível à parenteral) | V oral precoce; resto M | [ ] manter [ ] mudar |
| C4 | Ranson: nota de que os limites são de pancreatite **não biliar**; na biliar: >70 anos, leuco >18.000, glicose >220, DHL >400, TGO >250 | M | [ ] manter [ ] mudar |
| C5 | GET SMASHED: "Trauma" sem "pós-CPRE" (duplicava ERCP); "Scorpion" marcado como regional (Tityus trinitatis, Trinidad) | M | [ ] manter [ ] mudar |

## D. Pancreatite aguda — guia de estudo (`src/enfermidades/pancreatite-aguda.js`, rascunho)

| # | Mudança | Fonte | Decisão do dono |
|---|---|---|---|
| D1 | Atlanta: moderadamente grave inclui exacerbação de comorbidade; falência por Marshall modificado; classificação por determinantes | M | [ ] manter [ ] mudar |
| D2 | PCR em 48 h separada dos escores (corte usual 150 mg/L) | M | [ ] manter [ ] mudar |
| D3 | Imagem só se dor/enzimas duvidosas; evitar TC precoce | M | [ ] manter [ ] mudar |
| D4 | TGP >3× o limite sugere causa biliar; triglicerídeos >1.000 mg/dL | M | [ ] manter [ ] mudar |
| D5 | Álcool como 1ª causa em algumas regiões; fase precoce/tardia; necrose estéril→infectada | M | [ ] manter [ ] mudar |
| D6 | Dieta oral precoce; enteral por sonda nasogástrica/nasojejunal | V oral precoce; resto M | [ ] manter [ ] mudar |
| D7 | CPRE em até 24 h na colangite; sem colangite não há CPRE precoce | V (sem colangite); 24 h M | [ ] manter [ ] mudar |
| D8 | Colecistectomia: leve na mesma internação; grave/necrosante adiar ~6 semanas | M | [ ] manter [ ] mudar |
| D9 | Necrose infectada: abordagem escalonada após ~4 semanas | M | [ ] manter [ ] mudar |
| D10 | Complicações com terminologia de Atlanta (coleção líquida aguda, coleção necrótica aguda, necrose encapsulada) e hipertensão intra-abdominal | M | [ ] manter [ ] mudar |
| D11 | Mortalidade ~20-40% quando falência de órgão e necrose infectada se associam | M | [ ] manter [ ] mudar |
| D12 | Diferenciais: dissecção aórtica, pielonefrite/cólica renal | M | [ ] manter [ ] mudar |
| D13 | Caso 2: USG não exclui microlitíase; TGP e cálcio normais | M | [ ] manter [ ] mudar |
| D14 | Forma: "en faja" (igual ao guia), "interromper o consumo de álcool", AST/ALT no ES | forma | [ ] manter [ ] mudar |

## E. Colecistite — guia do motivo (`src/motivos/colecistite-colelitiase.js`)

| # | Mudança | Fonte | Decisão do dono |
|---|---|---|---|
| E1 | Colecistectomia "<72 h" → **até 7 dias da admissão e 10 dias dos sintomas (WSES 2020)** | V (resumo) | [ ] manter [ ] mudar |
| E2 | ASGE 2019: alto risco = cálculo à imagem, colangite clínica ou **bilirrubina >4 com via biliar dilatada**; intermediário = via dilatada isolada, enzimas alteradas ou >55 anos | V (resumos) | [ ] manter [ ] mudar |
| E3 | Murphy: "boa especificidade, sensibilidade moderada" (era "alta sensibilidade") | M | [ ] manter [ ] mudar |
| E4 | Grau III: suporte + drenagem; colecistectomia só em centro avançado e casos selecionados | V (TG18, resumo) | [ ] manter [ ] mudar |
| E5 | Dipirona retirada ("AINE; opioide se intensa") — dipirona não consta nas diretrizes e é restrita em vários países | M | [ ] manter [ ] mudar |

## F. Colecistite — guia de estudo (`src/enfermidades/colecistite-aguda.js`, rascunho)

| # | Mudança | Fonte | Decisão do dono |
|---|---|---|---|
| F1 | Refs: ASGE 2019 (Buxbaum) e TG18 antimicrobianos (Gomi) adicionadas; Yokoe deixou de ser citado para analgesia/antibiótico | V (existência) | [ ] manter [ ] mudar |
| F2 | Antibiótico estratificado: grau I curto/dispensável com cirurgia precoce; graus II/III ~4-7 dias após controle do foco; comunidade × hospital | parcial V; duração M | [ ] manter [ ] mudar |
| F3 | Caso 2: gabarito sem "antibiótico" como única resposta; comentário diz grau I | V | [ ] manter [ ] mudar |
| F4 | Prazo da cirurgia: WSES 2020 (7/10 dias); TG18: precoce nos graus I/II se CCI ≤5 e ASA-PS ≤2; senão ~6 semanas | V (resumo) | [ ] manter [ ] mudar |
| F5 | Grau III com critérios de disfunção de órgão (vasopressor, PaO2/FiO2 <300, creatinina >2, INR >1,5, plaquetas <100.000…); grau II = qualquer 1 critério | M | [ ] manter [ ] mudar |
| F6 | Colangite pelo TG18 (A inflamação, B colestase, C imagem; Charcot pouco sensível); drenagem urgente no grau III | M | [ ] manter [ ] mudar |
| F7 | Imagem: parede ≥4 mm, distensão, líquido, sombras lineares | V (TG18, resumo) | [ ] manter [ ] mudar |
| F8 | Colecistite acalculosa; colecistite enfisematosa; fatores de risco extras (cirrose, perda de peso, ACO); incidência de complicações 1-4%/ano | M | [ ] manter [ ] mudar |
| F9 | Dor >6 h: "em geral" (não é critério do TG18); Murphy isolado de sensibilidade moderada | M | [ ] manter [ ] mudar |
| F10 | ES: "mnemónico en inglés: las 5 F" (não funciona em espanhol) | forma | [ ] manter [ ] mudar |

## G. Sugestões dos revisores que **não apliquei** (e por quê)

| Item | Motivo | O que preciso |
|---|---|---|
| Sabiston sem edição/página (3 guias) | só o dono sabe qual edição usa | edição, capítulo e página |
| Parede da vesícula: guia do motivo diz >3 mm, TG18 diz ≥4 mm | o revisor pediu "decidir"; é escolha de qual fonte seguir | sua decisão |
| Janela de observação "Alvarado 5-6: 12-24 h" | sem fonte; o revisor não propôs substituto | sua decisão ou fonte |
| "Lapinsky" e "Lenander" (manobras da apendicite) | não consegui verificar | conferir no seu livro |
| Ligar Atlanta/Tóquio a refs por critério | o esquema atual só liga refs aos fármacos | decidir se ampliamos o esquema |
| Pergunta extra sobre analgesia/antibiótico no caso da apendicite | depende de ter doses com fonte | doses com referência |
| Prognóstico da colecistite "bom" | sem número verificado | fonte |
| Marcar `verificada: true` e publicar | só depois da sua conferência | conferência pelos livros |

> Todas as mudanças estão no histórico do git: qualquer item pode ser desfeito individualmente.
