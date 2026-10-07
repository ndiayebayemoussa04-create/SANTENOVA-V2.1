# SantéNova v2.1 — Challenge Edition

> **Projet présenté dans le cadre du Challenge "Santé et Bien-être" (Édition 2026)**
> *"Rendre une partie du parcours du patient plus sûre, plus claire ou plus facile."*

---

## 1. Vue d'Ensemble & Mission
SantéNova v2.1 est une plateforme technologique d’assistance et d’orchestration médicale responsable. Elle répond directement aux cinq défis majeurs du parcours patient identifiés par le jury :
1. **La longueur et complexité des documents de santé**
2. **La dispersion des informations** entre structures et pays (Paris / Dakar)
3. **La répétition des tâches administratives**
4. **Les barrières linguistiques et culturelles** (Français, Wolof, Anglais)
5. **Le manque de temps des soignants** et l’incompréhension des patients

---

## 2. Règle d'Or et Sécurité Absolue
SantéNova **ne pose aucun diagnostic autonome**, **ne prescrit ni ne modifie aucun traitement**, et **ne remplace pas un médecin**.
- **Incertitude Visible** : lorsque les données sont absentes ou insuffisantes, le système répond sans détour : *"Informations insuffisantes pour répondre avec confiance."*
- **Revue Humaine Obligatoire** : toute proposition clinique sensible est verrouillée avec le statut `HUMAN_REVIEW_REQUIRED` jusqu'à arbitrage explicite d'un médecin (`APPROUVER` / `REJETER`).
- **Ancrage RAG Traçable** : chaque affirmation est adossée à une citation textuelle avec référence du document et indice de confiance.

---

## 3. Scénario de Démonstration Fictif : Awa Ndiaye (42 ans)
Le scénario déploie 10 étapes interactives :
1. Admission & consentement éclairé
2. Réception et indexation des 5 documents de santé (FR/EN)
3. Extraction sémantique & chunking biomédical
4. Résumé du dossier en double version (Professionnel vs Patient)
5. Préparation de la consultation cardiologique (checklist et questions sans diagnostic)
6. Navigation des soins & arbitrage humain (MAPA 24h)
7. Communication multilingue en Wolof, Français et Anglais avec synthèse audio
8. Instructions de sortie didactiques et signaux d'alerte (urgences 15 / 1515)
9. Bien-être et Nudge AI bienveillant (sommeil, activité douce, gestion du sel)
10. Mesure d'impact avant/après simulation

---

## 4. Démarrage Rapide

### Frontend (React 19 + TypeScript + Tailwind CSS)
```bash
npm install
npm run dev
# L'application est disponible sur http://localhost:3000
```

### Backend (Python FastAPI / Swagger)
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
uvicorn backend.app:app --reload --port 8000
# Documentation Swagger interactive sur http://localhost:8000/docs
```

### Docker
```bash
docker-compose up --build
```

---

## 5. Support Matériel AMD ROCm & CPU
SantéNova intègre l'abstraction `ComputeProvider` :
- Accélération sur **AMD ROCm™ (Radeon / Instinct)** si disponible
- Fallback automatique transparent sur **CPU** sans interruption de service
