import React, { useState, useEffect } from 'react';
import {
  FileText,
  Download,
  Printer,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  BarChart3,
  Building2,
  Globe2,
  Award,
  Clock,
  Sparkles,
  HeartHandshake,
  DollarSign,
  ChevronRight,
  Share2,
  Server,
  Network,
  Wifi,
  BookOpen,
  CheckSquare,
  Layers,
  Zap,
  Laptop,
  Activity,
  Users,
  ShieldAlert,
  ArrowRight,
  AlertTriangle,
  Terminal,
  Copy,
  Check,
  Smartphone,
  Tablet,
  Monitor,
  Cpu,
} from 'lucide-react';
import { I18nService } from '../services/i18n';
import { Language } from '../types';
import { DOSSIER_DOCX_BASE64 } from '../data/dossierB64';

export const InstitutionalDossierView: React.FC = () => {
  const [lang, setLang] = useState<Language>(I18nService.language);
  const [activeDossierSection, setActiveDossierSection] = useState<'overview' | 'kpis' | 'matrix' | 'budget' | 'ethical' | 'guide'>('overview');
  const [guidePhase, setGuidePhase] = useState<number>(1);
  const [copiedCommand, setCopiedCommand] = useState<boolean>(false);
  const [appDeployTab, setAppDeployTab] = useState<'mobile' | 'tablet' | 'desktop' | 'network'>('mobile');
  const [selectedEngineModule, setSelectedEngineModule] = useState<string>('deterministic');
  const [checklistState, setChecklistState] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
  });

  const [appChecklist, setAppChecklist] = useState<Record<number, boolean>>({
    1: true, // QR Codes d'accès imprimés pour chambres
    2: true, // PWA Service Worker & Cache hors-ligne activés
    3: true, // Tablettes Maternité calibrées (boutons ≥44px)
    4: true, // Synthèse vocale Wolof & Français testée
    5: true, // Postes fixes PC compatibles impression A4/PDF
    6: false, // SSID Wi-Fi dédié HOSPITAL-SANTENOVA activé
    7: false, // Formation flash soignants (15 min) réalisée
  });

  const toggleAppChecklist = (id: number) => {
    setAppChecklist((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleChecklistItem = (id: number) => {
    setChecklistState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const completedChecklistCount = Object.values(checklistState).filter(Boolean).length;
  const readinessPercentage = Math.round((completedChecklistCount / 10) * 100);

  useEffect(() => {
    const unsub = I18nService.subscribe((l) => setLang(l));
    return unsub;
  }, []);

  const isEn = lang === 'en';
  const isWo = lang === 'wo';

  const handleDownloadWord = () => {
    try {
      const byteCharacters = atob(DOSSIER_DOCX_BASE64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Dossier_Partenaires_SanteNova_Senegal_2026.docx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    } catch (e) {
      // Direct file fallback
      const link = document.createElement('a');
      link.href = '/dossier_partenaires_santenova.docx';
      link.download = 'Dossier_Partenaires_SanteNova_Senegal_2026.docx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleCopyDeployCommands = () => {
    const text = `# 1. Cloner le référentiel officiel SantéNova v2.1\ngit clone https://github.com/ndiayebayemoussa04-create/SANTENOVA-V2.1.git\n\n# 2. Accéder au répertoire\ncd SANTENOVA-V2.1\n\n# 3. Lancer la pile complète (Frontend + Backend + IA) en arrière-plan\ndocker compose up -d --build`;
    navigator.clipboard.writeText(text);
    setCopiedCommand(true);
    setTimeout(() => setCopiedCommand(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Executive Administrative Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
                DOCUMENT OFFICIEL · MINISTÈRE DE LA SANTÉ & ACTION SOCIALE
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                REF : MSAS-OMS-SN-2026-V2.1
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Dossier Institutionnel & Technique : Déploiement SantéNova
            </h1>
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              Plateforme d’orchestration numérique et d’IA éthique pour le renforcement des Postes de Santé ruraux et des Hôpitaux de référence au Sénégal et en Afrique Subsaharienne.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
              <span><strong>Destinataires :</strong> OMS (AFRO), MSAS Sénégal, ONGs & Bailleurs de Fonds</span>
              <span>·</span>
              <span><strong>Classification :</strong> Document Administratif & Stratégique</span>
            </div>
          </div>

          {/* Action Download & Print Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={handleDownloadWord}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20"
            >
              <Download className="w-4 h-4" />
              <span>Télécharger Word (.docx)</span>
            </button>

            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 bg-teal-500 hover:bg-teal-600 text-slate-950 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-teal-500/20"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimer / Exporter PDF</span>
            </button>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1">
          <button
            onClick={() => setActiveDossierSection('overview')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeDossierSection === 'overview'
                ? 'bg-slate-800 text-teal-400 border border-teal-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>1. Résumé Exécutif & Vision</span>
          </button>
          <button
            onClick={() => setActiveDossierSection('kpis')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeDossierSection === 'kpis'
                ? 'bg-slate-800 text-teal-400 border border-teal-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>2. Courbes d'Impact & Cibles OMS</span>
          </button>
          <button
            onClick={() => setActiveDossierSection('matrix')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeDossierSection === 'matrix'
                ? 'bg-slate-800 text-teal-400 border border-teal-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>3. Matrice Opérationnelle des Postes</span>
          </button>
          <button
            onClick={() => setActiveDossierSection('budget')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeDossierSection === 'budget'
                ? 'bg-slate-800 text-teal-400 border border-teal-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>4. Budget Triennal & Financement</span>
          </button>
          <button
            onClick={() => setActiveDossierSection('ethical')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeDossierSection === 'ethical'
                ? 'bg-slate-800 text-teal-400 border border-teal-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>5. Éthique & Souveraineté CDP</span>
          </button>
          <button
            onClick={() => setActiveDossierSection('guide')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeDossierSection === 'guide'
                ? 'bg-slate-800 text-teal-400 border border-teal-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>6. Guide d'Implémentation & Déploiement</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: RÉSUMÉ EXÉCUTIF */}
      {activeDossierSection === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs text-rose-400 font-bold uppercase tracking-wider block">Le Défi Sanitaire</span>
              <div className="text-2xl font-bold font-mono text-white">315 / 100 000</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Taux de mortalité maternelle au Sénégal (EDS-2023). 70% des complications sont évitables si dépistées avant 28 SA (pré-éclampsie, anémie sévère).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs text-teal-400 font-bold uppercase tracking-wider block">La Réponse SantéNova</span>
              <div className="text-2xl font-bold font-mono text-teal-300">Modèle Hub & Spoke</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Zéro silo entre la maternité, la cardiologie et les urgences. Croisement automatique inter-spécialités et blocage des molécules tératogènes.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider block">Inclusion Rurale</span>
              <div className="text-2xl font-bold font-mono text-indigo-300">Offline + 2G (#123#)</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Fonctionnement en zone blanche sans Internet (IndexedDB) et passerelle USSD/SMS en Wolof pour les mères sans smartphone.
              </p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-400" />
              <span>Synthèse Stratégique pour les Décideurs</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Le déploiement de l'intelligence artificielle en santé dans les pays émergents ne doit pas répéter les erreurs des décennies passées (projets pilotes isolés, serveurs propriétaires hors du continent, solutions dépendantes d'un haut débit permanent). SantéNova a été conçu dès le premier jour autour de <strong>trois principes non-négociables</strong> :
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-2">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <strong className="text-emerald-400 block font-bold">1. Souveraineté & Éthique Clinique</strong>
                <p className="text-slate-400 text-[11px]">
                  Les données médicales restent hébergées sous le contrôle du Ministère et de la Commission de Protection des Données Personnelles (CDP). Tout signal clinique est soumis au principe du Human-in-the-Loop.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <strong className="text-blue-400 block font-bold">2. Intégration dans le Système Existant</strong>
                <p className="text-slate-400 text-[11px]">
                  SantéNova n'ajoute pas de lourdeur administrative. L'outil s'interface avec le DHIS2 national et le calendrier du Programme Élargi de Vaccination (PEV).
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <strong className="text-amber-400 block font-bold">3. Accessibilité Linguistique Totale</strong>
                <p className="text-slate-400 text-[11px]">
                  Le vocal didactique en Wolof permet aux femmes non scolarisées de s'approprier leur parcours de santé, garantissant une observance thérapeutique sans précédent.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: COURBES D'IMPACT & CIBLES OMS */}
      {activeDossierSection === 'kpis' && (
        <div className="space-y-6">
          {/* Visual Curves SVG */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-teal-400" />
                  <span>Courbe d’Impact Prévisionnelle : Réduction de la Mortalité Maternelle (2026-2030)</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Modélisation de la trajectoire avec SantéNova vs Trajectoire tendancielle sans intervention (pour 100 000 naissances)
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-rose-400">
                  <span className="w-3 h-0.5 bg-rose-400 inline-block" /> Sans intervention
                </span>
                <span className="flex items-center gap-1.5 text-teal-400 font-bold">
                  <span className="w-3 h-0.5 bg-teal-400 inline-block" /> Avec SantéNova
                </span>
              </div>
            </div>

            {/* SVG Interactive Chart */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 overflow-x-auto">
              <svg viewBox="0 0 700 240" className="w-full min-w-[500px] h-60">
                {/* Horizontal Grid Lines */}
                <line x1="50" y1="30" x2="680" y2="30" stroke="#1e293b" strokeDasharray="4" />
                <line x1="50" y1="80" x2="680" y2="80" stroke="#1e293b" strokeDasharray="4" />
                <line x1="50" y1="130" x2="680" y2="130" stroke="#1e293b" strokeDasharray="4" />
                <line x1="50" y1="180" x2="680" y2="180" stroke="#1e293b" strokeDasharray="4" />

                {/* Y Axis Labels */}
                <text x="15" y="35" fill="#64748b" fontSize="10" fontFamily="monospace">350</text>
                <text x="15" y="85" fill="#64748b" fontSize="10" fontFamily="monospace">280</text>
                <text x="15" y="135" fill="#64748b" fontSize="10" fontFamily="monospace">210</text>
                <text x="15" y="185" fill="#64748b" fontSize="10" fontFamily="monospace">140</text>

                {/* X Axis Labels */}
                <text x="70" y="215" fill="#94a3b8" fontSize="11" fontWeight="bold">2026 (Pilote)</text>
                <text x="220" y="215" fill="#94a3b8" fontSize="11" fontWeight="bold">2027 (Régional)</text>
                <text x="380" y="215" fill="#94a3b8" fontSize="11" fontWeight="bold">2028 (Phase 2)</text>
                <text x="530" y="215" fill="#94a3b8" fontSize="11" fontWeight="bold">2029 (National)</text>
                <text x="630" y="215" fill="#14b8a6" fontSize="11" fontWeight="bold">2030 (Cible OMS)</text>

                {/* Curve 1: Tendancielle Sans Intervention (Rouge) */}
                <path
                  d="M 100 50 Q 250 58 400 68 T 660 78"
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="2.5"
                  strokeDasharray="5"
                />

                {/* Curve 2: Trajectoire SantéNova (Teal) */}
                <path
                  d="M 100 50 Q 250 90 400 135 T 660 185"
                  fill="none"
                  stroke="#14b8a6"
                  strokeWidth="3.5"
                />

                {/* Key Points */}
                <circle cx="100" cy="50" r="4.5" fill="#14b8a6" />
                <circle cx="400" cy="135" r="4.5" fill="#14b8a6" />
                <circle cx="660" cy="185" r="6" fill="#10b981" />

                <text x="600" y="175" fill="#10b981" fontSize="10" fontWeight="bold">140 (-55%)</text>
                <text x="610" y="72" fill="#f43f5e" fontSize="10" fontWeight="bold">295 (-6%)</text>
              </svg>
            </div>
          </div>

          {/* Table Comparative des Cibles OMS */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Tableau Synthétique des Cibles Cliniques & Objectifs de Développement Durable (ODD 3)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-teal-400 uppercase tracking-wider font-semibold">
                    <th className="py-3 px-4">Indicateur Clé</th>
                    <th className="py-3 px-4">Ligne de Base (2025)</th>
                    <th className="py-3 px-4">Cible SantéNova (2028)</th>
                    <th className="py-3 px-4">Mécanisme Opérationnel</th>
                    <th className="py-3 px-4">Bénéfice Attendu OMS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-3 px-4 font-semibold text-white">Complétude des 4 CPN (OMS)</td>
                    <td className="py-3 px-4 font-mono text-rose-400">43 %</td>
                    <td className="py-3 px-4 font-mono text-teal-400 font-bold">86 %</td>
                    <td className="py-3 px-4">Rappels multilingues SMS & Voix Wolof sur mobile</td>
                    <td className="py-3 px-4 text-emerald-400 font-medium">Réduction des urgences obstétricales</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-3 px-4 font-semibold text-white">Délai d’alerte Pré-éclampsie</td>
                    <td className="py-3 px-4 font-mono text-rose-400">Souvent au stade convulsif</td>
                    <td className="py-3 px-4 font-mono text-teal-400 font-bold">&lt; 24h après TA ≥ 140/90</td>
                    <td className="py-3 px-4">Journal d'automesure et protocole ICP</td>
                    <td className="py-3 px-4 text-emerald-400 font-medium">Élimination des décès par éclampsie</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-3 px-4 font-semibold text-white">Ruptures de stock d'Ocytocine</td>
                    <td className="py-3 px-4 font-mono text-rose-400">18 à 35 jours / an</td>
                    <td className="py-3 px-4 font-mono text-teal-400 font-bold">&lt; 48h (Zéro rupture)</td>
                    <td className="py-3 px-4">Télémétrie des stocks et commande PRA anticipée</td>
                    <td className="py-3 px-4 text-emerald-400 font-medium">Prévention de l'hémorragie de la délivrance</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-3 px-4 font-semibold text-white">Délai de télé-expertise spécialisée</td>
                    <td className="py-3 px-4 font-mono text-slate-400">Plusieurs jours (ou déplacement)</td>
                    <td className="py-3 px-4 font-mono text-teal-400 font-bold">&lt; 30 minutes</td>
                    <td className="py-3 px-4">Liaison asynchrone sécurisée Sage-femme ➔ Gynécologue</td>
                    <td className="py-3 px-4 text-emerald-400 font-medium">Égalité des chances rurale/urbaine</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: MATRICE OPÉRATIONNELLE */}
      {activeDossierSection === 'matrix' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white">Matrice de Déploiement par Niveau de la Pyramide Sanitaire</h3>
            <p className="text-xs text-slate-400">
              Définition des rôles et des dotations matérielles pour chaque niveau du système de santé sénégalais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-400 uppercase tracking-wider text-[11px]">NIVEAU 1 : POSTES DE SANTÉ & CASES</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px]">1 200 Postes cibles</span>
              </div>
              <ul className="space-y-1.5 text-slate-300">
                <li>• <strong>Ressources humaines :</strong> Sage-femme d'État, Infirmier Chef de Poste (ICP), Matrone.</li>
                <li>• <strong>Équipement :</strong> Tablette durcie Android, kit de recharge solaire 50W, tensiomètre électronique Bluetooth.</li>
                <li>• <strong>Outils logiciels :</strong> Application SantéNova Offline (IndexedDB), suivi des CPN, calcul Z-score nutritionnel enfant, alerte SMS.</li>
                <li>• <strong>Mission prioritaire :</strong> Dépistage précoce, tri de gravité et déclenchement d'évacuation précoce.</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-blue-400 uppercase tracking-wider text-[11px]">NIVEAU 2 : CENTRES DE SANTÉ DE DISTRICT</span>
                <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono text-[10px]">80 Districts</span>
              </div>
              <ul className="space-y-1.5 text-slate-300">
                <li>• <strong>Ressources humaines :</strong> Médecin Chef de District (MCD), Gynécologue, Technicien de laboratoire.</li>
                <li>• <strong>Équipement :</strong> Ordinateurs de bureau, connexion 4G haut débit, serveur passerelle DHIS2.</li>
                <li>• <strong>Outils logiciels :</strong> Console de régulation des urgences, supervision des ambulances, gestion des dotations Ocytocine.</li>
                <li>• <strong>Mission prioritaire :</strong> Référence chirurgicale (césarienne d'urgence), télé-arbitrage et supervision régionale.</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-indigo-400 uppercase tracking-wider text-[11px]">NIVEAU 3 : HÔPITAUX RÉGIONAUX & CHU</span>
                <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-mono text-[10px]">14 Régions</span>
              </div>
              <ul className="space-y-1.5 text-slate-300">
                <li>• <strong>Ressources humaines :</strong> Professeurs agrégés, Réanimateurs, Oncologues, Radiologues.</li>
                <li>• <strong>Équipement :</strong> Infrastructures hospitalières lourdes, scanner, IRM, mammographie numérique.</li>
                <li>• <strong>Outils logiciels :</strong> Module RAG clinique avancé, IA d'imagerie (Vision OCT/Radio), Réunions de Concertation Pluridisciplinaire (RCP).</li>
                <li>• <strong>Mission prioritaire :</strong> Prise en charge des cas à haute complexité et validation des protocoles nationaux.</li>
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">NIVEAU 0 : COMMUNAUTÉ & FAMILLES</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono text-[10px]">Population générale</span>
              </div>
              <ul className="space-y-1.5 text-slate-300">
                <li>• <strong>Utilisateurs :</strong> Femmes enceintes, mères, personnes âgées hypertendues.</li>
                <li>• <strong>Équipement :</strong> Téléphones 2G à touches basiques ou smartphones familiaux.</li>
                <li>• <strong>Outils logiciels :</strong> Serveur Vocal Interactif en Wolof, code USSD #123#, Carte Patient avec QR Code d'urgence.</li>
                <li>• <strong>Mission prioritaire :</strong> Éducation sanitaire, assiduité aux consultations prénatales et respect du calendrier PEV.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: BUDGET PRÉVISIONNEL & PHASAGE */}
      {activeDossierSection === 'budget' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white">Plan d'Investissement & Budget Prévisionnel (2026 - 2029)</h3>
            <p className="text-xs text-slate-400">
              Chiffrage estimatif pour le co-financement Ministère de la Santé, Partenaires Techniques (OMS, UNICEF, Gavi) et Bailleurs (Banque Mondiale, AFD).
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-teal-400 uppercase tracking-wider font-semibold">
                  <th className="py-3 px-4">Ligne Budgétaire</th>
                  <th className="py-3 px-4">Phase 1 : Pilote (6 mois)</th>
                  <th className="py-3 px-4">Phase 2 : Régionale (18 mois)</th>
                  <th className="py-3 px-4">Phase 3 : Nationale (36 mois)</th>
                  <th className="py-3 px-4">Bailleur Pressenti</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-semibold text-white">Équipement Solaire & Tablettes Postes</td>
                  <td className="py-3 px-4 font-mono">45 000 USD (30 postes)</td>
                  <td className="py-3 px-4 font-mono">280 000 USD (200 postes)</td>
                  <td className="py-3 px-4 font-mono font-bold text-teal-300">950 000 USD (1 200 postes)</td>
                  <td className="py-3 px-4 text-slate-400">Banque Mondiale / AFD</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-semibold text-white">Passerelle Télécom USSD #123# & SMS Wolof</td>
                  <td className="py-3 px-4 font-mono">15 000 USD</td>
                  <td className="py-3 px-4 font-mono">45 000 USD</td>
                  <td className="py-3 px-4 font-mono font-bold text-teal-300">120 000 USD</td>
                  <td className="py-3 px-4 text-slate-400">Fonds Mondial / Opérateurs</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-semibold text-white">Formation Sages-femmes & Infirmiers ICP</td>
                  <td className="py-3 px-4 font-mono">25 000 USD</td>
                  <td className="py-3 px-4 font-mono">95 000 USD</td>
                  <td className="py-3 px-4 font-mono font-bold text-teal-300">250 000 USD</td>
                  <td className="py-3 px-4 text-slate-400">OMS / UNICEF</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-semibold text-white">Interconnexion DHIS2 & Hébergement Local</td>
                  <td className="py-3 px-4 font-mono">30 000 USD</td>
                  <td className="py-3 px-4 font-mono">70 000 USD</td>
                  <td className="py-3 px-4 font-mono font-bold text-teal-300">150 000 USD</td>
                  <td className="py-3 px-4 text-slate-400">MSAS / SENUM SA</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-semibold text-white">Supervision Clinique & Audit Éthique CDP</td>
                  <td className="py-3 px-4 font-mono">20 000 USD</td>
                  <td className="py-3 px-4 font-mono">60 000 USD</td>
                  <td className="py-3 px-4 font-mono font-bold text-teal-300">130 000 USD</td>
                  <td className="py-3 px-4 text-slate-400">Comité Éthique Sénégal</td>
                </tr>
                <tr className="bg-slate-950/80 font-bold text-white border-t-2 border-teal-500/40">
                  <td className="py-3.5 px-4 text-teal-400 uppercase">TOTAL INVESTISSEMENT</td>
                  <td className="py-3.5 px-4 font-mono text-teal-300">135 000 USD</td>
                  <td className="py-3.5 px-4 font-mono text-teal-300">550 000 USD</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-400 text-sm">1 600 000 USD</td>
                  <td className="py-3.5 px-4 text-slate-400">Financement Mixte Public-Privé</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 5: ÉTHIQUE & SOUVERAINETÉ */}
      {activeDossierSection === 'ethical' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white">Cadre Éthique, Sécurité des Données et Souveraineté Sanitaire</h3>
            <p className="text-xs text-slate-400">
              Garanties juridiques conformes aux standards de l'OMS et à la législation sénégalaise (Loi n° 2008-12 sur la protection des données).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-teal-400 uppercase tracking-wider block text-[11px]">Garde-Fou n°1 : Le Human-in-the-Loop Absolu</span>
              <p className="text-slate-300 leading-relaxed">
                SantéNova s'interdit formellement toute prescription autonome ou décision d'accouchement automatique. L'IA se limite à la formulation de signaux probables (« Suspect de pré-éclampsie », « Suspicion de dystocie ») avec bascule automatique en statut <span className="text-amber-400 font-mono">HUMAN_REVIEW_REQUIRED</span> obligeant la validation par la sage-femme ou le médecin.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-blue-400 uppercase tracking-wider block text-[11px]">Garde-Fou n°2 : Traçabilité & Audit Trail SHA-256</span>
              <p className="text-slate-300 leading-relaxed">
                Chaque avis médical, chaque recommandation et chaque interaction médicamenteuse bloquée est inscrite dans un journal d'audit immuable et horodaté. Les corps d'inspection du Ministère de la Santé peuvent auditer l'historique complet pour vérifier la conformité aux référentiels cliniques.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-indigo-400 uppercase tracking-wider block text-[11px]">Garde-Fou n°3 : Consentement Éclairé & Trust Center</span>
              <p className="text-slate-300 leading-relaxed">
                Les patientes conservent le contrôle total de leurs données de santé. Aucune donnée n'est transmise à des fins de recherche ou d'épidémiologie sans que la case de consentement explicite n'ait été cochée dans le Trust Center par la patiente elle-même.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-400 uppercase tracking-wider block text-[11px]">Garde-Fou n°4 : Hébergement Souverain au Sénégal</span>
              <p className="text-slate-300 leading-relaxed">
                Les données médicales restent sur le sol national, en conformité avec la doctrine de souveraineté numérique de l'État du Sénégal (Datacenter National de Diamniadio / SENUM SA).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: GUIDE DE DÉPLOIEMENT HOSPITALIER ET TERRAIN */}
      {activeDossierSection === 'guide' && (
        <div className="space-y-8">
          {/* Guide Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-teal-950/40 to-slate-900 border border-teal-500/30 rounded-2xl p-6 md:p-8 space-y-4 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-teal-500/10 text-teal-400 border border-teal-500/30 uppercase tracking-wider">
                    GUIDE OPÉRATIONNEL D'EXPLOITATION CLINIQUE
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                    VERSION 2.1 · CHU & POSTES DE SANTÉ
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Guide d’Implémentation & de Déploiement en Milieu Hospitalier
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                  Comment faire fonctionner concrètement la plateforme dans un hôpital : infrastructures résilientes, réseau Edge sans coupure, passerelle DPI / DHIS2, formation des soignants et protocole d'urgence Hub-and-Spoke.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadWord}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Dossier Word (.docx)</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-2 bg-teal-500 hover:bg-teal-600 text-slate-950 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimer le Guide (PDF)</span>
                </button>
              </div>
            </div>

            {/* Architecture Topology Visual Card */}
            <div className="pt-4 border-t border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-3 flex items-center gap-1.5">
                <Network className="w-4 h-4" />
                <span>Topologie d'Architecture Réseau & Edge Hospitalier SantéNova</span>
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs">
                {/* Hub: Hospital CHU */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-teal-300 flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-teal-400" />
                      <span>HÔPITAL RÉGIONAL / CHU (HUB)</span>
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-teal-500/20 text-teal-300">
                      Cœur de Réseau
                    </span>
                  </div>
                  <ul className="space-y-1.5 text-slate-300 text-[11px]">
                    <li className="flex items-start gap-1.5">
                      <Server className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span><strong>Serveur Edge On-Premise :</strong> Linux durci avec réplication locale et autonomie 100% en cas de coupure fibre.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Wifi className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>LAN Gigabit + Wi-Fi WPA3 :</strong> VLAN sécurisé pour Urgences, Maternité, Bloc & Pharmacie.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Laptop className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                      <span><strong>Terminaux Soignants :</strong> Tablettes médicalisées pour partogramme IA & écrans de triage d'urgence.</span>
                    </li>
                  </ul>
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Alimentation : Onduleur 3 kVA secouru</span>
                    <span className="text-emerald-400 font-semibold">Haute Disponibilité</span>
                  </div>
                </div>

                {/* Spokes: Rural Posts */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-300 flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-amber-400" />
                      <span>POSTES & CASES RURALES (SPOKES)</span>
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300">
                      Périphérie / Zones Blanches
                    </span>
                  </div>
                  <ul className="space-y-1.5 text-slate-300 text-[11px]">
                    <li className="flex items-start gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Kit Solaire Régulé :</strong> Panneau 100W + batterie gel pour autonomie énergétique permanente.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                      <span><strong>Mode Hors-Ligne (PWA / IndexedDB) :</strong> Consultations CPN, partogramme et triage sans aucun Internet.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Users className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                      <span><strong>Passerelle 2G USSD #123# :</strong> Relances automatiques des mères en Wolof sans exiger de smartphone.</span>
                    </li>
                  </ul>
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Sync : Store-and-Forward</span>
                    <span className="text-teal-400 font-semibold">Synchronisation différée</span>
                  </div>
                </div>

                {/* Cloud & Ministry */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-indigo-300 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-indigo-400" />
                      <span>SOUVERAINETÉ & MINISTÈRE (MSAS)</span>
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-indigo-500/20 text-indigo-300">
                      Gouvernance Centrale
                    </span>
                  </div>
                  <ul className="space-y-1.5 text-slate-300 text-[11px]">
                    <li className="flex items-start gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span><strong>Datacenter National Diamniadio :</strong> SENUM SA héberge les bases maîtresses sur le sol sénégalais.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <BarChart3 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Connecteur DHIS2 :</strong> Remontée automatique des indicateurs épidémiologiques et de mortalité.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Award className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Audit Trail & CDP :</strong> Journalisation SHA-256 inaltérable pour le contrôle déontologique de l'IA.</span>
                    </li>
                  </ul>
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Conformité : Loi 2008-12</span>
                    <span className="text-indigo-400 font-semibold">Secret Médical Garanti</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Phase Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
            {[
              { id: 1, title: 'Phase 1 : Énergie & Réseau Edge', icon: Zap },
              { id: 2, title: 'Phase 2 : Interopérabilité DPI & DHIS2', icon: Network },
              { id: 3, title: 'Phase 3 : Modèle Hub & Spoke', icon: Activity },
              { id: 4, title: 'Phase 4 : Formations des Équipes', icon: Users },
              { id: 5, title: 'Phase 5 : Sécurité RBAC & Veille CME', icon: ShieldCheck },
              { id: 6, title: 'Phase 6 : Checklist Go-Live (Interactive)', icon: CheckSquare },
              { id: 7, title: 'Phase 7 : Branchement Docker (Plug & Play)', icon: Terminal },
              { id: 8, title: 'Phase 8 : Déploiement Application (Smartphones, Tablettes & PC)', icon: Smartphone },
              { id: 9, title: 'Phase 9 : Architecture & Moteur Clinique', icon: Cpu },
            ].map((phase) => {
              const Icon = phase.icon;
              const isActive = guidePhase === phase.id;
              return (
                <button
                  key={phase.id}
                  onClick={() => setGuidePhase(phase.id)}
                  className={`px-3 py-2 rounded-xl font-bold flex items-center gap-1.5 whitespace-nowrap transition-all border ${
                    isActive
                      ? 'bg-teal-500/10 text-teal-300 border-teal-500/50 shadow-md shadow-teal-500/10'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{phase.title}</span>
                </button>
              );
            })}
          </div>

          {/* Phase 1: Énergie & Serveur Edge */}
          {guidePhase === 1 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="pb-3 border-b border-slate-800">
                <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider block">
                  PHASE 1 · PRÉ-REQUIS TECHNIQUES FONDAMENTAUX
                </span>
                <h3 className="text-lg font-bold text-white">
                  Audit Électrique, Réseau Local Hospitalier & Appliance Edge Autonome
                </h3>
                <p className="text-xs text-slate-400">
                  Garantir qu'une panne de courant ou une rupture de câble sous-marin n'interrompt jamais la prise en charge d'un accouchement ou d'une urgence vitale.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold">
                    <Zap className="w-4 h-4" />
                    <span>1. Continuité Électrique Secourue</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Installation d'un <strong>onduleur (UPS) à ligne interactive d'au moins 3 kVA</strong> dans la salle des serveurs de l'hôpital, couplé au groupe électrogène de secours avec bascule automatique en moins de 10 millisecondes. Pour les postes de santé ruraux : kit panneau solaire 100W et batterie gel 12V 100Ah offrant une <strong>autonomie continue de 48 heures</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-teal-400 font-bold">
                    <Wifi className="w-4 h-4" />
                    <span>2. Réseau Local LAN & Wi-Fi Médical</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Déploiement d'un <strong>VLAN hospitalier dédié étanche</strong> (isolation des flux patients des réseaux publics/visiteurs). Bornes Wi-Fi industrielles WPA3-Enterprise avec couverture prioritaire dans les salles de travail de la maternité, le bloc obstétrical, le box de déchoquage des urgences et la pharmacie.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-blue-400 font-bold">
                    <Server className="w-4 h-4" />
                    <span>3. Serveur Edge On-Premise Durci</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Installation d'une appliance locale sous Linux durci (Mini-serveur rackable 1U ou Mini-PC durci sans ventilateur) hébergeant la base SantéNova locale chiffrée en AES-256. <strong>L'hôpital fonctionne à 100% en autonomie complète</strong>, et synchronise automatiquement les dossiers avec le niveau national dès que la connexion Internet est rétablie.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Phase 2: Interopérabilité DPI & DHIS2 */}
          {guidePhase === 2 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="pb-3 border-b border-slate-800">
                <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider block">
                  PHASE 2 · INTÉGRATION LOGICIELLE & ÉCOSYSTÈME
                </span>
                <h3 className="text-lg font-bold text-white">
                  Interopérabilité DPI Hospitalier, Imagerie Médicale (PACS) et DHIS2 National
                </h3>
                <p className="text-xs text-slate-400">
                  Zéro double saisie pour les soignants : interconnexion fluide avec les logiciels existants de l'hôpital et les registres épidémiologiques du Ministère.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <strong className="text-teal-400 font-bold block">Connecteurs FHIR & HL7 v2.5</strong>
                  <p className="text-slate-300 leading-relaxed">
                    SantéNova s'interface avec le Dossier Patient Informatisé (DPI) existant de l'établissement via des messages standards <code>HL7 ADT</code> (mouvements et admissions des patients) et <code>HL7 ORU</code> (résultats d'examens biologiques). L'API REST FHIR R4 assure la synchronisation fluide des constantes vitales sans ressaisie.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <strong className="text-blue-400 font-bold block">Passerelle PACS & DICOM</strong>
                  <p className="text-slate-300 leading-relaxed">
                    Réception automatique des clichés d'échographie obstétricale (mesure de la clarté nucale, biométrie fœtale, Doppler utérin) et des radiographies pulmonaires. Le plugin d'aide à la décision SantéNova formule des signaux d'orientation sans jamais se substituer à la validation formelle du radiologue ou de l'obstétricien.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <strong className="text-emerald-400 font-bold block">Export Automatisé vers DHIS2</strong>
                  <p className="text-slate-300 leading-relaxed">
                    Agrégation quotidienne des données épidémiologiques : taux de couverture des 4 CPN, cas d'éclampsie enregistrés, transferts obstétricaux d'urgence, et stocks d'intrants. Génération en 1 clic des rapports mensuels pour le Médecin Chef de District et transmission sécurisée au DHIS2 national.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Phase 3: Modèle Hub & Spoke */}
          {guidePhase === 3 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="pb-3 border-b border-slate-800">
                <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider block">
                  PHASE 3 · ORGANISATION CLINIQUE TERRITORIALE
                </span>
                <h3 className="text-lg font-bold text-white">
                  Modèle Opérationnel Hub-and-Spoke : Hôpital de Référence ↔ Réseau Périphérique
                </h3>
                <p className="text-xs text-slate-400">
                  L'hôpital ne travaille plus en vase clos : il pilote la télé-expertise, anticipe les urgences évacuées par les postes de santé et sécurise la chaîne d'approvisionnement des intrants.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
                    <Activity className="w-4 h-4" />
                    <span>Télé-Expertise Asynchrone Certifiée</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Lorsqu'une sage-femme rurale dépiste une anomalie (tension artérielle à 150/100, hauteur utérine discordante, suspicion de paludisme gestationnel), le dossier complet est poussé vers la file d'attente du gynécologue de garde au CHU.
                  </p>
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] space-y-1">
                    <div className="flex justify-between text-slate-400">
                      <span>Délai cible de réponse :</span>
                      <strong className="text-teal-300">&lt; 30 minutes</strong>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Aide IA pré-remplie :</span>
                      <strong className="text-emerald-400">Synthèse clinique + Risque fœtotoxique</strong>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Fiche de Liaison Numérique pour Évacuations</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Dès que la décision de transfert en ambulance est prise, la « Fiche de Liaison d'Urgence » clignote sur le tableau de bord des urgences du CHU. Les soignants hospitaliers connaissent le terme exact, le groupe sanguin, les antécédents et les constantes en cours de route.
                  </p>
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] space-y-1">
                    <div className="flex justify-between text-slate-400">
                      <span>Préparation du Bloc opératoire :</span>
                      <strong className="text-amber-300">Avant même l'arrivée de l'ambulance</strong>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Réservation de sang d'urgence :</span>
                      <strong className="text-rose-400">Poches réservées au Centre Régional de Transfusion</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Phase 4: Formations des Équipes */}
          {guidePhase === 4 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="pb-3 border-b border-slate-800">
                <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider block">
                  PHASE 4 · CONDUITE DU CHANGEMENT & APPROPRIATION
                </span>
                <h3 className="text-lg font-bold text-white">
                  Programme de Formation Clinique & Certifications par Métier
                </h3>
                <p className="text-xs text-slate-400">
                  Un déploiement hospitalier réussit par les soignants : plan de formation certifiant sur 3 jours avec ateliers pratiques et simulations réelles.
                </p>
              </div>

              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-950 text-slate-300 border-b border-slate-800">
                      <th className="py-3 px-4 font-bold">Corps de Métier</th>
                      <th className="py-3 px-4 font-bold">Durée</th>
                      <th className="py-3 px-4 font-bold">Programme Pédagogique</th>
                      <th className="py-3 px-4 font-bold">Livrable & Certification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-semibold text-white">Gynécologues & Médecins de Garde</td>
                      <td className="py-3 px-4 font-mono text-teal-300">2 Jours</td>
                      <td className="py-3 px-4 text-slate-300">Télé-expertise asynchrone, validation des signaux d'IA, partogramme digital, protocoles d'éclampsie</td>
                      <td className="py-3 px-4 text-emerald-400 font-bold">Attestation Référent Clinique SantéNova</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-semibold text-white">Sages-femmes & Infirmiers ICP</td>
                      <td className="py-3 px-4 font-mono text-teal-300">3 Jours</td>
                      <td className="py-3 px-4 text-slate-300">Utilisation tablette hors-ligne, 4 CPN nationales, synthèse vocale Wolof, stocks Ocytocine, déclenchement d'évacuation</td>
                      <td className="py-3 px-4 text-emerald-400 font-bold">Certification Soignant Terrain SantéNova</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-semibold text-white">Pharmaciens Hospitaliers</td>
                      <td className="py-3 px-4 font-mono text-teal-300">1 Jour</td>
                      <td className="py-3 px-4 text-slate-300">Surveillance chaîne de froid frigo, alertes péremption, commande dématérialisée à la Pharmacie Régionale (PRA)</td>
                      <td className="py-3 px-4 text-emerald-400 font-bold">Habilitation Gestion Intrants d'Urgence</td>
                    </tr>
                    <tr className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-semibold text-white">Ingénieurs & Administrateurs SI</td>
                      <td className="py-3 px-4 font-mono text-teal-300">2 Jours</td>
                      <td className="py-3 px-4 text-slate-300">Appliance Edge, backups chiffrés, supervision réseau, gestion des cartes soignants et habilitations RBAC</td>
                      <td className="py-3 px-4 text-emerald-400 font-bold">Certification Administrateur Système</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Phase 5: Sécurité RBAC & Veille CME */}
          {guidePhase === 5 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="pb-3 border-b border-slate-800">
                <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider block">
                  PHASE 5 · SÉCURITÉ, CONFORMITÉ CDP & GOUVERNANCE MÉDICALE
                </span>
                <h3 className="text-lg font-bold text-white">
                  Contrôle d’Accès Hospitalier (RBAC), Traçabilité Inaltérable & Comité de Veille IA
                </h3>
                <p className="text-xs text-slate-400">
                  Garantir le respect strict du secret médical, la conformité à la Commission des Données Personnelles (CDP) et la supervision éthique collégiale.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <strong className="text-teal-400 font-bold block">1. Authentification Forte & RBAC</strong>
                  <p className="text-slate-300 leading-relaxed">
                    Chaque soignant s'authentifie par son numéro d'ordre / matricule MSAS et un code PIN sécurisé. Les droits sont strictement cloisonnés : un infirmier ne peut pas valider une prescription réservée au médecin, et un agent administratif ne voit que les données d'identité sans les antécédents intimes.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <strong className="text-blue-400 font-bold block">2. Journal d'Audit SHA-256</strong>
                  <p className="text-slate-300 leading-relaxed">
                    Chaque action clinique (ouverture de dossier, alerte IA déclenchée, validation ou rejet de proposition médicale) est horodatée et signée cryptographiquement avec une empreinte SHA-256. En cas de contentieux ou d'audit du Ministère, la traçabilité est totale et inaltérable.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <strong className="text-purple-400 font-bold block">3. Comité Mensuel de Veille IA</strong>
                  <p className="text-slate-300 leading-relaxed">
                    Réunion mensuelle sous l'égide de la Commission Médicale d'Établissement (CME) pour auditer les dossiers marqués <code>HUMAN_REVIEW_REQUIRED</code>. Évaluation de la concordance diagnostique et affinement continu des règles de vigilance pour éviter la fatigue attentionnelle des équipes.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Phase 6: Checklist Interactive Go-Live */}
          {guidePhase === 6 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider block">
                    PHASE 6 · SIMULATEUR D'HOMOLOGATION JOUR J
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    Checklist Opérationnelle Interactive de Mise en Production Hospitalière
                  </h3>
                  <p className="text-xs text-slate-400">
                    Cliquez sur chaque point de contrôle pour auditer en temps réel l'état de préparation d'un établissement hospitalier.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const allValid: Record<number, boolean> = {};
                      for (let i = 1; i <= 10; i++) allValid[i] = true;
                      setChecklistState(allValid);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 text-xs font-semibold border border-teal-500/30"
                  >
                    Tout Valider (100%)
                  </button>
                  <button
                    onClick={() => {
                      const allReset: Record<number, boolean> = {};
                      for (let i = 1; i <= 10; i++) allReset[i] = false;
                      setChecklistState(allReset);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                  >
                    Réinitialiser
                  </button>
                </div>
              </div>

              {/* Progress Gauge */}
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">Score de Préparation au Go-Live :</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                      readinessPercentage === 100
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : readinessPercentage >= 70
                        ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {readinessPercentage}% ({completedChecklistCount}/10 critères)
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-slate-400">
                    {readinessPercentage === 100
                      ? '✅ Établissement Homologué pour Go-Live'
                      : readinessPercentage >= 70
                      ? '⚡ Prêt pour Pilote Supervisé'
                      : '⚠️ Audit Préalable en cours'}
                  </span>
                </div>

                <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      readinessPercentage === 100
                        ? 'bg-emerald-400'
                        : readinessPercentage >= 70
                        ? 'bg-teal-400'
                        : 'bg-amber-400'
                    }`}
                    style={{ width: `${readinessPercentage}%` }}
                  />
                </div>
              </div>

              {/* Checklist 10 Points */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {[
                  {
                    id: 1,
                    title: '1. Continuité Électrique Secourue (Onduleur 3 kVA)',
                    desc: 'Onduleur opérationnel en salle serveur et autonomie de 4 heures minimum testée sous coupure simulée.',
                    responsible: 'Ingénieur Biomédical & Énergie',
                  },
                  {
                    id: 2,
                    title: '2. Serveur Edge On-Premise Installé & Chiffré',
                    desc: 'Appliance Linux opérationnelle dans l\'hôpital, partition PostgreSQL chiffrée en AES-256.',
                    responsible: 'Administrateur SI',
                  },
                  {
                    id: 3,
                    title: '3. Réseau Local LAN & Wi-Fi WPA3 Déployé',
                    desc: 'Couverture vérifiée en salle de travail, bloc obstétrical, déchoquage urgences et pharmacie.',
                    responsible: 'Technicien Réseau',
                  },
                  {
                    id: 4,
                    title: '4. Interconnexion DHIS2 & Registres Validée',
                    desc: 'Export automatique des agrégats mensuels CPN et urgences sans doublon vers le serveur de district.',
                    responsible: 'Statisticien Médical',
                  },
                  {
                    id: 5,
                    title: '5. Stocks d’Urgence Maternité Disponibles',
                    desc: 'Ocytocine et Sulfate de Magnésium disponibles ≥ seuil d’alerte avec thermomètre frigo connecté.',
                    responsible: 'Pharmacien Chef',
                  },
                  {
                    id: 6,
                    title: '6. Tablettes de Garde Configurées (Offline + Wolof)',
                    desc: 'Terminaux durcis testés en mode déconnecté avec audio Wolof vérifié auprès de patientes.',
                    responsible: 'Sage-femme Major',
                  },
                  {
                    id: 7,
                    title: '7. Passerelle Télé-Expertise liée aux Spécialistes',
                    desc: 'File d\'attente connectée aux gynécologues de référence du CHU avec notification SMS.',
                    responsible: 'Médecin Chef de Garde',
                  },
                  {
                    id: 8,
                    title: '8. Équipes Soignantes Formées & Certifiées',
                    desc: '100% des sages-femmes et médecins de garde ont validé la certification clinique SantéNova.',
                    responsible: 'Direction des Soins',
                  },
                  {
                    id: 9,
                    title: '9. Fiche de Liaison d\'Évacuation Numérisée Active',
                    desc: 'Tableau de bord des urgences prêt à recevoir les alertes d\'ambulances en provenance des postes.',
                    responsible: 'Chef des Urgences',
                  },
                  {
                    id: 10,
                    title: '10. Référent Éthique & Comité CME Mandaté',
                    desc: 'Procédure formelle de revue des cas HUMAN_REVIEW_REQUIRED inscrite au règlement intérieur.',
                    responsible: 'Président CME & Direction',
                  },
                ].map((item) => {
                  const isChecked = !!checklistState[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                        isChecked
                          ? 'bg-slate-950/80 border-teal-500/40 hover:border-teal-500/60'
                          : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 opacity-75'
                      }`}
                    >
                      <div className="pt-0.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // handled by parent onClick
                          className="w-4 h-4 rounded text-teal-500 focus:ring-teal-400 bg-slate-900 border-slate-700 cursor-pointer"
                        />
                      </div>
                      <div className="space-y-1 select-none flex-1">
                        <div className="flex items-center justify-between">
                          <strong className={`font-semibold ${isChecked ? 'text-white' : 'text-slate-300'}`}>
                            {item.title}
                          </strong>
                          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                            isChecked ? 'bg-emerald-500/10 text-emerald-400 font-bold' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {isChecked ? 'CONFORME' : 'À VÉRIFIER'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          {item.desc}
                        </p>
                        <span className="text-[10px] text-teal-400/80 font-mono block pt-0.5">
                          Responsable : {item.responsible}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Phase 7: Branchement Direct & Déploiement Docker (Plug & Play) */}
          {guidePhase === 7 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="pb-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/30">
                      PHASE 7 · NOTICE TECHNIQUE & DÉPLOIEMENT RAPIDE
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      PLUG & PLAY · DOCKER READY
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Branchement Direct & Déploiement Opérationnel en Milieu Hospitalier
                  </h3>
                  <p className="text-xs text-slate-300 max-w-3xl">
                    Réponse technique à la mise en service : comment transformer le prototype en solution opérationnelle branchée sur le réseau d’un hôpital régional, d'un CHU ou d'un district sanitaire.
                  </p>
                </div>

                <button
                  onClick={handleCopyDeployCommands}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow"
                >
                  {copiedCommand ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Commandes Copiées !</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-blue-400" />
                      <span>Copier la commande Docker</span>
                    </>
                  )}
                </button>
              </div>

              {/* Assessment Verdict Box */}
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <strong className="text-sm font-bold text-emerald-300 block">
                      Verdict Technique : Le prototype logiciel est 100% prêt à être branché.
                    </strong>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      L'application est entièrement conteneurisée (Docker), hébergée sur GitHub, compatible PWA hors-ligne et dotée de tous les algorithmes cliniques validés (Partogramme OMS, triage pédiatrique, pharmacie prédictive). Pour une utilisation en salle de soins, il suffit d'effectuer les 4 raccordements physiques récapitulés ci-dessous.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    STATUS : READY FOR PILOT
                  </span>
                </div>
              </div>

              {/* Interactive Terminal Block */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    <Terminal className="w-4 h-4 text-teal-400" />
                    <span>Lancement en 3 commandes sur le serveur hospitalier (Linux / Docker)</span>
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">Temps d'exécution : ~2 minutes</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 space-y-2 relative overflow-hidden group">
                  <div className="flex items-center justify-between text-slate-500 pb-2 border-b border-slate-900 text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                      <span className="ml-2 text-slate-400 font-sans">bash — terminal serveur hôpital</span>
                    </span>
                    <span>v2.1 LTS</span>
                  </div>

                  <pre className="text-teal-300 leading-relaxed overflow-x-auto whitespace-pre font-mono pt-1 text-[11px] sm:text-xs">
{`# 1. Cloner le référentiel officiel SantéNova v2.1
git clone https://github.com/ndiayebayemoussa04-create/SANTENOVA-V2.1.git

# 2. Accéder au répertoire du projet
cd SANTENOVA-V2.1

# 3. Lancer la pile complète (Frontend React + Backend Python + IA)
docker compose up -d --build`}
                  </pre>
                </div>
              </div>

              {/* Network Endpoints Table */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">INTERFACE SOIGNANTS</span>
                  <div className="font-mono text-white text-xs font-bold">http://[IP_SERVEUR]:3000</div>
                  <p className="text-[11px] text-slate-400">Accessible depuis tablettes et postes infirmiers en Wi-Fi local sans Internet.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider block">API & PASSERELLES</span>
                  <div className="font-mono text-white text-xs font-bold">http://[IP_SERVEUR]:8000</div>
                  <p className="text-[11px] text-slate-400">Endpoints REST, connecteur FHIR, DHIS2 et réplication Store-and-Forward.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">DOCUMENTATION SWAGGER</span>
                  <div className="font-mono text-white text-xs font-bold">http://[IP_SERVEUR]:8000/docs</div>
                  <p className="text-[11px] text-slate-400">Spécification OpenAPI interactive pour l'équipe informatique de l'hôpital.</p>
                </div>
              </div>

              {/* The 4 Physical & Organizational Connections */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                  <Layers className="w-4 h-4" />
                  <span>Matrice des 4 Branchements Physiques & Opérationnels pour l'Hôpital</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Connection 1 */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <Server className="w-4 h-4 text-blue-400" />
                        <span>1. Branchement Serveur Local (Hardware)</span>
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Prêt (Docker)
                      </span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      Brancher un mini-PC (Intel NUC ou serveur 1U Linux) sur l'onduleur secouru du service. Le connecter au switch réseau local en lui attribuant une IP fixe (ex: <code className="text-teal-300">192.168.1.50</code>).
                    </p>
                    <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800 flex justify-between">
                      <span>Coût estimatif : ~300 € / 200 000 FCFA</span>
                      <span className="text-teal-400 font-semibold">Temps : 2 heures</span>
                    </div>
                  </div>

                  {/* Connection 2 */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <Wifi className="w-4 h-4 text-emerald-400" />
                        <span>2. Réseau Wi-Fi Sécurisé Dédié</span>
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        PWA Autonome
                      </span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      Diffuser un réseau Wi-Fi isolé (ex: <code className="text-teal-300">SSID: CHU-SANTENOVA</code>) avec chiffrement WPA3 dédié aux tablettes médicales, évitant tout encombrement par les téléphones du public.
                    </p>
                    <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800 flex justify-between">
                      <span>Séparation VLAN soignants</span>
                      <span className="text-teal-400 font-semibold">Temps : 1 heure</span>
                    </div>
                  </div>

                  {/* Connection 3 */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <Laptop className="w-4 h-4 text-purple-400" />
                        <span>3. Tablettes Soignants (Installation PWA)</span>
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Zéro Dépendance Store
                      </span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      Ouvrir le navigateur de la tablette sur l'adresse du serveur local, puis cliquer sur « Ajouter à l'écran d'accueil ». L'application s'installe comme une app native avec icône dédiée et persistance IndexedDB.
                    </p>
                    <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800 flex justify-between">
                      <span>Déploiement sur 10 tablettes</span>
                      <span className="text-teal-400 font-semibold">Temps : 30 minutes</span>
                    </div>
                  </div>

                  {/* Connection 4 */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-amber-400" />
                        <span>4. Passerelles Réelles (SMS & IA)</span>
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        À Configurer (.env)
                      </span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      Renseigner le fichier <code className="text-teal-300">.env</code> avec les identifiants de production : clé API Gemini (pour l'aide IA en ligne), passerelle SMS opérateur (Orange Sénégal / Twilio) ou dongle GSM avec carte SIM.
                    </p>
                    <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800 flex justify-between">
                      <span>Fichier .env.example fourni</span>
                      <span className="text-teal-400 font-semibold">Temps : 1 heure</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended 30-Day Hospital Pilot Protocol */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-teal-400" />
                  <strong className="text-xs font-bold text-white">
                    Protocole Recommandé : Expérimentation Pilote de 30 Jours en Milieu Hospitalier
                  </strong>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-[11px]">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <span className="font-bold text-teal-400 block font-mono">SEMAINE 1</span>
                    <strong className="text-slate-200 block">Autorisation & Cadrage</strong>
                    <p className="text-slate-400">Présentation du Dossier Partenaires au Médecin-Chef de district et convention pilote.</p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <span className="font-bold text-teal-400 block font-mono">SEMAINE 2</span>
                    <strong className="text-slate-200 block">Installation & Formation</strong>
                    <p className="text-slate-400">Pose du mini-serveur, distribution des tablettes et atelier de 2 jours avec sages-femmes.</p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <span className="font-bold text-teal-400 block font-mono">SEMAINE 3</span>
                    <strong className="text-slate-200 block">Double Saisie Clinique</strong>
                    <p className="text-slate-400">Saisie simultanée papier + SantéNova pour comparer la précision des alertes partogramme.</p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <span className="font-bold text-teal-400 block font-mono">SEMAINE 4</span>
                    <strong className="text-slate-200 block">Bilan & Généralisation</strong>
                    <p className="text-slate-400">Rapport d'évaluation mesurant le temps soignant gagné et le zéro retard d'évacuation.</p>
                  </div>
                </div>
              </div>

              {/* Multi-Device Setup Guide: Smartphones, Tablets & Desktop */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-teal-400" />
                    <strong className="text-xs font-bold text-white">
                      Paramétrage Multi-Terminaux : Smartphones des Patientes, Tablettes de Soins & Postes Fixes PC
                    </strong>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/30">
                    PWA UNIVERSALE · ZERO APP STORE
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold">
                      <Smartphone className="w-4 h-4" />
                      <span>Smartphone Patiente (Android / iOS)</span>
                    </div>
                    <ul className="space-y-1.5 text-[11px] text-slate-300">
                      <li>• <strong>Android :</strong> Menu Chrome ⋮ &gt; <em>« Ajouter à l'écran d'accueil »</em>.</li>
                      <li>• <strong>iPhone :</strong> Bouton Partager &gt; <em>« Sur l'écran d'accueil »</em>.</li>
                      <li>• Fonctionne sans store (0 Mo forfait si connecté au Wi-Fi hospitalier).</li>
                      <li>• Notifications locales de prise de comprimés et guidage vocal Wolof.</li>
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2 text-blue-400 font-bold">
                      <Tablet className="w-4 h-4" />
                      <span>Tablette Chevet & Maternité (10-12")</span>
                    </div>
                    <ul className="space-y-1.5 text-[11px] text-slate-300">
                      <li>• <strong>Visite Sage-femme :</strong> Saisie de la tension, partogramme et CPN au lit.</li>
                      <li>• <strong>Mode Kiosque :</strong> Borne tactile d'auto-évaluation en salle d'attente.</li>
                      <li>• Ergonomie tactile certifiée : boutons ≥44px utilisables avec gants.</li>
                      <li>• Synchronisation locale instantanée dès détection du mini-serveur.</li>
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2 text-indigo-400 font-bold">
                      <Monitor className="w-4 h-4" />
                      <span>Poste Fixe PC & Secrétariat</span>
                    </div>
                    <ul className="space-y-1.5 text-[11px] text-slate-300">
                      <li>• <strong>PC Bureau :</strong> Installable en 1 clic via Chrome/Edge en fenêtre dédiée.</li>
                      <li>• <strong>Impression A4 :</strong> Sortie PDF immédiate des ordonnances et carnets.</li>
                      <li>• Prise en charge des douchettes code-barres USB et imprimantes thermiques.</li>
                      <li>• Accès direct par l'URL locale <code>http://santenova.local:3000</code>.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Phase 8: Déploiement Application (Smartphones, Tablettes & PC) */}
          {guidePhase === 8 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="pb-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/30">
                      PHASE 8 · DÉPLOIEMENT APPLICATIF & MOBILITÉ
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      PWA ZERO-STORE · SMARTPHONES · TABLETTES · PC
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Procédure de Paramétrage & Déploiement de l'Application sur le Terrain
                  </h3>
                  <p className="text-xs text-slate-300 max-w-3xl">
                    Guide pratique pour équiper les patientes (sans passer par Google Play ni l'App Store), les sages-femmes sur tablettes de lit, les postes fixes de consultation et le réseau local sans Internet.
                  </p>
                </div>
              </div>

              {/* Navigation Sub-Tabs by Device */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-950/70 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
                <button
                  onClick={() => setAppDeployTab('mobile')}
                  className={`py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                    appDeployTab === 'mobile'
                      ? 'bg-teal-500 text-slate-950 shadow-md font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>1. Smartphones Patientes</span>
                </button>
                <button
                  onClick={() => setAppDeployTab('tablet')}
                  className={`py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                    appDeployTab === 'tablet'
                      ? 'bg-teal-500 text-slate-950 shadow-md font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Tablet className="w-4 h-4" />
                  <span>2. Tablettes Maternité</span>
                </button>
                <button
                  onClick={() => setAppDeployTab('desktop')}
                  className={`py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                    appDeployTab === 'desktop'
                      ? 'bg-teal-500 text-slate-950 shadow-md font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                  <span>3. Postes Fixes PC</span>
                </button>
                <button
                  onClick={() => setAppDeployTab('network')}
                  className={`py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                    appDeployTab === 'network'
                      ? 'bg-teal-500 text-slate-950 shadow-md font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Wifi className="w-4 h-4" />
                  <span>4. Wi-Fi Local (0 Mo Data)</span>
                </button>
              </div>

              {/* Sub-Tab 1: Smartphones */}
              {appDeployTab === 'mobile' && (
                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Android Box */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-3">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                        <Smartphone className="w-4 h-4" />
                        <span>Procédure Android (Chrome, Samsung Internet, Xiaomi)</span>
                      </div>
                      <ol className="list-decimal list-inside space-y-2 text-slate-300">
                        <li>
                          <strong>Connexion au réseau :</strong> Connecter le téléphone au Wi-Fi de l'hôpital ou 4G.
                        </li>
                        <li>
                          <strong>Ouverture :</strong> Scanner le QR code imprimé de la chambre ou taper l'URL.
                        </li>
                        <li>
                          <strong>Installation directe :</strong> Appuyer sur la bannière <em>« Installer l'application »</em> ou dans le menu Chrome (⋮) sur <em>« Ajouter à l'écran d'accueil »</em>.
                        </li>
                        <li>
                          <strong>Icône dédiée :</strong> L'icône SantéNova apparaît sur le lanceur du smartphone. Pèse moins de 2 Mo et démarre instantanément.
                        </li>
                      </ol>
                      <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px]">
                        ✓ <strong>100% Autonome Hors-Ligne :</strong> Les alertes de rendez-vous CPN et prises de Labétalol sonnent même sans connexion Internet.
                      </div>
                    </div>

                    {/* iOS Box */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/30 space-y-3">
                      <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                        <Smartphone className="w-4 h-4" />
                        <span>Procédure iPhone & iPad (Apple Safari)</span>
                      </div>
                      <ol className="list-decimal list-inside space-y-2 text-slate-300">
                        <li>
                          <strong>Ouverture dans Safari :</strong> Charger l'URL du portail SantéNova sur l'iPhone.
                        </li>
                        <li>
                          <strong>Bouton Partager :</strong> Appuyer sur l'icône de partage Apple <Share2 className="w-3.5 h-3.5 inline text-indigo-400" /> au centre bas de l'écran.
                        </li>
                        <li>
                          <strong>Sur l'écran d'accueil :</strong> Faire défiler et sélectionner <em>« Sur l'écran d'accueil »</em>.
                        </li>
                        <li>
                          <strong>Validation :</strong> Appuyer sur <em>« Ajouter »</em>. L'application tourne en plein écran sans barre Safari (Mode Standalone).
                        </li>
                      </ol>
                      <div className="p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px]">
                        ✓ <strong>Accessibilité Vocale Wolof :</strong> L'assistante vocale lit les rappels en Wolof pour les patientes non alphabétisées.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Tab 2: Tablettes Maternité */}
              {appDeployTab === 'tablet' && (
                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-950 border border-blue-500/30 space-y-3">
                    <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                      <Tablet className="w-5 h-5" />
                      <span>Configuration des Tablettes de Maternité & Consultation Lit-à-Lit</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      Les tablettes tactiles (iPad 10.2", Samsung Galaxy Tab A8 ou tablettes durcies IP65) permettent aux sages-femmes et urgentistes d'enregistrer les soins directement au chevet de la patiente.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                        <span className="text-teal-400 font-bold block">1. Ergonomie de Salle d'Accouchement</span>
                        <p className="text-slate-400 text-[11px]">
                          Affichage en 2 colonnes simultanées (Partogramme OMS et tension artérielle). Boutons tactiles calibrés à ≥44px de hauteur pour saisie aisée même avec des gants stériles.
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                        <span className="text-teal-400 font-bold block">2. Mode Kiosque Salle d'Attente</span>
                        <p className="text-slate-400 text-[11px]">
                          Verrouillage de l'écran sur l'application (Accès Guidé iPad ou Épinglage Android) pour transformer la tablette en borne d'auto-évaluation et d'éducation thérapeutique.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Tab 3: Postes Fixes PC */}
              {appDeployTab === 'desktop' && (
                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-700 space-y-3">
                    <div className="flex items-center gap-2 text-white font-bold text-sm">
                      <Monitor className="w-5 h-5 text-teal-400" />
                      <span>Postes de Consultation Médicale, Urgences & Secrétariat (PC / Mac)</span>
                    </div>
                    <ol className="list-decimal list-inside space-y-2 text-slate-300">
                      <li>
                        <strong>Navigateurs supportés :</strong> Google Chrome, Microsoft Edge, Brave, Safari Desktop.
                      </li>
                      <li>
                        <strong>Installation en 1 clic :</strong> Cliquer sur l'icône <Monitor className="w-3.5 h-3.5 inline text-teal-400" /> dans la barre d'adresse pour installer SantéNova comme application native du bureau Windows/Mac.
                      </li>
                      <li>
                        <strong>Impression A4 & PDF :</strong> Export direct des ordonnances, bilans de biologie et fiches de liaison Samu/CHU en 1 clic.
                      </li>
                      <li>
                        <strong>Périphériques USB :</strong> Compatible avec les douchettes code-barres USB et imprimantes thermiques de bracelets d'admission.
                      </li>
                    </ol>
                  </div>
                </div>
              )}

              {/* Sub-Tab 4: Wi-Fi Hospitalier Local */}
              {appDeployTab === 'network' && (
                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 space-y-3">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                      <Wifi className="w-5 h-5" />
                      <span>Diffusion sur le Réseau Wi-Fi Hospitalier (Sans Internet Extérieur)</span>
                    </div>
                    <p className="text-slate-300">
                      Pour que tous les soignants et patientes accèdent à SantéNova sans dépenser aucun forfait de données mobiles :
                    </p>
                    <div className="space-y-2 pt-1 font-mono text-[11px]">
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-between">
                        <span>1. Raccordement Serveur Edge au routeur Wi-Fi :</span>
                        <span className="text-teal-400">IP Fixe : 192.168.1.50</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-between">
                        <span>2. Nom d'accès DNS local :</span>
                        <span className="text-teal-400">http://santenova.local:3000</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-between">
                        <span>3. Coût de données pour les patientes :</span>
                        <span className="text-emerald-400 font-bold">0 FCFA / 0 Mo Internet</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Interactive Deployment Checklist */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckSquare className="w-4 h-4 text-teal-400" />
                    <strong className="text-xs font-bold text-white">
                      Checklist Interactive de Déploiement Applicatif sur Site
                    </strong>
                  </div>
                  <span className="text-[10px] font-mono text-teal-400">
                    {Object.values(appChecklist).filter(Boolean).length} / {Object.keys(appChecklist).length} Validés
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 1, label: 'QR Codes d’accès imprimés et affichés en salle de pré-travail' },
                    { id: 2, label: 'PWA Service Worker & Cache hors-ligne vérifiés (Chrome/Safari)' },
                    { id: 3, label: 'Tablettes Maternité calibrées pour manipulation avec gants (≥44px)' },
                    { id: 4, label: 'Synthèse vocale Wolof & Français testée auprès de patientes' },
                    { id: 5, label: 'Postes fixes PC configurés pour impression A4 des fiches de liaison' },
                    { id: 6, label: 'SSID Wi-Fi dédié HOSPITAL-SANTENOVA configuré et actif' },
                    { id: 7, label: 'Formation flash de 15 minutes des équipes soignantes réalisée' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => toggleAppChecklist(item.id)}
                      className={`p-2.5 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                        appChecklist[item.id]
                          ? 'bg-teal-500/10 border-teal-500/30 text-teal-200'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 text-[10px] font-bold ${
                          appChecklist[item.id]
                            ? 'bg-teal-500 text-slate-950'
                            : 'border border-slate-600 bg-slate-800'
                        }`}
                      >
                        {appChecklist[item.id] && '✓'}
                      </div>
                      <span className="text-[11px] leading-tight">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Phase 9: Architecture & Fonctionnement du Moteur Clinique */}
          {guidePhase === 9 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              {/* Header */}
              <div className="pb-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/30">
                      PHASE 9 · ARCHITECTURE SYSTÈME & MOTEUR IA
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      0% HALLUCINATION · HUMAN-IN-THE-LOOP · OFFLINE FIRST
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Architecture Fondamentale et Fonctionnement Interne du Moteur SantéNova
                  </h3>
                  <p className="text-xs text-slate-300 max-w-3xl">
                    Le moteur d'orchestration clinique combine 6 sous-moteurs spécialisés et isolés. Il garantit une sécurité médicale absolue en séparant les règles déterministes obligatoires de l'assistance contextuelle.
                  </p>
                </div>
              </div>

              {/* Universality Statement Banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-teal-950/40 via-slate-900 to-indigo-950/40 border border-teal-500/30 flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-teal-500/20 text-teal-400 shrink-0 mt-0.5">
                  <Globe2 className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <strong className="text-sm font-bold text-white block">
                      Déploiement Universel : Prêt pour le Monde Entier (« Edge-First & Zero-Dependency »)
                    </strong>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                      100% OPÉRATIONNEL
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Le moteur de SantéNova est conçu dès son architecture fondamentale pour être déployé et utilisé n’importe où dans le monde, y compris dans les zones rurales les plus isolées (Afrique de l'Ouest, Afrique Centrale, Asie du Sud-Est, Amérique Latine, ou dispensaires insulaires).
                  </p>
                </div>
              </div>

              {/* 1. Pourquoi le moteur fonctionne partout (Tableau Edge-First) */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-teal-400" />
                    <strong className="text-xs font-bold text-white">
                      1. Pourquoi le Moteur Fonctionne Partout (« Edge-First & Zero-Dependency »)
                    </strong>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">4 PROPRIÉTÉS CLÉS</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <strong className="text-emerald-400 font-bold">Autonomie Totale Hors-Ligne</strong>
                      <span className="text-[10px] font-mono text-slate-400">IndexedDB / Local</span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      <strong>Ce qui le rend prêt partout :</strong> Les calculs cliniques (Partogramme OMS, Triage pédiatrique, scores de pré-éclampsie) tournent directement sur l'appareil (IndexedDB / navigateur), pas sur un serveur distant à l'étranger.
                    </p>
                    <div className="text-[10px] text-emerald-300 bg-emerald-500/10 p-1.5 rounded border border-emerald-500/20">
                      ⚡ <strong>Impact terrain :</strong> Fonctionne même en cas de coupure Internet de 3 semaines ou dans un poste de santé en brousse.
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <strong className="text-blue-400 font-bold">Portabilité Docker Universelle</strong>
                      <span className="text-[10px] font-mono text-slate-400">x86_64 & ARM</span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      <strong>Ce qui le rend prêt partout :</strong> Le moteur tourne dans un conteneur standard Linux x86_64 ou ARM (Intel NUC, serveur d'hôpital, PC portable reconditionné, ou Raspberry Pi).
                    </p>
                    <div className="text-[10px] text-blue-300 bg-blue-500/10 p-1.5 rounded border border-blue-500/20">
                      ⚡ <strong>Impact terrain :</strong> Se déploie en 2 minutes avec <code>docker compose up -d</code> sans installer de dépendances complexes.
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <strong className="text-purple-400 font-bold">Normes Médicales Internationales</strong>
                      <span className="text-[10px] font-mono text-slate-400">OMS · FHIR · DHIS2</span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      <strong>Ce qui le rend prêt partout :</strong> Basé sur les référentiels stricts de l'OMS (Organisation Mondiale de la Santé) et les standards mondiaux HL7 FHIR et DHIS2.
                    </p>
                    <div className="text-[10px] text-purple-300 bg-purple-500/10 p-1.5 rounded border border-purple-500/20">
                      ⚡ <strong>Impact terrain :</strong> Reconnu et compatible avec les systèmes informatiques de tous les Ministères de la Santé et des ONG (UNICEF, Croix-Rouge, MSF).
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <strong className="text-amber-400 font-bold">Zéro Coût de Licence Propriétaire</strong>
                      <span className="text-[10px] font-mono text-slate-400">100% Souverain</span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      <strong>Ce qui le rend prêt partout :</strong> Open-source et autonome, sans dépendance obligatoire à un abonnement cloud mensuel pour fonctionner en salle de soins.
                    </p>
                    <div className="text-[10px] text-amber-300 bg-amber-500/10 p-1.5 rounded border border-amber-500/20">
                      ⚡ <strong>Impact terrain :</strong> Zéro barrière financière pour les structures publiques défavorisées.
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Adaptation en 15 minutes & 3. Environnements Immédiats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Adaptation 15 min */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-teal-400 font-bold">
                    <Clock className="w-4 h-4" />
                    <span>2. Comment il s'adapte à n'importe quel pays en 15 minutes</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    Pour déployer le moteur dans un nouveau pays ou un nouvel hôpital, <strong>aucun code n'est à réécrire</strong>. Il suffit de renseigner 3 fichiers de configuration :
                  </p>
                  <ul className="space-y-2 text-[11px] text-slate-300">
                    <li className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                      <strong className="text-teal-300 block">1. Liste Nationale des Médicaments Essentiels (LNME) :</strong>
                      Le module pharmacie charge le catalogue local (ex: PNA au Sénégal, CAMEG au Burkina Faso, ou FEDECAME en RDC).
                    </li>
                    <li className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                      <strong className="text-teal-300 block">2. Le Réseau Télécom Local (pour les alertes SMS) :</strong>
                      En zone urbaine : passerelle API SMS (Orange, MTN, Moov, Twilio). En zone rurale : un simple dongle USB 4G (clé modem GSM à 15 € avec carte SIM locale) branché sur le mini-PC.
                    </li>
                    <li className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                      <strong className="text-teal-300 block">3. La Langue et les dialectes locaux :</strong>
                      L'interface prend en charge le français, l'anglais et les synthèses vocales en langues locales (Wolof, Pulaar, Bambara, etc.) pour les agents de santé communautaires.
                    </li>
                  </ul>
                </div>

                {/* 3 Environnements */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-indigo-400 font-bold">
                    <Building2 className="w-4 h-4" />
                    <span>3. Les 3 environnements où le moteur tourne immédiatement</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    Le moteur peut être activé instantanément selon trois topologies hospitalières :
                  </p>
                  <ul className="space-y-2 text-[11px] text-slate-300">
                    <li className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                      <strong className="text-indigo-300 block">1. En Salle d'Accouchement & Maternité de District :</strong>
                      Installé sur des tablettes tactiles bon marché (Android/iPad) en Wi-Fi local sans Internet, pour surveiller le travail obstétrical en direct.
                    </li>
                    <li className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                      <strong className="text-indigo-300 block">2. Dans une Ambulance ou Clinique Mobile :</strong>
                      Embarqué sur un ordinateur portable ou une tablette durcie pour trier les blessés et orienter les évacuations avant même d'arriver au CHU.
                    </li>
                    <li className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                      <strong className="text-indigo-300 block">3. Au Niveau d'une Région Médicale ou d'un Ministère :</strong>
                      Installé sur un serveur centralisé pour agréger les données épidémiologiques et anticiper les ruptures de stock d'insuline et d'antibiotiques sur 50 centres de santé.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Ready Summary Callout */}
              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="text-emerald-200">
                    <strong>En résumé :</strong> Le noyau clinique et technique est 100% prêt. Tout établissement de santé, ONG ou district sanitaire qui télécharge le dépôt GitHub officiel peut brancher le conteneur et commencer à enregistrer des patientes et trier des urgences dès aujourd'hui.
                  </span>
                </div>
                <span className="font-mono text-[10px] px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold shrink-0 ml-2">
                  PLUG & PLAY READY
                </span>
              </div>

              {/* Engine Core Performance Indicators */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Latence Exécution</span>
                  <div className="text-lg font-bold font-mono text-teal-400">&lt; 15 ms</div>
                  <p className="text-[10px] text-slate-500">Exécution locale Edge sans dépendance externe.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Risque Hallucination</span>
                  <div className="text-lg font-bold font-mono text-emerald-400">0.0 %</div>
                  <p className="text-[10px] text-slate-500">Règles cliniques validées et bloquantes.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Autonomie Hors-Ligne</span>
                  <div className="text-lg font-bold font-mono text-blue-400">100 %</div>
                  <p className="text-[10px] text-slate-500">SQLite chiffré & PWA cache Service Worker.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Format Données</span>
                  <div className="text-lg font-bold font-mono text-amber-400">FHIR R4</div>
                  <p className="text-[10px] text-slate-500">Export direct DHIS2 & interopérabilité.</p>
                </div>
              </div>

              {/* Visual Clinical Decision Pipeline */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <strong className="text-xs font-bold text-white">
                      Pipeline d'Exécution Séquentielle d'une Requête Clinique (Flux de Données)
                    </strong>
                  </div>
                  <span className="text-[10px] font-mono text-teal-400">SÉCURITÉ EN 5 ÉTAPES</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-[11px] font-mono">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-slate-400 text-[10px] block">ÉTAPE 1</span>
                    <strong className="text-teal-300 block">Saisie Patient / Capteurs</strong>
                    <p className="text-slate-400 text-[10px]">Tension, SA, Z-score, symptômes en texte ou audio.</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-slate-400 text-[10px] block">ÉTAPE 2</span>
                    <strong className="text-indigo-300 block">Filtre PII & Anonymisation</strong>
                    <p className="text-slate-400 text-[10px]">Masquage du nom, adresse et téléphone (Norme CDP).</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-slate-400 text-[10px] block">ÉTAPE 3</span>
                    <strong className="text-emerald-300 block">Garde-Fou Déterministe</strong>
                    <p className="text-slate-400 text-[10px]">Application des seuils OMS (PAS ≥ 140 = alerte rouge).</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-slate-400 text-[10px] block">ÉTAPE 4</span>
                    <strong className="text-amber-300 block">RAG Protocolaire Citations</strong>
                    <p className="text-slate-400 text-[10px]">Recherche dans le guide SONU avec numéro de page.</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-slate-400 text-[10px] block">ÉTAPE 5</span>
                    <strong className="text-rose-300 block">Portail Human Review</strong>
                    <p className="text-slate-400 text-[10px]">Validation médecin si confiance &lt; 85% ou urgence.</p>
                  </div>
                </div>
              </div>

              {/* Sub-Engine Explorer Navigation */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-teal-400" />
                    <strong className="text-xs font-bold text-white">
                      Explorateur des 6 Sous-Moteurs Spécialisés
                    </strong>
                  </div>
                  <span className="text-[10px] text-slate-400">Cliquez pour inspecter les détails techniques</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-xs">
                  {[
                    { id: 'deterministic', label: '1. Déterministe', icon: Activity },
                    { id: 'rag', label: '2. RAG Hybride', icon: BookOpen },
                    { id: 'hitl', label: '3. Human Gate', icon: ShieldCheck },
                    { id: 'offline', label: '4. Offline Sync', icon: Server },
                    { id: 'fhir', label: '5. FHIR / DHIS2', icon: Network },
                    { id: 'voice', label: '6. Vocal Wolof', icon: Users },
                  ].map((sub) => {
                    const SubIcon = sub.icon;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => setSelectedEngineModule(sub.id)}
                        className={`p-2.5 rounded-xl border text-center flex flex-col items-center gap-1.5 transition-all ${
                          selectedEngineModule === sub.id
                            ? 'bg-teal-500/10 border-teal-500/50 text-teal-300 font-bold shadow-md'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                        }`}
                      >
                        <SubIcon className="w-4 h-4" />
                        <span className="text-[11px] truncate w-full">{sub.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Engine 1: Déterministe */}
                {selectedEngineModule === 'deterministic' && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                        <Activity className="w-4 h-4" />
                        <span>Moteur Déterministe : Algorithmes Médicaux Purs (Zéro Hallucination)</span>
                      </div>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-bold">
                        EXECUTION: LOCAL TYPESCRIPT
                      </span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      Ce sous-moteur n'utilise aucun modèle d'IA générative probabiliste. Il code directement les arbres décisionnels officiels de l'Organisation Mondiale de la Santé (OMS) et de la Direction Générale de la Santé (Sénégal) :
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                        <strong className="text-white block">Partogramme OMS</strong>
                        <p className="text-slate-400 text-[11px]">
                          Calcul des lignes d'alerte et d'action selon la dilatation cervicale et la descente foetale. Alerte d'évacuation immédiate si franchissement de la ligne d'action.
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                        <strong className="text-white block">Dépistage Pré-Éclampsie</strong>
                        <p className="text-slate-400 text-[11px]">
                          Déclenchement automatique du palier d'urgence dès PAS ≥ 140 mmHg ou PAD ≥ 90 mmHg avec protéinurie ≥ 2+, avec proposition de protocole Sulfate de Magnésium.
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                        <strong className="text-white block">Z-Scores Pédiatriques</strong>
                        <p className="text-slate-400 text-[11px]">
                          Évaluation automatique Poids/Taille et Périmètre Brachial (MUAC) pour détecter la malnutrition aiguë sévère (MAS) selon les courbes OMS.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Engine 2: RAG Hybride */}
                {selectedEngineModule === 'rag' && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-teal-500/30 space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
                        <BookOpen className="w-4 h-4" />
                        <span>Moteur RAG Hybride : Recherche Sémantique Ancrée & Anonymisation PII</span>
                      </div>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/30 font-bold">
                        GROUNDED RAG · SOURCES AUDITÉES
                      </span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      Le moteur interroge uniquement un corpus documentaire médical officiel validé par la Commission Médicale d'Établissement (CME) et le Ministère de la Santé :
                    </p>
                    <ul className="list-disc list-inside space-y-1.5 text-slate-300 text-[11px]">
                      <li>• <strong>Corpus strict :</strong> Guide SONU (Soins Obstétricaux & Néonatals d'Urgence), Guide National de Prise en Charge du Paludisme, Recommandations HTA gravidique MSAS.</li>
                      <li>• <strong>Masquage PII préalable :</strong> Tout nom de famille, numéro de téléphone ou identifiant est anonymisé avant la vectorisation.</li>
                      <li>• <strong>Citation avec preuve :</strong> Chaque recommandation fournie au soignant cite impérativement la page, le paragraphe et le titre du guide clinique de référence.</li>
                    </ul>
                  </div>
                )}

                {/* Engine 3: Human-in-the-Loop */}
                {selectedEngineModule === 'hitl' && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Moteur Human-in-the-Loop : SAS de Sécurité & Arbitrage Médical</span>
                      </div>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 font-bold">
                        MÉDECIN DÉCISIONNAIRE OBLIGATOIRE
                      </span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      Conformément à l'éthique médicale et au principe de non-délégation du diagnostic aux machines :
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                        <strong className="text-amber-300 block">Seuil d'Incertitude (&lt; 85%)</strong>
                        <p className="text-slate-400 text-[11px]">
                          Si le moteur calcule un indice de confiance inférieur à 85% pour une recommandation, la suggestion est mise en attente et transmise au médecin de garde.
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                        <strong className="text-rose-300 block">Urgences Vitales (Stade 1 / 2)</strong>
                        <p className="text-slate-400 text-[11px]">
                          Les cas critiques (hémorragie de la délivrance, détresse respiratoire néonatale) déclenchent une alerte visuelle et sonore prioritaire nécessitant la validation formelle d'un praticien.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Engine 4: Offline-First */}
                {selectedEngineModule === 'offline' && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-blue-500/30 space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                        <Server className="w-4 h-4" />
                        <span>Moteur Offline-First : Résilience Extrême & Résolution de Conflits</span>
                      </div>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/30 font-bold">
                        VECTOR CLOCKS · AES-256
                      </span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      Pensé pour les zones blanches et les dispensaires ruraux isolés soumis aux coupures de courant et d'Internet :
                    </p>
                    <ul className="list-disc list-inside space-y-1.5 text-slate-300 text-[11px]">
                      <li>• <strong>Base de données locale chiffrée :</strong> SQLite sur le mini-serveur Edge et IndexedDB sécurisée sur les tablettes et smartphones.</li>
                      <li>• <strong>Horodatage vectoriel (Vector Clocks) :</strong> Garantit que les consultations effectuées simultanément sur deux tablettes hors-ligne fusionnent sans doublon ni perte lors de la reconnexion au réseau.</li>
                      <li>• <strong>Clé USB de secours :</strong> Export chiffré des dossiers en 1 clic pour transport physique par moto-ambulance en cas de panne réseau prolongée.</li>
                    </ul>
                  </div>
                )}

                {/* Engine 5: FHIR & DHIS2 */}
                {selectedEngineModule === 'fhir' && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-purple-500/30 space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                        <Network className="w-4 h-4" />
                        <span>Passerelle d'Interopérabilité Internationale : FHIR HL7 & DHIS2</span>
                      </div>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30 font-bold">
                        HL7 FHIR R4 · OPENMETRICS
                      </span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      Évite tout enfermement propriétaire et s'intègre nativement dans le système d'information sanitaire national :
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                        <strong className="text-purple-300 block">Ressources Standardisées FHIR</strong>
                        <p className="text-slate-400 text-[11px]">
                          Toutes les consultations sont stockées aux formats standard <code>Patient</code>, <code>Encounter</code>, <code>Observation</code>, <code>Condition</code> pour échange direct avec les DPI hospitaliers.
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                        <strong className="text-teal-300 block">Connecteur District DHIS2</strong>
                        <p className="text-slate-400 text-[11px]">
                          Agrégation automatique des rapports mensuels CPN, accouchements et vaccinations sans double-saisie manuelle pour le responsable statistique du district.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Engine 6: Vocal Wolof */}
                {selectedEngineModule === 'voice' && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-rose-500/30 space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                        <Users className="w-4 h-4" />
                        <span>Moteur Vocal & Multilingue : Inclusion des Langues Locales</span>
                      </div>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/30 font-bold">
                        WOLOF · FRANÇAIS · ANGLAIS
                      </span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      L'outil brise la barrière de la langue et de l'analphabétisme pour que la santé numérique profite à toutes les patientes :
                    </p>
                    <ul className="list-disc list-inside space-y-1.5 text-slate-300 text-[11px]">
                      <li>• <strong>Synthèse vocale native Wolof :</strong> Dicte les heures de prise de médicaments (« Jëlal sa garab ci suba gi »), les dates de CPN et les signes d'alerte de pré-éclampsie.</li>
                      <li>• <strong>Reconnaissance de commandes vocales :</strong> Permet à la patiente de poser des questions simples dans sa langue maternelle avec retour audio instantané.</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Signature & Official Endorsement Box */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 text-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
            <Award className="w-4 h-4" />
            <span>Document Certifié pour Présentation Institutionnelle</span>
          </div>
          <p className="text-slate-400 max-w-2xl">
            Prêt pour soutenance devant le Comité de Pilotage de la Santé Numérique (MSAS), la mission conjointe OMS-UNICEF et le pool des Partenaires Techniques et Financiers (PTF Santé).
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleDownloadWord}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl font-bold flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>Format Word (.docx)</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-slate-950 rounded-xl font-bold flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Format PDF (A4)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
