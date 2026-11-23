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
- **Fonctionnalité annoncée :** Étude + reconstruction + comparaison visuelle automatique (`3` largeurs d'écran web).
- **Fonctionnalité disponible :** Binaire alpha / compilation Rust + CLI + MCP stdio.
- **Fonctionnalité testée :** **`NON TESTÉE`** (interdiction d'installation/dépense sans accord PDG).
- **Fonctionnalité réellement adoptée :** **`NON`** (évaluation documentaire uniquement à ce stade).
- **Risque ou limitation identifiés :** Statut **`early alpha`**, fuite possible de clés en clair (`ai-keys.toml`), et **un score de similarité visuelle ne prouve jamais l'équivalence fonctionnelle, l'accessibilité ni la sécurité**.
- **Recommandation :** **`GO SOUS CONDITIONS`** uniquement pour un **test isolé en mode Clean Room** (ex. maquette non critique AMBRESSENCE ou atelier client SYNTESIA) · **`NO-GO`** pour toute mise en production ou remplacement de nos règles métier.
