# LIVRABLE 4 — PROTOCOLE OBLIGATOIRE DE PRÉFLIGHT AVANT CHAQUE MISSION

**Référence :** SYNTESIA-HARNESS-PREFLIGHT-011 (Mission AGIA-011)  
**Commande d'exécution automatisée :** `python3 scripts/harness_ctl.py preflight`  
**Durée d'exécution cible :** `< 1 seconde` (`0 token LLM` consommé par l'exécution du script)

---

## 1. OBJECTIF DU PRÉFLIGHT

Le Préflight interdit à tout agent (Antigravity, Paseo/Vibe, OpenCode, Claude Code, ChatGPT) de commencer à modifier des fichiers sur la base d'hypothèses ou de souvenirs de conversation. Il ancre l'agent sur **l'état physique réel du dépôt Git et du registre de mémoire** à l'instant $t_0$.

---

## 2. LES 6 CONTRÔLES AUTOMATISÉS EXÉCUTÉS PAR `harness_ctl.py preflight`

Lorsqu'un agent démarre une session ou reprend après une interruption / compaction, il exécute obligatoirement :
```bash
python3 scripts/harness_ctl.py preflight
```

Ce script effectue dans l'ordre les 6 vérifications suivantes :
1. **Contrôle d'intégrité Git (`GIT_STATE`) :**
   - Vérifie la branche courante (`main`), le commit `HEAD` (`git rev-parse --short HEAD`) et l'état de l'arbre de travail (`git status -s`).
   - Si des fichiers non committés sont présents suite à une interruption brutale (`Test C`), le préflight les signale explicitement afin que l'agent les inspecte au lieu de les écraser.
2. **Chargement du dernier Checkpoint valide (`LAST_CHECKPOINT`) :**
   - Lit le fichier de checkpoint le plus récent dans `docs/harness/checkpoints/` (ex. `CP-AGIA-011.json`), affiche l'identifiant de la dernière mission, son état, les anomalies ouvertes et les prochaines actions prioritaires.
3. **Chargement du Registre de Mémoire (`MEMORY_STATE`) :**
   - Lit `docs/harness/state/harness_memory.json` (miroir de `REGISTRE_MEMOIRE.md`), vérifie que chaque élément possède l'un des 6 statuts autorisés (`CONFIRMED`, `DECLARED`, `PROPOSED`, `IN_PROGRESS`, `BLOCKED`, `SUPERSEDED`).
4. **Détection des Contradictions Documentaires (`CONFLICT_DETECTOR`) :**
   - Vérifie la table `conflicts` du registre de mémoire. Si un conflit non résolu (`status == "UNRESOLVED"`) existe entre deux documents (`Test D`), le préflight émet une alerte **`[CONFLICT_DETECTED]`** et interdit d'écraser l'une ou l'autre source sans arbitrage.
5. **Vérification des Garde-Fous Permanents (`GUARDRAILS_CHECK`) :**
   - Vérifie dans `sites/shared/syntesia-forms.js` que `WEBHOOK_ENABLED: false` et `ENVIRONMENT: "PREPROD"` sont intacts (tant que l'ordre Go-Live n'est pas donné).
   - Rappelle le régime financier **`F1 = 0,00 €`** et l'interdiction de contacter tout prospect.
6. **Sélection des `SHARDS` pertinents (`SHARD_ROUTING`) :**
   - Affiche la liste des 5 Shards (`SHARD-01` à `SHARD-05`) afin que l'agent ne lise que les 2 ou 3 fichiers nécessaires à sa mission courante (économie maximale de quota/tokens).

---

## 3. RÈGLE D'ARRÊT EN CAS D'ÉCHEC DU PRÉFLIGHT (`FAIL-CLOSED`)

Si `python3 scripts/harness_ctl.py preflight` retourne un code de sortie non nul (`exit code != 0`) :
- L'agent **ne doit modifier aucun fichier métier**.
- Il diagnostique l'erreur signalée (ex. corruption JSON, conflit non résolu ou violation d'un garde-fou), documente l'écart et applique la procédure de reprise ou d'escalade au fondateur.
