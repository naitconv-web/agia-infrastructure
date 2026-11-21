# AUDIT FINAL DE PRÉ-PRODUCTION : VÉRIFICATION DU COMMIT AGIA-007, ÉTAT DES 4 PAGES, RÉCEPTION RÉELLE DES FORMULAIRES & BLOQUANTS DE MISE EN LIGNE COMMERCIALE

**Date de contrôle :** 21 novembre 2026  
**Dépôt audité :** `naitconv-web/agia-infrastructure` (branche `main`)  
**Cible CRM inspectée :** Google Sheets `SYNTESIA_CRM_CENTRAL` (`1EmC6f4ljLU2GZmD9HEBt50WdTlVXoQtPQ64vFQL1I_0`, onglet `01_PROSPECTS_LEADS`)

---

## 1. VÉRIFICATION FACTUELLE DE LA PRÉSENCE DU COMMIT AGIA-007

La présence du commit **AGIA-007** a été vérifiée simultanément sur le dépôt Git local, via `git ls-remote origin refs/heads/main` et via l'API REST officielle de GitHub (`gh api repos/naitconv-web/agia-infrastructure/commits/b531656`) :

| Paramètre contrôlé | Valeur vérifiée | Statut |
| :--- | :--- | :--- |
| **SHA complet du commit `HEAD` (`main` & `origin/main`)** | `b5316563a45a52e8154f5a85ec2293ac08a0f957` | **`CONFIRMÉ (Local & GitHub Remote)`** |
| **Commit parent (AGIA-006)** | `a2815f954fb473b54d27beb735f89d182be7be83` | **`CONFIRMÉ`** |
| **Horodatage GitHub** | `2026-11-21T16:15:51Z` | **`CONFIRMÉ`** |
| **Périmètre exact du commit** | `21 files changed, 1105 insertions(+), 10 deletions(-)` | **`CONFIRMÉ`** |
| **Fichiers inclus dans `b531656`** | • 4 pages HTML (`france`, `algerie`, `securite-privee`, `batiment-renovation`)<br>• CSS autonome compilé (`sites/shared/syntesia-design-system.css`)<br>• 8 captures PNG Desktop/Mobile (`docs/sites/screenshots/*.png`)<br>• Rapport QA visuel (`docs/sites/RAPPORT_REVUE_SITES_AGIA_007.md`)<br>• 3 livrables Veille Mondiale OMNISECUR (`docs/omnisecur/veille/*.md`)<br>• Fiche 08 + Index + Matrice de la Bibliothèque Technologique | **`VÉRIFIÉ INTÉGRALEMENT`** |

---

## 2. AUDIT FINAL DES QUATRE PAGES WEB

