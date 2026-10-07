import React, { useState, useEffect } from 'react';
import {
  Wifi,
  WifiOff,
  Radio,
  Send,
  MessageSquare,
  PackageCheck,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Stethoscope,
  Volume2,
  RefreshCw,
  Phone,
  ThermometerSnowflake,
  Truck,
  Sparkles,
  ArrowRight,
  UserCheck,
} from 'lucide-react';
import { I18nService } from '../services/i18n';
import { VoiceService } from '../services/voiceService';
import { Language } from '../types';

export const FieldOperationsView: React.FC = () => {
  const [lang, setLang] = useState<Language>(I18nService.language);
  const [activeSubTab, setActiveSubTab] = useState<'tele-expertise' | 'stocks' | 'ussd-sms' | 'offline-sync'>('tele-expertise');

  // Offline / Connectivity State
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [offlineQueueCount, setOfflineQueueCount] = useState<number>(3);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Il y a 4 min');

  // Tele-Expertise State
  const [teleExpertiseStatus, setTeleExpertiseStatus] = useState<'draft' | 'sent' | 'answered'>('sent');
  const [specialistResponse, setSpecialistResponse] = useState<string>(
    'Poursuivre Labétalol 200mg matin et soir. Contrôle protéinurie dans 48h au poste de santé. Si tension ≥ 160/100, transfert immédiat en maternité de référence.'
  );

  // Pharmacy Stocks State
  const [oxytocinStock, setOxytocinStock] = useState<number>(4); // Critical: < 10
  const [magnesiumStock, setMagnesiumStock] = useState<number>(12);
  const [malariaRDTStock, setMalariaRDTStock] = useState<number>(38);
  const [coldChainTemp, setColdChainTemp] = useState<number>(4.2); // Celsius
  const [orderSent, setOrderSent] = useState<boolean>(false);

  // USSD / 2G Phone Simulator State
  const [ussdInput, setUssdInput] = useState<string>('#123#');
  const [ussdScreen, setUssdScreen] = useState<'menu' | 'cpn' | 'vaccin' | 'sms_sent'>('menu');
  const [lastSmsMessage, setLastSmsMessage] = useState<string | null>(null);

  useEffect(() => {
    const unsub = I18nService.subscribe((l) => setLang(l));
    return unsub;
  }, []);

  const isEn = lang === 'en';
  const isWo = lang === 'wo';

  const handleSimulateSync = () => {
    if (!isOnline) return;
    setIsSyncing(true);
    setTimeout(() => {
      setOfflineQueueCount(0);
      setIsSyncing(false);
      setLastSyncTime('À l’instant');
    }, 1200);
  };

  const handleSendTeleExpertise = () => {
    setTeleExpertiseStatus('sent');
    setTimeout(() => {
      setTeleExpertiseStatus('answered');
    }, 2000);
  };

  const handleUssdSelect = (choice: string) => {
    if (choice === '1') {
      setUssdScreen('cpn');
    } else if (choice === '2') {
      setUssdScreen('vaccin');
    } else if (choice === '3') {
      setUssdScreen('sms_sent');
      setLastSmsMessage(
        isWo
          ? 'SanteNova: Awa, bu teel sa CPN3 bi jot na ci Poste de santé. Magu yaram amul bët, demal ñu xool sa tension.'
          : 'SanteNova: Rappel CPN3 pour Awa Ndiaye au Poste de Santé. Contrôle de tension artérielle prévu ce jeudi.'
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-400 uppercase tracking-wider">
            <span>{isEn ? 'Field Healthcare & Resilience' : isWo ? 'Wér-gu-yaram ci All bi' : 'Opérations Terrain & Résilience Médicale'}</span>
            <span>·</span>
            <span>{isEn ? 'Senegal Primary Care Mesh' : isWo ? 'Poste de Santé ak Hopital' : 'Maillage Postes de Santé & CHU'}</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">
            {isEn
              ? 'Field Operations: Tele-Expertise, Drug Stocks, Offline Sync & 2G USSD'
              : isWo
              ? 'Liggeeyu All: Paj ci Sore, Garab yi, Hors-ligne ak USSD 2G'
              : 'Opérations Terrain : Télé-Expertise, Stocks d’Intrants, Hors-Ligne & USSD'}
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-4xl">
            {isEn
              ? 'Overcoming real-world barriers in remote health posts: zero internet downtime resilience, stock-out alerts for life-saving drugs, async tele-expertise, and 2G basic phone inclusion.'
              : isWo
              ? 'Doxal bu baax ci poste de santé yi: sax ci réseau bu daawul, xalaatu garab yu deñ, di wax ak doktoor bu sori ak telefon yu gën a yomb (#123#).'
              : 'Répondre aux contraintes du dernier kilomètre : fonctionnement sans Internet, prévention des ruptures de médicaments vitaux, avis spécialistes à distance et inclusion des téléphones 2G.'}
          </p>
        </div>

        {/* Global Connectivity Simulator Badge */}
        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-2 rounded-xl text-xs shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-2 transition-colors ${
                isOnline
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
              }`}
            >
              {isOnline ? <Wifi className="w-4 h-4 text-emerald-400" /> : <WifiOff className="w-4 h-4 text-rose-400" />}
              <span>{isOnline ? 'EN LIGNE (4G/Wifi)' : 'HORS-LIGNE (Coupure Réseau)'}</span>
            </button>
          </div>

          <div className="border-l border-slate-800 pl-3 space-y-0.5">
            <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
              <span>Queue locale :</span>
              <strong className={offlineQueueCount > 0 ? 'text-amber-400' : 'text-slate-200'}>
                {offlineQueueCount} dossier(s)
              </strong>
            </div>
            <button
              onClick={handleSimulateSync}
              disabled={!isOnline || isSyncing || offlineQueueCount === 0}
              className="text-[10px] text-teal-400 hover:text-teal-300 flex items-center gap-1 disabled:opacity-40"
            >
              <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Synchronisation...' : 'Synchroniser'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto text-sm">
        <button
          onClick={() => setActiveSubTab('tele-expertise')}
          className={`px-3.5 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeSubTab === 'tele-expertise'
              ? 'bg-teal-500 text-slate-950 font-bold shadow-lg shadow-teal-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Stethoscope className="w-4 h-4" />
          <span>{isEn ? '1. Async Tele-Expertise' : isWo ? '1. Paj ci Sore' : '1. Télé-Expertise Asynchrone'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('stocks')}
          className={`px-3.5 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeSubTab === 'stocks'
              ? 'bg-rose-500 text-slate-950 font-bold shadow-lg shadow-rose-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <PackageCheck className="w-4 h-4" />
          <span>{isEn ? '2. Vital Drug Stocks & Cold Chain' : isWo ? '2. Garab yi ak Frigo' : '2. Stocks d’Intrants & Chaîne du Froid'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('ussd-sms')}
          className={`px-3.5 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeSubTab === 'ussd-sms'
              ? 'bg-indigo-500 text-slate-950 font-bold shadow-lg shadow-indigo-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Phone className="w-4 h-4" />
          <span>{isEn ? '3. 2G Basic Phone / USSD (#123#)' : isWo ? '3. Telefon 2G / #123#' : '3. Passerelle 2G USSD (#123#) & SMS'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('offline-sync')}
          className={`px-3.5 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeSubTab === 'offline-sync'
              ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Radio className="w-4 h-4" />
          <span>{isEn ? '4. Offline-First Architecture' : isWo ? '4. Doxal Hors-ligne' : '4. Architecture Offline-First'}</span>
        </button>
      </div>

      {/* 1. TÉLÉ-EXPERTISE ASYNCHRONE */}
      {activeSubTab === 'tele-expertise' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500/10 text-teal-300 border border-teal-500/30 uppercase tracking-wider">
                  Poste de Santé ➔ Hôpital de District
                </span>
                <span className="text-xs text-slate-400 font-mono">TLX-MSR-2026</span>
              </div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mt-1">
                <Stethoscope className="w-5 h-5 text-teal-400" />
                <span>Télé-Expertise Médicale : Avis du Gynécologue à Distance</span>
              </h3>
              <p className="text-xs text-slate-400">
                La Sage-femme d'État (Fatou Sow, Poste de Ndiaganiao) consulte le Dr. Mamadou Ba (Gynécologue-Obstétricien, Hôpital Régional de Thiès).
              </p>
            </div>
            <div className="px-3 py-1 bg-teal-500/10 text-teal-300 border border-teal-500/30 rounded-lg text-xs font-semibold">
              RÉSUMÉ CLINIQUE GÉNÉRÉ PAR L'IA SANS RESSAISIE
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Colonne Gauche : Requête de la Sage-femme */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center font-bold text-rose-300">
                    FS
                  </div>
                  <div>
                    <div className="font-bold text-white">Sage-femme Fatou Sow</div>
                    <div className="text-[11px] text-slate-400">Poste de Santé de Ndiaganiao (Zone Rurale)</div>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-slate-400">10:42 UTC</span>
              </div>

              {/* Synthèse IA du dossier */}
              <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center gap-1.5 text-teal-400 font-semibold text-[11px]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Synthèse Automatique IA du Dossier Transmis :</span>
                </div>
                <ul className="space-y-1 text-slate-300 leading-relaxed">
                  <li>• <strong>Patiente :</strong> Awa Ndiaye (42 ans), G3P2, terme actuel <strong>26 SA</strong>.</li>
                  <li>• <strong>Constantes du jour :</strong> TA = 145/95 mmHg (mesurée 2x au repos). Pouls = 82 bpm.</li>
                  <li>• <strong>Signes fonctionnels :</strong> Céphalées modérées, pas de phosphènes ni barre épigastrique.</li>
                  <li>• <strong>Bandelette urinaire :</strong> Protéinurie traces (0.3 g/L). Pas de glycosurie.</li>
                  <li>• <strong>Traitement envisagé :</strong> Début de Labétalol 200mg ? Demande de validation.</li>
                </ul>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-400 text-[11px]">Délai maximal de réponse garanti : &lt; 30 minutes</span>
                <button
                  onClick={handleSendTeleExpertise}
                  disabled={teleExpertiseStatus === 'answered'}
                  className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-slate-950 rounded-lg font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{teleExpertiseStatus === 'answered' ? 'Demande Traitée' : 'Envoyer la Demande'}</span>
                </button>
              </div>
            </div>

            {/* Colonne Droite : Réponse du Spécialiste */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center font-bold text-blue-300">
                    MB
                  </div>
                  <div>
                    <div className="font-bold text-white">Dr. Mamadou Ba (Gynécologue-Obstétricien)</div>
                    <div className="text-[11px] text-slate-400">Hôpital Régional de Thiès · Service Maternité</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                  AVIS MÉDICAL CERTIFIÉ
                </span>
              </div>

              <div className="p-4 rounded-lg bg-blue-950/30 border border-blue-500/30 space-y-2">
                <div className="font-semibold text-blue-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Protocole Validé par le Spécialiste :</span>
                </div>
                <p className="text-slate-200 leading-relaxed font-sans text-xs">
                  {specialistResponse}
                </p>
                <div className="pt-2 text-[11px] text-blue-400 font-mono">
                  Signature Électronique SHA-256 : <span className="text-slate-300">dr-ba-thies-89a19c</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() =>
                    VoiceService.speak(
                      specialistResponse,
                      'fr'
                    )
                  }
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-lg flex items-center gap-1.5"
                >
                  <Volume2 className="w-3.5 h-3.5 text-teal-400" />
                  <span>Écouter l'avis audio du Dr. Ba</span>
                </button>

                <span className="text-slate-400 text-[11px]">Ordonnance numérique injectée dans le carnet d'Awa</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. GESTION DES STOCKS D'INTRANTS VITAUX */}
      {activeSubTab === 'stocks' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/10 text-rose-300 border border-rose-500/30 uppercase tracking-wider">
                  Pharmacie Régionale d'Approvisionnement (PRA)
                </span>
                <span className="text-xs text-slate-400 font-mono">STOCK-SMI-SAFE</span>
              </div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mt-1">
                <PackageCheck className="w-5 h-5 text-rose-400" />
                <span>Stocks d’Intrants Vitaux & Surveillance de la Chaîne du Froid</span>
              </h3>
              <p className="text-xs text-slate-400">
                Alerte de réapprovisionnement automatique pour éviter les ruptures fatales (hémorragie de la délivrance et éclampsie).
              </p>
            </div>
            <div className="px-3 py-1 bg-rose-500/10 text-rose-300 border border-rose-500/30 rounded-lg text-xs font-semibold">
              RÈGLE D'OR : ZÉRO RUPTURE SUR L'OCYTOCINE & SULFATE MG
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {/* Intrant 1: Ocytocine (Alerte critique) */}
            <div className="p-4 rounded-xl bg-slate-950 border border-rose-500/50 space-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-rose-500 text-slate-950 text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider">
                STOCK CRITIQUE
              </div>
              <span className="text-slate-400 block font-semibold">Ocytocine 10 UI (Ampoules)</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold font-mono text-rose-400">{oxytocinStock}</span>
                <span className="text-slate-500">/ 20 requises</span>
              </div>
              <p className="text-rose-200 text-[11px]">
                Indispensable pour prévenir l'hémorragie du post-partum. Réapprovisionnement prioritaire requis.
              </p>
              <button
                onClick={() => setOxytocinStock(oxytocinStock + 15)}
                className="w-full mt-2 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded-lg font-bold text-[11px]"
              >
                + Simuler Dotation Urgence (+15)
              </button>
            </div>

            {/* Intrant 2: Sulfate de Magnésium */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-slate-400 block font-semibold">Sulfate de Magnésium 50%</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold font-mono text-emerald-400">{magnesiumStock}</span>
                <span className="text-slate-500">flacons</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Traitement et prévention des convulsions d'éclampsie. Seuil sécurisé.
              </p>
            </div>

            {/* Intrant 3: TDR Paludisme & CTA */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-slate-400 block font-semibold">TDR Paludisme (Pf/Pan)</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold font-mono text-teal-400">{malariaRDTStock}</span>
                <span className="text-slate-500">kits actifs</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Dépistage systématique en saison d'hivernage et pour toute fièvre inexpliquée.
              </p>
            </div>

            {/* Intrant 4: Chaîne du froid Vaccins */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-semibold">Frigo Solaire PEV</span>
                <ThermometerSnowflake className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold font-mono text-cyan-300">{coldChainTemp.toFixed(1)}°C</span>
                <span className="text-emerald-400 font-bold text-[11px]">✓ Normal</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Norme OMS : 2.0°C à 8.0°C en continu. Alerte SMS si rupture thermique &gt; 2 heures.
              </p>
            </div>
          </div>

          {/* Action Commande PRA */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-teal-400 shrink-0" />
              <div className="text-slate-300">
                Liaison directe avec le camion de ravitaillement du District de Thiès : bon de commande dématérialisé conforme au format du Ministère de la Santé.
              </div>
            </div>

            <button
              onClick={() => setOrderSent(true)}
              disabled={orderSent}
              className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 shrink-0 ${
                orderSent
                  ? 'bg-emerald-600 text-white'
                  : 'bg-rose-500 hover:bg-rose-600 text-slate-950'
              }`}
            >
              <span>{orderSent ? 'Bon de Commande #PRA-849 Transmis' : 'Commander Réapprovisionnement Ocytocine'}</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. PASSERELLE 2G USSD (#123#) & SMS */}
      {activeSubTab === 'ussd-sms' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
                  Inclusion Numérique 2G
                </span>
                <span className="text-xs text-slate-400 font-mono">GATEWAY-USSD-SMS</span>
              </div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mt-1">
                <Phone className="w-5 h-5 text-indigo-400" />
                <span>Passerelle Téléphonie 2G : Service USSD (#123#) & SMS Vocaux</span>
              </h3>
              <p className="text-xs text-slate-400">
                Permettre aux femmes et familles ne possédant pas de smartphone de suivre leur grossesse et leurs vaccins.
              </p>
            </div>
            <div className="px-3 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 rounded-lg text-xs font-semibold">
              ACCESSIBLE SANS INTERNET NI SMARTPHONE
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Simulateur Téléphone 2G / Clavier Nokia */}
            <div className="flex justify-center">
              <div className="w-72 bg-slate-900 border-4 border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4">
                <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
                  <span>Orange / Free SN</span>
                  <span>🔋 92%</span>
                </div>

                {/* Écran LCD Vert Rétro */}
                <div className="bg-emerald-950/80 border-2 border-emerald-700/60 rounded-xl p-4 font-mono text-emerald-300 text-xs min-h-[170px] space-y-2 shadow-inner">
                  {ussdScreen === 'menu' && (
                    <>
                      <div className="font-bold border-b border-emerald-800/80 pb-1 text-center">
                        SantéNova Sénégal (#123#)
                      </div>
                      <div className="space-y-1 text-[11px]">
                        <div>1. Sama CPN (Grossesse)</div>
                        <div>2. Ñakk Doom (Vaccins)</div>
                        <div>3. Recevoir SMS Conseil (Wolof)</div>
                      </div>
                      <div className="pt-2 text-[10px] text-emerald-400 text-center">
                        Tapez 1, 2 ou 3 :
                      </div>
                    </>
                  )}

                  {ussdScreen === 'cpn' && (
                    <>
                      <div className="font-bold text-[11px] text-center">CPN3 Awa Ndiaye</div>
                      <p className="text-[10px] leading-relaxed">
                        CPN3 programmée le 16/10 à 09h au Poste de Ndiaganiao. Apportez votre carnet.
                      </p>
                      <button
                        onClick={() => setUssdScreen('menu')}
                        className="text-[10px] underline block text-center pt-2 text-emerald-400"
                      >
                        0. Retour Menu
                      </button>
                    </>
                  )}

                  {ussdScreen === 'vaccin' && (
                    <>
                      <div className="font-bold text-[11px] text-center">Vaccination PEV Bébé</div>
                      <p className="text-[10px] leading-relaxed">
                        Prochain rappel : Rougeole-Rubéole (9 mois). Tout est gratuit au poste.
                      </p>
                      <button
                        onClick={() => setUssdScreen('menu')}
                        className="text-[10px] underline block text-center pt-2 text-emerald-400"
                      >
                        0. Retour Menu
                      </button>
                    </>
                  )}

                  {ussdScreen === 'sms_sent' && (
                    <>
                      <div className="font-bold text-[11px] text-center text-white">SMS Envoyé ! ✓</div>
                      <p className="text-[10px] leading-relaxed text-emerald-200">
                        {lastSmsMessage}
                      </p>
                      <button
                        onClick={() => setUssdScreen('menu')}
                        className="text-[10px] underline block text-center pt-2 text-emerald-400"
                      >
                        0. Retour Menu
                      </button>
                    </>
                  )}
                </div>

                {/* Pavé Numérique 2G */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold font-mono">
                  <button onClick={() => handleUssdSelect('1')} className="p-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg">1</button>
                  <button onClick={() => handleUssdSelect('2')} className="p-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg">2</button>
                  <button onClick={() => handleUssdSelect('3')} className="p-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg">3</button>
                  <button className="p-2.5 bg-slate-800 text-slate-400 rounded-lg">4</button>
                  <button className="p-2.5 bg-slate-800 text-slate-400 rounded-lg">5</button>
                  <button className="p-2.5 bg-slate-800 text-slate-400 rounded-lg">6</button>
                  <button className="p-2.5 bg-slate-800 text-slate-400 rounded-lg">7</button>
                  <button className="p-2.5 bg-slate-800 text-slate-400 rounded-lg">8</button>
                  <button className="p-2.5 bg-slate-800 text-slate-400 rounded-lg">9</button>
                  <button onClick={() => setUssdScreen('menu')} className="p-2.5 bg-rose-500/20 text-rose-300 rounded-lg text-[10px]">C</button>
                  <button onClick={() => setUssdScreen('menu')} className="p-2.5 bg-slate-800 text-white rounded-lg">0</button>
                  <button onClick={() => setUssdScreen('menu')} className="p-2.5 bg-emerald-500/20 text-emerald-300 rounded-lg text-[10px]">OK</button>
                </div>
              </div>
            </div>

            {/* Explications & Déclenchement Audio */}
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-bold text-indigo-300 uppercase tracking-wider block text-[11px]">
                  Comment ça fonctionne pour une maman rurale ?
                </span>
                <p className="text-slate-300 leading-relaxed">
                  Sans forfait data ni connexion Internet, la patiente compose simplement le code USSD <strong>#123#</strong> sur son téléphone à touches. Elle peut immédiatement écouter un message vocal en Wolof ou recevoir un SMS de rappel pour sa consultation prénatale ou la pesée de son enfant.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="font-bold text-white block">Écouter le message SMS vocal délivré en Wolof :</span>
                <div className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-800/40 text-indigo-200 italic leading-relaxed">
                  « Nanga def Awa. Fatéli bu am solo : suba ci subatèl war nga ñëw ci poste de santé bi ngir sa CPN3. Di nañu xool sa tension ak sa liir. Jërajëf. »
                </div>

                <button
                  onClick={() =>
                    VoiceService.speak(
                      'Nanga def Awa. Fatéli bu am solo : suba ci subatèl war nga ñëw ci poste de santé bi ngir sa CPN3. Di nañu xool sa tension ak sa liir. Jërajëf.',
                      'wo'
                    )
                  }
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold flex items-center gap-2 transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Écouter le Message Vocal Wolof (SVI 2G)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. ARCHITECTURE OFFLINE-FIRST */}
      {activeSubTab === 'offline-sync' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                  Store-and-Forward Engine
                </span>
                <span className="text-xs text-slate-400 font-mono">PWA-INDEXEDDB-V2</span>
              </div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mt-1">
                <Radio className="w-5 h-5 text-emerald-400" />
                <span>Architecture Offline-First : Continuité des Soins en Zone Blanche</span>
              </h3>
              <p className="text-xs text-slate-400">
                Garantir que le travail soignant n'est jamais interrompu, même en cas de panne électrique ou de coupure réseau de 48 heures.
              </p>
            </div>
            <div className="px-3 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-semibold">
              CHIFFREMENT LOCAL AES-256 SUR L'APPAREIL
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <Radio className="w-4 h-4" />
                <span>1. Stockage Local IndexedDB</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Toutes les saisies de consultations, tensions, doses de vaccins et partogrammes sont enregistrées instantanément dans la base locale chiffrée de la tablette ou du smartphone.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <Clock className="w-4 h-4" />
                <span>2. File d'Attente Store-and-Forward</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Chaque enregistrement génère un ID transactionnel horodaté immuable. Les conflits éventuels de synchronisation sont arbitrés selon la règle de priorité clinique la plus récente.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-teal-400 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <RefreshCw className="w-4 h-4" />
                <span>3. Synchronisation Delta Légère</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Dès qu'une antenne relais 2G/3G ou un point Wi-Fi est capté, le protocole n'envoie que les deltas binaires compressés pour économiser la batterie et le forfait data du poste de santé.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
