# AUDIT ECC / JCODE — INTÉGRATION DANS ANTIGRAVITY (AGIA-013)

**Date :** 2026-11-21  
**Mission :** AGIA-013 — Évaluation et intégration contrôlée d'ECC / JCODE dans Antigravity  
**Dépôt de référence :** `naitconv-web/agia-infrastructure` (branche `main`, HEAD `608f750`)  
**Régime :** `F1_ZERO_EURO_AUTONOMOUS` (`ENVIRONMENT="PREPROD"`, `WEBHOOK_ENABLED=false`)  
**Statut :** Audit technique en lecture seule — **aucune installation effectuée**

---

## 1. Phase 1 — État des lieux du Harness Engineering SYNTESIA actuel

L'audit du dépôt `naitconv-web/agia-infrastructure` distingue systématiquement ce qui est **documenté**, **implémenté**, **configuré**, **connecté**, **testé** et **validé en conditions réelles** :

| Couche / Composant | Documenté | Implémenté | Configuré / Connecté | Testé | Validé en prod |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **6 couches Harness** (`MODEL`, `CONTEXT`, `TOOLS`, `WORKFLOWS`, `LOOPS`, `OBSERVABILITY`) | Oui (`AGENTS.md`, `docs/harness/`) | Oui (`scripts/harness_ctl.py` 0 dépendance Python) | Oui dans le dépôt | Oui (`preflight` PASS, `test-resilience`) | N/A (PREPROD) |
| **`AGENTS.md` & consignes** | Oui (`/home/antigravity/agia-infrastructure/AGENTS.md`) | Oui | Oui (règles `WEBHOOK_ENABLED=false`, `F1`) | Oui via `preflight` | N/A (PREPROD) |
| **Protocoles `preflight`, `checkpoint`, `validation`** | Oui | Oui (`scripts/harness_ctl.py`) | Oui | Oui (`preflight` Exit 0) | N/A |
| **Registre de mémoire & reprise** (`harness_memory.json`, `REGISTRE_MEMOIRE.md`) | Oui | Oui | Oui | Oui (reprise inter-sessions) | N/A |
| **Capacités natives Antigravity** | Oui (skills, subagents, `run_command` en sandbox `exebox`, proxy `agy-plugin-proxy`, plugins GitHub/Drive/Gmail/Docs/Sheets) | Oui | Oui (VM Debian 12, `antigravity` non-root, `/` read-only hors `/home/antigravity` et `/tmp`) | Oui en conditions réelles | Oui (workflow opérationnel) |

### Forces du Harness actuel
- **Zéro dépendance externe :** `scripts/harness_ctl.py` fonctionne en Python standard sans installation npm/cargo.
- **Sobriété en tokens et quota :** pas de surcouche d'hooks lourds ni de prompts système gonflés.
- **Traçabilité Git + Drive native :** chaque mission produit un checkpoint versionné dans `main` et vérifiable par `preflight`.

---

## 2. Phase 2 — Identification et évaluation comparative d'ECC et JCODE

### 2.1 Recherche de `JCODE` dans les ressources du projet
- Recherche exhaustive dans le dépôt (`grep -rniE "jcode|ecc|affaan-m" docs/ agents/ scripts/ sites/`) : **0 occurrence**.
- Recherche dans Google Drive (`_KNOWLEDGE_BASE` et Drive global) : **0 document**.
- **Statut de `JCODE` :** **NON CONSIGNÉ DANS LES SOURCES DU PROJET**. Via recherche GitHub (`gh api search/repositories`), le candidat public correspondant le plus probable est **`1jehuang/jcode`** (étiqueté ici `PROPOSED / NON CONSIGNÉ DANS LES SOURCES DU PROJET`).

### 2.2 Fiche technique vérifiée : `affaan-m/ECC`
- **Source vérifiée :** `https://github.com/affaan-m/ECC` (`gh api repos/affaan-m/ECC`)
- **Licence :** MIT (avec offre commerciale associée `ECC Pro` à 19 $/siège/mois pour dépôts privés)
- **Popularité / Activité :** ~308 286 étoiles, actif (`pushed_at: 2026-11-20T01:13:45Z`), non archivé
- **Taille du dépôt :** `64 578` KB (~64 Mo)
- **Nature :** *"Harness-native agent operating system for Codex, OpenCode, Cursor, Gemini, Claude Code, and terminal workflows - skills, instincts, memory, security, and research-first development."*
- **Contenu observé :** répertoires `.cursor`, `.gemini`, `.opencode`, `.openclaw`, `AGENTS.md`, `CLAUDE.md`, paquets npm `ecc-universal` (v2.2.3) et `ecc-agentshield`.
- **Évaluation dans Antigravity :**
  - Recouvrement fonctionnel > 80 % avec ce que SYNTESIA possède déjà (`AGENTS.md`, `scripts/harness_ctl.py`, `REGISTRE_MEMOIRE.md`, skills Antigravity natifs).
  - L'installation complète d'`ecc-universal` introduirait des fichiers multi-IDE inutiles (`.cursor`, `.opencode`, `.openclaw`), des hooks npm/Node et un surcoût de tokens/contexte sans gain démontrable.
  - Le composant payant `ECC Pro` (19 $/mois) est **incompatible** avec le régime `F1_ZERO_EURO_AUTONOMOUS` (0,00 €).

### 2.3 Fiche technique vérifiée : `1jehuang/jcode` *(PROPOSED — non consigné dans le projet)*
- **Source vérifiée :** `https://github.com/1jehuang/jcode` (`gh api repos/1jehuang/jcode`)
- **Licence :** MIT
- **Popularité / Activité :** ~21 972 étoiles, actif (`pushed_at: 2026-11-21T08:21:31Z`)
- **Taille du dépôt :** `475 502` KB (~475 Mo, workspace Rust d'environ 35 crates)
- **Nature :** *"High performance coding agent harness written in Rust, built for heavy multi-agent dev workflows"* — binaire TUI terminal autonome (`curl -fsSL https://jcode.sh/install | bash`), ~71,3 Mo RAM pour la 1re session, ~3,3 Mo par session additionnelle.
- **Évaluation dans Antigravity :**
  - `jcode` est un **agent TUI terminal concurrent** conçu pour remplacer Claude Code / Antigravity depuis un shell local développeur, **pas** une bibliothèque ou un module intégrable dans le Harness Antigravity cloud (`exebox`).
  - L'exécuter dans la VM éphémère Antigravity nécessiterait soit de télécharger un binaire tiers hors dépôt (`curl | bash`), soit de compiler 35 crates Rust (~475 Mo), sans intégration avec les outils natifs Antigravity (`view_file`, `replace_file_content`, `invoke_subagent`, plugins Google/GitHub).

---

## 3. Conclusion d'audit

Ni `affaan-m/ECC` ni `1jehuang/jcode` n'apportent une amélioration démontrable et rentable par rapport au Harness SYNTESIA existant (`AGENTS.md` + `scripts/harness_ctl.py` + `harness_memory.json` + capacités natives Antigravity). Conformément à la règle d'AGIA-013 (*« si l'intégration n'apporte pas une amélioration démontrable par rapport au Harness actuel, ne rien installer »*), **aucune installation n'est recommandée ni exécutée**.
