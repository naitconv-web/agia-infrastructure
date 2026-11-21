# INVENTAIRE INFRASTRUCTURE O2SWITCH — FAITS VÉRIFIÉS VS NON VÉRIFIÉS (AGIA-013)

**Date :** 2026-11-21  
**Principe strict :** Distinction entre faits **confirmés dans le dépôt**, **spécifications publiques o2switch vérifiées**, et **métriques spécifiques au compte** (`IMPOSSIBLE À VÉRIFIER FAUTE D'ACCÈS`).

| Catégorie | Élément | Valeur / État | Statut de vérification |
| :--- | :--- | :--- | :--- |
| **Facturation / Contrat** | Hébergeur | `o2switch SAS` | `CONFIRMÉ PAR SOURCE` (`PROJET_05` / `PROJET_06`) |
| **Facturation / Contrat** | Date & montant souscription | `2026-10-25` — `22,76 € TTC` (`ambressence.com`) | `CONFIRMÉ PAR SOURCE` |
| **Compte client** | Formule exacte (Grow / Cloud / Pro) | Non lisible sans accès espace client | `IMPOSSIBLE À VÉRIFIER FAUTE D'ACCÈS` |
| **Compte client** | Usage disque / inodes / bande passante | Non lisible sans accès cPanel | `IMPOSSIBLE À VÉRIFIER FAUTE D'ACCÈS` |
| **Compte client** | Domaines, sous-domaines, lunes actives | Non lisible sans accès cPanel | `IMPOSSIBLE À VÉRIFIER FAUTE D'ACCÈS` |
| **Compte client** | État réel `ambressence.com` | Staging / prod non inspecté | `DÉCLARÉ MAIS NON VÉRIFIÉ` |
| **Plateforme o2switch** | Panneau d'administration | cPanel | `SPÉCIFICATION PUBLIQUE VÉRIFIÉE` |
| **Plateforme o2switch** | Runtimes supportés | PHP (multi-versions), Node.js (Phusion Passenger), Python (Passenger), Ruby | `SPÉCIFICATION PUBLIQUE VÉRIFIÉE` |
| **Plateforme o2switch** | Bases de données | MySQL (`phpMyAdmin`), PostgreSQL (`phpPgAdmin`) | `SPÉCIFICATION PUBLIQUE VÉRIFIÉE` |
| **Plateforme o2switch** | Accès & automatisation | SSH (`ssh user@server.o2switch.net`), Cron jobs | `SPÉCIFICATION PUBLIQUE VÉRIFIÉE` |
| **Plateforme o2switch** | Sécurité & résilience | SSL Let's Encrypt gratuit, sauvegardes quotidiennes, stockage NVMe | `SPÉCIFICATION PUBLIQUE VÉRIFIÉE` |
| **Plateforme o2switch** | Limites mutualisées | Pas de Docker ; Node/Python via Passenger soumis aux limites CPU/RAM/I-O (16/42/84 Mo/s selon offre) | `SPÉCIFICATION PUBLIQUE VÉRIFIÉE` |
