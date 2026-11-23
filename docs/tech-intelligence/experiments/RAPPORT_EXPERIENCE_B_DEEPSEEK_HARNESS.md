# RAPPORT D'EXPÉRIENCE B — `DeepSeek Harness` (`dsh 0.2.2-rc.5`)

**Date :** `2026-11-23` · **Environnement isolé :** `/tmp/ws_exp_b/dsh_sandbox` (`0` installation globale, `0` modification de Paseo/Antigravity)  
**Budget réel engagé :** **`0,00 €`**

---

## 1. INSTALLATION & VÉRIFICATIONS TECHNIQUES
- **Package installé localement (`--no-save`) :** `@deepseek-ai/dsh@0.2.2-rc.5` (Licence **`MIT`**).
- **Runtime vérifié :** `Node.js v24.22.2` (compatible avec l'exigence `>= 24.9`).
- **Commande vérifiée :** `dsh --version` → `0.2.2-rc.5` ; `dsh --help` → profils Cordis (`dsh web`, `--patch`, `--dump-config`).
- **Surface de dépendances & sécurité constatée à l'installation :**
  - **`671` paquets npm** installés en `~2 min`.
  - Avertissements `install-scripts` sur `5` paquets natifs (`@deepseek-ai/dsh-subprocess-local`, `koffi`, `node-pty`, `@google/genai`, `protobufjs`) et `1` paquet déprécié (`node-domexception@1.0.0`).

---

## 2. BLOCAGE BUDGÉTAIRE CONSTATÉ (EXÉCUTION LLM SUSPENDUE)
- **Constat vérifié (`env`) :** Aucune clé API (`DEEPSEEK_API_KEY`, `GEMINI_API_KEY`, `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `MISTRAL_API_KEY`, `OPENROUTER_API_KEY`) n'est présente dans l'environnement de la VM.
- **Application stricte de la règle PDG (`0,00 €`) :** `DeepSeek Harness` étant un shell sans modèle LLM intégré, toute exécution de tâche de développement exige une clé API payante. Conformément à la directive *« Si une API payante est indispensable et qu'aucun crédit déjà disponible et autorisé ne permet le test, suspendre cette partie et documenter le blocage »*, **l'exécution de la tâche par `dsh` a été suspendue sans contourner la limite budgétaire**.

---

## 3. VERDICT EXPÉRIENCE B
- **Recommandation :** **`NO-GO`** pour l'intégration dans `WORKSTATION-IA`.
- **Justification factuelle :**
  1. **Surface d'attaque & poids :** `671` paquets npm avec scripts natifs (`node-pty`, `koffi`) pour une valeur redondante avec **Antigravity** (cloud) et **Paseo + OpenCode/Mistral Vibe** (local).
  2. **Coût :** Exige une clé API payante supplémentaire, alors qu'Antigravity est déjà couvert par votre abonnement existant.
  3. **Maturité :** `0.2.2-rc.5` (`developer preview` avec breaking changes annoncés).