| Critère d'audit | `sites/france/index.html` (760 lignes) | `sites/algerie/index.html` (440 lignes) | `sites/france/securite-privee/index.html` (332 lignes) | `sites/france/batiment-renovation/index.html` (279 lignes) |
| :--- | :--- | :--- | :--- | :--- |
| **1. Autonomie CSS & Rendu Hors-Ligne** | **100 % autonome** (220 classes compilées dans `syntesia-design-system.css`, 0 dépendance Tailwind CDN) | **100 % autonome** | **100 % autonome** | **100 % autonome** |
| **2. Contrastes WCAG 2.1** | **AA à AAA** (`4.93:1` à `17.56:1`) | **AA à AAA** (`5.04:1` à `17.56:1`) | **AA à AAA** (`5.04:1` à `17.32:1`) | **AA à AAA** (`4.93:1` à `17.32:1`) |
| **3. Intégrité des liens & ancres** | **25/25 valides** (`0` brisé) | **15/15 valides** (`0` brisé) | **16/16 valides** (`0` brisé) | **15/15 valides** (`0` brisé) |
| **4. Cohérence stratégique & AGIA-005** | **Conforme** (2 verticales prioritaires + HCR & CGP + 5 extensions badgées *« Extensions en cours d'étude »*) | **Conforme** (Positionnement propre Algérie : WhatsApp, BL, DZD, 6 secteurs locaux) | **Conforme** (CSI Livre VI, Art. L.612-9, IDCC 1351 / Brochure 3196, CNIL pointage ponctuel) | **Conforme** (Distinction stricte `2A. Bâtiment Neuf`, `2B. BTP / VRD`, `2C. Rénovation`) |
| **5. Accessibilité des `<label for="...">` du formulaire** | **10 / 10 liés** (`100 %`) | **8 / 8 liés** (`100 %`) | **1 / 8 liés** *(Seule la case RGPD a un couple `for`/`id` explicite ; les 7 autres champs n'ont pas d'`id`)* | **1 / 8 liés** *(Seule la case RGPD a un couple `for`/`id` explicite ; les 7 autres champs n'ont pas d'`id`)* |
| **6. Menu de navigation sur Mobile (`< 768px / 1024px`)** | La barre supérieure (liens vers les 2 verticales + Algérie) et le bouton CTA restent visibles, mais les 5 ancres internes (`Approche`, `Système`...) sont masquées (`hidden lg:flex`) sans bouton hamburger mobile. | Idem (`hidden lg:flex` sur les 4 ancres internes). | Idem (`hidden md:flex` sur les 4 ancres internes). | Idem (`hidden md:flex` sur les 3 ancres internes). |
| **7. Balises SEO de production (`OpenGraph`, `Canonical`, `Favicon`, `JSON-LD`)** | `<title>` et `<meta description>` présents ; **absence** de balises `og:*`, `canonical`, `favicon` et `JSON-LD`. | `<title>` et `<meta description>` présents ; **absence** de `og:*`, `canonical`, `favicon`, `JSON-LD`. | `<title>` et `<meta description>` présents ; **absence** de `og:*`, `canonical`, `favicon`, `JSON-LD`. | `<title>` et `<meta description>` présents ; **absence** de `og:*`, `canonical`, `favicon`, `JSON-LD`. |
| **8. Appel externe Google Fonts** | Charge `fonts.googleapis.com` (bascule proprement sur les polices système si hors-ligne). | Charge `fonts.googleapis.com`. | Charge `fonts.googleapis.com`. | Charge `fonts.googleapis.com`. |

---

## 3. VÉRIFICATION DES FORMULAIRES ET DE LEUR RÉCEPTION RÉELLE

Une inspection de bout en bout a été menée entre :
1. Le code JavaScript des 4 formulaires HTML (`#leadFormSyntesiaFr`, `#leadFormSyntesiaDz`, `#formSecu`, `#formBtp`),
2. Le script Webhook Google Apps Script (`automations/google_apps_script_crm_sync.js`),
3. Le script d'orchestration Python (`scripts/orchestrate_crm.py`),
4. L'onglet réel `01_PROSPECTS_LEADS` du tableur Google Sheets `1EmC6f4ljLU2GZmD9HEBt50WdTlVXoQtPQ64vFQL1I_0`.

### 3.1. Constat principal : Aucune réception réelle en base n'est active depuis les pages HTML (Mode Pré-Production)
- **État actuel vérifié dans le tableur Google Sheets (`01_PROSPECTS_LEADS`) :** Le tableur ne contient à cet instant qu'une seule ligne de test initial (`LEAD-20261121-063311`, `[TEST] Transports LogiRapid SAS`, insérée par le script CLI Python lors d'AGIA-001).
- **Comportement réel des 4 formulaires HTML aujourd'hui :**
  - Conformément à l'interdiction d'activer le webhook de production sans autorisation du fondateur, **aucun des 4 fichiers HTML ne contient d'appel réseau `fetch()` ou `XMLHttpRequest`**.
  - Lorsqu'un visiteur clique sur le bouton d'envoi, le JavaScript exécute `e.preventDefault()`, vérifie le Honeypot et les champs obligatoires, affiche le message de confirmation locale dans la page (`Note de transparence technique : ce formulaire fonctionne en mode de validation locale pré-production...`), puis vide les champs (`this.reset()`).
  - **En l'état, si le site était mis en ligne tel quel, les demandes saisies par de vrais prospects seraient perdues à la fermeture de leur onglet navigateur.**

### 3.2. Quatre écarts techniques détectés entre les formulaires HTML et le récepteur `google_apps_script_crm_sync.js`

Au-delà de l'absence volontaire du `fetch()`, l'audit croisé du code des 4 formulaires avec `automations/google_apps_script_crm_sync.js` a mis en évidence **4 divergences techniques à corriger avant d'activer le webhook** :

