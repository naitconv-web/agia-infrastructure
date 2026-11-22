# WS-AMB-002 — AUDIT & INTÉGRATION DES DÉPÔTS GITHUB DU DRIVE POUR `AMBRESSENCE.COM`

**Date (UTC) :** `2026-11-22T02:02:00Z`  
**Sources vérifiées :** Google Drive (`WORKSTATION-IA/_KNOWLEDGE_BASE/REFERENCES/Dépôts Github varié`) & [INDEX_ET_GOUVERNANCE.md](../bibliotheque_technologique/INDEX_ET_GOUVERNANCE.md).

---

## 1. CLASSEMENT COMPLET DES DÉPÔTS GITHUB TROUVÉS DANS LE DRIVE

### A. Pertinents et intégrables immédiatement (`0 €` — sans serveur externe)
1. **`https://styles.refero.design/` (Refero Styles — `R-01`) :**
   - *Apport pour AMBRESSENCE :* Référence structurante pour `DESIGN.md` (hiérarchie visuelle, palettes, règles composants).
   - *Statut :* **`INTÉGRÉ`** (`docs/ambressence/DESIGN.md`).
2. **`https://github.com/every-app/open-seo` (OpenSEO — MIT, `L-09`) :**
   - *Apport pour AMBRESSENCE :* Règles d'audit SEO technique e-commerce (1 seul `H1`, Rich Snippets `Schema.org`, balises sociales **OpenGraph `Product`** pour WhatsApp / Instagram / Facebook).
   - *Statut :* **`INTÉGRÉ`** (balises `og:type`, `og:title`, `og:description`, `og:image`, `product:price:amount` injectées dynamiquement sur toutes les fiches `/produit/*` via `Snippet 17`).
3. **`https://github.com/msitarzewski/agency-agents` (The Agency — MIT, `R-03`) :**
   - *Apport pour AMBRESSENCE :* Grilles de rôles spécialisés (CRO, SEO, QA) exploitées pour structurer les audits du site.
   - *Statut :* **`INTÉGRÉ (méthodologie)`**.

### B. Pertinents en Phase 2 (après ouverture commerciale / nécessite VPS externe)
4. **`https://github.com/chatwoot/chatwoot` (Chatwoot — MIT, `L-08`) :** Support client omnicanal (Web + WhatsApp Business + Instagram). Incompatible hébergement mutualisé PHP o2switch (requiert Rails + PostgreSQL + Redis sur VPS). **`MIS EN RÉSERVE PHASE 2`**.
5. **`https://github.com/heygen-com/hyperframes` (HyperFrames — Apache-2.0, `L-06`) :** Génération de vidéos motion graphics produits pour Meta/TikTok Ads dès ouverture du budget pub. **`MIS EN RÉSERVE PHASE 2`**.
6. **`https://github.com/n8n-io/n8n` (`L-04`) :** Orchestration workflows (relances paniers abandonnés, alertes commandes). Incompatible mutualisé o2switch (Node/Docker requis) ; remplacé à `0 €` par WooCommerce + Brevo + scripts Python. **`MIS EN RÉSERVE PHASE 2`**.

### C. Écartés pour `AMBRESSENCE.COM` (non pertinents ou incompatibles)
- `bytedance/UI-TARS-desktop` (dépôt archivé), `jaredrhod/fullstack-agent` (`AGPL-3.0`, pile lourde), `FareedKhan-dev/kimi-k3-in-c` (inférence C99), `AiSecurityServices/freellmapi` (risque RGPD sur données clients), `MultiX0/last-archive` (Docker RAG), `topoteretes/cognee` (GraphRAG pour LAB CORE), `elder-plinius/obliteratus` (hors sujet), `morluto/rea` & `Egonex-AI/Understand-Anything` (audit de code), `anomalyco/opencode` / `OpenManus` / `1jehuang/jcode` / `affaan-m/ECC` (assistants dev redondants), `Open-Generative-AI` / `VoiceStudio` / `AppFlowy` / `OpenWhispr` / `Cap` / `PasteBarApp` (hors boutique / doublons / GPU local).
