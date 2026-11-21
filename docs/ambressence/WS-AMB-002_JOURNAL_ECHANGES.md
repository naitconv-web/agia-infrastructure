# MISSION WS-AMB-002 — JOURNAL D'ÉCHANGES & AUDIT INITIAL (AMBRESSENCE)

> **Mode de fonctionnement :** Chaque réponse (longue ou courte) est déposée et mise à jour dans ce fichier sur GitHub. Vous pouvez consulter ici et écrire vos réponses/directives directement dans la section en bas du document.  
> **Note d'accès :** Ce fichier est temporairement hébergé dans `naitconv-web/agia-infrastructure` car `naitconv-web/AMBRESSENCE` n'est pas encore rattaché aux ressources Antigravity (`Resource not accessible by integration`). Dès rattachement, nous pourrons basculer ce journal sur `naitconv-web/AMBRESSENCE`.

---

## [2026-11-21] — RAPPORT D'AUDIT INITIAL (LECTURE SEULE)

**Statut :** Phase d'audit exécutée sans aucune modification sur le dépôt, Drive ou la production.

### 1. État de compréhension du projet

**AMBRESSENCE** (`https://ambressence.com/`) est une boutique e-commerce B2C de parfumerie (catalogue sourcé en dropshipping auprès du grossiste espagnol **BTSWholesaler**, hébergée sur **o2switch SAS**).

Sur le plan stratégique et juridique, le projet est soumis à trois réalités structurantes documentées dans `README-PROJET.md` (`1yZVDFNq8N-4-3qJMT8PeAdVPNsNI6TSm`) et `PROJET_05_AMBRESSENCE_ET_AUTRES_PROJETS.md` :
- **Isolation hors LAB :** AMBRESSENCE (`NAIT STORE`) doit rester strictement séparé des activités B2B du `LAB` (`Omni-X` / `SYNTESIA`) en temps, budget publicitaire et infrastructure.
- **Portage juridique en attente :** Le site doit être porté par la **SASU ATLAS GLOBAL TRADING** (statuts en formation du 30/10/2026 à Albi, capital 500 € — pas de Kbis reçu).
- **Historique de déploiement fragmenté :** Une série de maquettes v4 (`21` fichiers) a été poussée puis partiellement reliée à WooCommerce / BTSWholesaler entre le 7 et le 13 novembre, suivie d'une tentative de préparation Go-Live le **17 novembre 2026** (`GO-LIVE-RUNBOOK-2026-11-17.md`) qui s'est heurtée au blocage du compte Stripe live.

---

### 2. Ressources et accès réellement disponibles (vérifiés)

| Ressource | Accès depuis cet environnement | Preuve |
| :--- | :--- | :--- |
| **Site public `https://ambressence.com/`** | **OUI (lecture HTTP/REST)** | `curl -sI https://ambressence.com/` → `HTTP/2 200` (`o2switch-PowerBoost-v3`) |
| **API REST publique WP / WooCommerce** | **OUI (lecture publique)** | `/wp-json/` (`25` namespaces actifs), `/wp-json/wc/store/v1/products`, `/wp-json/wc/store/v1/cart`, `/wp-json/ambressence/v1/catalogue` |
| **Google Drive (`gdrive` CLI)** | **OUI (connecté, lecture/écriture)** | Dossier `PROJETS/AMBRESSENCE` (`1Kwtctpd4tzm6tIYlJfBakvAHBfxJAoiY`) complet : `infra/`, `cadrage-et-specs/`, `decisions-et-runbook/`, `audits-et-missions-13nov/`, `maquettes-v4-reference/`, `gems-et-architecture-ai/`, `repo/` |
| **Dépôt `naitconv-web/agia-infrastructure`** | **OUI (local + GitHub)** | Préflight `PASS`, commit `68053c5` |
| **Outils Google Workspace (`gmail`, `gsheets`, `gdocs`, `gcalendar`, `gslides`)** | **OUI (connectés)** | Plugins actifs dans l'environnement |

---

### 3. Ressources auxquelles je n'ai PAS accès actuellement

1. **Dépôts GitHub `naitconv-web/AMBRESSENCE` et `naitconv-web/ambressence.com` :**  
   - **Preuve :** `gh repo list naitconv-web` ne retourne que `agia-infrastructure` ; `gh repo view naitconv-web/AMBRESSENCE` échoue avec `GraphQL: Resource not accessible by integration (repository)`. Le jeton GitHub de cette VM est scopé uniquement aux dépôts rattachés au projet courant dans Antigravity.  
   - *Note :* Une copie locale du dépôt est présente sur Drive (`PROJETS/AMBRESSENCE/repo/`), mais son dossier `04_APPLICATION/` est vide.
