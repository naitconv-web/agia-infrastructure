# RAPPORT DES TESTS DE CONNECTIVITÉ RÉELS (AGIA-014)

**Date :** 2026-11-21  
**Périmètre :** Tests réels en lecture seule exécutés depuis la VM Antigravity sans aucune modification externe.

---

## 1. Tests des plugins natifs Antigravity

| Service | Commande testée (lecture seule) | Résultat brut observé | Verdict |
| :--- | :--- | :--- | :--- |
| **GitHub** | `gh auth status` & `gh api user --jq '.login'` | `Logged in to github.com account naitconv-web` ; retour `naitconv-web` (Exit 0) | **VALIDÉ** |
| **Google Drive** | `gdrive readonly quota` | `Used: 31.0 GB` / `Limit: 5120.0 GB` / `Trash: 5.3 MB` (Exit 0) | **TESTÉ & VALIDÉ** |
| **Gmail** | `gmail readonly labels` | Liste des labels système (`INBOX`, `SENT`, `DRAFT`, etc.) retournée (Exit 0) | **TESTÉ & VALIDÉ** |
| **Google Calendar** | `gcalendar readonly calendars` | 3 agendas listés dont `nait.conv@gmail.com` (Exit 0) | **TESTÉ & VALIDÉ** |
| **Google Sheets / CRM** | `gsheets readonly info 1EmC6f4ljLU2GZmD9HEBt50WdTlVXoQtPQ64vFQL1I_0` | `Title: AGIA — CRM & Pilotage Opérationnel`, `Sheets: 7` (`01_PROSPECTS_LEADS`, `02_OPPORTUNITES_DEVIS`, etc.) (Exit 0) | **TESTÉ & VALIDÉ** |
| **Google Docs** | `gdocs auth status` | `Authentication Status: Logged in` (Exit 0) | **CONNECTÉ** |
| **Google Slides** | `gslides auth status` | `Authentication Status: Logged in` (Exit 0) | **CONNECTÉ** |

---

## 2. Tests de joignabilité réseau via le proxy `agy-plugin-proxy` (services à autoriser)

| Cible testée | Requête HTTP (`curl`) | Code HTTP observé | Interprétation factuelle |
| :--- | :--- | :--- | :--- |
| `https://clients.o2switch.fr` | `curl -s -o /dev/null -w "%{http_code}"` | **`503`** | Espace client web non accessible directement en mode automatisé (et pas de navigateur interactif). Privilégier **SSH / API cPanel** après autorisation. |
| `https://graph.facebook.com` | `curl -s -o /dev/null -w "%{http_code}"` | **`400`** | API Graph joignable via le proxy (400 attendu sans token/requête). Prêt pour System User Token Meta. |
| `https://analyticsdata.googleapis.com` | `curl -s -o /dev/null -w "%{http_code}"` | **`404`** | Endpoint joignable via le proxy. Prêt pour Service Account GA4 lecture seule. |
| `https://searchconsole.googleapis.com` | `curl -s -o /dev/null -w "%{http_code}"` | **`404`** | Endpoint joignable via le proxy. Prêt pour Service Account GSC lecture seule. |
| `https://api.canva.com` | `curl -s -o /dev/null -w "%{http_code}"` | **`404`** | Endpoint joignable via le proxy. Prêt pour OAuth2 Canva Connect si autorisé. |
| `https://api.linkedin.com` | `curl -s -o /dev/null -w "%{http_code}"` | **`403`** | Endpoint joignable via le proxy (403 attendu sans OAuth). Prêt pour LinkedIn Page Entreprise si approuvé. |
