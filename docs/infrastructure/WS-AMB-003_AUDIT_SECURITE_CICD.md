# WS-AMB-003 — AUDIT DE SÉCURITÉ ET VALIDATION DE L'ARCHITECTURE CI/CD O2SWITCH

**Date (UTC) :** `2026-11-22T21:55:00Z`  
**Document audité :** [ARCHITECTURE_CI_CD_O2SWITCH.md](./ARCHITECTURE_CI_CD_O2SWITCH.md) (`commit d93a72f`)  
**Référence officielle vérifiée :** Documentation o2switch — *Autorisation SSH - Liste blanche parefeu* (`https://faq.o2switch.fr/cpanel/outils/exception-parefeu/`, mise à jour 12/11/2026).  
**Contraintes respectées :** Aucun workflow créé, aucune modification o2switch, aucun secret exposé, aucun changement DNS.

---

## 1. RÉSULTATS DE L'AUDIT PAR OBJECTIF (1 À 10)

| # | Domaine audité | Conformité `d93a72f` | Constat technique vérifié |
| :-: | :--- | :---: | :--- |
| **1** | **Appels UAPI cPanel** | `Partielle` | Les 3 endpoints (`SshWhitelist/list`, `add?address=&port=22`, `remove?...&direction=in/out`) sont exacts selon la doc o2switch. **Manque :** contrôle strict du JSON retourné (`jq -e '.status == 1'`) et gestion du timeout pseudo-bloquant (35s). |
| **2** | **Directions IN/OUT & Quota (5 max)** | `Partielle` | La règle `in` + `out` (effacement effectif sous ~5 min) est bien documentée. **Faille :** `SshWhitelist/list` ne contient aucun label/commentaire ; sans variable `TRUSTED_FIXED_IPS`, le script ne peut pas distinguer une IP fixe du fondateur d'une IP CI/CD orpheline si `count == 5`. |
| **3** | **Authentification Jeton API** | `Conforme` | `Authorization: cpanel $LOGIN:$TOKEN` est la méthode officielle recommandée (02/05/2025). **Point d'attention :** incompatible sans TOTP si la 2FA cPanel est active ; privilèges larges du token cPanel. |
| **4** | **Runners GitHub & IP dynamiques** | `Non conforme` | Référence à l'action tierce `haythem/public-ip@v1.3` non épinglée par SHA (risque supply-chain). À remplacer par `curl -s https://api.ipify.org` + validation regex IPv4 stricte. |
| **5** | **Nettoyage après interruption** | `Insuffisant` | `if: always()` sur un step **ne s'exécute pas** en cas d'annulation manuelle, de timeout ou de crash du runner : l'IP reste bloquée dans les 5 slots. Nécessite `timeout-minutes: 10` + **auto-nettoyage au démarrage du run suivant** (hors `TRUSTED_FIXED_IPS`). |
| **6** | **Sauvegarde, restauration & rollback** | `Insuffisant` | Pas d'exclusions explicites (`wp-config.php`, `wp-content/uploads/`, `.htaccess`), pas de `php -l` préalable, et risque de demi-déploiement sans `--delay-updates`. |
| **7** | **Concurrence entre déploiements** | **`BLOQUANT`** | **Aucun verrou `concurrency` défini.** Deux pushs rapprochés créent une *race condition* (écrasement mutuel de fichiers + saturation du quota de 5 IP). |
| **8** | **Permissions minimales GitHub Actions** | `Manquant` | `permissions: { contents: read }` non spécifié explicitement sur le workflow. |
| **9** | **Secrets, logs & transport SSH** | `Insuffisant` | `StrictHostKeyChecking=no` expose au MITM ; écriture de `SSH_KEY` sur disque au lieu d'utiliser `ssh-agent` en mémoire ; risque `set -x` dans les logs. |
| **10** | **Protection mauvais répertoire** | **`BLOQUANT`** | **Aucune vérification de sentinelle ni regex sur `target_path`.** Une erreur de chemin peut écraser un autre site du même hébergement (`SYNTESIA` vs `AMBRESSENCE`). |

---

## 2. VULNÉRABILITÉS IDENTIFIÉES ET NIVEAU DE GRAVITÉ

