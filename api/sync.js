// api/sync.js - Vercel Serverless Function para Sincronización Multi-Dispositivo de Plegueviation Exam

// Almacén en memoria persistido en warm-containers
const inMemoryStore = new Map();

export default async function handler(req, res) {
  // Configuración de CORS para permitir peticiones desde cualquier origen (iPad, iPhone, Localhost, Vercel)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { pin } = req.query;

  if (req.method === 'GET') {
    if (!pin) {
      return res.status(400).json({ error: 'Falta el parámetro pin' });
    }

    const cleanPin = pin.trim().toLowerCase();
    const data = inMemoryStore.get(cleanPin);

    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json({ error: 'No se encontraron datos para este PIN' });
    }
  }

  if (req.method === 'POST') {
    const body = req.body || {};
    const targetPin = (body.pin || pin || '').trim().toLowerCase();
    const payload = body.data || body;

    if (!targetPin) {
      return res.status(400).json({ error: 'PIN no proporcionado en la petición' });
    }

    inMemoryStore.set(targetPin, payload);
    return res.status(200).json({ 
      success: true, 
      message: 'Progreso sincronizado en la nube con éxito',
      syncedAt: Date.now() 
    });
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
