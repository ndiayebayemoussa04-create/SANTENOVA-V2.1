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

          // 7. Attestation et Signatures
          createH1("7. ATTESTATION D'ENGAGEMENT TECHNIQUE"),
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
