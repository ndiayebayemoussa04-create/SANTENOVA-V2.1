# RAG.md — Retrieval-Augmented Generation Médical Sécurisé

## Pipeline RAG Déployé
```
DOCUMENT BRUT
      ↓
SEGMENTATION (Chunks normalisés avec métadonnées de page et section)
      ↓
INDEXATION SÉMANTIQUE & EMBEDDINGS
      ↓
RECHERCHE & CLASSEMENT PAR PERTINENCE
      ↓
VÉRIFICATION D'ANCRAGE (GROUNDING CHECK)
      ↓
GÉNÉRATION CONTRÔLÉE AVEC EXTRACTION DE CITATIONS
      ↓
DOUBLE RESTITUTION :
- Version Professionnelle (Concise, biomédicale avec citations)
- Version Patiente (Langage clair, sans jargon, multilingue)
```

## Principe de Zéro Hallucination
Si la question ne trouve aucun point d'ancrage dans les documents ingérés (ex. demande de posologie d'insuline alors que la patiente n'est pas diabétique) :
Le RAG bloque la réponse et émet le message standardisé :
*"Informations insuffisantes pour répondre avec confiance. Aucun élément du dossier ne mentionne cette donnée."*
