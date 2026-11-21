# BENCHMARK FONCTIONNEL APPROFONDI DES 10 SOLUTIONS MONDIALES DE SÉCURITÉ PRIVÉE (ÉTAPE C)
**Référence :** SYNTESIA-OMNI-BENCH-02 (Mission AGIA-007 — Chantier 2, Étape C)  
**Projet destinataire :** `OMNISECUR` (LAB Niveau 2 — COS Opérations Sécurité Privée)  
**Cadre méthodologique :** Protocole Clean-Room en 5 étapes (`VEILLE_TECHNOLOGIQUE_OMNISECUR.md`) — Analyse documentaire publique (OSINT, documentations d'API publiques, centres d'aide éditeurs, schémas UX Refero, inspection d'architectures clientes autorisées via doctrine REA) & Analyse des plaintes utilisateurs (Méthode Prompt 04 `Fb`).  
**Date :** 21 novembre 2026  
**Statut :** `BENCHMARK APPROFONDI DES 10 SOLUTIONS TERMINÉ`

---

## FICHE 01 — TRACKTIK (TRACKFORCE VALIANT — CANADA / USA / EUROPE)

### 1. Identité & Positionnement (`CONFIRMÉ`)
- **Origine :** Montréal (Canada), intégré au groupe **Trackforce Valiant** (avec *Silvertrac*, *CeleriTime*, *Kwant*).
- **Cible :** ETI et grands groupes internationaux de sécurité privée (100 à 20 000+ agents).
- **Positionnement :** Suite intégrée *Enterprise Guarding Management* couvrant le terrain (*Guard Tour*), le centre de contrôle (*Command Center / Dispatch*), le back-office (Contrats, Planification, Pré-paie, Facturation) et le portail client.

### 2. Fonctionnalités Principales & Logique Métier (`VÉRIFIÉ`)
- **Back-Office & Contrats (*Billing & Contracts*) :** Modélisation granulaire des contrats clients avec règles de facturation par poste (*Bill Rate*), majorations de jours fériés facturables ou non au client, et comparaison directe avec le coût salarial (*Pay Rate*).
- **Planification (*Scheduling & Attendance*) :** Affectation sous contrainte de qualifications (*Skills & Certifications*), gestion des postes vacants (*Open Shifts*), détection des retards de prise de poste (*Late Clock-in Alert*) avec escalade vers le superviseur.
- **Opérations Terrain (*Mobile Patrol & Guard Tour*) :** Rondes à points de contrôle NFC/QR Code, instructions spécifiques par point de contrôle (*Checkpoint Prompts* : ex. « Prendre une photo de la vanne fermée »), gestion des clés et équipements.
- **Dispatch & Interventions (*Mobile Dispatch*) :** Réception d'alarmes ou demandes d'intervention, assignation au véhicule de patrouille le plus proche, chronométrage du temps de réponse (*SLA Response Time*).
- **Portail Client (*Client Portal*) :** Tableau de bord en lecture seule pour le donneur d'ordre avec filtres d'approbation (le superviseur peut exiger une relecture interne d'un rapport d'incident sensible avant qu'il ne devienne visible sur le portail client).

### 3. Parcours Utilisateurs & Ergonomie (`VÉRIFIÉ`)
- **Séparation en 4 interfaces :**
  1. *Web Portal (Exploitation / Direction)* : Navigation latérale dense à 7 modules (Clients/Sites, Employés, Planification, Rapports/DAR, Dispatch, Facturation, BI).
  2. *Guard Tour Mobile App (Agent)* : Verrouillable en mode Kiosque Android sur téléphone de site ; écran d'accueil centré sur 4 gros boutons après prise de poste (`Start Tour`, `Report Incident`, `View Post Orders`, `Panic Button`).
  3. *Supervisor View (Chef de secteur)* : Grilles d'audit qualité des agents sur site.
  4. *Client Portal (Donneur d'ordre)* : Vue synthétique des rondes effectuées et des rapports d'incidents approuvés.

### 4. Gestion Terrain, Mobile & Zone Blanche (`VÉRIFIÉ`)
- **Mode Hors-Ligne :** L'application mobile Android/iOS met en cache les consignes du site (*Post Orders*), les formulaires d'incidents et la liste des tags NFC/QR de la ronde au moment du *Check-in*. En sous-sol (zone blanche), les scans NFC et photos sont horodatés localement et empilés dans une file SQLite locale, puis synchronisés dès le retour du réseau avec double horodatage (`created_on_device_at` vs `received_on_server_at`).

### 5. Éléments d'Architecture Accessibles Publiquement (`VÉRIFIÉ`)
- **API RESTful publique documentée :** Architecture multi-tenant exposant des entités structurées (`Accounts/Sites`, `Positions`, `Shifts`, `Employees`, `Checkpoints`, `TourSchedules`, `IncidentReports`, `PostOrders`, `BillItems`).
- **Mécanisme de Webhooks :** Notification d'événements métier (`shift.published`, `checkpoint.scanned`, `incident.created`, `clockin.missed`).

### 6. Modèle Commercial (`CONFIRMÉ PAR RETOURS MARCHÉ`)
- **Tarification :** Sur devis uniquement (non affichée publiquement), facturée soit **par appareil/poste actif sur site** (*Per Device / Site License*), soit **par agent actif**, avec un ticket d'entrée mensuel élevé (généralement > 500 $ à 1 500 $/mois minimum + frais d'implémentation de plusieurs milliers d'euros) et engagement annuel/pluriannuel.

### 7. Forces, Limites & Plaintes Récurrentes des Utilisateurs (Analyse Prompt 04)
- **Forces :** Richesse fonctionnelle inégalée sur le couplage *Terrain (Rondes) ↔ Contrat (Facturation)* ; workflow de modération des rapports d'incidents avant publication au client donneur d'ordre.
- **Limites & Plaintes vérifiées (G2 / Capterra) :**
  1. *Complexité et lourdeur du back-office* : Trop de sous-menus pour créer un simple site et un poste.
  2. *Coût prohibitif pour les PME de 10 à 80 agents*.
  3. *Inadaptation native au droit du travail français* : Conçu pour la logique nord-américaine (*Overtime > 40h/week*), ne intègre pas nativement les règles françaises IDCC 1351 (repos 12h conventionnel / 11h dérogatoire, majorations combinées nuit 10 % + dimanche 10 % + férié 100 %, panier, plancher 6h Avenant n° 2, contrôle CNAPS article L.612-9).
  4. *Tracking GPS continu* : Mis en avant par défaut, ce qui viole la doctrine CNIL en France hors cas exceptionnel d'agent isolé en danger.

### 8. Écarts avec `OMNISECUR` & Opportunités d'Adaptation Clean-Room
- **Avantage déjà acquis par `OMNISECUR v2.3.2` :** OMNISECUR possède déjà le moteur déterministe IDCC 1351 / CSI Livre VI, le protocole zone blanche `offline_event_id` avec horodatage serveur `clock_timestamp()` et audit SHA-256, ainsi que le `COS Bureau IA` (appels d'offres BOAMP) que TrackTik n'a pas.
- **À transposer en Clean-Room dans `OMNISECUR` (Phase 2/3) :**
  1. Le **Sas de Modération des Incidents avant affichage Portail Client** (*Draft Incident ➔ Validé Exploitation ➔ Visible Donneur d'Ordre*), parfaitement aligné avec la doctrine du *Sas Dirigeant* d'OMNISECUR.
  2. Les **Instructions Contextuelles par Point de Ronde** (*Checkpoint Prompt* sur tag NFC/QR).

---

## FICHE 02 — SILVERTRAC SOFTWARE (USA — GROUPE TRACKFORCE)

### 1. Identité & Positionnement (`CONFIRMÉ`)
- **Origine :** Californie (USA), racheté par Trackforce Valiant comme offre PME.
- **Cible :** TPE et PME de gardiennage, surveillance résidentielle/tertiaire et patrouille mobile (10 à 250 agents).
- **Positionnement :** « *Accountability & Client Retention* » — prouver au client donneur d'ordre que la prestation de sécurité est réellement exécutée, grâce à une application agent ultra-simple et des rapports automatisés.

### 2. Fonctionnalités Principales & Logique Métier (`VÉRIFIÉ`)
- **Main Courante par Exception (*Issue Monitor*) :** Tout événement (ronde, incident sécurité, anomalie maintenance, problème parking) est un `Issue Type` pré-catégorisé avec niveau de priorité (Niveau 1 : Critique / Alerte immédiate email+SMS au client ; Niveau 2 : Important ; Niveau 3 : Routine).
- **Rondes Guidées (*Guard Tours*) :** Séquence de points QR/NFC avec compteur à rebours (*Countdown Timer*) indiquant à l'agent le temps restant pour scanner les points de la ronde.
- **Synthèse Quotidienne Automatisée (*Automated DAR Email*) :** Envoi automatique chaque matin à 07h00 au client donneur d'ordre d'un PDF propre récapitulant toutes les rondes, photos et observations de la nuit.

### 3. Parcours Utilisateurs & Ergonomie (`VÉRIFIÉ`)
- **Écran central unique pour le superviseur (*Live Issue Monitor*) :** Flux chronologique temps réel filtrable par site, par agent ou par gravité, permettant de fermer, commenter ou transférer une entrée de main courante en 1 clic.
- **Saisie Agent guidée sans clavier libre excessif :** L'agent choisit un type d'événement dans une liste déroulante préconfigurée pour le site, joint 1 à 3 photos horodatées et dicte ou sélectionne une observation type. Cela évite les fautes de français/rédaction dans les rapports vus par le client.

### 4. Gestion Terrain, Mobile & Zone Blanche (`VÉRIFIÉ`)
- Application mobile très légère ; prise de photo imposée en direct depuis l'appareil photo (interdiction d'importer une vieille photo depuis la galerie du téléphone pour empêcher la fraude d'un agent qui réutiliserait la photo d'une ronde de la veille).

### 5. Éléments d'Architecture Accessibles Publiquement (`VÉRIFIÉ`)
- Modèle de données centré sur `Properties (Sites)` ➔ `Issue Types (Catégories d'événements)` ➔ `Checkpoints (QR/NFC)` ➔ `Tasks (Tâches programmées)` ➔ `Automated Notifications`.

### 6. Modèle Commercial (`CONFIRMÉ`)
- Tarification publique historique par paliers d'agents actifs (environ 125 $/mois pour 5-10 agents jusqu'à 500 $+/mois), sans module de paie ni de planification conventionnelle inclus de base.

### 7. Forces, Limites & Plaintes Récurrentes des Utilisateurs
- **Forces :** Adoption quasi-instantanée par des agents peu technophiles ; **interdiction d'upload galerie photo** (prise de vue live obligatoire) ; rapport PDF matinal automatique adoré par les clients donneurs d'ordre.
- **Limites & Plaintes :** Absence de véritable moteur de planification RH sous contraintes légales (oblige à payer un second logiciel pour les plannings et les heures) ; interface web back-office un peu datée.

### 8. Écarts avec `OMNISECUR` & Opportunités d'Adaptation Clean-Room
- **À transposer en Clean-Room dans `OMNISECUR` :**
  1. **Capture photo temps réel obligatoire** (`capture="environment"` avec vérification d'horodatage EXIF/serveur, interdisant l'import d'anciennes photos de la galerie lors d'une ronde ou d'une main courante).
  2. **Saisie de Main Courante assistée par gabarits pré-rédigés + reformulation sobre** : Permet à un agent de terrain de produire en 15 secondes un rapport professionnel irréprochable pour le client donneur d'ordre.
  3. **Rapport matinal PDF/Web synthétique de fin de nuit** prêt à être validé et envoyé au donneur d'ordre.

---

## FICHE 03 — PROGISAP / SEKUR (FRANCE)

### 1. Identité & Positionnement (`CONFIRMÉ`)
- **Origine :** France (**Progisap**, éditeur historique de `Progisap Sécurité` et de la suite web/mobile `Sekur`).
- **Cible :** PME et ETI françaises de sécurité privée (20 à 1 500 agents).
- **Positionnement :** L'ERP métier français de référence pour la conformité à la Convention Collective Nationale de la Prévention-Sécurité (`IDCC 1351 / Brochure JO 3196`), la planification, la pré-paie et la facturation.

### 2. Fonctionnalités Principales & Logique Métier (`VÉRIFIÉ`)
- **Dossier Agent & Conformité Française :** Gestion des cartes professionnelles CNAPS (Surveillance humaine, Cynophile, Vidéoprotection, APR), diplômes SSIAP 1/2/3, SST, MAC, H0B0, titres de séjour avec blocage ou alerte à la planification.
- **Planification & Pré-Paie IDCC 1351 :** Calcul des compteurs d'heures (modulation, annualisation, cycle, temps partiel), majorations conventionnelles (nuit 21h-06h, dimanche, jours fériés, primes de panier, prime d'habillage/déshabillage, indemnité chien), export vers les logiciels de paie français (*Silae*, *Sage*, *Cegid*, *Nibelis*).
- **Portail Agent & Portail Client (`Sekur`) :** Consultation des plannings, téléchargement des bulletins/ordres de mission, pointage prise/fin de service, main courante.

### 3. Parcours Utilisateurs & Ergonomie (`VÉRIFIÉ`)
- Logique d'ERP de gestion très complète mais structurée autour de grilles tabulaires denses inspirées des logiciels Windows de planification historique.

### 4. Gestion Terrain, Mobile & Zone Blanche (`VÉRIFIÉ`)
- Application mobile agent pour consulter son planning, accuser réception de ses vacations, pointer sa prise de service (télépointage / application) et saisir des événements de main courante.

### 5. Éléments d'Architecture Accessibles Publiquement (`VÉRIFIÉ`)
- Architecture ERP français interfacée par fichiers d'échange normalisés avec les moteurs de paie français (format Silae / DSN) et gestion documentaire PDF.

### 6. Modèle Commercial (`CONFIRMÉ PAR RETOURS MARCHÉ`)
- Sur devis (licence ou abonnement SaaS par tranche d'agents + prestations de paramétrage initial et formation sur plusieurs jours). Coût significatif pour les jeunes sociétés ou TPE/PME de moins de 50 agents.

### 7. Forces, Limites & Plaintes Récurrentes des Utilisateurs
- **Forces :** Maîtrise approfondie de la convention collective française IDCC 1351 et des exports de pré-paie (Silae/Sage).
- **Limites & Plaintes des dirigeants de PME :**
  1. *Ergonomie lourde et vieillissante* : Manque de fluidité visuelle comparé aux SaaS modernes (type Combo ou Notion/Linear).
  2. *Absence de simulateur instantané de prix plancher commercial (« Bouclier Marge »)* directement couplé à un atelier d'appels d'offres publics (`BOAMP`).
  3. *Temps de déploiement et coût de formation initiale élevés*.

### 8. Écarts avec `OMNISECUR` & Opportunités d'Adaptation Clean-Room
- **Positionnement différenciant d'`OMNISECUR` face à Progisap/Sekur :** OMNISECUR offre la **même rigueur déterministe sur les règles vitales du CSI Livre VI et de l'IDCC 1351** (validité CNAPS jusqu'à `shiftEnd`, repos 12h/11h, majorations, plancher 6h Avenant n° 2), mais dans une **interface SaaS moderne, épurée (direction artistique Refero)**, avec un **Bouclier Marge immédiat** et un **atelier d'appels d'offres publics (`COS Bureau IA`)**.
- **À transposer en Clean-Room dans `OMNISECUR` :**
  1. **Connecteur d'export CSV/JSON de Pré-Paie normalisé (compatible Silae / Sage / Cabinet comptable)** récapitulant pour chaque agent : `Heures Normales`, `Heures Nuit (21h-06h)`, `Heures Dimanche`, `Heures Fériées`, `Nombre de Paniers`, `Primes Habillage`, `Indemnités Cynophiles`. C'est un gain de temps massif chaque fin de mois pour le dirigeant et son expert-comptable.

---

## FICHE 04 — SMARTPS (SMART PLANNING SOLUTIONS — FRANCE)

### 1. Identité & Positionnement (`CONFIRMÉ`)
- **Origine :** France.
- **Cible :** PME et ETI françaises de sécurité privée et de sûreté aéroportuaire/événementielle.
- **Positionnement :** Solution web et mobile 100 % dédiée à la sécurité privée en France (Planification, Main courante électronique, Rondes, Pré-paie et Facturation).

### 2. Fonctionnalités Principales & Logique Métier (`VÉRIFIÉ`)
- **Planification multi-vues :** Vue par site/client, vue par agent, vue des postes non couverts (*Vacations à pourvoir*), gestion des trames types et roulements automatiques.
- **Contrôle de Vacation (PC Sécurité / Télésurveillance) :** Suivi des prises de service avec alerte sonore/visuelle en cas de retard de pointage à H+5 ou H+10 minutes, permettant au régulateur d'agir immédiatement.
- **Main Courante Électronique (MCE) & Consignes :** Partage des consignes permanentes et temporaires par site avec traçabilité de lecture.

### 3. Parcours Utilisateurs & Ergonomie (`VÉRIFIÉ`)
- Conçu pour les **Exploitants / Régulateurs de PC Sécurité** qui gèrent plusieurs dizaines de prises de service simultanées à 06h00, 07h00 ou 19h00 et doivent voir d'un coup d'œil qui a pris son poste (Vert), qui est en tolérance (Orange) et qui est en défaut de prise de poste (Rouge).

### 4. Gestion Terrain, Mobile & Zone Blanche (`VÉRIFIÉ`)
- Application mobile agent (Android/iOS) pour pointage, consultation des plannings, demandes de congés/indisponibilités et main courante mobile.

### 5. Éléments d'Architecture Accessibles Publiquement (`VÉRIFIÉ`)
- SaaS Web PHP/JS + API mobile, gestion des profils utilisateurs (Exploitant, Chef de poste, Agent, Client).

### 6. Modèle Commercial (`CONFIRMÉ`)
- Abonnement mensuel sur devis selon le nombre d'agents planifiés et les modules activés + frais de mise en service.

### 7. Forces, Limites & Plaintes Récurrentes des Utilisateurs
- **Forces :** Le **Moniteur de Prise de Service Temps Réel (Vert / Orange / Rouge)** adapté aux heures de relève critiques en France ; gestion des trames de roulement récurrentes.
- **Limites :** Interface back-office très dense (nombreuses icônes et tableaux serrés) ; absence de module natif d'acquisition commerciale / veille marchés publics.

### 8. Écarts avec `OMNISECUR` & Opportunités d'Adaptation Clean-Room
- **À transposer en Clean-Room dans `OMNISECUR` :**
  1. **Générateur de Trames Récurrentes de Vacation** (ex. dupliquer une semaine-type H24 ou un cycle de vacations sur tout un mois en vérifiant automatiquement à la volée les 10 règles de conformité CNAPS/IDCC 1351 sur chaque vacation générée).
  2. **Moniteur de Relève & Prise de Poste (`H-15 min` à `H+15 min`)** sur le dashboard Exploitation permettant de repérer immédiatement une absence non signalée.

---

## FICHE 05 — GUARDHOUSE (AUSTRALIE / ROYAUME-UNI)

### 1. Identité & Positionnement (`CONFIRMÉ`)
- **Origine :** Australie & Royaume-Uni.
- **Cible :** PME et ETI de sécurité privée soumises à des régimes stricts de licences gouvernementales (*SIA License* au Royaume-Uni, *State Security Licences* en Australie).
- **Positionnement :** « *Compliance-First Security Workforce Management* » — un logiciel moderne né spécifiquement pour empêcher l'envoi d'un agent non licencié sur un site et automatiser le calcul des majorations conventionnelles complexes.

### 2. Fonctionnalités Principales & Logique Métier (`VÉRIFIÉ`)
- **Contrôle Automatisé des Licences d'État (*Automated License Checks*) :** Au Royaume-Uni et en Australie, Guardhouse vérifie le numéro de licence de l'agent, suit sa date d'expiration, bloque automatiquement l'affectation si la licence expire avant la fin du poste et alerte l'agent et le dirigeant à J-60 / J-30 / J-7.
- **Moteur d'Interprétation Conventionnelle (*Award Interpreter*) :** Convertit automatiquement les heures pointées en lignes de paie ventilées selon les conventions collectives (*Security Services Industry Award* : taux de nuit, samedi, dimanche, jour férié, heures supplémentaires).
- **Portail de Sous-Traitance (*Subcontractor Management*) :** Permet de partager des vacations non couvertes avec un sous-traitant agréé tout en exigeant que le sous-traitant renseigne les licences de l'agent envoyé.

### 3. Parcours Utilisateurs & Ergonomie (`VÉRIFIÉ`)
- Interface SaaS moderne (très proche des standards *Linear/Refero* : fond clair, typographie nette, badges d'état colorés sans surcharge visuelle).
- Vue de planification avec jauge de conformité instantanée par ligne de poste.

### 4. Gestion Terrain, Mobile & Zone Blanche (`VÉRIFIÉ`)
- Application mobile agent épurée : acceptation/refus de vacations proposées, pointage d'entrée/sortie, mise à jour de ses certificats (photo recto/verso de la nouvelle carte pro soumise à validation back-office).

### 5. Éléments d'Architecture Accessibles Publiquement (`VÉRIFIÉ`)
- Architecture cloud moderne (SPA React/TypeScript + API REST), intégrations natives avec les logiciels comptables/paie anglo-saxons (Xero, KeyPay, MYOB).

### 6. Modèle Commercial (`CONFIRMÉ`)
- Abonnement SaaS mensuel par agent actif (environ 5 £ à 9 £ / agent / mois selon paliers).

### 7. Forces, Limites & Plaintes Récurrentes des Utilisateurs
- **Forces :** C'est le logiciel international dont la philosophie (« *Conformité licence + Moteur de règles salariales + UX moderne* ») est la plus proche d'`OMNISECUR`. Son module de **conformité des sous-traitants** répond à un vrai besoin métier.
- **Limites :** Totalement absent du marché français (aucune prise en charge du français, du CNAPS/TELECARTE, de l'IDCC 1351 ni des règles de sous-traitance du Livre VI du CSI). Moins poussé sur les rondes NFC hors-ligne que TrackTik/QR-Patrol.

### 8. Écarts avec `OMNISECUR` & Opportunités d'Adaptation Clean-Room
- **Validation stratégique majeure pour `OMNISECUR` :** Le succès fulgurant de Guardhouse au Royaume-Uni et en Australie prouve qu'un **SaaS moderne centré sur le blocage déterministe des licences expirées et le calcul exact des coûts conventionnels** remplace avantageusement les vieux ERP historiques.
- **À transposer en Clean-Room dans `OMNISECUR` :**
  1. **Workflow de Renouvellement de Titre initié par l'Agent avec Sas de Validation Dirigeant** : L'agent photographie son nouveau récépissé MAC/SST/CNAPS depuis son mobile ➔ le document entre en statut `EN_ATTENTE_VERIFICATION` dans le Sas Dirigeant ➔ la date d'expiration n'est prolongée dans le moteur déterministe qu'après validation humaine du dirigeant/RH.
  2. **Module de Vigilance Sous-Traitance Livre VI** : Contrôle documentaire avant d'affecter une vacation à une société sous-traitante (autorisation d'exercer CNAPS de la société sous-traitante, attestation URSSAF < 6 mois, carte pro de l'agent sous-traitant).

---

## FICHE 06 — OFFICERAPPS (USA)

### 1. Identité & Positionnement (`CONFIRMÉ`)
- **Origine :** USA.
- **Cible :** TPE et PME de gardiennage (5 à 150 agents).
- **Positionnement :** Suite tout-en-un abordable et sans fioritures combinant *Guard Tour*, Main Courante (*DAR*), Consignes de site (*Post Orders*) et Pointage.

### 2. Fonctionnalités Principales & Logique Métier (`VÉRIFIÉ`)
- **Consignes de Site avec Signature de Prise de Connaissance (*Post Orders Acknowledgment*) :** Lorsqu'un dirigeant met à jour une consigne de sécurité sur un site client (ex. « Nouveau code portail logistique » ou « Procédure Vigipirate »), l'application mobile bloque le démarrage de la vacation tant que l'agent n'a pas lu et signé numériquement (*Tap to Acknowledge*) la nouvelle consigne.
- **Journal d'Activité Quotidien (*Electronic DAR*) :** Au lieu de créer des rapports isolés, l'agent alimente tout au long de sa vacation un journal chronologique continu (`08:00 Prise de service`, `09:15 Ronde Bâtiment A RAS`, `11:30 Contrôle livraison camion #42`, `20:00 Fin de service et passation`).
- **Suivi du Matériel & des Clés (*Equipment & Key Tracking*) :** Traçabilité de la remise du trousseau de clés, de la radio PTI ou du véhicule entre l'agent sortant et l'agent entrant.

### 3. Parcours Utilisateurs & Ergonomie (`VÉRIFIÉ`)
- Interface très directe, pensée pour des dirigeants de TPE qui n'ont pas de directeur informatique : 1 écran par fonction, formulaires courts.

### 4. Gestion Terrain, Mobile & Zone Blanche (`VÉRIFIÉ`)
- Support QR Code et NFC sur smartphone standard ; file d'attente locale en cas de coupure réseau temporaire.

### 5. Éléments d'Architecture Accessibles Publiquement (`VÉRIFIÉ`)
- Application Web multi-tenant + applications natives Android/iOS légères.

### 6. Modèle Commercial (`CONFIRMÉ`)
- Tarification modulaire transparente (~50 $ à 200 $/mois selon le nombre de sites ou d'agents), permettant de n'activer que le *Guard Tour* ou d'y ajouter le planning.

### 7. Forces, Limites & Plaintes Récurrentes des Utilisateurs
- **Forces :** Le **blocage de prise de poste jusqu'à lecture et validation de la nouvelle consigne de site** (*Post Order Gate*) et le **registre de passation des clés/équipements** entre deux vacations.
- **Limites :** Planification très basique (aucun contrôle de temps de repos complexe ni calcul de coût de revient conventionnel).

### 8. Écarts avec `OMNISECUR` & Opportunités d'Adaptation Clean-Room
- **À transposer en Clean-Room dans `OMNISECUR` :**
  1. **Sas d'Émargement Obligatoire des Consignes de Site à la Prise de Poste** : Avant de valider son pointage d'entrée (`clock_in`), l'agent voit s'afficher toute nouvelle consigne critique du site et doit cliquer sur `[J'ai pris connaissance des consignes du poste]` (horodaté côté serveur via `clock_timestamp()`). En cas de litige avec le client donneur d'ordre, le dirigeant dispose de la preuve opposable que la consigne a été transmise et lue.
  2. **Checklist de Passation de Poste (Clés / Radio / PTI / Main courante)** entre l'agent sortant et l'agent entrant.

---

## FICHE 07 — CELAYIX (CANADA)

### 1. Identité & Positionnement (`CONFIRMÉ`)
- **Origine :** Vancouver (Canada).
- **Cible :** Entreprises de sécurité privée, événementiel et services à forte volumétrie d'heures postées.
- **Positionnement :** Le moteur algorithmique de planification sous contraintes et d'auto-remplacement le plus puissant d'Amérique du Nord.

### 2. Fonctionnalités Principales & Logique Métier (`VÉRIFIÉ`)
- **Moteur de Règles Paramétrables (*Configurable Rules Engine*) :** Permet de distinguer les règles **bloquantes (*Hard Rules*)** (ex. carte pro expirée, double affectation, repos légal violé) des règles **d'optimisation avec avertissement (*Soft Rules*)** (ex. dépassement du quota d'heures contractuel générant des heures supplémentaires, préférence géographique de l'agent, affinité client).
- **Auto-Planification & Recherche de Remplaçant Classée par Coût (*Cost-Ranked Find Replacement*) :** Lorsqu'un agent est absent, Celayix ne se contente pas de lister les agents qualifiés et disponibles : il les **classe par impact financier sur la marge** (en plaçant en tête les agents qualifiés qui peuvent absorber la vacation en heures normales ou complémentaires sans déclencher d'heures supplémentaires majorées à +25 % ou +50 %).
- **Bourse de Vacations Ouvertes (*Shift Bidding / Self-Scheduling*) :** Le planificateur publie une vacation vacante ; seuls les agents pré-filtrés par le moteur de conformité reçoivent la notification sur leur mobile et peuvent postuler en 1 clic ; le planificateur (ou le dirigeant) valide le candidat retenu.

### 3. Parcours Utilisateurs & Ergonomie (`VÉRIFIÉ`)
- Grille de planification haute densité orientée *Power-User* (raccourcis clavier, filtres multicritères, simulation d'impact financier du planning avant publication).

### 4. Gestion Terrain, Mobile & Zone Blanche (`VÉRIFIÉ`)
- Application mobile centrée sur la disponibilité des agents, la candidature aux vacations ouvertes (*Shift Bidding*), la confirmation de présence à H-24 (*Shift Confirmation Check*) et le pointage.

### 5. Éléments d'Architecture Accessibles Publiquement (`VÉRIFIÉ`)
- Solveur de contraintes côté serveur évaluant en parallèle : `[Disponibilité] ∩ [Qualifications valides jusqu'à shiftEnd] ∩ [Repos inter-vacation] ∩ [Coût marginal de la vacation]`.

### 6. Modèle Commercial (`CONFIRMÉ`)
- Sur devis selon le volume d'employés planifiés et les modules (Auto-Scheduling, Time & Attendance, AI).

### 7. Forces, Limites & Plaintes Récurrentes des Utilisateurs
- **Forces :** Le **tri des remplaçants par impact sur la marge brute** (*éviter de choisir un remplaçant qui fait basculer la vacation à perte à cause des heures supplémentaires*) et la **confirmation préventive à H-24** qui réduit drastiquement les *No-Shows* (absences surprises à 06h00 du matin).
- **Limites :** Aucun module de rondes NFC/QR ni de main courante électronique de sécurité ; interface complexe à maîtriser.

### 8. Écarts avec `OMNISECUR` & Opportunités d'Adaptation Clean-Room
- **Synergie directe avec les Modules F4 (Remplacement) et F5 (Rentabilité) d'`OMNISECUR` :**
  1. **Enrichir le moteur de remplacement F4 d'`OMNISECUR` avec un score de coût marginal :** Parmi les agents conformes (CNAPS/SSIAP OK + repos >= 12h/11h OK), afficher pour chaque remplaçant proposé l'impact immédiat sur le compteur d'heures mensuel/hebdomadaire et sur la **marge nette de la vacation** (`Vert : Heures normales / Marge préservée` vs `Orange : Déclenche majoration Heures Sup / Marge réduite`).
  2. **Confirmation préventive de vacation à J-1 (`H-24`) :** Demander à l'agent de confirmer en 1 clic sa vacation du lendemain ; en l'absence de confirmation à `H-12`, alerter l'exploitation pour préparer un remplaçant à froid plutôt qu'en panique à `H+5 min`.

---

## FICHE 08 — CONNECTEAM (ISRAËL / USA)

### 1. Identité & Positionnement (`CONFIRMÉ`)
- **Origine :** Tel Aviv / New York.
- **Cible :** Plus de 36 000 entreprises mondiales ayant des équipes terrain sans bureau (*Deskless Workforce* : sécurité privée, BTP, nettoyage, logistique, restauration).
- **Positionnement :** La « Super-App » mobile employé combinant Plannings, Pointage, Checklists opérationnelles, Formulaires terrain, Coffre-fort documentaire et Communication interne.

### 2. Fonctionnalités Principales & Logique Métier (`VÉRIFIÉ`)
- **Constructeur de Checklists & Formulaires Mobiles (*Digital Forms & Checklists*) :** Permet de créer sans code n'importe quel rapport terrain : rapport d'ouverture/fermeture de site, ronde de sécurité incendie, contrôle d'extincteurs, déclaration d'incident avec champs obligatoires (photo en direct, menu déroulant, localisation ponctuelle, signature au doigt sur l'écran).
- **Coffre-Fort d'Habilitations (*Employee Documents & Expiration Packs*) :** Chaque agent dispose d'un portefeuille numérique sur son téléphone contenant sa carte pro, son SST et son SSIAP (présentable immédiatement en cas de contrôle CNAPS ou Police sur site), avec relance automatique de renouvellement.
- **Communication Interne Encadrée :** Annonces officielles de la direction avec accusé de lecture nominatif (remplaçant les groupes WhatsApp informels où les consignes se perdent et qui posent des problèmes RGPD/droit à la déconnexion).

### 3. Parcours Utilisateurs & Ergonomie (`VÉRIFIÉ`)
- **Ergonomie mobile de classe mondiale :** Zéro formation requise pour l'agent ; fil d'actualité clair, boutons d'action larges, temps de réponse instantané.
- Côté manager : vue immédiate du taux de complétion (`18/20 agents ont lu la note de service`, `4/4 checklists de fermeture complétées`).

### 4. Gestion Terrain, Mobile & Zone Blanche (`VÉRIFIÉ`)
- Application mobile native iOS/Android prioritaire (*Mobile-First*).

### 5. Éléments d'Architecture Accessibles Publiquement (`VÉRIFIÉ`)
- Architecture modulaire en 3 Hubs (*Operations*, *Communications*, *HR & Skills*), API REST publique pour synchroniser les utilisateurs et les pointages.

### 6. Modèle Commercial (`CONFIRMÉ`)
- Gratuit jusqu'à 10 utilisateurs (*Small Business Plan*), puis forfaits par paliers de 30 utilisateurs (~29 $ à 99 $/mois par Hub). Attention : l'addition des 3 Hubs en version Expert fait rapidement grimper la facture au-delà de 300 $/mois.

### 7. Forces, Limites & Plaintes Récurrentes des Utilisateurs
- **Forces :** Le **Portefeuille Numérique Agent sur Mobile (Carte Pro CNAPS + Ordre de Mission + Consignes présentables lors d'un contrôle sur site)** et les **Checklists avec signature tactile**.
- **Limites :** Aucun moteur de sécurité privée française (ne connaît ni la règle de validité CNAPS jusqu'à `shiftEnd`, ni les majorations IDCC 1351, ni le chiffrage Bouclier Marge, ni le portail client donneur d'ordre).

### 8. Écarts avec `OMNISECUR` & Opportunités d'Adaptation Clean-Room
- **À transposer en Clean-Room dans `OMNISECUR` (Vue Agent F2/F6) :**
  1. **Mode « Contrôle sur Site CNAPS / Forces de l'Ordre » en 1 clic sur la Vue Agent d'`OMNISECUR` :** Un bouton dédié sur l'écran mobile de l'agent qui affiche instantanément en plein écran (même hors-ligne grâce au cache local) : son **Ordre de Mission officiel signé (avec mention CSI Art. L.612-9)**, le **numéro et la date de validité de sa Carte Professionnelle CNAPS**, son **diplôme SSIAP/SST** et l'**autorisation d'exercer de l'entreprise**. C'est une fonctionnalité à très haute valeur ajoutée spécifiquement française !
  2. *(Bonus Portefeuille LAB)* : Les checklists photo/signature de Connecteam inspirent également les futures briques `Omni-X` pour le **Nettoyage / Facility Management** et le **BTP** (Catalogue AGIA-005).

---

## FICHE 09 — QR-PATROL (TERRACOM — GRÈCE / EUROPE)

### 1. Identité & Positionnement (`CONFIRMÉ`)
- **Origine :** Ioannina (Grèce — Union Européenne).
- **Cible :** PME et ETI européennes de gardiennage et de rondes mobiles.
- **Positionnement :** Spécialiste européen léger et économique de la gestion des rondes (*Guard Tour*) par QR Code, tags NFC et balises Bluetooth Low Energy (BLE), conforme au cadre européen.

### 2. Fonctionnalités Principales & Logique Métier (`VÉRIFIÉ`)
- **Triple technologie de point de contrôle (`QR` / `NFC` / `BLE`) :**
  - *QR Code imprimé* : Coût 0 €, déploiement immédiat sur un site temporaire ou événementiel (mais photocopiable si non couplé à un contrôle contextuel).
  - *Tag NFC passif (NTAG213/215)* : Coût très faible (~0,30 € le tag autocollant), **non photocopiable** grâce à son identifiant matériel unique (`UID` gravé en usine) lu par induction à moins de 4 cm.
  - *Balise BLE* : Détection de passage dans une zone intérieure sans contact.
- **Détection de Ronde Manquée ou Hors Tolérance (*Missed / Late Tour Alert*) :** Si une ronde prévue entre `22h00` et `22h45` n'a pas démarré à `22h15` ou si un point de contrôle obligatoire est sauté, une alerte est générée en temps réel avec obligation pour l'agent de saisir un motif de dérogation.

### 3. Parcours Utilisateurs & Ergonomie (`VÉRIFIÉ`)
- Interface mobile minimaliste : bouton `Scan QR`, bouton `Scan NFC`, bouton `SOS`, bouton `Incident / MME (Multimedia Event)`.

### 4. Gestion Terrain, Mobile & Zone Blanche (`VÉRIFIÉ`)
- **Protocole Zone Blanche éprouvé :** Stockage local des scans QR/NFC avec leur timestamp matériel et envoi groupé dès la reconnexion cellulaire/Wi-Fi.

### 5. Éléments d'Architecture Accessibles Publiquement (`VÉRIFIÉ`)
- Utilisation sur Android de l'API standard **Web NFC (`NDEFReader`)** ou du lecteur NFC natif, et de l'API caméra `BarcodeDetector` / WebRTC pour les QR Codes.

### 6. Modèle Commercial (`CONFIRMÉ`)
- Très accessible (~2 € à 4 € par point/licence ou ~15 € à 20 € par appareil mobile de ronde / mois).

### 7. Forces, Limites & Plaintes Récurrentes des Utilisateurs
- **Forces :** Légèreté, fiabilité du couple **QR Code (gratuit pour démarrage immédiat) + Tag NFC (anti-fraude à 0,30 €)**, et respect naturel du pointage ponctuel sur point de contrôle (sans nécessiter de pistage GPS continu interdit par la CNIL).
- **Limites :** Ne gère absolument pas le reste de l'entreprise de sécurité (ni contrats, ni planification RH, ni CNAPS, ni IDCC 1351, ni rentabilité).

### 8. Écarts avec `OMNISECUR` & Opportunités d'Adaptation Clean-Room
- **Compatibilité technique directe avec le socle `Next.js 15 + Supabase v2.3.2` d'`OMNISECUR` :**
  - Le navigateur mobile Chrome sur Android supporte nativement l'**API Web NFC (`NDEFReader`)** et la lecture **QR Code par caméra HTML5** sans même nécessiter de publier une application lourde sur les stores dans un premier temps (PWA installable) !
  - Et surtout, l'architecture `v2.3.2` d'`OMNISECUR` possède **déjà** le mécanisme cryptographique de zone blanche (`offline_event_id` unique anti-rejeu + horodatage serveur `clock_timestamp()` + chaîne SHA-256) documenté dans `RAPPORT-CERTIFICATION-TECHNIQUE.md` (`f6b1a87`). Il suffira en Phase 2 de brancher les événements `checkpoint_scan (QR/NFC)` sur ce même pipeline certifié !

---

## FICHE 10 — COMBO (EX-SNAPSHIFT — FRANCE)

### 1. Identité & Positionnement (`CONFIRMÉ`)
- **Origine :** Paris (France).
- **Cible :** TPE et PME françaises à équipes postées (HCR, Retail, Boulangerie, Pharmacies, et jeunes sociétés de Sécurité privée).
- **Positionnement :** La référence française de l'ergonomie de planification RH et de suivi des temps pour les dirigeants de PME qui veulent abandonner Excel en moins d'une heure.

### 2. Fonctionnalités Principales & Logique Métier (`VÉRIFIÉ`)
- **Grille de Planification Visuelle Ultra-Fluide :** Création de plannings par glisser-déposer (*Drag & Drop*), duplication de semaine type en 2 clics, affichage en temps réel du compteur d'heures hebdomadaires de chaque salarié à gauche de sa ligne et du ratio `Masse Salariale Planifiée / Budget` en haut de l'écran.
- **Publication & Notification Différentielle :** Lorsqu'un dirigeant modifie un planning déjà publié, seuls les salariés dont les horaires ont changé reçoivent une notification ciblée (SMS/Push/Email) avec mise en évidence de la modification.
- **Feuilles d'Émargement & Export Paie :** Comparaison côte à côte entre `Horaire Planifié` et `Horaire Réel Pointé`, validation en 1 clic ou ajustement motivé par le manager, puis export vers Silae / PayFit.

### 3. Parcours Utilisateurs & Ergonomie (`VÉRIFIÉ`)
- C'est l'étalon d'expérience utilisateur (*UX Benchmark*) en France : zéro jargon technique, codes couleurs doux et lisibles, panneaux latéraux (*Slide-over Drawers*) pour éditer une vacation sans quitter la vue globale du planning.

### 4. Gestion Terrain, Mobile & Zone Blanche (`VÉRIFIÉ`)
- Application mobile salarié très appréciée pour sa clarté (planning personnel, solde de compteurs, demande d'absence) et badgeuse numérique sur tablette (*Kiosque*).

### 5. Éléments d'Architecture Accessibles Publiquement (`VÉRIFIÉ`)
- Application Web SPA moderne avec calcul réactif côté client des totaux d'heures lors du déplacement d'un bloc de vacation.

### 6. Modèle Commercial (`CONFIRMÉ`)
- Abonnement par établissement ou par tranche de salariés actifs (~70 € à 150 € HT/mois par établissement selon effectif).

### 7. Forces, Limites & Plaintes Récurrentes des Utilisateurs
- **Forces :**
  1. **L'UX de la grille de planning** (bandeau financier temps réel en haut de grille + tiroir latéral d'édition + notification différentielle uniquement aux agents modifiés).
  2. **L'écran de réconciliation `Planifié vs Réel Pointé`** en fin de semaine/mois.
- **Limites rédhibitoires pour une société de sécurité privée en croissance :** Combo est un outil RH généraliste né dans la restauration (HCR). Il ne gère pas la logique **Multi-Clients / Multi-Sites / Multi-Postes H24** propre à la sécurité privée, ne vérifie pas l'expiration d'une carte professionnelle CNAPS à l'heure de fin de vacation (`shiftEnd`), ne génère pas d'Ordre de Mission conforme à l'article L.612-9 du CSI, et ne possède ni main courante, ni rondes, ni portail client donneur d'ordre.

### 8. Écarts avec `OMNISECUR` & Opportunités d'Adaptation Clean-Room
- **À transposer en Clean-Room dans `OMNISECUR` :**
  1. **Bandeau de Rentabilité Temps Réel en haut du Planning (`Marge Brute Prévisionnelle de la Semaine / du Site`)** : À chaque affectation ou remplacement dans `OMNISECUR`, le dirigeant voit instantanément si le site reste au-dessus de son seuil de rentabilité plancher.
  2. **Écran de Réconciliation Hebdomadaire `Heures Planifiées vs Heures Pointées vs Heures Facturables`** avec validation en 1 clic par le dirigeant avant facturation et pré-paie.
  3. *(Bonus Portefeuille LAB)* : L'analyse de Combo éclaire directement les besoins de la verticale **HCR (Hôtellerie, Cafés, Restauration — `IDCC 1979`)** du catalogue sectoriel SYNTESIA (`AGIA-005`).
