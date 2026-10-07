# WORKFLOW.md — Moteur de Workflows Cliniques & Évolution

## 1. Cycle de Vie d'un Workflow
Chaque processus suit la machine à états :
`EVENT → ANALYSIS → DECISION → WORKFLOW → ACTION → VERIFICATION → AUDIT → EVOLUTION`

## 2. Invariants de Sécurité
- Tous les workflows sont versionnés (v2.1.0).
- Les actions sont réversibles (Rollback).
- Aucune décision à risque n'est exécutée sans passage par le sas d'arbitrage `HUMAN_REVIEW_REQUIRED`.

## 3. Moteur d'Évolution (Evolution Engine)
L'IA peut suggérer des optimisations de formulation ou d'organisation, mais ces propositions doivent impérativement être validées par un humain avant versioning, tests et déploiement en production.
