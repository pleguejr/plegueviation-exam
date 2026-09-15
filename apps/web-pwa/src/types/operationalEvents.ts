export type OperationalEventSource = 'vuelo-real' | 'simulador' | 'entrenamiento' | 'otro';

export interface OperationalEvent {
  id: string;
  title: string;
  source: OperationalEventSource;
  aircraft: string;
  occurredAt: string;
  narrative: string;
  lesson: string;
  tags: string[];
  createdAt: number;
  updatedAt: number;
  linkedQuestionId?: string | null;
}

export const OPERATIONAL_EVENT_SOURCES: Array<{ id: OperationalEventSource; label: string }> = [
  { id: 'vuelo-real', label: 'Vuelo real' },
  { id: 'simulador', label: 'Simulador' },
  { id: 'entrenamiento', label: 'Entrenamiento / briefing' },
  { id: 'otro', label: 'Otro' }
];
