# DIRECTION ARTISTIQUE & SYSTÈME DE CONCEPTION (`DESIGN.md`) — SYNTESIA
**Référence :** SYNTESIA-DESIGN-SYSTEM-001 (Mission AGIA-006 — Chantier 2)  
**Bibliothèque de référence obligatoire :** **Refero Styles** (`https://styles.refero.design/`)  
**Statut :** `VERROU DE RÉFÉRENCE (REFERENCE LOCK) ÉTABLI & APPLIQUÉ AUX SITES FRANCE ET ALGÉRIE`  
**Date :** 21 novembre 2026  

---

## 1. AUDIT PRÉALABLE DES SITES EXISTANTS (AVANT REFONTE REFERO)

Avant toute modification, un audit technique et visuel des 4 fichiers existants (`sites/france/index.html`, `sites/france/securite-privee/index.html`, `sites/france/batiment-renovation/index.html`, `sites/algerie/index.html`) a été réalisé :

1. **Acquis fonctionnels et réglementaires à préserver intégralement (Lot 1) :**
   - Ton sobre et orienté obligations de moyens (zéro promesse chiffrée non démontrée : pas de `ROI x3`, pas de `zéro défaut`, pas de `21 jours fermes`).
   - Références réglementaires exactes : **CSI Livre VI** et **IDCC 1351 / Brochure JO 3196** pour la Sécurité Privée.
   - Protection anti-spam par champ invisible **Honeypot** et case de **consentement RGPD** explicite obligatoire.
   - Absence de toute mention prématurée relative au Kbis ou à l'immatriculation tant que l'arbitrage juridique fondateur n'est pas finalisé.
   - Compatibilité des champs de formulaires avec le schéma 15 colonnes du CRM Google Sheets (`1EmC6f4ljLU2GZmD9HEBt50WdTlVXoQtPQ64vFQL1I_0`).
2. **Faiblesses visuelles et structurelles identifiées sur la version précédente :**
   - *Esthétique « IA générique » (`bg-slate-950` + halos radiaux bleus/émeraude/ambre + cartes arrondies uniformes)* : typique des pages générées sans système de design ancré dans des références réelles.
   - *Absence du Catalogue Sectoriel AGIA-005* : la page d'accueil France ne présentait que 2 cartes sectorielles sans distinguer **Bâtiment**, **BTP** et **Rénovation**, et n'exposait ni le socle **HCR / CGP** ni les **5 extensions sectorielles étudiées** (Architecture/BET, Immobilier ADB/Syndics, Services à la personne, Transport/Logistique, Nettoyage/FM).
   - *Positionnement réducteur* : le discours devait être élevé au rang de **partenaire d'ingénierie et de transformation intelligente des opérations d'entreprise** (Audit opérationnel ➔ Conception de systèmes métiers ➔ Intégration aux logiciels existants ➔ Automatisation & Agents IA sous contrôle humain).

---

## 2. EXPLORATION REFERO STYLES & SÉLECTION DES RÉFÉRENCES

L'exploration de `https://styles.refero.design/` a permis d'analyser et de sélectionner **trois systèmes de design complémentaires** parfaitement alignés avec le positionnement d'ingénierie B2B de SYNTESIA :

### A. Référence Primaire (Fondation architecturale) : **Antimetal**
- **UUID Refero :** `448e303d-7d89-4c38-ab62-bfe5bac45d92` (`https://refero.design/styles/448e303d-7d89-4c38-ab62-bfe5bac45d92`)
- **Thèse visuelle (*North Star*) extraite de Refero :**  
  *« An editorial serif gives technical software an unusually literary, assured presence, while tiny monospaced markings and bracketed frames make it feel engineered. The default is light, with warm gray paper, near-black ink and restrained earth-colored annotations; deep blue-black atmospheric scenes punctuate the reading. Sparse node diagrams, blueprint illustrations and carefully staged interface windows carry more weight than decorative photography. It suits complex products that need both an intelligible explanation and a sense of depth. »*
