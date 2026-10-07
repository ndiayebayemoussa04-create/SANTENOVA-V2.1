import { HealthDocument, RAGCitation, RAGQueryResponse, ReviewStatus } from '../types';
import { mockHealthDocuments } from '../data/mockDocuments';
import { SafetyEngine } from './safetyEngine';

export class RAGService {
  private static documents: HealthDocument[] = mockHealthDocuments;

  public static query(userQuery: string): RAGQueryResponse {
    const cleanQuery = userQuery.trim().toLowerCase();
    const stopwords = new Set([
      'le', 'la', 'les', 'un', 'une', 'des', 'du', 'de', 'et', 'est', 'en', 'pour', 'son', 'sa', 'ses',
      'dans', 'sur', 'par', 'qui', 'que', 'quel', 'quelle', 'quels', 'quelles', 'the', 'and', 'for', 'with', 'what', 'how',
      'sont', 'ont', 'etre', 'avoir', 'ces', 'cet', 'cette', 'leurs', 'leur', 'chez', 'comme', 'actuel', 'actuels', 'actuelle'
    ]);

    const stripAccents = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    const queryTokens = cleanQuery
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, ' ')
      .split(/\s+/)
      .filter((t) => t.length > 2 && !stopwords.has(stripAccents(t)));

    // Retrieve matching chunks
    const scoredChunks: { chunk: any; score: number }[] = [];

    for (const doc of this.documents) {
      for (const chunk of doc.chunks) {
        let matchCount = 0;
        let matchedTokens = 0;
        const chunkContentNorm = stripAccents(chunk.content);
        const keywordsNorm = chunk.keywords.map((k: string) => stripAccents(k));

        for (const token of queryTokens) {
          const normToken = stripAccents(token);
          let tokenMatched = false;
          if (chunkContentNorm.includes(normToken)) {
            matchCount += 2;
            tokenMatched = true;
          }
          if (keywordsNorm.some((k: string) => k.includes(normToken))) {
            matchCount += 3;
            tokenMatched = true;
          }
          if (tokenMatched) {
            matchedTokens++;
          }
        }

        const coverage = queryTokens.length > 0 ? matchedTokens / queryTokens.length : 0;

        if (matchCount > 0) {
          const score = Math.min(1.0, (matchCount / Math.max(3, queryTokens.length * 2)) * (0.5 + coverage * 0.5));
          if (score >= 0.20) {
            scoredChunks.push({ chunk, score });
          }
        }
      }
    }

    // Explicit check for known absent clinical domains
    const absentDomains = ['poumon', 'chimio', 'insuline', 'dialyse', 'prostate', 'leucemie'];
    const hasAbsentDomain = absentDomains.some((d) => cleanQuery.includes(d));

    // Sort by score descending
    scoredChunks.sort((a, b) => b.score - a.score);

    // If no chunks match or query asks about unrecorded details or low score
    if (scoredChunks.length === 0 || scoredChunks[0].score < 0.35 || hasAbsentDomain) {
      return {
        query: userQuery,
        hasSufficientInfo: false,
        answerFr:
          "Informations insuffisantes pour répondre avec confiance. Aucun élément présent dans les documents de Madame Awa Ndiaye ne permet d'étayer cette question sans risque d'extrapolation ou d'hallucination.",
        answerWolof:
          "Xibaar yi barewul ngir tontu ci lu wóor. Amul benn kayit ci dosiye Awa Ndiaye bi wax loolu.",
        answerEn:
          'Insufficient information to answer with confidence. None of the patient documents provide evidence to substantiate this inquiry.',
        patientSimplifiedFr:
          "Cette question ne trouve pas de réponse dans les documents médicaux disponibles. Par précaution, nous vous recommandons d'interroger directement votre médecin lors de votre prochaine consultation.",
        clinicianSummaryFr:
          'DONNÉE NON RETROUVÉE DANS LE DOSSIER. Absence de source documentaire traçable pour la requête formulée. Statut de prudence activé : extrapolation bloquée.',
        citations: [],
        confidenceScore: 0.12,
        safetyStatus: 'HUMAN_REVIEW_REQUIRED',
        safetyReason: 'Absence de données sources vérifiables (Principe anti-hallucination SantéNova).',
        uncertaintyDisclaimer: 'Le système s’abstient de répondre afin d’éviter toute hallucination clinique.',
        requiresClinicianIntervention: true,
      };
    }