1. **`VULN-01` (`CRITIQUE`) — Absence de verrou de concurrence (`concurrency`) :** Déploiements parallèles destructeurs sur o2switch + saturation des 5 slots `SshWhitelist`.
2. **`VULN-02` (`CRITIQUE`) — Absence de garde-fou sur le répertoire cible (`target_path`) :** Risque d'écrasement croisé entre sites hébergés sur le même compte cPanel.
3. **`VULN-03` (`ÉLEVÉ`) — Fuite de quota `SshWhitelist` après crash/annulation :** `if: always()` ne protège pas contre l'annulation ou le crash runner ; sans pré-nettoyage hors `TRUSTED_FIXED_IPS`, le pare-feu se bloque au bout de 5 incidents.
4. **`VULN-04` (`ÉLEVÉ`) — `StrictHostKeyChecking=no` + Clé privée écrite sur disque :** Risque d'attaque MITM et de persistance temporaire de la clé sur le disque du runner.
5. **`VULN-05` (`ÉLEVÉ`) — `rsync` sans exclusions critiques ni mise à jour atomique :** Risque d'altérer `wp-config.php`, `.htaccess` ou de laisser des fichiers PHP incomplets en cas d'erreur réseau.
6. **`VULN-06` (`MOYEN`) — Dépendance tierce non épinglée (`haythem/public-ip@v1.3`) :** Risque supply-chain évitable par un `curl` natif + regex IPv4.
7. **`VULN-07` (`MOYEN`) — Absence de `permissions: { contents: read }` :** Principe du moindre privilège non appliqué au `GITHUB_TOKEN`.

---

## 3. CORRECTIONS NÉCESSAIRES & ARCHITECTURE DÉFINITIVE RECOMMANDÉE

Pour passer en production, l'architecture définitive doit intégrer obligatoirement ces **7 correctifs** :
1. **Concurrence stricte :** `concurrency: { group: o2switch-${{ inputs.project_id }}, cancel-in-progress: false }` + `timeout-minutes: 10`.
2. **Détection IP sans action tierce :** `RUNNER_IP=$(curl -sf https://api.ipify.org)` + validation regex IPv4 stricte avant tout appel UAPI.
3. **Gestion blindée du quota `SshWhitelist` :**
   - Variable non secrète `TRUSTED_FIXED_IPS` (IP fixes du fondateur).
   - Au démarrage : si `count >= 4`, suppression (`in` + `out`) des IP non présentes dans `TRUSTED_FIXED_IPS`.
   - Ajout IP runner + vérification `jq -e '.status == 1'` et relecture `list`.
   - En fin de job (`if: always()`): suppression `in` + `out` de `$RUNNER_IP`.
4. **Transport SSH durci :** Chargement de `SSH_KEY` en mémoire via `ssh-agent` (`ssh-add -`) + vérification d'empreinte serveur via `SSH_KNOWN_HOSTS` (`StrictHostKeyChecking=yes`).
5. **Validation sentinelle du répertoire cible :** Validation regex de `target_path` + vérification distante que le marqueur attendu existe (`test -f "$TARGET_PARENT/wp-config.php"`) avant tout `rsync`.
6. **Sauvegarde & `rsync` sûr :** `php -l` local sur tout fichier `.php` modifié, sauvegarde serveur horodatée avant écriture, `rsync --delay-updates` avec exclusions (`--exclude='wp-config.php' --exclude='.htaccess' --exclude='wp-content/uploads/' --exclude='.env'`), puis test `curl -sf` (rollback automatique si échec).
7. **Moindre privilège GitHub :** `permissions: { contents: read }`, environnement `production` avec approbation humaine optionnelle, et interdiction absolue de `set -x` dans les étapes manipulant des jetons.

---

## 4. PLAN DE TESTS PROGRESSIF & CRITÈRES GO / NO-GO

### Plan de tests progressif (après validation humaine)
- **Palier 1 (Lecture seule CI) :** Test `SshWhitelist` (`list` → `add` → `list` → `remove in/out`) + `ssh ... "hostname && pwd"` sans aucun transfert de fichier.
- **Palier 2 (`Dry-Run` + Sentinelle) :** Exécution `rsync --dry-run` vérifiant la sentinelle répertoire et la liste exacte des fichiers qui seraient touchés.
- **Palier 3 (Déploiement fichier témoin + Rollback) :** Déploiement d'un fichier non critique, vérification `HTTP 200`, puis test du mécanisme de rollback.

### Critères obligatoires pour `GO`
1. Les 7 correctifs ci-dessus sont intégrés dans la spécification finale.
2. Les 4 secrets (`CPANEL_SERVER`, `CPANEL_USERNAME`, `CPANEL_API_TOKEN`, `SSH_KEY`) + `SSH_KNOWN_HOSTS` sont configurés dans GitHub Environments (et 2FA cPanel vérifiée).
3. La variable `TRUSTED_FIXED_IPS` et les chemins cibles exacts par projet sont validés par le fondateur.

---

## 5. RECOMMANDATION EXPLICITE

**VERDICT AUDIT : `NO-GO` pour la création du workflow sur la base brute de `d93a72f`.**  
**`GO CONDITIONNEL` uniquement après votre validation des 7 correctifs de sécurité ci-dessus.**  

*(Aucune implémentation ne sera lancée avant votre validation explicite.)*
