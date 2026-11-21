# CARTOGRAPHIE MONDIALE DES SOLUTIONS LOGICIELLES DE SÉCURITÉ PRIVÉE (ÉTAPE A & ÉTAPE B)
**Référence :** SYNTESIA-OMNI-BENCH-01 (Mission AGIA-007 — Chantier 2, Étapes A & B)  
**Projet destinataire :** `OMNISECUR` (LAB Niveau 2 — COS Opérations Sécurité Privée) & Verticale 1 SYNTESIA  
**Méthodologie :** Collecte documentaire ouverte (OSINT, centres d'aide publics, spécifications d'API publiques, retours d'exploitation dirigeants Capterra/G2/Trustpilot) & Tamis réglementaire français (`CSI Livre VI`, `CNAPS`, `IDCC 1351 / Brochure 3196`, `Doctrine CNIL Géolocalisation`).  
**Date :** 21 novembre 2026  
**Statut :** `CARTOGRAPHIE MONDIALE ÉTABLIE (28 SOLUTIONS RECENSÉES) — 10 SOLUTIONS SÉLECTIONNÉES`

---

## 1. PÉRIMÈTRE DES 15 FONCTIONS CLÉS OBSERVÉES

Pour dépasser la simple liste initiale de 12 logiciels et établir un panorama mondial exhaustif, chaque solution identifiée a été analysée au regard des **15 fonctions critiques d'une entreprise de sécurité privée** :

1. **Planification des agents (`F01`)** : Création, duplication et publication des plannings de vacations (postes fixes H24, SSIAP, événementiel).
2. **Gestion des vacations et des heures (`F02`)** : Calcul des heures normales, majorations nuit/dimanche/jours fériés, paniers, habillage et heures supplémentaires.
3. **Remplacements et urgences (`F03`)** : Recherche filtrée de remplaçants qualifiés, bourse de vacations (*Open Shifts / Shift Bidding*), appel d'urgence et génération d'Ordre de Mission.
4. **Conformité et habilitations (`F04`)** : Contrôle de validité des licences d'État (Carte Pro CNAPS en France, licence SIA au UK, BSIS Guard Card aux USA) et certificats (MAC, SST, SSIAP, CQP, carte chien) jusqu'à la fin de la vacation.
5. **Pointage et présence (`F05`)** : Prise et fin de service horodatées (QR Code, tag NFC, biométrie autorisée ou pointage géolocalisé ponctuel).
6. **Rondes et interventions (`F06`)** : *Guard Tour System* (points de contrôle NFC/QR/balises BLE, rondes aléatoires, levées de doute sur alarme).
7. **Main courante électronique (`F07`)** : Journal de bord numérique horodaté et inaltérable (*DAR — Daily Activity Report*), passation de consignes entre vacations.
8. **Application mobile terrain (`F08`)** : Ergonomie agent sur smartphone (consultation planning, consignes de site, pointage, signalement d'incident photo/audio).
9. **Mode hors-ligne / zone blanche (`F09`)** : Continuité de fonctionnement en sous-sol, parking ou site industriel sans réseau 4G/5G avec resynchronisation anti-rejeu.
10. **Portail client donneur d'ordre (`F10`)** : Accès transparent mais cloisonné pour le client final (consultation des rapports de ronde, main courante filtrée, présence effective, KPI de contrat).
11. **Gestion documentaire (`F11`)** : Consignes de poste (*Post Orders*), plans de prévention, dossiers agents, attestations de vigilance sous-traitants.
12. **Facturation et rentabilité (`F12`)** : Rapprochement heures planifiées / heures pointées / heures facturées (*Bill Rate vs Pay Rate*) et protection de la marge brute par site.
13. **Tableau de bord dirigeant (`F13`)** : Pilotage exécutif temps réel (taux de couverture des postes, alertes de non-conformité, masse salariale chargée, rentabilité par contrat).
14. **Contrôle qualité et audit (`F14`)** : Grilles d'inspection superviseur sur site, traçabilité cryptographique des modifications, piste d'audit pour contrôleurs (CNAPS / Inspection du travail).
15. **Automatisation et IA (`F15`)** : Auto-planification sous contraintes, synthèse de main courante par IA, détection d'anomalies de pointage, veille appels d'offres et génération de mémoires techniques.

---

## 2. ÉTAPE A — CARTOGRAPHIE INTERNATIONALE ÉLARGIE (28 SOLUTIONS MONDIALES)

L'exploration mondiale a permis de cartographier **28 solutions logicielles** réparties en **5 grandes familles géographiques et fonctionnelles** (allant bien au-delà des 12 acteurs initialement cités en AGIA-006) :

### A. France & Europe Continentale (Spécialistes CCN 1351 / Sécurité & Planification sous contraintes)

| # | Solution & Éditeur | Pays d'origine | Cible principale | Fonctions fortes (sur les 15) | Limite principale observée (`CONFIRMÉ` / `VÉRIFIÉ`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **01** | **Progisap / Sekur**<br>*(Progisap)* | **France** | PME & ETI Sécurité privée (20 à 1 000+ agents) | `F01`, `F02`, `F04`, `F12` (Paie & pré-paie IDCC 1351 native, facturation contrats, portail agent). | Interface historique dense (héritage client lourd / ERP classique), courbe d'apprentissage élevée, coût de licence + déploiement lourd pour TPE/PME agiles. |
| **02** | **SmartPS**<br>*(Smart Planning Solutions)* | **France** | PME & Grands comptes Sécurité privée | `F01`, `F02`, `F04`, `F05`, `F07`, `F08` (Planification dédiée sécurité privée française, pré-paie, main courante web/mobile). | Ergonomie fonctionnelle mais dense ; absence de moteur IA d'appels d'offres (BOAMP) et d'architecture ouverte moderne type Next.js/Supabase. |
| **03** | **Chronotime Workplace**<br>*(Inetum)* | **France** | Grands comptes & ETI multi-sites | `F01`, `F02`, `F04`, `F13` (Moteur de gestion des temps et cycles complexes, conformité réglementaire forte). | Solution Enterprise très coûteuse et longue à paramétrer (mois de consulting), disproportionnée pour les PME de 10 à 150 agents. |
| **04** | **Combo (ex-Snapshift)**<br>*(Combo SAS)* | **France** | TPE/PME terrain (HCR, Retail, Sécurité) | `F01`, `F02`, `F03`, `F05`, `F08` (Interface web/mobile ultra-moderne, prise en main immédiate, émargement). | Généraliste RH : ne gère ni les rondes NFC (`F06`), ni la main courante sécurité (`F07`), ni le contrôle CNAPS fin de poste (`F04`), ni le portail donneur d'ordre (`F10`). |
| **05** | **Witik**<br>*(Witik)* | **France** | PME Services, Sécurité & Nettoyage | `F01`, `F02`, `F05`, `F11` (Planning, pointage QR/NFC et registre RH). | Moins profond sur le chiffrage de marge horaire sécurité (`F12`) et sur l'inspection terrain hors-ligne (`F06`/`F09`). |
| **06** | **Kelio Security / Temps**<br>*(Bodet Software)* | **France** | Entreprises toutes tailles & Industries | `F02`, `F05`, `F14` (Badgeuses matérielles, GTA robuste, contrôle d'accès). | Centré GTA / matériel de pointage ; peu adapté au dispatch d'urgence mobile de sociétés de gardiennage multi-clients. |
| **07** | **COREDINATE**<br>*(Coredinate GmbH)* | **Allemagne (DACH)** | Sociétés de gardiennage Europe centrale | `F05`, `F06`, `F07`, `F08`, `F09`, `F10`, `F11` (Excellent *OWKS / Guard Tour* NFC/GPS, main courante, portail client, mode hors-ligne). | Ne gère pas la convention collective française IDCC 1351 (`F02`) ni le contrôle légal CNAPS Livre VI (`F04`). |
| **08** | ** SecPlan / Dispo**<br>*(Éditeurs DACH)* | **Allemagne** | PME Sécurité allemandes (§34a GewO) | `F01`, `F04` (Qualif §34a), `F12`. | Spécifique au droit allemand, interface datée et non localisée pour la France. |

### B. Royaume-Uni & Commonwealth (Spécialistes Conformité Licences SIA / BS 7858 & Planification)

| # | Solution & Éditeur | Pays d'origine | Cible principale | Fonctions fortes (sur les 15) | Limite principale observée (`CONFIRMÉ` / `VÉRIFIÉ`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **09** | **Guardhouse**<br>*(Guardhouse)* | **Australie / UK** | PME & ETI de sécurité privée (UK/AUS/NZ) | `F01`, `F03`, `F04` (**Vérification automatisée des licences SIA/État**), `F05`, `F08`, `F12` (Interprétation de grilles salariales complexes *Award Interpreter*). | Conçu pour les licences SIA (UK) et *Awards* australiens ; pas de connecteur CNAPS ni de règles IDCC 1351 françaises. |
| **10** | **Timegate+**<br>*(Innovise / TEAM Software by WorkWave)* | **Royaume-Uni / USA** | Grandes entreprises de sécurité & FM (500 à 20 000 agents) | `F01`, `F02`, `F04`, `F05`, `F10`, `F12`, `F13` (Arbitrage financier contrat/paie très poussé, escalade automatique d'absence). | ERP lourd d'ancienne génération racheté par WorkWave ; UX complexe et tarification Enterprise prohibitive pour les PME. |
| **11** | **Logosoft Guard**<br>*(Logosoft UK)* | **Royaume-Uni** | PME Sécurité UK (BS 7858 Vetting) | `F01`, `F04` (Contrôle d'antécédents BS 7858 & SIA), `F05`. | Interface bureautique britannique traditionnelle, faible capacité mobile hors-ligne (`F09`). |
| **12** | **Staffvetting / Guardso**<br>*(UK / International)* | **Royaume-Uni** | Sociétés de gardiennage & événementiel | `F03`, `F04`, `F06`, `F07`, `F08`. | Moins complet sur le moteur de rentabilité financière et le calcul des majorations conventionnelles françaises. |

### C. Amérique du Nord (Leaders mondiaux du Guard Tour, Dispatch, Main Courante & Portail Client)

| # | Solution & Éditeur | Pays d'origine | Cible principale | Fonctions fortes (sur les 15) | Limite principale observée (`CONFIRMÉ` / `VÉRIFIÉ`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **13** | **TrackTik**<br>*(Trackforce Valiant)* | **Canada (Montréal) / USA / Europe** | Leader mondial ETI & Grands comptes sécurité | **Couvre `F01` à `F14`** : Suite intégrée de référence mondiale (*Guard Tour* NFC/QR hors-ligne, Dispatch, Main courante, Portail client, Contrats & Facturation, BI). | 1. **Tarification très élevée** + frais d'onboarding lourds.<br>2. **Tracking GPS continu** mis en avant (contraire à la doctrine CNIL en France).<br>3. Complexité d'administration signalée par les PME. |
| **14** | **Silvertrac Software**<br>*(racheté par Trackforce Valiant)* | **USA** | TPE & PME de gardiennage et patrouille (10 à 300 agents) | `F05`, `F06`, `F07`, `F08`, `F10`, `F14` (**Référence mondiale sur la simplicité terrain** : remontée d'incidents photo/texte en 3 clics, rondes QR/NFC et portail client temps réel). | Module de planification/paie (`F01`/`F02`) historiquement secondaire (souvent couplé à un outil tiers) et aucune conformité CNAPS / IDCC 1351. |
| **15** | **OfficerApps**<br>*(OfficerApps LLC)* | **USA** | TPE/PME de sécurité privée cherchant une suite légère | `F01`, `F05`, `F06`, `F07` (DAR électronique très clair), `F08`, `F10`, `F11` (Consignes *Post Orders* + LMS formation). | Architecture US orientée *Guard Tour + Scheduling simple* ; absence de moteur de coût complet conventionnel français (`F12`). |
| **16** | **Belfry Software**<br>*(Belfry)* | **USA** | PME & ETI de sécurité privée (Nouvelle génération US) | `F01`, `F02`, `F04` (Suivi licences BSIS), `F06`, `F07`, `F08`, `F10`, `F12`, `F13` (Design SaaS moderne unifiant Back-office, *Guard Tour* et Paie US). | Concentré à 100 % sur le marché américain (fiscalité et paie US), mais constitue une excellente référence d'UX unifiée moderne. |
| **17** | **Novagems**<br>*(Novagems Inc.)* | **Canada / USA** | PME de gardiennage et nettoyage | `F01`, `F03`, `F06`, `F07`, `F08`, `F14` (Checklists de ronde, alerte homme-mort *Panic Button*). | Fonctionnalités centrées sur le suivi GPS live et la géobarrière continue (problématique vis-à-vis de la CNIL en France). |
| **18** | **Guard1 / PIPE**<br>*(Timekeeping Systems)* | **USA** | Rondes industrielles, pénitentiaires et sites critiques | `F06`, `F09`, `F14` (Bâton de ronde matériel ultra-durci + tags RFID/NFC hors-ligne). | Matériel propriétaire coûteux ; ne gère ni la planification RH (`F01`), ni la rentabilité (`F12`). |
| **19** | **Lighthouse.io**<br>*(TEAM Software / WorkWave)* | **USA / Australie** | Grandes opérations de sécurité et nettoyage | `F05`, `F06` (Balises BLE / Indoor positioning), `F07`, `F08`, `F10`, `F14`. | Requiert le déploiement physique de balises Bluetooth / matériel sur chaque site client ; coût élevé. |
| **20** | **Thermopylae / Kwant / Titan** | **USA / UK** | Sécurité chantiers & événements | `F05`, `F06`, `F11`. | Spécialisés contrôle d'accès chantier plutôt que gestion d'entreprise de sécurité privée. |

### D. Europe du Sud, Moyen-Orient, Afrique & Asie-Pacifique (Spécialistes Rondes QR/NFC & Terrain)

| # | Solution & Éditeur | Pays d'origine | Cible principale | Fonctions fortes (sur les 15) | Limite principale observée (`CONFIRMÉ` / `VÉRIFIÉ`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **21** | **QR-Patrol**<br>*(Terracom S.A.)* | **Grèce / Europe / Moyen-Orient** | PME de gardiennage en Europe, Golfe & Afrique | `F05`, `F06` (**Rondes QR Code, NFC & balises BLE**), `F07`, `F08`, `F09`, `F10` (Gestion des rondes temps réel et mode hors-ligne très léger). | Outil purement *Guard Tour* (`F06`/`F07`) : ne gère ni la planification conventionnelle (`F01`/`F02`), ni le chiffrage de marge (`F12`). |
| **22** | **GuardMetrics**<br>*(GuardMetrics)* | **USA / International** | PME de patrouille et gardiennage | `F06`, `F07`, `F08`, `F09`, `F10` (Simplicité extrême sur smartphone en zone blanche). | Aucun moteur RH / Paie / Conformité française. |
| **23** | **Deggy / PatrolLive** | **Europe du Sud / Amérique Latine** | Sociétés de rondes | `F06`, `F09`. | Limité au pointage de pastilles de ronde. |
| **24** | **SoftGuard / Securithor** | **International** | Télésurveillance (CMS) & Intervention sur alarme | `F06` (Dispatch d'intervention sur alarme SIA/Contact-ID). | Logiciel de station centrale de télésurveillance, non conçu pour la gestion RH/Planning des sociétés de gardiennage humain. |

### E. Suites Globales de Workforce Management & Planification Terrain (Références Ergonomiques)

| # | Solution & Éditeur | Pays d'origine | Cible principale | Fonctions fortes (sur les 15) | Limite principale observée (`CONFIRMÉ` / `VÉRIFIÉ`) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **25** | **Celayix**<br>*(Celayix Software)* | **Canada (Vancouver)** | Sécurité privée, Santé, Événementiel | `F01`, `F02`, `F03` (**Moteur de règles d'affectation sous contraintes et auto-remplacement *Shift Bidding* parmi les plus avancés au monde**), `F04`, `F05`, `F12`. | Très fort sur le planning algorithmique, mais dépourvu de *Guard Tour* NFC/QR natif (`F06`) et de main courante sécurité (`F07`). |
| **26** | **Connecteam**<br>*(Connecteam Inc.)* | **Israël / USA** | Équipes mobiles sans bureau (*Deskless Workers* : Sécurité, BTP, Nettoyage) | `F01`, `F03`, `F04` (Coffre-fort documents & alertes expiration), `F05`, `F08` (**Meilleure ergonomie mobile tout-en-un : checklists, formulaires photo, chat d'équipe encadré, consignes**), `F11`. | Pas de moteur de coût conventionnel IDCC 1351 (`F12`), ni de portail client donneur d'ordre (`F10`), et géolocalisation par défaut pensée pour le marché US. |
| **27** | **Deputy**<br>*(Deputy)* | **Australie / International** | Équipes postées (Sécurité, HCR, Logistique, Santé) | `F01`, `F02`, `F03` (**Référence UX sur le *1-Click Open Shift* et le pointage Kiosque/Mobile**), `F05`, `F08`. | Généraliste Workforce : aucune fonction métier de sécurité privée (ni CNAPS fin de poste, ni rondes NFC, ni main courante, ni portail client). |
| **28** | **Workforce.com / When I Work** | **USA / UK** | Planification horaire généraliste | `F01`, `F03`, `F05`, `F08`. | Trop généraliste pour les contraintes réglementaires du Livre VI du CSI. |

---

## 3. ÉTAPE B — SÉLECTION ARGUMENTÉE DES 10 SOLUTIONS PRIORITAIRES POUR L'ÉTUDE APPROFONDIE

Parmi les 28 solutions cartographiées ci-dessus, nous sélectionnons **10 solutions complémentaires** (combinant **leaders mondiaux**, **références du marché français** et **champions ergonomiques du terrain mobile**) afin de couvrir **100 % des 15 fonctions clés** sans angle mort :

| Rang | Solution retenue | Zone & Catégorie | Justification stratégique du choix pour `OMNISECUR` | Fonctions maîtresses étudiées |
| :---: | :--- | :--- | :--- | :--- |
| **1** | **TrackTik**<br>*(Trackforce Valiant)* | **International (CA/US/EU)**<br>Leader mondial Suite Intégrée | **L'étalon fonctionnel mondial :** C'est la suite la plus complète du marché mondial (Back-office + *Guard Tour* + Portail Client + Contrats). Étudier TrackTik permet à OMNISECUR de connaître le plafond fonctionnel des grands comptes tout en évitant sa lourdeur et son prix. | `F01` à `F14` (Architecture globale, *Guard Tour* NFC/QR, Portail Client, Analytique contrat). |
| **2** | **Silvertrac Software**<br>*(USA)* | **Amérique du Nord**<br>Référence Terrain & Portail Client | **La référence de la simplicité opérationnelle :** Plébiscité par les PME de sécurité pour sa main courante temps réel, ses rondes QR/NFC ultra-rapides et son portail client automatique qui justifie la facturation auprès du donneur d'ordre. | `F06` (Rondes), `F07` (Main courante & incidents), `F08` (App terrain), `F10` (Portail client). |
| **3** | **Progisap / Sekur**<br>*(France)* | **France**<br>ERP Historique Sécurité Privée | **Le concurrent historique numéro 1 en France :** Maîtrise la CCN IDCC 1351, la pré-paie et la facturation française, mais souffre d'une ergonomie vieillissante. Comprendre ses forces et ses lourdeurs permet de positionner OMNISECUR comme l'alternative moderne. | `F01`, `F02` (Majorations IDCC 1351), `F04` (CNAPS/SSIAP), `F12` (Facturation/Pré-paie France). |
| **4** | **SmartPS**<br>*(France)* | **France**<br>Spécialiste Planification Sécurité | **Le spécialiste français de la planification sécurité :** Très présent chez les PME/ETI françaises de gardiennage pour la gestion des cycles, vacations, main courante et pré-paie sous IDCC 1351. | `F01` (Cycles & plannings), `F02`, `F04`, `F05`, `F07` (Main courante France). |
| **5** | **Guardhouse**<br>*(Australie / UK)* | **Commonwealth (UK/AUS)**<br>Champion Conformité & Licences | **L'équivalent anglo-saxon le plus proche de la philosophie d'OMNISECUR :** Construit autour de la vérification stricte des licences d'agents (*SIA License* au UK ≈ Carte Pro CNAPS) et de l'interprétation automatique de règles salariales complexes (*Award Interpreter*). | `F01`, `F04` (Blocage sur licence expirée), `F12` (Moteur de règles salariales). |
| **6** | **OfficerApps**<br>*(USA)* | **Amérique du Nord**<br>Suite Modulaire PME | **Le modèle de légèreté pour PME :** Démontre comment structurer une main courante électronique (*DAR*), des consignes de site (*Post Orders*) avec accusé de lecture obligatoire et des rondes sans devenir une usine à gaz. | `F06`, `F07` (DAR), `F10`, `F11` (*Post Orders* & accusé de lecture agent). |
| **7** | **Celayix**<br>*(Canada)* | **Amérique du Nord**<br>Moteur de Règles & Auto-Remplacement | **La référence algorithmique du remplacement d'urgence :** Son moteur de règles (*Rules Engine*), d'*Auto-Scheduling* et de bourse de vacations (*Shift Bidding / Self-Scheduling*) est un modèle pour faire évoluer le Module F4 d'OMNISECUR. | `F01` (Auto-fill sous contraintes), `F03` (Remplacements & *Shift Bidding*), `F12` (Contrôle heures sup). |
| **8** | **Connecteam**<br>*(Israël / USA)* | **International**<br>Champion UX Mobile Terrain | **La meilleure expérience mobile employé du marché :** Ses checklists numériques, formulaires d'anomalies avec photo annotée, coffre-fort d'habilitations et confirmation de lecture des consignes sont directement transposables au portail Agent d'OMNISECUR. | `F04`, `F08` (Ergonomie App Agent), `F11` (Consignes & checklists mobiles), `F14`. |
| **9** | **QR-Patrol**<br>*(Grèce / Europe)* | **Europe**<br>Spécialiste Rondes NFC/QR & Hors-Ligne | **Le standard européen léger du Guard Tour :** Architecture purement dédiée aux rondes QR Code, tags NFC et balises BLE avec gestion du mode hors-ligne en zone blanche et alertes de ronde manquée. | `F05`, `F06` (Protocole NFC/QR/BLE), `F09` (Buffer hors-ligne zone blanche), `F10`. |
| **10** | **Combo (ex-Snapshift)**<br>*(France)* | **France**<br>Référence UX Planning PME | **L'étalon d'ergonomie visuelle en France :** Bien que généraliste, Combo est souvent adopté par de jeunes sociétés de sécurité françaises pour la clarté de son planning hebdomadaire/mensuel et la rapidité de publication des vacations. | `F01` (UX Drag-and-drop & publication planning), `F02`, `F03`, `F05`. |

---

## 4. COUVERTURE CROISÉE DES 15 FONCTIONS PAR LES 10 SOLUTIONS SÉLECTIONNÉES

| Fonction Clé | Solutions de référence principales dans le Top 10 | Niveau de couverture pour le benchmark OMNISECUR |
| :--- | :--- | :--- |
| **1. Planification des agents (`F01`)** | `Celayix`, `Combo`, `SmartPS`, `Progisap`, `Guardhouse` | **Exhaustif** (du planning visuel PME au moteur algorithmique sous contraintes) |
| **2. Gestion des vacations & heures (`F02`)** | `Progisap`, `SmartPS`, `Guardhouse`, `Combo` | **Exhaustif** (incluant les spécificités françaises IDCC 1351 : nuit, dimanche, férié, paniers) |
| **3. Remplacements & urgences (`F03`)** | `Celayix`, `Guardhouse`, `Connecteam`, `Combo` | **Exhaustif** (filtrage de conformité + bourse de vacations *Open Shifts*) |
| **4. Conformité & habilitations (`F04`)** | `Progisap`, `SmartPS`, `Guardhouse`, `TrackTik` | **Exhaustif** (CNAPS / MAC / SST / SSIAP / SIA License) |
| **5. Pointage & présence (`F05`)** | `TrackTik`, `QR-Patrol`, `Connecteam`, `SmartPS` | **Exhaustif** (comparaison GPS continu US vs pointage ponctuel NFC/QR conforme CNIL) |
| **6. Rondes & interventions (`F06`)** | `TrackTik`, `Silvertrac`, `QR-Patrol`, `OfficerApps` | **Exhaustif** (tags NFC, QR codes, rondes séquentielles ou aléatoires, levées de doute) |
| **7. Main courante électronique (`F07`)** | `Silvertrac`, `OfficerApps`, `TrackTik`, `SmartPS` | **Exhaustif** (DAR structuré, catégories d'incidents, passation de consignes) |
| **8. Application mobile terrain (`F08`)** | `Connecteam`, `Silvertrac`, `QR-Patrol`, `OfficerApps` | **Exhaustif** (ergonomie à une main, mode sombre nocturne, saisie rapide) |
| **9. Mode hors-ligne / zone blanche (`F09`)** | `QR-Patrol`, `TrackTik`, `Silvertrac` | **Exhaustif** (stockage local chiffré + resynchronisation différée avec horodatage) |
| **10. Portail client donneur d'ordre (`F10`)** | `Silvertrac`, `TrackTik`, `OfficerApps`, `QR-Patrol` | **Exhaustif** (tableaux de bord clients, preuves de présence, rapports PDF automatiques) |
| **11. Gestion documentaire (`F11`)** | `OfficerApps`, `Connecteam`, `TrackTik` | **Exhaustif** (*Post Orders* / consignes de site avec signature de prise de connaissance) |
| **12. Facturation & rentabilité (`F12`)** | `TrackTik`, `Progisap`, `Guardhouse`, `Celayix` | **Exhaustif** (*Bill Rate vs Pay Rate*, contrôle des heures non facturables) |
| **13. Tableau de bord dirigeant (`F13`)** | `TrackTik`, `Guardhouse`, `Celayix` | **Exhaustif** (KPIs temps réel, alertes d'exploitation, marge brute) |
| **14. Contrôle qualité & audit (`F14`)** | `Silvertrac`, `TrackTik`, `Connecteam` | **Exhaustif** (inspections superviseurs, pistes d'audit horodatées) |
| **15. Automatisation & IA (`F15`)** | `Celayix` (Auto-scheduling), `TrackTik` (BI), **`OMNISECUR`** (`COS Bureau IA` AO BOAMP) | **Exhaustif** (avec un avantage natif déjà acquis par OMNISECUR sur les appels d'offres publics) |
