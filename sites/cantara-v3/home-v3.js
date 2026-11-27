/*
 * CANTARA V3 — Logique interactive de la vitrine institutionnelle (index.html) :
 * 1. Socle réutilisable CANTARA LAB (§6.3 & §6.4) :
 *    - Commandes Lecture (▶), Pause (⏸), Étape par étape (→), Simuler une exception (⚡), Réinitialiser (↺)
 *    - 6 Familles sectorielles interactives (§6.2 A à F) :
 *      * Famille F : Services professionnels & Orchestrateur Multi-Agents (Simulation locale)
 *      * Famille A : Sécurité privée — Planificateur de vacations & Marge contrat (SECURIAXE · Prototype / Simulation locale)
 *      * Famille B : BTP & Rénovation — Cockpit de chantier animé 6 jalons & Pièces (OMNIRENOV · Prototype / Simulation locale)
 *      * Famille C : Gestion patrimoniale — Cartographie pédagogique, Scénarios & Collecte (OMNIPATRIMOINE · En incubation)
 *      * Famille D : Commerce & Distribution — Cockpit Stock, Réapprovisionnement & Marge produit (Simulation locale)
 *      * Famille E : Hôtellerie & Restauration — Exploitation, Planificateur d'équipes & Réclamation (Simulation locale)
 * 2. Assistant d'orientation en 4 questions couplé aux 10 besoins du formulaire
 * 3. Formulaire de contact avec transmission serveur réelle (submitServerContact) et 4 états explicites (§2.2 & §7)
 */
