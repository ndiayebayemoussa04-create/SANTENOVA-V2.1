import React, { useState, useEffect } from 'react';
import { AuthService } from '../services/authService';
import { VoiceAssistantWidget } from './VoiceAssistantWidget';
import { mockPatientAwaNdiaye } from '../data/mockPatient';
import { I18nService } from '../services/i18n';
import { Language } from '../types';
import {
  Heart,
  Pill,
  Calendar,
  CheckCircle2,
  Clock,
  PhoneCall,
  Activity,
  Plus,
  AlertTriangle,
  FileText,
  UserCheck,
  Languages,
  QrCode,
  Printer,
  Download,
  ShieldCheck,
  Smartphone,
  Tablet,
  Monitor,
  Wifi,
  Share2,
  ExternalLink,
  Laptop,
  Check,
  Layers,
  Sparkles,
  Info,
} from 'lucide-react';

interface PatientPortalAppProps {
  onOpenCancerScreening: () => void;
  onOpenDocuments: () => void;
}

export const PatientPortalApp: React.FC<PatientPortalAppProps> = ({
  onOpenCancerScreening,
  onOpenDocuments,
}) => {
  const auth = AuthService.getInstance();
  const [medLogs, setMedLogs] = useState([...auth.medicationLogs]);
  const [bpLogs, setBpLogs] = useState([...auth.bloodPressureLogs]);
  const [currentLang, setCurrentLang] = useState<Language>(I18nService.language);

  // Multi-Device & PWA installation state
  const [showDeviceSetupModal, setShowDeviceSetupModal] = useState<boolean>(false);
  const [deviceTab, setDeviceTab] = useState<'mobile' | 'tablet' | 'desktop' | 'network'>('mobile');
  const [deviceSimMode, setDeviceSimMode] = useState<'full' | 'mobile_sim' | 'tablet_sim'>('full');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [canInstallPWA, setCanInstallPWA] = useState<boolean>(false);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstallPWA(true);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          setCanInstallPWA(false);
        }
        setDeferredPrompt(null);
      } catch (err) {
        setShowDeviceSetupModal(true);
      }
    } else {
      setShowDeviceSetupModal(true);
    }
  };

  useEffect(() => {
    const unsub = I18nService.subscribe((l) => setCurrentLang(l));
    return unsub;
  }, []);

  const t = I18nService.t();

  // Form for recording new blood pressure
  const [newSystole, setNewSystole] = useState<number>(135);
  const [newDiastole, setNewDiastole] = useState<number>(82);
  const [newPulse, setNewPulse] = useState<number>(72);
  const [newPeriod, setNewPeriod] = useState<'MATIN' | 'SOIR'>('MATIN');
  const [newNotes, setNewNotes] = useState<string>('');
  const [showAddBpModal, setShowAddBpModal] = useState<boolean>(false);
  const [showEmergencyCard, setShowEmergencyCard] = useState<boolean>(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  const handleToggleMed = (id: string) => {
    auth.toggleMedicationIntake(id);
    setMedLogs([...auth.medicationLogs]);
  };

  const handleSaveBp = (e: React.FormEvent) => {
    e.preventDefault();
    auth.addBloodPressureLog(newSystole, newDiastole, newPulse, newPeriod, newNotes);
    setBpLogs([...auth.bloodPressureLogs]);
    setShowAddBpModal(false);
    setNewNotes('');
    setSyncFeedback(
      currentLang === 'en'
        ? 'Reading saved and synced to Dr. Fall medical chart.'
        : currentLang === 'wo'
        ? 'Denc nañu natt bi te yóbb nañu ko ba Doktoor Fall.'
        : 'Mesure enregistrée et synchronisée avec le dossier médical du Dr. Fall.'
    );
    setTimeout(() => setSyncFeedback(null), 4000);
  };

  const containerClasses =
    deviceSimMode === 'mobile_sim'
      ? 'max-w-[420px] mx-auto border-[6px] border-slate-700/80 rounded-[2.5rem] p-4 shadow-2xl bg-slate-950 my-6 transition-all ring-8 ring-slate-900/40'
      : deviceSimMode === 'tablet_sim'
      ? 'max-w-[820px] mx-auto border-4 border-slate-700/80 rounded-3xl p-5 shadow-2xl bg-slate-950 my-6 transition-all ring-8 ring-slate-900/40'
      : 'max-w-5xl mx-auto px-4 sm:px-6 py-6 transition-all';

  return (
    <div className="py-2">
      {/* Top Banner: Multi-Device & PWA Installer Controls */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-6">
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950/50 border border-teal-500/30 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Accès Multi-Appareils (PWA)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  SMARTPHONE · TABLETTE · PC
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Application installable en 1 clic sans passer par un store. Fonctionne 100% hors-ligne sur le Wi-Fi de l'hôpital ou à domicile.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
            {/* Device Simulator Toggle */}
            <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1 text-xs">
              <button
                onClick={() => setDeviceSimMode('full')}
                className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors ${
                  deviceSimMode === 'full' ? 'bg-slate-800 text-teal-300 font-bold shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
                title="Aperçu écran PC standard"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">PC / Plein Écran</span>
              </button>
              <button
                onClick={() => setDeviceSimMode('tablet_sim')}
                className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors ${
                  deviceSimMode === 'tablet_sim' ? 'bg-slate-800 text-teal-300 font-bold shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
                title="Aperçu Tablette (iPad / Android Tab)"
              >
                <Tablet className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Tablette</span>
              </button>
              <button
                onClick={() => setDeviceSimMode('mobile_sim')}
                className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors ${
                  deviceSimMode === 'mobile_sim' ? 'bg-slate-800 text-teal-300 font-bold shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
                title="Aperçu Smartphone (iPhone / Android)"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Smartphone</span>
              </button>
            </div>

            {/* Action: Open Guide */}
            <button
              onClick={() => setShowDeviceSetupModal(true)}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/30 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Info className="w-4 h-4 text-teal-400" />
              <span>Guide de Connexion</span>
            </button>

            {/* Action: Direct PWA Install Button */}
            <button
              onClick={handleInstallClick}
              className="px-3.5 py-1.5 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md shadow-teal-500/20"
            >
              <Download className="w-4 h-4" />
              <span>Installer l'App</span>
            </button>
          </div>
        </div>
      </div>

      {/* Simulator Device Shell Indicator (if simulated) */}
      {deviceSimMode === 'mobile_sim' && (
        <div className="text-center text-[11px] text-teal-400 font-mono mb-2 flex items-center justify-center gap-1.5">
          <Smartphone className="w-3.5 h-3.5" />
          <span>Aperçu interactif : Format Smartphone 390px (iPhone & Android)</span>
        </div>
      )}
      {deviceSimMode === 'tablet_sim' && (
        <div className="text-center text-[11px] text-blue-400 font-mono mb-2 flex items-center justify-center gap-1.5">
          <Tablet className="w-3.5 h-3.5" />
          <span>Aperçu interactif : Format Tablette Tactile 820px (Lit d'hôpital & Maternité)</span>
        </div>
      )}

      {/* Container adapts width based on device simulation */}
      <div className={`${containerClasses} space-y-8`}>
        {/* Device simulated notch for mobile */}
        {deviceSimMode === 'mobile_sim' && (
          <div className="w-28 h-3.5 bg-slate-800 rounded-full mx-auto -mt-1 mb-2 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700"></div>
          </div>
        )}
      {/* Patient Header Welcome Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950/40 border border-slate-800 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={mockPatientAwaNdiaye.avatarUrl}
            alt={mockPatientAwaNdiaye.fullName}
            className="w-16 h-16 rounded-full object-cover border-2 border-teal-500/50 shadow-md"
            referrerPolicy="no-referrer"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/30">
                {t.patient_app_title}
              </span>
              <span className="text-xs text-slate-400 font-mono">· SN-DKR-1984</span>
            </div>
            <h1 className="text-2xl font-bold text-white">{t.patient_greeting}</h1>
            <p className="text-xs text-slate-300">{t.patient_welcome_sub}</p>
          </div>
        </div>

        {/* Actions: In-App Language Selector + Emergency SOS */}
        <div className="shrink-0 flex flex-wrap items-center gap-3">
          {/* Quick In-App Language Switcher */}
          <div className="flex items-center bg-slate-950/80 border border-slate-800 rounded-xl p-1 text-xs font-bold font-mono">
            <button
              onClick={() => I18nService.setLanguage('fr')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                currentLang === 'fr' ? 'bg-teal-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
              title="Français"
            >
              FR
            </button>
            <button
              onClick={() => I18nService.setLanguage('wo')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                currentLang === 'wo' ? 'bg-teal-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
              title="Wolof"
            >
              WO
            </button>
            <button
              onClick={() => I18nService.setLanguage('en')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                currentLang === 'en' ? 'bg-teal-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
              title="English"
            >
              EN
            </button>
          </div>

          <button
            onClick={() => setShowEmergencyCard(true)}
            className="px-3.5 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors shadow-sm"
          >
            <QrCode className="w-4 h-4 text-indigo-400" />
            <span>{currentLang === 'en' ? 'Emergency QR Card & PDF' : currentLang === 'wo' ? 'Kaartu Gaaw-Gaaw (QR)' : 'Carte Urgence & QR (PDF)'}</span>
          </button>

          <a
            href="tel:15"
            className="px-4 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{t.emergency_btn}</span>
          </a>
        </div>
      </div>

      {syncFeedback && (
        <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{syncFeedback}</span>
        </div>
      )}

      {/* Embedded Voice Assistant */}
      <VoiceAssistantWidget patientName="Awa Ndiaye" />

      {/* Main Grid: Médicaments du jour & Prochains Rendez-vous */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Medication Compliance Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Pill className="w-5 h-5 text-teal-400" />
              <h2 className="text-base font-bold text-white">{t.todays_medications}</h2>
            </div>
            <span className="text-xs font-mono text-slate-400">{t.scheduled_takes}</span>
          </div>

          <div className="space-y-3">
            {medLogs.map((med) => (
              <div
                key={med.id}
                className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                  med.taken
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-slate-200'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 text-teal-300 font-semibold">
                      {med.timeSlot === 'MATIN' ? (currentLang === 'en' ? 'MORNING' : 'MATIN') : (currentLang === 'en' ? 'EVENING' : 'SOIR')}
                    </span>
                    <span className="text-sm font-bold text-white">
                      {med.medicationName} {med.dosage}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">
                    {med.timeSlot === 'MATIN' ? t.take_morning_sub : t.take_evening_sub}
                  </div>
                  {med.taken && (
                    <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{t.taken_confirmed} ({med.takenAt || '08:25'})</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleToggleMed(med.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    med.taken
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  {med.taken ? t.taken_confirmed : t.mark_taken}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Appointments & Exams */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-400" />
              <h2 className="text-base font-bold text-white">{t.upcoming_appointments}</h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">Sync</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white text-sm">
                  {currentLang === 'en' ? '24h ABPM Blood Pressure Holter' : 'Pose de la MAPA des 24h'}
                </span>
                <span className="text-teal-400 font-mono">
                  {currentLang === 'en' ? 'Within 3 weeks' : 'Sous 3 semaines'}
                </span>
              </div>
              <p className="text-slate-400">
                {currentLang === 'en'
                  ? 'Continuous 24-hour cuff monitoring to evaluate your nocturnal dipping blood pressure profile.'
                  : 'Mesure ambulatoire de la tension sur 24 heures pour vérifier votre pression de nuit.'}
              </p>
              <div className="text-[11px] text-slate-500 pt-1">Cabinet du Dr. Ousmane Fall (Dakar)</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white text-sm">
                  {currentLang === 'en' ? 'Right Breast Ultrasound Follow-up (ACR 3)' : 'Échographie Mammaire Droite (ACR 3)'}
                </span>
                <span className="text-rose-400 font-mono">
                  {currentLang === 'en' ? 'August 2026 (6-Mo)' : 'Août 2026 (M6)'}
                </span>
              </div>
              <p className="text-slate-400">
                {currentLang === 'en'
                  ? 'Gentle reassurance check on the 7 mm benign breast cyst.'
                  : 'Simple contrôle de précaution pour surveiller le petit kyste bénin de 7 mm.'}
              </p>
              <div className="pt-1 flex justify-between items-center">
                <span className="text-[11px] text-slate-500">Dr. Aminata Seck (Sénologie)</span>
                <button
                  onClick={onOpenCancerScreening}
                  className="text-xs text-rose-300 hover:text-white font-semibold underline"
                >
                  {currentLang === 'en' ? 'View screening report' : 'Voir mon bilan'}
                </button>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white text-sm">
                  {currentLang === 'en' ? 'Safety Labs (Liver & CPK Enzymes)' : 'Prise de Sang de Tolérance (ASAT/CPK)'}
                </span>
                <span className="text-blue-400 font-mono">
                  {currentLang === 'en' ? 'Late May 2026 (3-Mo)' : 'Fin Mai 2026 (M3)'}
                </span>
              </div>
              <p className="text-slate-400">
                {currentLang === 'en'
                  ? 'Routine liver transaminases and muscle enzyme check for Atorvastatin.'
                  : 'Vérification habituelle du foie et des muscles sous Atorvastatine.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Blood Pressure Self-Measurement Log (Automesure tensionnelle) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-teal-400" />
              <h2 className="text-base font-bold text-white">{t.blood_pressure_diary}</h2>
            </div>
            <p className="text-xs text-slate-400">{t.bp_subtitle}</p>
          </div>

          <button
            onClick={() => setShowAddBpModal(true)}
            className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>{t.add_bp_btn}</span>
          </button>
        </div>

        {/* Modal / Form to add measurement */}
        {showAddBpModal && (
          <form onSubmit={handleSaveBp} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              {t.add_bp_btn}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">{t.bp_systole}</label>
                <input
                  type="number"
                  min="90"
                  max="220"
                  value={newSystole}
                  onChange={(e) => setNewSystole(Number(e.target.value))}
                  className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono text-sm"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">{t.bp_diastole}</label>
                <input
                  type="number"
                  min="50"
                  max="130"
                  value={newDiastole}
                  onChange={(e) => setNewDiastole(Number(e.target.value))}
                  className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono text-sm"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">{t.bp_pulse}</label>
                <input
                  type="number"
                  min="40"
                  max="160"
                  value={newPulse}
                  onChange={(e) => setNewPulse(Number(e.target.value))}
                  className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono text-sm"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1">{t.bp_period}</label>
                <select
                  value={newPeriod}
                  onChange={(e) => setNewPeriod(e.target.value as 'MATIN' | 'SOIR')}
                  className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs"
                >
                  <option value="MATIN">{t.bp_morning}</option>
                  <option value="SOIR">{t.bp_evening}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">{t.bp_notes}</label>
              <input
                type="text"
                placeholder={currentLang === 'en' ? 'E.g., felt relaxed, mild morning headache...' : 'Ex : bonne nuit, légère fatigue...'}
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddBpModal(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 text-slate-400 text-xs hover:text-white"
              >
                {t.bp_cancel}
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-teal-500 text-slate-950 font-bold text-xs hover:bg-teal-400 transition-colors"
              >
                {t.bp_save}
              </button>
            </div>
          </form>
        )}

        {/* Measurement History Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                <th className="py-2.5 px-3">{t.bp_table_datetime}</th>
                <th className="py-2.5 px-3">{t.bp_period}</th>
                <th className="py-2.5 px-3">mmHg</th>
                <th className="py-2.5 px-3">bpm</th>
                <th className="py-2.5 px-3">{t.bp_notes}</th>
                <th className="py-2.5 px-3">{t.bp_table_status}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-slate-200">
              {bpLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-3 text-slate-400">{log.timestamp}</td>
                  <td className="py-2.5 px-3">
                    <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-teal-300 font-semibold font-sans">
                      {log.period === 'MATIN' ? (currentLang === 'en' ? 'AM' : 'MATIN') : (currentLang === 'en' ? 'PM' : 'SOIR')}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-white font-bold">
                    {log.systole} / {log.diastole}
                  </td>
                  <td className="py-2.5 px-3 text-teal-400">{log.pulse} bpm</td>
                  <td className="py-2.5 px-3 font-sans text-slate-300 text-[11px]">{log.notes || '—'}</td>
                  <td className="py-2.5 px-3 font-sans">
                    <span className="text-emerald-400 text-[11px] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{t.bp_synced_badge}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Emergency Card & QR Passport Modal */}
      {showEmergencyCard && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 space-y-6 shadow-2xl relative overflow-hidden">
            {/* National Health Card Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 font-bold">
                  SN
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Passeport Numérique d'Urgence · Santé Sénégal</span>
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">ID National : SN-DKR-1984-7492</p>
                </div>
              </div>
              <button
                onClick={() => setShowEmergencyCard(false)}
                className="text-slate-400 hover:text-white text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700"
              >
                {t.close_btn}
              </button>
            </div>

            {/* Passport Identity & QR Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center bg-slate-950 p-4 rounded-2xl border border-slate-800">
              {/* QR Code Canvas/SVG Pattern */}
              <div className="flex flex-col items-center justify-center space-y-2 p-3 bg-white rounded-xl text-slate-950">
                <svg viewBox="0 0 100 100" className="w-28 h-28">
                  {/* Position detection patterns */}
                  <rect x="5" y="5" width="26" height="26" fill="black" />
                  <rect x="9" y="9" width="18" height="18" fill="white" />
                  <rect x="13" y="13" width="10" height="10" fill="black" />

                  <rect x="69" y="5" width="26" height="26" fill="black" />
                  <rect x="73" y="9" width="18" height="18" fill="white" />
                  <rect x="77" y="13" width="10" height="10" fill="black" />

                  <rect x="5" y="69" width="26" height="26" fill="black" />
                  <rect x="9" y="73" width="18" height="18" fill="white" />
                  <rect x="13" y="77" width="10" height="10" fill="black" />

                  {/* QR Data Dots */}
                  <rect x="36" y="8" width="6" height="6" fill="black" />
                  <rect x="48" y="14" width="6" height="6" fill="black" />
                  <rect x="58" y="8" width="6" height="6" fill="black" />
                  <rect x="38" y="24" width="6" height="6" fill="black" />
                  <rect x="10" y="38" width="6" height="6" fill="black" />
                  <rect x="22" y="44" width="6" height="6" fill="black" />
                  <rect x="36" y="40" width="8" height="8" fill="black" />
                  <rect x="48" y="36" width="6" height="6" fill="black" />
                  <rect x="60" y="44" width="8" height="8" fill="black" />
                  <rect x="78" y="38" width="6" height="6" fill="black" />
                  <rect x="86" y="48" width="6" height="6" fill="black" />
                  <rect x="38" y="56" width="6" height="6" fill="black" />
                  <rect x="48" y="60" width="8" height="8" fill="black" />
                  <rect x="64" y="66" width="6" height="6" fill="black" />
                  <rect x="76" y="60" width="8" height="8" fill="black" />
                  <rect x="38" y="74" width="8" height="8" fill="black" />
                  <rect x="52" y="80" width="6" height="6" fill="black" />
                  <rect x="68" y="82" width="6" height="6" fill="black" />
                  <rect x="84" y="76" width="8" height="8" fill="black" />
                </svg>
                <span className="text-[9px] font-mono font-bold tracking-tight uppercase text-slate-800">
                  SCAN SAMU / SECOURS
                </span>
              </div>

              {/* Patient Core Summary */}
              <div className="sm:col-span-2 space-y-2 text-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-bold text-white">{mockPatientAwaNdiaye.fullName}</h4>
                    <p className="text-[11px] text-slate-400">42 ans · Résidence Dakar & Thiès</p>
                  </div>
                  <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-rose-500/20 text-rose-300 border border-rose-500/40">
                    GROUPE : B+
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/40 space-y-0.5 text-[11px]">
                  <span className="text-rose-300 font-bold block uppercase tracking-wider text-[10px]">
                    ⚠️ SITUATION CLINIQUE PRIORITAIRE :
                  </span>
                  <div className="text-white font-medium">Grossesse active à 26 SA (G3P2)</div>
                  <div className="text-rose-200">Hypertension gestationnelle traitée par Labétalol 200mg</div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">ALLERGIES MAJEURES :</span>
                    <strong className="text-amber-400">Pénicilline</strong>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">CONTACT D'URGENCE :</span>
                    <span className="text-white font-mono">Babacar (Époux)</span>
                    <div className="text-teal-400 font-mono text-[10px]">+221 77 654 32 10</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Offline Health Pass Description */}
            <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Ce QR code fonctionne 100% hors-ligne et peut être lu par toute équipe de secours d'urgence.</span>
              </div>
              <span className="font-mono text-[10px] text-teal-400 shrink-0">SHA-256 SIGNED</span>
            </div>

            {/* Action Buttons: Print PDF & Close */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowEmergencyCard(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
              >
                {t.close_btn}
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-5 py-2 bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-teal-500/20"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimer / Télécharger le Carnet PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Guide de Paramétrage Multi-Appareils (Smartphone, Tablette, PC, Réseau) */}
      {showDeviceSetupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-3xl w-full p-6 space-y-6 shadow-2xl my-8">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">
                      Guide de Paramétrage & Déploiement Multi-Appareils
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30 font-bold">
                      PWA ZERO-STORE
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Comment déployer et faire fonctionner l'application sur Smartphones, Tablettes et Ordinateurs sans passer par les stores d'applications.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDeviceSetupModal(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-950/70 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setDeviceTab('mobile')}
                className={`py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                  deviceTab === 'mobile'
                    ? 'bg-teal-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>1. Smartphone</span>
              </button>
              <button
                onClick={() => setDeviceTab('tablet')}
                className={`py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                  deviceTab === 'tablet'
                    ? 'bg-teal-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Tablet className="w-4 h-4" />
                <span>2. Tablette</span>
              </button>
              <button
                onClick={() => setDeviceTab('desktop')}
                className={`py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                  deviceTab === 'desktop'
                    ? 'bg-teal-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="w-4 h-4" />
                <span>3. Ordinateur</span>
              </button>
              <button
                onClick={() => setDeviceTab('network')}
                className={`py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                  deviceTab === 'network'
                    ? 'bg-teal-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Wifi className="w-4 h-4" />
                <span>4. Wi-Fi Local</span>
              </button>
            </div>

            {/* Tab 1: Smartphone (Android & iOS) */}
            {deviceTab === 'mobile' && (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Android Instructions */}
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                      <Smartphone className="w-4 h-4" />
                      <span>Android (Chrome / Samsung / Xiaomi)</span>
                    </div>
                    <ol className="list-decimal list-inside space-y-2 text-slate-300">
                      <li>
                        <strong>Ouvrir le navigateur Chrome</strong> et taper l'URL de l'hôpital ou scanner le QR code du lit/affiche.
                      </li>
                      <li>
                        Appuyer sur le bandeau vert <em>« Installer l'application »</em> ou ouvrir le menu à 3 points (⋮) en haut à droite.
                      </li>
                      <li>
                        Sélectionner <strong>« Ajouter à l'écran d'accueil »</strong> ou <strong>« Installer SantéNova »</strong>.
                      </li>
                      <li>
                        L'icône SantéNova apparaît parmi les applications du téléphone avec son propre logo.
                      </li>
                    </ol>
                    <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px]">
                      ✨ <strong>Avantage :</strong> Aucune obligation d'utiliser Google Play Store. Pèse moins de 2 Mo et démarre instantanément en mode hors-ligne.
                    </div>
                  </div>

                  {/* iOS / iPhone Instructions */}
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-indigo-500/30 space-y-3">
                    <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                      <Smartphone className="w-4 h-4" />
                      <span>iPhone & iPad (Apple Safari)</span>
                    </div>
                    <ol className="list-decimal list-inside space-y-2 text-slate-300">
                      <li>
                        <strong>Ouvrir Safari</strong> sur l'iPhone et accéder au portail SantéNova.
                      </li>
                      <li>
                        Appuyer sur le bouton de partage Apple <Share2 className="w-3.5 h-3.5 inline text-indigo-400" /> (le carré avec une flèche vers le haut, en bas de l'écran).
                      </li>
                      <li>
                        Faire défiler la liste vers le bas et appuyer sur <strong>« Sur l'écran d'accueil »</strong>.
                      </li>
                      <li>
                        Confirmer en appuyant sur <strong>« Ajouter »</strong> en haut à droite.
                      </li>
                    </ol>
                    <div className="p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px]">
                      ✨ <strong>Rendu Natif :</strong> L'application s'exécute en plein écran autonome (« Standalone »), sans barre d'adresse ni boutons Safari.
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-white font-bold">Accessibilité Vocale Multilingue</div>
                    <div className="text-slate-400 text-[11px]">
                      Pour les patientes ne sachant ni lire ni écrire, l'assistante vocale intégrée s'exprime en Wolof, Français et Anglais.
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-teal-500/10 text-teal-400 font-mono text-[11px] font-bold shrink-0">
                    WOLOF + FR READY
                  </span>
                </div>
              </div>
            )}

            {/* Tab 2: Tablette (Maternité & Chevet) */}
            {deviceTab === 'tablet' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-950/80 border border-blue-500/30 space-y-3">
                  <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                    <Tablet className="w-5 h-5" />
                    <span>Tablette Tactile de Chevet & Maternité (iPad / Android 10-12")</span>
                  </div>
                  <p className="text-slate-300">
                    Les tablettes sont idéales pour les soignants, sages-femmes et infirmiers en visite de lit à lit dans les services de maternité et médecine interne :
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                      <strong className="text-white block">Mode Soignant Nomade</strong>
                      <p className="text-slate-400 text-[11px]">
                        Affichage sur 2 colonnes permettant de visualiser simultanément la fiche de suivi CPN et la saisie des constantes vitales (Tension, Pouls, Glycémie).
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                      <strong className="text-white block">Mode Borne / Kiosque d'Accueil</strong>
                      <p className="text-slate-400 text-[11px]">
                        Possibilité de verrouiller la tablette sur l'application (Mode Accès Guidé iOS ou Épinglage Android) pour que les patientes en salle d'attente remplissent leur auto-évaluation.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-300 text-[11px] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>
                    <strong>Ergonomie tactile :</strong> Les boutons de validation mesurent au moins 44px de hauteur pour une manipulation aisée même avec des gants d'examen.
                  </span>
                </div>
              </div>
            )}

            {/* Tab 3: Ordinateur (PC / Mac) */}
            {deviceTab === 'desktop' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-700 space-y-3">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <Monitor className="w-5 h-5 text-teal-400" />
                    <span>Poste de Consultation & Secrétariat Médical (Windows, Mac, Linux)</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-2 text-slate-300">
                    <li>
                      Ouvrir l'application dans <strong>Google Chrome</strong>, <strong>Microsoft Edge</strong> ou <strong>Brave</strong>.
                    </li>
                    <li>
                      Regarder à droite dans la barre d'adresse URL : l'icône <Monitor className="w-3.5 h-3.5 inline text-teal-400" /> <em>« Installer SantéNova »</em> apparaît.
                    </li>
                    <li>
                      Cliquer sur <strong>« Installer »</strong> : le logiciel s'ouvre dans une fenêtre séparée du bureau, avec son raccourci dans le menu Démarrer / Applications.
                    </li>
                    <li>
                      <strong>Impression A4 en 1 clic :</strong> Cliquez sur le bouton d'impression pour générer instantanément l'ordonnance et le carnet de santé officiel en PDF ou sur imprimante thermique.
                    </li>
                  </ol>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Prise en charge multi-écrans & lecteurs de code-barres USB :</span>
                  <span className="text-teal-400 font-mono font-bold">PLUG & PLAY</span>
                </div>
              </div>
            )}

            {/* Tab 4: Réseau Local Hospitalier (Sans Internet) */}
            {deviceTab === 'network' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-500/30 space-y-3">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                    <Wifi className="w-5 h-5" />
                    <span>Diffusion sur le Réseau Wi-Fi Hospitalier (Sans Internet)</span>
                  </div>
                  <p className="text-slate-300">
                    Pour que tous les soignants et patientes accèdent à SantéNova dans l'enceinte de l'hôpital sans utiliser leur forfait de données mobiles :
                  </p>
                  <div className="space-y-2 pt-1 font-mono text-[11px]">
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-between">
                      <span>1. Serveur Edge relié au routeur Wi-Fi :</span>
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

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 shrink-0">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div className="text-slate-300 text-[11px]">
                    <strong>Astuce déploiement :</strong> Imprimez le QR code pointant vers <code>http://santenova.local:3000</code> et collez-le sur la porte des chambres et à l'accueil pour un accès immédiat.
                  </div>
                </div>
              </div>
            )}

            {/* Footer Buttons */}
            <div className="flex items-center justify-between border-t border-slate-800 pt-4">
              <span className="text-[11px] text-slate-500">
                SantéNova v2.1 · Architecture PWA Standard W3C & FHIR
              </span>
              <button
                onClick={() => setShowDeviceSetupModal(false)}
                className="px-5 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs transition-colors shadow-md shadow-teal-500/20"
              >
                J'ai compris
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};