    // Top citations
    const topMatches = scoredChunks.slice(0, 3);
    const citations: RAGCitation[] = topMatches.map((m) => ({
      chunkId: m.chunk.id,
      documentTitle: m.chunk.documentTitle,
      section: m.chunk.section,
      snippet: m.chunk.content,
      relevanceScore: Math.round(m.score * 100),
    }));

    const topScore = topMatches[0].score;
    const confidence = Math.min(0.96, Math.max(0.72, topScore));

    // Formulate structured response based on clinical context
    let answerFr = '';
    let answerWolof = '';
    let answerEn = '';
    let patientSimplifiedFr = '';
    let clinicianSummaryFr = '';

    if (cleanQuery.includes('medicament') || cleanQuery.includes('traitement') || cleanQuery.includes('amlodipine') || cleanQuery.includes('atorvastatine')) {
      answerFr =
        "D'après la lettre du Dr. Fall (14/03/2026) et les instructions de sortie (28/02/2026), le traitement actuel comprend : Amlodipine 5 mg le matin au petit-déjeuner pour la tension artérielle, et Atorvastatine 10 mg le soir au coucher pour le cholestérol. Un bilan biologique hépatique et musculaire est prévu sous 3 mois.";
      answerWolof =
        "Ci kayiti Doktoor Fall ak bërëbu paj ma : Garab yi Awa Ndiaye di jël ñooy Amlodipine 5mg suba ci ndekki ngir tansiyoŋ bi, ak Atorvastatine 10mg ngoon ci guddi ngir kolesterol bi. Warul dakkal garab yi ci ndigalul doktoor rek.";
      answerEn =
        'According to Dr. Fall letter (03/14/2026) and discharge instructions (02/28/2026), current regimen is: Amlodipine 5 mg orally in the morning, and Atorvastatine 10 mg at bedtime. Follow-up liver and CPK labs scheduled at 3 months.';
      patientSimplifiedFr =
        "Vous prenez deux médicaments réguliers : un le matin au petit-déjeuner (Amlodipine pour la tension) et un le soir au coucher (Atorvastatine pour le cholestérol). Prenez-les tous les jours sans les interrompre sans l'accord de votre médecin.";
      clinicianSummaryFr =
        'Bi-thérapie en cours : Amlodipine 5mg/j (matin) + Atorvastatine 10mg/j (coucher). Indication : HTA essentielle + dyslipidémie mixte (LDL 1.62 g/L). Surveillance hépato-musculaire (transaminases + CPK) programmée fin mai 2026.';
    } else if (cleanQuery.includes('tension') || cleanQuery.includes('pression') || cleanQuery.includes('mapa') || cleanQuery.includes('cephale')) {
      answerFr =
        "La tension artérielle a été mesurée à 142/88 mmHg au repos le 14 Mars 2026. La patiente rapporte des céphalées matinales intermittentes. Le Dr. Fall a prescrit un enregistrement ambulatoire sur 24 heures (MAPA) à réaliser dans les 3 semaines pour vérifier la pression de nuit, ainsi qu'une limitation du sel.";
      answerWolof =
        "Tansiyoŋ bi mi ngi nekkoon 142/88 mmHg bi Doktoor Fall koy seet. Awa dafay yëg bopp buy metti ci suba yi. Doktoor bi sant na ko ab aparay buy natt tansiyoŋ bi 24 waxtu (MAPA) ngir xool ni mu mel ci guddi.";
      answerEn =
        'Resting blood pressure measured 142/88 mmHg on March 14, 2026. The patient reported intermittent morning headaches. A 24-hour ambulatory blood pressure monitoring (ABPM/MAPA) has been prescribed to assess nocturnal dipping profile.';
      patientSimplifiedFr =
        'Votre tension est un peu au-dessus de la normale idéale (142/88) et vous avez parfois mal à la tête le matin. Votre médecin a prévu un petit appareil qui mesurera votre tension toute la journée et la nuit (la MAPA) pour adapter au mieux vos soins.';
      clinicianSummaryFr =
        'Profil tensionnel : 142/88 mmHg au repos sous Amlodipine 5mg. Céphalées matinales rapportées. Prescription MAPA 24h pour recherche de profil non-dipper ou échappement tensionnel. Objectif cible < 130/80 mmHg.';
    } else if (cleanQuery.includes('cholesterol') || cleanQuery.includes('ldl') || cleanQuery.includes('bilan')) {
      answerFr =
        "Le bilan métabolique du 28/02/2026 à la Pitié-Salpêtrière retrouve un LDL-Cholestérol à 1.62 g/L (la cible thérapeutique visée est < 1.00 g/L). Les triglycérides sont à 1.55 g/L et la glycémie est normale à 0.98 g/L sans diabète (HbA1c 5.4%). L'échographie des carotides n'a pas montré de rétrécissement.";
      answerWolof =
        "Nat gu kolesterol bi ci Pitié-Salpêtrière wone na LDL ci 1.62 g/L (dafa war a wàcc ci suuf 1.00 g/L). Suukër bi ci yaram bi baax na (0.98 g/L), amul suukër (diabète). Ékografi yaram wi wone na yooni deret yi dëgërul.";
      answerEn =
        'Metabolic workup from 02/28/2026 shows LDL-C at 1.62 g/L (target < 1.00 g/L according to SCORE2). Normal fasting glucose at 0.98 g/L and normal HbA1c at 5.4%. Carotid ultrasound revealed no hemodynamically significant stenosis.';
      patientSimplifiedFr =
        "Votre prise de sang montre un taux de mauvais cholestérol (LDL) un peu trop haut par rapport à l'objectif de protection de vos artères. Heureusement, votre sucre est tout à fait normal et l'échographie de votre cou montre que les vaisseaux sont bien dégagés.";
      clinicianSummaryFr =
        'Bilan métabolique : Dyslipidémie type IIa avec LDL-C = 1.62 g/L (Cible SCORE2 < 1.00 g/L). HbA1c 5.4%, glycémie à jeun 0.98 g/L, DFG 94 mL/min. Échographie troncs supra-aortiques normale (absence de sténose carotidienne).';
    } else if (cleanQuery.includes('coeur') || cleanQuery.includes('echo') || cleanQuery.includes('anglais') || cleanQuery.includes('ejection')) {
      answerFr =
        "L'échographie cardiaque réalisée en langue anglaise le 10/01/2026 par le Dr. Jenkins montre une fraction d'éjection préservée à 62% (cœur qui pompe normalement), avec un remodelage concentrique léger lié à la tension artérielle et un trouble de relaxation (dysfonction diastolique grade 1). Pas d'anomalie des valves majeure.";
      answerWolof =
        "Ékografi xol bi ñu defoon ci ñaari weer yi weesu wone na xol bi mi ngi dëbb bu baax (62%). Amul benn loraang ci valve yi, waaye tansiyoŋ bi dafay jaaxle tuuti noflaay xol bi.";
      answerEn =
        'The echocardiogram performed by Dr. Jenkins shows preserved left ventricular systolic function with LVEF 62%, mild concentric remodeling, and Grade 1 diastolic dysfunction secondary to chronic hypertension. No valvular stenosis.',
      patientSimplifiedFr =
        "L'examen du cœur montre que la force de votre cœur est très bonne (62%). La paroi du muscle cardiaque est juste un tout petit peu épaissie par l'effort de la tension, ce qui confirme l'importance de bien contrôler votre pression avec le médicament.",
      clinicianSummaryFr =
        'Échocardiographie-Doppler : FEVG conservée à 62%, remodelage concentrique modéré du VG, altération de la relaxation (dysfonction diastolique Grade 1). Dilatation atriale gauche minime (LAVI 32 mL/m²). Absence de valvulopathie significative.';
    } else if (
      cleanQuery.includes('cancer') ||
      cleanQuery.includes('sein') ||
      cleanQuery.includes('mammographie') ||
      cleanQuery.includes('nodule') ||
      cleanQuery.includes('frottis') ||
      cleanQuery.includes('acr') ||
      cleanQuery.includes('depistage') ||
      cleanQuery.includes('dépistage')
    ) {
      answerFr =
        "D'après le compte rendu de sénologie du 12/02/2026 du Dr. Seck : Il n'y a AUCUN diagnostic de cancer. Le sein gauche est classé ACR 2 (normal/bénin). Le sein droit présente une petite formation nodulaire régulière de 7 mm classée ACR 3 (BI-RADS 3 : lésion très probablement bénigne, kyste simple ou fibroadénome, probabilité de malignité < 2%). Une échographie de surveillance à 6 mois (Août 2026) est prescrite par précaution. Le frottis cervico-utérin est strictement normal (négatif pour lésion intra-épithéliale).";
      answerWolof =
        "Ci kayitu seetu wéen yi ak jëmm ji (12/02/2026 Doktoor Seck) : Amul benn kànseer. Wéenub càmmooñ bi sell na (ACR 2). Wéenub ndeyjoor bi dafa am benn tuut-tuut bu yànj (bénin) bu tollu ci 7 mm, bu loraangul (< 2%). Doktoor bi sant na ñu seetwaat ko ci ékografi ci juróom-benn weer ngir wóorlu rek. Seetu col bi itam baax na.";
      answerEn =
        'According to the mammography and senology report from 02/12/2026 by Dr. Seck: There is NO cancer diagnosis. Left breast is classified ACR 2 (benign). Right breast shows a small 7 mm well-circumscribed nodule classified ACR 3 (BI-RADS 3: very probably benign, malignancy risk < 2%). A 6-month follow-up ultrasound (August 2026) is scheduled. Cervical cytology smear is negative for intraepithelial lesion or malignancy.';
      patientSimplifiedFr =
        "Rassurez-vous : votre bilan de dépistage ne montre aucun cancer. Votre sein gauche est parfaitement normal. Du côté droit, il y a un tout petit kyste bénin de 7 mm (comme une petite bille d'eau). Votre médecin a prévu une simple échographie dans 6 mois pour vérifier qu'il ne bouge pas. Votre frottis du col est également tout à fait normal.";
      clinicianSummaryFr =
        'Bilan de sénologie de dépistage (42 ans) : Sein gauche ACR 2 (normal). Sein droit ACR 3 (BI-RADS 3 : opacité nodulaire ovalaire 7 mm QSE, kyste simple ou fibroadénome, VPP malignité < 2%). Conduite à tenir : Échographie mammaire droite de contrôle à M6 (Août 2026). Frottis cervico-utérin négatif (NILM). Antécédent tante maternelle (sein 54 ans) : risque standard à modéré sans indication de test oncogénétique constitutionnel immédiat.';
    } else {
      // General synthesis from documents
      answerFr =
        "Dossier de Mme Awa Ndiaye, 42 ans : Suivi pour hypertension artérielle (142/88 mmHg) sous Amlodipine 5mg et dyslipidémie mixte (LDL 1.62 g/L) sous Atorvastatine 10mg. Examens programmés : MAPA des 24h et bilan biologique hépato-musculaire à 3 mois. Échocardiographie avec fonction contractile conservée (FEVG 62%).";
      answerWolof =
        "Dosiye Awa Ndiaye (42 at) : Mi ngi topp tansiyoŋ bi (142/88) ak kolesterol bi ci ñaari garab yi (Amlodipine suba, Atorvastatine guddi). Aparay MAPA war na natt tansiyoŋ bi ci 24 waxtu. Xol bi mi ngi dëbb bu baax (62%).";
      answerEn =
        'Medical record summary for Ms. Awa Ndiaye (42 yo): Managed for arterial hypertension (142/88 mmHg) on Amlodipine 5mg and mixed dyslipidemia (LDL-C 1.62 g/L) on Atorvastatin 10mg. Diagnostic timeline includes 24h ABPM and 3-month safety labs. TTE shows preserved LVEF (62%).';
      patientSimplifiedFr =
        'En résumé : vous êtes suivie avec attention pour votre tension et votre cholestérol. Vos deux médicaments protègent votre cœur et vos artères. Les prochains examens sont un enregistrement de la tension sur 24h et une prise de sang de contrôle.';
      clinicianSummaryFr =
        'Synthèse clinique transversale : Patiente de 42 ans, HTA essentielle grade 1 insuffisamment contrôlée sous monothérapie + dyslipidémie mixte modérée. Risque CV global intermédiaire. FEVG 62%, reins préservés (DFG 94). Plan : MAPA 24h + contrôle biologie M3.';
    }

    // Safety review of the answer
    const safetyCheck = SafetyEngine.evaluateAction('DOCUMENT_SUMMARY', answerFr, citations.length > 0, confidence);

    return {
      query: userQuery,
      hasSufficientInfo: true,
      answerFr,
      answerWolof,
      answerEn,
      patientSimplifiedFr,
      clinicianSummaryFr,
      citations,
      confidenceScore: confidence,
      safetyStatus: safetyCheck.status,
      safetyReason: safetyCheck.reasons.join(' '),
      uncertaintyDisclaimer:
        confidence < 0.85
          ? "Information indicative : nécessite corroboration avec l'examen clinique direct."
          : undefined,
      requiresClinicianIntervention: safetyCheck.requiresHumanReview,
    };
  }
}
