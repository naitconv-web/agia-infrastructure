# FICHE D'ÉVALUATION — `DeepSeek Harness` (`deepseek-ai/deepseek-harness`)

- **Nom :** `DeepSeek Harness` (`dsh`)
- **Dépôt officiel :** `https://github.com/deepseek-ai/deepseek-harness` (`https://www.deepseek.com/en/harness/`)
- **Date d'évaluation :** `2026-11-23`
- **Catégorie :** Agent développeur open source basé sur plugins (`Cordis`)

---

## 1. Critères factuels vérifiés (vs vidéo YouTube)

| Critère | `VÉRIFIÉ DANS LE DÉPÔT` | `PRÉSENTÉ DANS LA VIDÉO` | `TESTÉ RÉELLEMENT ICI` |
| :--- | :--- | :--- | :--- |
| **Activité & Popularité** | `285 600` étoiles, dernier push `2026-11-22T11:00:05Z`, basé sur le noyau **Cordis** (*everything-is-a-plugin*). | Présenté comme alternative directe économique. | Vérifié via `gh api` (`0 €`). |
| **Licence** | **`MIT`** (permissive, usage commercial autorisé). | Open source gratuit. | Vérifié. |
| **Statut & Maturité** | **`Developer preview`** — avertissement explicite dans le README : ***« THERE WILL BE COMPATIBILITY-BREAKING CHANGES »***. | Utilisé en démo complète. | **`NON TESTÉ`** *(pas d'installation/clé API autorisée)*. |
| **Dépendances & Coûts** | Requiert **Node.js `24.9+`** (`npx @deepseek-ai/dsh web`, port `3080`). **Aucun modèle inclus :** exige une clé API DeepSeek (payante au token) ou OpenAI-compatible/locale. | Coût très bas avec API DeepSeek. | **`NON TESTÉ`**. |
| **Limitation Vision** | Les modèles DeepSeek chat de base sont **texte uniquement** : il faut ajouter un plugin tiers (`ModLens` + clé Gemini/vision) pour lire des captures d'écran. | Associé à Craft Anything. | Vérifié dans la documentation. |

---

## 2. Analyse comparative avec Antigravity & Paseo

| Critère | **Antigravity 2.0** *(Actif)* | **Paseo + OpenCode/Vibe** *(Actif local)* | **DeepSeek Harness (`dsh`)** *(Candidat)* |
| :--- | :--- | :--- | :--- |
| **Rôle dans `WORKSTATION-IA`** | Atelier dev principal, sous-agents, GitHub/Drive, tests. | Orchestrateur multi-modèles local & mobile. | **Doublon direct** d'agent développeur CLI/Web. |
| **Coût actuel pour nous** | Inclus dans abonnement existant (`0 €` sup.). | `0 €` (modèles gratuits / locaux). | Exige clé API DeepSeek (ou endpoint local). |
| **Gouvernance & Sécurité** | `AGENTS.md`, `harness_ctl.py`, `CHARTE-FRANCHISE`, sandbox. | Intégré au workflow fondateur. | Aucune intégration native avec notre `harness_ctl.py` ; breaking changes fréquents. |

---

## 3. Verdict `Make or Buy`
- **Fonctionnalité annoncée / disponible :** Agent modulaire par plugins (`Cordis`), sous-agents, presets, Web UI.
- **Fonctionnalité testée / adoptée :** **`NON TESTÉE` / `NON ADOPTÉE`**.
- **Risque identifié :** Doublon architectural avec **Antigravity** + **Paseo/OpenCode**, instabilité (`developer preview` avec breaking changes), absence de vision native sans plugin tiers.
- **Recommandation :** **`NO-GO`** pour l'adoption permanente dans `WORKSTATION-IA` · **`GO SOUS CONDITIONS` uniquement** pour un **benchmark isolé ponctuel** face à Antigravity si le PDG souhaite mesurer le coût API réel.
