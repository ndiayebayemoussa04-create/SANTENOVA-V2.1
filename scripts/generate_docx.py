import os
import zipfile

def create_santenova_docx(filename="/public/dossier_partenaires_santenova.docx"):
    os.makedirs(os.path.dirname(filename), exist_ok=True)

    content_types = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
</Types>'''

    rels = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>'''

    doc_rels = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>'''

    styles = '''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:docDefaults>
    <w:rPrDefault>
      <w:rPr>
        <w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:cs="Calibri"/>
        <w:sz w:val="22"/>
        <w:color w:val="1E293B"/>
      </w:rPr>
    </w:rPrDefault>
  </w:docDefaults>
  <w:style w:type="paragraph" w:styleId="Title">
    <w:name w:val="Title"/>
    <w:rPr>
      <w:b/>
      <w:sz w:val="48"/>
      <w:color w:val="0F766E"/>
    </w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading1">
    <w:name w:val="Heading 1"/>
    <w:rPr>
      <w:b/>
      <w:sz w:val="32"/>
      <w:color w:val="0F766E"/>
    </w:rPr>
  </w:style>
  <w:style w:type="paragraph" w:styleId="Heading2">
    <w:name w:val="Heading 2"/>
    <w:rPr>
      <w:b/>
      <w:sz w:val="26"/>
      <w:color w:val="0369A1"/>
    </w:rPr>
  </w:style>
</w:styles>'''

    # Helper functions for word processing XML
    def p(text="", bold=False, color="1E293B", size=22, align="left", space_after=120):
        jc_xml = f'<w:jc w:val="{align}"/>' if align != "left" else ""
        b_xml = '<w:b/>' if bold else ''
        return f'''<w:p>
  <w:pPr>
    {jc_xml}
    <w:spacing w:after="{space_after}"/>
  </w:pPr>
  <w:r>
    <w:rPr>
      {b_xml}
      <w:color w:val="{color}"/>
      <w:sz w:val="{size}"/>
    </w:rPr>
    <w:t xml:space="preserve">{text}</w:t>
  </w:r>
</w:p>'''

    def h1(title):
        return f'''<w:p>
  <w:pPr>
    <w:spacing w:before="360" w:after="160"/>
    <w:pBdr><w:bottom w:val="single" w:sz="12" w:space="4" w:color="0D9488"/></w:pBdr>
  </w:pPr>
  <w:r>
    <w:rPr>
      <w:b/>
      <w:color w:val="0F766E"/>
      <w:sz w:val="32"/>
    </w:rPr>
    <w:t>{title}</w:t>
  </w:r>
</w:p>'''

    def h2(title):
        return f'''<w:p>
  <w:pPr>
    <w:spacing w:before="240" w:after="120"/>
  </w:pPr>
  <w:r>
    <w:rPr>
      <w:b/>
      <w:color w:val="0369A1"/>
      <w:sz w:val="26"/>
    </w:rPr>
    <w:t>{title}</w:t>
  </w:r>
</w:p>'''

    def table(headers, rows):
        col_count = len(headers)
        width_per_col = 9000 // col_count
        
        xml = '<w:tbl>'
        xml += '<w:tblPr><w:tblW w:w="9000" w:type="dxa"/><w:tblBorders>'
        xml += '<w:top w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/>'
        xml += '<w:left w:val="none"/>'
        xml += '<w:bottom w:val="single" w:sz="8" w:space="0" w:color="0F766E"/>'
        xml += '<w:right w:val="none"/>'
        xml += '<w:insideH w:val="single" w:sz="4" w:space="0" w:color="E2E8F0"/>'
        xml += '<w:insideV w:val="none"/>'
        xml += '</w:tblBorders></w:tblPr>'
        
        # Header Row
        xml += '<w:tr>'
        for h in headers:
            xml += f'''<w:tc>
  <w:tcPr>
    <w:tcW w:w="{width_per_col}" w:type="dxa"/>
    <w:shd w:val="clear" w:color="auto" w:fill="0F766E"/>
    <w:tcMar><w:top w:w="120"/><w:bottom w:w="120"/><w:left w:w="120"/><w:right w:w="120"/></w:tcMar>
  </w:tcPr>
  <w:p><w:r><w:rPr><w:b/><w:color w:val="FFFFFF"/><w:sz w:val="20"/></w:rPr><w:t>{h}</w:t></w:r></w:p>
