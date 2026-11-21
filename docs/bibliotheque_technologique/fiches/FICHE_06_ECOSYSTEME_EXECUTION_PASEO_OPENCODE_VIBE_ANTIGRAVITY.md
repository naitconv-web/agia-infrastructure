# FICHE RESSOURCE 06 — ÉCOSYSTÈME D'EXÉCUTION : ANTIGRAVITY, PASEO, MISTRAL VIBE, OPENCODE & ABONNEMENTS

- **Identifiants bibliothèque :** `S-01` à `S-05` & `L-01`
- **Origine :** Document source maître `WORKSTATION-IA_REFERENTIEL_RESSOURCES.md` (`1msXkmlCGCDvpU6ETxsnWJuN0xyp-kp9P` & `1ZDDOWEjO2qNr812LgnwJkkehw9wlGGxE`) et `Guide_divertissement_Google_AI_Pro_ChatGPT_Go.docx` (`1FKgNM-xFaZqNBiftCIMct-RfZ3n5j_Bd`)
- **Statut dans SYNTESIA :** **`intégré`** (Antigravity, ChatGPT Go, Google AI Pro) / **`testé` localement** (Paseo + Mistral Vibe) / **`étudié`** (OpenCode).

---

## 1. SYNTHÈSE DES RÔLES COMPLÉMENTAIRES (ZÉRO DOUBLON D'ORCHESTRATION)

Conformément aux règles de choix d'un outil (§7 de `WORKSTATION-IA_REFERENTIEL_RESSOURCES.md`) :

| Composant | Rôle assigné dans l'écosystème | Statut & Conditions financières |
| :--- | :--- | :--- |
| **1. Google Antigravity (`S-01`)** | **Atelier d'ingénierie agentique principal** : conception, développement, tests, opérations Git (`gh`), manipulation Google Workspace (`gdrive`, `gsheets`, `gdocs`, `gcalendar`, `gmail_go`) et déploiement de l'infrastructure SYNTESIA. | **Inclus dans Google AI Pro (`CONFIRMÉ`)**. Arbitrage quota : modèles de réflexion (Gemini 4 Neon/Argon) pour l'architecture ; modèles rapides (Gemini 3.8 Flash) pour l'exécution répétitive. |
| **2. Google AI Studio, Colab, Flow & NotebookLM (`S-02`/`S-03`)** | - **AI Studio** : prototypage de prompts et sorties structurées avant intégration.<br>- **Colab** : exécution Python/GPU déportée hors du PC 8 Go RAM.<br>- **Flow & Gemini Multimedia** : génération de visuels et vidéos.<br>- **NotebookLM** : interrogation de corpus documentaires sans coût RAM local. | **Inclus dans Google AI Pro (`ACCÈS ABONNEMENT`)**. *Rappel : l'abonnement AI Pro n'équivaut pas à une facturation API de production illimitée.* |
| **3. ChatGPT Go (`S-04`)** | **Copilote indépendant & Contre-auditeur** : raisonnement critique, challenge stratégique, analyse de fichiers et contrôle indépendant des livrables (`Concepteur != Auditeur`). | **Abonnement actif (`CONFIRMÉ`)**. *Rappel : l'API OpenAI payante n'est pas incluse dans ChatGPT Go.* |
| **4. Paseo + Mistral Vibe 3.1.3 (`S-05`)** | **Interface de coordination locale & continuité mobile** : pilotage depuis smartphone lorsque le PC hôte Windows 11 est allumé. Provider ACP personnalisé `vibe` sous Ubuntu WSL2 (`wsl.exe -d Ubuntu -- /home/nait/.local/bin/vibe-acp`). | **Installé localement (`CONFIRMÉ historiquement`)**. Modèle gratuit testé avec succès : `zai-glm-5-3-flash-vibe-free`. Secret `~/.vibe/.env` (`0600`) strictement hors Drive. |
| **5. OpenCode (`L-01` — `anomalyco/opencode`)** | **Provider CLI open-source** intégré dans Paseo (`available, enabled` au 16/11/2026). Permet d'appeler des modèles gratuits ou BYOK. | **Licence MIT (228k stars)**. *Garde-fou :* un modèle listé dans OpenCode (`deepseek-v4.1-flash-free`, `glm-5.3-flash-free`) n'est considéré fonctionnel qu'après un test d'appel réel. |

---

## 2. RÈGLES D'HYGIÈNE ET DE SÉCURITÉ SUR CET ÉCOSYSTÈME

1. **Ne jamais créer plusieurs orchestrateurs concurrents :** Paseo orchestre sur le poste local, Antigravity exécute dans son environnement cloud/sandbox. N'installer ni `OpenManus` ni `fullstack-agent` en surcouche.
2. **Ne jamais confondre abonnement utilisateur et clé API de production :** Aucun site public de SYNTESIA ne doit embarquer d'appel direct à une API LLM payante sans validation explicite du fondateur.
3. **Protection du poste 8 Go RAM :** Déporter systématiquement les builds lourds, tests massifs ou inférences IA vers la VM Cloud Antigravity ou Google Colab.
