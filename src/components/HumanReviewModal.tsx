import React, { useState } from 'react';
import { AIOrchestrator } from '../services/orchestrator';
import { HumanReviewCase, ReviewStatus } from '../types';
import { ShieldAlert, CheckCircle2, XCircle, AlertTriangle, UserCheck, Stethoscope } from 'lucide-react';

interface HumanReviewModalProps {
  onClose: () => void;
}

export const HumanReviewModal: React.FC<HumanReviewModalProps> = ({ onClose }) => {
  const orchestrator = AIOrchestrator.getInstance();
  const [cases, setCases] = useState<HumanReviewCase[]>([...orchestrator.humanReviewQueue]);
  const [selectedCase, setSelectedCase] = useState<HumanReviewCase>(cases[0]);
  const [reviewerNotes, setReviewerNotes] = useState<string>('');
  const [reviewerName, setReviewerName] = useState<string>('Dr. Ousmane Fall (Cardiologue)');

  const handleDecision = (status: ReviewStatus) => {
    if (!selectedCase) return;
    const finalNotes = reviewerNotes.trim() || (status === 'APPROVED' ? 'Validation clinique accordée après vérification du dossier.' : 'Rejet de la proposition : réorientation clinique requise.');
    orchestrator.updateReviewStatus(selectedCase.id, status, finalNotes, reviewerName);
    setCases([...orchestrator.humanReviewQueue]);
    setReviewerNotes('');
    alert(`Décision enregistrée avec succès : Statut [${status}] pour le cas ${selectedCase.id}.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 uppercase tracking-wider">
            <span>Human-in-the-Loop Obligatoire</span>
            <span>·</span>
            <span>Garantie de Sécurité Clinique</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Revue Humaine & Arbitrage des Décisions à Risque</h2>
          <p className="text-sm text-slate-400">
            Règle absolue SantéNova : une IA ne peut pas valider seule une décision clinique à haut risque.
            Chaque arbitrage est nominatif, horodaté et irréversible sans contre-avis médical.
          </p>
        </div>

        <button
          onClick={onClose}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium transition-colors"
        >
          Retour au Dashboard
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Case List */}
        <div className="space-y-3">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            File d'Attente des Cas ({cases.length})
          </div>

          <div className="space-y-2">
            {cases.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedCase(c);
                  setReviewerNotes(c.reviewerNotes || '');
                }}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  selectedCase?.id === c.id
                    ? 'bg-slate-800 border-teal-500'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-mono text-teal-400 font-semibold">{c.id}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      c.status === 'APPROVED'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : c.status === 'REJECTED'
                        ? 'bg-rose-500/20 text-rose-300'
                        : 'bg-amber-500/20 text-amber-300'
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
                <div className="text-sm font-semibold text-white truncate">{c.title}</div>
                <div className="text-[11px] text-slate-400 mt-1 line-clamp-2">{c.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Case Detail & Actions */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-teal-400">{selectedCase.id}</span>
                <span className="text-slate-500">·</span>
                <span className="text-xs text-slate-400">{selectedCase.timestamp}</span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">{selectedCase.title}</h3>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400">Niveau de risque : </span>
              <span className="text-xs font-bold text-rose-400">{selectedCase.riskLevel}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Description de la Situation Clinique
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">{selectedCase.description}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider">
                Action Suggérée par l'IA (Soumise à Validation)
              </div>
              <p className="text-sm text-teal-200 leading-relaxed font-sans">{selectedCase.aiSuggestedAction}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Sources Documentaires Adossées
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedCase.sources.map((s, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs text-slate-300">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Reviewer Input */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-white">Nom du Médecin Examinateur :</label>
                <input
                  type="text"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-white block mb-1">
                  Commentaires & Justification Médicale :
                </label>
                <textarea
                  value={reviewerNotes}
                  onChange={(e) => setReviewerNotes(e.target.value)}
                  placeholder="Saisissez vos observations cliniques avant de statuer..."
                  rows={3}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => handleDecision('REJECTED')}
                  className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Rejeter la Proposition</span>
                </button>

                <button
                  onClick={() => handleDecision('APPROVED')}
                  className="px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approuver & Valider Cliniquement</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
