# ANALYSE SECTORIELLE 09 — NETTOYAGE INDUSTRIEL, PROPRETÉ & FACILITY MANAGEMENT

- **Référence :** SYNTESIA-CAT-09
- **Catégorie dans le portefeuille :** Extension Sectorielle à Étudier #5 (Secteur frère de la Sécurité Privée et du BTP, déjà listé dans les 3 pistes de `IDEE-001_PROJET-CASHFLOW.md`)
- **Statut du document :** `ANALYSE DOCUMENTAIRE TERMINÉE — VALIDATION DU FONDATEUR EN ATTENTE`

---

## 1. PRÉSENTATION DU MARCHÉ ET SOUS-MÉTIERS (`[FAIT DOCUMENTÉ]`)

Le secteur de la **Propreté et des Services Associés** en France relève de la **Convention Collective Nationale des Entreprises de Propreté et Services Associés (IDCC 3043 / Brochure JO 3173)**. C'est un secteur B2B de main-d'œuvre dont l'organisation d'exploitation est très proche de celle de la Sécurité Privée (prestations récurrentes sur les sites des clients donneurs d'ordre, horaires décalés tôt le matin ou tard le soir, contrôle qualité sur site, appels d'offres privés et publics).

### Sous-métiers distincts
1. **Nettoyage courant tertiaire et commercial :** Bureaux, commerces, banques, agences (interventions quotidiennes ou pluri-hebdomadaires en horaires décalés 06h00–09h00 ou 18h00–21h00).
2. **Entretien d'immeubles et de copropriétés :** Nettoyage des parties communes, sortie et rentrée quotidienne des conteneurs de déchets, remplacement de gardiens d'immeubles (lien direct avec les Syndics de copropriété — Analyse 06).
3. **Nettoyage industriel, agroalimentaire et ultra-propreté :** Usines, entrepôts logistiques, salles blanches, laboratoires, milieux hospitaliers et Ehpad (**bionettoyage** soumis à des protocoles sanitaires stricts).
4. **Nettoyage de fin de chantier (Remise en état BTP) :** Interventions ponctuelles à forte marge avant la livraison d'un bâtiment neuf ou rénové (lien direct avec les Maîtres d'œuvre / Architectes — Analyse 05 et entreprises de Bâtiment — Analyse 02).
5. **Travaux spéciaux et ponctuels :** Vitrerie en hauteur (CACES PEMP / cordistes), décapage et métallisation de sols, shampouinage moquettes, désinfection/dératisation (3D — certibiocide).
6. **Facility Management (Multiservices aux occupants) :** Accueil, gestion du courrier, petite maintenance multitechnique (*handyman*), approvisionnement des sanitaires et espaces café, gestion des déchets.

---

## 2. PROFIL DES ENTREPRISES CLIENTES CIBLES

- **Cible cœur (`[RECOMMANDATION]`) :** PME de propreté et multiservices employant **15 à 150 agents de service (AS / AQS / ATQS)**, pilotées par un dirigeant assisté de **2 à 6 inspecteurs / responsables de secteur** (chaque inspecteur supervisant 20 à 40 chantiers et les agents qui y sont affectés).
- **Modèle économique (`[FAIT DOCUMENTÉ]`) :** Double flux :
  - **Contrats d'abonnement récurrents (80 % du CA) :** Facturation mensuelle forfaitaire basée sur une cadence horaire estimée (ex. 2h30 chaque soir du lundi au vendredi).
  - **Travaux exceptionnels / Remises en état sur devis (20 % du CA, mais principale source de marge nette) :** Vitrerie, fin de chantier, remise en état après sinistre.

---

## 3. PROBLÈMES OPÉRATIONNELS CONCRETS (`[FAIT DOCUMENTÉ]`)

1. **Multi-employeurs, temps partiels fragmentés et remplacements à 06h00 du matin :**
   - La majorité des agents de propreté travaillent à temps partiel sur plusieurs chantiers (souvent pour plusieurs employeurs différents) sur des créneaux courts (06h00–08h30 et 17h30–20h00). Lorsqu'un agent est absent, l'inspecteur de secteur doit trouver en urgence un remplaçant disponible sur ce créneau exact, qui possède les clés/badges d'accès du site client et dont le cumul d'heures ne dépasse pas les plafonds légaux.
