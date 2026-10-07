import {
  AuditLogEntry,
  ComputeHardwareStatus,
  ConsentPurpose,
  FairnessMetricGroup,
  HumanReviewCase,
  PluginModule,
  RegisteredModel,
  ReviewStatus,
  RiskLevel,
} from '../types';
import { SafetyEngine } from './safetyEngine';

export interface OrchestratorEvent {
  id: string;
  type: 'DOCUMENT_INGEST' | 'PATIENT_QUERY' | 'CLINICAL_DECISION_GATE' | 'WEARABLE_SYNC' | 'CONSENT_UPDATE';
  payload: any;
  timestamp: string;
}

export class AIOrchestrator {
  private static instance: AIOrchestrator;

  public plugins: PluginModule[] = [
    {
      id: 'plug-rag',
      name: 'Document / RAG AI Core',
      version: '2.4.1',
      domain: 'document_rag',
      description: 'Extraction sémantique, segmentation multilingue et citation des sources cliniques.',
      permissionsRequired: ['READ_DOCS'],
      enabled: true,
      status: 'HEALTHY',
      latencyMs: 38,
      requiresConsent: 'CARE',
    },
    {
      id: 'plug-vision',
      name: 'Vision AI (Multi-modale)',
      version: '1.9.0',
      domain: 'vision_ai',
      description: 'Détection de signaux sur imagerie médicale (radiographie, OCT rétinien, dermatologie).',
      permissionsRequired: ['READ_DOCS'],
      enabled: true,
      status: 'HEALTHY',
      latencyMs: 142,
      requiresConsent: 'CARE',
    },
    {
      id: 'plug-genomics',
      name: 'Genomics & Family Risk AI',
      version: '1.2.0',
      domain: 'genomics_ai',
      description: 'Évaluation statistique des risques polygéniques et antécédents familiaux avec consentement renforcé.',
      permissionsRequired: ['READ_GENOMICS'],
      enabled: true,
      status: 'HEALTHY',
      latencyMs: 85,
      requiresConsent: 'RESEARCH',
    },
    {
      id: 'plug-wearable',
      name: 'Wearable Longitudinal AI',
      version: '3.0.2',
      domain: 'wearable_ai',
      description: 'Analyse des tendances physiologiques continues (sommeil, fréquence cardiaque au repos, pas).',
      permissionsRequired: ['READ_BIOMETRICS'],
      enabled: true,
      status: 'HEALTHY',
      latencyMs: 24,
      requiresConsent: 'PERSONALIZATION',
    },
    {
      id: 'plug-nudge',
      name: 'Compassionate Nudge AI',
      version: '2.1.0',
      domain: 'nudge_ai',
      description: 'Génération de micro-objectifs préventifs bienveillants et non culpabilisants.',
      permissionsRequired: ['EMIT_NUDGE'],
      enabled: true,
      status: 'HEALTHY',
      latencyMs: 19,
      requiresConsent: 'PERSONALIZATION',
    },
    {
      id: 'plug-exposome',
      name: 'Exposome & Territorial Context AI',
      version: '1.4.5',
      domain: 'exposome_ai',
      description: 'Corrélation environnementale (qualité de l’air AQI, température, contexte territorial Dakar/Paris).',
      permissionsRequired: ['READ_LOCATION'],
      enabled: true,
      status: 'HEALTHY',
      latencyMs: 31,
      requiresConsent: 'PUBLIC_HEALTH',
    },
    {
      id: 'plug-oncology',
      name: 'Onco-Prevention & Screening AI',
      version: '2.0.1',
      domain: 'vision_ai',
      description: 'Analyse d’imagerie sénologique (ACR/BI-RADS), dépistage gynécologique, test colorectal et prévention primaire.',
      permissionsRequired: ['READ_DOCS', 'READ_GENOMICS'],
      enabled: true,
      status: 'HEALTHY',
      latencyMs: 42,
      requiresConsent: 'CARE',
    },
  ];

