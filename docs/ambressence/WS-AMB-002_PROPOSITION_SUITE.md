# WS-AMB-002 — PROPOSITION D'EXÉCUTION IMMÉDIATE (AMBRESSENCE)

**Date (UTC) :** `2026-11-21T23:20:00Z`  
**Contexte :** Reprise opérationnelle directe sur AMBRESSENCE (sans attendre le connecteur GitHub ChatGPT).

---

## 1. Ce que je peux préparer et tester dès maintenant (sans toucher la prod)

1. **Patch réversible `ambressence-maquettes.php` :**
   - Conditionner l'interception de `/commander/` et le header `X-Robots-Tag: noindex, nofollow` à des options WordPress (`ambressence_orders_open` et `blog_public`), pour un Go-Live propre en 1 clic.
2. **Scripts Catalogue & Rentabilité (Lot 2 & Lot 3) :**
   - Traduction FR et normalisation des **`101` titres espagnols** (`produits_titres_espagnols.csv`) + correction des séparateurs `· · ·` et coquilles.
   - Pipeline de génération des **`2 703` descriptions produits FR** manquantes (format sobre Maison Ambressence : concentration, contenance, authenticité scellée, expédition Europe).
   - Script de filtrage/mise en brouillon des **`2` fiches test (`ID 12, 13`)**, des **`43` fiches sans image**, et des articles sous le seuil de rentabilité.
3. **Conformité L.221-21 & GPSR :**
   - Rédaction des blocs HTML/PHP prêts à intégrer (bouton de rétractation en ligne 14 jours obligatoire depuis le 19/06/2026 + mentions opérateur UE GPSR 2023/988).

---

## 2. Les 3 arbitrages / actions dont j'ai besoin de votre part

1. **Arbitrages Catalogue & Pricing (pour finaliser les scripts) :**
   - Confirmez-vous la mise en brouillon des **`2` tests `Dior Sauvage`** + des **`43` fiches sans image** ?
   - Quel seuil plancher retenez-vous pour éviter les ventes à perte (**`< 10 €`** = `66` produits, ou **`< 12 €`**) et validez-vous l'**Option B d'arrondi** (`+1 289,43 €`) ?
   - Les prix fournisseur BTSWholesaler sont-ils **HT ou TTC** ?
2. **Sécurité immédiate (`5 min` côté o2switch / Drive) :**
   - Verrouiller `https://ambressence.com/staging/` et purger/changer les mots de passe en clair de `Drive/infra/`.
3. **Déblocage Paiement & Légal (hors VM) :**
   - KYC Stripe (`acct_1UbnwCHR0qKCRDne`), descripteur bancaire **`AMBRESSENCE`**, secret webhook live, et Kbis pour `ambressence-legal-config.php`.
