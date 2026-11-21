# FICHE PROJET 01 — STRUCTURE MÈRE LAB & SYSTÈME WORKSTATION-IA

- **Statut du document :** `AUDIT DOCUMENTAIRE TERMINÉ — VALIDATION DU FONDATEUR EN ATTENTE`
- **Qualification globale :** `CONFIRMÉ PAR SOURCE` (Spécifications et décisions) / `NON DÉMONTRÉ` (Dépôt `lab-core` non créé et PC local non vérifiable à distance)
- **Sources Originales Consultées :**
  - Dossier Drive `LAB-ARCH-001` (ID : `1SKhv8HQfSNrt5tRVMG2tiPprKc9CO0QC`)
  - Document `2026-11-15 — LAB-ARCH-001 Dossier de Cadrage Architecture WORKSTATION IA` (ID : `1CcEAPM9oNLlsJAukD6w7sSbt6REYg7BT4c4aw7w2Z9c`)
  - Document `2026-11-15 — LAB-ARCH-002 Rapport Phase 0.5 & Plan de Remédiation` (ID : `1y2LXAYcBCtx39ZT4POeB12x6znOfXk9IYU4jATzA2F4`)
  - `_ORCHESTRATION/REGISTRE-DECISIONS.md` (ID : `1aUs3wwd0slFo3yJWDfUt8i2ir_CQaE4G`)
  - `PROJETS/README-PORTEFEUILLE.md` (ID : `13_Qt4DUVWaFifZGYEyhfZ1uFlWbWGqUA`)

---

## 1. DISTINCTION STRICTE : LAB VS WORKSTATION-IA VS SYNTESIA

| Entité | Nature exacte | Statut de vérification |
| :--- | :--- | :--- |
| **LAB** | **Structure mère active** et faîtière accueillant la gamme de solutions logicielles « Omni-X » (`OMNISECUR`, `OMNIRENOV / RELANCE-DEVIS`, `OMNIPATRIMOINE`). | `CONFIRMÉ PAR SOURCE` (`README-PORTEFEUILLE.md`) |
| **WORKSTATION-IA** | **Système technique d'orchestration** multi-agents, bus de communication et mémoire documentaire sur Google Drive. | `CONFIRMÉ PAR SOURCE` (`REGISTRE-DECISIONS.md`) |
| **SYNTESIA** | **Agence commerciale et opérationnelle** de conseil, transformation numérique et intégration IA (France & Algérie). | `VÉRIFIÉ TECHNIQUEMENT` (`naitconv-web/agia-infrastructure`) |

*Règle de gouvernance :* L'activité permanente de la structure mère **LAB** ne doit jamais être confondue avec le séquençage temporel du développement d'une solution fille.

---

## 2. SPÉCIFICATIONS TECHNIQUES VS RÉSULTATS EFFECTIVEMENT DÉMONTRÉS

### A. Architecture C (Noyau Indépendant)
- **Spécification documentaire (`CONFIRMÉ PAR SOURCE`) :** Le document `LAB-ARCH-001` définit l'Architecture C en 3 plans (Interface, Noyau Souverain `LAB CORE`, Passerelle `LAB BRIDGE`) et fixe une **cible de conception** de consommation mémoire inférieure à **80 Mo de RAM** pour le noyau.
- **État d'avancement déclaré dans la source (`CONFIRMÉ PAR SOURCE`) :** `LAB-ARCH-001` évalue la préparation architecturale et métier à **75 %**, tout en marquant un blocage P0 tant que les partages Drive ne sont pas assainis et que le dépôt `naitconv-web/lab-core` n'est pas initialisé.
- **État technique réel (`NON DÉMONTRÉ`) :** Le dépôt `naitconv-web/lab-core` n'existe pas encore sur le compte GitHub `naitconv-web` (vérifié via `gh repo list`). La consommation mémoire < 80 Mo RAM demeure une **spécification de conception cible** et non une mesure d'exécution sur code déployé.

### B. Protocole BUS LEAN v3.0 & Gouvernance
- **Décisions confirmées (`CONFIRMÉ PAR SOURCE`) :**
  - `WS-2026-000` (14/11/2026) : Architecture Lean v1.0, séparation Code `C:\` vs Cerveau Drive `H:\`, zéro daemon lourd.
  - `WS-2026-000-REV1` (16/11/2026) : Levée du plafond de 3 agents maximum par mission, maintien de la règle `Concepteur != Auditeur`.
  - `WS-2026-000-REV3` (16/11/2026) : Adoption du protocole **BUS LEAN v3.0** (`PREFLIGHT-FACTS.md`, packs anonymisés `GO<X>-PACK.zip` et 5 shards autonomes `SHARD-*.md`).

### C. Environnement Local Windows 11 & Outils (`DÉCLARÉ MAIS NON VÉRIFIÉ`)
- Les contraintes du poste local (Windows 11, 8 Go de RAM, état de Paseo, OpenClaw et `@WorkstationIAbot`) sont mentionnées dans `LAB-ARCH-001` et `LAB-ARCH-002` comme **non vérifiables à distance depuis la VM Cloud**. Elles conservent le statut `DÉCLARÉ MAIS NON VÉRIFIÉ`.
