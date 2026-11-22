# RAPPORT TECHNIQUE — DIAGNOSTIC ET RÉSOLUTION DE L'ACCÈS SSH O2SWITCH

**Date (UTC) :** `2026-11-22T21:46:00Z`  
**Cible :** `langouste.o2switch.net` (`109.234.167.230:22`)  
**Statut :** Diagnostic terminé sans modification serveur (`NO-GO SSH depuis VM Remote Agents`)

---

## 1. CAUSE IDENTIFIÉE ET PREUVES

### Preuve directe (`ssh -vvv -o BatchMode=yes ruqa5736@langouste.o2switch.net`)
```text
debug1: Connecting to langouste.o2switch.net [109.234.167.230] port 22.
debug1: Connection established.
debug1: Local version string SSH-2.0-OpenSSH_9.2p1 Debian-2+deb12u10
debug1: kex_exchange_identification: banner line 0: HTTP/1.1 400 Bad Request
debug1: kex_exchange_identification: banner line 1: content-length: 11
debug1: kex_exchange_identification: banner line 2: content-type: text/plain
debug1: kex_exchange_identification: banner line 4: connection: close
kex_exchange_identification: Connection closed by remote host
```

### Explication technique exacte
- **Origine du blocage :** Le **proxy réseau de la sandbox Antigravity (`agy-plugin-proxy` / `127.0.0.1:35411`)**, et **non** o2switch ni le DNS.
- **Mécanisme :**
  1. Le DNS résout correctement `langouste.o2switch.net` → `109.234.167.230`.
  2. La sandbox intercepte les connexions TCP sortantes (y compris le port `22`), ce qui explique pourquoi `nc -vz` affiche `succeeded!`.
  3. Dès que le client `ssh` envoie la bannière du protocole SSH (`SSH-2.0-OpenSSH_9.2p1...`), le proxy HTTP/HTTPS local tente de la parser comme une requête HTTP, répond **`HTTP/1.1 400 Bad Request`** et ferme immédiatement la connexion (`EOFError`).
  4. Le protocole SSH brut est donc **structurellement incompatible** avec le proxy HTTP/HTTPS de cette VM.

---

## 2. RESTRICTIONS EXACTES DE L'ENVIRONNEMENT

- **Type d'environnement :** **Antigravity Remote Agents** (VM cloud éphémère Linux Debian 12 `x86_64`, `hostname: sandbox`, utilisateur non-root `antigravity`).
- **Sandbox & Réseau (`exebox` + `agy-plugin-proxy`) :**
  - Trafic sortant routé via `HTTP_PROXY` / `HTTPS_PROXY` (`http://127.0.0.1:35411`), restreint aux hôtes des plugins connectés (GitHub, Google Workspace) et aux domaines HTTP/HTTPS autorisés (`ambressence.com`).
  - Les protocoles TCP non-HTTP (SSH `port 22`, SFTP) échouent au niveau du proxy (`HTTP/1.1 400 Bad Request`).
  - L'accès HTTPS à `https://clients.o2switch.fr` et `https://langouste.o2switch.net:2083` est filtré (`HTTP/2 503` / `HTTP 403`).
- **Filesystem & Secrets :**
  - `/` est en lecture seule ; seuls `/home/antigravity` et `/tmp` sont inscriptibles.
  - `~/.ssh` est volontairement absent/masqué dans la sandbox (`ls: cannot access '/home/antigravity/.ssh/'`).
  - Aucune exécution hors sandbox n'est disponible dans cet environnement.

---

## 3. COMPARAISON DES 4 SOLUTIONS (PHASE 3)

| Option | Faisabilité depuis cette VM | Sécurité | Maintenabilité / Automatisation | Limites |
| :--- | :---: | :---: | :---: | :--- |
| **1. Connexion SSH directe depuis Antigravity Remote** | **Impossible** | N/A | N/A | Bloquée par `agy-plugin-proxy` (`HTTP 400` sur bannière SSH). |
| **2. Environnement local (PC Windows / WSL2 / Antigravity Desktop)** | **Hors VM** (exécuté par le fondateur / Codex local) | Moyenne (dépend du poste local) | Faible (manuel, dépend d'un poste allumé) | Impossible à piloter directement depuis la VM cloud. |
| **3. Déploiement automatisé depuis GitHub (GitHub Actions → SSH/SFTP o2switch)** | **100 % compatible** *(Antigravity pousse sur GitHub, GitHub Actions déploie sur o2switch)* | **Élevée** *(clé SSH stockée chiffrée dans GitHub Secrets, jamais exposée)* | **Maximale** *(CI/CD traçable, réversible, zéro intervention humaine après setup)* | Nécessite **1 action unique de 5 min** du fondateur (ajouter les secrets SSH dans GitHub Repo Settings). |
| **4. Terminal cPanel o2switch** | **Hors VM** (interface web cPanel `:2083`) | Élevée | Faible (100 % manuel) | Utile en dépannage ponctuel uniquement. |

---

## 4. SOLUTION RECOMMANDÉE : DÉPLOIEMENT AUTOMATISÉ VIA GITHUB ACTIONS (`CI/CD`)

C'est la **seule solution qui redonne à Antigravity une autonomie complète sur les fichiers o2switch sans jamais contourner la sandbox ni exposer de secret** :
1. Antigravity édite et teste les fichiers (`ambressence-maquettes.php`, `ambressence-legal-config.php`, `11-recherche.html`, `.htaccess`, etc.) dans le dépôt GitHub.
2. Un workflow **GitHub Actions** (exécuté sur les runners GitHub `ubuntu-latest`, qui disposent d'un accès réseau SSH/SFTP direct vers `langouste.o2switch.net:22`) déploie automatiquement sur o2switch à chaque push validé sur `main` (ou déclenchement manuel `workflow_dispatch`).

---

## 5. PROCÉDURE D'IMPLÉMENTATION & TESTS DE VALIDATION *(EN ATTENTE DE VALIDATION)*

### Étape A — Configuration unique côté Fondateur (5 min, sans exposer de secret dans le chat)
1. Dans **cPanel o2switch → Accès SSH** (ou Terminal cPanel), générer une paire de clés SSH dédiée au déploiement (`ed25519`) et autoriser la clé publique dans `~/.ssh/authorized_keys` sur o2switch.
2. Dans **GitHub → Dépôt → Settings → Secrets and variables → Actions**, ajouter les 4 secrets :
   - `O2SWITCH_HOST` = `langouste.o2switch.net`
   - `O2SWITCH_PORT` = `22`
   - `O2SWITCH_USER` = `ruqa5736`
   - `O2SWITCH_SSH_KEY` = *(clé privée dédiée)*

### Étape B — Implémentation GitHub Actions (côté Antigravity après votre validation)
- Créer `.github/workflows/deploy-o2switch.yml` avec mode `dry-run` par défaut, sauvegarde préalable côté serveur, et copie ciblée (`rsync`/`scp` ou `ssh`) des fichiers validés.

### Étape C — Tests de validation (critères de succès)
1. **Test lecture seule (`workflow_dispatch` diagnostic) :** Le runner GitHub exécute `hostname && pwd && wp --info` sur `langouste.o2switch.net` avec code retour `0`.
2. **Test écriture réversible :** Déploiement d'un fichier témoin ou patch `ambressence-maquettes.php` suivi d'un contrôle HTTP `200` sur `ambressence.com`.
3. **Vérification zéro fuite :** Aucune clé ni mot de passe dans les logs Actions ou dans Git.
