import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import {
  QrCode,
  Smartphone,
  Tablet,
  Download,
  Copy,
  Check,
  ExternalLink,
  X,
  Printer,
  Sparkles,
  Wifi,
  ShieldCheck,
  HeartPulse,
} from 'lucide-react';
import { PATIENT_APP_DEMO_URL, PATIENT_APP_QR_DATA_URL } from '../data/qrCodeData';

interface PatientQRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchPatientApp: () => void;
}

export const PatientQRCodeModal: React.FC<PatientQRCodeModalProps> = ({
  isOpen,
  onClose,
  onLaunchPatientApp,
}) => {
  const [copied, setCopied] = useState(false);
  const [qrSrc, setQrSrc] = useState<string>(PATIENT_APP_QR_DATA_URL);

  // Use current window origin if available, fallback to public demo URL
  const currentDemoUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/?tab=patient-app`
      : PATIENT_APP_DEMO_URL;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      QRCode.toDataURL(currentDemoUrl, {
        width: 450,
        margin: 2,
        color: {
          dark: '#0f172a',
          light: '#ffffff',
        },
        errorCorrectionLevel: 'H',
      })
        .then((url) => setQrSrc(url))
        .catch(() => setQrSrc(PATIENT_APP_QR_DATA_URL));
    }
  }, [currentDemoUrl]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentDemoUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>SantéNova - Fiche de Connexion Patiente & QR Code</title>
          <style>
            body {
              font-family: system-ui, -apple-system, sans-serif;
              padding: 40px;
              text-align: center;
              color: #0f172a;
            }
            .card {
              max-width: 520px;
              margin: 0 auto;
              border: 3px solid #0d9488;
              border-radius: 20px;
              padding: 32px;
            }
            h1 { color: #0d9488; margin-bottom: 4px; font-size: 26px; }
            p { font-size: 14px; color: #475569; margin-top: 4px; }
            .qr-box {
              background: #fff;
              display: inline-block;
              padding: 16px;
              border: 2px solid #e2e884;
              border-radius: 16px;
              margin: 20px 0;
            }
            .qr-box img { width: 280px; height: 280px; display: block; }
            .instructions {
              text-align: left;
              background: #f8fafc;
              border-radius: 12px;
              padding: 16px 20px;
              font-size: 13px;
              line-height: 1.6;
            }
            .instructions ol { margin: 0; padding-left: 20px; }
            .badge {
              display: inline-block;
              background: #ccfbf1;
              color: #0f766e;
              padding: 4px 12px;
              border-radius: 20px;
              font-weight: bold;
              font-size: 11px;
              margin-bottom: 12px;
            }
            .url {
              font-family: monospace;
              background: #e2e8f0;
              padding: 4px 8px;
              border-radius: 6px;
              font-size: 11px;
              word-break: break-all;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="badge">SANTÉNOVA V2.1 · PORTAIL PATIENT & SOIGNANT</div>
            <h1>Accès Rapide sur Smartphone & Tablette</h1>
            <p>Scannez ce QR Code avec l'appareil photo pour ouvrir directement votre carnet de santé interactif.</p>
            
            <div class="qr-box">
              <img src="${PATIENT_APP_QR_DATA_URL}" alt="QR Code SantéNova" />
            </div>

            <div class="instructions">
              <strong>Instructions pas-à-pas :</strong>
              <ol>
                <li>Ouvrez l'application <strong>Appareil Photo</strong> sur votre téléphone (iPhone ou Android).</li>
                <li>Pointez vers ce QR code et appuyez sur la notification qui s'affiche.</li>
                <li>Appuyez sur <strong>« Ajouter à l'écran d'accueil »</strong> pour installer l'application hors-ligne.</li>
              </ol>
            </div>

            <p style="margin-top: 18px; font-size: 11px; color: #64748b;">
              Lien direct : <span class="url">${currentDemoUrl}</span>
            </p>
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden relative space-y-0">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-gradient-to-r from-teal-950/60 via-slate-900 to-slate-900 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  QR Code Démo & Test
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 font-bold">
                  PWA MOBILE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Application Patiente & Soignante SantéNova
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 text-center">
          {/* Badges bar */}
          <div className="flex items-center justify-center gap-2 flex-wrap text-[11px]">
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Smartphone className="w-3.5 h-3.5" />
              iPhone & Android
            </span>
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Tablet className="w-3.5 h-3.5" />
              Tablette Tactile
            </span>
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <Wifi className="w-3.5 h-3.5" />
              100% Hors-Ligne (PWA)
            </span>
          </div>

          {/* QR Code Presentation Box */}
          <div className="relative inline-block mx-auto p-4 bg-white rounded-2xl shadow-xl ring-4 ring-teal-500/30 group">
            <img
              src={qrSrc}
              alt="QR Code Application Patiente SantéNova"
              className="w-56 h-56 sm:w-64 sm:h-64 object-contain mx-auto block"
            />
            {/* Center medical logo badge overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-12 h-12 rounded-xl bg-teal-600 border-2 border-white shadow-md flex items-center justify-center text-white">
                <HeartPulse className="w-7 h-7" />
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
            Pointez l'appareil photo de votre smartphone ou tablette vers ce QR code pour lancer directement l'application patiente en plein écran.
          </p>

          {/* Direct link copy banner */}
          <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-left">
            <div className="truncate text-xs font-mono text-slate-400">
              <span className="text-teal-400 select-none">URL : </span>
              {currentDemoUrl}
            </div>
            <button
              onClick={handleCopyLink}
              className="px-2.5 py-1.5 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/30 text-xs font-medium flex items-center gap-1.5 shrink-0 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copié !</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copier</span>
                </>
              )}
            </button>
          </div>

          {/* Interactive Steps Accordion/Guide */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-left text-xs space-y-2">
            <strong className="text-slate-200 block text-[11px] uppercase tracking-wider font-semibold">
              Procédure de Test Rapide (30 secondes) :
            </strong>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-300">
              <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-800/80 space-y-1">
                <span className="font-bold text-teal-400 block font-mono">1. SCANNER</span>
                Ouvrez l'appareil photo et visez le QR code à l'écran.
              </div>
              <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-800/80 space-y-1">
                <span className="font-bold text-teal-400 block font-mono">2. OUVRIR</span>
                Touchez le lien pour accéder au dossier d'Awa Ndiaye.
              </div>
              <div className="p-2 rounded-lg bg-slate-900/90 border border-slate-800/80 space-y-1">
                <span className="font-bold text-teal-400 block font-mono">3. INSTALLER</span>
                Cliquez sur « Ajouter à l'accueil » pour l'utiliser sans internet.
              </div>
            </div>
          </div>

          {/* Action Buttons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
            {/* Open in app button */}
            <button
              onClick={() => {
                onClose();
                onLaunchPatientApp();
              }}
              className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-teal-500/20 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Tester dans l'App</span>
            </button>

            {/* Download PNG */}
            <a
              href="/qr_patient_app.png"
              download="santenova_qr_code_patient.png"
              className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-4 h-4 text-teal-400" />
              <span>Télécharger PNG</span>
            </a>

            {/* Print Poster */}
            <button
              onClick={handlePrint}
              className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4 text-emerald-400" />
              <span>Imprimer Fiche A4</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
