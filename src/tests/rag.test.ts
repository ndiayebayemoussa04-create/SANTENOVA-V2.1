import { RAGService } from '../services/ragService';

export function runRAGTests(): { name: string; passed: boolean; message: string }[] {
  const results = [];

  // Test 1: Grounded query retrieves citations and sufficient info
  const groundedRes = RAGService.query('Quels sont les médicaments actuels ?');
  results.push({
    name: 'RAG Test 1 : Récupération étayée et citations de sources',
    passed: groundedRes.hasSufficientInfo && groundedRes.citations.length > 0 && groundedRes.confidenceScore >= 0.7,
    message: `Confiance : ${Math.round(groundedRes.confidenceScore * 100)}%, Citations : ${groundedRes.citations.length}`,
  });

  // Test 2: Unbacked query refuses to hallucinate
  const hallucinationRes = RAGService.query('Quel est le protocole de chimiothérapie pour son cancer des poumons ?');
  results.push({
    name: 'RAG Test 2 : Refus d’extrapolation / Anti-Hallucination',
    passed:
      !hallucinationRes.hasSufficientInfo &&
      hallucinationRes.answerFr.includes('Informations insuffisantes pour répondre avec confiance') &&
      hallucinationRes.confidenceScore < 0.3,
    message: `Statut : Données insuffisantes vérifiées, Confiance : ${Math.round(hallucinationRes.confidenceScore * 100)}%`,
  });

  // Test 3: Grounded cancer screening query
  const cancerScreeningRes = RAGService.query('Quels sont les résultats du dépistage du cancer et de la mammographie ?');
  results.push({
    name: 'RAG Test 3 : Récupération du dépistage sénologique (DOC-006) et clarification bienveillante',
    passed:
      cancerScreeningRes.hasSufficientInfo &&
      cancerScreeningRes.answerFr.includes('ACR 3') &&
      cancerScreeningRes.citations.length > 0 &&
      cancerScreeningRes.confidenceScore >= 0.7,
    message: `Confiance : ${Math.round(cancerScreeningRes.confidenceScore * 100)}%, Citations : ${cancerScreeningRes.citations.length}`,
  });

  return results;
}
