# Base de conhecimento aberta, RAG e patenteabilidade (anamnese + apoio diagnóstico)

Data: 2026-10-01. Pesquisa de orientação geral; licenças mudam, **confirmar cada termo na fonte antes de indexar**.
Itens marcados "(não verificado)" não foram confirmados em fonte primária nesta pesquisa.

## 1. Fontes e licenças

Regra prática: RAG com citação exibe trechos ao usuário, ou seja, é reprodução parcial. Licenças **NC** (não comercial) e **ND** (sem derivações) são o principal risco se o app for comercial. Em dúvida, linkar e citar em vez de armazenar o texto, ou pedir autorização por escrito.

| Fonte | Licença / termo | Indexar em RAG (app comercial)? | Formato / acesso |
|---|---|---|---|
| Ministério da Saúde: PCDT, Conitec | PCDTs/publicações MS costumam trazer CC BY-NC-SA 4.0; o Portal de Dados Abertos do SUS cita CC BY-ND 3.0 (as duas aparecem nos resultados; conferir por documento) | Risco: NC e ND. Obter parecer/autorização do MS; alternativa: indexar só metadados + link | PDF; datasets em dadosabertos.saude.gov.br; BVS-MS (bvsms.saude.gov.br) |
| SBC, SBP, SBPT, AMB Projeto Diretrizes | Sociedades privadas, em geral copyright reservado; licença varia por diretriz (não verificado) | Presumir NÃO sem autorização escrita. Muitas diretrizes SBC saem em Arq Bras Cardiol (SciELO, ver abaixo) | PDF / HTML |
| OMS | Publicações sob CC BY-NC-SA 3.0 IGO desde 2016 | NC: uso comercial exige permissão da OMS. Adaptações precisam manter a mesma licença | PDF; IRIS (iris.who.int) |
| NICE (UK) | NICE UK Open Content Licence; uso para IA **não coberto**: proíbe treinar/ajustar LLM e exige pedido via Syndication API para IA | RAG só com aplicação aprovada; treino proibido | Syndication API (chave sob aprovação) |
| PubMed (abstracts) | Metadados/abstracts: direitos permanecem com editores; NLM permite uso do dado, mas não concede direitos autorais | Usar para busca/links; reproduzir abstract longo exige cautela | E-utilities (API gratuita, limite de taxa, chave NCBI) |
| PMC Open Access | Só o **Commercial Use Collection** (CC BY / CC0) é liberado para uso comercial; o Non-Commercial Collection não | SIM, usando só o subset comercial, com atribuição por artigo | AWS Open Data, FTP, OAI, BioC (download em massa só por esses canais) |
| StatPearls | CC BY-NC-ND 4.0 (Bookshelf) | NÃO em produto comercial (NC + ND). Só linkar; ou licenciar com o StatPearls | Bookshelf/NCBI; texto no site |
| MedlinePlus | Conteúdo NLM em domínio público; há material de terceiros com copyright (rotulado) | SIM para o conteúdo NLM; filtrar o de terceiros. Atenção: EN/ES, não PT | Web Service e XML gratuitos, sem registro; MedlinePlus Connect |
| Cochrane | Abstracts/resumos para leigos visíveis; reutilização de dados exige aceitar termos (cochranelibrary.com/data); texto completo é pago/copyright | Só linkar; abstracts apenas com termos aceitos (não verificado em detalhe) | Cochrane Library, via PubMed |
| SciELO | SciELO Brasil adota CC BY desde 2015 (periódicos novos); anteriores variam por revista | SIM com atribuição, checando licença do artigo | OAI-PMH, ArticleMeta API, SciELO Data |
| GuíaSalud (ES) | Obra sob Creative Commons (variante exata por guia: verificar) | Depende da variante (NC/ND?) | PDF, catálogo web |
| Fisterra | Conteúdo editorial comercial (Elsevier); licença de reuso não encontrada | Presumir NÃO | Web |
| MSAL Argentina, SEMI (ES) | Não verificado | Pedir autorização / checar termos de cada guia | PDF |

Fontes: https://pmc.ncbi.nlm.nih.gov/tools/textmining/ · https://www.nice.org.uk/reusing-our-content/nice-uk-open-content-licence · https://www.nice.org.uk/reusing-our-content/nice-syndication-api · https://medlineplus.gov/about/using/usingcontent/ · https://medlineplus.gov/medlineplus-connect/web-service/ · https://www.who.int/about/policies/publishing/copyright · https://www.cochranelibrary.com/data · https://www.scielo.org/en/about-scielo/open-access-statement/ · https://dadosabertos.saude.gov.br/dataset?tags=Conitec · https://www.fisterra.com/guias-clinicas/guiasalud-guias-practica-clinica-sistema-nacional-salud/ · StatPearls: https://www.ncbi.nlm.nih.gov/sites/books/NBK564394/

