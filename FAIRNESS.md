# FAIRNESS.md — Équité Algorithmique & Parité (/fairness)

## 1. Métriques de Contrôle
Pour chaque modèle en production, SantéNova mesure en continu :
- **Sensibilité (Sensitivity / Recall)**
- **Spécificité (Specificity)**
- **Précision (PPV)**
- **Taux de Faux Positifs (FPR)**
- **Taux de Faux Négatifs (FNR)**
- **Erreur de Calibrage**

## 2. Sous-groupes d'Évaluation
- Globalité des patients
- Locuteurs Wolof et bilingues (Afrique de l'Ouest)
- Femmes de 40 à 60 ans (Risque cardiovasculaire)
- Zones rurales à connectivité limitée (SMS / USSD)

## 3. Dispositif FAIRNESS_ALERT
Si l'écart de performance entre la cohorte générale et une sous-population dépasse le seuil critique (&gt; 5%), une alerte `FAIRNESS_ALERT` suspend automatiquement les déploiements de nouvelles versions du modèle incriminé.
