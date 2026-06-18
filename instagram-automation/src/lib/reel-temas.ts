// ─── Banco de temas PRÓPRIO do REEL (não compartilha com o carrossel) ──────────
// Estratégia 2026-06-18 (decisão do dono): reel é o motor de ALCANCE do Instagram;
// carrossel é profundidade. Então o reel tem conteúdo NATIVO de reel — hook-first,
// curto (10-20s), feito para parar o scroll, gerar SALVAMENTO, COMENTÁRIO e SHARE —
// e NÃO um clone do carrossel. 3 formatos de alto engajamento p/ estudante (4º ano+):
//   • curiosidade — "você sabia" / fato clínico que surpreende  → alcance + share
//   • mnemonico   — bizu relâmpago de alto rendimento            → salvamentos
//   • pegadinha   — o erro/pega de prova que reprova todo mundo  → comentários
// Conteúdo gerado POR MERCADO (PT/ES), nunca traduzido: o seed é o assunto+ângulo;
// o prompt (buildReelPrompt) escreve o gancho na voz de cada mercado.

export type ReelFormato = "curiosidade" | "mnemonico" | "pegadinha";

export interface ReelTema {
  id: number;        // posição canônica (informativa)
  esp: string;       // especialidade (rótulo/watermark + acento de footage)
  formato: ReelFormato;
  pt: string;        // assunto/seed em PT (o prompt vira gancho de reel)
  es: string;        // assunto/seed em ES (LATAM)
  subject: string;   // metáfora visual (EN) — p/ tratamento visual futuro
}

// ── CURIOSIDADE — fato clínico que surpreende ("você sabia?") ──
const CURIOSIDADES: ReelTema[] = [
  { id: 100, esp: "GASTRO", formato: "curiosidade", pt: "Sinal de Courvoisier: vesícula palpável, indolor e com icterícia raramente é cálculo — pensa em câncer de cabeça de pâncreas.", es: "Signo de Courvoisier: vesícula palpable, indolora y con ictericia rara vez es cálculo — piensa en cáncer de cabeza de páncreas.", subject: "a dim anatomical gallbladder glowing faintly beside the pancreas head" },
  { id: 101, esp: "CARDIOLOGIA", formato: "curiosidade", pt: "Pulso paradoxal (queda >10 mmHg da PAS na inspiração) pode ser o 1º sinal de tamponamento cardíaco.", es: "Pulso paradójico (caída >10 mmHg de la PAS en inspiración) puede ser el 1.er signo de taponamiento cardíaco.", subject: "a heart silhouette compressed by a faint surrounding ring of fluid" },
  { id: 102, esp: "NEUROLOGIA", formato: "curiosidade", pt: "Anisocoria fisiológica existe em ~20% das pessoas — nem toda pupila diferente é herniação.", es: "La anisocoria fisiológica existe en ~20% de las personas — no toda pupila diferente es herniación.", subject: "two eyes in profile with subtly different pupil sizes under soft light" },
  { id: 103, esp: "PNEUMOLOGIA", formato: "curiosidade", pt: "Baqueteamento digital não é só pulmão: aparece em cardiopatia cianótica, DII e cirrose também.", es: "El hipocratismo digital no es solo pulmón: aparece en cardiopatía cianótica, EII y cirrosis también.", subject: "a close anatomical study of clubbed fingertips against dark background" },
  { id: 104, esp: "INFECTOLOGIA", formato: "curiosidade", pt: "Sinal de Faget (febre alta com bradicardia relativa) aponta febre tifoide, febre amarela e Legionella.", es: "Signo de Faget (fiebre alta con bradicardia relativa) apunta a fiebre tifoidea, fiebre amarilla y Legionella.", subject: "a thermometer rising high beside a slow faint pulse line" },
  { id: 105, esp: "ENDOCRINOLOGIA", formato: "curiosidade", pt: "Acantose nigricans no pescoço é pista de resistência insulínica — às vezes antes da glicemia alterar.", es: "La acantosis nigricans en el cuello es pista de resistencia a la insulina — a veces antes de que altere la glucemia.", subject: "a velvety dark patch on a neck skin study under clinical light" },
  { id: 106, esp: "NEFROLOGIA", formato: "curiosidade", pt: "Urina cor de Coca-Cola após faringite = pensa em GNPE; após exercício intenso = rabdomiólise.", es: "Orina color Coca-Cola tras faringitis = piensa en GNPE; tras ejercicio intenso = rabdomiólisis.", subject: "a sample vial holding dark cola-colored fluid against a pale chart" },
  { id: 107, esp: "REUMATOLOGIA", formato: "curiosidade", pt: "Fenômeno de Raynaud que começa depois dos 40 anos acende alerta de doença do tecido conjuntivo.", es: "El fenómeno de Raynaud que inicia después de los 40 años enciende alerta de enfermedad del tejido conjuntivo.", subject: "fingertips shifting from pale to bluish in cold tones" },
];

