// ─── Banco de temas do Instagram — FONTE ÚNICA ────────────────────────────────
// Antes os temas viviam hardcoded em /api/publish/route.ts. Agora a origem é
// ESTE arquivo (reestruturação 2026-06-18). Os 3 arrays abaixo (TOPICS_BY_LANG,
// SUBJECTS, CASE_SYS) seguem alinhados por ÍNDICE — mexeu num caso, ajuste as 3
// listas na mesma posição — e o /api/publish os consome por import.
//
// Camada estruturada (TEMAS) classifica cada item por ESPECIALIDADE e FORMATO.
// Hoje todos são "caso-diagnostico". Para o MIX de formatos (mnemônico, red-flag,
// passo-a-passo, score), adicione os novos arrays por formato e roteie no prompt.

export type Lang = "pt" | "es";
export type Formato = "caso-diagnostico" | "mnemonico" | "red-flag" | "passo-a-passo" | "score";

// ─── Casos clínicos — formato "Qual o diagnóstico?" ───────────────────────────
// Cada item é um CASO (apresentação + diagnóstico oculto). O prompt monta um
// carrossel interativo que SÓ revela o diagnóstico no último slide e na legenda.
// PT e ES compartilham o mesmo índice → mesmo caso, mesma imagem de capa (SUBJECTS)
// e mesma etiqueta de especialidade (CASE_SYS). Mexeu num caso? Ajuste as 3 listas
// na MESMA posição. Idioma definido por POST_LANG (ou ?lang=es para teste).

