# POLITIQUE DE SÉCURITÉ, CONSERVATION DES DONNÉES & GESTION DES SECRETS
**Mission :** AGIA-002 — Priorité P1  
**Portée :** Google Drive, CRM Google Sheets, dépôts GitHub, scripts et flux API  

---

## 1. CONTRÔLE DES ACCÈS & DROITS UTILISATEURS

### État constaté lors de l'audit AGIA-002 :
- **CRM Google Sheets** (`1EmC6f4ljLU2GZmD9HEBt50WdTlVXoQtPQ64vFQL1I_0`) :  
  - Propriétaire exclusif : `nait.conv@gmail.com` (`Role: owner`).  
  - Accès public : `NON` (Aucun partage public ou lien ouvert).
- **Dossier central Drive `_AGIA_PILOTAGE`** (`17gFy4iaLy-5-sFoKjfB0z4O2co35z6ES`) :  
  - Propriétaire exclusif : `nait.conv@gmail.com`.  
  - Accès public : `NON`.
- **Dépôt GitHub** `naitconv-web/agia-infrastructure` :  
  - Visibilité : `PRIVATE` (Privé).  
  - Clé d'accès : `GH_TOKEN` injecté par proxy d'environnement sandbox.

### Règle permanente :
Tout partage ultérieur vers un collaborateur ou un prestataire externe devra faire l'objet d'une attribution nominative avec rôle minimal requis (`reader` ou `commenter` prioritaire sur `editor`). Zéro partage par lien public ouvert.

---

## 2. RÈGLES DE CONSERVATION ET DE PURGE DES DONNÉES (RGPD & SECRET DES AFFAIRES)

| Catégorie de données | Emplacement | Durée de conservation | Modalité de purge / archivage |
| :--- | :--- | :--- | :--- |
| **Leads froids / Sans suite (< 3 mois)** | Onglet `01_PROSPECTS_LEADS` | 6 mois maximum après dernier contact | Déplacement vers onglet d'archivage ou suppression définitive |
| **Données de qualification / Entreprise** | CRM Sheets | Durée de la relation commerciale + 3 ans | Conformité CNIL (prospection B2B) |
| **Données de test technique** | CRM Sheets (`Environnement = TEST`) | 30 jours | Nettoyage régulier par script d'audit |
| **Contrats & Devis signés** | Drive `03_ADMIN_CONTRATS_FACTURES` | 10 ans | Obligation comptable légale (Code de Commerce) |
| **Logs et métriques d'exécution** | Drive `04_SUPERVISION_METRIQUES` | 12 mois | Purge annuelle automatisée |

### Droit d'opposition et suppression immédiate :
Toute demande d'un prospect (par mail ou formulaire) demandant son effacement doit être traitée sous 72h ouvrées :
1. Suppression de la ligne du CRM.
2. Inscription de l'empreinte/domaine dans `PROSPECTION_EXCLUSIONS.md` pour empêcher toute réingestion ou relance future.

---

## 3. GESTION DES SECRETS & ACCÈS API

### Audit des variables d'environnement :
- Aucune clé API (`GEMINI_API_KEY`, `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`) n'est stockée en dur dans le code source ou dans les dépôts GitHub.
- Le token GitHub (`GH_TOKEN`) est fourni dynamiquement par le sandbox du système hôte (`agy-plugin-proxy`).
- **Règle absolue :** Les fichiers `.env`, clés privées, tokens ou mots de passe sont exclus de tout commit via `.gitignore` et ne doivent jamais transiter dans les prompts ou les fichiers publics.

---

## 4. DÉPLOIEMENT DU WEBHOOK APPS SCRIPT (GUIDE OPÉRATIONNEL ÉTAPE PAR ÉTAPE)

Le fichier [`automations/google_apps_script_crm_sync.js`](file:///home/antigravity/agia-infrastructure/automations/google_apps_script_crm_sync.js) contient le code d'ingestion serveur. Pour l'activer réellement :

1. Ouvrir le tableur CRM : [AGIA — CRM & Pilotage Opérationnel](https://docs.google.com/spreadsheets/d/1EmC6f4ljLU2GZmD9HEBt50WdTlVXoQtPQ64vFQL1I_0).
2. Cliquer sur le menu **Extensions > Apps Script**.
3. Remplacer tout code existant par le contenu de `google_apps_script_crm_sync.js`.
4. Cliquer sur **Déployer > Nouveau déploiement**.
5. Type de déploiement : choisir **Application Web**.
6. Configuration :
   - *Description :* « Ingestion Leads Web AGIA v1 »
   - *Exécuter en tant que :* **Moi** (votre compte Google)
   - *Qui a accès :* **Tout le monde** (requis pour permettre la réception des formulaires anonymes sans authentification Google).
7. Cliquer sur **Déployer**, autoriser les autorisations requises (accès Sheets et envoi d'emails Gmail).
8. Copier l'**URL de l'application Web** générée (format `https://script.google.com/macros/s/.../exec`).
9. Reporter cette URL dans la constante `ENDPOINT_URL` des fichiers `sites/france/index.html` et `sites/algerie/index.html`.

---

## 5. STATUT RÉEL DES COMPOSANTS : MANUEL VS AUTOMATISÉ EN TÂCHE DE FOND

| Composant | Type d'exécution réel | Déclencheur | État d'opérationnalité |
| :--- | :--- | :--- | :--- |
| `scripts/orchestrate_crm.py` | **MANUEL (Script CLI)** | Ligne de commande par l'opérateur | **CONSTRUIT & TESTÉ** |
| `scripts/generate_proposal.py`| **MANUEL (Script CLI)** | Ligne de commande par l'opérateur | **CONSTRUIT & TESTÉ** |
| `scripts/audit_kpi_sync.py` | **MANUEL (Script CLI)** | Ligne de commande ou cron local | **CONSTRUIT & TESTÉ** |
| `scripts/communication_gate.py`| **MANUEL (Module Python)**| Appelé par les scripts d'envoi | **CONSTRUIT & TESTÉ** |
| Webhook Google Apps Script | **ASYNCHRONE / ÉVÉNEMENTIEL** | Requête HTTP POST du visiteur web | **CONSTRUIT — EN ATTENTE DÉPLOIEMENT UTILISATEUR** |
| Triggers / Cron périodiques | **NON DÉPLOYÉS** | Aucun trigger cron actif en tâche de fond | **À CONFIGURER DANS APPS SCRIPT / ACTIONS** |

> [!IMPORTANT]
> **Transparence d'ingénierie :** Aucun processus d'arrière-plan ne tourne en « temps réel magique » sur la machine virtuelle sans un déclencheur actif. Les automatisations en temps réel dépendent du déploiement de l'Apps Script web app ou de workflows GitHub Actions programmés.