  public models: RegisteredModel[] = [
    {
      modelId: 'sn-med-bilingual-v2',
      name: 'SantéNova Clinical Bi-Lingual',
      version: '2.2.0',
      domain: 'Clinique générale & Multilingue (FR / Wolof / EN)',
      provider: 'SantéNova AI Engine / Open Weights',
      status: 'ACTIVE',
      riskLevel: 'MEDIUM',
      evaluationScore: 94.8,
      createdAt: '2026-02-15',
      contextWindow: '32k tokens',
    },
    {
      modelId: 'sn-rag-bioclinical-v3',
      name: 'BioClinical Embedding & Retrieval',
      version: '3.1.2',
      domain: 'RAG & Vérification de sources',
      provider: 'Internal BioEmbedder',
      status: 'ACTIVE',
      riskLevel: 'LOW',
      evaluationScore: 98.2,
      createdAt: '2026-01-20',
      contextWindow: '8k tokens',
    },
    {
      modelId: 'sn-vision-retinal-v1',
      name: 'Retinal Screening Signal Detector',
      version: '1.1.0',
      domain: 'Imagerie OCT / Fond d’œil',
      provider: 'SantéNova Vision Lab',
      status: 'TEST',
      riskLevel: 'HIGH',
      evaluationScore: 91.4,
      createdAt: '2026-03-01',
      contextWindow: 'Image Tensor 512x512',
    },
    {
      modelId: 'sn-nudge-behavior-v1',
      name: 'Ethical Behavioral Nudge Engine',
      version: '1.0.8',
      domain: 'Prévention & Hygiène de vie bienveillante',
      provider: 'Behavioral Health AI',
      status: 'ACTIVE',
      riskLevel: 'LOW',
      evaluationScore: 96.5,
      createdAt: '2026-02-28',
      contextWindow: '4k tokens',
    },
  ];

  public consents: ConsentPurpose[] = [
    {
      id: 'CARE',
      name: 'Soins et Coordination Médicale',
      description: 'Accès aux documents médicaux, ordonnances et comptes rendus pour la prise en charge directe.',
      granted: true,
      lastUpdated: '2026-03-14 09:30',
      mandatory: true,
    },
    {
      id: 'PERSONALIZATION',
      name: 'Personnalisation & Bien-être (Wearables & Nudge)',
      description: 'Analyse des données de montre connectée (sommeil, pas) pour adapter les conseils d’hygiène de vie.',
      granted: true,
      lastUpdated: '2026-03-14 09:32',
      mandatory: false,
    },
    {
      id: 'RESEARCH',
      name: 'Recherche Clinique et Données Génomiques',
      description: 'Participation anonymisée aux études épidémiologiques et analyses génétiques statistiques.',
      granted: false, // Patient has not consented yet
      lastUpdated: '2026-03-14 09:32',
      mandatory: false,
    },
    {
      id: 'PUBLIC_HEALTH',
      name: 'Indicateurs de Santé Publique Territoriale',
      description: 'Partage de métriques agrégées sans aucune donnée nominative pour les observatoires de santé.',
      granted: true,
      lastUpdated: '2026-03-14 09:32',
      mandatory: false,
    },
    {
      id: 'COMMUNICATION',
      name: 'Rappels sécurisés (SMS & Notifications)',
      description: 'Envoi d’alertes de rendez-vous sans données médicales sensibles (principe de minimisation).',
      granted: true,
      lastUpdated: '2026-03-14 09:32',
      mandatory: false,
    },
  ];

  public humanReviewQueue: HumanReviewCase[] = [
    {
      id: 'REV-2026-001',
      timestamp: '14 Mars 2026 10:15',
      category: 'ORIENTATION_CLINIQUE',
      patientId: 'PAT-NDIAYE-2026-042',
      title: 'Validation de prescription MAPA 24h & Bilan de contrôle',
      description:
        'Proposition automatique d’orientation pour pose de MAPA sous 3 semaines suite à PA 142/88 mmHg et céphalées matinales.',
      aiSuggestedAction: 'Confirmer la priorisation de la pose de MAPA et la programmation du bilan rénal/lipidique.',
      confidence: 0.88,
      riskLevel: 'HIGH',
      status: 'HUMAN_REVIEW_REQUIRED',
      reviewerNotes: '',
      sources: ['DOC-001 (Lettre Dr. Fall)', 'DOC-003 (Instructions de sortie)'],
    },
    {
      id: 'REV-2026-002',
      timestamp: '14 Mars 2026 11:20',
      category: 'ALERTE_SYMPTOME',
      patientId: 'PAT-NDIAYE-2026-042',
      title: 'Signalement de myalgies potentielles sous Atorvastatine',
      description:
        'La patiente a mentionné une inquiétude sur les crampes musculaires lors du démarrage de la statine.',
      aiSuggestedAction:
        'Rappeler la nécessité de consulter si crampes ou urines foncées, avec dosage CPK si persistant. Ne pas interrompre sans avis.',
      confidence: 0.79,
      riskLevel: 'HIGH',
      status: 'APPROVED',
      reviewerNotes: 'Validé par Dr. Fall : recommandation de dosage CPK à prescrire si les myalgies se confirment.',
      reviewedBy: 'Dr. Ousmane Fall (Cardiologue)',
      reviewedAt: '14 Mars 2026 11:45',
      sources: ['DOC-002 (Bilan Métabolique)', 'DOC-003 (Signaux d alerte)'],
    },
    {
      id: 'REV-2026-003',
      timestamp: '14 Mars 2026 14:05',
      category: 'ORIENTATION_CLINIQUE',
      patientId: 'PAT-NDIAYE-2026-042',
      title: 'Validation de surveillance échographique à 6 mois (Nodule mammaire 7 mm ACR 3)',
      description:
        'Dépistage sénologique du 12/02/2026 : nodule QSE droit classé ACR 3 (très probablement bénin, VPP < 2%). La proposition est une échographie de contrôle à M6 (Août 2026) sans geste invasif d’emblée.',
      aiSuggestedAction:
        'Valider le protocole de surveillance échographique unilatérale à M6 et rassurer la patiente sans examen invasif superflu.',
      confidence: 0.94,
      riskLevel: 'HIGH',
      status: 'HUMAN_REVIEW_REQUIRED',
      reviewerNotes: '',
      sources: ['DOC-006 (Compte rendu Sénologie Dr. Seck)'],
    },
  ];

