import React, { useState, useEffect } from 'react';
import { VoiceService, VoiceState } from '../services/voiceService';
import { I18nService } from '../services/i18n';
import { Language } from '../types';
import { Volume2, VolumeX, Sparkles, Mic, AlertCircle } from 'lucide-react';

interface VoiceAssistantWidgetProps {
  patientName?: string;
}

export const VoiceAssistantWidget: React.FC<VoiceAssistantWidgetProps> = ({ patientName = 'Awa Ndiaye' }) => {
  const [voiceState, setVoiceState] = useState<VoiceState>(VoiceService.state);
  const [lang, setLang] = useState<Language>(I18nService.language);

  useEffect(() => {
    const unsubVoice = VoiceService.subscribe((state) => {
      setVoiceState(state);
    });
    const unsubLang = I18nService.subscribe((l) => setLang(l));
    return () => {
      unsubVoice();
      unsubLang();
    };
  }, []);

  const t = I18nService.t();

  const handleSpeakMedications = () => {
    if (lang === 'en') {
      VoiceService.speak(
        "Hello Awa. Your medications today are: Amlodipine 5 milligrams in the morning with breakfast to manage your arterial blood pressure, and Atorvastatin 10 milligrams in the evening at bedtime to regulate your cholesterol. Remember to drink a full glass of water.",
        'en'
      );
    } else if (lang === 'wo') {
      VoiceService.speak(
        "Nanga def Awa. Sa garab yi tey : Amlodipine 5 mg ci suba ci ndekki ngir sa tansiyoŋ, ak Atorvastatine 10 mg ci guddi ci tëdd ngir kolesterol bi. Naanall ndox mu bari.",
        'wo'
      );
    } else {
      VoiceService.speak(
        "Bonjour Awa. Vos médicaments d'aujourd'hui sont : Amlodipine 5 milligrammes le matin au petit-déjeuner pour protéger votre tension artérielle, et Atorvastatine 10 milligrammes le soir au coucher pour réguler votre cholestérol. N'oubliez pas de boire un grand verre d'eau.",
        'fr'
      );
    }
  };

  const handleSpeakBloodPressure = () => {
    if (lang === 'en') {
      VoiceService.speak(
        "Your latest blood pressure reading is 138 over 84. It is well stabilized compared to 142 last week. Continue your daily walking routine and your efforts to reduce dietary salt.",
        'en'
      );
    } else if (lang === 'wo') {
      VoiceService.speak(
        "Sa tansiyoŋ mi ngi wàcc tuuti, mi ngi ci 138 ci 84. Mi ngi gëna baax. Kontinéel di dox ci ngone yi te wàññi xorom ci ñam yi.",
        'wo'
      );
    } else {
      VoiceService.speak(
        "Votre dernière mesure tensionnelle est de 138 sur 84. Elle est bien stabilisée par rapport aux 142 de la semaine passée. Continuez votre marche quotidienne et vos efforts sur la réduction du sel.",
        'fr'
      );
    }
  };

  const handleSpeakWolof = () => {
    VoiceService.speak(
      "Dalal ak jàmm Awa. Sa tansiyoŋ mi ngi wàcc tuuti, mi ngi ci 138 ci 84. Bul fàtte jël sa garab suba ak ngoon, te nga kontiné dox tuuti ci ngone yi. Sa wér-gu-yaram dafa am solo lool.",
      'wo'
    );
  };

  const handleSpeakEmergency = () => {
    if (lang === 'en') {
      VoiceService.speak(
        "In case of unusual severe headaches, blurred vision, or chest pain, immediately seek emergency assistance by dialing 911 in North America, 15 in France, or 15 15 in Senegal.",
        'en'
      );
    } else if (lang === 'wo') {
      VoiceService.speak(
        "Su sa bopp métee lool ci anam bu yéeme, mbaa gisu loo bu baax mbaa dën bi metti, woyal gaaw 1515 ci Senegaal ngir ñu jàppale la ci sàas si.",
        'wo'
      );
    } else {
      VoiceService.speak(
        "En cas de maux de tête violents inhabituels, de troubles de la vue ou de douleur dans la poitrine, contactez immédiatement les secours en composant le 15 en France ou le 15 15 au Sénégal.",
        'fr'
      );
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <Volume2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider">
              {t.voice_assistant_title}
            </div>
            <div className="text-sm font-bold text-white">{t.voice_assistant_sub}</div>
          </div>
        </div>

        {voiceState.isSpeaking && (
          <button
            onClick={() => VoiceService.stop()}
            className="px-3 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <VolumeX className="w-3.5 h-3.5" />
            <span>{t.voice_stop_btn}</span>
          </button>
        )}
      </div>

      {/* Dynamic Sound Waveform Visualizer */}
      {voiceState.isSpeaking && (
        <div className="p-3 bg-slate-950 rounded-xl border border-teal-500/30 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-1 h-4 bg-teal-400 animate-pulse rounded-full" />
            <div className="w-1 h-7 bg-teal-400 animate-pulse delay-75 rounded-full" />
            <div className="w-1 h-3 bg-teal-400 animate-pulse delay-150 rounded-full" />
            <div className="w-1 h-6 bg-teal-400 animate-pulse delay-100 rounded-full" />
            <div className="w-1 h-8 bg-teal-400 animate-pulse delay-200 rounded-full" />
            <div className="w-1 h-4 bg-teal-400 animate-pulse delay-75 rounded-full" />
          </div>
          <div className="truncate text-slate-300 italic font-sans flex-1 ml-2">
            « {voiceState.currentText} »
          </div>
        </div>
      )}

      {/* Quick Audio Actions */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={handleSpeakMedications}
          className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 text-xs font-medium transition-colors flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-teal-400" />
          <span>{t.voice_meds_btn}</span>
        </button>

        <button
          onClick={handleSpeakBloodPressure}
          className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 text-xs font-medium transition-colors flex items-center gap-1.5"
        >
          <Volume2 className="w-3.5 h-3.5 text-blue-400" />
          <span>{t.voice_bp_btn}</span>
        </button>

        <button
          onClick={handleSpeakWolof}
          className="px-3 py-1.5 rounded-lg bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold transition-colors flex items-center gap-1.5"
        >
          <Volume2 className="w-3.5 h-3.5 text-teal-400" />
          <span>{t.voice_wolof_btn}</span>
        </button>

        <button
          onClick={handleSpeakEmergency}
          className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-medium transition-colors flex items-center gap-1.5 ml-auto"
        >
          <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
          <span>{t.voice_emergency_btn}</span>
        </button>
      </div>
    </div>
  );
};