### Recomendação de curadoria (fase 1)
1. Núcleo seguro: PMC Commercial Use, SciELO (CC BY), MedlinePlus (NLM), dados do MS que tenham licença confirmada.
2. Fontes "link + citação curta, sem armazenar texto": StatPearls, Cochrane, Fisterra, UpToDate-like.
3. Pedir licença formal: MS/Conitec (esclarecer NC/ND para app comercial), SBC/SBP/SBPT/AMB, OMS, NICE (Syndication API).
4. Se o app for gratuito e sem fins lucrativos, parte das restrições NC muda, mas pode não bastar (monetização futura, parceria com clínicas). Decidir com advogado.
5. Registrar por documento: URL, licença, data de acesso, versão, hash. Isso vira a "tabela de procedência" auditável.

## 2. Arquitetura RAG (Vercel + Supabase + Claude API)

Pipeline:
- **Ingestão** (job agendado, Supabase Edge Function ou worker externo; o Vercel tem limite de tempo): baixar -> extrair texto (PDF com layout; OCR só se necessário) -> normalizar -> chunkar -> embedding -> gravar.
- **Tabelas**: `sources` (id, nome, licença, URL, data, idioma, tipo de evidência, `reuse_ok` bool), `documents` (versão, data de publicação, hash), `chunks` (texto, seção, página, embedding `vector(N)`, tsvector, metadados).
- **Chunking**: respeitar a estrutura (títulos, tabelas de recomendação); 300-600 tokens com 10-15% de sobreposição; guardar título da seção e "caminho" (guia > capítulo > recomendação). Manter grau de recomendação/nível de evidência como metadado. Tabelas e posologias em chunk próprio, sem quebrar.
- **Embeddings multilíngues PT/ES/EN**: opções: `multilingual-e5` / BGE-M3 (abertos, auto-hospedáveis); Cohere embed-multilingual; OpenAI text-embedding-3; Voyage multilingual (a Anthropic recomenda a Voyage AI para embeddings; ver docs). Testar em amostra PT/ES antes de escolher. Dimensão alta pesa em armazenamento; pgvector aceita índice HNSW até 2000 dims (vetor) e mais com halfvec.
- **Busca híbrida**: pgvector (HNSW, cosseno) + full-text Postgres (`tsvector` com config `portuguese`/`spanish`) e fusão por RRF; depois reranking (cross-encoder ou Cohere Rerank / Claude como reranker para top-20). Filtrar por idioma, data, `reuse_ok` e tipo de fonte.
- **RLS**: tabelas de conhecimento somente leitura para o app via função RPC; dados de pacientes em outro schema, com RLS estrita. **Nunca enviar dados identificáveis ao índice**; minimizar PII ao chamar a API do Claude (LGPD: dado de saúde é sensível, base legal, DPA com fornecedores, RIPD).
- **Geração com citação**: usar o recurso de citações da API do Claude (documentos como blocos `document` com `citations` habilitado) ou instruir resposta com IDs de chunk `[S3]` e validar no servidor que cada ID existe e que o trecho sustenta a afirmação. Resposta exibe: fonte, ano, trecho, link, nível de evidência. Prompt cache para o system prompt fixo.
- **Guarda-corpos**: saída como "hipóteses diferenciais para o profissional", nunca diagnóstico; sinais de alarme/urgência com regras determinísticas (não só LLM); recusar quando a recuperação for fraca ("não encontrei base suficiente"); log de consulta, chunks e versão do modelo para auditoria.
- **Atualização**: reingestão periódica (por fonte: semanal/mensal), versionamento, marcar guias substituídas ou retiradas (data de vigência).
- **Avaliação**: conjunto-ouro com 100-300 perguntas/vinhetas clínicas em PT/ES revisadas por médicos; métricas de recuperação (recall@k, MRR, nDCG), fidelidade/groundedness (cada afirmação suportada pelo trecho), precisão da citação, taxa de recusa correta, segurança (casos de urgência). Ferramentas: Ragas, DeepEval, ou LLM-juiz com amostragem humana. Rodar em CI a cada mudança de chunking/modelo/prompt. Referência de qualidade: HealthBench, MedQA (para o modelo, não substituem validação clínica).

## 3. Caminho para IA própria

