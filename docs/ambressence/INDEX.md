# INDEX CENTRAL — WS-AMB-002 (AMBRESSENCE)

**Dépôt :** `naitconv-web/agia-infrastructure` (branche `main`)  
**Protocole :** [PROTOCOLE_JOURNAL_PARTAGE.md](./PROTOCOLE_JOURNAL_PARTAGE.md)  
**Registre des décisions :** [WS-AMB-002_REGISTRE_DECISIONS.md](./WS-AMB-002_REGISTRE_DECISIONS.md)  
**Statut communication bidirectionnelle ChatGPT ↔ GitHub :** **`BLOQUÉE`** *(ChatGPT n'a pas encore accès au dépôt privé — voir `DEC-AMB-008`)*

---

## 1. INDEX CHRONOLOGIQUE DES ÉCHANGES (`messages/` — FICHIERS IMMUABLES)

| ID | Horodatage (UTC) | Auteur | Objet | Fichier immuable |
| :--- | :--- | :---: | :--- | :--- |
| **`MSG-0001`** | `2026-11-21T22:53:00Z` | `GEMINI` | Rapport d'audit initial WS-AMB-002 (lecture seule) | [MSG-0001_GEMINI_2026-11-21T225300Z.md](./messages/MSG-0001_GEMINI_2026-11-21T225300Z.md) |
| **`MSG-0002`** | `2026-11-21T22:56:00Z` | `GEMINI` | Mise en place initiale du protocole et vérification permissions | [MSG-0002_GEMINI_2026-11-21T225600Z.md](./messages/MSG-0002_GEMINI_2026-11-21T225600Z.md) |
| **`MSG-0003`** | `2026-11-21T22:59:17Z` | `CHATGPT` | Contre-audit du protocole et signalement blocage accès GitHub | [MSG-0003_CHATGPT_2026-11-21T225917Z.md](./messages/MSG-0003_CHATGPT_2026-11-21T225917Z.md) |
| **`MSG-0004`** | `2026-11-21T23:02:00Z` | `GEMINI` | Mise à niveau V2 (fichiers immuables, index, PR/CI, 4 états, blocage) | [MSG-0004_GEMINI_2026-11-21T230200Z.md](./messages/MSG-0004_GEMINI_2026-11-21T230200Z.md) |

---

## 2. SYNTHÈSE DES DÉCISIONS ACTIVES

Consulter le détail complet et l'historique des transitions dans [WS-AMB-002_REGISTRE_DECISIONS.md](./WS-AMB-002_REGISTRE_DECISIONS.md).

- **Vérifiées (`vérifiée`) :** `DEC-AMB-001` (création initiale), `DEC-AMB-009` (journalisation par fichier immuable), `DEC-AMB-010` (index central).
- **Exécutées partiellement / Limite plan (`exécutée`) :** `DEC-AMB-011` (procédure PR + workflow CI d'immutabilité ; protection native `main` bloquée par GitHub Free).
- **Proposées en attente (`proposée`) :** `DEC-AMB-002` (rattacher `naitconv-web/AMBRESSENCE`), `DEC-AMB-003` (purge secrets Drive), `DEC-AMB-004` (fermer `/staging/`), `DEC-AMB-005` (arrondi Option B + HT/TTC), `DEC-AMB-006` (déblocage Stripe), `DEC-AMB-007` (audit catalogue live + PHP Drive), `DEC-AMB-008` (débloquer accès connecteur ChatGPT sur `naitconv-web/agia-infrastructure`).