2. **Contestations clients (« Le ménage n'a pas été fait hier soir ») et absence de preuve de passage :**
   - Les prestations ayant lieu en dehors des heures d'ouverture des bureaux du client, le donneur d'ordre ne voit pas l'agent travailler. À la moindre corbeille oubliée, le client conteste la présence de l'agent et menace de résilier le contrat ou de retenir la facture si l'entreprise ne dispose pas d'un **pointage de présence horodaté et d'un rapport de contrôle qualité contradictoire**.
3. **Complexité spécifique de l'Article 7 de la CCN Propreté (Transfert conventionnel de personnel) (`[FAIT DOCUMENTÉ]`) :**
   - Lorsqu'une entreprise de propreté remporte un marché déjà exploité par un concurrent, l'**Article 7 de la CCN IDCC 3043** (anciennement Annexe VII) lui impose de reprendre le personnel affecté au site remplissant les conditions conventionnelles (ancienneté, quotité de temps sur le marché), avec maintien de la rémunération et de l'ancienneté. Lorsqu'elle perd un marché, elle doit transmettre au nouvel entrant la liste et les dossiers complets des salariés transférables dans des délais stricts sous peine de contentieux prud'homal lourd.
4. **Oubli de facturation des travaux supplémentaires hors forfait et réapprovisionnement consommables :**
   - Les agents réalisent souvent des demandes ponctuelles du client sur site ou livrent des cartons de consommables sanitaires (essuie-mains, savon, papier) sans que le bon de livraison ou le bon de régie signé ne remonte au service facturation.

---

## 4. PROCESSUS RÉPÉTITIFS ET TÂCHES ADMINISTRATIVES

- Gestion quotidienne des remplacements de dernière minute par les inspecteurs de secteur.
- Contrôles qualité périodiques sur site par l'inspecteur (grille d'audit contradictoire par zone : bureaux, sanitaires, accueil, vitrerie) souvent faits sur papier puis non transmis au client.
- Relance des devis de travaux exceptionnels (remise en état, vitrerie, fin de chantier BTP).
- Constitution et vérification des dossiers **Article 7 (transfert de marché entrant ou sortant)** : vérification des 6 derniers bulletins de paie, avenants contractuels, visites médicales, titres de séjour avec autorisation de travail.
- Gestion des commandes et refacturations de consommables sanitaires par site client.

---

## 5. CAS D'UTILISATION PERTINENTS DE L'AUTOMATISATION ET DE L'IA

1. **Adaptation directe du moteur `OMNISECUR` au pilotage Propreté (Pointage, Plannings décalés & Remplacements) :**
   - Vérification de prise de service (QR code / pointage horodaté serveur), gestion des habilitations spécifiques (CACES nacelle vitrerie, habilitation chimique/bionettoyage, titre de séjour valide) et recherche assistée de remplaçants disponibles sur le créneau 06h–09h ou 18h–21h.
2. **Digitalisation de l'Audit Qualité Inspecteur & Envoi Automatique du Rapport au Client :**
   - Formulaire mobile ultra-rapide permettant à l'inspecteur de noter chaque zone du site client en 3 minutes avec photos avant/après, générant instantanément un compte-rendu PDF propre envoyé au client donneur d'ordre (prouvant le suivi proactif du contrat et verrouillant la fidélisation).
3. **Relance automatisée des Devis de Travaux Exceptionnels (Vitrerie / Fin de chantier / Remise en état) :**
   - Transposition à 100 % du système `RELANCE-DEVIS` sur les devis ponctuels à forte marge émis par les inspecteurs.
4. **Check-list et contrôleur de complétude documentaire « Article 7 IDCC 3043 » :**
   - Automatisation de la collecte et de la vérification des pièces obligatoires lors d'une reprise ou perte de chantier.

---

## 6. SOLUTIONS ET PRESTATIONS COMMERCIALISABLES PAR SYNTESIA

1. **Pack « Preuve de Passage, Audit Qualité Inspecteur & Fidélisation Client » :**
   - Déploiement d'un système léger de compte-rendu de visite inspecteur automatisé et de remontée instantanée des demandes de consommables / travaux supplémentaires.
2. **Système de Relance des Devis de Travaux Spéciaux & Fin de Chantier (`RELANCE-DEVIS Propreté`) :**
   - Automatisation du suivi des devis hors abonnement (vitrerie, métallisation, remise en état BTP).
