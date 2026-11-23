# FICHE D'ÉVALUATION — `Craft Anything` (`storytold/craft-anything`)

- **Nom :** `Craft Anything` (écosystème ArtCraft)
- **Dépôt officiel :** `https://github.com/storytold/craft-anything`
- **Date d'évaluation :** `2026-11-23`
- **Catégorie :** Moteur d'analyse, reconstruction Clean Room et comparaison visuelle d'interfaces

---

## 1. Critères factuels vérifiés (vs vidéo YouTube)

| Critère | `VÉRIFIÉ DANS LE DÉPÔT` | `PRÉSENTÉ DANS LA VIDÉO` | `TESTÉ RÉELLEMENT ICI` |
| :--- | :--- | :--- | :--- |
| **Activité & Popularité** | `41 285` étoiles, dernier push `2026-11-23T01:45:08Z`, `52` contributeurs. | Présenté comme outil de clonage rapide d'apps. | Vérifié via `gh api` (`0 €`). |
| **Licence** | **`MIT OR Apache-2.0`** (`LICENSE-MIT`, `LICENSE-APACHE`). *Attention :* marque/logos ArtCraft sous `LICENSE-brand.txt` séparée. | Non détaillé. | Vérifié. |
| **Technologie & Statut** | **100 % Rust** (`Rust 1.97+`), statut officiel **`early alpha`**. App Desktop + `craft-anything-cli` + **serveur MCP stdio**. | Démontré comme fluide en bout en bout. | **`NON TESTÉ`** *(pas d'installation autorisée)*. |
| **Modes d'inspection** | **Clean Room (défaut) :** captures, texte visible, layout, couleurs, polices, sans lire le code source.<br>**Deep Mode :** lit JS/code/Ghidra (usage privé autorisé). | Clonage complet d'interface. | **`NON TESTÉ`**. |
| **Dépendances cachées** | S'appuie principalement sur un **Claude Code** local connecté pour le build ; builds par clés API/Codex encore partiellement vérifiés (*early alpha*). | Combiné avec DeepSeek dans la vidéo. | **`NON TESTÉ`**. |
| **Sécurité** | Si le trousseau système échoue, les clés API basculent en **texte clair dans `ai-keys.toml`**. | Non mentionné. | Vérifié dans la documentation. |

---

## 2. Maturité réelle & Verdict `Make or Buy`
- **Fonctionnalité annoncée :** Étude + reconstruction (`rebuild` : `Study → Build → Check → Ready`) + comparaison visuelle automatique.
- **Fonctionnalité disponible :** Binaire `v0.6.1` (`craft-anything-cli`) + serveur MCP (`30` outils) + `web-pixels-compare` + `rebuild`.
- **Fonctionnalité testée (`WS-TECH-INTELLIGENCE-003`, `0,00 €`) :**
  - `doctor` OK (`healthy: true`, Chromium `/usr/bin/chromium`, MCP `30` outils OK).
  - `web-pixels-compare` OK sur captures Chromium (`1440×900` : `79,4 %` layout / `81 %` perceptuel ; `390×844` : `48 %` layout / `49 %` perceptuel). *Note : ces chiffres restent une référence historique de comparaison et ne valident pas la chaîne `Study → Build`.*
  - `web-site-open` échoué dans la VM Linux sans `--no-sandbox` ; `rebuild` non testé (`0` backend AI configuré).
- **Fonctionnalité réellement adoptée :** **`NON`** (usage isolé uniquement ; zéro production).
- **Risque ou limitation identifiés :** Statut **`early alpha`**, échec `web-site-open` en conteneur sans `--no-sandbox`, dépendance à un backend AI (`rebuild`), fuite possible de clés en clair (`ai-keys.toml`), et **un score de similarité visuelle ne prouve jamais l'équivalence fonctionnelle, l'accessibilité ni la sécurité**.
- **Décision PDG (`DEC-18`, `WS-TECH-INTELLIGENCE-005`) :** **`BLOCKED` — Suspension contrôlée de l'expérimentation A2.**
  - **Faits de blocage (`RAPPORT_BLOCAGE_EXP_A2_OPTION_B.md`) :** `web_site_open` via MCP échoue sans `--no-sandbox` (`credentials.cc:137`) et `craft-anything-cli ai list` = `[]` (`0` backend à `0 €`).
  - **Interdictions actives :** Ni Option A sur Windows, ni expérimentation réduite `Check-only`, ni contournement `--no-sandbox` sur Chromium. Acquis et binaire `/tmp/ws_exp_a/` conservés.
  - **4 conditions de réouverture :** (1) exécution réelle de `Study → Build → Check → Ready` ; (2) backend déjà autorisé à `0 €` ; (3) respect sécurité/isolation ; (4) zéro impact sur la production AMBRESSENCE.
  - **Protocole & blocage :** [PROTOCOLE_EXP_A2_CRAFT_ANYTHING_STUDY_BUILD_CHECK.md](file:///home/antigravity/naitconv-web/agia-infrastructure/docs/tech-intelligence/experiments/PROTOCOLE_EXP_A2_CRAFT_ANYTHING_STUDY_BUILD_CHECK.md) · [RAPPORT_BLOCAGE_EXP_A2_OPTION_B.md](file:///home/antigravity/naitconv-web/agia-infrastructure/docs/tech-intelligence/experiments/RAPPORT_BLOCAGE_EXP_A2_OPTION_B.md).
