# WS-AMB-002 — PLAN DE REDRESSEMENT COMMERCIAL PRIORISÉ (AMBRESSENCE)

**Date (UTC) :** `2026-11-21T23:15:00Z`  
**Mode :** Diagnostic lecture seule terminé — **aucune modification appliquée en production, aucune dépense engagée**.  
**Périmètre couvert :** 6 axes (`Commande`, `SEO`, `Catalogue`, `Pricing`, `Paiement`, `Conformité`) + Plan d'exécution par lots.

---

## 1. MATRICE DES ANOMALIES PAR AXE

### AXE 1 — COMMANDE (`/commander/`)
- **Anomalie :** Interception systématique de `/commander/` et `/commande/` par un écran d'attente statique (*« Ouverture des commandes : très bientôt »*), avec header `x-litespeed-tag: 80d_HTTP.404`.
- **Preuve :**
  - Test HTTP live `GET https://ambressence.com/commander/` → HTML statique d'attente + `x-litespeed-tag: 80d_HTTP.404`.
  - Code source archivé `Drive/infra/wordpress/ambressence-maquettes.php` lignes `428–441` : intercepte `/commander` et `/commande` sur `template_redirect` avant résolution WooCommerce.
- **Impact commercial :** **`BLOQUANT ABSOLU (P0)`** — `0 %` de conversion possible, aucune commande ne peut atteindre le checkout WooCommerce.
- **Priorité :** **`P0`** *(à lever uniquement une fois Stripe + Conformité débloqués)*.
- **Correction proposée :** Conditionner le bloc `if ( $path === '/commander' || $path === '/commande' )` dans `ambressence-maquettes.php` à une constante/option WordPress (`ambressence_orders_open = true`) afin de laisser WooCommerce/Blocks Checkout prendre la main sans supprimer le code de secours.
- **Dépendances :**
  1. Déblocage Stripe live (`charges_enabled = true`, webhook secret réparé).
  2. Complétion des 18 champs légaux (`ambressence-legal-config.php`) + case CGV + bouton rétractation L.221-21.
  3. Cohérence avec le snippet `Code Snippets #5` (qui injecte déjà `?add-to-cart=<ID>` sur les fiches).
- **Retour arrière :** Repasser `ambressence_orders_open = false` (ou restaurer la version précédente de `ambressence-maquettes.php`) → reverrouillage instantané de `/commander/`.

---

### AXE 2 — SEO (`noindex, nofollow` & exposition `/staging/`)
- **Anomalie 2A (`noindex` sur vitrine) :** Contradiction entre le header HTTP `x-robots-tag: noindex, nofollow` et le HTML `<meta name="robots" content="index, follow" />` sur toutes les pages maquettes.
- **Preuve :** Scan HTTP live sur `13` URLs (`task-142`) + `ambressence-maquettes.php` lignes `435` et `494` (`header( 'X-Robots-Tag: noindex, nofollow', true );`).
  - **Pages affectées par `x-robots-tag: noindex, nofollow` :** `/`, `/univers/ambre/`, `/univers/floral/`, `/univers/boise/`, `/univers/frais/`, `/produit/khamrah/`, `/recherche/`, `/la-maison/`, `/guide-sillage/`, `/panier/`, `/commander/`, `/cgv/`, `/mentions-legales/`, `/confidentialite/`.
  - **Pages WooCommerce non affectées (`index, follow`) :** `/produit/<slug-wc>/` (ex. `/produit/lattafa-oud-mood-perfume-%c2%b7-100-ml/`).
- **Anomalie 2B (`/staging/` indexable) :** `GET https://ambressence.com/staging/` répond en `HTTP 200` **sans** `X-Robots-Tag` (`NONE`) et avec `<meta name="robots" content="index, follow" />`.
- **Impact commercial :** **`ÉLEVÉ (P1)`** — Désindexation complète de l'accueil, des univers et des pages éditoriales, tandis que `/staging/` est exposé et indexable par Google.
- **Priorité :** **`P0` (fermer `/staging/`)** / **`P1` (basculer `X-Robots-Tag` sur `index, follow` au Go-Live)**.
- **Correction proposée :**
  1. Protéger `/staging/` par `.htpasswd` / `Deny` + `X-Robots-Tag: noindex, nofollow` immédiatement.
  2. Dans `ambressence-maquettes.php` (ligne `494`), conditionner `header( 'X-Robots-Tag: noindex, nofollow' )` à `get_option('blog_public') == '0'`, et passer `blog_public = 1` uniquement au Go-Live légal.
- **Dépendances :** Accès fichiers o2switch (SSH/SFTP/cPanel) + validation Kbis pour ouverture publique (`blog_public = 1`).
- **Retour arrière :** Remettre `blog_public = 0` / réactiver `header( 'X-Robots-Tag: noindex, nofollow' )`.

---

