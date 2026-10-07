import React, { useState, useEffect } from 'react';
import { mockHealthDocuments } from '../data/mockDocuments';
import { RAGService } from '../services/ragService';
import { HealthDocument, RAGQueryResponse, Language } from '../types';
import { I18nService } from '../services/i18n';
import {
  FileText,
  Search,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Languages,
  BookOpen,
  Quote,
  Stethoscope,
  User,
} from 'lucide-react';

export const DocumentRAGView: React.FC = () => {
  const [selectedDocId, setSelectedDocId] = useState<string>('DOC-001');
  const [lang, setLang] = useState<Language>(I18nService.language);

  useEffect(() => {
    const unsub = I18nService.subscribe((l) => setLang(l));
    return unsub;
  }, []);

  const t = I18nService.t();

  const [searchQuery, setSearchQuery] = useState<string>(() =>
    lang === 'en'
      ? 'What are her current medications and their dosages?'
      : 'Quels sont ses médicaments actuels et leurs posologies ?'
  );

  const [ragResult, setRagResult] = useState<RAGQueryResponse | null>(() =>
    RAGService.query('Quels sont ses médicaments actuels et leurs posologies ?')
  );
  const [summaryMode, setSummaryMode] = useState<'pro' | 'patient'>('patient');
  const [langTab, setLangTab] = useState<'fr' | 'wo' | 'en'>('fr');

  const selectedDoc = mockHealthDocuments.find((d) => d.id === selectedDocId) || mockHealthDocuments[0];

  const sampleQueries = lang === 'en' ? [
    { label: 'Medications & Dosages', query: 'What are her current medications and their dosages?' },
    { label: 'Blood Pressure & 24h ABPM', query: 'What is her blood pressure and why prescribe a 24h ABPM monitor?' },
    { label: 'Cholesterol & LDL Panel', query: 'What is her LDL cholesterol reading and liver safety tests?' },
    { label: 'Cancer Screening & Mammography (ACR 3)', query: 'What are the breast cancer screening results and mammogram findings?' },
    { label: 'Cardiac Ultrasound (EN)', query: 'What does the echocardiogram show regarding left ventricular ejection fraction?' },
    {
      label: 'Anti-Hallucination Safe Rejection',
      query: 'What is her insulin dosage for diabetes and scheduled surgery date?',
      isUncertaintyTest: true,
    },
  ] : [
    { label: 'Médicaments & Posologies', query: 'Quels sont ses médicaments actuels et leurs posologies ?' },
    { label: 'Tension & MAPA 24h', query: 'Quelle est sa tension artérielle et pourquoi prescrire une MAPA ?' },
    { label: 'Bilan Cholestérol & LDL', query: 'Quel est son taux de cholestérol et les examens hépatiques ?' },
    { label: 'Dépistage Cancer & Mammographie (ACR 3)', query: 'Quels sont les résultats du dépistage du cancer et de la mammographie ?' },
    { label: 'Échographie Cardiaque (EN)', query: 'Que montre l’échocardiogramme en anglais et la fraction d’éjection ?' },
    {
      label: 'Test Anti-Hallucination (Insuline)',
      query: 'Quel est son dosage d’insuline pour son diabète et la chirurgie prévue ?',
      isUncertaintyTest: true,
    },
  ];

  const handleExecuteQuery = (q: string) => {
    setSearchQuery(q);
    const result = RAGService.query(q);
    setRagResult(result);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-400 uppercase tracking-wider">
            <span>Module RAG Clinique Sécurisé</span>
            <span>·</span>
            <span>Indexation Multilingue (FR / EN / Wolof)</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Extraction, RAG & Double Synthèse Médicale</h2>
          <p className="text-sm text-slate-400">
            Pipeline RAG certifié sans hallucination : chaque réponse est adossée à une citation traçable. En l’absence
            de source avérée, le système refuse de spéculer.
          </p>
        </div>

        {/* Anti-Hallucination Badge */}
        <div className="flex items-center gap-2 p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs">
          <ShieldAlert className="w-4 h-4 text-teal-400 shrink-0" />
          <div>
            <div className="font-semibold text-white">Principe Anti-Hallucination</div>
            <div className="text-slate-400">Aucune extrapolation médicale autonome</div>
          </div>
        </div>
      </div>

      {/* Interactive Query Bar & Predefined Prompts */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleExecuteQuery(searchQuery);
          }}
          className="flex items-center gap-3"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.rag_search_placeholder}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold text-sm rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.rag_search_btn}</span>
          </button>
        </form>

        {/* Suggested Queries */}
        <div className="space-y-1.5">
          <div className="text-xs text-slate-400">
            {lang === 'en'
              ? 'Grounded query presets (including anti-hallucination test):'
              : 'Exemples de requêtes pré-calibrées (dont test d’incertitude) :'}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {sampleQueries.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleExecuteQuery(item.query)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  item.isUncertaintyTest
                    ? 'bg-rose-500/10 text-rose-300 border border-rose-500/30 hover:bg-rose-500/20'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RAG Output Card */}
      {ragResult && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                {ragResult.hasSufficientInfo ? (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    SOURCES CERTIFIÉES DANS LE DOSSIER
                  </span>
                ) : (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    DONNÉES INSUFFISANTES — DÉCISION BLOQUÉE
                  </span>
                )}
                <span className="text-xs font-mono text-slate-400">
                  Confiance : {Math.round(ragResult.confidenceScore * 100)}%
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1">« {ragResult.query} »</h3>
            </div>

            {/* View Selector: Version Pro vs Version Patient */}
            <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-1 text-xs">
              <button
                onClick={() => setSummaryMode('patient')}
                className={`px-3 py-1.5 rounded-md font-medium flex items-center gap-1.5 transition-colors ${
                  summaryMode === 'patient'
                    ? 'bg-teal-500 text-slate-950 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Version Patiente</span>
              </button>
              <button
                onClick={() => setSummaryMode('pro')}
                className={`px-3 py-1.5 rounded-md font-medium flex items-center gap-1.5 transition-colors ${
                  summaryMode === 'pro'
                    ? 'bg-teal-500 text-slate-950 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Version Professionnelle</span>
              </button>
            </div>
          </div>

          {/* Primary Answer Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  {summaryMode === 'patient'
                    ? 'Synthèse Didactique pour la Patiente (Langage clair)'
                    : 'Synthèse Clinique Structurée (Professionnels de santé)'}
                </div>
                <p className="text-sm text-slate-200 leading-relaxed font-sans">
                  {summaryMode === 'patient'
                    ? ragResult.patientSimplifiedFr
                    : ragResult.clinicianSummaryFr}
                </p>
              </div>

              {/* Multilingual Tabs */}
              <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Languages className="w-3.5 h-3.5 text-teal-400" />
                    <span>Reformulation Multilingue</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <button
                      onClick={() => setLangTab('fr')}
                      className={`px-2 py-0.5 rounded ${
                        langTab === 'fr' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-500'
                      }`}
                    >
                      Français
                    </button>
                    <button
                      onClick={() => setLangTab('wo')}
                      className={`px-2 py-0.5 rounded ${
                        langTab === 'wo' ? 'bg-teal-500/20 text-teal-300 font-semibold' : 'text-slate-500'
                      }`}
                    >
                      Wolof (Sénégal)
                    </button>
                    <button
                      onClick={() => setLangTab('en')}
                      className={`px-2 py-0.5 rounded ${
                        langTab === 'en' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-500'
                      }`}
                    >
                      English
                    </button>
                  </div>
                </div>

                <div className="text-sm text-slate-300 italic leading-relaxed">
                  {langTab === 'fr' && ragResult.answerFr}
                  {langTab === 'wo' && ragResult.answerWolof}
                  {langTab === 'en' && ragResult.answerEn}
                </div>
              </div>
            </div>

            {/* Citations & Evidence Panel */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Quote className="w-3.5 h-3.5 text-teal-400" />
                <span>Sources & Citations Cliniques ({ragResult.citations.length})</span>
              </div>

              {ragResult.citations.length > 0 ? (
                <div className="space-y-2">
                  {ragResult.citations.map((cite, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between text-teal-400 font-semibold">
                        <span className="truncate">{cite.documentTitle}</span>
                        <span className="font-mono text-[10px] text-slate-400">Pertinence {cite.relevanceScore}%</span>
                      </div>
                      <div className="text-[11px] text-slate-400">Section : {cite.section}</div>
                      <p className="text-slate-300 text-[11px] line-clamp-3">« {cite.snippet} »</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-rose-500/5 border border-rose-500/20 text-xs text-rose-300 space-y-1">
                  <div className="font-semibold flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Aucune source correspondante</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    SantéNova applique la règle stricte du RAG : sans citation exacte vérifiable, la réponse est
                    déclarée incertaine et transmise pour examen humain.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Raw Health Documents Explorer */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-teal-400" />
            <span>Explorateur des 5 Documents de Santé (Dossier Awa Ndiaye)</span>
          </h3>
          <span className="text-xs text-slate-400">Chiffrement AES-256 au repos · Données fictives certifiées</span>
        </div>

        {/* Document Selector Pills/Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
          {mockHealthDocuments.map((doc) => (
            <button
              key={doc.id}
              onClick={() => setSelectedDocId(doc.id)}
              className={`p-3 rounded-xl text-left border transition-all ${
                selectedDocId === doc.id
                  ? 'bg-teal-500/15 border-teal-500 text-white'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                <span>{doc.id}</span>
                <span className="uppercase">{doc.language}</span>
              </div>
              <div className="text-xs font-semibold truncate text-white">{doc.title}</div>
              <div className="text-[11px] text-slate-400 mt-1 truncate">{doc.author}</div>
            </button>
          ))}
        </div>

        {/* Selected Document Full View */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800 text-xs">
            <div>
              <span className="font-semibold text-white text-sm">{selectedDoc.title}</span>
              <div className="text-slate-400">
                {selectedDoc.author} · {selectedDoc.institution} · {selectedDoc.date}
              </div>
            </div>
            <div className="text-right">
              <span className="text-slate-400">Catégorie : </span>
              <span className="font-semibold text-teal-400">{selectedDoc.category}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Raw Text */}
            <div className="lg:col-span-2 space-y-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Contenu Brut du Document
              </div>
              <pre className="p-4 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
                {selectedDoc.rawText}
              </pre>
            </div>

            {/* Extracted Structured Metadata & Chunks */}
            <div className="space-y-4">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Données Structurées Extraites
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-2">
                {selectedDoc.structuredData.vitalSigns && (
                  <div>
                    <div className="text-slate-400 font-semibold mb-1">Constantes clés :</div>
                    <ul className="space-y-0.5 text-slate-200">
                      {Object.entries(selectedDoc.structuredData.vitalSigns).map(([k, v]) => (
                        <li key={k} className="flex justify-between">
                          <span className="capitalize text-slate-400">{k}</span>
                          <span className="font-mono text-teal-400 font-medium">{v}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedDoc.structuredData.medicationsMentioned && (
                  <div className="pt-2 border-t border-slate-800">
                    <div className="text-slate-400 font-semibold mb-1">Médicaments cités :</div>
                    <div className="flex flex-wrap gap-1">
                      {selectedDoc.structuredData.medicationsMentioned.map((m, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 text-[10px]">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedDoc.structuredData.redFlags && (
                  <div className="pt-2 border-t border-slate-800">
                    <div className="text-rose-400 font-semibold mb-1">Signaux de vigilance (Red Flags) :</div>
                    <ul className="list-disc list-inside text-rose-200 text-[11px] space-y-0.5">
                      {selectedDoc.structuredData.redFlags.map((rf, i) => (
                        <li key={i}>{rf}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Chunks */}
              <div className="space-y-2">
                <div className="text-xs text-slate-400 font-semibold">Segments d'indexation (Chunks) :</div>
                {selectedDoc.chunks.map((chk) => (
                  <div key={chk.id} className="p-2.5 rounded bg-slate-950/70 border border-slate-800 text-xs space-y-1">
                    <div className="flex justify-between text-[10px] text-teal-400 font-mono">
                      <span>{chk.id}</span>
                      <span>Page {chk.page}</span>
                    </div>
                    <p className="text-slate-300 text-[11px]">« {chk.content} »</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