  public auditTrail: AuditLogEntry[] = [
    {
      id: 'AUD-001',
      timestamp: '2026-03-14 08:30:12',
      actor: 'Secrétariat Médical (Dakar)',
      action: 'LOGIN',
      details: 'Connexion sécurisée par authentification forte biométrique (MFA).',
      riskLevel: 'LOW',
    },
    {
      id: 'AUD-002',
      timestamp: '2026-03-14 08:31:45',
      actor: 'Système SantéNova',
      action: 'PATIENT_ACCESS',
      details: 'Ouverture du dossier patient PAT-NDIAYE-2026-042 (Awa Ndiaye).',
      riskLevel: 'LOW',
      resourceId: 'PAT-NDIAYE-2026-042',
    },
    {
      id: 'AUD-003',
      timestamp: '2026-03-14 08:33:02',
      actor: 'Pipeline Ingestion RAG',
      action: 'DOCUMENT_QUERY',
      details: 'Indexation de 5 documents, 9 segments chunkés, vérification d’intégrité cryptographique SHA-256.',
      riskLevel: 'LOW',
    },
    {
      id: 'AUD-004',
      timestamp: '2026-03-14 10:15:30',
      actor: 'AI Orchestrator',
      action: 'AI_ORCHESTRATION',
      details:
        'Évaluation de la proposition d’orientation clinique : risque clinique élevé détecté. Statut défini sur HUMAN_REVIEW_REQUIRED.',
      riskLevel: 'HIGH',
      resourceId: 'REV-2026-001',
    },
  ];

  public fairnessMetrics: FairnessMetricGroup[] = [
    {
      groupName: 'Tous patients confondus (Global)',
      sampleSize: 4200,
      sensitivity: 96.4,
      specificity: 97.8,
      precision: 95.2,
      falsePositiveRate: 2.2,
      falseNegativeRate: 3.6,
      calibrationError: 1.8,
    },
    {
      groupName: 'Locuteurs Wolof & Bilingues (Afrique de l’Ouest)',
      sampleSize: 1350,
      sensitivity: 95.8,
      specificity: 97.2,
      precision: 94.6,
      falsePositiveRate: 2.8,
      falseNegativeRate: 4.2,
      calibrationError: 2.1,
    },
    {
      groupName: 'Femmes 40–60 ans (Risque Cardiovasculaire)',
      sampleSize: 1100,
      sensitivity: 96.9,
      specificity: 98.1,
      precision: 96.0,
      falsePositiveRate: 1.9,
      falseNegativeRate: 3.1,
      calibrationError: 1.5,
    },
    {
      groupName: 'Zones rurales / Faible débit réseau (SMS/USSD)',
      sampleSize: 850,
      sensitivity: 94.2,
      specificity: 96.5,
      precision: 93.8,
      falsePositiveRate: 3.5,
      falseNegativeRate: 5.8,
      calibrationError: 2.9,
    },
  ];

  public hardwareStatus: ComputeHardwareStatus = {
    provider: 'AMDROCmProvider',
    chipName: 'AMD Radeon™ / Instinct™ ROCm Accelerator (Open Platform)',
    isGpuActive: true,
    tensorCoresOrComputeUnits: 84,
    memoryAllocatedMb: 6144,
    totalMemoryMb: 16384,
    temperatureC: 44.5,
    averageLatencyMs: 28.4,
    powerConsumptionWatts: 82.0,
  };

