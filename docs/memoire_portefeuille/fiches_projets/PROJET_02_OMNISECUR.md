# FICHE PROJET 02 — OMNISECUR (COS OPÉRATIONS SÉCURITÉ PRIVÉE)

- **Statut du document :** `AUDIT DOCUMENTAIRE TERMINÉ — VALIDATION DU FONDATEUR EN ATTENTE`
- **Structure Mère :** **LAB** (Gamme de solutions « Omni-X »)
- **Sources Originales Consultées et Contrôlées :**
  - Dossier Drive `PROJETS/OMNISECUR` (ID : `1BQd8Ohcc7R_sfRm04SFHegoukHeAz-EB`)
  - `README-PROJET.md` (ID : `1gSxwn9DXNYdGpSexcCMjjrGw8ytY0UCU`)
  - Journal brut d'exécution des tests : `livrables/SORTIES-BRUTES-TESTS-ET-BUILD-f6b1a87.txt` (ID : `1BXe_-qmTq6ii642CADalQQR2V_ga-XXm`)
  - Manifeste cryptographique : `livrables/GIT-MANIFEST.json` (ID : `1GiyjMM2kJ3OskNMzVHNRc8sgabyL1JCv`)
  - Rapport : `docs/RAPPORT-CERTIFICATION-TECHNIQUE.md` (ID : `1PNdjm5ExRTUjZaHicNR_knVE9aNTWag7`)
  - `_ORCHESTRATION/REGISTRE-DECISIONS.md` (ID : `1aUs3wwd0slFo3yJWDfUt8i2ir_CQaE4G`)

---

## 1. DISTINCTION RIGOUREUSE : PREUVES CONSULTÉES SUR DRIVE VS ACCÈS GITHUB LIVE

| Élément contrôlé | Statut exact | Preuve factuelle |
| :--- | :--- | :--- |
| **Existence des dépôts GitHub** `naitconv-web/omnisecur` et `naitconv-web/omnisecur-launch-kit` | `VÉRIFIÉ TECHNIQUEMENT` | Présents dans la liste `gh repo list` (dépôts privés). |
| **Inspection en direct des commits sur GitHub (`f6b1a87`, `cb78b11`) depuis la VM** | `DÉCLARÉ MAIS NON VÉRIFIÉ` *(sur GitHub live)* | L'API GitHub renvoie `HTTP 403 Resource not accessible by integration` car ces dépôts privés ne sont pas attachés au jeton de la session Antigravity courante. |
| **Sorties brutes des tests v2.3.2 (`f6b1a87`) archivées sur Google Drive** | `VÉRIFIÉ TECHNIQUEMENT` *(via archive Drive)* | Lecture intégrale du fichier `SORTIES-BRUTES-TESTS-ET-BUILD-f6b1a87.txt` (`1BXe_-qm...`) : trace horodatée du 14/11/2026 à 11:06:06+01:00 montrant `node tests/test-engines.js` (ALL E2E CHECKS PASSED), `vitest run` (`8 passed` test files, `95 passed` tests dont 28 tests d'intégration PostgreSQL réelle en 31,5 s), `npx tsc --noEmit` (Exit 0) et `next build` (Exit 0). |
| **Manifeste SHA-256 des fichiers v2.3.2 (`GIT-MANIFEST.json`)** | `VÉRIFIÉ TECHNIQUEMENT` *(via archive Drive)* | Lecture directe de `GIT-MANIFEST.json` (`1GiyjMM2...`) contenant les empreintes SHA-256 de 22 fichiers clés sur la branche `F8-dashboard` (`commit_sha: f6b1a87b072473ed52fa88a4a334f7041263f19e`). |
| **Décisions de validation Démo Phase 1 (`WS-2026-004`) et Launch Kit v1.3 (`WS-2026-008`)** | `CONFIRMÉ PAR SOURCE` | Consignées dans `REGISTRE-DECISIONS.md` et `JOURNAL-OPERATIONNEL-NUIT-2026-11-16.md` (`1Zs16zk...`). |

---

## 2. PÉRIMÈTRE MÉTIER ET RÉGLEMENTAIRE
- **Positionnement (`CONFIRMÉ PAR SOURCE`) :** Plateforme d'opérations et de rentabilité pour dirigeants de sociétés de sécurité privée (Code de la Sécurité Intérieure Livre VI & Convention Collective Nationale IDCC 1351 / Brochure 3196 + Avenant n° 2 plancher 6h).
- **Composants du dossier Drive (`VÉRIFIÉ TECHNIQUEMENT`) :**
  - `COS Opérations` (socle Next.js 15 / PostgreSQL v2.3.2).
  - `COS Bureau IA` (prototype HTML v4.0 des 5 agents d'appels d'offres : Nora, Yanis, Jade, Léa, Sam).
  - `Arsenal Dirigeant v3` (pack documentaire Word/Excel).
  - `go-live-site-tunnel-campagne` (site tunnel v1.3, CRM Google Sheets `1eIfLgQfDQ...`, scripts Apps Script `Code-v1.4.gs` et PHP `api-lead-v1.2.php`).

---

## 3. DÉPENDANCES ET PROCHAINES ÉTAPES
- **Statut commercial (`CONFIRMÉ PAR SOURCE`) :** En attente des réglages finaux du fondateur (3 liens de paiement Stripe, IBAN/coordonnées dans `site-config.js`, déploiement sur hébergeur et bascule Meta Ads).
