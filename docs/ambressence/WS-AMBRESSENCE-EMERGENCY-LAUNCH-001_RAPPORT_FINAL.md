# MISSION WS-AMBRESSENCE-EMERGENCY-LAUNCH-001 — RAPPORT FINAL & VERDICT D'OUVERTURE

**Date (UTC) :** `2026-11-22T01:32:00Z`  
**Périmètre :** `https://ambressence.com/` (WooCommerce `11.2.1` + BTS Dropship `3.2.6` + Stripe `11.2.0`)  
**Verdict global :** **`OUVERTURE COMMERCIALE BLOQUÉE (NO-GO LÉGAL & PAIEMENT)`** — Catalogue, panier et livraison sont **100 % prêts** ; l'encaissement et la conformité légale dépendent de **2 blocages dirigeants externes** hors VM.

---

## 1. SYNTHÈSE DES 10 AXES DE LA MISSION (PREUVES À L'APPUI)

### 1 & 2. État réel du site, infrastructures & réconciliation catalogue
- **Catalogue nettoyé et vérifié en direct :** **`2 552`** parfums publiés (`Store API` `/wp-json/wc/store/v1/products`), tous avec photo, description en français, titre normalisé sans espagnol, et prix `≥ 12,00 €`.
- **Réserve (`draft`) :** `153` fiches retirées de la vitrine (`2` tests `Dior Sauvage` IDs 12–13, `43` sans image, `99` sous `12,00 €`, `18` non-parfums).
- **Écart d'infrastructure :**
  - Accès complet **WordPress / WooCommerce REST API** (`OPÉRATIONNEL`).
  - Accès **SSH (`port 22`)** et **cPanel (`port 2083`)** vers `langouste.o2switch.net` **bloqués par le pare-feu de la VM cloud Antigravity** (`Error reading SSH protocol banner` / `HTTP 403 Forbidden`).

### 3. Stocks, prix, images, fiches produits
- **Vérification post-nettoyage :** `0` produit sans photo, `0` produit sans description, `0` titre espagnol résiduel, `0` produit test sur les `2 552` publiés.
- **Risque résiduel :** `BTS Dropship for WooCommerce 3.2.6` est actif, mais sans accès SSH/admin cPanel, la fréquence cron réelle de resynchronisation stock/prix BTSWholesaler sur o2switch n'est pas directement inspectable depuis la VM.

### 4. Éléments juridiques et réglementaires (`BLOQUANT P0`)
- **`/mentions-legales/`, `/cgv/`, `/confidentialite/` :** Contiennent toujours les **18 placeholders `⟦ ... ⟧`** (`ambressence-legal-config.php`) tant que le Kbis de la **SASU ATLAS GLOBAL TRADING** (ou un SIRET micro-entreprise validé par le dirigeant) n'est pas fourni.
- **Obligations restantes pré-vente :** Adhésion médiateur **CM2C**, bouton de rétractation en ligne **L.221-21** (code HTML prêt dans `docs/ambressence/patches/conformite_l221_21_et_gpsr.html`), bloc **GPSR (UE 2023/988)**, et bascule `admin_email` (`nait.conv@gmail.com` → `@ambressence.com`).

### 5. Solution d'encaissement (`BLOQUANT ABSOLU P0`)
- **Stripe Live (`acct_1UbnwCHR0qKCRDne`) vérifié via `GET /wc/v3/wc_stripe/account/summary` :**
  - `status`: **`"restricted"`**
  - `is_live`: **`false`**
  - `has_pending_requirements`: **`true`** | `has_overdue_requirements`: **`true`**
  - `statement_descriptor`: **`"ATLAS RELANCE DEVIS"`** *(non conforme à la marque)*
- **Autres passerelles (`bacs`, `cheque`, `cod`) :** Toutes `enabled=False`.
- **Verdict :** **Aucun encaissement carte réel n'est activable** tant que la vérification KYC Stripe (`company.verification.document`) n'est pas validée par le dirigeant.

### 6. Test intégral du parcours client (E2E vérifié)
- **Catalogue (`/catalogue/`) :** Page créée et active (`ID 9408`), liens `/recherche/` redirigés vers `/catalogue/` via Snippet `17`.
- **Panier & Livraison (test réel Store API `POST /cart/add-item` sur ID `9276` à `19,00 €`) :**
  - `items_count=1`, `total_price=2390` (**`19,00 € + 4,90 €` port standard = `23,90 €`**), `needs_shipping=True`, `payment_methods=['stripe']`.
  - Zone livraison `France et UE - 7 pays` (`FR, BE, LU, NL, DE, ES, IT`) vérifiée : `4,90 €` sous `60 €`, **offerte dès `60 €`**.
  - Nettoyage panier (`remove-item`) : `items_count=0`.
