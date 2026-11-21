# ANALYSE SECTORIELLE 08 — TRANSPORT ROUTIER DE MARCHANDISES (TRM) & LOGISTIQUE

- **Référence :** SYNTESIA-CAT-08
- **Catégorie dans le portefeuille :** Extension Sectorielle à Étudier #4 (Secteur déjà identifié parmi les cibles accessibles dans `IDEE-001_PROJET-CASHFLOW.md`)
- **Statut du document :** `ANALYSE DOCUMENTAIRE TERMINÉE — VALIDATION DU FONDATEUR EN ATTENTE`

---

## 1. PRÉSENTATION DU MARCHÉ ET SOUS-MÉTIERS (`[FAIT DOCUMENTÉ]`)

Le secteur du **Transport et de la Logistique** en France est régi par le **Code des transports**, le Règlement européen (CE) n° 561/2006 (temps de conduite et de repos — RSE) et la **Convention Collective Nationale des Transports Routiers et Activités Auxiliaires du Transport (IDCC 0016 / Brochure JO 3085)**. L'exercice de la profession exige l'inscription au registre électronique national des entreprises de transport par route (**DREAL**), conditionnée à la capacité professionnelle, la capacité financière (9 000 € pour le 1er véhicule > 3,5 t + 5 000 € par véhicule suivant ; 1 800 € / 900 € pour les VUL <= 3,5 t) et l'honorabilité.

### Sous-métiers distincts
1. **Transport Routier de Marchandises (TRM) Lourd (> 3,5 tonnes) :** Lot complet (FTL), demi-lot (LTL), régional, national ou international, benne BTP, citerne, porte-conteneurs.
2. **Messagerie, Courses Express et Livraison du Dernier Kilomètre (VUL <= 3,5 tonnes) :** Distribution urbaine, sous-traitants de réseaux express (Chronopost, DPD, FedEx, Geodis, Amazon DSP).
3. **Transport sous Température Dirigée (Frigorifique — ATP) :** Chaîne du froid alimentaire (lien direct avec HCR) et transport pharmaceutique.
4. **Commissionnaires de Transport et Affréteurs :** Organisation de transport avec obligation de résultat et recours à des transporteurs sous-traitants (capacité de commissionnaire obligatoire).
5. **Logistique d'Entreposage (3PL) & Préparation de Commandes :** Stockage palettes, picking/packing B2B et e-commerce, gestion des quais.
6. **Déménagement professionnel et garde-meubles** (IDCC 0016 annexe spécifique).

---

## 2. PROFIL DES ENTREPRISES CLIENTES CIBLES

- **Cible cœur (`[RECOMMANDATION]`) :** PME de transport routier, d'affrètement ou de logistique exploitant une flotte de **5 à 60 véhicules** (camions poids lourds ou flotte de VUL) et employant 8 à 80 conducteurs et exploitants.
- **Structure opérationnelle (`[FAIT DOCUMENTÉ]`) :** Le gérant et ses exploitants (affréteurs/dispatcheurs) gèrent un flux quotidien tendu à faible marge nette (souvent 2 % à 5 % en TRM), où **tout retard de facturation causé par un bon de livraison manquant ou toute amende pour document de conducteur expiré** impacte immédiatement la trésorerie.

---

## 3. PROBLÈMES OPÉRATIONNELS CONCRETS (`[FAIT DOCUMENTÉ]`)

1. **Blocage de la facturation par l'attente des preuves de livraison (CMR / Lettres de voiture / BL émargés) :**
   - En transport B2B, le donneur d'ordre (chargeur ou commissionnaire) refuse de payer la facture tant que la **lettre de voiture (CMR) ou le Bon de Livraison (BL) signé et tamponné sans réserve par le destinataire** (*Proof of Delivery — POD*) n'est pas joint. Lorsque les chauffeurs mettent 10 à 15 jours à rapporter les papiers froissés dans la cabine du camion, la facturation est retardée d'autant.
2. **Suivi des habilitations conducteurs ET des contrôles réglementaires du parc véhicules :**
   - *Côté conducteur :* Validité du permis (C, CE), carte conducteur chronotachygraphe (5 ans), **FIMO / FCO** (Formation Continue Obligatoire tous les 5 ans), certificat **ADR** (transport de matières dangereuses), CACES grue auxiliaire / chariot embarqué, visite médicale d'aptitude à la conduite.
   - *Côté véhicule :* Contrôle technique poids lourd (**Passage aux Mines** annuel), vérification périodique bisannuelle du **hayon élévateur** (VGP tous les 6 mois), étalonnage du chronotachygraphe et de l'éthylotest anti-démarrage (EAD), attestation **ATP** (pour les caisses frigorifiques).