- **RAG primeiro e por muito tempo.** Vantagens: conhecimento atualizável sem retreinar, citação rastreável, controle de licenças por documento (dá para remover uma fonte). Fine-tuning não "memoriza" bem fatos e dificulta atribuição e remoção.
- **Fine-tuning útil para**: formato/tom (anamnese estruturada, perguntas de acompanhamento), extração de entidades, classificação de triagem, robustez em PT/ES. Pouco útil para injetar conhecimento factual novo.
- **Dados necessários**: (a) corpus licenciado para treino (licença de **treino** é distinta de licença de leitura/reuso; muitas CC-NC e NICE proíbem); (b) pares instrução-resposta anotados por médicos; (c) casos clínicos sintéticos validados; (d) dados reais de anamnese só com consentimento específico, anonimização e base legal LGPD.
- **Modelos abertos de base** (Llama, Qwen, Mistral, Gemma, modelos médicos abertos): checar a licença do modelo (restrições de uso/MAU). Treino com LoRA/QLoRA custa muito menos que treino completo. Pré-treino próprio é inviável para startup.
- **Livros**: livros-texto (Harrison, Goldman-Cecil, Nelson etc.) são protegidos; treinar ou indexar exige **licença expressa de treino/IA** da editora. Algumas editoras (Elsevier, Wiley, Springer) vendem licenças de dados para IA; a questão de "uso justo" para treino é judicialmente controversa e o Brasil não tem fair use amplo (LDA 9.610/98 tem rol fechado de limitações; o PL de regulação de IA em tramitação prevê regras sobre mineração de dados, conferir estado atual). Preferir acordos formais.
- **Regulatório**: software que sugere diagnóstico pode ser SaMD; verificar enquadramento na ANVISA (RDC 657/2022 e RDC 751/2022, a confirmar) e, se houver, requisitos de CFM sobre IA na medicina. Validação clínica prospectiva antes de qualquer afirmação de desempenho.

## 4. Patenteabilidade (orientação geral; NÃO é aconselhamento jurídico, consulte advogado/agente de PI)

- **Base legal**: Lei 9.279/96 (LPI). Art. 10 exclui "programas de computador em si", métodos matemáticos e métodos terapêuticos/cirúrgicos/de diagnóstico aplicados ao corpo humano (art. 10, VIII e IX; art. 10, V: programas de computador em si; confirmar numeração). Software é protegido por **direito autoral** (Lei 9.609/98), registrável no INPI (registro de programa de computador, barato e rápido, não é patente).
- **Diretrizes do INPI** para invenções implementadas por computador: patenteável se resolve um **problema técnico** e produz **efeito técnico** que não seja mera consequência de rodar o programa nem da forma como o código foi escrito, além de novidade, atividade inventiva e aplicação industrial. Exemplos de efeito técnico citados: otimização de tempo de execução, memória, acesso a banco de dados, transmissão de dados, interface não meramente estética. Ver Portaria INPI/DIRPA nº 16/2024 e as Diretrizes IIC.
- **Aplicação ao projeto**: provável alvo de exclusão: "usar IA para sugerir diagnóstico a partir de anamnese" (método de diagnóstico + método matemático/negócio). Mais promissor: **arquitetura técnica específica** (por exemplo, método de indexação/recuperação que melhora precisão/latência de forma mensurável, pipeline de verificação de citações que reduz alucinação, compressão/estruturação de dados clínicos), descrita com efeito técnico demonstrado, não como "regra clínica". Resultados práticos ainda são incertos e examinadores costumam exigir contexto de hardware/processo.
- **Cuidados**: (1) **não divulgue** a invenção (site, demo pública, artigo, pitch) antes do depósito: o Brasil tem período de graça de 12 meses (art. 12 LPI), mas a maioria dos outros países não; (2) estado da técnica de RAG médico é amplo (novidade/atividade inventiva difíceis); (3) PCT/exterior (EUA tem Alice/§101, Europa exige "efeito técnico adicional") tem critérios diferentes; (4) custos e prazo longos (exame no INPI leva vários anos); (5) segredo industrial, marca e direito autoral podem proteger melhor o ativo (prompts, dados curados, base anotada, marca, UX).
- **Próximos passos**: busca de anterioridade (INPI, Espacenet, Google Patents), reunião com agente de PI para triagem, registro do software no INPI, contratos com cláusula de titularidade (contratados/ colaboradores), e registro da marca.

Fontes: https://www.gov.br/inpi/pt-br/servicos/patentes/consultas-publicas/arquivos/2020_11_16___diretrizes_iic___versao_final.pdf · https://www.gov.br/inpi/pt-br/central-de-conteudo/legislacao/arquivos/documentos/portaria-inpi-dirpa-no-16.pdf/@@download/file · https://lrilaw.com.br/2021/03/03/patentes-de-invencao-implementadas-em-computador/ · https://ids.org.br/inpi-estabelece-novas-diretrizes-de-exame-para-patentes-de-inovacoes-implementadas-por-programa-de-computador/

## Lacunas a fechar
- Licença exata por documento: MS/Conitec, SBC/SBP/SBPT/AMB, GuíaSalud, MSAL Argentina, SEMI, Fisterra, termos de reuso de abstracts Cochrane.
- Numeração de artigos da LPI, RDCs da ANVISA e situação do PL de IA: confirmar com jurista.
