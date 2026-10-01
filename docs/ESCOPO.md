# AnamnesisMed — Escopo do produto

> Versão 1 · definida com o dono do produto (estudante de medicina, 4º ano). Base para o mapa de trabalho (`docs/MAPA.md`).

## 1. O que é

Guia para **histórias clínicas (HC) completas**, com apoio de IA, para dois públicos. Bilíngue PT-BR / ES.

| | **Plano Médico** | **Plano Estudante** |
|---|---|---|
| HC | **Enxuta**: só o que se usa na prática no Brasil e países de língua espanhola, no formato real de prontuário | **Extensa e didática**: todos os itens que se ensinam na semiologia |
| Foco | Rapidez, objetividade, exportação (PDF) | Aprendizado, raciocínio explicado, mnemônicas |
| Guias de enfermidade | Consulta rápida | Guia de estudo completa + revisão + casos |
| IA | Hipótese + exames + conduta, direto | Mesma análise com o **raciocínio explicado** |

## 2. Funcionalidades centrais

1. **HC guiada** por motivo de consulta (AEA, RAS, antecedentes, exame físico), com narrativa gerada.
2. **Fechamento da HC**: possível diagnóstico (diferenciais), **plano de exames** e **plano terapêutico**.
3. **Guia por enfermidade**, dentro de cada especialidade: definição, fisiopatologia, quadro clínico, diagnóstico, exames, tratamento, referências (resumo do que há nos principais livros), para revisão e estudo.
4. **Estudos de caso** por enfermidade, para o estudante.

## 3. Princípios inegociáveis

- **Apoio à decisão, nunca substituição.** Toda sugestão de diagnóstico ou conduta é apoio; a decisão é do médico. Aviso visível na tela, no PDF e nos termos.
- **Fontes citadas.** Conteúdo e respostas da IA apontam a fonte (diretriz, livro, artigo).
- **Fontes abertas e recentes** na fase 1; livros e guias licenciados entram depois.
- **Segurança do paciente e LGPD**: dados sensíveis tratados com minimização; sem identificação desnecessária.
- **Revisão de conteúdo**: o dono revisa pelos seus livros; os agentes de revisão confrontam com **fontes confiáveis** e apontam divergências.

## 4. IA — fases

| Fase | O quê |
|---|---|
| **1 (agora)** | Claude API + dados já existentes em `src/` como base; evolui para **RAG** (busca em base de diretrizes abertas, resposta com citação) |
| **2** | Base ampliada com livros e guias (mediante licença); avaliação sistemática de qualidade |
| **3 (futuro, com usuários)** | IA própria treinada/ajustada com o acervo e os dados de uso (anonimizados e com consentimento). Avaliar proteção de propriedade intelectual (consultar advogado de PI) |

## 5. Especialidades

Entram aos poucos, começando pelas mais usuais. Hoje: clínica, cirurgia, respiratório, semiologia. A lista priorizada vem do levantamento em `docs/auditoria/04-conteudo.md` (cardio, neuro, endócrino, nefro, gineco-obstetrícia, pediatria, infecto, psiquiatria etc.).

## 6. Fora do escopo (por ora)

Prescrição eletrônica com validade legal, integração com prontuário de hospital, treino de modelo próprio, aplicativo nativo.

## 7. Definição de "100%" (fase atual)

- [ ] Dois planos funcionando (cobrança, limites, HC diferenciada por perfil)
- [ ] HC do médico em formato real de prontuário BR/ES; HC do estudante extensa
- [ ] HC termina em hipóteses + exames + conduta, com avisos e fontes
- [ ] Guia de enfermidade + caso clínico nas especialidades prioritárias
- [ ] Conteúdo revisado contra fontes confiáveis, com referência por item
- [ ] Testes automatizados verdes + checklist de QA por funcionalidade
- [ ] Termos, privacidade e avisos alinhados ao uso como apoio à decisão
