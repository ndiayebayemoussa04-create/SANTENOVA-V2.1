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
} from 'lucide-react';
import { I18nService } from '../services/i18n';
import { Language } from '../types';
import { DOSSIER_DOCX_BASE64 } from '../data/dossierB64';

export const InstitutionalDossierView: React.FC = () => {
  const [lang, setLang] = useState<Language>(I18nService.language);
  const [activeDossierSection, setActiveDossierSection] = useState<'overview' | 'kpis' | 'matrix' | 'budget' | 'ethical'>('overview');

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
