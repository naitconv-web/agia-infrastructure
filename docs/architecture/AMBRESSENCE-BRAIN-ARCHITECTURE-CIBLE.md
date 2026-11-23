# ARCHITECTURE CIBLE — `AMBRESSENCE BRAIN` (`WS-AMB-BRAIN-001`)

**Référence décision PDG :** `WS-AMB-BRAIN-001` (`2026-11-23`)  
**Statut :** **`PROPOSED` (Architecture cible documentée — Zéro installation, zéro migration et zéro dépense sans accord PDG)**  
**Base reprise :** `SPEC-AMBRESSENCE-AI-v2.5.9` (Drive ID `12aZOZ5u9DAS2Btvb0pNm1_4LPU2vAEL2`) + `WS-AMB-002` + `10` Gems Google AI Studio  
**Articulation :** **AMBRESSENCE BRAIN** = cerveau métier propriétaire d'AMBRESSENCE · **`WORKSTATION-IA`** = fondation commune (gouvernance, **Paseo**, **Antigravity**, registres, audits).

> **Règle d'intégrité (`DOCUMENTÉ ≠ IMPLÉMENTÉ ≠ OPÉRATIONNEL`) :** À date du `2026-11-23`, `SPEC-AMBRESSENCE-AI-v2.5.9` et le présent document sont des **spécifications d'architecture** (`0` base vectorielle déployée, `0` serveur MCP installé). Les seuls éléments opérationnels existants sont la boutique live (`ambressence.com`, `2 552` produits), les `10` fiches Gems sur Drive et les registres `WORKSTATION-IA`.

---

## 1. DISTINCTION CLAIRE DES 6 PILIERS DE L'ARCHITECTURE CIBLE

### A. Notre Propriété Intellectuelle Métier (Le cœur d'`AMBRESSENCE BRAIN`)
C'est ce qui appartient exclusivement à AMBRESSENCE et qu'aucun outil du marché ne possède :
1. **Identité, stratégie & positionnement :** Enseigne unique `AMBRESSENCE`, ton éditorial, règles wording strictes (ex. banni : *« 100 % authentique »*, *« circuits officiels »* ; autorisé : *« neufs, scellés, facture fournisseur sur demande »*), politique promotionnelle arbitrée par le PDG.
2. **Intelligence Produit :** Catalogue vérifié (`2 552` parfums publiés, `153` en réserve en `WS-AMB-002`), données fournisseurs (`BTS`), familles olfactives, intensités, règles anti-invention (jamais de notes olfactives inventées).
3. **Intelligence Commerciale :** Coûts fournisseurs HT/TTC, TVA `20 %`, règle de prix plancher, frais de port (`4,90 €` / offert dès `60 €`), veille concurrentielle datée, marges par référence.
4. **Intelligence Client :** Demandes SAV, retours (`14` jours), réclamations, objections fréquentes et enseignements du Conseiller Parfum IA.
5. **Mémoire Opérationnelle :** Décisions PDG, fiches missions (`WS-AMB-002`), incidents (`TigerProtect HTTP 429`, Stripe `restricted`), erreurs évitées et apprentissages.

### B. Les Composants Techniques Open Source Réutilisés (Ne pas réinventer)

| Besoin technique | Solution retenue | Licence & Activité | Adéquation, Sécurité & Coût |
| :--- | :--- | :--- | :--- |
| **1. Stockage structuré & Mémoire de référence** | **Git + Markdown + SQLite / PostgreSQL** *(existant ou déjà inclus hébergement/local)* | Open Source (`PostgreSQL License` / Domaine public SQLite) | **0 €.** Source de vérité déterministe pour catalogue, prix, coûts, marges et règles (zéro hallucination sur les chiffres). |
| **2. Recherche documentaire & sémantique** | **SQLite FTS5 / PostgreSQL `pgvector`** *(ou `Qdrant` Apache 2.0 si volume > 50k docs)* | **Apache 2.0 / PostgreSQL** (très actifs) | **0 €.** `pgvector` ou SQLite FTS5 évite de maintenir une base vectorielle séparée dès le départ tout en permettant la recherche sémantique sur fiches parfums et FAQ SAV. |
| **3. Mémoire persistante des agents** | **Fichiers structurés `BUS LEAN v3.0` + `Mem0` (OSS, Phase 2 optionnelle)** | `Mem0` : **Apache 2.0** (très actif) | **0 € licence.** En Phase 1, la mémoire persistante est portée par Git/Drive (`PREFLIGHT` + `SHARDS`). `Mem0` n'est activé qu'en Phase 2 si besoin de mémoire conversationnelle client/SAV. |
| **4. Connexion modèles & outils** | **`MCP`** *(Model Context Protocol)* + **`LiteLLM`** *(en prod API)* | `MCP` : Open Standard · `LiteLLM` Core : **MIT** | **0 € licence.** `MCP` expose WooCommerce/Drive/PostgreSQL en lecture contrôlée. `LiteLLM` route les futurs appels API avec plafonds de coûts en euros. |
| **5. Partage de compétences & Qualité** | **`Agent Skills`** (`agentskills.io`) + **`Promptfoo`** | `Agent Skills` : Standard ouvert · `Promptfoo` : **MIT** | **0 €.** Encapsule les 10 Gems en `SKILL.md` portables et automatise les tests anti-hallucination (`TEST + ATTENDU`). |

