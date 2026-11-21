# FICHE PROJET 03 — RELANCE-DEVIS (PORTE D'ENTRÉE OMNIRENOV / BTP)

- **Statut du document :** `AUDIT DOCUMENTAIRE TERMINÉ — VALIDATION DU FONDATEUR EN ATTENTE`
- **Structure Mère :** **LAB** (Porte d'entrée de la verticale `OMNIRENOV`)
- **Sources Originales Consultées et Contrôlées :**
  - Dossier Drive `PROJETS/RELANCE-DEVIS` (ID : `13OOCqJY9ITBhgho36yT-pTf33uyphs-H`)
  - `PROJETS/RELANCE-DEVIS/README.md` (ID : `1LjqiYyKvGL2J2GkWG56ncKhAx2hf3gwj`)
  - `BRAINSTORMING/IDEE-001_PROJET-CASHFLOW.md` (ID : `1i1rjoqRDS_ZOGhZgxmzFhK81vcXD54TQ`)
  - `PROJETS/README-PORTEFEUILLE.md` (ID : `13_Qt4DUVWaFifZGYEyhfZ1uFlWbWGqUA`)
  - `_ORCHESTRATION/REGISTRE-DECISIONS.md` (`WS-2026-005` et `WS-2026-005-REV1`)
  - `_ORCHESTRATION/JOURNAL-OPERATIONNEL-NUIT-2026-11-16.md` (ID : `1Zs16zkYR-ONzk1X8V0wxFqPYF1ZrPAw_`)

---

## 1. RECTIFICATION DOCUMENTAIRE SUR LE DÉPÔT GITHUB

- **Anomalie corrigée :** Dans la version initiale de la cartographie, `RELANCE-DEVIS` avait été rattaché par raccourci au dépôt `naitconv-web/omnisecur-launch-kit`.
- **Vérité documentaire vérifiée (`CONFIRMÉ PAR SOURCE`) :**
  1. La description officielle GitHub de `naitconv-web/omnisecur-launch-kit` est : *« OMNISECUR x ARSENAL v3.2 Launch Kit — Site Tunnel v1.2, CRM v1.3, Leads Engine v2.0 & QA Suite »* (Chantier `A5` du `JOURNAL-OPERATIONNEL-NUIT-2026-11-16.md`). Il s'agit du dépôt du kit de lancement d'**OMNISECUR** (qui contient toutefois le moteur universel d'extraction open data `moteur-leads-universel-v2.mjs` ayant servi à générer `leads_btp.csv`).
  2. Pour `RELANCE-DEVIS`, le fichier `README-PORTEFEUILLE.md` stipule explicitement : *« RELANCE-DEVIS aura son propre dépôt si le Go/No-Go du 19/11 est positif »* et impose la règle **« Zéro code applicatif avant preuve Meta Ads »**.
  3. **Conclusion (`VÉRIFIÉ TECHNIQUEMENT`) :** `RELANCE-DEVIS` **ne possède aucun dépôt Git dédié** à ce jour. Ses livrables résident intégralement dans le dossier Google Drive `PROJETS/RELANCE-DEVIS/` (`13OOCqJY9ITBhgho36yT-pTf33uyphs-H`).

---

## 2. PÉRIMÈTRE, OFFRE ET RÈGLES D'EXÉCUTION

- **Nature et Offre (`CONFIRMÉ PAR SOURCE`) :** Service « Devis Dormants Relancés + Acompte Rapide » destiné aux artisans et PME du bâtiment. Tarif validé : **390 € d'installation (offre fondateur) + 69 € / mois** (1er mois à la signature = 459 € HT/client ; plancher de négociation 290 € comptant).
- **Décisions fondateur (`CONFIRMÉ PAR SOURCE` — `WS-2026-005` & `WS-2026-005-REV1`) :**
  - **100 % Acquisition Automatisée Inbound** (Meta Ads Tarn / Occitanie, Palier 0 débloqué = 150 € soit 30 €/j × 5 j) vers formulaire qualifiant + prise de RDV **Cal.com** + paiement **Stripe**.
  - **Zéro prospection sortante à froid** par le dirigeant (appels et démos entrants uniquement).
  - **Zéro code applicatif** (pas de développement Next.js/Supabase) tant que le palier de validation commerciale n'est pas franchi (`>= 2` paiements ou `1` paiement + `>= 5` vrais devis confiés).
- **Livrables présents sur Drive (`VÉRIFIÉ TECHNIQUEMENT`) :**
  - `cadrage/PLAN-EXECUTION-30J.md`
  - `livrables/PACK-META-ADS-48H.md` (`13cxfw8T10BH37uF8_MgQkRogmx8CIh7l`)
  - `livrables/KIT-PROSPECTION-48H.md` (`1hqh6xwEpBbbkG31tynlNkhNpSUVQGT4U`)
  - `livrables/PLAN-ATTAQUE-60-LEADS-BTP.md` (`1OuyWHcBlP0nqDdu03bkj1EDbEpyzDblZ`)
  - `livrables/CONCIERGE-SUIVI-DEVIS.csv` (`1uzW2zh7Wn5FfUB1b4aQHEIAsfED_SDsV`)
  - `livrables/landing-demo-offre.html` (`1j86eOLI1cs2qB2YXitV9wMTSAMAa0k6U`)

---

## 3. POINT À CLARIFIER PAR LE FONDATEUR
- **Verdict du test Meta Ads (`À CLARIFIER`) :** Le document `README-PORTEFEUILLE.md` fixait la date du verdict commercial au **19 novembre 2026 à 20h**. Aucune entrée postérieure au 16 novembre 2026 dans `REGISTRE-DECISIONS.md` ne documente l'issue de ce test. Le statut exact post-19/11 reste à confirmer par le fondateur.
