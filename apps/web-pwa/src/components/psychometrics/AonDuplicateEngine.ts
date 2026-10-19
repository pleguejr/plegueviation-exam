/**
 * AonDuplicateEngine.ts
 * Motor generador procedural para la tarea de Detección de Duplicados (Pattern / Duplicate Detection Task)
 * del test oficial Aon / cut-e Multitasking Capability para selección NetJets Europe.
 */

export interface DuplicateItem {
  id: string;
  symbol: string;
  name: string;
  color: string;
  bgColor: string;
}

export interface DuplicateQuestion {
  id: string;
  items: DuplicateItem[];
  hasDuplicate: boolean;
  duplicateName?: string;
  duplicateIndices?: [number, number];
}

// Catálogo de figuras geométricas y símbolos retina con alto contraste
const SYMBOLS_POOL: Omit<DuplicateItem, 'id'>[] = [
  { symbol: '●', name: 'Círculo', color: '#38bdf8', bgColor: 'rgba(56, 189, 248, 0.15)' },       // Sky
  { symbol: '■', name: 'Cuadrado', color: '#fbbf24', bgColor: 'rgba(251, 191, 36, 0.15)' },     // Amber
  { symbol: '▲', name: 'Triángulo', color: '#4ade80', bgColor: 'rgba(74, 222, 128, 0.15)' },    // Emerald
  { symbol: '◆', name: 'Rombo', color: '#c084fc', bgColor: 'rgba(192, 132, 252, 0.15)' },       // Purple
  { symbol: '★', name: 'Estrella', color: '#f87171', bgColor: 'rgba(248, 113, 113, 0.15)' },    // Rose
  { symbol: '✚', name: 'Cruz', color: '#2dd4bf', bgColor: 'rgba(45, 212, 191, 0.15)' },          // Teal
  { symbol: '⬟', name: 'Pentágono', color: '#fb923c', bgColor: 'rgba(251, 146, 60, 0.15)' },    // Orange
  { symbol: '✿', name: 'Flor', color: '#f472b6', bgColor: 'rgba(244, 114, 182, 0.15)' },         // Pink
  { symbol: '✦', name: 'Destello', color: '#a78bfa', bgColor: 'rgba(167, 139, 250, 0.15)' },     // Indigo
  { symbol: '▼', name: 'Triángulo Inv.', color: '#34d399', bgColor: 'rgba(52, 211, 153, 0.15)' },// Mint
  { symbol: '◈', name: 'Diamante Hueco', color: '#60a5fa', bgColor: 'rgba(96, 165, 250, 0.15)' },// Blue
  { symbol: '✱', name: 'Asterisco', color: '#e879f9', bgColor: 'rgba(232, 121, 249, 0.15)' }    // Fuchsia
];

/**
 * Mezcla aleatoriamente un array (Fisher-Yates)
 */
function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Genera un reactivo para la prueba de Duplicados o No (7 elementos en fila)
 * ~50% de probabilidad de tener exactamente 1 elemento duplicado (aparece 2 veces).
 * ~50% de probabilidad de que todos los 7 elementos sean completamente únicos.
 */
export function generateDuplicateQuestion(itemCount: number = 7): DuplicateQuestion {
  const hasDuplicate = Math.random() < 0.5;
  const pool = shuffle(SYMBOLS_POOL);
  
  if (!hasDuplicate) {
    // 7 elementos únicos
    const selected = pool.slice(0, itemCount).map((item, index) => ({
      ...item,
      id: `item-${Date.now()}-${index}`
    }));

    return {
      id: `dup-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      items: selected,
      hasDuplicate: false
    };
  } else {
    // Exactamente 1 duplicado (aparece 2 veces en distintas posiciones)
    const duplicateSymbol = pool[0];
    const otherSymbols = pool.slice(1, itemCount - 1); // Tomamos 5 símbolos adicionales distintos
    
    // Escoger dos posiciones aleatorias no adyacentes preferiblemente o separadas
    const pos1 = Math.floor(Math.random() * itemCount);
    let pos2 = Math.floor(Math.random() * (itemCount - 1));
    if (pos2 >= pos1) pos2++; // Asegurar pos2 !== pos1

    const finalIndices: [number, number] = [Math.min(pos1, pos2), Math.max(pos1, pos2)];
    
    const items: DuplicateItem[] = new Array(itemCount);
    items[finalIndices[0]] = { ...duplicateSymbol, id: `item-${Date.now()}-dup1` };
    items[finalIndices[1]] = { ...duplicateSymbol, id: `item-${Date.now()}-dup2` };

    let otherIdx = 0;
    for (let i = 0; i < itemCount; i++) {
      if (i !== finalIndices[0] && i !== finalIndices[1]) {
        items[i] = { ...otherSymbols[otherIdx], id: `item-${Date.now()}-${i}` };
        otherIdx++;
      }
    }

    return {
      id: `dup-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      items,
      hasDuplicate: true,
      duplicateName: duplicateSymbol.name,
      duplicateIndices: finalIndices
    };
  }
}
