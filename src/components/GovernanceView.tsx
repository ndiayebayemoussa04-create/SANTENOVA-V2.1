import React, { useState } from 'react';
import { AIOrchestrator } from '../services/orchestrator';
import { FairnessMetricGroup, PluginModule, RegisteredModel } from '../types';
import {
  Scale,
  Cpu,
  Layers,
  GitBranch,
  Shield,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Server,
  Zap,
} from 'lucide-react';

export const GovernanceView: React.FC = () => {
  const orchestrator = AIOrchestrator.getInstance();
  const [activeGovTab, setActiveGovTab] = useState<'fairness' | 'workflow' | 'plugins' | 'models' | 'compute' | 'audit'>('fairness');
  const [plugins, setPlugins] = useState<PluginModule[]>([...orchestrator.plugins]);
  const [models, setModels] = useState<RegisteredModel[]>([...orchestrator.models]);
  const [hardware, setHardware] = useState({ ...orchestrator.hardwareStatus });

  const handleTogglePlugin = (pluginId: string) => {
    const success = orchestrator.togglePlugin(pluginId);
    if (success) {
      setPlugins([...orchestrator.plugins]);
    } else {
      alert('Impossible d’activer ce module : le consentement utilisateur correspondant n’est pas accordé dans le Trust Center.');
    }
  };

  const handleToggleHardware = () => {
    orchestrator.toggleHardwareProvider();
    setHardware({ ...orchestrator.hardwareStatus });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-400 uppercase tracking-wider">
            <span>Supervision & Conformité Réglementaire</span>
            <span>·</span>
            <span>AI Safety & Architecture</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Gouvernance IA : Équité, Workflows, Plugins & Compute</h2>
          <p className="text-sm text-slate-400">
            Cadre de gouvernance technique : monitoring des biais algorithmiques, registre des modèles certifiés,
            architecture de plugins avec permissions et compatibilité matérielle AMD ROCm / CPU.
          </p>
        </div>

        {/* Hardware Status Indicator */}
        <div className="flex items-center gap-3 p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs">
          <Cpu className="w-5 h-5 text-teal-400 shrink-0" />
          <div>
            <div className="font-semibold text-white flex items-center gap-1.5">
              <span>{hardware.provider === 'AMDROCmProvider' ? 'AMD ROCm Accéléré' : 'CPU Sécurisé'}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-[11px] text-slate-400">{hardware.chipName}</div>
          </div>
        </div>
      </div>

      {/* Governance Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto text-sm">
        <button
          onClick={() => setActiveGovTab('fairness')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeGovTab === 'fairness'
              ? 'bg-teal-500 text-slate-950 font-bold'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>Fairness & Équité (/fairness)</span>
        </button>
        <button
          onClick={() => setActiveGovTab('workflow')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeGovTab === 'workflow'
              ? 'bg-teal-500 text-slate-950 font-bold'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <GitBranch className="w-4 h-4" />
          <span>Workflow & Évolution</span>
        </button>
        <button
          onClick={() => setActiveGovTab('plugins')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeGovTab === 'plugins'
              ? 'bg-teal-500 text-slate-950 font-bold'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Système Plugins ({plugins.length})</span>
        </button>
        <button
          onClick={() => setActiveGovTab('models')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeGovTab === 'models'
              ? 'bg-teal-500 text-slate-950 font-bold'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Model Registry ({models.length})</span>
        </button>
        <button
          onClick={() => setActiveGovTab('compute')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeGovTab === 'compute'
              ? 'bg-teal-500 text-slate-950 font-bold'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Server className="w-4 h-4" />
          <span>AMD ROCm & Compute</span>
        </button>
        <button
          onClick={() => setActiveGovTab('audit')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeGovTab === 'audit'
              ? 'bg-teal-500 text-slate-950 font-bold'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Journal d'Audit ({orchestrator.auditTrail.length})</span>
        </button>
      </div>

      {/* Tab 1: Fairness Engine */}
      {activeGovTab === 'fairness' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Scale className="w-5 h-5 text-teal-400" />
                <span>Fairness Engine : Évaluation de la Parité Algorithmique</span>
              </h3>
              <p className="text-xs text-slate-400">
                Surveillance continue de la sensibilité, spécificité, précision et calibrage entre sous-populations.
              </p>
            </div>
            <div className="px-3 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>AUCUN BIAIS CRITIQUE DÉTECTÉ</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-sans">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                  <th className="py-3 px-4">Cohorte d'Évaluation</th>
                  <th className="py-3 px-4">Échantillon (N)</th>
                  <th className="py-3 px-4">Sensibilité</th>
                  <th className="py-3 px-4">Spécificité</th>
                  <th className="py-3 px-4">Précision</th>
                  <th className="py-3 px-4">Faux Positifs (FPR)</th>
                  <th className="py-3 px-4">Erreur Calibrage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-slate-200">
                {orchestrator.fairnessMetrics.map((g, i) => (
                  <tr key={i} className="hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-sans text-white font-medium">{g.groupName}</td>
                    <td className="py-3 px-4 text-slate-400">{g.sampleSize}</td>
                    <td className="py-3 px-4 text-emerald-400 font-semibold">{g.sensitivity}%</td>
                    <td className="py-3 px-4 text-emerald-400 font-semibold">{g.specificity}%</td>
                    <td className="py-3 px-4 text-teal-400">{g.precision}%</td>
                    <td className="py-3 px-4 text-slate-300">{g.falsePositiveRate}%</td>
                    <td className="py-3 px-4 text-slate-300">{g.calibrationError}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-1">
            <div className="font-semibold text-slate-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Règle FAIRNESS_ALERT :</span>
            </div>
            <p>
              Si un écart de sensibilité supérieur à 5 points de pourcentage est constaté entre la population globale et
              les locuteurs Wolof ou les zones à faible connectivité, une alerte FAIRNESS_ALERT bloque le déploiement en
              production jusqu'à rééquilibrage du jeu de données.
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Workflow Engine */}
      {activeGovTab === 'workflow' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-teal-400" />
              <span>Workflow & Evolution Engine (Version 2.1.0)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Chaîne décisionnelle formelle : EVENT → ANALYSIS → DECISION → WORKFLOW → ACTION → VERIFICATION → AUDIT → EVOLUTION.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-mono text-teal-400 font-semibold">PHASE 1</div>
              <div className="text-sm font-bold text-white">Event & Context Ingestion</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Capture de l'événement clinique ou administratif, vérification de l'intégrité et rattachement au patient.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-mono text-teal-400 font-semibold">PHASE 2</div>
              <div className="text-sm font-bold text-white">Safety Engine & Scoring</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Filtre anti-diagnostic autonome et anti-prescription. Détection des red flags cliniques.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-mono text-amber-400 font-semibold">PHASE 3 (GATE)</div>
              <div className="text-sm font-bold text-white">Human Review Gate</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Si risque élevé ou confiance &lt; 70% : arrêt obligatoire. Seul le clinicien peut APPROUVER ou REJETER.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-mono text-emerald-400 font-semibold">PHASE 4</div>
              <div className="text-sm font-bold text-white">Audit & Evolution Loop</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Inscription indélébile au registre d'audit. Possibilité de retour arrière (Rollback) immédiat.
              </p>
            </div>
          </div>

          {/* Evolution Engine Banner */}
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Evolution Engine : Amélioration Proposée par l'IA sous Contrôle Humain</span>
            </div>
            <div className="text-xs text-slate-300 leading-relaxed">
              SantéNova interdit toute auto-modification autonome du code ou des seuils cliniques.
              L'IA peut soumettre une proposition d'optimisation (ex. ajout d'un synonyme médical en wolof), qui doit
              suivre le cycle strict : <span className="text-white font-mono">IA → PROPOSITION → VALIDATION HUMAINE → VERSION → TEST → DÉPLOIEMENT → MESURE → ROLLBACK SI NÉCESSAIRE</span>.
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Plugins */}
      {activeGovTab === 'plugins' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-teal-400" />
                <span>Architecture Modulaire des Plugins (Plug-in / Plug-out)</span>
              </h3>
              <p className="text-xs text-slate-400">
                Chaque module dispose d'un identifiant, d'une version, de permissions requises et d'un contrôle de santé.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {plugins.map((plug) => (
              <div
                key={plug.id}
                className="p-5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">{plug.name}</span>
                    <span className="text-xs font-mono text-teal-400">v{plug.version}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{plug.description}</p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {plug.permissionsRequired.map((p, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400 font-mono">
                        {p}
                      </span>
                    ))}
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-amber-300 font-mono">
                      Consentement requis : {plug.requiresConsent}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-slate-400 font-mono">Latence {plug.latencyMs}ms · {plug.status}</span>
                  </div>

                  <button
                    onClick={() => handleTogglePlugin(plug.id)}
                    className={`px-3 py-1 rounded-lg font-semibold text-xs transition-colors ${
                      plug.enabled
                        ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 hover:bg-teal-500/30'
                        : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                    }`}
                  >
                    {plug.enabled ? 'Module Actif (Plug-in)' : 'Désactivé (Plug-out)'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Models */}
      {activeGovTab === 'models' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-teal-400" />
              <span>Model Registry & Cycle de Vie des Modèles</span>
            </h3>
            <p className="text-xs text-slate-400">
              Traçabilité formelle : statut (ACTIVE, TEST, DEPRECATED, ROLLBACK), niveau de risque clinique et score d'évaluation.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-sans">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                  <th className="py-3 px-4">Identifiant Modèle</th>
                  <th className="py-3 px-4">Nom & Domaine</th>
                  <th className="py-3 px-4">Statut</th>
                  <th className="py-3 px-4">Niveau de Risque</th>
                  <th className="py-3 px-4">Score d'Évaluation</th>
                  <th className="py-3 px-4">Contexte</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-slate-200">
                {models.map((m) => (
                  <tr key={m.modelId} className="hover:bg-slate-800/30">
                    <td className="py-3 px-4 text-teal-400 font-semibold">{m.modelId}</td>
                    <td className="py-3 px-4 font-sans">
                      <div className="text-white font-medium">{m.name}</div>
                      <div className="text-[11px] text-slate-400">{m.domain}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          m.status === 'ACTIVE'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        }`}
                      >
                        {m.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-[11px] font-semibold ${
                          m.riskLevel === 'HIGH' ? 'text-rose-400' : m.riskLevel === 'MEDIUM' ? 'text-amber-400' : 'text-slate-300'
                        }`}
                      >
                        {m.riskLevel}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-emerald-400 font-bold">{m.evaluationScore} / 100</td>
                    <td className="py-3 px-4 text-slate-400">{m.contextWindow}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 5: Compute & ROCm */}
      {activeGovTab === 'compute' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-teal-400" />
                <span>ComputeProvider : Accélération AMD ROCm™ & Fallback CPU</span>
              </h3>
              <p className="text-xs text-slate-400">
                Portabilité matérielle totale : accélération native sur matériel AMD ROCm et bascule sans coupure vers le CPU.
              </p>
            </div>

            <button
              onClick={handleToggleHardware}
              className="px-4 py-2 rounded-xl bg-teal-500 text-slate-950 font-bold text-xs hover:bg-teal-400 transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Simuler Bascule Matérielle ({hardware.provider === 'AMDROCmProvider' ? 'Vers CPU' : 'Vers AMD ROCm'})</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Fournisseur Actif</div>
              <div className="text-lg font-bold font-mono text-white">{hardware.provider}</div>
              <div className="text-[11px] text-teal-400">
                {hardware.isGpuActive ? 'Accélération Tensor Active' : 'Mode CPU Basse Énergie'}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Mémoire Dédiée VRAM</div>
              <div className="text-lg font-bold font-mono text-white">
                {hardware.memoryAllocatedMb} / {hardware.totalMemoryMb} MB
              </div>
              <div className="text-[11px] text-slate-400">Usage mémoire optimisé</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Latence Moyenne Inférence</div>
              <div className="text-lg font-bold font-mono text-emerald-400">{hardware.averageLatencyMs} ms</div>
              <div className="text-[11px] text-slate-400">Mesure temps réel RAG</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Consommation & Température</div>
              <div className="text-lg font-bold font-mono text-amber-400">
                {hardware.powerConsumptionWatts} W · {hardware.temperatureC} °C
              </div>
              <div className="text-[11px] text-slate-400">Efficience énergétique</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: Audit Log */}
      {activeGovTab === 'audit' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-teal-400" />
                <span>Journal d'Audit Immuable & Horodaté</span>
              </h3>
              <p className="text-xs text-slate-400">
                Traçabilité intégrale de chaque accès patient, requête RAG, décision humaine et modification de consentement.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {orchestrator.auditTrail.map((log) => (
              <div
                key={log.id}
                className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-teal-400 font-bold">{log.id}</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-slate-400">{log.timestamp}</span>
                    <span className="text-slate-500">·</span>
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 font-sans font-semibold">
                      {log.action}
                    </span>
                  </div>
                  <p className="text-slate-200">{log.details}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0 text-slate-400 font-mono">
                  <span>Acteur : <strong className="text-white font-sans">{log.actor}</strong></span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.riskLevel === 'HIGH'
                        ? 'bg-rose-500/20 text-rose-300'
                        : log.riskLevel === 'MEDIUM'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {log.riskLevel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
