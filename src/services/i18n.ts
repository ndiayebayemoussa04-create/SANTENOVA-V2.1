import { Language } from '../types';

export interface Translations {
  // Navigation
  nav_challenge: string;
  nav_pathway: string;
  nav_rag: string;
  nav_cancer: string;
  nav_modules: string;
  nav_trust: string;
  nav_governance: string;
  nav_patient_app: string;
  nav_field_ops: string;
  nav_accounts: string;
  nav_human_review: string;
  role_jury: string;
  role_patient: string;
  role_clinician: string;
  role_admin: string;

  // General badges & terms
  tagline: string;
  fictional_demo: string;
  disclaimer_footer: string;
  switch_lang: string;
  close_btn: string;
  approve_btn: string;
  reject_btn: string;
  filter_all: string;

  // Patient App
  patient_app_title: string;
  patient_greeting: string;
  patient_welcome_sub: string;
  emergency_btn: string;
  todays_medications: string;
  scheduled_takes: string;
  take_morning_sub: string;
  take_evening_sub: string;
  mark_taken: string;
  taken_confirmed: string;
  upcoming_appointments: string;
  blood_pressure_diary: string;
  bp_subtitle: string;
  add_bp_btn: string;
  bp_systole: string;
  bp_diastole: string;
  bp_pulse: string;
  bp_period: string;
  bp_morning: string;
  bp_evening: string;
  bp_notes: string;
  bp_cancel: string;
  bp_save: string;
  bp_synced_badge: string;
  bp_table_datetime: string;
  bp_table_status: string;

  // Voice widget
  voice_assistant_title: string;
  voice_assistant_sub: string;
  voice_meds_btn: string;
  voice_bp_btn: string;
  voice_wolof_btn: string;
  voice_emergency_btn: string;
  voice_stop_btn: string;

  // Cancer Prevention
  cancer_title: string;
  cancer_sub: string;
  cancer_guardrail: string;
  cancer_source_badge: string;
  organ_breast: string;
  organ_cervix: string;
  organ_colorectal: string;
  organ_genetics: string;
  view_patient_btn: string;
  view_pro_btn: string;
  uncertainty_title: string;
  lifestyle_pillars_title: string;
  lifestyle_pillars_sub: string;
  cancer_last_exam: string;
  cancer_next_exam: string;
  cancer_audio_reassurance: string;

  // Challenge / Jury
  challenge_title: string;
  challenge_sub: string;
  start_demo_btn: string;
  step_prefix: string;
  step_of: string;
  step_prev: string;
  step_next: string;
  step_human_review_req: string;
  step_auto_safe: string;
  step_initial_data: string;
  step_ai_processing: string;
  step_final_output: string;
  step_uncertainty_box: string;
  sim_table_title: string;
  sim_table_sub: string;
  sim_table_indicator: string;
  sim_col_metric: string;
  sim_col_before: string;
  sim_col_after: string;
  sim_col_gain: string;
  sim_col_guarantee: string;

  // Accounts & RBAC
  accounts_badge: string;
  accounts_title: string;
  accounts_sub: string;
  create_account_btn: string;
  accounts_current_session: string;
  accounts_switch_session: string;
  accounts_modal_title: string;
  accounts_modal_fullname: string;
  accounts_modal_email: string;
  accounts_modal_role: string;
  accounts_modal_submit: string;

  // Documents & RAG
  rag_title: string;
  rag_sub: string;
  rag_search_placeholder: string;
  rag_search_btn: string;
  rag_clear_btn: string;
  rag_citations_title: string;
  rag_empty_notice: string;

  // Pathway
  pathway_title: string;
  pathway_sub: string;
  pathway_tab_timeline: string;
  pathway_tab_prep: string;
  pathway_tab_navigation: string;
  pathway_tab_discharge: string;
  pathway_tab_wellbeing: string;
}

export interface LocalizedStep {
  num: number;
  title: string;
  desc: string;
  input: string;
  aiAction: string;
  output: string;
  uncertainty: string;
  confidence: number;
  humanReview: boolean;
}

export interface LocalizedMilestone {
  id: string;
  title: string;
  date: string;
  status: 'COMPLETED' | 'WAITING_HUMAN' | 'ACTIVE';
  result: string;
  confidence: number;
  uncertainty: string;
  humanReview: string;
}

