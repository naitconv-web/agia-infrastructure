# REGISTRE DES ACTIONS EN ATTENTE DU PDG (`WS-AUDIT-REMEDIATION-001`)

**Règle :** Aucune des actions ci-dessous n'a été exécutée de manière autonome. Elles requièrent votre décision explicite (`OUI / NON`).

| ID | Catégorie | Statut | Action préparée nécessitant votre autorisation | Impact si non traité |
| :--- | :--- | :---: | :--- | :--- |
| **`ACT-PDG-01`** | **Sécurité (`P0`)** | **`BLOQUÉ`** | **Régénérer les 3 secrets exposés** dans `P0-SECRETS-A-ROTATION-ET-PURGE` (code secours 2FA Stripe, clé API Groq, clé Google Cloud/Vertex) puis autoriser la **purge définitive** du dossier Drive. | Secrets historiques exposés aux comptes partageant la racine. |
| **`ACT-PDG-02`** | **Sécurité (`P0`)** | **`BLOQUÉ`** | **Restreindre ou révoquer les droits `writer`** des comptes `nait.mohand3@gmail.com` et `zineb.bensaad1996@gmail.com` sur `WORKSTATION-IA/` (ou isoler les dossiers sensibles). | Tout `writer` à la racine peut lire/modifier les dossiers hérités. |
| **`ACT-PDG-03`** | **Sources de vérité** | **`PRÉPARATION`** | Autoriser le marquage comme **`[OBSOLÈTE]`** ou la mise en corbeille réversible des **`12` copies `AGENTS.md`** dispersées sur Google Drive (pour ne garder que `agia-infrastructure/AGENTS.md`). | Risque qu'un agent lise une ancienne consigne sans `preflight` ni Charte. |
| **`ACT-PDG-04`** | **Gouvernance Agents** | **`PRÉPARATION`** | Confirmer la réduction de l'équipe permanente à **`3–4` agents** (sans supprimer les comptes, en archivant les doublons `Gemini/Mistral` dans `REGISTRE-AGENTS.md`). | Complexité inutile et dispersion des notations. |
| **`ACT-PDG-05`** | **Économie** | **`BLOQUÉ`** | Communiquer les montants réels des **abonnements IA personnels** et les dépenses réelles sur le palier **`150 €` Meta Ads (`RELANCE-DEVIS`)**. | Budget consolidé partiellement `INCONNU`. |
| **`ACT-PDG-06`** | **Dépôts & Sauvegardes** | **`PRÉPARATION`** | Rattacher progressivement `AMBRESSENCE` et `omnisecur` à Antigravity (`DEC-12`) et autoriser le nettoyage de la branche locale résiduelle `ws-gh-access-001-report`. | Impossible de vérifier les branches/sauvegardes des 5 autres dépôts. |
| **`ACT-PDG-07`** | **Local Windows 11** | **`BLOQUÉ`** | Contrôler sur votre PC local les règles d'accès Paseo (`C:\Users\NAIT\`, `~/.vibe/.env`) et `C:\ambressence-infra\`. | Visibilité `NON VÉRIFIÉE` depuis le cloud. |
