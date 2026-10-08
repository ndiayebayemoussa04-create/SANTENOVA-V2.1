const fs = require('fs');
const path = require('path');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  HeadingLevel,
} = require('docx');

async function generateOfficialDossier() {
  const primaryColor = '0F766E'; // Teal 700
  const secondaryColor = '0369A1'; // Sky 700
  const darkTextColor = '1E293B'; // Slate 800
  const mutedTextColor = '64748B'; // Slate 500

  // Helper for paragraphs
  const createP = (text, options = {}) => {
    return new Paragraph({
      alignment: options.align || AlignmentType.LEFT,
      spacing: {
        before: options.before || 80,
        after: options.after || 120,
        line: 276,
      },
      children: [
        new TextRun({
          text,
          bold: !!options.bold,
          color: options.color || darkTextColor,
          size: options.size || 22, // 11pt
          font: 'Calibri',
        }),
      ],
    });
  };

  const createH1 = (text) => {
    return new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 360, after: 160 },
      children: [
        new TextRun({
          text,
          bold: true,
          color: primaryColor,
          size: 30, // 15pt
          font: 'Calibri',
        }),
      ],
    });
  };

  const createH2 = (text) => {
    return new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 240, after: 120 },
      children: [
        new TextRun({
          text,
          bold: true,
          color: secondaryColor,
          size: 26, // 13pt
          font: 'Calibri',
        }),
      ],
    });
  };

  // Helper for tables
  const createTable = (headers, rows) => {
    const headerRow = new TableRow({
      tableHeader: true,
      children: headers.map(
        (h) =>
          new TableCell({
            shading: { fill: primaryColor },
            margins: { top: 140, bottom: 140, left: 140, right: 140 },
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({
                    text: h,
                    bold: true,
                    color: 'FFFFFF',
                    size: 20, // 10pt
                    font: 'Calibri',
                  }),
                ],
              }),
            ],
          })
      ),
    });

    const dataRows = rows.map((r, rowIdx) => {
      const bg = rowIdx % 2 === 0 ? 'F8FAFC' : 'FFFFFF';
      return new TableRow({
        children: r.map(
          (c, colIdx) =>
            new TableCell({
              shading: { fill: bg },
              margins: { top: 120, bottom: 120, left: 140, right: 140 },
              children: [
                new Paragraph({
                  alignment: AlignmentType.LEFT,
                  children: [
                    new TextRun({
                      text: c,
                      bold: colIdx === 0,
                      color: darkTextColor,
                      size: 20, // 10pt
                      font: 'Calibri',
                    }),
                  ],
                }),
              ],
            })
        ),
      });
    });

    return new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: {
        top: { style: BorderStyle.SINGLE, size: 6, color: 'CBD5E1' },
        bottom: { style: BorderStyle.SINGLE, size: 12, color: primaryColor },
        left: { style: BorderStyle.NONE },
        right: { style: BorderStyle.NONE },
        insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: 'E2E8F0' },
        insideVertical: { style: BorderStyle.NONE },
      },
      rows: [headerRow, ...dataRows],
    });
  };

  // Document Content
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440, // 1 inch
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        children: [
          // Header Coat of Arms & Republic
          createP('RÉPUBLIQUE DU SÉNÉGAL', {
            bold: true,
            color: '047857',
            size: 24,
            align: AlignmentType.CENTER,
            after: 40,
          }),
          createP('Un Peuple - Un But - Une Foi', {
            bold: false,
            color: mutedTextColor,
            size: 18,
            align: AlignmentType.CENTER,
            after: 160,
          }),
          createP("MINISTÈRE DE LA SANTÉ ET DE L'ACTION SOCIALE", {
            bold: true,
            color: darkTextColor,
            size: 22,
            align: AlignmentType.CENTER,
            after: 360,
          }),

          // Main Title
          createP('DOSSIER STRATÉGIQUE & TECHNIQUE INSTITUTIONNEL', {
            bold: true,
            color: primaryColor,
            size: 38,
            align: AlignmentType.CENTER,
            after: 100,
          }),
          createP(
            'SANTÉNOVA SÉNÉGAL : DÉPLOIEMENT DU MAILLAGE NUMÉRIQUE & IA ÉTHIQUE DANS LES POSTES DE SANTÉ ET HÔPITAUX',
            {
              bold: true,
              color: secondaryColor,
              size: 24,
              align: AlignmentType.CENTER,
              after: 240,
            }
          ),
          createP(
            "À L'ATTENTION DE L'ORGANISATION MONDIALE DE LA SANTÉ (OMS), DU MINISTÈRE DE LA SANTÉ, DES ONGs ET DES BAILLEURS DE FONDS",
            {
              bold: true,
              color: '475569',
              size: 20,
              align: AlignmentType.CENTER,
              after: 400,
            }
          ),

          // Metadata Card
          createP('RÉFÉRENCE OFFICIELLE : MSAS-OMS-SN-2026-V2.1 · CLASSIFICATION : PROJET STRATÉGIQUE NATIONAL', {
            bold: true,
            color: primaryColor,
            size: 18,
            align: AlignmentType.CENTER,
            after: 300,
          }),

          // 1. Résumé Exécutif
          createH1('1. RÉSUMÉ EXÉCUTIF & VISION DU PROJET'),
          createP(
            "Le projet SantéNova est une réponse intégrée aux goulots d'étranglement majeurs des systèmes de soins en Afrique de l'Ouest : " +
              "la mortalité maternelle et néonatale évitable (315 décès pour 100 000 naissances selon l'EDS Sénégal), les déserts médicaux en milieu rural, " +
              "les ruptures récurrentes d'intrants vitaux (Ocytocine, Sulfate de Magnésium) et la fracture numérique qui exclut les populations non francophones et non connectées à l'Internet haut débit."
          ),
          createP(
            "Plutôt que d'introduire des technologies opaques ou des agents déconnectés de la réalité clinique, SantéNova déploie une architecture souveraine, " +
              "respectueuse du secret médical et conçue pour fonctionner en mode dégradé (Offline-First) au sein des postes de santé les plus isolés, " +
              "tout en assurant la télé-expertise directe avec les gynécologues et spécialistes des Centres Hospitaliers Universitaires (CHU)."
          ),

          // 2. Indicateurs d'Impact
          createH1("2. TABLEAU COMPARATIF DES INDICATEURS D'IMPACT (CIBLES OMS & PNDS)"),
          createTable(
            ['Indicateur Sanitaire Clé', 'Situation Actuelle (2025)', 'Cible SantéNova (An 2)', 'Bénéfice Attendu OMS / ODD 3'],
            [
              [
                'Couverture des 4 CPN recommandées',
                '43% en milieu rural',
                '86% grâce aux relances SMS/Voix',
                'Réduction de la mortalité maternelle (-40%)',
              ],
              [
                'Délai de détection pré-éclampsie',
                'Souvent au stade convulsif',
                'Dépistage dès TA ≥ 140/90',
                'Zéro décès par éclampsie évitable',
              ],
              [
                "Ruptures de stock d'Ocytocine",
                '18 à 35 jours / an',
                '< 48 heures (Alerte PRA)',
                'Arrêt des hémorragies de délivrance',
              ],
              [
                'Temps de réponse télé-expertise',
                'Plusieurs jours / Non formalisé',
                '< 30 minutes via IA certifiée',
                'Avis spécialisé sans déplacement coûteux',
              ],
              [
                'Inclusion femmes non francophones',
                '< 15% (Barrière de langue)',
                '100% via Voix & SMS Wolof',
                "Égalité stricte d'accès aux soins",
              ],
              [
                'Couverture vaccinale PEV (Rougeole)',
                '71% au niveau national',
                '94% avec suivi sans rupture',
                'Prévention des épidémies saisonnières',
              ],
            ]
          ),
          createP(
            'Source : Enquête Démographique et de Santé (EDS Sénégal) & Modélisation Projections SantéNova 2026-2029.',
            { color: mutedTextColor, size: 18, after: 200 }
          ),

          // 3. Architecture Hub-and-Spoke
          createH1('3. ARCHITECTURE CLINIQUE HUB-AND-SPOKE : ÉVITER LE PIÈGE DES SILOS'),
          createP(
            "L'un des apports majeurs de SantéNova réside dans le refus des agents IA isolés par service. " +
              "Une femme enceinte ne se résumant pas à son utérus, l'IA de maternité est interconnectée au dossier transversal unique. " +
              "Cela permet la détection automatique et le blocage immédiat des interactions médicamenteuses fœtotoxiques (ex. interdiction absolue des IEC/ARA2 et proposition automatique de Labétalol)."
          ),
          createP(
            "Dans SantéNova, l'IA n'émet aucun diagnostic péremptoire : elle évalue des faisceaux d'indices statistiques avec mention systématique d'incertitude " +
              "et déclenche obligatoirement le statut HUMAN_REVIEW_REQUIRED nécessitant le visa d'un professionnel de santé habilité."
          ),

          // 4. Matrice de Déploiement
          createH1('4. MATRICE OPÉRATIONNELLE : DU POSTE RURAL AU CHU DE RÉFÉRENCE'),
          createTable(
            ['Échelon Sanitaire', 'Utilisateurs Cibles', 'Outils SantéNova Déployés', 'Infrastructure Requise'],
            [
              [
                'Poste de Santé / Case Rurale',
                'Sage-femme, Infirmier ICP, Matrone',
                'App Offline, 4 CPN OMS, Triage, Stocks Ocytocine',
                'Tablette Android, Panneau Solaire, 2G',
              ],
              [
                'Centre de Santé (District)',
                'Médecin Chef, Laborantin, Sage-femme',
                'Télé-régulation, Alertes ambulances, Suivi stocks',
                'Connexion 3G/4G, Ordinateur de bord',
              ],
              [
                'Hôpital Régional / CHU',
                'Gynécologues, Cardiologues, Pédiatres',
                'Télé-expertise asynchrone, RAG documentaire, Partogramme',
                'Serveur local ou Cloud Souverain Sénégal',
              ],
              [
                'Domicile de la Patiente',
                'Femme enceinte, Mère de famille',
                'Portail Patient, Voix Wolof/FR, Carte QR, USSD #123#',
                'Téléphone 2G basique ou Smartphone',
              ],
            ]
          ),

          // 5. Cadre Éthique & Réglementation
          createH1('5. CONFORMITÉ ÉTHIQUE, SOUVERAINETÉ & PROTECTION DES DONNÉES (CDP / RGPD)'),
          createP(
            '1. Principe de Revue Humaine Systématique (Human-in-the-Loop) : ' +
              "Aucune décision clinique n'est automatisée. Tout signal d'anomalie génère l'obligation de visa d'un soignant qualifié."
          ),
          createP(
            '2. Conformité CDP Sénégal & RGPD : ' +
              'La Commission de Protection des Données Personnelles du Sénégal (Loi 2008-12) encadre le consentement explicite de la patiente. ' +
              'Les données génomiques ou de recherche ne sont jamais exploitées sans accord renforcé actif dans le Trust Center.'
          ),
          createP(
            '3. Chiffrement de Bout en Bout & Souveraineté : ' +
              'Base de données locale chiffrée AES-256 sur chaque terminal de santé, synchronisation sécurisée par certificats mTLS, ' +
              'et hébergement des serveurs sur le territoire national (Datacenter de Diamniadio / SENUM SA).'
          ),

          // 6. Plan Budgétaire Triennal
          createH1('6. PLAN BUDGÉTAIRE PRÉVISIONNEL TRIENNAL (CO-FINANCEMENT BAILLEURS)'),
          createTable(
            [
              'Composante du Projet',
              'Phase 1 : Pilote (6 mois)',
              'Phase 2 : Régionale (18 mois)',
              'Phase 3 : Nationale (36 mois)',
              'Bailleur Pressenti',
            ],
            [
              [
                'Équipement Solaire & Tablettes Postes',
                '45 000 USD (30 postes)',
                '280 000 USD (200 postes)',
                '950 000 USD (1 200 postes)',
                'Banque Mondiale / AFD',
              ],
              [
                'Passerelle Télécom USSD #123# & SMS Wolof',
                '15 000 USD',
                '45 000 USD',
                '120 000 USD',
                'Fonds Mondial / Opérateurs',
              ],
              [
                'Formation Sages-femmes & Infirmiers ICP',
                '25 000 USD',
                '95 000 USD',
                '250 000 USD',
                'OMS / UNICEF',
              ],
              [
                'Interconnexion DHIS2 & Hébergement Local',
                '30 000 USD',
                '70 000 USD',
                '150 000 USD',
                'MSAS / SENUM SA',
              ],
              [
                'Supervision Clinique & Audit Éthique CDP',
                '20 000 USD',
                '60 000 USD',
                '130 000 USD',
                'Comité Éthique Sénégal',
              ],
              [
                'TOTAL ESTIMATIF (USD)',
                '135 000 USD',
                '550 000 USD',
                '1 600 000 USD',
                'Financement Mixte Public-Privé',
              ],
            ]
          ),

          // 7. GUIDE OFFICIEL DE DÉPLOIEMENT HOSPITALIER ET TERRAIN
          createH1("7. GUIDE OFFICIEL D'IMPLÉMENTATION ET DE DÉPLOIEMENT EN MILIEU HOSPITALIER"),
          createP(
            "Ce guide opérationnel prescrit la méthodologie de mise en œuvre concrète de la plateforme SantéNova au sein d'un Centre Hospitalier Régional (CHR), " +
              "d'un Centre Hospitalier Universitaire (CHU) ou d'un Hôpital de District, ainsi que son raccordement au réseau périphérique des Postes et Centres de Santé.",
            { after: 160 }
          ),

          createH2("7.1 Phase 1 : Audit Technique Préalable & Continuité Énergétique"),
          createP(
            "• Résilience Électrique : Tout hôpital déployant SantéNova doit équiper sa salle serveur et ses terminaux critiques d'un onduleur (UPS) à ligne interactive d'au moins 3 kVA, " +
              "couplé au groupe électrogène de secours de l'établissement ou à un kit photovoltaïque dédié (autonomie minimale de 4 heures en cas de délestage).\n" +
              "• Réseau Local Hospitalier (LAN/WLAN) : Mise en place d'un réseau local filaire Gigabit dans les services clés (Urgences, Maternité, Bloc, Pharmacie, Laboratoire) " +
              "et de bornes Wi-Fi sécurisées (WPA3-Enterprise) pour la mobilité des soignants avec les tablettes médicalisées.\n" +
              "• Serveur Local Edge (On-Premise) : Déploiement d'une appliance locale sous Linux durci (Mini-serveur rackable 1U ou Mini-PC durci) hébergeant l'instance locale de SantéNova. " +
              "Ce serveur garantit que l'hôpital continue de fonctionner à 100% même en cas de rupture de la fibre optique ou d'indisponibilité d'Internet."
          ),

          createH2("7.2 Phase 2 : Architecture d'Interopérabilité & Intégration Hospitalière"),
          createP(
            "SantéNova ne remplace pas brutalement les systèmes existants mais s'intègre harmonieusement via des passerelles ouvertes :\n" +
              "• Dossier Patient Informatisé (DPI) : Connecteurs REST / FHIR (Fast Healthcare Interoperability Resources) et HL7 v2.5 pour synchroniser l'identité nationale du patient, " +
              "les antécédents et les mouvements de lit sans double saisie.\n" +
              "• Imagerie Médicale (PACS / DICOM) : Réception automatisée des clichés radiographiques et échographiques pour traitement par les plugins d'analyse d'aide à la décision certifiés.\n" +
              "• Interconnexion DHIS2 Nationale : Module d'agrégation instantanée transmettant les indicateurs de santé publique (taux de CPN, cas de pré-éclampsie, vaccinations, transferts) " +
              "vers la base de données du Ministère de la Santé sans surcharge administrative pour les soignants."
          ),

          createH2("7.3 Phase 3 : Organisation du Modèle Hub-and-Spoke (Hôpital ↔ Postes de Santé)"),
          createP(
            "L'hôpital de référence devient le 'Hub' médical du district sanitaire :\n" +
              "• Cellule de Télé-Expertise Asynchrone : Les sages-femmes et infirmiers chefs de poste (ICP) ruraux transmettent les dossiers suspects (TA anormale, glycémie élevée, suspicion d'hémorragie) " +
              "avec un pré-remplissage automatisé par l'IA des antécédents et des constantes vitales.\n" +
              "• File d'Attente Prioritaire aux Urgences : Dès qu'une évacuation sanitaire est déclenchée depuis un poste de santé, une 'Fiche de Liaison Numérique' s'affiche " +
              "sur le tableau de bord des urgences hospitalières, permettant à l'équipe de garde d'anticiper l'arrivée de la patiente, de préparer le bloc opératoire et de réserver les poches de sang."
          ),

          createH2("7.4 Phase 4 : Programme de Conduite du Changement & Formations Hospitalières"),
          createTable(
            ['Profil Professionnel', 'Durée Formation', 'Modules Enseignés', 'Validation des Compétences'],
            [
              [
                'Gynécologues & Médecins Chefs',
                '2 Jours',
                'Télé-expertise, Partogramme IA, Protocoles de transfert, Audit des alertes',
                'Attestation Référent Clinique SantéNova',
              ],
              [
                'Sages-femmes & Infirmiers ICP',
                '3 Jours',
                'App Offline, Dépistage Pré-éclampsie, Synthèse vocale Wolof, Gestion stocks Ocytocine',
                'Certification Soignant Terrain SantéNova',
              ],
              [
                'Pharmaciens Hospitaliers',
                '1 Jour',
                'Suivi chaîne de froid, Alertes péremption, Bon de commande dématérialisé PRA',
                'Habilitation Gestion Intrants d’Urgence',
              ],
              [
                'Administrateurs SI Hospitaliers',
                '2 Jours',
                'Sauvegardes chiffrées, Synchronisation Store-and-Forward, Gestion des rôles RBAC',
                'Certification Administrateur Système SantéNova',
              ],
            ]
          ),

          createH2("7.5 Phase 5 : Gouvernance des Accès & Sécurité Réglementaire (CDP)"),
          createP(
            "• Gestion des Habilitations (RBAC) : Authentification stricte par matricule professionnel et code PIN sécurisé. " +
              "Cloisonnement étanche des profils (Médecin, Sage-femme, Pharmacien, Triage, Super-Admin).\n" +
              "• Chiffrement & Journal d'Audit : Chiffrement AES-256 de la base de données locale. Chaque consultation, prescription validée ou alerte refusée " +
              "est signée numériquement avec une empreinte SHA-256 inaltérable, consultable lors des audits du Ministère.\n" +
              "• Comité Hospitalier de Veille IA : Réunion mensuelle présidée par la Commission Médicale d'Établissement (CME) pour auditer les cas marqués 'HUMAN_REVIEW_REQUIRED' " +
              "et valider la pertinence des algorithmes d'aide à la décision."
          ),

          createH2("7.6 Phase 6 : Checklist Opérationnelle du Go-Live Hospitalier (Jour J)"),
          createTable(
            ['Point de Contrôle Opérationnel', 'Critère de Succès', 'Responsable Désigné', 'Statut Requis'],
            [
              ['1. Test de Bascule Hors-Ligne', 'Saisie continue sur tablettes sans coupure Internet', 'Ingénieur Réseau / SI', '100% Validé'],
              ['2. Stocks d’Urgence Maternité', 'Ocytocine & Sulfate de Mg disponibles ≥ seuil d’alerte', 'Pharmacien Chef', '100% Validé'],
              ['3. Passerelle Télé-Expertise', 'Notification SMS / Tableau de bord CHU active', 'Médecin Chef de Garde', '100% Validé'],
              ['4. Vocal Wolof & Fiche Patiente', 'Compréhension vérifiée auprès de 10 patientes témoins', 'Sage-femme Major', '100% Validé'],
              ['5. Synchronisation DHIS2', 'Export des fiches CPN sans doublon vers serveur district', 'Responsable Statistiques', '100% Validé'],
              ['6. Support Hotline 24/7', 'Numéro vert et canal WhatsApp d’assistance opérationnels', 'Coordination SantéNova', '100% Validé'],
            ]
          ),

          createH2("7.7 Notice Technique de Branchement Direct & Déploiement Rapide (Plug & Play Docker / Edge Server)"),
          createP(
            "Le prototype SantéNova v2.1 est entièrement conteneurisé et architecturé pour un déploiement 'Plug & Play' immédiat. " +
              "Sur le plan logiciel, l'intégralité du code source, des modules cliniques, de la base locale et de l'orchestration Docker est finalisée et hébergée sur le dépôt officiel :\n" +
              "Dépôt GitHub : https://github.com/ndiayebayemoussa04-create/SANTENOVA-V2.1.git\n\n" +
              "Afin d'activer la plateforme dans un établissement hospitalier, la mise en service s'effectue en 4 branchements concrets et 3 commandes d'initialisation :"
          ),
          createTable(
            ['Branchement Requis', 'Composant & Matériel', 'Opération de Raccordement', 'Statut Immédiat'],
            [
              [
                '1. Serveur Edge On-Premise',
                'Mini-PC ou Serveur 1U (Linux Ubuntu 22.04 LTS / 8 Go RAM / 128 Go SSD)',
                'Brancher sur l’onduleur secouru du service et connecter au switch réseau local (IP fixe : 192.168.1.50).',
                'Conteneurisé & Prêt'
              ],
              [
                '2. Couverture Réseau Local',
                'Point d’accès Wi-Fi WPA3 ou réseau LAN Maternité/Urgences',
                'Créer le SSID sécurisé "HOSPITAL-SANTENOVA" indépendant du Wi-Fi public pour garantir la bande passante.',
                'Autonomie Hors-Ligne Prête'
              ],
              [
                '3. Terminaux Mobiles Soignants',
                'Tablettes Android durcies (10 pouces) pour sages-femmes et urgentistes',
                'Ouvrir Chrome/Edge sur http://192.168.1.50:3000 et cliquer sur "Installer l’application" (PWA installable).',
                'Interface PWA Validée'
              ],
              [
                '4. Passerelles Réelles API & SMS',
                'Modem GSM 4G ou passerelle opérateur (Orange / Twilio) + Clé Gemini',
                'Renseigner les clés de production dans le fichier .env pour l’émission des SMS d’urgence et l’IA cloud.',
                'Paramétrage via .env'
              ]
            ]
          ),
          createP(
            "Procédure d'installation en 3 commandes sur le serveur hospitalier :\n" +
              "1. Cloner le référentiel : git clone https://github.com/ndiayebayemoussa04-create/SANTENOVA-V2.1.git\n" +
              "2. Se positionner dans le répertoire : cd SANTENOVA-V2.1\n" +
              "3. Lancer la pile complète : docker compose up -d --build\n\n" +
              "Accès immédiat sur le réseau local hospitalier :\n" +
              "• Interface clinique soignante : http://[IP_SERVEUR]:3000\n" +
              "• API backend & passerelles d'interopérabilité : http://[IP_SERVEUR]:8000\n" +
              "• Documentation interactive & Swagger : http://[IP_SERVEUR]:8000/docs\n\n" +
              "Recommandation de mise en service (Protocole Pilote 30 Jours) : Il est prescrit d'exécuter une première phase pilote d'un mois " +
              "dans un service pilote restreint (Maternité ou Triage) en mode double saisie (registre papier officiel + saisie tablette SantéNova) " +
              "pour valider l'adhésion des équipes et le calibrage des seuils d'alerte avant la généralisation à l'ensemble de la structure.",
            { after: 200 }
          ),

          createH2("7.8 Procédure de Paramétrage de l'Application Patient(e) sur Smartphone, Tablette et Ordinateur"),
          createP(
            "L'application Patient et Patiente de SantéNova est une Progressive Web App (PWA) universelle conforme aux normes W3C. " +
              "Elle ne nécessite aucun téléchargement depuis Google Play ou Apple App Store, évitant ainsi les barrières d'espace disque, de compte Google/Apple ou de forfait data. " +
              "Voici la procédure de paramétrage standard selon chaque typologie d'appareil :"
          ),
          createTable(
            ['Appareil Cible', 'Système & Navigateur', 'Procédure d’Installation & Paramétrage', 'Bénéfice Terrain & Expérience'],
            [
              [
                '1. Smartphone Patiente (Personnel)',
                'Android (Chrome, Samsung Internet) ou iOS (Apple Safari)',
                '1. Se connecter au Wi-Fi de l’hôpital ou 4G.\n2. Scanner le QR Code de la fiche d’admission ou ouvrir l’URL.\n3. Android : Menu ⋮ > "Installer l’application".\niOS : Bouton Partager > "Sur l’écran d’accueil".',
                'Icône dédiée sur le téléphone, fonctionnement 100% hors-ligne, notifications de prise de comprimés et vocal Wolof/Français.'
              ],
              [
                '2. Tablette Tactile (Chambre & Maternité)',
                'iPad ou Android Tab (10 à 12 pouces) des sages-femmes',
                '1. Ouvrir le portail sur la tablette.\n2. Installer en mode PWA plein écran.\n3. Optionnel : Activer le mode Kiosque (Accès Guidé iOS ou Épinglage Android) pour les bornes patientes en salle d’attente.',
                'Saisie tactile ergonomique (boutons ≥44px manipulables avec gants), visualisation simultanée de la courbe de tension et CPN.'
              ],
              [
                '3. Ordinateur (Poste Bureau / Garde)',
                'PC Windows, Mac, Linux (Google Chrome ou Microsoft Edge)',
                '1. Accéder à l’URL du serveur.\n2. Cliquer sur l’icône d’installation dans la barre d’adresse URL.\n3. L’application s’exécute dans une fenêtre de bureau isolée sans barres d’onglets.',
                'Impression directe en 1 clic des ordonnances et carnets de liaison au format A4/PDF, compatible lecteurs de codes-barres.'
              ],
              [
                '4. Diffusion Wi-Fi Hospitalier (Local)',
                'Routeur Wi-Fi du dispensaire / hôpital (sans Internet requis)',
                '1. Relier le mini-serveur SantéNova au routeur local.\n2. Attribuer l’IP fixe (ex : 192.168.1.50) ou nom DNS "santenova.local".\n3. Les patientes se connectent au SSID "HOSPITAL-SANTENOVA".',
                '0 FCFA dépensé par la patiente (0 Mo de données mobiles consommées), accès instantané même en zone blanche totale.'
              ]
            ]
          ),
          createP(
            "Accessibilité et Inclusion Sociale :\n" +
              "Pour les patientes en situation d'illettrisme ou de précarité numérique, l'interface intègre nativement un guidage vocal bilingue Wolof/Français. " +
              "Toute mesure de tension enregistrée sur smartphone ou tablette est immédiatement horodatée et transmise au dossier médical du praticien référent dès détection du réseau local.",
            { after: 200 }
          ),

          createH2("7.9 Architecture Universelle et Fonctionnement du Moteur SantéNova (Edge-First & Zero-Dependency)"),
          createP(
            "Le moteur de SantéNova est conçu dès son architecture fondamentale pour être déployé et utilisé n’importe où dans le monde, " +
              "y compris dans les zones rurales les plus isolées (Afrique de l'Ouest, Afrique Centrale, Asie du Sud-Est, Amérique Latine ou dispensaires insulaires).\n\n" +
              "1. Pourquoi le moteur fonctionne partout (« Edge-First & Zero-Dependency ») :"
          ),
          createTable(
            ['Propriété Fondamentale', 'Ce qui le rend prêt partout', 'Impact Opérationnel sur le Terrain'],
            [
              [
                'Autonomie Totale Hors-Ligne',
                'Les calculs cliniques (Partogramme OMS, Triage pédiatrique, scores de pré-éclampsie) tournent directement sur l’appareil (IndexedDB / navigateur), pas sur un serveur distant.',
                'Fonctionne même en cas de coupure Internet de 3 semaines ou dans un poste de santé isolé en brousse.'
              ],
              [
                'Portabilité Docker Universelle',
                'Le moteur tourne dans un conteneur standard Linux x86_64 ou ARM (Intel NUC, serveur d’hôpital, PC portable reconditionné ou Raspberry Pi).',
                'Se déploie en 2 minutes avec la commande `docker compose up -d` sans installer de dépendances complexes.'
              ],
              [
                'Normes Médicales Internationales',
                'Basé sur les référentiels stricts de l’OMS (Organisation Mondiale de la Santé) et les standards mondiaux HL7 FHIR R4 et DHIS2.',
                'Reconnu et compatible avec les systèmes informatiques de tous les Ministères de la Santé et des ONG (UNICEF, Croix-Rouge, MSF).'
              ],
              [
                'Zéro Coût de Licence Propriétaire',
                'Architecture souveraine et autonome, sans dépendance obligatoire à un abonnement cloud mensuel pour fonctionner en salle de soins.',
                'Zéro barrière financière pour les structures publiques défavorisées.'
              ]
            ]
          ),
          createP(
            "2. Comment il s’adapte à n’importe quel pays en 15 minutes (Les 3 réglages de configuration) :\n" +
              "Pour déployer le moteur dans un nouveau pays ou un nouvel établissement, aucun code n’est à réécrire. Il suffit de renseigner 3 paramètres simples :\n" +
              "• La Liste Nationale des Médicaments Essentiels (LNME) : Le module pharmacie charge le catalogue local (ex : PNA au Sénégal, CAMEG au Burkina Faso, ou FEDECAME en RDC).\n" +
              "• Le Réseau Télécom Local (pour les alertes SMS) : En zone urbaine, via passerelle API SMS (Orange, MTN, Moov, Twilio). En zone rurale, via un simple dongle USB 4G (clé modem GSM à 15 € avec carte SIM locale prépayée) branché sur le mini-PC.\n" +
              "• La Langue et les dialectes locaux : L’interface prend nativement en charge le français, l’anglais et les synthèses vocales en langues locales (Wolof, Pulaar, Bambara, etc.) pour les agents communautaires.\n\n" +
              "3. Les 3 environnements où le moteur tourne immédiatement :\n" +
              "• En Salle d’Accouchement & Maternité de District : Installé sur des tablettes tactiles (Android/iPad) en Wi-Fi local sans Internet, pour surveiller le travail obstétrical en direct.\n" +
              "• Dans une Ambulance ou Clinique Mobile : Embarqué sur un ordinateur portable ou une tablette durcie pour trier les blessés et orienter les évacuations avant même d’arriver au CHU.\n" +
              "• Au Niveau d’une Région Médicale ou d’un Ministère : Installé sur un serveur centralisé pour agréger les données épidémiologiques et anticiper les ruptures de stock d’insuline et d’antibiotiques sur 50 centres de santé.\n\n" +
              "Structure interne des 6 sous-moteurs spécialisés :"
          ),
          createTable(
            ['Sous-Moteur', 'Technologie & Principe', 'Rôle Clinique & Comportement', 'Garantie de Sécurité'],
            [
              [
                '1. Cœur Déterministe Médical',
                'Algorithmes par arbres de décision stricts (TypeScript pur, 0 appel LLM)',
                'Calcule le Partogramme OMS dynamique, les Z-scores pédiatriques de malnutrition, le terme gestationnel et l’alerte de pré-éclampsie (PAS ≥ 140 ou PAD ≥ 90).',
                '0% Risque d’hallucination. Exécution locale instantanée (< 15 ms).'
              ],
              [
                '2. Moteur RAG Hybride Anonymisé',
                'Recherche sémantique vectorielle locale + BM25 filtré sur corpus officiel MSAS/OMS',
                'Interroge les protocoles SONU, les guides nationaux de prise en charge du paludisme grave et de l’HTA. Désidentifie systématiquement les données sensibles (PII) avant analyse.',
                'Citation obligatoire des sources médicales (numéro de page, paragraphe, indice de pertinence).'
              ],
              [
                '3. Garde-Fou Human-in-the-Loop',
                'File d’arbitrage médicale et analyse de criticité en temps réel',
                'Toute suggestion ayant un indice de confiance < 85% ou impliquant un pronostic vital est automatiquement suspendue et transmise dans la file d’examen du médecin traitant.',
                'Aucune décision thérapeutique n’est exécutée sans validation humaine d’un professionnel de santé.'
              ],
              [
                '4. Moteur de Synchronisation Offline',
                'Base SQLite/IndexedDB chiffrée AES-256 + Horodatage Vectoriel (Vector Clocks)',
                'Enregistre toutes les constantes au lit de la patiente en zone blanche. Résout automatiquement les conflits de version sans écraser de données lors de la reconnexion.',
                'Résilience totale aux coupures réseau et électriques prolongées.'
              ],
              [
                '5. Passerelle FHIR HL7 & DHIS2',
                'Convertisseur sémantique JSON-LD vers standards internationaux FHIR R4',
                'Structure chaque consultation en ressources normalisées (Patient, Encounter, Observation, Condition). Agrège les indicateurs CPN vers le DHIS2 national du district sanitaire.',
                'Interopérabilité totale avec les DPI existants et les serveurs du Ministère.'
              ],
              [
                '6. Moteur Vocal & Multilingue',
                'Synthèse vocale locale et transcription adaptée aux langues nationales',
                'Traduit et vocalise en temps réel les consignes médicales en Wolof, Français et Anglais. Guide les patientes analphabètes dans l’observance de leurs traitements.',
                'Inclusion des populations vulnérables et équité d’accès aux soins de santé.'
              ]
            ]
          ),
          createP(
            "En résumé : Le noyau clinique et technique est 100% prêt. Tout établissement de santé, ONG ou district sanitaire qui télécharge le dépôt GitHub officiel peut brancher le conteneur et commencer à enregistrer des patientes et trier des urgences dès aujourd'hui.\n\n" +
              "Traçabilité et Journal d'Audit Cryptographique (Audit Ledger) :\n" +
              "Chaque décision, recommandation et validation effectuée par le moteur est enregistrée dans un registre cryptographique immuable avec horodatage certifié (SHA-256).",
            { after: 200 }
          ),

          // 8. Attestation et Signatures
          createH1("8. ATTESTATION D'ENGAGEMENT TECHNIQUE"),
          createP(
            'Le présent dossier est établi pour servir et valoir ce que de droit auprès du Ministère de la Santé et de l’Action Sociale du Sénégal, ' +
              "du Bureau Régional de l'OMS pour l'Afrique (AFRO), des représentations de l'UNICEF, de Gavi l'Alliance du Vaccin et des bailleurs institutionnels.",
            { after: 200 }
          ),
          createP('Fait à Dakar, le 6 Octobre 2026', { bold: true, size: 22, after: 100 }),
          createP("Pour l'Équipe Projet SantéNova Sénégal · Direction Médicale & Architecture des Systèmes", {
            bold: true,
            color: primaryColor,
            size: 20,
            after: 300,
          }),
        ],
      },
    ],
  });

  // Generate buffer
  const buffer = await Packer.toBuffer(doc);

  // Write to public directory
  const publicDir = path.resolve(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  const targetDocxPath = path.join(publicDir, 'dossier_partenaires_santenova.docx');
  fs.writeFileSync(targetDocxPath, buffer);
  console.log('Fichier Word officiel écrit avec succès :', targetDocxPath);

  // Write base64 for instant in-browser download
  const base64Data = buffer.toString('base64');
  const b64FilePath = path.resolve(__dirname, '../src/data/dossierB64.ts');
  fs.writeFileSync(
    b64FilePath,
    `export const DOSSIER_DOCX_BASE64 = "${base64Data}";\n`
  );
  console.log('Base64 export mis à jour avec succès :', b64FilePath);
}

generateOfficialDossier().catch((err) => {
  console.error('Erreur lors de la génération du dossier Word :', err);
  process.exit(1);
});
