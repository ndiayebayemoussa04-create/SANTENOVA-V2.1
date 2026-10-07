// SantéNova v2.1 Core Types & Contracts

export type Language = 'fr' | 'wo' | 'en';

export type UserRole = 'jury' | 'patient' | 'clinician' | 'admin';

export type UserRoleCategory = 'PATIENT' | 'AIDANT' | 'MEDECIN' | 'SECRETAIRE' | 'ADMIN';

export type PermissionKey =
  | 'READ_OWN_RECORD'
  | 'WRITE_SELF_LOGS'
  | 'READ_CLINICAL_RECORDS'
  | 'VALIDATE_HUMAN_REVIEW'
  | 'WRITE_PRESCRIPTIONS'
  | 'MANAGE_APPOINTMENTS'
  | 'AUDIT_SYSTEM'
  | 'MANAGE_PLUGINS';

export interface UserAccount {
  id: string;
  email: string;
  fullName: string;
  role: UserRoleCategory;
  roleTitle: string;
  avatarUrl: string;
  permissions: PermissionKey[];
  mfaEnabled: boolean;
  preferredLanguage: Language;
  linkedPatientId?: string; // For patient and caregiver accounts
  createdAt: string;
  lastLogin: string;
}

export interface PatientBloodPressureLog {
  id: string;
  timestamp: string;
  systole: number; // e.g. 142
  diastole: number; // e.g. 88
  pulse: number; // e.g. 74
  period: 'MATIN' | 'SOIR';
  notes?: string;
  syncedToClinician: boolean;
}

export interface MedicationIntakeLog {
  id: string;
  date: string;
  timeSlot: 'MATIN' | 'MIDI' | 'SOIR';
  medicationName: string;
  dosage: string;
  taken: boolean;
  takenAt?: string;
}

export type ReviewStatus = 'APPROVED' | 'REJECTED' | 'HUMAN_REVIEW_REQUIRED' | 'PENDING' | 'AUTO_SAFE';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface ConsentPurpose {
  id: 'CARE' | 'PERSONALIZATION' | 'RESEARCH' | 'PUBLIC_HEALTH' | 'COMMUNICATION';
  name: string;
  description: string;
  granted: boolean;
  lastUpdated: string;
  mandatory: boolean;
}

export interface PatientProfile {
  id: string;
  fullName: string;
  age: number;
  gender: string;
  primaryLanguage: Language;
  spokenLanguages: Language[];
  avatarUrl: string;
  nationalHealthId: string;
  city: string;
  country: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  allergies: string[];
  chronicConditions: string[];
  currentMedications: {
    name: string;
    dosage: string;
    frequency: string;
    prescribedBy: string;
    verified: boolean;
  }[];
  isFictionalDemoData: true;
}

export interface HealthDocument {
  id: string;
  title: string;
  category: 'CONSULTATION_LETTER' | 'HOSPITAL_REPORT' | 'DISCHARGE_NOTE' | 'PATIENT_INFO' | 'LAB_CARDIOLOGY_EN' | 'CANCER_SCREENING_GYNECO';
  date: string;
  author: string;
  institution: string;
  language: Language;
  rawText: string;
  structuredData: {
    vitalSigns?: Record<string, string>;
    clinicalObservations?: string[];
    medicationsMentioned?: string[];
    recommendations?: string[];
    redFlags?: string[];
    cancerScreening?: {
      modality: string;
      classification: string; // e.g. ACR 2, ACR 3 (BI-RADS)
      organ: 'SEIN' | 'COL_UTERUS' | 'COLON' | 'PEAU';
      findings: string;
      followUpRecommendation: string;
      isSuspicious: boolean;
    };
  };
  chunks: DocumentChunk[];
}

export interface CancerScreeningRecord {
  id: string;
  organ: 'SEIN' | 'COL_UTERUS' | 'COLORECTAL' | 'PEAU_MELANOME' | 'GENETIQUE';
  organLabel: string;
  screeningType: string;
  lastExamDate: string;
  classification: string;
  interpretationStatus: 'NORMAL' | 'BENIN' | 'SURVEILLANCE_POUSSEE' | 'EVALUATION_HUMAINE_REQUISE';
  findingsSummary: string;
  nextScheduledDate: string;
  uncertaintyNotes: string;
  clinicianValidationStatus: ReviewStatus;
}

