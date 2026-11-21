# REGISTRE DES CONNEXIONS SYNTESIA (AGIA-014)

**Date :** 2026-11-21  
**Mission :** AGIA-014 — Connectivité et autonomie opérationnelle SYNTESIA  
**Règle absolue :** Aucune intégration n'est marquée `TESTÉ` ou `VALIDÉ` sans preuve d'exécution réelle sans conséquence externe. Aucun mot de passe n'est demandé ni stocké.

---

## 1. Tableau maître des 10 services

| # | Service | Mécanisme d'accès Antigravity | Statut actuel | Preuve / Observation |
| :--- | :--- | :--- | :--- | :--- |
| 1 | **GitHub** | Plugin officiel `gh` + Git HTTPS via `agy-plugin-proxy` | **VALIDÉ** | `gh api user --jq '.login'` -> `naitconv-web` ; push vérifié sur `naitconv-web/agia-infrastructure`. |
| 2 | **Google Workspace** (`Drive`, `Gmail`, `Calendar`, `Sheets`, `Docs`, `Slides`) | Plugins officiels `/opt/antigravity/bin/*` (`agy-plugin-proxy`) | **TESTÉ** (`Drive`, `Gmail`, `Calendar`, `Sheets`) / **CONNECTÉ** (`Docs`, `Slides`) | `gdrive readonly quota` (31.0 GB / 5120.0 GB), `gmail readonly labels`, `gcalendar readonly calendars`, `gsheets readonly info` OK ; `gdocs`/`gslides auth status` = `Logged in`. |
| 3 | **CRM SYNTESIA** (`Google Sheets CRM`) | Plugin officiel `gsheets` + `scripts/orchestrate_crm.py` | **TESTÉ** | `gsheets readonly info 1EmC6f4ljLU2GZmD9HEBt50WdTlVXoQtPQ64vFQL1I_0` -> `AGIA — CRM & Pilotage Opérationnel` (7 onglets). Coût `0,00 €`. |
| 4 | **o2switch** (cPanel / SSH) | Clé SSH dédiée (`ssh user@server.o2switch.net`) ou Jeton API cPanel (pas de navigateur interactif ; `clients.o2switch.fr` -> HTTP 503 via proxy) | **À AUTORISER** | Nécessite création par le fondateur d'une clé SSH dédiée / API token cPanel + 7 captures cPanel (AGIA-013). |
| 5 | **WordPress** (Administration) | WordPress REST API (`/wp-json/wp/v2/`) via **Application Password** ou **WP-CLI** via SSH o2switch | **À AUTORISER** | Dépend de l'inventaire o2switch (Phase 3) pour lister les installations WordPress existantes. |
| 6 | **Facebook & Meta Business Suite** | Meta Graph API (`graph.facebook.com` joignable via proxy : HTTP 400 sans token) + System User Token | **À AUTORISER** | Nécessite création/accès Business Portfolio Meta + App Meta + attribution des rôles sur `SYNTESIA France` et `SYNTESIA Algérie`. |
| 7 | **Instagram** | Meta Graph API via compte Instagram Professionnel relié à une Page Facebook | **À AUTORISER** | Dépend de la connexion Meta Business Suite ; impossible en compte personnel isolé. |
| 8 | **Google Analytics (GA4) & Search Console (GSC)** | API Google (`analyticsdata.googleapis.com` & `searchconsole.googleapis.com` joignables : HTTP 404) via Service Account GCP ou OAuth2 | **À AUTORISER** | Pas de plugin Antigravity natif dédié GA4/GSC ; à connecter par Service Account lecture seule (`analytics.readonly`, `webmasters.readonly`). |
| 9 | **Canva** | Canva Connect API (`api.canva.com` joignable : HTTP 404) via OAuth2 | **À AUTORISER** | Utile pour export/import d'assets ; édition visuelle complète non exposée par l'API standard (hors Brand Templates). |
| 10 | **LinkedIn** | LinkedIn API (`api.linkedin.com` joignable : HTTP 403) via OAuth2 App approuvée | **À AUTORISER** | Approbation Community Management API requise pour Page Entreprise ; automatisation DM personnelle **interdite** (risque de blocage compte). |

---

## 2. Légende des statuts (AGIA-014)

- **`NON CONNECTÉ`** : aucune intégration configurée.
- **`À AUTORISER`** : faisabilité technique vérifiée, en attente d'autorisation et de configuration sécurisée par le fondateur (un service à la fois).
- **`CONNECTÉ`** : jeton/session présent mais test fonctionnel complet non encore exécuté.
- **`TESTÉ`** : test réel en lecture seule sans conséquence externe réussi.
- **`VALIDÉ`** : permissions vérifiées, documentation à jour, usage opérationnel autorisé sous garde-fous.
- **`BLOQUÉ`** : restriction technique, proxy, ou refus plateforme empêchant l'accès.
