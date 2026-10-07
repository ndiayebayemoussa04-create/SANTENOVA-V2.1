# SECURITY.md & AI_SAFETY.md — Règles de Sécurité Absolues

## 1. Interdictions Formelles (Hard Constraints)
SantéNova est techniquement et contractuellement bridé pour ne **JAMAIS** :
1. Émettre un diagnostic clinique autonome (seul le soignant qualifié diagnostique).
2. Prescrire une spécialité pharmaceutique ou modifier une posologie existante.
3. Affirmer une probabilité comme une certitude médicale.
4. Extrapoler une donnée absente du dossier (Anti-Hallucination stricte).
5. Exposer des identifiants ou des données cliniques sur des canaux non chiffrés (SMS/USSD).

## 2. Déclenchement de la Revue Humaine (HUMAN_REVIEW_REQUIRED)
Toute situation présentant un risque clinique ou une incertitude bascule automatiquement le statut sur :
`status = HUMAN_REVIEW_REQUIRED`

Conditions de bascule :
- Score de confiance RAG inférieur à 70%.
- Détection d'un symptôme critique d'alerte (céphalées intenses soudaines, pic tensionnel > 160/100, myalgies sous statines).
- Proposition d'examen ou d'orientation médicale.

## 3. Règle de Non-Invention (Anti-Hallucination)
En l'absence de passage textuel directement corroborant la question posée, le système répond obligatoirement :
*"Informations insuffisantes pour répondre avec confiance. Aucun élément du dossier ne mentionne cette donnée."*
