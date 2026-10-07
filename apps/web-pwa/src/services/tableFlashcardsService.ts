import { OPERATIONAL_TABLES, OperationalTable, TableRow } from '../data/operationalTablesData';
import { Question } from '../types';

/**
 * Genera distractores plausibles a partir de otras filas de la misma tabla o datos adyacentes
 */
function generatePlausibleDistractors(
  currentRow: TableRow,
  allRows: TableRow[],
  headers: string[],
  table: OperationalTable
): Array<{ id: string; text: string; is_correct: boolean }> {
  // Respuesta correcta
  const correctText = [
    currentRow.col2,
    currentRow.col3 ? `| ${headers[2] || ''}: ${currentRow.col3}` : '',
    currentRow.col4 ? `| ${headers[3] || ''}: ${currentRow.col4}` : ''
  ]
    .filter(Boolean)
    .join(' ')
    .trim();

  const options = [{ id: 'A', text: correctText, is_correct: true }];

  // Extraer alternativas de otras filas
  const otherRows = allRows.filter((r) => r.col1 !== currentRow.col1);
  const otherTexts: string[] = [];

  for (const r of otherRows) {
    const text = [
      r.col2,
      r.col3 ? `| ${headers[2] || ''}: ${r.col3}` : '',
      r.col4 ? `| ${headers[3] || ''}: ${r.col4}` : ''
    ]
      .filter(Boolean)
      .join(' ')
      .trim();
    if (text && text !== correctText && !otherTexts.includes(text)) {
      otherTexts.push(text);
    }
  }

  // Si no hay suficientes filas, generar variaciones numéricas u operacionales coherentes
  if (otherTexts.length < 3) {
    if (table.category === 'alternates') {
      otherTexts.push('DA/H + 250 ft | RVR/VIS: RVR/VIS + 1 200 m');
      otherTexts.push('MDA/H + 500 ft | RVR/VIS: VIS + 2 000 m');
      otherTexts.push('DA/H + 300 ft | RVR/VIS: RVR + 1 500 m');
    } else if (table.category === 'limitations') {
      otherTexts.push('Limitación estándar: ±10 kt de tolerancia');
      otherTexts.push('No autorizado por debajo de FL100');
      otherTexts.push('Requiere procedimiento extraordinario de mantenimiento');
    } else if (table.category === 'easa-netjets') {
      otherTexts.push('Requiere aprobación específica del operador bajo Part-SPA');
      otherTexts.push('Aplicable únicamente con dos motores operativos');
      otherTexts.push('Intervalo estándar de rectificación de 30 días naturales');
    } else {
      otherTexts.push('No aplicable según la reglamentación vigente');
      otherTexts.push('Requiere autorización verbal de control de tráfico aéreo');
      otherTexts.push('Condición sujeta a evaluación directa del Comandante');
    }
  }

  // Mezclar y tomar los 3 primeros distractores
  const selectedDistractors = otherTexts.slice(0, 3);
  const letterIds = ['B', 'C', 'D'];

  selectedDistractors.forEach((dist, idx) => {
    options.push({
      id: letterIds[idx] || `OPT-${idx}`,
      text: dist,
      is_correct: false
    });
  });

  return options;
}

/**
 * Convierte todas las filas de todas las tablas operacionales en preguntas Flashcard
 */
export function getAllTableFlashcards(): Question[] {
  const flashcards: Question[] = [];

  OPERATIONAL_TABLES.forEach((table) => {
    table.rows.forEach((row, rowIndex) => {
      const qId = `TAB-FC-${table.id.toUpperCase().replace(/[^A-Z0-9]/g, '-')}-${String(rowIndex + 1).padStart(3, '0')}`;
      
      // Stem específico y directo según categoría
      let stem = '';
      if (table.category === 'alternates') {
        stem = `¿Cuáles son los mínimos de planificación para «${row.col1}» según la ${table.title}?`;
      } else if (table.category === 'memory-items') {
        stem = `¿Cuál es el procedimiento / Memory Item correspondiente a «${row.col1}» en el E195-E2?`;
      } else if (table.category === 'limitations') {
        stem = `¿Cuál es la limitación operacional o valor certificado para «${row.col1}» (${table.subtitle})?`;
      } else if (table.category === 'easa-netjets') {
        stem = `En normativa EASA / CS-25 / NetJets, ¿qué define o qué valores corresponden a «${row.col1}» (${table.title})?`;
      } else if (table.category === 'vfr') {
        stem = `¿Cuáles son los requisitos de visibilidad y separación de nubes para «${row.col1}» en vuelo VFR?`;
      } else if (table.category === 'mass-balance') {
        stem = `En masa y centrado (${table.title}), ¿qué especificación o procedimiento aplica a «${row.col1}»?`;
      } else {
        stem = `Según la tabla «${table.title}», ¿cuál es el requisito o valor establecido para «${row.col1}»?`;
      }

      const options = generatePlausibleDistractors(row, table.rows, table.headers, table);

      // Explicación enriquecida con desglose de columnas
      let explanationText = `### 📊 ${table.title}\n`;
      explanationText += `* **Elemento:** \`${row.col1}\`\n`;
      if (row.col2) explanationText += `* **${table.headers[1] || 'Valor Principal'}:** ${row.col2}\n`;
      if (row.col3) explanationText += `* **${table.headers[2] || 'Valor Secundario'}:** ${row.col3}\n`;
      if (row.col4) explanationText += `* **${table.headers[3] || 'Condición / Procedimiento'}:** ${row.col4}\n`;
      if (row.col5) explanationText += `* **${table.headers[4] || 'Impacto / Observaciones'}:** ${row.col5}\n`;
      if (row.notes) explanationText += `\n> 💡 **Nota Operacional:** ${row.notes}\n`;

      flashcards.push({
        id: qId,
        subject_id: 'operational-tables',
        learning_objective: `${table.badge}: ${table.title} - ${row.col1}`,
        stem,
        options,
        explanation: {
          text: explanationText,
          references: [table.manualRef]
        },
        metadata: {
          difficulty: 0.5
        },
        _category: 'operational-tables',
        _subtopic: table.category
      });
    });
  });

  return flashcards;
}

/**
 * Obtiene flashcards de tablas filtradas por categoría de tabla
 */
export function getTableFlashcardsByCategory(category: string): Question[] {
  const all = getAllTableFlashcards();
  if (category === 'all' || category === 'custom_all_tables') return all;
  return all.filter((q) => q._subtopic === category);
}

/**
 * Obtiene flashcards de una tabla específica por su ID
 */
export function getTableFlashcardsByTableId(tableId: string): Question[] {
  const prefix = `TAB-FC-${tableId.toUpperCase().replace(/[^A-Z0-9]/g, '-')}-`;
  return getAllTableFlashcards().filter((q) => q.id.startsWith(prefix));
}
