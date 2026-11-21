# CARTOGRAPHIE DU PORTEFEUILLE WORKSTATION-IA & ACTIFS DU FONDATEUR
**Référence :** SYNTESIA-MEMOIRE-001 (Révision Finale AGIA-003)  
**Statut du Référentiel :** `AUDIT DOCUMENTAIRE TERMINÉ — VALIDATION DU FONDATEUR EN ATTENTE`  
**Date de révision :** 21 novembre 2026  
**Auteur :** Antigravity Systems Architect / CTO SYNTESIA  

---

## 1. DISTINCTION FONDAMENTALE DES ENTITÉS ET PÉRIMÈTRES

Pour éviter toute confusion conceptuelle ou juridique, le référentiel sépare formellement cinq natures d'objets :
1. **WORKSTATION-IA (Système d'orchestration technique) :** Infrastructure et méthodologie de travail multi-agents du fondateur (Architecture C spécifiée, protocole Bus Lean v3.0, règles de gouvernance et de mémoire).
2. **LAB (Structure mère faîtière de solutions) :** Structure organisationnelle active d'incubation et d'édition des solutions logicielles de la gamme « Omni-X » (`OMNISECUR`, `OMNIRENOV / RELANCE-DEVIS`, `OMNIPATRIMOINE`).
3. **SYNTESIA (Agence opérationnelle B2B) :** Marque commerciale de conseil, transformation numérique, automatisation et intégration d'agents IA (Marché prioritaire France avec 2 verticales d'égale priorité : Sécurité Privée et BTP/Rénovation ; Second marché : Algérie).
4. **Structures Juridiques Porteuses :**
   - *Micro-entreprise existante du fondateur* (Mounir NAIT MOHAND).
   - *SASU ATLAS GLOBAL TRADING* (Société en cours de constitution à Albi, statuts révisés le 30/10/2026 — immatriculation effective au RCS non démontrée dans le Drive).
   - *Entité e-commerce dédiée (`NAIT STORE`)* mentionnée pour l'isolation budgétaire d'AMBRESSENCE.
5. **Actifs Expérientiels & Candidatures CHR :** Compétences professionnelles du fondateur en hôtellerie/restauration et dossiers d'étude de reprise (ex. candidature en gérance mandat B&B Hôtel Douai).

---

## 2. NOMENCLATURE OFFICIELLE DES STATUTS DE VÉRIFICATION

