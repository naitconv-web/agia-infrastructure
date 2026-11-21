# PLAN D'ACQUISITION « REVENUE FIRST » — MISSION AGIA-012

**Objectif :** Obtenir les **premiers encaissements commerciaux pour SYNTESIA** dès cette semaine par vente directe B2B (cycle court : `Contact → Diagnostic 10 min → Démo 3 min → Proposition → Acompte 40 %`), sans attendre la mise en ligne publique du site vitrine ni le retour d'Aragon.  
**Date :** 21 novembre 2026  
**Régime :** `F1` (`0,00 €` de dépense engagée) · **Statut d'envoi :** **ZÉRO PROSPECT CONTACTÉ** (en attente de validation du fondateur).

---

## 1. L'OFFRE VENDABLE & VÉRIFICATION DE SA LIVRABILITÉ RÉELLE

### 1.1. L'offre retenue (Issue d'AGIA-010, vérifiée livrable à 100 %)
- **Nom :** **Pack SYNTESIA — Pilotage des Devis Dormants (`J+3` / `J+7`) & Bouclier de Conformité**
- **Prix France :** **1 490 € HT** d'installation clé en main (**acompte 40 % à la commande = 596 € HT**, solde 60 % à la livraison `J+7` = **894 € HT**) + **190 € HT / mois** (suivi & ajustements optionnels, sans engagement).
- **Prix Algérie :** **145 000 DZD HT** d'installation clé en main (**acompte 40 % = 58 000 DZD HT**, solde 60 % = **87 000 DZD HT**) + **19 000 DZD HT / mois**.
- **Promesse factuelle (zéro chiffre inventé) :** Le client ne change pas de logiciel (il conserve Obat, Batigest, EBP, Excel ou WhatsApp). En 7 jours ouvrés, SYNTESIA installe un cockpit relié à ses exports qui prépare les relances courtoises de devis (`J+3` / `J+7`, `08h30–19h00`, max 2 relances) et alerte à `J-30` sur les pièces obligatoires (URSSAF / Décennale sous-traitants Art. L.8222-1, cartes CNAPS / MAC / SSIAP, ou Bons de Livraison non facturés), avec **validation humaine en 1 clic dans le Sas Dirigeant**.

### 1.2. Vérification de livrabilité technique en 7 jours ouvrés (0 € d'outil tiers)
| Jour | Tâche de livraison chez le client | Outils existants utilisés (déjà disponibles) | Preuve de capacité |
| :---: | :--- | :--- | :--- |
| **J1–J2** | Extraction de l'historique des devis en attente + liste des pièces de conformité | Export CSV/Excel du client + Google Sheets dédié | `0 €`, aucune API payante requise |
| **J3–J4** | Paramétrage du tableau de suivi, règles d'échéances (`J+3`, `J+7`, `J-30`) & 6 gabarits de messages | Google Apps Script / Python (`communication_gate.py` `08h30–19h00`) | Code déjà écrit et testé dans le dépôt |
| **J5–J6** | Mise en place du Cockpit Dirigeant (Sas de validation 1 clic) + tests avec 3 dossiers réels du client | Dérivé direct de `sites/demonstrateur/index.html` + Google Workspace client | Démonstrateur fonctionnel testé sous Chromium |
| **J7** | Session de prise en main (45 min) + remise du guide d'utilisation 1 page ➔ **Recette & Facture de solde 60 %** | Visio / présentiel + Google Docs | Clôture administrative immédiate |

---

## 2. LES BLOCAGES RÉELS EMPÊCHANT UNE VENTE OU UN ENCAISSEMENT AUJOURD'HUI

