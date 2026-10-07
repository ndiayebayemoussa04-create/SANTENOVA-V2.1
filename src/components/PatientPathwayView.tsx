import React, { useState, useEffect } from 'react';
import { mockPatientAwaNdiaye } from '../data/mockPatient';
import { I18nService } from '../services/i18n';
import { Language } from '../types';
import {
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ShieldAlert,
  FileText,
  UserCheck,
  Heart,
  Moon,
  Footprints,
  Compass,
  ArrowRight,
  PhoneCall,
  Info,
  Sparkles,
  Download,
} from 'lucide-react';

export const PatientPathwayView: React.FC = () => {
  const [activePathwayTab, setActivePathwayTab] = useState<'timeline' | 'prep' | 'navigation' | 'discharge' | 'wellbeing'>('timeline');
  const [lang, setLang] = useState<Language>(I18nService.language);

  useEffect(() => {
    const unsub = I18nService.subscribe((l) => setLang(l));
    return unsub;
  }, []);

  const t = I18nService.t();

  const timelineMilestones = lang === 'en' ? [
    {
      id: 'step-1',
      title: 'Admission & Chart Intake',
      date: 'February 20, 2026',
      status: 'COMPLETED',
      result: 'Chart opened with verified GDPR/HDS consent and multilingual preferences (French, Wolof, English).',
      confidence: 100,
      uncertainty: 'No clinical data processed yet.',
      humanReview: 'Automated (Secretariat)',
    },
    {
      id: 'step-2',
      title: 'Metabolic Day Clinic (Paris)',
      date: 'February 28, 2026',
      status: 'COMPLETED',
      result: 'Metabolic workup: LDL-C 1.62 g/L, started on Atorvastatin 10mg, normal carotid ultrasound.',
      confidence: 98,
      uncertainty: 'Muscle enzyme tolerance to be monitored at 3 months.',
      humanReview: 'Endocrinology Department Validated',
    },
    {
      id: 'step-3',
      title: 'Cardiology Follow-Up Visit (Dakar)',
      date: 'March 14, 2026',
      status: 'COMPLETED',
      result: 'Dr. Fall exam: BP 142/88 mmHg, morning headaches. Prescribed 24h ABPM and continued Amlodipine 5mg.',
      confidence: 95,
      uncertainty: 'Nocturnal blood pressure dipping profile unconfirmed.',
      humanReview: 'Dr. Fall Validated',
    },
    {
      id: 'step-4',
      title: '24h ABPM Referral & Safety Lab Check',
      date: 'Ongoing (Within 3 weeks)',
      status: 'WAITING_HUMAN',
      result: 'Referral order for 24h ABPM blood pressure monitor and liver/muscle enzyme safety test.',
      confidence: 88,
      uncertainty: 'Time priority subject to attending clinician confirmation.',
      humanReview: 'HUMAN REVIEW REQUIRED (Pending Arbitration)',
    },
    {
      id: 'step-5',
      title: 'Clear Discharge Instructions',
      date: 'Available on Patient Portal',
      status: 'COMPLETED',
      result: 'Clear breakdown of medication takes (morning/evening) and alert signs (cramps, vision changes).',
      confidence: 97,
      uncertainty: 'Guidance strictly mirrors actual clinical prescriptions.',
      humanReview: 'Supervising Nurse Validated',
    },
    {
      id: 'step-6',
      title: 'Daily Prevention & Behavioral Nudge',
      date: 'Daily',
      status: 'ACTIVE',
      result: 'Walking micro-habits and progressive salt reduction without guilt.',
      confidence: 92,
      uncertainty: 'Non-therapeutic lifestyle advice.',
      humanReview: 'Not required (low risk)',
    },
  ] : [
    {
      id: 'step-1',
      title: 'Admission & Initialisation',
      date: '20 Février 2026',
      status: 'COMPLETED',
      result: 'Dossier patiente ouvert avec consentement RGPD/HDS et préférences linguistiques (Français & Wolof).',
      confidence: 100,
      uncertainty: 'Aucune donnée médicale encore traitée.',
      humanReview: 'Automatisé (secrétariat)',
    },
    {
      id: 'step-2',
      title: 'Bilan Hospitalier de Jour (Paris)',
      date: '28 Février 2026',
      status: 'COMPLETED',
      result: 'Exploration métabolique : LDL-C 1.62 g/L, mise sous Atorvastatine 10mg, échographie carotidienne normale.',
      confidence: 98,
      uncertainty: 'Tolérance musculaire à surveiller à M3.',
      humanReview: 'Validé par Service Endocrinologie',
    },
    {
      id: 'step-3',
      title: 'Consultation Cardiologie de Suivi (Dakar)',
      date: '14 Mars 2026',
      status: 'COMPLETED',
      result: 'Examen Dr. Fall : PA 142/88 mmHg, céphalées matinales. Prescription d’une MAPA 24h et maintien Amlodipine 5mg.',
      confidence: 95,
      uncertainty: 'Profil tensionnel nocturne non caractérisé.',
      humanReview: 'Validé par Dr. Fall',
    },
    {
      id: 'step-4',
      title: 'Orientation MAPA 24h & Bilan Biologique',
      date: 'En cours (Échéance 3 semaines)',
      status: 'WAITING_HUMAN',
      result: 'Proposition d’orientation pour pose de MAPA et prise de sang de contrôle hépato-musculaire.',
      confidence: 88,
      uncertainty: 'Priorisation temporelle soumise à confirmation du médecin traitant.',
      humanReview: 'REVUE HUMAINE REQUISE (En attente d’arbitrage)',
    },
    {
      id: 'step-5',
      title: 'Instructions de Sortie Didactiques',
      date: 'Disponible sur Espace Patient',
      status: 'COMPLETED',
      result: 'Synthèse claire des prises de médicaments (matin/soir) et des signaux d’alerte (crampes, vision).',
      confidence: 97,
      uncertainty: 'Consignes strictement calquées sur les ordonnances réelles.',
      humanReview: 'Contrôlé par Cadre de Santé',
    },
    {
      id: 'step-6',
      title: 'Prévention Quotidienne & Nudge Bien-être',
      date: 'Quotidien',
      status: 'ACTIVE',
      result: 'Micro-objectifs d’activité (marche) et de régulation du sel sans culpabilisation.',
      confidence: 92,
      uncertainty: 'Conseils hygiéno-diététiques non thérapeutiques.',
      humanReview: 'Non requis (faible risque)',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Patient Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={mockPatientAwaNdiaye.avatarUrl}
              alt={mockPatientAwaNdiaye.fullName}
              className="w-16 h-16 rounded-full object-cover border-2 border-teal-500/40"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center text-[10px] text-slate-950 font-bold">
              ✓
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">{mockPatientAwaNdiaye.fullName}</h2>
              <span className="text-xs px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/30">
                {mockPatientAwaNdiaye.age} ans
              </span>
            </div>
            <div className="text-xs text-slate-400 mt-1 flex flex-wrap gap-2">
              <span>ID : {mockPatientAwaNdiaye.nationalHealthId}</span>
              <span>·</span>
              <span>Résidence : {mockPatientAwaNdiaye.city}</span>
              <span>·</span>
              <span className="text-teal-300">Langues : Français, Wolof, Anglais</span>
            </div>
          </div>
        </div>

        {/* Vital Quick Tags */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs">
            <div className="text-slate-400 text-[10px]">Tension au repos</div>
            <div className="font-mono text-white font-semibold">142/88 mmHg</div>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs">
            <div className="text-slate-400 text-[10px]">LDL-Cholestérol</div>
            <div className="font-mono text-white font-semibold">1.62 g/L</div>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs">
            <div className="text-slate-400 text-[10px]">FEVG (Écho cœur)</div>
            <div className="font-mono text-teal-400 font-semibold">62% (Normale)</div>
          </div>
        </div>
      </div>

      {/* Pathway Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto text-sm">
        <button
          onClick={() => setActivePathwayTab('timeline')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
            activePathwayTab === 'timeline'
              ? 'bg-teal-500 text-slate-950 font-semibold'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          {t.pathway_tab_timeline}
        </button>
        <button
          onClick={() => setActivePathwayTab('prep')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
            activePathwayTab === 'prep'
              ? 'bg-teal-500 text-slate-950 font-semibold'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          {t.pathway_tab_prep}
        </button>
        <button
          onClick={() => setActivePathwayTab('navigation')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
            activePathwayTab === 'navigation'
              ? 'bg-teal-500 text-slate-950 font-semibold'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          {t.pathway_tab_navigation}
        </button>
        <button
          onClick={() => setActivePathwayTab('discharge')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
            activePathwayTab === 'discharge'
              ? 'bg-teal-500 text-slate-950 font-semibold'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          {t.pathway_tab_discharge}
        </button>
        <button
          onClick={() => setActivePathwayTab('wellbeing')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
            activePathwayTab === 'wellbeing'
              ? 'bg-teal-500 text-slate-950 font-semibold'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          {t.pathway_tab_wellbeing}
        </button>
      </div>

      {/* Tab 1: Timeline */}
      {activePathwayTab === 'timeline' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Timeline Interactive du Parcours</h3>
            <span className="text-xs text-slate-400">Chaque jalon détaille son résultat et son niveau d'incertitude</span>
          </div>

          <div className="space-y-4">
            {timelineMilestones.map((m, idx) => (
              <div
                key={m.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400">{m.date}</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-sm font-bold text-white">{m.title}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{m.result}</p>
                  <div className="text-[11px] text-amber-300/90 flex items-center gap-1.5">
                    <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0" />
                    <span>Incertitude clinique : {m.uncertainty}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 text-xs">
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400">Contrôle Humain</div>
                    <div className={`font-semibold ${m.status === 'WAITING_HUMAN' ? 'text-rose-400' : 'text-slate-200'}`}>
                      {m.humanReview}
                    </div>
                  </div>
                  <div className="w-12 text-center">
                    <div className="text-[10px] text-slate-400">Confiance</div>
                    <div className="font-mono font-bold text-teal-400">{m.confidence}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Appointment Preparation */}
      {activePathwayTab === 'prep' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white">Préparation de la Consultation avec le Dr. Fall</h3>
              <p className="text-xs text-slate-400">
                Fiche d'aide à la consultation : structurée à partir des documents, sans poser de diagnostic autonome.
              </p>
            </div>
            <button
              onClick={() => alert('Fiche de préparation exportée en PDF sécurisé.')}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 border border-slate-700 shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exporter la fiche (PDF)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Questions to ask */}
            <div className="space-y-3 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Questions Suggérées à Poser au Médecin</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
                  <span className="font-semibold text-white block mb-0.5">1. Sur les céphalées matinales :</span>
                  « Mes maux de tête au réveil sont-ils directement liés à ma tension artérielle du matin ? »
                </li>
                <li className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
                  <span className="font-semibold text-white block mb-0.5">2. Sur la tolérance de la statine :</span>
                  « Quels sont les signes musculaires précis qui justifieraient de vous appeler avant le bilan de fin mai ? »
                </li>
                <li className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
                  <span className="font-semibold text-white block mb-0.5">3. Sur la MAPA 24h :</span>
                  « Dois-je continuer à travailler normalement pendant le port du boîtier de mesure tensionnelle ? »
                </li>
              </ul>
            </div>

            {/* Checklist */}
            <div className="space-y-3 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span>Documents & Éléments à Apporter</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2 p-2 rounded bg-slate-900/60">
                  <span className="w-4 h-4 rounded border border-teal-500/60 flex items-center justify-center text-[10px] text-teal-400 font-bold">✓</span>
                  <span>Carnet d'auto-mesure tensionnelle (3 mesures matin / 3 mesures soir pendant 3 jours)</span>
                </li>
                <li className="flex items-center gap-2 p-2 rounded bg-slate-900/60">
                  <span className="w-4 h-4 rounded border border-teal-500/60 flex items-center justify-center text-[10px] text-teal-400 font-bold">✓</span>
                  <span>Compte rendu d'hospitalisation de jour de la Pitié-Salpêtrière (28/02/2026)</span>
                </li>
                <li className="flex items-center gap-2 p-2 rounded bg-slate-900/60">
                  <span className="w-4 h-4 rounded border border-teal-500/60 flex items-center justify-center text-[10px] text-teal-400 font-bold">✓</span>
                  <span>Rapport d'échocardiographie en anglais du Dr. Jenkins (FEVG 62%)</span>
                </li>
                <li className="flex items-center gap-2 p-2 rounded bg-slate-900/60">
                  <span className="w-4 h-4 rounded border border-teal-500/60 flex items-center justify-center text-[10px] text-teal-400 font-bold">✓</span>
                  <span>Boîtes de médicaments en cours (Amlodipine 5mg, Atorvastatine 10mg)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Care Navigation */}
      {activePathwayTab === 'navigation' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-teal-400" />
              <span>Navigation des Soins & Coordination Inter-professionnelle</span>
            </h3>
            <p className="text-xs text-slate-400">
              Orientation administrative et médicale : chaque aiguillage sensible est validé par un humain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                1. Étape Administrative Prioritaire
              </div>
              <div className="text-sm font-semibold text-white">Réservation de la MAPA 24h</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Prendre rendez-vous auprès du secrétariat de cardiologie pour la pose du tensiomètre ambulatoire dans les
                3 prochaines semaines.
              </p>
              <div className="text-[11px] text-teal-400 font-medium pt-2">Prise en charge Sécurité Sociale / Mutuelle validée</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider">
                2. Spécialistes à Consulter
              </div>
              <div className="text-sm font-semibold text-white">Dr. Ousmane Fall (Cardiologue)</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Consultation de synthèse à M+2 avec résultats de la MAPA et compte rendu d'automesure. Pas d'indication
                chirurgicale ou interventionnelle.
              </p>
              <div className="text-[11px] text-slate-400 pt-2">Hôpital Principal / Clinique de la Madeleine</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                3. Bilan Biologique à Programmer
              </div>
              <div className="text-sm font-semibold text-white">Prise de sang de sécurité (fin Mai 2026)</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Laboratoire d'analyses médicales : Transaminases (ASAT/ALAT), CPK musculaires, créatininémie, bilan lipidique
                de contrôle.
              </p>
              <div className="text-[11px] text-slate-400 pt-2">À jeun depuis 12 heures</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Discharge Instructions */}
      {activePathwayTab === 'discharge' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white">Instructions de Sortie Clarifiées</h3>
              <p className="text-xs text-slate-400">
                Consignes claires extraites du document de sortie DOC-003, sans jargon ni omission de sécurité.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Daily Routine */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>Ce que vous devez faire au quotidien</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <div className="font-semibold text-white">Le matin au petit-déjeuner :</div>
                  <div className="text-slate-300">1 comprimé d'Amlodipine 5 mg avec un grand verre d'eau.</div>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <div className="font-semibold text-white">Le soir au coucher :</div>
                  <div className="text-slate-300">1 comprimé d'Atorvastatine 10 mg (à prendre chaque soir à heure fixe).</div>
                </div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                  <div className="font-semibold text-white">Hydratation & Sel :</div>
                  <div className="text-slate-300">Boire 1.5 L d'eau par jour et limiter l'ajout de sel de table.</div>
                </div>
              </div>
            </div>

            {/* Red Flags & Emergency */}
            <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-3">
              <div className="text-xs font-semibold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Signaux d'Alerte : Quand Contacter un Professionnel</span>
              </div>
              <ul className="space-y-2 text-xs text-rose-200">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">·</span>
                  <span>Céphalées intenses et brutales accompagnées de vertiges ou vision floue.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">·</span>
                  <span>Douleurs musculaires diffuses inexpliquées (crampes mollets/cuisses) depuis la statine.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">·</span>
                  <span>Tension artérielle mesurée supérieure à 160/100 mmHg à 3 reprises.</span>
                </li>
              </ul>
              <div className="p-2.5 rounded bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-2">
                <PhoneCall className="w-4 h-4 shrink-0" />
                <span>Urgence vitale : composer immédiatement le 15 (SAMU) ou le 1515 à Dakar.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Wellbeing & Nudge AI */}
      {activePathwayTab === 'wellbeing' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-400" />
                <span>Wellbeing Dashboard & Nudge AI Bienveillant</span>
              </h3>
              <p className="text-xs text-slate-400">
                Objectifs réalistes sans culpabilisation : hygiène de sommeil, activité aérobie et alimentation douce.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Sommeil moyen</span>
                <Moon className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-white">5h 45m</div>
              <div className="text-xs text-amber-300">Réveil nocturne fréquent (4h du matin)</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Activité quotidienne</span>
                <Footprints className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-white">4 500 pas</div>
              <div className="text-xs text-slate-400">Objectif doux : 6 000 pas progressif</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Niveau de stress perçu</span>
                <Heart className="w-4 h-4 text-rose-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-amber-400">7 / 10</div>
              <div className="text-xs text-slate-400">Voyages fréquents Dakar / Paris</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Régulation du sel</span>
                <Sparkles className="w-4 h-4 text-teal-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-teal-400">&lt; 5 g / j</div>
              <div className="text-xs text-slate-400">Substitution par herbes aromatiques</div>
            </div>
          </div>

          {/* Compassionate Nudge Box */}
          <div className="p-5 rounded-xl bg-teal-500/10 border border-teal-500/30 space-y-3">
            <div className="text-xs font-semibold text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span>Nudge AI du Jour pour Awa</span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed font-sans">
              « Bonjour Awa. Aujourd'hui, inutile de bouleverser vos repas de famille : essayez simplement une petite
              marche de 10 minutes en fin d'après-midi, et remplacez une pincée de sel par des épices douces dans votre
              plat. Chaque petit pas préserve la santé de vos artères sans contrainte inutile. »
            </p>
            <div className="text-[11px] text-slate-400">
              Algorithme éthique certifié : zéro message anxiogène ou culpabilisant.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
