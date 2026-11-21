# RAPPORT DE VALIDATION FINALE DE PRÉ-PRODUCTION : CLÔTURE TECHNIQUE DES SITES SYNTESIA & LISTE DES SEULES DÉCISIONS RESTANTES AU FONDATEUR

**Date de validation :** 21 novembre 2026  
**Dépôt GitHub :** `naitconv-web/agia-infrastructure` (branche `main`)  
**Statut :** `PRÉ-PRODUCTION 100 % COMPLÈTE ET TESTÉE — ZÉRO DONNÉE JURIDIQUE INVENTÉE — WEBHOOK_ENABLED = FALSE — ZÉRO PUBLICATION PUBLIQUE`

---

## 1. SYNTHÈSE DES CORRECTIONS TECHNIQUES EXÉCUTÉES (`P0-1` À `P2-1`)

L'ensemble des écarts techniques, d'accessibilité, de conformité RGPD et de navigation mobile identifiés lors de l'audit ont été intégralement résolus :

| Code | Chantier technique | Résultat vérifié après correction | Fichiers mis à jour / créés |
| :---: | :--- | :--- | :--- |
| **`P0-1`** | **Alignement du récepteur CRM (Apps Script & Python)** | • Ajout du filtre Honeypot `data.website_url_dz` côté serveur.<br>• Mise à jour du moteur de score (`+1 pt`) pour reconnaître l'ensemble des intitulés de verticales AGIA-005/006 (`Sécurité`, `Bâtiment`, `BTP`, `Rénovation`, `HCR`, `CGP`).<br>• Comptage strict des chiffres (`>= 8`) sur le numéro de téléphone. | `automations/google_apps_script_crm_sync.js`<br>`scripts/orchestrate_crm.py` |
| **`P0-2`** | **Moteur unifié de formulaires (`syntesia-forms.js`)** | • Création de `sites/shared/syntesia-forms.js` partagé par les 4 pages.<br>• Validation regex e-mail (`/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/`), téléphone (`>= 8` chiffres), Honeypot et consentement RGPD.<br>• Assemblage normalisé de l'objet `payload` 15 colonnes sur les 4 pages (avec mappage `effectif -> maturite` et pré-calcul du score `/10`).<br>• Interrupteur central unique : **`WEBHOOK_ENABLED: false`** par défaut en pré-production (zéro requête sortante). | `sites/shared/syntesia-forms.js`<br>Les 4 pages `index.html` |
| **`P0-3`** | **Page « Mentions Légales & Politique de Confidentialité (RGPD) »** | • Création de `sites/shared/mentions-legales-confidentialite.html` conforme à la LCEN (Art. 6-III-1), au RGPD (Art. 13) et à la Loi algérienne n° 18-07.<br>• **Zéro information juridique inventée** : les paramètres dépendant de l'immatriculation et de l'hébergement sont balisés par `[À RENSEIGNER PAR LE FONDATEUR AVANT MISE EN LIGNE COMMERCIALE]`.<br>• Reliée aux 4 cases à cocher RGPD et aux 4 pieds de page. | `sites/shared/mentions-legales-confidentialite.html` |
| **`P1-1`** | **Accessibilité `100 %` des champs de formulaire (`<label for="id">`)** | • Liaison explicite `for="..."` / `id="..."` ajoutée sur les 7 champs de `securite-privee/index.html` et les 7 champs de `batiment-renovation/index.html`.<br>• Score total : **`34 / 34` (`100 %`)** des labels reliés sur l'ensemble du site. | `sites/france/securite-privee/index.html`<br>`sites/france/batiment-renovation/index.html` |
| **`P1-2`** | **Suppression de toute requête tierce (`fonts.googleapis.com`)** | • Retrait des appels externes vers `fonts.googleapis.com` et `fonts.gstatic.com` sur les 4 pages.<br>• **0 requête réseau tierce** lors de l'ouverture des pages : aucune adresse IP visiteur n'est transmise à un serveur externe (conformité RGPD stricte sans bandeau cookies). | Les 4 pages `index.html` |
| **`P1-3`** | **Tiroir de navigation Mobile (`[MENU]` sur `< 1024px / 768px`)** | • Ajout d'un bouton `[MENU]` dans l'en-tête mobile/tablette ouvrant un panneau de navigation interne vers toutes les sections de la page + les Mentions légales.<br>• Ajustement responsive `375px` garantissant que `[SY] SYNTESIA`, `[MENU]` et le bouton CTA principal tiennent sur une seule ligne sans troncature. | Les 4 pages `index.html`<br>`sites/shared/syntesia-design-system.css` |
| **`P2-1`** | **Favicon SVG inline, OpenGraph & Schema.org `JSON-LD`** | • Intégration du Favicon SVG inline (`SY` noir sur crème), des métadonnées `og:title`, `og:description`, `og:type`, `og:locale`, `og:site_name` et du balisage structuré `application/ld+json` (`ProfessionalService` / `Service`). | Les 5 fichiers HTML |