// ── MNEMÔNICO — bizu relâmpago de alto rendimento (salvável) ──
const MNEMONICOS: ReelTema[] = [
  { id: 120, esp: "NEUROLOGIA", formato: "mnemonico", pt: "FAST — reconhecer AVC em segundos: Face, Arm, Speech, Time. Cada minuto é neurônio.", es: "FAST — reconocer un ACV en segundos: Face, Arm, Speech, Time. Cada minuto es neurona.", subject: "a clock face merging with a brain silhouette, one half dimming" },
  { id: 121, esp: "PNEUMOLOGIA", formato: "mnemonico", pt: "Critérios de Wells para TEP — estratificar a probabilidade antes de pedir o D-dímero.", es: "Criterios de Wells para TEP — estratificar la probabilidad antes de pedir el dímero D.", subject: "a lung silhouette with a faint blocked vessel branch" },
  { id: 122, esp: "PNEUMOLOGIA", formato: "mnemonico", pt: "CURB-65 — gravidade da pneumonia e onde tratar (casa, enfermaria ou UTI).", es: "CURB-65 — gravedad de la neumonía y dónde tratar (casa, sala o UCI).", subject: "a chest x-ray glow with five small rising bars" },
  { id: 123, esp: "CARDIOLOGIA", formato: "mnemonico", pt: "CHA₂DS₂-VASc — decidir anticoagular ou não na fibrilação atrial. Ponto a ponto.", es: "CHA₂DS₂-VASc — decidir anticoagular o no en la fibrilación auricular. Punto por punto.", subject: "an irregular ECG line over a faint scoring grid" },
  { id: 124, esp: "INFECTOLOGIA", formato: "mnemonico", pt: "qSOFA — sepse à beira do leito em 3 itens: FR≥22, PAS≤100, alteração do estado mental.", es: "qSOFA — sepsis a la cabecera en 3 ítems: FR≥22, PAS≤100, alteración del estado mental.", subject: "three minimal vital-sign icons aligned over a dark ward" },
  { id: 125, esp: "PNEUMOLOGIA", formato: "mnemonico", pt: "Critérios de Light — exsudato vs transudato no derrame pleural. O que pedir e como ler.", es: "Criterios de Light — exudado vs trasudado en el derrame pleural. Qué pedir y cómo leerlo.", subject: "a pleural fluid level inside a lung outline under soft light" },
  { id: 126, esp: "EMERGÊNCIA", formato: "mnemonico", pt: "Os 5 H e 5 T — causas reversíveis de parada cardiorrespiratória. Não morra sem checar.", es: "Las 5 H y 5 T — causas reversibles de paro cardiorrespiratorio. No mueras sin revisarlas.", subject: "a flatline with ten faint checkboxes beside it" },
  { id: 127, esp: "NEUROLOGIA", formato: "mnemonico", pt: "Escala de Glasgow — os 3 componentes (ocular, verbal, motor) e o erro de somar errado.", es: "Escala de Glasgow — los 3 componentes (ocular, verbal, motor) y el error de sumar mal.", subject: "a head silhouette with three small dials lighting in sequence" },
];

