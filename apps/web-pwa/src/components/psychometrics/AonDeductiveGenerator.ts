/**
 * AonDeductiveGenerator.ts
 * Generador procedural de puzzles AON / cut-e "scales sx" (Deductive-logical reasoning / Latin square).
 * Garantiza soluciones lógicamente únicas y verificables paso a paso para cuadrículas 4x4 y 5x5.
 */

export type ShapeId = 'circle' | 'square' | 'triangle' | 'cross' | 'diamond';

export interface DeductiveSymbol {
  id: ShapeId;
  name: string;
  nameEn: string;
  color: string;
  bgLight: string;
  borderColor: string;
  keyNumber: string;
}

export const SYMBOLS_LIST: DeductiveSymbol[] = [
  {
    id: 'triangle',
    name: 'Triángulo',
    nameEn: 'Triangle',
    color: '#eab308', // Amarillo oficial AON
    bgLight: 'rgba(234, 179, 8, 0.15)',
    borderColor: '#ca8a04',
    keyNumber: '1',
  },
  {
    id: 'circle',
    name: 'Círculo',
    nameEn: 'Circle',
    color: '#65a30d', // Verde hoja oficial AON
    bgLight: 'rgba(101, 163, 13, 0.15)',
    borderColor: '#4d7c0f',
    keyNumber: '2',
  },
  {
    id: 'square',
    name: 'Cuadrado',
    nameEn: 'Square',
    color: '#dc2626', // Rojo oficial AON
    bgLight: 'rgba(220, 38, 38, 0.15)',
    borderColor: '#b91c1c',
    keyNumber: '3',
  },
  {
    id: 'cross',
    name: 'Cruz',
    nameEn: 'Cross',
    color: '#0284c7', // Azul cielo oficial AON
    bgLight: 'rgba(2, 132, 199, 0.15)',
    borderColor: '#0369a1',
    keyNumber: '4',
  },
  {
    id: 'diamond',
    name: 'Rombo',
    nameEn: 'Diamond',
    color: '#9333ea', // Púrpura oficial AON (5x5)
    bgLight: 'rgba(147, 51, 234, 0.15)',
    borderColor: '#7e22ce',
    keyNumber: '5',
  },
];

export interface DeductivePuzzle {
  id: string;
  gridSize: 4 | 5;
  availableSymbols: DeductiveSymbol[];
  // Matriz gridSize x gridSize: cada celda contiene el ShapeId o null si está vacía
  displayGrid: (ShapeId | null)[][];
  // Matriz completa con la solución
  solutionGrid: ShapeId[][];
  // Coordenadas de la celda incógnita '?'
  targetRow: number;
  targetCol: number;
  correctShape: ShapeId;
  // Paso a paso para modo práctica
  logicExplanation: string[];
  difficulty: 'basic_4x4' | 'intermediate_4x4' | 'advanced_5x5';
}

/**
 * Genera un cuadrado latino aleatorio de tamaño N (4 o 5)
 */
function generateRandomLatinSquare(n: number): number[][] {
  // Matriz inicial basada en suma módulo n
  const base: number[][] = [];
  for (let r = 0; r < n; r++) {
    const row: number[] = [];
    for (let c = 0; c < n; c++) {
      row.push((r + c) % n);
    }
    base.push(row);
  }

  // Permutar filas aleatoriamente
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [base[i], base[j]] = [base[j], base[i]];
  }

  // Permutar columnas aleatoriamente
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    for (let r = 0; r < n; r++) {
      const temp = base[r][i];
      base[r][i] = base[r][j];
      base[r][j] = temp;
    }
  }

  // Permutar símbolos (números 0..n-1)
  const symbolMap: number[] = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [symbolMap[i], symbolMap[j]] = [symbolMap[j], symbolMap[i]];
  }

  return base.map((row) => row.map((val) => symbolMap[val]));
}

/**
 * Resuelve por deducción estricta (sin adivinanza) los valores posibles de cada celda.
 * Retorna true si la celda objetivo tiene exactamente 1 posibilidad deducible.
 */