export interface DocumentChunk {
  id: string;
  documentId: string;
  documentTitle: string;
  content: string;
  page: number;
  section: string;
  keywords: string[];
}

export interface RAGCitation {
  chunkId: string;
  documentTitle: string;
  section: string;
  snippet: string;
  relevanceScore: number;
}

export interface RAGQueryResponse {
  query: string;
  hasSufficientInfo: boolean;
  answerFr: string;
  answerWolof: string;
  answerEn: string;
  patientSimplifiedFr: string;
  clinicianSummaryFr: string;
  citations: RAGCitation[];
  confidenceScore: number; // 0 to 1
  safetyStatus: ReviewStatus;
  safetyReason?: string;
  uncertaintyDisclaimer?: string;
  requiresClinicianIntervention: boolean;
}

export interface HumanReviewCase {
  id: string;
  timestamp: string;
  category: 'ORIENTATION_CLINIQUE' | 'DOSAGE_MEDICAMENTEUX' | 'ALERTE_SYMPTOME' | 'EXCLUSION_DONNEES';
  patientId: string;
  title: string;
  description: string;
  aiSuggestedAction: string;
  confidence: number;
  riskLevel: RiskLevel;
  status: ReviewStatus;
  reviewerNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  sources: string[];
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: 'LOGIN' | 'PATIENT_ACCESS' | 'DOCUMENT_QUERY' | 'AI_ORCHESTRATION' | 'HUMAN_REVIEW_DECISION' | 'CONSENT_CHANGE' | 'PLUGIN_TOGGLE' | 'WORKFLOW_STEP_COMPLETED';
  details: string;
  riskLevel: RiskLevel;
  resourceId?: string;
  metadata?: Record<string, any>;
}

export interface PluginModule {
  id: string;
  name: string;
  version: string;
  domain: 'document_rag' | 'vision_ai' | 'genomics_ai' | 'wearable_ai' | 'nudge_ai' | 'exposome_ai';
  description: string;
  permissionsRequired: ('READ_DOCS' | 'READ_BIOMETRICS' | 'READ_GENOMICS' | 'READ_LOCATION' | 'EMIT_NUDGE')[];
  enabled: boolean;
  status: 'HEALTHY' | 'DEGRADED' | 'STANDBY';
  latencyMs: number;
  requiresConsent: 'CARE' | 'PERSONALIZATION' | 'RESEARCH' | 'PUBLIC_HEALTH';
}

export interface RegisteredModel {
  modelId: string;
  name: string;
  version: string;
  domain: string;
  provider: string;
  status: 'ACTIVE' | 'TEST' | 'DEPRECATED' | 'ROLLBACK';
  riskLevel: RiskLevel;
  evaluationScore: number;
  createdAt: string;
  contextWindow: string;
}

export interface FairnessMetricGroup {
  groupName: string;
  sampleSize: number;
  sensitivity: number; // 0-100%
  specificity: number; // 0-100%
  precision: number; // 0-100%
  falsePositiveRate: number;
  falseNegativeRate: number;
  calibrationError: number;
}

export interface ComputeHardwareStatus {
  provider: 'AMDROCmProvider' | 'CPUProvider';
  chipName: string;
  isGpuActive: boolean;
  tensorCoresOrComputeUnits: number;
  memoryAllocatedMb: number;
  totalMemoryMb: number;
  temperatureC: number;
  averageLatencyMs: number;
  powerConsumptionWatts: number;
}

export interface ChallengeScenarioStep {
  stepNumber: number;
  title: string;
  shortDesc: string;
  status: 'IDLE' | 'PROCESSING' | 'COMPLETED' | 'WAITING_HUMAN';
  inputDataSummary: string;
  aiProcessingSummary: string;
  outputResultSummary: string;
  confidence: number;
  uncertaintyNotes?: string;
  humanReviewTriggered?: boolean;
}
