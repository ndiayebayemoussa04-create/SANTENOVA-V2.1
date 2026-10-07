# PLUGIN_SYSTEM.md — Architecture Modulaire & Permissions

## 1. Contrat de Plugin (Plug-in / Plug-out)
Chaque module fonctionnel est isolé :
- `plug-rag` : Document RAG Core (Permissions : `READ_DOCS`)
- `plug-vision` : Vision AI (Permissions : `READ_DOCS`)
- `plug-genomics` : Genomics & Polygenic Risk (Permissions : `READ_GENOMICS`, Consentement : `RESEARCH`)
- `plug-wearable` : Wearable Longitudinal Trends (Permissions : `READ_BIOMETRICS`, Consentement : `PERSONALIZATION`)
- `plug-nudge` : Compassionate Nudge AI (Permissions : `EMIT_NUDGE`, Consentement : `PERSONALIZATION`)
- `plug-exposome` : Exposome & Territorial Context (Permissions : `READ_LOCATION`, Consentement : `PUBLIC_HEALTH`)

## 2. Cloisonnement
Aucun plugin ne peut accéder à une catégorie de données pour laquelle le consentement n'est pas actif dans le Trust Center.
