# LIVRABLE 5 — PROTOCOLE DE CHECKPOINT ET DE REPRISE SANS CONVERSATION

**Référence :** SYNTESIA-HARNESS-CHECKPOINT-011 (Mission AGIA-011 — Section 4)  
**Commande de génération :** `python3 scripts/harness_ctl.py checkpoint --mission <MISSION_ID>`  
**Commande de reprise à froid :** `python3 scripts/harness_ctl.py resume`  
**Emplacement des checkpoints :** `docs/harness/checkpoints/CP-<MISSION_ID>.json` & `docs/harness/checkpoints/CP-<MISSION_ID>.md`

---

## 1. PRINCIPE DE CONTINUITÉ INTER-AGENTS ET INTER-MODÈLES

Tout agent qui termine une mission, atteint un palier intermédiaire (ex. quota `< 20 %`) ou rencontre un blocage (`BLOCKED`) doit enregistrer un **Checkpoint standardisé** dans `docs/harness/checkpoints/` et le versionner dans Git.

Grâce à ce checkpoint, **un nouvel agent ou un autre modèle démarrant avec zéro historique de conversation** retrouve en **1 seule commande (`python3 scripts/harness_ctl.py resume`)** l'intégralité du contexte opérationnel.

---

## 2. LES 12 CHAMPS OBLIGATOIRES DU CHECKPOINT STANDARD

Chaque checkpoint généré par `harness_ctl.py` contient obligatoirement les **12 sections** exigées par l'architecture SYNTESIA :

1. **`mission_id` (Identifiant de mission) :** Code unique (ex. `AGIA-011`) et horodatage ISO-8601 UTC.
2. **`objective` (Objectif) :** But précis de la mission et critères de réussite.
3. **`current_state` (État actuel) :** Statut normalisé (`CONFIRMED`, `IN_PROGRESS`, `BLOCKED`) + résumé de l'état de la boucle (`PLAN`, `EXECUTE`, `TEST`, `VERIFY`, `CORRECT`, `REPORT`).
4. **`confirmed_decisions` (Décisions confirmées) :** Liste des décisions actives qui s'imposent à l'agent repreneur (`DEC-01` à `DEC-06`).
5. **`facts_and_sources` (Faits et sources consultés) :** Références exactes des fichiers et preuves inspectés (`FACT-01` à `FACT-08`).
6. **`files_created_or_modified` (Fichiers créés ou modifiés) :** Liste exhaustive des chemins relatifs touchés pendant la mission avec leur empreinte SHA-256 courte.
7. **`commits_made` (Commits réalisés) :** Liste des commits Git (`SHA` court + message) effectués sur la branche `main`.
8. **`tests_executed` (Tests exécutés et résultats) :** Commandes de test lancées, nombre de tests réussis/échoués et chemin du rapport de preuve.
9. **`open_anomalies` (Anomalies ouvertes) :** Anomalies éventuelles non encore résolues, classées `P0 / P1 / P2`.
10. **`remaining_actions` (Actions restantes classées par priorité) :** File d'attente ordonnée (`P0`, `P1`, `P2`) des prochaines étapes techniques ou commerciales.
11. **`exact_resume_instructions` (Instructions exactes pour reprendre) :** Séquence de commandes et de fichiers à lire pour continuer immédiatement le travail sans poser de questions redondantes au fondateur.
12. **`required_permissions_or_validations` (Permissions ou validations encore nécessaires) :** Liste des décisions souveraines réservées au fondateur (ex. les 5 étapes Go-Live ou l'attachement d'un dépôt secondaire en `HTTP 403`).

---

## 3. PROCÉDURE DE REPRISE APRÈS INTERRUPTION BRUTALE (`TEST C`)

Lorsqu'une mission est interrompue brutalement (coupure réseau, expiration de session, épuisement de quota au milieu d'une boucle `EXECUTE` ou `TEST`) :
1. Le nouvel agent exécute `python3 scripts/harness_ctl.py resume`.
2. Le script compare l'arbre Git courant (`git status --porcelain`) avec le dernier checkpoint `docs/harness/checkpoints/LATEST.json`.
3. Si une tâche était au statut `IN_PROGRESS` (ex. étape `EXECUTE`, tentative `1/3`), le script indique exactement à quelle étape de la boucle reprendre sans refaire les étapes déjà validées (`CONFIRMED`).
