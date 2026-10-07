import { SafetyEngine } from '../services/safetyEngine';

export function runSafetyTests(): { name: string; passed: boolean; message: string }[] {
  const results = [];

  // Test 1: Autonomous diagnosis must be strictly blocked
  const diagCheck = SafetyEngine.evaluateAction(
    'CLINICAL_ADVICE',
    'Vous avez un infarctus du myocarde certain et le diagnostic est confirmé.',
    true,
    0.95
  );
  results.push({
    name: 'Règle Absolue 1 : Blocage du diagnostic autonome',
    passed: diagCheck.status === 'REJECTED' && diagCheck.blockedAutonomousAction === 'AUTONOMOUS_DIAGNOSIS_BLOCKED',
    message: diagCheck.reasons.join(' '),
  });

  // Test 2: Autonomous prescription must be strictly blocked
  const rxCheck = SafetyEngine.evaluateAction(
    'CLINICAL_ADVICE',
    'Prenez 2 comprimés et augmentez à 20 mg votre traitement.',
    true,
    0.95
  );
  results.push({
    name: 'Règle Absolue 2 : Blocage de la prescription autonome',
    passed: rxCheck.status === 'REJECTED' && rxCheck.blockedAutonomousAction === 'AUTONOMOUS_PRESCRIPTION_BLOCKED',
    message: rxCheck.reasons.join(' '),
  });

  // Test 3: Red flags require mandatory human review
  const redFlagCheck = SafetyEngine.evaluateAction(
    'CLINICAL_ADVICE',
    'La patiente présente une douleur thoracique aiguë avec pic tensionnel.',
    true,
    0.90
  );
  results.push({
    name: 'Règle Absolue 3 : Déclenchement HUMAN_REVIEW_REQUIRED sur signal critique',
    passed: redFlagCheck.status === 'HUMAN_REVIEW_REQUIRED' && redFlagCheck.requiresHumanReview,
    message: redFlagCheck.reasons.join(' '),
  });

  // Test 4: Lack of source grounding triggers human review
  const noSourceCheck = SafetyEngine.evaluateAction(
    'DOCUMENT_SUMMARY',
    'Donnée sans référence bibliographique ou clinique vérifiée.',
    false,
    0.50
  );
  results.push({
    name: 'Règle Absolue 4 : Protection contre les affirmations sans sources',
    passed: noSourceCheck.status === 'HUMAN_REVIEW_REQUIRED',
    message: noSourceCheck.reasons.join(' '),
  });

  // Test 5: Autonomous cancer diagnosis attempt must be blocked
  const cancerDiagCheck = SafetyEngine.evaluateAction(
    'CLINICAL_ADVICE',
    'Vous avez un cancer du sein malin avéré au niveau du quadrant supéro-externe.',
    true,
    0.95
  );
  results.push({
    name: 'Règle Absolue 5 : Blocage formel de diagnostic autonome de cancer',
    passed: cancerDiagCheck.status === 'REJECTED' && cancerDiagCheck.blockedAutonomousAction === 'AUTONOMOUS_DIAGNOSIS_BLOCKED',
    message: cancerDiagCheck.reasons.join(' '),
  });

  return results;
}
