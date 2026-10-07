import { AuthService } from '../services/authService';

export function runAuthRBACTests(): { name: string; passed: boolean; message: string }[] {
  const results = [];
  const auth = AuthService.getInstance();

  // Test 1: Patient role has only self-records permissions
  const patient = auth.users.find((u) => u.role === 'PATIENT');
  results.push({
    name: 'RBAC Test 1 : Habilitation Patient strictement limitée au dossier propre',
    passed:
      patient !== undefined &&
      patient.permissions.includes('READ_OWN_RECORD') &&
      !patient.permissions.includes('VALIDATE_HUMAN_REVIEW') &&
      !patient.permissions.includes('AUDIT_SYSTEM'),
    message: `Permissions accordées : ${patient?.permissions.join(', ')}`,
  });

  // Test 2: Clinician role possesses validation authority
  const clinician = auth.users.find((u) => u.role === 'MEDECIN');
  results.push({
    name: 'RBAC Test 2 : Habilitation Médecin avec autorité d’arbitrage clinique',
    passed:
      clinician !== undefined &&
      clinician.permissions.includes('VALIDATE_HUMAN_REVIEW') &&
      clinician.permissions.includes('READ_CLINICAL_RECORDS'),
    message: `Permissions médecin vérifiées pour ${clinician?.fullName}`,
  });

  // Test 3: Patient blood pressure entry synchronizes to logs
  const initialCount = auth.bloodPressureLogs.length;
  const newLog = auth.addBloodPressureLog(135, 82, 70, 'MATIN', 'Test de synchronisation');
  results.push({
    name: 'Interconnexion Test 3 : Synchronisation temps réel des relevés patient vers dossier soignant',
    passed: auth.bloodPressureLogs.length === initialCount + 1 && newLog.syncedToClinician === true,
    message: `Mesure synchronisée : ${newLog.systole}/${newLog.diastole} mmHg (${newLog.timestamp})`,
  });

  // Test 4: Creation of new account assigns correct role level
  const newUser = auth.createUser({
    email: 'test.aidant@santenova.sn',
    fullName: 'Moussa Diouf',
    role: 'AIDANT',
    roleTitle: 'Aidant Référent',
    preferredLanguage: 'wo',
  });
  results.push({
    name: 'RBAC Test 4 : Création dynamique de compte avec habilitation conforme',
    passed: newUser.role === 'AIDANT' && newUser.permissions.includes('READ_OWN_RECORD'),
    message: `Compte créé : ${newUser.fullName} [${newUser.role}] (${newUser.id})`,
  });

  return results;
}
