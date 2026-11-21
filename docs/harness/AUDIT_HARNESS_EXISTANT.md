# LIVRABLE 1 — AUDIT FACTUEL DU HARNESS ET DES MÉCANISMES DE MÉMOIRE EXISTANTS (`PHASE 0`)

**Référence :** SYNTESIA-HARNESS-AUDIT-011 (Mission AGIA-011 — Phase 0)  
**Date d'audit :** 21 novembre 2026  
**Dépôt audité :** `naitconv-web/agia-infrastructure` (branche `main`, commit de départ `91a1eec`)  
**Principe directeur appliqué :** `DOCUMENTÉ ≠ IMPLÉMENTÉ ≠ TESTÉ ≠ VALIDÉ EN PRODUCTION`

---

## 1. ÉTAT GIT ET CARTOGRAPHIE RÉELLE DES DÉPÔTS GITHUB

Avant toute modification, l'état de l'environnement et des dépôts a été vérifié par commandes directes (`git status`, `git log`, `gh repo list naitconv-web`) :

| Dépôt GitHub | Existence sur le compte `naitconv-web` | Accès depuis l'environnement Antigravity courant | Rôle réel dans l'écosystème | Statut opérationnel réel |
| :--- | :---: | :---: | :--- | :--- |
| **`naitconv-web/agia-infrastructure`** | **Oui (Privé)** | **Lecture / Écriture complète (`main` @ `91a1eec`)** | **Dépôt central de référence de SYNTESIA** : mémoire du portefeuille, bibliothèque technologique, catalogue sectoriel, sites France/Algérie, démonstrateur commercial, scripts CRM et Harness Engineering. | **`IMPLÉMENTÉ & TESTÉ`** *(Non publié en production commerciale)* |
| **`naitconv-web/omnisecur`** | Oui (Privé) | `HTTP 403` (Non attaché au scope VM courant) | Code applicatif `OMNISECUR` (Next.js 15 / Supabase v2.3.2, commit `f6b1a87` attesté par archives Drive `GIT-MANIFEST.json` et `SORTIES-BRUTES-TESTS-ET-BUILD-f6b1a87.txt`). | **`TESTÉ` (via preuves Drive)** / **`BLOQUÉ EN ACCÈS DIRECT VM`** |
| **`naitconv-web/omnisecur-launch-kit`** | Oui (Privé) | `HTTP 403` (Non attaché au scope VM courant) | Kit de lancement tunnel commercial `OMNISECUR` (`WS-2026-000-REV2`, commit `f0c91dd` / `cb78b11`). | **`DOCUMENTÉ` (Drive)** / **`BLOQUÉ EN ACCÈS DIRECT VM`** |
| **`naitconv-web/ec-mission-state`** | Oui (Privé) | `HTTP 403` (Non attaché au scope VM courant) | Dépôt d'état de la mission `EMERGENCY CASHFLOW` (Palier P0, régime F1 0,00 €). | **`DOCUMENTÉ` (Drive)** / **`BLOQUÉ EN ACCÈS DIRECT VM`** |
| **`naitconv-web/AMBRESSENCE` & `ambressence.com`** | Oui (Privés) | `HTTP 403` (Non attaché au scope VM courant) | Projet e-commerce parfumerie (hors structure mère LAB). | **`DOCUMENTÉ` (Drive)** / **`BLOQUÉ EN ACCÈS DIRECT VM`** |
| **`naitconv-web/projet-pilote`** | Oui (Privé) | `HTTP 403` (Non attaché au scope VM courant) | Ancien dépôt privé du 13/11/2026 non référencé dans les index Drive. | **`À CLARIFIER` (Rôle non documenté)** |
| **`naitconv-web/lab-core`** | **Non (Inexistant)** | N/A (`404 Not Found`) | Noyau souverain cible de l'Architecture C (`< 80 Mo RAM`) décrit dans `LAB-ARCH-001`. | **`DOCUMENTÉ UNIQUEMENT` (`NON IMPLÉMENTÉ`)** |

