# FICHE RESSOURCE 02 — REA : REVERSE ENGINEER ANYTHING (`morluto/rea`)

- **Identifiant bibliothèque :** `R-02`
- **Origine :** Sélection directe du Fondateur (`WORKSTATION-IA/_KNOWLEDGE_BASE/REFERENCES/Dépôts Github interessant/Depot github varié/Dépôts Github varié` ID `1gSBsqcKpnhGt6a15fEB-zMXaQgisa31BtaZJlIt0zV8`)
- **Annotation historique du Fondateur dans le document source :**  
  *« `gh repo clone morluto/rea` (REA pourrait devenir notre agent spécialisé en rétro-ingénierie, lorsqu'une mission nécessite de comprendre un logiciel existant.) »*
- **URL canonique :** `https://github.com/morluto/rea` (Site officiel : `https://rea.tools/`)
- **Package npm :** `rea-agents`
- **Licence :** **MIT** (Open-source, usage commercial et interne autorisé)
- **État de maintenance (Vérifié via API GitHub le 21/11/2026) :** **Très actif** (472 274 stars, dernier push le 21/11/2026, non archivé).
- **Statut dans SYNTESIA :** **`étudié` & `recommandé`** (Retenu dans le protocole de veille technologique OMNISECUR — Chantier 3 AGIA-006).

---

## 1. FONCTIONNALITÉS RÉELLES VÉRIFIÉES

REA est un serveur MCP et un outil en ligne de commande (`rea-agents`) qui connecte un agent de programmation (Antigravity, Claude Code, Codex, Cursor, OpenCode) à des moteurs d'analyse statique et comportementale :
1. **Analyse statique d'applications JavaScript / Electron / Web (`analyze-javascript-application`) :**
   - Inspecte un répertoire applicatif JS, un bundle web ou une archive Electron `.asar` **sans nécessiter de désassembleur binaire lourd**.
   - Extrait la cartographie des modules, les graphes d'imports, les frontières IPC Electron, les routes d'API et produit un rapport JSON sourcé avec preuves (`--json`).
2. **Analyse d'assemblies .NET et de binaires natifs :**
   - S'interface avec des moteurs installés localement (*Ghidra*, *Hopper*, *IDA* ou *Kuna*) pour analyser des exécutables natifs lorsque nécessaire.
3. **Traçabilité des preuves (*Evidence-first*) :**
   - Chaque conclusion produite par REA indique les preuves exactes (fichiers, fonctions, chaînes, appels réseau) et les limites de l'observation.

---

## 2. COMPATIBILITÉ TECHNIQUE, PRÉREQUIS & COÛT

- **Prérequis :** Node.js (v18+ / v24 LTS déjà préinstallé sur la VM Antigravity et sur le poste local).
- **Mode léger (0 installation globale requise) :** Exécutable à la demande via `npx -y rea-agents@latest analyze-javascript-application <chemin> --json` ou configurable en MCP via `npx rea-agents setup`.
- **Empreinte mémoire :** L'analyse statique JavaScript/Web ne lance aucun daemon permanent et respecte la contrainte `< 80 Mo RAM` au repos (compatible PC Windows 11 à 8 Go RAM).
- **Coût :** **0,00 €**.

---

## 3. CAS D'UTILISATION AUTORISÉS & GARDE-FOUS JURIDIQUES

### A. Cas d'usage concrets pour SYNTESIA & LAB
1. **Veille technologique OMNISECUR (Chantier 3) :** Étudier l'architecture front-end, les composants d'interface de planification, les structures de données JSON publiques et les parcours UX de démonstrateurs ou d'applications web/desktop concurrentes légalement accessibles.
2. **Audit de reprise ou d'intégration chez un client SYNTESIA :** Lorsqu'une PME cliente confie à SYNTESIA un outil interne existant mal documenté (application web legacy, bundle JS, script métier) pour l'automatiser ou le connecter, REA permet d'en extraire rapidement la logique réelle.

### B. Règles strictes de conformité et de propriété intellectuelle
- **Respect des licences et du Code de la propriété intellectuelle (Art. L.122-6-1 sur l'interopérabilité) :**
  - L'étude fonctionnelle et l'analyse des idées, principes, parcours utilisateurs et structures d'interfaces publiques sont libres.
  - Il est **formellement interdit** d'utiliser REA pour contourner un mécanisme d'authentification payant, attaquer un serveur SaaS tiers, violer un secret des affaires ou copier-coller du code propriétaire tiers dans `OMNISECUR` ou `SYNTESIA` (*principe Clean-Room : observer le besoin fonctionnel et réimplémenter une solution 100 % originale*).
