import { HumanReviewCase, ReviewStatus, RiskLevel } from '../types';

export interface SafetyCheckResult {
  isSafe: boolean;
  status: ReviewStatus;
  riskLevel: RiskLevel;
  reasons: string[];
  requiresHumanReview: boolean;
  blockedAutonomousAction?: string;
}

export class SafetyEngine {
  private static highRiskKeywords = [
    'diagnostic',
    'diagnostiquer',
    'prescrire',
    'prescription',
    'augmenter la dose',
    'diminuer la dose',
    'arreter le traitement',
    'changer traitement',
    'remplacer medecin',
    'infarctus certain',
    'cancer certain',
  ];

  private static clinicalRedFlagKeywords = [
    'douleur thoracique',
    'oppression',
    'perte de connaissance',
    'paralysie',
    'confusion',
    'trouble visuel aigu',
    'myalgie severe',
    'tension > 160',
    'pic tensionnel',
  ];

  public static evaluateAction(
    actionType: 'DOCUMENT_SUMMARY' | 'APPOINTMENT_PREP' | 'CARE_ORIENTATION' | 'CLINICAL_ADVICE' | 'DISCHARGE_INSTRUCTION',
    content: string,
    hasGroundingSources: boolean,
    confidenceScore: number
  ): SafetyCheckResult {
    const reasons: string[] = [];
    const lowerContent = content.toLowerCase();

    // Rule 1: No autonomous clinical diagnosis
    if (
      lowerContent.includes('vous avez un') ||
      lowerContent.includes('le diagnostic est') ||
      lowerContent.includes('diagnostic certain') ||
      lowerContent.includes('vous souffrez formellement de')
    ) {
      return {
        isSafe: false,
        status: 'REJECTED',
        riskLevel: 'CRITICAL',
        reasons: [
          'Violation de la règle fondamentale : SantéNova ne pose aucun diagnostic autonome.',
          'Une hypothèse ou un signal doit être formulé comme : "Signal potentiel nécessitant une évaluation professionnelle".',
        ],
        requiresHumanReview: true,
        blockedAutonomousAction: 'AUTONOMOUS_DIAGNOSIS_BLOCKED',
      };
    }

    // Rule 2: No autonomous prescription or dosage modification
    if (
      lowerContent.includes('prenez 2 comprimés') ||
      lowerContent.includes('arrêtez votre') ||
      lowerContent.includes('stoppez le traitement') ||
      lowerContent.includes('je vous prescris') ||
      lowerContent.includes('augmentez à 20 mg')
    ) {
      return {
        isSafe: false,
        status: 'REJECTED',
        riskLevel: 'CRITICAL',
        reasons: [
          'Violation de la règle fondamentale : SantéNova ne prescrit ni ne modifie aucun traitement médical.',
          'Toute adaptation posologique relève exclusivement du médecin traitant.',
        ],
        requiresHumanReview: true,
        blockedAutonomousAction: 'AUTONOMOUS_PRESCRIPTION_BLOCKED',
      };
    }

    // Rule 3: High-risk red flags require mandatory Human Review
    const hasRedFlag = this.clinicalRedFlagKeywords.some((flag) => lowerContent.includes(flag));
    if (hasRedFlag) {
      reasons.push("Présence d'un signal clinique d'alerte : révision humaine par un professionnel de santé obligatoire.");
      return {
        isSafe: false,
        status: 'HUMAN_REVIEW_REQUIRED',
        riskLevel: 'HIGH',
        reasons,
        requiresHumanReview: true,
      };
    }

    // Rule 4: Grounding and confidence verification
    if (!hasGroundingSources) {
      reasons.push("Aucune source clinique documentée pour étayer cette affirmation.");
      return {
        isSafe: false,
        status: 'HUMAN_REVIEW_REQUIRED',
        riskLevel: 'MEDIUM',
        reasons,
        requiresHumanReview: true,
      };
    }

    if (confidenceScore < 0.70) {
      reasons.push(`Score de confiance insuffisant (${Math.round(confidenceScore * 100)}% < seuil 70%) : revue humaine requise.`);
      return {
        isSafe: false,
        status: 'HUMAN_REVIEW_REQUIRED',
        riskLevel: 'MEDIUM',
        reasons,
        requiresHumanReview: true,
      };
    }

    // Safe low-risk action with sources
    return {
      isSafe: true,
      status: 'AUTO_SAFE',
      riskLevel: 'LOW',
      reasons: ['Validation automatique conforme : sources vérifiées, absence de décision clinique autonome.'],
      requiresHumanReview: false,
    };
  }
}