| # | Blocage réel identifié | Nature | Impact exact sur la vente / l'encaissement | Solution immédiate pour débloquer sous 24h |
| :---: | :--- | :---: | :--- | :--- |
| **1** | **Choix de l'entité juridique facturante (Micro-entreprise vs SASU en formation)** | **P0 — Bloquant Encaissement** | La `SASU ATLAS GLOBAL TRADING` étant en cours de constitution (statuts du 30/10/2026, Kbis `NON DÉMONTRÉ`), elle **ne peut pas émettre de facture légale**. En France, une facture d'acompte exige un **numéro SIRET actif** (Art. L.441-9 C. com.). | **Action Fondateur :** Utiliser la **micro-entreprise existante du fondateur** (si active avec SIRET + mention *« TVA non applicable, art. 293 B du CGI »*) pour facturer les premiers acomptes de **596 €** dès cette semaine, sans attendre le Kbis de la SASU. |
| **2** | **Absence d'IBAN / lien de paiement prêt sur la proposition** | **P0 — Bloquant Encaissement** | Un client prêt à signer doit pouvoir virer les **596 €** d'acompte dans l'heure qui suit le rendez-vous. | Joindre immédiatement le **RIB / IBAN** de l'entité facturante retenue à la Proposition Commerciale (§6) et à la facture d'acompte. |
| **3** | **Coordonnées directes (téléphone / e-mail) des 10 dirigeants** | **P1 — Préparation Contact** | L'API Open Data `api.gouv.fr` fournit légalement la raison sociale, le SIREN, l'adresse et le nom du dirigeant RCS, mais pas les numéros de téléphone ni les e-mails. | Relever le numéro de standard / site web / LinkedIn des **6 prospects prioritaires** (15 min au total) avant de lancer les premiers appels. |
| **4** | **Site vitrine non encore publié (`WEBHOOK_ENABLED = false`)** | **Non bloquant pour la vente directe** | Empêche uniquement l'acquisition passive entrante via le site web, mais **n'empêche absolument pas de démarcher, démontrer (`sites/demonstrateur/index.html`) et encaisser en direct**. | Maintenir le site en pré-production jusqu'à validation juridique, et vendre en direct via le démonstrateur local en partage d'écran ou en présentiel. |

---

## 3. PROSPECTS PRIORITAIRES FRANÇAIS (SOURCE : `api.gouv.fr` — NON CONTACTÉS)

Les 10 entreprises extraites en lecture seule via `https://recherche-entreprises.api.gouv.fr` ont été **re-priorisées selon leur vitesse de décision probable** (PME indépendantes avec dirigeant identifié au RCS en priorité P1 ; filiale de grand groupe et siège étranger relégués en P3).

### Vague 1 — Top 6 PME Indépendantes à Cycle Court (À contacter en priorité)

| Rang | Entreprise & SIREN | Adresse du Siège (Source `api.gouv.fr`) | Dirigeant inscrit au RCS | Secteur & Angle d'attaque précis |
| :---: | :--- | :--- | :--- | :--- |
| **#1** | **JANUS SECURITE FRANCE**<br>SIREN : `411 359 375` (`NAF 80.10Z`)<br>Créée : `1997-04-01` · Eff. `10-19` | `Zone Albitech, 38 rue Gustave Eiffel, 81000 ALBI` | **M. Cédric MASSOL** *(Gérant)* | **Proximité géographique immédiate (Albi) :** Rendez-vous physique possible en 24h. PME établie : suivi des cartes CNAPS/SSIAP, Ordres de Mission L.612-9 et relance devis B2B. |
| **#2** | **POINT CLIM**<br>SIREN : `498 397 843` (`NAF 43.22B`)<br>Créée : `2007-05-01` · Eff. `20-49` | `32 rue Guy Môquet, 92240 MALAKOFF` | **M. Didier PARIENTE** *(Président SAS)* | **CVC / Climatisation (forte volumétrie de devis) :** Relance courtoise `J+3` / `J+7` des devis d'installation et suivi des attestations sous-traitants. |
| **#3** | **ISO CHAUFF'CONFORT**<br>SIREN : `798 100 814` (`NAF 43.22B`)<br>Créée : `2013-10-11` · Eff. `20-49` | `Bâtiment B, 150 rue Georges Charpak, 01390 CIVRIEUX` | **M. Thomas PICCINI** *(Président SAS)* | **Rénovation thermique & chauffage :** Éviter les devis dormants après visite technique et sécuriser l'acompte à la commande. |
| **#4** | **ASIA PROTECTION SECURITE**<br>SIREN : `500 325 840` (`NAF 80.10Z`)<br>Créée : `2007-10-01` · Eff. `20-49` | `5 boulevard des Bouvets, 92000 NANTERRE` | **Mme Thi My Hanh NGUYEN** *(Gérante)* | **Gardiennage Île-de-France :** Blocage pré-affectation si carte CNAPS expirée avant fin de vacation + relance des devis de gardiennage. |
| **#5** | **ARTEMIS MOBILE SECURITY**<br>SIREN : `801 354 184` (`NAF 80.10Z`)<br>Créée : `2014-03-01` · Eff. `20-49` | `Immeuble Le Stadium, 266 av. du Président Wilson, 93210 SAINT-DENIS` | **M. Laurent DUEZ** *(Président SAS)* | **Sécurité mobile & interventions :** Chiffrage rapide IDCC 1351 et suivi des propositions commerciales en attente. |
| **#6** | **ONE SECURITY AND SAFETY SERVICES (ONE 3S)**<br>SIREN : `819 891 078` (`NAF 80.10Z`)<br>Créée : `2016-04-18` · Eff. `20-49` | `14 impasse Paradou, 13700 MARIGNANE` | **Mme Nadia DEHDOUH** *(Président SAS)* | **Gardiennage & Sécurité Incendie (SSIAP) :** Suivi croisé des recyclages triennaux SSIAP/SST et veille appels d'offres. |