---

## 2. INVENTAIRE DES MÉCANISMES DE MÉMOIRE, DE CHECKPOINTS ET DE REPRISE EXISTANTS

L'inspection croisée du dépôt `agia-infrastructure` et du Google Drive `WORKSTATION-IA` permet d'établir la distinction exacte entre ce qui était seulement **décrit dans des documents** et ce qui **fonctionnait réellement** avant `AGIA-011` :

| Mécanisme / Fichier examiné | Emplacement trouvé | État réel avant `AGIA-011` | Qualification stricte |
| :--- | :--- | :--- | :--- |
| **1. `docs/memoire_portefeuille/`** (`CARTOGRAPHIE_PORTEFEUILLE.md`, `MUTUALISATION_ET_DECISIONS.md`, `PROJET_01` à `07`, `RAPPORT_FINAL_AGIA_003.md`) | Dépôt Git `docs/memoire_portefeuille/` | Référentiel documentaire statique de haute qualité créé en AGIA-003, distinguant 5 niveaux de preuve. **Limite :** Pas de fichier d'état centralisé pour suivre les tâches en cours (`TASKS`) ni de mécanisme de reprise de session (`Checkpoints`). | **`IMPLÉMENTÉ & TESTÉ` (Mémoire statique)** |
| **2. `PREFLIGHT-FACTS.md` & les 5 fichiers `SHARD-*.md` (`WS-2026-000-REV3` / Bus Lean v3.0)** | Mentionnés dans `REGISTRE-DECISIONS.md` sur Drive (`1aUs3wwd0...`) et dans `PROJET_01_WORKSTATION_IA_ET_LAB.md` | **Constat critique :** Bien que la décision `WS-2026-000-REV3` du 16/11/2026 ait adopté le concept de `PREFLIGHT-FACTS.md` et des 5 `SHARD-*.md`, **ces fichiers n'étaient pas présents dans le dépôt `naitconv-web/agia-infrastructure`**. Un agent démarrant dans ce dépôt ne disposait d'aucun script ou fichier de préflight opérationnel. | **`DOCUMENTÉ` (Drive) / `NON IMPLÉMENTÉ` (dans `agia-infrastructure`)** |
| **3. `Foundation-001` / `Architecture C` (`LAB-ARCH-001` & `LAB-ARCH-002`)** | Google Drive `LAB-ARCH-001` (`1CcEAPM9...`) | Spécification théorique d'architecture en 3 plans (Interface, `LAB CORE < 80 Mo RAM`, `LAB BRIDGE`). Aucun code exécutable ni dépôt `lab-core` n'a été créé. | **`DOCUMENTÉ UNIQUEMENT` (`NON IMPLÉMENTÉ`)** |
| **4. Instructions Agents (`AGENTS.md` / `SPECIFICATIONS_MULTI_AGENTS.md`)** | `agents/prompts/SPECIFICATIONS_MULTI_AGENTS.md` | Définit 5 rôles d'agents et les règles F1 (0,00 €) / Bienséance (08h30–19h00). **Limites :** (1) Aucun fichier standard `AGENTS.md` à la racine du dépôt ; (2) Aucune obligation de **Préflight** au démarrage ni de **Checkpoint** à la clôture ; (3) Aucune boucle formelle `PLAN → EXECUTE → TEST → VERIFY → CORRECT → REPORT`. | **`IMPLÉMENTÉ PARTIELLEMENT` (Incomplet pour la reprise sans conversation)** |
| **5. Scripts opérationnels (`scripts/communication_gate.py`, `audit_kpi_sync.py`, `orchestrate_crm.py`)** | Dépôt Git `scripts/` | Fonctionnels et testés unitairement en Python, mais aucun script `harness_ctl.py` n'existait pour vérifier l'état du contexte, détecter les contradictions documentaires ou générer un checkpoint de reprise. | **`IMPLÉMENTÉ & TESTÉ` (Briques métier uniquement)** |