---

## 2. RÉSULTATS DE LA CAMPAGNE DE TESTS AUTOMATISÉS ET VISUELS (5 PAGES & 20 CAS DE TESTS E2E)

### 2.1. Audit technique, accessibilité et intégrité des 5 fichiers HTML

| Fichier contrôlé | Accessibilité `<label for="id">` | Liens & Scripts vérifiés | Requêtes tierces externes | OpenGraph / Favicon / JSON-LD | Menu Mobile & Lien Légal |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **`sites/france/index.html`** | **`10 / 10` (100 %)** | **`31 / 31` (`0` brisé)** | **`0` requête externe** | **`100 %` présent** | **`100 %` actif** |
| **`sites/algerie/index.html`** | **`8 / 8` (100 %)** | **`21 / 21` (`0` brisé)** | **`0` requête externe** | **`100 %` présent** | **`100 %` actif** |
| **`sites/france/securite-privee/index.html`** | **`8 / 8` (100 %)** | **`22 / 22` (`0` brisé)** | **`0` requête externe** | **`100 %` présent** | **`100 %` actif** |
| **`sites/france/batiment-renovation/index.html`** | **`8 / 8` (100 %)** | **`20 / 20` (`0` brisé)** | **`0` requête externe** | **`100 %` présent** | **`100 %` actif** |
| **`sites/shared/mentions-legales-confidentialite.html`** | **`N/A` (Page légale)** | **`12 / 12` (`0` brisé)** | **`0` requête externe** | **`100 %` présent** | **`100 %` actif** |
| **TOTAL PORTEFEUILLE WEB** | **`34 / 34` (100 %)** | **`106 / 106` (`0` brisé)** | **`0` requête tierce** | **`5 / 5` pages** | **`5 / 5` pages** |

### 2.2. Simulation E2E JavaScript (Node.js VM) des 4 formulaires sur 5 scénarios (`20/20` réussis)

Chaque formulaire (`leadFormSyntesiaFr`, `leadFormSyntesiaDz`, `formSecu`, `formBtp`) a été exécuté contre 5 scénarios :

| Formulaire | Scénario A : Attaque Honeypot | Scénario B : Oubli case RGPD | Scénario C : Email invalide (`not-an-email`) | Scénario D : Téléphone court (`0612`) | Scénario E : Prospect B2B valide (`WEBHOOK_ENABLED=false`) |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **`leadFormSyntesiaFr`** *(France)* | `FILTERED_HONEYPOT` (Bloqué) | `VALIDATION_ERROR_REQUIRED` (Bloqué) | `VALIDATION_ERROR_EMAIL` (Bloqué) | `VALIDATION_ERROR_PHONE` (Bloqué) | `PREPROD_VALIDATED` · Payload 15 col. · Score **`10/10`** |
| **`leadFormSyntesiaDz`** *(Algérie)* | `FILTERED_HONEYPOT` (Bloqué) | `VALIDATION_ERROR_REQUIRED` (Bloqué) | `VALIDATION_ERROR_EMAIL` (Bloqué) | `VALIDATION_ERROR_PHONE` (Bloqué) | `PREPROD_VALIDATED` · Payload 15 col. · Score **`10/10`** |
| **`formSecu`** *(Sécurité Privée)* | `FILTERED_HONEYPOT` (Bloqué) | `VALIDATION_ERROR_REQUIRED` (Bloqué) | `VALIDATION_ERROR_EMAIL` (Bloqué) | `VALIDATION_ERROR_PHONE` (Bloqué) | `PREPROD_VALIDATED` · Payload 15 col. (`Effectif: 50 à 150 agents`) · Score **`10/10`** |
| **`formBtp`** *(Bâtiment/BTP/Rénov)* | `FILTERED_HONEYPOT` (Bloqué) | `VALIDATION_ERROR_REQUIRED` (Bloqué) | `VALIDATION_ERROR_EMAIL` (Bloqué) | `VALIDATION_ERROR_PHONE` (Bloqué) | `PREPROD_VALIDATED` · Payload 15 col. (`Rénovation`) · Score **`10/10`** |

