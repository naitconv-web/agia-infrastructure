# AUDIT_CANTARA_V3_COMPLET — RAPPORT D'AUDIT 360° & SPÉCIFICATION UX/UI INTERACTIVE

**Destinataire :** Président-Directeur Général (PDG)  
**Projet :** CANTARA V3 — Vitrine Institutionnelle, Portfolio Interactif & Démonstrations Produits  
**Missions consolidées :** `MISSION AUDIT-360 — CANTARA V3` & `MISSION CANTARA-V3-UX-INTERACTIVE-SPEC`  
**Dépôt audité :** `/home/antigravity/naitconv-web/agia-infrastructure` (`https://github.com/naitconv-web/agia-infrastructure.git`)  
**Branche auditée :** `cantara/v3-epure-comet`  
**Commit audité (initial & final) :** `85e649a40b31e844f74d81e1aaba6b87934c7928`  
**Régime d'intervention :** **LECTURE SEULE STRICTE** (`0` fichier du dépôt modifié, `0` fichier créé dans le dépôt, `0` commit, `0` fusion, `0` push, `0` déploiement, `0,00 €` engagé)  
**Date :** 26 novembre 2026  
**Référence normative :** Charte de Franchise et de Non-Complaisance envers le PDG (`CHARTE-FRANCHISE-NON-COMPLAISANCE.md`)

---

## 0. SYNTHÈSE EXÉCUTIVE (RÉSUMÉ DIRIGEANT)

### 0.1 Objet du document
Ce document regroupe, sans aucune omission ni raccourci, l'intégralité des deux missions d'audit et de conception réalisées en lecture seule sur **CANTARA V3** (branche `cantara/v3-epure-comet`, commit `85e649a`) :
1. **PARTIE A — AUDIT 360° DE L'EXISTANT (`AUDIT-360`) :** Audit technique, fonctionnel, design/UX, sécurité, performance/accessibilité, commercial et non-régression de la version actuelle de `sites/cantara-v3/`.
2. **PARTIE B — SPÉCIFICATION UX/UI & CAHIER DES CHARGES INTERACTIF (`CANTARA-V3-UX-INTERACTIVE-SPEC`) :** Évaluation de l'écart par rapport au Cahier des Charges Stratégique v1.0, conception complète du nouveau positionnement transversal, du **Portfolio 3 solutions** (`SECURIAXE`, `OMNIRENOV`, `OMNIPATRIMOINE`), du **CANTARA LAB** (3 expériences interactives), de la section **Services & accompagnement**, du formulaire honnête sans fausse confirmation, et du plan de réalisation en 3 lots.