3. **Oubli ou retard d'application de la surcharge gasoil (Pied de facture CNR) :**
   - La loi (Code des transports Art. L.3222-1 et L.3222-2) impose de répercuter en pied de facture la variation du prix du carburant sur la base des indices officiels du **CNR (Comité National Routier)**. De nombreuses TPE/PME de transport calculent mal ou oublient d'actualiser mensuellement leur indice CNR client par client, perdant des milliers d'euros de marge nette.
4. **Rapprochement fastidieux des pré-factures de sous-traitance et de péages/carburant :**
   - Pour les entreprises travaillant en sous-traitance de grands donneurs d'ordre, pointer chaque tour réalisé avec le relevé d'autofacturation du donneur d'ordre, les badges télépéage et les cartes carburant (AS24, Total, DKV) détecte régulièrement des tours oubliés ou des anomalies de kilométrage.

---

## 4. PROCESSUS RÉPÉTITIFS ET TÂCHES ADMINISTRATIVES

- Collecte, tri, renommage et rattachement des photos de **Bons de Livraison / CMR** envoyées par les chauffeurs (souvent par WhatsApp ou e-mail en vrac) au numéro d'ordre de transport avant facturation.
- Ressaisie des ordres de transport reçus par e-mail PDF de la part des chargeurs/commissionnaires dans le tableau d'exploitation ou le TMS.
- Vérification mensuelle des échéances réglementaires du couple **Conducteur (FCO, Permis, ADR, Carte chrono)** + **Véhicule (Mines, VGP Hayon, Limiteur, Tachygraphe, ATP)** + **Sous-traitants (Licence communautaire / intérieure DREAL, attestation d'assurance marchandise transportée, vigilance URSSAF)**.
- Calcul mensuel de l'indexation carburant sur la base des indices publiés par le CNR.

---

## 5. CAS D'UTILISATION PERTINENTS DE L'AUTOMATISATION ET DE L'IA

1. **Pipeline automatisé « Photo CMR / BL Chauffeur ➔ Extraction & Rattachement ➔ Déclenchement Facturation » :**
   - Le chauffeur photographie la lettre de voiture émargée dès la livraison. Un pipeline d'extraction (OCR structuré) lit le numéro d'ordre de transport, vérifie la présence d'un tampon/signature et l'absence de mention manuscrite de réserve, classe le PDF nommé proprement dans le dossier Drive du client et marque le transport comme « Prêt à facturer » dans le tableau d'exploitation.
2. **Bouclier d'échéances Flotte & Conducteurs (FCO / Permis / ADR / Mines / VGP Hayon / Licence DREAL) :**
   - Transposition directe de l'architecture d'`OMNISECUR` au couple Conducteur + Camion + Sous-traitant transporteur.
3. **Automatisation de la saisie des Ordres de Transport entrants (PDF Chargeur ➔ Exploitation) :**
   - Extraction automatique des adresses d'enlèvement/livraison, horaires de rendez-vous, nombre de palettes, poids, température requise et prix convenu depuis les PDF d'affrètement reçus par e-mail.

---

## 6. SOLUTIONS ET PRESTATIONS COMMERCIALISABLES PAR SYNTESIA

1. **Système d'Accélération de Facturation Transport (Collecte & Rapprochement Automatisé des CMR / BL) :**
   - Déploiement d'un flux terrain ➔ bureau supprimant le délai de retour papier des lettres de voiture et détectant immédiatement les livraisons avec réserves (cas déjà pré-identifié lors du test technique initial de `scripts/orchestrate_crm.py`).
2. **Tableau de Bord de Conformité Réglementaire DREAL, Conducteurs & Parc Véhicules :**
   - Mise en place d'un suivi automatisé avec alertes J-60 / J-30 sur toutes les échéances FCO, Permis, ADR, Mines, VGP Hayon et licences des sous-traitants.
3. **Automatisation du Calcul d'Indexation Carburant CNR & Contrôle des Autofacturations Donneurs d'Ordre :**
   - Outil de vérification mensuelle évitant les pertes de marge sur le pied de facture gasoil et les oublis de tours.

---

## 7. POTENTIEL DE RÉUTILISATION DES BRIQUES TECHNIQUES EXISTANTES

- **Niveau de réutilisation : ÉLEVÉ (`[VÉRIFIÉ TECHNIQUEMENT]`).**
- **Briques directement transposables :**
  - **Moteur d'échéances et d'habilitations d'`OMNISECUR` :** En remplaçant les cartes CNAPS/SSIAP par les titres **FCO / ADR / Permis CE / Licences DREAL / VGP Hayon**, la structure de données et d'alertes est identique.
  - **Brique « Vigilance Sous-Traitants » (Piste A de `IDEE-001_PROJET-CASHFLOW.md`) :** Les commissionnaires et transporteurs faisant appel à des tractionnaires sous-traitants ont exactement les mêmes obligations de collecte semestrielle (URSSAF, Kbis, Licence de transport DREAL, RC et assurance marchandise) que les entreprises du BTP.

---

## 8. CONCURRENCE ET SOLUTIONS DÉJÀ DISPONIBLES

- **TMS (Transport Management Systems) et Télématique (`[FAIT DOCUMENTÉ]`) :** *Dashdoc* (eCMR et TMS moderne), *GedMouv* (lettre de voiture électronique), *Item (Sinari / Cofisoft / Eliot)*, *AKANEA*, *Andsoft*, *Webfleet / Samsara / Trimble* (informatique embarquée).
- **Positionnement SYNTESIA (`[RECOMMANDATION]`) :** Un TMS complet comme Dashdoc ou Sinari représente un abonnement mensuel conséquent au camion et un projet de changement profond. Beaucoup de PME de 5 à 30 véhicules travaillent encore sur tableurs ou avec un vieux logiciel de facturation sans eCMR complète, ou subissent les formats imposés par leurs 5 grands donneurs d'ordre. SYNTESIA se positionne sur **l'automatisation agile du rapprochement BL/Facturation et le suivi de conformité DREAL/Parc/Sous-traitants** sans imposer de changer de logiciel de facturation.

---

## 9. DIFFICULTÉ D'ACQUISITION COMMERCIALE & RISQUES RÉGLEMENTAIRES

- **Accès aux décideurs : BON (`[FAIT DOCUMENTÉ]`).** Le registre public des transporteurs routiers (tenu par le Ministère de la Transition Écologique / DREAL) publie la liste officielle de toutes les entreprises détentrices de licences de transport et de commissionnaire.
- **Risques réglementaires (`[FAIT DOCUMENTÉ]`) :**
  1. **Réglementation Sociale Européenne (RSE — Règlement CE 561/2006) et co-responsabilité du donneur d'ordre :** Aucun outil de planification ne doit inciter au dépassement des temps de conduite (9h/jour, 56h/semaine, 90h/quinzaine) ou à la réduction des repos (45h hebdomadaire normal). Les données officielles opposables lors d'un contrôle DREAL/Inspection du travail restent exclusivement les fichiers numériques signés `.C1B` / `.V1B` extraits des cartes conducteurs et chronotachygraphes homologués.
  2. **Valeur probante de l'eCMR (Protocole additionnel à la Convention CMR et arrêté du 9 novembre 1999) :** Distinguer clairement la **copie numérisée d'un BL papier signé** (utilisée pour accélérer le contrôle interne et l'envoi de facture) d'une **lettre de voiture électronique native (eCMR)** qui exige une plateforme de signature électronique qualifiée répondant aux exigences du Code des transports lors d'un contrôle routier.

---

## 10. SOURCES ET QUESTIONS À VALIDER AUPRÈS DES PROSPECTS

### A. Sources consultées
- Code des transports (Troisième partie : Transport routier, notamment Art. L.3222-1 sur l'indexation carburant CNR et dispositions sur les licences de transport).
- Convention Collective Nationale des Transports Routiers et Activités Auxiliaires du Transport (IDCC 0016 / Brochure JO 3085).
- Document Drive `BRAINSTORMING/IDEE-001_PROJET-CASHFLOW.md` (`1i1rjoqRDS_ZOGhZgxmzFhK81vcXD54TQ` — identification du secteur Transport pour l'offre Vigilance & Conformité).

### B. Questions de validation terrain
1. Quel est le délai moyen actuel en jours entre la livraison effective par votre chauffeur et l'émission de la facture avec le Bon de Livraison / CMR émargé ?
2. Comment suivez-vous aujourd'hui les dates de fin de validité des FCO, cartes chronotachygraphes, permis de vos chauffeurs ainsi que les passages aux Mines et VGP hayons de vos véhicules ?
3. Révisez-vous systématiquement chaque mois votre pied de facture gasoil selon l'indice CNR pour chacun de vos clients réguliers ?