- **Tunnel `/commander/` :** Toujours intercepté par `ambressence-maquettes.php` (lignes `428–441`) affichant *« Ouverture des commandes : très bientôt »* — **maintenu volontairement verrouillé** conformément aux règles légales et paiement.

### 7. Frais, marges, règles de prix & risques financiers
- **Protection appliquée (`DEC-AMB-005` / `DEC-AMB-012`) :**
  - Coûts d'achat BTS confirmés **TTC** (micro-entreprise en attente SASU → TVA fournisseur non récupérable).
  - Seuil plancher **`< 12,00 €`** appliqué (`99` produits risqués retirés de la vente).
  - Arrondi **Option B** (euro supérieur) appliqué (`+1 303 €` de marge protégée sur le catalogue).

### 8. Exploitation commerciale & traitement des commandes
- **Plugins actifs vérifiés :** `BTS Dropship for WooCommerce 3.2.6`, `PDF Invoices & Packing Slips 5.16.6`, `Brevo 4.0.63`, `WP Mail SMTP 4.10.4`, `UpdraftPlus 1.26.14`.
- **Reste à finaliser avant 1ère commande :** Secret webhook Stripe live (`webhook_status_code = 3` signalé le 17/11) et adresse expéditeur `@ambressence.com` (`SPF/DKIM/DMARC`).

### 9. Performances, sécurité & expérience mobile
- **Corrigé en ligne (Snippet `17`) :** Accents UTF-8 réparés (`scellé`, `Expédié`, `€`), `0` débordement horizontal PC & Mobile (`overflowX = 0`), grille `Produits similaires` réparée (`4` colonnes PC / `2` Mobile), affichage forcé photo produit.
- **Blocage hébergeur restant :** `TigerProtect` (cPanel o2switch) déclenche `HTTP 429` sur rafales d'images/requêtes ; `/staging/` reste public en `HTTP 200` (maintenu selon refus dirigeant `DEC-AMB-004`).

### 10. Contre-audit indépendant (conformité aux interdictions)
- Catalogue non fiable non publié : **RESPECTÉ** (`153` produits problématiques mis en brouillon).
- Commandes payantes non activées sans vérification : **RESPECTÉ** (`/commander/` verrouillé).
- Coordonnées légales non inventées : **RESPECTÉ** (`⟦ ... ⟧` conservés en attente Kbis).
- Compte Stripe non validé non présenté comme opérationnel : **RESPECTÉ** (`restricted`, `is_live=false` documenté).
- Abonnement Gemini AI Pro non modifié : **RESPECTÉ**.

---

## 2. MEILLEUR SCÉNARIO DE LANCEMENT LÉGAL ET OPÉRATIONNEL (PLAN D'ACTION)

Puisque l'ouverture immédiate est **légalement et techniquement bloquée par 2 prérequis dirigeants externes** (Stripe KYC + Kbis/Mentions légales), voici la séquence exacte la plus rapide pour encaisser dès réception :

1. **Action Dirigeant 1 — Débloquer Stripe (`15 min`) :**
   - Dans Stripe Dashboard (`acct_1UbnwCHR0qKCRDne`) : déposer le justificatif société (`company.verification.document`), passer le descripteur bancaire sur **`AMBRESSENCE`**, et copier le secret de signature du webhook `https://ambressence.com/?wc-api=wc_stripe` dans WooCommerce.
2. **Action Dirigeant 2 — Fournir le Kbis (ou décider de lancer sous le SIRET micro-entreprise existant) (`5 min`) :**
   - Transmettre les coordonnées légales exactes (Raison sociale, SIREN/SIRET, siège, TVA, CM2C) + assouplir `TigerProtect` dans cPanel o2switch.
3. **Action Gemini dès réception (`30 min`) :**
   - Remplir `ambressence-legal-config.php` + intégrer les blocs `L.221-21` & `GPSR`.
   - Déverrouiller `/commander/` et passer `blog_public = 1`.
   - Exécuter **1 commande test réelle** (carte réelle 1 produit + remboursement immédiat) pour valider la chaîne complète : paiement Stripe → webhook → création commande → facture PDF → flux BTSWholesaler → e-mail client.