export const TOPICS_BY_LANG: Record<Lang, string[]> = {
  pt: [
    "Homem de 60 anos com dor torácica opressiva irradiando para a mandíbula, sudorese fria e náusea. (Diagnóstico, revelar só no slide final: infarto agudo do miocárdio.)",
    "Mulher de 30 anos com dispneia súbita e dor pleurítica após voo longo, taquicardia e SpO2 baixa. (Diagnóstico, revelar só no fim: tromboembolismo pulmonar.)",
    "Homem de 22 anos com cefaleia súbita 'a pior da vida' e rigidez de nuca. (Diagnóstico, revelar só no fim: hemorragia subaracnóidea.)",
    "Homem de 72 anos com dor abdominal súbita intensa e abdome em tábua. (Diagnóstico, revelar só no fim: úlcera péptica perfurada, abdome agudo perfurativo.)",
    "Mulher de 24 anos com poliúria, polidipsia, perda de peso e hálito cetônico. (Diagnóstico, revelar só no fim: cetoacidose diabética.)",
    "Homem de 58 anos com icterícia indolor, perda de peso e vesícula palpável (sinal de Courvoisier). (Diagnóstico, revelar só no fim: câncer de cabeça de pâncreas.)",
    "Criança de 5 anos com febre há 5 dias, conjuntivite, língua em framboesa e descamação das mãos. (Diagnóstico, revelar só no fim: doença de Kawasaki.)",
    "Mulher de 38 anos com palpitações, perda de peso, tremor e exoftalmia. (Diagnóstico, revelar só no fim: hipertireoidismo, doença de Graves.)",
    "Homem de 55 anos tabagista com claudicação intermitente, pé frio e pulsos distais ausentes. (Diagnóstico, revelar só no fim: doença arterial periférica.)",
    "Homem de 80 anos com confusão mental aguda e flutuante e disúria. (Diagnóstico, revelar só no fim: delirium secundário a infecção urinária.)",
    "Mulher de 26 anos com dor periumbilical que migrou para a fossa ilíaca direita, com Blumberg e febre baixa. (Diagnóstico, revelar só no fim: apendicite aguda.)",
    "Homem de 50 anos etilista com hematêmese volumosa e ascite. (Diagnóstico, revelar só no fim: hemorragia por varizes esofágicas.)",
    "Atleta de 19 anos com síncope durante esforço e sopro sistólico que aumenta com a manobra de Valsalva. (Diagnóstico, revelar só no fim: cardiomiopatia hipertrófica.)",
    "Mulher de 65 anos com dispneia aos esforços, ortopneia e edema de membros inferiores. (Diagnóstico, revelar só no fim: insuficiência cardíaca.)",
    "Homem de 28 anos com lombalgia noturna e rigidez matinal por mais de 1 hora que melhora com exercício. (Diagnóstico, revelar só no fim: espondilite anquilosante.)",
    "Lactente não vacinado com crises de tosse paroxística seguidas de guincho inspiratório. (Diagnóstico, revelar só no fim: coqueluche.)",
    "Mulher de 27 anos com fadiga, artralgia e rash malar fotossensível. (Diagnóstico, revelar só no fim: lúpus eritematoso sistêmico.)",
    "Homem de 67 anos com tremor de repouso assimétrico, bradicinesia e rigidez em roda denteada. (Diagnóstico, revelar só no fim: doença de Parkinson.)",
    "Homem de 45 anos com dor epigástrica, melena e uso crônico de anti-inflamatórios. (Diagnóstico, revelar só no fim: úlcera péptica sangrante.)",
    "Homem de 40 anos usuário de drogas injetáveis com febre, sopro cardíaco novo e lesões de Janeway. (Diagnóstico, revelar só no fim: endocardite infecciosa.)",
    "Mulher de 70 anos com cefaleia temporal, claudicação de mandíbula e VHS muito elevado. (Diagnóstico, revelar só no fim: arterite de células gigantes, temporal.)",
  ],
  es: [
    "Hombre de 60 años con dolor torácico opresivo irradiado a la mandíbula, sudoración fría y náuseas. (Diagnóstico, revelar solo en la última diapositiva: infarto agudo de miocardio.)",
    "Mujer de 30 años con disnea súbita y dolor pleurítico tras un vuelo largo, taquicardia y SpO2 baja. (Diagnóstico, revelar solo al final: tromboembolismo pulmonar.)",
    "Hombre de 22 años con cefalea súbita 'la peor de su vida' y rigidez de nuca. (Diagnóstico, revelar solo al final: hemorragia subaracnoidea.)",
    "Hombre de 72 años con dolor abdominal súbito intenso y abdomen en tabla. (Diagnóstico, revelar solo al final: úlcera péptica perforada, abdomen agudo perforativo.)",
    "Mujer de 24 años con poliuria, polidipsia, pérdida de peso y aliento cetónico. (Diagnóstico, revelar solo al final: cetoacidosis diabética.)",
    "Hombre de 58 años con ictericia indolora, pérdida de peso y vesícula palpable (signo de Courvoisier). (Diagnóstico, revelar solo al final: cáncer de cabeza de páncreas.)",
    "Niño de 5 años con fiebre de 5 días, conjuntivitis, lengua en fresa y descamación de manos. (Diagnóstico, revelar solo al final: enfermedad de Kawasaki.)",
    "Mujer de 38 años con palpitaciones, pérdida de peso, temblor y exoftalmos. (Diagnóstico, revelar solo al final: hipertiroidismo, enfermedad de Graves.)",
    "Hombre de 55 años fumador con claudicación intermitente, pie frío y pulsos distales ausentes. (Diagnóstico, revelar solo al final: enfermedad arterial periférica.)",
    "Hombre de 80 años con confusión aguda fluctuante y disuria. (Diagnóstico, revelar solo al final: delirium secundario a infección urinaria.)",
    "Mujer de 26 años con dolor periumbilical que migró a la fosa ilíaca derecha, con Blumberg y febrícula. (Diagnóstico, revelar solo al final: apendicitis aguda.)",
    "Hombre de 50 años alcohólico con hematemesis abundante y ascitis. (Diagnóstico, revelar solo al final: hemorragia por varices esofágicas.)",
    "Atleta de 19 años con síncope de esfuerzo y soplo sistólico que aumenta con la maniobra de Valsalva. (Diagnóstico, revelar solo al final: miocardiopatía hipertrófica.)",
    "Mujer de 65 años con disnea de esfuerzo, ortopnea y edema de miembros inferiores. (Diagnóstico, revelar solo al final: insuficiencia cardíaca.)",
    "Hombre de 28 años con lumbalgia nocturna y rigidez matinal de más de 1 hora que mejora con el ejercicio. (Diagnóstico, revelar solo al final: espondilitis anquilosante.)",
    "Lactante no vacunado con accesos de tos paroxística seguidos de gallo inspiratorio. (Diagnóstico, revelar solo al final: tos ferina.)",
    "Mujer de 27 años con fatiga, artralgia y rash malar fotosensible. (Diagnóstico, revelar solo al final: lupus eritematoso sistémico.)",
    "Hombre de 67 años con temblor de reposo asimétrico, bradicinesia y rigidez en rueda dentada. (Diagnóstico, revelar solo al final: enfermedad de Parkinson.)",
    "Hombre de 45 años con dolor epigástrico, melena y uso crónico de antiinflamatorios. (Diagnóstico, revelar solo al final: úlcera péptica sangrante.)",
    "Hombre de 40 años usuario de drogas inyectables con fiebre, soplo nuevo y lesiones de Janeway. (Diagnóstico, revelar solo al final: endocarditis infecciosa.)",
    "Mujer de 70 años con cefalea temporal, claudicación mandibular y VSG muy elevada. (Diagnóstico, revelar solo al final: arteritis de células gigantes, temporal.)",
  ],
};

