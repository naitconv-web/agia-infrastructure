# BIBLIOTHÈQUE TECHNOLOGIQUE VIVANTE SYNTESIA & WORKSTATION-IA
**Référence :** SYNTESIA-TECH-LIB-001 (Mission AGIA-006 — Chantier 1)  
**Source primaire :** Google Drive `WORKSTATION-IA/_KNOWLEDGE_BASE/` (`1Kk5x1q3TW-sqKzYkDvHCmGKMRd8MePpP`)  
**Date d'audit et de vérification API GitHub :** 21 novembre 2026  
**Statut :** `INVENTAIRE INTÉGRAL QUALIFIÉ — RESSOURCE PERMANENTE DE TRAVAIL`  

---

## 1. DOCTRINE D'UTILISATION INTELLIGENTE DE LA BIBLIOTHÈQUE

Cette bibliothèque constitue le **réflexe numéro 1** de l'orchestrateur et des agents SYNTESIA. Elle évite de réinventer des fonctionnalités déjà résolues par des briques open-source ou internes éprouvées, tout en empêchant l'empilement anarchique de dépendances.

### Protocole obligatoire en 6 étapes avant tout nouveau développement
Lorsqu'une mission nécessite une capacité particulière (UI/UX, extraction de données, RAG local, rétro-ingénierie, profil d'agent, automatisation) :
1. **Consulter d'abord la présente bibliothèque** (`INDEX_ET_GOUVERNANCE.md` et `MATRICE_RESSOURCES_PROJETS.md`).
2. **Identifier les ressources adaptées** parmi la sélection du fondateur et les actifs internes.
3. **Vérifier leur pertinence, leur licence et leur compatibilité technique** (notamment vis-à-vis de la contrainte PC local 8 Go RAM / absence de GPU ou de la VM Cloud Debian 12).
4. **Recommander leur utilisation** si elles apportent une valeur supérieure, une meilleure maintenabilité ou un coût inférieur à un développement interne.
5. **Signaler honnêtement les éventuelles lacunes** (ex. dépôt archivé, licence restrictive AGPL-3.0 en SaaS, ou incompatibilité matérielle).
6. **Proposer de nouvelles ressources externes uniquement si nécessaire**, en documentant leur licence, leur état de maintenance et leur cas d'usage.

### Règles permanentes de gouvernance technique
- **Zéro installation systématique :** Ne jamais installer tous les outils par défaut ni multiplier les dépendances (`node_modules` / containers Docker) sans besoin immédiat validé.
- **Souveraineté du Fondateur :** Le fondateur conserve la décision finale d'intégration de tout composant structurant ou de toute dépense.
- **Règle permanente Refero (`https://styles.refero.design`) :** Pour chaque futur projet nécessitant une conception d'interface (UI) ou une expérience utilisateur (UX), consulter **Refero Styles** lorsque cela est pertinent afin d'ancrer la direction artistique sur des références réelles (`DESIGN.md` / *Reference Lock*) plutôt que sur un style IA générique. Cette règle est une recommandation méthodologique de conception et non une dépendance technique bloquante.
- **Rigueur des statuts :** Ne jamais confondre une ressource **identifiée** avec une ressource **testée** ou **intégrée**.

### Nomenclature officielle des statuts de la bibliothèque
- **`intégré`** : Activement déployé et utilisé en production ou dans le dépôt actuel du projet.
- **`testé`** : Exécuté avec preuve vérifiée dans l'historique du portefeuille (tests unitaires ou appel validé).
- **`retenu`** : Sélectionné formellement pour être utilisé dans le cadre de la mission courante ou du protocole d'architecture.
- **`recommandé`** : Évalué positivement (licence, maintenance, adéquation) et conseillé pour un cas d'usage précis à venir.
- **`étudié`** : Inspecté techniquement (code, README, licence, prérequis vérifiés), conservé en réserve avec ses limites documentées.
- **`à examiner`** : Identifié dans une capture ou liste, nécessitant un test en environnement isolé avant usage.
- **`écarté`** : Déconseillé pour une intégration directe en production (ex. dépôt officiellement archivé, licence incompatible, ou risque de sécurité/conformité).

---

## 2. ARBORESCENCE EXPLORÉE DANS `WORKSTATION-IA/_KNOWLEDGE_BASE`

L'exploration intégrale en lecture seule de `_KNOWLEDGE_BASE` (`1Kk5x1q3TW-sqKzYkDvHCmGKMRd8MePpP`) a couvert :
1. **Racine `_KNOWLEDGE_BASE/` :**
   - `WORKSTATION-IA_REFERENTIEL_RESSOURCES...md` (`1msXkmlCGCDvpU6ETxsnWJuN0xyp-kp9P`)
