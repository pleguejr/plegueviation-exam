// api/sync.js - Vercel Serverless Function para Sincronización Multi-Dispositivo de Plegueviation Exam
import fs from 'fs';
import path from 'path';

if (!globalThis._plegueSyncStore) {
  globalThis._plegueSyncStore = new Map();
}

function normalizePin(pin) {
  const p = String(pin || '').trim().toLowerCase();
  if (!p || p === 'plegue' || p === 'plegue-mando' || p === 'pleguejr' || p === '070707') {
    return '070707';
  }
  return p;
}

function getFallbackData() {
  const possiblePaths = [
    path.join(process.cwd(), 'banks', 'user_backup_070707.json'),
    path.join(process.cwd(), 'apps', 'web-pwa', 'public', 'banks', 'user_backup_070707.json'),
    path.join(process.cwd(), 'public', 'banks', 'user_backup_070707.json')
  ];
  for (const p of possiblePaths) {
    try {
      if (fs.existsSync(p)) {
        const raw = fs.readFileSync(p, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (e) {
      // ignore
    }
  }
  return null;
}

export default async function handler(req, res) {
  // Encabezados CORS universales
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const rawPin = req.query?.pin || (req.body && req.body.pin);
  const cleanPin = normalizePin(rawPin);

  // GET: Obtener datos de sincronización del PIN
  if (req.method === 'GET') {
    let data = globalThis._plegueSyncStore.get(cleanPin);

    // Si no está en memoria o es 070707, usar fallback persistente
    if (!data && cleanPin === '070707') {
      data = getFallbackData();
      if (data) {
        globalThis._plegueSyncStore.set('070707', data);
      }
    }

    if (data) {
      return res.status(200).json({ found: true, data });
    } else {
      return res.status(200).json({ found: false, data: null });
    }
  }

  // POST / PUT: Guardar o actualizar progreso para el PIN
  if (req.method === 'POST' || req.method === 'PUT') {
    const body = req.body || {};
    const targetPin = normalizePin(body.pin || rawPin);
    const payload = body.data !== undefined ? body.data : body;

    globalThis._plegueSyncStore.set(targetPin, payload);
    if (targetPin === '070707') {
      globalThis._plegueSyncStore.set('plegue', payload);
      globalThis._plegueSyncStore.set('plegue-mando', payload);
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Progreso sincronizado en la nube con éxito',
      syncedAt: Date.now() 
    });
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
