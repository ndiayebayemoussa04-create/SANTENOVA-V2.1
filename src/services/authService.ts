import { MedicationIntakeLog, PatientBloodPressureLog, PermissionKey, UserAccount, UserRoleCategory } from '../types';
import { AIOrchestrator } from './orchestrator';

export class AuthService {
  private static instance: AuthService;

  public users: UserAccount[] = [
    {
      id: 'USR-PAT-001',
      email: 'awa.ndiaye@santenova.sn',
      fullName: 'Awa Ndiaye',
      role: 'PATIENT',
      roleTitle: 'Patiente Suivie (Niveau 1)',
      avatarUrl: '/src/assets/images/awa_ndiaye_avatar_1791240023491.jpg',
      permissions: ['READ_OWN_RECORD', 'WRITE_SELF_LOGS'],
      mfaEnabled: true,
      preferredLanguage: 'wo',
      linkedPatientId: 'PAT-NDIAYE-2026-042',
      createdAt: '2026-01-10',
      lastLogin: '2026-10-05 16:30',
    },
    {
      id: 'USR-AID-002',
      email: 'babacar.ndiaye@santenova.sn',
      fullName: 'Babacar Ndiaye',
      role: 'AIDANT',
      roleTitle: 'Aidant & Référent Familial (Niveau 1b)',
      avatarUrl: '',
      permissions: ['READ_OWN_RECORD'],
      mfaEnabled: true,
      preferredLanguage: 'fr',
      linkedPatientId: 'PAT-NDIAYE-2026-042',
      createdAt: '2026-01-15',
      lastLogin: '2026-10-04 09:12',
    },
    {
      id: 'USR-MED-003',
      email: 'dr.fall@hopitalprincipal.sn',
      fullName: 'Dr. Ousmane Fall',
      role: 'MEDECIN',
      roleTitle: 'Médecin Cardiologue Référent (Niveau 2)',
      avatarUrl: '',
      permissions: [
        'READ_CLINICAL_RECORDS',
        'VALIDATE_HUMAN_REVIEW',
        'WRITE_PRESCRIPTIONS',
        'MANAGE_APPOINTMENTS',
      ],
      mfaEnabled: true,
      preferredLanguage: 'fr',
      createdAt: '2025-11-01',
      lastLogin: '2026-10-05 14:10',
    },
    {
      id: 'USR-MED-004',
      email: 'dr.seck@imageriefemme.sn',
      fullName: 'Dr. Aminata Seck',
      role: 'MEDECIN',
      roleTitle: 'Radiologue Sénologue (Niveau 2)',
      avatarUrl: '',
      permissions: [
        'READ_CLINICAL_RECORDS',
        'VALIDATE_HUMAN_REVIEW',
        'MANAGE_APPOINTMENTS',
      ],
      mfaEnabled: true,
      preferredLanguage: 'fr',
      createdAt: '2026-01-20',
      lastLogin: '2026-10-05 11:45',
    },
    {
      id: 'USR-SEC-005',
      email: 'secretariat@santenova.sn',
      fullName: 'Fatou Diallo',
      role: 'SECRETAIRE',
      roleTitle: 'Secrétariat Médical & Admissions (Niveau 2b)',
      avatarUrl: '',
      permissions: ['MANAGE_APPOINTMENTS'],
      mfaEnabled: true,
      preferredLanguage: 'fr',
      createdAt: '2025-12-05',
      lastLogin: '2026-10-05 08:30',
    },
    {
      id: 'USR-ADM-006',
      email: 'admin.dpo@santenova.sn',
      fullName: 'Dr. Cheikh Diop',
      role: 'ADMIN',
      roleTitle: 'Délégué Protection des Données & Admin Système (Niveau 3)',
      avatarUrl: '',
      permissions: ['AUDIT_SYSTEM', 'MANAGE_PLUGINS', 'READ_CLINICAL_RECORDS'],
      mfaEnabled: true,
      preferredLanguage: 'fr',
      createdAt: '2025-09-01',
      lastLogin: '2026-10-05 15:00',
    },
  ];

  public currentUser: UserAccount = this.users[0]; // Default to Awa Ndiaye

  // Live Patient Automeasurement Logs
  public bloodPressureLogs: PatientBloodPressureLog[] = [
    {
      id: 'BP-001',
      timestamp: '2026-10-04 08:15',
      systole: 140,
      diastole: 86,
      pulse: 72,
      period: 'MATIN',
      notes: 'Légère céphalée au réveil',
      syncedToClinician: true,
    },
    {
      id: 'BP-002',
      timestamp: '2026-10-04 20:30',
      systole: 136,
      diastole: 82,
      pulse: 68,
      period: 'SOIR',
      notes: 'Repos calme après le dîner',
      syncedToClinician: true,
    },
    {
      id: 'BP-003',
      timestamp: '2026-10-05 08:20',
      systole: 138,
      diastole: 84,
      pulse: 74,
      period: 'MATIN',
      notes: 'Prise avant le petit-déjeuner',
      syncedToClinician: true,
    },
  ];

