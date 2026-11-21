# ANALYSE SECTORIELLE 01 — SÉCURITÉ PRIVÉE (SURVEILLANCE HUMAINE, GARDIENNAGE & SÛRETÉ)

- **Référence :** SYNTESIA-CAT-01
- **Catégorie dans le portefeuille :** Socle Fondateur — Verticale Commerciale Prioritaire de Lancement #1 (Égale priorité avec la filière Construction/Rénovation)
- **Statut du document :** `ANALYSE DOCUMENTAIRE TERMINÉE — VALIDATION DU FONDATEUR EN ATTENTE`

---

## 1. PRÉSENTATION DU MARCHÉ ET SOUS-MÉTIERS

### A. Faits documentés (`[FAIT DOCUMENTÉ]`)
Le secteur de la sécurité privée en France est régi par le **Livre VI du Code de la Sécurité Intérieure (CSI)** et placé sous le contrôle du **CNAPS** (Conseil National des Activités Privées de Sécurité, établissement public administratif sous tutelle du ministère de l'Intérieur). Les relations sociales relèvent de la **Convention Collective Nationale des Entreprises de Prévention et de Sécurité (IDCC 1351 / Brochure JO 3196)**.

### B. Sous-métiers distincts
1. **Surveillance humaine et gardiennage fixe** (tertiaire, industrie, grande distribution, logistique).
2. **Sécurité incendie** (agents **SSIAP 1**, chefs d'équipe **SSIAP 2**, chefs de service **SSIAP 3** dans les ERP et IGH).
3. **Sécurité mobile, rondes et intervention sur alarme** (véhicules géo-localisés, levée de doute physique).
4. **Surveillance cynophile** (maîtres-chiens soumis à habilitation spécifique et déclaration de l'animal sur la carte professionnelle).
5. **Sécurité événementielle** (filtrage, palpation de sécurité, gestion de flux lors de manifestations culturelles ou sportives).
6. **Télésurveillance et vidéosurveillance** (opérateurs en station centrale certifiée APSAD P3/P5).

---

## 2. PROFIL DES ENTREPRISES CLIENTES CIBLES

- **Cible cœur (`[RECOMMANDATION]`) :** TPE et PME d'exploitation comptant **10 à 150 agents** (dirigeants-exploitants, directeurs d'exploitation ou responsables de planification).
- **Exclusions (`[RECOMMANDATION]`) :**
  - Les micro-structures unipersonnelles sans salarié (sous-traitance en cascade étant encadrée et restreinte par l'ordonnance n° 2022-448 réformant le Livre VI du CSI).
  - Les grands groupes internationaux disposant déjà d'équipes IT internes et d'ERP lourds verrouillés.

---

## 3. PROBLÈMES OPÉRATIONNELS CONCRETS

1. **Risque de sanction CNAPS sur les titres et habilitations (`[FAIT DOCUMENTÉ]`) :**
   - Chaque agent affecté doit détenir une **carte professionnelle CNAPS en cours de validité** (validité 5 ans, renouvellement soumis à un stage **MAC** — Maintien et Actualisation des Compétences — de 24h à 31h à effectuer dans les 24 mois précédant l'expiration), ainsi que ses certificats annexes (**SST** — Sauveteur Secouriste du Travail, **H0B0**, **SSIAP** recyclé tous les 3 ans).
   - L'affectation d'un seul agent dont la carte ou le recyclage est expiré expose l'entreprise et son dirigeant à des sanctions disciplinaires (interdiction temporaire d'exercer) et financières lors d'un contrôle CNAPS ou donneur d'ordre.
2. **Gestion des absences imprévues et postes non découverts (`[FAIT DOCUMENTÉ]`) :**
   - Lorsqu'un agent ne prend pas son service (no-show à 06h00 ou 22h00), le responsable d'exploitation doit identifier en urgence un remplaçant qualifié (même spécialité SSIAP/CQP), disponible et **respectant les temps de repos obligatoires** (11h de repos quotidien légal / 12h selon accords ou amplitudes IDCC 1351, durée maximale hebdomadaire de 48h).
3. **Érosion de la marge horaire et complexité de chiffrage (`[FAIT DOCUMENTÉ]`) :**
   - Le calcul du coût de revient complet d'une heure de vacation dépend des grilles conventionnelles IDCC 1351 (coefficients agent d'exploitation, agent de maîtrise), des majorations de nuit (21h–06h), du dimanche, des jours fériés, des indemnités de panier, d'habillage et d'entretien des tenues, ainsi que du plancher de vacation (Avenant n° 2 fixant un plancher de 6h sous conditions). Une erreur de chiffrage entraîne des contrats vendus à perte.
4. **Dispersion de la preuve de prestation (`[HYPOTHÈSE OPÉRATIONNELLE]`) :**
   - Les prises de service téléphoniques, les mains courantes papier et les rapports d'incidents transmis par messagerie instantanée compliquent la justification des heures facturées auprès des donneurs d'ordre en fin de mois.

---

## 4. PROCESSUS RÉPÉTITIFS ET TÂCHES ADMINISTRATIVES

- Vérification manuelle mensuelle des dates d'expiration des cartes pro CNAPS, SST, SSIAP et titres de séjour (avec autorisation de travail).
- Rédaction et envoi des **Ordres de Mission** et fiches de poste avant chaque vacation ou remplacement.
- Relance téléphonique individuelle d'une liste d'agents pour combler un poste vacant.
- Pointage et rapprochement entre le planning prévisionnel, les heures réellement pointées sur site, les variables de paie (heures de nuit, paniers, dimanches) et la facture client.
- Préparation des dossiers de réponse aux appels d'offres privés et marchés publics (DC1, DC2, mémoire technique, attestations de vigilance URSSAF et cotisations).

---

## 5. CAS D'UTILISATION PERTINENTS DE L'AUTOMATISATION ET DE L'IA

1. **Contrôle déterministe pré-affectation (« Garde-fou CNAPS & IDCC 1351 ») :**
   - Vérification algorithmique (sans hallucination LLM) bloquant ou alertant l'exploitant si l'agent sélectionné a une carte expirée, un diplôme SSIAP manquant pour le site, ou un repos quotidien inférieur au seuil légal.
2. **Automatisation de la recherche de remplaçant et génération d'Ordre de Mission :**
   - Filtrage instantané du vivier d'agents éligibles et génération du brouillon d'Ordre de Mission conforme (avec mention de l'article L.612-9 du CSI) prêt à être validé par le dirigeant.
3. **Calculateur de coût de revient et de prix plancher horaire :**
   - Simulation déterministe du taux horaire minimum de facturation intégrant charges patronales, primes IDCC 1351, taux d'absentéisme et marge cible.
4. **Assistant documentaire de réponse aux appels d'offres (RAG sur mémoires techniques) :**
   - Pré-remplissage structuré des mémoires techniques à partir des références et procédures internes de l'entreprise, sous contrôle humain systématique.

---

## 6. SOLUTIONS ET PRESTATIONS COMMERCIALISABLES PAR SYNTESIA

> *Distinction : offres de conseil/intégration SYNTESIA vs logiciel SaaS OMNISECUR du LAB.*

1. **Diagnostic d'Exploitation & Conformité Documentaire (Prestation de conseil / audit) :**
   - Audit des flux de planification, de la chaîne de contrôle des titres CNAPS/SSIAP et de la rentabilité horaire des contrats actifs.
2. **Intégration d'Automatisations d'Alerte Échéances & Dossiers Agents :**
   - Mise en place d'un tableau de suivi structuré avec alertes automatiques à J-90 / J-60 / J-30 avant expiration des cartes pro, MAC, SST et SSIAP.
3. **Déploiement et Paramétrage du Socle Métier (`OMNISECUR / COS Opérations`) :**
   - Intégration, personnalisation et formation des équipes d'exploitation sur les outils développés par le LAB (planning assisté, calculateur de marge Bouclier, génération d'Ordres de Mission).

---

## 7. POTENTIEL DE RÉUTILISATION DES BRIQUES TECHNIQUES EXISTANTES

- **Niveau de réutilisation : TRÈS ÉLEVÉ (`[VÉRIFIÉ TECHNIQUEMENT]`).**
- **Briques directement mobilisables :**
  - Moteur de conformité et de calcul `OMNISECUR v2.3.2` (archive Drive `GIT-MANIFEST.json` `1GiyjMM2...` et `SORTIES-BRUTES-TESTS-ET-BUILD-f6b1a87.txt` `1BXe_-qm...` : règles CSI Art. L.612-9, IDCC 1351, Avenant n° 2 plancher 6h, verrouillage des horodatages serveur `clock_timestamp()`).
  - Démonstrateur autonome Phase 1 `COS-MVP-Operations-demo-phase1.html` (`1Y9tlQUOtvNjGAYaVpwmvneoGOnz76HeP`).
  - Prototype des 5 agents d'appels d'offres `COS Bureau IA` (`1XM5ePbfoBnCcm7cKbyWIItRjwurp6dO4`).
  - Page sectorielle SYNTESIA déjà construite : `sites/france/securite-privee/index.html`.

---

## 8. CONCURRENCE ET SOLUTIONS DÉJÀ DISPONIBLES

- **ERP métiers historiques (`[FAIT DOCUMENTÉ]`) :** *Combo / Kombo*, *Progisap / Sekur*, *Chronotime*, *SmartPS*, *Geoconcept*, *Witik*.
- **Limites des solutions existantes (`[HYPOTHÈSE OPÉRATIONNELLE]`) :** Logiciels souvent coûteux, complexes à déployer pour une PME de 15 à 50 agents, ou focalisés sur la planification pure sans couplage direct avec l'arbitrage de marge par contrat et l'assistance documentaire aux appels d'offres.
- **Positionnement SYNTESIA (`[RECOMMANDATION]`) :** Se positionner sur la **conformité opérationnelle immédiate, la protection de la marge horaire et l'agilité de déploiement** sans imposer une migration ERP lourde de 6 mois.

---

## 9. DIFFICULTÉ D'ACQUISITION COMMERCIALE

- **Accès aux décideurs : MODÉRÉ À BON (`[FAIT DOCUMENTÉ]`).** Les entreprises de sécurité privée sont facilement identifiables via les registres publics (codes NAF `80.10Z` Activités de sécurité privée, annuaires d'autorisations d'exercer CNAPS).
- **Méfiance sectorielle : ÉLEVÉE (`[HYPOTHÈSE]`).** Secteur très sollicité et sensible à la confidentialité de ses clients et plannings. L'approche doit reposer sur une démonstration métier crédible (maîtrise du vocabulaire IDCC 1351, MAC, SSIAP, CNAPS) et le respect strict de la `DIRECTIVE_GLOBALE_COMPORTEMENT_ET_BIENSEANCE.md`.

---

## 10. RISQUES RÉGLEMENTAIRES ET CONTRAINTES MÉTIER

1. **Responsabilité pénale et administrative du dirigeant de sécurité (`[FAIT DOCUMENTÉ]`) :**
   - SYNTESIA ne doit jamais vendre une « garantie d'exonération de responsabilité CNAPS ». L'outil est un **système d'aide à la décision et de contrôle**, la validation finale de l'affectation (Sas Dirigeant) restant sous la responsabilité légale de l'exploitant titulaire de l'agrément dirigeant CNAPS.
2. **Protection des données personnelles des salariés (RGPD / CNIL) (`[FAIT DOCUMENTÉ]`) :**
   - Les numéros de cartes professionnelles, données d'état civil, titres de séjour et plannings nominatifs sont des données personnelles sensibles qui exigent un hébergement conforme RGPD, un DPA (Art. 28) et l'interdiction absolue d'envoi vers des LLM publics non cloisonnés.

---

## 11. SOURCES ET ÉLÉMENTS JUSTIFIANT LES CONCLUSIONS

- Code de la Sécurité Intérieure (Livre VI : Activités privées de sécurité, notamment Art. L.612-1 à L.612-20).
- Convention Collective Nationale des Entreprises de Prévention et de Sécurité du 15 mai 1985 (IDCC 1351 / Brochure JO 3196) et ses avenants.
- Dossier Drive `PROJETS/OMNISECUR` (`1BQd8Ohcc7R_sfRm04SFHegoukHeAz-EB`), `RAPPORT-CERTIFICATION-TECHNIQUE.md` (`1PNdjm5ExRTUjZaHicNR_knVE9aNTWag7`) et `SORTIES-BRUTES-TESTS-ET-BUILD-f6b1a87.txt` (`1BXe_-qmTq6ii642CADalQQR2V_ga-XXm`).

---

## 12. QUESTIONS RESTANT À VALIDER AUPRÈS DE VRAIS PROSPECTS

1. Quel est l'outil actuellement utilisé par le dirigeant pour gérer ses plannings (Excel, logiciel métier dédié, messagerie WhatsApp) et quel est son coût mensuel actuel ?
2. Quelle est la fréquence réelle des remplacements d'urgence (no-show) par semaine et combien d'heures le chef d'exploitation y consacre-t-il ?
3. Le dirigeant préfère-t-il acheter une **prestation d'intégration et de mise en conformité clé en main** (modèle agence SYNTESIA) ou un **abonnement logiciel autonome** (modèle SaaS OMNISECUR) ?
