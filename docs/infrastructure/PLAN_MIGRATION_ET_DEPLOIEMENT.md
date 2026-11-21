# PLAN DE MIGRATION ET DE DÉPLOIEMENT O2SWITCH (EN ATTENTE DE VALIDATION)

**Date :** 2026-11-21  
**Statut :** **Plan préparatoire uniquement — aucune exécution sans accord explicite du fondateur**

---

## Phase 0 — Gel & Préservation (Effectif dès AGIA-013)
- Sites `sites/france/` et `sites/algerie/` maintenus en **pause** (`WEBHOOK_ENABLED=false`, `PREPROD`).
- Zéro suppression de fichier, zéro modification DNS, zéro résiliation, zéro dépense.

## Phase 1 — Complétion de l'audit compte réel (Action fondateur)
- Le fondateur partage les **7 captures/exports cPanel** (sans mot de passe ni donnée bancaire) listés dans `AUDIT_O2SWITCH_SYNTESIA.md`.
- Antigravity met à jour `INVENTAIRE_INFRASTRUCTURE_O2SWITCH.md` pour remplacer les mentions `IMPOSSIBLE À VÉRIFIER FAUTE D'ACCÈS` par les valeurs réelles du compte (formule, lunes, versions PHP/Node, espace disque).

## Phase 2 — Structuration de l'arborescence cible (Sous validation fondateur)
- Isoler `ambressence.com` dans son propre répertoire/lune sans toucher à son contenu.
- Créer un environnement dédié SYNTESIA (sous-domaine ou lune séparée) uniquement pour :
  1. Le démonstrateur commercial (`sites/demonstrateur/`).
  2. Un éventuel endpoint PHP/SQL de démonstration ou de collecte interne (si validé lors du Go-Live).

## Phase 3 — Déploiement contrôlé & Recette post-déploiement (Futur)
- Déploiement depuis `naitconv-web/agia-infrastructure` (`main`) via SSH/SFTP ou Git cPanel.
- Vérification HTTPS (Let's Encrypt), en-têtes de sécurité, absence de secrets dans le dépôt public, et validation finale par le fondateur avant toute exposition commerciale.
