# FICHE DE MISSION COMPLÈTE — `WS-AMB-002` (`AMBRESSENCE`)

**Date d'ouverture :** `2026-11-21`  
**Statut :** `EN_COURS` *(Catalogue & UX prêts ; ouverture commerciale bloquée sur Stripe + Kbis)*  
**Plateformes de référence :**
- **GitHub (`naitconv-web/agia-infrastructure`) :** Référence technique (code, audits, scripts, preuves, commits).
- **Google Drive (`WORKSTATION-IA`) :** Référence de pilotage DG (`TABLEAU_DE_BORD_DG.md`, `REGISTRE-BUDGETS-DEPENSES.md`, `_BUS_COMMUNICATION/01_EN_COURS/`).

---

## 1. CE QUE LE DIRECTEUR GÉNÉRAL A DEMANDÉ
- Reprendre la direction opérationnelle d'`AMBRESSENCE` (`https://ambressence.com/`), établir la vérité opérationnelle avec preuves, redresser l'expérience client (PC & Mobile) et le catalogue, et préparer la boutique pour encaisser sans dépenses publicitaires avant budget validé.

## 2. CE QUE L'ORCHESTRATEUR A DÉCIDÉ
- Nettoyage catalogue en 2 passes (`dry-run` puis `--apply` par lots de 25 avec backup JSON préalable) : mise en réserve (`draft`) des produits de test, sans photo, non-parfums et `< 12,00 €` (marge micro-entreprise TTC non récupérable), francisation des titres ES, génération de descriptions FR et arrondi Option B.
- Contournement de `/recherche/` (bloqué côté serveur statique) par création d'une page WordPress `/catalogue/` unifiée + Conseiller Parfumerie IA + Panier Tiroir + OpenGraph SEO (`Snippet 17`, 100 % réversible).
- Abandon du workflow GitHub Actions pour AMBRESSENCE au profit du déploiement Git natif cPanel (`.cpanel.yml` + `scripts/cpanel_deploy.sh` en `DRY_RUN=1`), `o2switch-deploy.yml` conservé uniquement pour `SYNTESIA`.

## 3. CE QUE LE DIRECTEUR GÉNÉRAL A VALIDÉ
- **`OUI` (21/11) :** Mise en brouillon des `2` tests `Dior Sauvage` (`ID 12, 13`) + `43` sans image + seuil/arrondi Option B (`DEC-AMB-005`, `DEC-AMB-012`) ; application réelle (`Go`) ; e-mails clients Or `#b5812e` (`Go`).
- **`NON` (21/11) :** Pas de fermeture `/staging/` ni purge `Drive/infra/` (`DEC-AMB-003`, `DEC-AMB-004`) ; pas de masquage automatique des ruptures de stock (`No`).
- **`CONSERVER POUR SYNTESIA` (22/11) :** Retrait d'`AMBRESSENCE` de `o2switch-deploy.yml`.

## 4. CE QUE LES AGENTS ONT EXÉCUTÉ
| Agent / IA | Rôle | Action réalisée | Preuve (commit / URL / ID) |
| :--- | :--- | :--- | :--- |
| **Antigravity (`Gemini`)** | Exécution & Audit | Audit initial + Inventaires CSV `2 705` produits + Plan de redressement | Commits `90abef4`, `4a81e9f` |
| **Antigravity (`Gemini`)** | Exécution | Nettoyage live `2 552` parfums propres (`153` en réserve, `+1 303 €` marge) | `abcfafc` + vérif Store API (`0` anomalie) |
| **Antigravity (`Gemini`)** | Exécution UX/SEO | Création `/catalogue/` + Conseiller IA + Panier Tiroir + OpenGraph + Fix UTF-8 | Commits `1274179`, `4f0fa24`, `324b595`, `5c96ffa` |
| **Antigravity (`Gemini`)** | Infra & Gouvernance | Préparation `.cpanel.yml` (`DRY_RUN=1`) + Charte DG + Registre Budgets + Tableau DG | Commits `cb30dc1`, `d6fd89a`, `0d2cfd2` |

## 5. CE QUI A ÉTÉ DÉPENSÉ
- **Budget pub autonome autorisé :** `0,00 €`
- **Dépenses réelles vérifiées :**
  - `2026-10-25` : Hébergement `o2switch SAS` (`ambressence.com`) = **`22,76 € TTC`** *(source : annexe statuts SASU AGT `30/10/2026`)*
  - `2026-11-21` à `2026-11-22` : Toutes opérations `WS-AMB-002` = **`0,00 €`**
- **Reste disponible (pub) :** `0,00 €`

## 6. LES RÉSULTATS OBTENUS
- **Catalogue live vérifié :** `2 552` parfums publiés (`0` sans image, `0` sans description, `0` test, `0` `< 12 €`, `0` titre ES résiduel).
- **Parcours Panier & Livraison :** Test réel Store API validé (`19,00 € + 4,90 €` port = `23,90 €`).
- **Blocages restants pour ouvrir la vente :** Stripe `restricted` (`acct_1UbnwCHR0qKCRDne`), `23` champs légaux `⟦ ... ⟧` (Kbis), `TigerProtect` o2switch (`HTTP 429` sur rafales), Deploy Key cPanel manquante sur GitHub.

## 7. AVIS DE L'AUDITEUR INDÉPENDANT (`Concepteur ≠ Auditeur`)
- **Agent auditeur :** `research` — Auditeur Indépendant en lecture seule (`conv: 643cd478`, contrôle du `2026-11-23T00:42:54Z`)
- **Verdict :** `VALIDÉ`
- **Preuves examinées & commentaires :** `7/7` points contrôlés `OK` sans écart entre GitHub et Google Drive (`FICHE_MISSION.md`, `TABLEAU_DE_BORD_DG.md`, `REGISTRE-BUDGETS-DEPENSES.md`) : demandes DG, décisions/validations DG, actions exécutées, dépenses (`22,76 € TTC` o2switch + `0,00 €` opérations), résultats (`2 552` parfums, test panier `23,90 €`), `10` commits vérifiés et protection anti-écrasement/confidentialité confirmée. Limite mineure relevée : étendre à terme le masquage automatique à d'autres formats de clés secrètes (`sk_live_`, clés privées PEM).
