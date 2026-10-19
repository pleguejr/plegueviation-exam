/**
 * AonMathEngine.ts
 * Motor generador de operaciones aritméticas rápidas de suma y resta
 * para el test de Multitasking de AON / cut-e en formato [ CORRECTO / INCORRECTO ].
 */

export interface MathQuestion {
  id: string;
  expression: string; // e.g. "14 - 6 + 5 = 13"
  displayedEquation: string; // e.g. "14 - 6 + 5"
  displayedResult: number; // e.g. 13
  actualResult: number; // e.g. 13
  isMathematicallyCorrect: boolean; // true si coincide, false si difiere
  difficultyLevel: 1 | 2 | 3;
}

/**
 * Genera una operación mental aleatoria adaptada a los tests de aerolínea AON cut-e
 * Niveles:
 *  1: Dos operandos (ej: 8 + 7 = 15, 16 - 9 = 7)
 *  2: Tres operandos con números hasta 20 (ej: 12 - 5 + 6 = 13)
 *  3: Tres operandos con números hasta 40 (ej: 28 - 14 + 17 = 31)
 */
export function generateMathQuestion(level: 1 | 2 | 3 = 2): MathQuestion {
  const isCorrect = Math.random() < 0.5;

  let terms: number[] = [];
  let ops: ('+' | '-')[] = [];
  let actualResult = 0;

  if (level === 1) {
    // 2 operandos
    const op = Math.random() < 0.5 ? '+' : '-';
    ops = [op];
    if (op === '+') {
      const a = 4 + Math.floor(Math.random() * 14); // 4..17
      const b = 3 + Math.floor(Math.random() * 12); // 3..14
      terms = [a, b];
      actualResult = a + b;
    } else {
      const a = 11 + Math.floor(Math.random() * 15); // 11..25
      const b = 3 + Math.floor(Math.random() * (a - 2)); // 3..a-1
      terms = [a, b];
      actualResult = a - b;
    }
  } else if (level === 2) {
    // 3 operandos, números moderados (típico cut-e standard)
    const op1 = Math.random() < 0.5 ? '+' : '-';
    const op2 = Math.random() < 0.5 ? '+' : '-';
    ops = [op1, op2];

    const a = 6 + Math.floor(Math.random() * 14); // 6..19
    const b = 2 + Math.floor(Math.random() * 9);  // 2..10
    const step1 = op1 === '+' ? a + b : a - b;

    // Aseguramos que step1 sea positivo
    const adjustedA = step1 < 2 ? a + 6 : a;
    const finalStep1 = op1 === '+' ? adjustedA + b : adjustedA - b;

    const c = 2 + Math.floor(Math.random() * 9);
    terms = [adjustedA, b, c];
    actualResult = op2 === '+' ? finalStep1 + c : finalStep1 - c;
    // Si da negativo, invertimos op2
    if (actualResult < 1) {
      ops[1] = '+';
      actualResult = finalStep1 + c;
    }
  } else {
    // Nivel 3: Números mayores (hasta 45)
    const op1 = Math.random() < 0.5 ? '+' : '-';
    const op2 = Math.random() < 0.5 ? '+' : '-';
    ops = [op1, op2];

    const a = 15 + Math.floor(Math.random() * 25); // 15..39
    const b = 5 + Math.floor(Math.random() * 15);  // 5..19
    const finalStep1 = op1 === '+' ? a + b : a - b;

    const c = 4 + Math.floor(Math.random() * 16);
    terms = [a, b, c];
    actualResult = op2 === '+' ? finalStep1 + c : finalStep1 - c;
    if (actualResult < 1) {
      ops[1] = '+';
      actualResult = finalStep1 + c;
    }
  }

  // Construir la cadena de la izquierda: "A + B - C"
  let leftExpr = `${terms[0]}`;
  for (let i = 0; i < ops.length; i++) {
    leftExpr += ` ${ops[i]} ${terms[i + 1]}`;
  }

  let displayedResult = actualResult;
  if (!isCorrect) {
    // Distractor sutil para forzar el cálculo mental: desfase de +1, -1, +2, -2, o +10
    const offsets = [-2, -1, 1, 2];
    if (actualResult > 15) offsets.push(-10, 10);
    const chosenOffset = offsets[Math.floor(Math.random() * offsets.length)];
    displayedResult = actualResult + chosenOffset;
    if (displayedResult === actualResult || displayedResult < 0) {
      displayedResult = actualResult + (Math.random() < 0.5 ? 1 : 2);
    }
  }

  const fullExpression = `${leftExpr} = ${displayedResult}`;

  return {
    id: `MATH-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    expression: fullExpression,
    displayedEquation: leftExpr,
    displayedResult,
    actualResult,
    isMathematicallyCorrect: isCorrect,
    difficultyLevel: level,
  };
}
