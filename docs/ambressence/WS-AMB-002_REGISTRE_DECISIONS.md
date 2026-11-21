# REGISTRE DES DÉCISIONS — WS-AMB-002 (AMBRESSENCE)

**Règle :** Aucune décision n'est supprimée.  
**Statuts autorisés (distinction stricte) :** `proposée` *(Proposition)* | `acceptée` *(Décision acceptée)* | `rejetée` *(Proposition rejetée)* | `exécutée` *(Action exécutée)* | `vérifiée` *(Action vérifiée avec preuve)*

---

## 1. TABLEAU DES DÉCISIONS & PROPOSITIONS

| ID | Horodatage création (UTC) | Auteur | Proposition / Décision | Statut | Dernière MAJ (UTC) | Preuve / Référence |
| :--- | :--- | :---: | :--- | :---: | :--- | :--- |
| **`DEC-AMB-001`** | `2026-11-21T22:53:00Z` | `FONDATEUR` | Adoption de GitHub comme espace partagé permanent entre ChatGPT et Gemini pour `WS-AMB-002` (sans déplacer le dépôt). | **`vérifiée`** | `2026-11-21T23:02:00Z` | Commits `b3df016`, `64a7a59` + architecture `docs/ambressence/` |
| **`DEC-AMB-002`** | `2026-11-21T22:53:00Z` | `GEMINI` | Rattacher `naitconv-web/AMBRESSENCE` aux ressources Antigravity via l'app GitHub pour auditer le code source historique. | **`proposée`** | `2026-11-21T22:53:00Z` | `MSG-0001` §3 (`Resource not accessible by integration`) |
| **`DEC-AMB-003`** | `2026-11-21T22:53:00Z` | `GEMINI` | Purger et effectuer la rotation des fichiers d'identifiants en clair dans `Drive/PROJETS/AMBRESSENCE/infra/`. | **`proposée`** | `2026-11-21T22:53:00Z` | `MSG-0001` §5 (Risque #1) |
| **`DEC-AMB-004`** | `2026-11-21T22:53:00Z` | `GEMINI` | Verrouiller l'accès public à `https://ambressence.com/staging/` (`HTTP 200` sans authentification). | **`proposée`** | `2026-11-21T22:53:00Z` | `MSG-0001` §5 (Risque #4) |
| **`DEC-AMB-005`** | `2026-11-21T22:53:00Z` | `GEMINI` | Valider la règle d'arrondi tarifaire **Option B** (`+1 289,43 €`) et confirmer si les prix fournisseur BTS sont HT ou TTC. | **`proposée`** | `2026-11-21T22:53:00Z` | `MSG-0001` §5 (`PROPOSITION-ARRONDI-PRIX.md`) |
| **`DEC-AMB-006`** | `2026-11-21T22:53:00Z` | `GEMINI` | Débloquer Stripe `acct_1UbnwCHR0qKCRDne` (KYC), corriger le descripteur (`ATLAS RELANCE DEVIS` → `AMBRESSENCE`) et réparer le webhook live. | **`proposée`** | `2026-11-21T22:53:00Z` | `MSG-0001` §4.B & §5 (`GO-LIVE-RUNBOOK-2026-11-17.md`) |
| **`DEC-AMB-007`** | `2026-11-21T22:53:00Z` | `GEMINI` | Lancer l'audit complet en lecture seule des ~2 705 produits live (Store API) + inspection des fichiers PHP archivés dans `Drive/infra/wordpress/`. | **`proposée`** | `2026-11-21T22:53:00Z` | `MSG-0001` §7 |
| **`DEC-AMB-008`** | `2026-11-21T22:59:17Z` | `CHATGPT` | Accorder au connecteur GitHub de ChatGPT l'accès au dépôt privé `naitconv-web/agia-infrastructure` (`Contents: Read/Write`, `PR: Read/Write`) et exécuter un test bidirectionnel réel (`MSG-0005`). | **`proposée`** | `2026-11-21T23:02:00Z` | `MSG-0003` & `MSG-0004` §3 (blocage confirmé) |
| **`DEC-AMB-009`** | `2026-11-21T22:59:17Z` | `CHATGPT` | Mettre en place une journalisation non destructive par fichier individuel immuable (`docs/ambressence/messages/MSG-XXXX_*.md`). | **`vérifiée`** | `2026-11-21T23:02:00Z` | `MSG-0001` à `MSG-0004` créés individuellement |
| **`DEC-AMB-010`** | `2026-11-21T22:59:17Z` | `CHATGPT` | Créer un index central chronologique des échanges et décisions (`docs/ambressence/INDEX.md`). | **`vérifiée`** | `2026-11-21T23:02:00Z` | `docs/ambressence/INDEX.md` |
| **`DEC-AMB-011`** | `2026-11-21T22:59:17Z` | `CHATGPT` | Renforcer la gouvernance Git (protection de `main` + procédure PR pour documents sensibles + contrôle CI d'immutabilité). | **`exécutée`** | `2026-11-21T23:02:00Z` | `PROTOCOLE_JOURNAL_PARTAGE.md` §4 + `.github/workflows/ws-amb-002-governance.yml` *(protection native `main` bloquée par GitHub Free `HTTP 403`)* |

---

## 2. HISTORIQUE DES TRANSITIONS (APPEND-ONLY)

- `2026-11-21T22:56:00Z` | `GEMINI` | `DEC-AMB-001` : `acceptée` → `exécutée` (commit `64a7a59`).
- `2026-11-21T23:02:00Z` | `GEMINI` | `DEC-AMB-001` : `exécutée` → `vérifiée`.
- `2026-11-21T23:02:00Z` | `GEMINI` | `DEC-AMB-009` : `acceptée` → `vérifiée` (fichiers immuables `MSG-0001` à `MSG-0004`).
- `2026-11-21T23:02:00Z` | `GEMINI` | `DEC-AMB-010` : `acceptée` → `vérifiée` (`INDEX.md` créé).
- `2026-11-21T23:02:00Z` | `GEMINI` | `DEC-AMB-011` : `acceptée` → `exécutée` (procédure PR + workflow CI créés ; protection native `main` impossible sur plan GitHub Free).
