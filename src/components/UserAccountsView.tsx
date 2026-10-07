import React, { useState, useEffect } from 'react';
import { AuthService } from '../services/authService';
import { UserAccount, UserRoleCategory, Language } from '../types';
import { I18nService } from '../services/i18n';
import {
  Users,
  ShieldCheck,
  UserPlus,
  Key,
  CheckCircle2,
  Lock,
  ArrowRight,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';

interface UserAccountsViewProps {
  onSessionSwitched: () => void;
}

export const UserAccountsView: React.FC<UserAccountsViewProps> = ({ onSessionSwitched }) => {
  const auth = AuthService.getInstance();
  const [userList, setUserList] = useState<UserAccount[]>([...auth.users]);
  const [currentUser, setCurrentUser] = useState<UserAccount>(auth.currentUser);
  const [lang, setLang] = useState<Language>(I18nService.language);

  useEffect(() => {
    const unsub = I18nService.subscribe((l) => setLang(l));
    return unsub;
  }, []);

  const t = I18nService.t();

  // New User Form State
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [newEmail, setNewEmail] = useState<string>('');
  const [newFullName, setNewFullName] = useState<string>('');
  const [newRole, setNewRole] = useState<UserRoleCategory>('PATIENT');
  const [newRoleTitle, setNewRoleTitle] = useState<string>('');
  const [newLang, setNewLang] = useState<'fr' | 'wo' | 'en'>('fr');
  const [creationSuccess, setCreationSuccess] = useState<string | null>(null);

  const handleSwitchUser = (userId: string) => {
    auth.switchUser(userId);
    setCurrentUser(auth.currentUser);
    onSessionSwitched();
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail || !newFullName) return;

    const created = auth.createUser({
      email: newEmail,
      fullName: newFullName,
      role: newRole,
      roleTitle: newRoleTitle || `${newRole} SantéNova`,
      preferredLanguage: newLang,
    });

    setUserList([...auth.users]);
    setCreationSuccess(`Compte créé avec succès : ${created.fullName} (${created.roleTitle}).`);
    setNewEmail('');
    setNewFullName('');
    setNewRoleTitle('');
    setShowCreateModal(false);
    setTimeout(() => setCreationSuccess(null), 4000);
  };

  const roleBadges: Record<UserRoleCategory, { color: string; level: string }> = {
    PATIENT: { color: 'bg-teal-500/10 text-teal-300 border-teal-500/30', level: 'Niveau 1' },
    AIDANT: { color: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30', level: 'Niveau 1b' },
    MEDECIN: { color: 'bg-rose-500/10 text-rose-300 border-rose-500/30', level: 'Niveau 2' },
    SECRETAIRE: { color: 'bg-blue-500/10 text-blue-300 border-blue-500/30', level: 'Niveau 2b' },
    ADMIN: { color: 'bg-amber-500/10 text-amber-300 border-amber-500/30', level: 'Niveau 3' },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-400 uppercase tracking-wider">
            <span>{t.accounts_badge}</span>
            <span>·</span>
            <span>Sécurité Données de Santé (HDS)</span>
          </div>
          <h2 className="text-2xl font-bold text-white">{t.accounts_title}</h2>
          <p className="text-sm text-slate-400">
            {t.accounts_sub}
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl transition-colors flex items-center gap-2 self-start md:self-auto shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>{t.create_account_btn}</span>
        </button>
      </div>

      {creationSuccess && (
        <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{creationSuccess}</span>
        </div>
      )}

      {/* Active User Session Notice */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <div>
            <span className="text-slate-400">Session active en cours : </span>
            <span className="font-bold text-white">{currentUser.fullName}</span>
            <span className="text-slate-500"> ({currentUser.email})</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold border ${roleBadges[currentUser.role].color}`}>
            {currentUser.roleTitle}
          </span>
          <span className="text-slate-500 font-mono">MFA Actif</span>
        </div>
      </div>

      {/* User Creation Modal */}
      {showCreateModal && (
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-teal-400" />
              <span>Nouveau Compte Utilisateur avec Habilitation</span>
            </h3>
            <button
              onClick={() => setShowCreateModal(false)}
              className="text-slate-400 hover:text-white text-xs"
            >
              Fermer
            </button>
          </div>

          <form onSubmit={handleCreateUser} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Nom et Prénom</label>
                <input
                  type="text"
                  placeholder="Ex : Mariama Ba"
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Adresse Email</label>
                <input
                  type="email"
                  placeholder="Ex : mariama.ba@santenova.sn"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Catégorie de Niveau d'Habilitation</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as UserRoleCategory)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                >
                  <option value="PATIENT">PATIENT (Niveau 1 : Dossier personnel & Automesure)</option>
                  <option value="AIDANT">AIDANT (Niveau 1b : Référent familial & Suivi partagé)</option>
                  <option value="MEDECIN">MÉDECIN / CLINICIEN (Niveau 2 : Prescriptions & Human Review)</option>
                  <option value="SECRETAIRE">SECRÉTARIAT MÉDICAL (Niveau 2b : Admissions & RDV)</option>
                  <option value="ADMIN">ADMINISTRATEUR DPO (Niveau 3 : Audit & Gouvernance)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Titre de Fonction</label>
                <input
                  type="text"
                  placeholder="Ex : Médecin Généraliste / Patiente"
                  value={newRoleTitle}
                  onChange={(e) => setNewRoleTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Langue Principale</label>
                <select
                  value={newLang}
                  onChange={(e) => setNewLang(e.target.value as 'fr' | 'wo' | 'en')}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white"
                >
                  <option value="fr">Français</option>
                  <option value="wo">Wolof (Sénégal)</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold transition-colors"
              >
                Créer et Activer le Compte
              </button>
            </div>
          </form>
        </div>
      )}

      {/* User Accounts Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-teal-400" />
            <span>Répertoire des Comptes Habilités ({userList.length})</span>
          </h3>
          <span className="text-xs text-slate-400">Authentification forte MFA activée</span>
        </div>

        <div className="space-y-3">
          {userList.map((user) => {
            const isCurrent = currentUser.id === user.id;
            return (
              <div
                key={user.id}
                className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isCurrent ? 'bg-slate-800/80 border-teal-500/80 shadow-md' : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-white text-sm">{user.fullName}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${roleBadges[user.role].color}`}>
                      {user.role} ({roleBadges[user.role].level})
                    </span>
                    {isCurrent && (
                      <span className="px-2 py-0.5 rounded bg-teal-500 text-slate-950 text-[10px] font-bold">
                        SESSION ACTIVE
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 flex flex-wrap gap-2">
                    <span className="text-slate-300">{user.email}</span>
                    <span>·</span>
                    <span>{user.roleTitle}</span>
                    <span>·</span>
                    <span className="uppercase text-[11px] font-mono text-teal-400">Langue : {user.preferredLanguage}</span>
                  </div>

                  {/* Permissions Pills */}
                  <div className="flex flex-wrap gap-1 pt-1.5">
                    {user.permissions.map((perm, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400"
                      >
                        {perm}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <button
                    onClick={() => handleSwitchUser(user.id)}
                    disabled={isCurrent}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      isCurrent
                        ? 'opacity-50 cursor-not-allowed bg-slate-800 text-slate-400'
                        : 'bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30'
                    }`}
                  >
                    <span>{isCurrent ? 'Connecté' : 'Basculer vers ce profil'}</span>
                    {!isCurrent && <ArrowRight className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Habilitation Levels Matrix Explainer */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Matrice des Droits & Privilèges par Catégorie
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="font-bold text-teal-300 block">Niveau 1 : Patient</span>
            <p className="text-slate-400 text-[11px]">
              Dossier personnel uniquement. Carnet d'automesure, rappels vocaux, consentements Trust Center.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="font-bold text-emerald-300 block">Niveau 1b : Aidant</span>
            <p className="text-slate-400 text-[11px]">
              Accès par délégation consentie. Consultation des rappels et alertes d'urgence sans modification d'ordonnance.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="font-bold text-rose-300 block">Niveau 2 : Médecin</span>
            <p className="text-slate-400 text-[11px]">
              Dossier médical intégral, imagerie, arbitrage de la Revue Humaine, prescriptions et validation RCP.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="font-bold text-blue-300 block">Niveau 2b : Secrétariat</span>
            <p className="text-slate-400 text-[11px]">
              Admissions et calendrier des rendez-vous. Données cliniques et génomiques strictement masquées.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="font-bold text-amber-300 block">Niveau 3 : Admin DPO</span>
            <p className="text-slate-400 text-[11px]">
              Gouvernance, registre d'audit, détection de biais d'équité (Fairness) et Model Registry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
