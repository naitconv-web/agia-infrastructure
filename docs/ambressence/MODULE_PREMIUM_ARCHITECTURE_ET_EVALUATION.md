# MODULE STRATÉGIQUE — AUDIT DESIGN, ÉVALUATION TECHNO & ARCHITECTURE DES COMPOSANTS

**Date :** `2026-11-22`  
**Référence :** [DESIGN.md](./DESIGN.md)

---

## 1. ÉVALUATION DES TECHNOLOGIES PROPOSÉES

| Technologie | Décision | Justification technique vérifiée sur `ambressence.com` |
| :--- | :---: | :--- |
| **Antigravity + Scripts Python/JS** | **ADOPTÉ** | Remplace Claude Code dans cet environnement ; pilotage direct WooCommerce REST API + Playwright multi-viewports + GitHub. |
| **GSAP + ScrollTrigger** | **NON RETENU (Phase 1)** | Les transitions CSS natives + `IntersectionObserver` suffisent à `0 KB` de poids JS. Ajouter GSAP via CDN externe ajouterait des requêtes bloquantes sur un site déjà pénalisé par un TTFB de `1,3–1,9 s`. |
| **Lenis (Smooth Scroll)** | **NON RETENU** | Le défilement natif `scroll-behavior: smooth` évite tout conflit avec les tiroirs latéraux mobiles et préserve l'accessibilité clavier/tactile. |
| **Chrome DevTools / Playwright** | **ADOPTÉ** | Déployé via `scripts/ambressence/audit_pixel_ux.py` (contrôle PC `1440px`, Tablette `768px`, Mobile `390px`). |
| **Unsplash / Pexels** | **NON REQUIS** | `100 %` des `2 552` parfums publiés possèdent déjà leurs visuels `.webp` réels sourcés distributeur. |
| **Hostinger MCP** | **NON APPLICABLE** | L'hébergement réel est **o2switch SAS** (`langouste.o2switch.net`), pas Hostinger. |

---

## 2. MATRICE D'ARBITRAGE SUR L'EXISTANT (CONSERVER / AMÉLIORER / REMPLACER / SUPPRIMER)

| Composant existant | Décision | Justification factuelle |
| :--- | :---: | :--- |
| **Identité visuelle Accueil (`01-accueil.html`)** | **CONSERVER & AMÉLIORER** | Identité luxe Crème/Ébène/Or très réussie ; corriger les débordements horizontaux (`.brume`, `.slide-2`, boutons) et le double `<h1>`. |
| **4 Univers (`/univers/ambre/`, `floral`, `boise`, `frais`)** | **AMÉLIORER** | Visuellement cohérents, mais les cartes ne pointaient pas vers `/produit/...` ; lien direct vers la vraie fiche produit activé via `Snippet 17`. |
| **Page `/recherche/` (`11-recherche.html`)** | **REMPLACER** | Statique, incohérente et non interceptable par WordPress ; remplacée par la nouvelle page unifiée **`/catalogue/`** (`ID 9408`). |
| **Fiches Produits Storefront (`/produit/*`)** | **AMÉLIORER** | Grille 2 colonnes forcée, galerie photo forcée visible (`opacity: 1`), grille `Produits similaires` réparée (`4×2`), encodage UTF-8 réparé, réassurance ajoutée. |
| **Conseiller Parfumerie IA** | **AJOUTER (NOUVEAU)** | Quiz olfactif interactif en 3 étapes intégré à `/catalogue/` interrogeant la vraie API Store API (`2 552` parfums). |
| **Panier Tiroir (Slide-Over)** | **AJOUTER (NOUVEAU)** | Panier latéral connecté en temps réel à WooCommerce Store API avec jauge livraison offerte `60 €`. |
| **Fiches test `Dior Sauvage` (`ID 12, 13`) & `< 12 €` / sans image** | **SUPPRIMER DE LA VITRINE (`draft`)** | Déjà exécuté et vérifié (`153` fiches mises en réserve, `2 552` propres conservées). |
| **Couleur violette WooCommerce e-mails (`#8526ff`)** | **REMPLACER** | Remplacée par `#b5812e` (Or Ambressence). |
| **Verrou `/commander/` (`ambressence-maquettes.php`)** | **CONSERVER TEMPORAIREMENT** | Maintenu jusqu'à validation Stripe KYC + Kbis (patch réversible prêt dans `docs/ambressence/patches/`). |

---

## 3. INVENTAIRE DES INTÉGRATIONS & ARCHITECTURE DES COMPOSANTS

- **Couche Présentation :** `ambressence-maquettes.php` (vitrine) + `Storefront` / `Snippet 17` (`AMBRESSENCE - UX/UI Conversion`) unifiant le design system sur `/catalogue/`, `/univers/*` et `/produit/*`.
- **Couche Données & Panier :** WooCommerce `11.2.1` + Store API (`/wp-json/wc/store/v1/products`, `/cart`, `/cart/add-item`).
- **Couche Paiement :** `WooCommerce Stripe Gateway 11.2.0` (bloqué côté KYC Stripe `acct_1UbnwCHR0qKCRDne`).
- **Couche Fournisseur :** `BTS Dropship for WooCommerce 3.2.6` + `ambressence-bts-guard.php`.
- **Couche E-mails & Facturation :** `Brevo 4.0.63`, `WP Mail SMTP 4.10.4`, `PDF Invoices & Packing Slips 5.16.6`.
