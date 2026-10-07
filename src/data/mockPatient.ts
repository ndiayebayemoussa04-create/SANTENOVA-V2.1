import { PatientProfile } from '../types';

export const mockPatientAwaNdiaye: PatientProfile = {
  id: 'PAT-NDIAYE-2026-042',
  fullName: 'Awa Ndiaye',
  age: 42,
  gender: 'Féminin',
  primaryLanguage: 'fr',
  spokenLanguages: ['fr', 'wo', 'en'],
  avatarUrl: '/src/assets/images/awa_ndiaye_avatar_1791240023491.jpg',
  nationalHealthId: 'SN-DKR-1984-0922-841',
  city: 'Dakar & Paris (Binationale)',
  country: 'Sénégal / France',
  emergencyContact: {
    name: 'Babacar Ndiaye',
    relationship: 'Frère / Référent familial',
    phone: '+221 77 512 88 40',
  },
  allergies: ['Pénicilline (réaction urticaire documentée en 2018)', 'Arachides (intolérance digestive modérée)'],
  chronicConditions: ['Hypertension artérielle modérée (stade 1)', 'Dyslipidémie familiale sous surveillance'],
  currentMedications: [
    {
      name: 'Amlodipine',
      dosage: '5 mg',
      frequency: '1 comprimé par jour le matin',
      prescribedBy: 'Dr. Ousmane Fall (Cardiologue)',
      verified: true,
    },
    {
      name: 'Atorvastatine',
      dosage: '10 mg',
      frequency: '1 comprimé le soir au coucher',
      prescribedBy: 'Dr. Marie Dupont (Médecin traitant)',
      verified: true,
    },
  ],
  isFictionalDemoData: true,
};
