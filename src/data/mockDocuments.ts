import { HealthDocument } from '../types';

export const mockHealthDocuments: HealthDocument[] = [
  {
    id: 'DOC-001',
    title: 'Lettre de consultation cardiologique',
    category: 'CONSULTATION_LETTER',
    date: '14 Mars 2026',
    author: 'Dr. Ousmane Fall, Cardiologue',
    institution: 'Clinique de la Madeleine / Hôpital Principal, Dakar',
    language: 'fr',
    rawText: `Cher Confrère,
J'ai revu ce jour en consultation Madame Awa NDIAYE, 42 ans, pour le suivi de son hypertension artérielle essentielle découverte il y a 18 mois.
La patiente rapporte une observance globale satisfaisante mais signale des épisodes intermittents de céphalées matinales et une sensation de fatigue à l'effort au cours des deux dernières semaines.
À l'examen clinique :
- Pression Artérielle : 142/88 mmHg au repos (bras droit), 139/86 mmHg (bras gauche)
- Fréquence Cardiaque : 74 bpm, régulière
- Auscultation cardiopulmonaire : bruits du cœur réguliers sans souffle surajouté, murmure vésiculaire symétrique
- IMC : 26.2 kg/m² (Surpoids léger)

Conclusion et Conduite à tenir :
1. Maintien de l'Amlodipine 5 mg le matin.
2. Réalisation d'une surveillance tensionnelle ambulatoire (MAPA) sur 24 heures pour évaluer la pression nocturne.
3. Bilan biologique de contrôle : ionogramme sanguin, créatininémie, DFG, bilan lipidique complet, glycémie à jeun.
4. Rappel des règles hygiéno-diététiques : limitation des apports sodés (< 5g/jour), maintien d'une activité physique aérobie d'au moins 30 minutes 4 fois par semaine, hydratation régulière.
5. Revoir la patiente avec les résultats du bilan dans 6 semaines.`,
    structuredData: {
      vitalSigns: {
        tension: '142/88 mmHg',
        frequenceCardiaque: '74 bpm',
        imc: '26.2 kg/m²',
      },
      clinicalObservations: [
        'Céphalées matinales intermittentes',
        'Légère asthénie à l effort',
        'Tension artérielle modérément élevée malgré monothérapie',
      ],
      medicationsMentioned: ['Amlodipine 5 mg'],
      recommendations: [
        'Surveillance tensionnelle ambulatoire (MAPA)',
        'Bilan sanguin rénal et lipidique',
        'Régime hyposodé (< 5g/jour)',
        'Activité physique 30 min 4x/semaine',
      ],
      redFlags: ['Céphalées persistantes avec pic tensionnel > 160/95 mmHg requiert contact médical'],
    },
    chunks: [
      {
        id: 'CHK-001-1',
        documentId: 'DOC-001',
        documentTitle: 'Lettre de consultation cardiologique',
        section: 'Examen clinique et constantes',
        page: 1,
        content: `Examen clinique du 14 Mars 2026 : PA 142/88 mmHg au repos, FC 74 bpm régulière. IMC 26.2 kg/m². Céphalées matinales intermittentes rapportées par la patiente.`,
        keywords: ['tension', 'pression', 'céphalées', '142/88', 'examen', 'constantes', 'cardio'],
      },
      {
        id: 'CHK-001-2',
        documentId: 'DOC-001',
        documentTitle: 'Lettre de consultation cardiologique',
        section: 'Conduite à tenir & Examens prescrits',
        page: 1,
        content: `Conduite à tenir : Maintien Amlodipine 5mg matin. Prescription d'une MAPA 24h (Mesure Ambulatoire de la Pression Artérielle). Bilan rénal et lipidique de contrôle sous 6 semaines. Réduction sel < 5g/j.`,
        keywords: ['amlodipine', 'mapa', 'ordonnance', 'bilan', 'sel', 'examens', 'recommandations'],
      },
    ],
  },
  {
    id: 'DOC-002',
    title: "Compte rendu d'hospitalisation de jour — Bilan Métabolique",
    category: 'HOSPITAL_REPORT',
    date: '28 Février 2026',
    author: 'Service de Médecine Interne & Endocrinologie',
    institution: 'Groupe Hospitalier Universitaire Pitié-Salpêtrière, Paris',
    language: 'fr',
    rawText: `COMPTE RENDU D'HOSPITALISATION DE JOUR
Patiente : Madame Awa NDIAYE, née le 22/09/1984
Motif d'admission : Exploration d'une dyslipidémie mixte et évaluation du risque cardiovasculaire global.

Résultats des examens complémentaires :
- Cholestérol Total : 2.45 g/L (N < 2.00)
- HDL-Cholestérol : 0.52 g/L (protecteur)
- LDL-Cholestérol calculé : 1.62 g/L (Cible thérapeutique fixée à < 1.00 g/L selon score de risque SCORE2)
- Triglycérides : 1.55 g/L
- Glycémie à jeun : 0.98 g/L (Normale)
- HbA1c : 5.4 % (Absence de diabète)
- Créatininémie : 72 µmol/L, DFG estimé selon CKD-EPI : 94 mL/min/1.73m² (Fonction rénale conservée)
- Microalbuminurie des 24h : 18 mg/24h (Normale < 30 mg/24h)

Échographie des troncs supra-aortiques (TSA) :
- Épaississement intima-média carotidien bilatéral minime (0.8 mm), sans plaque athéromateuse sténosante.

Synthèse médicale :
Absence d'atteinte d'organe cible infraclinique significative. Le risque cardiovasculaire global est modéré, nécessitant une optimisation thérapeutique pour abaisser le LDL-C.
Introduction d'Atorvastatine 10 mg un comprimé par jour au coucher. Tolérance hépatique et musculaire à contrôler (ASAT, ALAT, CPK) à M3.`,
    structuredData: {
      vitalSigns: {
        ldl: '1.62 g/L (cible < 1.00)',
        cholesterolTotal: '2.45 g/L',
        glycemie: '0.98 g/L',
        dfg: '94 mL/min (normal)',
      },
      clinicalObservations: [
        'Dyslipidémie mixte avec LDL élevé à 1.62 g/L',
        'Fonction rénale et glycémie normales',
        'Échographie carotides sans plaque sténosante',
      ],
      medicationsMentioned: ['Atorvastatine 10 mg'],
      recommendations: [
        'Prise quotidienne du comprimé au coucher',
        'Contrôle prise de sang bilan hépatique et CPK à 3 mois',
      ],
      redFlags: ['Douleurs musculaires inexpliquées (myalgies) à signaler sans interrompre brutalement sans avis'],
    },
    chunks: [
      {
        id: 'CHK-002-1',
        documentId: 'DOC-002',
        documentTitle: "Compte rendu d'hospitalisation de jour — Bilan Métabolique",
        section: 'Résultats biologiques',
        page: 1,
        content: `Bilan lipidique : Cholestérol total 2.45 g/L, LDL-C 1.62 g/L (cible < 1.00 g/L), HDL 0.52 g/L, Triglycérides 1.55 g/L. Glycémie 0.98 g/L normale, DFG rénal 94 mL/min.`,
        keywords: ['cholestérol', 'ldl', 'hdl', 'triglycérides', 'glycémie', 'prise de sang', 'laboratoire'],
      },
      {
        id: 'CHK-002-2',
        documentId: 'DOC-002',
        documentTitle: "Compte rendu d'hospitalisation de jour — Bilan Métabolique",
        section: 'Synthèse et Traitement',
        page: 1,
        content: `Échographie carotides rassurante. Introduction Atorvastatine 10mg au coucher. Contrôle biologique hépatique et musculaire à M3. Risque cardiovasculaire global qualifié de modéré.`,
        keywords: ['atorvastatine', 'carotides', 'statine', 'foie', 'cpk', 'traitement'],
      },
    ],
  },
  {
    id: 'DOC-003',
    title: 'Instructions de sortie & Plan de soins post-hospitalisation',
    category: 'DISCHARGE_NOTE',
    date: '28 Février 2026',
    author: 'Cadre de Santé & Équipe Médicale',
    institution: 'Unité Ambulatoire Polyvalente',
    language: 'fr',
    rawText: `DOCUMENT D'INSTRUCTIONS DE SORTIE REMIS AU PATIENT
Madame Awa NDIAYE,
Votre séjour ambulatoire de ce jour s'est déroulé sans complication. Voici la synthèse de vos consignes de sortie :

1. TRAITEMENTS À DOMICILE :
- Amlodipine 5 mg : 1 comprimé le matin au petit-déjeuner.
- Atorvastatine 10 mg : 1 comprimé le soir au coucher (Nouveau traitement à débuter ce soir).

2. VOS PROCHAINS RENDEZ-VOUS :
- Pose de la MAPA (mesure de la tension sur 24h) : à planifier avec le cabinet de cardiologie du Dr. Fall dans les 3 prochaines semaines.
- Prise de sang de contrôle (ASAT, ALAT, CPK, Bilan lipidique) : dans 3 mois (vers fin Mai 2026).
- Consultation de synthèse : dans 6 semaines avec votre médecin traitant.

3. DOCUMENTS À CONSERVER ET À APPORTER LORS DU PROCHAIN RENDEZ-VOUS :
- Ce présent compte rendu d'hospitalisation.
- Votre carnet d'auto-mesure tensionnelle (relever 3 mesures matin et 3 mesures soir pendant 3 jours avant la consultation).
- Les ordonnances en cours.

4. SIGNAUX D'ALERTE — QUAND CONTACTER UN PROFESSIONNEL DE SANTÉ :
- Céphalées très violentes et inhabituelles avec vertiges ou troubles visuels (mouches volantes).
- Douleurs musculaires diffuses et crampes inexpliquées survenant après le début de l'Atorvastatine.
- Pression artérielle supérieure à 160/100 mmHg répétée à plusieurs reprises.
- En cas d'urgence vitale, composez immédiatement le 15 (SAMU en France) ou le 1515 / urgences locales à Dakar.`,
    structuredData: {
      medicationsMentioned: ['Amlodipine 5 mg matin', 'Atorvastatine 10 mg soir'],
      recommendations: [
        'MAPA 24h dans les 3 semaines',
        'Contrôle biologique fin mai 2026',
        'Rapport d auto-mesure tensionnelle 3 matin / 3 soir pendant 3 jours',
      ],
      redFlags: [
        'Céphalées violentes avec troubles visuels',
        'Douleurs musculaires inexpliquées',
        'Tension > 160/100 mmHg',
      ],
    },
    chunks: [
      {
        id: 'CHK-003-1',
        documentId: 'DOC-003',
        documentTitle: 'Instructions de sortie & Plan de soins post-hospitalisation',
        section: 'Traitements et consignes quotidiennes',
        page: 1,
        content: `Traitements : Amlodipine 5mg matin au petit-déjeuner. Atorvastatine 10mg soir au coucher. Ne pas arrêter sans avis médical.`,
        keywords: ['traitement', 'matin', 'soir', 'medicaments', 'horaires', 'posologie'],
      },
      {
        id: 'CHK-003-2',
        documentId: 'DOC-003',
        documentTitle: 'Instructions de sortie & Plan de soins post-hospitalisation',
        section: 'Signes d alerte et conduite d urgence',
        page: 1,
        content: `Signaux d'alerte : Céphalées violentes avec vertiges ou troubles visuels, myalgies (douleurs musculaires diffuses) après Atorvastatine, ou tension > 160/100 mmHg répétée. Contacter immédiatement un soignant ou composer le 15 / urgences.`,
        keywords: ['urgence', 'alerte', 'douleur musculaire', 'myalgie', 'danger', 'symptomes', 'vertiges'],
      },
    ],
  },
  {
    id: 'DOC-004',
    title: "Questionnaire d'anamnèse et auto-évaluation patiente",
    category: 'PATIENT_INFO',
    date: '20 Février 2026',
    author: 'Rempli par Madame Awa NDIAYE (Portail Patient SantéNova)',
    institution: 'Espace Patient Partagé',
    language: 'fr',
    rawText: `QUESTIONNAIRE PRÉ-CONSULTATION SANTÉNOVA
Nom : NDIAYE
Prénom : Awa
Langue de communication préférée : Français et Wolof pour les explications détaillées.

Mode de vie et ressenti :
- Sommeil : Réveils fréquents vers 4h du matin, temps de sommeil moyen estimé à 5h45 par nuit. Sensation de réveil fatigué.
- Alimentation : Cuisine familiale sénégalaise, goût prononcé pour les plats traditionnels (Thiéboudienne, Yassa), réduction récente du cube bouillon salé mais difficile à tenir lors des repas de famille.
- Activité physique : Marche quotidienne pour les trajets domicile-travail (environ 4 500 pas par jour), pas de sport structuré faute de temps.
- Niveau de stress auto-évalué : 7/10 (charge mentale élevée, déplacements fréquents entre Dakar et Paris, gestion de l'activité professionnelle).
- Difficultés signalées : "J'ai du mal à comprendre la différence entre la pression du matin et celle du soir, et j'ai peur des effets secondaires des médicaments pour le cholestérol dont m'a parlé une amie."`,
    structuredData: {
      clinicalObservations: [
        'Sommeil écourté (5h45/nuit) et non réparateur',
        'Apport en sel parfois difficile à modérer en contexte festif/familial',
        'Activité physique modérée (4500 pas/jour)',
        'Stress perçu élevé (7/10)',
        'Anxiété vis-à-vis des statines et incompréhension des fluctuations tensionnelles',
      ],
      recommendations: [
        'Accompagnement diététique culturellement adapté',
        'Éducation thérapeutique rassurante sur les statines',
      ],
    },
    chunks: [
      {
        id: 'CHK-004-1',
        documentId: 'DOC-004',
        documentTitle: "Questionnaire d'anamnèse et auto-évaluation patiente",
        section: 'Ressenti, sommeil et habitudes',
        page: 1,
        content: `Mode de vie : Sommeil court de 5h45 avec réveils nocturnes. Marche moyenne 4 500 pas/jour. Stress évalué à 7/10. Cuisine sénégalaise appréciée avec effort de diminution du sel.`,
        keywords: ['sommeil', 'stress', 'marche', 'pas', 'alimentation', 'sel', 'mode de vie', 'fatigue'],
      },
      {
        id: 'CHK-004-2',
        documentId: 'DOC-004',
        documentTitle: "Questionnaire d'anamnèse et auto-évaluation patiente",
        section: 'Interrogations et peurs exprimées',
        page: 1,
        content: `Attentes patiente : Crainte formulée au sujet des effets secondaires des médicaments du cholestérol. Besoin d'explications claires en Français et Wolof sur le rôle de la tension.`,
        keywords: ['peur', 'crainte', 'wolof', 'cholesterol', 'effets secondaires', 'questions'],
      },
    ],
  },
  {
    id: 'DOC-005',
    title: 'Echocardiography & Doppler Clinical Assessment (English Report)',
    category: 'LAB_CARDIOLOGY_EN',
    date: '10 January 2026',
    author: 'Dr. Sarah Jenkins, MD, FACC (Consultant Cardiologist)',
    institution: 'International Cardiovascular Diagnostic Center',
    language: 'en',
    rawText: `TRANSTHORACIC ECHOCARDIOGRAM (TTE) REPORT
Patient: NDIAYE, Awa | Female | Age: 42
Indication: Assessment of systemic hypertension impact and left ventricular geometry.

Findings:
1. Left Ventricle (LV): Normal chamber dimensions (LVEDD: 46 mm, LVESD: 28 mm). Mild concentric remodeling with preserved systolic function.
2. Ejection Fraction (LVEF): 62% (Normal range: 55-70%). No regional wall motion abnormalities detected.
3. Diastolic Function: Grade 1 diastolic dysfunction (impaired relaxation pattern with E/A ratio 0.82, deceleration time 215 ms).
4. Left Atrium: Mild enlargement (LAVI: 32 mL/m²).
5. Valves: Aortic valve is trileaflet, competent without stenosis. Trivial physiological mitral regurgitation.
6. Aorta & Pericardium: Normal ascending aortic caliber (31 mm). No pericardial effusion.

Conclusion:
Preserved left ventricular systolic function with mild hypertensive cardiac remodeling (Grade 1 diastolic relaxation impairment). No high-risk structural cardiomyopathy.
Clinical correlation and blood pressure optimization recommended.`,
    structuredData: {
      vitalSigns: {
        fractionEjection: '62% (Normale)',
        diastole: 'Dysfonction diastolique grade 1 (trouble de relaxation modéré)',
      },
      clinicalObservations: [
        'Normal left ventricular ejection fraction at 62%',
        'Mild concentric remodeling secondary to hypertension',
        'No valvular stenosis or pericardial effusion',
      ],
      recommendations: [
        'Routine BP optimization',
        'Follow-up echo in 24 months unless new symptoms arise',
      ],
    },
    chunks: [
      {
        id: 'CHK-005-1',
        documentId: 'DOC-005',
        documentTitle: 'Echocardiography & Doppler Clinical Assessment (English Report)',
        section: 'Echocardiogram parameters and EF',
        page: 1,
        content: `Echocardiogram: LVEF is 62% (preserved systolic function). Normal LV dimensions. Mild concentric remodeling and Grade 1 diastolic relaxation impairment. No valvular stenosis.`,
        keywords: ['echocardiography', 'doppler', 'lvef', 'ejection fraction', 'heart', 'remodeling', 'diastolic'],
      },
    ],
  },
  {
    id: 'DOC-006',
    title: 'Compte rendu de Sénologie & Dépistage Cancérologique',
    category: 'CANCER_SCREENING_GYNECO',
    date: '12 Février 2026',
    author: 'Dr. Aminata Seck, Radiologue Sénologue',
    institution: "Centre d'Imagerie de la Femme (Dakar) & Unité Sénologie (Paris)",
    language: 'fr',
    rawText: `COMPTE RENDU DE MAMMOGRAPHIE NUMÉRIQUE BILATÉRALE ET ÉCHOGRAPHIE MAMMAIRE
Patiente : Madame Awa NDIAYE, 42 ans
Indication : Bilan systématique de dépistage à 42 ans dans le cadre des antécédents familiaux (tante maternelle traitée pour néoplasie mammaire à 54 ans).

MAMMOGRAPHIE BILATÉRALE (Incidences face et oblique externe) :
- Seins de densité mammaire de type B selon l'ACR (densités fibro-glandulaires éparses ne masquant pas d'éventuelle lésion).
- Sein gauche : Absence d'opacité suspecte, de distorsion architecturale ou de microcalcifications à distribution suspecte. Classé ACR 2.
- Sein droit : Présence au quadrant supéro-externe d'une petite opacité nodulaire ovalaire de 7 mm, à contours réguliers nets, sans couronne spiculée.

ÉCHOGRAPHIE MAMMAIRE BILATÉRALE COMPLÉMENTAIRE :
- À droite au QSE (position 10h) : formation anéchogène bien délimitée de 7 x 4 mm, sans atténuation acoustique postérieure, sans signal Doppler couleur. Aspect typique de kyste simple sous tension ou fibroadénome débutant.
- Absence d'adénomégalie axillaire suspecte bilatérale.

FROTTIS CERVICO-UTÉRIN (Dépistage du cancer du col de l'utérus) :
- Prélèvement satisfaisant.
- Absence de cellule suspecte ou de lésion intra-épithéliale (NILM selon classification de Bethesda).

SYNTHÈSE ET CLASSIFICATION BI-RADS / ACR :
- Sein Gauche : ACR 2 (Anomalies bénignes ne nécessitant aucune intervention).
- Sein Droit : ACR 3 (Anomalie très probablement bénigne, risque de malignité inférieur à 2%).
- Recommandation : Pas d'indication de ponction ou de biopsie d'emblée. Réalisation d'une échographie mammaire de contrôle unilatérale droite à 6 mois (Août 2026) pour vérifier la stricte stabilité lésionnelle. Surveillance gynécologique régulière.`,
    structuredData: {
      clinicalObservations: [
        'Dépistage sénologique 42 ans avec antécédent tante maternelle (sein)',
        'Sein gauche normal ACR 2',
        'Sein droit : formation nodulaire de 7 mm QSE classée ACR 3 (très probablement bénin, < 2% risque)',
        'Frottis cervico-utérin négatif (NILM)',
      ],
      recommendations: [
        'Échographie mammaire de contrôle à 6 mois (Août 2026) pour le sein droit',
        'Examen clinique sénologique annuel',
        'Dépistage colorectal à planifier à 50 ans (test immunologique fécal)',
      ],
      redFlags: [
        'Toute modification palpatoire rapide, écoulement mamelonnaire ou rétraction cutanée impose une consultation avancée sans attendre les 6 mois',
      ],
      cancerScreening: {
        modality: 'Mammographie numérique 2D/3D + Échographie mammaire',
        classification: 'ACR 3 (Sein droit) / ACR 2 (Sein gauche)',
        organ: 'SEIN',
        findings: 'Opacité ovalaire régulière de 7 mm au QSE droit, évocatrice de kyste simple ou fibroadénome bénin.',
        followUpRecommendation: 'Contrôle échographique unilatéral de surveillance à 6 mois (Août 2026).',
        isSuspicious: false,
      },
    },
    chunks: [
      {
        id: 'CHK-006-1',
        documentId: 'DOC-006',
        documentTitle: 'Compte rendu de Sénologie & Dépistage Cancérologique',
        section: 'Mammographie & Échographie mammaire',
        page: 1,
        content: `Mammographie & Échographie : Sein gauche ACR 2 (bénin). Sein droit : nodule ovalaire régulier de 7 mm au QSE droit classé ACR 3 (très probablement bénin, risque < 2%). Échographie de contrôle recommandée à 6 mois. Pas de biopsie d'emblée.`,
        keywords: ['mammographie', 'sein', 'cancer', 'dépistage', 'acr 3', 'acr 2', 'bi-rads', 'kyste', 'nodule', 'échographie'],
      },
      {
        id: 'CHK-006-2',
        documentId: 'DOC-006',
        documentTitle: 'Compte rendu de Sénologie & Dépistage Cancérologique',
        section: 'Dépistage Gynécologique & Col de l utérus',
        page: 1,
        content: `Dépistage col de l'utérus : Frottis cervico-utérin négatif, absence de cellule maligne ou de lésion intra-épithéliale (Bethesda NILM). Prochain dépistage à 3 ans.`,
        keywords: ['frottis', 'col de l uterus', 'hpv', 'bethesda', 'gynécologie', 'dépistage col', 'cancer col'],
      },
      {
        id: 'CHK-006-3',
        documentId: 'DOC-006',
        documentTitle: 'Compte rendu de Sénologie & Dépistage Cancérologique',
        section: 'Antécédents familiaux et calendrier onco-prévention',
        page: 1,
        content: `Onco-prévention : Antécédent de tante maternelle (cancer du sein à 54 ans). Risque statistique modéré. Pas d'indication de test génétique BRCA en première intention. Dépistage colorectal FIT prévu à 50 ans.`,
        keywords: ['antécédents', 'famille', 'génétique', 'brca', 'prévention', 'colorectal', 'onco-prévention'],
      },
    ],
  },
];
