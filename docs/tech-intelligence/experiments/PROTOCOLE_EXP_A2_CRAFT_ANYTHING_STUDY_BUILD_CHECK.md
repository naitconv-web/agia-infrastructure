# PROTOCOLE & PLAN D'EXÉCUTION ISOLÉ — EXPÉRIENCE A2 `CRAFT ANYTHING` (`Study → Build → Check → Ready`)

**Mission de préparation :** `WS-TECH-INTELLIGENCE-004` (Décision PDG **`DEC-18`**) — **Actualisation :** `WS-TECH-INTELLIGENCE-005`  
**Outil évalué :** `storytold/craft-anything` (`v0.6.1` déjà présent en bac à sable `/tmp/ws_exp_a/`)  
**Projet pilote :** **AMBRESSENCE** — Composant expérimental : **fiche produit responsive isolée**  
**Statut actuel :** **`BLOCKED — SUSPENSION CONTRÔLÉE (`DEC-18`, `WS-TECH-INTELLIGENCE-005`)`** *(expérimentation A2 non exécutée ; ni Option A Windows, ni `Check-only`, ni `--no-sandbox` ; voir [RAPPORT_BLOCAGE_EXP_A2_OPTION_B.md](file:///home/antigravity/naitconv-web/agia-infrastructure/docs/tech-intelligence/experiments/RAPPORT_BLOCAGE_EXP_A2_OPTION_B.md)). Réouverture uniquement si les 4 conditions PDG sont réunies : cycle `Study → Build → Check → Ready` réellement exécutable, backend déjà autorisé à `0 €`, sécurité/isolation respectées, zéro impact prod AMBRESSENCE.*

---

## 1. Historique de référence (`WS-TECH-INTELLIGENCE-003`)

Lors de l'Expérience A initiale (`WS-TECH-INTELLIGENCE-003`), seul l'audit visuel par comparaison de captures (`web-pixels-compare`) a été exécuté :
- **Desktop (`1440×900`) :** `79,4 %` de similarité layout (`0.793957`) et `81,4 %` de similarité perceptuelle.
- **Mobile (`390×844`) :** `48,0 %` de similarité layout (`0.48`) et `48,9 %` de similarité perceptuelle.

> **Rappel impératif :** Ces chiffres demeurent une référence historique de comparaison. Ils ne constituent **en aucun cas** une validation de la chaîne `Study → Build`.

---

## 2. Protocole complet `Study → Build → Check → Ready` (Mode Clean Room)

Le protocole suit strictement les 4 phases natives de `Craft Anything` (`craft-anything-cli --clean-room`) en environnement isolé :

### Phase 1 — `STUDY` (Observation Clean Room & Spécification)
1. **Entrée :** Une référence publiquement accessible et utilisée légalement (page produit e-commerce publique sans authentification ni contournement).
2. **Contraintes Clean Room :**
   - Exécution avec le drapeau `--clean-room` obligatoire (interdiction de lire le code source JS/CSS/HTML interne de la cible).
   - Extraction uniquement des éléments observables publiquement : captures d'écran (`1440×900` desktop et `390×844` mobile), hiérarchie visuelle, texte visible, palette, typographie et comportements UX apparents.
3. **Livrable de phase :** Spécification fonctionnelle et visuelle structurée (composants d'une fiche produit responsive : galerie, sélecteur de contenance, prix/livraison, onglets olfactifs, réassurance, sticky CTA mobile).

### Phase 2 — `BUILD` (Génération du prototype isolé)
1. **Entrée :** La spécification issue de la phase `STUDY` + la charte **AMBRESSENCE** (Or `#b5812e`, Ivoire `#fbfaf7`, typographie éditoriale) + données **100 % fictives** (ex. *Voile d'Ambre — 100 ml — 74,00 €*).
2. **Exécution :** Génération d'un prototype HTML/CSS/JS autonome dans un dossier isolé (`/tmp/ws_exp_a2/app/`), sans aucune dépendance WooCommerce ni appel réseau externe.
3. **Livrable de phase :** Prototype exécutable localement et fonctionnel (interaction sélecteur de format, changement d'image, ajout panier simulé en mémoire locale, responsive desktop/mobile).

### Phase 3 — `CHECK` (Vérification visuelle, responsive & fonctionnelle)
1. **Captures comparatives :** Rendu Chromium headless en `1440×900` (desktop) et `390×844` (mobile) sur la référence et sur le prototype généré.
2. **Comparaison objective :** Exécution de `craft-anything-cli --clean-room web-pixels-compare --common-area true` sur les deux viewports.
3. **Diagnostic & Corrections :**
   - Identifier les défauts réels sur mobile (grille empilée, débordements horizontaux, taille des zones tactiles, lisibilité prix/CTA) et sur desktop.
   - Appliquer les corrections ciblées dans le prototype isolé et ré-exécuter `web-pixels-compare` pour mesurer l'évolution factuelle (sans seuil inventé).
4. **Tests fonctionnels :** Vérifier que les interactions JS (sélecteur, galerie, validation formulaire simulé) fonctionnent sur les deux largeurs d'écran.

### Phase 4 — `READY` (Consolidation, rapport & audit indépendant)
1. Génération du rapport factuel (`craft-anything-cli report` + synthèse Markdown dans `docs/tech-intelligence/experiments/`).
2. Contrôle par un **auditeur indépendant en lecture seule** (vérification des captures, des commandes réelles, de l'absence d'accès production et du coût `0,00 €`).
3. Verdict objectif sur l'apport réel de `Craft Anything` par rapport à notre workflow natif (`Antigravity` + `Refero`).

---

## 3. Plan d'exécution isolé pour AMBRESSENCE & Garde-fous

| Périmètre | Règle impérative |
| :--- | :--- |
| **Mode d'inspection** | **`--clean-room` exclusif** (aucune lecture de source cible). |
| **Données utilisées** | Données **fictives** uniquement. Zéro donnée client, zéro catalogue réel extrait de prod. |
| **Production** | **Zéro connexion** à WooCommerce, **zéro modification** de `ambressence.com`, **zéro modification** des produits existants. |
| **Système & Secrets** | **Zéro exposition de secrets**, **zéro accès général** au disque `C:` ou à Google Drive, **zéro déploiement**. |
| **Budget** | **`0,00 €`** (aucun achat de crédits API, aucun abonnement, aucune nouvelle installation sans accord PDG). |

---

## 4. Critères de réussite (à vérifier lors de l'exécution future)

1. Cycle `Study → Build → Check` effectivement exécuté.
2. Spécification fonctionnelle produite.
3. Prototype réellement fonctionnel.
4. Interface responsive vérifiée (desktop + mobile).
5. Comparaison visuelle documentée (captures + scores bruts réels, sans seuil inventé).
6. Défauts identifiés et corrigés (en particulier sur mobile).
7. Audit indépendant en lecture seule validé.

---

## 5. Prérequis et blocages identifiés (avant exécution)

À la date de préparation (`2026-11-23`), l'exécution complète automatisée dans la VM cloud se heurte aux **3 points suivants**, qui doivent être arbitrés ou levés avant de lancer l'expérience :

1. **Blocage technique #1 — Sandbox Chromium (`web-site-open`) :**
   - *Constat réel (`WS-TECH-INTELLIGENCE-003`) :* `craft-anything-cli web-site-open` lance Chromium sans `--no-sandbox`, ce qui échoue dans le conteneur Linux de la VM (`sandbox/linux/services/credentials.cc:137: Function not implemented (38)`).
   - *Impact :* La capture automatique via `web-site-open` ne fonctionne pas dans cette VM ; il faut soit exécuter l'expérience sur le poste local (hors conteneur restreint), soit capturer les pages via `/usr/bin/chromium --no-sandbox` avant de passer les images à `web-pixels-compare`.
2. **Blocage technique #2 — Absence de Backend AI configuré (`craft-anything-cli rebuild`) :**
   - *Constat réel (`doctor` & `rebuild --help`) :* La commande `craft-anything-cli rebuild` exige un `--backend <BACKEND>` configuré dans `craft-anything-cli ai` (actuellement vide : `No AI backend is set up`).
   - *Impact à `0,00 €` :* Sans clé API payante ni agent local connecté (`Claude Code` / autre backend supporté), `rebuild` ne peut pas exécuter la boucle autonome `Study → Build → Check` dans cette VM.
   - *Options à soumettre au PDG :*
     - **Option A (Locale) :** Exécuter `Study → Build → Check` sur le poste local avec un backend déjà autorisé à `0 €` supplémentaire.
     - **Option B (VM via MCP/CLI) :** Utiliser le serveur MCP de `Craft Anything` (`30` outils) piloté par `Antigravity` pour les étapes `Study` et `Check`, et évaluer si cela répond à l'objectif de `DEC-18`.
3. **Prérequis #3 — Désignation de la référence publique légale :**
   - Sélectionner explicitement une page produit publique et légale servant de référence Clean Room pour la fiche produit responsive.

---

## 6. Confirmation budgétaire et matérielle (`WS-TECH-INTELLIGENCE-004`)

- **Dépense supplémentaire engagée :** **`0,00 €`**.
- **Nouvelle installation effectuée :** **`AUCUNE`** (utilisation exclusive du binaire `v0.6.1` déjà présent dans `/tmp/ws_exp_a/` pour l'inspection de ses commandes `--help` / `capabilities`, et conservation intacte du bac à sable `DeepSeek Harness` dans `/tmp/ws_exp_b/dsh_sandbox/`).