  // Daily Medication Compliance Logs
  public medicationLogs: MedicationIntakeLog[] = [
    {
      id: 'MED-LOG-001',
      date: '2026-10-05',
      timeSlot: 'MATIN',
      medicationName: 'Amlodipine',
      dosage: '5 mg',
      taken: true,
      takenAt: '08:25',
    },
    {
      id: 'MED-LOG-002',
      date: '2026-10-05',
      timeSlot: 'SOIR',
      medicationName: 'Atorvastatine',
      dosage: '10 mg',
      taken: false,
    },
  ];

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public switchUser(userId: string): boolean {
    const user = this.users.find((u) => u.id === userId);
    if (user) {
      this.currentUser = user;
      AIOrchestrator.getInstance().logAudit(
        user.fullName,
        'LOGIN',
        `Changement de session : Rôle actif [${user.role}] - ${user.roleTitle}`,
        'LOW'
      );
      return true;
    }
    return false;
  }

  public createUser(newUserData: {
    email: string;
    fullName: string;
    role: UserRoleCategory;
    roleTitle: string;
    preferredLanguage: 'fr' | 'wo' | 'en';
  }): UserAccount {
    let permissions: PermissionKey[] = [];
    switch (newUserData.role) {
      case 'PATIENT':
        permissions = ['READ_OWN_RECORD', 'WRITE_SELF_LOGS'];
        break;
      case 'AIDANT':
        permissions = ['READ_OWN_RECORD'];
        break;
      case 'MEDECIN':
        permissions = [
          'READ_CLINICAL_RECORDS',
          'VALIDATE_HUMAN_REVIEW',
          'WRITE_PRESCRIPTIONS',
          'MANAGE_APPOINTMENTS',
        ];
        break;
      case 'SECRETAIRE':
        permissions = ['MANAGE_APPOINTMENTS'];
        break;
      case 'ADMIN':
        permissions = ['AUDIT_SYSTEM', 'MANAGE_PLUGINS', 'READ_CLINICAL_RECORDS'];
        break;
    }

    const newUser: UserAccount = {
      id: `USR-${newUserData.role.slice(0, 3)}-${Date.now().toString().slice(-4)}`,
      email: newUserData.email,
      fullName: newUserData.fullName,
      role: newUserData.role,
      roleTitle: newUserData.roleTitle || `${newUserData.role} SantéNova`,
      avatarUrl: '',
      permissions,
      mfaEnabled: true,
      preferredLanguage: newUserData.preferredLanguage,
      createdAt: new Date().toISOString().split('T')[0],
      lastLogin: 'Première connexion',
      linkedPatientId: newUserData.role === 'PATIENT' ? 'PAT-NDIAYE-2026-042' : undefined,
    };

    this.users.unshift(newUser);

    AIOrchestrator.getInstance().logAudit(
      this.currentUser.fullName,
      'LOGIN',
      `Création de compte habilité : ${newUser.fullName} (${newUser.email}) - Rôle : ${newUser.role}`,
      'MEDIUM',
      newUser.id
    );

    return newUser;
  }

  public addBloodPressureLog(systole: number, diastole: number, pulse: number, period: 'MATIN' | 'SOIR', notes?: string) {
    const entry: PatientBloodPressureLog = {
      id: `BP-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      systole,
      diastole,
      pulse,
      period,
      notes,
      syncedToClinician: true,
    };
    this.bloodPressureLogs.unshift(entry);

    AIOrchestrator.getInstance().logAudit(
      this.currentUser.fullName,
      'PATIENT_ACCESS',
      `Automesure tensionnelle saisie par le patient : ${systole}/${diastole} mmHg (${period}) - Synchronisée au dossier Dr. Fall`,
      'LOW'
    );

    return entry;
  }

  public toggleMedicationIntake(logId: string) {
    const log = this.medicationLogs.find((m) => m.id === logId);
    if (log) {
      log.taken = !log.taken;
      log.takenAt = log.taken ? new Date().toTimeString().slice(0, 5) : undefined;

      AIOrchestrator.getInstance().logAudit(
        this.currentUser.fullName,
        'PATIENT_ACCESS',
        `Prise de médicament [${log.medicationName} ${log.dosage}] : ${log.taken ? 'CONFIRMÉE (' + log.takenAt + ')' : 'NON PRISE'}`,
        'LOW'
      );
    }
  }
}
