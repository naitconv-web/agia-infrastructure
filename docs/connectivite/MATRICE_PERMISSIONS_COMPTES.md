# MATRICE DES PERMISSIONS ET SÉCURITÉ DES COMPTES (AGIA-014)

**Date :** 2026-11-21  
**Principe :** Moindre privilège, séparation lecture / écriture, aucun secret en clair dans Git, aucune action irréversible sans validation du fondateur.

| Service | Compte / Identité cible | Permissions minimales requises | Restrictions & limites | Risques de sécurité & parades |
| :--- | :--- | :--- | :--- | :--- |
| **GitHub** | `naitconv-web` (OAuth plugin) | Lecture/écriture sur `agia-infrastructure` | Scopé au projet via `agy-plugin-proxy` | Ne jamais commiter `.env`, tokens ou données personnelles clients. |
| **Google Workspace** | `nait.conv@gmail.com` (OAuth plugins) | Lecture/écriture Drive, Docs, Sheets, Slides, Calendar, Gmail | Token sans refresh automatique ; usage encadré par `communication_gate.py` | Aucun envoi d'e-mail externe sans validation explicite du fondateur. |
| **CRM Google Sheets** | Sheet `1EmC6f4ljLU2GZmD9HEBt50WdTlVXoQtPQ64vFQL1I_0` | Lecture/écriture sur les 7 onglets CRM | Quota API Google Sheets ; pas de données de santé (RGPD Art. 9) | Séparer `Environnement = TEST` et `PROD` ; sauvegarde régulière. |
| **o2switch** | Compte client + accès SSH dédié | SSH / SFTP limité au répertoire SYNTESIA (ou token API cPanel scopé) | Pas de Docker ; pas de navigateur interactif depuis Antigravity | **Jamais de mot de passe cPanel dans le chat** ; utiliser une clé SSH dédiée révocable. |
| **WordPress** | Utilisateur technique dédié (rôle Éditeur ou Admin restreint) | **Application Password** REST API (`posts`, `pages`, `media`) ou WP-CLI | API REST parfois filtrée par WAF/plugins sécurité | Préférer statut `draft` (brouillon) par défaut ; publication manuelle ou validée. |
| **Facebook / Meta Business Suite** | Business Portfolio officiel du fondateur | System User avec rôle limité aux Pages `SYNTESIA France` & `SYNTESIA Algérie` (`pages_manage_posts`, `pages_read_engagement`, `pages_messaging`) | **Interdiction de créer des comptes personnels fictifs** ; validation Meta App requise pour certains scopes | Révocation instantanée du System User dans Meta Business Suite ; zéro publication sans accord. |
| **Instagram** | Compte Pro lié au Business Portfolio | `instagram_basic`, `instagram_manage_comments`, `instagram_manage_messages` | Doit être un compte Professionnel relié à une Page Facebook | Même gouvernance que Meta ; brouillons validés avant publication. |
| **Google Analytics & Search Console** | Propriétés GA4 & GSC des sites SYNTESIA | Service Account GCP avec rôle **Lecteur** uniquement (`analytics.readonly`, `webmasters.readonly`) | Aucun droit d'administration/suppression de propriété | Zéro risque de modification ; lecture seule stricte. |
| **Canva** | Compte Canva du fondateur | OAuth2 Connect API (`asset:read`, `design:meta:read`, `design:content:read`) | Édition graphique complète non disponible via API standard | Pas d'accès facturation/équipe ; export d'assets uniquement. |
| **LinkedIn** | Page Entreprise SYNTESIA | OAuth2 `r_organization_social`, `w_organization_social` (après approbation App) | Automatisation de DM/invitations personnelles **interdite** par les CGU LinkedIn | Risque de ban du compte personnel si scraping/DM auto -> rester 100 % API officielle Page Entreprise (brouillons). |