---

## 3. CONTRADICTIONS, DOUBLONS ET POINTS D'OMBRE IDENTIFIÉS LORS DE L'AUDIT

Conformément à la règle *« Ne jamais écraser des informations contradictoires sans justification »*, voici les **3 contradictions documentaires** détectées dans le dépôt existant et consignées dans le registre de conflits du Harness :

| ID Conflit | Source A | Source B | Nature exacte de la contradiction | Règle de résolution dans le Harness (`AGIA-011`) |
| :--- | :--- | :--- | :--- | :--- |
| **`CONF-01`** | `docs/ARCHITECTURE_GENERALE.md` (§1 ligne 15 & §2 ligne 31 — créé en AGIA-001) : mentionne *« opérations France (micro-entrepreneur, SIRET/Kbis, facturation en EUR) »*. | `PROJET_06_STRUCTURE_JURIDIQUE_ATLAS_GLOBAL_TRADING.md` (AGIA-003) & `mentions-legales-confidentialite.html` (AGIA-009) : `SASU ATLAS GLOBAL TRADING` en cours de constitution (Kbis `NON DÉMONTRÉ`) et Kbis micro-entreprise non présent sur Drive (`NV-04`). | **Statut juridique porteur de SYNTESIA France :** AGIA-001 présupposait une micro-entreprise active avec SIRET/Kbis vérifié, tandis qu'AGIA-003 et AGIA-009 interdisent toute mention d'immatriculation tant que le fondateur n'a pas arbitré entre sa micro-entreprise et la SASU `ATLAS GLOBAL TRADING` (avec pièce justificative). | La mention d'AGIA-001 est marquée **`SUPERSEDED`** dans le registre de mémoire au profit de la décision d'AGIA-009 : **statut `BLOCKED` (attente décision Fondateur #1 sur l'identité légale de l'éditeur)**. |
| **`CONF-02`** | `MUTUALISATION_ET_DECISIONS.md` (`WS-2026-005`) : Offre `RELANCE-DEVIS` à **390 € setup + 69 €/mois** (100 % Inbound Meta Ads, zéro code applicatif). | `docs/commercial/KIT_COMMERCIAL_COMPLET_AGIA_010.md` (`AGIA-010`) : Offre `Pack SYNTESIA — Relance Devis & Bouclier Conformité` à **1 490 € HT setup + 190 € HT/mois** (ou **145 000 DZD + 19 000 DZD/mois**). | **Apparente divergence tarifaire sur la relance de devis :** Deux grilles de prix coexistent dans le dépôt pour une thématique proche. | **Absence d'écrasement — Distinction de périmètre enregistrée (`CONFIRMED`) :**<br>• `390 € + 69 €/mois` = Micro-offre produit standardisée `RELANCE-DEVIS` (entité `LAB`, tunnel self-service Meta Ads BTP).<br>• `1 490 € + 190 €/mois` = Prestation d'intégration sur-mesure en 7 jours de l'agence **SYNTESIA** (Cockpit Devis + Conformité URSSAF/CNAPS/BL + Formation dirigeant). |
| **`CONF-03`** | `LAB-ARCH-001` (Drive) : mentionne un avancement de **75 %** et un noyau `lab-core` consommant **< 80 Mo RAM**. | `PROJET_01_WORKSTATION_IA_ET_LAB.md` (`NV-02`, vérifié par `gh repo list`) : le dépôt `naitconv-web/lab-core` n'existe pas (`0` ligne de code déployée). | **Confusion entre spécification de conception et implémentation réelle.** | Enregistré avec le statut **`PROPOSED` / `DECLARED`** (cible de conception théorique) et non `CONFIRMED` : interdiction pour tout agent de présenter `lab-core` comme un logiciel opérationnel. |
