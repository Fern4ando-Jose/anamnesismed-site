// ─── Banco de temas PRÓPRIO do REEL (não compartilha com o carrossel) ──────────
// Estratégia (decisão do dono, reforçada 2026-06-18): REEL = SÓ VÍDEO REAL.
// Carrossel animado virado reel NÃO funciona. Por isso o reel só tem temas
// FILMÁVEIS (exame físico / manobra / procedimento de beira de leito): o vídeo real
// do banco (Pexels) CASA com a ação ensinada. Temas abstratos (mnemônico, critério,
// curiosidade) NÃO entram no reel — ficam no carrossel. Conteúdo gerado POR MERCADO
// (PT/ES), nunca traduzido: o seed é a técnica+ângulo; o prompt escreve o gancho.

// Os 4 formatos seguem tipados (mapas em route.ts dependem deles), mas o reel só
// USA "tecnica" — os outros 3 existem como rótulo/estrutura herdada, sem temas.
export type ReelFormato = "curiosidade" | "mnemonico" | "pegadinha" | "tecnica";

export type ReelVisual = "footage" | "typografia";
// Reel é SEMPRE footage (vídeo real). Mantido como mapa por compatibilidade.
export const FORMATO_VISUAL: Record<ReelFormato, ReelVisual> = {
  curiosidade: "footage",
  mnemonico: "footage",
  pegadinha: "footage",
  tecnica: "footage",
};

export interface ReelTema {
  id: number;        // posição canônica (informativa)
  esp: string;       // especialidade (rótulo/watermark + acento de footage)
  formato: ReelFormato;
  pt: string;        // assunto/seed em PT (o prompt vira gancho de reel)
  es: string;        // assunto/seed em ES (LATAM)
  subject: string;   // metáfora visual (EN) — referência
  footage: string[]; // queries Pexels da AÇÃO (1 por cena: capa + 3 linhas + cta = 5)
}

