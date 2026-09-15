export type ComunicadoType =
  | 'notificacion'
  | 'comunicado-interno'
  | 'comunicado-ops'
  | 'circular'
  | 'otro';

export interface OperationalComunicado {
  id: string;
  title: string;
  type: ComunicadoType;
  reference: string;
  issuedAt: string;
  summary: string;
  createdAt: number;
  updatedAt: number;
  importedQuestionCount: number;
  lastImportAt?: number | null;
  sourceFileName?: string;
  extractedText?: string;
  extractedPages?: number;
}

export const COMUNICADO_TYPES: Array<{ id: ComunicadoType; label: string }> = [
  { id: 'notificacion', label: 'Notificación operativa' },
  { id: 'comunicado-interno', label: 'Comunicado interno' },
  { id: 'comunicado-ops', label: 'Comunicado de operaciones' },
  { id: 'circular', label: 'Circular / nota de servicio' },
  { id: 'otro', label: 'Otro' }
];
