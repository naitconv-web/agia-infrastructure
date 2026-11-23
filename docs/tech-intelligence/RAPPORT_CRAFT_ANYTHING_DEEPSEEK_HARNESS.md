# RAPPORT STRATÉGIQUE, PROCÉDURE CLEAN ROOM & PROTOCOLE EXPÉRIMENTAL (`WS-TECH-INTELLIGENCE-002`)

**Date :** `2026-11-23` · **Statut :** `PROPOSED` (Étude complète — `0,00 €` dépensé, aucune installation ni modification de production)  
**Fiches détaillées :** [Craft Anything](file:///home/antigravity/naitconv-web/agia-infrastructure/docs/tech-intelligence/evaluations/FICHE_EVALUATION_CRAFT_ANYTHING.md) · [DeepSeek Harness](file:///home/antigravity/naitconv-web/agia-infrastructure/docs/tech-intelligence/evaluations/FICHE_EVALUATION_DEEPSEEK_HARNESS.md)

---

## 1. MATRICE D'INTÉGRATION PAR PROJET (`WORKSTATION-IA`)

| Projet | Cas d'usage pertinent pour `Craft Anything` (Clean Room) | Intérêt de `DeepSeek Harness` | Ce qu'il faut impérativement préserver | Verdict projet |
| :--- | :--- | :--- | :--- | :---: |
| **AMBRESSENCE** | Observer des boutiques parfumerie de référence (navigation, recherche, fiches produit, tunnel) pour proposer des améliorations UX/CRO ciblées. | **Faible** (Antigravity gère déjà WooCommerce/JS/CSS). | Catalogue live (`2 552` produits), `153` brouillons, maquettes Or/Ivoire, règles wording & marges. | **Test pilote isolé possible** |
| **SYNTESIA** | Analyser des CRM, tableaux de bord et tunnels clients en mode Clean Room pour accélérer la conception d'avant-vente / maquettes Refero. | **Moyen** (benchmark coût/qualité si API DeepSeek un jour). | Charte Refero, `syntesia-forms.js` (`WEBHOOK_ENABLED: false`), pages FR/DZ validées (`77/77`). | **Utile en méthode d'analyse** |
| **OMNISECUR** | Étudier l'ergonomie de logiciels de planning/télésurveillance pour améliorer l'UX (sans toucher au moteur métier). | **Faible** (code v2.3.2 déjà certifié `95/95` tests). | Calculs réglementaires **CSI / IDCC 1351 / Avenant 2 (`6h`)**, PostgreSQL RLS, zone blanche. | **Prudence (UX seule)** |
| **RELANCE-DEVIS** | Observer les parcours de qualification/relance devis BTP les plus fluides pour optimiser la conversion entrante. | **Nul** (règle `WS-2026-005` : zéro code lourd avant traction Meta Ads). | Tunnel inbound existant & plafonds budgétaires. | **Non prioritaire** |

---

## 2. PROCÉDURE OPÉRATIONNELLE RÉUTILISABLE — MODE CLEAN ROOM (`7` ÉTAPES)

*(Applicable dès aujourd'hui avec Antigravity + navigateur/captures, ou ultérieurement avec `Craft Anything` si autorisé.)*

1. **Sélection légitime de la cible :** Uniquement des pages publiques accessibles sans authentification ni contournement (zéro accès au code privé d'un concurrent, zéro DRM/login contourné).
2. **Capture Clean Room stricte :** Collecter uniquement l'observable visiteur (captures d'écran `desktop`/`mobile`, arborescence visible, parcours utilisateur, palette, typographie, frictions UX). Interdiction d'importer le code source, les assets protégés ou les marques concurrentes.
3. **Spécification fonctionnelle neutre :** Rédiger un cahier des charges métier propre à notre marque (ex. `AMBRESSENCE` / `SYNTESIA`) intégrant nos propres contraintes (`F1`, RGPD, direction artistique Refero).
4. **Implémentation isolée :** Générer le prototype dans un dossier isolé (sans toucher à la production ni aux fichiers existants).
5. **Contrôle fonctionnel réel :** Tester les vrais parcours (formulaires, calculs, responsive, accessibilité, sécurité) — **ne jamais confondre un score de similarité visuelle avec une équivalence fonctionnelle**.
6. **Audit indépendant (`Règle 5`) :** Soumettre le prototype et ses preuves à un agent auditeur en lecture seule (`Concepteur ≠ Auditeur`).
7. **Arbitrage PDG :** Validation `OUI / NON` avant toute intégration dans le produit réel.

---

## 3. PROTOCOLE EXPÉRIMENTAL PRÊT À EXÉCUTER (EN ATTENTE FEU VERT PDG)

### Expérience A — Pilote Clean Room non critique sur `AMBRESSENCE`
- **Cible proposée :** Amélioration UX d'un composant non critique (ex. fiche produit mobile ou barre de recherche/filtres `/catalogue/`) en comparant `1` à `2` références e-commerce parfumerie publiques en mode Clean Room, sans modifier `ambressence.com`.
- **Critères de succès :** `0` code/marque copié, respect charte Or/Ivoire, amélioration mesurée sur parcours mobile `390px`, validation par auditeur indépendant.

### Expérience B — Benchmark optionnel `DeepSeek Harness` vs `Antigravity`
- **Tâche identique :** Réaliser un composant front/script isolé avec spécification et tests unitaires identiques.
- **7 métriques obligatoires à mesurer :** (1) Temps de réalisation, (2) Coût réel modèles + infra (€), (3) Qualité du code (lint/tests), (4) Nombre de corrections nécessaires, (5) Fidélité visuelle, (6) Fonctionnement réel E2E, (7) Sécurité & maintenabilité.

---

## 4. ESTIMATION DES COÛTS & GAINS POTENTIELS (`HYPOTHÈSES EXPLICITES`)

| Poste | Coût estimé | Hypothèses explicites | Gains potentiels |
| :--- | :---: | :--- | :--- |
| **Licences (`Craft Anything` & `dsh`)** | **`0,00 €`** | Licences vérifiées `MIT / Apache-2.0`. | Zéro redevance logicielle. |
| **Usage `Craft Anything` (Build)** | **`0 €` à variable** | *Hypothèse :* compilation Rust locale gratuite, mais dépend d'un agent de code (Claude Code ou clé API) pour reconstruire. | Gain estimé de `30 % à 50 %` sur le temps de maquettage/benchmark UX *(hypothèse non testée)*. |
| **Usage `DeepSeek Harness` (`dsh`)** | **Variable (API)** | *Hypothèse :* nécessite une clé API DeepSeek (facturée au token) + clé vision (ex. Gemini) si plugin `ModLens`. | Alternative de secours multi-modèles si les quotas Antigravity saturent *(à prouver par benchmark)*. |

---

## 5. RECOMMANDATION FINALE (`GO / NO-GO`)

1. **Craft Anything :** **`GO SOUS CONDITIONS`** pour un **test isolé en Clean Room** sur poste/bac à sable dès que vous l'autorisez (`0 €` d'achat, vigilance `ai-keys.toml` et statut `early alpha`) · **`NO-GO`** en production.
2. **DeepSeek Harness (`dsh`) :** **`NO-GO`** comme outil permanent dans `WORKSTATION-IA` (doublon avec **Antigravity + Paseo**, statut `developer preview` instable, pas de vision native) · **`GO SOUS CONDITIONS` uniquement** si vous souhaitez un benchmark comparatif isolé contre Antigravity.
3. **Architecture :** **Conserver Antigravity + Paseo** tels quels, sans créer de nouvel orchestrateur ni de mémoire parallèle.