2. **Dossier `REFERENCES/` (`1TK29nh5h2l0wzeYl6XZ3eCoLTQLAV0DU`) :**
   - `WORKSTATION-IA_REFERENTIEL_RESSOURCES...md` (`1ZDDOWEjO2qNr812LgnwJkkehw9wlGGxE`)
   - `WORKSTATION-IA_REGISTRE_CENTRAL_DES_DEPOTS.docx` (`1sa-f32LvnZRyNM4IJjp3HwHtrPVtkjHj`)
   - `Guide_divertissement_Google_AI_Pro_ChatGPT_Go.docx` (`1FKgNM-xFaZqNBiftCIMct-RfZ3n5j_Bd`)
   - `SOURCES-REGLEMENTAIRES-DATEES.md` (`1lbmNzLoxC4EI6xL9Hoi7-QT8PqcqkpMX`)
   - Sous-dossier `Dépôts Github interessant/` (`1Q_9hcLBOzEUpgxkj3HDmx1urK44VyyKc`) :
     - `Obliteratus` (Google Doc `1jS23O01dcfh1iamK7mlrRGoEB27zcge5oAYWsp1eyY0`)
     - Sous-dossier `Depot github varié/` (`19lwIH3ct3vDibK8C0KwiDmWJrkfK93zK`) :
       - `Dépôts Github varié` (Google Doc `1gSBsqcKpnhGt6a15fEB-zMXaQgisa31BtaZJlIt0zV8`)
       - `Document sans titre` [Liste de 7 outils open-source + Open Source Skill Finder] (Google Doc `17N9XLtLt2TxGI87ncdl0ELy41X_hVcafrvWnJ8CBabw`)
       - `Screenshot_20261119-014422.png` [Capture "Run them yourself, free" — 7 dépôts open-source] (`1KdHWFXBZobOo7GvzhvytuQakidZDuFNC`)
     - Sous-dossier `Divers/` (`1kCIDdaUYGuoDiOCWHsz3lAtGXLFFUlFZ`) :
       - `Document sans titre` [Lien direct vers `https://styles.refero.design/`] (`1Kei5e8nwUrQpOsoponoN4S5teAzVuE4fnqSxuyExWkY`)
     - Sous-dossier `Prompts variés/` (`1dMKOfBHaWUDzHgNO-MrtppjHiLm6eOiv`) :
       - `Fb` [Méthodologie en 6 prompts de découverte et stress-test Micro-SaaS] (`18VJcwA7rATfxN9du0WdjhbMWhV2co6-I6hl7GU7FLpU`)
3. **Dossier `OUTILS/` (`1u4iaYNOTMzA5xmCCYk2TrWD8GBksUdfR`) :**
   - `moteur-leads-universel-v2.mjs` (`1E15LyX_jTwPJmJlX49XcDTT8iNyK2DA3`)
   - `moteur-leads-universel.js` (`1jvROYhXshXE_JpMomFJd32njWTrFIaqP`)
   - `Guide-d-installation-The-Last-Archive.md` (Raccourci `1BrYAiii6B7f5CgltrTbZ49aojAT5pE1t` ➔ Cible `1je30xFuT86FoJxfarXUOCpq3wG-GsiEA`)
4. **Dossier `DOCUMENTATION/` (`10q7beLCdMwRDdewthX2Ob_6tU-HyhifT`) :**
   - `GUIDE-WORKFLOW-BUS-IA.md` (`1Cg3ML_PmfUmlFuURWdvJnSl_lgbW_WHk`)
5. **Dossier `METHODES/` (`1C26L3NG3OtSNquJFj5YZ2Emndi-BdBpn`) :**
   - `STANDARD-DEV-SECURITE-RGPD.md` (`1WSLZNIm2mnw4EEMmGSKbDBa6vMguZUuO`)

---

## 3. INVENTAIRE INTÉGRAL ET QUALIFICATION DES RESSOURCES

### A. Sélection directe du Fondateur (Dossiers `REFERENCES/Dépôts Github varié`, `Divers`, `OUTILS` & `REGISTRE_CENTRAL`)