// ─── Metáfora visual da capa por caso (alinhada por ÍNDICE) ────────────────────
// Subjects em inglês (Flux responde melhor). Atmosféricas e metafóricas: sugerem
// o sistema/cena, mas NÃO entregam o diagnóstico (é "Qual o diagnóstico?").
export const SUBJECTS: string[] = [
  "a sculptural anatomical heart model on a dark surface beside a single jagged ECG tracing",
  "a glass anatomical model of the lungs with one bronchial branch abruptly clouded and blocked",
  "a cracked classical marble bust of a head with a sudden lightning fissure across the skull",
  "an antique anatomical chart of the abdomen on aged paper with a stark red mark over the stomach",
  "a still life of a water glass, a draining hourglass and faint sugar crystals with a sweet vapor",
  "a dim still life of an anatomical torso model turning amber with a shadowed pancreas highlighted",
  "a child's empty bed with a thermometer and a single small red origami crane, tender",
  "an antique pocket watch spinning fast beside a butterfly-shaped thyroid silhouette, restless",
  "a cold dim corridor with a single boot beside a narrowing pipe losing its flow",
  "an elderly portrait painting dissolving into drifting fog and scattered clock hands",
  "an antique abdominal anatomy chart with a single glowing red point at the lower right",
  "a cracked dark wine vessel overflowing beside a shadowed anatomical liver model",
  "an empty stadium track at dusk with a single fallen medal and a thick-walled heart model",
  "an anatomical heart model half submerged in slowly rising dark water, heavy",
  "an anatomical spine model gradually fusing into a rigid bamboo stalk in dawn light",
  "a small empty crib with trembling lines in the air and a single fragile feather",
  "a porcelain mask with a butterfly-shaped crack across the cheeks under soft sunlight",
  "a still life of bronze sculpted hands caught mid-tremor, motion frozen into stillness",
  "an anatomical stomach model with a single smoldering ember glowing inside and a dark drop",
  "an anatomical heart-valve model with delicate growths and tiny embers drifting nearby",
  "a classical marble head in profile with one temple artery glowing inflamed red",
];

// ─── Etiqueta de especialidade por caso (capa: rótulo + watermark) ─────────────
// Alinhada por índice. Usada como "kw" (rótulo vermelho + watermark de 3 letras).
export const CASE_SYS: string[] = [
  "CARDIOLOGIA", "PNEUMOLOGIA", "NEUROLOGIA", "CIRURGIA", "ENDOCRINOLOGIA",
  "ONCOLOGIA", "PEDIATRIA", "ENDOCRINOLOGIA", "VASCULAR", "GERIATRIA",
  "CIRURGIA", "GASTRO", "CARDIOLOGIA", "CARDIOLOGIA", "REUMATOLOGIA",
  "INFECTOLOGIA", "REUMATOLOGIA", "NEUROLOGIA", "GASTRO", "INFECTOLOGIA",
  "REUMATOLOGIA",
];

// Camada estruturada por formato.
// Público-alvo de TODOS os temas: estudante de medicina do 4º ano em diante
// (ciclo clínico, internato, prova de residência) — PT e ES.
export interface Tema {
  id: number;          // posição canônica (informativa)
  esp: string;         // especialidade (rótulo/watermark da capa)
  formato: Formato;
  pt: string;          // enunciado/seed do tema em PT (o prompt expande)
  es: string;          // enunciado/seed em ES
  subject: string;     // metáfora visual da capa (EN, p/ a ilustração)
}

// Casos "Qual o diagnóstico?" — derivados dos 3 arrays acima (alinhados por índice).
const CASOS: Tema[] = TOPICS_BY_LANG.pt.map((pt, i) => ({
  id: i,
  esp: CASE_SYS[i] ?? "",
  formato: "caso-diagnostico" as Formato,
  pt,
  es: TOPICS_BY_LANG.es[i] ?? pt,
  subject: SUBJECTS[i] ?? "",
}));

