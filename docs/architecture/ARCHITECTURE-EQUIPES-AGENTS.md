# ARCHITECTURE STANDARD DES ÉQUIPES D'AGENTS — `WORKSTATION-IA`

**Référence :** `WS-ARCH-AGENTS-001` (Version révisée — Décision PDG du `2026-11-23`)  
**Statut :** **`PROPOSED` (Architecture documentaire validée pour intégration GitHub — Zéro installation / Zéro dépense)**  
**Périmètre :** `WORKSTATION-IA` (fondation commune) · Pilote **AMBRESSENCE** · Réutilisable **SYNTESIA**, **OMNISECUR**, **RELANCE-DEVIS**  
**Complémentarité :** Complète [SPECIFICATIONS_MULTI_AGENTS.md](file:///home/antigravity/naitconv-web/agia-infrastructure/agents/prompts/SPECIFICATIONS_MULTI_AGENTS.md) *(rôles génériques SYNTESIA)* sans le remplacer ni créer d'orchestrateur concurrent.

---

## 1. PRÉSERVATION STRICTE DE L'EXISTANT

Aucun composant opérationnel de `WORKSTATION-IA` n'est reconstruit ou remplacé :

| Couche | Outil / Référentiel conservé | Rôle exact |
| :--- | :--- | :--- |
| **Orchestration générale** | **Paseo** *(+ Mistral Vibe / OpenCode en local)* | Coordination globale multi-projets du fondateur sur le poste local et continuité mobile. |
| **Atelier de développement** | **Antigravity** *(VM Cloud / Sandbox)* | Ingénierie multi-fichiers, tests automatisés, GitHub, Google Drive, synchronisation officielle `GitHub → Drive`. |
| **Mémoire & Protocole** | **`BUS LEAN v3.0`** & **`harness_ctl.py`** | `AGENTS.md`, `preflight`, `PREFLIGHT-FACTS.md`, `SHARD-*.md`, `checkpoint`, `sync-drive`, filtre `redact_secrets_and_pii`. |
| **Gouvernance & Registres** | **Registres centraux (`DEC-08`)** | `TABLEAU_DE_BORD_DG.md`, `REGISTRE-DECISIONS.md`, `REGISTRE-BUDGETS-DEPENSES.md`, `REGISTRE_MEMOIRE.md`, fiches missions. |
| **Contrôle indépendant** | **`Concepteur ≠ Auditeur`** | Sous-agent en lecture seule (`research`) ou auditeur externe sur pack anonymisé (`GO<X>-PACK.zip`). |

---

## 2. MODÈLE STANDARD D'UNE ÉQUIPE PROJET (`3 à 5 AGENTS OPÉRATIONNELS`)

Chaque projet constitue une **équipe isolée** de **3 à 5 agents opérationnels** maximum par mission active, pilotée par un **Chef d'équipe** unique (le « DG IA » du projet) sous la coordination globale de **Paseo**.

```
                      [ DIRECTEUR GÉNÉRAL (PDG) ]
                                  │ (Décisions OUI/NON, Budgets, Go-Live)
                      [ PASEO — Orchestrateur Global ]
                                  │
           ┌──────────────────────┼──────────────────────┐
           ▼                      ▼                      ▼
  [ CHEF D'ÉQUIPE PROJET ]  [ CONTEXTE PARTAGÉ ]  [ AUDITEUR INDÉPENDANT ]
  (Interlocuteur unique)    (PREFLIGHT + SHARDS)   (Lecture seule, ≠ Concepteur)
           │
           ├──► Agent Spécialisé 1 (ex. Produit / Offre)
           ├──► Agent Spécialisé 2 (ex. Tech / Data)
           ├──► Agent Spécialisé 3 (ex. Acquisition / CRO)
           └──► Agent Spécialisé 4 (ex. Finance / Légal / SAV)
```

### Règles de fonctionnement obligatoires
1. **Chef d'équipe unique par projet :** Traduit la demande du PDG en sous-tâches, assigne les Shards, consolide les rendus et présente une synthèse unique au PDG. Il ne gère **que son projet**.
2. **Transmissions structurées (`BUS LEAN v3.0`) :**
   - `BRIEF` / `MISSION.md` (demande, contraintes, budget) → `HANDOFF` (fichier/objet structuré indiquant rôle, entrées lues, livrable attendu, hors-périmètre) → `RENDU-[AGENT].md` → `SYNTHESE.md`.
3. **Contexte partagé sans redondance :** Chaque agent démarre avec le `PREFLIGHT-FACTS.md` du projet et **uniquement** le `SHARD-*.md` de son domaine.
4. **Points de contrôle (`Gates`) :**
   - *Gate 1 (Préflight) :* Vérification des faits et absence de contradiction avant action.
   - *Gate 2 (Exécution) :* Boucle `PLAN → EXECUTE → TEST → VERIFY → REPORT` (aucun brouillon publié sans accord PDG).
   - *Gate 3 (Audit indépendant) :* Vérification lecture seule par un agent qui n'a pas produit le livrable (`Concepteur ≠ Auditeur`).
   - *Gate 4 (Clôture) :* `checkpoint` + `sync-drive` vers Google Drive.

---

## 3. PROJET PILOTE : `AMBRESSENCE` & LES 10 GEMS EXISTANTS

### 3.1. Inventaire vérifié des 10 Gems Google AI Studio
Les instructions originales ont été retrouvées intactes dans Google Drive (`PROJETS/AMBRESSENCE/gems-et-architecture-ai/gems/`, dossier ID `1tzrSg-pbI_4L5hh_2g3mCglAz9D0nai6`) accompagnées du bloc commun (`05-consignes-communes-gems.md`), du canevas (`08-canevas-configuration-gems.md`) et du banc de test (`11-mode-operatoire-ai-studio.md`).

Pour respecter le plafond de **3 à 5 agents opérationnels** par mission sans supprimer ni dupliquer les **10 Gems**, ils sont organisés en **4 pôles fonctionnels** (on n'active que les 1 à 4 pôles utiles à la mission en cours) :

| Pôle fonctionnel | Gems rattachés (fichiers Drive originaux) | Responsabilité principale |
| :--- | :--- | :--- |
| **Pôle 1 — Offre, Catalogue & Contenu** | • `1-redacteur-ambressence.md` *(Rédacteur éditorial)*<br>• `8-catalogue.md` *(Contrôleur Catalogue & Stock)*<br>• `10-parfumeur.md` *(Maître Parfumeur & Copywriter SEO)* | Identité de marque, fiches parfums vérifiées (sans invention de notes/pyramide), gestion du catalogue et des stocks. |
| **Pôle 2 — Croissance, UX & Clients** | • `2-acquisition.md` *(Stratège Acquisition & Trafic)*<br>• `7-cro-ux.md` *(Expert Conversion & UX)*<br>• `4-sav.md` *(Responsable Expérience Client)* | Acquisition organique/payante, conversion/UX conforme charte, réponses SAV factuelles (délais, retours 14 j). |
| **Pôle 3 — Économie, Veille & Marges** | • `3-pricing.md` *(Architecte Funnel & Pricing — en attente arbitrage)*<br>• `5-veilleur.md` *(Veilleur Concurrentiel)*<br>• `6-finance.md` *(Directeur Financier)* | Calcul de marge nette (TVA 20 %, coût BTS, seuil 60 € port offert), veille prix marché, garde-fou rentabilité. |
| **Pôle 4 — Technique & Sécurité** | • `9-cto.md` *(Architecte Technique & Automatisation)* | Scripts WooCommerce/o2switch, `dry-run`, sécurité, zéro exécution prétendue sans preuve. |

### 3.2. Analyse réaliste de réutilisation hors Google AI Studio
- **Constat technique vérifié :** Les Gems configurés dans l'interface grand public **Gemini App / Google AI Studio** ne disposent pas d'un connecteur API automatique direct depuis Paseo ou Antigravity sans clé API et export manuel.
- **Ce qui est immédiatement réutilisable (sans API supplémentaire) :**
  1. Le texte source de chaque Gem (`DEBUT` → `FIN` dans les fichiers `.md` sur Drive) + le bloc commun `05-consignes-communes-gems.md` constituent la **source de vérité portable**.
  2. Ces instructions peuvent être injectées à l'identique comme **`System Instructions`** dans : (a) AI Studio en mode *Chat*, (b) des **Agent Skills** (`SKILL.md`) lus par Antigravity, Paseo/OpenCode ou Claude Code, (c) des prompts de test dans **Promptfoo**.
- **Point d'attention critique relevé :** `05-consignes-communes-gems.md` (du `07/11/2026`) mentionne encore *« 100 références publiées »*, alors que le catalogue live vérifié le `22/11/2026` (`WS-AMB-002`) compte **`2 552` parfums publiés** (`153` en réserve). Avant toute nouvelle session des Gems, le cadrage commun doit être alimenté par une source unique à jour (`AMBRESSENCE BRAIN`).

---

## 4. PROPOSITION D'ADOPTION PROGRESSIVE DES STANDARDS OUVERTS (`0 €`)

*(Étude uniquement — aucune installation ni dépense engagée à ce stade.)*

| Standard | Rôle dans `WORKSTATION-IA` | Compatibilité avec l'existant | Étape d'adoption proposée (si validée par PDG) |
| :--- | :--- | :--- | :--- |
| **Agent Skills** (`agentskills.io`) | Encapsuler chaque rôle métier (ex. les 10 Gems AMBRESSENCE, `PREFLIGHT`, audit) dans un dossier `SKILL.md` standardisé. | **100 % compatible** avec Antigravity, Claude Code, OpenCode/Paseo, Gemini CLI. Zéro serveur. | **Phase 1 :** Exporter les instructions des 10 Gems + consignes communes en `SKILL.md` versionnés (en lecture seule depuis les sources Drive). |
| **MCP** *(Model Context Protocol)* | Connecter standardement les agents aux données réelles (GitHub, Drive, WooCommerce AMBRESSENCE, Postgres OMNISECUR) en lecture/écriture contrôlée. | **100 % compatible** avec les serveurs MCP officiels open source (`0 €` licence). Remplace les scripts connecteurs jetables. | **Phase 2 :** Déployer d'abord des serveurs MCP **en lecture seule** pour alimenter le contexte partagé des agents. |
| **Promptfoo** (`MIT`) | Tester automatiquement en CI GitHub Actions la fiabilité et la sécurité des Gems/Skills (zéro invention, respect des marges, anti-injection). | **100 % compatible** avec les cas `TEST + ATTENDU` déjà écrits dans `06-revue-gems-et-tests.md` ! | **Phase 1/2 :** Convertir les 10 tests existants des Gems en suite YAML `Promptfoo` exécutable gratuitement en local/CI. |

---

## 5. MODÈLE DE CONFIGURATION D'ÉQUIPE RÉUTILISABLE (MULTI-PROJETS)

Aucun modèle déclaratif de constitution d'équipe par projet n'existait dans `agia-infrastructure`. Voici le gabarit standard léger (compatible `AMBRESSENCE`, `SYNTESIA`, `OMNISECUR`, `RELANCE-DEVIS`) :

```yaml
# Modèle standard d'équipe projet — WORKSTATION-IA (WS-ARCH-AGENTS-001)
project_id: "AMBRESSENCE" # ou SYNTESIA | OMNISECUR | RELANCE-DEVIS
orchestrator_global: "Paseo"
dev_workspace: "Antigravity"
governance_ref: "AGENTS.md + BUS_LEAN_v3.0"
budget_regime: "F1_ZERO_SPEND" # 0,00 EUR sans validation PDG

team:
  max_active_agents: 5 # Plafond opérationnel par mission (3 à 5)
  team_lead:
    role: "Chef_Equipe_Projet"
    scope: "Uniquement project_id ; consolide les rendus et soumet au PDG"
  auditor:
    role: "Auditeur_Independant"
    rule: "Concepteur != Auditeur"
    permissions: "READ_ONLY"
  specialists:
    - id: "pole_offre_catalogue"
      skills_source: "gems/1,8,10 + 05-consignes-communes"
      shard: "SHARD-OFFRE-CATALOGUE.md"
      permissions: ["READ_BRAIN", "DRAFT_ONLY"]
    - id: "pole_croissance_client"
      skills_source: "gems/2,4,7 + 05-consignes-communes"
      shard: "SHARD-GTM-UX-SAV.md"
      permissions: ["READ_BRAIN", "DRAFT_ONLY"]
    - id: "pole_economie_finance"
      skills_source: "gems/3,5,6 + 05-consignes-communes"
      shard: "SHARD-PRICING-FINANCE.md"
      permissions: ["READ_BRAIN", "READ_COSTS", "DRAFT_ONLY"]
    - id: "pole_tech_securite"
      skills_source: "gems/9 + STANDARD-DEV-SECURITE-RGPD"
      shard: "SHARD-TECH-INFRA.md"
      permissions: ["READ_REPO", "DRY_RUN", "PR_WITH_APPROVAL"]
```

### Isolation inter-projets
- **SYNTESIA :** Réutilise les 5 rôles de `SPECIFICATIONS_MULTI_AGENTS.md` + `SHARD-01` à `SHARD-05`.
- **OMNISECUR :** Utilise ses propres Shards (`SHARD-CODE-WEB`, `SHARD-CRM-BACKEND`, `SHARD-DATA-MOTEUR`, `SHARD-LEGAL-RGPD`, `SHARD-GTM-AGENDA`) et son dépôt isolé.
- **RELANCE-DEVIS :** Équipe réduite à 3 rôles (Acquisition Inbound, Tunnel/CRM, Contrôle Finance/RGPD).
- **Règle absolue :** Aucun projet ne lit les données clients, tarifs ou secrets d'un autre projet.
