# DÉCISION GO / NO-GO — ECC ET JCODE (AGIA-013)

**Date :** 2026-11-21  
**Décision formelle :** **`NO-GO` sur l'installation d'ECC et de JCODE**

---

## 1. Décision par candidat

| Candidat | Décision | Justification factuelle |
| :--- | :--- | :--- |
| **`1jehuang/jcode`** *(non consigné dans les sources du projet)* | **NO-GO** | Binaire TUI terminal autonome en Rust (~475 Mo, ~35 crates) conçu pour remplacer un agent CLI local, non pour s'intégrer dans Antigravity. Incompatible avec le modèle d'exécution cloud `exebox` et sans valeur ajoutée sur la persistance Git/Drive. |
| **`affaan-m/ECC` (`ecc-universal`)** | **NO-GO (installation)** | Recouvrement > 80 % avec le Harness SYNTESIA déjà en place (`AGENTS.md`, `scripts/harness_ctl.py`, `REGISTRE_MEMOIRE.md`, skills Antigravity). L'installation complète (~64 Mo + paquets npm + configurations multi-IDE) ajouterait de la complexité et une consommation de tokens superflue. De plus, `ECC Pro` (19 $/siège/mois) contrevient au régime `F1_ZERO_EURO_AUTONOMOUS`. |

---

## 2. Règle appliquée

Conformément au cahier des charges **AGIA-013** :
> *« Si l'intégration n'apporte pas une amélioration démontrable par rapport au Harness actuel, ne rien installer. »*

- **Aucune installation** (`npm`, `cargo`, `curl | bash`, copie de dossiers `.cursor`/`.openclaw`) n'a été effectuée.
- Le Harness SYNTESIA existant (`scripts/harness_ctl.py` + `AGENTS.md` + `docs/harness/state/harness_memory.json`) reste l'unique standard actif.
- **Note d'inspiration future (sans installation) :** si un besoin d'audit statique de sécurité des fichiers de configuration agent émerge ultérieurement, le principe conceptuel de checklist statique d'`ecc-agentshield` pourra être examiné manuellement, sans importer le paquet npm.
