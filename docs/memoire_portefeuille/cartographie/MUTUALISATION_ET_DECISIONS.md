# MATRICE DES ACTIFS RÉUTILISABLES, COMPÉTENCES & OPPORTUNITÉS DE MUTUALISATION
**Référence :** SYNTESIA-MEMOIRE-MUTUALISATION  
**Date :** 21 novembre 2026  

---

## 1. CARTOGRAPHIE DES ACTIFS TECHNIQUES RÉUTILISABLES

| Actif Technique | Projet Source | Description / Composant | Réutilisation Immédiate dans SYNTESIA |
| :--- | :--- | :--- | :--- |
| **Moteur Réglementaire Sécurité** | `OMNISECUR` (v2.3.2) | Logique de calcul IDCC 1351, Avenant n° 2 (plancher 6h), majorations dimanche/nuit et amplitudes. | Alimente directement l'Agent IA Sécurité Privée de SYNTESIA. |
| **Démonstrateur Interactif Sécurité** | `OMNISECUR` (`COS-MVP-demo`) | Interface web locale autonome illustrant le planning, les alertes CNAPS et la marge vacation. | Sert de démonstrateur d'avant-vente pour la Verticale Sécurité. |
| **Tunnel & Ingestion Inbound** | `RELANCE-DEVIS` / `OMNISECUR-launch-kit` | Scripts PHP (`api-lead-v1.2.php`), formulaires légers, intégration Sheets (`Code-v1.4.gs`). | Architecture réutilisée pour le CRM centralisé de SYNTESIA. |
| **Journalisation Audit SHA-256** | `LAB` (`AUDIT LOGGER`) | Mécanisme de consignation d'audit déterministe cryptographiquement chaîné. | Utilisé pour le contrôle de non-régression et d'anti-gaming. |
| **Protocole de Bienséance & Horaires** | `WORKSTATION-IA` (Transversal) | Module Python de filtrage horaire (`communication_gate.py`). | Contrôle systématique avant tout envoi commercial dans SYNTESIA. |

---

## 2. COMPÉTENCES MÉTIERS DU FONDATEUR CAPITALISÉES

1. **Compétence Réglementaire & Sécurité Privée :** Maîtrise pointue du CSI Livre VI, des audits CNAPS et de la convention IDCC 1351.
2. **Compétence BTP & Artisans :** Compréhension des cycles de devis, des chantiers et du besoin d'acompte rapide sans friction administrative.
3. **Compétence CHR (Hôtellerie / Restauration) :** Gestion de centres de profit, ratios de rentabilité, gestion des avis TrustYou/OTA, encadrement de personnel polyvalent.
4. **Compétence Ingénierie & Systèmes :** Architecture d'agents autonomes, gouvernance lean, automatisation sans surcoût logiciel.

---

## 3. HISTORIQUE STRATÉGIQUE & ARBITRAGES CLÉS DU FONDATEUR

| Date | ID Décision | Projet | Arbitrage Fondateur Verrouillé |
| :--- | :--- | :--- | :--- |
| **14/11/2026** | `WS-2026-000` | WORKSTATION-IA | Règle Lean : 0 daemon en arrière-plan, séparation stricte PC `C:\` vs Drive `H:\`. |
| **14/11/2026** | `WS-2026-005` | RELANCE-DEVIS | Règle du « Zéro Code » : pas de développement lourd sans paiements réels encaissés. |
| **14/11/2026** | `WS-2026-005-REV1`| RELANCE-DEVIS | Acquisition 100 % entrante (zéro prospection sortante à froid imposée au dirigeant). |
| **15/11/2026** | `LAB-ARCH-001` | LAB NIVEAU 2 | Architecture C retenue : noyau souverain indépendant (< 80 Mo de RAM). |
| **16/11/2026** | `WS-2026-008` | OMNISECUR | Parité conventionnelle IDCC 1351 validée, correctifs de sécurité Stripe intégrés. |
| **20/11/2026** | `AGIA-001/002` | SYNTESIA | Fondation de l'agence IA sous régime F1 (0,00 €) et vérité comptable absolue. |
| **21/11/2026** | `SYNTESIA-VERT`| SYNTESIA | Marque SYNTESIA, priorité France, 2 verticales d'égale priorité (Sécurité et BTP). |

---

## 4. RAPPORT DES DOCUMENTS MANQUANTS ET INFORMATIONS NON VÉRIFIÉES

Conformément à la rigueur épistémique de WORKSTATION-IA, les éléments suivants sont identifiés comme **non vérifiés ou en attente documentaire** :

1. **OMNIPATRIMOINE :** Aucun document technique ou code source actif n'est présent dans le dossier `FUTURS_PROJETS` (seul le cadrage conceptuel N3 existe).
2. **Kbis & Documents Juridiques E-commerce :** Le Kbis de `NAIT STORE` mentionné dans `TODO-FOUNDER.md` d'AMBRESSENCE n'est pas consultable sur Drive.
3. **Statut d'aboutissement de la reprise B&B Douai :** Le dossier de candidature date de mai 2026. L'issue formelle de la reprise (accord, report ou nouvelle opportunité) n'est pas consignée dans le Drive.
4. **Environnement Paseo :** L'outil Paseo est documenté dans `PROMPT_PASEO.md` mais son exécution directe n'est pas active sur la VM Cloud sandbox.