| # | Écart détecté entre les pages HTML et `google_apps_script_crm_sync.js` | Impact lors du branchement réel | Solution technique |
| :--- | :--- | :--- | :--- |
| **1** | **Incohérence du nom de champ Honeypot sur le site Algérie (`website_url_dz`)** | • Dans `sites/algerie/index.html` (ligne 345), le champ honeypot s'appelle `name="website_url_dz"`.<br>• Or, dans `automations/google_apps_script_crm_sync.js` (ligne 42), le filtre serveur vérifie uniquement `if (data.website_url \|\| data.company_website \|\| data.business_site)`.<br>• Un robot spammeur attaquant directement le webhook avec `website_url_dz` ne serait pas filtré côté serveur. | Ajouter `\|\| data.website_url_dz` à la ligne 42 de `automations/google_apps_script_crm_sync.js` (ou unifier le nom du champ honeypot sur les 4 pages). |
| **2** | **Désalignement du calcul de score (`+1 pt`) avec les nouveaux intitulés de verticales d'AGIA-005/006** | • Dans `google_apps_script_crm_sync.js` (ligne 81) et `scripts/orchestrate_crm.py` (ligne 26), le bonus de `+1 point` teste uniquement l'égalité stricte : `verticale === "Sécurité Privée" \|\| verticale === "Bâtiment et Rénovation"`.<br>• Or, depuis AGIA-006, les listes déroulantes envoient `"Bâtiment (Construction neuve / Gros œuvre)"`, `"BTP (Travaux Publics / VRD / Génie Civil)"`, `"Rénovation (Second œuvre / Artisans)"`, `"HCR — Hôtellerie (Hôtels indépendants & groupes)"`, etc.<br>• **Conséquence :** Les prospects Bâtiment, BTP et Rénovation perdent leur point de bonus vertical dans le CRM. | Mettre à jour la règle de scoring dans `google_apps_script_crm_sync.js` et `orchestrate_crm.py` pour reconnaître par inclusion (`Sécurité`, `Bâtiment`, `BTP`, `Rénovation`, `HCR`, `CGP`). |
| **3** | **Construction incomplète de l'objet `payload` JSON dans 3 pages sur 4** | • Seul `sites/france/index.html` (lignes 735-746) construit explicitement l'objet `payload` structuré (`marche`, `verticale`, `entreprise`, `nom`, `email`, `telephone`, `besoin`, `maturite`, `budget`, `description`).<br>• Sur `algerie/index.html`, `securite-privee/index.html` et `batiment-renovation/index.html`, le script affiche directement le message DOM sans assembler le dictionnaire `payload` prêt pour `fetch()`. De plus, sur `securite-privee`, le sélecteur s'appelle `name="effectif"` au lieu de `maturite`. | Standardiser la construction de l'objet `payload` sur les 4 formulaires (avec mappage de `effectif` vers `maturite` sur Sécurité Privée). |
| **4** | **Validation du format Email et Téléphone uniquement par `trim() !== ""` (à cause de `novalidate`)** | • Les 4 balises `<form>` portent l'attribut `novalidate` pour afficher le bandeau d'erreur personnalisé au style Refero plutôt que l'infobulle native du navigateur.<br>• Mais le test JS vérifie seulement `!email \|\| !tel` sans expression régulière minimale (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/` et au moins 8 chiffres pour le téléphone). Un utilisateur pourrait soumettre `"abc"` dans le champ e-mail. | Ajouter une validation regex légère de l'e-mail et du téléphone dans le gestionnaire `submit` des 4 formulaires. |

---

## 4. ÉLÉMENTS QUI EMPÊCHENT UNE MISE EN LIGNE COMMERCIALE IMMÉDIATE

Voici l'inventaire exhaustif et sans complaisance des éléments qui bloquent aujourd'hui une mise en ligne commerciale publique :

