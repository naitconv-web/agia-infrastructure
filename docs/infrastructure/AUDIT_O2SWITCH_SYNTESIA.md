# AUDIT O2SWITCH — RÉORIENTATION INFRASTRUCTURE SYNTESIA (AGIA-013)

**Date :** 2026-11-21  
**Mission :** Complément AGIA-013 — Audit du compte o2switch et réorientation de l'infrastructure  
**Mode :** Lecture seule — **aucune installation, aucune migration, aucune modification DNS, aucune publication, aucune dépense, aucun secret stocké**

---

## 1. Vérification d'accès au compte o2switch

- **Capacité Antigravity :** L'environnement d'exécution Antigravity est une VM Linux distante sans navigateur interactif exposé à l'utilisateur (seul `chromium --headless` est présent, derrière le proxy `agy-plugin-proxy`).
- **Verdict d'accès :** **Accès direct impossible** à l'espace client `clients.o2switch.fr` et au cPanel depuis Antigravity.
- **Sécurité :** Conformément aux consignes, aucun mot de passe, code 2FA ou information bancaire n'est demandé dans le chat.
- **Données déjà confirmées dans le dépôt (`PROJET_05_AMBRESSENCE_ET_AUTRES_PROJETS.md`, `PROJET_06_STRUCTURE_JURIDIQUE_ATLAS_GLOBAL_TRADING.md`) :**
  - Hébergement `o2switch SAS` souscrit le `2026-10-25` pour `22,76 € TTC` (lié à `ambressence.com`).
  - L'état réel du cPanel/staging reste **`DÉCLARÉ MAIS NON VÉRIFIÉ`**.

### Informations à fournir par le fondateur pour compléter l'audit réel (7 captures/exports cPanel sans aucun secret)
1. **Formule et quotas cPanel** (barre latérale droite cPanel : disque, inodes, RAM/CPU/I-O, formule Grow / Cloud / Pro).
2. **Gestion des lunes / sous-comptes** (si active sur l'offre souscrite).
3. **Domaines, domaines supplémentaires et sous-domaines** configurés.
4. **Versions PHP / Node.js / Python** actives (*MultiPHP Manager* / *Setup Node.js App* / *Setup Python App*).
5. **Bases de données** existantes (MySQL / PostgreSQL) et nombre disponible.
6. **Tâches Cron** et **comptes e-mail** déjà créés.
7. **État actuel de `ambressence.com`** (arborescence publique / staging éventuel).

---

## 2. Mise en attente des sites commerciaux France et Algérie

Conformément à la décision du fondateur :
- Les développements et travaux non indispensables sur les deux sites commerciaux (`sites/france/` et `sites/algerie/`) sont **mis en pause**.
- **Préservation intégrale :** tous les dépôts, fichiers, configurations (`WEBHOOK_ENABLED=false`, `ENVIRONMENT="PREPROD"`), données, domaines et DNS sont **conservés intacts**. Aucune suppression, aucune résiliation, aucune modification DNS.

---

## 3. Évaluation des 10 cas d'usage SYNTESIA sur o2switch

| # | Cas d'usage SYNTESIA | Verdict o2switch | Justification technique |
| :--- | :--- | :--- | :--- |
| 1 | **Sites vitrines statiques / éditoriaux** (`sites/france`, `sites/algerie`) | **ADAPTÉ (Optimal)** | Apache/LiteSpeed + NVMe + SSL Let's Encrypt gratuit, déjà payé (`0 €` de surcoût). |
| 2 | **Démonstrateurs HTML interactifs** (`sites/demonstrateur`) | **ADAPTÉ (Optimal)** | Hébergement sous-domaine isolé (`demo.syntesia...`), zéro dépendance runtime lourde. |
| 3 | **Formulaires & API légères / webhooks** (`api-lead`) | **ADAPTÉ** | PHP ou petit endpoint Python/Node via Phusion Passenger pour réception de leads, validation et journalisation MySQL/PostgreSQL. |
| 4 | **Back-office / CRM léger ou portail client PHP/SQL** | **ADAPTÉ** | MySQL / PostgreSQL inclus, sauvegardes quotidiennes, isolation par lune/sous-domaine. |
| 5 | **Tâches planifiées légères (Cron)** | **ADAPTÉ** | Crons cPanel natifs pour relances batch, exports ou vérifications périodiques courtes. |
| 6 | **E-mails professionnels & délivrabilité** | **ADAPTÉ** | Boîtes mail du domaine + SPF/DKIM/DMARC via cPanel (sous réserve de vérification DNS). |
| 7 | **Agents IA persistants / orchestrateurs autonomes** | **INADAPTÉ** | Hébergement mutualisé sans daemons persistants garantis ; timeouts Passenger/HTTP. À garder sur Antigravity / runner dédié. |
| 8 | **Docker / conteneurs / microservices** | **INADAPTÉ** | Pas de daemon Docker sur hébergement mutualisé cPanel o2switch. |
| 9 | **Outils lourds self-hosted (`n8n` v2.x, `Chatwoot` Rails+Sidekiq+Redis)** | **INADAPTÉ** | Consommation RAM/processus persistants et Redis incompatibles avec les limites mutualisées. |
| 10 | **Apps SSR lourdes (`OMNISECUR` Next.js 15 + Supabase)** | **DÉCONSEILLÉ** | Phusion Passenger limite les builds/workers Node.js lourds ; préférer Vercel + Supabase (ou VPS dédié si besoin souverain). |

---

## 4. Synthèse économique

- **Coût marginal immédiat pour SYNTESIA sur o2switch :** **`0,00 €`** (l'hébergement souscrit le `2026-10-25` est déjà actif/payé).
- **Respect du régime `F1_ZERO_EURO_AUTONOMOUS` :** o2switch permet de déployer des démonstrateurs clients, des endpoints PHP/SQL et des sous-domaines professionnels sans souscrire de nouveaux abonnements cloud payants, tant qu'on y cantonne les workloads adaptés (statique, PHP, SQL, cron léger).