| Réf | Nom & URL d'origine | Type | Fonctionnalités réelles | Licence | Maintenance (Vérif. 21/11/2026) | Compatibilité & Prérequis | Coût | Projets concernés | Statut |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **R-01** | **Refero Styles**<br>`https://styles.refero.design/`<br>*(Source : `Divers/Document sans titre` & `REGISTRE_CENTRAL`)* | Bibliothèque Design Systems (`DESIGN.md`) & Service Web/MCP | Catalogue curaté de ~200 à 2 000+ styles extraits de produits réels (palettes, typographies, espacements, règles Do/Don't, format `DESIGN.md` pour agents IA). | Freemium (Galerie web & copie `DESIGN.md` gratuites ; MCP live sur plan Pro payant) | Actif (2026) | Web universel. Utilisable à 0 € par extraction documentaire et *Reference Lock* sans abonnement MCP payant. | **0 €** (mode galerie / `DESIGN.md`) | **SYNTESIA** (Sites France & Algérie), **OMNISECUR**, **AMBRESSENCE**, tous futurs UI | **`retenu` & `intégré`** *(Chantier 2 AGIA-006)* |
| **R-02** | **REA (Reverse Engineer Anything)**<br>`https://github.com/morluto/rea`<br>*(Source : `Dépôts Github varié` — note fondateur)* | Dépôt GitHub / Serveur MCP & CLI (`npx rea-agents`) | Inspection assistée par agents d'applications JS/Electron (ASAR), sites web, assemblies .NET et binaires natifs (via pont Hopper/Ghidra/IDA/Kuna) avec preuves. | **MIT** | **Très actif** (472k stars, dernier push 21/11/2026, non archivé) | Node.js / npm (`rea-agents`). L'analyse statique JS/Web fonctionne sans moteur binaire lourd (compatible VM & PC 8 Go). | **0 €** (Open-source MIT) | **OMNISECUR** (Veille concurrentielle mondiale), **SYNTESIA** (Audit d'outils existants) | **`étudié` & `recommandé`** *(Protocole Chantier 3)* |
| **R-03** | **The Agency (`agency-agents`)**<br>`https://github.com/msitarzewski/agency-agents`<br>*(Source : `REGISTRE_CENTRAL` & `Dépôts Github varié`)* | Dépôt GitHub / Bibliothèque de profils d'agents & scripts CLI | Collection de rôles d'agents IA spécialisés (Engineering, Design, Marketing, QA, Product) avec scripts `convert.sh` / `install.sh` compatibles Antigravity, Claude Code, OpenCode, Mistral Vibe, Gemini CLI. | **MIT** | **Très actif** (169k stars, push 09/11/2026, non archivé) | Fichiers Markdown légers (0 impact RAM). Compatible nativement avec `--tool antigravity`, `vibe` et `opencode`. | **0 €** (Open-source MIT) | **WORKSTATION-IA**, **SYNTESIA** (Enrichissement des prompts d'agents spécialisés) | **`étudié` & `recommandé`** |
| **R-04** | **The Last Archive (`last-archive`)**<br>`https://github.com/MultiX0/last-archive`<br>*(Source : `OUTILS/Guide-d-installation-The-Last-Archive.md`)* | Dépôt GitHub / Moteur RAG 100 % local (Docker + Go + Qdrant + Ollama) | Archivage web par crawler Go (`robots.txt` respecté), vectorisation Qdrant et recherche sémantique locale avec citations de sources et pont compatible OpenAI (`localhost:1410/v1`). | **MIT** | Stable (commit `a84f5d0` du 31/01/2026, 33 stars) | **Attention contrainte matérielle :** Requiert Docker Desktop + WSL2 + 6 conteneurs + modèle local (`llama3.2:3b`). Lourd pour un PC 8 Go RAM en usage simultané. | **0 €** (100 % local hors-ligne) | **WORKSTATION-IA**, **OMNISECUR** (`COS Bureau IA` hors-ligne), **SYNTESIA** (Base documentaire) | **`étudié`** *(Réservé machine >= 16 Go RAM ou usage exclusif ponctuel)* |
| **R-05** | **Moteur Leads Universel v2.0**<br>`WORKSTATION-IA/_KNOWLEDGE_BASE/OUTILS/moteur-leads-universel-v2.mjs` | Script interne Node.js (50,8 Ko, zéro dépendance npm) | Extraction B2B Open Data officielle : API Recherche Entreprises (`api.gouv.fr`), BOAMP (marchés publics), DECP v3 et enrichissement légal respectant `robots.txt` et CPCE Art. L.34-5. | Interne Propriétaire Fondateur | **Actif & Certifié** (`6/6` tests lors de `WS-2026-000-REV2` le 16/11/2026) | Node.js v24 natif (0 Mo RAM au repos, 0 dépendance externe). Profils préconfigurés : `SECURITE_PRIVEE`, `PRESCRIPTEURS_SECURITE`, `BTP_RENOVATION`. | **0 €** (APIs Open Data État) | **OMNISECUR**, **RELANCE-DEVIS**, **SYNTESIA** (Toutes verticales France) | **`testé` & `retenu`** |
| **R-06** | **Awesome Opus 5.5 Videos**<br>`https://github.com/yihui-dev/awesome-opus5-5-videos`<br>*(Source : `Dépôts Github varié` — URL complète retrouvée !)* | Dépôt GitHub / Galerie de prompts & démonstrations UI/Motion | Collection de vidéos et remakes interactifs réalisés avec Claude Opus 5.5 accompagnés des prompts exacts de génération d'animations et d'interfaces. | **MIT** | Actif (16k stars, push 13/10/2026, non archivé) | Consultation documentaire / inspiration de prompts d'interfaces animées et démonstrateurs. | **0 €** | **OMNISECUR** (Animations démo), **SYNTESIA** (Démonstrateurs sectoriels) | **`étudié`** *(Anomalie d'URL manquante du Registre Central résolue)* |
| **R-07** | **FreeLLMAPI (`freellmapi`)**<br>`https://github.com/tashfeenahmed/freellmapi`<br>*(Source : `REGISTRE_CENTRAL`)* | Dépôt GitHub / Agrégateur proxy de 87 fournisseurs LLM gratuits | Point d'entrée unique `/v1` routant avec failover automatique vers ~1 313 endpoints gratuits. | **MIT** *(Mention : "Personal experimentation only")* | Actif (55,9k stars, push 20/11/2026) | **Garde-fou sécurité critique :** Le routage vers 87 fournisseurs tiers gratuits expose les prompts à des politiques de rétention inconnues. **Interdit pour les données clients/RGPD.** | **0 €** | **WORKSTATION-IA** (Uniquement tests synthétiques anonymes hors production) | **`étudié` (Usage prod/client `écarté` pour conformité RGPD)** |
| **R-08** | **UI-TARS Desktop**<br>`https://github.com/bytedance/UI-TARS-desktop`<br>*(Source : `Dépôts Github varié`)* | Dépôt GitHub / Agent multimodal GUI desktop (ByteDance) | Contrôle d'interface graphique desktop et navigateur par modèle vision-action. | **Apache-2.0** | **ARCHIVÉ** (`archived: true` vérifié via API GitHub, dernier push 09/10/2026, 39,6k stars) | Lourd (modèle VLM) et dépôt officiellement archivé en lecture seule par ByteDance. | **0 €** | **WORKSTATION-IA** | **`écarté`** *(Dépôt archivé en amont + trop lourd pour PC 8 Go)* |
| **R-09** | **Kimi K3 in C (`kimi-k3-in-c`)**<br>`https://github.com/FareedKhan-dev/kimi-k3-in-c`<br>*(Source : `Dépôts Github varié`)* | Dépôt GitHub / Moteur d'inférence C99 pur sur CPU | Démonstration technique d'exécution d'un modèle MoE massif sur CPU en C99 portable (8,24 Go de RAM minimum, streaming disque). | **Apache-2.0** | Actif (12,5k stars, push 16/11/2026) | Requiert **8,24 Go de RAM libres minimum** (incompatible avec un PC Windows 11 ayant 8 Go de RAM totale où l'OS consomme déjà 3-4 Go) et latence CPU non viable en production. | **0 €** | **WORKSTATION-IA** (Curiosité R&D / Référence d'architecture C99) | **`étudié` (`écarté` sur PC 8 Go RAM)** |
| **R-10** | **Fullstack Agent (`fullstack-agent`)**<br>`https://github.com/jaredrhod/fullstack-agent`<br>*(Source : `Dépôts Github varié`)* | Dépôt GitHub / Assistant d'installation multi-briques (voix, mémoire, avatar) | Wizard installant toute la pile `jaredrhod` (mémoire, voix, interface avatar, contrôle). | **AGPL-3.0** | Modéré (1,2k stars, dernier push 30/08/2026) | **Attention :** Licence **AGPL-3.0** contaminante + installe une pile monolithique lourde contraire à la règle *Lean v1.0 (< 80 Mo RAM, 0 daemon inutile)*. | **0 €** | **WORKSTATION-IA** | **`écarté`** *(Conflit avec doctrine Lean v1.0 & licence AGPL)* |
| **R-11** | **Obliteratus**<br>`https://github.com/elder-plinius/obliteratus`<br>*(Source : `Dépôts Github interessant/Obliteratus`)* | Dépôt GitHub / Espace HuggingFace & Notebook Colab | Outil expérimental de recherche sur le désalignement / suppression de filtres de refus (*abliteration*) sur poids de modèles ouverts. | **AGPL-3.0** | Actif (9,6k stars, push 21/11/2026) | Exécutable sur ZeroGPU HuggingFace ou Google Colab. **Inutile et risqué pour les applications B2B réglementées de SYNTESIA / OMNISECUR.** | **0 €** (Colab / HF) | Recherche R&D isolée uniquement | **`écarté` pour SYNTESIA / LAB B2B** |
| **R-12** | **Méthode 6 Prompts Micro-SaaS (`Fb`)**<br>Drive `Prompts variés/Fb` (`18VJcwA7...`) | Méthodologie de Prompt Engineering (Arabe / SaaS) | Séquence structurée en 6 étapes : 1. Identification de 20 douleurs réelles, 2. Conversion en Micro-SaaS ciblés, 3. Marchés sous-servis (Excel/WhatsApp), 4. Analyse des plaintes concurrents, 5. Red-Team / Crash-test de l'idée, 6. Spécification MVP (*Must-have* vs *Nice-to-have*). | Interne / Libre | Documenté dans Drive | Directement aligné avec la philosophie de `BRAINSTORMING/IDEE-001` et `AGIA-005`. | **0 €** | **SYNTESIA** (Diagnostics sectoriels), **LAB** (Cadrage nouvelles solutions Omni-X) | **`retenu` & `intégré`** *(Méthodologie d'étude)* |

