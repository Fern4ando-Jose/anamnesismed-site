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

// Camada estruturada por formato — derivada dos arrays acima (alinhados por índice).
export interface Tema {
  id: number;          // posição canônica (índice nos 3 arrays)
  esp: string;         // especialidade (rótulo/watermark da capa)
  formato: Formato;
  pt: string;          // enunciado do caso em PT (pronto p/ o prompt)
  es: string;          // enunciado do caso em ES
  subject: string;     // metáfora visual da capa (EN, p/ a ilustração)
}

export const TEMAS: Tema[] = TOPICS_BY_LANG.pt.map((pt, i) => ({
  id: i,
  esp: CASE_SYS[i] ?? "",
  formato: "caso-diagnostico",
  pt,
  es: TOPICS_BY_LANG.es[i] ?? pt,
  subject: SUBJECTS[i] ?? "",
}));
