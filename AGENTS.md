# AGENTS.md — INSTRUCTIONS CENTRALES DU SYNTESIA HARNESS ENGINEERING

**Portée :** Obligatoire pour tout agent IA (Antigravity, Paseo/Mistral Vibe, OpenCode, Claude Code, Gemini CLI, ChatGPT) intervenant sur le dépôt `naitconv-web/agia-infrastructure` et le portefeuille SYNTESIA / WORKSTATION-IA / LAB.  
**Principe absolu :** **Aucun projet ne dépend de la mémoire d'une conversation.** Toute vérité réside dans les fichiers versionnés du dépôt et le registre de mémoire.

---

## 1. SÉQUENCE OBLIGATOIRE AU DÉMARRAGE DE CHAQUE SESSION (PRÉFLIGHT)

Avant d'écrire une seule ligne de code ou de répondre à une mission complexe, exécutez **obligatoirement** :

```bash
python3 scripts/harness_ctl.py preflight
```

Puis consultez dans l'ordre :
1. La **Charte de Collaboration du Directeur Général** : **[docs/CHARTE_COLLABORATION_IA_DG.md](file:///home/antigravity/agia-infrastructure/docs/CHARTE_COLLABORATION_IA_DG.md)** *(obligatoire : langage simple sans jargon, décisions par consultation OUI/NON/VALIDER/REFUSER, prise en charge technique autonome)*.
2. La sortie du préflight (état Git, dernier checkpoint actif dans `docs/harness/checkpoints/LATEST.json`, alertes de conflits éventuels).
3. Le registre central de mémoire : **[docs/harness/REGISTRE_MEMOIRE.md](file:///home/antigravity/agia-infrastructure/docs/harness/REGISTRE_MEMOIRE.md)** (`FACTS`, `DECISIONS`, `PROJECTS`, `TASKS`, `SHARDS`, `SOURCES`).
4. **Chargement parcimonieux (*Progressive Disclosure*) :** Ne lisez **que** le(s) `SHARD(S)` directement liés à la mission demandée (voir §5 de `REGISTRE_MEMOIRE.md`) afin d'économiser les tokens et le quota du fondateur.

---

## 2. RÈGLES D'OR ET GARDE-FOUS NON NÉGOCIABLES

1. **Régime Financier F1 (`0,00 €`) :** Aucune dépense, aucun achat de nom de domaine, aucun hébergement payant, aucun appel d'API payante hors quotas existants sans validation explicite du fondateur.
2. **Protection de la Pré-Production & des Prospects :**
   - Dans `sites/shared/syntesia-forms.js`, maintenir `WEBHOOK_ENABLED: false` et `ENVIRONMENT: "PREPROD"` tant que le fondateur n'ordonne pas l'ouverture commerciale.
   - Ne jamais contacter un prospect réel (ni par e-mail, ni par téléphone/webhook). Toute donnée de test insérée dans le CRM Google Sheets (`1EmC6f4ljLU2GZmD9HEBt50WdTlVXoQtPQ64vFQL1I_0`) doit porter `Environnement = TEST` et un domaine `.invalid` ou `.test`.
   - Ne jamais inventer une coordonnée juridique (SIREN, RCS, Kbis, siège, DPO).
3. **Rigueur Épistémique (`DOCUMENTÉ ≠ IMPLÉMENTÉ ≠ TESTÉ ≠ VALIDÉ EN PRODUCTION`) :**
   - Chaque fait ou tâche porte un statut explicite : `CONFIRMED`, `DECLARED`, `PROPOSED`, `IN_PROGRESS`, `BLOCKED`, `SUPERSEDED`.
   - Ne jamais transformer silencieusement une hypothèse (`PROPOSED`) ou une déclaration non vérifiée (`DECLARED`) en fait confirmé (`CONFIRMED`).
   - En cas de contradiction entre deux documents (`CONFLICT_DETECTED`), ne jamais écraser silencieusement l'un des deux : signaler le conflit et appliquer la règle de [PROTOCOLE_VALIDATION.md](file:///home/antigravity/agia-infrastructure/docs/harness/PROTOCOLE_VALIDATION.md).
4. **Réflexe Bibliothèque Technologique & Refero :**
   - Avant tout nouveau développement, consulter [docs/bibliotheque_technologique/INDEX_ET_GOUVERNANCE.md](file:///home/antigravity/agia-infrastructure/docs/bibliotheque_technologique/INDEX_ET_GOUVERNANCE.md).
   - Pour tout travail d'interface UI/UX, respecter la direction artistique Refero ([DIRECTION_ARTISTIQUE_REFERO_SYNTESIA.md](file:///home/antigravity/agia-infrastructure/docs/bibliotheque_technologique/DIRECTION_ARTISTIQUE_REFERO_SYNTESIA.md) et `sites/shared/syntesia-design-system.css`).

---

## 3. BOUCLE D'EXÉCUTION ET CLÔTURE OBLIGATOIRE (CHECKPOINT)

1. **Boucle de travail :** `PLAN → EXECUTE → TEST → VERIFY → CORRECT (max 3 essais) → REPORT` ([PROTOCOLE_VALIDATION.md](file:///home/antigravity/agia-infrastructure/docs/harness/PROTOCOLE_VALIDATION.md)). Aucune tâche n'est déclarée terminée sans preuve d'exécution vérifiable.
2. **Clôture et Sauvegarde de Reprise :** À la fin de chaque mission (ou dès que le quota approche d'un seuil critique), générez et committez le checkpoint de reprise :

```bash
python3 scripts/harness_ctl.py checkpoint --mission <ID_MISSION> --status CONFIRMED --summary "Résumé factuel et preuves"
```

---

## 4. RÉPERTOIRE DE LA DOCUMENTATION HARNESS

- [AUDIT_HARNESS_EXISTANT.md](file:///home/antigravity/agia-infrastructure/docs/harness/AUDIT_HARNESS_EXISTANT.md) — État réel avant AGIA-011 et registre des contradictions résolues/ouvertes.
- [ARCHITECTURE_SYNTESIA_HARNESS.md](file:///home/antigravity/agia-infrastructure/docs/harness/ARCHITECTURE_SYNTESIA_HARNESS.md) — Les 6 couches (`MODEL`, `CONTEXT`, `TOOLS`, `WORKFLOWS`, `LOOPS`, `OBSERVABILITY`).
- [REGISTRE_MEMOIRE.md](file:///home/antigravity/agia-infrastructure/docs/harness/REGISTRE_MEMOIRE.md) — Mémoire persistante structurée du portefeuille.
- [PROTOCOLE_PREFLIGHT.md](file:///home/antigravity/agia-infrastructure/docs/harness/PROTOCOLE_PREFLIGHT.md) — Procédure de vérification au démarrage.
- [PROTOCOLE_CHECKPOINT.md](file:///home/antigravity/agia-infrastructure/docs/harness/PROTOCOLE_CHECKPOINT.md) — Format à 12 champs et procédure de reprise sans conversation.
- [PROTOCOLE_VALIDATION.md](file:///home/antigravity/agia-infrastructure/docs/harness/PROTOCOLE_VALIDATION.md) — Boucles de vérification et preuves.
- [RAPPORT_TESTS_RESILIENCE.md](file:///home/antigravity/agia-infrastructure/docs/harness/RAPPORT_TESTS_RESILIENCE.md) — Résultats et preuves des 6 scénarios de résistance (`Test A` à `Test F`).