### AXE 3 — CATALOGUE (Inventaires exhaustifs joints)
Inventaires générés sur **`2 705 / 2 705`** produits live (`Store API` le `21/11/2026`) :
- **Anomalie 3A (Descriptions vides) :** **`2 703 / 2 705` (`99,93 %`)** produits n'ont ni description ni description courte. Les **2 seuls** produits avec description sont les fiches test `Dior Sauvage` (`ID 12` et `ID 13`).
- **Anomalie 3B (Produits sans image) :** **`43`** produits sans aucune image (vs `25–29` le 13–17 nov.) — liste complète dans [produits_sans_image.csv](./inventaires/produits_sans_image.csv).
- **Anomalie 3C (Titres espagnols non traduits) :** **`101`** produits détectés avec termes espagnols (`Estuche`, `Piezas`, `Extracto`, `Perfume de Mujer`, `Perfumado`, `Vainilla y Rosas`, `Vaporizador`…) — liste complète dans [produits_titres_espagnols.csv](./inventaires/produits_titres_espagnols.csv).
- **Impact commercial :** **`ÉLEVÉ (P1)`** — Baisse de confiance client, rejet potentiel Google Merchant Center / Google Shopping, SEO produit inexistant.
- **Priorité :** **`P1`**.
- **Correction proposée :**
  1. Dépublier / passer en brouillon les **2 tests `Dior Sauvage` (`ID 12`, `ID 13`)** et les **`43` fiches sans image** (ou récupérer les visuels manquants).
  2. Exécuter un script de traduction/normalisation FR sur les **`101` titres espagnols** (sans casser les SKU/EAN BTSWholesaler).
  3. Générer en lot des fiches descriptives structurées (famille olfactive, notes, contenance, authenticité scellée) via pipeline contrôlé.
- **Dépendances :** Accès API REST WordPress/WooCommerce (Application Password) ou WP-CLI o2switch + sauvegarde JSON pré-modification (`produits-backup`).
- **Retour arrière :** Restaurer les champs `post_title`, `post_status` et `post_content` depuis le export JSON de sauvegarde avant script.

---

