# RAPPORT FINAL — CANTARA V3 : AI SLOP REMOVAL (HUMANISATION INTÉGRALE)

- **Autorité :** PDG
- **Périmètre :** Intégralité des pages, feuilles de style et scripts de [`sites/cantara-v3/`](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3)
- **Surveillance indépendante :** Sous-agent `cantara_qa_guardian` (Session [50f849bddb4755f23b9a2d456a91031b](conversation://50f849bddb4755f23b9a2d456a91031b))
- **Commit de livraison :** `152ded3` (`152ded3670581031c7d5a4561c61d384cccd91d5`) sur `main` et `cantara/v3-epure-comet`
- **URL publique déployée (GitHub Pages) :** https://naitconv-web.github.io/agia-infrastructure/sites/cantara-v3/

> [!IMPORTANT]
> **Verdict final du sous-agent indépendant `cantara_qa_guardian` :** **GO VALIDÉ (100 %)**.
> Les **64 marqueurs de crochets pseudo-techniques `[...]`**, les **14 répétitions mécaniques d'italique en fin de titre (`<em>mot.</em>`)**, les **fausses URL de protocole (`cantara://`, `securiaxe://`, `omnirenov://`, `omnipatrimoine://`)**, les **faux boutons macOS (`.comet-dots`)**, la **taxonomie interne de prompt (`Famille A` à `Famille F`, `Cas d'application` ×9)**, les **grilles de cartes répétitives à 3 colonnes** et les **gadgets 3D/halo curseur** ont été intégralement éliminés.

---

## LIVRABLE 1 — INVENTAIRE DES MARQUEURS « AI SLOP » DÉTECTÉS (CLASSÉS P0 / P1 / P2)

L'audit initial mené conjointement avec le sous-agent indépendant `cantara_qa_guardian` ([50f849bddb4755f23b9a2d456a91031b](conversation://50f849bddb4755f23b9a2d456a91031b)) a recensé et classé les défauts suivants selon leur impact sur la crédibilité d'une agence d'ingénierie haut de gamme :

| Priorité | Code | Marqueur « AI Slop » identifié | Occurrences avant correction | Impact sur la crédibilité commerciale |
| :---: | :---: | :--- | :---: | :--- |
| **P0** | **P0-1** | **Abus de crochets pseudo-techniques `[...]`** dans les surtitres (`[ 01 / NOTRE INGÉNIERIE ]`), étiquettes (`[ PILIER 01 ]` à `[ PILIER 09 ]`), boutons (`[ APPROUVER & ARCHIVER ]`, `[ BLOQUER LE DOSSIER ]`) et alertes (`[EXCEPTION INTERCEPTÉE]`). | **64** occurrences (HTML + JS) | Donne l'impression immédiate d'un gabarit sci-fi ou cyber-SaaS généré automatiquement par un LLM. |
| **P0** | **P0-2** | **Tic typographique mécanique `Romain + <em>dernier mot en italique avec point.</em>`** répété sur la quasi-totalité des titres `h1`, `h2` et `h3` des 4 pages. | **15** titres (dont 14 hors signature Hero) | Signature typique des landing pages produites en série par prompt ; annule la hiérarchie éditoriale. |
| **P0** | **P0-3** | **Faux navigateur macOS (`.comet-dots` rouge/jaune/vert) et fausses URL de protocole** (`cantara://lab/...`, `securiaxe://director/...`, `omnirenov://cockpit/...`, `omnipatrimoine://...`). | **4** barres + **9** fausses URL | Artifice visuel factice qui décrédibilise des démonstrations techniques pourtant fondées sur de vrais calculs. |
| **P1** | **P1-1** | **Fuite de la nomenclature interne du cahier des charges dans l'interface :** onglets `Famille F`, `Famille A`... dans le LAB ; préfixe `Cas d'application :` répété 9 fois ; cartes Portfolio découpées en 3 sous-boîtes scolaires (`Problématique métier / Proposition de valeur / Niveau de maturité`). | **21** occurrences | Révèle la structure du prompt initial au lieu de s'adresser à un dirigeant dans son langage métier. |
| **P1** | **P1-2** | **Monotonie structurelle des grilles de cartes à 3 colonnes et gadgets SaaS :** répétition de `grid-template-columns: repeat(3, 1fr)` sur `#ingenierie`, `#portfolio` et `#services` ; halo radial suivant la souris (`.tilt-card::before`) ; bascule 3D au survol et `rotateX` au défilement. | **3** sections consécutives + **2** scripts d'effet 3D | Aspect « template IA interchangeable » incompatible avec la sobriété d'un cabinet d'ingénierie. |
| **P1** | **P1-3** | **Uniformité visuelle des 6 postes du CANTARA LAB :** tous les métiers utilisaient les mêmes cartes `.inspect-block` génériques au lieu de tables de gestion propres à chaque secteur. | **6** postes uniformes | Réduit l'effet de maîtrise sectorielle (comptabilité, sécurité privée, BTP, patrimoine, commerce, hôtellerie). |
| **P2** | **P2-1** | **Icônes Unicode multimédias (`▶`, `⏸`, `⚡`, `↺`, `✓`) et empreintes brutes `FNV32-XXXXXXXX`** affichées dans les boutons et journaux de simulation. | **14** occurrences | Bruit visuel artificiel dans les postes de démonstration. |

---

## LIVRABLE 2 — REGISTRE DES CORRECTIONS EFFECTUÉES

### 2.1. Refonte de la direction artistique et de l'architecture CSS/JS ([`comet.css`](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/comet.css), [`comet.js`](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/comet.js))

1. **Suppression totale des gadgets visuels SaaS :**
   - Suppression du halo lumineux suivant le curseur (`.tilt-card::before`).
   - Suppression de la rotation 3D `perspective(1100px) rotateX(...) rotateY(...)` au survol de la souris et de l'inclinaison `rotateX` au scroll dans [`comet.js`](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/comet.js#L1-L78).
   - Suppression des faux boutons de fenêtre `.comet-dots`.
2. **Diversification architecturale des sections (fin de la répétition des grilles de 3 cartes) :**
   - **Hero asymétrique éditorial (`.hero-layout`) :** composition en 2 colonnes (`1.25fr / 0.75fr`) séparées par un filet vertical architectural, avec la signature et les 2 CTA à gauche, et le texte de cadrage + les 3 engagements (`Proximité · Confidentialité · Fiabilité`) dans la colonne `.hero-aside` à droite.
   - **Section `01 — Ingénierie & architecture` en Registre tabulaire (`.eng-ledger`) :** remplacement de la grille de 9 boîtes par un registre architectural à 4 colonnes (`Réf. 01..09`, `Domaine d'intervention`, `Méthode & fonctionnement opérationnel`, `Livrable & application concrète`).
   - **Section `02 — Portfolio des solutions` en Fiches d'édition logicielle (`.spec-table`) :** remplacement des 3 sous-boîtes scolaires et du faux terminal sombre par un texte éditorial suivi d'une table de spécifications (`Périmètre fonctionnel`, `Démonstration locale`, `État & accès`).
   - **Section `03 — Atelier de démonstration (CANTARA LAB)` en Poste de travail métier (`.workstation-brand` + `.ops-table`) :** bandeau d'identification sobre et tables d'exploitation propres à chaque secteur.
   - **Section `04 — Services & accompagnement` en Mise en page éditoriale asymétrique (`.services-editorial`) :** colonne d'introduction fixe à gauche (`0.75fr`) et 3 chapitres horizontaux numérotés à droite (`1.25fr`).

### 2.2. Humanisation éditoriale et métier des 4 pages HTML et des 3 moteurs JS

- **[`index.html`](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/index.html) & [`home-v3.js`](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/home-v3.js) :**
  - Élimination de tous les crochets `[...]` et de tous les italiques mécaniques `<em>mot.</em>` sur les titres de section (conservé uniquement sur la signature Hero : « L'ingénierie au service de votre *performance.* »).
  - Renommage des 6 onglets du CANTARA LAB avec des intitulés métiers explicites : `Services & finance`, `Sécurité privée (Securiaxe)`, `BTP & chantiers (Omnirenov)`, `Patrimoine (Omnipatrimoine)`, `Commerce & stocks`, `Hôtellerie & restauration`.
  - Création de **6 tables d'exploitation sectorielles (`.ops-table`)** dans [`home-v3.js`](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/home-v3.js) :
    1. *Services & finance :* Table de rapprochement comptable 3 voies (`BC-104` / `BL-209` / `FAC-8841`) et matrice d'examen de cahier des charges (`300 h Nuit`).
    2. *Sécurité privée :* Grille horaire de contrôle des vacations (détection du chevauchement `07 h 00 < 11 h` sur `M. BENALI`) et table de décomposition du coût horaire (`22,97 €/h` → `25,73 €/h` → `28,59 €/h`).
    3. *BTP & chantiers :* Registre des pièces réglementaires des sous-traitants (alerte URSSAF) et journal des 6 jalons de chantier.
    4. *Patrimoine (En incubation) :* Table de diagnostic de concentration par horizon de liquidité et registre de vérification documentaire.
    5. *Commerce & stocks :* Compte d'exploitation unitaire (`SKU-408`) et table de couverture logistique / réapprovisionnement.
    6. *Hôtellerie & restauration :* Registre de couverture des services (`Service du midi`, `Service du soir`, `Réception & étages`) et table de traitement de la réclamation `CH-204`.
- **[`securite-privee.html`](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/securite-privee.html) & [`securite-v3.js`](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/securite-v3.js) :**
  - Suppression des crochets, des italiques automatiques, de `.comet-dots` et de la fausse URL `securiaxe://director/...`.
  - Remplacement des cartes génériques de Securiaxe Director par une table de contrôle opérationnel à chaque étape (`Affectation`, `Conformité`, `Facturation`, `Remplacement d'urgence`).
- **[`btp.html`](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/btp.html) & [`btp-v3.js`](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/btp-v3.js) :**
  - Suppression des crochets, des italiques automatiques, de `.comet-dots` et de la fausse URL `omnirenov://relance-devis/...`.
  - Structuration du dossier chantier (Lyon, Bordeaux, Toulouse) autour d'une table de qualification technique et de chiffrage HT.
- **[`mentions.html`](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/mentions.html) :**
  - Suppression des crochets `[ CADRE JURIDIQUE & CONFIDENTIALITÉ ]` et de l'italique mécanique, maintien intégral des mentions légales obligatoires (`Mounir NAIT MOHAND EI`, `81000 Albi`, `nait.conv@gmail.com`, `+33 6 17 17 99 74`).

---

## LIVRABLE 3 — CAPTURES COMPARATIVES AVANT / APRÈS HUMANISATION

````carousel
![AVANT Humanisation — Accueil Desktop (crochets [...], titre centré standard)](/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p_devbox/cabe0c80-70b4-4544-8fa0-150be6ccf090/recette/avant_unslop_home_desktop.png)
<!-- slide -->
![APRÈS Humanisation — Accueil Desktop (Hero asymétrique éditorial, surtitre 01 — Ingénierie & architecture sans crochets)](/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p_devbox/cabe0c80-70b4-4544-8fa0-150be6ccf090/recette/apres_unslop_home_desktop.png)
<!-- slide -->
![AVANT Humanisation — CANTARA LAB Desktop (faux boutons macOS, fausse URL cantara://, onglets Famille F..E, emojis)](/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p_devbox/cabe0c80-70b4-4544-8fa0-150be6ccf090/recette/avant_unslop_lab_desktop.png)
<!-- slide -->
![APRÈS Humanisation — CANTARA LAB Desktop (bandeau de poste métier, onglets sectoriels, table de rapprochement comptable 3 voies BC-104 / BL-209 / FAC-8841)](/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p_devbox/cabe0c80-70b4-4544-8fa0-150be6ccf090/recette/apres_unslop_lab_desktop.png)
<!-- slide -->
![AVANT Humanisation — Accueil Mobile Android](/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p_devbox/cabe0c80-70b4-4544-8fa0-150be6ccf090/recette/avant_unslop_home_android.png)
<!-- slide -->
![APRÈS Humanisation — Accueil Mobile Android](/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p_devbox/cabe0c80-70b4-4544-8fa0-150be6ccf090/recette/apres_unslop_home_android.png)
<!-- slide -->
![AVANT Humanisation — Espace Sécurité Privée Desktop (crochets et italique mécanique)](/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p_devbox/cabe0c80-70b4-4544-8fa0-150be6ccf090/recette/avant_unslop_securite_desktop.png)
<!-- slide -->
![APRÈS Humanisation — Espace Sécurité Privée Desktop (surtitre sobre 01 — Calculateur de marge, titre franc sans italique automatique)](/home/antigravity/.gemini/jetski/brain/v1/default/jetski_remote_agents_3p_devbox/cabe0c80-70b4-4544-8fa0-150be6ccf090/recette/apres_unslop_securite_desktop.png)
````

---

## LIVRABLE 4 — RÉSULTATS DES TESTS TECHNIQUES ET D'ACCESSIBILITÉ

La suite automatisée Playwright E2E + Axe-Core WCAG 2.1/2.2 AA ([`verify_cantara_v3.mjs`](file:///home/antigravity/cantara-devtools/verify_cantara_v3.mjs)) a été exécutée sur les 4 pages en résolutions Desktop (`1440×900`) et Mobile Android (`Pixel 7`) :

| Page / Test | Desktop (`1440×900`) | Mobile (`Pixel 7`) | Débordement (`overflowX`) | Erreurs JS / Réseau | Requêtes externes | Violations WCAG 2.1/2.2 AA |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| [`index.html`](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/index.html) | **200 OK** | **200 OK** | `0 px` | `0` | `0` | **0 violation** |
| [`securite-privee.html`](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/securite-privee.html) | **200 OK** | **200 OK** | `0 px` | `0` | `0` | **0 violation** |
| [`btp.html`](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/btp.html) | **200 OK** | **200 OK** | `0 px` | `0` | `0` | **0 violation** |
| [`mentions.html`](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/mentions.html) | **200 OK** | **200 OK** | `0 px` | `0` | `0` | **0 violation** |

- **Tests fonctionnels E2E (`interactions.passed: true`) :**
  - Menu mobile (`aria-expanded`, fermeture `Escape`, restauration du focus sur `#menuBtn`) : **PASS**
  - Comptages structurels (`9` compétences dans `.eng-ledger`, `3` solutions Portfolio, `9` prestations dans `.services-editorial`, `6` postes CANTARA LAB, `10` besoins dans le formulaire) : **PASS**
  - Exécution interactive des 6 postes du CANTARA LAB (`labFamFOk`, `labFamAOk`, `labFamBOk`, `labFamCOk`, `labFamDOk`, `labFamEOk`) : **PASS (6/6)**
  - Assistant d'orientation à 4 étapes (`diagTitle`) : **PASS**
  - Formulaire de contact honnête sans endpoint configuré (`data-form-state="unconfigured"`, `0` fausse confirmation) : **PASS**
  - Simulateur Bouclier Anti-Pertes (`-819 €` à `23,00 €/h` → `+2 781 €` à `35,00 €/h`) et Securiaxe Director (`0,0 h` non couverte après remplacement) : **PASS**
  - Démonstrateur Omnirenov (`btp.html`, approbation dans le Sas de validation humaine) : **PASS**

---

## LIVRABLE 5 — RAPPORT INDÉPENDANT DU SOUS-AGENT `cantara_qa_guardian`

Le sous-agent indépendant `cantara_qa_guardian` ([50f849bddb4755f23b9a2d456a91031b](conversation://50f849bddb4755f23b9a2d456a91031b)) a audité l'ensemble des fichiers avant et après correction :

- **Contrôle P0-1 (Crochets `[...]`) :** `0 / 64` occurrence restante dans le HTML et les chaînes JS (`VALIDÉ 100 %`).
- **Contrôle P0-2 (Italique mécanique en fin de titre) :** `14 / 14` occurrences parasites supprimées, italique réservé exclusivement à la signature institutionnelle du Hero (`VALIDÉ 100 %`).
- **Contrôle P0-3 (Fausses URL `xxx://` et `.comet-dots`) :** `0` fausse URL et `0` `.comet-dots` (`VALIDÉ 100 %`).
- **Contrôle P1-1 / P1-2 / P1-3 / P2 (Nomenclature interne, diversification des architectures CSS, tables métier `.ops-table`, suppression des gadgets 3D/halo et des emojis/hash) :** `VALIDÉ 100 %`.
- **Contrôle des garde-fous non négociables (§7) :** signature et engagements intacts, `0` terme interdit, données personnelles strictement cloisonnées dans `mentions.html`, honnêteté du formulaire de contact (`WEBHOOK_ENABLED: false`).
- **Verdict émis :** **`GO POUR PUBLICATION (ÉTAPE 8)`**.

---

## LIVRABLE 6 — SHA DES COMMITS

| Référence | Branche(s) | SHA court | SHA complet | Objet |
| :--- | :--- | :---: | :--- | :--- |
| **Release Anti-Slop** | `main`, `cantara/v3-epure-comet` | `152ded3` | `152ded3670581031c7d5a4561c61d384cccd91d5` | `feat(cantara-v3): humanisation éditoriale, visuelle et technique intégrale (AI Slop Removal)` |

---

## LIVRABLE 7 — VÉRIFICATION DU SITE RÉELLEMENT PUBLIÉ

La publication effective sur GitHub Pages a été vérifiée par interrogation de l'API GitHub Pages (`status: "built"`, commit `152ded3670581031c7d5a4561c61d384cccd91d5` compilé à `2026-11-27T03:39:25Z`) et requête HTTP directe :

- **Accueil :** https://naitconv-web.github.io/agia-infrastructure/sites/cantara-v3/ (`HTTP/2 200`, présence vérifiée de `.sec-eyebrow`, `.eng-ledger`, `.spec-table`, `.workstation-brand`, `.services-editorial`)
- **Solution Securiaxe :** https://naitconv-web.github.io/agia-infrastructure/sites/cantara-v3/securite-privee.html (`HTTP/2 200`)
- **Solution Omnirenov :** https://naitconv-web.github.io/agia-infrastructure/sites/cantara-v3/btp.html (`HTTP/2 200`)
- **Mentions légales :** https://naitconv-web.github.io/agia-infrastructure/sites/cantara-v3/mentions.html (`HTTP/2 200`)

---

## LIVRABLE 8 — ANOMALIES RESTANTES ET ARBITRAGES NÉCESSAIRES

1. **Anomalies techniques, visuelles ou éditoriales restantes :** **Aucune (`0` anomalie P0, P1 ou P2).**
2. **Arbitrage opérationnel ouvert (inchangé, à la main du PDG) :**
   - **Activation de la réception serveur du formulaire de contact :** Conformément à la règle de véracité (§7) et au mandat, [`comet.js`](file:///home/antigravity/naitconv-web/agia-infrastructure/sites/cantara-v3/comet.js#L13-L16) maintient `WEBHOOK_ENABLED: false` et `CONTACT_ENDPOINT: ''` tant qu'un endpoint serveur de réception n'est pas fourni, et affiche honnêtement l'état `Transmission serveur non effectuée — Aucun envoi simulé`. Dès que vous fournirez l'URL du webhook de réception, il suffira de renseigner `CONTACT_ENDPOINT` et `WEBHOOK_ENABLED: true` pour activer l'envoi `POST` JSON réel.
