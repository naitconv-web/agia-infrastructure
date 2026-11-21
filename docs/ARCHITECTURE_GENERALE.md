# ARCHITECTURE OPÉRATIONNELLE & TECHNIQUE — MISSION AGIA-001

- **Date de conception :** 2026-11-21
- **Directeur Technique / Architecte :** Antigravity AI Engine
- **Propriétaire :** Dirigeant Fondateur
- **Dépôt GitHub :** `https://github.com/naitconv-web/agia-infrastructure`
- **Dossier Central Google Drive :** `_AGIA_PILOTAGE` (ID: `17gFy4iaLy-5-sFoKjfB0z4O2co35z6ES`)

---

## 1. VISION ET PRINCIPES DIRECTEURS

L'infrastructure de l'Agence IA a été conçue selon cinq principes fondamentaux :
1. **Zéro dépense superflue :** Exploitation prioritaire et intégrale des outils préexistants (Google Workspace, GitHub, scripts automatisés, quotas d'IA attribués).
2. **Cloisonnement territorial strict :** Séparation technique et légale des opérations France (micro-entrepreneur, SIRET/Kbis, facturation en EUR) et Algérie (facturation en DZD, cadre local).
3. **Traçabilité et vérité terrain :** Tout lead, devis, facture, ticket de delivery ou anomalie est consigné dans une base persistante auditable (CRM Google Sheets).
4. **Automatisation modulaire :** Entonnoir commercial automatisé (Prospect ➔ Qualification ➔ Devis ➔ Production ➔ Clôture).
5. **Autonomie et sécurité :** Aucun secret ni clé API en dur dans les pages publiques ; conformité stricte aux règles de confidentialité.

---

## 2. CARTOGRAPHIE DES COMPOSANTS ET ARBORESCENCE DRIVE

```
Google Drive : _AGIA_PILOTAGE (17gFy4iaLy-5-sFoKjfB0z4O2co35z6ES)
├── 01_CRM_COMMERCIAL (19yeT9hKcnpjYPrlJjw0qaG2O9mo28r4e)
│   └── AGIA — CRM & Pilotage Opérationnel (Sheet ID: 1EmC6f4ljLU2GZmD9HEBt50WdTlVXoQtPQ64vFQL1I_0)
├── 02_PRODUCTIONS_CLIENTS (1-CPelCHXcmbk4cBlbsbTE77inFWcfUeb)
│   └── [Dossiers projets clients par ID]
├── 03_ADMIN_CONTRATS_FACTURES (1u1rz6MhvxQDOuJAHrTKKbLrSOh56-z6U)
│   ├── France (Factures EUR & Micro-entreprise)
│   └── Algerie (Factures DZD)
├── 04_SUPERVISION_METRIQUES (15ILbxvN7U1WxbhlGpMPwQFoYEMBlHqyz)
│   └── Logs d'exécution et rapports périodiques
└── 05_TEMPLATES_LIVRABLES (15LG8XSSVTrr_xHWIBXrRW22EBrmeHweK)
    ├── TEMPLATE — Devis & Proposition Commerciale AGIA (Doc ID: 1OGaqATY0N8qwYeS82Gzjxtkb0vZ_t3Q5-HRqLLnD66s)
    ├── TEMPLATE — Diagnostic de Maturité IA & CDC (Doc ID: 1JZ-vKrjFU_w6R1Ga3Z4x2muU_v1OLCZ102cdQ8KbzyY)
    └── TEMPLATE — Contrat de Prestation B2B AGIA (Doc ID: 17LnbvGd2CAsHPBoFuvcdMGbCxi-HvdYjdQ7wSPo0M48)
```

---

## 3. MODÈLE DE DONNÉES DU CRM CENTRALISÉ (GOOGLE SHEETS)

Le fichier `AGIA — CRM & Pilotage Opérationnel` est articulé en 6 onglets normalisés :

1. **`00_DASHBOARD_KPI` :** Synthèse exécutive temps réel (Leads totaux, Leads qualifiés, Devis émis, Taux de conversion, CA France, CA Algérie, Projets actifs, Coûts engagés).
2. **`01_PROSPECTS_LEADS` :** Répertoire des contacts entrants issus des sites web ou des canaux d'acquisition, avec score de maturité / qualification (1 à 10) et statut (`NOUVEAU`, `QUALIFIE`, `RDV_FIXE`, `DEVIS_ENVOYE`, `GAGNE`, `PERDU`).
3. **`02_OPPORTUNITES_DEVIS` :** Suivi de chaque devis émis, montant, devise, lien du document Google Docs généré et dates de relance automatique à J+3 et J+7.
4. **`03_PROJETS_PRODUCTION` :** Suivi du delivery (Lancement, jalons, livrable final, recette client, agent IA responsable).
5. **`04_FACTURES_PAIEMENTS` :** Suivi administratif et trésorerie (Acompte 40%, Solde 60%, TVA applicable, statut d'encaissement).
6. **`05_SUPERVISION_COUTS_API` :** Journal d'audit des ressources consommées (tokens, abonnements, coûts exacts).

---

## 4. FLUX DE DONNÉES COMMERCIAL ET AUTOMATISATION

```
[Visiteur Web France / Algérie]
        │
        ▼ Remplit formulaire interactif de diagnostic (3 min)
[Formulaire Frontend Web]
        │
        ▼ Envoi JSON (POST Webhook Apps Script)
[Apps Script / CRM Ingestion Engine]
        │
        ├── Enregistre la ligne dans '01_PROSPECTS_LEADS'
        ├── Calcule le score de qualification (Budget + Maturité + Urgence)
        ├── Envoie un email de notification instantanée via Gmail au Dirigeant
        └── Envoie un email d'accusé de réception personnalisé au prospect
```

---

## 5. SYSTÈME MULTI-AGENTS SPÉCIALISÉS

L'agence dispose d'un collège d'agents aux périmètres hermétiques :
- **Agent Orchestrateur & Directeur des Opérations (Antigravity Core) :** Réceptionne les directives du dirigeant, arbitre les priorités, déclenche les agents subordonnés et valide la complétion.
- **Agent Commercial & Qualification :** Analyse les formulaires, calcule le score de qualification (1-10), rédige le pré-diagnostic de maturité.
- **Agent Proposition & Devis :** Clone le template Google Docs approprié, substitue les variables du prospect et prépare le devis pour validation.
- **Agent Développeur & Intégrateur :** Implémente le code, gère les repositories GitHub, configure les scripts d'automatisation.
- **Agent Contrôle Qualité & Conformité (Auditeur) :** Vérifie la solidité des livrables, l'absence de régression et le respect strict du secret d'affaires et du RGPD.

---

## 6. EXIGENCES PERMANENTES DE CONCEPTION ET D'EXPLOITATION SYNTESIA (INTÉGRATION STRATÉGIQUE & REPORT AGIA-010+)

Conformément aux directives stratégiques consolidées du fondateur (AGIA-002 à AGIA-009) et au complément stratégique permanent pris en compte lors d'AGIA-009 sans modifier les décisions antérieures :

1. **Identité et Positionnement Opérationnel Permanent :**
   - **SYNTESIA** intervient comme partenaire d'ingénierie opérationnelle et de transformation B2B : **comprendre les opérations → identifier les inefficacités → concevoir des systèmes adaptés → intégrer les outils existants → automatiser les processus → déployer des agents IA encadrés → accompagner durablement les équipes**.
   - **Hiérarchie du portefeuille préservée :** `WORKSTATION-IA` (environnement d'ingénierie et d'orchestration), `LAB` (structure mère active de la gamme logicielle `Omni-X` : `OMNISECUR`, `OMNIRENOV / RELANCE-DEVIS`, `OMNIPATRIMOINE`), et `SYNTESIA` (marque commerciale France prioritaire & Algérie second marché à stratégie propre).
2. **Gouvernance Technique, Design & Sécurité Permanente :**
   - **Réflexe Bibliothèque Technologique (`docs/bibliotheque_technologique/`) :** Consulter systématiquement l'inventaire qualifié avant tout développement, privilégier les ressources sélectionnées par le fondateur (*Refero*, *REA*, *Agency Agents*, *Understand-Anything*, *Chatwoot*, *OpenSEO*, *Moteur Leads Universel v2*).
   - **Référence de conception UI/UX (`Refero Styles`) :** Ancrer toute création ou refonte d'interface sur un *Reference Lock* (`DESIGN.md`) issu de produits réels et compilé de manière 100 % autonome (zéro dépendance CDN externe, zéro fuite d'IP visiteur).
   - **Supervision humaine souveraine (*Sas Dirigeant*) & Bienséance :** Aucun engagement commercial, financier ou juridique autonome ; séparation stricte des environnements `TEST` / `PROD` ; protection anti-injection (`CWE-1236` / XSS), anti-doublon et minimisation des données dans les journaux (`Zéro PII dans les logs`).
3. **Séquencement des Développements Suivants (Reportés à `AGIA-010` et missions ultérieures) :**
   - Conformément à l'instruction du fondateur pendant `AGIA-009`, tout nouveau développement fonctionnel ou extension d'architecture découlant des compléments stratégiques (ainsi que l'intégration de tout cahier des charges complémentaire transmis par le fondateur, les démonstrateurs sectoriels additionnels et le Lot Phase 2A d'`OMNISECUR`) est formellement inscrit au backlog d'**`AGIA-010`** et des missions suivantes, afin de préserver l'intégrité et le gel de la recette pré-production `AGIA-009`.

