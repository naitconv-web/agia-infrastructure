# RAPPORT DE CONTRÔLE QUALITATIF VISUEL & FONCTIONNEL DES SITES SYNTESIA
**Référence :** SYNTESIA-QA-SITES-007 (Mission AGIA-007 — Chantier 1)  
**Date :** 21 novembre 2026  
**Moteur d'inspection :** Rendu réel sous Chromium Headless (`1440×2400` Desktop & `375×2000` Mobile) + Audit DOM/WCAG/Liens automatisé  
**Statut :** `REVUE VISUELLE EFFECTUÉE — ANOMALIES CORRIGÉES — ZÉRO PUBLICATION PUBLIQUE`

---

## 1. MÉTHODOLOGIE DE CONTRÔLE RÉEL (DESKTOP & MOBILE)

Conformément aux instructions d'AGIA-007, les quatre pages principales de SYNTESIA n'ont pas seulement été inspectées dans leur code source HTML : elles ont été chargées et rendues graphiquement dans un navigateur **Chromium Headless** (`/usr/bin/chromium`) sous deux résolutions de référence :
- **Ordinateur (Desktop) :** `1440 × 2400 px` (vérification de la grille éditoriale 12 colonnes, des espacements, de la scène sombre d'architecture système `#090D13` et des cartes à 3 et 4 colonnes).
- **Smartphone (Mobile) :** `375 × 2000 px` (vérification du repli responsive iPhone SE / standard mobile, de la barre de navigation flottante, de la lisibilité typographique et de l'ergonomie tactile des formulaires).

Les 8 captures d'écran générées et contrôlées visuellement sont archivées dans `docs/sites/screenshots/` :
1. `docs/sites/screenshots/france-desktop.png` & `docs/sites/screenshots/france-mobile.png`
2. `docs/sites/screenshots/algerie-desktop.png` & `docs/sites/screenshots/algerie-mobile.png`
3. `docs/sites/screenshots/securite-privee-desktop.png` & `docs/sites/screenshots/securite-privee-mobile.png`
4. `docs/sites/screenshots/batiment-renovation-desktop.png` & `docs/sites/screenshots/batiment-renovation-mobile.png`

---

## 2. ANOMALIES DÉTECTÉES LORS DE LA REVUE VISUELLE & CORRECTIONS APPLIQUÉES

La revue visuelle sous Chromium a permis d'identifier et de corriger immédiatement **trois défauts techniques concrets** qui n'étaient pas visibles lors d'un simple test syntaxique du DOM :

| # | Anomalie détectée lors du rendu Chromium | Impact constaté avant correction | Correction chirurgicale appliquée | Statut après contrôle |
| :--- | :--- | :--- | :--- | :--- |
| **1** | **Dépendance externe au script runtime `https://cdn.tailwindcss.com`** dans les 4 fichiers HTML | Lorsqu'un navigateur bloque le script CDN externe (pare-feu d'entreprise, mode hors-ligne ou erreur de handshake SSL proxy), les 220 classes utilitaires (`grid`, `flex`, `lg:grid-cols-12`, `max-w-7xl`, `p-8`, etc.) et le reset Preflight ne s'appliquaient pas, provoquant un empilement vertical brut et des liens bleus soulignés par défaut. | **Compilation intégrale et autonome des 220 classes utilitaires, du reset CSS Preflight et des points de rupture responsives (`sm:`, `md:`, `lg:`) directement dans `sites/shared/syntesia-design-system.css`**, et suppression de la balise `<script src="https://cdn.tailwindcss.com"></script>` sur les 4 pages. | **`CORRIGÉ & VÉRIFIÉ`** *(Rendu 100 % autonome, instantané, zéro FOUC, fonctionne même 100 % hors-ligne)* |
| **2** | **Retour à la ligne sur 3 lignes du bouton CTA de l'en-tête mobile (`375px`)** | Sur un écran étroit de `375px`, le bouton principal de la barre de navigation (`Demander un diagnostic →`) manquait de `white-space: nowrap` et d'un ajustement de padding mobile, ce qui cassait le libellé sur trois lignes. | Ajout d'une règle `@media (max-width: 639px)` dans `sites/shared/syntesia-design-system.css` (`white-space: nowrap; padding: 0.55rem 0.95rem; font-size: 0.75rem;`) et `flex-wrap` sur la barre technique supérieure. | **`CORRIGÉ & VÉRIFIÉ`** *(Bouton CTA sur une seule ligne nette sur les 4 captures mobiles `375px`)* |
| **3** | **Deux ancres internes de navigation non reliées (`#methode-dz` et `#enjeux`)** | • Sur `sites/algerie/index.html`, le lien de menu `Déploiement` pointait vers `#methode-dz` non déclaré.<br>• Sur `sites/france/securite-privee/index.html`, le lien `Contraintes Terrain` pointait vers `#enjeux` non déclaré. | Ajout de l'ancre `id="methode-dz"` sur `sites/algerie/index.html` et de `id="enjeux"` sur le bloc des 4 repères d'ingénierie terrain de `sites/france/securite-privee/index.html`. | **`CORRIGÉ & VÉRIFIÉ`** *(71 liens contrôlés sur les 4 pages, **0 lien brisé**)* |

---

## 3. CONTRÔLE DES 9 CRITÈRES QUALITATIFS DEMANDÉS

### 3.1. Rendu visuel Ordinateur (`1440px`) et Mobile (`375px`)
- **Ordinateur (`1440px`) :** La grille asymétrique 12 colonnes du Hero (`8 col` titre éditorial + `4 col` piliers d'ingénierie séparés par un filet vertical `#D5D4CC`), la scène nocturne `#090D13` à 4 couches (`Flux Terrain`, `Moteur Déterministe`, `Agents Spécialisés`, `Sas Décision Dirigeant`) et les grilles sectorielles à 3 et 4 colonnes s'affichent avec un alignement géométrique strict.
- **Mobile (`375px`) :** Toutes les grilles multi-colonnes basculent proprement en flux vertical à 1 colonne avec `padding` adapté, sans débordement horizontal (`overflow-x: hidden`).

### 3.2. Cohérence avec la direction artistique Refero (`Antimetal` + `Cursor` + `ElevenLabs`)
- **Papier technique chaud (`#F4F3EE` / `#FAF9F5` / `#EAE9E2`) :** Respecté sur les 4 pages (rupture franche avec les clichés IA dark-purple/néon).
- **Marquages d'ingénierie :** Présence des repères d'angles `+` (`syn-corner-tl`, `syn-corner-br`), des étiquettes techniques monospace entre crochets (`[SYS-00 // PARTENAIRE DE TRANSFORMATION B2B]`, `[CAP-01 // PÉRIMÈTRE D'INTERVENTION]`) et des bordures exposées `1px solid #D5D4CC`.
- **Contraste des rayons :** Cartes à angles quasi-droits (`2px`) vs boutons d'action primaires et secondaires en pilule complète (`9999px`).

### 3.3. Lisibilité, hiérarchie des titres et accessibilité des contrastes (Audit WCAG 2.1)
Un calcul mathématique de luminance relative (norme WCAG 2.1) a été exécuté sur les 10 couples de couleurs du système :

| Couple de couleurs | Code Texte | Code Fond | Ratio mesuré | Niveau WCAG 2.1 |
| :--- | :--- | :--- | :--- | :--- |
| Encre primaire sur Papier | `#161513` | `#F4F3EE` | **16.42 : 1** | **AAA** (Optimal) |
| Encre primaire sur Carte | `#161513` | `#FAF9F5` | **17.32 : 1** | **AAA** (Optimal) |
| Texte courant sur Carte | `#464440` | `#FAF9F5` | **9.22 : 1** | **AAA** (Optimal) |
| Texte secondaire / méta sur Carte | `#6E6B65` | `#FAF9F5` | **5.04 : 1** | **AA** (Conforme texte standard) |
| Accent Bleu France sur Carte | `#1D4ED8` | `#FAF9F5` | **6.36 : 1** | **AA** (Conforme) |
| Accent Terre Cuite BTP sur Carte | `#B84A27` | `#FAF9F5` | **4.93 : 1** | **AA** (Conforme) |
| Accent Émeraude Algérie sur Carte | `#047857` | `#FAF9F5` | **5.21 : 1** | **AA** (Conforme) |
| Texte Crème sur Scène Nocturne | `#F4F4E7` | `#090D13` | **17.56 : 1** | **AAA** (Optimal) |
| Texte Ardoise sur Panneau Nocturne | `#94A3B8` | `#101720` | **7.03 : 1** | **AAA** (Optimal) |
| Texte Bouton Primaire sur Fond Bouton | `#FAF9F5` | `#161513` | **17.32 : 1** | **AAA** (Optimal) |

### 3.4. Clarté des textes et du positionnement commercial
- Le positionnement de SYNTESIA est immédiatement compréhensible : **comprendre les opérations → identifier les inefficacités → concevoir des systèmes adaptés → intégrer les outils existants → automatiser les processus → déployer des agents IA encadrés → accompagner durablement les équipes**.
- Le site **Algérie** (`sites/algerie/index.html`) dispose d'un discours, d'exemples opérationnels (WhatsApp Business, bons de livraison, gestion en Dinars DZD, wilayas d'Alger, Oran, Constantine, Sétif) et de secteurs adaptés au tissu économique algérien, sans copier-coller mécanique du cadre réglementaire français.

### 3.5. Navigation et liens entre pages
- **71 liens vérifiés** au total (`25` sur France, `15` sur Algérie, `16` sur Sécurité Privée, `15` sur Bâtiment/BTP/Rénovation) : **0 lien cassé**.
- Navigation bidirectionnelle fluide entre le portail France, le portail Algérie et les deux pages verticales dédiées.

### 3.6. Fonctionnement et sécurité des 4 formulaires
- **Champs requis et validation locale :** Si un utilisateur tente de soumettre un formulaire sans remplir un champ obligatoire (`*`) ou sans cocher la case RGPD, un panneau d'alerte encadré en terre cuite (`#B84A27`) bloque l'envoi et indique clairement les éléments manquants.
- **Anti-spam Honeypot :** Présent et actif sur les 4 formulaires (`website_url` sur France et Algérie, `company_website` sur Sécurité Privée, `business_site` sur Bâtiment/Rénovation).
- **Protection XSS :** Échappement systématique des chevrons `.replace(/</g, "&lt;")` avant affichage du message de confirmation local.
- **Mode pré-production :** Aucun appel réseau externe ni webhook de production n'est déclenché, conformément à la consigne de sécurité du fondateur.

### 3.7. Absence de toute promesse non démontrée et cohérence AGIA-005
- **0 occurrence** de promesses chiffrées arbitraires (`ROI x3`, `doublement du taux de signature`, `moins de 3 minutes`, `zéro défaut CNAPS`, `21 jours`) ni d'affirmation prématurée d'immatriculation (`Kbis`, `SASU immatriculée`).
- **Cohérence totale avec le Catalogue Sectoriel AGIA-005 :**
  - *Verticales prioritaires de lancement :* Sécurité Privée (`CSI Livre VI`, `IDCC 1351 / Brochure 3196`) et Bâtiment / BTP / Rénovation (avec distinction explicite entre `2A. Bâtiment Neuf`, `2B. Travaux Publics / BTP` et `2C. Rénovation & Artisans`).
  - *Socle complémentaire du fondateur :* **HCR** (Hôtellerie, Cafés, Restauration — `IDCC 1979`, distinction des 3 sous-métiers) et **Cabinets CGP** (Gestion de patrimoine — `DDA / MIF 2 / KYC`).
  - *5 extensions sectorielles :* Nettoyage & Facility Management, Transport & Logistique, Immobilier & Gestion de biens, Architecture & Bureaux d'études, Services à la personne — toutes explicitement badgées **« Extensions en cours d'étude »**.
