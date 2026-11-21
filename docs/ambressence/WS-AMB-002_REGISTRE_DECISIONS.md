# REGISTRE DES DÉCISIONS — WS-AMB-002 (AMBRESSENCE)

**Règle :** Aucune décision n'est supprimée.  
**Statuts autorisés (distinction stricte) :** `proposée` *(Proposition)* | `acceptée` *(Décision acceptée)* | `rejetée` *(Proposition rejetée)* | `exécutée` *(Action exécutée)* | `vérifiée` *(Action vérifiée avec preuve)*

---

## 1. TABLEAU DES DÉCISIONS & PROPOSITIONS

| ID | Horodatage création (UTC) | Auteur | Proposition / Décision | Statut | Dernière MAJ (UTC) | Preuve / Référence |
| :--- | :--- | :---: | :--- | :---: | :--- | :--- |
| **`DEC-AMB-001`** | `2026-11-21T22:53:00Z` | `FONDATEUR` | Adoption de GitHub comme espace partagé permanent entre ChatGPT et Gemini pour `WS-AMB-002` (sans déplacer le dépôt). | **`vérifiée`** | `2026-11-21T23:02:00Z` | Commits `b3df016`, `64a7a59` + architecture `docs/ambressence/` |
| **`DEC-AMB-002`** | `2026-11-21T22:53:00Z` | `GEMINI` | Rattacher `naitconv-web/AMBRESSENCE` aux ressources Antigravity via l'app GitHub pour auditer le code source historique. | **`proposée`** | `2026-11-21T22:53:00Z` | `MSG-0001` §3 (`Resource not accessible by integration`) |
| **`DEC-AMB-003`** | `2026-11-21T22:53:00Z` | `GEMINI` | Purger et effectuer la rotation des fichiers d'identifiants en clair dans `Drive/PROJETS/AMBRESSENCE/infra/`. | **`rejetée`** | `2026-11-21T23:23:00Z` | Refus explicite du Fondateur (`NON` le 21/11/2026) |
| **`DEC-AMB-004`** | `2026-11-21T22:53:00Z` | `GEMINI` | Verrouiller l'accès public à `https://ambressence.com/staging/` (`HTTP 200` sans authentification). | **`rejetée`** | `2026-11-21T23:23:00Z` | Refus explicite du Fondateur (`NON` le 21/11/2026) |
| **`DEC-AMB-005`** | `2026-11-21T22:53:00Z` | `GEMINI` | Prix d'achat BTS confirmé **TTC** (micro-entreprise en attente SASU) + adoption **Option B d'arrondi** + seuil plancher **`< 12,00 €`**. | **`acceptée`** | `2026-11-21T23:23:00Z` | Arbitrage Fondateur + `scripts/ambressence/clean_catalogue.py` |
| **`DEC-AMB-006`** | `2026-11-21T22:53:00Z` | `GEMINI` | Débloquer Stripe `acct_1UbnwCHR0qKCRDne` (KYC), corriger le descripteur (`ATLAS RELANCE DEVIS` → `AMBRESSENCE`), réparer le webhook live + Kbis. | **`acceptée`** | `2026-11-21T23:23:00Z` | Validation Fondateur (`YES` le 21/11/2026 — actions hors VM) |
| **`DEC-AMB-007`** | `2026-11-21T22:53:00Z` | `GEMINI` | Lancer l'audit complet en lecture seule des ~2 705 produits live (Store API) + inspection des fichiers PHP archivés dans `Drive/infra/wordpress/`. | **`vérifiée`** | `2026-11-21T23:14:00Z` | `WS-AMB-002_AUDIT_CATALOGUE_LIVE.md` + `WS-AMB-002_PLAN_REDRESSEMENT_COMMERCIAL.md` (`90abef4`) |
| **`DEC-AMB-008`** | `2026-11-21T22:59:17Z` | `CHATGPT` | Accorder au connecteur GitHub de ChatGPT l'accès au dépôt privé `naitconv-web/agia-infrastructure`. | **`rejetée`** | `2026-11-21T23:19:00Z` | Abandonné par le Fondateur (*« Laisse tomber. Continuons à travailler sur AMBRESSENCE. »*) |
| **`DEC-AMB-009`** | `2026-11-21T22:59:17Z` | `CHATGPT` | Mettre en place une journalisation non destructive par fichier individuel immuable (`docs/ambressence/messages/MSG-XXXX_*.md`). | **`vérifiée`** | `2026-11-21T23:02:00Z` | `MSG-0001` à `MSG-0005` créés individuellement |
| **`DEC-AMB-010`** | `2026-11-21T22:59:17Z` | `CHATGPT` | Créer un index central chronologique des échanges et décisions (`docs/ambressence/INDEX.md`). | **`vérifiée`** | `2026-11-21T23:02:00Z` | `docs/ambressence/INDEX.md` |
| **`DEC-AMB-011`** | `2026-11-21T22:59:17Z` | `CHATGPT` | Renforcer la gouvernance Git (procédure PR pour documents sensibles + contrôle CI d'immutabilité). | **`vérifiée`** | `2026-11-21T23:09:00Z` | PR `#1` + CI Run `44960310415` (`success`) |
| **`DEC-AMB-012`** | `2026-11-21T23:23:00Z` | `FONDATEUR` | Mettre en brouillon les `2` tests `Dior Sauvage` (`ID 12, 13`), les `43` produits sans image, les produits `< 12 €` / non-parfums ; traduire les `101` titres ES et générer les descriptions FR. | **`exécutée`** *(dry-run)* | `2026-11-21T23:24:00Z` | `scripts/ambressence/clean_catalogue.py` + `preview_lot2_lot3.csv` *(application live via `--apply` en attente d'autorisation)* |

---

## 2. HISTORIQUE DES TRANSITIONS (APPEND-ONLY)

- `2026-11-21T22:56:00Z` | `GEMINI` | `DEC-AMB-001` : `acceptée` → `exécutée` (commit `64a7a59`).
- `2026-11-21T23:02:00Z` | `GEMINI` | `DEC-AMB-001` : `exécutée` → `vérifiée`.
- `2026-11-21T23:02:00Z` | `GEMINI` | `DEC-AMB-009` : `acceptée` → `vérifiée`.
- `2026-11-21T23:02:00Z` | `GEMINI` | `DEC-AMB-010` : `acceptée` → `vérifiée`.
- `2026-11-21T23:09:00Z` | `GEMINI` | `DEC-AMB-011` : `exécutée` → `vérifiée` (PR `#1` mergée, CI `success`).
- `2026-11-21T23:14:00Z` | `GEMINI` | `DEC-AMB-007` : `proposée` → `vérifiée` (`90abef4`).
- `2026-11-21T23:19:00Z` | `FONDATEUR` | `DEC-AMB-008` : `proposée` → `rejetée` (poursuite directe sur AMBRESSENCE).
- `2026-11-21T23:23:00Z` | `FONDATEUR` | `DEC-AMB-003`, `DEC-AMB-004` : `proposée` → `rejetée` (`NON`).
- `2026-11-21T23:23:00Z` | `FONDATEUR` | `DEC-AMB-005`, `DEC-AMB-006` : `proposée` → `acceptée`.
- `2026-11-21T23:24:00Z` | `GEMINI` | `DEC-AMB-012` : `acceptée` → `exécutée` (en `--dry-run`, prêt pour `--apply`).
