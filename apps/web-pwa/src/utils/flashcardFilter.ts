import { Question, QuestionStats } from '../types';

// Expresiones regulares para detección de datos cuantitativos / numéricos
const NUMERICAL_UNIT_REGEX = /\b(\d+([.,]\d+)?\s*(ft|kt|kts|nudos|pies|metros|km|m|NM|SM|%|horas?|h|min(utos)?|seg(undos)?|d[ií]as|meses|a[ñn]os|kg|lbs?|toneladas?|psi|bar|hPa|inHg|°C|ºC|FL\s*\d+|M0\.\d+)\b|\bFL\s*\d+\b|\b\d+([.,]\d+)?%)/i;
const NUMERICAL_STEM_REGEX = /(cu[aá]l es (la velocidad|el peso|la masa|la altitud|la altura|la distancia|el tiempo|el porcentaje|la tolerancia|el margen|la visibilidad|el m[ií]nimo|la duraci[oó]n|el l[ií]mite|el plazo|el r[eé]gimen|la presi[oó]n|la temperatura)|cu[aá]nt[ao]s?|a qu[eé] (altitud|altura|distancia|velocidad|temperatura|presi[oó]n|nivel|plazo)|qu[eé] porcentaje|cu[aá]l es el m[aá]ximo|cu[aá]l es el m[ií]nimo)/i;
const NUMERICAL_SPEED_REGEX = /\b(V1|VR|V2|VREF|VAPP|VFE|VLE|VLO|VNE|VNO|VMO|MMO|VMCA|VMCG|VX|VY|VXSE|VYSE|VS|VS0|VS1|VSR)\b/i;

// Expresiones regulares para detección de siglas, acrónimos y mnemónicos
const ACRONYM_STEM_REGEX = /\b(siglas?|acr[oó]nimo|significa|significan|definici[oó]n de|concepto de|mnem[oó]nico|abreviatura|stands for|significado de)\b/i;
const KNOWN_ACRONYMS_REGEX = /\b(RETSE|E-DALTA|IMFLOCC|TELSI|MEANA|TWIN|NITS|CDFA|DDA|NPA|LPV|LVO|LVTO|LVP|AWO|RVR|MEL|CDL|MMEL|HIL|NOTOC|DGR|LRBL|AVSEC|SMS|MOR|ASR|CSR|CIAIAC|SERA|SAR|PBE|FDM|SPI|ALOSP|RVSM|RFFS|TCAS|TAWS|EGPWS|FADEC|APU|GPU|ASU|MTOW|MLW|MZFW|ZFW|TOW|LW|OEW|DOW|VMC|IMC|SVFR|VFR|IFR|CTR|CTA|TMA|ATZ|FIR|UIR|NOTAM|AIP|AIC|AIRAC|ATIS|VOLMET|METAR|TAF|SIGMET|AIRMET|PIREP|EASA|AESA|OACI|ICAO|FAA|FTL|FDP|WOCL|LMA|CAMO|CPDLC|ADS-B|ADS-C|SSR|PSR|IFF|DME|VOR|NDB|ADF|ILS|MLS|GLS|GBAS|SBAS|WAAS|EGNOS|ELT)\b/i;

/**
 * Determina si una pregunta contiene o evalúa un dato numérico concreto
 * (velocidad, altitud, tiempo, distancia, peso, porcentaje, etc.)
 */
export function isNumericalQuestion(question: Question): boolean {
  if (!question) return false;
  const stem = question.stem || '';
  const lo = question.learning_objective || '';

  if (NUMERICAL_STEM_REGEX.test(stem) || NUMERICAL_STEM_REGEX.test(lo)) return true;
  if (NUMERICAL_SPEED_REGEX.test(stem) || NUMERICAL_SPEED_REGEX.test(lo)) return true;
  if (NUMERICAL_UNIT_REGEX.test(stem)) return true;

  // Comprobar si las opciones son eminentemente numéricas (números, rangos, unidades)
  const numericOptsCount = (question.options || []).filter((opt) => 
    NUMERICAL_UNIT_REGEX.test(opt.text) || /\b\d+\b/.test(opt.text)
  ).length;

  if (numericOptsCount >= 2) return true;

  return false;
}

/**
 * Determina si una pregunta trata sobre la definición o significado de siglas, acrónimos o mnemónicos operacionales.
 */
export function isAcronymQuestion(question: Question): boolean {
  if (!question) return false;
  const stem = question.stem || '';
  const lo = question.learning_objective || '';

  if (ACRONYM_STEM_REGEX.test(stem) || ACRONYM_STEM_REGEX.test(lo)) return true;
  if (KNOWN_ACRONYMS_REGEX.test(stem) || KNOWN_ACRONYMS_REGEX.test(lo)) return true;

  return false;
}

/**
 * Determina si una pregunta es elegible para el Modo Flashcards (Numérica O Siglas/Acrónimos).
 */
export function isFlashcardEligible(question: Question): boolean {
  return isNumericalQuestion(question) || isAcronymQuestion(question);
}

/**
 * Retorna el tipo de Flashcard para clasificaciones o filtros específicos.
 */