- **Pourquoi ce choix pour SYNTESIA :** Un dirigeant de PME (Sécurité privée, Bâtiment, BTP, Hôtellerie, CGP, Industrie) est saturé de sites sombres « cyber-IA » à néons violets. L'esthétique *Editorial Engineering Paper* (papier technique clair, titres en sérif éditorial de haute précision, repères d'ingénierie en monospace `[SYS-01]` et cadres techniques à croisillons `+`, ponctués d'une scène sombre d'architecture système) inspire immédiatement **le sérieux d'un cabinet d'ingénierie et la maîtrise d'un architecte systèmes**.

### B. Référence Secondaire #1 (Chaleur des surfaces & ombres) : **Cursor**
- **UUID Refero :** `4e3b4717-84c8-4599-baaf-a343c3d619b6` (`https://styles.refero.design/styles/4e3b4717-84c8-4599-baaf-a343c3d619b6`)
- **Détails empruntés :**
  - Nuance de fond *Canvas Parchment* (`#F7F6F2`) et cartes secondaires *Pebble Paper* (`#EFEFEA`) évitant la froideur clinique du blanc pur `#FFFFFF`.
  - Ombre architecturale multi-couches réservée exclusivement à la fenêtre de démonstration du système central.

### C. Référence Secondaire #2 (Discipline achromatique & contrastes) : **ElevenLabs**
- **UUID Refero :** `031056ff-7af1-46db-8daa-115f731c5d26` (`https://styles.refero.design/styles/031056ff-7af1-46db-8daa-115f731c5d26`)
- **Détails empruntés :**
  - Contraste maximal (20:1) entre l'encre noire profonde (`#141413`) et le fond papier chaud.
  - Boutons d'action primaires en pilule pleine (`border-radius: 9999px`) contrastant avec les panneaux de contenu à angles droits ou faiblement adoucis (`0px` à `4px`) munis de repères d'angles techniques.

---

## 3. VERROU DE CONCEPTION (`REFERENCE LOCK`) & SPÉCIFICATION `DESIGN.md` SYNTESIA

```yaml
---
design_system: SYNTESIA Engineered Editorial System v2.0
derived_from_refero:
  primary: "Antimetal (448e303d-7d89-4c38-ab62-bfe5bac45d92)"
  secondary:
    - "Cursor (4e3b4717-84c8-4599-baaf-a343c3d619b6)"
    - "ElevenLabs (031056ff-7af1-46db-8daa-115f731c5d26)"
theme: "Light Engineering Paper punctuated by Atmospheric Night System Theater"
markets: ["SYNTESIA France", "SYNTESIA Algérie"]
---
```

### A. Palette de Couleurs Indexée par Rôle (`Colors`)

| Token CSS | Hex | Nom SYNTESIA | Rôle strict et exclusif |
| :--- | :---: | :--- | :--- |
| `--syn-paper` | `#F4F3EE` | **Engineering Paper** | Fond principal de page (canevas papier technique chaud). |
| `--syn-surface` | `#FAF9F5` | **Vellum Surface** | Intérieur des panneaux principaux, cartes sectorielles prioritaires et formulaires. |
| `--syn-surface-alt` | `#EAE9E2` | **Stone Panel** | Panneaux secondaires, entêtes de tableaux et puces de filtrage. |
| `--syn-ink` | `#161513` | **Warm Obsidian Ink** | Titres principaux, texte fort, fond des boutons d'action primaires. |
| `--syn-ink-body` | `#464440` | **Editorial Body Ink** | Paragraphes explicatifs (encre à 74 % de densité sur papier). |
| `--syn-ink-muted` | `#6E6B65` | **Secondary Ink** | Légendes, métadonnées secondaires, sous-titres de navigation. |
| `--syn-marking` | `#8A8780` | **Equipment Marking** | Numérotation monospace (`[SYS-01]`), codes NAF/IDCC et repères d'angles `+`. |
| `--syn-edge` | `#D5D4CC` | **Hairline Rule** | Filets de grille structurelle continus (`1px solid`). |
| `--syn-edge-dashed`| `#C2C1B8` | **Blueprint Dashed Rule**| Cadres techniques pointillés de séparation de chapitres. |
| `--syn-night` | `#090D13` | **Atmospheric Night** | Scène sombre pleine largeur dédiée au théâtre d'architecture système et au pied de page. |
| `--syn-night-panel`| `#101720` | **Network Slate** | Cartes d'orchestration et schémas de flux à l'intérieur de la scène nocturne. |
| `--syn-cream` | `#F4F4E7` | **Cream Light** | Texte principal et actions inversées sur les scènes sombres `--syn-night`. |
| `--syn-accent-fr` | `#1D4ED8` | **Sovereign Blue (FR)** | Accent ponctuel Marché France (indicateurs actifs, liens techniques, pôle Sécurité). |
| `--syn-accent-btp` | `#B84A27` | **Rust Annotation** | Annotation comparative & repère de la filière Construction (Bâtiment / BTP / Rénovation). |
| `--syn-accent-dz` | `#047857` | **Emerald Industrial (DZ)**| Accent ponctuel Marché Algérie (indicateurs actifs, repères de digitalisation industrielle). |
| `--syn-accent-olive`| `#5C6B28` | **Olive Verification** | Badges de statut vérifié, conformité RGPD et contrôles déterministes. |