---

## 3. LISTE PRÉCISE DES SEULES DÉCISIONS ET ACTIONS QUI RESTENT À PRENDRE PAR LE FONDATEUR

La pré-production technique étant **100 % achevée**, aucune tâche de développement front-end ou de structuration CRM ne reste en suspens. Le passage en production commerciale dépend désormais **exclusivement des 5 décisions souveraines suivantes du fondateur** :

### Décision 1 — Coordonnées juridiques de l'éditeur (dans `sites/shared/mentions-legales-confidentialite.html`)
Remplacer les 5 balises `[À RENSEIGNER PAR LE FONDATEUR...]` du bloc **1.1. Identité de l'Éditeur** :
1. **Dénomination sociale immatriculée, forme juridique et capital social** (ex. *SASU ATLAS GLOBAL TRADING au capital de X €* dès réception du Kbis définitif, ou structure porteuse choisie).
2. **Numéro SIREN / SIRET et RCS** (ex. *RCS Paris n° XXX XXX XXX*).
3. **Adresse officielle du siège social** (ex. *229 rue Saint-Honoré, 75001 Paris*).
4. **Nom et prénom du Directeur de la publication**.
5. **Adresse e-mail et téléphone de contact officiel + adresse e-mail dédiée à l'exercice des droits RGPD** (Bloc 2.5).

### Décision 2 — Choix de l'hébergeur et du nom de domaine
1. **Arrêter le ou les noms de domaine définitifs** (ex. `syntesia.fr` / `syntesia.dz` ou domaine unique avec sous-répertoires `/france` et `/algerie`).
2. **Choisir l'hébergeur** (ex. *o2switch*, *Cloudflare Pages*, *Vercel* ou *GitHub Pages privé/public*) et renseigner sa raison sociale, son adresse et son téléphone dans le bloc **1.2. Hébergement du site** de `sites/shared/mentions-legales-confidentialite.html`.
   *(Dès que le domaine sera arrêté, les balises `<link rel="canonical">`, `hreflang` et le fichier `sitemap.xml` pourront être générés en 30 secondes avec l'URL exacte).*

### Décision 3 — Déploiement du Webhook Google Apps Script sur le tableur CRM
Lorsque vous souhaiterez activer la réception réelle des leads dans Google Sheets (`1EmC6f4ljLU2GZmD9HEBt50WdTlVXoQtPQ64vFQL1I_0`) :
1. Ouvrir le tableur Google Sheets `SYNTESIA_CRM_CENTRAL` ➔ menu **Extensions > Apps Script**.
2. Coller le contenu du fichier [automations/google_apps_script_crm_sync.js](file:///home/antigravity/agia-infrastructure/automations/google_apps_script_crm_sync.js) (déjà mis à jour en v2.1).
3. Cliquer sur **Déployer > Nouveau déploiement > Application Web** (*Exécuter en tant que : Moi*, *Qui peut accéder : Tout le monde*) et copier l'URL `https://script.google.com/macros/s/.../exec`.

### Décision 4 — Bascule de l'interrupteur unique de pré-production vers la production (`sites/shared/syntesia-forms.js`)
Dans le fichier unique [sites/shared/syntesia-forms.js](file:///home/antigravity/agia-infrastructure/sites/shared/syntesia-forms.js#L10-L14) (lignes 10 à 14), modifier les 3 lignes de configuration :
```javascript
window.SYNTESIA_CONFIG = {
  ENVIRONMENT: "PROD",
  WEBHOOK_ENABLED: true,
  WEBHOOK_URL: "https://script.google.com/macros/s/VOTRE_ID_DEPLOIEMENT/exec"
};
```

### Décision 5 — Retrait de la mention visuelle `[STATUT : INFRASTRUCTURE EN PRÉ-PRODUCTION]` et ordre de publication
Donner l'autorisation explicite de retirer la ligne `[STATUT : INFRASTRUCTURE EN PRÉ-PRODUCTION · PROJET EN COURS DE STRUCTURATION]` des pieds de page et de pousser les fichiers statiques du dossier `sites/` sur l'hébergeur choisi.
