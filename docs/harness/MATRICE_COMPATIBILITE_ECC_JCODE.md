# MATRICE DE COMPATIBILITÉ ECC / JCODE AVEC ANTIGRAVITY (AGIA-013)

**Date :** 2026-11-21  
**Périmètre :** Compatibilité technique, sécurité, coût (`F1 = 0,00 €`) et valeur ajoutée réelle face au Harness SYNTESIA (`scripts/harness_ctl.py` + `AGENTS.md`).

| Critère d'évaluation | Harness SYNTESIA actuel | `affaan-m/ECC` (`ecc-universal` v2.2.3) | `1jehuang/jcode` v1.0.3 *(PROPOSED)* |
| :--- | :--- | :--- | :--- |
| **Statut dans les sources projet** | Implémenté et vérifié (`main`) | Référencé par la mission AGIA-013 | **Non consigné** dans le dépôt ni Drive |
| **Nature technique** | Python stdlib + Markdown + outils Antigravity | Framework multi-IDE (`.cursor`, `.gemini`, `.opencode`, `.openclaw`, npm) | Binaire TUI terminal autonome en Rust (~35 crates) |
| **Poids / empreinte** | < 100 Ko (0 dépendance) | ~64 Mo (`64 578` KB) + `node_modules` | ~475 Mo (`475 502` KB) |
| **Compatibilité sandbox `exebox` / VM éphémère** | **Native (100 %)** | Partielle (scripts/hooks pensés pour IDE locaux ; conflit potentiel de conventions) | **Inadaptée** (remplace le terminal agent au lieu de s'intégrer à Antigravity) |
| **Persistance du contexte** | `harness_memory.json` + `REGISTRE_MEMOIRE.md` + Git | Fichiers `.gemini`/rules/instincts (redondant) | Sessions TUI locales (éphémères sur VM cloud) |
| **Orchestration multi-agents** | `invoke_subagent` / `send_message` natifs Antigravity | Patterns prompts/skills multi-agents | Orchestration interne au binaire TUI (bypass des outils Antigravity) |
| **Gestion des tâches & reprise** | `harness_ctl.py preflight` / `checkpoint` | Hooks/commandes custom | État session TUI locale |
| **Coût & régime F1 (0,00 €)** | **0,00 €** | Core MIT (0 €), mais **`ECC Pro` = 19 $/siège/mois** | MIT (0 €) |
| **Risque de régression / bloat** | Nul (socle déjà testé) | Élevé (multiplication de fichiers `.cursor`/`.openclaw`, surcharge contexte) | Très élevé (binaire externe `curl \| bash` ou compilation Rust lourde) |
| **Verdict compatibilité** | **Référence active** | **Redondant / Non rentable** | **Incompatible / Hors scope** |
