# Mnemotécnicas ES — itens para validação clínica

Regra aplicada (pedido do dono): ao trocar de idioma, **só aparece o conteúdo daquele idioma**. Em ES não se mostra sigla do PT. Siglas **não foram inventadas**: onde não há sigla confirmada em espanhol, o ES mostra apenas o nome da mnemotécnica e marcadores "•" no lugar das letras.

Como o código trata isso (fonte em `src/motivos/*.js`, bloco `guideEs.mnemonics[].kw`):
- `"kw": "SIGLA"` — sigla mantida em ES (internacional/eponímica; ver tabela 1).
- `"kw": "Rótulo traduzido"` — o "kw" é um rótulo descritivo (não é sigla); traduzido (tabela 2).
- `"kw": ""` — sem sigla em ES; mostra só o nome e "•" nas linhas (tabela 3).
Para ativar uma sigla ES depois de validada: preencher `kw` no bloco `guideEs` do motivo e, se as letras das linhas forem diferentes das do PT, o 3º elemento de cada linha ES (letra). Depois: `node scripts/build.js`.

## 1. Siglas mantidas em ES — CONFIRMAR uso em espanhol

| Motivo | Sigla PT | Nome ES | Sigla ES |
|---|---|---|---|
| cefaleia | `SNOOP4` | Signos de alarma — cefalea secundaria | `SNOOP4` |
| colecistite-colelitiase | `5 F` | Factores de riesgo para colelitiasis | `5 F` |
| colecistite-colelitiase | `CHARCOT` | Tríada de la colangitis | `CHARCOT` |
| doenca-diverticular | `HINCHEY` | Clasificación de la diverticulitis complicada | `HINCHEY` |
| dor-toracica | `MONA` | Conducta inicial en el IAM/SCA | `MONA` |
| febre | `SIRS` | Respuesta Inflamatoria Sistémica | `SIRS` |
| hemorragia-digestiva-alta | `ABCDE` | Abordaje inicial del sangrado | `ABCDE` |
| pancreatite-aguda | `GET SMASHED` | Etiologías de la pancreatitis | `GET SMASHED` |
| pancreatite-aguda | `RANSON` | Criterios de Ranson (admisión) | `RANSON` |
| semio-dor | `ALICIA` | Caracterización semiológica del dolor | `ALICIA` |
| semio-dor | `OPQRST` | Esquema anglosajón del dolor | `OPQRST` |
| trauma-abdominal | `ABCDE` | Atención inicial al trauma (ATLS) | `ABCDE` |

Pontos de atenção:
- **ALICIA**: os termos ES começam por A-L-I-C-I-A (Aparición, Localización, Irradiación, Carácter, Intensidad, Atenuantes), mas confirmar se é a sigla usada na sua escola/região.
- **SIRS**: em espanhol é comum também "SRIS"; as letras das linhas (T/FC/FR/Leucocitos) não formam a sigla — em ES as que não coincidem aparecem como "•".
- **RANSON**, **GET SMASHED**, **5 F**, **SNOOP4**, **OPQRST**, **VINDICATE** são mnemônicos em inglês; confirmar se o ES deve manter a sigla inglesa ou ter equivalente próprio. (VINDICATE foi **ocultada** — ver tabela 3 — porque a versão do site difere da original em inglês.)
- **MONA**: em ES a linha "A" está como "AAS"; confirmar se prefere "ASA".
- **ABCDE** (HDA): no conteúdo atual "D=Drugs, E=Endoscopia" — não é o ABCDE do ATLS; confirmar o uso em ES.

## 2. Rótulos descritivos traduzidos (não são siglas) — revisar redação

| Motivo | Rótulo PT | Nome ES | Rótulo ES |
|---|---|---|---|
| artralgia | `CAUSAS DE MONOARTRITE` | Principales causas de monoartritis aguda | `CAUSAS DE MONOARTRITIS` |
| artralgia | `CAUSAS DE POLIARTRITE` | Causas de poliartritis | `CAUSAS DE POLIARTRITIS` |
| convulsao-sincope | `SÍNCOPE x CONVULSÃO` | Diferenciación entre síncope y crisis convulsiva | `SÍNCOPE x CONVULSIÓN` |
| convulsao-sincope | `CAUSAS DE SÍNCOPE` | Clasificación etiológica del síncope (cardíaco / reflejo / ortostático) | `CAUSAS DE SÍNCOPE` |
| doenca-diverticular | `LOCALIZAÇÃO` | Características de la diverticulitis | `LOCALIZACIÓN` |
| doencas-anorretais | `DOR x SANGUE` | Diferenciar las causas | `DOLOR x SANGRE` |
| dor-toracica | `6 EMERGÊNCIAS` | Causas que matan por dolor torácico | `6 EMERGENCIAS` |
| hemoptise | `Classificação por volume` | Hemoptisis — clasificación por volumen | `Clasificación por volumen` |
| hemoptise | `Causas por frequência` | Etiología de la hemoptisis | `Causas por frecuencia` |
| hemorragia-digestiva-alta | `VARIZ x NÃO-VARIZ` | Causas de HDA | `VARICEAL x NO VARICEAL` |
| hemorragia-digestiva-baixa | `ALTA x BAIXA` | Diferenciar el origen | `ALTA x BAJA` |
| hernia-abdominal | `LOCAIS` | Tipos por localización | `LOCALIZACIONES` |
| ictericia | `PRÉ / HEPÁTICA / PÓS` | Clasificación topográfica de la ictericia | `PRE / HEPÁTICA / POS` |
| oclusao-intestinal | `4 SINAIS` | Obstrucción intestinal | `4 SIGNOS` |
| semio-astenia | `ORGÂNICA x FUNCIONAL` | Patrón temporal de la fatiga | `ORGÁNICA x FUNCIONAL` |
| semio-cianose | `CENTRAL x PERIFÉRICA` | Tipos de cianosis | `CENTRAL x PERIFÉRICA` |
| semio-cianose | `5 g/dL` | Umbral de la cianosis | `5 g/dL` |
| semio-dor | `VISCERAL x SOMÁTICA` | Tipos de dolor | `VISCERAL x SOMÁTICA` |
| trauma-abdominal | `FECHADO x PENETRANTE` | Mecanismos de trauma | `CERRADO x PENETRANTE` |

