# WS-AMB-002 — AUDIT APPROFONDI COMPLET DU SITE `AMBRESSENCE.COM`

**Date (UTC) :** `2026-11-22T01:38:00Z`  
**Couverture :** `22` routes publiques, paramètres WooCommerce (`general`, `products`, `tax`, `email`), `12` plugins actifs, `5` modules PHP (`Drive/infra/wordpress/`), et `2 552` produits live.

---

## 1. PERFORMANCE & TEMPS DE RÉPONSE (`TTFB` & POIDS)

| Route | HTTP | TTFB | Poids HTML | Constat |
| :--- | :---: | :---: | :---: | :--- |
| `/` (Accueil) | `200` | **`1 886 ms`** | `199,8 KB` | **Lent** (`> 1,8 s` avant premier octet) |
| `/mon-compte/` | `200` | **`1 878 ms`** | `124,1 KB` | **Lent** |
| `/univers/frais/` | `200` | **`1 286 ms`** | `112,3 KB` | **Lent** |
| `/catalogue/` | `200` | **`1 269 ms`** | `121,4 KB` | **Lent** |
| `/panier/` | `200` | **`1 258 ms`** | `43,8 KB` | **Lent** |
| `/produit/lattafa-adeeb-.../` | `200` | `746 ms` | `232,3 KB` | Page produit lourde (`232 KB` HTML) |
| `/la-maison/` | `200` | `489 ms` | `36,8 KB` | Correct |

**Cause racine identifiée :** `ambressence-maquettes.php` force `DONOTCACHEPAGE = true` et `litespeed_control_set_nocache` sur toutes les routes vitrines, désactivant de fait le cache page de `LiteSpeed Cache 7.9.2` sur l'accueil et les univers.

---

## 2. SEO & STRUCTURE SÉMANTIQUE (`22` ROUTES AUDITÉES)

1. **Double `<h1>` sur `17 / 18` pages HTML :** Toutes les pages (sauf `/recherche/`) contiennent **`2` balises `<h1>`** au lieu d'une seule (dilution sémantique SEO).
2. **`X-Robots-Tag` contradictoire :**
   - Routes maquettes (`/`, `/univers/*`, `/panier/`, `/commander/`, `/la-maison/`, `/guide-sillage/`, `/cgv/`, `/mentions-legales/`, `/confidentialite/`) : **`noindex, nofollow`**.
   - Routes WooCommerce & `/catalogue/` (`/catalogue/`, `/produit/<slug>/`, `/mon-compte/`) : **`index, follow`**.
3. **Sitemaps :** `/sitemap.xml` et `/wp-sitemap.xml` répondent en `HTTP 200` (`249,5 KB`).

---

## 3. SÉCURITÉ HTTP & HÉBERGEMENT

1. **En-têtes de sécurité absents (`0 / 22` pages avec `HSTS` ou `CSP`) :**
   - `Strict-Transport-Security` (`HSTS`) : **absent sur `22/22` routes**.
   - `X-Frame-Options` : absent sur **`21/22` routes** (présent uniquement sur `/mon-compte/`).
   - `Content-Security-Policy` : absent sur `22/22` routes.
2. **Exposition `/staging/` :** `https://ambressence.com/staging/` répond en `HTTP 200` (`199,8 KB`, copie de la page d'accueil).
3. **`TigerProtect` (o2switch) :** Déclenche `HTTP 429` sur les rafales d'images/requêtes si le rate-limit n'est pas assoupli dans cPanel.
4. **Durcissement REST & XML-RPC (`OK`) :** `ambressence-securite.php` bloque `/wp/v2/users` (`HTTP 403`) et désactive XML-RPC.

---

## 4. PARAMÈTRES WOOCOMMERCE & EXPLOITATION COMMERCIALE

| Paramètre vérifié (`wc/v3/settings`) | Valeur actuelle | Impact & Action requise |
| :--- | :---: | :--- |
| **`woocommerce_store_address / city / postcode`** | **`VIDE`** | Aucune adresse d'expéditeur sur les factures PDF et e-mails. À remplir. |
| **`woocommerce_email_from_address`** | **`nait.conv@gmail.com`** | E-mails clients envoyés depuis un Gmail perso. Passer sur `@ambressence.com` + SPF/DKIM. |
| **`woocommerce_email_base_color`** | **`#8526ff` (violet)** | Couleur par défaut WooCommerce. Aligner sur Or/Ébène (`#b5812e` / `#261b0e`). |
| **`woocommerce_hide_out_of_stock_items`** | **`no`** | Les `9` produits en rupture restent visibles dans le catalogue. Passer à `yes`. |
| **`woocommerce_calc_taxes`** | **`no`** (`excl`) | Cohérent pour **micro-entreprise** (franchise TVA) ; basculer à `yes` (`incl`, TVA 20 %) dès passage en **SASU**. |

---

## 5. RISQUE SYNCHRONISATION FOURNISSEUR (`ambressence-bts-guard.php`)

- **Constat critique :** `ambressence-bts-guard.php` protège les prix verrouillés (`Khamrah 45 €`, `Yara 29 €`, `Asad 29 €`, `Tocade 39 €`) lors d'une synchro `BTS_Dropship_WooCommerce::process_product`, **mais ne protège pas** :
  1. Les titres francisés (`101` titres corrigés) et les descriptions (`2 552` fiches remplies).
  2. Le seuil `< 12 €` ni l'arrondi Option B sur les nouveaux imports BTS.
- **Recommandation :** Relancer `scripts/ambressence/clean_catalogue.py --apply` après chaque synchronisation majeure BTSWholesaler, ou étendre `ambressence-bts-guard.php` sur o2switch.

---

## 6. CONFORMITÉ LÉGALE (`23` PLACEHOLDERS `⟦` RESTANTS)

- `/mentions-legales/` : **`12`** occurrences `⟦ ... ⟧`
- `/confidentialite/` : **`6`** occurrences `⟦ ... ⟧`
- `/cgv/` : **`5`** occurrences `⟦ ... ⟧`
- **Stripe (`acct_1UbnwCHR0qKCRDne`) :** `status = restricted`, `is_live = false`, `statement_descriptor = "ATLAS RELANCE DEVIS"`.
