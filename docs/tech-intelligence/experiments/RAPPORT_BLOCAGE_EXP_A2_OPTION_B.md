# RAPPORT DE BLOCAGE — OPTION B (`DEC-18` / `WS-TECH-INTELLIGENCE-004`)

**Date :** `2026-11-23`  
**Décision concernée :** `DEC-18` — Seconde expérimentation `Craft Anything` (`Study → Build → Check → Ready`) sur fiche produit responsive **AMBRESSENCE**  
**Option testée :** **Option B** (pilotage MCP/CLI dans la VM cloud, `0,00 €`, zéro nouvelle installation, **interdiction stricte d'utiliser `--no-sandbox` sur Chromium**)  
**Verdict de pré-exécution :** **`BLOQUÉ — ARRÊT AVANT TOUTE CONSTRUCTION`**

---

## 1. Vérifications factuelles exécutées dans la VM

Conformément à l'arbitrage du PDG, aucune construction n'a été commencée. Les vérifications suivantes ont été exécutées en direct sur le binaire `v0.6.1` déjà présent dans `/tmp/ws_exp_a/` :

### A. Capacités MCP réellement exposées (`craft-anything-cli --clean-room mcp`)
- **Initialisation MCP (`protocolVersion: 2025-06-18`) :** Succès.
- **`tools/list` par défaut :** `30` outils exposés (`27` outils `core_*`, `rebuild_check`, `list_toolsets`, `enable_toolset`).
- **`capabilities` en mode `--clean-room` :** Déclare disponibles `7` outils `browser` (`web_site_open`, `web_site_capture`, `web_page_screenshot_take`, `web_pixels_compare`, `web_walkthrough_check`, `web_page_states_capture`, `web_site_close`), `28` outils `projects`, `6` outils `build`, `20` outils `setup`.

### B. Test réel de la phase `Study` via MCP (`web_site_open`)
- **Appel testé :** `tools/call` → `web_site_open` sur un micro-serveur HTTP local éphémère (`http://127.0.0.1:<port>/`), avec `--clean-room --allow-run` et **sans** `--no-sandbox`.
- **Résultat réel :** **ÉCHEC en `0,10 s`** (`isError: true`, `code: "program_failed"`).
- **Erreur exacte retournée par Chromium :**
  ```text
  [5843:5843:1123/023716.992780:FATAL:sandbox/linux/services/credentials.cc:137] Check failed: . : Function not implemented (38)
  Couldn't start the private browser: chromium closed after 0.1 s, before it was ready.
  ```
- **Conséquence :** Dans ce conteneur Linux (où les user namespaces du noyau ne permettent pas le sandbox SUID/userns natif de Chromium), **aucun outil MCP d'observation/capture web de `Craft Anything` (`web_site_open`, `web_site_capture`, `web_page_screenshot_take`, `web_walkthrough_check`) ne peut fonctionner sans désactiver le sandbox Chromium (`--no-sandbox`)**, ce qui est **formellement interdit** par l'arbitrage PDG.

### C. Vérification du backend AI à `0,00 €` supplémentaire (`craft-anything-cli ai list`)
- **Commande exécutée :** `craft-anything-cli ai list`
- **Sortie exacte :** `[]` (**zéro backend AI configuré**).
- **Conséquence :** Le moteur natif `rebuild` / `rebuild_start` de `Craft Anything` est inutilisable sans backend configuré. Même avec `Antigravity` en pilote MCP pour la phase `Build` et `web-pixels-compare` pour la phase `Check`, **le cycle complet `Study → Build → Check` reste cassé dès la phase `Study`** à cause du blocage Chromium décrit au point B.

---

## 2. Décision d'arrêt & Respect des consignes PDG

| Condition imposée par le PDG | Statut | Preuve |
| :--- | :---: | :--- |
| Vérifier les capacités MCP réelles | **FAIT** | `30` outils `core_*` + `browser` testé |
| Vérifier l'existence d'un backend à `0 €` | **FAIT** | `ai list` → `[]` (`0` backend natif) |
| Ne pas contourner Chromium avec `--no-sandbox` | **RESPECTÉ** | Aucune exécution `--no-sandbox` |
| Ne pas basculer automatiquement vers l'Option A | **RESPECTÉ** | Aucune action locale lancée |
| Ne commencer aucune construction avant validation | **RESPECTÉ** | `0` fichier prototype créé |
| Dépense & installation supplémentaires | **`0,00 €`** | `0` paquet/binaire installé |

---

## 3. Options soumises à l'arbitrage du PDG

L'Option B étant **techniquement bloquée** sur la phase `Study` dans cette VM sans `--no-sandbox`, la suite de **`DEC-18`** nécessite un nouvel arbitrage explicite du PDG :

1. **Maintenir le blocage (`PAUSE` sur `DEC-18`)** : Ne pas exécuter A2 tant que l'environnement ne permet pas `Craft Anything` nativement sans contourner la sécurité Chromium.
2. **Autoriser explicitement l'Option A (poste local)** : Exécuter `Craft Anything` sur votre poste Windows 11 local (hors conteneur Linux restreint, avec un backend déjà autorisé à `0 €` et une URL de parfumerie publique désignée).
3. **Autoriser un périmètre réduit dans la VM (`Check` seul)** : Utiliser `Craft Anything` uniquement pour `web-pixels-compare` sur des captures fournies, en actant que `Craft Anything` ne réalise alors pas la phase `Study` dans la VM.
