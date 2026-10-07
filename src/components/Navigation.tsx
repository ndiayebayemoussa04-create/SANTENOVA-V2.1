import React, { useState, useEffect } from 'react';
import { Language, UserRole } from '../types';
import { ShieldCheck, Activity, Globe, FileText } from 'lucide-react';
import { I18nService } from '../services/i18n';

interface NavigationProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  pendingReviewCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  setCurrentTab,
  userRole,
  setUserRole,
  pendingReviewCount,
}) => {
  const [lang, setLang] = useState<Language>(I18nService.language);

  useEffect(() => {
    const unsub = I18nService.subscribe((newLang) => {
      setLang(newLang);
    });
    return unsub;
  }, []);

  const t = I18nService.t();

  const handleLangChange = (newLang: Language) => {
    I18nService.setLanguage(newLang);
  };

  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentTab('challenge')}
            className="text-left group flex items-center gap-2.5 focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:border-teal-400 transition-colors">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                SantéNova
                <span className="text-xs font-normal text-teal-400">v2.1 Challenge</span>
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
          <button
            onClick={() => setCurrentTab('challenge')}
            className={`transition-colors text-left py-1 ${
              currentTab === 'challenge'
                ? 'text-teal-400 border-b-2 border-teal-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.nav_challenge}
          </button>
          <button
            onClick={() => setCurrentTab('pathway')}
            className={`transition-colors text-left py-1 ${
              currentTab === 'pathway'
                ? 'text-teal-400 border-b-2 border-teal-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.nav_pathway}
          </button>
          <button
            onClick={() => setCurrentTab('rag')}
            className={`transition-colors text-left py-1 ${
              currentTab === 'rag'
                ? 'text-teal-400 border-b-2 border-teal-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.nav_rag}
          </button>
          <button
            onClick={() => setCurrentTab('cancer')}
            className={`transition-colors text-left py-1 flex items-center gap-1.5 ${
              currentTab === 'cancer'
                ? 'text-rose-400 border-b-2 border-rose-400 font-semibold'
                : 'text-slate-400 hover:text-rose-300'
            }`}
          >
            <span>{t.nav_cancer}</span>
          </button>
          <button
            onClick={() => setCurrentTab('patient-app')}
            className={`transition-colors text-left py-1 flex items-center gap-1.5 ${
              currentTab === 'patient-app'
                ? 'text-teal-300 border-b-2 border-teal-300 font-bold'
                : 'text-teal-400/90 hover:text-teal-200'
            }`}
          >
            <span>{t.nav_patient_app}</span>
          </button>
          <button
            onClick={() => setCurrentTab('modules')}
            className={`transition-colors text-left py-1 ${
              currentTab === 'modules'
                ? 'text-teal-400 border-b-2 border-teal-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.nav_modules}
          </button>
          <button
            onClick={() => setCurrentTab('terrain')}
            className={`transition-colors text-left py-1 ${
              currentTab === 'terrain'
                ? 'text-teal-400 border-b-2 border-teal-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.nav_field_ops}
          </button>
          <button
            onClick={() => setCurrentTab('trust')}
            className={`transition-colors text-left py-1 ${
              currentTab === 'trust'
                ? 'text-teal-400 border-b-2 border-teal-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.nav_trust}
          </button>
          <button
            onClick={() => setCurrentTab('governance')}
            className={`transition-colors text-left py-1 ${
              currentTab === 'governance'
                ? 'text-teal-400 border-b-2 border-teal-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.nav_governance}
          </button>
          <button
            onClick={() => setCurrentTab('accounts')}
            className={`transition-colors text-left py-1 ${
              currentTab === 'accounts'
                ? 'text-teal-400 border-b-2 border-teal-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.nav_accounts}
          </button>
        </nav>

        {/* Zone 3: Actions + Role + Language Switcher */}
        <div className="flex items-center gap-2.5">
          {/* Official Dossier Partner Button (Word/PDF) */}
          <button
            onClick={() => setCurrentTab('dossier')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-sm ${
              currentTab === 'dossier'
                ? 'bg-teal-500 text-slate-950 shadow-teal-500/20'
                : 'text-teal-300 bg-teal-500/10 border border-teal-500/30 hover:bg-teal-500/20'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Dossier Partenaires (Word/PDF)</span>
            <span className="sm:hidden">Dossier</span>
          </button>

          {pendingReviewCount > 0 && (
            <button
              onClick={() => setCurrentTab('reviews')}
              className="relative px-2.5 py-1 text-xs font-medium text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-lg hover:bg-amber-500/20 transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.nav_human_review} ({pendingReviewCount})</span>
              <span className="sm:hidden font-mono font-bold">({pendingReviewCount})</span>
            </button>
          )}

          {/* Language Switcher : FR | WO | EN */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs font-bold font-mono">
            <button
              onClick={() => handleLangChange('fr')}
              className={`px-2 py-1 rounded transition-colors ${
                lang === 'fr' ? 'bg-teal-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
              title="Français"
            >
              FR
            </button>
            <button
              onClick={() => handleLangChange('wo')}
              className={`px-2 py-1 rounded transition-colors ${
                lang === 'wo' ? 'bg-teal-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
              title="Wolof"
            >
              WO
            </button>
            <button
              onClick={() => handleLangChange('en')}
              className={`px-2 py-1 rounded transition-colors ${
                lang === 'en' ? 'bg-teal-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
              title="English"
            >
              EN
            </button>
          </div>

          {/* Role selector */}
          <div className="hidden lg:flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs font-medium">
            <button
              onClick={() => setUserRole('jury')}
              className={`px-2 py-1 rounded transition-colors ${
                userRole === 'jury' ? 'bg-teal-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.role_jury}
            </button>
            <button
              onClick={() => setUserRole('patient')}
              className={`px-2 py-1 rounded transition-colors ${
                userRole === 'patient' ? 'bg-teal-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.role_patient}
            </button>
            <button
              onClick={() => setUserRole('clinician')}
              className={`px-2 py-1 rounded transition-colors ${
                userRole === 'clinician' ? 'bg-teal-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.role_clinician}
            </button>
            <button
              onClick={() => setUserRole('admin')}
              className={`px-2 py-1 rounded transition-colors ${
                userRole === 'admin' ? 'bg-teal-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.role_admin}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile subnavigation bar */}
      <div className="md:hidden border-t border-slate-800/80 px-4 py-2 flex items-center gap-4 overflow-x-auto text-xs whitespace-nowrap text-slate-400">
        <button
          onClick={() => setCurrentTab('dossier')}
          className={currentTab === 'dossier' ? 'text-teal-300 font-bold' : ''}
        >
          Dossier Partenaires (Word/PDF)
        </button>
        <button
          onClick={() => setCurrentTab('challenge')}
          className={currentTab === 'challenge' ? 'text-teal-400 font-semibold' : ''}
        >
          {t.nav_challenge}
        </button>
        <button
          onClick={() => setCurrentTab('patient-app')}
          className={currentTab === 'patient-app' ? 'text-teal-300 font-bold' : ''}
        >
          {t.nav_patient_app}
        </button>
        <button
          onClick={() => setCurrentTab('cancer')}
          className={currentTab === 'cancer' ? 'text-rose-400 font-semibold' : ''}
        >
          {t.nav_cancer}
        </button>
        <button
          onClick={() => setCurrentTab('pathway')}
          className={currentTab === 'pathway' ? 'text-teal-400 font-semibold' : ''}
        >
          {t.nav_pathway}
        </button>
        <button
          onClick={() => setCurrentTab('rag')}
          className={currentTab === 'rag' ? 'text-teal-400 font-semibold' : ''}
        >
          {t.nav_rag}
        </button>
        <button
          onClick={() => setCurrentTab('modules')}
          className={currentTab === 'modules' ? 'text-teal-400 font-semibold' : ''}
        >
          {t.nav_modules}
        </button>
        <button
          onClick={() => setCurrentTab('terrain')}
          className={currentTab === 'terrain' ? 'text-teal-400 font-semibold' : ''}
        >
          {t.nav_field_ops}
        </button>
        <button
          onClick={() => setCurrentTab('trust')}
          className={currentTab === 'trust' ? 'text-teal-400 font-semibold' : ''}
        >
          {t.nav_trust}
        </button>
        <button
          onClick={() => setCurrentTab('governance')}
          className={currentTab === 'governance' ? 'text-teal-400 font-semibold' : ''}
        >
          {t.nav_governance}
        </button>
        <button
          onClick={() => setCurrentTab('accounts')}
          className={currentTab === 'accounts' ? 'text-teal-400 font-semibold' : ''}
        >
          {t.nav_accounts}
        </button>
      </div>
    </header>
  );
};
