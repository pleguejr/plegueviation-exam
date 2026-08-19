// apps/web-pwa/api/sync.js - Vercel Serverless Function para Sincronización Multi-Dispositivo de Plegueviation Exam

if (!globalThis._plegueSyncStore) {
  globalThis._plegueSyncStore = new Map();
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

  const pin = req.query?.pin || (req.body && req.body.pin);

  // GET: Obtener datos de sincronización del PIN
  if (req.method === 'GET') {
    if (!pin) {
      return res.status(400).json({ error: 'Falta el parámetro pin' });
    }

    const cleanPin = String(pin).trim().toLowerCase();
    const data = globalThis._plegueSyncStore.get(cleanPin);

    if (data) {
      return res.status(200).json({ found: true, data });
    } else {
      return res.status(200).json({ found: false, data: null });
    }
  }

  // POST / PUT: Guardar o actualizar progreso para el PIN
  if (req.method === 'POST' || req.method === 'PUT') {
    const body = req.body || {};
    const targetPin = String(body.pin || pin || '').trim().toLowerCase();
    const payload = body.data !== undefined ? body.data : body;

    if (!targetPin) {
      return res.status(400).json({ error: 'PIN no proporcionado en la petición' });
    }

    globalThis._plegueSyncStore.set(targetPin, payload);

    return res.status(200).json({ 
      success: true, 
      message: 'Progreso sincronizado en la nube con éxito',
      syncedAt: Date.now() 
    });
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