2. **Accès back-office WordPress / SSH o2switch / cPanel / Base MySQL :**  
   - Des fichiers d'identifiants existent dans `Drive/infra/` (`.env`, `.wp-app-password`, `ssh-*.txt`, `.staging-admin-password`, `.staging-db-password`). Par règle de sécurité et d'audit en lecture seule, **je ne les ai ni lus ni utilisés**, et l'accès SSH direct depuis cette VM est de toute façon restreint par le proxy réseau (`agy-plugin-proxy` n'autorise que les hôtes des plugins connectés et les domaines HTTP/HTTPS autorisés).
3. **Comptes tiers (tableaux de bord) :** Stripe (`acct_1UbnwCHR0qKCRDne`), BTSWholesaler, Brevo, o2switch cPanel, Google Ads / Meta Ads, Search Console.

---

### 4. Diagnostic initial : la vérité opérationnelle (avec preuves)

#### A. Ce qui fonctionne
- **Hébergement et vitrine HTTPS :** `https://ambressence.com/` répond en `HTTP/2 200` avec thème/maquette v4 en place.
- **API Catalogue & Store API WooCommerce :**
  - `/wp-json/wc/store/v1/products` retourne **2 705 produits** publiés (`X-WP-Total: 2705`).
  - `/wp-json/ambressence/v1/catalogue` retourne **2 469 produits** actifs avec photos `.webp`, prix et stocks.
  - `/wp-json/wc/store/v1/cart` répond en JSON avec `payment_methods: ["stripe"]`.
- **Sécurité REST utilisateurs :** `/wp-json/wp/v2/users` est bloqué en `HTTP 403` (`ambressence_rest_users_forbidden`), confirmant l'activation de `ambressence-securite.php`.
- **Zone de livraison configurée (selon runbook `17/11`) :** Zone ID 1 (FR, BE, LU, NL, DE, ES, IT) avec `flat_rate` à `4,90 €` et `free_shipping` dès `60 €`.

#### B. Ce qui ne fonctionne pas / ce qui bloque la commercialisation
1. **Encaissement Stripe bloqué (`BLOQUANT ABSOLU`) :**  
   - *Preuve (`GO-LIVE-RUNBOOK-2026-11-17.md` §3) :* Le compte Stripe live `acct_1UbnwCHR0qKCRDne` (**ATLAS GLOBAL TRADING**) est en statut **`restricted`** : `charges_enabled = false`, `payouts_enabled = false`, `disabled_reason = requirements.past_due`, erreur `verification_failed_id_number_match` (*« The ID number could not be verified »*, `company.verification.document` en attente). Aucun paiement réel ne peut aboutir.
2. **Tunnel de commande `/commander/` verrouillé et incohérent :**  
   - *Preuve (test direct ce jour) :* `GET https://ambressence.com/commander/` retourne une page statique *"Ouverture des commandes : très bientôt — Aucun paiement n'est actif pour le moment"* accompagnée d'un header **`x-litespeed-tag: 80d_HTTP.404`** (fausse page 200 sur tag 404). Sur `/produit/khamrah/`, le message *"Ouverture des commandes : très bientôt"* cohabite avec le bouton `Ajouter au panier`.
3. **Pages légales incomplètes en production publique :**  
   - *Preuve (test direct ce jour) :*  
     - `/mentions-legales/` contient encore les balises `⟦ date de publication ⟧`, `⟦ raison sociale de la SASU ⟧`, `⟦ montant ⟧`, `⟦ adresse du siège ⟧`, `⟦ ville du greffe ⟧`, `⟦ numéro ⟧`, `⟦ prénom et nom ⟧`, `⟦ e-mail de contact ⟧`, `⟦ téléphone ⟧`.  
     - `/cgv/` contient **5** occurrences de `⟦`.  
     - `/confidentialite/` contient **6** occurrences de `⟦`.
4. **Absence d'immatriculation Kbis / CM2C / GPSR :** Immatriculation SASU non finalisée, médiation CM2C non finalisée, opérateur responsable UE (Règlement GPSR 2023/988) non renseigné, bouton de rétractation en ligne L.221-21 (obligatoire depuis le 19/06/2026) à vérifier.

