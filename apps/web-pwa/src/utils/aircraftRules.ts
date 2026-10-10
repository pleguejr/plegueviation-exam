import { Question } from '../types';

export type AircraftFleet = 'c172f' | 'da40d' | 'e195e2' | 'binter_ops' | 'general';

/**
 * Identifica con precisión la flota o categoría de aeronave/operación de una pregunta.
 */
export function getQuestionFleet(q: Question): AircraftFleet {
  const id = q.id || '';
  const cat = q._category || '';
  const sub = q.subject_id || '';

  if (id.startsWith('C172') || cat === 'fleet-c172f' || sub.startsWith('c172')) {
    return 'c172f';
  }
  if (id.startsWith('DA40') || cat === 'fleet-da40d' || sub.startsWith('da40')) {
    return 'da40d';
  }
  if (
    id.startsWith('E195') ||
    id.startsWith('SIM-') ||
    id.startsWith('E2-') ||
    cat === 'fleet-e195e2' ||
    cat === 'simulador-e2' ||
    sub.startsWith('e195') ||
    sub.startsWith('sim_e2')
  ) {
    return 'e195e2';
  }
  if (
    id.startsWith('CMD') ||
    id.startsWith('MOA') ||
    cat === 'command-upgrade' ||
    cat === 'binter-ops' ||
    sub.startsWith('cmd') ||
    sub.startsWith('moa')
  ) {
    return 'binter_ops';
  }
  return 'general';
}

/**
 * Determina si se debe mostrar el Cuadro Resumen de Velocidades para aeronaves ligeras (C172F / DA40D).
 * Garantiza de forma estricta que NUNCA se mostrará una tabla de velocidades de monomotores
 * en preguntas de Comandante / Binter Ops / Embraer 195-E2 / Normativa general.
 */
export function getSpeedSummaryTableType(q: Question): 'c172f' | 'da40d' | null {
  const fleet = getQuestionFleet(q);
  
  // Solamente las flotas ligeras compatibles tienen tablas de velocidades asignadas
  if (fleet !== 'c172f' && fleet !== 'da40d') {
    return null;
  }

  const id = q.id || '';
  const stem = (q.stem || '').toLowerCase();
  const sub = (q.subject_id || '').toLowerCase();

  const isSpeedTopic =
    id.includes('SPD') ||
    id.includes('LIM') ||
    id.includes('VEL') ||
    id.includes('PERF') ||
    id.includes('NORM') ||
    sub.includes('limitaciones') ||
    sub.includes('operacion-normal') ||
    id.includes('PERF') ||
    sub.includes('velocidad') ||
    sub.includes('limitaciones') ||
    sub.includes('performance') ||
    stem.includes('kias') ||
    stem.includes('kcas') ||
    stem.includes('vne') ||
    stem.includes('vno') ||
    stem.includes('vfe') ||
    stem.includes('vso') ||
    stem.includes('vs1') ||
    stem.includes('vglide') ||
    stem.includes('velocidad de nunca exceder') ||
    stem.includes('velocidad de maniobra') ||
    stem.includes('velocidad de rotación') ||
    stem.includes('velocidad de mejor planeo') ||
    stem.includes('mejor régimen de subida') ||
    stem.includes('mejor ángulo de subida');

  return isSpeedTopic ? fleet : null;
}

/**
 * Determina si se debe mostrar la tabla de Mínimos de Planificación o Combustible (MOA 8.1.7).
 * Garantiza de forma estricta que estas tablas operacionales de aerolínea SOLO se muestren
 * en preguntas de Binter Ops / Command Upgrade.
 */
export function getPlanningMinimaTableType(q: Question): 'variaciones' | 'fuel_calls' | null {
  const fleet = getQuestionFleet(q);
  if (fleet !== 'binter_ops') {
    return null;
  }

  const stem = (q.stem || '').toLowerCase();
  const sub = (q.subject_id || '').toLowerCase();

  if (
    sub.includes('aerodromos') ||
    sub.includes('minimos') ||
    stem.includes('mínimos de planificación') ||
    stem.includes('plan básico con variaciones') ||
    stem.includes('8.1.7.2')
  ) {
    return 'variaciones';
  }

  if (
    sub.includes('combustible') ||
    stem.includes('minimum fuel') ||
    stem.includes('mayday fuel') ||
    stem.includes('reserva final') ||
    stem.includes('8.1.7.3')
  ) {
    return 'fuel_calls';
  }

  return null;
}