// ── MNEMÔNICOS — ensina 1 mnemônico de alto rendimento e quando aplicar ──
const MNEMONICOS: Tema[] = [
  { id: 21, esp: "NEUROLOGIA", formato: "mnemonico", pt: "Mnemônico SNNOOP10 — as red flags da cefaleia que obrigam neuroimagem. Ensine a regra e quando aplicar.", es: "Mnemotecnia SNNOOP10 — las red flags de la cefalea que obligan a neuroimagen. Enseña la regla y cuándo aplicarla.", subject: "a classical marble head in profile with a single warning beacon glowing at the temple" },
  { id: 22, esp: "NEFROLOGIA", formato: "mnemonico", pt: "Mnemônico MUDPILES — causas de acidose metabólica com ânion gap aumentado. Ensine e exemplifique.", es: "Mnemotecnia MUDPILES — causas de acidosis metabólica con anión gap elevado. Enseña y ejemplifica.", subject: "a chemistry flask with a tilted pH strip and faint acidic vapor over a dark anatomy chart" },
  { id: 23, esp: "EMERGÊNCIA", formato: "mnemonico", pt: "Mnemônico ABCDE — avaliação primária no trauma, em ordem de prioridade. Ensine cada etapa.", es: "Mnemotecnia ABCDE — evaluación primaria en el trauma, en orden de prioridad. Enseña cada paso.", subject: "five carved stone steps ascending out of shadow, each lit in sequence" },
  { id: 24, esp: "VASCULAR", formato: "mnemonico", pt: "Mnemônico dos 6 P — isquemia arterial aguda do membro. Ensine os sinais e a urgência.", es: "Mnemotecnia de las 6 P — isquemia arterial aguda del miembro. Enseña los signos y la urgencia.", subject: "a cold pale anatomical leg model beside a narrowing pipe losing its glow" },
  { id: 25, esp: "INFECTOLOGIA", formato: "mnemonico", pt: "Critérios de Centor/McIsaac — probabilidade de faringite estreptocócica. Ensine a pontuar e decidir.", es: "Criterios de Centor/McIsaac — probabilidad de faringitis estreptocócica. Enseña a puntuar y decidir.", subject: "an anatomical throat model with inflamed tonsils highlighted under a soft examination light" },
  { id: 26, esp: "TOXICOLOGIA", formato: "mnemonico", pt: "Mnemônico SLUDGE/DUMBELS — síndrome colinérgica (intoxicação por organofosforados). Ensine os sinais.", es: "Mnemotecnia SLUDGE/DUMBELS — síndrome colinérgico (intoxicación por organofosforados). Enseña los signos.", subject: "a still life of an overturned bottle and a dim anatomical nervous-system chart" },
  { id: 27, esp: "EMERGÊNCIA", formato: "mnemonico", pt: "Mnemônico SAMPLE — anamnese rápida e dirigida na emergência. Ensine cada item.", es: "Mnemotecnia SAMPLE — anamnesis rápida y dirigida en urgencias. Enseña cada ítem.", subject: "an open vintage medical notebook with ruled lines under a stethoscope" },
  { id: 28, esp: "CLÍNICA", formato: "mnemonico", pt: "Mnemônico VINDICATE — organizar o diagnóstico diferencial por categorias de causa. Ensine a usar.", es: "Mnemotecnia VINDICATE — organizar el diagnóstico diferencial por categorías de causa. Enseña a usarla.", subject: "a branching tree of glowing diagnostic paths emerging from a single anatomical silhouette" },
];