#### C. Ce qui est partiellement opérationnel ou dégradé
- **Qualité du catalogue BTSWholesaler :**
  - *Preuve (`wc/store/v1/products` & `ENQUETE-SYNTHESE-2026-11-17.json`) :* Titres en espagnol non traduits (*« Estuche 3 Piezas »*, *« Extracto de Perfume »*, *« Vainilla y Rosas »*, *« Perfume de Mujer »*, *« Perfumado »*), fautes de formatage (*« Icon pour Feme · · · »*), `sku` vide dans `/ambressence/v1/catalogue`, **25 à 29 produits sans image**, **0 / 2 742 descriptions produits**, **0 poids renseigné**, et **52 produits < 8 €** (jusqu'à `4,73 €` / `5,42 €` — rentabilité négative ou critique si expédiés seuls à `4,90 €` de port).
- **Indexation SEO contradictoire :**
  - *Preuve (test direct ce jour) :* Le header HTTP envoie `x-robots-tag: noindex, nofollow` (imposé côté serveur/mu-plugin), alors que le HTML envoie `<meta name="robots" content="index, follow" />`.
- **Écart de comptage catalogue :** `wc/store/v1/products` expose `2 705` produits, `/ambressence/v1/catalogue` en expose `2 469`, et le runbook du `17/11` mentionnait `2 742`.

#### D. Ce qui est documenté mais non déployé / jamais développé
- **Agents autonomes (`SPEC-AMBRESSENCE-AI-v2.5.9`) :** L'architecture multi-agents (10 agents + 11 Gems) est purement documentaire (`Drive/gems-et-architecture-ai/`). Aucun script de veille stock/prix BTS automatisé ni pipeline Google Shopping / Merchant Center n'est déployé dans le dépôt actif.
- **E-mails transactionnels & Brevo :** Bascule de l'e-mail expéditeur Gmail personnel vers `@ambressence.com`, configuration SPF/DKIM/DMARC et refonte visuelle des e-mails WooCommerce restent en attente (`DECISIONS-A-VALIDER.md` §2.3).

---

### 5. Les 8 risques majeurs identifiés

1. **Secrets exposés en clair sur Google Drive (`CRITIQUE`) :** `Drive/infra/` contient `.env`, `.staging-admin-password`, `.staging-db-password`, `.staging-htpasswd`, `.wp-app-password`, `ssh-host.txt`, `ssh-password.txt`, `ssh-user.txt` en clair. Toute compromission du compte Drive expose directement le serveur o2switch et la base WordPress.
2. **Site accessible publiquement sans mentions légales ni CGV valides (`CRITIQUE / LÉGAL`) :** `ambressence.com` est en `HTTP 200` avec des placeholders `⟦ ... ⟧` sur les pages légales et sans Kbis/CM2C/GPSR.
3. **Compte Stripe bloqué + descripteur bancaire erroné (`CRITIQUE / PAIEMENT`) :** `charges_enabled = false`, `webhook_status_code = 3` (signatures en échec depuis le 17/11), et descripteur relevé bancaire réglé sur **`"ATLAS RELANCE DEVIS"`** au lieu d'`AMBRESSENCE` (risque élevé de litiges/chargebacks dès l'ouverture).
4. **Exposition publique de `/staging/` (`ÉLEVÉ`) :** `GET https://ambressence.com/staging/` répond en `HTTP 200` sans authentification.
5. **Érosion de marge sur petits prix (`ÉLEVÉ / RENTABILITÉ`) :** 52+ références sous `8 €` (dès `4,73 €`) sans règle d'arrondi validée (Option B recommandée à `+1 289,43 €`) ni confirmation écrite si les coûts BTS sont HT ou TTC.
6. **Contradiction entre l'état documenté (17/11) et l'état réel (21/11) :** Le runbook du `17/11` indique l'ouverture du checkout Stripe, mais `/commander/` affiche aujourd'hui la page de fermeture et le tag LiteSpeed `404`.
7. **Catalogue non francisé et sans descriptions (`ÉLEVÉ / CONVERSION`) :** Titres espagnols bruts et 0 description sur ~2 700 fiches tuent la confiance client et le SEO/Merchant Center.
8. **Fragmentation GitHub / Drive :** Les dépôts `naitconv-web/AMBRESSENCE` et `ambressence.com` sont inaccessibles ici (`403`/non rattachés) ; la vérité technique est éclatée entre Drive, WordPress live et des fichiers locaux Windows (`C:\ambressence-infra\`).

---

### 6. Mes limites réelles dans Antigravity

- **Ce que je peux exécuter seul :**
  - Auditer en continu le site public (`HTTP`, REST API publique, Store API, SEO, headers, maquettes).
  - Lire, analyser, consolider et structurer toute la documentation et le code stockés sur Google Drive (`gdrive`) ou dans les dépôts GitHub rattachés au projet.
  - Rédiger, tester et valider des scripts Python/JS/PHP (nettoyage catalogue, traduction/normalisation titres, audit prix/marges, flux Merchant Center, scripts d'automatisation) et les versionner sur GitHub.
  - Piloter Google Sheets, Google Docs, Gmail (brouillons/lecture) et produire le reporting quotidien.
- **Ce qui nécessite votre intervention / autorisation :**
  - Rattacher le dépôt `naitconv-web/AMBRESSENCE` (et/ou `ambressence.com`) aux ressources du projet dans Antigravity via l'app **Antigravity for GitHub** (`https://github.com/apps/antigravity-for-github/installations/new`) pour que je puisse cloner, lire l'historique Git complet et ouvrir des PRs.
  - Toutes les actions sur **tableaux de bord tiers protégés** (Stripe KYC/document d'entreprise, changement de descripteur bancaire, configuration webhook Stripe, cPanel o2switch, DNS/SPF/DKIM, adhésion CM2C, Kbis, budgets publicitaires).
- **Ce que je ne peux techniquement pas faire depuis cette VM :**
  - Ouvrir une session SSH vers `langouste.o2switch.net` (bloqué par le sandbox réseau `agy-plugin-proxy` qui ne route que HTTP/HTTPS vers les hôtes autorisés).
  - Me connecter à votre poste Windows local (`C:\ambressence-infra\`).
  - Exécuter des paiements réels, signer des contrats ou contourner une vérification d'identité (KYC Stripe).

---

### 7. Investigations que je vais mener ensuite (dès votre feu vert)

1. **Audit complet du catalogue live (via Store API publique) :** Extraire les ~2 705 produits publiés pour quantifier exactement : produits sans image, produits en espagnol, produits `< 10 €`, doublons/tests (`Dior Sauvage` IDs 12 & 13), écarts entre `/wc/store/v1/products` (2 705) et `/ambressence/v1/catalogue` (2 469).
2. **Audit du code WordPress archivé sur Drive (`infra/wordpress/*.php`) :** Inspecter `ambressence-maquettes.php`, `ambressence-wc-theme.php`, `ambressence-legal-config.php`, `ambressence-securite.php`, `ambressence-bts-guard.php` pour identifier l'origine exacte du comportement de `/commander/`, de `x-robots-tag: noindex` et des compteurs de stock.
3. **Audit des écarts GitHub (`AMBRESSENCE`) :** Dès que le dépôt sera rattaché au projet, inspecter les commits, branches et workflows.

---

### 8. Livrables que je vais produire

1. **Audit Catalogue & Rentabilité (CSV + Synthèse)** : Liste exhaustive des anomalies catalogue (titres ES, sans image, `< 10 €`, simulation Option B d'arrondi).
2. **Plan de Remise en Conformité Pré-Ouverture (Check-list bloquante)** : Actions exactes pour verrouiller `/staging/`, purger les secrets de Drive, corriger les mentions légales/CGV/GPSR/L.221-21 et aligner le checkout.
3. **Dossier Technique d'Automatisation (`WS-AMB-002`)** : Scripts de normalisation catalogue + spécification du flux de veille BTSWholesaler + flux Google Merchant Center (dès déblocage GitHub).

---

## 9. Conditions nécessaires pour passer de l'audit à la gestion autonome

1. **Accès Code :** Rattacher `naitconv-web/AMBRESSENCE` au projet Antigravity (et définir si `agia-infrastructure` ou `AMBRESSENCE` héberge les scripts d'automatisation).
2. **Sécurité immédiate :** Décision de rotation/suppression des fichiers de mots de passe en clair sur `Drive/infra/` et fermeture de `/staging/`.
3. **Déblocage Stripe & Juridique (actions dirigeant) :** Validation KYC Stripe (`company.verification.document`), correction du descripteur bancaire (`AMBRESSENCE`), réparation du secret webhook live, réception Kbis pour complétion des pages légales.
4. **Arbitrages commerciaux & périmètre :** Validation de la règle d'arrondi tarifaire (Option B recommandée), confirmation HT/TTC BTSWholesaler, et définition du **budget autonome** et du **seuil de dépenses publicitaires** (0 € maintenu jusque-là).

---

## Réponse du fondateur (à compléter ci-dessous)

<!-- Écrivez votre réponse ou vos directives ici -->
