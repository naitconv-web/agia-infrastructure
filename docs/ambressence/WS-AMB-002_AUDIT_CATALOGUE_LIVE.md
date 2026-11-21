# WS-AMB-002 — AUDIT LIVE DU CATALOGUE & DU MU-PLUGIN WORDPRESS (21/11/2026)

**Mode :** Lecture seule (`Store API` publique `https://ambressence.com/wp-json/wc/store/v1/products` + inspection des fichiers PHP archivés dans `Drive/infra/wordpress/`).  
**Couverture :** `2 705 / 2 705` produits publiés extraits (`100 %` du catalogue public).

---

## 1. MÉTRIQUES EXACTES DU CATALOGUE LIVE (`21/11/2026`)

| Indicateur | Valeur mesurée (live) | Écart / Constat par rapport aux docs du 17/11 |
| :--- | :---: | :--- |
| **Produits publiés (`Store API`)** | **`2 705`** | vs `2 742` annoncés le 17/11 et `2 469` dans `/ambressence/v1/catalogue` |
| **Produits sans image** | **`43`** | En hausse vs `25`–`29` annoncés (les IDs `9395`–`9406` récents n'ont pas d'image) |
| **Produits sans description** | **`2 703 / 2 705`** (`99,93 %`) | Quasi-totalité du catalogue vide côté fiche descriptive |
| **Titres espagnols détectés (regex ES)** | **`98` minimum** | Ex. `Estuche 3 Piezas`, `Extracto de Perfume`, `Perfume de Mujer`, `Perfumado` |
| **Produits hors stock** | **`9`** | — |
| **Produits `< 10,00 €`** | **`66`** | Dont **`50`** produits `< 8,00 €` |
| **Prix minimum** | **`3,16 €`** | `Asdaaf · Ameerat al Aran Air Freshener · 300 ml` *(produit non-parfum)* |
| **Prix maximum** | **`324,42 €`** | `Chopard · Collection Bois Nomades · EDP · 100 ml` |
| **Prix moyen** | **`55,39 €`** | — |

---

## 2. CAUSE EXACTE DES ANOMALIES HTTP/SEO OBSERVÉES (`ambressence-maquettes.php`)

L'inspection du fichier archivé `Drive/infra/wordpress/ambressence-maquettes.php` explique deux blocages constatés en production :
1. **Page `/commander/` figée + tag LiteSpeed 404 :**
   - Aux lignes `428–441`, `ambressence-maquettes.php` intercepte `/commander` et `/commande` sur `template_redirect` (avant résolution WooCommerce, d'où `x-litespeed-tag: 80d_HTTP.404`) et affiche l'écran statique *« Ouverture des commandes : très bientôt »*.
2. **Header `X-Robots-Tag: noindex, nofollow` persistant :**
   - À la ligne `494`, `ambressence-maquettes.php` émet `header( 'X-Robots-Tag: noindex, nofollow', true );` côté PHP, ce qui explique pourquoi le réglage REST `blog_public` ne suffit pas à débloquer l'indexation tant que ce mu-plugin n'est pas mis à jour sur o2switch.

---

## 3. ACTIONS TECHNIQUES PRÊTES À PRÉPARER (DÈS VALIDATION)

1. **Script de nettoyage & francisation catalogue :** traduire/normaliser les `98+` titres espagnols, nettoyer les séparateurs `· · ·`, isoler/masquer les `43` fiches sans image et les références non-parfums / sous-marges `< 8 €`.
2. **Patch `ambressence-maquettes.php` (réversible) :** conditionner `X-Robots-Tag` et le verrou `/commander/` à une option WordPress ou un interrupteur `ambressence-legal-config.php` lors de l'ouverture commerciale post-Kbis/Stripe.