// ── RED FLAGS — sinais de alarme que mudam a conduta ──
const RED_FLAGS: Tema[] = [
  { id: 29, esp: "ORTOPEDIA", formato: "red-flag", pt: "Lombalgia: as red flags de causa grave (cauda equina, fratura, infecção, neoplasia). Quando investigar.", es: "Lumbalgia: las red flags de causa grave (cola de caballo, fractura, infección, neoplasia). Cuándo investigar.", subject: "an anatomical lumbar spine model with one vertebra glowing warning red" },
  { id: 30, esp: "NEUROLOGIA", formato: "red-flag", pt: "Cefaleia: os sinais que apontam cefaleia secundária perigosa. O que não pode passar.", es: "Cefalea: los signos que apuntan a cefalea secundaria peligrosa. Lo que no puede pasar.", subject: "a cracked marble head with a faint red fissure spreading from within" },
  { id: 31, esp: "CARDIOLOGIA", formato: "red-flag", pt: "Dor torácica: o que NÃO pode passar (SCA, TEP, dissecção de aorta, pneumotórax). Sinais de alarme.", es: "Dolor torácico: lo que NO puede pasar (SCA, TEP, disección de aorta, neumotórax). Signos de alarma.", subject: "an anatomical heart model on a dark table beside a single sharp warning light" },
  { id: 32, esp: "CARDIOLOGIA", formato: "red-flag", pt: "Síncope de alto risco: as bandeiras vermelhas que pedem investigação cardíaca urgente.", es: "Síncope de alto riesgo: las banderas rojas que exigen investigación cardíaca urgente.", subject: "an empty chair tipped slightly with a faint fading pulse line across the dark" },
  { id: 33, esp: "INFECTOLOGIA", formato: "red-flag", pt: "Febre no paciente neutropênico: por que é emergência e os sinais que não podem esperar.", es: "Fiebre en el paciente neutropénico: por qué es una emergencia y los signos que no pueden esperar.", subject: "a single thermometer rising red beside a dim depleted blood-cell motif" },
  { id: 34, esp: "CIRURGIA", formato: "red-flag", pt: "Dor abdominal: os sinais de abdome agudo cirúrgico que exigem avaliação imediata.", es: "Dolor abdominal: los signos de abdomen agudo quirúrgico que exigen evaluación inmediata.", subject: "an antique abdominal anatomy chart with a rigid board-like shadow across it" },
  { id: 35, esp: "PEDIATRIA", formato: "red-flag", pt: "Icterícia neonatal: os sinais de alarme que separam o fisiológico do patológico.", es: "Ictericia neonatal: los signos de alarma que separan lo fisiológico de lo patológico.", subject: "a small empty crib bathed in warm amber light, tender and quiet" },
  { id: 36, esp: "PNEUMOLOGIA", formato: "red-flag", pt: "Dispneia: os sinais de insuficiência respiratória iminente que mudam a conduta agora.", es: "Disnea: los signos de insuficiencia respiratoria inminente que cambian la conducta ahora.", subject: "a glass lung model clouding over as its glow dims" },
];

// ── PASSO A PASSO — fluxo prático e escaneável ──
const PASSOS: Tema[] = [
  { id: 37, esp: "PNEUMOLOGIA", formato: "passo-a-passo", pt: "Interpretar a gasometria arterial em 5 passos. Mostre o fluxo, do pH ao distúrbio misto.", es: "Interpretar la gasometría arterial en 5 pasos. Muestra el flujo, del pH al trastorno mixto.", subject: "a row of five glowing vials in sequence over a faint acid-base curve" },
  { id: 38, esp: "CARDIOLOGIA", formato: "passo-a-passo", pt: "Leitura sistemática do ECG em 8 passos. Mostre a ordem para não pular nada.", es: "Lectura sistemática del ECG en 8 pasos. Muestra el orden para no saltarte nada.", subject: "a long ECG tracing unrolling across a dark surface in measured segments" },
  { id: 39, esp: "EMERGÊNCIA", formato: "passo-a-passo", pt: "Sepse: o bundle da 1ª hora, passo a passo. Mostre o que fazer e em que ordem.", es: "Sepsis: el bundle de la 1ª hora, paso a paso. Muestra qué hacer y en qué orden.", subject: "an hourglass with red sand beside an anatomical torso lit by a single clock" },
  { id: 40, esp: "NEUROLOGIA", formato: "passo-a-passo", pt: "Exame neurológico focado à beira-leito, passo a passo. Mostre a sequência essencial.", es: "Examen neurológico focalizado a pie de cama, paso a paso. Muestra la secuencia esencial.", subject: "an anatomical brain model with focused beams mapping distinct regions" },
  { id: 41, esp: "RADIOLOGIA", formato: "passo-a-passo", pt: "Interpretar o Rx de tórax de forma sistemática. Mostre o roteiro (ABCDE radiológico).", es: "Interpretar la Rx de tórax de forma sistemática. Muestra la ruta (ABCDE radiológico).", subject: "a vintage chest radiograph illuminated on a dark viewing box, a faint systematic grid" },
  { id: 42, esp: "ENDOCRINOLOGIA", formato: "passo-a-passo", pt: "Conduta inicial na cetoacidose diabética, passo a passo (fluidos, insulina, potássio).", es: "Conducta inicial en la cetoacidosis diabética, paso a paso (fluidos, insulina, potasio).", subject: "a water glass, a vial and a draining hourglass in a calm clinical still life" },
  { id: 43, esp: "NEFROLOGIA", formato: "passo-a-passo", pt: "Abordagem da hiponatremia em passos (volemia, osmolaridade, velocidade de correção).", es: "Abordaje de la hiponatremia en pasos (volemia, osmolaridad, velocidad de corrección).", subject: "a balance scale weighing salt crystals against a drop of water in dim light" },
  { id: 44, esp: "CARDIOLOGIA", formato: "passo-a-passo", pt: "Parada cardiorrespiratória: a conduta do ACLS por ritmo, passo a passo.", es: "Paro cardiorrespiratorio: la conducta del ACLS por ritmo, paso a paso.", subject: "an anatomical heart model with a rhythmic pulse line and a single restart spark" },
];