---

### B. Outils issus des deux listes capturées dans `Depot github varié` (7 outils `Document sans titre` + 7 dépôts `Screenshot_20261119-014422.png`)

| Réf | Nom & Dépôt GitHub Identifié | Type | Fonctionnalités réelles | Licence | Maintenance (Vérif. 21/11/2026) | Pertinence & Cas d'Usage pour SYNTESIA / LAB | Statut |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **L-01** | **OpenCode**<br>`https://github.com/anomalyco/opencode` | Agent de programmation CLI open-source | Alternative open-source à Claude Code connectable à de multiples modèles (GLM, MiniMax, DeepSeek, Kimi). Déjà listé comme provider dans **Paseo** (`WORKSTATION-IA_REFERENTIEL_RESSOURCES`). | **MIT** | **Très actif** (228k stars, push 21/11/2026) | Utilisé comme provider secondaire dans Paseo sur le poste du fondateur (statut individuel des modèles gratuits à vérifier avant chaque session). | **`étudié`** *(Présent dans Paseo)* |
| **L-02** | **Understand-Anything**<br>`https://github.com/Egonex-AI/Understand-Anything` | Outil d'analyse de code & Graphe de connaissance interactif | Transforme n'importe quel dépôt de code en graphe interactif explorable (architecture, dépendances, flux) pour Claude Code, Cursor, Codex, Gemini CLI. | **MIT** | **Très actif** (93,5k stars, push 18/11/2026) | **Haute valeur pour SYNTESIA & OMNISECUR :** Idéal en complément de **REA** pour cartographier rapidement un dépôt open-source ou auditer l'architecture d'un projet client. | **`recommandé`** |
| **L-03** | **Cognee**<br>`https://github.com/topoteretes/cognee` | Plateforme de mémoire graphe (GraphRAG) pour agents IA | Mémoire persistante long-terme structurée en graphe pour agents IA, compatible avec de petits modèles. | **Apache-2.0** | **Très actif** (33,4k stars, push 20/11/2026) | Candidat pertinent pour la couche `MEMORY ENGINE` de l'Architecture C (`LAB CORE`) lorsque la mémoire Markdown/Drive atteindra ses limites de volumétrie. | **`recommandé`** *(Phase 2 `LAB CORE`)* |
| **L-04** | **n8n**<br>`https://github.com/n8n-io/n8n` | Plateforme d'automatisation de workflows & agents IA | Orchestration visuelle low-code (400+ intégrations, webhooks, agents IA) auto-hébergeable. | **Sustainable Use License** (Fair-code : usage interne gratuit, revente SaaS hébergée encadrée) | **Très actif** (211k stars, push 21/11/2026) | Standard du marché pour déployer chez les clients PME de SYNTESIA (sur leur VPS) des automatisations visuelles maintenables par leurs équipes. | **`recommandé`** *(Prestations clients SYNTESIA)* |
| **L-05** | **OpenManus**<br>`https://github.com/FoundationAgents/OpenManus` | Agent IA généraliste open-source | Alternative open-source à Manus AI exécutant des tâches de recherche, génération de fichiers et présentations localement (avec clés API LLM). | **MIT** | Actif (59k stars, push 02/11/2026) | Redondant avec le couple actuel **Antigravity + Paseo**, qui est déjà maîtrisé et intégré au workflow du fondateur. Ne pas ajouter un 3e orchestrateur. | **`étudié` (Non retenu pour éviter doublon avec Antigravity/Paseo)** |
| **L-06** | **HyperFrames**<br>`https://github.com/heygen-com/hyperframes` | Éditeur vidéo / motion graphics IA open-source | Génération et édition de vidéos motion graphics image par image à partir d'un script ou d'une charte de site web. | **Apache-2.0** | **Très actif** (87,7k stars, push 21/11/2026) | Pertinent pour produire à 0 € des vidéos de démonstration produit pour **SYNTESIA**, **OMNISECUR** et **AMBRESSENCE**. | **`recommandé`** *(Marketing & Démos)* |
| **L-07** | **PasteBar**<br>`https://github.com/PasteBar/PasteBarApp` | Gestionnaire de presse-papiers avancé (Mac / Windows) | Historique illimité de copier-coller, organisation en tableaux de snippets et templates de prompts. | Custom / Freeware | Actif (2,1k stars, push 18/08/2026) | Utilitaire de productivité personnelle pour le poste Windows 11 du fondateur (attention : ne jamais y stocker en clair des clés API critiques). | **`à examiner`** *(Utilitaire poste local)* |
| **L-08** | **Chatwoot**<br>`https://github.com/chatwoot/chatwoot`<br>*(Capture David Iya)* | Plateforme support client omnicanale open-source | Messagerie client centralisée (Live-chat web, Email, WhatsApp Business, Instagram, Messenger) alternative à Intercom / Zendesk. | **MIT / Enterprise** | **Très actif** (40,2k stars, push 20/11/2026) | **Très haute valeur pour SYNTESIA Algérie & France (HCR / Immobilier / E-commerce AMBRESSENCE) :** Permet de déployer une boîte de réception unifiée WhatsApp + Web chez les clients PME. | **`recommandé`** *(Offres Relation Client & AMBRESSENCE)* |
| **L-09** | **OpenSEO**<br>`https://github.com/every-app/open-seo`<br>*(Capture David Iya)* | Outil d'audit et d'analyse SEO open-source | Alternative légère open-source à Semrush / Ahrefs pour l'audit SEO technique et le suivi de mots-clés. | **MIT** | **Très actif** (28,5k stars, push 20/11/2026) | Directement utile pour l'**Agent Marketing & SEO de SYNTESIA** (audit des sites vitrines France/Algérie, AMBRESSENCE et audits SEO de prospects BTP/HCR). | **`recommandé`** *(Pôle SEO SYNTESIA)* |
| **L-10** | **OpenWhispr**<br>`https://github.com/OpenWhispr/openwhispr`<br>*(Capture David Iya)* | Dictée vocale speech-to-text locale ou BYOK | Transcription vocale rapide multi-plateforme (modèles locaux Parakeet/Whisper ou API BYOK). | **MIT** | **Très actif** (11,9k stars, push 21/11/2026) | Utile pour la saisie vocale rapide de prompts par le fondateur ou comme brique de dictée de Comptes-Rendus de Chantier (Verticale Architecture / BTP). | **`étudié`** |
| **L-11** | **Cap**<br>`https://github.com/CapSoftware/Cap`<br>*(Capture David Iya)* | Enregistreur d'écran open-source (Alternative à Loom) | Capture vidéo d'écran + webcam avec partage rapide pour démonstrations asynchrones. | Open-source (AGPL/MIT selon modules) | **Très actif** (25,3k stars, push 21/11/2026) | Excellent outil à 0 € pour enregistrer des **vidéos d'audit personnalisées de 2 minutes** envoyées aux prospects qualifiés (Sécurité Privée, BTP, Hôtellerie). | **`recommandé`** *(Closing commercial SYNTESIA)* |
| **L-12** | **AppFlowy**<br>`https://github.com/AppFlowy-IO/AppFlowy`<br>*(Capture David Iya)* | Espace de travail collaboratif open-source (Alternative à Notion) | Notes, wikis, bases de données tabulaires et kanban local-first avec IA. | **AGPL-3.0** | **Très actif** (79,2k stars, push 15/11/2026) | Alternative souveraine potentielle si un client PME refuse Google Workspace / Notion pour ses données internes. Non requis en interne (Drive + GitHub déjà en place). | **`étudié`** |
| **L-13** | **VoiceStudio**<br>`https://github.com/debpalash/VoiceStudio`<br>*(Capture David Iya)* | Studio vocal IA local (Clonage, TTS, doublage) | Alternative locale à ElevenLabs (TTS, transcription, doublage en 646 langues). | **AGPL-3.0** | **Très actif** (115,7k stars, push 21/11/2026) | Exige un GPU significatif pour tourner en local (incompatible PC 8 Go RAM sans GPU dédié). Utile uniquement via Colab ou serveur GPU pour voix-off vidéos. | **`étudié`** *(Contrainte GPU documentée)* |
| **L-14** | **Open-Generative-AI**<br>`https://github.com/Anil-matcha/Open-Generative-AI`<br>*(Capture David Iya)* | Studio de génération d'images et vidéos IA | Interface auto-hébergée connectant des modèles de génération visuelle. | **MIT** | Actif (35,6k stars, push 21/11/2026) | Redondant avec **Google Flow / Gemini Image** déjà inclus dans l'abonnement **Google AI Pro** du fondateur (`Guide_divertissement_Google_AI_Pro.docx`). | **`écarté`** *(Doublon avec Google AI Pro déjà payé)* |
| **L-15** | **Open Source Skill Finder (`MaharaAI`)**<br>`https://epreneurs.link/MaharaAI` | Skill de recherche de dépôts open-source | Prompt/skill invitant l'agent de code à chercher un dépôt GitHub pertinent avant de coder. | Libre | Documenté dans `Document sans titre` | **Principe internalisé directement dans le protocole en 6 étapes de la présente bibliothèque SYNTESIA** (via `gh api search/repositories` sans dépendre d'un raccourci tiers opaque). | **`intégré` (en tant que méthode native)** |