3. **Tableau de Bord de Conformité Dossiers Salariés (Titres de séjour, Habilitations) & Préparation Article 7 :**
   - Transposition du bouclier documentaire d'`OMNISECUR` aux entreprises de propreté.

---

## 7. POTENTIEL DE RÉUTILISATION DES BRIQUES TECHNIQUES EXISTANTES

- **Niveau de réutilisation : TRÈS ÉLEVÉ (`[VÉRIFIÉ TECHNIQUEMENT]`).**
- **Convergence exceptionnelle des 2 verticales maîtresses de SYNTESIA :**
  - Le secteur du Nettoyage combine **exactement** la problématique d'exploitation de la **Sécurité Privée (`OMNISECUR`)** (agents sur sites clients, pointage horodaté, remplacements d'urgence, titres de séjour, appels d'offres) ET la problématique commerciale de la **Rénovation (`RELANCE-DEVIS`)** (devis de travaux ponctuels de remise en état et fin de chantier non relancés).
  - C'est l'extension qui offre **le ratio de mutualisation technique le plus élevé** avec l'existant.

---

## 8. CONCURRENCE ET SOLUTIONS DÉJÀ DISPONIBLES

- **ERP métiers Propreté (`[FAIT DOCUMENTÉ]`) :** *Organilog Propreté*, *ProgiClean*, *Tchek*, *Simplan*, *Drop!*, *Kizeo Forms* (formulaires mobiles génériques).
- **Positionnement SYNTESIA (`[RECOMMANDATION]`) :** Les PME de propreté de 15 à 80 salariés trouvent souvent les gros ERP du secteur rigides et mal adaptés à la **transformation commerciale des devis de travaux exceptionnels** ou à la **valorisation moderne de leurs rapports qualité auprès des syndics et entreprises**. SYNTESIA se positionne sur ce couple **Rentabilité (Travaux spéciaux + Coût horaire chantier) & Preuve Qualité Client**.

---

## 9. DIFFICULTÉ D'ACQUISITION COMMERCIALE & RISQUES RÉGLEMENTAIRES

- **Accès aux décideurs : BON (`[FAIT DOCUMENTÉ]`).** Entreprises locales très bien répertoriées (code NAF `81.21Z` Nettoyage courant des bâtiments et `81.22Z` Autres activités de nettoyage des bâtiments et nettoyage industriel ; Fédération des Entreprises de Propreté — **FEP**).
- **Risques réglementaires (`[FAIT DOCUMENTÉ]`) :**
  1. **Rigueur juridique de l'Article 7 de la CCN IDCC 3043 :** Tout outil aidant à préparer un dossier de transfert conventionnel de personnel doit être présenté comme une **check-list documentaire d'assistance**, la qualification juridique de la transférabilité d'un salarié relevant de l'employeur et de son conseil social/expert-comptable.
  2. **Contrôle des titres de séjour valant autorisation de travail (Code du travail Art. L.8251-1) :** Obligation pour l'employeur de vérifier l'authenticité des titres auprès de la préfecture avant embauche et de suivre leur date d'expiration.

---

## 10. SOURCES ET QUESTIONS À VALIDER AUPRÈS DES PROSPECTS

### A. Sources consultées
- Convention Collective Nationale des Entreprises de Propreté et Services Associés du 26 juillet 2011 (IDCC 3043 / Brochure JO 3173), notamment l'Article 7 relatif à la garantie d'emploi et à la continuité du contrat de travail en cas de changement de prestataire.
- Document Drive `BRAINSTORMING/IDEE-001_PROJET-CASHFLOW.md` (`1i1rjoqRDS_ZOGhZgxmzFhK81vcXD54TQ` — incluant explicitement le secteur « Nettoyage » dans les Pistes A et C).

### B. Questions de validation terrain
1. Combien de devis de travaux exceptionnels (remise en état, fin de chantier, vitrerie) vos inspecteurs émettent-ils chaque mois, et quel est leur taux de relance actuel ?
2. Comment vos inspecteurs réalisent-ils et transmettent-ils aujourd'hui leurs contrôles qualité contradictoires aux clients donneurs d'ordre ou syndics ?
3. Combien d'heures par semaine vos responsables de secteur consacrent-ils à gérer les absences et remplacements du matin (06h00–09h00) et du soir ?
