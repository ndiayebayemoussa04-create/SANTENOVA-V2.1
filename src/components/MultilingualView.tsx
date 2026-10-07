import React, { useState, useEffect } from 'react';
import { Languages, Volume2, VolumeX, Smartphone, MessageSquare, Radio, Check, Info } from 'lucide-react';
import { VoiceService } from '../services/voiceService';
import { I18nService } from '../services/i18n';

export const MultilingualView: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<'fr' | 'wo' | 'en'>(I18nService.language);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [channelMode, setChannelMode] = useState<'app' | 'sms' | 'ussd'>('app');

  useEffect(() => {
    const unsub = I18nService.subscribe((l) => setSelectedLang(l));
    return unsub;
  }, []);

  const contentMap = {
    fr: {
      title: 'Comprendre votre santé simplement',
      subtitle: 'Explication pédagogique en français clair',
      tension:
        'Votre cœur fonctionne très bien (force de pompe à 62%). Votre tension est un peu au-dessus de l’objectif (142/88). Le médicament Amlodipine du matin permet d’assouplir vos artères. Le médecin a prévu un enregistrement de 24h (la MAPA) pour vérifier que votre tension descend bien la nuit.',
      cholesterol:
        'Le mauvais cholestérol (LDL à 1.62 g/L) a besoin d’être réduit pour protéger vos vaisseaux sur le long terme. Le médicament Atorvastatine du soir aide votre foie à éliminer les graisses.',
      audioLabel: 'Écouter la synthèse vocale en français',
    },
    wo: {
      title: 'Xam sa wér-gu-yaram ci Wolof bu leer',
      subtitle: 'Tontu yi ak leeral yi ci kàllaama Wolof',
      tension:
        'Sa xol mi ngi dëbb bu baax (62%). Waaye tansiyoŋ bi dafa yéeg tuuti (142/88). Garab bi nga di jël suba ci ndekki (Amlodipine) dafay noppal yooni deret yi. Doktoor bi sant na la nga takk ab aparay buy natt tansiyoŋ bi 24 waxtu (MAPA) ngir xool ni mu mel ci guddi.',
      cholesterol:
        'Kolesterol bi (graas yi ci deret ji, LDL 1.62 g/L) dafa war a wàcc ngir baña loraal sa yaram. Garab bi nga di jël ci guddi (Atorvastatine) day jàppale sa yaram mu génne graas yooyu.',
      audioLabel: 'Déglul leeral gi ci kàddug Wolof',
    },
    en: {
      title: 'Clear health information in plain English',
      subtitle: 'Patient-friendly summary for bilingual clarity',
      tension:
        'Your heart pump function is very healthy (LVEF at 62%). Your blood pressure is slightly above target (142/88 mmHg). Your morning pill (Amlodipine) helps relax your blood vessels. The 24-hour monitor (ABPM/MAPA) will check your blood pressure while you sleep.',
      cholesterol:
        'Your LDL cholesterol is 1.62 g/L, which requires lowering to protect your arteries long-term. Your evening medication (Atorvastatin) assists your body in managing cholesterol.',
      audioLabel: 'Listen to clear English audio summary',
    },
  };

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      VoiceService.stop();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      const textToSpeak = `${contentMap[selectedLang].title}. ${contentMap[selectedLang].tension} ${contentMap[selectedLang].cholesterol}`;
      VoiceService.speak(textToSpeak, selectedLang, () => {
        setIsPlayingAudio(false);
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-400 uppercase tracking-wider">
            <span>Inclusion & Accessibilité Linguistique</span>
            <span>·</span>
            <span>Afrique de l’Ouest & Diaspora</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Communication Multilingue : Français, Wolof & Anglais</h2>
          <p className="text-sm text-slate-400">
            Élimination des barrières de compréhension : synthèse adaptée en Wolof authentique et formats compatibles
            smartphone, SMS ou USSD pour les zones à faible connectivité.
          </p>
        </div>

        {/* Language Selector */}
        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
          <button
            onClick={() => setSelectedLang('wo')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              selectedLang === 'wo' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Wolof (Sénégal)
          </button>
          <button
            onClick={() => setSelectedLang('fr')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              selectedLang === 'fr' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Français
          </button>
          <button
            onClick={() => setSelectedLang('en')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              selectedLang === 'en' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            English
          </button>
        </div>
      </div>

      {/* Main Multilingual Content Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-xl font-bold text-white">{contentMap[selectedLang].title}</h3>
            <p className="text-xs text-teal-400">{contentMap[selectedLang].subtitle}</p>
          </div>

          {/* Audio Synthesizer */}
          <button
            onClick={handleToggleAudio}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              isPlayingAudio
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : 'bg-teal-500/10 text-teal-300 border border-teal-500/30 hover:bg-teal-500/20'
            }`}
          >
            {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isPlayingAudio ? 'Arrêter la lecture' : contentMap[selectedLang].audioLabel}</span>
          </button>
        </div>

        {/* Simulated Waveform while playing */}
        {isPlayingAudio && (
          <div className="p-3 bg-slate-950 rounded-xl border border-teal-500/30 flex items-center justify-center gap-1.5">
            <div className="w-1.5 h-6 bg-teal-400 animate-pulse rounded-full" />
            <div className="w-1.5 h-10 bg-teal-400 animate-pulse delay-75 rounded-full" />
            <div className="w-1.5 h-4 bg-teal-400 animate-pulse delay-150 rounded-full" />
            <div className="w-1.5 h-8 bg-teal-400 animate-pulse delay-100 rounded-full" />
            <div className="w-1.5 h-12 bg-teal-400 animate-pulse delay-200 rounded-full" />
            <div className="w-1.5 h-5 bg-teal-400 animate-pulse delay-75 rounded-full" />
            <span className="text-xs text-teal-300 font-mono ml-3">Synthèse vocale active · Débit adapté</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {selectedLang === 'wo' ? 'Tansiyoŋ ak Xol bi' : selectedLang === 'fr' ? 'La Tension et le Cœur' : 'Blood Pressure & Heart'}
            </div>
            <p className="text-sm text-slate-200 leading-relaxed font-sans">{contentMap[selectedLang].tension}</p>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {selectedLang === 'wo' ? 'Kolesterol ak Garab yi' : selectedLang === 'fr' ? 'Le Cholestérol et les Médicaments' : 'Cholesterol & Medications'}
            </div>
            <p className="text-sm text-slate-200 leading-relaxed font-sans">{contentMap[selectedLang].cholesterol}</p>
          </div>
        </div>
      </div>

      {/* Multichannel Distribution: Web App vs SMS vs USSD */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Radio className="w-4 h-4 text-teal-400" />
              <span>Multi-Canal & Zones à Connectivité Limitée (Offline / SMS / USSD)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Règle stricte de confidentialité : aucune donnée clinique sensible n’est transmise en clair par SMS ou USSD.
            </p>
          </div>

          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-1 text-xs">
            <button
              onClick={() => setChannelMode('app')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                channelMode === 'app' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              App Web Sécurisée
            </button>
            <button
              onClick={() => setChannelMode('sms')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                channelMode === 'sms' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              SMS Conforme
            </button>
            <button
              onClick={() => setChannelMode('ussd')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                channelMode === 'ussd' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Menu USSD (#221*)
            </button>
          </div>
        </div>

        {/* Channel Preview Display */}
        {channelMode === 'sms' && (
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 max-w-lg">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-white">Aperçu SMS reçu par Awa :</span>
              <span className="text-[11px] font-mono text-teal-400">Minimisation RGPD / HDS</span>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono text-slate-200">
              « SantéNova : Mme Ndiaye, rappel de votre RDV cardiologique le 14/03 à 10h. Pensez à apporter votre carnet
              d'auto-mesure. Accès sécurisé : santenova.sn »
            </div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              <span>Conforme : aucun détail diagnostique ou posologique exposé en clair par SMS.</span>
            </div>
          </div>
        )}

        {channelMode === 'ussd' && (
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 max-w-lg">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-white">Menu USSD Interactif (Téléphone basique 2G/3G) :</span>
              <span className="text-[11px] font-mono text-amber-400">Code #221#</span>
            </div>
            <pre className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono text-slate-200 whitespace-pre">
{`SANTENOVA SERVICE DE SANTE
1. Samay Rendez-vous (Mes RDV)
2. Garab yi (Rappels de prise)
3. Numéro Urgence (1515)
4. Xam sa tansiyoŋ (Conseils tension)`}
            </pre>
            <div className="text-[11px] text-slate-400">
              Permet l'accès aux consignes même sans Internet ni smartphone.
            </div>
          </div>
        )}

        {channelMode === 'app' && (
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
            L'application web offre le chiffrement de bout en bout, le rendu audio haute fidélité et la consultation
            interactive du dossier avec validation en temps réel.
          </div>
        )}
      </div>
    </div>
  );
};