---

### C. Socle d'Exécution, Abonnements & Méthodes Internes (`_KNOWLEDGE_BASE`)

| Réf | Ressource | Type | Statut de preuve (`REFERENTIEL_RESSOURCES`) | Rôle dans SYNTESIA & WORKSTATION-IA | Statut |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **S-01** | **Google Antigravity** (Abonnement Google AI Pro) | Environnement d'ingénierie agentique & VM Cloud | `CONFIRMÉ` | Atelier de développement, d'audit, d'orchestration CRM/Drive/GitHub et de construction de l'infrastructure SYNTESIA. | **`intégré`** |
| **S-02** | **Google AI Studio & Google Colab** (Google AI Pro) | Prototypage LLM & Notebooks Python/GPU | `ACCÈS ABONNEMENT` | Prototypage gratuit des prompts structurés avant intégration ; exécution déportée des traitements lourds hors du PC 8 Go RAM. | **`retenu`** |
| **S-03** | **Google Flow & Gemini Multimedia** (Google AI Pro) | Studio de création vidéo et visuelle IA | `ACCÈS ABONNEMENT` | Création de visuels et vidéos de présentation sans souscrire d'outil externe payant. | **`retenu`** |
| **S-04** | **ChatGPT Go** (Abonnement OpenAI) | Copilote d'analyse, raisonnement, recherche & contrôle | `CONFIRMÉ` (API OpenAI non incluse) | Challenger stratégique indépendant, revue documentaire, analyse de fichiers et contre-audit (`Concepteur != Auditeur`). | **`intégré`** |
| **S-05** | **Paseo + Mistral Vibe (`3.1.3` WSL2 ACP)** | Orchestrateur local multi-modèles | `CONFIRMÉ historiquement` (Modèle `zai-glm-5-3-flash-vibe-free` testé avec succès) | Coordination locale sur le poste du fondateur et continuité mobile. | **`testé` (local)** |
| **S-06** | **`SOURCES-REGLEMENTAIRES-DATEES.md`** | Référentiel juridique daté (`1lbmNzLox...`) | `VÉRIFIÉ TECHNIQUEMENT` | Liens Légifrance/URSSAF/CNIL vérifiés (CSI Livre VI Art. L.612-9, IDCC 1351 repos >= 12h conventionnel / 11h légal dérogatoire, pointage ponctuel CNIL sans tracking GPS continu). | **`intégré`** |
| **S-07** | **`STANDARD-DEV-SECURITE-RGPD.md`** | Standard d'ingénierie Zero-Trust (`1WSLZNIm2...`) | `VÉRIFIÉ TECHNIQUEMENT` | Règles absolues : séparation Code `C:\` / Cerveau `H:\`, RLS Supabase côté serveur, horodatage `clock_timestamp()`, audit SHA-256, `Concepteur != Auditeur`. | **`intégré`** |
| **S-08** | **`GUIDE-WORKFLOW-BUS-IA.md`** | Protocole de gouvernance multi-IA (`1Cg3ML_Pm...`) | `VÉRIFIÉ TECHNIQUEMENT` | Cycle `01_EN_COURS` ➔ `02_ARBITREES` ➔ `03_ARCHIVES` + registre append-only `REGISTRE-DECISIONS.md`. | **`intégré`** |

