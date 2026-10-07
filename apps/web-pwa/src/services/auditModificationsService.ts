export type TargetModule =
  | 'command-upgrade'
  | 'fleet-e195e2'
  | 'netjets'
  | 'operational-tables'
  | 'p2010'
  | 'c172n'
  | 'general';

export type ModificationPriority = 'urgent' | 'high' | 'normal';
export type ModificationStatus = 'pending' | 'in_progress' | 'completed';

export interface AuditModificationItem {
  id: string;
  title: string;
  description?: string;
  targetModule: TargetModule;
  priority: ModificationPriority;
  status: ModificationStatus;
  createdAt: string;
  completedAt?: string;
}

const STORAGE_KEY = 'plegue_audit_modifications_v1';

const DEFAULT_ITEMS: AuditModificationItem[] = [
  {
    id: 'mod-seed-001',
    title: 'Verificación exhaustiva de distractores y opciones en Banco Command Course',
    description: 'Asegurar que todas las opciones mantengan longitud equilibrada (±15%) y no contengan pistas ni justificaciones entre paréntesis.',
    targetModule: 'command-upgrade',
    priority: 'high',
    status: 'in_progress',
    createdAt: new Date().toISOString()
  },
  {
    id: 'mod-seed-002',
    title: 'Actualizar y verificar tablas de mínimos de planificación (Tabla 1A y 1B)',
    description: 'Comprobar fidelidad absoluta con el MOA 8.1.7.2.5 y 8.1.7.2.6 en todos los reactivos de alternativos.',
    targetModule: 'operational-tables',
    priority: 'urgent',
    status: 'completed',
    createdAt: new Date().toISOString(),
    completedAt: new Date().toISOString()
  }
];

export function getAuditModifications(): AuditModificationItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ITEMS));
      return DEFAULT_ITEMS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_ITEMS;
  } catch (e) {
    console.error('Error reading audit modifications from localStorage', e);
    return DEFAULT_ITEMS;
  }
}

export function saveAuditModification(
  item: Omit<AuditModificationItem, 'id' | 'createdAt'> & { id?: string }
): AuditModificationItem[] {
  const current = getAuditModifications();
  const now = new Date().toISOString();

  if (item.id) {
    // Update existing
    const index = current.findIndex((x) => x.id === item.id);
    if (index >= 0) {
      current[index] = {
        ...current[index],
        ...item,
        id: item.id,
        completedAt: item.status === 'completed' && !current[index].completedAt ? now : current[index].completedAt
      };
    }
  } else {
    // Add new
    const newItem: AuditModificationItem = {
      ...item,
      id: `mod-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      createdAt: now
    };
    current.unshift(newItem);
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch (e) {
    console.error('Error saving audit modifications', e);
  }
  return current;
}

export function deleteAuditModification(id: string): AuditModificationItem[] {
  const current = getAuditModifications().filter((x) => x.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch (e) {
    console.error('Error deleting audit modification', e);
  }
  return current;
}

export function toggleAuditModificationStatus(id: string): AuditModificationItem[] {
  const current = getAuditModifications();
  const item = current.find((x) => x.id === id);
  if (item) {
    if (item.status === 'completed') {
      item.status = 'pending';
      item.completedAt = undefined;
    } else {
      item.status = 'completed';
      item.completedAt = new Date().toISOString();
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    } catch (e) {
      console.error('Error toggling status', e);
    }
  }
  return current;
}

export function clearCompletedModifications(): AuditModificationItem[] {
  const current = getAuditModifications().filter((x) => x.status !== 'completed');
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch (e) {
    console.error('Error clearing completed modifications', e);
  }
  return current;
}

export function generateAuditDirectivesMarkdown(items?: AuditModificationItem[]): string {
  const list = items || getAuditModifications();
  const pending = list.filter((x) => x.status !== 'completed');
  const completed = list.filter((x) => x.status === 'completed');

  let md = `# 📋 Directrices y Peticiones de Modificación para Auditoría (Plegueviation)\n\n`;
  md += `*Fecha de generación:* ${new Date().toLocaleString('es-ES')}\n\n`;

  if (pending.length > 0) {
    md += `## ⏳ Peticiones Pendientes de Implementación (${pending.length})\n\n`;
    pending.forEach((item, idx) => {
      const pBadge = item.priority === 'urgent' ? '🔴 [URGENTE]' : item.priority === 'high' ? '🟠 [ALTA]' : '🟡 [NORMAL]';
      const mBadge = `[${item.targetModule.toUpperCase()}]`;
      md += `### ${idx + 1}. ${pBadge} ${mBadge} ${item.title}\n`;
      if (item.description) {
        md += `${item.description}\n\n`;
      } else {
        md += `\n`;
      }
    });
  } else {
    md += `*No hay modificaciones pendientes.*\n\n`;
  }

  if (completed.length > 0) {
    md += `## ✅ Modificaciones ya Completadas (${completed.length})\n\n`;
    completed.forEach((item, idx) => {
      md += `- [x] **[${item.targetModule}]** ${item.title}\n`;
    });
  }

  return md;
}
