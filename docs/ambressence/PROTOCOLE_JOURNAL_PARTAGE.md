# PROTOCOLE DE JOURNALISATION PARTAGÉE — WS-AMB-002 (CHATGPT ↔ GEMINI)

**Dépôt :** `naitconv-web/agia-infrastructure` (branche `main`)  
**Répertoire dédié :** `docs/ambressence/`  
**Statut :** Actif (validé par le fondateur le 21/11/2026)

---

## 1. FICHIERS DU SYSTÈME DE JOURNALISATION

1. **[WS-AMB-002_JOURNAL_ECHANGES.md](file:///home/antigravity/naitconv-web/agia-infrastructure/docs/ambressence/WS-AMB-002_JOURNAL_ECHANGES.md)** : Fil chronologique **append-only** (non destructif) des échanges entre `GEMINI`, `CHATGPT` et le `FONDATEUR`.
2. **[WS-AMB-002_REGISTRE_DECISIONS.md](file:///home/antigravity/naitconv-web/agia-infrastructure/docs/ambressence/WS-AMB-002_REGISTRE_DECISIONS.md)** : Registre structuré de toutes les propositions et décisions, avec suivi de statut obligatoire.
3. **[PROTOCOLE_JOURNAL_PARTAGE.md](file:///home/antigravity/naitconv-web/agia-infrastructure/docs/ambressence/PROTOCOLE_JOURNAL_PARTAGE.md)** : Présent document de référence.

---

## 2. RÈGLES D'ÉCRITURE NON DESTRUCTIVE (OBLIGATOIRES)

1. **Historique strictement non destructif (`append-only`) :**
   - Aucun agent (`CHATGPT` ou `GEMINI`) n'a le droit de supprimer, écraser ou modifier le contenu d'une entrée déjà publiée (`MSG-XXXX`).
   - Toute correction, précision ou annulation doit faire l'objet d'une **nouvelle entrée** référençant explicitement l'ID concerné (ex. `Annule et remplace MSG-0004`).
2. **Numérotation chronologique continue :**
   - Format : `MSG-0001`, `MSG-0002`, `MSG-0003`, ... (incrément de `+1` par rapport à la dernière entrée présente dans le fichier).
3. **Identification distincte de l'auteur :**
   - Valeurs autorisées : `[GEMINI]`, `[CHATGPT]`, `[FONDATEUR]`.
4. **Horodatage obligatoire :**
   - Format ISO-8601 UTC : `YYYY-MM-DDTHH:MM:SSZ` (ex. `2026-11-21T22:55:00Z`).
5. **Cycle de vie des propositions (`WS-AMB-002_REGISTRE_DECISIONS.md`) :**
   - Chaque proposition porte un identifiant unique `DEC-AMB-XXX`.
   - Statuts autorisés uniquement :
     - `proposée` — Émise par `GEMINI` ou `CHATGPT`, en attente d'arbitrage.
     - `acceptée` — Validée explicitement par le `FONDATEUR` (ou `CHATGPT` si délégation explicite).
     - `rejetée` — Refusée (avec motif conservé).
     - `exécutée` — Implémentée et vérifiée avec preuve (commit, URL, test).
   - *Règle de traçabilité :* Lorsqu'une décision change de statut, la ligne du tableau est mise à jour sur la colonne `Statut` + `Date MAJ` + `Preuve`, et une entrée d'historique est ajoutée dans la section `Historique des transitions` en bas du registre (sans jamais effacer l'historique).

---

## 3. GABARIT D'UNE ENTRÉE DANS `WS-AMB-002_JOURNAL_ECHANGES.md`

```markdown
---

## MSG-XXXX — [CHATGPT | GEMINI | FONDATEUR] — YYYY-MM-DDTHH:MM:SSZ

**Objet :** Résumé court de l'intervention  
**Référence décision(s) :** DEC-AMB-XXX (si applicable)

Contenu factuel, preuves, résultats ou directives...
```

---

## 4. VÉRIFICATION DES PERMISSIONS GITHUB & INTÉGRATION EXTERNE (CHATGPT)

### État technique vérifié sur `naitconv-web/agia-infrastructure` (21/11/2026)
- **Visibilité :** Dépôt privé (`"private": true`).
- **Branche par défaut :** `main`.
- **Protection de branche :** Aucune règle de protection bloquante active sur `main` (vérifié via `gh api repos/naitconv-web/agia-infrastructure/branches/main/protection` → `HTTP 403` Plan Free / pas de blocage PR obligatoire).
- **Méthode d'accès recommandée pour ChatGPT :**
  1. **Via GitHub App / Connecteur ChatGPT ou Fine-grained Personal Access Token (PAT) :**
     - Scope dépôt : `naitconv-web/agia-infrastructure` uniquement (principe du moindre privilège).
     - Permissions requises :
       - `Contents` : **Read and write** (indispensable pour lire le `sha` du fichier et committer les nouvelles entrées via l'API `PUT /repos/naitconv-web/agia-infrastructure/contents/docs/ambressence/...`).
       - `Metadata` : **Read-only** (automatique).
       - `Pull requests` : **Read and write** (optionnel, si ChatGPT passe par des branches/PR au lieu de committer sur `main`).
  2. **Endpoints REST GitHub utilisables par une intégration externe :**
     - Lecture : `GET https://api.github.com/repos/naitconv-web/agia-infrastructure/contents/docs/ambressence/WS-AMB-002_JOURNAL_ECHANGES.md?ref=main`
     - Écriture : `PUT https://api.github.com/repos/naitconv-web/agia-infrastructure/contents/docs/ambressence/WS-AMB-002_JOURNAL_ECHANGES.md` (en fournissant le `sha` récupéré à la lecture, le `content` encodé en Base64 et un `message` de commit explicite).
     - *Anti-conflit :* Toujours relire le fichier (`GET`) juste avant d'écrire (`PUT`) pour obtenir le dernier `sha` et le dernier numéro `MSG-XXXX`.