(`VARICEAL x NO VARICEAL` e `CERRADO x PENETRANTE` são tradução minha do rótulo; confirmar terminologia preferida.)

## 3. Siglas do PT ocultadas em ES — precisam de decisão do dono

Em ES aparecem só o nome e "•" nas linhas. Se existir sigla ES consagrada, informe qual; se quiser criar uma, é decisão clínica/didática sua.

| Motivo | Sigla PT | Nome ES | Obs. |
|---|---|---|---|
| apendicite | `APENDICITE` | Características clínicas | —|
| apendicite | `MANTRELS` | Escala de Alvarado (10 puntos) | antes: `A. MAESTRO` (origem desconhecida, removida) |
| cefaleia | `POUNDIT` | Criterios de Migraña | —|
| colecistite-colelitiase | `COMPLICA` | Complicaciones de la litiasis biliar | —|
| diarreia | `DIARREIA` | Causas y mecanismos de la diarrea | —|
| dispneia | `PASTE` | Causas de disnea aguda | —|
| doencas-anorretais | `HEMORROIDA` | Clasificación de las hemorroides internas | —|
| dor-abdominal | `VINDICATE` | Causas de dolor abdominal | —|
| edema | `CHF-RAIN` | Causas de edema | —|
| expectoracao | `ESCARRO` | Tipos de esputo y significado clínico | —|
| febre | `IIDET` | Semiología de la fiebre | —|
| febre | `CRISOH` | Patrones de la curva febril | —|
| hemorragia-digestiva-baixa | `DRACO` | Causas de HDB | —|
| hernia-abdominal | `RICE` | Estados clínicos de la hernia | —|
| lombalgia | `TUNAFISH` | Signos de alarma (red flags) en la lumbalgia | —|
| nauseas-vomitos | `VOMITAR` | Causas de náuseas y vómitos | —|
| oclusao-intestinal | `ABC` | Causas más comunes en el adulto | —|
| palpitacoes | `PULSAR` | Causas de palpitaciones | —|
| perda-peso | `EMAGRECE` | Causas de pérdida de peso involuntaria | —|
| semio-astenia | `VITAMINAS-D` | Causas de astenia/fatiga | —|
| semio-dor | `LITIDIFES` | Caracterización semiológica del dolor (clínica) | —|
| sintomas-urinarios | `URINA` | Causas de disuria/síntomas urinarios | —|
| tontura-vertigem | `VERTIGEM` | Causas de mareo/vértigo | —|
| tosse | `FACTS` | Causas de tos crónica (>8 semanas) | —|
| semio-peso | `EMAGRECE` | Causas de pérdida de peso involuntaria | —|

Observações:
- Várias siglas PT são **palavras portuguesas** (APENDICITE, DIARREIA, VOMITAR, PULSAR, URINA, VERTIGEM, EMAGRECE, ESCARRO, DRACO, LITIDIFES, COMPLICA, VITAMINAS-D, HEMORROIDA) — não funcionam em ES.
- **MANTRELS** (Alvarado): sigla inglesa, mas as linhas ES têm outros termos/iniciais; havia `A. MAESTRO` no ES, de origem desconhecida (provável invenção anterior) — removida. Confirmar se quer MANTRELS em ES.
- **IIDET**, **CRISOH**, **PASTE**, **FACTS**, **CHF-RAIN**, **TUNAFISH**, **POUNDIT**, **RICE**, **ABC** (oclusão): origem/uso em ES não verificado — ocultas por precaução. As iniciais dos termos ES de IIDET e LITIDIFES coincidem com a sigla, mas isso não prova que seja usada em ES.

## 4. Outros textos ES alterados/traduzidos nesta rodada

- **Hemoptisis**: a 2ª mnemotécnica ("Causas por frecuencia — Etiología de la hemoptisis") não tinha tradução ES; traduzida. Revisar termos clínicos.
- **Hemoptisis / Expectoración** (tipos de esputo): linhas ES reestruturadas (rótulo + descrição) para não repetir o termo; revisar "Herrumbroso", "Numular" (termos mantidos como estavam).
- **Artralgia**: removidas as menções "Mnemónico GASA" e "Mnemónico SOAP-BRAIN" dos nomes ES (essas siglas PT/inglesas não foram validadas em ES). No PT permanecem.
- **Página Mnemotécnicas**: o conteúdo agora vem do mesmo `GUIDE_CONTENT`/`GUIDE_ES` do app (fonte única). Isso **substituiu** textos PT próprios da página (ex.: siglas GASA e SOAP-BRAIN em artralgia, "MANTRELS"/"PRÉ/HEPÁTICA/PÓS" com pequenas diferenças) pelo texto do guia de estudo. Conferir se o PT continua como deseja.
- Manobras/sinais: não foi feita revisão clínica do conteúdo ES existente (apenas exibição só no idioma ativo).

## 5. Fora do escopo desta rodada
- Siglas/mnemotécnicas fora de `guide*.mnemonics` (ex.: textos dentro de ddx/conduta/narrativa) não foram auditadas.
