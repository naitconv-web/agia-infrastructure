# FICHE PROJET 02 — OMNISECUR (COS OPÉRATIONS SÉCURITÉ PRIVÉE)

- **Statut de l'information :** `[DÉCISION CONFIRMÉE & RAPPORTS DE TESTS AUDITÉS]`
- **Structure Mère :** **LAB** (Gamme de solutions « Omni-X »)
- **Positionnement :** Logiciel et plateforme d'opérations et de rentabilité pour dirigeants d'entreprises de sécurité privée (CSI Livre VI & convention IDCC 1351 / Brochure 3196).
- **Documents Sources Originaux :**
  - Dossier Drive `PROJETS/OMNISECUR` (ID : `1BQd8Ohcc7R_sfRm04SFHegoukHeAz-EB`)
  - `_ORCHESTRATION/REGISTRE-DECISIONS.md` (ID : `1aUs3wwd0slFo3yJWDfUt8i2ir_CQaE4G`)
  - Rapports de tests : Décisions `OMNI-2026-232`, `WS-2026-003`, `WS-2026-004`, `WS-2026-002-REV1`, `WS-2026-008`
  - Dépôts GitHub : `naitconv-web/omnisecur` & `naitconv-web/omnisecur-launch-kit`

---

## 1. PREUVES TECHNIQUES DES TESTS ET CERTIFICATIONS DU CODE

L'état technique d'OMNISECUR repose sur des résultats déterministes enregistrés dans le registre officiel des décisions :

1. **Certification v2.3.2 (Décision `OMNI-2026-232` du 14/11/2026) :**
   - Commit certifié : `f6b1a87` sur branche `F8-dashboard`.
   - **Preuve vérifiée :** **95/95 tests unitaires verts** et **28/28 tests d'intégration PostgreSQL réelle validés**.
   - Verrouillage technique : Horodatage serveur `clock_timestamp()`, protection DML PostgREST, suppression de `p_fail_after_insert`.
2. **Audit Démo Phase 1 (Décisions `WS-2026-003` et `WS-2026-004` du 14/11/2026) :**
   - Démo WOW Phase 1 validée à l'unanimité (4/4 `VALIDE [GO]`).
   - Fichier de référence : `audit/COS-MVP-Operations-demo-phase1.html` (SHA-256 `16A99BE...`).
   - Conforme sur les 6 points de contrôle : marquage `[DÉMO]` sur tous les écrans, gestion des repos 12h / 11h dérogatoire, `localStorage` isolé, zéro régression.
3. **Readiness Commercial v1.2 / v1.3 (Décisions `WS-2026-002-REV1` et `WS-2026-008` du 16/11/2026) :**
   - Parité calculateur IDCC 1351 + Avenant n° 2 (plancher 6h d'amplitude).
   - Sécurisation du stub Stripe (`stripe-verify-stub.php` configuré en fail-closed).
   - Responsive validé sur écran mobile 390px, formatage CRM Sheet TEXT `@`.
   - Dépôt privé de déploiement : `naitconv-web/omnisecur-launch-kit` (commit `cb78b11`).

---

## 2. STATUT COMMERCIAL & DÉPENDANCES
- **Statut commercial :** Prêt pour présentations clients et démos terrain.
- **Dépendance souveraine :** En attente exclusive de la configuration des clés Stripe de production (`site-config.js`) et de l'activation des flux marketing par le fondateur.
