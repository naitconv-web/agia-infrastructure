# FICHE PROJET 07 — MISSION EMERGENCY CASHFLOW (EC) & DÉPÔT PROJET-PILOTE

- **Statut du document :** `AUDIT DOCUMENTAIRE TERMINÉ — VALIDATION DU FONDATEUR EN ATTENTE`
- **Sources Originales Consultées et Contrôlées :**
  - Dossier Drive `EC-SUPERVISION` (ID : `1jqxJSs4rgJyluFXcAO0Dg2JRvufyREbC`)
  - Tableur Google Sheets `EC — Tableau de Supervision` (ID : `16Ag0iXl1W1jilZ9BhiyjfUKznpMqV5_BWXG0Vsga1M0`)
  - `SUPERVISION_DASHBOARD.md` (ID : `1eVtfbWs-Hq0zjEdYyUme-NKXYCkDFCdl`)
  - `EC-005_SUPERVISION_ARCHITECTURE.md` (ID : `1lAcKBZWT8r0k4jtYh8Qm-vcSFB5I1jYL`)
  - `EC-006_PERFORMANCE_PROTOCOL.md` (ID : `1UbOugp1cZvc_ROU1YaLKlYQAme_uSQaC`)
  - Rapports d'audit `AUDIT_2026-11-21_0154_EC006_CONTRE_AUDIT_PHASE_D.md` (`1eQ0cP9S...`)
  - Dépôts GitHub privés : `naitconv-web/ec-mission-state` & `naitconv-web/projet-pilote`

---

## 1. MISSION EMERGENCY CASHFLOW (`EC-001` à `EC-006`)

| Élément | Constat factuel dans les sources | Statut de preuve |
| :--- | :--- | :--- |
| **Nature et architecture de la mission** | Mission de 90 jours dotée d'une architecture de supervision propriétaire et d'audit indépendant en lecture seule (`ec-operator` v4 et `ec-auditor`), avec contrôle anti-gaming (`C9`) et protection des règles financières (`C10`). | `CONFIRMÉ PAR SOURCE` (`EC-005_SUPERVISION_ARCHITECTURE.md`) |
| **État opérationnel réel au 21/11/2026** | Statut mission : **`PREPARATION`** (`j0=null`, Jour `0 / 90`). Palier d'autonomie : **`P0 — Préparation`** sous régime financier **`F1`** (`0,00 €` autonome jusqu'à ratification explicite `V-001`). Dernière action enregistrée : `ACT-012` (durcissement P1/P2 post-contre-audit Phase D, 47/47 SHA-256 vérifiés, `0,00 €` dépensé). | `CONFIRMÉ PAR SOURCE` (`SUPERVISION_DASHBOARD.md`) |
| **Dépôt GitHub `naitconv-web/ec-mission-state`** | Existence et date de mise à jour (`2026-11-21T01:58:39Z`) vérifiées via `gh repo list`. Lecture interne via API GitHub en `HTTP 403` depuis la session courante (non attaché au projet courant), mais miroirs Drive complets et vérifiés par SHA-256. | `VÉRIFIÉ TECHNIQUEMENT` *(existence & miroir Drive)* / `DÉCLARÉ MAIS NON VÉRIFIÉ` *(accès Git direct)* |

---

## 2. DÉPÔT GITHUB `naitconv-web/projet-pilote`

- **Existence (`VÉRIFIÉ TECHNIQUEMENT`) :** Dépôt privé présent sur le compte GitHub `naitconv-web` (dernière mise à jour : `2026-11-13T00:39:21Z`, sans description).
- **Contenu et rôle (`À CLARIFIER`) :** Aucun document de `WORKSTATION-IA` sur Google Drive ne référence `projet-pilote` et l'API GitHub retourne `HTTP 403` (dépôt privé non attaché). Son rôle exact (ancien bac à sable ou prototype initial) est signalé pour clarification éventuelle par le fondateur.
