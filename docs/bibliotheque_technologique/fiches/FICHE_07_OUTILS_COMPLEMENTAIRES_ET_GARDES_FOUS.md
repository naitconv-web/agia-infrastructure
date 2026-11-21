# FICHE RESSOURCE 07 — OUTILS COMPLÉMENTAIRES, BRIQUES MÉTIERS & RESSOURCES ÉCARTÉES

- **Identifiants bibliothèque :** `R-06` à `R-12` & `L-02`, `L-04` à `L-15`
- **Origine :** Sélection et captures du Fondateur dans `WORKSTATION-IA/_KNOWLEDGE_BASE/REFERENCES/Dépôts Github interessant/`

---

## 1. BRIQUES OPEN-SOURCE RECOMMANDÉES POUR LES OFFRES SYNTESIA & LAB

### A. `Understand-Anything` (`Egonex-AI/Understand-Anything` — `L-02`)
- **Licence & Statut :** MIT · 93 513 stars · Actif (push 18/11/2026) · Statut : **`recommandé`**.
- **Usage SYNTESIA :** Génère un graphe de connaissance interactif à partir de n'importe quelle base de code. À utiliser lors d'audits techniques de reprise de code client ou pour documenter visuellement l'architecture d'`OMNISECUR` et de `LAB CORE`.

### B. `n8n` (`n8n-io/n8n` — `L-04`)
- **Licence & Statut :** Fair-code (Sustainable Use License) · 211 586 stars · Actif (push 21/11/2026) · Statut : **`recommandé`**.
- **Usage SYNTESIA :** Lorsqu'un client PME (Bâtiment, Transport, Hôtellerie, Nettoyage, Immobilier) souhaite une automatisation visuelle hébergée sur son propre serveur (VPS à 5 €/mois) qu'il peut superviser facilement. *Attention : en interne pour son propre CRM, SYNTESIA utilise Google Apps Script + scripts Python à 0 € sans dépendre d'un serveur n8n payant.*

### C. `Chatwoot` (`chatwoot/chatwoot` — `L-08`)
- **Licence & Statut :** MIT (Community Edition) · 40 287 stars · Actif (push 20/11/2026) · Statut : **`recommandé`**.
- **Usage SYNTESIA :** Boîte de réception client omnicanale auto-hébergeable (WhatsApp Business, Live-chat web, Email, Instagram). Brique idéale à commercialiser et intégrer pour les clients **SYNTESIA Algérie** (très forte demande WhatsApp), **Hôtellerie HCR** (conciergerie pré-séjour), **Immobilier ADB/Syndics** et pour le support client d'**AMBRESSENCE**.

### D. `OpenSEO` (`every-app/open-seo` — `L-09`)
- **Licence & Statut :** MIT · 28 511 stars · Actif (push 20/11/2026) · Statut : **`recommandé`**.
- **Usage SYNTESIA :** Alternative open-source gratuite à Semrush/Ahrefs pour l'audit SEO technique des sites **SYNTESIA France/Algérie**, de la boutique **AMBRESSENCE** et pour produire des pré-diagnostics de visibilité locale aux prospects PME.

### E. `Cap` (`CapSoftware/Cap` — `L-11`) & `HyperFrames` (`heygen-com/hyperframes` — `L-06`)
- **Licences & Statuts :** Open-source (25,3k stars) et Apache-2.0 (87,7k stars) · Actifs (push 21/11/2026) · Statut : **`recommandé`**.
- **Usage SYNTESIA :** `Cap` remplace Loom à 0 € pour envoyer aux dirigeants (Sécurité Privée, BTP, Hôtellerie) une courte vidéo personnalisée de 2 minutes montrant leur diagnostic ; `HyperFrames` permet de générer des vidéos motion graphics de présentation des offres à partir de la charte visuelle.

### F. `Awesome Opus 5.5 Videos` (`yihui-dev/awesome-opus5-5-videos` — `R-06`)
- **Licence & Statut :** MIT · 16 098 stars · Actif · Statut : **`étudié`**.
- **Note d'audit :** Ce dépôt était mentionné comme « URL incomplète à retrouver » dans `WORKSTATION-IA_REGISTRE_CENTRAL_DES_DEPOTS.docx` (§2). Son URL complète a été retrouvée dans le document `Dépôts Github varié` (`1gSBsqcKpnhGt6a15fEB-zMXaQgisa31BtaZJlIt0zV8`) et vérifiée via l'API GitHub. Utile comme banque d'exemples de prompts d'animations UI.

---

## 2. RESSOURCES ÉTUDIÉES MAIS ÉCARTÉES POUR LA PRODUCTION B2B (AVEC JUSTIFICATION)

| Ressource | URL | Motif technique, matériel ou réglementaire d'exclusion en production | Statut |
| :--- | :--- | :--- | :--- |
| **`UI-TARS-desktop` (`R-08`)** | `github.com/bytedance/UI-TARS-desktop` | **Dépôt officiellement ARCHIVÉ (`archived: true`)** par ByteDance (vérifié via API GitHub le 21/11/2026) + trop gourmand en mémoire pour un PC 8 Go RAM. | **`écarté`** |
| **`freellmapi` (`R-07`)** | `github.com/tashfeenahmed/freellmapi` | Agrège 87 fournisseurs gratuits tiers sans garantie de confidentialité ni DPA RGPD. La documentation précise explicitement *"Personal experimentation only"*. **Interdit sur toute donnée client ou code propriétaire.** | **`écarté` en prod** *(Autorisé uniquement en bac à sable anonyme)* |
| **`kimi-k3-in-c` (`R-09`)** | `github.com/FareedKhan-dev/kimi-k3-in-c` | Prouesse technique en C99, mais exige **8,24 Go de RAM libres uniquement pour le modèle** (impossible sur un PC Windows 11 de 8 Go de RAM totale) et débit tokens/sec trop lent pour un usage opérationnel. | **`écarté` sur PC 8 Go** |
| **`fullstack-agent` (`R-10`)** | `github.com/jaredrhod/fullstack-agent` | Licence **AGPL-3.0** + installe un monolithe multi-services contraire à l'architecture **Lean v1.0 / Architecture C (< 80 Mo RAM)**. | **`écarté`** |
| **`obliteratus` (`R-11`)** | `github.com/elder-plinius/obliteratus` | Licence **AGPL-3.0** · Outil d'altération des poids de modèles (*abliteration*). Contraire aux exigences de fiabilité, de conformité et de bienséance des missions B2B SYNTESIA. | **`écarté`** |
| **`Open-Generative-AI` (`L-14`)** | `github.com/Anil-matcha/Open-Generative-AI` | Fait doublon avec **Google Flow & Gemini Multimedia** déjà payés et accessibles dans l'abonnement **Google AI Pro** du fondateur. | **`écarté` (Doublon)** |