export const translations: Record<Language, Translations> = {
  fr: {
    nav_challenge: 'Démonstration Jury',
    nav_pathway: 'Parcours Patient',
    nav_rag: 'Documents & RAG',
    nav_cancer: 'Onco-Prévention',
    nav_modules: 'Modules Spécialisés',
    nav_trust: 'Trust Center',
    nav_governance: 'Gouvernance & IA',
    nav_patient_app: 'App Patiente',
    nav_field_ops: 'Opérations Terrain & Télé-Santé',
    nav_accounts: 'Comptes & Droits',
    nav_human_review: 'Revue Humaine',
    role_jury: 'Jury',
    role_patient: 'Patiente',
    role_clinician: 'Médecin',
    role_admin: 'Admin',

    tagline: 'Plateforme éthique d’orchestration IA en santé',
    fictional_demo: 'Cas Fictif Awa Ndiaye (42 ans)',
    disclaimer_footer:
      'Avertissement Réglementaire : SantéNova est une plateforme technologique d’assistance, d’aide à la décision et de démonstration. Elle ne pose aucun diagnostic autonome et ne remplace pas l’évaluation d’un médecin qualifié.',
    switch_lang: 'Langue',
    close_btn: 'Fermer',
    approve_btn: 'Approuver',
    reject_btn: 'Rejeter',
    filter_all: 'Tous',

    patient_app_title: 'Mon Espace Patient SantéNova',
    patient_greeting: 'Nanga def, Awa ! (Bonjour Awa)',
    patient_welcome_sub:
      'Votre santé au quotidien : vos médicaments du jour, votre carnet de tension et vos rappels d’examens.',
    emergency_btn: 'Urgence SOS (15 / 1515)',
    todays_medications: 'Mes Médicaments Aujourd’hui',
    scheduled_takes: '2 prises programmées',
    take_morning_sub: 'Au petit-déjeuner pour réguler la tension artérielle',
    take_evening_sub: 'Au coucher le soir pour le cholestérol',
    mark_taken: 'Marquer comme pris',
    taken_confirmed: 'Pris ✓',
    upcoming_appointments: 'Mes Examens & Rendez-vous',
    blood_pressure_diary: 'Mon Carnet d’Automesure Tensionnelle',
    bp_subtitle: 'Règle des 3 mesures le matin et 3 mesures le soir pendant 3 jours avant de voir le Dr. Fall.',
    add_bp_btn: 'Ajouter une mesure',
    bp_systole: 'Systole (Haut)',
    bp_diastole: 'Diastole (Bas)',
    bp_pulse: 'Pouls (bpm)',
    bp_period: 'Moment',
    bp_morning: 'Matin (au réveil)',
    bp_evening: 'Soir (au coucher)',
    bp_notes: 'Commentaire ou ressenti (optionnel)',
    bp_cancel: 'Annuler',
    bp_save: 'Enregistrer la mesure',
    bp_synced_badge: 'Synchronisé Dr. Fall',
    bp_table_datetime: 'Date & Heure',
    bp_table_status: 'Statut',

    voice_assistant_title: 'Compagnon Vocal SantéNova',
    voice_assistant_sub: 'Assistant didactique multilingue (FR, Wolof, EN)',
    voice_meds_btn: 'Mes médicaments du jour',
    voice_bp_btn: 'Ma tension expliquée',
    voice_wolof_btn: 'Écouter en Wolof',
    voice_emergency_btn: 'Consignes d’urgence',
    voice_stop_btn: 'Couper la voix',

    cancer_title: 'Détection & Prévention Oncologique : Dossier Awa Ndiaye (42 ans)',
    cancer_sub:
      'Démonstration sur données médicales concrètes : analyse d’un dépistage sénologique avec nodule ACR 3, contrôle gynécologique, histoire familiale et piliers de l’onco-prévention.',
    cancer_guardrail: 'Garde-fou : Interdiction absolue de diagnostic autonome de cancer',
    cancer_source_badge: 'Ancrage : Compte rendu de sénologie DOC-006 (Dr. Aminata Seck)',
    organ_breast: 'Sénologie (Mammographie)',
    organ_cervix: 'Frottis Col Utérus',
    organ_colorectal: 'Dépistage Colorectal',
    organ_genetics: 'Histoire Familiale (Gail)',
    view_patient_btn: 'Explication Patiente',
    view_pro_btn: 'Synthèse Médicale / BI-RADS',
    uncertainty_title: 'Mesure de l’Incertitude & Limites Techniques',
    lifestyle_pillars_title: 'Piliers de l’Onco-Prévention Primaire Quotidienne (OMS & INCa)',
    lifestyle_pillars_sub:
      'Facteurs protecteurs scientifiquement prouvés réduisant de 30 à 40% le risque d’apparition ou de récidive néoplasique.',
    cancer_last_exam: 'Dernier examen',
    cancer_next_exam: 'Prochain contrôle',
    cancer_audio_reassurance: 'Écouter l’explication audio dédramatisante',

    challenge_title: 'SantéNova v2.1 — Challenge Edition',
    challenge_sub:
      'Rendre le parcours du patient plus sûr, plus clair et plus facile. Démonstration interactive de bout en bout avec la patiente fictive Awa Ndiaye (42 ans).',
    start_demo_btn: 'Démarrer la Démonstration',
    step_prefix: 'ÉTAPE',
    step_of: 'sur 10',
    step_prev: 'Étape précédente',
    step_next: 'Étape suivante',
    step_human_review_req: 'REVUE HUMAINE REQUISE',
    step_auto_safe: 'CONTRÔLE AUTOMATISÉ CONFORME',
    step_initial_data: 'Données Initiales',
    step_ai_processing: 'Traitement & Safety',
    step_final_output: 'Résultat Délivré',
    step_uncertainty_box: 'Transparence sur l’Incertitude & Limites Cliniques',
    sim_table_title: 'Tableau Comparatif Avant / Après Simulation',
    sim_table_sub: 'Gains observés sur le parcours de consultation cardiologique et bilan métabolique.',
    sim_table_indicator: 'INDICATEURS DE SIMULATION — À VALIDER PAR UN PILOTE RÉEL',
    sim_col_metric: 'Indicateur Clé',
    sim_col_before: 'Avant SantéNova',
    sim_col_after: 'Avec SantéNova v2.1',
    sim_col_gain: 'Évolution',
    sim_col_guarantee: 'Garantie Clinique',

    accounts_badge: 'Contrôle d’Accès & Habilitations (RBAC)',
    accounts_title: 'Gestion des Comptes Utilisateurs & Niveaux d’Habilitation',
    accounts_sub:
      'Cloisonnement strict des privilèges : Patient, Aidant, Médecin, Secrétariat Médical et Administrateur DPO. Chaque rôle dispose d’un périmètre d’accès hermétique garanti par cryptographie.',
    create_account_btn: 'Créer un Compte Utilisateur',
    accounts_current_session: 'Session Active',
    accounts_switch_session: 'Basculer vers cette session',
    accounts_modal_title: 'Création d’un Nouvel Utilisateur Certifié',
    accounts_modal_fullname: 'Nom Complet',
    accounts_modal_email: 'Adresse Email Professionnelle ou Personnelle',
    accounts_modal_role: 'Niveau d’Habilitation & Rôle',
    accounts_modal_submit: 'Créer et Enrôler l’Utilisateur',

    rag_title: 'Documents Médicaux & Recherche RAG Sécurisée',
    rag_sub:
      'Exploration augmentée du dossier d’Awa Ndiaye : indexation vectorielle, chunking médical et traçabilité absolue des sources.',
    rag_search_placeholder: 'Ex : Pourquoi Awa prend-elle de l’Amlodipine ? Quel est son profil de cholestérol ?',
    rag_search_btn: 'Interroger le RAG',
    rag_clear_btn: 'Effacer',
    rag_citations_title: 'Sources & Citations Détectées',
    rag_empty_notice: 'Informations insuffisantes pour répondre avec confiance.',

    pathway_title: 'Parcours de Soins Coordonné d’Awa Ndiaye (42 ans)',
    pathway_sub:
      'Chronologie vivante des actes : de l’admission hospitalière à la prévention active au quotidien.',
    pathway_tab_timeline: 'Chronologie des Soins',
    pathway_tab_prep: 'Préparation Consultation',
    pathway_tab_navigation: 'Orientation & MAPA',
    pathway_tab_discharge: 'Instructions de Sortie',
    pathway_tab_wellbeing: 'Prévention & Nudge',
  },

  en: {
    nav_challenge: 'Jury Demo',
    nav_pathway: 'Patient Pathway',
    nav_rag: 'Documents & RAG',
    nav_cancer: 'Cancer Prevention',
    nav_modules: 'Specialized AI',
    nav_trust: 'Trust Center',
    nav_governance: 'Governance & AI',
    nav_patient_app: 'Patient App',
    nav_field_ops: 'Field Ops & Telehealth',
    nav_accounts: 'Accounts & RBAC',
    nav_human_review: 'Human Review',
    role_jury: 'Jury',
    role_patient: 'Patient',
    role_clinician: 'Clinician',
    role_admin: 'Admin',

    tagline: 'Ethical Healthcare AI Orchestration Platform',
    fictional_demo: 'Fictional Case Awa Ndiaye (42 yo)',
    disclaimer_footer:
      'Regulatory Disclaimer: SantéNova is an AI-assisted demonstration and clinical decision-support platform. It never issues autonomous diagnoses and never replaces the judgment of a licensed healthcare provider.',
    switch_lang: 'Language',
    close_btn: 'Close',
    approve_btn: 'Approve',
    reject_btn: 'Reject',
    filter_all: 'All',

    patient_app_title: 'My SantéNova Patient Portal',
    patient_greeting: 'Welcome, Awa! (Nanga def)',
    patient_welcome_sub:
      'Your daily health companion: your daily prescription check-ins, blood pressure self-monitoring, and upcoming screenings.',
    emergency_btn: 'Emergency SOS (911 / 15 / 1515)',
    todays_medications: 'My Medications Today',
    scheduled_takes: '2 daily doses scheduled',
    take_morning_sub: 'With breakfast to manage arterial blood pressure',
    take_evening_sub: 'At bedtime for cholesterol control',
    mark_taken: 'Mark as taken',
    taken_confirmed: 'Taken ✓',
    upcoming_appointments: 'My Screenings & Appointments',
    blood_pressure_diary: 'Blood Pressure Self-Monitoring Log',
    bp_subtitle: 'Rule of 3 morning & 3 evening measurements for 3 consecutive days before seeing Dr. Fall.',
    add_bp_btn: 'Log Measurement',
    bp_systole: 'Systolic (High)',
    bp_diastole: 'Diastolic (Low)',
    bp_pulse: 'Pulse (bpm)',
    bp_period: 'Time of Day',
    bp_morning: 'Morning (upon waking)',
    bp_evening: 'Evening (before bedtime)',
    bp_notes: 'Feelings or notes (optional)',
    bp_cancel: 'Cancel',
    bp_save: 'Save Log',
    bp_synced_badge: 'Synced to Dr. Fall',
    bp_table_datetime: 'Date & Time',
    bp_table_status: 'Status',

    voice_assistant_title: 'SantéNova Voice Companion',
    voice_assistant_sub: 'Multilingual educational voice assistant (EN, FR, Wolof)',
    voice_meds_btn: 'My daily medications',
    voice_bp_btn: 'Explain my blood pressure',
    voice_wolof_btn: 'Listen in Wolof',
    voice_emergency_btn: 'Emergency instructions',
    voice_stop_btn: 'Mute voice',

    cancer_title: 'Cancer Screening & Prevention: Case of Awa Ndiaye (42 yo)',
    cancer_sub:
      'Demonstrated on realistic clinical records: senology screening evaluation with ACR 3 nodule, cervical smear, family history, and primary onco-prevention pillars.',
    cancer_guardrail: 'Ethical Guardrail: Absolute ban on autonomous cancer diagnosis',
    cancer_source_badge: 'Grounded: Senology Report DOC-006 (Dr. Aminata Seck)',
    organ_breast: 'Breast Senology (Mammogram)',
    organ_cervix: 'Cervical Smear',
    organ_colorectal: 'Colorectal Screening',
    organ_genetics: 'Family Risk (Gail Model)',
    view_patient_btn: 'Patient Explanation',
    view_pro_btn: 'Clinician BI-RADS Report',
    uncertainty_title: 'Measurement of Uncertainty & Imaging Boundaries',
    lifestyle_pillars_title: 'Four Pillars of Primary Cancer Prevention (WHO & INCa)',
    lifestyle_pillars_sub:
      'Scientifically proven protective habits reducing primary and recurrent cancer risk by 30 to 40%.',
    cancer_last_exam: 'Last exam',
    cancer_next_exam: 'Next scheduled check',
    cancer_audio_reassurance: 'Listen to calming audio explanation',

    challenge_title: 'SantéNova v2.1 — Challenge Edition',
    challenge_sub:
      'Making patient care journeys safer, clearer, and easier. End-to-end interactive simulation for fictional patient Awa Ndiaye (42 yo).',
    start_demo_btn: 'Start Jury Walkthrough',
    step_prefix: 'PHASE',
    step_of: 'of 10',
    step_prev: 'Previous Phase',
    step_next: 'Next Phase',
    step_human_review_req: 'HUMAN REVIEW REQUIRED',
    step_auto_safe: 'AUTOMATED SAFETY COMPLIANT',
    step_initial_data: 'Initial Inputs',
    step_ai_processing: 'Processing & Guardrails',
    step_final_output: 'Delivered Output',
    step_uncertainty_box: 'Clinical Uncertainty Transparency & Safe Thresholds',
    sim_table_title: 'Before / After Simulation Comparison Table',
    sim_table_sub: 'Demonstrated impact across cardiovascular pathway and metabolic workup.',
    sim_table_indicator: 'SIMULATION METRICS — TO BE VALIDATED IN A REAL CLINICAL PILOT',
    sim_col_metric: 'Key Metric',
    sim_col_before: 'Before SantéNova',
    sim_col_after: 'With SantéNova v2.1',
    sim_col_gain: 'Change',
    sim_col_guarantee: 'Clinical Safeguard',

    accounts_badge: 'Access Control & Privileges (RBAC)',
    accounts_title: 'User Accounts & Privilege Hierarchy Management',
    accounts_sub:
      'Strict segregation of privileges: Patient, Caregiver, Physician, Medical Secretariat, and DPO Administrator. Each role possesses a hermetic cryptographically enforced perimeter.',
    create_account_btn: 'Create User Account',
    accounts_current_session: 'Active Session',
    accounts_switch_session: 'Switch to this session',
    accounts_modal_title: 'Create Verified User Account',
    accounts_modal_fullname: 'Full Legal Name',
    accounts_modal_email: 'Professional or Personal Email Address',
    accounts_modal_role: 'Clearance Level & Functional Role',
    accounts_modal_submit: 'Enroll & Provision User',

    rag_title: 'Medical Documents & Secure RAG Retrieval',
    rag_sub:
      'Grounded clinical exploration of Awa Ndiaye’s chart: vector indexing, biomedical chunking, and strict provenance tracking.',
    rag_search_placeholder: 'E.g., Why was Amlodipine prescribed? What is her LDL cholesterol reading?',
    rag_search_btn: 'Query Clinical RAG',
    rag_clear_btn: 'Clear',
    rag_citations_title: 'Verified Sources & Citations',
    rag_empty_notice: 'Insufficient grounded sources to formulate a confident answer.',

    pathway_title: 'Coordinated Care Pathway for Awa Ndiaye (42 yo)',
    pathway_sub:
      'Living clinical timeline: from initial hospital workup to active daily prevention.',
    pathway_tab_timeline: 'Care Timeline',
    pathway_tab_prep: 'Visit Preparation',
    pathway_tab_navigation: 'Orientation & ABPM',
    pathway_tab_discharge: 'Discharge Instructions',
    pathway_tab_wellbeing: 'Prevention & Nudge',
  },

  wo: {
    nav_challenge: 'Démonstration Jury',
    nav_pathway: 'Yoonu Wér-gu-yaram',
    nav_rag: 'Kayit yi ak RAG',
    nav_cancer: 'Faju Kànseer',
    nav_modules: 'Module yi',
    nav_trust: 'Trust Center',
    nav_governance: 'Gouvernance',
    nav_patient_app: 'App Awa',
    nav_field_ops: 'Liggeeyu All & Paj ci Sore',
    nav_accounts: 'Sago yi ak Droits',
    nav_human_review: 'Seetul Doktoor',
    role_jury: 'Jury',
    role_patient: 'Awa (Patiente)',
    role_clinician: 'Doktoor',
    role_admin: 'Admin',

    tagline: 'Platfom bu ñu jagleel wér-gu-yaram ci kàllaama Wolof ak Farañse',
    fictional_demo: 'Dosiye Awa Ndiaye (42 at)',
    disclaimer_footer:
      'SantéNova dafay jàppale doktoor yi ak nit ñi. Du joxe diagnostic ci boppam te du wuutu doktoor.',
    switch_lang: 'Làmmiñ',
    close_btn: 'Tëj',
    approve_btn: 'Nangu',
    reject_btn: 'Baña',
    filter_all: 'Lépp',

    patient_app_title: 'Bërëbu Awa Ndiaye ci SantéNova',
    patient_greeting: 'Nanga def, Awa ! (Jàmm nga am)',
    patient_welcome_sub: 'Sa wér-gu-yaram ci tey : garab yi ngay jël, natt tansiyoŋ bi ak rendez-vous yi.',
    emergency_btn: 'Urgence SOS (1515 / 15)',
    todays_medications: 'Samay Garab Tey',
    scheduled_takes: '2 yoon ci bés bi',
    take_morning_sub: 'Ci suba ci ndekki ngir tansiyoŋ bi',
    take_evening_sub: 'Ci guddi ci tëdd ngir kolesterol bi',
    mark_taken: 'Jël naa ko',
    taken_confirmed: 'Jël na ko ✓',
    upcoming_appointments: 'Samay Rendez-vous',
    blood_pressure_diary: 'Téere natt tansiyoŋ bi',
    bp_subtitle: 'Natt 3 yoon suba, 3 yoon ngoon lu am 3 bés bala ngay gise ak Doktoor Fall.',
    add_bp_btn: 'Yokku natt',
    bp_systole: 'Kaw (Systole)',
    bp_diastole: 'Suuf (Diastole)',
    bp_pulse: 'Xol bi (bpm)',
    bp_period: 'Waxtu bi',
    bp_morning: 'Suba (bi ngay yewwu)',
    bp_evening: 'Ngoon / Guddi',
    bp_notes: 'Ni nga ko yëge',
    bp_cancel: 'Neenal',
    bp_save: 'Denc natt bi',
    bp_synced_badge: 'Yóbb nañu ko ba Doktoor Fall',
    bp_table_datetime: 'Waxtu ak Bés',
    bp_table_status: 'Anam',

    voice_assistant_title: 'Kàddug SantéNova ci Wolof',
    voice_assistant_sub: 'Déglul leeral yi ci kàddu',
    voice_meds_btn: 'Samay garab tey',
    voice_bp_btn: 'Leeral tansiyoŋ bi',
    voice_wolof_btn: 'Déglu ci Wolof',
    voice_emergency_btn: 'Ndogalu urgence',
    voice_stop_btn: 'Taxawal kàddu gi',

    cancer_title: 'Dépistage ak Faju Kànseer : Dosiye Awa Ndiaye (42 at)',
    cancer_sub: 'Kayitu seet wéen yi ak jëmm ji : kyste bénin bu tollu 7 mm ACR 3, seetu col bi ak yoonu wér-gu-yaram.',
    cancer_guardrail: 'Garde-fou : IA bi du wax mukk ne nit ki am na kànseer',
    cancer_source_badge: 'Kayitu Doktoor Aminata Seck (DOC-006)',
    organ_breast: 'Wéen yi (Mammographie)',
    organ_cervix: 'Col Utérus (Frottis)',
    organ_colorectal: 'Dépistage Colorectal',
    organ_genetics: 'Génétique ak Njaboot',
    view_patient_btn: 'Leeral Awa (Wolof/FR)',
    view_pro_btn: 'Kayitu Doktoor (BI-RADS)',
    uncertainty_title: 'Lépp lu wóorul ci seet gi',
    lifestyle_pillars_title: '4 yoon ngir baña am kànseer (OMS)',
    lifestyle_pillars_sub: 'Dox, lék lu baax, baña tox ak baña naan sangara.',
    cancer_last_exam: 'Seet gi weesu',
    cancer_next_exam: 'Seet gi ci topp',
    cancer_audio_reassurance: 'Déglu leeral gi ci kàddu',

    challenge_title: 'SantéNova v2.1 — Challenge Edition',
    challenge_sub: 'Jàppale nit ñi ci seen wér-gu-yaram ci anam bu wóor, bu leer te yomb.',
    start_demo_btn: 'Tambali Démo gi',
    step_prefix: 'Étape',
    step_of: 'ci 10',
    step_prev: 'Étape bi weesu',
    step_next: 'Étape bi ci topp',
    step_human_review_req: 'DOKTOOR WAR NA KO SEET',
    step_auto_safe: 'LÉPP MI NGI CI YOON',
    step_initial_data: 'Xibaar yi jëkk',
    step_ai_processing: 'Liggeeyu IA bi',
    step_final_output: 'Tontu bi',
    step_uncertainty_box: 'Incertitude ak Limites',
    sim_table_title: 'Ni mu meloon bala SantéNova ak léegi',
    sim_table_sub: 'Ay nataal yu wone ni liggeey bi gënee gaaw te leer.',
    sim_table_indicator: 'INDICATEURS DE SIMULATION — À VALIDER',
    sim_col_metric: 'Indicateur',
    sim_col_before: 'Bala SantéNova',
    sim_col_after: 'Ak SantéNova v2.1',
    sim_col_gain: 'Yoon',
    sim_col_guarantee: 'Garantie',

    accounts_badge: 'Sago yi ak Droits (RBAC)',
    accounts_title: 'Saytu Koom-koom ak Droits yi',
    accounts_sub: 'Koolute ak séddale droit yi diggante Awa, Famille am, Doktoor Fall ak Administration bi.',
    create_account_btn: 'Sos Sago bu bees',
    accounts_current_session: 'Sago bi ngay jëfandikoo',
    accounts_switch_session: 'Soppi dem ci sago bii',
    accounts_modal_title: 'Sos Sago bu bees',
    accounts_modal_fullname: 'Tur ak Sant',
    accounts_modal_email: 'Email',
    accounts_modal_role: 'Niveau ak Droit',
    accounts_modal_submit: 'Denc sago bi',

    rag_title: 'Kayit yi ak Ceetug RAG',
    rag_sub: 'Seet lépp ci dosiye Awa Ndiaye ci anam bu leer te wóor.',
    rag_search_placeholder: 'Lajjal : Lu tax Awa di jël Amlodipine ?',
    rag_search_btn: 'Seet ci RAG',
    rag_clear_btn: 'Neenal',
    rag_citations_title: 'Kayit yi ñu ko jële',
    rag_empty_notice: 'Xibaar yi doyul ngir tontu ci anam bu wóor.',

    pathway_title: 'Yoonu Faju Awa Ndiaye (42 at)',
    pathway_sub: 'Ni mu tàmbalee ba léegi ci faju bi.',
    pathway_tab_timeline: 'Chronologie',
    pathway_tab_prep: 'Wajataay Rendez-vous',
    pathway_tab_navigation: 'Yoonu Faju ak MAPA',
    pathway_tab_discharge: 'Ndogalu Génti',
    pathway_tab_wellbeing: 'Faju bopp ak Nudge',
  },
};

