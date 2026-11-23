## Rapport d'audit indépendant (lecture seule) — `WS-TECH-INTELLIGENCE-003`

**Auditeur :** Subagent indépendant en lecture seule (`58ea71a2a626e326c543f24e9efc6ea6`, application stricte de `CHARTE-FRANCHISE-NON-COMPLAISANCE.md`, Règle 5 anti-auto-certification et rigueur épistémique).  
**Date :** 2026-11-23T02:26:44Z  
**Cible :** Commit `02ff9f4` sur `main` dans `/home/antigravity/naitconv-web/agia-infrastructure` + bacs à sable `/tmp/ws_exp_a/` et `/tmp/ws_exp_b/dsh_sandbox/`.

---

### 1. Vérifications effectuées et preuves contrôlées

1. **État Git & périmètre du commit `02ff9f4` :**
   - `git status` : working tree clean sur `main`, à jour avec `origin/main`.
   - `git show --stat 02ff9f4` : `15` fichiers modifiés/créés uniquement dans `docs/tech-intelligence/` et `docs/harness/`. Aucune modification de code de production ni de `sites/`.

2. **Les 4 rapports dans `docs/tech-intelligence/experiments/` :**
   - `RAPPORT_EXPERIENCE_A_CRAFT_ANYTHING.md` : présent, complet, distingue faits mesurés (`doctor`, `web-pixels-compare`) et échec réel (`web-site-open` bloqué en sandbox Linux sans `--no-sandbox`), budget `0,00 €`.
   - `RAPPORT_EXPERIENCE_B_DEEPSEEK_HARNESS.md` : présent, complet, documente l'installation isolée (`@deepseek-ai/dsh@0.2.2-rc.5`, `671` paquets, `5` avertissements `install-scripts`) et la suspension honnête avant appel LLM faute de clé API gratuite, verdict `NO-GO`.
   - `BENCHMARK_ANTIGRAVITY_VS_DEEPSEEK_HARNESS.md` : présent, mentionne explicitement `NON COMPARABLES EN EXÉCUTION LLM` à `0,00 €` et `NON TESTÉ` pour les métriques d'exécution `dsh` (zéro complaisance, zéro chiffre inventé).
   - `REGISTRE_COUTS_EXPERIMENTATIONS.md` : présent, atteste `0,00 €` engagé au total (régime `F1`).

3. **Les 4 captures dans `docs/tech-intelligence/experiments/captures/` :**
   - Existence confirmée : `amb_desktop.png` (`184 658` o), `amb_mobile.png` (`84 187` o), `ref_desktop.png` (`37 976` o), `ref_mobile.png` (`32 829` o).
   - `sha256sum` : empreintes strictement identiques bit-à-bit à celles de `/tmp/ws_exp_a/*.png` (`c685d5b7ab63...`, `249bc0c83c81...`, `dd7ea76fb319...`, `0751b8e111a0...`).
   - Inspection visuelle directe (`view_file`) : cohérente avec les rapports (`amb_*` affiche le prototype fictif isolé *Voile d'Ambre — Eau de Parfum (100 ml)* à `74,00 €`, `3` vues, charte Or/Ivoire ; `ref_*` affiche le produit neutre de référence à `69,00 €`).

4. **Environnements isolés (`/tmp/ws_exp_a/` et `/tmp/ws_exp_b/dsh_sandbox/`) :**
   - `/tmp/ws_exp_a/craft-anything-0.6.1-linux-x86_64/bin/craft-anything-cli --version` → `craft-anything-cli 0.6.1`.
   - `craft-anything-cli --clean-room doctor` → `healthy: true`, `binary: ok`, `engine:chromium: ok (/usr/bin/chromium)`, `mcp:self-test: ok (protocol 2025-06-18, 30 tools listed)`, `ai: info (No AI backend is set up)`.
   - `craft-anything-cli --clean-room web-pixels-compare --common-area true` (ré-exécuté en direct sur les paires desktop et mobile) :
     - Desktop (`1440×900`) : `ev_33471a92...`, `layout_similarity = 0.793957...` (`79%`), `perceptual_similarity = 0.814282...` (`81%`).
     - Mobile (`390×844`) : `ev_fc6d0c23...`, `layout_similarity = 0.48` (`48%`), `perceptual_similarity = 0.489338...` (`49%`).
   - `/tmp/ws_exp_a/exp_a.cany/journal/2026-11-23.jsonl` : confirme l'échec technique de `web_site_open` dans le sandbox VM (`program_failed` à la fermeture de Chromium).
   - `/tmp/ws_exp_b/dsh_sandbox/node_modules/.bin/dsh --version` → `0.2.2-rc.5`.
   - Vérification `env` et `~/.deepseek/` / `~/.dsh/` : aucune clé API payante (`DEEPSEEK_API_KEY`, `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GEMINI_API_KEY`, `MISTRAL_API_KEY`, `OPENROUTER_API_KEY`) et aucun répertoire de session `dsh` créé (aucune exécution LLM payante).

5. **Cohérence documentaire & anti-auto-certification :**
   - `docs/tech-intelligence/REGISTRE-TECHNOLOGIES.md` (lignes 21–22) et `REGISTRE-INNOVATIONS.md` (`INN-005`, `INN-006`) : alignés avec les verdicts des rapports (`GO SOUS CONDITIONS` en audit visuel isolé pour `Craft Anything`, `NO-GO` pour `DeepSeek Harness`).
   - `docs/harness/REGISTRE_MEMOIRE.md` (`DEC-17`, ligne 45) : synthétise fidèlement les résultats et les limites des expériences A et B.
   - `docs/harness/checkpoints/CP-WS-TECH-INTELLIGENCE-003.json` et `LATEST.json` : `status: "IN_PROGRESS"`, `requested_status: "IN_PROGRESS"`, `auditor: "NONE"`, `audit_verdict: "PENDING"`, `self_certification_blocked: false`. Aucune auto-certification.

6. **Production & régime F1 (`0,00 €`) :**
   - `grep` sur `/tmp/ws_exp_a/amb_proto/` et `/tmp/ws_exp_a/ref_site/` : aucune connexion WooCommerce/WordPress ni appel réseau vers `ambressence.com` (simulation locale isolée).
   - Régime `F1` (`0,00 €`) strictement respecté.

---

### 2. Réserves mineures (non bloquantes)

- Observation factuelle mineure : dans `RAPPORT_EXPERIENCE_A_CRAFT_ANYTHING.md`, `0.793957` est tronqué à `0.7939` (au lieu d'arrondi à `0.7940`) ; les pourcentages affichés (`79 %`, `81 %`, `48 %`, `49 %`) restent exacts.
- Observation structurelle harness : `CP-WS-TECH-INTELLIGENCE-003.json` conserve les champs génériques du gabarit `harness_ctl.py` (`objective`, `files_created_or_modified`, `remaining_actions` issus du socle AGIA-011), tandis que `summary` reflète bien la mission `WS-TECH-INTELLIGENCE-003`.

---

VERDICT : VALIDÉ
