# FICHE RESSOURCE 05 — MOTEUR UNIVERSEL DE LEADS B2B & SNIPER BOAMP/DECP v2.0

- **Identifiant bibliothèque :** `R-05`
- **Origine :** Actif interne WORKSTATION-IA (`WORKSTATION-IA/_KNOWLEDGE_BASE/OUTILS/moteur-leads-universel-v2.mjs` ID `1E15LyX_jTwPJmJlX49XcDTT8iNyK2DA3`, 50,8 Ko, et version v1 `1jvROYhXshXE_JpMomFJd32njWTrFIaqP`)
- **Licence :** Propriétaire Interne Fondateur / WORKSTATION-IA
- **Statut dans SYNTESIA :** **`testé` & `retenu`** (`6/6` tests unitaires validés lors de la mission `WS-2026-000-REV2` du 16 novembre 2026).

---

## 1. FONCTIONNALITÉS RÉELLES VÉRIFIÉES DANS LE CODE SOURCE

Ce script Node.js autonome (**zéro dépendance `npm` externe**, exécution directe via `node moteur-leads-universel-v2.mjs`) interroge trois sources Open Data officielles de l'État français et un module d'enrichissement éthique :
1. **API Recherche d'Entreprises (`https://recherche-entreprises.api.gouv.fr/search`) :**
   - Filtrage par codes NAF/APE, départements (ex. `81,31,34,30,11,12,82,66`), tranches d'effectifs salariés (ciblage strict PME/TPE employeurs `--pme-only=1`).
2. **API Open Data BOAMP (`boamp-datadila.opendatasoft.com`) :**
   - Détection des avis d'appels d'offres publics ouverts en sécurité privée, gardiennage, bâtiment, travaux publics ou nettoyage.
3. **API Open Data DECP v3 (`data.economie.gouv.fr`) :**
   - Identification des marchés publics attribués (titulaires, montants, acheteurs) permettant d'identifier les PME actives ayant des besoins de conformité ou de sous-traitance.
4. **Module d'enrichissement légal B2B (`--mode=enrich`) :**
   - Respect strict du fichier `robots.txt` des sites web d'entreprises, extraction uniquement des adresses e-mail professionnelles génériques de contact B2B (conformité Art. L.34-5 du CPCE et `CHARTE.md` §3 : zéro donnée personnelle privée sur Drive).

---

## 2. CAPITALISATION POUR LE CATALOGUE SECTORIEL SYNTESIA (AGIA-005)

Le moteur contient déjà les profils `SECURITE_PRIVEE` (`80.10Z`, `80.20Z`), `PRESCRIPTEURS_SECURITE` (`85.59A`, `66.22Z`, `69.20Z`) et `BTP_RENOVATION`. Il peut être paramétré à **0,00 €** sur tous les codes NAF du catalogue sectoriel AGIA-005 :
- **HCR Hôtellerie :** `55.10Z` (Hôtels et hébergement similaire).
- **Nettoyage & Propreté :** `81.21Z` (Nettoyage courant des bâtiments) & `81.22Z` (Nettoyage industriel).
- **Transport Routier (TRM) :** `49.41A` / `49.41B` (Transports routiers de fret interurbains / de proximité).
- **Architecture & BET :** `71.11Z` (Activités d'architecture) & `71.12B` (Ingénierie, études techniques).
- **Immobilier ADB / Syndics :** `68.32A` (Administration d'immeubles et autres biens immobiliers).
- **Services à la Personne (SAP) :** `88.10A` (Aide à domicile).
- **Cabinets CGP :** `66.22Z` / `66.19B` / `70.22Z`.

> **Règle d'or d'utilisation :** Ce moteur sert à la veille de marché, au ciblage publicitaire et à l'analyse d'opportunités (BOAMP/DECP). Conformément à la décision fondatrice `WS-2026-005-REV1` et à la `DIRECTIVE_GLOBALE_COMPORTEMENT_ET_BIENSEANCE.md`, **aucun envoi de prospection froide automatisée** n'est déclenché sans validation explicite du fondateur et contrôle par `scripts/communication_gate.py`.
