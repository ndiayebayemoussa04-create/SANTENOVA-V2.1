# ARCHITECTURE.md — Architecture Système SantéNova v2.1

## 1. Vue d'Ensemble
L'architecture de SantéNova s'articule autour d'un pipeline d'orchestration asynchrone gouverné par le Safety Engine :

```
[ Événement Clinique / Requête ]
                ↓
    [ Contexte & Consentement ]
                ↓
           [ Routeur IA ]
                ↓
 [ Module Spécialisé (RAG, Vision, Genomics, Wearable, Nudge, Exposome) ]
                ↓
        [ Safety Engine ]
     (Filtres Anti-Diagnostic,
      Seuil Confiance & Red Flags)
                ↓
    [ Statut Décisionnel ]
    - AUTO_SAFE
    - HUMAN_REVIEW_REQUIRED
    - REJECTED
                ↓
    [ Workflow & Action Soignante ]
                ↓
     [ Registre d'Audit Immuable ]
```

## 2. Composants Principaux
- **RAG Engine** : Recherche vectorielle et lexicale sur documents cliniques chunkés avec extraction de citations strictes.
- **Safety Engine** : Moteur de règles déterministes vérifiant l'absence d'assertion diagnostique non autorisée, de prescription ou de modification de posologie.
- **Trust Center** : Gestionnaire de consentement par finalité (`CARE`, `PERSONALIZATION`, `RESEARCH`, `PUBLIC_HEALTH`, `COMMUNICATION`).
- **Compute Provider** : Détection dynamique AMD ROCm™ avec repli sans latence sur CPU multi-cœur.
