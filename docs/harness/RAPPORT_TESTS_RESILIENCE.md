# LIVRABLE 7 — RAPPORT D'EXÉCUTION DES SIX TESTS DE RÉSISTANCE DU HARNESS (`TEST A` À `TEST F`)

**Référence :** SYNTESIA-HARNESS-RESILIENCE-011 (Mission AGIA-011 — Section 5)  
**Date d'exécution :** 21 novembre 2026  
**Commande d'exécution :** `python3 scripts/harness_ctl.py test-resilience`  
**Résultat global :** **`6 / 6 SCÉNARIOS TESTÉS ET RÉUSSIS (Exit Code 0)`**

---

## 1. SYNTHÈSE DES SIX SCÉNARIOS DE RÉSISTANCE EXÉCUTÉS

| Scénario obligatoire | Méthode de test exécutée en environnement contrôlé | Résultat & Preuve mesurée | Statut officiel |
| :--- | :--- | :--- | :---: |
| **Test A — Perte de conversation** | Lancement d'un sous-processus Python isolé (`subprocess.run`) avec un environnement vierge (`0` historique de conversation) qui lit uniquement `AGENTS.md`, `docs/harness/checkpoints/LATEST.json` et `docs/harness/state/harness_memory.json`. | Le processus vierge reconstitue `100 %` de l'état : commande de préflight détectée, mission active `AGIA-011`, `12/12` champs de checkpoint présents, garde-fou `WEBHOOK_ENABLED = false` vérifié et prochaine action `P0` identifiée. | **`TESTÉ ET RÉUSSI`** |
| **Test B — Changement de modèle** | Simulation de 3 adaptateurs de modèles distincts (`Antigravity-Cloud-Pro`, `Paseo-Mistral-Vibe-Local`, `ChatGPT-Go-Auditor`) consommant le contrat agnostique `harness_memory.json`. | Conservation à `100 %` des invariants critiques à travers les 3 modèles : Régime `F1 = 0,00 €`, `WEBHOOK_ENABLED = false`, décisions `DEC-01` à `DEC-06` et séparation des rôles `Concepteur != Auditeur`. | **`TESTÉ ET RÉUSSI`** |
| **Test C — Interruption brutale** | Injection d'un checkpoint interrompu au milieu d'une boucle (`status: "IN_PROGRESS"`, `loop_phase: "EXECUTE"`, `attempt: 1/3`, étapes 1 et 2 déjà complétées, étape 3 en attente). | Le moteur reprend exactement à la phase `EXECUTE`, incrémente le compteur d'essai à `2/3` (`<= max_attempts`), préserve les étapes 1 et 2 déjà acquises sans les ré-exécuter et cible l'étape 3 en attente. | **`TESTÉ ET RÉUSSI`** |
| **Test D — Contradiction documentaire** | Injection dans `detect_conflicts()` d'une affirmation contradictoire sur `FACT-06` (*« La SASU ATLAS GLOBAL TRADING est déjà immatriculée au RCS avec Kbis actif »*) face à la vérité enregistrée (*« Kbis NON DÉMONTRÉ / BLOCKED »*). | Le Harness déclenche l'alerte **`DYN-CONFLICT-FACT-06` (`CONFLICT_DETECTED`)**, applique la règle **`PRESERVED_BOTH_NO_OVERWRITE`** et vérifie que l'énoncé original de `FACT-06` est resté `100 %` intact (`original_data_intact = True`). | **`TESTÉ ET RÉUSSI`** |
| **Test E — Reprise multi-projets** | Interrogation simultanée des 4 contextes projets dans `harness_memory.json` (`SYNTESIA`, `OMNISECUR`, `RELANCE-DEVIS`, `EMERGENCY_CASHFLOW`). | Isolation hermétique vérifiée : l'offre Agence `SYNTESIA` (`1 490 € HT + 190 €/mois`) n'est pas confondue avec le micro-service `RELANCE-DEVIS` du `LAB` (`390 € + 69 €/mois`), le socle `OMNISECUR v2.3.2` reste rattaché à `LAB`, et `EMERGENCY_CASHFLOW` reste isolé à `0,00 €` sur `ec-mission-state`. | **`TESTÉ ET RÉUSSI`** |
| **Test F — Preuve d'exécution** | Passage de 3 affirmations dans la porte de validation `validate_execution_proof()` (`Couche 5 — LOOPS`) :<br>1. `CLAIM-LAB-CORE-80MB` (fichier inexistant, non exécuté)<br>2. `CLAIM-LIVE-WEBHOOK-POST` (tenté sans code retour `0` ni preuve)<br>3. `CLAIM-AGIA-010-KIT` (`KIT_COMMERCIAL_COMPLET_AGIA_010.md` existant + `exit_code = 0`) | 1. Classé `ACTION_DOCUMENTED_ONLY` ➔ plafonné à **`PROPOSED`** (`DOCUMENTE`).<br>2. Classé `ACTION_ATTEMPTED_UNVERIFIED` ➔ plafonné à **`IN_PROGRESS`** (`IMPLEMENTE`).<br>3. Classé `ACTION_VERIFIED` ➔ promu à **`CONFIRMED`** (`TESTE`) avec empreinte SHA-256 vérifiée (`99ad523a2dfb`). | **`TESTÉ ET RÉUSSI`** |

