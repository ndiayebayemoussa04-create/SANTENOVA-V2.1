# MODEL_GOVERNANCE.md — Registre des Modèles d'Intelligence Artificielle

## 1. Cycle de Vie des Modèles
Chaque modèle est enregistré avec les attributs :
- `model_id` : Identifiant immuable
- `name` : Nom lisible
- `version` : Numéro de version sémantique
- `domain` : Champ d'application clinique
- `provider` : Entité ou laboratoire émetteur
- `status` : `ACTIVE` | `TEST` | `DEPRECATED` | `ROLLBACK`
- `risk_level` : `LOW` | `MEDIUM` | `HIGH` | `CRITICAL`
- `evaluation_score` : Note de benchmark clinique certifié
- `created_at` : Date d'homologation

## 2. Règle de Rollback
Tout incident qualité ou signalement de régression permet un retour immédiat à la version précédente en moins de 30 secondes sans redémarrage de la plateforme.
