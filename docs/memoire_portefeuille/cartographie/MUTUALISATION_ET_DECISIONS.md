# MATRICE DES ACTIFS RÉUTILISABLES, HISTORIQUE DES DÉCISIONS & POINTS NON DÉMONTRÉS
**Référence :** SYNTESIA-MEMOIRE-MUTUALISATION (Révision Finale AGIA-003)  
**Statut du document :** `AUDIT DOCUMENTAIRE TERMINÉ — VALIDATION DU FONDATEUR EN ATTENTE`  
**Date :** 21 novembre 2026  

---

## 1. CARTOGRAPHIE DES ACTIFS TECHNIQUES ET DOCUMENTAIRES RÉUTILISABLES

| Actif / Brique | Projet Source | Preuve et Emplacement Source | Statut de Preuve | Usage Autorisé dans SYNTESIA |
| :--- | :--- | :--- | :--- | :--- |
| **Moteur de conformité sécurité privée (IDCC 1351 / CSI Livre VI)** | `OMNISECUR` v2.3.2 | `GIT-MANIFEST.json` (`1GiyjMM2...`) & `SORTIES-BRUTES-TESTS-ET-BUILD-f6b1a87.txt` (`1BXe_-qm...`) — coût complet 22,97 €/h, prix plancher 25,52 €/h, Avenant 2 plancher 6h. | `VÉRIFIÉ TECHNIQUEMENT` *(via archive Drive)* | Base de référence réglementaire pour la Verticale 1 (Sécurité Privée) de SYNTESIA. |
| **Démonstrateur HTML Phase 1 Sécurité** | `OMNISECUR` | `COS-MVP-Operations-demo-phase1.html` (Drive ID `1Y9tlQUOtvNjGAYaVpwmvneoGOnz76HeP`, SHA-256 `16A99BE...` dans `WS-2026-004`). | `CONFIRMÉ PAR SOURCE` | Modèle d'inspiration pour les démonstrateurs avant-vente SYNTESIA (avec données `[DÉMO]` isolées). |
| **Kit Commercial & Relances BTP** | `RELANCE-DEVIS` | `PROJETS/RELANCE-DEVIS/livrables/` (`1YBI80es...`) : `KIT-PROSPECTION-48H.md`, `PACK-META-ADS-48H.md`, `CONCIERGE-SUIVI-DEVIS.csv`. | `VÉRIFIÉ TECHNIQUEMENT` | Matrice méthodologique pour la Verticale 2 (Bâtiment & Rénovation) de SYNTESIA. |
| **Protocole Anti-Gaming (`C9`/`C10`) & Régime `F1` (0,00 €)** | `EMERGENCY CASHFLOW` (`EC-005`/`006`) | `EC-006_PERFORMANCE_PROTOCOL.md` (`1UbOugp1...`) & `SUPERVISION_DASHBOARD.md` (`1eVtfbWs...`). | `CONFIRMÉ PAR SOURCE` | Règles de rigueur comptable et budgétaire appliquées au CRM SYNTESIA (`audit_kpi_sync.py` v2.0). |
| **Directive Globale de Bienséance (7 critères horaires/ton)** | `WORKSTATION-IA` | `DIRECTIVE_GLOBALE_COMPORTEMENT_BIENSEANCE_PROFESSIONNALISME.md` (`1criMlo1...`). | `VÉRIFIÉ TECHNIQUEMENT` | Implémentée dans `scripts/communication_gate.py` de SYNTESIA. |

---

## 2. HISTORIQUE DES DÉCISIONS STRATÉGIQUES (CONSERVATION INTÉGRALE)

Toutes les décisions ci-dessous sont extraites sans altération de `_ORCHESTRATION/REGISTRE-DECISIONS.md` (ID : `1aUs3wwd0slFo3yJWDfUt8i2ir_CQaE4G`) et de `EC-003_DECISION_REGISTER.md` :