### A. Bloquants Juridiques & Réglementaires (Obligatoires en France — LCEN & RGPD)
1. **Absence de page ou modale « Mentions Légales » (Loi pour la Confiance dans l'Économie Numérique — LCEN Art. 6-III-1) :**
   - Tout site professionnel français doit afficher : la dénomination sociale ou le nom de l'éditeur, la forme juridique, le capital social, l'adresse du siège social, le numéro d'immatriculation (SIREN/SIRET/RCS), le nom du directeur de la publication, un moyen de contact direct (e-mail/téléphone) et les coordonnées complètes de l'hébergeur (nom, raison sociale, adresse, téléphone).
   - *Contexte portefeuille (`PROJET_06_STRUCTURE_JURIDIQUE_ATLAS_GLOBAL_TRADING.md`) :* La SASU **ATLAS GLOBAL TRADING** (229 rue Saint-Honoré, 75001 Paris) étant au statut « en cours de constitution / attente Kbis définitif », il est impossible d'afficher un faux numéro RCS. Tant que l'immatriculation n'est pas finalisée, le site ne peut pas revendiquer une société immatriculée (ou doit être édité à titre pré-contractuel / personne physique avec mention exacte).
2. **Absence de page ou modale « Politique de Confidentialité & RGPD » (Art. 13 du RGPD) :**
   - Les 4 formulaires recueillent un consentement RGPD par case à cocher, mais ne renvoient pas vers une notice détaillée précisant : l'identité du responsable de traitement, la finalité et la base légale, la durée de conservation des données prospects (3 ans maximum après le dernier contact selon le référentiel CNIL), les destinataires (stockage Google Workspace chiffré), et l'adresse e-mail dédiée pour exercer ses droits d'accès, de rectification ou de suppression.
3. **Chargement externe de Google Fonts (`fonts.googleapis.com`) sans auto-hébergement local :**
   - Lorsqu'un visiteur charge la page, son navigateur contacte `fonts.googleapis.com` et transmet son adresse IP aux serveurs de Google. Selon la jurisprudence européenne (RGPD), il est préférable d'**auto-héberger les fichiers de polices `.woff2`** (`Instrument Serif`, `Plus Jakarta Sans`, `JetBrains Mono`) dans `sites/shared/fonts/` : cela supprime 100 % des requêtes tierces et dispense totalement le site de bandeau cookies (puisqu'aucun traceur ni service tiers n'est appelé).

### B. Bloquants Fonctionnels & Commerciaux (Capture des Prospects)
4. **Non-déploiement du Webhook Google Apps Script et absence d'envoi HTTP `fetch()` dans les 4 formulaires :**
   - Tant que `automations/google_apps_script_crm_sync.js` n'est pas déployé en *Application Web* sur le tableur CRM et que son URL (`https://script.google.com/macros/s/.../exec`) n'est pas branchée dans un appel `fetch()` avec gestion d'état (bouton `Envoi en cours...`, confirmation réelle après HTTP 200, et repli `mailto:` en cas d'erreur réseau), **aucun lead ne remonte au fondateur**.
5. **Présence des mentions explicites de « Pré-Production » dans les pieds de page et les messages de confirmation :**
   - Les mentions `[STATUT : INFRASTRUCTURE EN PRÉ-PRODUCTION · PROJET EN COURS DE STRUCTURATION]` et `ce formulaire fonctionne en mode de validation locale pré-production` protègent l'intégrité du projet aujourd'hui, mais devront être retirées au moment de la bascule commerciale pour ne pas dissuader un prospect réel.

### C. Bloquants d'Infrastructure Web & SEO
6. **Absence de nom de domaine configuré, de certificat HTTPS de production et des métadonnées associées :**
   - Pas de domaine final raccordé (`syntesia.fr` / `syntesia.dz` ou sous-domaine), ce qui empêche de renseigner les URLs absolues dans `<link rel="canonical">`, `<link rel="alternate" hreflang="fr-FR" / "fr-DZ">`, `og:url`, `og:image`, `robots.txt` et `sitemap.xml`.

---

## 5. LISTE DES CORRECTIONS RESTANTES CLASSÉES PAR PRIORITÉ

### PRIORITÉ P0 — BLOQUANTS CRITIQUES (À RÉSOUDRE IMPÉRATIVEMENT AVANT TOUTE MISE EN LIGNE COMMERCIALE)

