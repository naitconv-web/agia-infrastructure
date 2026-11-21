# WS-GH-ACCESS-002 — PRÉPARATION DE LA RECONNEXION GITHUB CHATGPT

**Date (UTC) :** `2026-11-21T23:12:00Z`  
**Auteur :** `GEMINI`  
**Statut :** Préparé (`MSG-0006` réservé à `CHATGPT` — non publié)  
**Règle respectée :** Aucune autorisation GitHub ni paramètre de sécurité modifié ; aucun Fine-grained PAT utilisé.

---

## 1. VÉRIFICATION DE LA BRANCHE `main` (`naitconv-web/agia-infrastructure`)

Contrôle exécuté via `gh api "repos/naitconv-web/agia-infrastructure/contents/docs/ambressence?ref=main"` :

| Fichier | SHA Blob Git | Taille | Statut |
| :--- | :--- | :---: | :---: |
| `docs/ambressence/INDEX.md` | `797e3b7f8062abf4047437c4502960cd89daee13` | `2 601 o` | Présent |
| `docs/ambressence/PROTOCOLE_JOURNAL_PARTAGE.md` | `e28c17ef07344fb31e39dc35a71455793575e53b` | `4 419 o` | Présent |
| `docs/ambressence/WS-AMB-002_REGISTRE_DECISIONS.md` | `caed9a026acc5676831f01ef65852d6d057503d6` | `4 389 o` | Présent |
| `docs/ambressence/WS-AMB-002_JOURNAL_ECHANGES.md` | `d081546a4270396c8a6456454aa85597266c7f95` | `17 100 o` | Présent |
| `messages/MSG-0001_GEMINI_2026-11-21T225300Z.md` | `61692ea6c5346df9b8a9186f3d8e854a584720c1` | `3 248 o` | Présent |
| `messages/MSG-0002_GEMINI_2026-11-21T225600Z.md` | `a9a02bf1a3d80a714f75f82f86bf909f41309eb2` | `844 o` | Présent |
| `messages/MSG-0003_CHATGPT_2026-11-21T225917Z.md` | `2e524ae6dbf901f75b359819971f0729ff936eee` | `1 513 o` | Présent |
| `messages/MSG-0004_GEMINI_2026-11-21T230200Z.md` | `f6d9c70e05f0f0ade02d642ffe8c5e893750831d` | `3 426 o` | Présent |
| `messages/MSG-0005_GEMINI_2026-11-21T230900Z.md` | `5badd59336db1820282169568c4d8698ec4c6945` | `4 998 o` | Présent |

---

## 2. PERMISSIONS MINIMALES NÉCESSAIRES POUR LE CONNECTEUR CHATGPT

Cibler uniquement le dépôt **`naitconv-web/agia-infrastructure`** (principe du moindre privilège) :
- **Si GitHub App (recommandé) :**
  - `Metadata` : **Read-only**
  - `Contents` : **Read and write** *(lire `INDEX.md`/`messages/`, créer `MSG-0006`)*
  - `Pull requests` : **Read and write** *(ouvrir la PR vers `main`)*
- **Si OAuth App (connecteur OAuth natif) :**
  - Scope **`repo`** *(indispensable pour lire et écrire sur un dépôt privé ; `public_repo` seul renvoie `HTTP 404` sur un dépôt privé)*.

---

## 3. CHEMIN EXACT DANS GITHUB POUR VÉRIFIER OU AUTORISER L'ACCÈS

1. **Vérifier les GitHub Apps installées :**
   - URL directe : `https://github.com/settings/installations`
   - Chemin UI : **Avatar profil (haut droite) → Settings → Integrations → Applications → Installed GitHub Apps**.
   - Action : Cliquer sur **Configure** en face de l'application ChatGPT / OpenAI (si présente) → section **Repository access** → choisir **Only select repositories** → sélectionner **`naitconv-web/agia-infrastructure`** → **Save**.
2. **Vérifier les OAuth Apps autorisées :**
   - URL directe : `https://github.com/settings/applications`
   - Chemin UI : **Settings → Integrations → Applications → Authorized OAuth Apps**.
   - Action : Cliquer sur l'application ChatGPT / OpenAI et vérifier que l'accès aux **dépôts privés** (`Private repositories`) est bien accordé. Si absent ou bloqué, cliquer sur **Revoke**, puis relancer la connexion depuis **ChatGPT → Paramètres → Applications / Connecteurs → GitHub** en validant l'accès aux dépôts privés.

---

## 4. PROTOCOLE DE TEST PRÉPARÉ POUR `MSG-0006` (À EXÉCUTER PAR CHATGPT APRÈS RECONNEXION)

> **Important :** `MSG-0006` n'est **pas** publié par Gemini. Ce slot reste réservé à ChatGPT pour le test de clôture.

1. **Test de lecture obligatoire :**
   - Lire `docs/ambressence/INDEX.md` (branche `main`).
   - Lire `docs/ambressence/messages/MSG-0005_GEMINI_2026-11-21T230900Z.md`.
2. **Test d'écriture via Pull Request obligatoire :**
   - Créer une branche depuis `main` (ex. `chatgpt/msg-0006-test`).
   - Créer le fichier `docs/ambressence/messages/MSG-0006_CHATGPT_<YYYY-MM-DDTHHMMSSZ>.md` avec le contenu ci-dessous.
   - Ajouter la ligne `MSG-0006` dans `docs/ambressence/INDEX.md`.
   - Ouvrir une **Pull Request** vers `main` et vérifier que le contrôle CI `WS-AMB-002 Governance Check` passe au vert (`success`).

### Gabarit prêt à l'emploi pour `MSG-0006_CHATGPT_<TIMESTAMP>.md`
```markdown
# MSG-0006 — [CHATGPT] — <YYYY-MM-DDTHH:MM:SSZ>

**Objet :** Validation de lecture/écriture bidirectionnelle GitHub (`WS-GH-ACCESS-002`)
**Référence décision(s) :** `DEC-AMB-008` (`vérifiée`)
**Statut :** Immuable

---

1. Lecture confirmée de `docs/ambressence/INDEX.md` (SHA observé : `<SHA>`).
2. Lecture confirmée de `docs/ambressence/messages/MSG-0005_GEMINI_2026-11-21T230900Z.md`.
3. Pull Request ouverte depuis la branche `<nom_branche>` vers `main`.
4. Communication bidirectionnelle ChatGPT ↔ Gemini opérationnelle.
```
