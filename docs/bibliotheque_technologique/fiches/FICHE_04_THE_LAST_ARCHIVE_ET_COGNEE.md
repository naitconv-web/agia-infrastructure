# FICHE RESSOURCE 04 — MOTEURS RAG & MÉMOIRE LOCALE : THE LAST ARCHIVE & COGNEE

- **Identifiants bibliothèque :** `R-04` (`MultiX0/last-archive`) & `L-03` (`topoteretes/cognee`)
- **Origine :** Sélection du Fondateur (`WORKSTATION-IA/_KNOWLEDGE_BASE/OUTILS/Guide-d-installation-The-Last-Archive.md` ID `1je30xFuT86FoJxfarXUOCpq3wG-GsiEA` & `Depot github varié/Document sans titre` ID `17N9XLtLt2TxGI87ncdl0ELy41X_hVcafrvWnJ8CBabw`)
- **Statut dans SYNTESIA :** **`étudié`** (The Last Archive) & **`recommandé` en Phase 2** (Cognee).

---

## 1. THE LAST ARCHIVE (`https://github.com/MultiX0/last-archive`)

### A. Fonctionnalités et architecture vérifiées (`commit a84f5d0`)
- **Objet :** Moteur de recherche sémantique et RAG 100 % local et hors-ligne (0 € d'API).
- **Pile technique (5 à 6 services Docker) :**
  1. `spider` : Crawler web en Go respectant `robots.txt` par défaut.
  2. `embedding-service` (port 5050) : Vectorisation locale des pages et PDF.
  3. `qdrant_server` (port 6333) : Base de données vectorielle Qdrant.
  4. `llm-server` (port 1410) : Pont LLM local en Go exposant un endpoint compatible OpenAI (`/v1/chat/completions`).
  5. `search-server` (port 1213) & `search-frontend` (port 3000) : API et interface de chat avec citation des sources.
- **Licence :** **MIT**.

### B. Diagnostic de compatibilité matérielle & Garde-fou (`[VÉRIFIÉ TECHNIQUEMENT]`)
- **Point d'attention critique :** Le dépôt livre par défaut `qwen:0.5b` (trop faible pour du raisonnement métier) et nécessite de basculer sur `llama3.2:3b` ou `qwen2.5:7b` avec Docker Desktop + WSL2 + Qdrant.
- **Arbitrage vis-à-vis du PC Windows 11 (8 Go de RAM) :** Comme établi dans `LAB-ARCH-001`, faire tourner simultanément Windows 11, Docker Desktop/WSL2, Qdrant et un modèle LLM local 3B/7B sature les **8 Go de RAM** du poste local.
- **Recommandation d'usage :**
  - *Sur le PC 8 Go RAM :* Ne pas lancer `last-archive` en tâche de fond permanente ; utiliser **NotebookLM / Gemini** (inclus à 0 € dans l'abonnement Google AI Pro, 0 Mo de RAM locale) pour l'interrogation de corpus documentaires.
  - *Pour `COS Bureau IA` (appels d'offres hors-ligne) ou chez un client disposant d'un serveur >= 16 Go RAM :* Excellente brique RAG 100 % hors-ligne connectable sur `http://localhost:1410/v1`.

---

## 2. COGNEE (`https://github.com/topoteretes/cognee`)

### A. Fonctionnalités et architecture vérifiées
- **Objet :** Plateforme open-source de mémoire persistante (GraphRAG : couplage graphe de connaissances + vecteurs) pour agents IA.
- **Licence :** **Apache-2.0** (33 443 stars, très actif, dernier push 20/11/2026).
- **Avantage sur un RAG vectoriel classique :** Structure les entités, relations, décisions et historiques sous forme de graphe interrogeable, tout en pouvant utiliser des modèles légers ou des API distantes sans saturer la RAM locale.

### B. Cas d'usage pour `WORKSTATION-IA / LAB CORE`
- Lors du développement futur du noyau `LAB CORE` (Architecture C), `cognee` constitue la référence technique recommandée si le référentiel documentaire Markdown dépasse le seuil où l'indexation textuelle directe (`grep` / index Markdown) suffit.