---

## 2. TRACE BRUTE D'EXÉCUTION (`python3 scripts/harness_ctl.py`)

```text
=== SYNTESIA HARNESS — PREFLIGHT CHECK ===
1. [GIT_STATE]        Repo: naitconv-web/agia-infrastructure | Branch: main | HEAD: 91a1eec
2. [MEMORY_STATE]     Facts: 8 | Decisions: 7 | Projects: 4 | Shards: 5
3. [GUARDRAILS]       Regime: F1_ZERO_EURO_AUTONOMOUS | WEBHOOK_ENABLED=false: True
4. [CONFLICT_CHECK]   Unresolved conflicts: 0
[PREFLIGHT STATUS]    PASS (Exit 0)

=== EXÉCUTION DES 6 TESTS DE RÉSISTANCE DU HARNESS (AGIA-011) ===
  [Test A — Perte de conversation]   PASSED=True | Mission=AGIA-011 | 12 champs=True
  [Test B — Changement de modèle]    PASSED=True | Modèles=['Antigravity-Cloud-Pro', 'Paseo-Mistral-Vibe-Local', 'ChatGPT-Go-Auditor']
  [Test C — Interruption brutale]    PASSED=True | Reprise à Phase=EXECUTE (Essai 2/3)
  [Test D — Contradiction détectée]  PASSED=True | Alerte=DYN-CONFLICT-FACT-06 | Écrasement=False
  [Test E — Reprise multi-projets]   PASSED=True | 4 projets isolés sans mélange de tarifs/dépôts
  [Test F — Preuve d'exécution]      PASSED=True | DocOnly=PROPOSED | Attempted=IN_PROGRESS | Verified=CONFIRMED (SHA=99ad523a2dfb)
=== BILAN : 6 / 6 TESTS DE RÉSISTANCE RÉUSSIS (Exit 0) ===
```

---

## 3. VÉRIFICATION DE NON-RÉGRESSION SUR LES LIVRABLES `AGIA-009` & `AGIA-010`

Conformément à la contrainte *« Préserver les fonctionnalités commerciales livrées par AGIA-010 »* :
- `docs/commercial/KIT_COMMERCIAL_COMPLET_AGIA_010.md` est intact (`SHA-256` court : `99ad523a2dfb`).
- `sites/demonstrateur/index.html` est intact (`SHA-256` court : `444b795cf04a`).
- `sites/shared/syntesia-forms.js` est intact (`WEBHOOK_ENABLED: false` et `ENVIRONMENT: "PREPROD"` vérifiés par le préflight).