| Date | ID Décision | Périmètre | Contenu de la Décision Originale | Statut de Preuve |
| :--- | :--- | :--- | :--- | :--- |
| **2026-11-14** | `WS-2026-000` | `WORKSTATION-IA` | Architecture Lean v1.0 : séparation Code (`C:\`) / Cerveau (`H:\`), 0 daemon/watcher, règle « Le dossier EST le statut ». | `CONFIRMÉ PAR SOURCE` |
| **2026-11-14** | `OMNI-2026-232` | `OMNISECUR` | Finalisation technique v2.3.2 (`f6b1a87` sur `F8-dashboard`) : 95/95 tests verts, 28/28 intégration PostgreSQL réelle, `clock_timestamp()`. | `VÉRIFIÉ TECHNIQUEMENT` *(sorties brutes Drive)* |
| **2026-11-14** | `WS-2026-003` & `004` | `OMNISECUR` | Validation Démo WOW Phase 1 (`COS-MVP-Operations-demo-phase1.html`, `[DÉMO]` sur tous CNAPS, repos 12h/11h). | `CONFIRMÉ PAR SOURCE` |
| **2026-11-14** | `WS-2026-005` & `REV1` | `RELANCE-DEVIS` | Offre 390 € setup + 69 €/mois, zéro code applicatif avant preuve commerciale, acquisition 100 % Inbound Meta Ads (Palier 0 = 150 €). | `CONFIRMÉ PAR SOURCE` |
| **2026-11-16** | `WS-2026-000-REV1` | `WORKSTATION-IA` | Levée du plafond « 3 agents max » via message universel à axes spécialisés ; maintien de `Concepteur != Auditeur`. | `CONFIRMÉ PAR SOURCE` |
| **2026-11-16** | `WS-2026-000-REV2` | `WORKSTATION-IA` | Exécution nocturne `A1`–`A6` : moteur leads open data v2, création du dépôt privé `naitconv-web/omnisecur-launch-kit` (`f0c91dd`). | `CONFIRMÉ PAR SOURCE` |
| **2026-11-16** | `WS-2026-002-REV1` & `008` | `OMNISECUR` / `RELANCE-DEVIS` | Correctifs v1.3 (`cb78b11`) : plancher Avenant 2 `6h`, stub Stripe fail-closed, responsive 390px, borne `<24m`. | `CONFIRMÉ PAR SOURCE` |
| **2026-11-16** | `WS-2026-000-REV3` | `WORKSTATION-IA` | Adoption protocole `BUS LEAN v3.0` : `PREFLIGHT-FACTS.md`, packs anonymisés `GO<X>-PACK.zip` + 5 Shards autonomes. | `CONFIRMÉ PAR SOURCE` |
| **2026-11-20** | `D-011` (`EC-006`) | `EMERGENCY CASHFLOW` | Palier `P0 — Préparation`, régime financier `F1` (`0,00 €` autonome jusqu'à ratification explicite `V-001`). | `CONFIRMÉ PAR SOURCE` |

---

## 3. INVENTAIRE EXHAUSTIF DES ÉLÉMENTS NON VÉRIFIÉS, NON DÉMONTRÉS OU À CLARIFIER

| Réf | Élément concerné | Qualification | Détail factuel du blocage ou de l'absence de preuve |
| :--- | :--- | :--- | :--- |
| **NV-01** | Contenu en direct des 6 autres dépôts GitHub privés (`omnisecur`, `omnisecur-launch-kit`, `ec-mission-state`, `projet-pilote`, `AMBRESSENCE`, `ambressence.com`) | `DÉCLARÉ MAIS NON VÉRIFIÉ` *(sur GitHub live)* | `gh repo list` confirme leur existence, mais `gh api repos/naitconv-web/<repo>` renvoie `HTTP 403 Resource not accessible by integration` car seul `agia-infrastructure` est attaché au jeton du projet courant. |
| **NV-02** | Dépôt souverain `naitconv-web/lab-core` et mesure réelle `< 80 Mo RAM` du noyau Architecture C | `NON DÉMONTRÉ` | Le dépôt `lab-core` n'existe pas sur GitHub. La cible `< 80 Mo RAM` est une spécification d'architecture dans `LAB-ARCH-001` et non un test d'exécution mesuré. |
| **NV-03** | Immatriculation effective (Kbis / SIREN) et certificat de dépôt de capital (500 €) de la `SASU ATLAS GLOBAL TRADING` | `NON DÉMONTRÉ` | Le dossier Drive contient les statuts révisés au 30/10/2026 (« SASU en formation »), mais ni le certificat de dépôt des fonds ni l'extrait Kbis ne figurent dans le Drive. |
| **NV-04** | Extrait Kbis de la micro-entreprise du fondateur et Kbis de `NAIT STORE` | `DÉCLARÉ MAIS NON VÉRIFIÉ` | Mentionnés dans les briefings et `TODO-FOUNDER.md`, mais les pièces justificatives PDF ne sont pas stockées dans les dossiers Drive examinés. |
| **NV-05** | Verdict commercial du test Meta Ads `RELANCE-DEVIS` fixé au 19/11/2026 à 20h | `À CLARIFIER` | Aucune décision post-16/11/2026 dans `REGISTRE-DECISIONS.md` n'indique le résultat du test Meta Ads de 5 jours ni le franchissement du seuil Go/No-Go. |
| **NV-06** | Issue de la candidature en gérance mandat `B&B Hôtel Douai` (mai 2026), liste des établissements antérieurement exploités et projets de restauration | `À CLARIFIER` / `NON DÉMONTRÉ` | Le dossier de candidature B&B Douai est présent et vérifié, mais son issue n'est pas documentée. Aucun dossier de projet de restauration spécifique ni CV détaillant les établissements antérieurement dirigés n'est présent sur Drive. |
| **NV-07** | Rôle du dépôt GitHub `naitconv-web/projet-pilote` | `À CLARIFIER` | Dépôt privé mis à jour le 13/11/2026, non référencé dans les index de `WORKSTATION-IA`. |
| **NV-08** | État du PC local Windows 11 (8 Go RAM, Paseo, OpenClaw, `C:\Users\NAIT\omnisecur`) | `DÉCLARÉ MAIS NON VÉRIFIÉ` | Non accessible depuis la VM Cloud Linux Debian 12. |
