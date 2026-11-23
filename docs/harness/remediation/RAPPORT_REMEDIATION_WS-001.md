# RAPPORT DE REMÉDIATION TECHNIQUE — `WS-AUDIT-REMEDIATION-001`

**Date :** `2026-11-23` · **Référence audit :** `AUDIT-STRATEGIQUE-WS-001`  
**Mode :** Exécution autonome des correctifs documentaires réversibles (`AUTONOME`), préparation des chantiers (`PRÉPARATION`) et gel strict des actions sensibles (`BLOQUÉ` sans accord PDG).

---

## 1. SYNTHÈSE PAR AXE (`A → G`)

### A. Cohérence documentaire (`AUTONOME` — Corrigé)
- **Contradictions identifiées :**
  1. `00-START-HERE.md` (§2/§3) et `README-PORTEFEUILLE.md` mentionnaient encore AMBRESSENCE en *« Staging prêt »* alors que `ambressence.com` est en ligne avec `2 552` parfums publiés (ventes verrouillées Stripe/Kbis, `WS-AMB-002`).
  2. `SYNTESIA` (dépôt actif `agia-infrastructure`, pré-prod `77/77` validée, Go-Live `BLOCKED`) était absent de `README-PORTEFEUILLE.md` et de `00-START-HERE.md` §3.
  3. `00-START-HERE.md` indiquait *« Lean v1.0 »* et `WS-2026-008` dans `01_EN_COURS/`, alors que `BUS LEAN v3.0` et `SYNTESIA Harness` sont actifs et `WS-2026-008` est arbitrée.
- **Correction effectuée :** Mise à jour ciblée de `README-PORTEFEUILLE.md` sur Drive (ajout de `SYNTESIA` avec statut exact `PREPROD_77/77_GO_LIVE_BLOCKED` + mise à jour d'`AMBRESSENCE` en `LIVE_CATALOGUE_VENTES_VERROUILLEES`). L'état des campagnes `RELANCE-DEVIS` reste marqué **`NON VÉRIFIÉ`**.

### B. Sources de vérité (`12` `AGENTS.md` Drive + `1` GitHub)
- **Inventaire vérifié :** `12` fichiers `AGENTS.md` retrouvés sur Google Drive (datés du `2026-11-10` au `2026-11-18`, copies de anciens dépôts/maquettes) + `1` `AGENTS.md` actif à la racine de `agia-infrastructure` (`2026-11-23`).
- **Divergence :** Les `12` copies Drive ignorent `preflight`, `WEBHOOK_ENABLED=false` et `CHARTE-FRANCHISE-NON-COMPLAISANCE.md`.
- **Architecture d'orchestration unique proposée (sans modifier l'architecture) :**
  - **Paseo** = orchestrateur multi-modèles local/mobile ; **Antigravity** = atelier de développement & sous-agents ; **`agia-infrastructure/AGENTS.md`** = seule source de vérité opérationnelle pour le code (les `12` copies Drive doivent être marquées obsolètes ou archivées sur accord PDG).

### C. Agents (`13` identifiants inventoriés — Aucun supprimé)
- **Inventaire vérifié dans `REGISTRE-AGENTS.md` :** `ANTIGRAVITY-CTO`, `CHATGPT-PLUS`, `PERPLEXITY-1`, `CHATGPT-GO`, `CLAUDE-1`, `KIMI-1`, `MISTRAL-1`, `MISTRAL-2`, `GEMINI-1`, `GEMINI-2`, `GEMINI-3`, `GROK-1`, `CLAUDE-COS`.
- **Doublons constatés :** `3× Gemini`, `2× Mistral`, `2× ChatGPT`, `2× Claude`. Coûts exacts des abonnements externes : **`INCONNUS / NON VÉRIFIÉS`** dans le dépôt.
- **Recommandation (`3 à 4` agents permanents max) :**
  1. `ANTIGRAVITY` (Atelier dev & exécution cloud),
  2. `PASEO / OpenCode-Vibe` (Orchestrateur local multi-modèles),
  3. `AUDITEUR INDÉPENDANT` (`research` en VM + `CHATGPT-PLUS` ou `CLAUDE-1` pour contre-audits externes),
  4. `SPÉCIALISTE MÉTIER PONCTUEL` (ex. pôles AMBRESSENCE).

