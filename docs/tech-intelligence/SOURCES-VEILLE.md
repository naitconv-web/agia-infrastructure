# SOURCES DE VEILLE SURVEILLÉES — `TECH INTELLIGENCE`

**Mode de collecte :** `100 %` gratuit (`gh api` via `scripts/tech_intel_collect.py` + GitHub Actions hebdomadaire chaque lundi `07h00 UTC`).  
**Périmètre :** Étendu aux sources officielles de nos outils actifs (`Antigravity`, `Gemini / AI Studio`, `GitHub`, `Paseo`, `Mistral Vibe`, `OpenCode`) et à l'écosystème open source.

---

## 1. PÔLE 1 — SOURCES OFFICIELLES DE NOS OUTILS ACTIFS

| Outil | Dépôt / Source officielle surveillée | Ce que l'on surveille |
| :--- | :--- | :--- |
| **Google Antigravity** | `google-antigravity/antigravity-sdk-python` + `antigravity.google/docs/` | SDK, JSON hooks, subagents, slash commands, limitations IDE/Desktop. |
| **Gemini & Google AI Studio** | `googleapis/python-genai` + `ai.google.dev` | Modèles, SDK, seuils sécurité, quotas gratuits, Gems / System Instructions. |
| **GitHub** | `cli/cli` + GitHub Actions / Changelog | Nouvelles fonctions `gh`, quotas Actions, sécurité CI. |
| **Paseo & Runtimes locaux** | `getpaseo/paseo` + `mistralai/mistral-vibe` + `anomalyco/opencode` | Orchestration mobile/desktop, providers gratuits/locaux, support `Agent Skills`. |
| **Standards ouverts IA** | `agentskills/agentskills` + `modelcontextprotocol/servers` | Format `SKILL.md`, serveurs `MCP` officiels. |

## 2. PÔLE 2 — ÉCOSYSTÈME OPEN SOURCE & VEILLE CONCURRENTIELLE

| Dépôt officiel | Rôle suivi |
| :--- | :--- |
| `promptfoo/promptfoo` | Tests automatisés & *red-teaming* (`MIT`) |
| `BerriAI/litellm` | Passerelle multi-modèles & plafonds budgétaires (`MIT` hors `enterprise/`) |
| `langchain-ai/langgraph` | Workflows à états (`MIT`) |
| `mem0ai/mem0` | Mémoire persistante (`Apache-2.0`) |
| `NousResearch/hermes-agent` | Veille concurrentielle uniquement (non retenu comme orchestrateur) |
