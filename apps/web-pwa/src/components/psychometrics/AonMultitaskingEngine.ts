/**
 * AonMultitaskingEngine.ts
 * Motor de generación procedural para el test oficial Cut-E / AON: Multitasking Capability
 * según especificación actualizada de Cut-E / AON y Kura Aviation para selección NetJets Europe.
 *
 * Consta de 3 tareas simultáneas:
 * 1. Detección de orientación de triángulo (Izquierda ◀ o Derecha ▶) en fila de 7 figuras + Barra temporal vertical.
 * 2. Cálculo mental de sumas y restas en formato [ CORRECTO / INCORRECTO ].
 * 3. Verificación de duplicados en secuencia numérica de 7 dígitos en formato [ DUPLICADO / NO DUPLICADO ].
 */

export type TriangleDirection = 'left' | 'right';

export type SilhouetteShapeType = 
  | 'triangle_left' 
  | 'triangle_right' 
  | 'triangle_up' 
  | 'triangle_down' 
  | 'hexagon' 
  | 'trapezoid' 
  | 'diamond' 
  | 'oval' 
  | 'parallelogram' 
  | 'circle';

export interface SilhouetteItem {
  id: string;
  type: SilhouetteShapeType;
  name: string;
  isTarget: boolean;
  direction?: TriangleDirection;
}

export interface TriangleTaskQuestion {
  id: string;
  shapes: SilhouetteItem[];
  targetDirection: TriangleDirection;
  targetIndex: number;
}

export interface NumberSequenceQuestion {
  id: string;
  digits: number[];
  hasDuplicate: boolean;
  duplicateDigit?: number;
  duplicateIndices?: [number, number];
}

/**
 * Catálogo de formas distractores (no direccionales horizontales)
 */
const DISTRACTOR_SHAPES: { type: SilhouetteShapeType; name: string }[] = [
  { type: 'triangle_up', name: 'Triángulo Arriba' },
  { type: 'triangle_down', name: 'Triángulo Abajo' },
  { type: 'hexagon', name: 'Hexágono' },
  { type: 'trapezoid', name: 'Trapecio' },
  { type: 'diamond', name: 'Rombo' },
  { type: 'oval', name: 'Óvalo' },
  { type: 'parallelogram', name: 'Paralelogramo' },
  { type: 'circle', name: 'Círculo' },
];

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * 1. Genera reactivo de la Tarea 1 (Triángulo Izquierda / Derecha):
 * Fila de exactamente 7 figuras. Una sola es un triángulo horizontal (◀ o ▶).
 */
export function generateTriangleTask(count: number = 7): TriangleTaskQuestion {
  const targetDirection: TriangleDirection = Math.random() < 0.5 ? 'left' : 'right';
  const targetType: SilhouetteShapeType = targetDirection === 'left' ? 'triangle_left' : 'triangle_right';
  
  const targetIndex = Math.floor(Math.random() * count);

  // Escoger 6 distractores aleatorios
  const shuffledDistractors = shuffleArray(DISTRACTOR_SHAPES);
  const distractorsList: { type: SilhouetteShapeType; name: string }[] = [];
  while (distractorsList.length < count - 1) {
    distractorsList.push(...shuffleArray(shuffledDistractors));
  }

  const shapes: SilhouetteItem[] = [];
  let dIdx = 0;
  for (let i = 0; i < count; i++) {
    if (i === targetIndex) {
      shapes.push({
        id: `shape-${Date.now()}-${i}-target`,
        type: targetType,
        name: targetDirection === 'left' ? 'Triángulo Izquierda' : 'Triángulo Derecha',
        isTarget: true,
        direction: targetDirection,
      });
    } else {
      const dist = distractorsList[dIdx++];
      shapes.push({
        id: `shape-${Date.now()}-${i}-dist`,
        type: dist.type,
        name: dist.name,
        isTarget: false,
      });
    }
  }

  return {
    id: `tri-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    shapes,
    targetDirection,
    targetIndex,
  };
}

/**
 * 2. Genera reactivo de la Tarea 3 (Secuencia Numérica de 7 dígitos):
 * ~50% probabilidad de dígito duplicado (aparece 2 veces).
 * ~50% probabilidad de que todos los 7 dígitos sean distintos.
 */
export function generateNumberSequenceTask(count: number = 7): NumberSequenceQuestion {
  const hasDuplicate = Math.random() < 0.5;
  const digitsPool = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const shuffledPool = shuffleArray(digitsPool);

  if (!hasDuplicate) {
    // 7 dígitos completamente distintos
    const digits = shuffledPool.slice(0, count);
    return {
      id: `num-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      digits,
      hasDuplicate: false,
    };
  } else {
    // Escoger un dígito duplicado que aparecerá 2 veces
    const duplicateDigit = shuffledPool[0];
    const otherDigits = shuffledPool.slice(1, count - 1); // 5 dígitos restantes

    // Escoger dos posiciones aleatorias en la fila de 7
    const pos1 = Math.floor(Math.random() * count);
    let pos2 = Math.floor(Math.random() * (count - 1));
    if (pos2 >= pos1) pos2++;
    const indices: [number, number] = [Math.min(pos1, pos2), Math.max(pos1, pos2)];

    const digits: number[] = new Array(count);
    digits[indices[0]] = duplicateDigit;
    digits[indices[1]] = duplicateDigit;

    let oIdx = 0;
    for (let i = 0; i < count; i++) {
      if (i !== indices[0] && i !== indices[1]) {
        digits[i] = otherDigits[oIdx++];
      }
    }

    return {
      id: `num-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      digits,
      hasDuplicate: true,
      duplicateDigit,
      duplicateIndices: indices,
    };
  }
}