### C. Réévaluation des 6 Strates de Mémoire (`SPEC-AMBRESSENCE-AI-v2.5.9`)

`SPEC-AMBRESSENCE-AI-v2.5.9` (§0) prévoyait une « mémoire collective à six strates » sans moteur technique associé. Pour éviter tout doublon avec `WORKSTATION-IA`, voici l'arbitrage exact :

| Strate (v2.5.9) | Évaluation | Décision & Brique technique cible |
| :--- | :--- | :--- |
| **1. Strate Identité & Règles permanentes** | **À CONSERVER** | Markdown versionné (`00-cadrage` consolidé + `05-consignes-communes`), chargé en tête de tout Gem/Skill. |
| **2. Strate Référentiel Stratégique & Décisions** | **REDONDANTE avec `WORKSTATION-IA`** | **DÉLÉGUER à `WORKSTATION-IA`** (`REGISTRE-DECISIONS.md` + `REGISTRE_MEMOIRE.md`) pour éviter deux registres de décisions parallèles. |
| **3. Strate Connaissance Produit & Catalogue** | **À CONSERVER (Critique)** | Export structuré WooCommerce/BTS (SQLite/Postgres + index FTS5/`pgvector`), exposé via **MCP lecture seule**. |
| **4. Strate Économie, Marges & Concurrence** | **À CONSERVER (Critique)** | Tables structurées vérifiées (jamais de texte libre pour les prix/marges), accès restreint au Pôle Économie & Finance. |
| **5. Strate Expérience Client & SAV** | **À CONSERVER (Phase 2)** | Base anonymisée des retours/FAQ (strictement sans PII) ; candidate idéale pour recherche sémantique / `Mem0` plus tard. |
| **6. Strate Opérationnelle & Audit Trail** | **REDONDANTE avec `Harness` + `TR-13/14`** | **CONVERGER** vers `execution_trace.jsonl` + fiches missions `BUS LEAN v3.0` + empreintes SHA-256 (`TR-13/14` pour publications critiques). |

---

## 2. INTÉGRATION DES 10 GEMS AMBRESSENCE & ÉCHANGES ENTRE AGENTS

