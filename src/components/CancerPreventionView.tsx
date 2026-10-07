import React, { useState, useEffect } from 'react';
import { AIOrchestrator } from '../services/orchestrator';
import { CancerScreeningRecord, Language } from '../types';
import { I18nService } from '../services/i18n';
import { VoiceService } from '../services/voiceService';
import {
  Ribbon,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Calendar,
  Heart,
  Volume2,
  VolumeX,
  Stethoscope,
  User,
  ExternalLink,
  Info,
  Check,
  Dna,
  Sparkles,
} from 'lucide-react';

interface CancerPreventionViewProps {
  onNavigateToReviews: () => void;
}

export const CancerPreventionView: React.FC<CancerPreventionViewProps> = ({ onNavigateToReviews }) => {
  const orchestrator = AIOrchestrator.getInstance();
  const [selectedOrgan, setSelectedOrgan] = useState<'SEIN' | 'COL_UTERUS' | 'COLORECTAL' | 'GENETIQUE'>('SEIN');
  const [viewMode, setViewMode] = useState<'patient' | 'pro'>('patient');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [wolofMode, setWolofMode] = useState<boolean>(false);
  const [lang, setLang] = useState<Language>(I18nService.language);

  useEffect(() => {
    const unsub = I18nService.subscribe((l) => setLang(l));
    return unsub;
  }, []);

  const t = I18nService.t();

  // Concrete Screening Records for Awa Ndiaye (42 years old)
  const screeningRecords: CancerScreeningRecord[] = [
    {
      id: 'SCR-SEIN-001',
      organ: 'SEIN',
      organLabel: 'Sénologie & Dépistage Mammaire',
      screeningType: 'Mammographie numérique 2D/3D + Échographie bilatérale',
      lastExamDate: '12 Février 2026',
      classification: 'ACR 3 (Sein Droit) / ACR 2 (Sein Gauche)',
      interpretationStatus: 'SURVEILLANCE_POUSSEE',
      findingsSummary:
        'Sein gauche : strictement normal (ACR 2). Sein droit : petite formation nodulaire de 7 mm au QSE, ovale, régulière, sans signal Doppler, typique d’un kyste simple ou fibroadénome bénin (ACR 3).',
      nextScheduledDate: 'Août 2026 (Contrôle échographique à 6 mois)',
      uncertaintyNotes:
        'La classification ACR 3 indique une probabilité de malignité inférieure à 2% (lésion très probablement bénigne). L’histologie par biopsie n’est pas indiquée en première intention ; la stabilité à 6 mois confirmera la bénignité absolue.',
      clinicianValidationStatus: 'HUMAN_REVIEW_REQUIRED',
    },
    {
      id: 'SCR-COL-002',
      organ: 'COL_UTERUS',
      organLabel: 'Gynécologie & Col de l’Utérus',
      screeningType: 'Frottis cervico-utérin de dépistage (Cytologie en milieu liquide)',
      lastExamDate: '12 Février 2026',
      classification: 'Bethesda NILM (Négatif)',
      interpretationStatus: 'NORMAL',
      findingsSummary:
        'Absence d’anomalie cellulaire, absence de lésion intra-épithéliale ou de malignité. Prélèvement endocervical satisfaisant.',
      nextScheduledDate: 'Février 2029 (Recommandation OMS/HAS tous les 3 ans)',
      uncertaintyNotes: 'Examen de dépistage normal avec excellente valeur prédictive négative.',
      clinicianValidationStatus: 'APPROVED',
    },
    {
      id: 'SCR-COLON-003',
      organ: 'COLORECTAL',
      organLabel: 'Dépistage Colorectal Organisé',
      screeningType: 'Test immunologique fécal (FIT) de recherche de sang occulte',
      lastExamDate: 'Non éligible avant 50 ans',
      classification: 'Calendrier Préventif Anticipé',
      interpretationStatus: 'NORMAL',
      findingsSummary:
        'Absence de symptôme digestif ou d’antécédent de polypose au 1er degré. Inclusion au programme national de dépistage dès 50 ans.',
      nextScheduledDate: 'Septembre 2034 (À l’âge de 50 ans)',
      uncertaintyNotes: 'Planification préventive basée sur les recommandations nationales.',
      clinicianValidationStatus: 'AUTO_SAFE',
    },
    {
      id: 'SCR-GEN-004',
      organ: 'GENETIQUE',
      organLabel: 'Histoire Familiale & Oncogénétique',
      screeningType: 'Évaluation des antécédents familiaux (Modèle Gail / Eisinger)',
      lastExamDate: 'Février 2026',
      classification: 'Risque Statistique Moyen à Modéré',
      interpretationStatus: 'BENIN',
      findingsSummary:
        'Antécédent d’une tante maternelle (cancer du sein diagnostiqué à 54 ans). Absence d’agrégation familiale multiple (pas d’autre cas au 1er ou 2e degré). Score Eisinger < 3.',
      nextScheduledDate: 'Surveillance standard + Sénologie régulière',
      uncertaintyNotes:
        'Estimation purement statistique. Absence d’indication à un test génétique constitutionnel BRCA1/2 ou Lynch.',
      clinicianValidationStatus: 'AUTO_SAFE',
    },
  ];

  const currentRecord = screeningRecords.find((r) => r.organ === selectedOrgan) || screeningRecords[0];

  const patientExplanations: Record<Language, string> = {
    fr: "« Rassurez-vous Awa : votre bilan ne montre aucun cancer. Votre sein gauche est parfaitement normal (classé ACR 2). Sur le sein droit, il y a simplement une petite formation bénigne de 7 mm, semblable à une petite bille d'eau (kyste simple ou fibroadénome). Le risque de malignité est inférieur à 2%. Votre médecin a prévu une simple échographie dans 6 mois (Août 2026) pour vérifier qu'elle reste parfaitement stable. Votre frottis du col est également strictement normal. »",
    en: "« Rest assured Awa: your examination reveals no evidence of cancer. Your left breast is completely normal (classified ACR 2). On your right breast, there is simply a small benign 7mm formation, like a tiny fluid bubble (simple cyst or fibroadenoma). The risk of malignancy is below 2%. Your physician has scheduled a gentle 6-month follow-up ultrasound in August 2026 to verify that it remains perfectly stable. Your cervical Pap smear is also completely normal. »",
    wo: "« Rassurez-vous Awa : amul benn kànseer bu ñu gis ci sa yaram. Wéenub càmmooñ bi sell na lépp (ACR 2). Ci wéenub ndeyjoor bi, dafa am benn tuut-tuut bu yànj (bénin) bu tollu ci 7 mm, mel ni benn tuut ndox. Doktoor bi sant na ñu seetwaat ko ci ékografi ci weeru Ut (Août 2026) ngir wóorlu ne dafay toog ni mu mel te du loraang. Seetu col bi itam baax na lool. »",
  };

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      VoiceService.stop();
      setIsPlayingAudio(false);
    } else {
      const speechLang = wolofMode ? 'wo' : lang;
      const speechText = patientExplanations[speechLang] || patientExplanations.fr;
      setIsPlayingAudio(true);
      VoiceService.speak(speechText, speechLang, () => {
        setIsPlayingAudio(false);
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-rose-950/30 border border-slate-800 p-6 md:p-8">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 uppercase tracking-wider">
            <Ribbon className="w-4 h-4 text-rose-400" />
            <span>Cas Pratique Patient · {lang === 'en' ? 'Cancer Prevention & Early Detection' : 'Prévention & Détection Précoce des Cancers'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {t.cancer_title}
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            {t.cancer_sub}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
            <div className="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 font-semibold flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" />
              <span>{t.cancer_guardrail}</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-300 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.cancer_source_badge}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Organ / Domain Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          onClick={() => setSelectedOrgan('SEIN')}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            selectedOrgan === 'SEIN'
              ? 'bg-rose-500/15 border-rose-500 text-white'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <div className="text-[10px] uppercase font-semibold text-rose-400">{lang === 'en' ? 'Priority (42 yo)' : 'Prioritaire (42 ans)'}</div>
          <div className="text-sm font-bold truncate text-white">{t.organ_breast}</div>
          <div className="text-[11px] font-mono text-amber-300 mt-1">ACR 3 (Nodule 7mm)</div>
        </button>

        <button
          onClick={() => setSelectedOrgan('COL_UTERUS')}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            selectedOrgan === 'COL_UTERUS'
              ? 'bg-teal-500/15 border-teal-500 text-white'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <div className="text-[10px] uppercase font-semibold text-teal-400">{lang === 'en' ? 'Gynecology' : 'Gynécologie'}</div>
          <div className="text-sm font-bold truncate text-white">{t.organ_cervix}</div>
          <div className="text-[11px] font-mono text-emerald-400 mt-1">NILM ({lang === 'en' ? 'Normal' : 'Normal'})</div>
        </button>

        <button
          onClick={() => setSelectedOrgan('COLORECTAL')}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            selectedOrgan === 'COLORECTAL'
              ? 'bg-blue-500/15 border-blue-500 text-white'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <div className="text-[10px] uppercase font-semibold text-blue-400">{lang === 'en' ? 'Organized Screening' : 'Dépistage Organisé'}</div>
          <div className="text-sm font-bold truncate text-white">{t.organ_colorectal}</div>
          <div className="text-[11px] font-mono text-slate-400 mt-1">{lang === 'en' ? 'Scheduled at 50' : 'Programmé à 50 ans'}</div>
        </button>

        <button
          onClick={() => setSelectedOrgan('GENETIQUE')}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            selectedOrgan === 'GENETIQUE'
              ? 'bg-indigo-500/15 border-indigo-500 text-white'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <div className="text-[10px] uppercase font-semibold text-indigo-400">{lang === 'en' ? 'Oncogenetics' : 'Oncogénétique'}</div>
          <div className="text-sm font-bold truncate text-white">{t.organ_genetics}</div>
          <div className="text-[11px] font-mono text-slate-300 mt-1">{lang === 'en' ? 'Moderate Risk (Aunt)' : 'Risque Modéré (Tante)'}</div>
        </button>
      </div>

      {/* Main Focus Detail Card for Selected Organ */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-teal-400">{currentRecord.id}</span>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-slate-400">{t.cancer_last_exam} : {currentRecord.lastExamDate}</span>
            </div>
            <h3 className="text-xl font-bold text-white mt-1">{currentRecord.organLabel}</h3>
          </div>

          {/* Toggle Patient Mode vs Clinician Mode */}
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-1 text-xs">
            <button
              onClick={() => setViewMode('patient')}
              className={`px-3 py-1.5 rounded-md font-semibold flex items-center gap-1.5 transition-colors ${
                viewMode === 'patient' ? 'bg-teal-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>{t.view_patient_btn}</span>
            </button>
            <button
              onClick={() => setViewMode('pro')}
              className={`px-3 py-1.5 rounded-md font-semibold flex items-center gap-1.5 transition-colors ${
                viewMode === 'pro' ? 'bg-teal-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>{t.view_pro_btn}</span>
            </button>
          </div>
        </div>

        {/* Imaging Display and Detailed Clinical Findings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Left Column: Radiological scan visualization (if SEIN) */}
          {selectedOrgan === 'SEIN' ? (
            <div className="space-y-3">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Imagerie Sénologique : Mammographie Numérique & Échographie</span>
                <span className="text-teal-400 font-mono text-[10px]">DOC-006</span>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-950 aspect-[4/3]">
                <img
                  src="/src/assets/images/screening_mammography_demo_1791243054624.jpg"
                  alt="Synthetic Mammography Screening Scan"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-slate-950/90 backdrop-blur-md p-3 rounded-lg border border-slate-800 text-xs text-slate-200 space-y-1">
                  <div className="flex justify-between font-mono text-[11px]">
                    <span className="text-teal-400 font-semibold">QSE Droit (10h) : Nodule 7 x 4 mm</span>
                    <span className="text-amber-300 font-semibold">ACR 3 (BI-RADS 3)</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Contour régulier net · Absence de microcalcifications groupées ou spicules · Échostructure liquidienne anéchogène (kyste simple)
                  </p>
                </div>
              </div>

              {/* ACR Scale Explainer */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                <div className="text-slate-400 font-semibold">Échelle de Classification BI-RADS / ACR :</div>
                <div className="grid grid-cols-5 gap-1 text-center text-[10px] font-mono">
                  <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                    ACR 1<br />Normal
                  </div>
                  <div className="p-1.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                    ACR 2<br />Bénin
                  </div>
                  <div className="p-1.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold">
                    ACR 3<br />Prob. Bénin (&lt;2%)
                  </div>
                  <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-500">
                    ACR 4<br />Suspect
                  </div>
                  <div className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-500">
                    ACR 5<br />Très Suspect
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Examen de Contrôle & Normes Internationales
              </div>
              <div className="text-sm font-semibold text-white">{currentRecord.screeningType}</div>
              <p className="text-xs text-slate-300 leading-relaxed">{currentRecord.findingsSummary}</p>

              <div className="p-3 rounded-lg bg-teal-500/10 border border-teal-500/30 text-xs text-teal-300">
                Protocole conforme aux recommandations OMS et Haute Autorité de Santé (HAS).
              </div>
            </div>
          )}

          {/* Right Column: AI Interpretation & Patient Dialogue */}
          <div className="space-y-4">
            {viewMode === 'patient' ? (
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{lang === 'en' ? 'Clear & Calming Explanation for Awa' : 'Explication Claire & Rassurante pour Awa'}</span>
                  </div>

                  <button
                    onClick={() => setWolofMode(!wolofMode)}
                    className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-teal-300 transition-colors"
                  >
                    {wolofMode ? (lang === 'en' ? 'View in English' : 'Voir en Français') : 'Expliquer en Wolof'}
                  </button>
                </div>

                <p className="text-sm text-slate-200 leading-relaxed font-sans">
                  {wolofMode ? patientExplanations.wo : patientExplanations[lang] || patientExplanations.fr}
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                  <button
                    onClick={handleToggleAudio}
                    className="text-xs text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1.5"
                  >
                    {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    <span>
                      {isPlayingAudio
                        ? (lang === 'en' ? 'Stop voice' : 'Arrêter la voix')
                        : t.cancer_audio_reassurance}
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
                <div className="text-xs font-semibold font-sans text-slate-400 uppercase tracking-wider">
                  Rapport Technique Sénologique Structuré (Praticiens)
                </div>
                <div className="space-y-1.5 text-slate-300">
                  <div>
                    <span className="text-slate-500">Densité Mammaire :</span> Type B (fibro-glandulaire éparse)
                  </div>
                  <div>
                    <span className="text-slate-500">Sein Gauche :</span> ACR 2 (absence de microcalcifications suspectes)
                  </div>
                  <div>
                    <span className="text-slate-500">Sein Droit :</span> Opacité nodulaire ovalaire 7x4 mm QSE, contours
                    circonscrits, classé ACR 3 / BI-RADS 3 (VPP &lt; 2%)
                  </div>
                  <div>
                    <span className="text-slate-500">Creux Axillaires :</span> Absence d'adénomégalie suspecte bilatérale
                  </div>
                  <div>
                    <span className="text-slate-500">Conduite à Tenir :</span> Échographie mammaire droite de surveillance à
                    M6 (Août 2026). Pas d'indication de microbiopsie immédiate.
                  </div>
                </div>
              </div>
            )}

            {/* Uncertainty Box */}
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs space-y-1.5">
              <div className="text-amber-300 font-semibold flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>Mesure de l'Incertitude & Limites Techniques</span>
              </div>
              <p className="text-amber-100/90 leading-relaxed">{currentRecord.uncertaintyNotes}</p>
            </div>

            {/* Human-in-the-Loop Action Gate */}
            {currentRecord.clinicianValidationStatus === 'HUMAN_REVIEW_REQUIRED' && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-rose-300 font-bold flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4" />
                    <span>DÉCISION CLINIQUEMENT VERROUILLÉE (HUMAN REVIEW)</span>
                  </div>
                  <span className="font-mono text-[10px] text-rose-400">Cas REV-2026-003</span>
                </div>
                <p className="text-slate-300 text-[11px]">
                  La validation du protocole de surveillance échographique à 6 mois sans examen invasif superflu est en
                  attente d'approbation médicale nominative.
                </p>
                <div className="pt-1 flex justify-end">
                  <button
                    onClick={onNavigateToReviews}
                    className="px-3 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/40 rounded-lg font-semibold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <span>Arbitrer ce cas dans la Revue Humaine</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Primary Onco-Prevention: 4 Pillars of Lifestyle and Cancer Risk Reduction */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-400" />
            <span>{t.lifestyle_pillars_title}</span>
          </h3>
          <p className="text-xs text-slate-400">
            {t.lifestyle_pillars_sub}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              1. Activité Physique Aérobie
            </div>
            <div className="text-base font-bold text-white">30 min / 4x par semaine</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Baisse prouvée de 20-30% du risque mammaire par régulation des taux d'insuline et des œstrogènes circulants.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider">
              2. Alimentation Protectrice
            </div>
            <div className="text-base font-bold text-white">Légumineuses & Antioxydants</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Valorisation des plats traditionnels sénégalais riches en légumes frais (Niebé, feuilles de Bissap) et
              réduction des produits ultra-transformés.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              3. Sobriété Toxique
            </div>
            <div className="text-base font-bold text-white">Zéro Tabac · Zéro Alcool</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Awa est non-fumeuse et abstinente : deux facteurs majeurs d'évitement des mutations de l'ADN cellulaire.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
              4. Dépistage à Rythme Fixe
            </div>
            <div className="text-base font-bold text-white">Surveillance Programmée</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Rappels automatisés sans anxiété : prochaine échographie mammaire en Août 2026, prochain frottis en 2029.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
