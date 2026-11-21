# ANALYSE SECTORIELLE 05 — ARCHITECTURE, BUREAUX D'ÉTUDES TECHNIQUES (BET) & MAÎTRISE D'ŒUVRE

- **Référence :** SYNTESIA-CAT-05
- **Catégorie dans le portefeuille :** Extension Sectorielle à Étudier #1 (Synergie directe amont avec la filière Bâtiment / BTP / Rénovation)
- **Statut du document :** `ANALYSE DOCUMENTAIRE TERMINÉE — VALIDATION DU FONDATEUR EN ATTENTE`

---

## 1. PRÉSENTATION DU MARCHÉ ET SOUS-MÉTIERS (`[FAIT DOCUMENTÉ]`)

Cette famille regroupe les professions intellectuelles de la conception, de l'ingénierie et du pilotage de la construction, intervenant en amont et pendant l'exécution des chantiers selon les phases normalisées de la **Loi MOP** (Maîtrise d'Ouvrage Publique, intégrée au Code de la commande publique) et des contrats de maîtrise d'œuvre privée : **ESQ/DIAG** (Esquisse/Diagnostic), **APS/APD** (Avant-Projet Sommaire/Définitif), **PRO/DCE** (Projet / Dossier de Consultation des Entreprises), **ACT** (Assistance aux Contrats de Travaux), **VISA/DET** (Direction de l'Exécution des Travaux) et **AOR** (Assistance aux Opérations de Réception).

### Sous-métiers pertinents
1. **Agences d'Architecture** (architectes inscrits au tableau de l'Ordre des Architectes, loi du 3 janvier 1977).
2. **Bureaux d'Études Techniques (BET) spécialisés :**
   - *BET Structure* (béton armé, charpente métallique, bois).
   - *BET Fluides, Thermique & Environnement* (CVC, électricité, calculs réglementaires **RE2020**, audits énergétiques, décret tertiaire).
   - *BET VRD & Géotechnique* (études de sol G1/G2, voirie et réseaux).
   - *BET Acoustique & Sécurité Incendie* (notices de sécurité ERP).
3. **Économistes de la construction** (élaboration des CCTP — Cahiers des Clauses Techniques Particulières — et des DPGF / estimations financières).
4. **Maîtres d'œuvre d'exécution (MOEX) et pilotes OPC** (Ordonnancement, Pilotage et Coordination de chantier).
5. **Diagnostiqueurs immobiliers et géomètres-experts** (DPE, amiante, plomb, mesurages Loi Carrez / plans topographiques — à l'image du document `27265 MESURAGE HOTEL (DIAG DT).pdf` présent dans le Drive du fondateur).

---

## 2. PROFIL DES ENTREPRISES CLIENTES CIBLES

- **Cible cœur (`[RECOMMANDATION]`) :** Agences d'architecture, cabinets d'économistes/MOEX et BET indépendants comptant **3 à 35 collaborateurs** (architectes associés, ingénieurs chefs de projets, projeteurs BIM, chargés d'affaires).
- **Modèle économique client (`[FAIT DOCUMENTÉ]`) :** Facturation d'honoraires au forfait (en pourcentage du montant des travaux, généralement 8 % à 12 % en mission complète) ou à la vacation/livrable (pour les BET). La rentabilité dépend exclusivement du **temps d'ingénieur/architecte passé par phase** par rapport aux honoraires facturés.

---

## 3. PROBLÈMES OPÉRATIONNELS CONCRETS (`[FAIT DOCUMENTÉ]`)

1. **Rédaction ultra-chronophage des comptes-rendus de chantier (Phase DET) :**
   -Chaque semaine, l'architecte ou le MOEX anime une réunion de chantier de 2 à 3 heures, prend des notes et des dizaines de photos sur site, puis doit passer 2 à 4 heures au bureau pour mettre en page, numéroter et diffuser le **Compte-Rendu de Chantier (CRC)** officiel à 15 entreprises et au maître d'ouvrage.
2. **Analyse et comparaison manuelle des offres entreprises (Phase ACT) :**
   - Lors de l'appel d'offres, les entreprises du bâtiment renvoient leurs devis ou DPGF dans des formats hétérogènes (PDF scannés, Excel modifiés, oublis de postes, variantes non demandées). L'économiste ou le BET passe des journées à ressaisir et aligner les prix pour rédiger le **Rapport d'Analyse des Offres (RAO)**.
3. **Rédaction et mise à jour des CCTP et notices réglementaires (Phase PRO/DCE) :**
   - Recherche constante des normes DTU à jour, copier-coller risqué d'anciens CCTP contenant des incohérences entre le lot Gros Œuvre et les lots Fluides/Menuiseries.
4. **Dérive non facturée du temps passé par phase (Absence d'avenants d'honoraires) :**
   - Lorsque le maître d'ouvrage demande de multiples modifications tardives en phase APD ou PRO, les agences absorbent souvent ces heures supplémentaires faute d'un suivi analytique précis par phase justifiant un avenant d'honoraires.

---

## 4. PROCESSUS RÉPÉTITIFS ET TÂCHES ADMINISTRATIVES

- Mise en forme des Comptes-Rendus de Chantier hebdomadaires et suivi des pénalités de retard / absences aux réunions.
- Vérification administrative des dossiers d'entreprises en phase ACT/DET (assurances décennales correspondant aux lots, Kbis, URSSAF, agréments).
- Contrôle et visa des **situations de travaux mensuelles** envoyées par chaque entreprise de bâtiment avant émission du certificat de paiement pour le maître d'ouvrage.
- Constitution des dossiers de candidature aux concours et marchés publics de maîtrise d'œuvre (formulaires DC1/DC2, sélection des références similaires, attestations d'assurance **MAF** — Mutuelle des Architectes Français — ou EUROMAF).
- Collecte et compilation des **DOE** (Dossiers des Ouvrages Exécutés) auprès de toutes les entreprises en fin de chantier.

---

## 5. CAS D'UTILISATION PERTINENTS DE L'AUTOMATISATION ET DE L'IA

1. **Assistant de structuration des Comptes-Rendus de Chantier (Notes vocales + Photos ➔ CRC normalisé) :**
   - À partir des notes dictées sur chantier par lot, conversion automatique en observations structurées, affectées à l'entreprise responsable avec date d'échéance et intégration dans le gabarit Word/Google Docs de l'agence.
2. **Comparateur automatisé de DPGF et préparation du Rapport d'Analyse des Offres (Phase ACT) :**
   - Extraction des devis PDF/Excel reçus des entreprises, alignement sur la grille DPGF de référence de l'économiste, détection automatique des erreurs de calcul arithmétique, des postes omis (= 0 €) et des écarts anormaux par rapport à l'estimation du maître d'œuvre.
3. **Collecteur automatisé de pièces administratives et de DOE en fin de chantier :**
   - Relance programmée des entreprises titulaires des lots pour récupérer leurs fiches techniques, plans de récolement (DOE) et attestations d'assurance décennale avant la réception AOR.
4. **Vérificateur de cohérence inter-lots sur CCTP (RAG technique) :**
   - Croisement du CCTP d'un lot avec les autres lots pour signaler les limites de prestations oubliées (ex. : qui fournit et qui raccorde électriquement le volet roulant ou la pompe à chaleur ?).

---

## 6. SOLUTIONS ET PRESTATIONS COMMERCIALISABLES PAR SYNTESIA

1. **Automatisation de la Phase ACT (Analyse des Devis Entreprises & Relance Consultations) :**
   - Déploiement d'un pipeline de relance des entreprises consultées pendant l'appel d'offres privé et d'extraction/comparaison structurée des DPGF reçus dans un tableau comparatif maître.
2. **Système de Production Assistée des Comptes-Rendus de Chantier & Suivi des Réserves (DET/AOR) :**
   - Intégration d'un flux mobile ➔ documentaire permettant aux chargés d'affaires de diviser par trois le temps de frappe au bureau après leurs visites de chantier.
3. **Portail Automatisé de Collecte des Assurances Décennales & DOE Entreprises :**
   - Automatisation des relances documentaires auprès des entreprises du chantier (mutualisable à 100 % avec la brique de conformité sous-traitants de la verticale Bâtiment).

---

## 7. POTENTIEL DE RÉUTILISATION DES BRIQUES TECHNIQUES EXISTANTES

- **Niveau de réutilisation : ÉLEVÉ (`[VÉRIFIÉ TECHNIQUEMENT]`).**
- **Briques directement transposables :**
  - **Moteur documentaire (`scripts/generate_proposal.py`) :** Génération automatisée de rapports (Comptes-Rendus, Rapports d'Analyse des Offres, Certificats de paiement) à partir de templates Google Docs / Word.
  - **Brique « Appels d'Offres / Mémoires Techniques » (`COS Bureau IA`) :** Directement adaptable aux candidatures de maîtrise d'œuvre publique (sélection de références, vérification des pièces DC1/DC2).
  - **Synergie croisée avec la Verticale Bâtiment/Rénovation :** Un architecte ou maître d'œuvre travaille quotidiennement avec 10 à 30 entreprises du bâtiment et artisans. **C'est un prescripteur naturel majeur pour l'offre Bâtiment/Rénovation de SYNTESIA.**

---

## 8. CONCURRENCE ET SOLUTIONS DÉJÀ DISPONIBLES

- **Logiciels de gestion d'agence d'architecture / BET (`[FAIT DOCUMENTÉ]`) :** *Ooti*, *Archipad* / *BulldozAIR* / *Finalcad* (suivi de chantier et réserves sur tablette), *DeviSOC* / *ATTIC+* / *Multidoc* (économie de la construction et CCTP), *Kroqi* (plateforme collaborative BIM publique).
- **Positionnement SYNTESIA (`[RECOMMANDATION]`) :** Les outils tablettes comme Archipad gèrent bien le pointage des réserves visuelles, mais **le croisement des DPGF en phase ACT, la collecte des DOE/décennales et la génération sur mesure des rapports narratifs** restent très manuels. SYNTESIA apporte l'automatisation documentaire et l'intelligence d'extraction sur les formats propres de l'agence.

---

## 9. DIFFICULTÉ D'ACQUISITION COMMERCIALE & RISQUES RÉGLEMENTAIRES

- **Accès aux décideurs : TRÈS BON (`[FAIT DOCUMENTÉ]`).** Le tableau de l'Ordre des Architectes, la fédération CINOV et Syntec-Ingénierie répertorient toutes les structures avec leurs spécialités. Les associés sont des profils intellectuels technophiles mais très exigeants sur la rigueur et l'esthétique des livrables.
- **Risques réglementaires et contraintes métier (`[FAIT DOCUMENTÉ]`) :**
  1. **Responsabilité décennale du concepteur (Code civil Art. 1792) et Assurance MAF :** SYNTESIA ne doit jamais automatiser de **calcul de dimensionnement structurel, thermique ou incendie**. L'IA et l'automatisation portent exclusivement sur la productivité administrative, documentaire et le contrôle de complétude des dossiers, sous le visa de l'ingénieur ou de l'architecte.
  2. **Propriété intellectuelle des plans et études :** Les plans (DWG, IFC/BIM) et pièces écrites sont couverts par le droit d'auteur et le secret professionnel ; zéro réutilisation ou entraînement externe sur les fichiers projets.

---

## 10. SOURCES ET QUESTIONS À VALIDER AUPRÈS DES PROSPECTS

### A. Sources consultées
- Loi n° 77-2 du 3 janvier 1977 sur l'architecture et Code de la commande publique (dispositions ex-Loi MOP sur les éléments de mission de maîtrise d'œuvre).
- Norme NF P 03-001 (Cahier des clauses administratives générales applicable aux travaux de bâtiment faisant l'objet de marchés privés).
- Document Drive `27265 MESURAGE HOTEL (DIAG DT).pdf` (`1hZOqbgd8Zt58bSDnbFvNsVVTW26XdLxF` — illustration concrète d'un livrable de bureau d'études / géomètre-diagnostiqueur).

### B. Questions de validation terrain
1. Combien d'heures par semaine vos chefs de projets consacrent-ils à la remise au propre des Comptes-Rendus de Chantier après les visites sur site ?
2. En phase d'appel d'offres (ACT), comment gérez-vous la comparaison des devis lorsque les entreprises modifient ou ne respectent pas votre cadre DPGF Excel ?
3. Combien de temps mettez-vous en fin de chantier pour récupérer l'intégralité des DOE (Dossiers des Ouvrages Exécutés) auprès des entreprises ?
