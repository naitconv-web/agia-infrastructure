# FICHE RESSOURCE 03 — THE AGENCY (`msitarzewski/agency-agents`)

- **Identifiant bibliothèque :** `R-03`
- **Origine :** Sélection directe du Fondateur (`WORKSTATION-IA_REGISTRE_CENTRAL_DES_DEPOTS.docx` ID `1sa-f32LvnZRyNM4IJjp3HwHtrPVtkjHj` & `Dépôts Github varié` ID `1gSBsqcKpnhGt6a15fEB-zMXaQgisa31BtaZJlIt0zV8`)
- **URL canonique :** `https://github.com/msitarzewski/agency-agents`
- **Licence :** **MIT**
- **État de maintenance (Vérifié via API GitHub le 21/11/2026) :** **Très actif** (169 621 stars, dernier push le 09/11/2026, non archivé).
- **Statut dans SYNTESIA :** **`étudié` & `recommandé`** (Bibliothèque de référence pour enrichir les instructions des agents spécialisés SYNTESIA, sans installation globale aveugle).

---

## 1. FONCTIONNALITÉS RÉELLES VÉRIFIÉES

Le dépôt `msitarzewski/agency-agents` fournit un catalogue structuré de profils d'agents IA spécialisés par départements (*Engineering*, *Design*, *Marketing*, *Product*, *Project Management*, *Testing/QA*, *Support*), ainsi que deux scripts d'outillage :
1. **Structure normalisée de chaque fiche agent Markdown :**
   - *Identity & Personality Traits* (posture professionnelle).
   - *Core Mission & Workflows* (processus d'exécution étape par étape).
   - *Technical Deliverables* (gabarits de code ou de documents attendus).
   - *Success Metrics* (critères objectifs d'auto-évaluation).
2. **Convertisseur multi-environnements (`scripts/convert.sh` & `scripts/install.sh`) :**
   - Convertit et installe les profils d'agents aux formats natifs de **Google Antigravity** (`--tool antigravity`), **Gemini CLI** (`--tool gemini-cli`), **Claude Code** (`--tool claude-code`), **OpenCode**, **Mistral Vibe**, **Cursor** et **Codex**.

---

## 2. COMPATIBILITÉ, COÛT & RÈGLES D'UTILISATION DANS SYNTESIA

- **Coût et empreinte :** **0,00 €**, fichiers purement textuels Markdown (`0 Mo` de RAM consommée).
- **Garde-fou de gouvernance SYNTESIA :**
  1. Conformément à `WORKSTATION-IA_REFERENTIEL_RESSOURCES.md` (§6), **ne jamais déclarer tous ces agents comme installés ou autonomes par défaut**.
  2. **Sélection chirurgicale :** Lorsqu'un agent spécialisé de SYNTESIA (`agents/prompts/SPECIFICATIONS_MULTI_AGENTS.md`) doit être enrichi (ex. Agent QA, Agent SEO, Agent Architecte Front-End), piocher uniquement la trame de livrables pertinente dans `agency-agents` et **lui imposer systématiquement en surcouche** :
     - La `DIRECTIVE_GLOBALE_COMPORTEMENT_ET_BIENSEANCE.md` (sobre, zéro familiarité, horaires ouvrés 08h30–19h00).
     - Le régime financier **F1 (`0,00 €`)**.
     - L'interdiction de toute promesse chiffrée non démontrée.
