# CHECKPOINT DE REPRISE — `AGIA-012`
- **Généré le (UTC) :** `2026-11-21T18:43:51Z`
- **Branche & Commit de base :** `main` @ `7925982`
- **Statut & Phase Boucle :** `CONFIRMED` (`REPORT` — Tentative `1/3`)

## 1. Objectif & État Actuel
- **Objectif :** Concevoir, implémenter et valider par 6 tests de résistance le Harness Engineering commun aux projets SYNTESIA (0 dépendance à la mémoire conversationnelle).
- **Résumé d'état :** Plan d'acquisition Revenue First pret (Offre 1490 EUR / 596 EUR acompte, 6 prospects prioritaires FR enrichis Open Data sans contact, messages, script RDV 15 min, plan 48h)

## 2. Décisions Confirmées Actives
- `DEC-01: Régime financier F1 (0,00 € autonome)`
- `DEC-02: Hiérarchie WORKSTATION-IA / LAB / SYNTESIA`
- `DEC-03: Stratégie Géographique France & Algérie`
- `DEC-04: Bibliothèque Technologique & Refero Styles`
- `DEC-05: Distinction des offres RELANCE-DEVIS (LAB) vs Pack SYNTESIA (Agence)`
- `DEC-06: Obligation du SYNTESIA Harness Engineering (AGIA-011)`

## 3. Fichiers Vérifiés (Empreintes SHA-256 Courtes)
- `AGENTS.md` (`f614ee194b9f`)
- `docs/harness/AUDIT_HARNESS_EXISTANT.md` (`456df391b22e`)
- `docs/harness/ARCHITECTURE_SYNTESIA_HARNESS.md` (`4b180d45eea6`)
- `docs/harness/REGISTRE_MEMOIRE.md` (`e48f93bbabf3`)
- `docs/harness/PROTOCOLE_PREFLIGHT.md` (`d764191afbc6`)
- `docs/harness/PROTOCOLE_CHECKPOINT.md` (`d15618765245`)
- `docs/harness/PROTOCOLE_VALIDATION.md` (`8669fd92a008`)
- `docs/harness/RAPPORT_TESTS_RESILIENCE.md` (`80349a5e9ad5`)
- `docs/harness/state/harness_memory.json` (`6e5eed72424d`)
- `scripts/harness_ctl.py` (`c7499d6e201c`)
- `docs/commercial/KIT_COMMERCIAL_COMPLET_AGIA_010.md` (`99ad523a2dfb`)
- `sites/demonstrateur/index.html` (`5cd58a3ddf98`)
- `sites/shared/syntesia-forms.js` (`258b9fee3bee`)

## 4. Tests Exécutés & Preuves
- **Résilience Harness :** `6/6 PASSED (Test A: Perte conversation, Test B: Changement modèle, Test C: Interruption brutale, Test D: Contradiction, Test E: Multi-projets, Test F: Preuve d'exécution)`
- **Non-régression Sites/CRM :** `77/77 PASSED (5 pages HTML, 4 formulaires, WEBHOOK_ENABLED=false)`

## 5. Actions Restantes par Priorité
- **[P0 — FONDATEUR]** Compléter les 5 coordonnées légales et la durée RGPD dans sites/shared/mentions-legales-confidentialite.html (CHECKLIST_PRODUCTION_SYNTESIA.md Étape 1)
- **[P0 — FONDATEUR]** Déployer automations/google_apps_script_crm_sync.js en Web App sur le tableur CRM et activer WEBHOOK_ENABLED=true au Go-Live (Étapes 2 & 3)
- **[P1 — FONDATEUR]** Utiliser le démonstrateur sites/demonstrateur/index.html et le kit docs/commercial/KIT_COMMERCIAL_COMPLET_AGIA_010.md pour les premiers rendez-vous prospects
- **[P2 — FONDATEUR / AGIA-012]** Arbitrer le Lot Phase 2A d'OMNISECUR (Portefeuille CNAPS hors-ligne 1-clic, Sas consignes de site, Tri remplaçants par coût)

## 6. Instructions Exactes de Reprise (Zéro Conversation)
1. Ouvrir le dépôt naitconv-web/agia-infrastructure sur la branche main.
2. Lire AGENTS.md à la racine du dépôt.
3. Exécuter `python3 scripts/harness_ctl.py preflight` puis `python3 scripts/harness_ctl.py resume`.
4. Charger uniquement le Shard requis dans docs/harness/REGISTRE_MEMOIRE.md (§5) selon la nouvelle demande du fondateur.
