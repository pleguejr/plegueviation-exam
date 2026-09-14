# Configuración de Sync Cloud Persistente

La PWA sincroniza progreso (stats, exámenes, eliminaciones, revisiones) entre iPhone, iPad y PC vía `/api/sync` desplegado en Vercel.

## Arquitectura

| Componente | URL |
|----------|-----|
| App estática (PWA) | https://pleguejr.github.io/plegueviation-exam/ |
| API sync | https://plegueviation-exam.vercel.app/api/sync |

## Paso 1 — Crear base de datos KV (Upstash)

1. Entra en [console.upstash.com](https://console.upstash.com)
2. Crea una base Redis (región EU-West recomendada para Canarias)
3. Copia **UPSTASH_REDIS_REST_URL** y **UPSTASH_REDIS_REST_TOKEN**

## Paso 2 — Configurar Vercel

1. Proyecto `plegueviation-exam` en Vercel → **Settings → Environment Variables**
2. Añade:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
3. Redeploy el proyecto

> También funciona con variables `KV_REST_API_URL` / `KV_REST_API_TOKEN` si usas Vercel KV nativo.

## Paso 3 — Verificar

Tras sincronizar desde la app, la respuesta del servidor incluirá:

```json
{
  "success": true,
  "storageBackend": "kv",
  "persisted": true
}
```

Si ves `"storageBackend": "memory"`, las variables no están configuradas y los datos se pierden en cold start.

## Seguridad personal

- Cambia el PIN por defecto en Ajustes → Sync (el PIN `070707` es conocido)
- Exporta backup JSON periódicamente desde Ajustes
- Los snapshots locales (últimos 5) permiten rollback sin cloud

## Rollback de versión de app

```bash
git tag v3.2.0
git push origin v3.2.0
```

GitHub Actions despliega automáticamente tags `v*`.
