# FICHE RESSOURCE 01 — REFERO STYLES (`styles.refero.design`)

- **Identifiant bibliothèque :** `R-01`
- **Origine :** Sélection directe du Fondateur (`WORKSTATION-IA/_KNOWLEDGE_BASE/REFERENCES/Dépôts Github interessant/Divers/Document sans titre` ID `1Kei5e8nwUrQpOsoponoN4S5teAzVuE4fnqSxuyExWkY` & `WORKSTATION-IA_REGISTRE_CENTRAL_DES_DEPOTS.docx` ID `1sa-f32LvnZRyNM4IJjp3HwHtrPVtkjHj`)
- **URL canonique :** `https://styles.refero.design/` (et plateforme mère `https://refero.design/`)
- **Type :** Bibliothèque curatée de systèmes de design (`DESIGN.md`), tokens visuels, écrans et parcours utilisateurs pour agents IA.
- **Statut dans SYNTESIA :** **`retenu` & `intégré`** (Utilisé pour la refonte des sites SYNTESIA France & Algérie — Chantier 2 AGIA-006, et inscrit comme règle permanente de conception UI/UX).

---

## 1. FONCTIONNALITÉS RÉELLES & ARCHITECTURE `DESIGN.md`

Refero Styles résout le problème majeur du « look IA générique » (*AI UI slop*) en fournissant aux agents de programmation des **systèmes de design extraits de produits réels** (tels que *Antimetal*, *Linear*, *Cursor*, *ElevenLabs*, *Mercury*, *Stripe*, *Fathom Analytics*, *Attio*, *Retool*, *Modal*, *Vercel*).

Chaque fiche de style Refero structure **9 composantes déterministes** directement exploitables par un agent :
1. **North Star (Thèse visuelle) :** Résumé architectural d'une phrase définissant la personnalité de l'interface (ex. *« An editorial serif gives technical software an unusually literary, assured presence, while tiny monospaced markings and bracketed frames make it feel engineered »*).
2. **Thème & Schéma chromatique :** `light`, `dark` ou hybride (canevas papier clair ponctué de scènes techniques sombres).
3. **Palette de couleurs indexée par rôle exact (`Colors`) :** Chaque code hexadécimal est lié à une fonction stricte (fond de page, encre principale, encre secondaire 70 %, filet de séparation 10 %, repère d'équipement, bouton d'action primaire, annotation comparative).
4. **Échelle typographique complète (`Type Scale`) :** Police, taille en `px`, graisse (`weight`), hauteur de ligne (`line-height`), approche (`letter-spacing` / `tracking`) et police de substitution open-source (Google Fonts).
5. **Surfaces (`Surfaces`) :** Traitement des fonds (papier chaud, verre dépoli de navigation, fenêtre produit sur fond nuit, panneau encadré de repères d'angles).
6. **Composants (`Components`) :** Anatomie des boutons primaires/secondaires, cartes de recherche, puces de filtrage, accordéons FAQ et barres de navigation.
7. **Règles impératives (`Do`) :** Prescriptions chiffrées (largeur de gouttière, rayons de courbure, espacement vertical entre chapitres, usage du monospace).
8. **Interdictions strictes (`Don't`) :** Ce qui est banni pour préserver la discipline visuelle (ex. interdiction d'appliquer l'ombre lourde de la fenêtre produit à toutes les cartes, interdiction des dégradés néon génériques, interdiction de mélanger cartes arrondies 16px et panneaux carrés techniques).
9. **Méthodologie du *Reference Lock* :** Verrouillage écrit, avant la première ligne de code HTML/CSS, d'une référence primaire (fondation structurelle) et d'un ou deux détails empruntés à une référence secondaire, sans jamais « moyenner » les palettes ni copier les marques/logos propriétaires.

---

## 2. CONDITIONS D'UTILISATION, COÛT & COMPATIBILITÉ

- **Modèle économique :**
  - **Consultation web et utilisation des fichiers `DESIGN.md` :** **0,00 € (Gratuit).**
  - **Serveur MCP officiel live (`https://api.refero.design/mcp`) :** Requiert un abonnement payant Refero Pro/Team.
- **Arbitrage financier SYNTESIA (Régime F1 à 0,00 €) :** SYNTESIA exploite Refero **exclusivement en mode gratuit (`0,00 €`)** via ses spécifications `DESIGN.md` documentées et le verrouillage de direction artistique (*Reference Lock*), sans souscrire à l'abonnement MCP payant.
- **Respect de la propriété intellectuelle :** Conformément aux règles de l'art, seuls les principes d'architecture visuelle (proportions, contrastes, rythmes typographiques, structure des cadres) sont réutilisés, en créant une palette, une typographie et des contenus 100 % originaux pour SYNTESIA.

---

## 3. RÈGLE PERMANENTE D'UTILISATION DANS SYNTESIA

> **Directive permanente UI/UX :** Pour chaque futur projet ou démonstrateur de SYNTESIA et du LAB nécessitant une conception d'interface web ou une expérience utilisateur, l'agent responsable doit consulter les références Refero documentées dans la bibliothèque, établir un bloc de *Reference Lock* (Direction primaire + Tokens + Règles Do/Don't) et vérifier le rendu final contre ce verrou. Cette règle demeure une recommandation de qualité de conception et non une dépendance logicielle bloquante.
