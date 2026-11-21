# CHECKLIST OPÉRATIONNELLE DE MISE EN PRODUCTION — SYNTESIA (FRANCE & ALGÉRIE)

**Référence :** SYNTESIA-PROD-CHECKLIST-009  
**Date :** 21 novembre 2026  
**Règle d'or :** Aucune bascule en production ne doit être effectuée tant que les **5 étapes de la Section 2 (Décisions & Actions Fondateur)** ne sont pas toutes cochées.

---

## 1. PRÉREQUIS TECHNIQUES & SÉCURITÉ DÉJÀ VALIDÉS EN PRÉ-PRODUCTION (`[x] 100 % COMPLÉTÉ`)

- [x] **Design System Refero 100 % autonome (`sites/shared/syntesia-design-system.css`)** : 230+ classes utilitaires et reset Preflight compilés en local, zéro dépendance CDN externe (`0` appel à `cdn.tailwindcss.com` ou `fonts.googleapis.com`).
- [x] **Validation multi-écrans (`375 px`, `768 px`, `1024 px`, `1440 px`)** sur les 5 pages HTML dans Chromium Headless : `0` débordement horizontal (`20/20` contrôles réussis), tiroir `[MENU]` mobile fonctionnel et contrastes WCAG 2.1 AA/AAA (`4.93:1` à `17.56:1`).
- [x] **Accessibilité Clavier & Formulaires (`100 %`)** : `34/34` `<label for="...">` reliés aux `id` des champs, contour clavier `:focus-visible` actif et annonces `role="status" aria-live="polite"` sur les 4 panneaux de retour.
- [x] **Intégrité de la navigation** : `106/106` liens internes et références de scripts locaux vérifiés (`0` lien brisé).
- [x] **Moteur unifié de formulaires (`sites/shared/syntesia-forms.js` v2.2)** :
  - [x] Filtrage Honeypot sur les 4 formulaires (`website_url`, `website_url_dz`, `company_website`, `business_site`).
  - [x] Validation stricte des champs requis, du format e-mail, du format téléphone E.164 (`8` à `15` chiffres sans caractères HTML) et du consentement RGPD distinct.
  - [x] Blocage anti-double-soumission côté client (`120 s` sur l'empreinte `email|verticale|besoin` + désactivation du bouton pendant l'envoi).
  - [x] Protection anti-injection XSS (`escapeHtml`) et anti-injection de formules Google Sheets `CWE-1236` (`sanitizeSheetField` préfixant `[=+\-@|%]` par `'`).
- [x] **Récepteur CRM (`automations/google_apps_script_crm_sync.js` v2.2 & `scripts/orchestrate_crm.py` v2.2)** :
  - [x] Correspondance exacte avec le schéma 15 colonnes (`A` à `O`) de `01_PROSPECTS_LEADS` (vérifiée par insertion et relecture réelle de la ligne `LEAD-TEST-20261121-183904-4493` dans `1EmC6f4ljLU2GZmD9HEBt50WdTlVXoQtPQ64vFQL1I_0`).
  - [x] Barème de score `/10` unifié (tranches de budget et tranches d'effectif TPE/PME/ETI + toutes verticales AGIA-005/006).
  - [x] Dédoublonnage serveur sur les 25 dernières lignes, plafond payload `15 Ko`, fuseau `Europe/Paris` et purge de toute PII dans les logs.
- [x] **Garde-fou de pré-production actif** : `WEBHOOK_ENABLED: false` et `ENVIRONMENT: "PREPROD"` verrouillés dans `sites/shared/syntesia-forms.js`.

---

## 2. LES 5 ÉTAPES DE BASCULE RÉSERVÉES AU FONDATEUR AVANT OUVERTURE COMMERCIALE (`[ ] À EXÉCUTER AU GO-LIVE`)

### Étape 1 — Compléter et valider les Mentions Légales & la Politique RGPD
Dans le fichier [sites/shared/mentions-legales-confidentialite.html](file:///home/antigravity/agia-infrastructure/sites/shared/mentions-legales-confidentialite.html) :
- [ ] **Bloc 1.1 (Éditeur) :** Remplacer les balises `[À RENSEIGNER PAR LE FONDATEUR...]` par :
  - La dénomination sociale immatriculée, la forme juridique et le capital social (dès réception du Kbis définitif d'`ATLAS GLOBAL TRADING` ou structure porteuse désignée).
  - Le numéro SIREN / SIRET et RCS.
  - L'adresse postale du siège social.
  - Le nom et prénom du Directeur de la publication.
  - L'adresse e-mail et le numéro de téléphone de contact officiel.
- [ ] **Bloc 1.2 (Hébergeur) :** Renseigner la raison sociale, l'adresse postale et le téléphone de l'hébergeur web retenu.
- [ ] **Bloc 2.3 & 2.5 (RGPD / ANPDP) :** Valider formellement la durée de conservation des données prospects (**3 ans** après le dernier contact proposé par défaut selon la norme CNIL) et renseigner l'adresse e-mail dédiée à l'exercice des droits d'accès/suppression.

### Étape 2 — Déployer le Webhook Google Apps Script sur le tableur CRM
- [ ] Ouvrir le tableur Google Sheets `SYNTESIA_CRM_CENTRAL` (`1EmC6f4ljLU2GZmD9HEBt50WdTlVXoQtPQ64vFQL1I_0`).
- [ ] Aller dans **Extensions > Apps Script** et remplacer le code par le contenu intégral de [automations/google_apps_script_crm_sync.js](file:///home/antigravity/agia-infrastructure/automations/google_apps_script_crm_sync.js) (version 2.2).
- [ ] Cliquer sur **Déployer > Nouveau déploiement > Application Web** :
  - *Exécuter en tant que :* **Moi**
  - *Qui peut accéder :* **Tout le monde**
- [ ] Copier l'URL générée (`https://script.google.com/macros/s/.../exec`).

### Étape 3 — Raccorder et activer l'interrupteur dans `sites/shared/syntesia-forms.js`
- [ ] Dans [sites/shared/syntesia-forms.js](file:///home/antigravity/agia-infrastructure/sites/shared/syntesia-forms.js#L10-L14) (lignes 10 à 14), effectuer un test final en gardant `ENVIRONMENT: "PREPROD"` avec `WEBHOOK_ENABLED: true` et l'URL collée dans `WEBHOOK_URL`, puis vérifier qu'une soumission test arrive dans `01_PROSPECTS_LEADS` avec la colonne O = `TEST`.
- [ ] Une fois ce test validé, passer la configuration en mode production :
  ```javascript
  window.SYNTESIA_CONFIG = {
    ENVIRONMENT: "PROD",
    WEBHOOK_ENABLED: true,
    WEBHOOK_URL: "https://script.google.com/macros/s/VOTRE_ID_DEPLOIEMENT/exec"
  };
  ```

### Étape 4 — Retirer les mentions visuelles de « Pré-Production »
- [ ] Retirer le bandeau `[STATUT : INFRASTRUCTURE EN PRÉ-PRODUCTION · PROJET EN COURS DE STRUCTURATION]` dans le pied de page de `sites/france/index.html`, `sites/algerie/index.html` et l'encadré de pré-production en haut de `sites/shared/mentions-legales-confidentialite.html`.

### Étape 5 — Raccorder le nom de domaine et publier le dossier `sites/`
- [ ] Renseigner le nom de domaine définitif pour générer `sitemap.xml`, `robots.txt` et les balises `<link rel="canonical">` / `hreflang="fr-FR"` & `"fr-DZ"`.
- [ ] Déployer le répertoire statique `sites/` sur l'hébergeur HTTPS choisi.
