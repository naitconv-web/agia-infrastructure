# MATRICE DES RISQUES MISE À JOUR — `WORKSTATION-IA` (`2026-11-23`)

| ID Risque | Domaine | Description exacte du risque | Gravité | Probabilité | État actuel | Action requise |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| **`RSK-01`** | **Sécurité Drive** | `2` comptes `writer` tiers/personnels ont accès en écriture à la racine `WORKSTATION-IA`, héritant sur `P0-SECRETS-A-ROTATION-ET-PURGE`. | **Critique** | **Élevée** | **Actif (Non modifié)** | `ACT-PDG-01` & `ACT-PDG-02` (rotation + restriction accès). |
| **`RSK-02`** | **Sources de vérité** | `12` anciens `AGENTS.md` présents sur Drive peuvent induire en erreur une IA qui ne passe pas par `agia-infrastructure`. | **Élevée** | **Moyenne** | **Identifié** | `ACT-PDG-03` (archivage réversible des copies Drive). |
| **`RSK-03`** | **Couverture externe** | ChatGPT Web et les `10` Gems AI Studio reçoivent la Charte de Franchise manuellement (`MANUEL`). | **Moyenne** | **Moyenne** | **Documenté (`WS-GOV-003`)** | Usage systématique des templates Drive / packs `BUS LEAN`. |
| **`RSK-04`** | **Visibilité multi-dépôts** | `5` dépôts privés (`AMBRESSENCE`, `omnisecur`, etc.) + PC local Paseo hors scope VM. | **Moyenne** | **Élevée** | **Actif** | `ACT-PDG-06` & `ACT-PDG-07` (rattachement progressif). |
| **`RSK-05`** | **Transparence financière** | Dépense réelle `RELANCE-DEVIS` (`150 €`) et coûts mensuels des abonnements IA non vérifiables ici. | **Faible / Moyenne** | **Élevée** | **Signalé `NON VÉRIFIÉ`** | `ACT-PDG-05` (confirmation PDG). |
| **`RSK-06`** | **Qualité LLM live** | `10` tests `Promptfoo` AMBRESSENCE et `8` scénarios `Promptfoo` Franchise non encore exécutés sur modèles externes à `0 €`. | **Moyenne** | **Moyenne** | **Prêts en YAML** | Exécution sur poste local/runner autorisé à `0 €`. |