### Vague 2 — PME Complémentaires & Grands Comptes (À contacter après la Vague 1)
- **#7 `SOLAIRE CLIM CHAUFFAGE`** (`891 052 672` — `12 allée de l'Artisanat, 42340 VEAUCHE`, Rénovation thermique/solaire)
- **#8 `SMEF AZUR`** (`331 034 819` — `Parc d'Activités du Moulin, 13580 LA FARE-LES-OLIVIERS`, Génie climatique)
- **#9 `EIFFAGE ENERGIE SYSTEMES - BFC`** (`377 768 544` — `21600 LONGVIC`, cycle d'achat long, à réserver après les 2 premières signatures PME)
- **#10 `AIRPORT AVIATION SECURITY`** (`881 695 837` — Siège Suisse, cycle juridique spécifique)

---

## 4. MESSAGES DE PROSPECTION PERSONNALISÉS (PRÊTS À VALIDER AVANT ENVOI)

> **Règle d'envoi :** Strictement en jours ouvrés entre **08h30 et 19h00** (`CPCE Art. L.34-5`), ton sobre, vouvoiement, zéro promesse chiffrée non démontrée.

### 4.1. Message A — Pour un Dirigeant Bâtiment / Rénovation / CVC (ex. M. Pariente — `POINT CLIM` ou M. Piccini — `ISO CHAUFF'CONFORT`)
- **Objet e-mail :** `Suivi de vos devis en attente et dossiers sous-traitants — [Nom Entreprise]`
- **Corps (Email / LinkedIn) :**
  > Bonjour Monsieur [Nom],
  >
  > En tant que dirigeant de **[Nom Entreprise]**, vous avez probablement chaque mois des devis envoyés après visite technique qui restent sans réponse faute de temps pour les relancer proprement à J+3 et J+7, ainsi que des attestations URSSAF/décennale sous-traitants à vérifier.
  >
  > Sans remplacer votre logiciel actuel (Obat, Batigest, EBP ou Excel), nous avons conçu un cockpit léger qui prépare automatiquement ces relances courtoises et alerte sur les pièces expirées — **rien n'est envoyé sans votre validation en 1 clic**.
  >
  > L'installation complète se fait en 7 jours ouvrés. Auriez-vous **10 minutes jeudi ou vendredi** pour que je vous montre le fonctionnement en direct sur un de vos cas concrets ?
  >
  > Bien cordialement,  
  > **[Prénom Nom]** — SYNTESIA  
  > *[Téléphone]*

