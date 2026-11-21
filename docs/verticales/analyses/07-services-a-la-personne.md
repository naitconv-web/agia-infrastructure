# ANALYSE SECTORIELLE 07 — SERVICES À LA PERSONNE (SAP) & AIDE À DOMICILE

- **Référence :** SYNTESIA-CAT-07
- **Catégorie dans le portefeuille :** Extension Sectorielle à Étudier #3 (Forte homologie algorithmique de planification horaire et de remplacements d'urgence avec la Sécurité Privée)
- **Statut du document :** `ANALYSE DOCUMENTAIRE TERMINÉE — VALIDATION DU FONDATEUR EN ATTENTE`

---

## 1. PRÉSENTATION DU MARCHÉ ET SOUS-MÉTIERS (`[FAIT DOCUMENTÉ]`)

Le secteur des **Services à la Personne (SAP)** en France est encadré par le Code du travail (Art. L.7231-1 et suivants — Loi Borloo) et le Code de l'action sociale et des familles (CASF), sous la **Convention Collective Nationale des Entreprises de Services à la Personne (IDCC 3127)**. Les structures opèrent sous régime de **Déclaration** (ouvrant droit au crédit d'impôt de 50 % et à l'**Avance Immédiate URSSAF**) ou d'**Autorisation / Agrément préfectoral et départemental** (pour les publics fragiles).