// ── TÉCNICA / BEIRA DE LEITO — tudo FILMÁVEL, com vídeo real que casa com a ação ──
// footage[] = ações que o acervo grátis (Pexels) TEM de verdade (medir PA, auscultar,
// puncionar, lavar as mãos, RCP, ultrassom…). Gancho "como fazer / o erro ao fazer".
const TECNICAS: ReelTema[] = [
  { id: 160, esp: "CARDIOLOGIA", formato: "tecnica", pt: "Como medir a pressão arterial sem errar: posição, manguito e os erros que inflam o número.", es: "Cómo medir la presión arterial sin errar: posición, manguito y los errores que inflan el número.", subject: "clinician taking blood pressure with a cuff", footage: ["nurse measuring blood pressure", "blood pressure cuff arm", "sphygmomanometer reading", "patient seated arm supported", "doctor checking blood pressure"] },
  { id: 161, esp: "CARDIOLOGIA", formato: "tecnica", pt: "Ausculta cardíaca: os 4 focos e onde encostar o estetoscópio em cada um.", es: "Auscultación cardíaca: los 4 focos y dónde apoyar el estetoscopio en cada uno.", subject: "stethoscope on a chest at the cardiac foci", footage: ["doctor stethoscope chest", "cardiac auscultation", "listening heart stethoscope", "physician examining chest", "stethoscope close up"] },
  { id: 162, esp: "GASTRO", formato: "tecnica", pt: "Palpação abdominal: a ordem certa dos 4 quadrantes e por que começar longe da dor.", es: "Palpación abdominal: el orden correcto de los 4 cuadrantes y por qué empezar lejos del dolor.", subject: "hands palpating an abdomen during exam", footage: ["doctor palpating abdomen", "abdominal physical examination", "physician examining patient stomach", "hands on patient abdomen", "clinical abdominal exam"] },
  { id: 163, esp: "NEUROLOGIA", formato: "tecnica", pt: "Reflexo patelar: como posicionar a perna e percutir pra não dar falso negativo.", es: "Reflejo patelar: cómo posicionar la pierna y percutir para no dar falso negativo.", subject: "reflex hammer striking the patellar tendon", footage: ["reflex hammer knee", "neurological exam reflex", "doctor testing knee reflex", "patient leg examination", "tendon reflex test"] },
  { id: 164, esp: "EMERGÊNCIA", formato: "tecnica", pt: "RCP de qualidade: profundidade, ritmo (100-120/min) e o erro de parar as compressões.", es: "RCP de calidad: profundidad, ritmo (100-120/min) y el error de parar las compresiones.", subject: "hands performing chest compressions in CPR", footage: ["cpr chest compressions", "cpr training dummy", "resuscitation hands chest", "emergency cpr", "first aid compressions"] },
  { id: 165, esp: "INFECTOLOGIA", formato: "tecnica", pt: "Higienização das mãos: os 5 momentos e os pontos que todo mundo esquece de esfregar.", es: "Higiene de manos: los 5 momentos y los puntos que todos olvidan frotar.", subject: "hands being washed with soap in a sink", footage: ["hand washing hospital", "surgical hand scrub", "doctor washing hands", "hand sanitizer hospital", "hand hygiene closeup"] },
  { id: 166, esp: "CLÍNICA", formato: "tecnica", pt: "Punção venosa: escolha da veia, ângulo da agulha e como evitar o hematoma.", es: "Punción venosa: elección de la vena, ángulo de la aguja y cómo evitar el hematoma.", subject: "venipuncture being performed on a forearm", footage: ["venipuncture blood draw", "nurse drawing blood", "phlebotomy needle vein", "blood sample collection", "drawing blood arm"] },
  { id: 167, esp: "PNEUMOLOGIA", formato: "tecnica", pt: "Ausculta pulmonar: a sequência em zigue-zague e onde pegam os estertores.", es: "Auscultación pulmonar: la secuencia en zigzag y dónde se captan los estertores.", subject: "stethoscope on the back auscultating lungs", footage: ["lung auscultation back", "doctor stethoscope back", "respiratory examination", "listening to lungs", "physician examining breathing"] },
  { id: 168, esp: "OTORRINO", formato: "tecnica", pt: "Otoscopia: como segurar o otoscópio, tracionar o pavilhão e ver a membrana timpânica.", es: "Otoscopia: cómo sostener el otoscopio, traccionar el pabellón y ver la membrana timpánica.", subject: "otoscope examining a patient ear", footage: ["otoscope ear examination", "doctor examining ear", "ear checkup otoscope", "pediatric ear exam", "ent examination"] },
  { id: 169, esp: "NEUROLOGIA", formato: "tecnica", pt: "Avaliar as pupilas: como usar a lanterna pra testar o reflexo fotomotor direto e consensual.", es: "Evaluar las pupilas: cómo usar la linterna para probar el reflejo fotomotor directo y consensual.", subject: "penlight testing pupillary light reflex", footage: ["penlight eye exam", "checking pupils flashlight", "pupil light reflex test", "neurological eye examination", "doctor examining eyes light"] },
  { id: 170, esp: "ENDOCRINOLOGIA", formato: "tecnica", pt: "Glicemia capilar: onde furar o dedo, gota certa e o erro que dá valor falso.", es: "Glucemia capilar: dónde pinchar el dedo, la gota correcta y el error que da valor falso.", subject: "fingerstick glucose test with glucometer", footage: ["glucometer finger blood sugar", "blood glucose test finger", "diabetes finger prick", "checking blood sugar", "glucose meter reading"] },
  { id: 171, esp: "CLÍNICA", formato: "tecnica", pt: "Acesso venoso periférico: escolher o cateter, fixar e correr o soro sem infiltrar.", es: "Acceso venoso periférico: elegir el catéter, fijar y pasar el suero sin infiltrar.", subject: "IV catheter insertion and drip running", footage: ["iv insertion arm", "iv drip hospital", "nurse inserting cannula", "intravenous line setup", "iv fluid hospital"] },
  { id: 172, esp: "CIRURGIA", formato: "tecnica", pt: "Curativo de ferida: técnica limpa, do centro pra fora, e quando NÃO ocluir.", es: "Curación de herida: técnica limpia, del centro hacia afuera, y cuándo NO ocluir.", subject: "cleaning and dressing a wound with gauze", footage: ["wound dressing gauze", "cleaning wound nurse", "bandaging wound", "wound care hospital", "applying bandage"] },
  { id: 173, esp: "PNEUMOLOGIA", formato: "tecnica", pt: "Oximetria de pulso: onde colocar, o que falseia a leitura e o que SpO₂ não mostra.", es: "Oximetría de pulso: dónde colocar, qué falsea la lectura y lo que la SpO₂ no muestra.", subject: "pulse oximeter on a fingertip showing reading", footage: ["pulse oximeter finger", "oxygen saturation monitor", "spo2 finger clip", "patient oximeter reading", "measuring oxygen finger"] },
  { id: 174, esp: "OTORRINO", formato: "tecnica", pt: "Exame da orofaringe: posição da língua, abaixador e o que olhar nas amígdalas.", es: "Examen de la orofaringe: posición de la lengua, abatelenguas y qué mirar en las amígdalas.", subject: "throat examination with a tongue depressor and light", footage: ["throat examination light", "doctor examining throat", "tongue depressor exam", "oral cavity examination", "checking tonsils"] },
  { id: 175, esp: "ENDOCRINOLOGIA", formato: "tecnica", pt: "Palpação da tireoide: por trás do paciente, pedir pra engolir e o que NÃO confundir.", es: "Palpación de la tiroides: por detrás del paciente, pedir que trague y qué NO confundir.", subject: "palpating the thyroid gland at the neck", footage: ["thyroid neck examination", "doctor palpating neck", "neck physical exam", "examining patient throat neck", "clinical neck exam"] },
  { id: 176, esp: "RADIOLOGIA", formato: "tecnica", pt: "Ultrassom à beira do leito (POCUS): como segurar o transdutor e orientar a marca.", es: "Ecografía a la cabecera (POCUS): cómo sostener el transductor y orientar la marca.", subject: "bedside ultrasound probe on a patient", footage: ["bedside ultrasound exam", "doctor using ultrasound probe", "point of care ultrasound", "ultrasound scan patient", "sonographer transducer"] },
  { id: 177, esp: "EMERGÊNCIA", formato: "tecnica", pt: "Ventilação com bolsa-válvula-máscara: o selo da máscara e o erro de hiperinsuflar.", es: "Ventilación con bolsa-válvula-máscara: el sello de la máscara y el error de hiperinsuflar.", subject: "bag valve mask ventilation on a patient", footage: ["bag valve mask ventilation", "oxygen mask resuscitation", "ambu bag patient", "emergency airway ventilation", "manual ventilation hospital"] },
  { id: 178, esp: "CARDIOLOGIA", formato: "tecnica", pt: "ECG de 12 derivações: onde colar cada eletrodo e o erro que simula isquemia.", es: "ECG de 12 derivaciones: dónde pegar cada electrodo y el error que simula isquemia.", subject: "placing ECG electrodes on a chest", footage: ["ecg electrodes chest", "ecg hookup patient", "electrocardiogram leads placement", "heart monitor electrodes", "ecg recording hospital"] },
  { id: 179, esp: "ORTOPEDIA", formato: "tecnica", pt: "Imobilização com tala: posição neutra, acolchoamento e checar o pulso depois.", es: "Inmovilización con férula: posición neutra, acolchado y checar el pulso después.", subject: "applying a splint to an injured limb", footage: ["splinting arm injury", "applying limb splint", "first aid splint", "orthopedic immobilization", "bandaging fractured arm"] },
];

// Banco final do reel — SÓ vídeo real (temas filmáveis).
export const REEL_TEMAS: ReelTema[] = [...TECNICAS];

// Rótulo de capa por formato (PT/ES). Reel usa só "tecnica" → "NA PRÁTICA".
export const REEL_ROTULO: Record<"pt" | "es", Record<ReelFormato, string>> = {
  pt: { curiosidade: "VOCÊ SABIA?", mnemonico: "BIZU", pegadinha: "PEGA DE PROVA", tecnica: "NA PRÁTICA" },
  es: { curiosidade: "¿SABÍAS?", mnemonico: "TRUCO", pegadinha: "TRAMPA DE EXAMEN", tecnica: "EN LA PRÁCTICA" },
};
