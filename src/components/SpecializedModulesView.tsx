import React, { useState, useEffect } from 'react';
import {
  Eye,
  Dna,
  Watch,
  CloudSun,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Info,
  HeartPulse,
  Sparkles,
  Activity,
  Stethoscope,
  Pill,
  Baby,
  Truck,
  ShieldAlert,
  Volume2,
  ArrowRight,
  Scale,
} from 'lucide-react';
import { I18nService } from '../services/i18n';
import { VoiceService } from '../services/voiceService';
import { Language } from '../types';

export const SpecializedModulesView: React.FC = () => {
  const [activeModule, setActiveModule] = useState<'maternity' | 'triage' | 'cardio' | 'pediatrics' | 'vision' | 'genomics_wearables'>('maternity');
  const [lang, setLang] = useState<Language>(I18nService.language);

  // Triage Simulator State
  const [triagePAS, setTriagePAS] = useState<number>(85); // Pression Artérielle Systolique
  const [triageFC, setTriageFC] = useState<number>(128); // Fréquence Cardiaque
  const [triageSpO2, setTriageSpO2] = useState<number>(91); // SpO2 (%)
  const [triageConscience, setTriageConscience] = useState<'alerte' | 'confus' | 'coma'>('confus');
  const [triageEvacSent, setTriageEvacSent] = useState<boolean>(false);

  // Cardio Cross-Check Simulator State
  const [selectedDrug, setSelectedDrug] = useState<string>('ramipril');
  const [drugAlertAcknowledged, setDrugAlertAcknowledged] = useState<boolean>(false);

  // Pediatric Z-Score State
  const [childAgeMonths, setChildAgeMonths] = useState<number>(14);
  const [childWeightKg, setChildWeightKg] = useState<number>(7.1);
  const [childHeightCm, setChildHeightCm] = useState<number>(74);
  const [childMUAC, setChildMUAC] = useState<number>(112); // Périmètre brachial en mm

  // Pregnancy SA Calculator
  const [saGestationalWeeks, setSaGestationalWeeks] = useState<number>(26);

  useEffect(() => {
    const unsub = I18nService.subscribe((l) => setLang(l));
    return unsub;
  }, []);

  const isEn = lang === 'en';
  const isWo = lang === 'wo';

  // Compute Triage Severity
  const isTriageRed = triagePAS < 90 || triageSpO2 < 92 || triageConscience === 'coma';
  const isTriageYellow = !isTriageRed && (triagePAS < 100 || triageFC > 110 || triageConscience === 'confus');

  // Compute Pediatric Nutrition Status
  const isSevereMalnutrition = childMUAC < 115 || childWeightKg < 7.5;
  const isModerateMalnutrition = !isSevereMalnutrition && (childMUAC < 125 || childWeightKg < 8.2);

  const handleSpeakText = (textFr: string, textWo: string, textEn: string) => {
    const targetText = isEn ? textEn : isWo ? textWo : textFr;
    const targetLang = isEn ? 'en' : isWo ? 'wo' : 'fr';
    VoiceService.speak(targetText, targetLang);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-teal-400 uppercase tracking-wider">
          <span>{isEn ? 'Multi-Specialty AI Architecture' : isWo ? 'Kalaamu Xam-Xam bu Tàggat' : 'Architecture IA Multi-Spécialités'}</span>
          <span>·</span>
          <span>{isEn ? 'Hub-and-Spoke Model & Clinical Safeguards' : isWo ? 'Modèle Central ak Kaaraange' : 'Modèle Hub-and-Spoke & Garde-fous Cliniques'}</span>
        </div>
        <h2 className="text-2xl font-bold text-white mt-1">
          {isEn
            ? 'Specialized Modules: Maternity, Emergency Triage, Cardio, Pediatrics & Vision'
            : isWo
            ? 'Tàggi Xam-Xam: Wér-gu-yaramu Jiggéen, Gaaw-Gaaw, Xol, Xale ak Gisu'
            : 'Modules Spécialisés : Maternité, Triage Urgences, Cardiométabolique, Pédiatrie & Vision'}
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-4xl">
          {isEn
            ? 'Preventing medical silos: Specialized micro-agents plug into a single unified patient record. Compare their dual roles in rural primary health posts vs district referral hospitals.'
            : isWo
            ? 'Bañ a séddale wér-gu-yaramu nit ki: mbooleem tàggi xam-xam yi dañuy lëkkaloo ci benn kaye paj mu bokk. Xoolal diggante Poste de santé ak Hôpital CHU.'
            : 'Éviter les silos médicaux : Chaque micro-expert se branche sur le dossier patient unique transversal. Comparez le rôle en Poste de Santé rural vs Hôpital de Référence.'}
        </p>
      </div>

      {/* Module Selector Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto text-sm">
        <button
          onClick={() => setActiveModule('maternity')}
          className={`px-3.5 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeModule === 'maternity'
              ? 'bg-rose-500 text-slate-950 font-bold shadow-lg shadow-rose-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <HeartPulse className="w-4 h-4" />
          <span>{isEn ? 'Maternity & SMI' : isWo ? 'Wér-gu-yaramu Jiggéen' : 'Maternité & SMI'}</span>
        </button>

        <button
          onClick={() => setActiveModule('triage')}
          className={`px-3.5 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeModule === 'triage'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>{isEn ? 'Decentralized Triage & Emergencies' : isWo ? 'Gaaw-Gaaw ak Triage' : 'Triage & Urgences Décentralisées'}</span>
        </button>

        <button
          onClick={() => setActiveModule('cardio')}
          className={`px-3.5 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeModule === 'cardio'
              ? 'bg-blue-500 text-slate-950 font-bold shadow-lg shadow-blue-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Stethoscope className="w-4 h-4" />
          <span>{isEn ? 'Cardio & Diabetes (No Silos)' : isWo ? 'Xol ak Sukkër' : 'Cardiométabolique & HTA'}</span>
        </button>

        <button
          onClick={() => setActiveModule('pediatrics')}
          className={`px-3.5 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeModule === 'pediatrics'
              ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Baby className="w-4 h-4" />
          <span>{isEn ? 'Pediatrics, Nutrition & PEV' : isWo ? 'Xale, Ñam ak Ñakk' : 'Pédiatrie, Nutrition & PEV'}</span>
        </button>

        <button
          onClick={() => setActiveModule('vision')}
          className={`px-3.5 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeModule === 'vision'
              ? 'bg-teal-500 text-slate-950 font-bold shadow-lg shadow-teal-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>{isEn ? 'Vision AI & Imaging' : isWo ? 'Gisu ak Nataal' : 'Vision AI (OCT & Radio)'}</span>
        </button>

        <button
          onClick={() => setActiveModule('genomics_wearables')}
          className={`px-3.5 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeModule === 'genomics_wearables'
              ? 'bg-indigo-500 text-slate-950 font-bold shadow-lg shadow-indigo-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Dna className="w-4 h-4" />
          <span>{isEn ? 'Genomics, Wearables & Exposome' : isWo ? 'Kalaamu Yaram ak All' : 'Génomique & Exposome'}</span>
        </button>
      </div>

      {/* MODULE 1: MATERNITÉ & GROSSESSE (SMI) */}
      {activeModule === 'maternity' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/10 text-rose-300 border border-rose-500/30 uppercase tracking-wider">
                  Plugin SMI · Santé Maternelle & Infantile
                </span>
                <span className="text-xs text-slate-400 font-mono">PLUG-MATERNITY-v2.1</span>
              </div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mt-1">
                <HeartPulse className="w-5 h-5 text-rose-400" />
                <span>IA de Grossesse & Maternité : Hôpitaux vs Postes de Santé Ruraux</span>
              </h3>
              <p className="text-xs text-slate-400">
                Micro-expert obstétrical branché sur l'Orchestrateur Central : protocole OMS des 4 CPN, prévention de la pré-éclampsie et orientation sans silo.
              </p>
            </div>
            <div className="px-3 py-1 bg-rose-500/10 text-rose-300 border border-rose-500/30 rounded-lg text-xs font-semibold">
              RÈGLE ABSOLUE : SÉCURITÉ MÈRE-ENFANT & REVUE HUMAINE
            </div>
          </div>

          {/* Architecture Lesson Card */}
          <div className="p-4 rounded-xl bg-slate-950 border border-teal-500/30 space-y-2 text-xs">
            <div className="font-bold text-teal-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pourquoi un seul orchestrateur central avec plugins plutôt qu’un agent IA isolé par service ?</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Une femme enceinte ne se résume pas à son utérus. Si la maternité disposait d’un agent IA isolé du reste de l’hôpital,
              cet agent ignorerait par exemple les traitements cardiologiques en cours (Amlodipine, statines) ou les bilans rénaux.
              Dans SantéNova, l'IA de Maternité est un <strong className="text-white">module expert connecté au dossier unique</strong> :
              elle croise instantanément les prescriptions cardiologiques avec les risques tératogènes fœtaux et prévient toute contre-indication fatale.
            </p>
          </div>

          {/* Interactive SA Calculator & Reminder */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="text-xs font-semibold text-rose-400 uppercase tracking-wider flex items-center gap-2">
                <span>Calculateur de Semaines d'Aménorrhée (SA) & Statut Patiente</span>
              </div>
              <button
                onClick={() =>
                  handleSpeakText(
                    `Awa, vous êtes actuellement à ${saGestationalWeeks} semaines d'aménorrhée. Votre consultation prénatale numéro 3 est programmée pour vérifier votre tension artérielle.`,
                    `Awa, yéegi yaa ngi ci fukk ak ñaar fukk ak juroom benn weer. CPN 3 bi war nga ko def ngir xool sa tension.`,
                    `Awa, you are currently at ${saGestationalWeeks} gestational weeks. Your prenatal checkup 3 is scheduled to monitor your blood pressure.`
                  )
                }
                className="px-3 py-1 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{isEn ? 'Listen Audio Alert' : isWo ? 'Déglul ci Kàddu' : 'Écouter Alerte Vocale'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs items-center">
              <div>
                <label className="text-slate-400 block mb-1">Âge Gestationnel : <strong className="text-white font-mono">{saGestationalWeeks} SA</strong></label>
                <input
                  type="range"
                  min="4"
                  max="41"
                  value={saGestationalWeeks}
                  onChange={(e) => setSaGestationalWeeks(Number(e.target.value))}
                  className="w-full accent-rose-500"
                />
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Étape Recommandée OMS :</span>
                <span className="text-white font-bold text-xs">
                  {saGestationalWeeks < 12
                    ? 'CPN 1 (< 12 SA) : Bilan initial, TPIg, Fer + Folate'
                    : saGestationalWeeks <= 24
                    ? 'CPN 2 (20-24 SA) : Écho morphologique & Dépistage HTA'
                    : saGestationalWeeks <= 32
                    ? 'CPN 3 (28-32 SA) : Pré-éclampsie, RCIU & Diabète'
                    : 'CPN 4 (36-38 SA) : Voie d’accouchement & Bassin'}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30">
                <span className="text-rose-300 block text-[11px] font-semibold">Garde-fou Tératogène :</span>
                <span className="text-rose-200 text-xs">
                  Surveillance TA rapprochée requise (Objectif &lt; 140/90). Contre-indication IEC/ARA2 active.
                </span>
              </div>
            </div>
          </div>

          {/* Comparative Demonstration: Hôpital vs Poste de Santé */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Colonne 1: Échelon Poste de Santé / Rural */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Échelon Poste de Santé (Rural / Dispensaire)</h4>
                    <p className="text-[11px] text-slate-400">Pour la Sage-femme d'État & l'Infirmier Chef de Poste (ICP)</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-emerald-400 border border-emerald-500/30">
                  Léger · Mobile / SMS
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-white">Protocole National des 4 CPN (OMS)</span>
                    <span className="text-emerald-400 font-mono text-[11px]">Calendrier Actif</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Guidage pas à pas : CPN1 (&lt; 12 SA), CPN2 (20-24 SA), CPN3 (28-32 SA), CPN4 (36-38 SA) avec rappel SMS et vocal en Wolof.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 space-y-1">
                  <div className="flex justify-between items-center text-rose-300 font-semibold">
                    <span>Alerte Pré-éclampsie & Signaux de Danger</span>
                    <span className="font-mono text-[11px]">DANGER CRITIQUE</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    Si TA ≥ 140/90 mmHg + céphalées ou œdèmes bilatéraux : alerte immédiate avec recommandation d'évacuation d'urgence vers le Centre de Santé de référence.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-white">Prévention Anémie & TPIg Paludisme</span>
                    <span className="text-teal-400 font-mono text-[11px]">Dotation SMI</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Rappels systématiques de supplémentation en Fer + Acide folique dès la première consultation et Sulfadoxine-Pyriméthamine au 2e trimestre.
                  </p>
                </div>
              </div>
            </div>

            {/* Colonne 2: Échelon Maternité Hospitalière / CHU */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-xs">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Échelon Hôpital de District / Maternité CHU</h4>
                    <p className="text-[11px] text-slate-400">Pour les Gynécologues-Obstétriciens & Échographistes</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-blue-400 border border-blue-500/30">
                  Haute Précision · RAG
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-white">Biométrie Fœtale & Échographie Obstétricale</span>
                    <span className="text-teal-400 font-mono text-[11px]">Vision AI</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Contrôle des percentiles de croissance fœtale (BIP, périmètre crânien, fémur) et signalement précoce de retard de croissance intra-utérin (RCIU).
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-white">Partogramme de Travail Informatisé</span>
                    <span className="text-indigo-400 font-mono text-[11px]">Salle d'Accouchement</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Suivi de la dilatation cervicale et descente de la présentation fœtale : alerte visuelle si la courbe franchit la ligne d'alerte pour anticiper une dystocie.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 space-y-1">
                  <div className="flex justify-between items-center text-amber-300 font-semibold">
                    <span>Interconnexion Pathologies Maternelles (HTA/Diabète)</span>
                    <span className="font-mono text-[11px]">Transversal</span>
                  </div>
                  <p className="text-amber-200 text-[11px]">
                    Rapprochement direct avec le module Cardiologie : adaptation sécurisée des antihypertenseurs compatibles (ex : Labetalol au lieu d'IEC/ARA2 contre-indiqués).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 2: TRIAGE & URGENCES DÉCENTRALISÉES */}
      {activeModule === 'triage' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
                  Plugin Régulation & Orientation Sanitaire
                </span>
                <span className="text-xs text-slate-400 font-mono">PLUG-TRIAGE-v1.4</span>
              </div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mt-1">
                <Activity className="w-5 h-5 text-amber-400" />
                <span>Triage & Urgences Décentralisées : Éviter les Évacuations Tardives</span>
              </h3>
              <p className="text-xs text-slate-400">
                Aide au tri pour l'Infirmier Chef de Poste (ICP) : calcul en temps réel du Score de Gravité et télé-alerte vers le SAU de l'Hôpital de District.
              </p>
            </div>
            <div className="px-3 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-semibold">
              RÈGLE ABSOLUE : SÉCURITÉ VITALE & TÉLÉ-RÉGULATION
            </div>
          </div>

          {/* Interactive Triage Simulator */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>Simulateur de Triage Clinique en Temps Réel (Poste de Santé)</span>
              </h4>
              <span className="text-xs text-slate-400">Ajustez les constantes pour observer le verdict de tri</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              {/* Constante 1: Pression Systolique */}
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Pression Systolique (PAS)</span>
                  <span className={`font-mono font-bold ${triagePAS < 90 ? 'text-rose-400' : 'text-teal-400'}`}>
                    {triagePAS} mmHg
                  </span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="190"
                  value={triagePAS}
                  onChange={(e) => setTriagePAS(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
                <span className="text-[10px] text-slate-500">Seuil de choc si &lt; 90 mmHg</span>
              </div>

              {/* Constante 2: Fréquence Cardiaque */}
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Fréquence Cardiaque (FC)</span>
                  <span className={`font-mono font-bold ${triageFC > 120 ? 'text-rose-400' : 'text-teal-400'}`}>
                    {triageFC} bpm
                  </span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="160"
                  value={triageFC}
                  onChange={(e) => setTriageFC(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
                <span className="text-[10px] text-slate-500">Tachycardie sévère si &gt; 120 bpm</span>
              </div>

              {/* Constante 3: SpO2 */}
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Saturation Oxygène (SpO2)</span>
                  <span className={`font-mono font-bold ${triageSpO2 < 92 ? 'text-rose-400' : 'text-teal-400'}`}>
                    {triageSpO2} %
                  </span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="100"
                  value={triageSpO2}
                  onChange={(e) => setTriageSpO2(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
                <span className="text-[10px] text-slate-500">Hypoxie sévère si &lt; 92%</span>
              </div>

              {/* Constante 4: État de Conscience */}
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-400 block">État Neurologique :</span>
                <select
                  value={triageConscience}
                  onChange={(e) => setTriageConscience(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded p-1.5 text-white text-xs"
                >
                  <option value="alerte">Alerte & Orienté</option>
                  <option value="confus">Confus / Somnolent</option>
                  <option value="coma">Coma / Inconscient (GCS &lt; 9)</option>
                </select>
                <span className="text-[10px] text-slate-500">Évaluation Glasgow rapide</span>
              </div>
            </div>

            {/* Verdict Card */}
            <div
              className={`p-4 rounded-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                isTriageRed
                  ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                  : isTriageYellow
                  ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                  : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      isTriageRed
                        ? 'bg-rose-500 text-slate-950'
                        : isTriageYellow
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-emerald-500 text-slate-950'
                    }`}
                  >
                    {isTriageRed ? 'CODE ROUGE · URGENCE ABSOLUE (NIVEAU 1)' : isTriageYellow ? 'CODE JAUNE · URGENCE RELATIVE (NIVEAU 2)' : 'CODE VERT · AMBULATOIRE'}
                  </span>
                  <span className="text-xs font-mono">Délai d’intervention maximal : {isTriageRed ? 'IMMÉDIAT (0 min)' : isTriageYellow ? '< 30 min' : '< 120 min'}</span>
                </div>
                <p className="text-xs">
                  {isTriageRed
                    ? 'Défaillance hémodynamique ou neurologique suspectée. Risque vital imminent. Déclenchement évacuation sanitaire vers SAU Hôpital de District.'
                    : isTriageYellow
                    ? 'Patient instable nécessitant réévaluation continue, mise en observation au poste de santé et voie veineuse.'
                    : 'Constantes stables. Prise en charge locale et traitement ambulatoire adaptés.'}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() =>
                    handleSpeakText(
                      isTriageRed
                        ? 'Alerte code rouge. État critique détecté. Préparer évacuation sanitaire immédiate.'
                        : 'Triage stabilisé. Surveillance des constantes en cours.',
                      isTriageRed
                        ? 'Alerte gaaw-gaaw. Yaram bi dafa metti lool. Yóbbu leen ko ca hôpital bi teel.'
                        : 'Yaram bi gën na baax. Xoolal ko bu baax.',
                      isTriageRed
                        ? 'Red alert. Critical condition. Prepare immediate medical evacuation.'
                        : 'Triage stable. Continue monitoring vitals.'
                    )
                  }
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg text-xs text-white flex items-center gap-1.5"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Alerte Vocale</span>
                </button>

                {isTriageRed && (
                  <button
                    onClick={() => setTriageEvacSent(true)}
                    disabled={triageEvacSent}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-lg ${
                      triageEvacSent
                        ? 'bg-emerald-600 text-white'
                        : 'bg-rose-500 hover:bg-rose-600 text-slate-950 shadow-rose-500/20'
                    }`}
                  >
                    <Truck className="w-4 h-4" />
                    <span>{triageEvacSent ? 'Évacuation Transmise au SAMU' : 'Déclencher Évacuation Sanitaire'}</span>
                  </button>
                )}
              </div>
            </div>

            {triageEvacSent && (
              <div className="p-3 bg-emerald-950/50 border border-emerald-500/40 rounded-lg text-xs text-emerald-300 flex items-center justify-between">
                <span>Fiche de liaison numérique transmise en direct au SAU Hôpital de Thiès / Dakar. L'équipe médicale d'accueil reçoit les constantes avant l'arrivée du véhicule.</span>
                <span className="font-mono text-[10px] text-emerald-400">ORDRE #EVAC-2026-8902</span>
              </div>
            )}
          </div>

          {/* Dual-Tier Architecture Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-amber-400 block uppercase tracking-wider text-[11px]">Rôle au Poste de Santé (Rural)</span>
              <p className="text-slate-300">
                L’infirmier ou l'aide-soignant utilise une application mobile légère (utilisable même hors réseau) pour guider les 5 gestes d'urgence : libération des voies aériennes, arrêt du saignement, mise en position latérale de sécurité (PLS) et remplissage vasculaire.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-blue-400 block uppercase tracking-wider text-[11px]">Rôle à l'Hôpital de District (SAU)</span>
              <p className="text-slate-300">
                La régulation hospitalière dispose d'une vue cartographique prédictive des arrivées d’urgences en cours, permettant de pré-alerter le bloc opératoire, la banque de sang ou le déchocage avant même que l'ambulance n'ait franchi le portail.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 3: CARDIOMÉTABOLIQUE & MALADIES CHRONIQUES (HTA & DIABÈTE) */}
      {activeModule === 'cardio' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-300 border border-blue-500/30 uppercase tracking-wider">
                  Plugin Cardiométabolique & Prévention AVC
                </span>
                <span className="text-xs text-slate-400 font-mono">PLUG-CARDIO-v3.0</span>
              </div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mt-1">
                <Stethoscope className="w-5 h-5 text-blue-400" />
                <span>Cardiométabolique : HTA, Diabète & Croisement Inter-Spécialités</span>
              </h3>
              <p className="text-xs text-slate-400">
                Démonstration concrète du « Zéro Silo » : croisement instantané de la tension artérielle avec le dossier de grossesse d'Awa Ndiaye.
              </p>
            </div>
            <div className="px-3 py-1 bg-blue-500/10 text-blue-300 border border-blue-500/30 rounded-lg text-xs font-semibold">
              INTERDICTION ABSOLUE DES MOLÉCULES TÉRATOGÈNES
            </div>
          </div>

          {/* Live Cross-Check Demonstration */}
          <div className="p-5 rounded-xl bg-slate-950 border border-blue-500/30 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
              <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider flex items-center gap-2">
                <Pill className="w-4 h-4 text-blue-400" />
                <span>Démonstration du Croisement Transversal : Prescription chez la Femme Enceinte</span>
              </span>
              <span className="text-xs text-slate-400 font-mono">Patiente : Mme Awa Ndiaye (Grossesse 26 SA)</span>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-300 leading-relaxed">
                Testez ce qui se passe si un médecin souhaite prescrire un traitement antihypertenseur classique à Awa Ndiaye sans vérifier sa grossesse :
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => setSelectedDrug('ramipril')}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    selectedDrug === 'ramipril'
                      ? 'bg-rose-950/60 border-rose-500 text-rose-200 ring-2 ring-rose-500/30'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold flex items-center justify-between">
                    <span>Ramipril 5mg (IEC)</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400">Antihypertenseur</span>
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-1">Prescription standard chez l'adulte</span>
                </button>

                <button
                  onClick={() => setSelectedDrug('losartan')}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    selectedDrug === 'losartan'
                      ? 'bg-rose-950/60 border-rose-500 text-rose-200 ring-2 ring-rose-500/30'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold flex items-center justify-between">
                    <span>Losartan 50mg (ARA2)</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400">Antihypertenseur</span>
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-1">Bloqueur des récepteurs AT1</span>
                </button>

                <button
                  onClick={() => setSelectedDrug('labetalol')}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    selectedDrug === 'labetalol'
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/30'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold flex items-center justify-between">
                    <span>Labétalol 200mg (Trandate)</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">Validé Grossesse</span>
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-1">Bêta-bloquant de 1ère intention OMS</span>
                </button>
              </div>

              {/* Interception Card */}
              {selectedDrug === 'ramipril' || selectedDrug === 'losartan' ? (
                <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/50 space-y-2">
                  <div className="flex items-center gap-2 text-rose-300 font-bold">
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                    <span>ALERTE BLOQUANTE AUTOMATIQUE DU CORE SANTÉNOVA</span>
                  </div>
                  <p className="text-rose-200 text-xs leading-relaxed">
                    <strong>CONTRE-INDICATION ABSOLUE (Fœtotoxicité sévère) :</strong> L'administration d'IEC ou d'ARA2 aux 2e et 3e trimestres de la grossesse entraîne un risque majeur d'atteinte rénale fœtale, d'oligoamnios et de retard d'ossification de la voûte du crâne.
                  </p>
                  <div className="pt-1 flex items-center gap-2 text-[11px] text-rose-300 font-semibold">
                    <ArrowRight className="w-3.5 h-3.5" />
                    <span>Recommandation de l'Orchestrateur : Basculer vers Labétalol 200mg matin et soir ou Méthyldopa (Aldomet).</span>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/50 space-y-1">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>PRESCRIPTION CONFORME AU PROTOCOLE SÉCURISÉ GROSSESSE</span>
                  </div>
                  <p className="text-emerald-200 text-xs">
                    Le Labétalol est l'antihypertenseur de référence préconisé par la Société Française d'Hypertension Artérielle et l'OMS pour la prise en charge de l'hypertension gestationnelle.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Automesure Table */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-400">Objectif Tensionnel Vise</span>
              <span className="text-xl font-bold font-mono text-white block">&lt; 135/85 mmHg</span>
              <span className="text-[11px] text-teal-400">Règle des 3 mesures matin et soir</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-400">Glycémie à Jeun (HGPO 26 SA)</span>
              <span className="text-xl font-bold font-mono text-emerald-400 block">0.88 g/L</span>
              <span className="text-[11px] text-slate-400">Normal (&lt; 0.92 g/L requis)</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-400">Observance & Rappels Vocaux</span>
              <span className="text-xl font-bold font-mono text-blue-400 block">94 %</span>
              <span className="text-[11px] text-slate-400">Messages SMS/Wolof confirmés</span>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 4: PÉDIATRIE, NUTRITION (Z-SCORE OMS) & VACCINATION (PEV) */}
      {activeModule === 'pediatrics' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                  Plugin Pédiatrie & Croissance Infantile
                </span>
                <span className="text-xs text-slate-400 font-mono">PLUG-PEDIATRICS-v2.0</span>
              </div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mt-1">
                <Baby className="w-5 h-5 text-emerald-400" />
                <span>Pédiatrie, Dépistage Malnutrition & Calendrier PEV</span>
              </h3>
              <p className="text-xs text-slate-400">
                Calcul automatique des Z-scores OMS (Poids/Taille/Périmètre brachial) et suivi sans rupture de la vaccination des nourrissons.
              </p>
            </div>
            <div className="px-3 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-semibold">
              PROTOCOLE OMS PRISE EN CHARGE NUTRITIONNELLE
            </div>
          </div>

          {/* Interactive Pediatric Z-Score Calculator */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Scale className="w-4 h-4 text-emerald-400" />
                <span>Calculateur de Croissance & Dépistage Nutritionnel (0 à 59 mois)</span>
              </h4>
              <button
                onClick={() =>
                  handleSpeakText(
                    isSevereMalnutrition
                      ? 'Attention : indice nutritionnel bas. Attribution immédiate d aliment thérapeutique prêt à l emploi recommandée.'
                      : 'Croissance de l enfant dans les courbes normales.',
                    isSevereMalnutrition
                      ? 'Moytu leen : xale bi dafa woyof lool. War ngeen ko jox Plumpy Nut ci poste de santé bi.'
                      : 'Xale bi yaa ngi dund bu baax. Wér na.',
                    isSevereMalnutrition
                      ? 'Warning: low nutritional index. Immediate ready-to-use therapeutic food recommended.'
                      : 'Child growth is within normal parameters.'
                  )
                }
                className="px-3 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-lg text-xs font-medium flex items-center gap-1.5"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Rappel Vocal Mère (Wolof/FR)</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-400 block">Âge : <strong className="text-white font-mono">{childAgeMonths} mois</strong></span>
                <input
                  type="range"
                  min="1"
                  max="59"
                  value={childAgeMonths}
                  onChange={(e) => setChildAgeMonths(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-400 block">Poids : <strong className="text-white font-mono">{childWeightKg} kg</strong></span>
                <input
                  type="range"
                  min="2.5"
                  max="20"
                  step="0.1"
                  value={childWeightKg}
                  onChange={(e) => setChildWeightKg(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-400 block">Taille : <strong className="text-white font-mono">{childHeightCm} cm</strong></span>
                <input
                  type="range"
                  min="45"
                  max="115"
                  value={childHeightCm}
                  onChange={(e) => setChildHeightCm(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-400 block">Périmètre Brachial (PB/MUAC) : <strong className="text-white font-mono">{childMUAC} mm</strong></span>
                <input
                  type="range"
                  min="90"
                  max="160"
                  value={childMUAC}
                  onChange={(e) => setChildMUAC(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
                <span className="text-[10px] text-slate-500">Seuil rouge si &lt; 115 mm</span>
              </div>
            </div>

            {/* Nutrition Verdict */}
            <div
              className={`p-4 rounded-xl border ${
                isSevereMalnutrition
                  ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                  : isModerateMalnutrition
                  ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                  : 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
                <span>
                  {isSevereMalnutrition
                    ? '🔴 MALNUTRITION AIGUË SÉVÈRE (MAS)'
                    : isModerateMalnutrition
                    ? '🟡 MALNUTRITION AIGUË MODÉRÉE (MAM)'
                    : '🟢 ÉTAT NUTRITIONNEL SATISFAISANT (NORMAL)'}
                </span>
              </div>
              <p className="text-xs mt-1">
                {isSevereMalnutrition
                  ? 'Périmètre brachial < 115 mm. Protocole OMS applicable : Dotation Plumpy’Nut (ATPE), TDR Paludisme de dépistage systématique, Amoxicilline et suivi hebdomadaire au Poste de Santé.'
                  : isModerateMalnutrition
                  ? 'Indice modérément abaissé. Supplémentation nutritionnelle ciblée (farine fortifiée locale) et conseils diététiques maternels.'
                  : 'Croissance staturo-pondérale harmonieuse. Poursuite de l’allaitement maternel et de l’alimentation diversifiée.'}
              </p>
            </div>
          </div>

          {/* PEV Vaccination Timeline */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block">
              Calendrier du Programme Élargi de Vaccination (PEV Sénégal / OMS)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-[11px] text-slate-400 font-mono">Naissance</span>
                <div className="font-bold text-white mt-0.5">BCG + VPO-0</div>
                <span className="text-[10px] text-emerald-400">Administré (Poste de santé)</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-[11px] text-slate-400 font-mono">6, 10 & 14 Semaines</span>
                <div className="font-bold text-white mt-0.5">Penta 1-2-3 + Pneumo + Rota</div>
                <span className="text-[10px] text-emerald-400">Complété à 100%</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-emerald-500/40">
                <span className="text-[11px] text-slate-400 font-mono">9 Mois</span>
                <div className="font-bold text-emerald-300 mt-0.5">Rougeole-Rubéole (RR-1) + VAA</div>
                <span className="text-[10px] text-emerald-400">Rappel SMS automatique actif</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-[11px] text-slate-400 font-mono">15-18 Mois</span>
                <div className="font-bold text-white mt-0.5">Rappel RR-2 + Méningite</div>
                <span className="text-[10px] text-slate-500">Planifié dans le dossier</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 5: VISION AI & ONCO-IMAGERIE */}
      {activeModule === 'vision' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Eye className="w-5 h-5 text-teal-400" />
                <span>Vision AI : Détection de Signaux sur Imagerie Médicale</span>
              </h3>
              <p className="text-xs text-slate-400">
                Support d'analyse multi-modal : OCT rétinien, fond d’œil, radiographie pulmonaire, IRM et dermatologie.
              </p>
            </div>
            <div className="px-3 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-semibold">
              RÈGLE ABSOLUE : ZÉRO DIAGNOSTIC AUTONOME
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            {/* Visual Scan Preview */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Exemple Démo : Scan OCT Rétinien (Donnée Fictive d’Évaluation)
              </div>
              <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-950 aspect-[4/3]">
                <img
                  src="/src/assets/images/vision_retinal_demo_1791240032562.jpg"
                  alt="Synthetic OCT scan"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-slate-950/85 backdrop-blur-sm p-2 rounded-lg border border-slate-800 text-[11px] text-slate-300">
                  Couches rétiniennes : morphologie fovéale préservée · micro-vaisseaux réguliers
                </div>
              </div>
            </div>

            {/* AI Output with Mandatory Phrasing */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Conclusion Formelle Émise par l'IA
                </div>
                <div className="p-3 bg-teal-500/10 border border-teal-500/30 rounded-lg text-sm text-teal-200 font-semibold leading-relaxed">
                  « Signal potentiel nécessitant une évaluation professionnelle par un ophtalmologiste référent. »
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pt-1">
                  SantéNova a pour interdiction absolue de formuler « Vous avez telle maladie » ou « Rétinopathie hypertensive confirmée ». Seul le praticien est habilité à porter le diagnostic.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="text-slate-400 font-semibold">Garanties de Sécurité Intégrées :</div>
                <ul className="space-y-1.5 text-slate-300">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>Contrôle de calibrage de l'image (résolution minimale et contraste vérifiés).</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>Double confirmation requise pour tout cas suspect.</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>Traçabilité du modèle de vision utilisé dans le Model Registry.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 6: GÉNOMIQUE, WEARABLES & EXPOSOME */}
      {activeModule === 'genomics_wearables' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Dna className="w-5 h-5 text-indigo-400" />
                <span>Génomique, Wearables & Exposome : Données Longitudinales & Recherche</span>
              </h3>
              <p className="text-xs text-slate-400">
                Croisement des antécédents familiaux, capteurs connectés (montres) et déterminants environnementaux (qualité de l'air AQI).
              </p>
            </div>
            <div className="px-3 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 rounded-lg text-xs font-semibold">
              CONSENTEMENT RENFORCÉ RESEARCH REQUIS
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Genomics Card */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="text-indigo-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Dna className="w-4 h-4" />
                <span>Génomique Populationnelle</span>
              </div>
              <p className="text-slate-300">
                Score de risque polygénique conditionné au consentement explicite de la patiente dans le Trust Center.
              </p>
              <div className="p-2.5 rounded bg-indigo-950/40 border border-indigo-800/40 text-indigo-200">
                Statut Awa Ndiaye : Consentement Recherche non activé (Principe de précaution).
              </div>
            </div>

            {/* Wearables Card */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="text-emerald-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Watch className="w-4 h-4" />
                <span>Wearables & Rythme Cardiaque</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-slate-400">FC au repos :</span>
                <span className="font-mono font-bold text-white text-sm">68 bpm</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Rythme sinusal :</span>
                <span className="text-teal-400 font-semibold">Régulier</span>
              </div>
              <p className="text-slate-500 text-[11px] pt-1">
                Aide à la détection de tendances, non substituable à un tracé ECG clinique 12 dérivations.
              </p>
            </div>

            {/* Exposome Card */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="text-amber-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <CloudSun className="w-4 h-4" />
                <span>Exposome & Climat (Dakar)</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-slate-400">Qualité de l'Air (AQI) :</span>
                <span className="font-mono font-bold text-amber-400 text-sm">78 (Moyen)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Poussières (Harmattan) :</span>
                <span className="text-slate-300">Modéré en altitude</span>
              </div>
              <p className="text-slate-500 text-[11px] pt-1">
                Conseils d'hydratation et limitation de l'effort physique en plein soleil aux heures chaudes.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Unified Architecture Ethics Footer */}
      <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3 text-slate-300">
          <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0" />
          <span>
            <strong>Garantie Institutionnelle SantéNova :</strong> Aucun micro-agent spécialisé ne possède d'autonomie décisionnelle ou de prescription fermée. Tout signal suspect déclenche obligatoirement le statut <span className="text-amber-400 font-mono">HUMAN_REVIEW_REQUIRED</span> et fait l'objet d'une traçabilité horodatée.
          </span>
        </div>
        <div className="text-[11px] font-mono text-slate-500 shrink-0">
          OMS · Ministère de la Santé du Sénégal
        </div>
      </div>
    </div>
  );
};