// ── PEGADINHA — o erro/pega de prova que reprova todo mundo ──
const PEGADINHAS: ReelTema[] = [
  { id: 140, esp: "NEFROLOGIA", formato: "pegadinha", pt: "Hipercalemia no ECG: a onda T apiculada vem ANTES do alargamento do QRS — e gluconato de cálcio protege o coração, não baixa o K.", es: "Hipercalemia en el ECG: la onda T picuda viene ANTES del ensanchamiento del QRS — y el gluconato de calcio protege el corazón, no baja el K.", subject: "an ECG strip with a sharply peaked T wave glowing red" },
  { id: 141, esp: "ENDOCRINOLOGIA", formato: "pegadinha", pt: "Na cetoacidose diabética, reponha potássio mesmo com K sérico normal/alto — a insulina vai derrubá-lo.", es: "En la cetoacidosis diabética, repón potasio aunque el K sérico esté normal/alto — la insulina lo va a desplomar.", subject: "an insulin vial beside a falling potassium-level arrow" },
  { id: 142, esp: "NEFROLOGIA", formato: "pegadinha", pt: "Hiponatremia: corrigir o sódio rápido demais = mielinólise pontina. O limite que ninguém pode furar.", es: "Hiponatremia: corregir el sodio demasiado rápido = mielinólisis pontina. El límite que nadie puede romper.", subject: "a brainstem cross-section with a faint central pale zone" },
  { id: 143, esp: "CARDIOLOGIA", formato: "pegadinha", pt: "Sopro que AUMENTA com Valsalva: pensa em cardiomiopatia hipertrófica, não em estenose aórtica.", es: "Soplo que AUMENTA con Valsalva: piensa en miocardiopatía hipertrófica, no en estenosis aórtica.", subject: "a thickened heart wall with a turbulent flow arrow" },
  { id: 144, esp: "CARDIOLOGIA", formato: "pegadinha", pt: "Supra de ST em V1-V2 nem sempre é IAM anterior — padrão tipo 1 de Brugada engana na prova.", es: "Supradesnivel del ST en V1-V2 no siempre es IAM anterior — el patrón tipo 1 de Brugada engaña en el examen.", subject: "a single ECG lead with a coved ST segment in V1" },
  { id: 145, esp: "CLÍNICA", formato: "pegadinha", pt: "Anemia microcítica nem sempre é ferropriva — talassemia tem RDW normal e ferritina normal/alta.", es: "Anemia microcítica no siempre es ferropénica — la talasemia tiene RDW normal y ferritina normal/alta.", subject: "small uniform red blood cells lined up under a microscope glow" },
  { id: 146, esp: "NEUROLOGIA", formato: "pegadinha", pt: "Vertigem: nistagmo que muda de direção com o olhar = central (perigoso), não labirintite.", es: "Vértigo: nistagmo que cambia de dirección con la mirada = central (peligroso), no laberintitis.", subject: "an eye with motion arrows pointing both directions" },
  { id: 147, esp: "CLÍNICA", formato: "pegadinha", pt: "TP/INR alargado isolado aponta via extrínseca (fator VII, varfarina) — não é efeito de heparina.", es: "TP/INR alargado aislado apunta a la vía extrínseca (factor VII, warfarina) — no es efecto de la heparina.", subject: "a coagulation cascade diagram with one branch lit" },
];

// Banco final do reel — ordem fixa (curiosidade → mnemônico → pegadinha).
export const REEL_TEMAS: ReelTema[] = [...CURIOSIDADES, ...MNEMONICOS, ...PEGADINHAS];

// Rótulo de capa por formato (PT/ES) — usado no badge do reel.
export const REEL_ROTULO: Record<"pt" | "es", Record<ReelFormato, string>> = {
  pt: { curiosidade: "VOCÊ SABIA?", mnemonico: "BIZU", pegadinha: "PEGA DE PROVA" },
  es: { curiosidade: "¿SABÍAS?", mnemonico: "TRUCO", pegadinha: "TRAMPA DE EXAMEN" },
};
