# FICHE PROJET 02 — OMNISECUR (COS OPÉRATIONS SÉCURITÉ PRIVÉE)
**Date d'audit :** 21 novembre 2026  
**Statut :** CODE V2.3.2 CERTIFIÉ (95/95 TESTS VERTS) — DÉMO PHASE 1 VALIDÉE — ATTENTE GO-LIVE STRIPE  
**Emplacements Drive :** `PROJETS/OMNISECUR` (ID : `1BQd8Ohcc7R_sfRm04SFHegoukHeAz-EB`)  
**Dépôts GitHub :** `naitconv-web/omnisecur` (privé) & `naitconv-web/omnisecur-launch-kit` (privé)  

---

## 1. NATURE ET OBJECTIFS DU PROJET
- **Description :** Plateforme SaaS complète de pilotage opérationnel et de rentabilité pour dirigeants de sociétés de sécurité privée, intégrant la conformité réglementaire (CSI Livre VI) et conventionnelle (IDCC 1351 / Brochure 3196 + Avenant n° 2).
- **Modèle Économique :** Abonnement SaaS mensuel / annuel par agent sous contrat.
- **Cible :** PME de sécurité privée (15 à 250 salariés).

## 2. HISTORIQUE & DÉCISIONS STRATÉGIQUES CONFIRMÉES
- `2026-11-14` (`OMNI-2026-232`) : Finalisation technique v2.3.2 (`f6b1a87` sur `F8-dashboard`), 95 tests unitaires et 28 tests d'intégration PostgreSQL réels validés, horodatage serveur `clock_timestamp()`.
- `2026-11-14` (`WS-2026-003` & `004`) : Validation unanime de la Démo WOW Phase 1 (`audit/COS-MVP-Operations-demo-phase1.html` SHA-256 certifié).
- `2026-11-16` (`WS-2026-002-REV1` & `WS-2026-008`) : Readiness Commercial validé (parité calculateur conventionnel, Avenant n° 2 plancher 6h, Stripe stub sécurisé fail-closed, responsive mobile 390px).

## 3. ÉTAT RÉEL D'AVANCEMENT & ACTIFS RÉUTILISABLES
- **Stack :** Next.js 15, PostgreSQL, Vitest, CI `guardrails.yml`, journalisation chaînée SHA-256.
- **Actifs réutilisables pour SYNTESIA :** 
  - Moteur de calcul des majorations et amplitudes IDCC 1351 (dimanche, nuit, férié, coupure).
  - Trame de démonstrateur HTML autonome pour la verticale Sécurité Privée de SYNTESIA.
  - Kit de lancement commercial (`omnisecur-launch-kit`).

## 4. BLOCAGES & DERNIÈRES ÉTAPES FONDATEUR
- En attente de configuration finale par le Dirigeant des clés de production Stripe (`site-config.js`) et de l'activation des campagnes publicitaires.
