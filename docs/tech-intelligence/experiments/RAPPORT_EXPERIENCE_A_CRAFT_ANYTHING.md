# RAPPORT D'EXPÉRIENCE A — `Craft Anything` (`v0.6.1`, Mode Clean Room)

**Date :** `2026-11-23` · **Projet pilote :** `AMBRESSENCE` *(prototype isolé dans `/tmp/ws_exp_a/`, zéro modification de `ambressence.com` ni de WooCommerce)*  
**Budget réel engagé :** **`0,00 €`**

---

## 1. INSTALLATION & VÉRIFICATIONS PRÉALABLES (ISOLÉES DANS `/tmp/ws_exp_a/`)
- **Source :** Release officielle `storytold/craft-anything` `v0.6.1` (`craft-anything-0.6.1-linux-x86_64.tar.gz`).
- **Intégrité :** SHA-256 vérifié via `SHA256SUMS.txt` (`OK`).
- **Licence :** `MIT OR Apache-2.0` (`LICENSE-MIT` + `LICENSE-APACHE`).
- **Diagnostic `craft-anything-cli --clean-room doctor` :**
  - `binary`: `ok` (`craft-anything-cli 0.6.1`)
  - `engine:chromium`: `ok` (`/usr/bin/chromium`)
  - `mcp:self-test`: `ok` (`protocol 2025-06-18, 30 tools listed`)
  - `ai`: `info` (`No AI backend is set up (optional)` — `0` clé API configurée).

---

## 2. DÉROULÉ RÉEL & PREUVES MESURÉES
1. **Cible de référence légitime :** Page produit neutre locale (`/tmp/ws_exp_a/ref_site/index.html`) sur serveur HTTP éphémère (`127.0.0.1`), sans aucune marque protégée ni accès à un code concurrent privé.
2. **Test de `web-site-open` (Clean Room CLI) :**
   - **Échec observé dans le sandbox VM :** `web-site-open` ne expose pas l'option `--no-sandbox` pour Chromium (`sandbox/linux/services/credentials.cc:137: Function not implemented (38)`), et le CLI signale qu'une session persistante requiert le serveur MCP ou l'app Desktop.
3. **Construction isolée AMBRESSENCE (`/tmp/ws_exp_a/amb_proto/index.html`) :**
   - Réalisée par Antigravity (car `craft-anything` n'avait pas de backend AI configuré à `0 €`), en respectant la charte Or `#b5812e` / Ivoire `#fbfaf7`, les données fictives (*Voile d'Ambre — 100 ml — 74,00 €*), la galerie interactive (`3` vues), le bouton panier simulé, les délais (`48 h`, `2–5 j`, `14 j`, port offert dès `60 €`) et le responsive mobile (`390px`).
4. **Comparaison réelle via `craft-anything-cli --clean-room web-pixels-compare` (avec captures Chromium headless) :**
   - **Desktop (`1440×900`) :** `layout_similarity = 0.7939` (**`79 %`**), `perceptual_similarity = 0.8143` (**`81 %`**), preuve `ev_33471a92...` (`after_sha256: c685d5b7ab63...`, `before_sha256: dd7ea76fb319...`).
   - **Mobile (`390×844`) :** `layout_similarity = 0.4800` (**`48 %`**), `perceptual_similarity = 0.4893` (**`49 %`**), preuve `ev_fc6d0c23...` — écart détecté objectivement sur mobile (dû à la rangée de miniatures et au badge).

---

## 3. LIMITES OBSERVÉES & VERDICT EXPÉRIENCE A
- **Ce qui fonctionne réellement à `0 €` :** Le serveur **MCP (`30` outils)** et le moteur de comparaison visuelle **`web-pixels-compare`** (SSIM + layout) sont fiables et rapides.
- **Limites observées :** `web-site-open` échoue dans un conteneur sandbox Linux sans `--no-sandbox`, et la phase de reconstruction IA exige un agent de code externe connecté (Claude Code ou clé API payante).
- **Recommandation :** **`GO SOUS CONDITIONS`** comme outil ponctuel d'audit/comparaison visuelle en mode Clean Room (sur poste local ou via MCP) · **`NO-GO`** pour tout déploiement direct sur `ambressence.com`.
