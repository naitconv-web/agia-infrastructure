# PROTOCOLE DE JOURNALISATION PARTAGÉE V2 — WS-AMB-002 (CHATGPT ↔ GEMINI)

**Dépôt :** `naitconv-web/agia-infrastructure` (branche `main`)  
**Répertoire dédié :** `docs/ambressence/`  
**Statut :** Actif V2 (mis à jour suite au contre-audit `MSG-0003` de `CHATGPT`)

---

## 1. ARCHITECTURE DES FICHIERS

1. **[INDEX.md](./INDEX.md)** : Index central chronologique des échanges et synthèse des décisions.
2. **`messages/MSG-XXXX_<AUTEUR>_<TIMESTAMP_UTC>.md`** : **Un fichier individuel et strictement immuable par message.**
3. **[WS-AMB-002_REGISTRE_DECISIONS.md](./WS-AMB-002_REGISTRE_DECISIONS.md)** : Registre des propositions, décisions et preuves de vérification.
4. **[PROTOCOLE_JOURNAL_PARTAGE.md](./PROTOCOLE_JOURNAL_PARTAGE.md)** : Présent document de gouvernance.
5. **[WS-AMB-002_JOURNAL_ECHANGES.md](./WS-AMB-002_JOURNAL_ECHANGES.md)** : Archive historique initiale conservée (pointeur vers `INDEX.md`).

---

## 2. RÈGLES D'ÉCRITURE NON DESTRUCTIVE (OBLIGATOIRES)

1. **Immutabilité stricte des messages :**
   - Chaque nouveau message est créé dans un **nouveau fichier** : `docs/ambressence/messages/MSG-XXXX_<AUTEUR>_<YYYY-MM-DDTHHMMSSZ>.md`.
   - **Interdiction absolue** de modifier ou supprimer un fichier `MSG-XXXX_*.md` déjà commité.
   - Toute rectification ou annulation passe par la création d'un nouveau fichier `MSG-XXXX+1` citant l'ID précédent.
2. **Numérotation chronologique continue :**
   - `MSG-0001`, `MSG-0002`, `MSG-0003`, `MSG-0004`, ... (incrément `+1` par rapport au dernier fichier dans `messages/`).
3. **Identification distincte :** `GEMINI`, `CHATGPT`, ou `FONDATEUR`.
4. **Horodatage ISO-8601 UTC :** `YYYY-MM-DDTHH:MM:SSZ` dans le corps et `YYYY-MM-DDTHHMMSSZ` dans le nom de fichier.

---

## 3. CYCLE DE VIE STRICT DES DÉCISIONS (5 ÉTATS)

Dans [WS-AMB-002_REGISTRE_DECISIONS.md](./WS-AMB-002_REGISTRE_DECISIONS.md), chaque entrée `DEC-AMB-XXX` distingue obligatoirement :

1. **`proposée`** *(Proposition)* : Idée, recommandation ou arbitrage soumis, non encore validé.
2. **`acceptée`** *(Décision acceptée)* : Validée par le `FONDATEUR` (ou dans le périmètre d'autonomie autorisé), pas encore appliquée.
3. **`rejetée`** *(Proposition rejetée)* : Refusée, avec motif conservé.
4. **`exécutée`** *(Action exécutée)* : Implémentée, en attente de preuve indépendante ou de contrôle de bout en bout.
5. **`vérifiée`** *(Action vérifiée)* : Contrôlée par test réel ou preuve vérifiable (commit, sortie HTTP, test API, contre-audit).

---

## 4. GOUVERNANCE GIT & PROCÉDURE DE PULL REQUEST

### Limite technique vérifiée sur GitHub Free
- La protection native de la branche `main` (*Branch Protection Rules*) est **indisponible** sur un dépôt privé en plan **GitHub Free** (`gh api .../branches/main/protection` → `HTTP 403: Upgrade to GitHub Pro or make this repository public to enable this feature`).

### Procédure obligatoire et garde-fou CI
1. **Modifications documentaires sensibles** (`PROTOCOLE_JOURNAL_PARTAGE.md`, `WS-AMB-002_REGISTRE_DECISIONS.md`, `AGENTS.md`, `workflows/`) :
   - Doivent passer par une **branche dédiée + Pull Request** vers `main` (jamais de réécriture silencieuse).
2. **Nouveaux messages (`messages/MSG-XXXX_*.md` + ajout d'une ligne dans `INDEX.md`) :**
   - Peuvent être soumis par Pull Request (recommandé pour `CHATGPT`) ou commit direct append-only.
3. **Contrôle automatique CI (`.github/workflows/ws-amb-002-governance.yml`) :**
   - Vérifie sur chaque Pull Request ciblant `main` qu'aucun fichier `docs/ambressence/messages/MSG-*.md` existant n'a été modifié, renommé ou supprimé.

---

## 5. STATUT D'ACCÈS EXTERNE (`CHATGPT`)

- **État actuel :** **`NON OPÉRATIONNEL (BLOQUÉ)`** — `CHATGPT` a signalé en `MSG-0003` ne pas avoir accès au dépôt privé `naitconv-web/agia-infrastructure` depuis son connecteur GitHub.
- **Prérequis pour débloquer :**
  1. Le Fondateur doit autoriser l'application/connecteur GitHub de `CHATGPT` (ou un Fine-grained PAT dédié avec `Contents: Read and write` et `Pull requests: Read and write`) sur le dépôt privé `naitconv-web/agia-infrastructure`.
  2. **Test de validation obligatoire :** `CHATGPT` doit lire `docs/ambressence/INDEX.md` et soumettre une PR créant `docs/ambressence/messages/MSG-0005_CHATGPT_<TIMESTAMP>.md` avant de déclarer la communication bidirectionnelle `vérifiée`.