### B. Échelle Typographique Tri-Dimensionnelle (`Typography`)

Polices chargées via Google Fonts avec fallback système instantané :
1. **Voix Stratégique & Éditoriale (`--font-serif` : `'Instrument Serif', 'Newsreader', Georgia, serif`) :**
   - *Hero Display :* `54px` (mobile `38px`), `font-weight: 400`, `line-height: 1.06`, `letter-spacing: -0.03em`. Usage d'italiques expressives sur les concepts clés (*transformation opérationnelle*, *systèmes intelligents*).
   - *Section Heading :* `38px` (mobile `28px`), `font-weight: 400`, `line-height: 1.12`, `letter-spacing: -0.025em`.
2. **Voix Opérationnelle & Interface (`--font-sans` : `'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif`) :**
   - *Card Heading :* `20px`, `font-weight: 600`, `line-height: 1.3`, `letter-spacing: -0.015em`.
   - *Body Copy :* `16px`, `font-weight: 400`, `line-height: 1.6`.
   - *Controls & Inputs :* `14px`, `font-weight: 500`.
3. **Voix d'Ingénierie & Marquage Technique (`--font-mono` : `'JetBrains Mono', monospace`) :**
   - *Equipment Eyebrow / Tag :* `11px`, `font-weight: 500`, `text-transform: uppercase`, `letter-spacing: 0.09em`, `line-height: 1.4`. Utilisé pour les cotes de plans (`[REF: AGIA-005]`, `[IDCC 1351]`, `[STATUT: PRIORITÉ 1]`).

### C. Règles Impératives du Verrou (`Do` & `Don't`)

#### DO (À respecter sur toutes les pages France et Algérie) :
- Conserver le canevas principal en papier technique clair (`#F4F3EE`) avec une grille architecturale visible (`1px solid #D5D4CC`) et des repères d'angles `+` (`7px`) aux intersections des panneaux majeurs.
- Réserver la scène sombre (`#090D13` Atmospheric Night) au **Schéma d'Architecture du Système Opérationnel SYNTESIA** (comparaison Avant / Après : Chaos manuel vs Système intégré) pour créer un contraste dramatique et lisible.
- Associer un bouton primaire en pilule pleine noire (`#161513`, texte `#FAF9F5`, `border-radius: 9999px`) à un bouton secondaire encadré technique (`border: 1px solid #161513`, `border-radius: 9999px` ou crocheté `[ Explorer ]`).
- Distinguer visuellement par des badges monospace explicites les **Verticales Prioritaires de Lancement**, les **Pôles d'Expertise du Socle** et les **Extensions Sectorielles à l'Étude (AGIA-005)**.

#### DON'T (Strictement interdit) :
- Ne jamais utiliser de fond sombre générique `#020617` sur l'ensemble de la page ni de halos flous néon (`blur-3xl`).
- Ne jamais utiliser de graisse `700` ou `800` sur la police sérif `Instrument Serif` (elle doit toujours rester en `400` Regular ou Italic).
- Ne jamais transformer les couleurs d'annotation (`#B84A27` Rust, `#5C6B28` Olive, `#1D4ED8` Blue) en grands aplats de fond criards : elles servent uniquement de marquages précis (points, bordures d'état, étiquettes).
- Ne jamais fusionner Bâtiment, BTP et Rénovation dans une seule boîte indistincte.
