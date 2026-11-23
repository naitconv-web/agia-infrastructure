# RAPPORT HEBDOMADAIRE #1 — `TECH INTELLIGENCE` (`2026-11-23`)

**Cycle :** Semaine de mise en service (`WS-TECH-INTELLIGENCE-001`) + **1er exercice pratique : Phase 1 `AMBRESSENCE BRAIN`**  
**Budget engagé :** **`0,00 €`**

---

## 1. COLLECTE AUTOMATISÉE RÉELLE (`scripts/tech_intel_collect.py`)
- **`8` dépôts officiels** interrogés en direct via `gh api` (`0 €`) → [latest_collect.json](file:///home/antigravity/naitconv-web/agia-infrastructure/docs/tech-intelligence/snapshots/latest_collect.json).
- **Nouveautés clés détectées cette semaine :**
  1. `promptfoo/promptfoo` (`MIT`, `27 551` stars) : release `code-scan-action-0.2.3` publiée le `2026-11-23` (intégration CI GitHub Actions native).
  2. `anomalyco/opencode` (`MIT`, `228 616` stars) : release `v1.19.6` du `2026-11-23` (runtime local déjà branché dans Paseo).
  3. `modelcontextprotocol/servers` (`92 168` stars) : `v2.5.0` du `2026-11-19`.
  4. `BerriAI/litellm` (`63 717` stars) : `v1.110.2` du `2026-11-23` ; `langchain-ai/langgraph` (`MIT`, `45 278` stars) : `1.2.24` du `2026-11-22`.
  5. **Risque rappelé :** `FlowiseAI/Flowise` archivé (`08/2026`) → à ne jamais utiliser. `NousResearch/hermes-agent` (`v0.23.3`, `23/11`) reste en veille uniquement (doublon avec Paseo/Antigravity).

---

## 2. PREMIER EXERCICE : BILAN DE LA PHASE 1 `AMBRESSENCE BRAIN`

1. **Nouvelles capacités découvertes :**
   - Les `10` Gems Google AI Studio sont 100 % portables sous forme de fichiers `SKILL.md` standardisés (`agentskills.io`), lisibles hors AI Studio par Antigravity, Paseo/OpenCode et Claude Code.
   - Leurs `10` tests manuels (`06-revue-gems-et-tests.md`) se convertissent directement en suite déclarative `Promptfoo`.
2. **Compétences améliorées :**
   - Création de [CADRAGE_UNIQUE_AMBRESSENCE.md](file:///home/antigravity/naitconv-web/agia-infrastructure/docs/ambressence/CADRAGE_UNIQUE_AMBRESSENCE.md) résolvant l'écart critique (`100` produits obsolètes → **`2 552` parfums publiés + `153` en réserve**).
   - Packaging des `10` Gems en `skills/ambressence/*/SKILL.md` **sans toucher aux originaux sur Drive**.
3. **Tests réalisés :**
   - Vérification structurelle de la génération des `10` `SKILL.md` (`10/10` générés avec consignes communes + instructions originales).
   - Création de [ambressence-gems.yaml](file:///home/antigravity/naitconv-web/agia-infrastructure/tests/promptfoo/ambressence-gems.yaml) (`10` cas de non-hallucination et conformité marge). *(Exécution live LLM non lancée à ce stade : en attente d'un runner/clé API autorisée à `0 €` ou local).*
4. **Économies et gains de temps :**
   - **Coût évité :** `0,00 €` de licence, `0 €` de serveur, et **~3 à 5 semaines** de développement évitées en réutilisant `agentskills.io` + `Promptfoo` au lieu de coder un moteur propriétaire (`AMBRESSENCE BRAIN` v2.5.9 / `lab-core`).
   - **Temps gagné :** Plus besoin de tester les `10` Gems un par un à la main dans AI Studio à chaque changement de consigne.
5. **Possibilités de réutilisation pour `SYNTESIA` et `OMNISECUR` :**
   - **`SYNTESIA` :** Packager les `5` rôles de `SPECIFICATIONS_MULTI_AGENTS.md` en `SKILL.md` + tester le futur démonstrateur/agent commercial avec `Promptfoo` (anti-promesse, respect EUR/DZD).
   - **`OMNISECUR` :** Réutiliser `Promptfoo` pour tester la conformité CSI / IDCC 1351 des réponses IA et utiliser un serveur `MCP` lecture seule sur PostgreSQL en Phase 2.

---

## 3. DÉCISIONS EN ATTENTE DU PDG
- Autoriser le lancement de la **Phase 2 (`0 €`)** d'AMBRESSENCE BRAIN (index local `SQLite FTS5` sur les `2 552` produits + test `MCP` lecture seule).
- Autoriser l'ajout d'une tâche planifiée GitHub Actions hebdomadaire gratuite (`schedule` cron) pour exécuter `scripts/tech_intel_collect.py` automatiquement chaque lundi.
