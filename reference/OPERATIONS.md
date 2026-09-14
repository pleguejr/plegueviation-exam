# Operaciones — Plegueviation Exam

Guía práctica para innovar con seguridad (bancos, sync, rollback).

## Arquitectura en producción

| Pieza | URL / ubicación |
|-------|-----------------|
| PWA (GitHub Pages) | https://pleguejr.github.io/plegueviation-exam/ |
| API sync (Vercel) | https://plegueviation-exam.vercel.app/api/sync |
| Bancos fuente | `banks/` |
| Catálogo compilado | `apps/web-pwa/public/banks/` |
| Motor compartido | `packages/core-engine/` + `shared/` |

## Flujo diario de estudio (iPhone / iPad / Windows)

1. Abre la app → sync automático si hay PIN y red.
2. Estudia / haz exámenes / elimina o marca revisiones.
3. Al terminar un examen se sincroniza solo.
4. Si algo no cuadra: **Ajustes → Historial Local de Recuperación**.

## Añadir / revisar / eliminar preguntas

```bash
# 1. Editar JSON en banks/<flota>/<subtema>/
# 2. Validar y compilar
python3 cli/bin/build_banks.py

# 3. Traer revisiones de la nube (opcional)
python3 cli/bin/sync_reviews.py

# 4. Tests + build local
npm run ci

# 5. Commit y push a main (o PR)
```

- **Eliminaciones permanentes del catálogo:** añadir ID a `banks/deleted_questions.json` y recompilar.
- **Eliminaciones en dispositivo:** van a IndexedDB y se propagan por sync (merge por `deletedAt`).

## Sync cloud durable (obligatorio en Vercel)

Ver [`SYNC_SETUP.md`](SYNC_SETUP.md).

Tras configurar Upstash/KV, en Sync Modal debe aparecer:
**Almacenamiento: Persistente (KV / Upstash)**

## Rollback

### Datos de usuario
- Snapshot local (Ajustes) — últimos 5
- Backup JSON exportado manualmente

### Versión de la app
```bash
# Crear release etiquetada
git tag v3.2.2
git push origin v3.2.2

# Volver a una versión anterior
git revert <commit>
git push origin main
# o redeploy de un tag anterior vía Actions → Release
```

## Checklist antes de cada mejora grande

- [ ] `npm run ci` en verde
- [ ] Exportar backup JSON desde un dispositivo
- [ ] PR (no push directo a main si el cambio es grande)
- [ ] Tras merge, forzar update PWA en iPad/iPhone (botón Actualizar)
- [ ] Verificar Sync Modal → almacenamiento `kv`