function solveDeductiveTarget(
  grid: (number | null)[][],
  n: number,
  targetRow: number,
  targetCol: number,
  expectedVal: number
): { solvable: boolean; steps: string[] } {
  // Trabajamos sobre una copia
  const current: (number | null)[][] = grid.map((r) => [...r]);
  const steps: string[] = [];

  let changed = true;
  let iterations = 0;

  while (changed && iterations < 15) {
    changed = false;
    iterations++;

    // Si la celda objetivo ya fue deducida, terminamos
    if (current[targetRow][targetCol] !== null) {
      if (current[targetRow][targetCol] === expectedVal) {
        return { solvable: true, steps };
      }
      return { solvable: false, steps };
    }

    // Regla 1: Descarte directo (Naked Single). Si en una celda vacía solo queda 1 símbolo posible por su fila y columna
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (current[r][c] === null) {
          const used = new Set<number>();
          // símbolos en la fila
          for (let col = 0; col < n; col++) {
            if (current[r][col] !== null) used.add(current[r][col]!);
          }
          // símbolos en la columna
          for (let row = 0; row < n; row++) {
            if (current[row][c] !== null) used.add(current[row][c]!);
          }

          const candidates: number[] = [];
          for (let s = 0; s < n; s++) {
            if (!used.has(s)) candidates.push(s);
          }

          if (candidates.length === 1) {
            current[r][c] = candidates[0];
            changed = true;
            if (r === targetRow && c === targetCol) {
              steps.push(`En la casilla incógnita (Fila ${r + 1}, Columna ${c + 1}), los otros símbolos de su fila y columna ya están presentes, por lo que únicamente puede ser este símbolo.`);
              return { solvable: true, steps };
            } else {
              steps.push(`En Fila ${r + 1}, Columna ${c + 1}, por descarte de fila/columna solo puede ir el símbolo deducido.`);
            }
          }
        }
      }
    }

    // Regla 2: Única posición en fila o columna (Hidden Single)
    for (let s = 0; s < n; s++) {
      // Por fila
      for (let r = 0; r < n; r++) {
        let alreadyInRow = false;
        for (let c = 0; c < n; c++) {
          if (current[r][c] === s) alreadyInRow = true;
        }
        if (!alreadyInRow) {
          const possibleCols: number[] = [];
          for (let c = 0; c < n; c++) {
            if (current[r][c] === null) {
              // Comprobar si la columna c ya tiene s
              let inCol = false;
              for (let row = 0; row < n; row++) {
                if (current[row][c] === s) inCol = true;
              }
              if (!inCol) possibleCols.push(c);
            }
          }
          if (possibleCols.length === 1) {
            const col = possibleCols[0];
            current[r][col] = s;
            changed = true;
            if (r === targetRow && col === targetCol) {
              steps.push(`En la Fila ${r + 1}, este símbolo solo puede ubicarse en la casilla incógnita porque en las demás columnas ya está presente.`);
              return { solvable: true, steps };
            }
          }
        }
      }

      // Por columna
      for (let c = 0; c < n; c++) {
        let alreadyInCol = false;
        for (let r = 0; r < n; r++) {
          if (current[r][c] === s) alreadyInCol = true;
        }
        if (!alreadyInCol) {
          const possibleRows: number[] = [];
          for (let r = 0; r < n; r++) {
            if (current[r][c] === null) {
              let inRow = false;
              for (let col = 0; col < n; col++) {
                if (current[r][col] === s) inRow = true;
              }
              if (!inRow) possibleRows.push(r);
            }
          }
          if (possibleRows.length === 1) {
            const row = possibleRows[0];
            current[row][c] = s;
            changed = true;
            if (row === targetRow && c === targetCol) {
              steps.push(`En la Columna ${c + 1}, este símbolo solo cabe en la casilla incógnita porque en las otras filas ya se encuentra.`);
              return { solvable: true, steps };
            }
          }
        }
      }
    }
  }

  return { solvable: current[targetRow][targetCol] === expectedVal, steps };
}

/**
 * Genera un puzzle válido con garantía de solución deductiva única
 */
