import React from 'react';
import { BarChart3, TrendingUp, ShieldCheck, MapPin, Users, Activity, HeartPulse } from 'lucide-react';

export const PublicHealthView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-400 uppercase tracking-wider">
            <span>Observatoire Épidémiologique & Prévention</span>
            <span>·</span>
            <span>Données Agrégées Anonymisées</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Dashboard Santé Publique Territoriale</h2>
          <p className="text-sm text-slate-400">
            Agrégation macroscopique sans aucune donnée nominative (Zéro PII). Analyse des tendances HTA et dyslipidémie
            entre les corridors urbains Dakar et Paris.
          </p>
        </div>

        <div className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 font-semibold flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Données K-Anonymisées (k &ge; 50)</span>
        </div>
      </div>

      {/* Aggregate Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Cohorte Sous Surveillance</span>
            <Users className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-white">14 280</div>
          <div className="text-xs text-slate-400">Patients binationaux & locaux suivis</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Contrôle Tensionnel Réussi</span>
            <HeartPulse className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-emerald-400">76.4 %</div>
          <div className="text-xs text-slate-400">+12% depuis l'accompagnement RAG</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Observance Thérapeutique</span>
            <Activity className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-teal-300">88.2 %</div>
          <div className="text-xs text-slate-400">Rappels en Wolof & Français</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Réduction Événements Aigus</span>
            <TrendingUp className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-indigo-400">- 22 %</div>
          <div className="text-xs text-slate-400">Passages urgences évités (estimation)</div>
        </div>
      </div>

      {/* Territorial Insights Dakar vs Paris */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Corridor Sanitaire : Dakar & Régions</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">N = 8 940</span>
          </div>
          <ul className="space-y-3 text-xs text-slate-300">
            <li className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-semibold text-white block">Adhésion au module Wolof : 84%</span>
              Impact très marqué de la synthèse audio pour les consignes d'automesure et l'horaire des prises.
            </li>
            <li className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-semibold text-white block">Gestion de l'apport sodé :</span>
              Sensibilisation culinaire collective efficace sans rupture des habitudes traditionnelles.
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>Corridor Sanitaire : Paris & Île-de-France</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">N = 5 340</span>
          </div>
          <ul className="space-y-3 text-xs text-slate-300">
            <li className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-semibold text-white block">Suivi Ambulatoire Bilan Métabolique :</span>
              91% des patients réalisent leur prise de sang de contrôle de sécurité sous 90 jours.
            </li>
            <li className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-semibold text-white block">Coordination Transnationale :</span>
              Partage sécurisé des comptes rendus entre praticiens des deux capitales sans double examen.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