### Sous-métiers distincts
1. **Maintien à domicile des personnes âgées et dépendantes (SAAD / SAD) :** Aide au lever/coucher, aide à la toilette, préparation des repas, accompagnement (financements **APA** — Allocation Personnalisée d'Autonomie — et caisses de retraite CARSAT).
2. **Accompagnement du handicap :** Prestataires financés par la **PCH** (Prestation de Compensation du Handicap / MDPH).
3. **Ménage et repassage à domicile (Confort) :** Prestations régulières chez des particuliers actifs (100 % éligibles à l'Avance Immédiate URSSAF).
4. **Garde d'enfants à domicile :** Garde périscolaire, garde partagée, garde d'enfants de moins de 3 ans (agrément préfectoral obligatoire + financement **PAJE / CMG** de la CAF).
5. **Petits travaux de jardinage et bricolage à domicile** (plafonds fiscaux annuels spécifiques).

---

## 2. PROFIL DES ENTREPRISES CLIENTES CIBLES

- **Cible cœur (`[RECOMMANDATION]`) :** Entreprises privées de Services à la Personne (indépendants ou franchisés de réseaux tels que *O2, Shiva, Apef, Petits-fils, Destia, Domaliance, Kangourou Kids*) comptant **15 à 100 intervenants à domicile** (pilotées par un gérant d'agence et 1 à 3 responsables de secteur / coordinateurs).
- **Dynamique opérationnelle (`[FAIT DOCUMENTÉ]`) :** Modèle économique à volume d'heures (facturation entre 24 € et 35 € TTC/heure), où la rentabilité dépend du **taux de chargement des plannings**, de la maîtrise des **temps de déplacement inter-vacations** et de la rétention des intervenants.

---

## 3. PROBLÈMES OPÉRATIONNELS CONCRETS (`[FAIT DOCUMENTÉ]`)

1. **Casse-tête quotidien des remplacements d'urgence et continuité de service :**
   - Lorsqu'une auxiliaire de vie est absente à 07h00 du matin alors qu'elle doit assurer le lever, la prise de repas ou l'aide à une personne âgée dépendante (bénéficiaire APA), le responsable de secteur **n'a pas le droit de laisser la prestation non assurée** (continuité de service obligatoire). Il passe des heures au téléphone pour réorganiser les tournées du jour.
2. **Coût caché des temps et indemnités kilométriques inter-vacations (IDCC 3127) :**
   - Dans les SAP, une journée est composée de 4 à 7 interventions courtes (1h à 2h) chez différents clients. La convention collective IDCC 3127 impose la rémunération des temps de déplacement entre deux séquences consécutives de travail effectif et le remboursement des frais kilométriques. Un planning mal optimisé géographiquement détruit intégralement la marge brute de l'agence.
3. **Gestion des rejets de l'Avance Immédiate URSSAF et télégestion (APA / PCH) :**
   - Avec le service d'**Avance Immédiate de crédit d'impôt** (API URSSAF), le client particulier ne paie que 50 % de sa facture. Mais tout blocage de compte URSSAF du particulier (erreur d'état civil, coordonnées bancaires non validées sous 48h, plafond fiscal dépassé) bloque l'encaissement de l'agence et génère des dizaines de relances administratives.
   - Pour les prestations APA/PCH, les conseils départementaux exigent une **télégestion** stricte (pointage d'arrivée et de départ au domicile par badge NFC, QR code ou téléphone fixe du bénéficiaire).
4. **Pénurie chronique de main-d'œuvre et présélection RH permanente :**
   - Le secteur connaît un turnover élevé. Les responsables d'agence doivent recruter en continu, trier des dizaines de CV, vérifier les diplômes (DEAES, titre ADVF), l'extrait de casier judiciaire B3 (pour public fragile / garde d'enfants) et le permis de conduire.

---

## 4. PROCESSUS RÉPÉTITIFS ET TÂCHES ADMINISTRATIVES

- Recherche téléphonique de remplaçants lors d'arrêts maladie ou d'absences imprévues.
- Saisie et correction des anomalies de pointage (télégestion oubliée par l'intervenant chez le bénéficiaire).
- Relance des clients particuliers n'ayant pas activé leur compte **Avance Immédiate URSSAF** ou n'ayant pas validé la demande de paiement dans le délai imparti.
- Édition et envoi annuel des **Attestations Fiscales SAP** avant la campagne de déclaration d'impôt sur le revenu.
- Pré-qualification téléphonique des candidats (auxiliaires de vie, aides ménagères, gardes d'enfants) et vérification des pièces du dossier d'embauche.

---

## 5. CAS D'UTILISATION PERTINENTS DE L'AUTOMATISATION ET DE L'IA

1. **Assistant de Dispatch & Remplacement d'Urgence SAP (Transposition directe d'`OMNISECUR`) :**
   - En cas d'absence d'un intervenant, identification immédiate des salariés disponibles dans le même secteur géographique (code postal / temps de trajet), disposant des compétences requises (ex. : manipulation lève-personne, agrément enfant < 3 ans) et respectant les amplitudes horaires et temps de repos de l'**IDCC 3127**.
2. **Pipeline de Pré-Qualification RH & Suivi d'Embauche en Continu :**
   - Formulaire conversationnel mobile pour les candidats postulant sur Indeed/France Travail (vérification immédiate : secteur géographique, véhicule/permis, disponibilités horaires, diplôme ADVF/DEAES) ➔ prise de rendez-vous automatique pour les profils qualifiés et collecte automatisée des pièces d'embauche.
3. **Automatisation de l'Onboarding Client & Suivi d'Activation « Avance Immédiate URSSAF » :**
   - Séquence d'accompagnement pas-à-pas du client particulier (ou de ses aidants familiaux) dès la signature du devis pour garantir l'activation du compte URSSAF en moins de 48h et éviter les rejets de facturation en fin de mois.

---

## 6. SOLUTIONS ET PRESTATIONS COMMERCIALISABLES PAR SYNTESIA

1. **Système Automatisé de Pré-Qualification Candidats & Onboarding RH SAP :**
   - Tunnel de filtrage des candidatures d'intervenants et relance automatisée des pièces du dossier salarié (permis, attestation véhicule, casier B3, diplômes).
2. **Module d'Aide au Remplacement d'Urgence & Optimisation de Secteur :**
   - Adaptation du moteur de matching de remplacement pour les responsables de secteur SAP.
3. **Tunnel « Devis SAP ➔ Activation Avance Immédiate URSSAF & Relance Aidants » :**
   - Automatisation du parcours pré-contractuel avec le particulier ou l'aidant familial (devis gratuit obligatoire dès 100 € TTC, contrat de prestation, guide d'activation URSSAF).

---

## 7. POTENTIEL DE RÉUTILISATION DES BRIQUES TECHNIQUES EXISTANTES

- **Niveau de réutilisation : TRÈS ÉLEVÉ (`[VÉRIFIÉ TECHNIQUEMENT]`).**
- **Parallélisme structurel avec la Sécurité Privée (`OMNISECUR`) :**
  - Les deux métiers gèrent des **heures d'intervenants sur le terrain chez des tiers**, avec des **habilitations obligatoires par type de mission**, des **contraintes strictes d'amplitudes et de repos conventionnels**, du **pointage d'arrivée/départ** et des **remplacements d'urgence quotidiens**.
  - La logique algorithmique du moteur `compliance.ts` / `planning-actions.ts` d'`OMNISECUR` est réutilisable à plus de 70 % en remplaçant les règles IDCC 1351 par celles de l'**IDCC 3127** et les zones géographiques de tournées.

---

## 8. CONCURRENCE ET SOLUTIONS DÉJÀ DISPONIBLES

- **Logiciels métiers SAP et télégestion (`[FAIT DOCUMENTÉ]`) :** *Ximi (Medisys)*, *Progisap*, *Ogis*, *Apologic*, *Dôme*, *Arche MC2 (Domatel)*, *malo*.
- **Positionnement SYNTESIA (`[RECOMMANDATION]`) :** Les logiciels comme Ximi ou Progisap sont indispensables pour la télétransmission aux Conseils Départementaux (APA/PCH) et l'API Avance Immédiate URSSAF, mais ils sont souvent rigides sur **l'acquisition client, le recrutement RH d'intervenants et la communication fluide avec les aidants familiaux**. SYNTESIA se positionne sur ces trois goulots (Recrutement, Devis/Onboarding URSSAF, Aide au remplacement rapide).

---

## 9. DIFFICULTÉ D'ACQUISITION COMMERCIALE & RISQUES RÉGLEMENTAIRES

- **Accès aux décideurs : BON (`[FAIT DOCUMENTÉ]`).** Annuaire national NOVA des organismes de services à la personne, fédérations **FESP** et **FEDESAP**.
- **Risques réglementaires critiques (`[FAIT DOCUMENTÉ]`) :**
  1. **Données de santé et vulnérabilité des bénéficiaires (RGPD Art. 9 & Hébergement HDS) :** Dès lors qu'un dossier mentionne des pathologies, un niveau de dépendance (**GIR 1 à 4**) ou un handicap (PCH), il s'agit de **données sensibles / données de santé**. SYNTESIA a l'interdiction absolue de stocker ou de faire transiter des informations médicales ou de pathologie dans un CRM standard ou un LLM. Les automatisations SYNTESIA ne doivent manipuler que des **données administratives, logistiques (créneaux horaires, code postal) et de compétences professionnelles requises**.
  2. **Protection du consommateur B2C (Arrêté du 17 mars 2015 sur l'information préalable du consommateur SAP) :** Obligation d'établir un devis écrit gratuit personnalisé pour toute prestation dont le prix mensuel est supérieur ou égal à 100 € TTC, avec mention du droit de rétractation de 14 jours (vente à distance ou hors établissement).

---

## 10. SOURCES ET QUESTIONS À VALIDER AUPRÈS DES PROSPECTS

### A. Sources consultées
- Code du travail (Art. L.7231-1 et suivants sur les Services à la Personne) et Code de l'action sociale et des familles (autorisation SAAD/SAD — Loi ASV).
- Convention Collective Nationale des Entreprises de Services à la Personne du 20 septembre 2012 (IDCC 3127).
- Arrêté du 17 mars 2015 relatif à l'information préalable du consommateur sur les prestations de services à la personne.

### B. Questions de validation terrain
1. Quel est votre principal frein à la croissance aujourd'hui : le recrutement d'intervenants qualifiés ou la gestion quotidienne des absences et modifications de planning ?
2. Combien de devis mensuels ou de factures sont retardés à cause de difficultés d'activation du compte Avance Immédiate URSSAF par les clients ou leurs enfants (aidants) ?
3. Quel logiciel métier utilisez-vous actuellement (Ximi, Progisap, Apologic, Ogis) ?