### 4.2. Message B — Pour un Dirigeant de Sécurité Privée (ex. M. Massol — `JANUS SECURITE` à Albi ou Mme Nguyen — `ASIA PROTECTION`)
- **Objet e-mail :** `Suivi CNAPS/SSIAP et relance de vos devis de gardiennage — [Nom Entreprise]`
- **Corps (Email / LinkedIn) :**
  > Bonjour [Madame / Monsieur] [Nom],
  >
  > Je dirige SYNTESIA et j'accompagne les dirigeants de sociétés de sécurité privée sur deux sujets opérationnels critiques :
  > 1. **Le contrôle préventif des cartes pro CNAPS, MAC et SSIAP** jusqu'à la fin de chaque vacation planifiée (avec préparation de l'Ordre de Mission Art. L.612-9) ;
  > 2. **La relance structurée (J+3 / J+7)** de vos devis de gardiennage et de sûreté en attente, sous votre validation humaine en 1 clic.
  >
  > Notre système se greffe sur vos outils actuels en 7 jours sans changer vos habitudes. Seriez-vous disponible **10 minutes cette semaine** *[pour M. Massol : à Albi ou en visio]* pour une démonstration directe sur écran ?
  >
  > Bien cordialement,  
  > **[Prénom Nom]** — SYNTESIA  
  > *[Téléphone]*

### 4.3. Script d'Appel Téléphonique Court (30 secondes)
> « Bonjour [Monsieur / Madame] [Nom], [Votre Prénom] de SYNTESIA. Je vous appelle brièvement au sujet de [Nom Entreprise]. Nous déployons en 7 jours, sans toucher à votre logiciel actuel, un cockpit qui détecte vos devis en attente à J+3/J+7, prépare les relances et surveille vos pièces [URSSAF-décennale / cartes CNAPS-SSIAP] avant qu'elles n'expirent. Vous validez tout en 1 clic. Est-ce que je peux vous montrer en 10 minutes demain à 10h00 ou 14h30 comment cela fonctionne sur un de vos dossiers ? »

---

## 5. DÉROULEMENT DU RENDEZ-VOUS COMMERCIAL (`15 MINUTES CHRONO`)

