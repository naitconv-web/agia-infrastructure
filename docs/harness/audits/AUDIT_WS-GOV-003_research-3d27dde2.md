# RAPPORT D'AUDIT INDÉPENDANT — MISSION `WS-GOV-003` (`research-3d27dde2`)

**Auditeur :** `research` (`conv: 3d27dde2fe8725331615fb8e822e6d04`) · **Horodatage :** `2026-11-23T01:53:12Z`  
**Commit audité :** `d0e7d1d` (`main`)  
**VERDICT : VALIDÉ SOUS RÉSERVES**

---

## 1. Preuves vérifiées (lecture seule)
- `docs/harness/MATRICE_COUVERTURE_FRANCHISE.md` : statuts honnêtes (`OPÉRATIONNEL`, `PARTIEL`, `MANUEL`), sans sur-promesse.
- `skills/ambressence/*/SKILL.md` : `10/10` Skills contiennent la directive `WS-GOV-001 + WS-GOV-002`.
- `tests/promptfoo/franchise-behavioral-8-scenarios.yaml` : `8` scénarios contradictoires conformes.
- `docs/harness/REGISTRE_ERREURS_ET_DESACCORDS.md` : historique `append-only` intact (`ERR-001` à `ERR-003`, `DES-001` à `DES-004`).
- `docs/harness/checkpoints/CP-WS-GOV-003.json` : `status = "IN_PROGRESS"` avant audit (zéro auto-certification).
- `python3 scripts/test_franchise_compliance.py` → `PASS (6/6 suites)` (`Exit 0`).
- `python3 scripts/harness_ctl.py test-resilience` → `6 / 6 TESTS DE RÉSISTANCE RÉUSSIS` (`Exit 0`).

## 2. Réserves factuelles à conserver
1. **Couverture non automatique hors dépôt/VM :** `PARTIEL` pour Paseo local Windows 11 (non inspectable à distance) ; `MANUEL` pour les `10` Gems sur Google AI Studio/Gemini App, ChatGPT Web et interfaces web externes.
2. **Suite `Promptfoo` non exécutée en live multi-modèles :** Prête (`8` scénarios YAML), non exécutée contre des modèles externes dans cette VM à `0,00 €` (`F1`).
