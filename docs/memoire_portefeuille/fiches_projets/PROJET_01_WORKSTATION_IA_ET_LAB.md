# FICHE PROJET 01 — STRUCTURE MÈRE LAB & WORKSTATION-IA

- **Statut de l'information :** `[DÉCISION CONFIRMÉE & DOCUMENT SOURCE]`
- **Structure Mère :** **LAB** (Laboratoire et structure faîtière du portefeuille de solutions)
- **Système d'Orchestration :** **WORKSTATION-IA**
- **Architecture Cible :** « Architecture C » (Orchestration Hybride à Noyau Indépendant)
- **Documents Sources Originaux :**
  - Dossier Drive `LAB-ARCH-001` (ID : `1SKhv8HQfSNrt5tRVMG2tiPprKc9CO0QC`)
  - Document `2026-11-15 — LAB-ARCH-001 Dossier de Cadrage Architecture WORKSTATION IA` (ID : `1CcEAPM9oNLlsJAukD6w7sSbt6REYg7BT4c4aw7w2Z9c`)
  - Document `2026-11-15 — LAB-ARCH-002 Rapport Phase 0.5 & Plan de Remédiation` (ID : `1y2LXAYcBCtx39ZT4POeB12x6znOfXk9IYU4jATzA2F4`)
  - `_ORCHESTRATION/REGISTRE-DECISIONS.md` (ID : `1aUs3wwd0slFo3yJWDfUt8i2ir_CQaE4G`)

---

## 1. RÔLE ET VOCATION DE LA STRUCTURE MÈRE LAB
- **Statut organisationnel confirmé :** Le **LAB** est la **structure mère active** qui accueille et incube l'ensemble des solutions de la gamme « Omni-X » :
  - **OMNISECUR** (Logiciel dédié à la sécurité privée)
  - **OMNIRENOV** (Solutions pour le bâtiment et la rénovation, incluant RELANCE-DEVIS)
  - **OMNIPATRIMOINE** (Ingénierie patrimoniale, séquencé ultérieurement)
  - Et les futures solutions Omni-X.
- **Règle fondamentale d'étanchéité conceptuelle :** Il ne faut pas confondre :
  1. L'activité de recherche et de gouvernance du **LAB** (toujours active).
  2. Le statut commercial propre à chaque solution fille.
  3. La priorité et le séquençage des développements.
  4. L'éventuelle suspension temporaire ou mise en attente d'un chantier applicatif.
  *Un projet dont le développement est séquencé dans le temps n'est pas un projet gelé ou abandonné.*

---

## 2. SPÉCIFICATIONS TECHNIQUES DE WORKSTATION-IA & PREUVES AUDITÉES

### A. L'Architecture C (Noyau Souverain Indépendant)
- **Preuve documentaire :** Spécifiée en détail dans le dossier `LAB-ARCH-001` (15 nov. 2026).
- **Principe :** Séparation étanche en trois plans :
  1. **Plan d'Interface (`USER INTERFACE`)** : Sans état métier, multi-terminaux.
  2. **Noyau Souverain (`LAB CORE`)** : Exécute les règles de sécurité, de persistance et de gouvernance de manière déterministe.
  3. **Passerelle d'Exécution (`LAB BRIDGE` + `ORCHESTRATOR MANAGER`)** : Traite les LLM (Claude, Gemini, GPT, DeepSeek, Mistral) comme de simples moteurs interchangeables sans leur confier la persistance.
- **Contrainte de consommation mémoire vérifiée :** Spécifiée dans `LAB-ARCH-001` (Section 2) : chaque composant possède un périmètre borné afin de limiter la consommation totale du noyau à **moins de 80 Mo de RAM** (adapté aux postes de travail 8 Go de RAM et micro-VPS).
- **Dépôt souverain cible :** La création du dépôt dédié `naitconv-web/lab-core` avec jeton propre a été formellement identifiée comme prérequis pour isoler le moteur des sessions d'agents tierces.

### B. Le Protocole BUS LEAN v3.0
- **Preuve décisionnelle :** Décision `WS-2026-000-REV3` du 16 novembre 2026 dans `REGISTRE-DECISIONS.md`.
- **Règles d'exécution :**
  - Instauration systématique du fichier `PREFLIGHT-FACTS.md` (contrôles déterministes pré-exécutés).
  - Packs anonymisés `GO<X>-PACK.zip` et 5 Shards autonomes (`SHARD-*.md`) pour éviter tout blocage Drive même pour les agents externes sans accès direct.
  - Routage en 2 cercles pour éviter le gaspillage de tokens IA.

---

## 3. ÉTAT RÉEL D'AVANCEMENT DU NOYAU
- **Statut vérifié :** L'évaluation formelle de `LAB-ARCH-001` a conclu : *« Le projet est prêt à 75 % sur le plan architectural et métier »*, mais conditionné à l'assainissement de partages Drive et à l'initialisation de `lab-core`.
- **Règle de gouvernance :** Toute évolution du LAB Core doit respecter la `CHARTE.md` et ne pas saturer la mémoire du poste local.