Ouvrir **[sites/demonstrateur/index.html](file:///home/antigravity/agia-infrastructure/sites/demonstrateur/index.html)** sur votre navigateur avant l'appel/visio :

| Minute | Séquence | Action concrète pendant le rendez-vous |
| :---: | :--- | :--- |
| **0–3 min** | **Diagnostic flash (3 questions)** | 1. *« Combien de devis envoyez-vous par mois et avec quel outil ? »*<br>2. *« Comment faites-vous aujourd'hui pour relancer ceux qui ne répondent pas à J+3 / J+7 ? »*<br>3. *« Comment suivez-vous les échéances [URSSAF/décennales sous-traitants OU cartes CNAPS/SSIAP] ? »* |
| **3–8 min** | **Démo en direct sur son cas réel** | 1. Cliquer sur l'onglet métier du prospect (`1. Bâtiment` ou `2. Sécurité Privée`).<br>2. Cliquer sur **`+ Simuler le dossier de votre prospect`**, entrer le nom d'un vrai client que le dirigeant vient de citer et le montant.<br>3. Montrer le brouillon généré dans le **Sas Dirigeant** et cliquer sur **`[ Valider & Programmer l'envoi ]`** pour prouver le contrôle humain à 100 %. |
| **8–11 min** | **Calcul contradictoire avec ses chiffres** | Saisir son volume de devis/mois et son panier moyen dans le **Simulateur de rentabilité** en bas de page : montrer qu'un seul devis récupéré couvre l'investissement. |
| **11–15 min** | **Closing & Envoi immédiat** | Annoncer le prix (**1 490 € HT**, acompte 40 % soit **596 € HT** au démarrage, livraison en **7 jours ouvrés**) et proposer de lui envoyer la proposition d'une page dans l'heure pour démarrer dès lundi. |

---

## 6. MODÈLE DE PROPOSITION COMMERCIALE & CONDITIONS D'ACOMPTE

### 6.1. Conditions strictes d'acompte et d'encaissement
- **Montant total installation clé en main (France) :** **1 490,00 € HT** *(TVA non applicable, art. 293 B du CGI si facturation via micro-entreprise en franchise en base ; sinon TVA 20 % selon régime de l'entité facturante)*.
- **Acompte exigible à la signature (40 %) :** **596,00 € HT** — **Condition absolue de démarrage** (aucun travail d'intégration client ne commence avant réception du bon pour accord signé + virement de l'acompte).
- **Solde à la livraison (60 % à J+7) :** **894,00 € HT** à la validation de la session de prise en main de 45 min.
- **Abonnement mensuel optionnel (à partir du mois 2) :** **190,00 € HT / mois** (sans engagement, résiliable par simple e-mail).

### 6.2. Modèle de Proposition Commerciale Prête à Émettre (1 Page)

> **PROPOSITION D'INTERVENTION — SYNTESIA**  
> **Réf. :** `PROP-SYN-2026-[XXX]` · **Date :** `[JJ/MM/2026]` · **Validité :** 15 jours  
> **Éditeur / Prestataire :** `[Raison sociale / Nom Entrepreneur + SIRET + Adresse — À compléter selon entité facturante]`  
> **Client :** `[Raison Sociale Prospect]` (`SIREN : [XXX]`) — À l'attention de `[M./Mme Prénom Nom, Fonction]`
>
> **1. Objet :** Déploiement en 7 jours ouvrés du Cockpit SYNTESIA (Suivi & Relance des Devis `J+3`/`J+7` + Alerte Conformité), raccordé à votre outil existant (`[Obat / Batigest / Excel / Planning]`) sans migration de logiciel.  
> **2. Livrables inclus :**  
> - Paramétrage du suivi des devis et alertes de conformité (`[URSSAF/Décennales sous-traitants | Cartes CNAPS/SSIAP & Ordres de Mission L.612-9]`).  
> - Activation du Sas de validation Dirigeant en 1 clic (horaires ouvrés `08h30–19h00`, max 2 relances).  
> - Rédaction de 6 séquences de relances sur mesure + Formation de 45 min + Guide 1 page.  
> **3. Conditions Financières & Paiement :**  
> - **Forfait d'installation clé en main :** `1 490,00 € HT`  
>   - **Acompte 40 % à la commande (virement à réception) :** `596,00 € HT` *(IBAN : `[À insérer]`)*  
>   - **Solde 60 % à la recette fonctionnelle (J+7) :** `894,00 € HT`  
> - **Suivi & maintenance mensuelle (optionnel, sans engagement) :** `190,00 € HT / mois`  
> - *Mention fiscale :* `[« TVA non applicable, art. 293 B du CGI » OU « TVA 20 % en sus » selon entité facturante]`.  
> **4. Bon pour accord (Date, Signature & Cachet du Client) :** `______________________`

---

## 7. PLAN D'ACTION DES PROCHAINES 48 HEURES (SÉQUENCE CHRONOLOGIQUE)

| Créneau | Action exacte | Responsable | Livrable / Résultat attendu |
| :--- | :--- | :---: | :--- |
| **H+0 à H+2** *(Aujourd'hui)* | **1. Arbitrer l'entité facturante** (Micro-entreprise active avec SIRET + RIB prêt) et renseigner le SIRET + IBAN dans le modèle de facture d'acompte et la Proposition §6.2. | **Fondateur** | Capacité légale immédiate d'encaisser **596 €** d'acompte. |
| **H+2 à H+4** *(Aujourd'hui)* | **2. Relever les numéros de téléphone / e-mails / LinkedIn des 6 prospects Vague 1** (`JANUS SECURITE` Albi, `POINT CLIM`, `ISO CHAUFF'CONFORT`, `ASIA PROTECTION`, `ARTEMIS MOBILE`, `ONE 3S`) et répéter 2 fois le scénario de 3 min sur `sites/demonstrateur/index.html`. | **Fondateur** | Fiche d'appel complète pour les 6 dirigeants + maîtrise fluide de la démo. |
| **J+1 (09h00–12h00)** | **3. Lancer la 1re vague d'appels + envoi des messages personnalisés (avec votre validation)** aux 6 prospects Vague 1 (priorité absolue à `JANUS SECURITE` Albi pour rendez-vous direct). | **Fondateur** | Objectif : **2 à 3 rendez-vous de démo de 15 min** fixés sous 48h. |
| **J+1 (14h00–18h00)** & **J+2** | **4. Exécuter les premiers rendez-vous démo** avec `sites/demonstrateur/index.html` et envoyer la Proposition Commerciale (`PROP-SYN-2026-001`) + RIB dans l'heure suivant chaque appel positif. | **Fondateur** | **1re proposition signée et 1er virement d'acompte (596 €) déclenché.** |