export function generateDeductivePuzzle(
  gridSize: 4 | 5 = 4,
  difficulty: 'basic_4x4' | 'intermediate_4x4' | 'advanced_5x5' = 'basic_4x4'
): DeductivePuzzle {
  const n = gridSize;
  const availableSymbols = SYMBOLS_LIST.slice(0, n);

  let attempts = 0;
  while (attempts < 50) {
    attempts++;
    const fullSquare = generateRandomLatinSquare(n);

    // Elegir celda objetivo aleatoria
    const targetRow = Math.floor(Math.random() * n);
    const targetCol = Math.floor(Math.random() * n);
    const targetVal = fullSquare[targetRow][targetCol];

    // Matriz de trabajo
    const puzzleGrid: (number | null)[][] = fullSquare.map((r) => [...r]);
    puzzleGrid[targetRow][targetCol] = null;

    // Decidir cuántas celdas vaciar según dificultad
    let targetEmptyCells = 5;
    if (difficulty === 'basic_4x4') {
      targetEmptyCells = 4 + Math.floor(Math.random() * 3); // 4 a 6
    } else if (difficulty === 'intermediate_4x4') {
      targetEmptyCells = 7 + Math.floor(Math.random() * 3); // 7 a 9
    } else {
      targetEmptyCells = 10 + Math.floor(Math.random() * 5); // 10 a 14
    }

    // Generar lista de celdas candidatas a vaciar (excluyendo la celda objetivo)
    const otherCoords: [number, number][] = [];
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (r !== targetRow || c !== targetCol) {
          otherCoords.push([r, c]);
        }
      }
    }

    // Barajar coordenadas
    for (let i = otherCoords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [otherCoords[i], otherCoords[j]] = [otherCoords[j], otherCoords[i]];
    }

    let emptyCount = 1;
    for (const [r, c] of otherCoords) {
      if (emptyCount >= targetEmptyCells) break;

      const backup = puzzleGrid[r][c];
      puzzleGrid[r][c] = null;

      // Verificar si la celda objetivo sigue siendo 100% deducible sin conjeturas
      const check = solveDeductiveTarget(puzzleGrid, n, targetRow, targetCol, targetVal);
      if (check.solvable) {
        emptyCount++;
      } else {
        // Restaurar
        puzzleGrid[r][c] = backup;
      }
    }

    // Comprobación final del solver
    const finalCheck = solveDeductiveTarget(puzzleGrid, n, targetRow, targetCol, targetVal);
    if (finalCheck.solvable) {
      // Mapear números a ShapeId
      const displayGrid: (ShapeId | null)[][] = puzzleGrid.map((row) =>
        row.map((val) => (val === null ? null : availableSymbols[val].id))
      );
      const solutionGrid: ShapeId[][] = fullSquare.map((row) =>
        row.map((val) => availableSymbols[val].id)
      );

      const correctShape = availableSymbols[targetVal].id;
      const targetSymbolObj = availableSymbols[targetVal];

      const stepsText = finalCheck.steps.length > 0
        ? finalCheck.steps
        : [
            `Analizando la Fila ${targetRow + 1} y la Columna ${targetCol + 1}, se descartan las figuras ya presentes.`,
            `Por descarte lógico único, la casilla incógnita solo puede ser: ${targetSymbolObj.name} (${targetSymbolObj.nameEn}).`
          ];

      return {
        id: `DED-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        gridSize,
        availableSymbols,
        displayGrid,
        solutionGrid,
        targetRow,
        targetCol,
        correctShape,
        logicExplanation: stepsText,
        difficulty,
      };
    }
  }

  // Fallback seguro: 4x4 con deducción directa en fila
  const fallbackSquare = generateRandomLatinSquare(gridSize);
  const tR = 1;
  const tC = 2;
  const tVal = fallbackSquare[tR][tC];
  const pGrid: (number | null)[][] = fallbackSquare.map((r) => [...r]);
  pGrid[tR][tC] = null;
  pGrid[0][0] = null;
  pGrid[2][3] = null;

  return {
    id: `DED-FALLBACK-${Date.now()}`,
    gridSize,
    availableSymbols,
    displayGrid: pGrid.map((row) => row.map((v) => (v === null ? null : availableSymbols[v].id))),
    solutionGrid: fallbackSquare.map((row) => row.map((v) => availableSymbols[v].id)),
    targetRow: tR,
    targetCol: tC,
    correctShape: availableSymbols[tVal].id,
    logicExplanation: [
      `En la Fila ${tR + 1}, todos los demás símbolos están definidos excepto la casilla incógnita.`,
      `El único símbolo que falta en la fila es: ${availableSymbols[tVal].name}.`
    ],
    difficulty,
  };
}
