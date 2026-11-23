# RAPPORT DE CONTRÔLE PHASE 1 — `AMBRESSENCE BRAIN` (`WS-AMB-BRAIN-001`)

**Date du contrôle :** `2026-11-23` · **Statut Phase 2 :** **`NON, EN ATTENTE`** (jusqu'à validation PDG du présent contrôle)  
**Règle appliquée :** *Aucune fonctionnalité présentée comme opérationnelle sans preuve d'exécution réelle.*

---

## 1. VÉRIFICATION DES `10` AGENT SKILLS VS LES `10` GEMS ORIGINAUX
- **Méthode :** Vérification programmatique directe de chaque fichier `skills/ambressence/*/SKILL.md` par rapport aux sources originales téléchargées depuis Google Drive (`PROJETS/AMBRESSENCE/gems-et-architecture-ai/gems/1..10` et `05-consignes-communes-gems.md`).
- **Résultat :** **`10 / 10` (`SKILLS_VS_GEMS_MATCH: 10/10 exact match PASS`)**.
  - Chaque `SKILL.md` contient exactement le bloc commun de la Maison (`05-consignes-communes-gems.md`) + le texte intégral du Gem original, sans modification des Gems sur Drive (`original_gems_untouched: true`).
- **Limite identifiée :** Les fichiers sources `05-consignes-communes-gems.md` et `1..10` datés du `07/11/2026` contiennent encore la mention obsolète *« 100 références publiées »*. Le cadrage unifié [CADRAGE_UNIQUE_AMBRESSENCE.md](file:///home/antigravity/naitconv-web/agia-infrastructure/docs/ambressence/CADRAGE_UNIQUE_AMBRESSENCE.md) corrige ce point en tête de chaque Skill, mais une session humaine dans AI Studio reste nécessaire si vous souhaitez aussi rattacher ce cadrage à jour dans l'app Gemini.

---

## 2. EXÉCUTION DES `10` TESTS `PROMPTFOO` (`tests/promptfoo/ambressence-gems.yaml`)
- **Validation structurelle :** **`PASS` (`PROMPTFOO_YAML_VALID: 10 prompts, 10 tests`)** — YAML valide, les `10` fichiers `SKILL.md` ciblés existent, les `10` cas de test (`TEST + ATTENDU` de `06-revue-gems-et-tests.md`) et leurs assertions sont complets.
- **Exécution réelle contre un modèle LLM :** **`NON EXÉCUTÉE (BLOQUÉE À 0 € DANS LA VM)`**.
  - **Preuve & cause exacte :** `promptfoo` n'est pas installé dans la VM (`which promptfoo -> not_installed`) et **aucune clé API LLM** (`GEMINI_API_KEY`, `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `MISTRAL_API_KEY`) n'est présente dans l'environnement. Conformément à l'interdiction de dépense et d'installation, aucun appel payant n'a été tenté.
  - **Action possible à `0 €` (sur autorisation) :** Exécuter `npx promptfoo eval` sur votre poste local (via Ollama gratuit ou votre quota gratuit Google AI Studio).

---

## 3. VÉRIFICATION SOURCE, DATE & EXACTITUDE DES CHIFFRES (`2 552` ET `153`)
- **Sources primaires vérifiées dans le dépôt :**
  - [WS-AMBRESSENCE-EMERGENCY-LAUNCH-001_RAPPORT_FINAL.md](file:///home/antigravity/naitconv-web/agia-infrastructure/docs/ambressence/WS-AMBRESSENCE-EMERGENCY-LAUNCH-001_RAPPORT_FINAL.md#L12-L19)
  - [WS-AMB-002_REGISTRE_DECISIONS.md](file:///home/antigravity/naitconv-web/agia-infrastructure/docs/ambressence/WS-AMB-002_REGISTRE_DECISIONS.md#L16-L39) (`DEC-AMB-005` & `DEC-AMB-012`)
- **Date exacte de la mesure live :** **`2026-11-21T23:44:00Z`** (contrôle en direct sur l'API Store WooCommerce `https://ambressence.com/wp-json/wc/store/v1/products`).
- **Exactitude vérifiée :**
  - **`2 552` parfums publiés :** Exact (`0` sans photo, `0` sans description, `0` `< 12,00 €`, `0` titre espagnol résiduel, `0` produit test).
  - **`153` produits en réserve (`draft`) :** Exact (`2` tests `Dior Sauvage` IDs `12–13`, `43` sans image, `99` sous `12,00 €`, `18` non-parfums — la somme brute fait `162` car `9` fiches cumulent deux critères, soit `153` produits uniques mis en brouillon).

---

## 4. USAGES PRÉCIS JUSTIFIANT `SQLite FTS5` ET `MCP` (PHASE 2)
Avant d'autoriser la Phase 2, voici les **3 seuls usages concrets** qui justifient réellement `SQLite FTS5` + `MCP` sur AMBRESSENCE (et évitent de charger `2 552` fiches dans le prompt d'un agent) :
1. **Recherche catalogue instantanée & fiable (`SQLite FTS5`) :** Permettre au Conseiller Parfum ou au Rédacteur (`Gem 1 / 10`) de trouver en `< 10 ms` les parfums exacts par marque, concentration (`EDP/EDT`), contenance (`ml`), famille olfactive et prix réel parmi les `2 552` références, sans halluciner de produit inexistant.
2. **Calcul déterministe de marge & pricing (`SQLite` + `MCP` lecture seule) :** Permettre aux Gems Finance/Pricing (`Gem 3 / 5 / 6`) de requêter exactement le coût fournisseur BTS, la TVA `20 %` et le seuil port offert `60 €` sur n'importe quel SKU sans erreur de calcul LLM.
3. **Accès unifié multi-environnements (`MCP`) :** Exposer ces mêmes données vérifiées en lecture seule à **Antigravity**, **Paseo/OpenCode** et **Claude/Gemini** sans dupliquer les exports CSV.

---

## 5. BILAN & LIMITES DE LA PHASE 1
- **Acquis prouvés :** Source de vérité chiffrée (`2 552` / `153`), `10/10` Skills fidèles aux Gems originaux, suite `Promptfoo` prête.
- **Limites actuelles :** Les `10` tests `Promptfoo` ne sont pas encore exécutés en live contre un LLM ; les données WooCommerce (`2 552`) ne sont pas encore reliées en temps réel (snapshot statique au `21/11/2026`).
