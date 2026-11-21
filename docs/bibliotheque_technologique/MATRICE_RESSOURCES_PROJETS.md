# MATRICE DE CORRESPONDANCE RESSOURCES TECHNOLOGIQUES / PROJETS
**Référence :** SYNTESIA-TECH-LIB-MATRICE (Mission AGIA-006 — Chantier 1)  
**Date :** 21 novembre 2026  

---

## 1. CARTOGRAPHIE D'AFFECTATION PAR PROJET DU PORTEFEUILLE

Ce tableau croise les ressources qualifiées de la bibliothèque technologique avec chaque projet de l'écosystème afin d'orienter immédiatement l'orchestrateur vers la brique pertinente :

| Projet / Verticale | Conception UI/UX & Démos | Acquisition, SEO & Relation Client | Moteurs Métiers, RAG & Automatisation | Analyse, Audit, Sécurité & Conformité |
| :--- | :--- | :--- | :--- | :--- |
| **1. SYNTESIA (Agence France & Algérie)** | • **Refero Styles (`R-01`)** *(Système de design `DESIGN.md` & Reference Lock)*<br>• **Cap (`L-11`)** *(Vidéos d'audit 2 min prospects)*<br>• **HyperFrames (`L-06`)** *(Vidéos motion présentation)* | • **Moteur Leads Universel v2 (`R-05`)** *(API Gouv / BOAMP / DECP)*<br>• **OpenSEO (`L-09`)** *(Audit SEO technique vitrines & prospects)*<br>• **Chatwoot (`L-08`)** *(Inbox WhatsApp/Web client)* | • **Scripts CRM SYNTESIA** (`orchestrate_crm.py`, `generate_proposal.py`, `communication_gate.py`)<br>• **n8n (`L-04`)** *(Déploiement workflows chez clients PME)*<br>• **Agency Agents (`R-03`)** *(Rôles spécialisés)* | • **`DIRECTIVE_GLOBALE_BIENSEANCE`**<br>• **`STANDARD-DEV-SECURITE-RGPD (`S-07`)`**<br>• **Understand-Anything (`L-02`)** *(Audit code client)*<br>• **Audit KPI v2 (`audit_kpi_sync.py`)** |
| **2. OMNISECUR (LAB Niveau 2 — Sécurité Privée)** | • **Refero Styles (`R-01`)** *(Polissage interfaces B2B)*<br>• **Awesome Opus 5.5 Videos (`R-06`)** *(Prompts d'animations UI/Démos)*<br>• **Démo Phase 1 HTML certifiée** | • **Moteur Leads Universel v2 (`R-05`)** *(Profils `SECURITE_PRIVEE` NAF 80.10Z & `PRESCRIPTEURS_SECURITE`)*<br>• **Cap (`L-11`)** *(Démos asynchrones dirigeants)* | • **Socle `omnisecur v2.3.2`** *(Next.js 15, Supabase RLS, `clock_timestamp()`)*<br>• **COS Bureau IA** *(5 agents Appels d'Offres)*<br>• **The Last Archive (`R-04`)** *(Option RAG local hors-ligne)* | • **REA (`R-02`)** *(Rétro-ingénierie & benchmark concurrents mondiaux)*<br>• **`SOURCES-REGLEMENTAIRES-DATEES (`S-06`)`** *(CSI Livre VI, IDCC 1351, CNIL)* |
| **3. RELANCE-DEVIS / OMNIRENOV (LAB Niveau 2 — Bâtiment, BTP, Rénovation)** | • **Refero Styles (`R-01`)** *(Page sectorielle Bâtiment/BTP/Rénovation)*<br>• **`landing-demo-offre.html`** | • **Moteur Leads Universel v2 (`R-05`)** *(Profil `BTP_RENOVATION` + BOAMP marchés travaux)*<br>• **Pack Meta Ads 48h** *(100 % Inbound)* | • **Tableur Concierge & Relances J+3/J+7**<br>• **OpenWhispr (`L-10`)** *(Dictée vocale rapide de rapports de chantier)* | • **Gate de Bienséance (`communication_gate.py`)** *(Horaires ouvrés 8h30–19h00, max 2 relances, conformité CPCE L.34-5)* |
| **4. WORKSTATION-IA & LAB CORE (Architecture C)** | • **Refero Styles (`R-01`)** *(Cockpit de supervision)* | — *(Infrastructure interne)* | • **Antigravity (`S-01`)** + **Paseo / Mistral Vibe (`S-05`)** + **OpenCode (`L-01`)**<br>• **Cognee (`L-03`)** *(Candidat GraphRAG `MEMORY ENGINE` Phase 2)*<br>• **Agency Agents (`R-03`)** | • **ChatGPT Go (`S-04`)** *(Contre-auditeur indépendant)*<br>• **Protocole `BUS LEAN v3.0`**<br>• **`STANDARD-DEV-SECURITE-RGPD (`S-07`)`** |
| **5. AMBRESSENCE (E-commerce Parfumerie)** | • **Refero Styles (`R-01`)** *(Direction artistique luxe/éditorial)*<br>• **Google Flow (`S-03`)** & **HyperFrames (`L-06`)** *(Visuels & vidéos produits)* | • **OpenSEO (`L-09`)** *(SEO e-commerce fiches parfums)*<br>• **Chatwoot (`L-08`)** *(Support client omnicanal boutique)* | • **WooCommerce / o2switch** *(Staging existant)* | • **Isolement budgétaire `NAIT STORE`**<br>• **Protection des secrets `.env`** |
| **6. HCR (Hôtellerie, Cafés, Restauration) & Extensions AGIA-005** | • **Refero Styles (`R-01`)** *(Vitrines & démonstrateurs dédiés)* | • **Moteur Leads Universel v2 (`R-05`)** *(Extraction NAF HCR, Transport, Nettoyage, Immobilier, CGP, Architecture)*<br>• **Chatwoot (`L-08`)** *(Conciergerie WhatsApp Hôtellerie)* | • **Méthode 6 Prompts Micro-SaaS (`R-12`)** *(Cadrage MVP par verticale)*<br>• **n8n (`L-04`)** *(Rapprochement BL/Factures & alertes échéances)* | • **Conformité sectorielle AGIA-005** *(IDCC 1979, IDCC 3043 Art. 7, IDCC 0016 CNR, Décret 2015-1437 GLI, DDA/MIF 2)* |

---

## 2. ARBRE DE DÉCISION RAPIDE PAR BESOIN TECHNIQUE

1. **« Je dois concevoir ou refondre une page web / interface produit »**  
   ➔ Consulter **`FICHE_01_REFERO_STYLES.md`**, sélectionner 1 référence primaire + 1 à 2 références secondaires sur Refero, rédiger le *Reference Lock* (`DESIGN.md`), puis coder en HTML/Tailwind/CSS propre.
2. **« Je dois comprendre comment fonctionne une application concurrente ou un logiciel métier existant »**  
   ➔ Consulter **`FICHE_02_REA_REVERSE_ENGINEERING.md`** (`morluto/rea`) pour l'inspection binaire/JS/Web et **`Understand-Anything` (`L-02`)** pour le graphe d'architecture, dans le strict respect du protocole légal (`VEILLE_TECHNOLOGIQUE_OMNISECUR.md`).
3. **« Je dois définir un nouveau rôle d'agent spécialisé ou améliorer ses instructions »**  
   ➔ Consulter **`FICHE_03_AGENCY_AGENTS.md`** (`msitarzewski/agency-agents`), extraire la structure de livrables et de métriques du profil correspondant, et lui adjoindre obligatoirement la `DIRECTIVE_GLOBALE_COMPORTEMENT_ET_BIENSEANCE.md`.
4. **« Je dois constituer un fichier de prospects B2B qualifiés ou surveiller les marchés publics en France »**  
   ➔ Utiliser directement **`FICHE_05_MOTEUR_LEADS_UNIVERSEL_V2.md`** (`moteur-leads-universel-v2.mjs`) qui interroge gratuitement et légalement les APIs de l'État (`api.gouv.fr`, `BOAMP`, `DECP`).
5. **« Je dois interroger un corpus documentaire volumineux ou doter un agent d'une mémoire persistante »**  
   ➔ Consulter **`FICHE_04_THE_LAST_ARCHIVE_ET_COGNEE.md`** : privilégier **NotebookLM / Gemini** (inclus dans Google AI Pro, 0 Mo RAM locale) pour l'analyse documentaire immédiate, **Cognee (`L-03`)** pour une mémoire graphe d'agents, ou **The Last Archive (`R-04`)** uniquement sur une machine disposant d'au moins 16 Go de RAM.