// 10 Challenge Steps in EN / FR / WO
export const localizedChallengeSteps: Record<Language, LocalizedStep[]> = {
  fr: [
    {
      num: 1,
      title: 'Admission de la Patiente',
      desc: 'Enregistrement sécurisé de Mme Awa Ndiaye (42 ans), identification des langues (Français, Wolof, Anglais) et consentement éclairé initial.',
      input: 'Fiche d’accueil, identifiant national SN-DKR-1984, consentement soins activé.',
      aiAction: 'Vérification de complétude des données, détection des sensibilités linguistiques et culturelles.',
      output: 'Dossier initialisé, profil sécurisé, finalités de consentement paramétrées.',
      uncertainty: 'Aucune donnée clinique encore ingérée : statut en attente de pièces médicales.',
      confidence: 99,
      humanReview: false,
    },
    {
      num: 2,
      title: 'Réception de Plusieurs Documents',
      desc: 'Collecte de 5 documents hétérogènes : consultation cardiologique (Dakar), rapport métabolique (Paris), feuille de sortie, anamnèse patiente et échographie en anglais.',
      input: '5 fichiers textuels & PDF numérisés, multilingues (FR / EN).',
      aiAction: 'Contrôle d’intégrité SHA-256, détection des métadonnées auteurs, dates et formats.',
      output: '5 documents indexés dans le coffre-fort chiffré sans perte d’information.',
      uncertainty: 'Variations terminologiques entre terminologie anglo-saxonne (LVEF) et française (FEVG) détectées et harmonisées.',
      confidence: 97,
      humanReview: false,
    },
    {
      num: 3,
      title: 'Extraction et Compréhension',
      desc: 'Segmentation sémantique en 9 chunks médicaux. Extraction des constantes (PA 142/88, LDL 1.62 g/L, FEVG 62%) et des antécédents.',
      input: 'Textes bruts des 5 documents.',
      aiAction: 'Pipeline RAG : Chunking bio-médical, génération des embeddings, détection des red flags.',
      output: 'Table de chunks indexés avec mots-clés normalisés et citations rattachées à la source exacte.',
      uncertainty: 'Identification d’une discordance bénigne entre déclaration patiente (céphalées intermittentes) et examen (repos normal).',
      confidence: 94,
      humanReview: false,
    },
    {
      num: 4,
      title: 'Résumé du Dossier (Double Vue)',
      desc: 'Génération de deux synthèses distinctes : Version Professionnelle (technique, concise avec sources) et Version Patiente (langage clair, bienveillant, sans jargon).',
      input: 'Requête de synthèse transversale sur les 9 chunks indexés.',
      aiAction: 'Génération contrôlée avec ancrage strict aux sources documentaires.',
      output: 'Double affichage : synthèse médicale clinique vs synthèse patiente accessible.',
      uncertainty: 'Affichage des citations exactes (DOC-001, DOC-002, DOC-005) pour éliminer toute hallucination.',
      confidence: 95,
      humanReview: false,
    },
    {
      num: 5,
      title: 'Préparation du Rendez-vous',
      desc: 'Organisation de la future consultation : questions clés à poser au cardiologue, carnet d’automesure à préparer, bilan de tolérance des statines.',
      input: 'Objectifs de consultation du Dr. Fall + interrogations de la patiente.',
      aiAction: 'Synthèse des points ouverts, génération d’une checklist sans jamais formuler de diagnostic autonome.',
      output: 'Fiche récapitulative téléchargeable pour la patiente et son médecin traitant.',
      uncertainty: 'Rappel explicite : « Les questions suggérées ne constituent pas une prescription ».',
      confidence: 92,
      humanReview: false,
    },
    {
      num: 6,
      title: 'Navigation des Soins & Human Review',
      desc: 'Orientation dans le parcours : programmation de la MAPA des 24h et du bilan sanguin de contrôle à 3 mois. Détection d’une décision clinique à risque.',
      input: 'Prescription Dr. Fall (MAPA 24h) et signalement céphalées.',
      aiAction: 'Safety Engine analyse la criticité : déclenchement du statut HUMAN_REVIEW_REQUIRED.',
      output: 'Dossier mis en attente de confirmation médicale : le soignant doit APPROUVER ou REJETER.',
      uncertainty: 'Incertitude sur le profil tensionnel nocturne : seule la MAPA permettra de conclure.',
      confidence: 88,
      humanReview: true,
    },
    {
      num: 7,
      title: 'Communication Multilingue',
      desc: 'Traduction et reformulation instantanée en Wolof et Anglais. Explication didactique du rôle de la tension artérielle et du cholestérol.',
      input: 'Demande patiente : « Explique-moi en Wolof » ou « Explique-moi simplement ».',
      aiAction: 'Module NLU cross-lingual avec glossaire validé par des soignants sénégalais.',
      output: 'Texte et synthèse vocale naturelle en Wolof authentique et Anglais clair.',
      uncertainty: 'Certaines métaphores culturelles sont signalées comme interprétations pédagogiques.',
      confidence: 96,
      humanReview: false,
    },
    {
      num: 8,
      title: 'Instructions de Sortie Simplifiées',
      desc: 'Fiche de consignes de sortie : posologies matin/soir, conduite à tenir en cas d’oubli, signaux d’alerte (douleur thoracique, céphalée intense).',
      input: 'Ordonnances Dr. Fall et compte-rendu hospitalier.',
      aiAction: 'Extraction des posologies et mise en page à fort contraste et pictogrammes.',
      output: 'Tableau visuel clair de prise des médicaments et numéro d’urgence préconfiguré.',
      uncertainty: 'Rappel de vérification auprès du pharmacien lors de la délivrance.',
      confidence: 98,
      humanReview: false,
    },
    {
      num: 9,
      title: 'Bien-être et Prévention',
      desc: 'Plan d’hygiène de vie personnalisé : marche quotidienne progressive, réduction des bouillons salés traditionnels, suivi du sommeil.',
      input: 'Données d’anamnèse + recommandations OMS d’activité physique.',
      aiAction: 'Algorithme de nudge comportemental bienveillant (renforcement positif).',
      output: 'Calendrier hebdomadaire d’objectifs simples et carnet d’automesure tensionnelle.',
      uncertainty: 'Conseils non thérapeutiques : adaptation individuelle selon le ressenti.',
      confidence: 93,
      humanReview: false,
    },
    {
      num: 10,
      title: 'Mesure de l’Impact',
      desc: 'Bilan comparatif chiffré avant/après intégration de SantéNova v2.1 sur le parcours de soins d’Awa Ndiaye.',
      input: 'Métriques opérationnelles simulées du parcours complet.',
      aiAction: 'Calcul des différentiels de temps, de précision et de charge administrative.',
      output: 'Tableau de synthèse d’impact pour le Jury avec garanties de sécurité vérifiables.',
      uncertainty: 'Données basées sur une simulation de cas complexe à corréler avec de futurs essais cliniques.',
      confidence: 96,
      humanReview: false,
    },
  ],

  en: [
    {
      num: 1,
      title: 'Patient Intake & Admission',
      desc: 'Secure onboarding of Mrs. Awa Ndiaye (42 yo), recording spoken languages (French, Wolof, English), and setting granular consent purposes.',
      input: 'Intake form, national ID SN-DKR-1984, direct care consent activated.',
      aiAction: 'Data completeness audit, linguistic barrier detection, and security credential check.',
      output: 'Chart initialized, patient profile encrypted, consent ledger locked.',
      uncertainty: 'No clinical data ingested yet: status waiting for initial medical documents.',
      confidence: 99,
      humanReview: false,
    },
    {
      num: 2,
      title: 'Multi-Source Document Ingestion',
      desc: 'Aggregation of 5 heterogeneous records: cardiology consultation (Dakar), metabolic day clinic report (Paris), discharge letter, intake history, and London echocardiography report.',
      input: '5 digital files & OCR transcripts in French and English.',
      aiAction: 'SHA-256 integrity hashing, metadata tagging (authors, clinical dates, and institutions).',
      output: '5 verified records stored in AES-256 encrypted vault without data loss.',
      uncertainty: 'Cross-lingual terminology nuances (LVEF vs FEVG, BP vs PA) detected and mapped.',
      confidence: 97,
      humanReview: false,
    },
    {
      num: 3,
      title: 'Semantic Extraction & Understanding',
      desc: 'Semantic decomposition into 9 medical chunks. Accurate parsing of vitals (BP 142/88 mmHg, LDL 1.62 g/L, LVEF 62%) and antecedents.',
      input: 'Raw unstructured clinical records.',
      aiAction: 'Biomedical chunking, embedding generation, and critical alert screening.',
      output: 'Structured chunk table with normalized clinical keywords and pinpoint source citations.',
      uncertainty: 'Detected benign variation between patient subjective morning headache and clinic normal resting state.',
      confidence: 94,
      humanReview: false,
    },
    {
      num: 4,
      title: 'Dual-Layer Chart Synthesis',
      desc: 'Dynamic production of two tailored summaries: Clinician Version (technical, concise with citations) and Patient Version (clear, empowering, zero jargon).',
      input: 'Cross-document summary query over the 9 indexed chunks.',
      aiAction: 'Hallucination-free constrained generation tied strictly to grounded evidence.',
      output: 'Side-by-side dual display: structured clinical synthesis vs clear patient overview.',
      uncertainty: 'Exact citations surfaced (DOC-001, DOC-002, DOC-005) ensuring zero hallucinated facts.',
      confidence: 95,
      humanReview: false,
    },
    {
      num: 5,
      title: 'Consultation & Visit Preparation',
      desc: 'Organizing the upcoming appointment: key questions for Dr. Fall, home blood pressure monitoring guide, and statin tolerance check reminders.',
      input: 'Dr. Fall clinical goals + patient personal concerns.',
      aiAction: 'Compilation of open discussion topics and actionable checklist without making autonomous diagnoses.',
      output: 'Downloadable preparation brief for both Awa and her attending physician.',
      uncertainty: 'Explicit safety disclaimer: "Suggested questions do not replace clinical advice".',
      confidence: 92,
      humanReview: false,
    },
    {
      num: 6,
      title: 'Care Navigation & Human Review',
      desc: 'Care pathway navigation: scheduling 24h ambulatory blood pressure monitor (ABPM) and 3-month labs. Intercepting a high-risk clinical branch.',
      input: 'Dr. Fall prescription (24h ABPM) and headache report.',
      aiAction: 'Safety Engine flags critical clinical threshold: HUMAN_REVIEW_REQUIRED triggered.',
      output: 'Case paused for physician arbitration: clinician must APPROVE or REJECT.',
      uncertainty: 'Nocturnal dipping blood pressure profile cannot be assumed: only ABPM will confirm.',
      confidence: 88,
      humanReview: true,
    },
    {
      num: 7,
      title: 'Multilingual Voice & Inclusion',
      desc: 'Instant adaptation into authentic Wolof and English. Educational breakdown of blood pressure mechanics and cardiovascular cholesterol risks.',
      input: 'Patient voice query: "Explain in Wolof" or "Explain in plain English".',
      aiAction: 'Cross-lingual NLU with glossary vetted by West African healthcare practitioners.',
      output: 'Natural audio synthesis and verified plain-text explanation.',
      uncertainty: 'Cultural metaphors are clearly flagged as educational pedagogical analogies.',
      confidence: 96,
      humanReview: false,
    },
    {
      num: 8,
      title: 'Simplified Discharge Instructions',
      desc: 'Actionable discharge plan: morning/evening medication regimens, missed dose instructions, and red-flag emergency symptoms (chest pain, severe vision changes).',
      input: 'Prescription orders and discharge hospital report.',
      aiAction: 'Dosage extraction and high-contrast visual schedule formatting with pictograms.',
      output: 'Clear daily medication schedule and pre-configured emergency calling.',
      uncertainty: 'Patient reminded to verify all pills with dispensing pharmacist.',
      confidence: 98,
      humanReview: false,
    },
    {
      num: 9,
      title: 'Prevention & Behavioral Nudges',
      desc: 'Personalized preventive lifestyle: progressive daily walking goals, reduction of high-sodium stock cubes, and sleep hygiene tracking.',
      input: 'Patient baseline intake + WHO cardiovascular physical activity guidelines.',
      aiAction: 'Compassionate behavioral nudge algorithm with positive reinforcement.',
      output: 'Weekly micro-habit checklist and self-monitoring diary.',
      uncertainty: 'Non-therapeutic lifestyle guidance: patient adjusts to personal comfort.',
      confidence: 93,
      humanReview: false,
    },
    {
      num: 10,
      title: 'Measurable Impact & Audit',
      desc: 'Rigorous before-and-after audit demonstrating clinical time savings, comprehension rate, and administrative offload for Awa Ndiaye’s journey.',
      input: 'Simulated operational benchmark across entire care pathway.',
      aiAction: 'Differential computation of time spent, comprehension gain, and safety interventions.',
      output: 'Jury-ready impact scorecards with verifiable safety guarantees.',
      uncertainty: 'Simulation-derived metrics to be correlated with prospective clinical trials.',
      confidence: 96,
      humanReview: false,
    },
  ],

  wo: [
    {
      num: 1,
      title: 'Jébbalu Awa Ndiaye ci Hopital bi',
      desc: 'Denc xibaari Awa Ndiaye (42 at) ci anam bu wóor, xam kàllaama yi mu wax (Farañse, Wolof, Angale).',
      input: 'Kayitu admission ak sago SN-DKR-1984.',
      aiAction: 'Seet ndax xibaar yi mat nañu te wóor.',
      output: 'Dosiye bi ubbeeku na ci kow téere bu wóor.',
      uncertainty: 'Amul benn kayitu faju bu ñu jëlale tey.',
      confidence: 99,
      humanReview: false,
    },
    {
      num: 2,
      title: 'Jël 5 Kayitu Faju yi',
      desc: 'Dajale kayit yi jële Dakar, Paris ak Londres : kardiologie, kolesterol, ékografi ci Angale.',
      input: '5 kayitu faju ci Farañse ak Angale.',
      aiAction: 'Seet SHA-256 te denc lépp ci anam bu wóor.',
      output: '5 kayit yi denc nañu leen ci kow kañu bu gëna wóor.',
      uncertainty: 'Téere Angale (LVEF) ak Farañse (FEVG) ñu jaxase leen te leeral leen.',
      confidence: 97,
      humanReview: false,
    },
    {
      num: 3,
      title: 'Tëj ak Xam Kayit yi',
      desc: 'Séddale kayit yi ci 9 xaaj : tansiyoŋ 142/88, kolesterol 1.62 g/L, xol 62%.',
      input: 'Mbindu kayit yi.',
      aiAction: 'Chunking biomédical ak xool red flags.',
      output: 'Tableau bu am lépp ak fi mu jële xibaar yi.',
      uncertainty: 'Benn métit bopp bu ñu seet.',
      confidence: 94,
      humanReview: false,
    },
    {
      num: 4,
      title: 'Tontu bi (Xaaj ñaar)',
      desc: 'Leeral ñaari anam : kayitu Doktoor (pro) ak leeral Awa ci Wolof bu yomb.',
      input: 'Laj ci 9 xaaj yi.',
      aiAction: 'Tontu ci kow kayit yi rekk, du inventer dara.',
      output: 'Leeral Doktoor ak leeral Awa.',
      uncertainty: 'Wone kayit yi (DOC-001, DOC-002, DOC-005) ngir bañ feni.',
      confidence: 95,
      humanReview: false,
    },
    {
      num: 5,
      title: 'Wajal Rendez-vous bi',
      desc: 'Laj yi Awa war a laaj Doktoor Fall, natt tansiyoŋ bi bala rendez-vous bi.',
      input: 'Laju Awa ak konsiñ Doktoor Fall.',
      aiAction: 'Wajalaat laj yi ci anam bu leer.',
      output: 'Kayit bu Awa mën a yóbbu Doktoor.',
      uncertainty: 'Laj yii du prescription faju.',
      confidence: 92,
      humanReview: false,
    },
    {
      num: 6,
      title: 'Yoonu Faju ak Seetul Doktoor',
      desc: 'Takk aparay tansiyoŋ 24 waxtu (MAPA) ak seet deret ji. IA bi dafay laaj ndax Doktoor nangu na ko.',
      input: 'Ordonnance Doktoor Fall ak métit bopp.',
      aiAction: 'Safety Engine dafay tëj : HUMAN_REVIEW_REQUIRED.',
      output: 'Dosiye bi xaar na ba Doktoor Fall nangu ko.',
      uncertainty: 'Tansiyoŋu guddi gi, aparay 24 waxtu bi rekk mën ko wone.',
      confidence: 88,
      humanReview: true,
    },
    {
      num: 7,
      title: 'Kàllaama Wolof ak Kàddu gi',
      desc: 'Leeral lépp ci Wolof bu leer ak Angale. Leeral lu tax tansiyoŋ bi di yéeg.',
      input: '« Leeral ma ci Wolof ».',
      aiAction: 'Kàddug Wolof bu sell te leer.',
      output: 'Mbind ak kàddu ci Wolof.',
      uncertainty: 'Ay leeral la yu jàppale nit ki mu xam.',
      confidence: 96,
      humanReview: false,
    },
    {
      num: 8,
      title: 'Konsiñ Génti Hopital',
      desc: 'Garab yi ngay jël suba ak ngoon, ak li ngay def su bopp bi métee lool.',
      input: 'Ordonnance yi ak résumé génte.',
      aiAction: 'Séddale garab suba ak ngoon.',
      output: 'Nataal bu leer ak numéro urgence.',
      uncertainty: 'Laajal pharmacien bi bala nga jël.',
      confidence: 98,
      humanReview: false,
    },
    {
      num: 9,
      title: 'Wér-gu-yaram ak Nudge',
      desc: 'Dox bés bu nekk, wàññi xorom ci ñam yi, tëdd ci waxtu.',
      input: 'Konsiñ OMS ak wér-gu-yaram Awa.',
      aiAction: 'Nudge ngir dëgëral yoonu wér-gu-yaram.',
      output: 'Téere natt bés bu nekk.',
      uncertainty: 'Conseil la rekk, du faju direct.',
      confidence: 93,
      humanReview: false,
    },
    {
      num: 10,
      title: 'Nataalu Lim yi ak Njarñu bi',
      desc: 'Xool ni SantéNova soppee faju Awa ci waxtu, ci leer ak ci wóor.',
      input: 'Indicateurs avant ak après SantéNova.',
      aiAction: 'Natt waxtu ak wóorug liggeey bi.',
      output: 'Tableau d’impact bu leer jagleel Jury bi.',
      uncertainty: 'Indicateurs simulation la yu war a jëm ci clinique réell.',
      confidence: 96,
      humanReview: false,
    },
  ],
};

export class I18nService {
  private static currentLang: Language = 'fr';
  private static listeners: ((lang: Language) => void)[] = [];

  public static get language(): Language {
    return this.currentLang;
  }

  public static setLanguage(lang: Language) {
    this.currentLang = lang;
    this.listeners.forEach((l) => l(lang));
  }

  public static subscribe(listener: (lang: Language) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  public static t(): Translations {
    return translations[this.currentLang] || translations.fr;
  }

  public static getSteps(): LocalizedStep[] {
    return localizedChallengeSteps[this.currentLang] || localizedChallengeSteps.fr;
  }
}

