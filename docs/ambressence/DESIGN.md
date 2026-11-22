# DESIGN.md — SYSTÈME DE CONCEPTION OFFICIEL AMBRESSENCE

**Version :** `1.0` (`2026-11-22`)  
**Statut :** Référence commune officielle pour tout développement et toute évolution UI/UX sur `https://ambressence.com/`.

---

## 1. IDENTITÉ VISUELLE & POSITIONNEMENT

- **Territoire :** Haute parfumerie accessible, maison éditoriale française sobre et chaleureuse.
- **Mots-clés :** Rareté, Sillage, Chaleur ambrée, Clarté, Confiance.
- **Anti-patterns interdits :** Couleurs néon, violet WooCommerce (`#8526ff`), badges promo criards, pop-ups agressifs, textes techniques ou espagnols non traduits.

---

## 2. PALETTE DE COULEURS OFFICIELLE

| Rôle | Token CSS | Valeur Hex | Usage strict |
| :--- | :--- | :---: | :--- |
| **Fond principal** | `--fond` | `#f7f1e4` | Arrière-plan général crème parchemin |
| **Fond secondaire** | `--fond-2` | `#efe6d2` | En-têtes de section, bandeaux d'information, pied de page |
| **Surface carte** | `--carte` | `#fdfaf3` | Fiches produits, encadrés de réassurance, tiroir panier |
| **Ébène / Texte fort** | `--texte` / `--ebene` | `#261b0e` | Titres, texte principal, boutons secondaires sombres |
| **Texte secondaire** | `--texte-2` | `#6f5b3e` | Descriptions, sous-titres, métadonnées |
| **Texte discret** | `--texte-3` | `#94805f` | Mentions légales secondaires, libellés de notes |
| **Or Ambré (Accent)** | `--ambre` | `#b5812e` | Couleur de marque principale (e-mails, bordures actives) |
| **Or Foncé (Contraste)** | `--ambre-fonce` | `#8a5f1e` | Sur-titres `.overline`, liens actifs, états hover |
| **Or Clair (CTA)** | `--or-clair` | `#e8c47c` | Dégradés boutons CTA principaux (`linear-gradient(135deg, #e8c47c, #b5812e)`) |
| **Bordures subtiles** | `--ligne` | `rgba(138, 95, 30, .18)` | Séparateurs, contours de cartes |
| **Bordures actives** | `--ligne-forte` | `rgba(138, 95, 30, .34)` | Champs de saisie, boutons secondaires |

---

## 3. TYPOGRAPHIES & HIÉRARCHIE VISUELLE

- **Titres éditoriaux (`--serif`) :** `"Didot", "Bodoni MT", "Playfair Display", "Cormorant Garamond", Georgia, serif` (`font-weight: 400`).
- **Interface & Prix (`--sans`) :** `"Inter", system-ui, -apple-system, "Segoe UI", Arial, sans-serif`.
- **Échelle :**
  - `H1` Hero : `clamp(2.2rem, 5vw, 4.2rem)` — **Strictement 1 seule balise `<h1>` par page**.
  - `H2` Section : `clamp(1.8rem, 3.4vw, 2.8rem)`
  - `H3` Carte produit : `1.05rem–1.18rem`
  - `.overline` : `0.68rem`, `letter-spacing: 0.34em`, `text-transform: uppercase`, couleur `--ambre-fonce`.
  - Corps de texte : `0.95rem`, `line-height: 1.6`.

---

## 4. ESPACEMENTS, GRILLES & COMPOSANTS

- **Conteneur principal :** `width: min(1240px, 92vw); margin: 0 auto;`.
- **Grille Catalogue :** `4` colonnes sur PC (`> 960px`), `2` colonnes sur Tablette (`521px–960px`), `1` à `2` colonnes sur Mobile (`≤ 520px`), `gap: 1.2rem`.
- **Fiche Produit (PDP) :** `2` colonnes sur PC (`1fr` visuel sur fond `#ffffff` + `1.15fr` zone d'achat), `1` colonne sur Mobile (`≤ 820px`).
- **Boutons :**
  - `.btn-or` (CTA principal d'achat) : dégradé `#e8c47c → #b5812e`, texte `#241a08`, majuscules espacées (`0.18em`), rayon `3px`.
  - `.amb-cat-btn` (Action secondaire) : fond `#261b0e`, texte `#f7f1e4`, hover `#8a5f1e`.
  - **Règle tactile mobile :** `min-height: 40px` sur tout bouton ou lien d'action.
- **Réassurance obligatoire sous CTA d'achat :** 3 preuves (*100 % Authentique scellé · Livraison offerte dès 60 € / Expédition Europe 24–48h · Retours offerts 14 jours*).

---

## 5. RÈGLES RESPONSIVE & ANIMATIONS

- **Points de rupture :** `1440px` (PC), `768px–960px` (Tablette), `390px` (Mobile).
- **Anti-débordement strict :** `overflow-x: clip` sur `html, body, main, section` — `scrollWidth <= innerWidth` exigé sur tous les écrans.
- **Animations (Décision technique sans dépendance lourde) :**
  - Pas de librairie externe (`GSAP` / `Lenis`) tant que le serveur o2switch impose un rate-limit strict et un TTFB de `1,3–1,9 s`.
  - Transitions CSS GPU natives uniquement (`transform`, `opacity`, `box-shadow`, durée `220ms–350ms`, courbe `cubic-bezier(.22, .61, .21, 1)`).
  - Respect obligatoire de `@media (prefers-reduced-motion: reduce)`.
