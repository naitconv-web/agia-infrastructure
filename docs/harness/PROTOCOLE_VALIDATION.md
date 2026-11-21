# LIVRABLE 6 — PROTOCOLE DE VALIDATION, BOUCLES CONTRÔLÉES & PREUVES D'EXÉCUTION (`COUCHE 5 — LOOPS`)

**Référence :** SYNTESIA-HARNESS-VALIDATION-011 (Mission AGIA-011)  
**Cycle obligatoire :** `PLAN → EXECUTE → TEST → VERIFY → CORRECT → REPORT`  
**Règle cardinale :** `DOCUMENTÉ ≠ IMPLÉMENTÉ ≠ TESTÉ ≠ VALIDÉ EN PRODUCTION`

---

## 1. SPÉCIFICATION DE LA BOUCLE CONTRÔLÉE (`MAX_ATTEMPTS = 3`)

Chaque tâche technique exécutée au sein de SYNTESIA est soumise à une boucle fermée comportant 6 phases :

| Phase de la boucle | Action obligatoire de l'agent | Critère de passage à la phase suivante |
| :--- | :--- | :--- |
| **1. `PLAN`** | Identifier la cible, lire le Shard minimal requis, définir l'assertion de test mesurable. | Objectif et critère d'arrêt écrits. |
| **2. `EXECUTE`** | Modifier ou créer le(s) fichier(s) de manière atomique et réversible. | Fichier écrit sur disque sans erreur de syntaxe. |
| **3. `TEST`** | Exécuter un test réel (script Python, Node.js, ou navigateur Chromium Headless CDP). | Sortie brute et code retour (`exit code`) capturés. |
| **4. `VERIFY`** | Confrontation indépendante du résultat avec les garde-fous et le critère d'arrêt. | **`exit_code == 0` ET preuve vérifiable produite.** Si échec et `attempt < 3` ➔ aller à `CORRECT`. Si `attempt == 3` ➔ marquer `BLOCKED` et escalader. |
| **5. `CORRECT`** | Analyser la cause racine de l'échec (`TEST`), appliquer le correctif ciblé et relancer `TEST`. | Maximum **3 tentatives**. Interdiction de boucler indéfiniment. |
| **6. `REPORT`** | Consigner le résultat, la preuve (`SHA-256`, commit, trace de test) et générer le Checkpoint. | Distinction stricte des 4 niveaux de maturité ci-dessous. |

---

## 2. GRILLE DE QUALIFICATION OBLIGATOIRE DES RÉSULTATS (`TEST F`)

Le contrôleur `scripts/harness_ctl.py` impose de distinguer formellement **quatre états de maturité technique** qu'il est interdit de confondre :

1. **`DOCUMENTÉ` (`PROPOSED` / `DECLARED`) :**
   - Une fonctionnalité, une architecture ou une règle est décrite dans un fichier Markdown ou un document Google Drive, **mais aucun code exécutable n'a été inspecté ni lancé**.
   - *Exemple réel dans le portefeuille :* Le noyau `lab-core` (`< 80 Mo RAM`) dans `LAB-ARCH-001`.
2. **`IMPLÉMENTÉ` (`IN_PROGRESS`) :**
   - Le code source, le script ou la page HTML existe physiquement dans le dépôt Git, **mais n'a pas encore fait l'objet d'un test d'exécution automatisé ou navigateur**.
3. **`TESTÉ` (`CONFIRMED` en Pré-Production) :**
   - Le code a été **réellement exécuté** dans un environnement de test contrôlé (ex. Chromium Headless CDP, banc Node.js VM, ou insertion `Environnement = TEST` dans Google Sheets) avec une **preuve vérifiable** (log horodaté, capture PNG, ligne de test relue, code retour `0`).
   - *Exemple réel dans le portefeuille :* Les 5 pages HTML SYNTESIA, le démonstrateur `sites/demonstrateur/index.html`, le moteur `syntesia-forms.js` v2.2 et l'ingestion `LEAD-TEST-20261121-183904-4493`.
4. **`VALIDÉ EN PRODUCTION` (`PROD_ACTIVE`) :**
   - Le système est déployé sur son environnement commercial définitif après autorisation du fondateur, et son fonctionnement de bout en bout est vérifié sur le flux de production réel.
   - *Exemple réel dans le portefeuille :* Le webhook public Google Apps Script des formulaires SYNTESIA est actuellement **`TESTÉ` (en simulation locale `doPost`) mais `NON VALIDÉ EN PRODUCTION` (`BLOCKED` volontairement par `WEBHOOK_ENABLED = false`)**.

---

## 3. PROCÉDURE DE GESTION DES CONTRADICTIONS (`TEST D`)

Lorsqu'un agent ou le script `harness_ctl.py` détecte deux affirmations incompatibles entre deux fichiers (ex. un document ancien affirmant qu'une structure est immatriculée ou qu'un tarif est de X €, et un document récent affirmant l'inverse) :
1. **Interdiction d'écrasement silencieux :** L'agent ne supprime jamais l'historique sans trace.
2. **Enregistrement dans `conflicts` (`harness_memory.json`) :**
   - Si une décision officielle postérieure du fondateur a explicitement tranché le point, l'ancienne affirmation est marquée **`SUPERSEDED`** avec renvoi vers la nouvelle décision (`CONFIRMED`).
   - Si aucune décision du fondateur n'a encore tranché l'écart, le point est marqué **`BLOCKED` (`CONFLICT_DETECTED`)**, les deux versions sont exposées côte à côte avec leurs sources, et l'arbitrage est demandé au fondateur.