export function getFlashcardType(question: Question): 'numerical' | 'acronym' | 'both' | null {
  const isNum = isNumericalQuestion(question);
  const isAcro = isAcronymQuestion(question);

  if (isNum && isAcro) return 'both';
  if (isNum) return 'numerical';
  if (isAcro) return 'acronym';
  return null;
}

/**
 * Retorna metadatos visuales (etiqueta, icono, colores) para la tarjeta de memoria.
 */
export function getFlashcardBadge(question: Question): { label: string; type: 'numerical' | 'acronym' | 'both' } {
  const type = getFlashcardType(question);
  if (type === 'both') {
    return { label: '🔢 Dato Numérico & Sigla', type: 'both' };
  }
  if (type === 'numerical') {
    return { label: '🔢 Dato Numérico / Límite', type: 'numerical' };
  }
  if (type === 'acronym') {
    return { label: '🔤 Sigla / Mnemónico / Acrónimo', type: 'acronym' };
  }
  return { label: '⚡ Tarjeta de Memoria', type: 'both' };
}

/**
 * Filtra un conjunto de preguntas para el mazo de Flashcards según la categoría y el filtro secundario.
 */
export function filterFlashcards(
  questions: Question[],
  category?: string,
  filterType: 'all' | 'numerical' | 'acronym' = 'all'
): Question[] {
  return questions.filter((q) => {
    // 1. Filtro de Categoría si está especificada
    if (category && category !== 'all') {
      if (q._category !== category && q.subject_id !== category) {
        return false;
      }
    }

    // 2. Filtro de elegibilidad
    const isNum = isNumericalQuestion(q);
    const isAcro = isAcronymQuestion(q);

    if (filterType === 'numerical') {
      return isNum;
    }
    if (filterType === 'acronym') {
      return isAcro;
    }

    return isNum || isAcro;
  });
}

function internalShuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Retorna el estado de maestría de una flashcard según su historial para feedback visual y priorización.
 */
export function getFlashcardMasteryStatus(stat?: QuestionStats): {
  tier: 1 | 2 | 3 | 4;
  status: 'hard' | 'unseen' | 'regular' | 'mastered';
  label: string;
  views: number;
} {
  const views = stat?.flashcardViews || 0;
  const answered = stat?.timesAnswered || 0;

  if (!stat || (views === 0 && answered === 0)) {
    return { tier: 2, status: 'unseen', label: '🆕 No Vista', views: 0 };
  }

  const incorrect = stat.timesIncorrect || 0;
  const correct = stat.timesCorrect || 0;
  const isHard = stat.flashcardLastRating === 'hard' || stat.isFlagged || (answered > 0 && incorrect > correct);

  if (isHard) {
    return { tier: 1, status: 'hard', label: '🔴 Difícil (Prioridad)', views };
  }

  const isMastered = stat.flashcardLastRating === 'easy' || (answered >= 2 && correct / answered >= 0.8);
  if (isMastered) {
    return { tier: 4, status: 'mastered', label: '🟢 Dominada', views };
  }

  return { tier: 3, status: 'regular', label: '🟡 Regular', views };
}

/**
 * Construye un mazo inteligente de Flashcards con Priorización Cognitiva (Spaced Repetition):
 * 1. Prioridad 1: Preguntas Difíciles (falladas, marcadas o calificadas como difíciles) -> Barajadas aleatoriamente
 * 2. Prioridad 2: Preguntas No Vistas (nuevas para afianzar conceptos clave) -> Barajadas aleatoriamente
 * 3. Prioridad 3: Preguntas Regulares (en proceso de consolidación) -> Barajadas aleatoriamente
 * 4. Prioridad 4: Preguntas Dominadas (mantenimiento y repaso a largo plazo) -> Barajadas aleatoriamente
 * 
 * En cada nueva sesión, el orden interno se baraja aleatoriamente para evitar secuencias fijas de memoria.
 */
export function buildPrioritizedFlashcardDeck(
  questions: Question[],
  statsMap: Record<string, QuestionStats>,
  category?: string,
  filterType: 'all' | 'numerical' | 'acronym' = 'all',
  randomizeWithinTiers: boolean = true
): Question[] {
  const eligible = filterFlashcards(questions, category, filterType);

  const tier1Hard: Question[] = [];
  const tier2Unseen: Question[] = [];
  const tier3Regular: Question[] = [];
  const tier4Mastered: Question[] = [];

  for (const q of eligible) {
    const stat = statsMap[q.id];
    const { tier } = getFlashcardMasteryStatus(stat);

    if (tier === 1) {
      tier1Hard.push(q);
    } else if (tier === 2) {
      tier2Unseen.push(q);
    } else if (tier === 3) {
      tier3Regular.push(q);
    } else {
      tier4Mastered.push(q);
    }
  }

  const t1 = randomizeWithinTiers ? internalShuffle(tier1Hard) : tier1Hard;
  const t2 = randomizeWithinTiers ? internalShuffle(tier2Unseen) : tier2Unseen;
  const t3 = randomizeWithinTiers ? internalShuffle(tier3Regular) : tier3Regular;
  const t4 = randomizeWithinTiers ? internalShuffle(tier4Mastered) : tier4Mastered;

  return [...t1, ...t2, ...t3, ...t4];
}

