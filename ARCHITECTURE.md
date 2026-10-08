# ARCHITECTURE.md — Architecture Système SantéNova v2.1

## 1. Vue d'Ensemble
L'architecture de SantéNova s'articule autour d'un pipeline d'orchestration asynchrone gouverné par le Safety Engine :

```
[ Événement Clinique / Requête ]
                ↓
    [ Contexte & Consentement ]
                ↓
           [ Routeur IA ]
                ↓
 [ Module Spécialisé (RAG, Vision, Genomics, Wearable, Nudge, Exposome) ]
                ↓
        [ Safety Engine ]
     (Filtres Anti-Diagnostic,
      Seuil Confiance & Red Flags)
                ↓
    [ Statut Décisionnel ]
    - AUTO_SAFE
    - HUMAN_REVIEW_REQUIRED
    - REJECTED
                ↓
    [ Workflow & Action Soignante ]
                ↓
     [ Registre d'Audit Immuable ]
```

## 2. Composants Principaux
- **RAG Engine** : Recherche vectorielle et lexicale sur documents cliniques chunkés avec extraction de citations strictes.
- **Safety Engine** : Moteur de règles déterministes vérifiant l'absence d'assertion diagnostique non autorisée, de prescription ou de modification de posologie.
- **Trust Center** : Gestionnaire de consentement par finalité (`CARE`, `PERSONALIZATION`, `RESEARCH`, `PUBLIC_HEALTH`, `COMMUNICATION`).
- **Compute Provider** : Détection dynamique AMD ROCm™ avec repli sans latence sur CPU multi-cœur.
- **Moteur Clinique Déterministe & Edge-First** : Évaluation autonome locale (Partogramme OMS, surveillance pré-éclampsie, tri pédiatrique d'urgence, alerte néonatale) exécutée in-browser / IndexedDB sans dépendance réseau.

---

## 3. Déploiement Universel : Edge-First & Zero-Dependency

Le moteur de SantéNova est conçu dès son architecture fondamentale pour être déployé et opéré n’importe où dans le monde, y compris dans les zones rurales isolées (Afrique de l'Ouest, Afrique Centrale, Asie du Sud-Est, Amérique Latine, dispensaires insulaires).

### 3.1 Piliers d'Autonomie & Prêt à l'Emploi

| Propriété | Spécification Technique | Impact Terrain |
| :--- | :--- | :--- |
| **Autonomie Totale Hors-Ligne** | Les calculs cliniques (Partogramme OMS, triage pédiatrique, scores obstétricaux) s'exécutent directement sur l'appareil (IndexedDB, PWA Service Worker, WebAssembly local), sans aucun appel vers un serveur tiers distant. | Fonctionne sans interruption même en cas de coupure Internet de plusieurs semaines ou dans un poste de santé en zone blanche. |
| **Portabilité Docker Universelle** | Le moteur tourne dans un conteneur standard Linux x86_64 et ARM (Intel NUC, serveur d'hôpital, PC portable reconditionné, Raspberry Pi 4/5). | Se déploie en moins de 2 minutes avec `docker compose up -d` sans installer d'environnement complexe préalable. |
| **Normes Médicales Internationales** | Alignement strict sur les référentiels de l'OMS (Organisation Mondiale de la Santé), formats d'interopérabilité HL7 FHIR R4 et passerelles épidémiologiques DHIS2. | Reconnu et compatible avec les systèmes d'information hospitaliers des Ministères de la Santé et des ONG partenaires (UNICEF, Croix-Rouge, MSF). |
| **Zéro Coût de Licence Propriétaire** | Noyau ouvert et autonome, sans abonnement cloud mensuel requis pour fonctionner au chevet des patientes. | Zéro barrière financière pour les structures publiques et les dispensaires communautaires. |

---

## 4. Adaptabilité Pays en 15 Minutes

Aucun code n'a besoin d'être réécrit pour déployer le moteur dans un nouveau pays ou un nouveau district sanitaire. Trois fichiers de paramétrage suffisent :

1. **La Liste Nationale des Médicaments Essentiels (LNME) :**
   - Le module pharmacie charge le catalogue national (ex. PNA au Sénégal, CAMEG au Burkina Faso, FEDECAME en RDC, etc.).
2. **Le Réseau Télécom Local (Passerelle SMS & Alertes) :**
   - *En milieu urbain :* passerelle API SMS (Orange, MTN, Moov, Twilio).
   - *En milieu rural / poste isolé :* dongle USB 4G standard (modem GSM avec carte SIM prépayée locale) connecté au serveur local.
3. **Langues et Dialectes Locaux (Synthèse Vocale) :**
   - Prise en charge native du Français, de l'Anglais et des synthèses/transcriptions vocales en langues locales (Wolof, Pulaar, Bambara, etc.) pour les agents de santé communautaires et les patientes analphabètes.

---

## 5. Environnements de Déploiement Immédiat

- **En Salle d'Accouchement & Maternité de District :** Tablettes tactiles durcies ou grand public (Android / iOS) connectées en Wi-Fi local hors-ligne pour la surveillance dynamique du travail et des constantes vitales.
- **En Ambulance ou Clinique Mobile :** PC portable durci ou tablette autonome pour le triage rapide et l'orientation des évacuations avant l'arrivée au centre de référence.
- **Au Niveau d'une Région Médicale ou d'un Ministère :** Nœud d'agrégation sécurisé pour la consolidation épidémiologique, l'alerte précoce de morbidité et la gestion des stocks de médicaments d'urgence.

---

## 6. Architecture Multi-Appareils (Progressive Web App)

- **Smartphones (Android & iOS) :** Installation immédiate en 1 clic ("Ajouter à l'écran d'accueil"), fonctionnement 100% hors-ligne via Service Worker, questionnaire d'auto-évaluation vocale et fiche d'urgence avec QR Code.
- **Tablettes (Postes de soins / Salle d'examen) :** Interface tactile bicolonne adaptée au port de gants médicaux, mode Kiosque sécurisé pour salle d'attente.
- **Ordinateurs (Postes de garde / Secrétariat) :** Application bureau autonome (Chrome/Edge PWA), impression directe A4 sans marge pour archivage papier légal.