Conformément aux règles strictes d'audit AGIA-003, chaque élément est qualifié uniquement par l'un des 5 statuts suivants :
- **`CONFIRMÉ PAR SOURCE`** : Décision ou information écrite vérifiée dans un document officiel original du Drive (`REGISTRE-DECISIONS.md`, statuts PDF, journaux d'audit).
- **`VÉRIFIÉ TECHNIQUEMENT`** : Preuve technique directe consultée et inspectée (journaux bruts d'exécution des tests, manifestes SHA-256, dépôts Git accessibles).
- **`DÉCLARÉ MAIS NON VÉRIFIÉ`** : Affirmation présente dans un document de synthèse dont la preuve primaire sous-jacente n'est pas accessible depuis l'environnement d'audit (ex. dépôt privé non attaché renvoyant `HTTP 403`, état du PC local Windows 11).
- **`À CLARIFIER`** : Point présentant une divergence entre documents ou nécessitant un arbitrage du fondateur.
- **`NON DÉMONTRÉ`** : Élément absent des preuves ou non finalisé (ex. certificat de dépôt de capital ou Kbis final d'une société en formation).

---

## 3. MATRICE EXHAUSTIVE DU PORTEFEUILLE (11 COMPOSANTS RECENSÉS)

| # | Nom du Projet / Entité | Catégorie | État d'Avancement Réel | Statut de Preuve | Sources Originales & Dépôts Réels |
| :- | :--- | :--- | :--- | :--- | :--- |
| **01** | **LAB** | Structure mère faîtière (Gamme Omni-X) | Structure mère active accueillant OMNISECUR, OMNIRENOV, OMNIPATRIMOINE | `CONFIRMÉ PAR SOURCE` | Drive `README-PORTEFEUILLE.md` (`13_Qt4DU...`) & `WS-2026-006` |
| **02** | **WORKSTATION-IA** | Système d'orchestration multi-agents | Spécification Architecture C (< 80 Mo RAM cible) & Bus Lean v3.0 adopté. Dépôt `lab-core` non créé. | `CONFIRMÉ PAR SOURCE` | Drive `LAB-ARCH-001` (`1CcEAPM9...`), `LAB-ARCH-002` (`1y2LXAYc...`), `REGISTRE-DECISIONS.md` |
| **03** | **SYNTESIA** | Agence Conseil & Intégration IA | Socle technique assaini (AGIA-001/002/Lot 1). Non publié en prod. | `VÉRIFIÉ TECHNIQUEMENT` | GitHub `naitconv-web/agia-infrastructure` & Drive `_AGIA_PILOTAGE` (`17gFy4ia...`) |
| **04** | **OMNISECUR** | Solution LAB Niveau 2 (Sécurité Privée) | Code v2.3.2 (`f6b1a87`) : sorties brutes de tests 95/95 & manifeste SHA-256 consultés sur Drive. Dépôt Git privé en `HTTP 403` depuis VM. | `VÉRIFIÉ TECHNIQUEMENT` *(via archives Drive)* / `DÉCLARÉ MAIS NON VÉRIFIÉ` *(sur repo Git live)* | Drive `SORTIES-BRUTES-TESTS-ET-BUILD-f6b1a87.txt` (`1BXe_-qm...`), `GIT-MANIFEST.json` (`1GiyjMM2...`) ; GitHub `omnisecur` & `omnisecur-launch-kit` |
| **05** | **RELANCE-DEVIS (OMNIRENOV)** | Solution LAB Niveau 2 (Bâtiment / BTP) | Test commercial 100 % Inbound Meta Ads (règle Zéro Code applicatif). **Correction : aucun dépôt Git propre**, scripts d'extraction mutualisés mais kit commercial sur Drive. | `CONFIRMÉ PAR SOURCE` | Drive `PROJETS/RELANCE-DEVIS` (`13OOCqJY...`) & `README.md` (`1LjqiYyK...`) |
| **06** | **OMNIPATRIMOINE** | Solution LAB Niveau 3 (Patrimoine) | Développement séquentiel planifié après revenus N1/N2. Aucun dossier technique actif. | `CONFIRMÉ PAR SOURCE` *(séquençage)* / `NON DÉMONTRÉ` *(livrables)* | Drive `README-PORTEFEUILLE.md` (`13_Qt4DU...`) & `FUTURS_PROJETS` (`1dyOS9MR...`) |
| **07** | **AMBRESSENCE** | E-commerce B2C Parfumerie (Hors LAB) | Staging o2switch prêt déclarativement, blocage Kbis `NAIT STORE`. Dépôts Git en `HTTP 403` depuis VM. | `CONFIRMÉ PAR SOURCE` *(docs)* / `DÉCLARÉ MAIS NON VÉRIFIÉ` *(staging & Git)* | Drive `PROJETS/AMBRESSENCE` (`1Kwtctpd...`) ; GitHub `AMBRESSENCE` & `ambressence.com` |
| **08** | **SASU ATLAS GLOBAL TRADING** | Structure juridique commerciale | **En cours de constitution** (statuts révisés le 30/10/2026, capital 500 € Albi). Immatriculation et dépôt capital non présents. | `CONFIRMÉ PAR SOURCE` *(statuts en formation)* / `NON DÉMONTRÉ` *(immatriculation effective)* | Drive `_ADMINISTRATION_JURIDIQUE/ATLAS-GLOBAL-TRADING` (`1FPLPQLr...`) |
| **09** | **EXPÉRIENCE CHR & DOSSIER B&B DOUAI** | Actif expérientiel & Candidature gérance | Compétences fondateur déclarées ; dossier de candidature gérance mandat B&B Douai (mai 2026). Chiffres (828 K€) = historique de l'hôtel cible. | `CONFIRMÉ PAR SOURCE` *(dossier candidature)* / `À CLARIFIER` *(issue candidature)* | Drive `Dossier de candidature gérance mandat.pdf` (`1eJY7N5k7...`) |
| **10** | **EMERGENCY CASHFLOW (EC)** | Mission opérée sous supervision stricte | En `PREPARATION` (Palier P0, régime F1 0,00 €, J0 non activé, contre-audit EC-006 Phase D). | `CONFIRMÉ PAR SOURCE` | Drive `EC-SUPERVISION` (`1jqxJSs4...`), `SUPERVISION_DASHBOARD.md` (`1eVtfbWs...`) ; GitHub `ec-mission-state` |
| **11** | **PISTES EXPLORATOIRES & ANCIENS DÉPÔTS** | `INSTACAR`, `ARBITRAGE EBAY PARFUMS`, `projet-pilote` | - `INSTACAR` : business plan Notion en pause.<br>- `EBAY PARFUMS` : étude avec ROI étiqueté `[HYPOTHÈSE NON VÉRIFIÉE]`.<br>- `projet-pilote` : dépôt Git privé non documenté sur Drive. | `CONFIRMÉ PAR SOURCE` *(Instacar / eBay)* / `À CLARIFIER` *(projet-pilote)* | Drive `IDEES-EN-PAUSE` (`15i3mvt4...`), `ARBITRAGE-EBAY-PARFUMS` (`1x2YIOZ...`) ; GitHub `projet-pilote` |