  private constructor() {}

  public static getInstance(): AIOrchestrator {
    if (!AIOrchestrator.instance) {
      AIOrchestrator.instance = new AIOrchestrator();
    }
    return AIOrchestrator.instance;
  }

  public logAudit(actor: string, action: AuditLogEntry['action'], details: string, riskLevel: RiskLevel = 'LOW', resourceId?: string) {
    const entry: AuditLogEntry = {
      id: `AUD-${Date.now().toString().slice(-5)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      actor,
      action,
      details,
      riskLevel,
      resourceId,
    };
    this.auditTrail.unshift(entry);
  }

  public updateConsent(purposeId: ConsentPurpose['id'], granted: boolean) {
    const purpose = this.consents.find((c) => c.id === purposeId);
    if (purpose) {
      if (purpose.mandatory && !granted) {
        return { success: false, message: 'Cette finalité est obligatoire pour le fonctionnement de base des soins.' };
      }
      purpose.granted = granted;
      purpose.lastUpdated = new Date().toISOString().replace('T', ' ').slice(0, 16);

      // Disable linked plugins if consent revoked
      this.plugins.forEach((plug) => {
        if (plug.requiresConsent === purposeId && !granted) {
          plug.enabled = false;
        }
      });

      this.logAudit(
        'Patiente Awa Ndiaye (Portail)',
        'CONSENT_CHANGE',
        `Mise à jour du consentement [${purpose.name}] : ${granted ? 'ACCORDÉ' : 'RÉVOQUÉ'}`,
        'MEDIUM'
      );
      return { success: true, message: 'Consentement mis à jour avec succès.' };
    }
    return { success: false, message: 'Finalité inconnue.' };
  }

  public togglePlugin(pluginId: string): boolean {
    const plugin = this.plugins.find((p) => p.id === pluginId);
    if (!plugin) return false;

    // Check if consent is granted for this plugin
    const consent = this.consents.find((c) => c.id === plugin.requiresConsent);
    if (consent && !consent.granted && !plugin.enabled) {
      return false; // Cannot enable without consent
    }

    plugin.enabled = !plugin.enabled;
    this.logAudit(
      'Administrateur Système',
      'PLUGIN_TOGGLE',
      `Module [${plugin.name}] passé à l’état ${plugin.enabled ? 'ACTIF' : 'INACTIF'}`,
      'LOW'
    );
    return true;
  }

  public updateReviewStatus(caseId: string, status: ReviewStatus, notes: string, reviewer: string) {
    const reviewCase = this.humanReviewQueue.find((c) => c.id === caseId);
    if (!reviewCase) return false;

    reviewCase.status = status;
    reviewCase.reviewerNotes = notes;
    reviewCase.reviewedBy = reviewer;
    reviewCase.reviewedAt = new Date().toISOString().replace('T', ' ').slice(0, 16);

    this.logAudit(
      reviewer,
      'HUMAN_REVIEW_DECISION',
      `Décision de révision humaine sur le cas [${caseId}] : ${status}. Notes : "${notes}"`,
      status === 'APPROVED' ? 'LOW' : 'MEDIUM',
      caseId
    );
    return true;
  }

  public toggleHardwareProvider() {
    if (this.hardwareStatus.provider === 'AMDROCmProvider') {
      this.hardwareStatus = {
        provider: 'CPUProvider',
        chipName: 'Host Multi-Core CPU (Fallback sécurisé)',
        isGpuActive: false,
        tensorCoresOrComputeUnits: 16,
        memoryAllocatedMb: 2048,
        totalMemoryMb: 8192,
        temperatureC: 38.0,
        averageLatencyMs: 64.2,
        powerConsumptionWatts: 35.0,
      };
    } else {
      this.hardwareStatus = {
        provider: 'AMDROCmProvider',
        chipName: 'AMD Radeon™ / Instinct™ ROCm Accelerator (Open Platform)',
        isGpuActive: true,
        tensorCoresOrComputeUnits: 84,
        memoryAllocatedMb: 6144,
        totalMemoryMb: 16384,
        temperatureC: 44.5,
        averageLatencyMs: 28.4,
        powerConsumptionWatts: 82.0,
      };
    }
    this.logAudit(
      'Infrastructure Orchestrator',
      'AI_ORCHESTRATION',
      `Bascule de l'accélérateur matériel : ${this.hardwareStatus.provider}`,
      'LOW'
    );
  }
}
