import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { ChallengeView } from './components/ChallengeView';
import { PatientPathwayView } from './components/PatientPathwayView';
import { DocumentRAGView } from './components/DocumentRAGView';
import { SpecializedModulesView } from './components/SpecializedModulesView';
import { TrustCenterView } from './components/TrustCenterView';
import { GovernanceView } from './components/GovernanceView';
import { HumanReviewModal } from './components/HumanReviewModal';
import { MultilingualView } from './components/MultilingualView';
import { PublicHealthView } from './components/PublicHealthView';
import { CancerPreventionView } from './components/CancerPreventionView';
import { PatientPortalApp } from './components/PatientPortalApp';
import { UserAccountsView } from './components/UserAccountsView';
import { FieldOperationsView } from './components/FieldOperationsView';
import { InstitutionalDossierView } from './components/InstitutionalDossierView';
import { AuthService } from './services/authService';
import { AIOrchestrator } from './services/orchestrator';
import { I18nService } from './services/i18n';
import { UserRole, Language } from './types';
import { ShieldAlert, Info } from 'lucide-react';

export default function App() {
  const orchestrator = AIOrchestrator.getInstance();
  const [currentTab, setCurrentTab] = useState<string>('challenge');
  const [userRole, setUserRole] = useState<UserRole>('jury');
  const [lang, setLang] = useState<Language>(I18nService.language);

  useEffect(() => {
    const unsub = I18nService.subscribe((l) => setLang(l));
    return unsub;
  }, []);

  const t = I18nService.t();

  const pendingReviews = orchestrator.humanReviewQueue.filter((c) => c.status === 'HUMAN_REVIEW_REQUIRED').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500/20 selection:text-teal-300">
      {/* Top Bar Contract (1 Row, 3 Zones) */}
      <Navigation
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        userRole={userRole}
        setUserRole={setUserRole}
        pendingReviewCount={pendingReviews}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {currentTab === 'challenge' && <ChallengeView onNavigateToTab={setCurrentTab} />}
        {currentTab === 'pathway' && <PatientPathwayView />}
        {currentTab === 'rag' && <DocumentRAGView />}
        {currentTab === 'cancer' && <CancerPreventionView onNavigateToReviews={() => setCurrentTab('reviews')} />}
        {currentTab === 'patient-app' && (
          <PatientPortalApp
            onOpenCancerScreening={() => setCurrentTab('cancer')}
            onOpenDocuments={() => setCurrentTab('rag')}
          />
        )}
        {currentTab === 'accounts' && (
          <UserAccountsView onSessionSwitched={() => setCurrentTab('patient-app')} />
        )}
        {currentTab === 'modules' && <SpecializedModulesView />}
        {currentTab === 'terrain' && <FieldOperationsView />}
        {currentTab === 'dossier' && <InstitutionalDossierView />}
        {currentTab === 'trust' && <TrustCenterView />}
        {currentTab === 'governance' && <GovernanceView />}
        {currentTab === 'reviews' && <HumanReviewModal onClose={() => setCurrentTab('challenge')} />}
        {currentTab === 'multilingual' && <MultilingualView />}
        {currentTab === 'publichealth' && <PublicHealthView />}
        {currentTab === 'wellbeing' && <PatientPathwayView />}
      </main>

      {/* Ethical Medical Disclaimer Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="font-semibold text-slate-300">SantéNova v2.1 Challenge Edition</span>
            <span>·</span>
            <span>{t.fictional_demo}</span>
            <span>·</span>
            <span className="text-teal-400">
              {lang === 'en' ? 'Ethical AI & Grounded RAG' : 'Gouvernance Éthique & RAG Sécurisé'}
            </span>
          </div>

          <div className="text-center sm:text-right text-[11px] text-slate-500 max-w-xl">
            {t.disclaimer_footer}
          </div>
        </div>
      </footer>
    </div>
  );
}
