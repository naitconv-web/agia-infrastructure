# ÉTUDE & PRÉPARATION — DÉPLOIEMENT GIT NATIF CPANEL (O2SWITCH)

**Date :** `2026-11-22`  
**Source officielle :** Documentation o2switch — *Git version control - Gitweb* (`https://faq.o2switch.fr/cpanel/fichiers/gitweb/`, mise à jour 13/11/2026).  
**Statut :** Étudié et préparé dans le dépôt (`.cpanel.yml` + `scripts/cpanel_deploy.sh`) — **aucune modification en production**.

---

## 1. FONCTIONNEMENT DU DÉPLOIEMENT GIT NATIF CPANEL

cPanel propose l'outil **Git™ Version Control** avec deux modes :
- **Mode `PUSH` :** On pousse directement depuis un poste vers le dépôt hébergé sur o2switch (`post-receive` hook).
- **Mode `PULL` (recommandé avec GitHub) :** Le dépôt sur o2switch est un **miroir** du dépôt privé GitHub (`naitconv-web/agia-infrastructure` ou `AMBRESSENCE`). Les mises à jour se font en deux clics dans cPanel (**Manage → Pull or Deploy → `Update from Remote` → `Deploy Head Commit`**).

### Prérequis techniques obligatoires (dépôt privé GitHub)
1. **Protocole `ssh://` obligatoire :** cPanel refuse les identifiants/tokens dans une URL `https://` pour cloner un dépôt privé. L'URL doit être `ssh://git@github.com/naitconv-web/agia-infrastructure.git`.
2. **Deploy Key SSH dédiée (côté o2switch → GitHub) :**
   - Générer une clé dédiée sur o2switch (ex. `~/.ssh/id_ed25519_github`) et vérifier `github.com` dans `~/.ssh/known_hosts`.
   - Ajouter la clé publique dans **GitHub → Repo Settings → Deploy keys** (lecture seule suffisante).
3. **Working tree propre :** `git status` dans le miroir cPanel doit être strictement propre, sinon cPanel refuse le déploiement.
4. **Fichier `.cpanel.yml` à la racine du dépôt :** Définit les tâches exécutées lors de `Deploy Head Commit`.

---

## 2. COMPARAISON : GIT NATIF CPANEL VS GITHUB ACTIONS (`o2switch-deploy.yml`)

| Critère | Git Natif cPanel (`PULL`) | GitHub Actions (`o2switch-deploy.yml`) |
| :--- | :--- | :--- |
| **Simplicité d'ouverture pare-feu** | **Maximale** (aucune IP runner à whitelister sur le port `22`, quota `5` IP préservé) | Nécessite `SshWhitelist` UAPI (`CPANEL_API_TOKEN`) |
| **Automatisation au `git push`** | Manuelle dans cPanel *(2 clics)* sauf appel UAPI externe | **100 % automatique** ou 1 clic `workflow_dispatch` |
| **Traçabilité & Contrôles pré-déploiement** | Limitée aux tâches `.cpanel.yml` | **Complète** (`php -l`, `dry-run`, logs GitHub, concurrence) |

**Recommandation :** Les deux approches sont **complémentaires** et sans conflit :
- `.cpanel.yml` + `scripts/cpanel_deploy.sh` vous donnent un **déploiement miroir de secours 100 % natif dans cPanel** sans dépendre de `SshWhitelist`.
- `o2switch-deploy.yml` reste la voie industrielle automatisée dès que les 5 secrets GitHub sont renseignés.

---

## 3. PROCÉDURE DE MISE EN PLACE DANS CPANEL *(QUAND VOUS SEREZ PRÊT)*

1. Dans **cPanel → Terminal** (sur `langouste.o2switch.net`), créer la clé de lecture GitHub :
   ```bash
   ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519 -N "" -C "o2switch-cpanel-git"
   ssh-keyscan github.com >> ~/.ssh/known_hosts
   cat ~/.ssh/id_ed25519.pub
   ```
2. Copier la clé publique dans **GitHub → `naitconv-web/agia-infrastructure` → Settings → Deploy keys → Add deploy key** (lecture seule).
3. Dans **cPanel → Git™ Version Control → Create** :
   - Cocher **Clone a Repository**
   - **Clone URL :** `ssh://git@github.com/naitconv-web/agia-infrastructure.git`
   - **Repository Path :** `/home/ruqa5736/repositories/agia-infrastructure`
   - **Repository Name :** `agia-infrastructure`
4. Pour tester sans risque : laisser `DRY_RUN=1` dans `scripts/cpanel_deploy.sh` lors du premier `Deploy Head Commit` (vérification des chemins et de la sentinelle sans rien copier).
