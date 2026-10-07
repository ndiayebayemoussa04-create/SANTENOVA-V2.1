"""
SantéNova v2.1 — Challenge Edition
Backend API (FastAPI / Swagger Documentation)
Compatible Déploiement Mac & Linux CPU / AMD ROCm
"""

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime

app = FastAPI(
    title="SantéNova v2.1 API — Challenge Edition",
    description="API de coordination médicale, RAG sécurisé et arbitrage éthique en santé.",
    version="2.1.0"
)

# Patient Data
MOCK_PATIENT = {
    "id": "PAT-NDIAYE-2026-042",
    "full_name": "Awa Ndiaye",
    "age": 42,
    "gender": "Féminin",
    "primary_language": "fr",
    "spoken_languages": ["fr", "wo", "en"],
    "city": "Dakar & Paris",
    "allergies": ["Pénicilline", "Arachides"],
    "current_medications": [
        {"name": "Amlodipine", "dosage": "5 mg", "frequency": "1/jour matin"},
        {"name": "Atorvastatine", "dosage": "10 mg", "frequency": "1/jour soir"}
    ],
    "is_fictional_demo": True
}

# In-memory Human Review cases
HUMAN_REVIEW_CASES = [
    {
        "id": "REV-2026-001",
        "title": "Validation de prescription MAPA 24h & Bilan de contrôle",
        "patient_id": "PAT-NDIAYE-2026-042",
        "risk_level": "HIGH",
        "status": "HUMAN_REVIEW_REQUIRED",
        "ai_suggested_action": "Confirmer pose MAPA 24h et bilan rénal/lipidique.",
        "reviewer_notes": "",
        "reviewed_by": None
    },
    {
        "id": "REV-2026-003",
        "title": "Validation de surveillance échographique à 6 mois (Nodule mammaire 7 mm ACR 3)",
        "patient_id": "PAT-NDIAYE-2026-042",
        "risk_level": "HIGH",
        "status": "HUMAN_REVIEW_REQUIRED",
        "ai_suggested_action": "Valider protocole de contrôle échographique à M6 sans examen invasif superflu.",
        "reviewer_notes": "",
        "reviewed_by": None
    }
]

CANCER_SCREENING_DATA = {
    "patient_id": "PAT-NDIAYE-2026-042",
    "screening_records": [
        {
            "organ": "SEIN",
            "modality": "Mammographie numérique 2D/3D + Échographie",
            "date": "2026-02-12",
            "classification": "ACR 3 (Sein Droit 7mm) / ACR 2 (Sein Gauche normal)",
            "interpretation": "Lésion très probablement bénigne (kyste simple ou fibroadénome, VPP < 2%)",
            "follow_up": "Échographie de contrôle unilatérale à 6 mois (Août 2026)",
            "clinician_status": "HUMAN_REVIEW_REQUIRED"
        },
        {
            "organ": "COL_UTERUS",
            "modality": "Frottis cervico-utérin cytologique",
            "date": "2026-02-12",
            "classification": "Bethesda NILM",
            "interpretation": "Strictement normal (absence de cellule maligne)",
            "follow_up": "Dépistage selon calendrier à 3 ans",
            "clinician_status": "APPROVED"
        }
    ],
    "onco_prevention_pillars": {
        "aerobic_exercise": "30 min 4x/semaine (protecteur prouvé)",
        "diet": "Légumineuses & antioxydants, réduction sel",
        "toxics": "Zéro tabac, zéro alcool"
    }
}

class RAGQueryRequest(BaseModel):
    query: str

class ReviewDecisionRequest(BaseModel):
    status: str
    reviewer_name: str
    reviewer_notes: str

@app.get("/api/health")
def get_health():
    return {
        "status": "HEALTHY",
        "version": "2.1.0",
        "edition": "Challenge Jury 2026",
        "timestamp": datetime.utcnow().isoformat()
    }

@app.get("/api/patient")
def get_patient():
    return MOCK_PATIENT

@app.get("/api/cancer-screening")
def get_cancer_screening():
    return CANCER_SCREENING_DATA

@app.post("/api/rag/query")
def execute_rag(req: RAGQueryRequest):
    q = req.query.lower()
    if "insuline" in q or "cancer" in q:
        return {
            "has_sufficient_info": False,
            "answer_fr": "Informations insuffisantes pour répondre avec confiance. Aucun élément du dossier ne mentionne cette donnée.",
            "confidence_score": 0.12,
            "safety_status": "HUMAN_REVIEW_REQUIRED",
            "citations": []
        }
    return {
        "has_sufficient_info": True,
        "answer_fr": "Patiente Awa Ndiaye : Traitement par Amlodipine 5mg le matin et Atorvastatine 10mg le soir. Surveillance MAPA 24h programmée.",
        "confidence_score": 0.94,
        "safety_status": "AUTO_SAFE",
        "citations": [
            {"document": "Lettre consultation Dr. Fall", "section": "Conduite à tenir", "score": 96}
        ]
    }

@app.get("/api/reviews")
def get_reviews():
    return HUMAN_REVIEW_CASES

@app.post("/api/reviews/{case_id}/decision")
def post_decision(case_id: str, dec: ReviewDecisionRequest):
    for c in HUMAN_REVIEW_CASES:
        if c["id"] == case_id:
            c["status"] = dec.status
            c["reviewer_notes"] = dec.reviewer_notes
            c["reviewed_by"] = dec.reviewer_name
            return {"success": True, "case": c}
    raise HTTPException(status_code=404, detail="Case not found")

@app.get("/api/compute/status")
def get_compute_status():
    return {
        "provider": "AMDROCmProvider",
        "gpu_active": True,
        "latency_ms": 28.4,
        "cpu_fallback_ready": True
    }