---

### D. Briques Techniques & Standards Ouverts Identifiés lors de l'Étude Mondiale OMNISECUR (Enrichissement AGIA-007)

| Réf | Brique / Standard | Type & Licence | Cas d'usage validé (Benchmark Mondial AGIA-007) | Coût | Projets concernés | Statut |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **B-01** | **Web NFC API (`NDEFReader`)** | Standard W3C (Chrome Android natif) | Lecture directe de l'UID matériel unique de tags NFC passifs (~0,30 €/tag) pour les rondes de sécurité sans bâton de ronde propriétaire, branchée sur `offline_event_id`. | **0 €** | **OMNISECUR** (Phase 2B), **Nettoyage / FM** | **`recommandé`** |
| **B-02** | **`html5-qrcode` / `BarcodeDetector`** | Librairie Apache-2.0 & Standard Web | Lecture universelle iOS + Android de points de contrôle QR Code pour rondes et pointage ponctuel. | **0 €** | **OMNISECUR** (Phase 2B), **BTP / Logistique** | **`recommandé`** |
| **B-03** | **WebRTC Live Camera Gate (`capture="environment"`)** | Standard HTML5 / WebRTC | Prise de vue photo en direct obligatoire lors des entrées de Main Courante (blocage de l'import de vieilles photos depuis la galerie téléphone, inspiré de *Silvertrac*). | **0 €** | **OMNISECUR** (Phase 2B), **Bâtiment / Immobilier** | **`recommandé`** |
| **B-04** | **PWA Offline Regulatory Wallet (`Service Worker` + `IndexedDB`)** | Standard Web PWA | Portefeuille réglementaire hors-ligne (« Mode Contrôle CNAPS / Police en 1 clic », inspiré de *Connecteam*) affichant l'Ordre de Mission L.612-9 et les titres CNAPS/SSIAP en zone blanche. | **0 €** | **OMNISECUR** (Phase 2A) | **`recommandé`** |

---

## 4. RÉPERTOIRE DES FICHES DÉTAILLÉES DE LA BIBLIOTHÈQUE

1. [`FICHE_01_REFERO_STYLES.md`](fiches/FICHE_01_REFERO_STYLES.md) — Gouvernance UI/UX permanente & *Reference Lock* (`styles.refero.design`).
2. [`FICHE_02_REA_REVERSE_ENGINEERING.md`](fiches/FICHE_02_REA_REVERSE_ENGINEERING.md) — Inspection technique assistée par agents (`morluto/rea`).
3. [`FICHE_03_AGENCY_AGENTS.md`](fiches/FICHE_03_AGENCY_AGENTS.md) — Rôles d'agents spécialisés (`msitarzewski/agency-agents`).
4. [`FICHE_04_THE_LAST_ARCHIVE_ET_COGNEE.md`](fiches/FICHE_04_THE_LAST_ARCHIVE_ET_COGNEE.md) — Moteurs RAG local et mémoire graphe (`last-archive` & `cognee`).
5. [`FICHE_05_MOTEUR_LEADS_UNIVERSEL_V2.md`](fiches/FICHE_05_MOTEUR_LEADS_UNIVERSEL_V2.md) — Moteur interne d'acquisition Open Data B2B (`api.gouv.fr`, `BOAMP`, `DECP`).
6. [`FICHE_06_ECOSYSTEME_EXECUTION_PASEO_OPENCODE_VIBE_ANTIGRAVITY.md`](fiches/FICHE_06_ECOSYSTEME_EXECUTION_PASEO_OPENCODE_VIBE_ANTIGRAVITY.md) — Socle d'orchestration multi-modèles.
7. [`FICHE_07_OUTILS_COMPLEMENTAIRES_ET_GARDES_FOUS.md`](fiches/FICHE_07_OUTILS_COMPLEMENTAIRES_ET_GARDES_FOUS.md) — Briques métiers complémentaires et ressources écartées.
8. [`FICHE_08_ENRICHISSEMENT_AGIA_007_ET_BRIQUES_OMNISECUR.md`](fiches/FICHE_08_ENRICHISSEMENT_AGIA_007_ET_BRIQUES_OMNISECUR.md) — Qualification approfondie (`Chatwoot`, `OpenSEO`, `Understand-Anything`, `REA`, `Agency Agents`) & nouvelles briques techniques `OMNISECUR` (`B-01` à `B-04`).

