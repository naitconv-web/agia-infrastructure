# PRÉPARATION DE LA VEILLE TECHNOLOGIQUE & ÉTUDE COMPARATIVE MONDIALE — OMNISECUR
**Référence :** SYNTESIA-VEILLE-OMNI-001 (Initialisé en AGIA-006 — Exécuté en AGIA-007 Chantier 2)  
**Projet concerné :** `OMNISECUR` (Solution LAB Niveau 2 — Sécurité Privée) & Verticale 1 SYNTESIA  
**Statut :** `ÉTUDE MONDIALE EXÉCUTÉE EN AGIA-007 — LIVRABLES DISPONIBLES DANS docs/omnisecur/veille/`  
**Date de mise à jour :** 21 novembre 2026  

> **Livrables complets de l'étude mondiale (AGIA-007) :**
> 1. [Cartographie Mondiale des 28 Solutions & Sélection du Top 10](../omnisecur/veille/CARTOGRAPHIE_MONDIALE_SECURITE_PRIVEE.md)
> 2. [Benchmark Fonctionnel Approfondi des 10 Solutions](../omnisecur/veille/BENCHMARK_10_SOLUTIONS.md)
> 3. [Matrice d'Adaptation & Proposition de Feuille de Route OMNISECUR](../omnisecur/veille/MATRICE_ADAPTATION_ET_ROADMAP_OMNISECUR.md)

---

## 1. RECONSTITUTION DE L'INTENTION STRATÉGIQUE DU FONDATEUR

À partir de l'exploration de `WORKSTATION-IA/_KNOWLEDGE_BASE/REFERENCES/` (notamment l'annotation manuscrite du fondateur dans `Dépôts Github varié` ID `1gSBsqcKpnhGt6a15fEB-zMXaQgisa31BtaZJlIt0zV8` : *« `gh repo clone morluto/rea` — REA pourrait devenir notre agent spécialisé en rétro-ingénierie, lorsqu'une mission nécessite de comprendre un logiciel existant »*) et du dossier `PROJETS/OMNISECUR/`, la vision stratégique du fondateur est clairement établie :

1. **Observer l'état de l'art mondial :** Identifier les meilleurs logiciels de gestion d'entreprises de sécurité privée utilisés en France, en Amérique du Nord, au Royaume-Uni, en Europe et au Moyen-Orient.
2. **Analyser en profondeur les fonctionnalités et parcours UX :** Comprendre comment ces logiciels résolvent la planification sous contrainte, le pointage mobile / hors-ligne (zone blanche), les rondes NFC/QR, la main courante électronique, le contrôle des cartes professionnelles, le chiffrage de rentabilité et le portail client donneur d'ordre.
3. **Adapter le meilleur à `OMNISECUR` (et aux futures solutions `Omni-X` grâce à la généricité contrôlée) :** Transposer les meilleures ergonomies et mécaniques fonctionnelles dans le socle souverain Next.js 15 / Supabase d'OMNISECUR, tout en conservant son avantage décisif : **la conformité native et déterministe au droit français (CSI Livre VI, CNAPS et IDCC 1351 / Brochure 3196)** que les logiciels anglo-saxons maîtrisent mal.

---

## 2. RÉFÉRENCES ET ACTIFS INTERNES DÉJÀ DISPONIBLES

Avant toute étude externe, OMNISECUR dispose déjà d'un socle documentaire et technique solide vérifié sur Google Drive :

| Référence interne | ID Drive / Emplacement | Contenu exploitable comme étalon de comparaison |
| :--- | :--- | :--- |
| **`00-cadrage-omnisecur.md`** | `14r5vgDg8y_j4CqWiS2sY4A-7jg81w8hA` | Définition du MVP (F0 à F8), principe de **généricité contrôlée** (cœur neutre `org_id` + module de règles sécurité isolé), séparation des 3 rôles (Direction, Exploitation/RH, Agent), stack Next.js 15 + Supabase RLS. |
| **`03-regles-conformite-metier.md`** | `1m7QFZa7dgJf-vP8ugzlSNve_gA7X7Vhm` | Les 10 règles métier non négociables (validité CNAPS jusqu'à `shiftEnd`, SST/SSIAP à la prise de poste, repos >= 11h légal / 12h conventionnel, anti double-booking, heure locale vs UTC, coûts vérifiés par le dirigeant). |
| **`SOURCES-REGLEMENTAIRES-DATEES.md`** | `1lbmNzLoxC4EI6xL9Hoi7-QT8PqcqkpMX` | Références Légifrance / URSSAF / CNIL datées du 14/11/2026 (notamment l'interdiction CNIL du suivi GPS continu au profit du pointage ponctuel d'entrée/sortie). |
| **`RAPPORT-CERTIFICATION-TECHNIQUE.md`** | `1PNdjm5ExRTUjZaHicNR_knVE9aNTWag7` | Socle v2.3.2 (`f6b1a87`) : horodatage serveur `clock_timestamp()`, protocole de pointage hors-ligne en zone blanche avec index unique anti-rejeu `offline_event_id`, audit chaîné SHA-256. |
| **`COS-MVP-Operations-demo-phase1.html` & `COS Bureau IA`** | `1Y9tlQUOtvNjGAYaVpwmvneoGOnz76HeP` & `1XM5ePbfoBnCcm7cKbyWIItRjwurp6dO4` | Démonstrateur opérationnel Phase 1 (Ordre de mission, Bouclier marge, Sas Dirigeant) et prototype des 5 agents d'appels d'offres publics (`Nora, Yanis, Jade, Léa, Sam`). |

---

## 3. ÉVALUATION DES OUTILS D'ANALYSE ET DE RÉTRO-INGÉNIERIE IDENTIFIÉS

Conformément à la mission AGIA-006, voici l'évaluation technique et opérationnelle de **REA** et des ressources de la bibliothèque technologique pour cette veille :

| Outil de la Bibliothèque | Rôle dans la Veille OMNISECUR | Capacités réelles & Limites techniques | Statut pour la Veille |
| :--- | :--- | :--- | :--- |
| **1. `REA` (`morluto/rea` — `R-02`)** | **Inspection technique d'applications publiques / bundles JS & Electron** | • Commande CLI `npx -y rea-agents@latest analyze-javascript-application <path> --json` ou serveur MCP.<br>• Permet d'analyser la structure des composants front-end, les schémas d'état client, les modèles de données publics et l'organisation modulaire d'une application web ou desktop distribuée publiquement.<br>• *Limite :* N'accède jamais (et ne doit jamais accéder) au code serveur backend privé d'un SaaS tiers. | **`retenu` (Outil principal d'inspection client-side autorisée)** |
| **2. `Understand-Anything` (`Egonex-AI/Understand-Anything` — `L-02`)** | **Cartographie de dépôts open-source de planification / workforce** | • Transforme tout dépôt GitHub open-source (ex. moteurs de planification sous contrainte, systèmes de pointage QR/NFC open-source) en graphe d'architecture interactif. | **`recommandé` (Pour étudier des briques open-source)** |
| **3. `Refero` (`refero.design` / `styles.refero.design` — `R-01`)** | **Benchmark UX/UI des parcours de planification et dashboards** | • Permet d'étudier les écrans réels (*Screens*) et flux utilisateurs (*Flows*) de logiciels SaaS B2B de gestion d'équipes et de conformité. | **`retenu` (Référence UX/UI)** |
| **4. `The Last Archive` (`MultiX0/last-archive` — `R-04`) ou `NotebookLM` (`S-02`)** | **Indexation des documentations publiques et manuels utilisateurs concurrents** | • Permet d'archiver et d'interroger par RAG les centres d'aide publics (*Help Centers*, guides PDF, changelogs, API docs publiques) des logiciels concurrents pour comparer leurs fonctionnalités sans spéculation. | **`recommandé` (Privilégier NotebookLM sur PC 8 Go RAM)** |

---

## 4. LOGICIELS CONCURRENTS DÉJÀ RECENSÉS (PANORAMA INITIAL)

### A. Logiciels du marché français (Conformité française / CCN 1351)
1. **Progisap / Sekur** — ERP historique spécialisé sécurité privée en France (plannings, paie CCN 1351, facturation).
2. **Chronotime / SmartPS / Geoconcept** — Planification sous contraintes et optimisation pour moyennes et grandes structures de sécurité.
3. **Combo (ex-Snapshift)** — Planification RH terrain très répandue en TPE/PME (HCR, Retail, Sécurité), ergonomie moderne mais moins spécialisée sur le chiffrage Bouclier sécurité et les appels d'offres CSI Livre VI.
4. **Witik / Skello / Kelio (Bodet)** — Gestion des temps, pointage et plannings.

### B. Leaders internationaux du Guard Management & Workforce (Références fonctionnelles mondiales à étudier)
1. **TrackTik (Trackforce Valiant — Canada / USA / Europe)** — Référence mondiale des suites de gestion de gardiennage (*Guard Tour*, dispatch, contrats, analytique financière).
2. **Silvertrac Software (USA)** — Référence sur la simplicité terrain : remontée d'incidents temps réel, rondes QR/NFC et portail client automatisé.
3. **OfficerApps (USA)** — Suite modulaire légère (*Guard Tour*, main courante électronique, suivi des formations).
4. **Guardso / Guardhouse (Australie / UK)** — Spécialisés dans le contrôle automatisé des licences d'agents (*SIA License* au Royaume-Uni, équivalent direct de la carte pro CNAPS en France).
5. **Celayix / Deputy / Connecteam (International)** — Références ergonomiques sur l'auto-remplacement (*Shift Bidding / Open Shifts*), le pointage mobile géo-vérifié et la communication terrain.

---

## 5. LACUNES DOCUMENTAIRES IDENTIFIÉES

À ce stade (avant lancement de l'étude comparative), les lacunes suivantes sont constatées dans le Drive :
1. **Absence de fiches comparatives détaillées concurrent par concurrent :** Les noms des concurrents français figurent dans l'analyse sectorielle `01-securite-privee.md`, mais il n'existe pas encore de grille fonctionnelle croisant leurs grilles tarifaires publiques, leurs limites UX et les plaintes de leurs utilisateurs (avis Capterra / G2 / Trustpilot).
2. **Absence de benchmark sur les fonctionnalités Phase 2 d'OMNISECUR :** Notamment le fonctionnement exact des portails clients donneurs d'ordre, des rondes NFC/QR hors-ligne et du système d'enchères de remplacement (*open shifts* compatibles IDCC 1351).
3. **Contraintes légales comparées (CNIL France vs USA/UK) :** De nombreux logiciels américains (*TrackTik*, *Silvertrac*) mettent en avant le tracking GPS continu en temps réel de l'agent pendant toute sa vacation — pratique **strictement encadrée voire interdite en France par la CNIL** (`SOURCES-REGLEMENTAIRES-DATEES.md` : pointage ponctuel uniquement à la prise et fin de poste).

---

## 6. PROPOSITION DE PROTOCOLE D'ÉTUDE FONCTIONNELLE ET COMPARATIVE (CLEAN-ROOM)

Lorsque le fondateur donnera l'ordre de lancer l'étude mondiale, celle-ci suivra un **protocole strict en 5 étapes respectant intégralement le droit d'auteur, les licences et la sécurité** :

### Étape 1 — Collecte documentaire ouverte (OSINT & Documentation publique)
- Extraction des manuels utilisateurs publics, vidéos de démonstration officielles YouTube, pages de fonctionnalités, grilles tarifaires publiques et documentation d'API publiques des 10 logiciels cibles (5 France + 5 International).

### Étape 2 — Analyse des insatisfactions clients (Méthode Prompt 04 de `Prompts variés/Fb`)
- Analyse systématique des avis vérifiés (1 à 3 étoiles) des dirigeants de sécurité sur ces logiciels pour isoler leurs angles morts (lenteur, complexité, erreurs de calcul d'heures de nuit/dimanche, coût par agent excessif, mauvais support mobile en sous-sol).

### Étape 3 — Analyse technique et UX autorisée (REA + Refero + Dépôts Open-Source)
- Utilisation de **Refero** pour analyser les patterns d'interfaces de planification et de tableaux de bord.
- Utilisation de **REA (`morluto/rea`)** et **Understand-Anything (`L-02`)** **exclusivement** sur :
  - Des dépôts open-source de gestion de plannings / workforce (licence MIT / Apache-2.0).
  - Des ressources front-end ou démos publiquement distribuées dont l'inspection locale est légale au titre de l'étude fonctionnelle et de l'interopérabilité (Art. L.122-6-1 du CPI).
  - *Interdiction absolue :* zéro test d'intrusion, zéro contournement de compte payant, zéro extraction de code propriétaire fermé.

### Étape 4 — Filtre de conformité française (Tamis CSI Livre VI / IDCC 1351 / CNIL)
- Passage de chaque fonctionnalité internationale découverte au crible des 10 règles d'or d'`OMNISECUR` (`03-regles-conformite-metier.md`) :
  - *Exemple :* Transformer le « GPS Live Tracking » américain (interdit CNIL) en « Pointage ponctuel de ronde par tag NFC/QR avec horodatage serveur infalsifiable `clock_timestamp()` et protocole zone blanche `offline_event_id` » (conforme CNIL & déjà supporté par l'architecture v2.3.2 d'OMNISECUR).

### Étape 5 — Spécification Clean-Room pour le Backlog Phase 2 d'OMNISECUR
- Rédaction de spécifications fonctionnelles 100 % originales soumises à l'arbitrage du fondateur, classées en *Must-have* vs *Nice-to-have* sans jamais toucher au socle certifié v2.3.2 avant validation.