### AXE 4 — PRICING & RENTABILITÉ
- **Anomalie :** **`182`** produits sont affichés sous **`15,00 €`**, dont **`66`** sous **`10,00 €`** et **`50`** sous **`8,00 €`** (jusqu'à **`3,16 €`** pour `Asdaaf · Ameerat al Aran Air Freshener · 300 ml`) — inventaire complet dans [produits_risque_marge_bas_prix.csv](./inventaires/produits_risque_marge_bas_prix.csv).
- **Preuve économique (exemple à `5,42 €` TTC) :**
  - Prix HT (`TVA 20 %`) = `4,52 €` | Frais Stripe (`1,5 % + 0,25 €`) = `0,33 €` → il reste **`4,19 €`** maximum pour payer **le coût d'achat BTS + la préparation/emballage + le différentiel de port éventuel** (et perte sèche immédiate si inclus dans un panier `≥ 60 €` avec livraison offerte ou en cas de retour gratuit 14 jours).
- **Impact commercial :** **`CRITIQUE RENTABILITÉ (P1)`** — Ventes à perte sur les petits prix et produits non-parfums.
- **Priorité :** **`P1`**.
- **Correction proposée :**
  1. Exclure/dépublier les articles non-parfums ou `< 10 €`–`12 €` (ou imposer un minimum d'achat / les réserver en vente additionnelle).
  2. Appliquer la règle d'arrondi **Option B** (euro supérieur, `+1 289,43 €` sur le catalogue) après confirmation écrite HT/TTC des prix BTSWholesaler.
- **Dépendances :** Export des prix d'achat réels BTSWholesaler (HT vs TTC) + validation Fondateur.
- **Retour arrière :** Réimport CSV des tarifs initiaux sauvegardés avant mise à jour.

---

### AXE 5 — PAIEMENT (Stripe Live)
- **Anomalie :** `payment_methods: ["stripe"]` est présent dans Store API, mais le compte Stripe live `acct_1UbnwCHR0qKCRDne` (**ATLAS GLOBAL TRADING**) est **`restricted`** (`charges_enabled = false`, `payouts_enabled = false`, `verification_failed_id_number_match`, `company.verification.document` en attente). De plus, `webhook_status_code = 3` (signatures en échec depuis le 17/11) et descripteur bancaire réglé sur **`"ATLAS RELANCE DEVIS"`**.
- **Preuve :** `/wp-json/wc/store/v1/cart` + `GO-LIVE-RUNBOOK-2026-11-17.md` §3.
- **Impact commercial :** **`BLOQUANT ABSOLU (P0)`** — Impossibilité légale et technique d'encaisser 1 € ; risque de contestation bancaire sur libellé `"ATLAS RELANCE DEVIS"`.
- **Priorité :** **`P0`**.
- **Correction proposée (actions dirigeant sur Dashboard Stripe) :**
  1. Soumettre le justificatif Kbis / pièce d'identité société requis par Stripe (`company.verification.document`).
  2. Remplacer le descripteur bancaire par **`AMBRESSENCE`**.
  3. Nettoyer les endpoints webhook et resynchroniser le secret de signature live dans WooCommerce (`https://ambressence.com/?wc-api=wc_stripe`).
- **Dépendances :** Immatriculation SASU / Kbis + accès dirigeant Stripe.
- **Retour arrière :** Basculer Stripe en mode test ou couper la passerelle dans WooCommerce.

---

### AXE 6 — CONFORMITÉ LÉGALE & SÉCURITÉ
- **Anomalies constatées :**
  1. **Pages légales publiques avec placeholders `⟦ ... ⟧`** : `18` clés non remplies dans `ambressence-legal-config.php` (`/mentions-legales/`, `/cgv/` avec 5 `⟦`, `/confidentialite/` avec 6 `⟦`).
  2. **Secrets en clair sur Google Drive (`Drive/infra/`)** : `.env`, `.staging-admin-password`, `.staging-db-password`, `.staging-htpasswd`, `.wp-app-password`, `ssh-*.txt`.
  3. **Obligations e-commerce FR/UE manquantes :** Kbis/SIREN/TVA, adhésion médiateur **CM2C**, bouton gratuit de rétractation en ligne **L.221-21** (obligatoire depuis le 19/06/2026), opérateur économique responsable **GPSR (UE 2023/988)**, bascule `admin_email` depuis Gmail personnel vers `@ambressence.com` + `SPF/DKIM/DMARC`.
- **Impact commercial :** **`BLOQUANT LÉGAL & SÉCURITÉ (P0)`**.
- **Priorité :** **`P0`**.
- **Correction proposée :** Rotation des mots de passe Drive + complétion de `ambressence_get_legal_config()` post-Kbis + ajout bouton L.221-21 & bloc GPSR.
- **Retour arrière :** Non applicable pour la purge de secrets (irréversible souhaitée) ; réversible sur `ambressence-legal-config.php`.

---

## 2. PLAN D'EXÉCUTION PAR LOTS (ROADMAP DE REDRESSEMENT)

| Lot | Périmètre | Charge estimée | Prérequis / Qui agit | Critères de validation (`PASS`) |
| :--- | :--- | :---: | :--- | :--- |
| **LOT 0 — Sécurité immédiate** | Verrouiller `/staging/`, purger & rotation des secrets `Drive/infra/` | **0,5 j** | Fondateur (o2switch + Drive) | `GET /staging/` → `HTTP 401/403` ; 0 secret en clair sur Drive |
| **LOT 1 — Déblocage Paiement & Légal** | Kbis + KYC Stripe + descripteur `AMBRESSENCE` + webhook + 18 champs `ambressence-legal-config.php` + CM2C + L.221-21 + GPSR | **1–2 j** *(délai Kbis/Stripe)* | Fondateur (Stripe/Kbis) + Gemini (code légal) | `charges_enabled=true`, `webhook_status_code=0`, `0` occurrence `⟦` sur `/mentions-legales/`, `/cgv/`, `/confidentialite/` |
| **LOT 2 — Assainissement Catalogue & Pricing** | Dépublication `IDs 12–13` + `43` sans image ; traduction FR des `101` titres ES ; exclusion/plancher `< 10 €` (`66` réf.) ; Option B arrondi | **1 j** | Fondateur (validation HT/TTC & Option B) + Gemini (scripts Python/API) | `0` titre ES, `0` produit sans image publié, `0` produit sous seuil marge nette |
| **LOT 3 — Enrichissement Descriptions & SEO** | Génération `2 703` descriptions FR + patch `ambressence-maquettes.php` (`X-Robots-Tag` lié à `blog_public`) | **1,5 j** | Gemini (scripts) + déploiement o2switch | `100 %` descriptions remplies ; `X-Robots-Tag: index, follow` sur `/` au Go-Live |
| **LOT 4 — Ouverture `/commander/` & Recette E2E** | Activation `ambressence_orders_open = true`, test commande réelle 1 € + remboursement, bascule e-mails `@ambressence.com` + `SPF/DKIM` | **0,5 j** | Fondateur + Gemini | `GET /commander/` → Checkout Stripe `HTTP 200` (sans tag `404`), 1 commande test payée & remboursée, e-mail reçu |

---

## 3. INVENTAIRES JOINTS (PREUVES EXHAUSTIVES)

- [produits_sans_image.csv](./inventaires/produits_sans_image.csv) (`43` produits)
- [produits_titres_espagnols.csv](./inventaires/produits_titres_espagnols.csv) (`101` produits)
- [produits_risque_marge_bas_prix.csv](./inventaires/produits_risque_marge_bas_prix.csv) (`182` produits `< 15 €`)
