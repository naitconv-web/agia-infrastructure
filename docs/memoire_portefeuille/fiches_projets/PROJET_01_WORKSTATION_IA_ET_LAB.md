# FICHE PROJET 01 — WORKSTATION-IA & LAB NIVEAU 2
**Date d'audit :** 21 novembre 2026  
**Statut :** SPÉCIFIÉ & AUDITÉ (Architecture C) — PRÊT À 75 % — EN ATTENTE DÉPÔT SOUVERAIN  
**Emplacement Drive :** `WORKSTATION-IA` (ID : `1YLmAB3t7QMBK6a4XA2G4kmogLr79BXbX`) & dossier `LAB-ARCH-001` (ID : `1SKhv8HQfSNrt5tRVMG2tiPprKc9CO0QC`)  

---

## 1. NATURE ET OBJECTIFS DU PROJET
- **Description :** Système d'orchestration hybride à noyau souverain indépendant (« Architecture C ») permettant de piloter des modèles d'IA multi-fournisseurs (Claude, Gemini, OpenAI, DeepSeek, Mistral) pour l'automatisation d'entreprises.
- **Modèle :** Infrastructure interne de productivité et de gouvernance multi-projets.
- **Contrainte maîtresse :** Noyau ultra-léger (< 80 Mo de RAM), zéro daemon lourd, compatible PC portable 8 Go RAM ou micro-VPS.

## 2. HISTORIQUE & DÉCISIONS STRATÉGIQUES CONFIRMÉES
- `2026-11-14` (`WS-2026-000`) : Adoption de l'architecture Lean v1.0 (séparation stricte Code `C:\` vs Cerveau Drive `H:\`, 0 daemon/watcher, « Le dossier EST le statut »).
- `2026-11-15` (`LAB-ARCH-001`) : Audit complet validant l'Architecture C à 75 %, identification de 3 blocages P0 de sécurité sur Drive, obligation de créer `naitconv-web/lab-core`.
- `2026-11-16` (`WS-2026-000-REV3`) : Adoption du protocole **BUS LEAN v3.0** (packs anonymisés `GO<X>-PACK.zip`, 5 Shards autonomes `SHARD-*.md`, préflight checks déterministes).

## 3. ÉTAT RÉEL D'AVANCEMENT & ACTIFS RÉUTILISABLES
- **Composants spécifiés :** 10 briques obligatoires (Kernel, Bridge, Orchestrator Manager, Audit Logger SHA-256, Memory Engine, Secret Manager, Safe Execution Env, Policy Engine, Notifier, UI adapter).
- **Actifs réutilisables pour SYNTESIA :** Doctrine de gouvernance (`CHARTE.md`), protocole de bienséance (`DIRECTIVE_GLOBALE_COMPORTEMENT_BIENSEANCE_PROFESSIONNALISME.md`), scripts de vérification déterministes.

## 4. RISQUES & DÉPENDANCES
- **Risque de saturation mémoire :** Le PC hôte 8 Go RAM ne supporte aucun LLM local lourd (Ollama prohibé).
- **Dépendance :** Nécessité d'un token GitHub dédié non lié à une session d'agent tierce pour `lab-core`.
