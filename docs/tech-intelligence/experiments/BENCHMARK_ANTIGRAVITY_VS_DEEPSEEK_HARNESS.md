# BENCHMARK COMPARATIF — `Antigravity` vs `DeepSeek Harness` (`WS-TECH-INTELLIGENCE-003`)

**Tâche de référence :** Création d'une fiche produit e-commerce responsive isolée pour AMBRESSENCE (`/tmp/ws_exp_a/amb_proto/index.html`, galerie 3 vues, prix, infos légales/livraison, panier simulé, responsive `390px`).  
**Condition de comparabilité :** **`NON COMPARABLES EN EXÉCUTION LLM`** dans cette VM à `0,00 €` (`Antigravity` a exécuté la tâche ; `DeepSeek Harness` a été installé en `0.2.2-rc.5` puis **suspendu** faute de clé API à `0 €`).

| Indicateur | **Antigravity** *(Mesuré en direct)* | **DeepSeek Harness (`dsh 0.2.2-rc.5`)** *(État réel)* |
| :--- | :--- | :--- |
| **Temps de réalisation** | `~2 min` *(écriture + captures Chromium + comparaison)* *(Mesuré)* | **`NON MESURÉ`** *(installation seule : `~2 min` pour `671` paquets ; exécution suspendue)* |
| **Coût réel** | **`0,00 €`** *(inclus abonnement existant)* *(Mesuré)* | **`0,00 €` engagé** *(exige clé API DeepSeek payante pour exécuter)* |
| **Qualité du code** | HTML/CSS/JS autonome, `0` dépendance externe, `aria-live`, `aria-pressed` *(Vérifié)* | **`NON TESTÉ`** *(exécution suspendue)* |
| **Nombre de corrections** | `0` sur le prototype *(2 ajustements CLI sur `craft-anything`)* *(Mesuré)* | **`NON TESTÉ`** |
| **Tests fonctionnels réussis** | Rendu DOM Chromium `1440×900` & `390×844` + comparaison pixels OK *(Vérifié)* | **`NON TESTÉ`** |
| **Fidélité visuelle** | `79 %` layout / `81 %` détail (Desktop), `48 %` / `49 %` (Mobile) via `craft-anything` *(Mesuré)* | **`NON TESTÉ`** *(nécessiterait en plus un plugin vision tiers `ModLens`)* |
| **Erreurs rencontrées** | `0` sur le prototype (`web-site-open` bloqué en sandbox Linux sans `--no-sandbox`) | **Blocage :** `0` clé API disponible + `5` avertissements `install-scripts` npm |
| **Sécurité** | Sandbox `exebox` + `AGENTS.md` + `harness_ctl.py` + `hook_guard.py` *(Vérifié)* | `671` paquets npm + `koffi`/`node-pty` + aucune intégration `harness_ctl.py` *(Vérifié)* |
| **Facilité de maintenance** | **Élevée** (natif dans `WORKSTATION-IA`) *(Appréciation)* | **Faible** (`developer preview`, breaking changes annoncés) *(Appréciation)* |
