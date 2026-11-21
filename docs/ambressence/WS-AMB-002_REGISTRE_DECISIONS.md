# REGISTRE DES DÉCISIONS — WS-AMB-002 (AMBRESSENCE)

**Règle :** Aucune décision n'est supprimée. Statuts autorisés : `proposée` | `acceptée` | `rejetée` | `exécutée`.

---

## 1. TABLEAU DES DÉCISIONS & PROPOSITIONS

| ID | Horodatage création (UTC) | Auteur | Proposition / Décision | Statut | Dernière MAJ (UTC) | Preuve / Référence |
| :--- | :--- | :---: | :--- | :---: | :--- | :--- |
| **`DEC-AMB-001`** | `2026-11-21T22:53:00Z` | `FONDATEUR` | Adoption de GitHub comme espace partagé permanent entre ChatGPT et Gemini pour `WS-AMB-002`, avec journalisation non destructive (`CHATGPT` / `GEMINI`) et registre des décisions. | **`exécutée`** | `2026-11-21T22:56:00Z` | `PROTOCOLE_JOURNAL_PARTAGE.md`, `WS-AMB-002_JOURNAL_ECHANGES.md`, `WS-AMB-002_REGISTRE_DECISIONS.md` |
| **`DEC-AMB-002`** | `2026-11-21T22:53:00Z` | `GEMINI` | Rattacher le dépôt `naitconv-web/AMBRESSENCE` (et `ambressence.com` si besoin) aux ressources Antigravity via l'app GitHub pour débloquer l'audit du code source historique. | **`proposée`** | `2026-11-21T22:53:00Z` | `MSG-0001` §3 (`Resource not accessible by integration`) |
| **`DEC-AMB-003`** | `2026-11-21T22:53:00Z` | `GEMINI` | Purger et effectuer la rotation des fichiers d'identifiants en clair présents dans `Drive/PROJETS/AMBRESSENCE/infra/` (`.env`, `.staging-admin-password`, `.staging-db-password`, `.wp-app-password`, `ssh-*.txt`). | **`proposée`** | `2026-11-21T22:53:00Z` | `MSG-0001` §5 (Risque #1) |
| **`DEC-AMB-004`** | `2026-11-21T22:53:00Z` | `GEMINI` | Verrouiller l'accès public à `https://ambressence.com/staging/` (actuellement en `HTTP 200` sans authentification). | **`proposée`** | `2026-11-21T22:53:00Z` | `MSG-0001` §5 (Risque #4) |
| **`DEC-AMB-005`** | `2026-11-21T22:53:00Z` | `GEMINI` | Valider la règle d'arrondi tarifaire **Option B** (euro supérieur, `+1 289,43 €` cumulé) et confirmer si les prix fournisseur BTSWholesaler sont HT ou TTC. | **`proposée`** | `2026-11-21T22:53:00Z` | `MSG-0001` §5 & §9 (`PROPOSITION-ARRONDI-PRIX.md`) |
| **`DEC-AMB-006`** | `2026-11-21T22:53:00Z` | `GEMINI` | Débloquer le compte Stripe `acct_1UbnwCHR0qKCRDne` (KYC `company.verification.document`), corriger le descripteur relevé (`ATLAS RELANCE DEVIS` → `AMBRESSENCE`) et réparer le secret webhook live. | **`proposée`** | `2026-11-21T22:53:00Z` | `MSG-0001` §4.B & §5 (`GO-LIVE-RUNBOOK-2026-11-17.md`) |
| **`DEC-AMB-007`** | `2026-11-21T22:53:00Z` | `GEMINI` | Lancer l'audit complet en lecture seule des ~2 705 produits live via Store API publique + inspection des fichiers PHP archivés dans `Drive/infra/wordpress/`. | **`proposée`** | `2026-11-21T22:53:00Z` | `MSG-0001` §7 |

---

## 2. HISTORIQUE DES TRANSITIONS (APPEND-ONLY)

- `2026-11-21T22:56:00Z` | `GEMINI` | `DEC-AMB-001` : `acceptée` → `exécutée` (architecture de journalisation créée et poussée sur `main`).
