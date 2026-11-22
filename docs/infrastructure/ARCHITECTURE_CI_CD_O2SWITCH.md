# ARCHITECTURE INDUSTRIELLE DE DÉPLOIEMENT CI/CD — GITHUB ACTIONS → O2SWITCH (AVEC LISTE BLANCHE SSH DYNAMIQUE)

**Date :** `2026-11-22`  
**Portée :** Architecture standard réutilisable pour **AMBRESSENCE**, **SYNTESIA** et l'ensemble des projets hébergés chez **o2switch**.  
**Source officielle :** Documentation o2switch — *Autorisation SSH - Liste blanche parefeu* (`https://faq.o2switch.fr/cpanel/outils/exception-parefeu/`, mise à jour 12/11/2026).  
**Statut :** **SPECIFICATION ARCHITECTURALE VALIDÉE POUR REVUE** *(aucun fichier `.github/workflows/deploy-*.yml` créé avant feu vert)*.

---

## 1. PRINCIPE ARCHITECTURAL (ZÉRO DÉPENDANCE À LA SANDBOX ANTIGRAVITY)

La sandbox cloud Antigravity (`agy-plugin-proxy`) bloque le protocole SSH (`port 22`). L'architecture ci-dessous contourne proprement cette contrainte sans affaiblir la sécurité :

```text
[Antigravity VM] ──(HTTPS Git)──▶ [GitHub Repo (main / PR)]
                                        │
                                        ▼ (Déclenchement CI/CD sur ubuntu-latest)
                              1. Détection IP publique du runner
                              2. API cPanel SshWhitelist (port 2083, Token API)
                                 └─ Vérif quota (max 5) & Ajout IP runner (port 22)
                              3. Connexion SSH (clé dédiée) + Sauvegarde serveur
                              4. Déploiement ciblé (rsync / wp-cli) + Vérif HTTP 200
                              5. [always()] Suppression IP runner (in + out) + purge clé SSH
```

---

## 2. GESTION DYNAMIQUE DE LA LISTE BLANCHE O2SWITCH (`SshWhitelist` UAPI)

### Authentification retenue
- **Méthode officielle recommandée (depuis 02/05/2025) :** Jeton d'API cPanel (`Manage API Tokens`), en-tête :
  `Authorization: cpanel $CPANEL_USERNAME:$CPANEL_API_TOKEN`
- **Méthode écartée :** Identifiant/mot de passe cPanel dans l'URL (officiellement dépréciée par o2switch).
- *Point d'attention 2FA :* Si la double authentification (2FA) est activée sur cPanel, les appels API exigent un code TOTP ; le compte CI/CD ou la configuration cPanel doit en tenir compte.

### Endpoints officiels utilisés (`https://$CPANEL_SERVER:2083/execute/SshWhitelist/...`)
1. **Contrôle du quota (`list`) :** `GET /execute/SshWhitelist/list`
   - Règle o2switch : **5 exceptions maximum** au total (`in` + `out` = `1` exception).
   - *Règle d'architecture (protection des IP du fondateur) :* Ne **pas** appeler `remove_all` aveuglément si des IP fixes personnelles (poste du fondateur) sont présentes. Vérifier `data.count` : si `count >= 5`, ne purger que les anciennes IP CI/CD (ou alerter), sinon conserver les IP existantes.
2. **Ouverture dynamique (`add`) :** `GET /execute/SshWhitelist/add?address=$RUNNER_IP&port=22`
   - Appel **pseudo-bloquant** (~20 s à 35 s max) : attend la prise en compte effective dans le pare-feu o2switch avant de rendre la main.
   - Vérification explicite via `list | grep $RUNNER_IP` avant de lancer `ssh` / `rsync`.
3. **Fermeture systématique (`remove` en `if: always()`) :**
   - `GET /execute/SshWhitelist/remove?address=$RUNNER_IP&port=22&direction=in`
   - `GET /execute/SshWhitelist/remove?address=$RUNNER_IP&port=22&direction=out`
   - **Obligation critique o2switch :** Les deux directions (`in` et `out`) doivent être supprimées pour décrémenter le compteur d'exceptions (prise en compte sous ~5 min).

---

## 3. SÉCURITÉ, TRAÇABILITÉ & RÉVERSIBILITÉ

### Secrets GitHub (zéro secret dans Git ou dans le chat)
Déclarés au niveau **Repository Secrets** (ou **Environment `production`** avec validation manuelle optionnelle) :
- `CPANEL_SERVER` (ex. `langouste.o2switch.net`)
- `CPANEL_USERNAME` (ex. `ruqa5736`)
- `CPANEL_API_TOKEN` (jeton révocable à tout moment dans cPanel)
- `SSH_KEY` (clé privée `ed25519` dédiée uniquement au déploiement CI/CD)

### Réversibilité & Sauvegarde avant déploiement
1. **Avant chaque copie (`rsync`) :** Création automatique d'une archive horodatée sur o2switch (ex. `~/backups/deploy-<SHA>.tar.gz` avec rétention des 5 derniers déploiements).
2. **Déploiement ciblé (`--dry-run` optionnel) :** Aucun `--delete` global sur `public_html` (risque d'effacer `wp-content/uploads/` ou `.htaccess`) ; synchronisation ciblée uniquement sur les chemins versionnés (`mu-plugins/`, `ambressence-maquettes/`, thèmes).
3. **Contrôle post-déploiement & Rollback :** Vérification `HTTP 200` sur les URLs critiques ; en cas d'échec, restauration automatique de l'archive `deploy-<SHA>.tar.gz` dans le même job.
4. **Nettoyage systématique (`if: always()`) :** Suppression de `~/.ssh` sur le runner + suppression de l'IP du runner (`in` + `out`) sur o2switch.

---

## 4. INDUSTRIALISATION MULTI-PROJETS (PORTFOLIO O2SWITCH)

Pour industrialiser l'ensemble des projets hébergés sur o2switch (`AMBRESSENCE`, `SYNTESIA`, futurs sites) :
- **Modèle Reusable Workflow (`workflow_call`) :** Un seul workflow maître paramétrable par projet (`target_path`, `healthcheck_url`, `dry_run`), évitant de dupliquer la logique `SshWhitelist` et `backup/rollback`.
- **Isolation par environnement GitHub :** Chaque site cible dispose de son propre `Environment` (`ambressence-prod`, `syntesia-prod`) avec ses propres secrets et règles de protection.

---

## 5. PRÉREQUIS & TESTS DE VALIDATION AVANT MISE EN SERVICE

1. **Prérequis Fondateur (5 min) :** Générer le Token API dans cPanel (*Manage API Tokens*), générer une clé SSH `ed25519` dédiée dans `~/.ssh/authorized_keys` sur o2switch, et renseigner les 4 secrets GitHub.
2. **Test 1 — Cycle Whitelist API (sans déploiement) :** `list` → `add` IP runner → vérification `list` → `remove` (`in` + `out`).
3. **Test 2 — Handshake SSH & Lecture seule :** `ssh -i ... $CPANEL_USERNAME@$CPANEL_SERVER "hostname && pwd"` (exit `0`).
4. **Test 3 — Déploiement réversible & Rollback :** Déploiement en mode `dry-run`, puis déploiement d'un fichier témoin et vérification `HTTP 200`.
