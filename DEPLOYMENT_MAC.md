# DEPLOYMENT_MAC.md — Guide de Déploiement Local sur macOS

## 1. Prérequis
- macOS Sonoma ou version ultérieure (Apple Silicon M1/M2/M3/M4 ou Intel)
- Node.js >= 18.x
- Python >= 3.10

## 2. Déploiement Frontend
```bash
# À la racine du projet :
npm install
npm run dev
# L'interface web est accessible sur http://localhost:3000
```

## 3. Déploiement Backend Python (FastAPI / Swagger)
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
uvicorn backend.app:app --reload --port 8000
# L'API Swagger interactive est disponible sur http://localhost:8000/docs
```

## 4. Vérification et Tests
```bash
npm run lint
```
L'application fonctionne de manière autonome et sécurisée, sans nécessiter d'accès GPU externe grâce au fallback CPU optimisé.
