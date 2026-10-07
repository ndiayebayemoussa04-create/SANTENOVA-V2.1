import React, { useState } from 'react';
import { AIOrchestrator } from '../services/orchestrator';
import { ConsentPurpose } from '../types';
import {
  ShieldCheck,
  Lock,
  UserX,
  FileCheck,
  History,
  CheckCircle2,
  AlertCircle,
  Download,
  Key,
} from 'lucide-react';

export const TrustCenterView: React.FC = () => {
  const orchestrator = AIOrchestrator.getInstance();
  const [consents, setConsents] = useState<ConsentPurpose[]>([...orchestrator.consents]);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const handleToggleConsent = (purposeId: ConsentPurpose['id']) => {
    const purpose = consents.find((c) => c.id === purposeId);
    if (!purpose) return;

    if (purpose.mandatory) {
      setFeedbackMessage('Impossible de révoquer ce consentement : il est obligatoire pour la prise en charge médicale directe.');
      setTimeout(() => setFeedbackMessage(null), 4000);
      return;
    }

    const nextState = !purpose.granted;
    const res = orchestrator.updateConsent(purposeId, nextState);
    if (res.success) {
      setConsents([...orchestrator.consents]);
      setFeedbackMessage(
        `Consentement [${purpose.name}] mis à jour : ${nextState ? 'ACCORDÉ' : 'RÉVOQUÉ'}. Les modules associés ont été mis à jour instantanément.`
      );
      setTimeout(() => setFeedbackMessage(null), 4000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-400 uppercase tracking-wider">
            <span>Souveraineté des Données & Éthique Clinique</span>
            <span>·</span>
            <span>/trust</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Trust Center : Gouvernance des Consentements & Traçabilité</h2>
          <p className="text-sm text-slate-400">
            Contrôle granulaire par finalité : CARE, PERSONALIZATION, RESEARCH, PUBLIC_HEALTH, COMMUNICATION.
            Chaque modification prend effet immédiatement et est inscrite dans l'audit certifié.
          </p>
        </div>

        <button
          onClick={() => alert('Journal d’audit cryptographique exporté (Format JSON / HDS).')}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 rounded-xl text-xs font-medium flex items-center gap-2 transition-colors self-start md:self-auto shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Exporter le Registre d'Audit</span>
        </button>
      </div>

      {feedbackMessage && (
        <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* Purpose Matrix */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white">Gestion Granulaire des Finalités de Traitement</h3>
            <p className="text-xs text-slate-400">
              Conformité stricte RGPD Article 6 & 9 et réglementations sanitaires HDS / Sénégal CDP.
            </p>
          </div>
          <span className="text-xs font-mono text-teal-400">Patiente : Awa Ndiaye</span>
        </div>

        <div className="space-y-4">
          {consents.map((c) => (
            <div
              key={c.id}
              className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-teal-300">
                    {c.id}
                  </span>
                  <span className="text-sm font-bold text-white">{c.name}</span>
                  {c.mandatory && (
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      Obligatoire (Soins)
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{c.description}</p>
                <div className="text-[11px] text-slate-500">Dernière mise à jour : {c.lastUpdated}</div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => handleToggleConsent(c.id)}
                  disabled={c.mandatory}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    c.granted
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                      : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                  } ${c.mandatory ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  {c.granted ? 'Consentement Accordé' : 'Consentement Révoqué'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security & Cryptographic Proofs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-400 uppercase tracking-wider">
            <Lock className="w-4 h-4" />
            <span>Chiffrement au Repos</span>
          </div>
          <div className="text-sm font-semibold text-white">Standard AES-GCM 256-bit</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Toutes les données médicales textuelles et les représentations vectorielles sont scellées cryptographiquement.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
            <Key className="w-4 h-4" />
            <span>Minimisation des Données</span>
          </div>
          <div className="text-sm font-semibold text-white">Zéro PII sur Canaux Non Sécurisés</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Les rappels SMS et notifications ne contiennent aucune donnée clinique, diagnostique ou posologique.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 uppercase tracking-wider">
            <UserX className="w-4 h-4" />
            <span>Droit à l'Oubli & Révocation</span>
          </div>
          <div className="text-sm font-semibold text-white">Révocation Instantanée</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            La désactivation d'un consentement coupe immédiatement les flux de données vers le plugin correspondant.
          </p>
        </div>
      </div>
    </div>
  );
};
