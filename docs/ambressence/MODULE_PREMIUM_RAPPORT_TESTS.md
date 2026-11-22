# MODULE STRATÉGIQUE — RAPPORT DE TESTS, NON-RÉGRESSION & HISTORIQUE

**Date (UTC) :** `2026-11-22T01:56:00Z`  
**Périmètre :** `https://ambressence.com/` — Module Web Premium (`Snippet 17` + page `/catalogue/` ID `9408`)

---

## 1. RÉSULTATS DES TESTS MULTI-ÉCRANS & FONCTIONNELS

| Contrôle | Périmètre | Résultat vérifié | Preuve |
| :--- | :--- | :---: | :--- |
| **Catalogue unifié `/catalogue/` (PC `1440×900`)** | Pré-chargement serveur `12` cartes, `H1` unique, `0` débordement | **`PASS`** | `cards=12 | overflowX=0 | visible_h1=1` (`v2_pc_catalogue.png`) |
| **Conseiller Parfumerie IA** | Bouton + quiz 3 étapes + requête Store API | **`DÉPLOYÉ & PRÊT`** | Intégré dans `#amb-catalogue-app` (`Snippet 17`) |
| **Panier Tiroir Store API** | Ajout via `/wc/store/v1/cart/add-item` + jauge `60 €` | **`PASS`** | Test Store API `items_count=1 | total=2390 (19€+4,90€)` |
| **Anti-débordement Accueil & PDP** | `overflowX`, `mojibake`, `badLinks` (PC & Mobile) | **`PASS`** | `overflowX=0 | mojibake=[] | badLinks=0` (`task-311`) |
| **E-mails WooCommerce** | Couleur de base Or Ambressence (`#b5812e`) | **`PASS`** | `PUT` & relecture `wc/v3/settings/email` |
| **Images & Tablette/Mobile en rafale** | Chargement parallèle multi-vues | **`BLOQUÉ PAR TIGERPROTECT (429)`** | `v2_mobile_catalogue.png` (`HTTP 429 Ralentissez` o2switch) |

---

## 2. TESTS DE NON-RÉGRESSION

- **Catalogue `2 552` produits :** Intact (`0` produit sans photo, `0` description vide, `0` titre ES, `0` prix `< 12 €`).
- **Verrou `/commander/` & Placeholders légaux :** Maintenus verrouillés tant que Stripe (`restricted`) et Kbis sont en attente (aucune vente illégale ouverte).
- **Abonnement Gemini AI Pro :** Non touché.

---

## 3. HISTORIQUE DES MODIFICATIONS (`WS-AMB-002`)

1. **`abcfafc` :** Nettoyage complet du catalogue (`2 552` produits propres, `153` mis en brouillon, Option B `+1 303 €`).
2. **`1274179` :** Audit pixel PC/Mobile, réparation encodage UTF-8 (`scellé`, `Expédié`, `€`), grille `4×2` Produits similaires, suppression débordements.
3. **`4f0fa24` :** Création page `/catalogue/` (`ID 9408`), redirection `/recherche/` → `/catalogue/`, affichage forcé photo produit.
4. **`804f5e9` :** Audit approfondi complet (`22` routes, TTFB, sécurité HTTP, paramètres WooCommerce, risque BTS).
5. **Réglage WooCommerce direct :** `woocommerce_email_base_color = #b5812e`.
6. **Commit courant :** `DESIGN.md`, architecture & évaluation techno (`GSAP`/`Lenis`/`Hostinger`/`Unsplash`), Conseiller Parfumerie IA, Panier Tiroir Store API, pré-chargement serveur `/catalogue/` et présent rapport de tests.
