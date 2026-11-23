# SOURCES DE VEILLE SURVEILLÉES — `TECH INTELLIGENCE`

**Mode de collecte :** `100 %` gratuit (`gh api` via `scripts/tech_intel_collect.py` + recherche web ciblée lors des revues).  
**Dernière exécution vérifiée :** `2026-11-23T01:25:58Z` (`docs/tech-intelligence/snapshots/latest_collect.json`).

---

## 1. PÔLE 1 — OUTILS DE NOTRE INFRASTRUCTURE ACTIVE

| Outil / Écosystème | Source officielle surveillée | Ce que l'on surveille |
| :--- | :--- | :--- |
| **Google Antigravity & Gemini / AI Studio** | Changelogs & docs officielles Google AI / Antigravity | Nouveaux modèles, fenêtres de contexte, outils natifs, sécurité, quotas. |
| **Paseo / OpenCode / Mistral Vibe** | `anomalyco/opencode` (`gh api`) + releases locales Paseo/Vibe | Nouvelles versions CLI, compatibilité `agentskills.io`, modèles gratuits/locaux. |
| **GitHub & Actions** | `github.com` / `gh` CLI / GitHub Actions | Nouvelles fonctions CI/CD gratuites, sécurité, runners, intégrations. |
| **Standards ouverts IA** | `agentskills/agentskills`, `modelcontextprotocol/servers` | Évolution des formats `SKILL.md`, nouveaux serveurs `MCP` officiels. |

## 2. PÔLE 2 — ÉCOSYSTÈME OPEN SOURCE SURVEILLÉ (`gh api` AUTOMATISÉ)

| Dépôt officiel | Rôle suivi | Fréquence |
| :--- | :--- | :--- |
| `agentskills/agentskills` | Standard portable des compétences d'agents | Quotidienne (`gh api`) |
| `modelcontextprotocol/servers` | Connecteurs standardisés outils/données | Quotidienne (`gh api`) |
| `promptfoo/promptfoo` | Tests automatisés & *red-teaming* des prompts/agents | Quotidienne (`gh api`) |
| `BerriAI/litellm` | Passerelle multi-modèles & plafonds budgétaires | Quotidienne (`gh api`) |
| `langchain-ai/langgraph` | Orchestration par graphes d'états / reprise sur erreur | Quotidienne (`gh api`) |
| `mem0ai/mem0` | Mémoire persistante (référence Phase 2 AMBRESSENCE) | Quotidienne (`gh api`) |
| `anomalyco/opencode` | Runtime CLI open source intégré à Paseo | Quotidienne (`gh api`) |
| `NousResearch/hermes-agent` | Veille concurrentielle (non retenu comme orchestrateur) | Quotidienne (`gh api`) |