Les **10 Gems Google AI Studio** sont conservés intégralement et regroupés en **4 pôles** (voir [ARCHITECTURE-EQUIPES-AGENTS.md](file:///home/antigravity/naitconv-web/agia-infrastructure/docs/architecture/ARCHITECTURE-EQUIPES-AGENTS.md)). Ils lisent **`AMBRESSENCE BRAIN`** selon leurs permissions strictes :

| Pôle / Gems | Accès au Brain | Droit d'écriture |
| :--- | :--- | :--- |
| **Pôle Offre (`1, 8, 10`)** | Identité + Catalogue + FAQ | Brouillons fiches/SEO uniquement (`DRAFT_ONLY`). |
| **Pôle Croissance (`2, 4, 7`)** | Identité + Catalogue + FAQ anonymisée | Brouillons campagnes, maquettes UX, réponses SAV. |
| **Pôle Économie (`3, 5, 6`)** | Catalogue + Coûts BTS + Veille + Règles marge | Simulations chiffrées et alertes marge (aucun changement de prix sans PDG). |
| **Pôle Technique (`9`)** | Config infra, scripts, journaux techniques | Code en `dry-run` / PR GitHub (aucune mise en prod sans PDG). |

**Échanges entre agents :** Tous les échanges passent par **Paseo / Antigravity** via des fiches structurées (`BUS LEAN v3.0`) et, à terme, des outils **MCP** en lecture seule. Aucun Gem n'exécute d'action irréversible directement.

---

## 3. SOURCES OFFICIELLES DE CONNAISSANCE (RÉSOLUTION D'ÉCART)

- **Constat vérifié :** Les anciens fichiers de cadrage des Gems (`07/11/2026`) mentionnent encore *« 100 références publiées »* et *« lancement non effectué »*, alors que le site `ambressence.com` est en ligne avec **`2 552` parfums publiés** et `153` en réserve (`WS-AMB-002`, `22/11/2026`).
- **Règle d'unicité des sources :**
  1. **Catalogue & Stock live :** WooCommerce `ambressence.com` (vérité terrain).
  2. **Coûts fournisseurs & Factures :** Documents comptables validés (`BTS` / factures) sur Drive protégé.
  3. **Règles de marque & Stratégie :** Un **seul** fichier de cadrage unifié (`00-cadrage-ambressence.md` mis à jour après accord PDG).
  4. **Décisions & Budgets :** `REGISTRE-DECISIONS.md` et `REGISTRE-BUDGETS-DEPENSES.md` (`WORKSTATION-IA`).

---

## 4. SÉCURITÉ, VALIDATION, COÛTS, RISQUES & DÉPENDANCES

- **Sécurité & Validation :**
  - Maintien strict de `TR-13 / TR-14` (soumission avec empreinte SHA-256 + contrôle qualité indépendant `Concepteur ≠ Auditeur` + validation humaine PDG avant toute publication).
  - Jamais de donnée personnelle client (PII), de clé Stripe (`sk_live_`, `whsec_`) ou de fichier `.env` dans Google AI Studio ou dans les prompts (`11-mode-operatoire-ai-studio.md` + `redact_secrets_and_pii`).
- **Coûts :**
  - **Phases 0 à 2 (conception, Skills, Promptfoo, MCP local, SQLite/Postgres) :** **`0,00 €`** de licence et **`0,00 €`** d'abonnement supplémentaire (utilise GitHub, Drive, Google AI Pro et le poste/VM existants).
  - **Coûts futurs éventuels (Phase 3, si trafic/API en prod) :** uniquement les appels API LLM (plafonnés via `LiteLLM`) si un agent conversationnel client tourne en direct sur le site.
- **Risques & Dépendances :**
  - *Risque 1 (Désynchronisation) :* Si les Gems gardent d'anciens fichiers attachés manuellement, ils contredisent le site live. *Parade :* centraliser le cadrage et générer des `SHARDS` à jour via `harness_ctl.py`.
  - *Risque 2 (Hallucination prix/notes olfactives) :* Un LLM peut inventer une note ou une marge. *Parade :* données chiffrées stockées en base structurée + tests automatisés `Promptfoo` bloquants.
  - *Dépendance principale :* Accès lecture seule contrôlé au catalogue WooCommerce et aux factures fournisseurs BTS validées.

---

## 5. PLAN DE RÉALISATION PROGRESSIF (SOUMIS À AUTORISATION PDG)

| Phase | Contenu exact | Coût | Prérequis / Validation |
| :--- | :--- | :---: | :--- |
| **Phase 0 (Fait)** | Décision PDG + Inventaire des 10 Gems + Architecture cible documentée. | **0 €** | Présent document + audit indépendant. |
| **Phase 1 (Socle portable)** | Mettre à jour le cadrage unique AMBRESSENCE (`2 552` produits), convertir les 10 Gems en **Agent Skills** (`SKILL.md`) sans supprimer AI Studio, et convertir leurs 10 tests en suite **`Promptfoo`**. | **0 €** | **Autorisation PDG requise** avant création des fichiers. |
| **Phase 2 (Mémoire & Outils)** | Créer la base structurée locale (`SQLite` + FTS5) du catalogue/marges + serveur **`MCP` lecture seule** + générateur `PREFLIGHT`/`SHARDS` AMBRESSENCE dans `harness_ctl.py`. | **0 €** | **Autorisation PDG requise** + test sur données non sensibles. |
| **Phase 3 (Production / Client)** | Connexion éventuelle au Conseiller Parfum / SAV en direct via **`LiteLLM`** (avec plafond budget) + mémoire SAV anonymisée (`pgvector` / `Mem0`). | **Variable (API)** | **Arbitrage budget & Go-Live PDG requis.** |