### D. Sécurité (Inventaire sans valeurs secrètes — `0` révocation / `0` suppression)
- **Emplacements de secrets en quarantaine sur Drive :** `_ARCHIVES/_A_PURGER_PAR_DIRIGEANT/P0-SECRETS-A-ROTATION-ET-PURGE/` (`1w-LhLoed-S_BfWCH6IJm9gG1CFA4IJXG`) contient `4` fichiers (`00-SECOURS-PLAN-B.md`, `groq openclaw`, `GROQ OPENCLAW GOOGLE API KEY GOOGLE`, `LISEZ-MOI-URGENT-A2-A3.md`).
- **Comptes ayant accès à la racine `WORKSTATION-IA` (`1YLmAB3t7QMBK6a4XA2G4kmogLr79BXbX`) :** `nait.conv@gmail.com` (`owner`), `nait.mohand3@gmail.com` (`writer`), `zineb.bensaad1996@gmail.com` (`writer`). *Vigilance : les droits `writer` héritent sur le dossier en quarantaine.*
- **Règles d'accès Paseo (`C:\Users\NAIT\`, `~/.vibe/.env`) :** **`NON VÉRIFIÉ`** (inaccessible depuis la VM Cloud Linux).
- **Plan préparé (`BLOQUÉ` en attente PDG) :** (1) Régénérer 2FA Stripe, clé Groq, clé Google Cloud ; (2) Retirer/restreindre les partages `writer` sur les dossiers sensibles ; (3) Purger définitivement le dossier `P0-SECRETS`.

### E. Sauvegardes et dépôts
- **`agia-infrastructure` :** Branche `main` alignée sur `origin/main` ; branche locale résiduelle `ws-gh-access-001-report`.
- **Dépôts privés non rattachés (`AMBRESSENCE`, `omnisecur`, `omnisecur-launch-kit`, `ec-mission-state`, `projet-pilote`) :** Branches distantes **`NON VÉRIFIÉES`** (hors scope VM).
- **Dernières sauvegardes Drive connues :** `PROJETS/OMNISECUR/snapshots/` (`15/11/2026`).
- **Plan de sauvegarde proposé (`PRÉPARATION`) :** Export mensuel automatisé des dépôts rattachés vers `snapshots/` hors secrets + conservation des checkpoints `docs/harness/checkpoints/`.

### F. Gouvernance (`WS-GOV-001` à `WS-GOV-003`)
- **Preuves publiées :** `docs/harness/audits/AUDIT_WS-GOV-002_research-092f8255.md`, `AUDIT_WS-GOV-003_research-3d27dde2.md`, `REGISTRE_ERREURS_ET_DESACCORDS.md`.
- **Distinction stricte des tests :**
  - *Réellement exécutés (déterministes) :* `test_franchise_compliance.py` (`6/6`), `harness_ctl.py test-resilience` (`6/6`), `hook_guard.py` (`17/17`).
  - *Réellement exécutés (comportementaux sur 1 modèle) :* `4` scénarios live sur sous-agents vierges (`DES-001` à `DES-004` + `ERR-003`).
  - *Structurellement validés mais non exécutés en live LLM :* `tests/promptfoo/ambressence-gems.yaml` (`10` cas) et `franchise-behavioral-8-scenarios.yaml` (`8` cas).

### G. Économie (`REGISTRE-BUDGETS-DEPENSES.md` consolidé)
- **Dépenses confirmées :** `22,76 € TTC` (`o2switch` le `25/10/2026` pour AMBRESSENCE) ; `0,00 €` opérations VM (`SYNTESIA`, `AMBRESSENCE WS-AMB-002`, `TECH INTELLIGENCE`).
- **Montants non vérifiés / en attente confirmation PDG :** Dépense réelle sur le palier `150,00 €` Meta Ads (`RELANCE-DEVIS`), et coûts mensuels des abonnements personnels (`Google AI Pro`, `ChatGPT Plus/Go`, `Perplexity Pro`, etc.).

---

## 2. FICHE DE CONTRÔLE QUALITÉ DES CORRECTIONS AUTONOMES

| Fichier concerné | État initial | Modification effectuée | Justification | Vérification réalisée | Risque résiduel |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Drive `README-PORTEFEUILLE.md` (`13_Qt4DU...`) | `SYNTESIA` absent ; `AMBRESSENCE` noté `STAGING_PRET`. | Ajout de `SYNTESIA` (`PREPROD_77/77 / GO_LIVE_BLOCKED`) + mise à jour `AMBRESSENCE` (`LIVE_CATALOGUE / VENTES_VERROUILLEES`). | Aligner le portefeuille Drive sur les preuves `WS-AMB-002` et `AGIA-011`. | Relecture post-update via `gdrive readonly download`. | `00-START-HERE.md` contient encore des liens historiques (`À archiver/rafraîchir` sur accord). |
| `docs/harness/remediation/*` (`3` fichiers) | Absents. | Création du rapport, du registre d'actions PDG et de la matrice des risques. | Livrables exigés par `WS-AUDIT-REMEDIATION-001`. | Audit indépendant en lecture seule requis. | Aucun impact sur la production. |