| Code | Correction à réaliser | Fichiers concernés | Qui peut l'exécuter ? |
| :---: | :--- | :--- | :--- |
| **P0-1** | **Aligner le récepteur CRM (`google_apps_script_crm_sync.js` & `orchestrate_crm.py`) avec les 4 formulaires** :<br>• Ajouter `data.website_url_dz` au filtre Honeypot serveur.<br>• Mettre à jour le bonus de score `+1 pt` pour reconnaître les intitulés AGIA-005/006 (`Sécurité`, `Bâtiment`, `BTP`, `Rénovation`, `HCR`, `CGP`). | `automations/google_apps_script_crm_sync.js`<br>`scripts/orchestrate_crm.py` | **Antigravity (Immédiat, 0 €)** |
| **P0-2** | **Standardiser le JavaScript des 4 formulaires HTML** :<br>• Construire l'objet `payload` 15 colonnes complet sur les 4 pages.<br>• Ajouter la validation regex e-mail et téléphone (min 8 chiffres).<br>• Préparer le connecteur `fetch(SYNTESIA_WEBHOOK_URL)` gouverné par une constante unique (`WEBHOOK_ACTIVE = false` en pré-prod, basculable à `true` en 1 ligne dès que l'URL Apps Script est fournie). | `sites/france/index.html`<br>`sites/algerie/index.html`<br>`sites/france/securite-privee/index.html`<br>`sites/france/batiment-renovation/index.html` | **Antigravity (Immédiat, 0 €)** |
| **P0-3** | **Créer la page/section « Mentions Légales & Politique de Confidentialité RGPD »** reliée aux 4 pieds de page et aux 4 cases à cocher RGPD, avec des espaces réservés explicites (`[À COMPLÉTER AU GO-LIVE : SIREN/RCS, HÉBERGEUR, EMAIL DPO]`). | `sites/shared/mentions-legales-confidentialite.html` + liens depuis les 4 pages | **Antigravity (Structure) + Fondateur (Données légales finales)** |
| **P0-4** | **Déployer le script `google_apps_script_crm_sync.js` en Web App sur le Google Sheet CRM** (`1EmC6f4ljLU2GZmD9HEBt50WdTlVXoQtPQ64vFQL1I_0`) et **autoriser l'activation de l'URL Webhook** + retirer les bandeaux `[PRÉ-PRODUCTION]`. | Google Sheets > Extensions > Apps Script | **Action Fondateur (au moment du Go-Live)** |
| **P0-5** | **Finaliser les informations d'immatriculation légale (`ATLAS GLOBAL TRADING` ou éditeur désigné) et choisir l'hébergeur + nom de domaine**. | Formalités juridiques & DNS | **Action Fondateur** |

---

### PRIORITÉ P1 — CORRECTIONS D'ACCESSIBILITÉ, DE CONFORMITÉ RGPD STRICTE & D'UX MOBILE (RECOMMANDÉES AVANT TRAFIC)

| Code | Correction à réaliser | Fichiers concernés | Qui peut l'exécuter ? |
| :---: | :--- | :--- | :--- |
| **P1-1** | **Compléter l'accessibilité des formulaires (`<label for="...">` + `id="..."`)** sur les pages verticales Sécurité Privée (`7` champs à lier) et Bâtiment/Rénovation (`7` champs à lier) pour atteindre `100 %` comme sur France et Algérie. | `sites/france/securite-privee/index.html`<br>`sites/france/batiment-renovation/index.html` | **Antigravity (Immédiat, 0 €)** |
| **P1-2** | **Auto-héberger les 3 polices (`Instrument Serif`, `Plus Jakarta Sans`, `JetBrains Mono`) ou utiliser une cascade locale sans appel tiers** afin de supprimer toute requête sortante vers `fonts.googleapis.com` (zéro fuite d'IP visiteur = conformité RGPD totale sans bandeau cookies). | `sites/shared/syntesia-design-system.css` & `<head>` des 4 pages | **Antigravity (Immédiat, 0 €)** |
| **P1-3** | **Ajouter un menu mobile déroulant léger (bouton « Menu » sur `< 1024px`)** dans l'en-tête des 4 pages pour permettre aux visiteurs sur smartphone d'accéder aussi aux ancres de sections internes (`Approche`, `Système`, `Catalogue Sectoriel`, `Démarche`). | Les 4 fichiers `index.html` | **Antigravity (Immédiat, 0 €)** |

---

### PRIORITÉ P2 — OPTIMISATIONS SEO & MÉTADONNÉES DE PARTAGE (LORS DU RACCORDEMENT DU DOMAINE)

| Code | Correction à réaliser | Fichiers concernés | Qui peut l'exécuter ? |
| :---: | :--- | :--- | :--- |
| **P2-1** | **Ajouter un Favicon SVG inline (`SY` noir sur crème)**, les balises **OpenGraph (`og:title`, `og:description`, `og:type`, `og:locale`)** et les **données structurées JSON-LD (`Organization` / `ProfessionalService`)** sur les 4 pages. | `<head>` des 4 fichiers `index.html` | **Antigravity (Immédiat, 0 €)** |
| **P2-2** | **Générer `robots.txt`, `sitemap.xml` et les balises `<link rel="canonical">` / `hreflang="fr-FR"` & `"fr-DZ"`** dès que le nom de domaine définitif sera arrêté par le fondateur. | Racine `sites/` | **Antigravity (Dès validation du nom de domaine)** |
