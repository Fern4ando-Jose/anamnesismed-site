# Fontes médicas e especialidades — proposta para validação do dono

> **Status: PROPOSTA.** Elaborada de memória do conhecimento geral do assistente, **sem consulta ao texto de normas e sem dados atualizados**. Tudo marcado **[conferir]** deve ser verificado antes de virar regra. Edições de livros e versões de diretrizes mudam: o dono confirma a edição mais recente que usa.

## 1. Fontes médicas (livros, periódicos, diretrizes de sociedades)

Critério: o que médicos e pesquisadores realmente usam para decidir e estudar. Nada de sites genéricos ou páginas de divulgação.

### 1.1 Livros-texto (a base para o revisor e para o guia de enfermidade)

| Área | Referência | Uso |
|---|---|---|
| Medicina interna | **Harrison — Medicina Interna** (há edição em espanhol) · **Goldman-Cecil Medicine** · **Clínica Médica USP (Martins et al.)** · **Farreras-Rozman, Medicina Interna** (ES) | fisiopatologia, quadro clínico, diagnóstico, tratamento |
| Semiologia / exame físico | **Porto — Semiologia Médica** · **Bates — Propedêutica Médica** · **Semiologia Médica (Rozman/Surós, ES)** | anamnese, exame físico, sinais |
| Cirurgia | **Sabiston — Tratado de Cirurgia** · **Schwartz — Princípios de Cirurgia** · **Townsend** · **Tratado de Cirurgia do CBC (Brasil)** | enfermidades cirúrgicas |
| Pediatria | **Nelson — Tratado de Pediatria** · **Tratado de Pediatria da SBP** | pediatria |
| Gineco-obstetrícia | **Williams — Obstetrícia** · **Rezende — Obstetrícia** · **Berek & Novak — Ginecologia** · **Manuais da Febrasgo** | GO |
| Cardiologia | **Braunwald — Tratado de Doenças Cardiovasculares** · **Tratado de Cardiologia SOCESP** | cardio |
| Pneumologia | **Murray & Nadel** · **Tratado de Pneumologia (SBPT)** | respiratório |
| Neurologia | **Adams & Victor** · **Merritt** · **Tratado de Neurologia (Academia Brasileira de Neurologia)** | neuro |
| Endocrinologia | **Williams — Tratado de Endocrinologia** · **Tratado de Endocrinologia Clínica (SBEM)** | endócrino |
| Infectologia | **Mandell, Douglas e Bennett** · **Tratado de Infectologia (Veronesi-Focaccia)** | infecto |
| Farmacologia | **Goodman & Gilman** · **Katzung** | doses e mecanismos |
| Medicina de emergência | **Tintinalli** · **Rosen** | urgência |

### 1.2 Diretrizes de sociedades (padrão para conduta)

- **Brasil:** Diretrizes das sociedades de especialidade (SBC, SBD, SBEM, SBPT, SBP, Febrasgo, SBI, ABN, SBU, SBN, SBR e outras) · Projeto Diretrizes AMB/CFM · **PCDT do Ministério da Saúde / CONITEC**.
- **Internacionais de maior uso:** ESC e AHA/ACC (cardiologia) · ADA *Standards of Care* e KDIGO (diabetes e nefro) · GOLD e GINA (DPOC e asma) · IDSA e *Surviving Sepsis Campaign* (infecto e sepse) · ACOG e FIGO (obstetrícia) · diretrizes da OMS.
- **Espanha/América Latina:** diretrizes da SEC, SEEN, SEMI, SEPAR e equivalentes locais **[conferir quais o dono considera referência]**.

### 1.3 Periódicos (para evidência recente e revisões)

*NEJM*, *The Lancet*, *JAMA*, *BMJ*, *Annals of Internal Medicine*, **Cochrane Database of Systematic Reviews**, e revistas das sociedades: *Arquivos Brasileiros de Cardiologia*, *Jornal Brasileiro de Pneumologia*, *Revista da Associação Médica Brasileira*, *Revista de Saúde Pública*.

### 1.4 Ferramentas clínicas de uso corrente
Citadas como **apoio de consulta**, não como fonte a indexar: **UpToDate**, **DynaMed**, **BMJ Best Practice**. São licenciadas e proíbem reutilização; servem para o revisor conferir, não para alimentar a base.

### 1.5 Um ponto que precisa de decisão
As fontes acima são as **mais usadas por médicos**. Mas a fase 1 da IA foi definida como **abertas e gratuitas** (`docs/pesquisa/base-conhecimento-rag-patente.md`). Os livros-texto e muitas diretrizes **não podem ser copiados para a base de busca da IA** sem licença da editora ou da sociedade. Por isso proponho dois papéis:

| Papel | Fontes | Como entra |
|---|---|---|
| **Referência de conferência** (revisão humana, citação como "ver em…") | livros, diretrizes, periódicos acima | o guia **cita** capítulo/diretriz/ano; o texto é escrito por nós, sem cópia |
| **Base indexável da IA (fase 1)** | só o que tem licença aberta (PMC uso comercial, SciELO, MedlinePlus) + o que for autorizado por escrito | RAG com citação |

Assim o conteúdo do app cita as fontes que o médico reconhece, sem violar direitos autorais.

---

## 2. Especialidades

### 2.1 Decisão de perfil
**Residente conta como Médico** (decisão do dono, aplicada em `docs/MAPA.md`). Preços e limites do plano ficam para depois da ferramenta pronta.

