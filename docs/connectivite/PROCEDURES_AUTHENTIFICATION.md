# PROCÉDURES D'AUTHENTIFICATION PAR LE FONDATEUR (AGIA-014)

**Date :** 2026-11-21  
**Règle de sécurité :** Ne **jamais** communiquer de mot de passe, code 2FA ou information bancaire dans le chat. Chaque connexion s'effectue **un service à la fois**, sur autorisation explicite du fondateur.

---

## 1. Services déjà autorisés (aucune action requise)
- **GitHub (`naitconv-web`)** : déjà connecté et validé via le plugin officiel Antigravity.
- **Google Workspace (`Drive`, `Gmail`, `Calendar`, `Sheets`, `Docs`, `Slides`)** : déjà connecté via les plugins officiels Antigravity.
- **CRM SYNTESIA (`Google Sheets`)** : déjà accessible via `gsheets` sur `1EmC6f4ljLU2GZmD9HEBt50WdTlVXoQtPQ64vFQL1I_0`.

---

## 2. o2switch (Priorité 1 — pour débloquer la Phase 3)
1. Fournir d'abord les **7 captures/exports cPanel** demandés dans [AUDIT_O2SWITCH_SYNTESIA.md](file:///home/antigravity/agia-infrastructure/docs/infrastructure/AUDIT_O2SWITCH_SYNTESIA.md).
2. Pour un accès technique ultérieur sans mot de passe :
   - Dans **cPanel → Accès SSH**, activer l'accès SSH et importer la **clé publique SSH dédiée** générée pour Antigravity (ou créer un **jeton API cPanel** dans *Manage API Tokens* avec permissions restreintes).
   - Ne jamais partager le mot de passe principal cPanel.

## 3. WordPress (Priorité 2 — dépend d'o2switch)
1. Dans l'administration WordPress (`/wp-admin`), créer un utilisateur technique dédié (ex. `syntesia-bot`, rôle **Éditeur** ou **Administrateur restreint**).
2. Dans le profil de cet utilisateur → **Mots de passe d'application** (*Application Passwords*), générer un jeton nommé `Antigravity-SYNTESIA`.
3. Tester en lecture seule `GET /wp-json/wp/v2/posts` avant toute création de brouillon.

## 4. Facebook, Meta Business Suite & Instagram (Priorité 3 — Phase 4)
1. Depuis votre compte personnel réel dans **Meta Business Suite** (`business.facebook.com`), créer ou sélectionner le **Business Portfolio SYNTESIA** (ne jamais créer de compte personnel fictif).
2. Créer les deux Pages professionnelles : **SYNTESIA France** et **SYNTESIA Algérie** (ou rattacher les pages existantes) ainsi que le compte **Instagram Professionnel** associé.
3. Dans **Paramètres de l'entreprise → Utilisateurs système**, créer un **System User** (ex. `antigravity-syntesia`) avec accès limité aux deux Pages et au compte Instagram.
4. Générer un jeton Graph API avec les scopes strictement nécessaires (`pages_show_list`, `pages_read_engagement`, `pages_manage_posts`, `pages_messaging`, `instagram_basic`).

## 5. Google Analytics (GA4) & Search Console (Priorité 4)
1. Dans **Google Cloud Console**, créer un **Compte de service** (`syntesia-analytics-ro`) sans rôle éditeur, et activer les APIs *Google Analytics Data API* et *Google Search Console API*.
2. Dans **GA4 (Admin → Gestion des accès à la propriété)**, ajouter l'e-mail du compte de service avec le rôle **Lecteur** uniquement.
3. Dans **Google Search Console (Paramètres → Utilisateurs et autorisations)**, ajouter le même compte de service avec le rôle **Complet** ou **Restreint** (lecture seule des performances/indexation).

## 6. Canva (Priorité 5 — Optionnel)
1. Créer une application dans **Canva Developers** (Connect API) avec les scopes lecture/export (`asset:read`, `design:meta:read`, `design:content:read`).
2. Compléter le flux OAuth2 depuis votre navigateur et fournir uniquement le jeton scopé lorsque la connexion est déclenchée.

## 7. LinkedIn (Priorité 6 — Optionnel)
1. Créer une **Page Entreprise SYNTESIA** sur LinkedIn depuis votre compte réel.
2. Créer une App sur **LinkedIn Developer Portal** et demander l'accès *Community Management API* (`r_organization_social`, `w_organization_social`).
3. Ne jamais connecter de script d'automatisation de messages privés sur votre profil personnel.
