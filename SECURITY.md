# SECURITY.md — Sécurité des Données de Santé & Conformité HDS

## 1. Chiffrement et Protection au Repos
- Chiffrement symétrique AES-GCM 256 bits pour tous les textes cliniques et vecteurs.
- Ségrégation stricte des identifiants patients (PII) et des métriques cliniques agrégées.

## 2. Authentification et Contrôle d'Accès
- Authentification multifacteur (MFA) pour le personnel soignant.
- Rôles distincts : JURY (mode démonstration), PATIENT (vue didactique), CLINICIAN (arbitrage et données brutes), ADMIN (gouvernance et audit).

## 3. Conformité Réglementaire
- Alignement sur le RGPD (Articles 6, 9 et 22).
- Hébergement certifié Données de Santé (HDS) et conformité Commission de Protection des Données Personnelles (CDP Sénégal).