### 2.2 Lista completa das especialidades médicas reconhecidas no Brasil
Reconhecidas pelo CFM/AMB/CNRM, em torno de 55 **[conferir na resolução vigente do CFM]**. Coluna "Anamnese" = a especialidade tem entrevista clínica em que o app ajuda (Sim / Parcial / Não):

| Especialidade | Anamnese | Especialidade | Anamnese |
|---|---|---|---|
| Acupuntura | Sim | Medicina de Tráfego | Parcial |
| Alergia e Imunologia | Sim | Medicina do Trabalho | Sim |
| Anestesiologia | Parcial (pré-anestésica) | Medicina Esportiva | Sim |
| Angiologia | Sim | Medicina Física e Reabilitação | Sim |
| Cancerologia (Oncologia Clínica) | Sim | Medicina Intensiva | Parcial |
| Cardiologia | Sim | Medicina Legal e Perícia Médica | Parcial |
| Cirurgia Cardiovascular | Sim | Medicina Nuclear | Não |
| Cirurgia da Mão | Sim | Medicina Preventiva e Social | Sim |
| Cirurgia de Cabeça e Pescoço | Sim | Nefrologia | Sim |
| Cirurgia do Aparelho Digestivo | Sim | Neurocirurgia | Sim |
| Cirurgia Geral | Sim | Neurologia | Sim |
| Cirurgia Oncológica | Sim | Nutrologia | Sim |
| Cirurgia Pediátrica | Sim | Oftalmologia | Sim |
| Cirurgia Plástica | Sim | Ortopedia e Traumatologia | Sim |
| Cirurgia Torácica | Sim | Otorrinolaringologia | Sim |
| Cirurgia Vascular | Sim | Patologia | Não |
| Clínica Médica | Sim | Patologia Clínica / Medicina Laboratorial | Não |
| Coloproctologia | Sim | Pediatria | Sim |
| Dermatologia | Sim | Pneumologia | Sim |
| Endocrinologia e Metabologia | Sim | Psiquiatria | Sim |
| Endoscopia | Parcial | Radiologia e Diagnóstico por Imagem | Não |
| Gastroenterologia | Sim | Radioterapia | Parcial |
| Genética Médica | Sim | Reumatologia | Sim |
| Geriatria | Sim | Urologia | Sim |
| Ginecologia e Obstetrícia | Sim | Homeopatia | Sim |
| Hematologia e Hemoterapia | Sim | Mastologia | Sim |
| Infectologia | Sim | Medicina de Emergência | Sim |
| Medicina de Família e Comunidade | Sim | | |

### 2.3 Bases curriculares (o que o estudante precisa dominar)
As Diretrizes Curriculares Nacionais de Medicina e o internato organizam a formação nestas grandes áreas **[conferir: Resolução CNE/CES nº 3/2014 e Lei 12.871/2013]**:

1. **Clínica Médica** (inclui as subespecialidades clínicas: cardio, pneumo, endócrino, nefro, gastro, infecto, hemato, reumato, neuro)
2. **Cirurgia** (Cirurgia Geral e trauma)
3. **Pediatria**
4. **Ginecologia e Obstetrícia**
5. **Saúde Coletiva / Medicina de Família e Comunidade** (atenção básica)
6. **Urgência e Emergência**
7. **Saúde Mental** (Psiquiatria)

Na residência, **Clínica Médica, Cirurgia Geral, Pediatria e Ginecologia-Obstetrícia** são as bases de acesso direto/pré-requisito de muitas outras **[conferir lista na CNRM]**.

### 2.4 Mais pacientes (maior volume de atendimento)
**Hipótese a verificar, não dado.** Na atenção primária e no SUS, o maior volume costuma estar em: hipertensão e diabetes, queixas respiratórias, saúde mental (ansiedade e depressão), dor musculoesquelética e lombalgia, saúde da criança, saúde da mulher e pré-natal, infecções comuns e doenças tropicais (dengue). **[conferir]** com: PNS/IBGE, DATASUS (produção ambulatorial), *Global Burden of Disease* e a *Demografia Médica no Brasil* (CFM) — para o Brasil; fontes equivalentes dos ministérios de saúde de cada país de língua espanhola.

### 2.5 Proposta de prioridade (cruza base curricular e volume)

| Onda | Especialidades | Critério |
|---|---|---|
| **Existentes (completar)** | Clínica, Cirurgia, Respiratório, Semiologia | já no app |
| **1ª onda** | **Cardiologia, Endocrinologia, Neurologia, Infectologia, Gineco-Obstetrícia, Pediatria** | base curricular **e** alto volume |
| **2ª onda** | Medicina de Família e Comunidade, Psiquiatria, Gastroenterologia/Hepatologia, Nefrologia/Urologia, Reumatologia/Ortopedia, Urgência e Emergência | volume alto e/ou internato |
| **3ª onda** | Dermatologia, Hematologia, Geriatria, Oncologia, Oftalmologia, Otorrinolaringologia, demais | demanda de usuários |
| **Fora do escopo do app** | Patologia, Radiologia, Medicina Nuclear, Patologia Clínica | sem anamnese |

## 3. A conferir antes de fechar
- [ ] Dono confirma as edições/diretrizes que usa e quais entram como referência obrigatória
- [ ] Conferir o número e a lista de especialidades na resolução vigente do CFM
- [ ] Conferir DCN, internato e pré-requisitos da residência
- [ ] Levantar dados reais de volume (DATASUS, PNS, CFM) para sustentar a 2.4
- [ ] Definir lista de fontes por idioma: ES com referências de Espanha/América Latina
- [ ] Decidir o modelo de "citação sem cópia" do §1.5 com o dono