### 0.2 Verdict global et état du code existant (`85e649a`)
- **Verdict technique sur le socle `85e649a` :** **GO SOUS RÉSERVES** (Socle d'ingénierie exemplaire : `0` dépendance externe, `0` requête tierce, `0` erreur console, `0` débordement horizontal Desktop/Mobile, **`0` violation WCAG 2.1 / 2.2 AA** sous Axe-Core, temps de chargement `DOMInteractive` entre `26 ms` et `80 ms`, poids total de `227 Ko` à `283 Ko` polices incluses).
- **Conformité aux règles de gouvernance et de confidentialité :**
  - **Périmètre géographique :** France uniquement (`0` mention d'Algérie, DZD, Maghreb, Alger, Oran).
  - **Nettoyage des marques historiques :** `0` mention de `SYNTESIA` ou `OMNISECUR` dans `sites/cantara-v3/`.
  - **Protection des données personnelles du fondateur :** Coordonnées nominatives (`Mounir NAIT MOHAND EI`, adresse Albi, téléphone, e-mail) cantonnées **exclusivement** à `mentions.html` (`0` fuite sur les pages publiques).
  - **Exactitude réglementaire :** Règle du repos quotidien fixée à **`>= 11 h`** (Code du travail), jamais 12 h.

### 0.3 Principaux écarts à combler par rapport au Cahier des Charges Stratégique v1.0
1. **Positionnement encore trop sectoriel :** La page d'accueil actuelle (`index.html`) présente CANTARA comme un concepteur de *"systèmes opérationnels taillés par métier"* centré sur la Sécurité Privée et le BTP, au lieu d'une **vitrine technologique institutionnelle transversale** (*conception logicielle, automatisation, IA, orchestration multi-agents, intégration de systèmes, conseil et formation*).
2. **Signature et engagements absents du Hero :** Ajouter la signature *« L'ingénierie au service de votre performance. »*, les engagements *« Proximité · Confidentialité · Fiabilité »* et les 2 CTA officiels (*« Explorer notre ingénierie »* / *« Découvrir nos solutions »*).
3. **Sections institutionnelles manquantes :** Créer la section **B. Notre ingénierie** (8 capacités transversales illustrées par des exemples concrets) et la section **E. Services et accompagnement** (7 prestations B2B).
4. **Portfolio des solutions à compléter :** Passer de 2 cartes à 3 cartes normalisées nommant explicitement **`SECURIAXE`** (Sécurité privée), **`OMNIRENOV`** (BTP et rénovation — actuellement appelé génériquement *"BTP & Rénovation — Relance Devis"*) et **`OMNIPATRIMOINE`** (Gestion patrimoniale — avec mention visible **`[En incubation]`**).
5. **Création du CANTARA LAB (Section D) :** Transformer la fenêtre Comet actuelle en laboratoire interactif proposant les **3 expériences prioritaires** :
   - *Expérience 1 :* Orchestration multi-agents (scénario en 5 étapes + sélection et inspection de chaque agent).
   - *Expérience 2 :* Automatisation d'un processus métier (pipeline visuel en 5 étapes compréhensible sans jargon).
   - *Expérience 3 :* Démonstrations métiers (`SECURIAXE`, `OMNIRENOV` et aperçu exploratoire `OMNIPATRIMOINE`).
6. **Suppression de la confirmation verte sur formulaire hors-ligne (`ANOM-V3-01`) :** En mode `WEBHOOK_ENABLED = false`, remplacer le bandeau vert `.notice-ok` du formulaire par un état transparent de pré-production proposant l'envoi réel par messagerie (`mailto:` pré-rempli) ou la copie du récapitulatif, afin de respecter la règle absolue : *« Aucun formulaire ne doit afficher une confirmation fictive si aucune transmission serveur n'a réellement eu lieu »*.

### 0.4 Tableau récapitulatif des 5 arbitrages attendus du PDG

| # | Sujet d'arbitrage | Option recommandée | Décision attendue |
| :-: | :--- | :--- | :--- |
| **1** | **Direction artistique & Palette** | Conserver la palette Hybride actuelle (Papier `#F4F3EE` / Nuit `#090D13` + `Instrument Serif` / `Plus Jakarta Sans` / `JetBrains Mono`) et ajouter les 4 badges normalisés (`Opérationnel`, `Prototype`, `Simulation`, `En incubation`). | **VALIDER / MODIFIER** |
| **2** | **URL officielle `SECURIAXE`** | Maintenir l'URL GitHub Pages vérifiée `HTTP 200` (`https://naitconv-web.github.io/cos-operations-simulateur/boutique/` ou sa racine) tant que le domaine `https://idcc1351.fr` n'est pas actif en DNS. | **CONFIRMER L'URL** |
| **3** | **URL officielle `OMNIRENOV`** | Aucune URL externe n'étant publiée (`URL à confirmer`), faire pointer la carte `OMNIRENOV` vers le démonstrateur interne `btp.html` (renommé `OMNIRENOV`) avec mention explicite *« Site dédié en préparation »*. | **CONFIRMER L'URL / STATUT** |
| **4** | **Formulaire `#contact` (Section F)** | En régime `WEBHOOK_ENABLED = false`, interdire le bandeau vert de confirmation et proposer l'ouverture d'un e-mail B2B pré-rempli + copie presse-papiers (ou brancher un webhook serveur au Lot 3 si souhaité). | **CHOISIR LE CANAL** |
| **5** | **Séquencement des 3 Lots** | Autoriser l'exécution séquentielle **Lot 1 (Fondation) → Lot 2 (CANTARA LAB) → Lot 3 (Conversion)** sur la branche `cantara/v3-epure-comet`. | **GO LOT 1 / GO LOTS 1-3** |

---
---

# PARTIE A — RAPPORT D'AUDIT 360° DE L'EXISTANT (`MISSION AUDIT-360`)

## A.1. IDENTIFICATION DU PROJET & ÉTAT DU DÉPÔT (PHASE 1)

### A.1.1 Emplacement et Dépôt Git
- **Répertoire Git local :** `/home/antigravity/naitconv-web/agia-infrastructure`
- **Dépôt distant configuré (`git remote -v`) :**
  - `origin https://github.com/naitconv-web/agia-infrastructure.git (fetch)`
  - `origin https://github.com/naitconv-web/agia-infrastructure.git (push)`
- **Branches locales et distantes (`git branch -a`) :**
  - `cantara/hybrid-phase2` (commit `9d51a38`)
  - `cantara/prototype-accueil-v1` (commit `53be757`)
  - `cantara/v2-portfolio` (commit `f41cf74` — approche boutique intégrée archivée suite au rejet PDG)
  - `* cantara/v3-epure-comet` (**branche active** — commit `85e649a`)
  - `gov/coherence-instructions-communes` (commit `6391ca2`)
  - `main` & `remotes/origin/main` (commit `4325f67`, tag `cantara-hybrid-phase2-v1`)
- **Commit actif constaté (`git rev-parse HEAD`) :** `85e649a40b31e844f74d81e1aaba6b87934c7928`
  - *Auteur :* `naitconv-web <354978792+naitconv-web@users.noreply.github.com>`
  - *Date du commit :* `Thu Nov 26 23:00:54 2026 +0000`
  - *Message :* `feat(cantara-v3): vitrine ultra-epuree ADN CANTARA + cinetique Comet + Espaces Metiers (vers Securiaxe)`
- **Vérification de concordance :**
  - Branche annoncée : `cantara/v3-epure-comet` → **CONFORME**
  - Commit annoncé : `85e649a` → **CONFORME (`0` écart)**
- **État de l'arbre de travail (`git status -sb`) :**
  - `M docs/harness/state/execution_trace.jsonl` : unique fichier modifié non commité (journal d'audit append-only du Harness contenant les traces `PREFLIGHT_OK`, intégralement préservé).
  - Répertoire `sites/cantara-v3/` : **100 % propre et strictement identique au commit `85e649a`**.

### A.1.2 Inventaire physique exhaustif des fichiers (`sites/cantara-v3/`)

| Fichier / Dossier | Lignes | Poids (octets) | Rôle architectural dans le commit `85e649a` |
| :--- | :---: | :---: | :--- |
| `sites/cantara-v3/index.html` | 291 | 15 291 | Page d'accueil vitrine épurée, Hero orbital, Fenêtre 3D Comet (3 intentions + Sas `[OUI]`/`[NON]`), Manifeste lumineux, 2 cartes Espaces Métiers, 4 principes nocturnes, Diagnostic 4 questions + formulaire. |
| `sites/cantara-v3/securite-privee.html` | 255 | 13 772 | Espace Métier 01 Sécurité Privée : Hero orbital, Simulateur Bouclier Anti-Pertes en direct, Aperçu interactif 7 étapes Securiaxe Director, Passerelle tarifaire vers Securiaxe. |
| `sites/cantara-v3/btp.html` | 221 | 11 194 | Espace Métier 02 BTP & Rénovation : Hero orbital, Cockpit Relance Devis (3 dossiers fictifs + Sas `[OUI]`/`[NON]`), Simulateur de devis récupérables, Passerelle 2 paliers vers diagnostic. |
| `sites/cantara-v3/mentions.html` | 92 | 6 700 | Mentions Légales LCEN (Art. 6-III-1) & Politique de confidentialité RGPD (Art. 13 & 28) — unique fichier contenant les coordonnées personnelles de l'Entrepreneur Individuel. |
| `sites/cantara-v3/comet.css` | 579 | 26 282 | Feuille de style unifiée : variables jour/nuit, grille, typographie `clamp()`, rail de lecture, fenêtre 3D `.comet-window`, cartes `.tilt-card`, simulateurs `.sim-split`, responsive et `@media (prefers-reduced-motion: reduce)`. |
| `sites/cantara-v3/comet.js` | 192 | 7 679 | Moteur cinétique partagé : configuration `CANTARA_MOTION.CONFIG`, échappement XSS `esc()`, formatage monétaire `fmtEur()`, hachage FNV-1a `hashDemo()`, boucle `requestAnimationFrame` au scroll, parallaxe orbitale, redressement 3D, illumination mot à mot du manifeste, tilt 3D et menu mobile accessible (`Escape` + focus). |
| `sites/cantara-v3/home-v3.js` | 307 | 15 460 | Logique interactive de `index.html` : dictionnaire des 3 intentions Comet (`bouclier`, `planning`, `btp`), journalisation horodatée, questionnaire de diagnostic en 4 étapes et validation du formulaire `#diagContact`. |
| `sites/cantara-v3/securite-v3.js` | 265 | 12 178 | Logique interactive de `securite-privee.html` : moteur de calcul du Bouclier Anti-Pertes (ADS Nuit `22,97 €/h`, ADS Jour `19,50 €/h`, SSIAP 1 `24,40 €/h`) et machine à états des 7 étapes de Securiaxe Director (résolution 1-clic de la double affectation et scellement SHA-256). |
| `sites/cantara-v3/btp-v3.js` | 135 | 6 011 | Logique interactive de `btp.html` : cockpit de validation des 3 devis en attente (`DEV-2026-148`, `DEV-2026-152`, `DEV-2026-159`) et calculateur de potentiel mensuel/annuel de devis récupérés. |
| `sites/cantara-v3/fonts.css` | 74 | 3 079 | Déclarations `@font-face` locales (`font-display: swap`) avec `unicode-range` latin. |
| `sites/cantara-v3/fonts/instrument-serif-400-normal.woff2` | — | 21 032 | Police de titrage éditorial `Instrument Serif` Regular (auto-hébergée). |
| `sites/cantara-v3/fonts/instrument-serif-400-italic.woff2` | — | 22 128 | Police de titrage éditorial `Instrument Serif` Italic (auto-hébergée). |
| `sites/cantara-v3/fonts/plus-jakarta-sans-400-normal.woff2` | — | 27 348 | Police de labeur `Plus Jakarta Sans` Regular (auto-hébergée). |
| `sites/cantara-v3/fonts/plus-jakarta-sans-500-normal.woff2` | — | 27 348 | Police de labeur `Plus Jakarta Sans` Medium (auto-hébergée). |
| `sites/cantara-v3/fonts/plus-jakarta-sans-600-normal.woff2` | — | 27 348 | Police de labeur `Plus Jakarta Sans` SemiBold (auto-hébergée). |
| `sites/cantara-v3/fonts/plus-jakarta-sans-700-normal.woff2` | — | 27 348 | Police de labeur `Plus Jakarta Sans` Bold (auto-hébergée). |
| `sites/cantara-v3/fonts/jetbrains-mono-400-normal.woff2` | — | 31 432 | Police technique `JetBrains Mono` Regular (auto-hébergée). |
| `sites/cantara-v3/fonts/jetbrains-mono-500-normal.woff2` | — | 31 432 | Police technique `JetBrains Mono` Medium (auto-hébergée). |
| **TOTAL `sites/cantara-v3/`** | **2 411 lignes** | **333 062 octets** | **18 fichiers autonomes (`0` dépendance externe)** |

### A.1.3 Autres répertoires présents dans `sites/` (Contexte du dépôt)
Le dossier parent `sites/` contient également les versions historiques ou parallèles non servies par le serveur de prévisualisation V3 :
- `sites/france/`, `sites/algerie/`, `sites/demonstrateur/`, `sites/boutique/`, `sites/shared/` (issus de la Phase 2 hybride sur `main`).
- `sites/cantara-prototype/` (prototype d'accueil initial V1).

---

## A.2. AUDIT TECHNIQUE (PHASE 2)

### A.2.1 Architecture HTML / CSS / JS & Organisation des composants
- **Structure HTML5 :** Chaque page respecte une structure identique et propre : lien d'évitement `.skip` (`Aller au contenu principal`), rail de progression `.scroll-rail`, en-tête sticky `#siteHeader` avec navigation ARIA `aria-label="Navigation principale"` et bouton mobile `#menuBtn` (`aria-expanded`, `aria-controls="mainNav"`), corps `<main id="main">`, pied de page `.site-footer`, et chargement différé (`defer`) des scripts en fin de `<body>`.
- **Encapsulation JavaScript :**
  - Les 4 fichiers JS sont encapsulés dans des IIFE (`(function () { 'use strict'; ... })();`) en mode strict ES5/ES6 compatible avec 100 % des navigateurs modernes et mobiles.
  - Un seul objet global est exposé : `window.CANTARA_MOTION` ([comet.js](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/comet.js#L15-L40)), dont la configuration `CONFIG` est gelée via `Object.freeze({ ENVIRONMENT: 'PREPROD', WEBHOOK_ENABLED: false, SECURIAXE_URL: 'https://naitconv-web.github.io/cos-operations-simulateur/boutique/' })`.
  - Vérification syntaxique exécutée : `node -c` sur `comet.js`, `home-v3.js`, `securite-v3.js` et `btp-v3.js` → **Code retour 0 (aucune erreur syntaxique)**.

### A.2.2 Duplication, maintenabilité et dette technique
- **Dette technique très faible :** Une seule feuille de style (`comet.css`, 26 Ko) gouverne les 4 pages.
- **Points de duplication mineurs observés :**
  1. Le bloc `<header class="site-header">` et le `<footer class="site-footer">` sont dupliqués statiquement dans les 4 fichiers HTML (choix cohérent pour un site statique sans générateur SSG, facilitant l'hébergement direct sur GitHub Pages ou o2switch).
  2. Quelques styles inline de mise en page (`style="margin:.35rem 0"`, `style="display:flex;gap:.55rem;flex-wrap:wrap"`) sont présents dans `mentions.html` (L. 56-65) et dans les gabarits JS (`home-v3.js` L. 209, 258 ; `securite-v3.js` L. 195). Ils ne gênent pas le fonctionnement mais gagneraient à être remplacés par des classes utilitaires dans `comet.css` si une politique CSP stricte sans `'unsafe-inline'` est activée en production.

### A.2.3 Chemins, liens internes et chargement des ressources
- Tous les liens internes entre pages (`index.html`, `securite-privee.html`, `btp.html`, `mentions.html`) et vers les ressources (`fonts.css`, `comet.css`, `comet.js`, `fonts/*.woff2`) utilisent des chemins relatifs directs, garantissant la portabilité du dossier `sites/cantara-v3/` aussi bien à la racine d'un domaine que dans un sous-répertoire.
- Les favicons sont embarqués en `data:image/svg+xml` inline (0 requête HTTP supplémentaire).

---

## A.3. AUDIT FONCTIONNEL DÉTAILLÉ (PHASE 3)

Chaque fonctionnalité, bouton, lien et formulaire a été testé individuellement par exécution réelle sous Playwright (Desktop `1440×900` et Android Pixel 7 `393×851`) et inspection du code :

| Page | Fonctionnalité / Élément | Statut | Preuve & Comportement constaté |
| :--- | :--- | :---: | :--- |
| **Toutes pages** | Lien d'évitement `.skip` (`#main`) | **OPÉRATIONNELLE** | Devient visible au premier `Tab` clavier (`top: 1rem`) et déplace le focus sur `<main id="main">`. |
| **Toutes pages** | Navigation Desktop & changement de thème En-tête | **OPÉRATIONNELLE** | Liens fonctionnels. En-tête bascule automatiquement en thème sombre (`html.in-night`) lorsqu'il survole une section `.night` ([comet.js](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/comet.js#L90-L97)). |
| **Toutes pages** | Menu Mobile (`#menuBtn`) & Clavier | **OPÉRATIONNELLE** | Testé E2E (`menuOk: true`) : clic ouvre le menu (`aria-expanded="true"`, texte `Fermer`), touche `Escape` ferme le menu (`aria-expanded="false"`) et restaure le focus sur `#menuBtn` ([comet.js](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/comet.js#L177-L182)). |
| `index.html` | CTA Hero *« Explorer les espaces métiers »* (`#espaces`) et *« Voir le système en action »* (`#systeme`) | **OPÉRATIONNELLE** | Défilement fluide vers les sections correspondantes (`scroll-margin-top: 88px`). |
| `index.html` | Fenêtre Comet — 3 onglets d'intention (`bouclier`, `planning`, `btp`) | **SIMULÉE** *(Opérationnelle en tant que démo)* | Testé E2E (`cometIntentOk: true`) : met à jour `aria-selected`, l'adresse `cantara://...`, la barre d'intention, le lien de sortie `#intentSpaceLink`, les 2 métriques et les 3 étapes de contrôle ([home-v3.js](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/home-v3.js#L80-L104)). |
| `index.html` | Fenêtre Comet — Sas `[Valider OUI]` / `[Rejeter NON]` | **SIMULÉE** *(Opérationnelle en tant que démo)* | Génère une entrée horodatée dans `#cometLog` avec empreinte FNV-1a chaînée (`hashDemo`) sur données fictives ([home-v3.js](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/home-v3.js#L106-L124)). |
| `index.html` | Manifeste lumineux au scroll (`#manifesto`) | **OPÉRATIONNELLE** | Découpe les mots en `<span class="w">` et les illumine progressivement (`.w.lit`) selon la position dans le viewport ([comet.js](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/comet.js#L120-L129)). |
| `index.html` | Cartes Espaces Métiers (`.tilt-card`) | **OPÉRATIONNELLE** | Redirigent vers `securite-privee.html` et `btp.html`. Effet de perspective 3D actif sur pointeur fin uniquement (`(pointer: fine)`). |
| `index.html` | Diagnostic d'orientation (4 questions `#diagBox`) | **OPÉRATIONNELLE** | Testé E2E : progression 25 % → 100 %, bouton `Continuer` désactivé tant qu'aucune réponse n'est choisie, bouton `Retour` fonctionnel, recommandation finale dynamique (`Sécurité Privée` ou `BTP`) + bouton `Recommencer`. |
| `index.html` | Formulaire de fin de diagnostic (`#diagContact`) | **PARTIELLE / SIMULÉE** | Validation des 4 champs (Nom, Entreprise, E-mail regex, Consentement checkbox) opérationnelle ([home-v3.js](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/home-v3.js#L281-L295)). En revanche, aucune requête réseau n'est émise (`WEBHOOK_ENABLED = false`) et un bandeau vert `.notice-ok` est affiché (**voir anomalie `ANOM-V3-01`**). |
| `securite-privee.html` | Simulateur **Bouclier Anti-Pertes** (`#bouclier`) | **OPÉRATIONNELLE** | Testé E2E (`bBefore: "-818 €"`, `bAfter: "+2 782 €"`) : calcul déterministe instantané selon le profil (ADS Nuit `22,97 €/h`, Jour `19,50 €/h`, SSIAP 1 `24,40 €/h`), le tarif facturé (`18` à `42 €/h`), le volume (`40` à `1500 h`) et la structure (`5` à `25 %`). |
| `securite-privee.html` | Aperçu **Securiaxe Director** (7 étapes `#director`) | **SIMULÉE** *(Prototype interactif)* | Testé E2E (`directorResolveOk: true`) : navigation entre les 7 onglets. À l'étape 4, clic sur `Résoudre en 1 clic [OUI]` fait passer le chevauchement de `7,0 h` (alerte rouge) à `0,0 h` (vert) avec bouton `Rejouer`. À l'étape 7, clic sur `Sceller le document [OUI]` passe l'audit SHA-256 à `Scellé`. |
| `securite-privee.html` | Boutons de redirection vers la plateforme **Securiaxe** | **OPÉRATIONNELLE** | Liens (L. 201 et L. 240) pointant vers `https://naitconv-web.github.io/cos-operations-simulateur/boutique/` (vérifié `HTTP/2 200`). |
| `btp.html` | Cockpit **Relance Devis** (3 dossiers `#cockpit`) | **SIMULÉE** *(Opérationnelle en tant que démo)* | Testé E2E (`btpOk: true`) : sélection des 3 devis (`DEV-148`, `DEV-152`, `DEV-159`), approbation `[OUI]` ou rejet `[NON]` mettant à jour le statut du Sas et le hash de trace ([btp-v3.js](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/btp-v3.js#L89-L98)). |
| `btp.html` | Simulateur **Devis récupérables** (`#simulateur`) | **OPÉRATIONNELLE** | Calcul temps réel selon le nombre de devis mensuels (`4` à `50`), le panier moyen (`800` à `25 000 €`) et le taux de récupération (`5` à `25 %`). |
| `btp.html` | Passerelle Espace BTP (`Faire le diagnostic`) | **PARTIELLE** | Le site métier indépendant BTP (`OMNIRENOV`) n'étant pas encore en ligne, le CTA renvoie vers `index.html#diagnostic`. |
| `mentions.html` | Coordonnées de contact légal (L. 62 & 74) | **PARTIELLE** | L'e-mail `nait.conv@gmail.com` et le téléphone `+33 6 17 17 99 74` sont affichés en texte brut sans balises cliquables `<a href="mailto:...">` ni `<a href="tel:...">` (**voir anomalie `ANOM-V3-03`**). |

---

## A.4. AUDIT DESIGN ET UX (PHASE 4)

- **Cohérence graphique & Direction artistique :**
  - Le mariage entre le fond papier d'ingénierie chaud (`#F4F3EE`), les panneaux vélin (`#FAF9F5`), l'encre obsidienne (`#161513`) et les scènes nocturnes (`#090D13`) offre une identité éditoriale sobre, immédiatement reconnaissable et exempte des clichés visuels de l'IA générative (pas de néons violets, pas de robots, pas d'emojis).
- **Typographie et lisibilité :**
  - Le contraste entre `Instrument Serif` (titres à forte personnalité éditoriale), `Plus Jakarta Sans` (corps de texte très lisible à `line-height: 1.65`) et `JetBrains Mono` (étiquettes techniques, traces d'audit, chiffres) crée une hiérarchie de lecture claire.
  - Les jambages des lettres italiques (`j` de *justesse*) disposent d'une réserve `padding-bottom: .24em` ([comet.css](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/comet.css#L219)) évitant toute troncature.
- **Ergonomie et Responsive (Desktop `1440×900`, Tablette `820–980px`, Mobile Android `393×851`) :**
  - Trois points de rupture bien étagés dans `comet.css` : `@media (max-width: 980px)` (passage des grilles 2 colonnes en 1 colonne et de la grille nocturne 4 colonnes en 2×2), `@media (max-width: 820px)` (bascule de la navigation en menu mobile déroulant), `@media (max-width: 620px)` (boutons Hero pleine largeur, masquage de `.comet-address` pour libérer l'en-tête de fenêtre).
  - Mesure Playwright `overflowX` sur les 4 pages en Desktop et en Mobile : **`0 px` de débordement horizontal**.

---

## A.5. AUDIT SÉCURITÉ & PROTECTION DES DONNÉES (PHASE 5)

### A.5.1 XSS, Injections et Entrées Utilisateur
- **Assainissement DOM :** Toutes les valeurs injectées via `innerHTML` dans `home-v3.js`, `securite-v3.js` et `btp-v3.js` passent par la fonction `CANTARA_MOTION.esc()` ([comet.js](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/comet.js#L21-L25)) qui échappe `&`, `<`, `>`, `"` et `'`.
- **Entrées formulaire (`#diagContact`) :** Les saisies utilisateur (`cName`, `cOrg`, `cMail`) sont uniquement lues pour validation booléenne et **ne sont jamais réinjectées dans le DOM** ([home-v3.js](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/home-v3.js#L283-L295)). Les messages d'erreur sont écrits via `textContent`. Risque XSS = **Nul**.

### A.5.2 Protection des données personnelles du dirigeant & des prospects
- **Sanctuarisation des coordonnées du fondateur :**
  - La recherche exhaustive (`rg -i "mounir|nait|mohand|06|17 17|849 261|albi" sites/cantara-v3/`) prouve que le nom `Mounir NAIT MOHAND`, l'e-mail `nait.conv@gmail.com` et le numéro `+33 6 17 17 99 74` figurent **exclusivement dans `mentions.html`** (obligations LCEN art. 6-III-1 et C. com. art. L.526-22 / R.123-237).
  - Seul le numéro `SIREN 849 261 870` figure dans le bandeau légal de pied de page des 3 autres pages.
- **Protection des prospects :** `WEBHOOK_ENABLED` est verrouillé à `false` dans `Object.freeze`. Aucune donnée saisie par un visiteur ne quitte son navigateur.

### A.5.3 Inspection de `CANTARA_PREVIEW_ACCESS.md` & Sécurité du serveur de prévisualisation
- **Constat sur `CANTARA_PREVIEW_ACCESS.md` (artefact hors dépôt) et `/home/antigravity/cantara-devtools/private_preview_server.mjs` :**
  - Le fichier `CANTARA_PREVIEW_ACCESS.md` contient des URLs de tunnel éphémère Cloudflare (`*.trycloudflare.com`) incluant en clair un jeton de connexion automatique en paramètre de requête (`?k=...`) ainsi que le couple identifiant/mot de passe en texte clair (**voir anomalie `ANOM-V3-02`**).
  - Lorsque l'utilisateur clique sur une URL avec `?k=...`, le serveur local de prévisualisation valide le jeton, pose un cookie de session `cantara_session` (`HttpOnly; SameSite=Lax; Secure; Max-Age=86400`) et redirige en `302` vers l'URL propre sans `?k=`.
  - **Risques identifiés sur ce mécanisme de prévisualisation :**
    1. Le passage d'un secret dans la query string (`?k=...`) l'expose dans l'historique du navigateur mobile et dans les journaux d'accès HTTP de Cloudflare.
    2. La valeur du cookie `cantara_session` est directement égale au secret lui-même au lieu d'un identifiant de session aléatoire découplé ou signé (HMAC).
    3. Le serveur de prévisualisation n'envoie pas encore d'en-tête `Content-Security-Policy` (CSP) ni `Referrer-Policy: no-referrer`.
  - *(Conformément aux consignes de la Phase 5, aucun secret ni mot de passe n'est reproduit dans le présent rapport).*

---

## A.6. AUDIT PERFORMANCE ET ACCESSIBILITÉ (PHASE 6)

### A.6.1 Mesures réelles obtenues sous Chromium Headless (Playwright)

| Page | Requêtes HTTP | Poids total transféré (octets) | `domInteractive` (ms) | `domContentLoaded` (ms) | `loadEventEnd` (ms) | Nœuds DOM | Erreurs Console / Réseau | `overflowX` (Desktop / Android) | Violations Axe-Core WCAG 2.1 & 2.2 AA |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `index.html` | 13 | **283 207 o** (~276 Ko) | **80 ms** | 192 ms | 244 ms | 271 | `0` / `0` | `0 px` / `0 px` | **`0` violation** |
| `securite-privee.html` | 13 | **278 406 o** (~272 Ko) | **36 ms** | 90 ms | 136 ms | 206 | `0` / `0` | `0 px` / `0 px` | **`0` violation** |
| `btp.html` | 13 | **269 661 o** (~263 Ko) | **26 ms** | 49 ms | 90 ms | 176 | `0` / `0` | `0 px` / `0 px` | **`0` violation** |
| `mentions.html` | 11 | **227 724 o** (~222 Ko) | **30 ms** | 47 ms | 87 ms | 79 | `0` / `0` | `0 px` / `0 px` | **`0` violation** |

### A.6.2 Analyse détaillée des ressources et Core Web Vitals
- **Décomposition du poids (`index.html` — 283 Ko) :**
  - HTML : `15,3 Ko` (5,4 %)
  - CSS (`comet.css` + `fonts.css`) : `29,4 Ko` (10,4 %)
  - JavaScript (`comet.js` + `home-v3.js`) : `23,1 Ko` (8,2 %)
  - Polices `.woff2` (7 à 8 fichiers chargés) : `215,4 Ko` (76,0 % — mis en cache dès la première page visitée).
  - Images bitmap : **`0 Ko`** (100 % vectoriel SVG inline).
- **JavaScript bloquant :** **`0 octet`** (tous les scripts portent l'attribut `defer`).
- **Comportement `prefers-reduced-motion` :** Parfaitement implémenté en CSS ([comet.css](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/comet.css#L574-L578)) et en JS ([comet.js](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/comet.js#L13)).

---

## A.7. AUDIT COMMERCIAL (PHASE 7)

- **Clarté et crédibilité des démonstrations existantes :**
  - Le **Bouclier Anti-Pertes** (`securite-privee.html`) et l'aperçu 7 étapes de **Securiaxe Director** apportent une preuve immédiate de compétence métier (Avenant n° 2 IDCC 1351 plancher 6 h, repos quotidien `>= 11 h`, coûts complets réalistes, Ordre de Mission CSI L.612-9).
  - La séparation entre **test gratuit sur CANTARA** et **acquisition sur la plateforme dédiée Securiaxe** élimine la confusion d'un panier e-commerce générique tout en affichant des repères tarifaires transparents (`690 €`, `980 €`, `1 450 €`, `Sur devis`).
- **Limite commerciale majeure de l'existant (`85e649a`) au regard du Cahier des Charges v1.0 :**
  - En l'état actuel, un dirigeant hors Sécurité Privée ou BTP qui visite `index.html` perçoit CANTARA comme un éditeur verticalisé sur ces deux seuls secteurs. L'étendue des capacités d'ingénierie transversale (développement sur mesure, orchestration multi-agents, intégration IA, conseil, formation privée) n'est pas exposée, ce qui restreint le potentiel de génération de demandes commerciales qualifiées B2B.

---

## A.8. AUDIT DE COHÉRENCE ET NON-RÉGRESSION (PHASE 8)

Comparaison factuelle entre les 3 versions présentes dans le dépôt Git :

| Critère | Phase 2 Hybride (`main` @ `4325f67`) | V2 Portfolio (`cantara/v2-portfolio` @ `f41cf74`) | **V3 Épurée Comet (`cantara/v3-epure-comet` @ `85e649a`)** |
| :--- | :--- | :--- | :--- |
| **Périmètre géographique** | France + Algérie (`sites/france/`, `sites/algerie/`) | France uniquement | **France uniquement (`0` mention Algérie/DZD)** |
| **Marques utilisées** | CANTARA + résidus techniques `syntesia-*` | CANTARA + Securiaxe | **CANTARA + Securiaxe (`0` Syntesia / Omnisecur)** |
| **Architecture commerciale** | Vitrine + page `offres.html` multi-marchés | Boutique intégrée (`commander.html` + Proforma A4 sur CANTARA) | **Vitrine épurée + Espaces Métiers → Redirection vers sites dédiés (ex. Securiaxe)** |
| **Direction artistique** | Papier/Nuit Refero classique | Grille portfolio dense orientée catalogue | **ADN CANTARA × Cinétique Comet (orbites SVG, fenêtre 3D au scroll, barre d'intention, tilt 3D)** |
| **Aperçu Securiaxe Director** | Absent | Présent (7 étapes) | **Conservé et épuré (7 étapes + résolution conflit 1-clic + scellement SHA-256)** |
| **Données personnelles fondateur** | Absentes ou en `[À COMPLÉTER]` | Présentes dans `mentions.html` | **Strictement isolées dans `mentions.html` (`0` exposition sur le reste du site)** |
| **Accessibilité WCAG AA** | 0 violation (après correctifs `9d51a38`) | 0 violation | **0 violation Desktop & Mobile** |

---

## A.9. REGISTRE COMPLET DES ANOMALIES DE L'EXISTANT (P0 / P1 / P2 / P3)

*Constat : Aucune anomalie P0 (plantage ou faille critique) n'est présente sur le commit `85e649a`. Quatre anomalies (1 P1 fonctionnelle/conformité cahier des charges, 2 P2 sécurité prévisualisation/conversion, 1 P3 ergonomie) sont documentées ci-dessous avec leurs preuves exactes.*

### `ANOM-V3-01` — Confirmation visuelle verte sur formulaire sans transmission serveur
- **Gravité :** **P1 (Majeure — Non-conformité directe avec la Partie II §F et Partie V §10.9 du Cahier des Charges)**
- **Fichier et lignes concernés :** [home-v3.js](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/home-v3.js#L281-L295) et [comet.css](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/comet.css#L507).
- **Preuve :**
  ```javascript
  // sites/cantara-v3/home-v3.js L.293-294
  document.getElementById('diagNotice').innerHTML =
    '<div class="notice notice-ok">Demande enregistrée localement (mode pré-production · WEBHOOK_ENABLED = false). Aucune donnée transmise sur Internet.</div>';
  ```
- **Conséquence :** Bien que le texte mentionne honnêtement `mode pré-production` et `Aucune donnée transmise sur Internet`, l'utilisation de la classe verte `.notice-ok` (`color: #166534; background: #E7F5EC`) associée au libellé de bouton `Enregistrer ma demande` donne l'impression visuelle d'une soumission réussie alors qu'aucun serveur n'a reçu la demande et que les données sont perdues au rechargement de la page.
- **Correction recommandée :** Tant que `WEBHOOK_ENABLED === false`, ne jamais afficher `.notice-ok`. Afficher un encadré d'avertissement ambre explicite indiquant que l'envoi serveur est désactivé et proposer deux boutons d'action réelle : (1) ouvrir le client mail du visiteur avec un `mailto:` pré-rempli contenant sa synthèse, ou (2) copier le récapitulatif dans le presse-papiers.
- **Test de validation :** Soumettre `#diagContact` sous Playwright et vérifier qu'aucun élément `.notice-ok` n'apparaît lorsque `WEBHOOK_ENABLED === false` et que le lien d'action alternative est fonctionnel.

### `ANOM-V3-02` — Exposition du jeton d'authentification dans l'URL (`?k=`) sur l'infrastructure de prévisualisation
- **Gravité :** **P2 (Sécurité de l'outillage de prévisualisation hors dépôt)**
- **Fichiers concernés :** Artefact `CANTARA_PREVIEW_ACCESS.md` et script hors dépôt `/home/antigravity/cantara-devtools/private_preview_server.mjs`.
- **Preuve :** Les liens 1-clic de `CANTARA_PREVIEW_ACCESS.md` transmettent le mot de passe en paramètre GET `?k=...`, et l'en-tête `Set-Cookie: cantara_session=<secret>` réutilise ce même secret comme valeur de cookie. Par ailleurs, aucun en-tête `Content-Security-Policy` ni `Referrer-Policy: no-referrer` n'est envoyé par `private_preview_server.mjs`.
- **Conséquence :** Le secret de prévisualisation apparaît dans les journaux de requêtes HTTP du tunnel et dans l'historique du navigateur mobile.
- **Correction recommandée :** (1) Ajouter `Referrer-Policy: no-referrer` et une `Content-Security-Policy` stricte sur le serveur de prévisualisation ; (2) Remplacer la valeur du cookie par un jeton de session HMAC distinct du mot de passe ; (3) Purger les fichiers et sessions de prévisualisation dès la clôture de la recette mobile.
- **Test de validation :** Vérifier via `curl -sI` la présence de `Referrer-Policy: no-referrer` et `Content-Security-Policy`, et vérifier que `Set-Cookie` ne contient plus le mot de passe en clair.

### `ANOM-V3-03` — Coordonnées légales non cliquables dans `mentions.html`
- **Gravité :** **P3 (Ergonomie mobile & accessibilité de contact légal)**
- **Fichier et lignes concernés :** [mentions.html](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/mentions.html#L62-L74).
- **Preuve :**
  ```html
  <!-- sites/cantara-v3/mentions.html L.62 -->
  <p style="margin:.35rem 0"><strong>Contact légal B2B :</strong> nait.conv@gmail.com · Tél. : +33 6 17 17 99 74</p>
  ```
- **Conséquence :** Sur smartphone, le visiteur consultant les mentions légales ne peut pas appuyer directement sur l'adresse e-mail ou le numéro de téléphone pour déclencher un appel ou un courriel.
- **Correction recommandée :** Encapsuler l'e-mail dans `<a href="mailto:nait.conv@gmail.com">nait.conv@gmail.com</a>` et le téléphone dans `<a href="tel:+33617179974">+33 6 17 17 99 74</a>` (exclusivement dans `mentions.html`).
- **Test de validation :** Vérifier sous Playwright la présence des sélecteurs `a[href^="mailto:"]` et `a[href^="tel:"]` dans `mentions.html` et leur absence totale dans les autres pages.

### `ANOM-V3-04` — Chargement initial des 8 variantes de polices `.woff2` (~215 Ko)
- **Gravité :** **P3 (Optimisation de performance sur réseaux mobiles dégradés)**
- **Fichier et lignes concernés :** [fonts.css](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/fonts.css#L1-L74).
- **Preuve :** Les 4 graisses de `Plus Jakarta Sans` (400, 500, 600, 700), les 2 styles d'`Instrument Serif` (400 normal, 400 italic) et les 2 graisses de `JetBrains Mono` (400, 500) sont toutes sollicitées dès la page d'accueil (215 448 octets sur 283 207 octets).
- **Conséquence :** Bien que le chargement local s'effectue en `244 ms` et bénéficie de `font-display: swap`, les polices représentent 76 % du poids initial.
- **Correction recommandée :** Conserver l'auto-hébergement local (zéro requête Google Fonts), mais fusionner les usages `font-weight: 500` et `600` ou précharger (`<link rel="preload" as="font" type="font/woff2" crossorigin>`) uniquement les 3 fichiers critiques au-dessus de la ligne de flottaison (`instrument-serif-400-normal`, `plus-jakarta-sans-400-normal`, `jetbrains-mono-400-normal`).
- **Test de validation :** Mesurer la réduction du nombre d'octets critiques au premier rendu sous Playwright Network monitor.

---
---

# PARTIE B — SPÉCIFICATION UX/UI & CAHIER DES CHARGES INTERACTIF (`CANTARA-V3-UX-INTERACTIVE-SPEC`)

*Cette partie présente les 7 livrables structurés permettant au PDG d'arbitrer l'évolution de CANTARA V3 vers la vitrine institutionnelle, le portfolio 3 solutions et le CANTARA LAB définis dans le Cahier des Charges v1.0.*

---

## LIVRABLE 1 — SYNTHÈSE DE L'INVENTAIRE & VÉRIFICATION DE L'ÉCOSYSTÈME (ÉTAPES A & E)

### 1.1 Vérification factuelle des marques et interdictions
- **`CANTARA` (marque institutionnelle et commerciale) :** Utilisée sur l'ensemble de `sites/cantara-v3/` avec mention légale prudente *« CANTARA (nom commercial provisoire) · Entreprise Individuelle SIREN 849 261 870 »*.
- **`SECURIAXE` (solution sécurité privée) :** Présente et active dans `index.html` et `securite-privee.html`.
- **`OMNIRENOV` (solution BTP et rénovation) :** Référencée dans le registre mémoire du dépôt (`PROJ-RENOV : RELANCE-DEVIS / OMNIRENOV` dans [REGISTRE_MEMOIRE.md](file:///home/antigravity/naitconv-web/agia-infrastructure/docs/harness/REGISTRE_MEMOIRE.md)), mais non encore affichée sous son nom `OMNIRENOV` dans `sites/cantara-v3/` (qui utilise le titre générique *« BTP & Rénovation — Relance Devis »*).
- **`OMNIPATRIMOINE` (solution gestion patrimoniale en incubation) :** Référencée dans [REGISTRE_MEMOIRE.md](file:///home/antigravity/naitconv-web/agia-infrastructure/docs/harness/REGISTRE_MEMOIRE.md) au statut `PROPOSED (Séquencé)`, absente en tant que carte dédiée dans `sites/cantara-v3/`.
- **`SYNTESIA` et `OMNISECUR` (appellations historiques interdites) :** Vérification par `rg -i "syntesia|omnisecur" sites/cantara-v3/` → **`0` occurrence** dans les interfaces V3. Les archives, anciens commits et journaux historiques du dépôt n'ont subi aucune réécriture.

### 1.2 Vérification factuelle des URL des sites métiers indépendants

| Solution | URL identifiée dans les sources accessibles | Test d'accessibilité réel (`curl -sI`) | Statut retenu pour la spécification |
| :--- | :--- | :--- | :--- |
| **SECURIAXE** *(Boutique & Portail GitHub Pages)* | `https://naitconv-web.github.io/cos-operations-simulateur/boutique/` *(et racine `/cos-operations-simulateur/`)* | **`HTTP/2 200 OK`** (`server: GitHub.com`, `content-type: text/html; charset=utf-8`) | **URL vérifiée et opérationnelle** *(à confirmer par le PDG comme cible par défaut)* |
| **SECURIAXE** *(Domaine dédié cible)* | `https://idcc1351.fr` *(cité dans `CP-AGIA-SECURIAXE-001.json`)* | **Échec de connexion / Timeout** depuis l'environnement d'audit | **URL à confirmer** avant tout basculement DNS |
| **OMNIRENOV** *(BTP & Rénovation)* | Aucune URL externe ni dépôt GitHub dédié trouvé sur le compte `naitconv-web` | Non applicable (aucun domaine publié) | **`URL à confirmer`** *(maintenir la démonstration interne sur CANTARA en attendant)* |
| **OMNIPATRIMOINE** *(Gestion patrimoniale)* | Projet en phase d'incubation (Niveau 3 du portefeuille LAB) | Non applicable | **`En incubation`** *(aucune redirection externe commerciale)* |

---

## LIVRABLE 2 — MATRICE COMPLÈTE DE CONFORMITÉ AU CAHIER DES CHARGES V1.0 (ÉTAPE B)

| Réf. | Exigence du Cahier des Charges v1.0 | Statut actuel (`85e649a`) | Fichiers concernés & Preuves | Action recommandée | Priorité / Lot |
| :--- | :--- | :---: | :--- | :--- | :---: |
| **I.1** | Vitrine technologique institutionnelle et commerciale (ne pas être perçue comme limitée à la sécurité ou au BTP) | **Non conforme** | [index.html](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/index.html#L11-L74) centre le titre et le sous-titre sur *« Systèmes opérationnels IA par métier »* et n'expose que Sécurité et BTP. | Repositionner `index.html` sur l'ingénierie technologique transversale + portfolio + LAB. | **P0 — Lot 1** |
| **I.2** | Signature *« L'ingénierie au service de votre performance. »* + Engagements *« Proximité · Confidentialité · Fiabilité »* | **Non conforme** | Absents de [index.html](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/index.html). Le Hero affiche actuellement *« Vos opérations, orchestrées avec justesse. »* | Intégrer la signature officielle et les 3 engagements dès l'en-tête et le Hero. | **P0 — Lot 1** |
| **II.3.A** | Hero : Signature + proposition de valeur concise + visuel technologique animé maîtrisé + CTA 1 *« Explorer notre ingénierie »* + CTA 2 *« Découvrir nos solutions »* | **Partiellement conforme** | Visuel orbital SVG animé présent ([index.html](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/index.html#L48-L61)), mais textes et CTA (`Explorer les espaces métiers` / `Voir le système en action`) différents. | Mettre à jour le Hero et ses deux boutons d'action (`#ingenierie` et `#portfolio`). | **P0 — Lot 1** |
| **II.3.B** | Section **« Notre ingénierie »** : 8 capacités transversales illustrées chacune par un exemple concret sans prétendre qu'une démo est un produit commercialisé | **Non conforme** | Section absente de [index.html](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/index.html). | Créer la section `#ingenierie` structurant les 8 capacités avec un exemple concret et un badge de statut par carte. | **P0 — Lot 1** |
| **II.3.C** | **Portfolio des solutions** : cartes indépendantes (`Nom`, `Secteur`, `Problématique`, `Proposition de valeur`, `Aperçu interface`, `Démo`, `Redirection`) pour `SECURIAXE`, `OMNIRENOV`, `OMNIPATRIMOINE` (*En incubation*) | **Partiellement conforme** | [index.html](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/index.html#L153-L189) ne comporte que 2 cartes ; `OMNIRENOV` n'est pas nommé ; `OMNIPATRIMOINE` n'a pas de carte. | Étendre `.spaces-grid` à 3 cartes complètes conformes au schéma 7 champs, avec badge visible **`En incubation`** sur `OMNIPATRIMOINE`. | **P0 — Lot 1** |
| **II.3.D.1** | **CANTARA LAB — Expérience 1 :** Orchestration multi-agents (5 étapes + lancer/voir/sélectionner un agent/consulter sa mission/observer le flux) | **Non conforme** | Absente de [index.html](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/index.html) et [home-v3.js](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/home-v3.js). | Créer le simulateur d'orchestration multi-agents interactif au sein de la fenêtre Comet du LAB. | **P1 — Lot 2** |
| **II.3.D.2** | **CANTARA LAB — Expérience 2 :** Automatisation d'un processus métier (Entrée → Règle → Action → Notification → Résultat) sans jargon | **Partiellement conforme** | [home-v3.js](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/home-v3.js#L16-L74) affiche 3 étapes statiques avec boutons `[OUI]/[NON]`, sans visualisation séquentielle des 5 maillons du processus. | Créer le pipeline visuel en 5 étapes déclenchable par le visiteur. | **P1 — Lot 2** |
| **II.3.D.3** | **CANTARA LAB — Expérience 3 :** Démonstrations métiers (`SECURIAXE`, `OMNIRENOV` avec coordination chantier + relance, aperçu exploratoire `OMNIPATRIMOINE`) | **Partiellement conforme** | Démos `SECURIAXE` et BTP existantes sur leurs pages dédiées, mais non regroupées dans l'Expérience 3 du LAB avec `OMNIRENOV` (incluant gestion/coordination de chantier) et `OMNIPATRIMOINE`. | Intégrer l'onglet Expérience 3 dans le LAB + enrichir `OMNIRENOV` d'un volet coordination de chantier + aperçu exploratoire `OMNIPATRIMOINE`. | **P1 — Lot 2** |
| **II.3.E** | Section **« Services et accompagnement »** (7 prestations : Conseil/cadrage, Dév spécifique, Automatisation, Intégration IA, Accompagnement équipes, Formation privée, Maintenance/évolution) | **Non conforme** | Absente de [index.html](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/index.html). | Créer la section `#services` à 3 piliers regroupant les 7 prestations. | **P0 — Lot 1** |
| **II.3.F** | **Contact et conversion** : 4 motifs + aucune confirmation fictive sans transmission serveur réelle | **Non conforme** | Formulaire actuel ([home-v3.js](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/home-v3.js#L263-L295)) sans sélecteur des 4 motifs et affichant un bandeau vert `.notice-ok` hors ligne (`ANOM-V3-01`). | Créer la section `#contact` avec les 4 motifs + supprimer `.notice-ok` hors ligne au profit d'un envoi `mailto:` pré-rempli / copie locale. | **P0 — Lot 3** |
| **III.4-6** | Direction artistique **Hybride maîtrisé** (univers institutionnel + univers technologique), respect de `prefers-reduced-motion`, zéro vidéo lourde, zéro scroll forcé | **Conforme** | [comet.css](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/comet.css) combine le thème Papier `#F4F3EE` et le thème Nuit `#090D13`, avec désactivation complète des animations sous `@media (prefers-reduced-motion: reduce)` (L. 574-578). | Conserver cette direction artistique et ses garde-fous cinétiques. | **Conforme** |
| **III.7** | Performance et accessibilité (mobile-first, clavier, contrastes AA, zones tactiles, démos sans inscription) | **Conforme** | Mesures Playwright Phase 6 : `0` violation Axe-Core WCAG 2.1/2.2 AA, `overflowX = 0`, chargement `< 250 ms`. | Maintenir ce niveau d'exigence sur les nouveaux composants des Lots 1 à 3. | **Conforme** |
| **IV.8** | Règles de transparence : identification systématique (`Fonctionnalité opérationnelle`, `Prototype`, `Simulation`, `Incubation`), données fictives, zéro faux témoignage/logo | **Partiellement conforme** | Données fictives explicitement signalées et zéro faux témoignage, mais les 4 badges normalisés ne sont pas encore appliqués uniformément à chaque carte et démo. | Standardiser les 4 badges `.status-badge` sur toutes les cartes et démonstrations. | **P0 — Lot 1** |
| **IV.9** | Redirections vérifiées vers sites métiers + suivi analytique des clics sortants | **À arbitrer** | URL GitHub Pages `SECURIAXE` vérifiée `200 OK` ; URL `OMNIRENOV` non établie (`URL à confirmer`) ; aucun écouteur analytique sur les clics sortants. | Arbitrer les URLs avec le PDG + ajouter le suivi local/serveur sans cookie sur les liens sortants. | **P1 — Lot 3** |

---

## LIVRABLE 3 — CAHIER DES CHARGES UX/UI DÉTAILLÉ (ÉTAPE C)

### 3.1 Arborescence cible et Architecture de navigation

#### Pages du site CANTARA V3 cible
1. **`index.html` — Vitrine Institutionnelle, Portfolio & CANTARA LAB** (point d'entrée central structuré selon les sections **A à F** de la Partie II).
2. **`securite-privee.html` — Démonstrateur approfondi SECURIAXE** (Bouclier Anti-Pertes + Prototype interactif 7 étapes Securiaxe Director + Passerelle vers le site officiel Securiaxe).
3. **`btp.html` (recommandé : alias ou renommage de titre en Espace `OMNIRENOV`) — Démonstrateur approfondi OMNIRENOV** (Coordination de chantier & conformité sous-traitants + Cockpit Relance Devis J+3/J+7 + Simulateur de potentiel).
4. **`mentions.html` — Mentions Légales LCEN & Politique RGPD** (unique page contenant les coordonnées personnelles obligatoires de l'Entrepreneur Individuel, avec liens `mailto:` et `tel:` cliquables).

#### Architecture de l'en-tête (`#siteHeader`)
- **Identité (gauche) :** Logo géométrique CANTARA + Nom `Cantara` + Signature courte `Ingénierie & Systèmes` (ou `Proximité · Confidentialité · Fiabilité`).
- **Liens de navigation (centre, `<nav id="mainNav">`) :**
  - `Notre ingénierie` (`#ingenierie`)
  - `Solutions` (`#portfolio`)
  - `Cantara Lab` (`#lab`)
  - `Services` (`#services`)
  - `Contact` (`#contact`)
- **CTA d'en-tête (droite) :** Bouton pilule `Demander une consultation` (`#contact`).
- **Menu Mobile (`<= 820px`) :** Bouton `Menu` / `Fermer` (`aria-expanded`, fermeture à la touche `Escape` avec retour du focus clavier, fermeture automatique au clic sur une ancre).

### 3.2 Parcours Visiteur Cibles
- **Parcours 1 — Décideur B2B / Direction Générale cherchant un partenaire d'ingénierie IA ou logicielle :**
  1. Arrive sur le **Hero (Section A)** : lit la signature *« L'ingénierie au service de votre performance. »* et les 3 engagements *« Proximité · Confidentialité · Fiabilité »*.
  2. Clique sur le CTA principal **« Explorer notre ingénierie »** → descend vers la **Section B (`#ingenierie`)**.
  3. Découvre les **8 capacités transversales** et leurs exemples concrets (développement sur mesure, automatisation, IA, multi-agents, intégration systèmes, conseil, formation privée, maintenance).
  4. Poursuit vers le **CANTARA LAB (Section D, `#lab`)** : lance l'**Expérience 1 (Orchestration multi-agents)**, clique sur chaque agent pour inspecter sa mission, puis teste l'**Expérience 2 (Automatisation d'un processus métier)**.
  5. Consulte la **Section E (`#services`)** pour identifier le cadre d'intervention, puis remplit une **Demande de consultation** dans la **Section F (`#contact`)**.
- **Parcours 2 — Dirigeant de société de Sécurité Privée ou d'entreprise du BTP :**
  1. Arrive sur le **Hero (Section A)** et clique sur le CTA secondaire **« Découvrir nos solutions »** → descend vers le **Portfolio (Section C, `#portfolio`)**.
  2. Identifie immédiatement la carte **`SECURIAXE`** ou **`OMNIRENOV`** avec sa problématique métier, sa proposition de valeur et son badge de statut.
  3. Teste l'aperçu interactif directement dans l'**Expérience 3 du CANTARA LAB** ou ouvre la page de démonstration dédiée (`securite-privee.html` / `btp.html`).
  4. Clique sur le bouton de redirection vérifié vers le site métier officiel pour approfondir ou acquérir la solution.
- **Parcours 3 — Professionnel du Patrimoine (CGP) ou secteur en veille :**
  1. Consulte la 3e carte du Portfolio : **`OMNIPATRIMOINE`**, clairement identifiée par le badge **`[En incubation]`**.
  2. Visualise l'aperçu exploratoire dans le **CANTARA LAB** (sans aucune promesse de disponibilité commerciale immédiate).
  3. Utilise la **Section F (`#contact`)** avec le motif *« Présentation d'un besoin métier »* pour échanger sur ses enjeux documentaires.

### 3.3 Wireframes détaillés des 6 sections de `index.html` (Sections A à F)

#### SECTION A — Accueil : Hero Section (`#top`)
```text
=====================================================================================
  [●] PROXIMITÉ · CONFIDENTIALITÉ · FIABILITÉ
  (Arrière-plan : 3 courbes orbitales SVG fines + flux de particules discrètes)

                L'ingénierie au service
                 de votre performance.

  Conception logicielle sur mesure, automatisation déterministe, intelligence
  artificielle et orchestration multi-agents pour les entreprises qui exigent
  des systèmes fiables, lisibles et maîtrisés.

       [ Explorer notre ingénierie → ]         ( Découvrir nos solutions )

  ARCHITECTURE LOGICIELLE · SYSTÈMES MULTI-AGENTS · SOLUTIONS MÉTIERS · FRANCE
=====================================================================================
```

#### SECTION B — Notre Ingénierie (`#ingenierie`)
- **En-tête de section :**
  - Surtitre mono : `[CAPACITÉS TRANSVERSALES]`
  - Titre H2 : `Notre ingénierie.`
  - Chapeau : *« Au-delà de nos solutions dédiées, CANTARA conçoit, intègre et maintient des architectures technologiques adaptées à vos contraintes opérationnelles. »*
- **Grille des 8 capacités (`.eng-grid` : 4 colonnes Desktop, 2 colonnes Tablette, 1 colonne Mobile) :**

| # | Capacité | Description opérationnelle | Exemple concret illustré sur la carte | Badge de statut |
| :-: | :--- | :--- | :--- | :--- |
| **01** | **Développement logiciel sur mesure** | Conception d'applications métiers robustes, moteurs de règles déterministes et interfaces de pilotage sans dépendance inutile. | *Exemple :* Moteur de planification à 6 verrous réglementaires temps réel et scellement d'audit SHA-256. | `Prototype certifié` |
| **02** | **Automatisation des processus** | Fiabilisation des tâches répétitives à forte valeur ajoutée sous contrôle humain explicite. | *Exemple :* Chaîne de détection et de relance courtoise de devis J+3/J+7 bornée aux heures ouvrées (08h30–19h00). | `Simulation active` |
| **03** | **Intégration de l'intelligence artificielle** | Déploiement pragmatique de modèles de langage pour l'analyse, la synthèse et l'aide à la décision, avec protection stricte des données. | *Exemple :* Passerelle de pseudonymisation automatique masquant les identités avant toute analyse IA. | `Prototype` |
| **04** | **Conception et orchestration de systèmes multi-agents** | Coordination d'agents spécialisés (analyse, conformité, chiffrage, audit) travaillant en séquence vérifiable. | *Exemple :* Chaîne multi-agents d'examen d'un cahier des charges avec contrôle croisé et Sas de décision dirigeant. | `Simulation Lab` |
| **05** | **Intégration d'outils et de systèmes métiers** | Connexion fluide entre vos référentiels existants (tableurs d'exploitation, CRM, exports comptables et documentaires). | *Exemple :* Génération déterministe de liasses réglementaires et de devis/proformas A4 à partir des données d'exploitation. | `Opérationnel` |
| **06** | **Accompagnement et conseil technologique** | Audit de vos flux actuels, cadrage fonctionnel et choix d'architectures sobres adaptées à votre maturité. | *Exemple :* Diagnostic d'architecture de 3 minutes et feuille de route d'automatisation par paliers. | `Prestation B2B` |
| **07** | **Formation privée et transfert de compétences** | Sessions dédiées aux dirigeants et équipes opérationnelles pour garantir une autonomie complète sur les systèmes déployés. | *Exemple :* Atelier privé de 2 heures pour la prise en main d'un poste de commandement opérationnel. | `Prestation B2B` |
| **08** | **Maintenance et évolution des solutions** | Suivi correctif, mise à jour des règles métiers ou barèmes réglementaires et évolutions fonctionnelles. | *Exemple :* Actualisation des seuils conventionnels et maintien en condition opérationnelle selon le périmètre contractuel. | `Selon contrat` |

#### SECTION C — Portfolio des Solutions (`#portfolio`)
- **En-tête de section :**
  - Surtitre mono : `[PORTFOLIO DES SOLUTIONS]`
  - Titre H2 : `Nos solutions métiers.`
  - Chapeau : *« Chaque solution née de l'ingénierie CANTARA répond à une problématique sectorielle précise. Testez nos démonstrations ici avant de rejoindre le site officiel de chaque solution. »*
- **Grille de 3 cartes indépendantes (`.portfolio-grid` : 3 colonnes Desktop, 1 colonne empilée sous 980 px)** contenant chacune les **7 éléments obligatoires** (voir Livrable 4.2).

#### SECTION D — Expérience Interactive : CANTARA LAB (`#lab`)
- **En-tête de section (Scène nocturne `#090D13`) :**
  - Surtitre mono : `[CANTARA LAB · DÉMONSTRATIONS INTERACTIVES]`
  - Titre H2 : `Manipulez notre ingénierie en direct.`
  - Chapeau : *« Trois expériences interactives sans inscription pour éprouver nos mécanismes d'orchestration multi-agents, d'automatisation de processus et nos simulateurs métiers. Données 100 % fictives. »*
- **Composant central `.comet-window[data-scroll-3d]` :**
  - Barre supérieure avec indicateur d'adresse dynamique (`cantara://lab/experience-01-multi-agents`) et badge de transparence réglementaire.
  - Sélecteur principal à 3 grands onglets (`role="tablist"`) :
    1. **`01 · Orchestration Multi-Agents`**
    2. **`02 · Automatisation de Processus`**
    3. **`03 · Démonstrations Métiers (Securiaxe · Omnirenov · Omnipatrimoine)`**

#### SECTION E — Services et Accompagnement (`#services`)
- **En-tête de section :**
  - Surtitre mono : `[INGÉNIERIE SUR MESURE & ACCOMPAGNEMENT]`
  - Titre H2 : `Un accompagnement structuré, loin des agences généralistes.`
  - Chapeau : *« Nous n'intervenons que là où notre ingénierie logicielle, nos automatisations et nos architectures IA apportent un gain opérationnel mesurable et vérifiable. »*
- **Architecture en 3 blocs d'engagement regroupant les 7 prestations :**
  1. **Bloc I — Cadrage & Architecture (`01. Conseil et cadrage technologique` · `02. Développement spécifique`) :** Définition du périmètre exact, modélisation des règles métiers déterministes et réalisation de briques logicielles propriétaires.
  2. **Bloc II — Automatisation & Systèmes IA (`03. Automatisation` · `04. Intégration IA`) :** Mise en place de flux automatisés sous Sas de validation humaine et intégration d'assistants IA respectueux de la confidentialité (pseudonymisation, zéro réentraînement externe).
  3. **Bloc III — Transfert & Pérennité (`05. Accompagnement des équipes` · `06. Formation privée` · `07. Maintenance et évolution`) :** Prise en main opérationnelle par vos collaborateurs et évolution continue de la solution selon le périmètre contractuel défini.

#### SECTION F — Contact et Conversion (`#contact`)
- **Structure bicolonne (`.contact-split`) :**
  - **Colonne gauche — Qualification rapide & Engagements :**
    - Sélection directe du **motif de la demande** parmi les 4 options officielles :
      1. `Demande de consultation`
      2. `Présentation d'un besoin métier`
      3. `Demande de démonstration`
      4. `Prise de contact professionnelle`
    - Option d'aide au choix : accès en 1 clic à l'assistant de diagnostic en 4 questions (3 minutes) qui pré-remplit automatiquement le motif et le secteur.
    - Rappel des 3 engagements : *Proximité (interlocuteur direct en France) · Confidentialité (zéro traceur, purge à 30 jours) · Fiabilité (réponse cadrée sur jours ouvrés 08h30–19h00)*.
  - **Colonne droite — Formulaire professionnel B2B sans fausse confirmation :**
    - Champs : `Motif de contact` (`<select>`), `Nom & Prénom *`, `Entreprise / Organisation *`, `Secteur d'activité`, `E-mail professionnel *`, `Synthèse de votre besoin ou contexte *` (`<textarea>`), `Case de consentement RGPD *`.
    - **Mécanisme strict anti-fausse confirmation :**
      - Tant que `WEBHOOK_ENABLED === false`, aucun message vert de succès n'est affiché. La validation génère un bloc de synthèse structuré avec un bandeau d'état transparent (*« Mode pré-production sans serveur de réception automatique : utilisez l'un des deux boutons ci-dessous pour transmettre réellement votre demande »*) accompagné d'un bouton **`[ Ouvrir ma messagerie avec ce dossier pré-rempli ]`** (`mailto:`) et d'un bouton **`[ Copier la synthèse ]`**.

---

### 3.4 Description précise des 3 Expériences du CANTARA LAB (6 points réglementaires par démonstration)

#### EXPÉRIENCE 1 — Orchestration Multi-Agents
| Rubrique exigée | Spécification précise |
| :--- | :--- |
| **Statut affiché** | Badge **`[SIMULATION · ORCHESTRATION MULTI-AGENTS SUR DONNÉES FICTIVES]`** |
| **1. Écran initial** | **Zone gauche (Graphe d'orchestration) :** Schéma vectoriel interactif de 5 nœuds : `(1) Réception Demande` → `(2) Agent Cadrage & Analyse` → distribution parallèle vers `(3A) Agent Conformité & Règles` et `(3B) Agent Chiffrage & Marges` → convergence vers `(4) Agent Auditeur & Sas Humain`. Sélecteur de mission en haut (*Mission A : Audit et chiffrage d'un contrat multi-sites* / *Mission B : Analyse de conformité d'un dossier fournisseur*).<br>**Zone droite (Inspecteur d'Agent) :** Fiche détaillée de l'agent sélectionné (`Nom de l'agent`, `Mission assignée`, `Entrées analysées`, `Règle déterministe appliquée`, `Sortie produite`). |
| **2. Action du visiteur** | 1. Clique sur **`[ Lancer la simulation ▶ ]`** (ou **`[ Étape par étape → ]`**).<br>2. Clique librement sur n'importe lequel des **agents spécialisés** du graphe pour inspecter sa mission et son flux de traitement. |
| **3. Réaction de l'interface** | Le graphe active séquentiellement les nœuds et fait circuler une impulsion lumineuse sur les connecteurs SVG. Lorsqu'un agent est sélectionné au clic ou au clavier (`Enter`/`Space`), un contour ambre `--signal` l'entoure et le panneau de droite affiche instantanément sa mission, ses garde-fous et le journal horodaté de son intervention. |
| **4. Étapes de l'animation** | **Étape 1 — Réception d'une demande (0,0 s) :** Enregistrement de la requête entrante dans le journal (`REQ-2026-089`).<br>**Étape 2 — Analyse de la mission (0,7 s) :** L'*Agent Cadrage* structure la demande en 3 contraintes (réglementaire, calendaire, financière).<br>**Étape 3 — Attribution aux agents spécialisés (1,4 s) :** L'orchestrateur distribue les sous-tâches à l'*Agent Conformité*, l'*Agent Chiffrage* et l'*Agent Opérations*.<br>**Étape 4 — Exécution des tâches simulées (2,1 s) :** Chaque agent exécute ses contrôles déterministes (ex. détection d'une anomalie de marge ou d'une pièce manquante) et passe au statut `Exécuté ✓`.<br>**Étape 5 — Contrôle et restitution du résultat (2,8 s) :** L'*Agent Auditeur* consolide les sorties, génère l'empreinte de contrôle FNV-1a/SHA-256 et présente le rapport final au Sas de décision humaine `[OUI] / [NON]`. |
| **5. Résultat présenté** | Tableau de synthèse affichant : `4 agents mobilisés`, `3 verrous critiques contrôlés`, `1 anomalie interceptée avant émission`, et la fiche d'audit complète consultable agent par agent. |
| **6. CTA final** | **`[ Étudier une architecture multi-agents pour mon entreprise → ]`** (scroll vers `#contact` avec pré-sélection du motif *« Présentation d'un besoin métier »*). |

#### EXPÉRIENCE 2 — Automatisation d'un Processus Métier
| Rubrique exigée | Spécification précise |
| :--- | :--- |
| **Statut affiché** | Badge **`[SIMULATION · AUTOMATISATION DE PROCESSUS MÉTIER]`** |
| **1. Écran initial** | Barre de choix de scénario en langage courant (sans jargon technique) :<br>• *Scénario 1 :* Suivi automatisé d'un devis resté sans réponse après 7 jours.<br>• *Scénario 2 :* Vigilance automatique sur une attestation légale arrivant à expiration.<br>En dessous : **Frise de 5 blocs visuels** (`1. Entrée de données` → `2. Règle métier` → `3. Action automatisée` → `4. Notification` → `5. Résultat final`) à l'état initial `En attente`. |
| **2. Action du visiteur** | Le visiteur choisit un scénario (ou modifie un paramètre simple comme le délai `J+3` / `J+7` ou l'horaire simulé `10h30 ouvré` vs `21h15 hors créneau`) puis clique sur **`[ Déclencher le scénario ▶ ]`**. |
| **3. Réaction de l'interface** | Les 5 blocs s'allument l'un après l'autre. Si l'utilisateur a choisi un horaire hors créneau (`21h15`), le bloc `2. Règle métier` intercepte l'envoi et démontre visuellement la mise en attente jusqu'au lendemain `08h30`. |
| **4. Étapes de l'animation** | **1. Entrée de données :** Lecture du dossier (`Devis #148 — 11 400 € — 7 jours sans retour`).<br>**2. Règle métier :** Contrôle automatique des conditions (*Attestations à jour + Créneau ouvré 08h30–19h00 + Moins de 2 relances*).<br>**3. Action automatisée :** Génération du message personnalisé et courtois avec mention de désinscription.<br>**4. Notification :** Alerte envoyée au responsable dans son tableau de bord pour validation en un clic.<br>**5. Résultat final :** Action journalisée, dossier mis à jour et temps opérationnel économisé affiché. |
| **5. Résultat présenté** | Encadré synthétique en langage dirigeant : *« Ce qui demandait une vérification manuelle dans 3 fichiers différents est préparé automatiquement, sans jamais partir sans votre accord. »* |
| **6. CTA final** | **`[ Identifier les processus automatisables dans mon activité → ]`** (scroll vers `#contact` avec pré-sélection du motif *« Demande de démonstration »*). |

#### EXPÉRIENCE 3 — Démonstrations Métiers (`SECURIAXE` · `OMNIRENOV` · `OMNIPATRIMOINE`)
| Rubrique exigée | Spécification précise |
| :--- | :--- |
| **Statut affiché** | Dynamique par sous-onglet : **`[OPÉRATIONNEL & PROTOTYPE CERTIFIÉ]`** (`SECURIAXE`), **`[SIMULATION & KIT MÉTIER]`** (`OMNIRENOV`), **`[EN INCUBATION · EXPLORATOIRE]`** (`OMNIPATRIMOINE`). |
| **1. Écran initial** | Trois sous-onglets métiers permettant de basculer instantanément entre les 3 solutions du portfolio :<br>• **Volet `SECURIAXE` :** Mini-console combinant le contrôle de rentabilité d'une vacation Nuit et la détection de double affectation (repos `>= 11 h`).<br>• **Volet `OMNIRENOV` :** Console de coordination de chantier (conformité Décennale/URSSAF des intervenants + arbitrage d'une relance de devis travaux J+7).<br>• **Volet `OMNIPATRIMOINE` :** Aperçu exploratoire d'une matrice de conformité documentaire CGP (lettre de mission, profil de risque, traçabilité réglementaire) badgé **`[EN INCUBATION — NON COMMERCIALISÉ]`**. |
| **2. Action du visiteur** | Le visiteur sélectionne `SECURIAXE`, `OMNIRENOV` ou `OMNIPATRIMOINE` et actionne les commandes de test (résolution d'un conflit planning, validation d'un jalon chantier/devis, ou inspection de la grille exploratoire CGP). |
| **3. Réaction de l'interface** | Mise à jour immédiate des indicateurs chiffrés, des verrous réglementaires et du journal de contrôle, avec distinction explicite entre fonctionnalités **actuellement disponibles** et fonctionnalités **simulées ou en incubation**. |
| **4. Étapes de l'animation** | 1. Sélection de la solution → 2. Manipulation du cas métier → 3. Exécution des verrous déterministes → 4. Décision dans le Sas `[OUI]/[NON]` → 5. Affichage du bénéfice métier et du lien vers le démonstrateur complet ou le site officiel. |
| **5. Résultat présenté** | Pour chaque solution, un encadré en 2 colonnes distingue clairement : **`[Fonctionnalités disponibles aujourd'hui]`** vs **`[Simulation / Évolutions en cours]`**. |
| **6. CTA final** | • Sur `SECURIAXE` : **`[ Ouvrir le démonstrateur complet Sécurité → ]`** (`securite-privee.html`) + **`[ Accéder au site officiel Securiaxe ↗ ]`**.<br>• Sur `OMNIRENOV` : **`[ Ouvrir le démonstrateur complet Omnirenov → ]`** (`btp.html`) + mention **`[ Site officiel Omnirenov : URL à confirmer ]`**.<br>• Sur `OMNIPATRIMOINE` : **`[ Échanger sur le projet en incubation → ]`** (`#contact`). |

---

## LIVRABLE 4 — CONCEPT VISUEL & MAQUETTES CONCEPTUELLES (ÉTAPE C / PARTIE III)

### 4.1 Étude de la palette existante et proposition graphique « Hybride Maîtrisé »
L'analyse de [comet.css](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/comet.css#L9-L45) confirme que l'identité graphique existante répond aux exigences de sobriété institutionnelle et de modernité technologique :
- **Univers Institutionnel (Sections A, B, C, E, F) :**
  - Fond principal : Papier d'ingénierie `--paper: #F4F3EE` (ratio de contraste avec `--ink: #161513` = **`15.4:1`**, largement supérieur au seuil WCAG AAA de `7:1`).
  - Cartes et panneaux : Vélin `--vellum: #FAF9F5` et Pierre `--stone: #EAE9E2`, bordés par des filets techniques `--edge: #D5D4CC`.
- **Univers Technologique (Section D `CANTARA LAB`, Principes nocturnes, Console Director, Footer) :**
  - Fond nocturne : `--night: #090D13`, cartes `--night-card: #131C28`, filets `--night-edge: #223042`.
  - Texte principal : `--cream: #F4F4E7` (ratio de contraste sur `#090D13` = **`17.1:1`**) et texte secondaire `--cream-muted: #A9B4C4` (ratio = **`8.9:1`**, conforme WCAG AA et AAA).
  - Signaux de flux et d'état : Ambre `--signal: #E2B65A`, Vert `--signal-ok: #4ADE80`, Alerte `--signal-err: #FCA5A5`.

**Conclusion sur la palette :** **Aucun remplacement de palette n'est nécessaire ni souhaitable.** Nous recommandons de conserver intégralement cette palette et d'y adjoindre uniquement les 4 classes de badges de transparence (`.badge-op`, `.badge-proto`, `.badge-sim`, `.badge-incub`) et les styles du graphe multi-agents (`.lab-graph`, `.lab-node`, `.lab-pipe`).

### 4.2 Maquettes conceptuelles détaillées des 3 cartes du Portfolio (Section C)

#### Carte 1 — `SECURIAXE`
- **Nom :** `SECURIAXE`
- **Secteur d'activité :** Sécurité privée (Gardiennage, ADS, SSIAP, Rondes — CSI Livre VI & IDCC 1351).
- **Badge de transparence :** **`[OPÉRATIONNEL & PROTOTYPE PILOTE]`**
- **Problématique métier :** Vacations chiffrées sous le seuil de rentabilité, risque d'affectation avec carte CNAPS ou SST expirés, doubles affectations et non-respect du repos quotidien légal (`>= 11 h`).
- **Proposition de valeur :** Sécuriser les marges commerciales avant signature et verrouiller la conformité opérationnelle et documentaire sous contrôle du dirigeant.
- **Aperçu d'interface intégré à la carte :** Mini-encadré sombre `securiaxe://cockpit` affichant : `Coût complet ADS Nuit : 22,97 €/h · Repos quotidien : >= 11,0 h [CONFORME] · Audit CSI L.612-9 : [SCELLÉ]`.
- **Actions :**
  - Bouton primaire : `Tester les démonstrations (Bouclier & Director) →` (`securite-privee.html`)
  - Bouton secondaire (redirection externe vérifiée) : `Accéder au site officiel Securiaxe ↗` (`https://naitconv-web.github.io/cos-operations-simulateur/boutique/`)

#### Carte 2 — `OMNIRENOV`
- **Nom :** `OMNIRENOV`
- **Secteur d'activité :** BTP, bâtiment, rénovation et coordination d'artisans.
- **Badge de transparence :** **`[SIMULATION & KIT OPÉRATIONNEL]`**
- **Problématique métier :** Devis chiffrés restant sans réponse faute de suivi structuré, dispersion du suivi de chantier et risque de non-conformité des attestations légales (Décennale, vigilance URSSAF).
- **Proposition de valeur :** Structurer la coordination opérationnelle et automatiser un suivi courtois des devis (`J+3 / J+7`, heures ouvrées `08h30–19h00`, max 2 relances) avec validation humaine systématique.
- **Aperçu d'interface intégré à la carte :** Mini-encadré sombre `omnirenov://chantier-devis` affichant : `Chantier Isolation & PAC (11 400 €) · Décennale & URSSAF : [VÉRIFIÉES] · Relance J+7 : [PRÊTE DANS LE SAS]`.
- **Actions :**
  - Bouton primaire : `Tester la démonstration Omnirenov →` (`btp.html`)
  - Indicateur de redirection : `Site officiel Omnirenov : URL à confirmer` (bouton externe désactivé ou orienté vers `#contact` tant que le domaine dédié n'est pas publié).

#### Carte 3 — `OMNIPATRIMOINE`
- **Nom :** `OMNIPATRIMOINE`
- **Secteur d'activité :** Gestion patrimoniale et cabinets de conseil en gestion de patrimoine (CGP).
- **Badge de transparence (mention visible obligatoire) :** **`[EN INCUBATION · NON COMMERCIALISÉ]`**
- **Problématique métier :** Complexité du suivi réglementaire, lourdeur d'assemblage des dossiers de conformité (connaissance client, adéquation, traçabilité du conseil) et exigences élevées de confidentialité.
- **Proposition de valeur :** Travaux de recherche et développement sur l'assistance documentaire déterministe et la vérification de conformité sous secret professionnel strict.
- **Aperçu d'interface intégré à la carte :** Mini-encadré exploratoire en filigrane `omnipatrimoine://incubation/lab` affichant : `Vérification complétude dossier · Pseudonymisation locale · Statut : Travaux exploratoires R&D`.
- **Actions :**
  - Bouton primaire : `Consulter l'aperçu exploratoire dans le Lab →` (`#lab` sur le sous-onglet `OMNIPATRIMOINE`)
  - Bouton secondaire : `Échanger autour de cette thématique →` (`#contact`)

---

## LIVRABLE 5 — ARCHITECTURE TECHNIQUE PROPOSÉE (ÉTAPE D)

### 5.1 Organisation modulaire sans dépendance externe
Pour préserver la rapidité (`< 250 ms`), la sécurité et la maintenabilité constatées lors de l'audit, l'architecture cible conserve le standard **100 % Vanilla HTML5 / CSS3 / ES6 (`0` framework, `0` dépendance npm en production)** :

```text
sites/cantara-v3/
├── index.html            # Sections A (Hero), B (Ingénierie 8 cartes), C (Portfolio 3 cartes),
│                         # D (CANTARA LAB 3 expériences), E (Services 7 prestations), F (Contact honnête)
├── securite-privee.html  # Démonstrateur approfondi SECURIAXE (Bouclier + Director 7 étapes + Handoff)
├── btp.html              # Démonstrateur approfondi OMNIRENOV (Coordination chantier + Relance Devis)
├── mentions.html         # Mentions légales LCEN & RGPD (coordonnées cliquables mailto:/tel:)
├── fonts.css             # @font-face locales WOFF2 (swap)
├── comet.css             # Design system Hybride maîtrisé + styles CANTARA LAB & badges de statut
├── comet.js              # Moteur cinétique partagé (scroll 60fps, 3D window, tilt, menu mobile, outbound tracking)
├── home-v3.js            # Contrôleur CANTARA LAB (Exp. 1 Multi-Agents, Exp. 2 Automatisation, Exp. 3 Démos)
│                         # + Diagnostic 4 questions + Formulaire #contact sans fausse confirmation
├── securite-v3.js        # Contrôleur Bouclier Anti-Pertes + Securiaxe Director 7 étapes
├── btp-v3.js             # Contrôleur OMNIRENOV (Coordination chantier + Cockpit Relance + Simulateur)
└── fonts/                # 8 fichiers .woff2 auto-hébergés
```

### 5.2 Gestion des animations, du chargement différé et de l'analytique
- **Animations légères et non-bloquantes :**
  - Toutes les animations du **CANTARA LAB** (impulsions entre agents de l'Expérience 1, progression des 5 étapes de l'Expérience 2) reposent sur des transitions CSS (`transform`, `opacity`) pilotées par une machine à états JS déterministe avec nettoyage systématique des timers (`clearTimeout`) lors d'un changement d'onglet.
  - Si `window.matchMedia('(prefers-reduced-motion: reduce)').matches` est vrai, le clic sur `[Lancer la simulation]` affiche immédiatement l'état final complet et permet de parcourir les agents ou étapes sans délai temporel.
- **Mesure analytique des clics sortants (Exigence IV.9) :**
  - Ajout dans `comet.js` d'un gestionnaire délégataire léger sur `[data-outbound-product]` qui journalise l'intention de sortie (`product`, `destinationUrl`, `timestamp`) sans déposer aucun cookie tiers ni bloquer la navigation. Dès qu'une sonde analytique auto-hébergée exemptée de consentement CNIL est choisie par le PDG, cette fonction unique servira de point d'envoi (`navigator.sendBeacon`).

---

## LIVRABLE 6 — PLAN DE RÉALISATION EN 3 LOTS (ÉTAPES 8 & 9)

*(Conformément aux interdictions de la mission, aucun développement de ces lots n'a été engagé).*

### LOT 1 — FONDATION (Positionnement, Architecture, Navigation, Portfolio, Responsive)
- **Périmètre :**
  - Mise à jour de `index.html` : **Section A (Hero)** avec signature officielle *« L'ingénierie au service de votre performance. »*, engagements *« Proximité · Confidentialité · Fiabilité »* et les 2 CTA officiels.
  - Création de la **Section B (`#ingenierie`)** : les 8 capacités transversales avec exemples concrets et badges de transparence.
  - Refonte de la **Section C (`#portfolio`)** : les 3 cartes indépendantes **`SECURIAXE`**, **`OMNIRENOV`** et **`OMNIPATRIMOINE`** (*En incubation*).
  - Création de la **Section E (`#services`)** : les 7 prestations d'accompagnement.
  - Harmonisation de `btp.html` sous l'appellation **`OMNIRENOV`** et ajout des liens `mailto:`/`tel:` cliquables dans `mentions.html` (`ANOM-V3-03`).
- **Tests & Critères d'acceptation :** Validation des critères V.10.1, V.10.2, V.10.3, V.10.7, V.10.8 ; `0` violation Axe-Core WCAG AA ; `overflowX = 0` sur mobile, tablette et desktop.

### LOT 2 — EXPÉRIENCES (CANTARA LAB : Multi-Agents, Automatisation, Démos Métiers)
- **Périmètre :**
  - Transformation de la fenêtre Comet de `index.html` en **Section D (`#lab` — CANTARA LAB)**.
  - Développement dans `home-v3.js` et `comet.css` de l'**Expérience 1 (Orchestration multi-agents)** : graphe interactif 5 étapes + sélection et inspection détaillée de chaque agent.
  - Développement de l'**Expérience 2 (Automatisation d'un processus métier)** : pipeline visuel 5 étapes déclenchable sans jargon.
  - Développement de l'**Expérience 3 (Démonstrations métiers)** : sélecteur `SECURIAXE` / `OMNIRENOV` (incluant coordination chantier) / `OMNIPATRIMOINE` (aperçu exploratoire en incubation).
- **Tests & Critères d'acceptation :** Validation des critères V.10.4, V.10.5, V.10.8, V.10.10 ; tests E2E Playwright vérifiant chaque clic d'agent, chaque étape du pipeline et le mode `prefers-reduced-motion`.

### LOT 3 — CONVERSION (Redirections vérifiées, Formulaires honnêtes, Analytique, Optimisation)
- **Périmètre :**
  - Création de la **Section F (`#contact`)** avec les 4 motifs officiels (*Demande de consultation*, *Présentation d'un besoin métier*, *Demande de démonstration*, *Prise de contact professionnelle*) reliée au diagnostic.
  - Correction de `ANOM-V3-01` : suppression de toute confirmation fictive verte (`.notice-ok`) tant que `WEBHOOK_ENABLED = false`, remplacée par un état transparent de pré-production + actions réelles (`mailto:` pré-rempli et copie presse-papiers).
  - Intégration des URLs de redirection validées par le PDG, du suivi analytique sortant `data-outbound-product` et de l'optimisation de préchargement des polices (`ANOM-V3-04`).
- **Tests & Critères d'acceptation :** Validation des critères V.10.6, V.10.9, V.10.10 + vérification complète des 10 critères d'acceptation de la Partie V.

---

## LIVRABLE 7 — ARBITRAGES NÉCESSAIRES DU PDG

1. **Arbitrage 1 — Identité graphique & Badges de statut :**
   - Validez-vous le maintien de la palette **Hybride maîtrisée** actuelle (Papier `#F4F3EE` / Nuit `#090D13`, typographies `Instrument Serif` + `Plus Jakarta Sans` + `JetBrains Mono`) complétée par les 4 badges normalisés (`Opérationnel`, `Prototype`, `Simulation`, `En incubation`) ?
2. **Arbitrage 2 — URL officielle de redirection pour `SECURIAXE` :**
   - Confirmez-vous le maintien de l'URL vérifiée `https://naitconv-web.github.io/cos-operations-simulateur/boutique/` (ou la racine `https://naitconv-web.github.io/cos-operations-simulateur/`) comme destination du bouton `SECURIAXE` tant que `https://idcc1351.fr` n'est pas routé en DNS ?
3. **Arbitrage 3 — URL et comportement de redirection pour `OMNIRENOV` :**
   - En l'absence d'URL externe publiée à ce jour (`URL à confirmer`), validez-vous que la carte `OMNIRENOV` ouvre le démonstrateur interne (`btp.html` renommé `OMNIRENOV`) et affiche explicitement *« Site métier dédié en cours d'ouverture »* ?
4. **Arbitrage 4 — Comportement du formulaire de contact (`#contact`) :**
   - Validez-vous la suppression immédiate du bandeau vert `.notice-ok` hors ligne au profit du mécanisme transparent (génération d'un dossier pré-rempli ouvrant la messagerie du visiteur + bouton de copie), ou souhaitez-vous activer un webhook de réception serveur lors du Lot 3 ?
5. **Arbitrage 5 — Feu vert d'exécution :**
   - Souhaitez-vous lancer uniquement le **Lot 1 (Fondation)** pour revue intermédiaire, ou enchaîner les **Lots 1, 2 et 3** sur la branche `cantara/v3-epure-comet` ?

---

## PREUVE FINALE DE NON-MODIFICATION DU DÉPÔT

- **Dépôt :** `/home/antigravity/naitconv-web/agia-infrastructure`
- **Branche initiale et finale :** `cantara/v3-epure-comet`
- **Commit initial et final (`git rev-parse HEAD`) :** `85e649a40b31e844f74d81e1aaba6b87934c7928`
- **Fichiers du dépôt modifiés, créés ou supprimés pendant la mission :** **`0`**
- **Commits, fusions, push ou déploiements effectués :** **`0`**
- **Emplacement du présent rapport (hors dépôt) :** `/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p_devbox/cabe0c80-70b4-4544-8fa0-150be6ccf090/AUDIT_CANTARA_V3_COMPLET.md` (copie également disponible sous `/home/antigravity/AUDIT_CANTARA_V3_COMPLET.md`).
