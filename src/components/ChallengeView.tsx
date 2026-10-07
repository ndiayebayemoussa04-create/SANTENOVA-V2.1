import React, { useState, useEffect } from 'react';
import { mockPatientAwaNdiaye } from '../data/mockPatient';
import { mockHealthDocuments } from '../data/mockDocuments';
import { I18nService } from '../services/i18n';
import { Language } from '../types';
import {
  Play,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  ArrowRight,
  FileText,
  Clock,
  Globe2,
  Stethoscope,
  HeartHandshake,
  BarChart3,
  ExternalLink,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface ChallengeViewProps {
  onNavigateToTab: (tab: string) => void;
}

export const ChallengeView: React.FC<ChallengeViewProps> = ({ onNavigateToTab }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [lang, setLang] = useState<Language>(I18nService.language);

  useEffect(() => {
    const unsub = I18nService.subscribe((l) => setLang(l));
    return unsub;
  }, []);

  const t = I18nService.t();
  const steps = I18nService.getSteps();

  const handleStartDemo = () => {
    setIsRunning(true);
    setCurrentStep(1);
  };

  const handleNextStep = () => {
    if (currentStep < 10) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const activeStepData = steps[currentStep - 1];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Top Hero Banner with Editorial Presence */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950/40 border border-slate-800 p-8">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-3 text-xs text-teal-400 font-medium tracking-wide">
            <span>CHALLENGE SANTÉ & BIEN-ÊTRE</span>
            <span>·</span>
            <span>ÉDITION JURY 2026</span>
            <span>·</span>
            <span>PARCOURS PATIENT SÉCURISÉ</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            SantéNova v2.1 — Challenge Edition
          </h1>

          <p className="text-base text-slate-300 leading-relaxed">
            Rendre le parcours du patient plus sûr, plus clair et plus facile. Démonstration interactive de bout en bout
            avec la patiente fictive <span className="font-semibold text-white">Awa Ndiaye (42 ans)</span> : RAG avec
            sources vérifiées, human-in-the-loop incontournable, accessibilité multilingue (Français, Wolof, Anglais)
            et maîtrise absolue de l’incertitude.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={handleStartDemo}
              className="px-5 py-2.5 rounded-lg bg-teal-500 text-slate-950 font-semibold text-sm hover:bg-teal-400 transition-colors flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Démarrer la Démonstration</span>
            </button>

            <button
              onClick={() => onNavigateToTab('rag')}
              className="px-4 py-2.5 rounded-lg bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 transition-colors text-sm font-medium flex items-center gap-2 border border-slate-700"
            >
              <FileText className="w-4 h-4 text-teal-400" />
              <span>Consulter les 6 Documents</span>
            </button>

            <button
              onClick={() => onNavigateToTab('cancer')}
              className="px-4 py-2.5 rounded-lg bg-rose-500/15 text-rose-200 hover:bg-rose-500/25 transition-colors text-sm font-medium flex items-center gap-2 border border-rose-500/30"
            >
              <FileText className="w-4 h-4 text-rose-400" />
              <span>Dépistage Cancer (ACR 3)</span>
            </button>

            <button
              onClick={() => onNavigateToTab('reviews')}
              className="px-4 py-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-colors text-sm font-medium flex items-center gap-2"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Revue Humaine Obligatoire</span>
            </button>
          </div>
        </div>

        {/* Ambient image background */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none hidden lg:block overflow-hidden">
          <img
            src="/src/assets/images/hero_medical_ai_1791240014474.jpg"
            alt="SantéNova Medical AI"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Architecture Flow Banner: BESOIN -> DONNÉES -> IA -> RÉSULTAT -> INCERTITUDE -> HUMAIN -> ACTION -> MESURE */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">
          Chaîne d'Exécution & Maîtrise du Risque
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-center text-xs">
          <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50">
            <span className="font-semibold text-white block">1. BESOIN</span>
            <span className="text-slate-400 text-[11px]">Documents longs</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50">
            <span className="font-semibold text-white block">2. DONNÉES</span>
            <span className="text-slate-400 text-[11px]">5 pièces (FR/EN)</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50">
            <span className="font-semibold text-teal-400 block">3. IA RAG</span>
            <span className="text-slate-400 text-[11px]">BioEmbedder</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50">
            <span className="font-semibold text-white block">4. RÉSULTAT</span>
            <span className="text-slate-400 text-[11px]">Double vue Pro/Pat</span>
          </div>
          <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30">
            <span className="font-semibold text-amber-300 block">5. INCERTITUDE</span>
            <span className="text-amber-200 text-[11px]">Visible & quantifiée</span>
          </div>
          <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30">
            <span className="font-semibold text-rose-300 block">6. HUMAIN</span>
            <span className="text-rose-200 text-[11px]">Revue obligatoire</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50">
            <span className="font-semibold text-white block">7. ACTION</span>
            <span className="text-slate-400 text-[11px]">Ordonnance validée</span>
          </div>
          <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
            <span className="font-semibold text-emerald-300 block">8. MESURE</span>
            <span className="text-emerald-200 text-[11px]">Avant / Après</span>
          </div>
        </div>
      </div>

      {/* Step by Step Interactive Walkthrough */}
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>Scénario Démonstrateur — Étape {currentStep} sur 10</span>
              <span className="text-xs font-normal text-slate-400">· Awa Ndiaye (42 ans)</span>
            </h2>
            <p className="text-sm text-slate-400">
              Naviguez à travers les 10 phases pour tester la réponse du système et sa gouvernance.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevStep}
              disabled={currentStep === 1}
              className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-xs font-medium"
            >
              Étape précédente
            </button>
            <button
              onClick={handleNextStep}
              disabled={currentStep === 10}
              className="px-3 py-1.5 rounded-lg bg-teal-500 text-slate-950 font-semibold hover:bg-teal-400 disabled:opacity-40 disabled:pointer-events-none text-xs flex items-center gap-1.5"
            >
              <span>Étape suivante</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Step indicators bar */}
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
          {steps.map((s) => (
            <button
              key={s.num}
              onClick={() => setCurrentStep(s.num)}
              className={`p-2 rounded-lg text-left border transition-all ${
                currentStep === s.num
                  ? 'bg-teal-500/15 border-teal-500 text-teal-300 font-semibold'
                  : currentStep > s.num
                  ? 'bg-slate-900 border-slate-800 text-slate-300'
                  : 'bg-slate-950/60 border-slate-900 text-slate-500 hover:border-slate-800'
              }`}
            >
              <div className="text-[10px] uppercase tracking-wider">Étape {s.num}</div>
              <div className="text-xs truncate font-medium">{s.title}</div>
            </button>
          ))}
        </div>

        {/* Active Step Detailed Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/30">
                  {t.step_prefix} {activeStepData.num} / 10
                </span>
                {activeStepData.humanReview ? (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3" />
                    {t.step_human_review_req}
                  </span>
                ) : (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {t.step_auto_safe}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-white">{activeStepData.title}</h3>
              <p className="text-sm text-slate-300">{activeStepData.desc}</p>
            </div>

            <div className="text-right shrink-0">
              <div className="text-xs text-slate-400">Score de Confiance IA</div>
              <div className="text-2xl font-bold font-mono text-teal-400">{activeStepData.confidence}%</div>
            </div>
          </div>

          {/* Tripartite Breakdown: Données Initiales -> Traitement IA -> Résultat Final */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800/80 space-y-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span>{t.step_initial_data}</span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">{activeStepData.input}</p>
            </div>

            <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800/80 space-y-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>{t.step_ai_processing}</span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">{activeStepData.aiAction}</p>
            </div>

            <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800/80 space-y-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.step_final_output}</span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">{activeStepData.output}</p>
            </div>
          </div>

          {/* Uncertainty & Safety Box */}
          <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20 space-y-2">
            <div className="text-xs font-semibold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.step_uncertainty_box}</span>
            </div>
            <p className="text-sm text-amber-100/90 leading-relaxed">{activeStepData.uncertainty}</p>
          </div>

          {/* Contextual Actions related to this step */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-slate-400">
              {activeStepData.humanReview
                ? 'Une décision clinique est en attente d’arbitrage humain pour continuer.'
                : 'Étape validée selon les règles d’éthique et de minimisation des données.'}
            </span>

            <div className="flex items-center gap-2">
              {activeStepData.num === 3 || activeStepData.num === 4 ? (
                <button
                  onClick={() => onNavigateToTab('rag')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-teal-300 hover:bg-slate-700 transition-colors flex items-center gap-1"
                >
                  <span>Tester le RAG interactif</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              ) : activeStepData.num === 6 ? (
                <button
                  onClick={() => onNavigateToTab('reviews')}
                  className="px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 transition-colors flex items-center gap-1 font-semibold"
                >
                  <span>Arbitrer dans la Revue Humaine</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              ) : activeStepData.num === 7 ? (
                <button
                  onClick={() => onNavigateToTab('multilingual')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-teal-300 hover:bg-slate-700 transition-colors flex items-center gap-1"
                >
                  <span>Écouter en Wolof & Français</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              ) : activeStepData.num === 9 ? (
                <button
                  onClick={() => onNavigateToTab('wellbeing')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-teal-300 hover:bg-slate-700 transition-colors flex items-center gap-1"
                >
                  <span>Voir le Nudge Bien-être</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Jury Master Dashboard: PROBLÈME, SOLUTION, SÉCURITÉ, IMPACT */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>Synthèse pour le Jury de Challenge</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Problème */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
              1. Problème Identifié
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-1.5">
                <span className="text-rose-400">·</span>
                <span>Documents de santé longs et jargonnants</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-rose-400">·</span>
                <span>Informations dispersées entre Paris et Dakar</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-rose-400">·</span>
                <span>Barrières linguistiques (besoin de Wolof)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-rose-400">·</span>
                <span>Charge administrative lourde pour les soignants</span>
              </li>
            </ul>
          </div>

          {/* Solution */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider">
              2. Solution SantéNova
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-1.5">
                <span className="text-teal-400">·</span>
                <span>Pipeline RAG avec citations de sources réelles</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-teal-400">·</span>
                <span>Double synthèse adaptée (Pro vs Patient)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-teal-400">·</span>
                <span>Traduction & reformulation Wolof / FR / EN</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-teal-400">·</span>
                <span>Nudge AI bienveillant et non culpabilisant</span>
              </li>
            </ul>
          </div>

          {/* Sécurité */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              3. Sécurité Absolue
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-1.5">
                <span className="text-amber-400">·</span>
                <span>Interdiction de diagnostic autonome</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-400">·</span>
                <span>Interdiction de prescription ou modification</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-400">·</span>
                <span>Incertitude visible : refus si manque de preuve</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-400">·</span>
                <span>Human-in-the-loop pour toute décision sensible</span>
              </li>
            </ul>
          </div>

          {/* Impact */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              4. Impact Mesurable
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400">·</span>
                <span>Temps de préparation réduit de 47%</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400">·</span>
                <span>Score de clarté patient doublé (+93%)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400">·</span>
                <span>Charge mentale du soignant allégée (-28%)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400">·</span>
                <span>Traçabilité complète dans l'audit certifié</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Before / After Metrics Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-white">{t.sim_table_title}</h3>
            <p className="text-xs text-slate-400">
              {t.sim_table_sub}
            </p>
          </div>

          <div className="text-xs font-semibold px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
            {t.sim_table_indicator}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold">{t.sim_col_metric}</th>
                <th className="py-3 px-4 font-semibold">{t.sim_col_before}</th>
                <th className="py-3 px-4 font-semibold">{t.sim_col_after}</th>
                <th className="py-3 px-4 font-semibold">{t.sim_col_gain}</th>
                <th className="py-3 px-4 font-semibold">{t.sim_col_guarantee}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-slate-200">
              <tr className="hover:bg-slate-800/30">
                <td className="py-3 px-4 font-sans text-white font-medium">Temps administratif global</td>
                <td className="py-3 px-4 text-slate-400">45 minutes</td>
                <td className="py-3 px-4 text-teal-400 font-bold">24 minutes</td>
                <td className="py-3 px-4 text-emerald-400 font-semibold">- 47%</td>
                <td className="py-3 px-4 font-sans text-slate-400">Synthèse pré-remplie validée par soignant</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-3 px-4 font-sans text-white font-medium">Étapes du parcours patient</td>
                <td className="py-3 px-4 text-slate-400">9 étapes fragmentées</td>
                <td className="py-3 px-4 text-teal-400 font-bold">6 étapes coordonnées</td>
                <td className="py-3 px-4 text-emerald-400 font-semibold">- 33%</td>
                <td className="py-3 px-4 font-sans text-slate-400">Navigation guidée et rappels SMS sans PII</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-3 px-4 font-sans text-white font-medium">Compréhension patiente (Score)</td>
                <td className="py-3 px-4 text-slate-400">42 / 100</td>
                <td className="py-3 px-4 text-teal-400 font-bold">81 / 100</td>
                <td className="py-3 px-4 text-emerald-400 font-semibold">+ 93%</td>
                <td className="py-3 px-4 font-sans text-slate-400">Explications en Wolof & langage clair</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-3 px-4 font-sans text-white font-medium">Charge de travail soignante (Indice)</td>
                <td className="py-3 px-4 text-slate-400">100 (base de référence)</td>
                <td className="py-3 px-4 text-teal-400 font-bold">72</td>
                <td className="py-3 px-4 text-emerald-400 font-semibold">- 28%</td>
                <td className="py-3 px-4 font-sans text-slate-400">Filtre anti-redondance et RAG sourcé</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
