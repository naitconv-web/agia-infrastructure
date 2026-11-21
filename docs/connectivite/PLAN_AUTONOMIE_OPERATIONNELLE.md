# PLAN D'AUTONOMIE OPÉRATIONNELLE PROGRESSIVE (AGIA-014)

**Date :** 2026-11-21  
**Méthode :** Connecter **un service à la fois** : `Autorisation fondateur` → `Configuration` → `Test sans conséquence externe` → `Vérification permissions` → `Documentation` → `Checkpoint Harness`.

---

## Lot 0 — Socle déjà actif (`VALIDÉ` / `TESTÉ` dès aujourd'hui, `0,00 €`)
- **GitHub** (`naitconv-web`), **Google Workspace** (`Drive`, `Gmail`, `Calendar`, `Docs`, `Sheets`, `Slides`) et **CRM Google Sheets** (`1EmC6f4ljLU2GZmD9HEBt50WdTlVXoQtPQ64vFQL1I_0`).
- **Capacité immédiate :** rédaction de propositions commerciales, suivi CRM, préparation de devis/e-mails en brouillon, gestion documentaire Drive, et traçabilité Git.

## Lot 1 — Hébergement & CMS (`o2switch` → `WordPress`) [Phase 3]
1. **o2switch :** réception des 7 captures cPanel + autorisation clé SSH dédiée / API token → inventaire complet des domaines, sous-domaines, lunes, sauvegardes et bases de données (zéro suppression/migration sans accord).
2. **WordPress :** recensement des installations existantes sur o2switch → audit versions & extensions → connexion REST Application Password / WP-CLI sur utilisateur dédié → test lecture seule `GET /wp-json/wp/v2/pages`.

## Lot 2 — Présence sociale & messagerie (`Meta Business Suite` → `Instagram`) [Phase 4]
- **Préparation hors ligne (sans publication) :**
  - **Page `SYNTESIA France`** : positionnement PME France (sécurité privée, bâtiment/rénovation, automatisation devis/leads), coordonnées légales, CTA prise de diagnostic.
  - **Page `SYNTESIA Algérie`** : positionnement PME/entreprises Algérie (digitalisation commerciale, agents de qualification, automatisation WhatsApp/e-mail), tarification DZD adaptée.
  - **Gouvernance Meta Business Suite :** rôles séparés (Admin = fondateur uniquement ; System User Antigravity = préparation de brouillons et lecture messagerie/statistiques).
- **Test initial :** `GET /me/accounts` via `graph.facebook.com` après attribution du System User Token.

## Lot 3 — Acquisition & Contenu (`GA4 & Search Console` → `Canva` → `LinkedIn`) [Phase 5]
1. **GA4 & Search Console :** Service Account lecture seule → test de requête métriques sur les propriétés actives.
2. **Canva (si nécessaire) :** Connect API lecture/export d'assets (sinon génération HTML/PNG directe depuis Antigravity à `0,00 €`).
3. **LinkedIn :** Page Entreprise uniquement, préparation de brouillons éditoriaux validés par le fondateur.
