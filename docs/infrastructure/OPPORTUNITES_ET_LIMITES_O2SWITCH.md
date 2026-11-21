# OPPORTUNITÉS ET LIMITES D'O2SWITCH POUR SYNTESIA (AGIA-013)

**Date :** 2026-11-21

## 1. Opportunités concrètes (à coût marginal `0,00 €`)
- **Hébergement immédiat de démonstrateurs commerciaux** sur un sous-domaine professionnel sécurisé en HTTPS (Let's Encrypt) pour les rendez-vous prospects.
- **Back-end léger PHP / MySQL / PostgreSQL** suffisant pour capturer des leads, stocker des diagnostics commerciaux ou servir un mini-portail client sans dépendre de Google Apps Script en unique point de défaillance.
- **Souveraineté et localisation France** (atout commercial direct pour les prospects PME françaises sensibles au RGPD).
- **Messagerie professionnelle et isolation** par sous-domaines / lunes selon la formule exacte du compte.

## 2. Limites techniques structurelles (hébergement mutualisé cPanel)
- **Pas de Docker / Kubernetes :** impossible d'y déployer des piles conteneurisées.
- **Phusion Passenger pour Node.js / Python :** adapté aux petites API ou scripts ponctuels, mais vulnérable aux redémarrages de workers, aux limites mémoire/CPU/I-O et aux timeouts sur les processus longs.
- **Pas de Redis / Sidekiq / daemons longue durée :** exclut `Chatwoot`, `n8n` v2.x en mode intensif, les files de jobs lourdes et les orchestrateurs d'agents IA persistants.
- **Risque de mélange des environnements :** ne pas mélanger les fichiers d'`ambressence.com` avec les futurs pilotes SYNTESIA dans un même répertoire `public_html`.

## 3. Comparaison économique de référence

| Scénario | Coût mensuel estimé | Cas d'usage couverts | Verdict |
| :--- | :--- | :--- | :--- |
| **o2switch déjà souscrit** | **`0,00 €` de surcoût** (déjà payé : 22,76 € TTC le 25/10/2026 ; renouvellement standard Pro ultérieur ~24 € HT/mois selon grille publique) | Démos HTML, sites vitrines, PHP/SQL, formulaires, crons légers, e-mail pro | **À exploiter en priorité** |
| **VPS Docker / Node dédié** | ~5 € à 20 € HT/mois supplémentaires | `n8n`, `Chatwoot`, workers persistants, agents 24/7 | **Différer** jusqu'au premier encaissement client le justifiant |
| **PaaS SSR (`Vercel` + `Supabase`)** | 0 € (tier gratuit prototype) puis ~20–25 $/mois/projet | Apps Next.js 15 SSR lourdes (`OMNISECUR`) | **Réserver** aux projets SSR dédiés |