(function () {
  'use strict';

  function init() {
    var M = window.CANTARA_MOTION;
    if (!M) return;

    var labPanel = document.getElementById('labPanel');
    var labAddress = document.getElementById('labAddress');
    var labStatusBadge = document.getElementById('labStatusBadge');
    var labTabs = Array.prototype.slice.call(document.querySelectorAll('.lab-tab[data-exp]'));

    var activeFam = 'famF';
    var simTimers = [];
    var prevHash = 'GENESIS';

    function clearSimTimers() {
      while (simTimers.length) {
        clearTimeout(simTimers.pop());
      }
    }

    function selectNeedAndScroll(needValue, sectorValue) {
      var needSelect = document.getElementById('cNeed');
      var sectorSelect = document.getElementById('cSector');
      if (needSelect && needValue) {
        for (var i = 0; i < needSelect.options.length; i++) {
          if (needSelect.options[i].value.toLowerCase().indexOf(needValue.toLowerCase()) !== -1) {
            needSelect.selectedIndex = i;
            break;
          }
        }
      }
      if (sectorSelect && sectorValue) {
        for (var j = 0; j < sectorSelect.options.length; j++) {
          if (sectorSelect.options[j].value.toLowerCase().indexOf(sectorValue.toLowerCase()) !== -1) {
            sectorSelect.selectedIndex = j;
            break;
          }
        }
      }
      var contactSec = document.getElementById('contact');
      if (contactSec && contactSec.scrollIntoView) {
        contactSec.scrollIntoView({ behavior: M.reduceMotion ? 'auto' : 'smooth' });
      }
    }

    /* ========================================================== */
    /* SOCLE RÉUTILISABLE DE SCÉNARIOS À ÉTAPES (§6.3 & §6.4)     */
    /* ========================================================== */
    var WORKFLOW_FAMILIES = {
      famF: {
        addr: 'cantara://lab/famille-f-services-orchestrateur-multi-agents',
        badgeCls: 'status-badge sim',
        badgeTxt: 'Simulation locale · Données fictives',
        title: 'Orchestrateur Multi-Agents & Traitement de Dossier / Factures',
        need: 'Orchestration multi-agents',
        sector: 'Services professionnels et fonctions support',
        ctaLabel: 'Étudier une orchestration ou automatisation documentaire →',
        scenarios: [
          {
            key: 'facture',
            label: 'Scénario 1 · Traitement de dossier & facture fournisseur',
            prompt: 'Dossier entrant DOS-2026-412 : Facture fournisseur (14 250 € HT) + bon de réception',
            beforeTxt: 'Contrôle manuel dispersé entre boîte mail, PDF et tableur (~22 min par dossier, risque d\'oubli d\'écart).',
            afterTxt: 'Chaîne de 5 agents spécialisés avec contrôle croisé et arbitrage humain en 15 secondes.',
            exceptionStep: 3,
            exceptionAlert: 'Exception détectée à l\'étape 4 : Écart de +850 € HT entre le bon de commande (13 400 €) et la facture reçue (14 250 €). Paiement bloqué en attente de décision humaine.',
            exceptionResolved: 'Exception traitée : Demande d\'avoir de 850 € générée et validée par le responsable financier ; reste à payer (13 400 €) autorisé.',
            steps: [
              {
                num: '1. Réception',
                name: 'Agent Collecteur & Classification',
                role: 'Réception, horodatage et typage documentaire',
                input: 'Pièces jointes PDF : Facture FAC-8841 et Bon de livraison BL-209.',
                rule: 'Vérification de lisibilité, classification par type de pièce et ouverture d\'un identifiant unique.',
                output: 'Dossier DOS-2026-412 indexé (2 pièces rattachées).'
              },
              {
                num: '2. Extraction',
                name: 'Agent Extraction Structurée',
                role: 'Lecture des montants, dates, références et lignes',
                input: 'Dossier indexé DOS-2026-412.',
                rule: 'Extraction déterministe des champs obligatoires (SIREN émetteur, HT, TVA, TTC, numéro de commande).',
                output: 'Champs extraits : Commande BC-104, Montant facturé 14 250 € HT.'
              },
              {
                num: '3. Contrôle croisé',
                name: 'Agent Vérificateur Métier',
                role: 'Rapprochement commande / réception / facture',
                input: 'Données extraites vs Référentiel des engagements.',
                rule: 'Tolérance d\'écart fixée à 0 € sans validation explicite d\'un responsable.',
                output: 'Rapprochement exécuté sur 12 lignes d\'articles.'
              },
              {
                num: '4. Exceptions',
                name: 'Agent Détection d\'Incertitudes',
                role: 'Identification des anomalies et préparation d\'arbitrage',
                input: 'Résultat du rapprochement inter-agents.',
                rule: 'Tout écart tarifaire ou pièce expirée suspend l\'automatisation et ouvre une fiche d\'exception.',
                output: 'Synthèse de conformité et fiche d\'arbitrage prêtes.'
              },
              {
                num: '5. Validation & Archivage',
                name: 'Sas Responsable & Journalisation',
                role: 'Validation humaine finale et archivage structuré',
                input: 'Dossier vérifié par les 4 agents amont.',
                rule: 'Aucun règlement ni écriture définitive sans clic explicite [OUI] / [NON] du responsable.',
                output: 'Dossier prêt pour décision finale et archivage horodaté.'
              }
            ]
          },
          {
            key: 'procedure',
            label: 'Scénario 2 · Analyse multi-agents d\'un cahier des charges',
            prompt: 'Dossier entrant AO-2026-118 : Cahier des charges prestation multi-sites (300 h Nuit)',
            beforeTxt: 'Lecture linéaire d\'un CCTP de 60 pages sous pression calendaire, risque d\'engagement sous le coût de revient.',
            afterTxt: 'Découpage coordonné entre agents d\'analyse, de règles sociales, de chiffrage et d\'audit.',
            exceptionStep: 3,
            exceptionAlert: 'Exception détectée à l\'étape 4 : Tarif cible client (23,00 €/h) inférieur au coût complet ADS Nuit (25,73 €/h avec 12 % de structure), soit -819 €/mois.',
            exceptionResolved: 'Exception traitée : Proposition tarifaire révisée au plancher conseillé de 28,59 €/h (marge 10 %) validée par la direction.',
            steps: [
              {
                num: '1. Réception',
                name: 'Collecteur & Qualification',
                role: 'Réception de la demande et inventaire des pièces',
                input: 'Cahier des charges : 300 h/mois Nuit, tarif cible client 23,00 €/h.',
                rule: 'Vérification de complétude des volumes horaires et des plages d\'intervention.',
                output: 'Dossier AO-2026-118 ouvert et qualifié.'
              },
              {
                num: '2. Analyse',
                name: 'Agent Analyste de Contraintes',
                role: 'Découpage en obligations légales et financières',
                input: 'Dossier AO-2026-118.',
                rule: 'Identification des règles applicables (repos quotidien ≥ 11 h, plancher 6 h Avenant n° 2 IDCC 1351).',
                output: 'Matrice de 6 contraintes opérationnelles générée.'
              },
              {
                num: '3. Attribution',
                name: 'Agent Conformité & Planning',
                role: 'Vérification des habilitations et temps de repos',
                input: 'Sous-tâche Planning & Habilitations.',
                rule: 'Contrôle strict : validité des titres jusqu\'à fin de poste et repos ≥ 11,0 h entre vacations.',
                output: 'Dimensionnement d\'équipe validé sans chevauchement.'
              },
              {
                num: '4. Chiffrage',
                name: 'Agent Financier & Bouclier',
                role: 'Calcul déterministe du coût de revient et du seuil',
                input: 'Coût base 22,97 €/h + 12 % structure = 25,73 €/h sur 300 h/mois.',
                rule: 'Formule : (23,00 - 25,73) × 300 h = -819 € / mois. Plancher (marge 10 %) = 28,59 €/h.',
                output: 'Écart financier (-819 €/mois) intercepté avant soumission.'
              },
              {
                num: '5. Restitution',
                name: 'Agent Auditeur & Sas Direction',
                role: 'Consolidation et soumission à la décision humaine',
                input: 'Rapports convergents des agents spécialisés.',
                rule: 'Validation humaine obligatoire avant toute émission d\'offre.',
                output: 'Synthèse décisionnelle prête dans le Sas dirigeant.'
              }
            ]
          }
        ]
      },
      famB: {
        addr: 'cantara://lab/famille-b-omnirenov-cockpit-chantier',
        badgeCls: 'status-badge proto',
        badgeTxt: 'Prototype · Simulation locale (Données fictives)',
        title: 'OMNIRENOV — Cockpit de Chantier Animé (6 jalons) & Suivi des Pièces',
        need: 'Outil métier sur mesure',
        sector: 'OMNIRENOV — BTP et rénovation',
        ctaLabel: 'Étudier un outil de suivi chantier ou relance devis →',
        moreHref: 'btp.html',
        moreLabel: 'Ouvrir le démonstrateur complet Omnirenov →',
        scenarios: [
          {
            key: 'chantier',
            label: 'Scénario 1 · Progression d\'un chantier en 6 jalons',
            prompt: 'Chantier CH-2026-148 : Isolation thermique & PAC (11 400 €) — Coordination & Pièces',
            beforeTxt: 'Suivi de chantier par messages épars : attestations sous-traitants oubliées et réserves non tracées.',
            afterTxt: 'Progression visuelle en 6 jalons avec contrôle documentaire et levée de réserves horodatée.',
            exceptionStep: 1,
            exceptionAlert: 'Exception simulée au jalon 2 (Approvisionnement & Pièces) : Attestation de vigilance URSSAF du sous-traitant arrivant à échéance avant la pose.',
            exceptionResolved: 'Exception résolue : Demande de pièce envoyée et attestation mise à jour rattachée au dossier chantier avant ouverture du jalon 3 (Exécution).',
            steps: [
              {
                num: '1. Préparation',
                name: 'Cadrage & Dossier Administratif',
                role: 'Validation du devis signé et contrôle des assurances',
                input: 'Devis DEV-148 (11 400 €) + Attestation Décennale.',
                rule: 'Vérification que l\'assurance Décennale couvre le lot technique sur toute la période.',
                output: 'Dossier technique validé, jalon Préparation franchi.'
              },
              {
                num: '2. Approvisionnement',
                name: 'Matériaux & Vigilance Intervenants',
                role: 'Synchronisation livraisons et attestations URSSAF',
                input: 'Commande isolants + PAC et dossier sous-traitant.',
                rule: 'Contrôle des dates de validité des attestations légales avant accès au chantier.',
                output: 'Matériaux réservés et pièces administratives contrôlées.'
              },
              {
                num: '3. Exécution',
                name: 'Intervention & Coordination des Lots',
                role: 'Suivi d\'avancement des équipes sur site',
                input: 'Planning d\'intervention équipes Isolation et Chauffage.',
                rule: 'Détection des dépendances entre lots pour éviter tout déplacement à vide.',
                output: 'Pose réalisée selon le phasage technique.'
              },
              {
                num: '4. Contrôle',
                name: 'Auto-contrôle & Points de Vigilance',
                role: 'Vérification technique avant convocation client',
                input: 'Grille de contrôle interne en 8 points.',
                rule: 'Tout point non validé génère une tâche corrective immédiate.',
                output: 'Contrôle technique préalable validé.'
              },
              {
                num: '5. Réception',
                name: 'Procès-Verbal de Réception',
                role: 'Constat contradictoire avec le maître d\'ouvrage',
                input: 'Compte rendu de visite de fin de travaux.',
                rule: 'Enregistrement structuré de la réception (avec ou sans réserve).',
                output: 'PV de réception préparé pour signature.'
              },
              {
                num: '6. Réserves & Clôture',
                name: 'Levée des Réserves & Solde',
                role: 'Validation finale et déclenchement de facturation',
                input: 'PV de réception et justificatifs de fin de chantier.',
                rule: 'Validation humaine du dirigeant avant émission de la facture de solde.',
                output: 'Chantier clôturé sans réserve en souffrance.'
              }
            ]
          }
        ]
      }
    };

    var wfState = {
      scIndex: 0,
      stepIdx: 4,
      selectedIdx: 0,
      playing: false,
      hasException: false,
      exceptionResolved: false,
      humanDecision: 'En attente de décision'
    };

    function resetWfState(famKey) {
      clearSimTimers();
      var fam = WORKFLOW_FAMILIES[famKey];
      var maxSteps = fam ? fam.scenarios[0].steps.length : 5;
      wfState.scIndex = 0;
      wfState.stepIdx = maxSteps - 1;
      wfState.selectedIdx = 0;
      wfState.playing = false;
      wfState.hasException = false;
      wfState.exceptionResolved = false;
      wfState.humanDecision = 'En attente de décision';
    }

    function playWorkflow(famKey) {
      clearSimTimers();
      var fam = WORKFLOW_FAMILIES[famKey];
      var sc = fam.scenarios[wfState.scIndex] || fam.scenarios[0];
      if (M.reduceMotion) {
        wfState.playing = false;
        wfState.stepIdx = sc.steps.length - 1;
        wfState.selectedIdx = sc.steps.length - 1;
        prevHash = M.hashDemo('PLAY-DONE-' + famKey, prevHash);
        renderWorkflowFamily(famKey);
        return;
      }
      wfState.playing = true;
      wfState.stepIdx = 0;
      wfState.selectedIdx = 0;
      renderWorkflowFamily(famKey);

      function tick() {
        if (!wfState.playing) return;
        if (wfState.stepIdx + 1 < sc.steps.length) {
          wfState.stepIdx += 1;
          wfState.selectedIdx = wfState.stepIdx;
          prevHash = M.hashDemo('STEP-' + (wfState.stepIdx + 1), prevHash);
          renderWorkflowFamily(famKey);
          simTimers.push(setTimeout(tick, 540));
        } else {
          wfState.playing = false;
          renderWorkflowFamily(famKey);
        }
      }
      simTimers.push(setTimeout(tick, 540));
    }

    function renderWorkflowFamily(famKey) {
      var fam = WORKFLOW_FAMILIES[famKey];
      var sc = fam.scenarios[wfState.scIndex] || fam.scenarios[0];
      var steps = sc.steps;
      var selStep = steps[wfState.selectedIdx] || steps[0];

      labAddress.textContent = fam.addr;
      labStatusBadge.className = fam.badgeCls;
      labStatusBadge.textContent = fam.badgeTxt;

      var scPillsHtml = fam.scenarios.length > 1
        ? '<div class="intent-pills" role="group" aria-label="Choisir un scénario">' +
            fam.scenarios.map(function (s, idx) {
              return '<button type="button" class="intent-pill' + (idx === wfState.scIndex ? ' active' : '') + '" data-wf-sc="' + idx + '">' +
                M.esc(s.label) +
              '</button>';
            }).join('') +
          '</div>'
        : '';

      var exceptionBanner = '';
      if (wfState.hasException) {
        exceptionBanner =
          '<div style="padding:.7rem .9rem;border-radius:8px;margin-bottom:1rem;border:1px solid ' + (wfState.exceptionResolved ? 'rgba(74,222,128,.55)' : 'var(--signal-err)') + ';background:' + (wfState.exceptionResolved ? 'rgba(74,222,128,.08)' : 'rgba(252,165,165,.1)') + ';font-size:.83rem;display:flex;justify-content:space-between;align-items:center;gap:.75rem;flex-wrap:wrap">' +
            '<span><strong style="color:' + (wfState.exceptionResolved ? 'var(--signal-ok)' : 'var(--signal-err)') + '">' +
              (wfState.exceptionResolved ? '[EXCEPTION RÉSOLUE] ' : '[EXCEPTION INTERCEPTÉE] ') +
            '</strong>' + M.esc(wfState.exceptionResolved ? sc.exceptionResolved : sc.exceptionAlert) + '</span>' +
            (!wfState.exceptionResolved
              ? '<button type="button" class="btn btn-primary btn-xs" id="btnResolveEx">Résoudre l\'exception [OUI]</button>'
              : '') +
          '</div>';
      }

      labPanel.innerHTML =
        '<div class="intent-bar">' +
          '<div class="intent-prompt">' +
            '<span class="mono" style="color:var(--signal)">[Dossier fictif]</span>' +
            '<span>' + M.esc(sc.prompt) + '</span>' +
          '</div>' +
          '<div class="lab-controls" role="group" aria-label="Commandes de la simulation">' +
            '<button type="button" class="btn btn-primary btn-xs" id="btnLabPlayPause">' +
              (wfState.playing ? 'Pause ⏸' : 'Lecture ▶') +
            '</button>' +
            '<button type="button" class="btn btn-ghost btn-xs" id="btnLabStep">Étape suivante →</button>' +
            '<button type="button" class="btn btn-ghost btn-xs" id="btnLabException">Simuler une exception ⚡</button>' +
            '<button type="button" class="btn btn-ghost btn-xs" id="btnLabReset">Réinitialiser ↺</button>' +
          '</div>' +
        '</div>' +
        scPillsHtml +
        exceptionBanner +
        '<div class="comet-canvas">' +
          '<div class="comet-card">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;gap:.5rem;flex-wrap:wrap">' +
              '<span class="mono">[CHRONOLOGIE INTERACTIVE · SÉLECTIONNEZ UNE ÉTAPE]</span>' +
              '<span class="mono" style="color:var(--signal)">Progression : ' + (wfState.stepIdx + 1) + ' / ' + steps.length + '</span>' +
            '</div>' +
            '<div class="agent-list" role="listbox" aria-label="Étapes et agents du scénario">' +
              steps.map(function (st, idx) {
                var isDone = idx < wfState.stepIdx || (idx === wfState.stepIdx && !wfState.playing);
                var isRunning = idx === wfState.stepIdx && wfState.playing;
                var isEx = wfState.hasException && !wfState.exceptionResolved && idx === sc.exceptionStep;
                var stateTxt = isEx ? 'Exception ⚡' : (isRunning ? 'En cours…' : (isDone ? 'Vérifié ✓' : 'En attente'));
                var cls = 'agent-node' +
                  (idx === wfState.selectedIdx ? ' selected' : '') +
                  (isEx ? ' exception' : (isDone ? ' done' : '')) +
                  (isRunning ? ' running' : '');
                return '<button type="button" class="' + cls + '" role="option" aria-selected="' + (idx === wfState.selectedIdx ? 'true' : 'false') + '" data-agent-idx="' + idx + '">' +
                  '<div style="display:flex;align-items:center;gap:.7rem;min-width:0">' +
                    '<span class="agent-step-badge">' + M.esc(st.num) + '</span>' +
                    '<div style="min-width:0">' +
                      '<span class="agent-title">' + M.esc(st.name) + '</span>' +
                      '<span class="agent-role">' + M.esc(st.role) + '</span>' +
                    '</div>' +
                  '</div>' +
                  '<span class="agent-state">' + M.esc(stateTxt) + '</span>' +
                '</button>';
              }).join('') +
            '</div>' +
            '<div class="before-after">' +
              '<div class="ba-before"><strong>Avant (Sans outil)</strong>' + M.esc(sc.beforeTxt) + '</div>' +
              '<div class="ba-after"><strong>Après (Ingénierie CANTARA)</strong>' + M.esc(sc.afterTxt) + '</div>' +
            '</div>' +
          '</div>' +

          '<div class="comet-card">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;gap:.5rem;flex-wrap:wrap">' +
              '<span class="mono">[INSPECTION DE L\'ÉTAPE &amp; VALIDATION HUMAINE]</span>' +
              '<span class="status-badge sim">' + M.esc(selStep.num) + '</span>' +
            '</div>' +
            '<h3 style="margin:.1rem 0 0;font-family:var(--serif);font-size:1.5rem;font-weight:400;color:var(--cream)">' +
              M.esc(selStep.name) +
            '</h3>' +
            '<ul class="comet-steps">' +
              '<li><b>[ENTRÉE]</b><span>' + M.esc(selStep.input) + '</span></li>' +
              '<li><b>[RÈGLE]</b><span>' + M.esc(selStep.rule) + '</span></li>' +
              '<li><b>[SORTIE]</b><span><strong>' + M.esc(selStep.output) + '</strong></span></li>' +
            '</ul>' +
            '<div style="display:flex;align-items:center;justify-content:space-between;gap:.5rem;flex-wrap:wrap;padding-top:.2rem">' +
              '<span class="mono">Décision du responsable : <strong style="color:var(--cream)">' + M.esc(wfState.humanDecision) + '</strong></span>' +
              '<div style="display:flex;gap:.45rem;flex-wrap:wrap">' +
                '<button type="button" class="btn btn-primary btn-xs" id="btnWfApprove">Approuver [OUI]</button>' +
                '<button type="button" class="btn btn-ghost btn-xs" id="btnWfReject">Écarter [NON]</button>' +
              '</div>' +
            '</div>' +
            '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.25rem">' +
              (fam.moreHref ? '<a href="' + M.esc(fam.moreHref) + '" class="btn btn-primary btn-sm">' + M.esc(fam.moreLabel) + '</a>' : '') +
              '<button type="button" class="btn ' + (fam.moreHref ? 'btn-ghost' : 'btn-primary') + ' btn-sm" id="btnWfCta">' + M.esc(fam.ctaLabel) + '</button>' +
            '</div>' +
            '<div class="comet-log">' +
              '<b>[JOURNAL · ' + M.esc(prevHash) + ']</b> Simulation locale sur données fictives (aucune action externe).' +
            '</div>' +
          '</div>' +
        '</div>';

      document.getElementById('btnLabPlayPause').addEventListener('click', function () {
        if (wfState.playing) {
          clearSimTimers();
          wfState.playing = false;
          renderWorkflowFamily(famKey);
        } else {
          playWorkflow(famKey);
        }
      });
      document.getElementById('btnLabStep').addEventListener('click', function () {
        clearSimTimers();
        wfState.playing = false;
        wfState.stepIdx = (wfState.stepIdx + 1) % steps.length;
        wfState.selectedIdx = wfState.stepIdx;
        prevHash = M.hashDemo('NEXT-STEP-' + (wfState.stepIdx + 1), prevHash);
        renderWorkflowFamily(famKey);
      });
      document.getElementById('btnLabException').addEventListener('click', function () {
        clearSimTimers();
        wfState.playing = false;
        wfState.hasException = true;
        wfState.exceptionResolved = false;
        wfState.selectedIdx = sc.exceptionStep;
        prevHash = M.hashDemo('EXCEPTION-TRIGGERED', prevHash);
        renderWorkflowFamily(famKey);
      });
      document.getElementById('btnLabReset').addEventListener('click', function () {
        resetWfState(famKey);
        prevHash = M.hashDemo('RESET-' + famKey, prevHash);
        renderWorkflowFamily(famKey);
      });
      var btnResEx = document.getElementById('btnResolveEx');
      if (btnResEx) {
        btnResEx.addEventListener('click', function () {
          wfState.exceptionResolved = true;
          wfState.humanDecision = 'Exception résolue & validée [OUI]';
          prevHash = M.hashDemo('EXCEPTION-RESOLVED', prevHash);
          renderWorkflowFamily(famKey);
        });
      }
      Array.prototype.slice.call(labPanel.querySelectorAll('[data-wf-sc]')).forEach(function (b) {
        b.addEventListener('click', function () {
          clearSimTimers();
          wfState.scIndex = Number(b.getAttribute('data-wf-sc')) || 0;
          var newSc = fam.scenarios[wfState.scIndex];
          wfState.stepIdx = newSc.steps.length - 1;
          wfState.selectedIdx = 0;
          wfState.playing = false;
          wfState.hasException = false;
          wfState.exceptionResolved = false;
          renderWorkflowFamily(famKey);
        });
      });
      Array.prototype.slice.call(labPanel.querySelectorAll('[data-agent-idx]')).forEach(function (node) {
        node.addEventListener('click', function () {
          wfState.selectedIdx = Number(node.getAttribute('data-agent-idx')) || 0;
          renderWorkflowFamily(famKey);
        });
      });
      document.getElementById('btnWfApprove').addEventListener('click', function () {
        wfState.humanDecision = 'Validé par le responsable [OUI] ✓';
        prevHash = M.hashDemo('WF-OUI-' + famKey, prevHash);
        renderWorkflowFamily(famKey);
      });
      document.getElementById('btnWfReject').addEventListener('click', function () {
        wfState.humanDecision = 'Mis en réserve [NON]';
        prevHash = M.hashDemo('WF-NON-' + famKey, prevHash);
        renderWorkflowFamily(famKey);
      });
      document.getElementById('btnWfCta').addEventListener('click', function () {
        selectNeedAndScroll(fam.need, fam.sector);
      });
    }

    /* ========================================================== */
    /* FAMILLE A — SÉCURITÉ PRIVÉE (SECURIAXE)                    */
    /* Planificateur visuel de vacations & Simulateur de marge    */
    /* ========================================================== */
    var CANDIDATES_SECU = [
      {
        id: 'zaidi',
        name: 'Fatima ZAIDI (Conflit : déjà affectée 09h–21h)',
        cnaps: 'Valide (renouvellement J-11)',
        restHours: 4.0,
        overlapHours: 7.0,
        ok: false,
        verdict: 'Affectation refusée : chevauchement de 7,0 h avec le site Athena (09h–21h) et repos quotidien insuffisant (4,0 h < 11,0 h légal).'
      },
      {
        id: 'khelifi',
        name: 'Sofia KHELIFI (Anomalie : carte professionnelle échue)',
        cnaps: 'Échue (expirée)',
        restHours: 16.0,
        overlapHours: 0.0,
        ok: false,
        verdict: 'Affectation refusée : titre d\'habilitation expiré dans le référentiel. Remplacement requis avant émission d\'ordre de mission.'
      },
      {
        id: 'diakite',
        name: 'Moussa DIAKITE (Disponible · Repos 24 h · Habilitations à jour)',
        cnaps: 'Valide · SST & SSIAP 1 à jour',
        restHours: 24.0,
        overlapHours: 0.0,
        ok: true,
        verdict: 'Affectation valide : 0,0 h de chevauchement, titres valides jusqu\'à la fin de la vacation et repos quotidien respecté (24,0 h ≥ 11,0 h).'
      }
    ];
    var secuState = { candIdx: 0, rate: 23.0 };

    function renderFamA() {
      clearSimTimers();
      labAddress.textContent = 'cantara://lab/famille-a-securiaxe-planificateur-et-marge';
      labStatusBadge.className = 'status-badge proto';
      labStatusBadge.textContent = 'Prototype & Simulation locale · Données fictives';

      var cand = CANDIDATES_SECU[secuState.candIdx] || CANDIDATES_SECU[0];
      var unitCost = 25.73; /* 22,97 * 1,12 arrondi au centime */
      var floor = 28.59;    /* 25,73 / 0,90 */
      var monthly = Math.round((secuState.rate - unitCost) * 300);

      labPanel.innerHTML =
        '<div class="intent-bar">' +
          '<div class="intent-prompt">' +
            '<span class="mono" style="color:var(--signal)">[SECURIAXE · Planificateur &amp; Marge]</span>' +
            '<span>Poste à couvrir : Résidence Les Oliviers (14h–22h) &amp; Contrat Nuit 300 h/mois</span>' +
          '</div>' +
          '<div class="lab-controls">' +
            '<button type="button" class="btn btn-primary btn-xs" id="btnExp3SecuAct">' +
              (secuState.candIdx === 2 && secuState.rate >= floor ? 'Réinitialiser le cas ↺' : 'Appliquer le remplaçant & le tarif plancher [OUI]') +
            '</button>' +
          '</div>' +
        '</div>' +

        '<div class="comet-canvas">' +
          '<div class="comet-card">' +
            '<span class="mono">[1. PLANIFICATEUR VISUEL DE VACATIONS · CONTRÔLE 11 H]</span>' +
            '<label for="selSecuCand" style="font-size:.82rem;color:var(--cream-muted)">Affecter un agent sur le créneau 14h–22h (exemples fictifs) :</label>' +
            '<select id="selSecuCand" class="input-ctrl" style="background:var(--night-panel);color:var(--cream);border-color:var(--night-edge)">' +
              CANDIDATES_SECU.map(function (c, i) {
                return '<option value="' + i + '"' + (i === secuState.candIdx ? ' selected' : '') + '>' + M.esc(c.name) + '</option>';
              }).join('') +
            '</select>' +
            '<div class="comet-metrics">' +
              '<div class="comet-metric ' + (cand.overlapHours === 0 ? 'good' : 'alert') + '">' +
                '<div class="lbl">Chevauchement horaire</div>' +
                '<div class="val">' + cand.overlapHours.toFixed(1).replace('.', ',') + ' h</div>' +
              '</div>' +
              '<div class="comet-metric ' + (cand.restHours >= 11 && cand.ok ? 'good' : 'alert') + '">' +
                '<div class="lbl">Repos quotidien (seuil ≥ 11 h)</div>' +
                '<div class="val">' + cand.restHours.toFixed(1).replace('.', ',') + ' h</div>' +
              '</div>' +
            '</div>' +
            '<p style="margin:0;font-size:.86rem;color:' + (cand.ok ? 'var(--signal-ok)' : 'var(--signal-err)') + ';line-height:1.55">' +
              M.esc(cand.verdict) +
            '</p>' +
          '</div>' +

          '<div class="comet-card">' +
            '<span class="mono">[2. SIMULATEUR DE MARGE CONTRAT (300 H NUIT · STRUCTURE 12 %)]</span>' +
            '<div style="display:flex;justify-content:space-between;align-items:baseline;font-size:.84rem">' +
              '<label for="rngSecuRate">Tarif horaire simulé (€/h)</label>' +
              '<output id="outSecuRate" class="mono" style="color:var(--cream)">' + secuState.rate.toFixed(2).replace('.', ',') + ' €/h</output>' +
            '</div>' +
            '<input type="range" id="rngSecuRate" min="21" max="34" step="0.5" value="' + secuState.rate + '">' +
            '<div class="comet-metrics">' +
              '<div class="comet-metric ' + (monthly >= 0 ? 'good' : 'alert') + '">' +
                '<div class="lbl">Résultat mensuel (coût 25,73 €/h)</div>' +
                '<div class="val">' + (monthly > 0 ? '+' : '') + M.fmtEur(monthly) + '</div>' +
              '</div>' +
              '<div class="comet-metric good">' +
                '<div class="lbl">Plancher conseillé (marge 10 %)</div>' +
                '<div class="val">28,59 €/h</div>' +
              '</div>' +
            '</div>' +
            '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.2rem">' +
              '<a href="securite-privee.html" class="btn btn-primary btn-sm">Démonstrateurs Sécurité complets →</a>' +
              '<a href="https://naitconv-web.github.io/cos-operations-simulateur/boutique/" class="btn btn-ghost btn-sm" target="_blank" rel="noopener noreferrer" data-outbound-product="securiaxe">Site officiel Securiaxe ↗</a>' +
            '</div>' +
            '<div class="comet-log">' +
              '<b>[JOURNAL · ' + M.esc(prevHash) + ']</b> Hypothèses explicites : coût base ADS Nuit 22,97 €/h + 12 % structure = 25,73 €/h · Repos légal ≥ 11 h.' +
            '</div>' +
          '</div>' +
        '</div>';

      document.getElementById('selSecuCand').addEventListener('change', function (e) {
        secuState.candIdx = Number(e.target.value) || 0;
        prevHash = M.hashDemo('SECU-CAND-' + secuState.candIdx, prevHash);
        renderFamA();
      });
      document.getElementById('rngSecuRate').addEventListener('input', function (e) {
        secuState.rate = parseFloat(e.target.value) || 23;
        renderFamA();
      });
      document.getElementById('btnExp3SecuAct').addEventListener('click', function () {
        if (secuState.candIdx === 2 && secuState.rate >= floor) {
          secuState.candIdx = 0;
          secuState.rate = 23.0;
        } else {
          secuState.candIdx = 2;
          secuState.rate = 28.59;
        }
        prevHash = M.hashDemo('SECU-AUTO-RESOLVE', prevHash);
        renderFamA();
      });
    }

    /* ========================================================== */
    /* FAMILLE C — GESTION PATRIMONIALE (OMNIPATRIMOINE)          */
    /* Cartographie pédagogique, Scénarios & Collecte (Incubation)*/
    /* ========================================================== */
    var PATRI_PROFILES = {
      equilibre: {
        label: 'Scénario Équilibré (Horizon 8 ans)',
        yieldHyp: '4,2 % / an (hypothèse théorique non garantie)',
        inflationHyp: '2,0 % / an',
        concentration: 'Diversifiée (aucune classe > 40 %)',
        alloc: [
          { name: 'Liquidités & Trésorerie (Court terme)', pct: 15, cls: 'ok' },
          { name: 'Produits de taux & Obligations (Moyen terme)', pct: 30, cls: 'ok' },
          { name: 'Immobilier & Pierre-Papier (Long terme)', pct: 35, cls: 'ok' },
          { name: 'Actions & Entreprises (Long terme)', pct: 20, cls: 'ok' }
        ]
      },
      concentre: {
        label: 'Cas d\'alerte · Concentration immobilière (72 %)',
        yieldHyp: '3,6 % / an (avant fiscalité et frais)',
        inflationHyp: '2,0 % / an',
        concentration: 'Alerte : 72 % immobilisé / faible liquidité (8 %)',
        alloc: [
          { name: 'Liquidités disponibles (Court terme)', pct: 8, cls: 'err' },
          { name: 'Produits de taux (Moyen terme)', pct: 10, cls: 'ok' },
          { name: 'Immobilier locatif concentré (Long terme)', pct: 72, cls: 'err' },
          { name: 'Actions & Entreprises (Long terme)', pct: 10, cls: 'ok' }
        ]
      }
    };
    var patriKey = 'equilibre';
    var patriDocChecked = false;

    function renderFamC() {
      clearSimTimers();
      labAddress.textContent = 'cantara://lab/famille-c-omnipatrimoine-incubation';
      labStatusBadge.className = 'status-badge incub';
      labStatusBadge.textContent = 'En incubation · Simulation locale exploratoire';

      var pf = PATRI_PROFILES[patriKey];
      labPanel.innerHTML =
        '<div class="intent-bar">' +
          '<div class="intent-prompt">' +
            '<span class="mono" style="color:var(--signal)">[OMNIPATRIMOINE · En incubation]</span>' +
            '<span>Outil pédagogique exploratoire sur données fictives (produit non commercialisé, hors conseil en investissement).</span>' +
          '</div>' +
          '<div class="lab-controls">' +
            '<button type="button" class="intent-pill' + (patriKey === 'equilibre' ? ' active' : '') + '" data-patri="equilibre">Scénario Équilibré</button>' +
            '<button type="button" class="intent-pill' + (patriKey === 'concentre' ? ' active' : '') + '" data-patri="concentre">Simuler une concentration (72 %)</button>' +
          '</div>' +
        '</div>' +

        '<div class="comet-canvas">' +
          '<div class="comet-card">' +
            '<span class="mono">[1. CARTOGRAPHIE PÉDAGOGIQUE &amp; CONCENTRATIONS (ACTIFS FICTIFS)]</span>' +
            '<div class="alloc-bars">' +
              pf.alloc.map(function (a) {
                return '<div class="alloc-row">' +
                  '<div class="alloc-head"><span>' + M.esc(a.name) + '</span><span>' + a.pct + ' %</span></div>' +
                  '<div class="alloc-track"><div class="alloc-fill ' + M.esc(a.cls) + '" style="width:' + a.pct + '%"></div></div>' +
                '</div>';
              }).join('') +
            '</div>' +
            '<div class="comet-metrics">' +
              '<div class="comet-metric"><div class="lbl">Hypothèse rendement / inflation</div><div class="val" style="font-size:1.15rem">' + M.esc(pf.yieldHyp) + '</div></div>' +
              '<div class="comet-metric ' + (patriKey === 'concentre' ? 'alert' : 'good') + '"><div class="lbl">Diagnostic de répartition</div><div class="val" style="font-size:1.1rem">' + M.esc(pf.concentration) + '</div></div>' +
            '</div>' +
          '</div>' +

          '<div class="comet-card">' +
            '<span class="mono">[2. PARCOURS DE COLLECTE DOCUMENTAIRE &amp; CONTRÔLE HUMAIN]</span>' +
            '<ul class="comet-steps">' +
              '<li><b>[OK]</b><span>Recueil des objectifs et de l\'horizon patrimonial (fictif)</span></li>' +
              '<li><b>[' + (patriDocChecked ? 'VÉRIFIÉ' : 'À VÉRIFIER') + ']</b><span>Justificatif d\'origine des fonds &amp; questionnaire de tolérance au risque</span></li>' +
              '<li><b>[HUMAIN]</b><span>Validation obligatoire par le conseiller habilité avant toute synthèse</span></li>' +
            '</ul>' +
            '<div style="display:flex;gap:.5rem;flex-wrap:wrap">' +
              '<button type="button" class="btn btn-primary btn-xs" id="btnPatriCheck">' +
                (patriDocChecked ? 'Réinitialiser la collecte ↺' : 'Simuler la validation de la pièce manquante ✓') +
              '</button>' +
              '<button type="button" class="btn btn-ghost btn-xs" id="btnPatriContact">Échanger sur ce projet en incubation →</button>' +
            '</div>' +
            '<div class="comet-log">' +
              '<b>[AVERTISSEMENT · EN INCUBATION]</b> Simulation purement illustrative : aucune donnée patrimoniale réelle, aucune prévision garantie.' +
            '</div>' +
          '</div>' +
        '</div>';

      Array.prototype.slice.call(labPanel.querySelectorAll('[data-patri]')).forEach(function (b) {
        b.addEventListener('click', function () {
          patriKey = b.getAttribute('data-patri');
          prevHash = M.hashDemo('PATRI-' + patriKey, prevHash);
          renderFamC();
        });
      });
      document.getElementById('btnPatriCheck').addEventListener('click', function () {
        patriDocChecked = !patriDocChecked;
        prevHash = M.hashDemo('PATRI-DOC-' + patriDocChecked, prevHash);
        renderFamC();
      });
      document.getElementById('btnPatriContact').addEventListener('click', function () {
        selectNeedAndScroll('Conseil et cadrage', 'OMNIPATRIMOINE');
      });
    }

    /* ========================================================== */
    /* FAMILLE D — COMMERCE ET DISTRIBUTION                       */
    /* Cockpit Stock, Réapprovisionnement & Analyse Marge Produit */
    /* ========================================================== */
    var distState = { buyCost: 42, sellPrice: 68, discountPct: 10, stockUnits: 14, reorderValidated: false };

    function renderFamD() {
      clearSimTimers();
      labAddress.textContent = 'cantara://lab/famille-d-commerce-stock-et-marge';
      labStatusBadge.className = 'status-badge sim';
      labStatusBadge.textContent = 'Simulation locale · Données fictives';

      var netSell = distState.sellPrice * (1 - distState.discountPct / 100);
      var logCost = 4.50;
      var unitMargin = netSell - distState.buyCost - logCost;
      var marginPct = netSell > 0 ? (unitMargin / netSell) * 100 : 0;
      var threshold = 20;
      var isLowStock = distState.stockUnits < threshold && !distState.reorderValidated;

      labPanel.innerHTML =
        '<div class="intent-bar">' +
          '<div class="intent-prompt">' +
            '<span class="mono" style="color:var(--signal)">[Commerce &amp; Distribution]</span>' +
            '<span>Référence fictive SKU-408 : Analyse de marge unitaire &amp; seuil de réapprovisionnement</span>' +
          '</div>' +
          '<div class="lab-controls">' +
            '<button type="button" class="btn btn-primary btn-xs" id="btnDistReorder">' +
              (distState.reorderValidated ? 'Réinitialiser le stock ↺' : 'Valider le réapprovisionnement (+50 u.) [OUI]') +
            '</button>' +
          '</div>' +
        '</div>' +

        '<div class="comet-canvas">' +
          '<div class="comet-card">' +
            '<span class="mono">[1. SIMULATEUR DE MARGE PRODUIT (COÛT ACHAT 42 € + LOGISTIQUE 4,50 €)]</span>' +
            '<div style="display:flex;justify-content:space-between;font-size:.82rem">' +
              '<label for="rngDistPrice">Prix de vente catalogue (€ HT)</label>' +
              '<output class="mono" style="color:var(--cream)">' + distState.sellPrice + ' €</output>' +
            '</div>' +
            '<input type="range" id="rngDistPrice" min="48" max="95" step="1" value="' + distState.sellPrice + '">' +
            '<div style="display:flex;justify-content:space-between;font-size:.82rem">' +
              '<label for="rngDistDisc">Remise commerciale accordée (%)</label>' +
              '<output class="mono" style="color:var(--cream)">' + distState.discountPct + ' %</output>' +
            '</div>' +
            '<input type="range" id="rngDistDisc" min="0" max="30" step="2" value="' + distState.discountPct + '">' +
            '<div class="comet-metrics">' +
              '<div class="comet-metric ' + (unitMargin > 5 ? 'good' : 'alert') + '">' +
                '<div class="lbl">Marge nette unitaire</div>' +
                '<div class="val">' + unitMargin.toFixed(2).replace('.', ',') + ' €</div>' +
              '</div>' +
              '<div class="comet-metric ' + (marginPct >= 15 ? 'good' : 'alert') + '">' +
                '<div class="lbl">Taux de marge nette</div>' +
                '<div class="val">' + marginPct.toFixed(1).replace('.', ',') + ' %</div>' +
              '</div>' +
            '</div>' +
          '</div>' +

          '<div class="comet-card">' +
            '<span class="mono">[2. COCKPIT DE STOCK &amp; FLUX DE COMMANDE]</span>' +
            '<div class="comet-metrics">' +
              '<div class="comet-metric ' + (isLowStock ? 'alert' : 'good') + '">' +
                '<div class="lbl">Stock disponible (seuil 20 u.)</div>' +
                '<div class="val">' + (distState.reorderValidated ? (distState.stockUnits + 50) : distState.stockUnits) + ' unités</div>' +
              '</div>' +
              '<div class="comet-metric ' + (isLowStock ? 'warn' : 'good') + '">' +
                '<div class="lbl">Statut réapprovisionnement</div>' +
                '<div class="val" style="font-size:1.15rem">' + (distState.reorderValidated ? 'Commande validée ✓' : 'Rupture à J+4 ⚡') + '</div>' +
              '</div>' +
            '</div>' +
            '<ul class="comet-steps">' +
              '<li><b>[FLUX]</b><span>Commande → Paiement → Préparation → Expédition → Suivi SAV</span></li>' +
              '<li><b>[RÈGLE]</b><span>Déclenchement d\'une suggestion d\'achat dès franchissement du stock de sécurité (20 u.)</span></li>' +
            '</ul>' +
            '<div><button type="button" class="btn btn-ghost btn-sm" id="btnDistCta">Concevoir un cockpit stock &amp; marges sur mesure →</button></div>' +
            '<div class="comet-log">' +
              '<b>[JOURNAL · ' + M.esc(prevHash) + ']</b> Simulation locale sur catalogue fictif.' +
            '</div>' +
          '</div>' +
        '</div>';

      document.getElementById('rngDistPrice').addEventListener('input', function (e) {
        distState.sellPrice = parseFloat(e.target.value) || 68;
        renderFamD();
      });
      document.getElementById('rngDistDisc').addEventListener('input', function (e) {
        distState.discountPct = parseFloat(e.target.value) || 0;
        renderFamD();
      });
      document.getElementById('btnDistReorder').addEventListener('click', function () {
        distState.reorderValidated = !distState.reorderValidated;
        prevHash = M.hashDemo('DIST-REORDER-' + distState.reorderValidated, prevHash);
        renderFamD();
      });
      document.getElementById('btnDistCta').addEventListener('click', function () {
        selectNeedAndScroll('Outil métier sur mesure', 'Commerce et distribution');
      });
    }

    /* ========================================================== */
    /* FAMILLE E — HÔTELLERIE ET RESTAURATION                     */
    /* Cockpit d'exploitation, Équipes & Réclamation client       */
    /* ========================================================== */
    var hotelState = { service: 'soir', conflictResolved: false, claimValidated: false };

    function renderFamE() {
      clearSimTimers();
      labAddress.textContent = 'cantara://lab/famille-e-hotellerie-restauration-exploitation';
      labStatusBadge.className = 'status-badge sim';
      labStatusBadge.textContent = 'Simulation locale · Données fictives';

      var isResolved = hotelState.conflictResolved;
      labPanel.innerHTML =
        '<div class="intent-bar">' +
          '<div class="intent-prompt">' +
            '<span class="mono" style="color:var(--signal)">[Hôtellerie &amp; Restauration]</span>' +
            '<span>Établissement fictif (45 chambres &amp; service restauration) — Occupation 88 % (39 arrivées)</span>' +
          '</div>' +
          '<div class="lab-controls">' +
            '<button type="button" class="btn btn-primary btn-xs" id="btnHotelResolve">' +
              (isResolved ? 'Réinitialiser le service ↺' : 'Affecter le renfort & valider la réponse client [OUI]') +
            '</button>' +
          '</div>' +
        '</div>' +

        '<div class="comet-canvas">' +
          '<div class="comet-card">' +
            '<span class="mono">[1. PLANIFICATEUR D\'ÉQUIPES &amp; EXPLOITATION PAR CRÉNEAU]</span>' +
            '<div class="comet-metrics">' +
              '<div class="comet-metric ' + (isResolved ? 'good' : 'alert') + '">' +
                '<div class="lbl">Couverture Service Soir (19h–23h)</div>' +
                '<div class="val">' + (isResolved ? '5 / 5 équipiers' : '4 / 5 (Sous-effectif)') + '</div>' +
              '</div>' +
              '<div class="comet-metric good">' +
                '<div class="lbl">État des chambres (Arrivées 15h)</div>' +
                '<div class="val">38 / 39 prêtes</div>' +
              '</div>' +
            '</div>' +
            '<ul class="comet-steps">' +
              '<li><b>[CRÉNEAU]</b><span>Pic de réservations détecté à 20h00 (64 couverts) vs 4 équipiers planifiés en salle.</span></li>' +
              '<li><b>[SOLUTION]</b><span>' + (isResolved ? 'Renfort affecté (Lucas M., disponible et repos hebdomadaire respecté).' : '1 équipier disponible en réserve sans dépassement horaire : en attente de validation.') + '</span></li>' +
            '</ul>' +
          '</div>' +

          '<div class="comet-card">' +
            '<span class="mono">[2. PARCOURS DE RÉCLAMATION &amp; VALIDATION HUMAINE]</span>' +
            '<ul class="comet-steps">' +
              '<li><b>[INCIDENT]</b><span>Chambre 204 : Signalement climatisation à 16h15 lors de l\'arrivée client.</span></li>' +
              '<li><b>[ACTION]</b><span>Proposition immédiate de relogement en Chambre 302 (catégorie supérieure disponible) + intervention maintenance programmée.</span></li>' +
              '<li><b>[STATUT]</b><span><strong>' + (isResolved ? 'Relogement validé par le directeur d\'exploitation ✓' : 'En attente d\'approbation du responsable d\'exploitation') + '</strong></span></li>' +
            '</ul>' +
            '<div><button type="button" class="btn btn-ghost btn-sm" id="btnHotelCta">Étudier un outil de planification ou d\'exploitation →</button></div>' +
            '<div class="comet-log">' +
              '<b>[JOURNAL · ' + M.esc(prevHash) + ']</b> Simulation locale sur données d\'exploitation fictives.' +
            '</div>' +
          '</div>' +
        '</div>';

      document.getElementById('btnHotelResolve').addEventListener('click', function () {
        hotelState.conflictResolved = !hotelState.conflictResolved;
        prevHash = M.hashDemo('HOTEL-RESOLVE-' + hotelState.conflictResolved, prevHash);
        renderFamE();
      });
      document.getElementById('btnHotelCta').addEventListener('click', function () {
        selectNeedAndScroll('Outil métier sur mesure', 'Hôtellerie et restauration');
      });
    }

    /* Sélecteur principal des 6 familles du CANTARA LAB */
    function switchLabFamily(famKey) {
      clearSimTimers();
      activeFam = famKey;
      labTabs.forEach(function (t) {
        var sel = t.getAttribute('data-exp') === famKey;
        t.setAttribute('aria-selected', sel ? 'true' : 'false');
        if (sel) labPanel.setAttribute('aria-labelledby', t.id);
      });
      if (famKey === 'famF' || famKey === 'famB') {
        resetWfState(famKey);
        renderWorkflowFamily(famKey);
      } else if (famKey === 'famA') {
        renderFamA();
      } else if (famKey === 'famC') {
        renderFamC();
      } else if (famKey === 'famD') {
        renderFamD();
      } else if (famKey === 'famE') {
        renderFamE();
      }
    }

    labTabs.forEach(function (t) {
      t.addEventListener('click', function () {
        switchLabFamily(t.getAttribute('data-exp'));
      });
    });

    Array.prototype.slice.call(document.querySelectorAll('[data-open-lab]')).forEach(function (el) {
      el.addEventListener('click', function () {
        switchLabFamily(el.getAttribute('data-open-lab'));
      });
    });
    Array.prototype.slice.call(document.querySelectorAll('[data-select-need]')).forEach(function (el) {
      el.addEventListener('click', function () {
        selectNeedAndScroll(el.getAttribute('data-select-need'), el.getAttribute('data-select-sector'));
      });
    });

    switchLabFamily('famF');

    /* ========================================================== */
    /* 2. ASSISTANT D'ORIENTATION (4 QUESTIONS → BESOIN & SECTEUR)*/
    /* ========================================================== */
    var QUESTIONS = [
      {
        id: 'sector',
        label: 'Orientation · Étape 1 / 4',
        title: 'Dans quel contexte s\'inscrit votre démarche ?',
        options: [
          { value: 'transversal', key: 'A', label: 'Entreprise (industrie, commerce, hôtellerie, services) cherchant un outil ou une automatisation' },
          { value: 'securite', key: 'B', label: 'Société de sécurité privée (planification, marges, conformité CSI / IDCC 1351)' },
          { value: 'btp', key: 'C', label: 'Entreprise du BTP et de la rénovation (suivi de chantier, pièces légales, relance devis)' },
          { value: 'patrimoine', key: 'D', label: 'Cabinet de gestion patrimoniale (intérêt exploratoire pour Omnipatrimoine)' }
        ]
      },
      {
        id: 'need',
        label: 'Orientation · Étape 2 / 4',
        title: 'Quelle est la nature principale de votre besoin ?',
        options: [
          { value: 'logiciel', key: 'A', label: 'Développement logiciel, outil métier sur mesure ou intégration de systèmes' },
          { value: 'auto_ia', key: 'B', label: 'Automatisation de processus, intégration d\'assistants IA ou orchestration multi-agents' },
          { value: 'conseil', key: 'C', label: 'Conseil et cadrage technologique, formation des équipes ou évolution d\'une solution' }
        ]
      },
      {
        id: 'horizon',
        label: 'Orientation · Étape 3 / 4',
        title: 'Quelle première étape souhaitez-vous engager ?',
        options: [
          { value: 'demo', key: 'A', label: 'Tester un démonstrateur métier existant (Securiaxe ou Omnirenov)' },
          { value: 'cadrage', key: 'B', label: 'Échanger sur le cadrage d\'un projet sur mesure ou d\'un prototype' },
          { value: 'audit', key: 'C', label: 'Évaluer la faisabilité d\'une automatisation sur nos flux actuels' }
        ]
      },
      {
        id: 'size',
        label: 'Orientation · Étape 4 / 4',
        title: 'Quelle est la dimension de votre organisation ?',
        options: [
          { value: 'tpe', key: 'A', label: '1 à 15 collaborateurs' },
          { value: 'pme', key: 'B', label: '16 à 99 collaborateurs' },
          { value: 'eti', key: 'C', label: '100 collaborateurs et plus (ou multi-sites / international)' }
        ]
      }
    ];

    var answers = {};
    var idx = 0;
    var box = document.getElementById('diagBox');

    function getOrientation() {
      if (answers.sector === 'securite') {
        return {
          badge: 'Orientation : Solution SECURIAXE',
          title: 'Explorez les démonstrateurs Sécurité Privée & Securiaxe',
          desc: 'Manipulez le planificateur visuel de vacations, le simulateur Bouclier Anti-Pertes et le prototype 7 étapes Director sur CANTARA, ou rejoignez le site officiel Securiaxe.',
          primaryHref: 'securite-privee.html',
          primaryLabel: 'Ouvrir les démonstrateurs Sécurité →',
          secondaryHref: M.CONFIG.SECURIAXE_URL,
          secondaryLabel: 'Site officiel Securiaxe ↗',
          need: 'Outil métier sur mesure',
          sector: 'SECURIAXE — Sécurité privée'
        };
      }
      if (answers.sector === 'btp') {
        return {
          badge: 'Orientation : Solution OMNIRENOV',
          title: 'Explorez le cockpit de chantier & suivi devis Omnirenov',
          desc: 'Testez la progression de chantier en 6 jalons, la vérification des pièces administratives et le simulateur de relance de devis.',
          primaryHref: 'btp.html',
          primaryLabel: 'Ouvrir les démonstrateurs Omnirenov →',
          secondaryHref: null,
          secondaryLabel: null,
          need: 'Outil métier sur mesure',
          sector: 'OMNIRENOV — BTP et rénovation'
        };
      }
      if (answers.sector === 'patrimoine') {
        return {
          badge: 'Orientation : OMNIPATRIMOINE (En incubation)',
          title: 'Consultez la simulation exploratoire dans CANTARA LAB',
          desc: 'OMNIPATRIMOINE est un projet en incubation (non commercialisé). Vous pouvez tester la cartographie pédagogique du patrimoine dans le Lab ou décrire vos enjeux dans le formulaire ci-contre.',
          primaryHref: '#lab',
          primaryLabel: 'Voir dans CANTARA LAB →',
          secondaryHref: null,
          secondaryLabel: null,
          need: 'Conseil et cadrage',
          sector: 'OMNIPATRIMOINE — Gestion patrimoniale (en incubation)'
        };
      }
      var needMap = {
        logiciel: 'Développement logiciel',
        auto_ia: 'Orchestration multi-agents',
        conseil: 'Conseil et cadrage'
      };
      return {
        badge: 'Orientation : Ingénierie & Systèmes sur mesure',
        title: 'Cadrage technologique, développement & automatisation',
        desc: 'Expérimentez nos démonstrations multi-secteurs dans CANTARA LAB (Services, Commerce, Hôtellerie) et complétez le formulaire ci-contre pré-rempli selon vos réponses.',
        primaryHref: '#lab',
        primaryLabel: 'Explorer CANTARA LAB →',
        secondaryHref: '#ingenierie',
        secondaryLabel: 'Découvrir notre ingénierie',
        need: needMap[answers.need] || 'Conseil et cadrage',
        sector: 'Projet transversal / Tous secteurs'
      };
    }

    function renderDiag() {
      if (!box) return;
      if (idx < QUESTIONS.length) {
        var q = QUESTIONS[idx];
        var pct = Math.round(((idx + 1) / QUESTIONS.length) * 100);
        var val = answers[q.id] || '';
        box.innerHTML =
          '<div style="display:flex;justify-content:space-between;align-items:center">' +
            '<span class="mono">[' + M.esc(q.label) + ']</span>' +
            '<span class="mono">' + pct + ' %</span>' +
          '</div>' +
          '<div class="progress" aria-hidden="true"><i style="width:' + pct + '%"></i></div>' +
          '<h3 class="q-title">' + M.esc(q.title) + '</h3>' +
          '<fieldset class="options"><legend class="sr-only">' + M.esc(q.title) + '</legend>' +
          q.options.map(function (o) {
            return '<label class="option">' +
              '<input type="radio" name="dOpt" value="' + M.esc(o.value) + '"' + (val === o.value ? ' checked' : '') + '>' +
              '<span class="key" aria-hidden="true">' + M.esc(o.key) + '</span>' +
              '<span>' + M.esc(o.label) + '</span>' +
            '</label>';
          }).join('') +
          '</fieldset>' +
          '<div class="diag-nav">' +
            (idx > 0 ? '<button type="button" class="link-btn" id="dPrev">← Étape précédente</button>' : '<span></span>') +
            '<button type="button" class="btn btn-primary btn-sm" id="dNext"' + (val ? '' : ' disabled') + '>' +
              (idx === QUESTIONS.length - 1 ? 'Voir mon orientation →' : 'Continuer →') +
            '</button>' +
          '</div>';

        var nextBtn = document.getElementById('dNext');
        var prevBtn = document.getElementById('dPrev');
        Array.prototype.slice.call(box.querySelectorAll('input[name="dOpt"]')).forEach(function (r) {
          r.addEventListener('change', function () {
            answers[q.id] = r.value;
            nextBtn.disabled = false;
          });
        });
        nextBtn.addEventListener('click', function () {
          if (!answers[q.id]) return;
          idx += 1;
          renderDiag();
        });
        if (prevBtn) {
          prevBtn.addEventListener('click', function () {
            idx = Math.max(0, idx - 1);
            renderDiag();
          });
        }
        return;
      }

      var rec = getOrientation();
      var needSelect = document.getElementById('cNeed');
      var sectorSelect = document.getElementById('cSector');
      if (needSelect && rec.need) needSelect.value = rec.need;
      if (sectorSelect && rec.sector) sectorSelect.value = rec.sector;

      box.innerHTML =
        '<span class="status-badge op">' + M.esc(rec.badge) + '</span>' +
        '<h3 class="q-title" style="margin-top:.85rem">' + M.esc(rec.title) + '</h3>' +
        '<p style="margin:0 0 1.35rem;color:var(--ink-body);font-size:.92rem">' + M.esc(rec.desc) + '</p>' +
        '<div style="display:flex;gap:.6rem;flex-wrap:wrap;margin-bottom:1.25rem">' +
          '<a href="' + M.esc(rec.primaryHref) + '" class="btn btn-primary btn-sm">' + M.esc(rec.primaryLabel) + '</a>' +
          (rec.secondaryHref
            ? '<a href="' + M.esc(rec.secondaryHref) + '" class="btn btn-ghost btn-sm"' +
              (rec.secondaryHref.indexOf('http') === 0 ? ' target="_blank" rel="noopener noreferrer" data-outbound-product="securiaxe"' : '') +
              '>' + M.esc(rec.secondaryLabel) + '</a>'
            : '') +
        '</div>' +
        '<div style="border-top:1px dashed var(--edge);padding-top:1rem;display:flex;justify-content:space-between;align-items:center;gap:.75rem;flex-wrap:wrap">' +
          '<span class="mono">La nature du besoin a été pré-sélectionnée dans le formulaire.</span>' +
          '<button type="button" class="link-btn" id="dRestart">Recommencer l\'orientation</button>' +
        '</div>';

      document.getElementById('dRestart').addEventListener('click', function () {
        answers = {};
        idx = 0;
        renderDiag();
      });
    }

    renderDiag();

    /* ========================================================== */
    /* 3. FORMULAIRE & TRANSMISSION SERVEUR EXPLICITE (§2.2 & §7) */
    /* ========================================================== */
    var contactForm = document.getElementById('contactForm');
    var channelBadge = document.getElementById('formChannelBadge');
    var isSubmitting = false;

    if (channelBadge) {
      var hasEndpoint = Boolean(M.CONFIG.WEBHOOK_ENABLED && M.CONFIG.CONTACT_ENDPOINT);
      channelBadge.className = hasEndpoint ? 'status-badge op' : 'status-badge prep';
      channelBadge.textContent = hasEndpoint ? 'Transmission serveur active' : 'Prérequis serveur en attente';
    }

    if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (isSubmitting) return;

        /* Protection anti-spam honeypot (§2.2) */
        var hp = document.getElementById('cWebsite');
        if (hp && hp.value.trim() !== '') {
          return;
        }

        var need = document.getElementById('cNeed').value;
        var sector = document.getElementById('cSector').value;
        var msg = document.getElementById('cMsg').value.trim();
        var name = document.getElementById('cName').value.trim();
        var org = document.getElementById('cOrg').value.trim();
        var mail = document.getElementById('cMail').value.trim();

        var validMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
        document.getElementById('eMsg').textContent = msg ? '' : 'Veuillez décrire brièvement votre projet ou besoin.';
        document.getElementById('eName').textContent = name ? '' : 'Veuillez indiquer votre nom.';
        document.getElementById('eOrg').textContent = org ? '' : 'Veuillez indiquer votre organisation.';
        document.getElementById('eMail').textContent = validMail ? '' : 'Veuillez saisir un e-mail professionnel valide.';

        if (!msg || !name || !org || !validMail) return;

        var submitBtn = document.getElementById('btnSubmitContact');
        var noticeEl = document.getElementById('contactNotice');
        var refCode = M.hashDemo(need + '|' + org + '|' + mail, 'REQ');
        var summaryText =
          'RÉFÉRENCE LOCALE : ' + refCode + '\n' +
          'Besoin           : ' + need + '\n' +
          'Secteur/Solution : ' + sector + '\n' +
          'Interlocuteur    : ' + name + ' (' + org + ')\n' +
          'E-mail           : ' + mail + '\n' +
          'Projet / Besoin  : ' + msg;

        /* ÉTAT 1 : ENVOI EN COURS (§2.2) */
        isSubmitting = true;
        if (submitBtn) submitBtn.disabled = true;
        noticeEl.innerHTML =
          '<div class="form-state-box form-state-sending" data-form-state="sending">' +
            '<strong>[ÉTAT : ENVOI EN COURS…]</strong>' +
            'Vérification du canal de réception serveur et transmission de votre demande…' +
          '</div>';

        M.submitServerContact({
          ref: refCode,
          need: need,
          sector: sector,
          message: msg,
          name: name,
          organization: org,
          email: mail,
          submittedAt: new Date().toISOString()
        }).then(function (result) {
          isSubmitting = false;
          if (submitBtn) submitBtn.disabled = false;

          /* ÉTAT 2 : SUCCÈS CONFIRMÉ PAR LE SERVEUR (§2.2 — uniquement si réponse positive réelle) */
          if (result.status === 'CONFIRMED') {
            noticeEl.innerHTML =
              '<div class="form-state-box form-state-confirmed" data-form-state="confirmed">' +
                '<strong>[ÉTAT : SUCCÈS CONFIRMÉ PAR LE SERVEUR]</strong>' +
                M.esc(result.message) + (result.serverRef ? ' (Référence serveur : ' + M.esc(result.serverRef) + ')' : '') +
              '</div>';
            contactForm.reset();
            return;
          }

          /* ÉTAT 3 : DÉLAI DÉPASSÉ (§2.2) */
          if (result.status === 'TIMEOUT') {
            noticeEl.innerHTML =
              '<div class="form-state-box form-state-timeout" data-form-state="timeout">' +
                '<strong>[ÉTAT : DÉLAI DÉPASSÉ — AUCUNE CONFIRMATION SERVEUR]</strong>' +
                M.esc(result.message) + ' Vous pouvez réessayer ou copier votre récapitulatif ci-dessous :' +
                '<pre id="dossierRecap">' + M.esc(summaryText) + '</pre>' +
                '<div style="display:flex;gap:.55rem;flex-wrap:wrap;align-items:center">' +
                  '<button type="button" class="btn btn-primary btn-xs" id="btnCopyDossier">Copier mon récapitulatif</button>' +
                  '<a href="mentions.html" class="btn btn-ghost btn-xs">Coordonnées légales (Mentions) →</a>' +
                  '<span class="mono" id="copyFeedback"></span>' +
                '</div>' +
              '</div>';
          } else {
            /* ÉTAT 4 : ÉCHEC OU PRÉREQUIS SERVEUR NON CONFIGURÉ (§2.2 — ZÉRO SUCCÈS SIMULÉ) */
            noticeEl.innerHTML =
              '<div class="form-state-box form-state-error" data-form-state="unconfigured">' +
                '<strong>[ÉTAT : TRANSMISSION SERVEUR NON EFFECTUÉE — AUCUN ENVOI SIMULÉ]</strong>' +
                M.esc(result.message) + ' Pour conserver votre saisie ou nous contacter directement, copiez le récapitulatif ci-dessous :' +
                '<pre id="dossierRecap">' + M.esc(summaryText) + '</pre>' +
                '<div style="display:flex;gap:.55rem;flex-wrap:wrap;align-items:center">' +
                  '<button type="button" class="btn btn-primary btn-xs" id="btnCopyDossier">Copier mon récapitulatif</button>' +
                  '<a href="mentions.html" class="btn btn-ghost btn-xs">Coordonnées légales (Mentions) →</a>' +
                  '<span class="mono" id="copyFeedback"></span>' +
                '</div>' +
              '</div>';
          }

          var btnCopy = document.getElementById('btnCopyDossier');
          var feedback = document.getElementById('copyFeedback');
          if (btnCopy) {
            btnCopy.addEventListener('click', function () {
              if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(summaryText).then(function () {
                  feedback.textContent = 'Récapitulatif copié ✓';
                }).catch(function () {
                  feedback.textContent = 'Sélectionnez le texte ci-dessus pour copier.';
                });
              } else {
                feedback.textContent = 'Sélectionnez le texte ci-dessus pour copier.';
              }
            });
          }
        });
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