</w:tc>'''
        xml += '</w:tr>'
        
        # Data Rows
        bg_toggle = False
        for r in rows:
            bg_color = "F8FAFC" if bg_toggle else "FFFFFF"
            bg_toggle = not bg_toggle
            xml += '<w:tr>'
            for idx, c in enumerate(r):
                b_tag = '<w:b/>' if idx == 0 else ''
                xml += f'''<w:tc>
  <w:tcPr>
    <w:tcW w:w="{width_per_col}" w:type="dxa"/>
    <w:shd w:val="clear" w:color="auto" w:fill="{bg_color}"/>
    <w:tcMar><w:top w:w="100"/><w:bottom w:w="100"/><w:left w:w="120"/><w:right w:w="120"/></w:tcMar>
  </w:tcPr>
  <w:p><w:r><w:rPr>{b_tag}<w:color w:val="1E293B"/><w:sz w:val="20"/></w:rPr><w:t>{c}</w:t></w:r></w:p>
</w:tc>'''
            xml += '</w:tr>'
        
        xml += '</w:tbl>'
        return xml

    doc_parts = []
    
    # Title & Metadata
    doc_parts.append(p("RÉPUBLIQUE DU SÉNÉGAL", bold=True, color="047857", size=24, align="center", space_after=40))
    doc_parts.append(p("Un Peuple - Un But - Une Foi", bold=False, color="64748B", size=18, align="center", space_after=200))
    doc_parts.append(p("MINISTÈRE DE LA SANTÉ ET DE L'ACTION SOCIALE", bold=True, color="0F172A", size=22, align="center", space_after=300))
    
    doc_parts.append(p("DOSSIER INSTITUTIONNEL STRATÉGIQUE & TECHNIQUE", bold=True, color="0F766E", size=36, align="center", space_after=80))
    doc_parts.append(p("SANTÉNOVA SÉNÉGAL : DÉPLOIEMENT DU MAILLAGE NUMÉRIQUE & IA ÉTHIQUE DANS LES POSTES DE SANTÉ ET HÔPITAUX", bold=True, color="0369A1", size=24, align="center", space_after=240))
    doc_parts.append(p("À L'ATTENTION DE L'ORGANISATION MONDIALE DE LA SANTÉ (OMS), DU MINISTÈRE DE LA SANTÉ, DES ONGs ET DES BAILLEURS DE FONDS", bold=True, color="475569", size=20, align="center", space_after=400))
    
    # Executive Summary
    doc_parts.append(h1("1. RÉSUMÉ EXÉCUTIF & VISION DU PROJET"))
    doc_parts.append(p(
        "Le projet SantéNova est une réponse intégrée aux goulots d'étranglement majeurs des systèmes de soins en Afrique de l'Ouest : "
        "la mortalité maternelle et néonatale évitable, les déserts médicaux en milieu rural, les ruptures récurrentes d'intrants vitaux (Ocytocine, Sulfate de Magnésium) "
        "et la fracture numérique qui exclut les populations non francophones et non connectées à l'Internet haut débit."
    ))
    doc_parts.append(p(
        "Plutôt que d'introduire des technologies opaques ou des agents déconnectés de la réalité clinique, SantéNova déploie une architecture souveraine, "
        "respectueuse du secret médical et conçue pour fonctionner en mode dégradé (Offline-First) au sein des postes de santé les plus isolés, "
        "tout en assurant la télé-expertise directe avec les gynécologues et spécialistes des Centres Hospitaliers Universitaires (CHU)."
    ))

    # Tableau 1: Indicateurs d'impact clinique
    doc_parts.append(h1("2. TABLEAU DES INDICATEURS D'IMPACT CLINIQUES (CIBLES OMS & PNDS)"))
    t1_headers = ["Indicateur Sanitaire Clé", "Situation Actuelle", "Cible SantéNova (An 2)", "Bénéfice Attendu OMS / ODD 3"]
    t1_rows = [
        ["Couverture des 4 CPN recommandées", "43% en milieu rural", "86% grâce aux relances SMS/Voix", "Réduction mortalité maternelle (-40%)"],
        ["Délai de détection pré-éclampsie", "Souvent au stade éclampsie", "Dépistage dès TA ≥ 140/90", "Zéro décès par éclampsie évitable"],
        ["Ruptures de stock d'Ocytocine", "18 à 35 jours / an", "< 48 heures (Alerte PRA)", "Arrêt des hémorragies de délivrance"],
        ["Temps de réponse télé-expertise", "Plusieurs jours / Non formalisé", "< 30 minutes via IA certifiée", "Avis spécialisé sans déplacement coûteux"],
        ["Inclusion femmes non francophones", "< 15% (Barrière linguistique)", "100% via Voix & SMS Wolof", "Égalité stricte d'accès aux soins"],
        ["Couverture vaccinale PEV (Rougeole)", "71% au niveau national", "94% avec suivi sans rupture", "Prévention épidémies saisonnières"]
    ]
    doc_parts.append(table(t1_headers, t1_rows))
    doc_parts.append(p("Source : Enquête Démographique et de Santé (EDS Sénégal) & Projections d'Impact SantéNova 2026-2029.", color="64748B", size=18, space_after=200))

    # Architecture Hub-and-Spoke
    doc_parts.append(h1("3. ARCHITECTURE CLINIQUE HUB-AND-SPOKE : ÉVITER LE PIÈGE DES SILOS"))
    doc_parts.append(p(
        "L'un des apports majeurs de SantéNova réside dans le refus des agents IA isolés par service. "
        "Une femme enceinte ne se réduisant pas à son utérus, l'IA de maternité est interconnectée au dossier transversal unique. "
        "Cela permet la détection automatique et le blocage immédiat des interactions médicamenteuses fœtotoxiques (ex. interdiction absolue des IEC/ARA2 et proposition automatique de Labétalol)."
    ))

    # Tableau 2: Matrice de déploiement
    doc_parts.append(h1("4. MATRICE OPÉRATIONNELLE : POSTE DE SANTÉ VS HÔPITAL CHU"))
    t2_headers = ["Échelon Sanitaire", "Utilisateurs Cibles", "Outils SantéNova Déployés", "Infrastructure Requise"]
    t2_rows = [
        ["Poste de Santé / Case Rurale", "Sage-femme, Infirmier ICP, Matrone", "Application Offline, CPN OMS, Triage, Stocks Ocytocine", "Tablette Android, Panneau Solaire, 2G"],
        ["Centre de Santé (District)", "Médecin Chef, Laborantin, Sage-femme", "Télé-régulation, Alertes ambulances, Supervision stocks", "Connexion 3G/4G, Ordinateur de bord"],
        ["Hôpital Régional / CHU", "Gynécologues, Cardiologues, Pédiatres", "Télé-expertise asynchrone, RAG documentaire, Partogramme", "Serveur local ou Cloud Souverain Sénégal"],
        ["Domicile de la Patiente", "Femme enceinte, Mère de famille", "Portail Patient, Voix Wolof/FR, Carte QR Code, USSD #123#", "Téléphone 2G basique ou Smartphone"]
    ]
    doc_parts.append(table(t2_headers, t2_rows))

    # Ethique et Réglementation
    doc_parts.append(h1("5. CONFORMITÉ ÉTHIQUE, PROTECTION DES DONNÉES & SOUVERAINETÉ"))
    doc_parts.append(p(
        "1. Principe de Revue Humaine Systématique (Human-in-the-Loop) : "
        "Aucune décision clinique n'est automatisée. Tout signal d'anomalie génère l'obligation de visa d'un soignant qualifié."
    ))
    doc_parts.append(p(
        "2. Conformité CDP Sénégal & RGPD : "
        "La Commission de Protection des Données Personnelles du Sénégal (Loi 2008-12) encadre le consentement explicite de la patiente. "
        "Les données génomiques ou de recherche ne sont jamais exploitées sans accord renforcé actif."
    ))
    doc_parts.append(p(
        "3. Chiffrement de Bout en Bout : "
        "Base de données locale chiffrée AES-256 sur chaque terminal de santé, synchronisation sécurisée par certificats mTLS."
    ))

    # Budget et Plan de Déploiement
    doc_parts.append(h1("6. PLAN BUDGÉTAIRE PRÉVISIONNEL & PHASAGE (SOUTIEN BAILLEURS)"))
    t3_headers = ["Composante du Projet", "Phase 1 (Pilote 6 mois)", "Phase 2 (Régionale 18 mois)", "Phase 3 (Nationale 36 mois)"]
    t3_rows = [
        ["Équipement Postes de Santé (Tablettes + Kit Solaire)", "45 000 USD (30 postes)", "280 000 USD (200 postes)", "950 000 USD (1 200 postes)"],
        ["Passerelle Télécom USSD/SMS & Voix Wolof", "15 000 USD (Opérateurs)", "45 000 USD", "120 000 USD"],
        ["Formation Sages-femmes & Infirmiers ICP", "25 000 USD", "95 000 USD", "250 000 USD"],
        ["Interconnexion DHIS2 & Hébergement Souverain", "30 000 USD", "70 000 USD", "150 000 USD"],
        ["Suivi Évaluation Clinique & Audit Éthique", "20 000 USD", "60 000 USD", "130 000 USD"],
        ["TOTAL ESTIMATIF (USD)", "135 000 USD", "550 000 USD", "1 600 000 USD"]
    ]
    doc_parts.append(table(t3_headers, t3_rows))

    # Signatures institutionnelles
    doc_parts.append(h1("7. ATTESTATION D'ENGAGEMENT TECHNIQUE"))
    doc_parts.append(p(
        "Le présent dossier est établi pour servir et valoir ce que de droit auprès du Ministère de la Santé et de l'Action Sociale du Sénégal, "
        "du Bureau Régional de l'OMS pour l'Afrique (AFRO), des représentations de l'UNICEF, de Gavi l'Alliance du Vaccin et des bailleurs institutionnels.",
        space_after=240
    ))
    doc_parts.append(p("Fait à Dakar, le 6 Octobre 2026", bold=True, color="0F172A", size=22, space_after=120))
    doc_parts.append(p("Pour l'Équipe Projet SantéNova Sénégal · Direction Médicale & Architecture des Systèmes", bold=True, color="0F766E", size=20, space_after=300))

    # Pack document.xml
    document_xml = f'''<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    {''.join(doc_parts)}
    <w:sectPr>
      <w:pgSz w:w="11906" w:h="16838"/>
      <w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134"/>
    </w:sectPr>
  </w:body>
</w:document>'''

    with zipfile.ZipFile(filename, 'w', zipfile.ZIP_DEFLATED) as z:
        z.writestr('[Content_Types].xml', content_types)
        z.writestr('_rels/.rels', rels)
        z.writestr('word/_rels/document.xml.rels', doc_rels)
        z.writestr('word/styles.xml', styles)
        z.writestr('word/document.xml', document_xml)

    print(f"Document Word officiel généré avec succès : {filename}")

if __name__ == '__main__':
    create_santenova_docx()