// ── SCORES / ESCALAS — calcular e interpretar ──
const SCORES: Tema[] = [
  { id: 45, esp: "NEUROLOGIA", formato: "score", pt: "Escala de Glasgow: como pontuar (ocular, verbal, motora) e o que cada faixa significa.", es: "Escala de Glasgow: cómo puntuar (ocular, verbal, motora) y qué significa cada rango.", subject: "a marble head with three faint dials of light at eyes, lips and hand" },
  { id: 46, esp: "PNEUMOLOGIA", formato: "score", pt: "Score de Wells para TEP: quando aplicar, como pontuar e interpretar a probabilidade.", es: "Score de Wells para TEP: cuándo aplicar, cómo puntuar e interpretar la probabilidad.", subject: "a glass lung model with a clouded branch beside a small tilted scoring abacus" },
  { id: 47, esp: "PNEUMOLOGIA", formato: "score", pt: "CURB-65: gravidade da pneumonia adquirida na comunidade e onde tratar o paciente.", es: "CURB-65: gravedad de la neumonía adquirida en la comunidad y dónde tratar al paciente.", subject: "an anatomical lung model with five small counters arranged below it" },
  { id: 48, esp: "INFECTOLOGIA", formato: "score", pt: "qSOFA: triagem rápida de sepse à beira-leito. Os 3 critérios e o que fazer ao pontuar.", es: "qSOFA: cribado rápido de sepsis a pie de cama. Los 3 criterios y qué hacer al puntuar.", subject: "three small warning lights aligned over a dim anatomical torso" },
  { id: 49, esp: "GASTRO", formato: "score", pt: "Child-Pugh: gravidade da cirrose. Os parâmetros, as classes A/B/C e o que mudam.", es: "Child-Pugh: gravedad de la cirrosis. Los parámetros, las clases A/B/C y qué cambian.", subject: "a shadowed anatomical liver model graded by three rising bands of light" },
  { id: 50, esp: "CIRURGIA", formato: "score", pt: "Escala de Alvarado: probabilidade de apendicite aguda. Como pontuar e decidir conduta.", es: "Escala de Alvarado: probabilidad de apendicitis aguda. Cómo puntuar y decidir conducta.", subject: "an antique abdominal chart with a glowing point at the lower right and small tally marks" },
  { id: 51, esp: "CARDIOLOGIA", formato: "score", pt: "CHA2DS2-VASc: risco de AVC na fibrilação atrial e a decisão de anticoagular.", es: "CHA2DS2-VASc: riesgo de ACV en la fibrilación auricular y la decisión de anticoagular.", subject: "an anatomical heart model with an irregular pulse line and a small abacus of risk beads" },
  { id: 52, esp: "NEUROLOGIA", formato: "score", pt: "NIHSS: como avaliar a gravidade do AVC e por que o tempo importa.", es: "NIHSS: cómo evaluar la gravedad del ACV y por qué el tiempo importa.", subject: "a marble head in profile with a faint asymmetric shadow and a measuring scale" },
];

// Banco completo — fonte única consumida pelo /api/publish.
export const TEMAS: Tema[] = [...CASOS, ...MNEMONICOS, ...RED_FLAGS, ...PASSOS, ...SCORES];
