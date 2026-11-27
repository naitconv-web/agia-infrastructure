/*
 * CANTARA V3 — Logique interactive de la vitrine institutionnelle (index.html) :
 * 1. Postes de démonstration CANTARA LAB (6 domaines métiers) :
 *    - Services & finance : Rapprochement documentaire 3 voies & orchestration multi-agents (Simulation locale)
 *    - Sécurité privée (SECURIAXE) : Planificateur visuel de vacations & marge contrat (Prototype · Simulation locale)
 *    - BTP & chantiers (OMNIRENOV) : Registre de chantier en 6 jalons & pièces légales (Prototype · Simulation locale)
 *    - Gestion patrimoniale (OMNIPATRIMOINE) : Allocation par horizon & collecte documentaire (En incubation)
 *    - Commerce & stocks : Compte d'exploitation unitaire SKU & seuil de réapprovisionnement (Simulation locale)
 *    - Hôtellerie & restauration : Registre de service, couverture d'équipe & incident chambre (Simulation locale)
 * 2. Assistant d'orientation en 4 questions couplé aux 10 besoins du formulaire
 * 3. Formulaire de contact avec transmission serveur réelle (submitServerContact) et 4 états explicites sans crochets
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
    /* SOCLE DE SCÉNARIOS À ÉTAPES (SERVICES famF & BTP famB)     */
    /* ========================================================== */
    var WORKFLOW_FAMILIES = {
      famF: {
        addr: 'Module : Rapprochement documentaire 3 voies & contrôle multi-agents',
        badgeCls: 'status-badge sim',
        badgeTxt: 'Simulation locale · Données fictives',
        need: 'Orchestration multi-agents',
        sector: 'Services professionnels et fonctions support',
        ctaLabel: 'Étudier une chaîne de contrôle documentaire →',
        scenarios: [
          {
            key: 'facture',
            label: 'Dossier 1 · Rapprochement facture fournisseur (14 250 € HT)',
            prompt: 'Dossier DOS-2026-412 : Facture fournisseur FAC-8841 comparée au bon de commande et au bon de livraison',
            refJournal: 'Dossier DOS-2026-412 · Rapprochement 3 voies',
            beforeTxt: 'Vérification manuelle dispersée entre courriels, PDF et tableur (environ 22 min par dossier, risque d\'écart non détecté).',
            afterTxt: 'Chaîne de 5 modules spécialisés isolant automatiquement l\'écart tarifaire avant validation par le responsable.',
            exceptionStep: 3,
            exceptionAlert: 'Anomalie interceptée à l\'étape 4 : Écart de +850 € HT entre le bon de commande BC-104 (13 400 € HT) et la facture reçue FAC-8841 (14 250 € HT). Mise en paiement bloquée.',
            exceptionResolved: 'Anomalie résolue : Demande d\'avoir de 850 € HT enregistrée et règlement partiel de 13 400 € HT autorisé par le responsable financier.',
            tableHeaders: ['Pièce justificative', 'Référence', 'Montant HT', 'Contrôle'],
            tableRows: function (hasEx, exRes) {
              return [
                ['Bon de commande', 'BC-104', '13 400 €', { txt: 'Engagement validé', cls: 'ok' }],
                ['Bon de livraison', 'BL-209', '13 400 €', { txt: 'Quantités reçues', cls: 'ok' }],
                ['Facture fournisseur', 'FAC-8841', '14 250 €', exRes
                  ? { txt: 'Avoir 850 € demandé', cls: 'ok' }
                  : (hasEx ? { txt: 'Écart +850 € bloqué', cls: 'err' } : { txt: 'Écart +850 € détecté', cls: 'warn' })]
              ];
            },
            steps: [
              {
                num: 'Étape 1',
                name: 'Collecte et classification des pièces',
                role: 'Horodatage et identification des documents',
                input: 'Fichiers PDF : Facture FAC-8841 et Bon de livraison BL-209.',
                rule: 'Contrôle de lisibilité, rattachement au tiers émetteur et ouverture du dossier DOS-2026-412.',
                output: 'Dossier DOS-2026-412 constitué avec 2 pièces justificatives.'
              },
              {
                num: 'Étape 2',
                name: 'Extraction structurée des données',
                role: 'Lecture des montants, dates et lignes d\'articles',
                input: 'Dossier documentaire DOS-2026-412.',
                rule: 'Extraction des champs comptables obligatoires (SIREN, référence commande BC-104, base HT, TVA).',
                output: 'Montant facturé extrait : 14 250,00 € HT rattaché à la commande BC-104.'
              },
              {
                num: 'Étape 3',
                name: 'Rapprochement commande / réception / facture',
                role: 'Comparaison ligne à ligne avec l\'engagement initial',
                input: 'Champs extraits comparés au bon de commande BC-104 (13 400 € HT).',
                rule: 'Tolérance d\'écart tarifaire fixée à 0 € sans décision explicite d\'un responsable.',
                output: '11 lignes conformes ; 1 ligne présentant un dépassement de +850 € HT.'
              },
              {
                num: 'Étape 4',
                name: 'Qualification de l\'écart et blocage préventif',
                role: 'Suspension du bon à payer et préparation d\'arbitrage',
                input: 'Dépassement de 850 € HT constaté sur la facture FAC-8841.',
                rule: 'Tout dépassement suspend l\'ordonnancement et prépare une demande d\'avoir chiffrée.',
                output: 'Fiche d\'anomalie générée : blocage de 850 € HT soumis à la direction financière.'
              },
              {
                num: 'Étape 5',
                name: 'Décision du responsable et archivage',
                role: 'Validation humaine et écriture au journal',
                input: 'Dossier complet vérifié par les 4 étapes amont.',
                rule: 'Aucun règlement ni demande d\'avoir ne part sans la décision du valideur habilité.',
                output: 'Dossier prêt pour ordonnancement final et archivage.'
              }
            ]
          },
          {
            key: 'cahier',
            label: 'Dossier 2 · Examen d\'un cahier des charges (300 h Nuit)',
            prompt: 'Consultation AO-2026-118 : Prestation de surveillance nocturne 300 h/mois (tarif cible client 23,00 €/h)',
            refJournal: 'Consultation AO-2026-118 · Chiffrage & règles sociales',
            beforeTxt: 'Chiffrage rapide sous pression commerciale, risque d\'accepter un tarif inférieur au coût de revient.',
            afterTxt: 'Examen croisé des contraintes conventionnelles (repos 11 h, plancher 6 h) et du seuil de rentabilité.',
            exceptionStep: 3,
            exceptionAlert: 'Anomalie interceptée à l\'étape 4 : Le tarif cible client (23,00 €/h) est inférieur au coût complet ADS Nuit (25,73 €/h avec 12 % de structure), générant une perte de -819 €/mois.',
            exceptionResolved: 'Anomalie résolue : Bordereau de prix révisé au tarif plancher conseillé de 28,59 €/h (marge nette 10 %) avant remise de l\'offre.',
            tableHeaders: ['Poste de contrôle', 'Valeur du dossier', 'Seuil réglementaire / coût', 'Verdict'],
            tableRows: function (hasEx, exRes) {
              return [
                ['Volume mensuel Nuit', '300 h / mois', 'Plancher vacation ≥ 6,0 h', { txt: 'Vérifié', cls: 'ok' }],
                ['Repos inter-vacations', 'Rotation 3 agents', 'Repos quotidien ≥ 11,0 h', { txt: 'Vérifié', cls: 'ok' }],
                ['Tarif horaire HT', exRes ? '28,59 €/h (révisé)' : '23,00 €/h (cible)', 'Coût complet : 25,73 €/h', exRes
                  ? { txt: 'Marge +858 €/mois', cls: 'ok' }
                  : { txt: 'Perte -819 €/mois', cls: 'err' }]
              ];
            },
            steps: [
              {
                num: 'Étape 1',
                name: 'Qualification du cahier des charges',
                role: 'Inventaire des volumes horaires et horaires de nuit',
                input: 'CCTP : 300 h/mois en vacation de nuit, prix cible annoncé 23,00 €/h.',
                rule: 'Vérification de la présence des plages horaires et des exigences de qualification.',
                output: 'Dossier AO-2026-118 qualifié pour analyse.'
              },
              {
                num: 'Étape 2',
                name: 'Identification des règles conventionnelles',
                role: 'Application des contraintes IDCC 1351',
                input: 'Plages horaires nocturnes du dossier AO-2026-118.',
                rule: 'Prise en compte du repos quotidien légal ≥ 11 h et du plancher de 6 h (Avenant n° 2).',
                output: 'Cadre social applicable rattaché au chiffrage.'
              },
              {
                num: 'Étape 3',
                name: 'Vérification de faisabilité planning',
                role: 'Dimensionnement de l\'équipe sans chevauchement',
                input: 'Volume de 300 h/mois réparti sur cycles nocturnes.',
                rule: 'Interdiction de tout enchaînement laissant moins de 11,0 h de repos à un opérateur.',
                output: 'Rotation à 3 opérateurs habilités validée.'
              },
              {
                num: 'Étape 4',
                name: 'Calcul du coût complet et du seuil de perte',
                role: 'Exécution de la formule du Bouclier de marge',
                input: 'Coût base ADS Nuit 22,97 €/h + 12 % structure = 25,73 €/h.',
                rule: 'Formule : (23,00 - 25,73) × 300 h = -819 € / mois. Plancher (marge 10 %) = 28,59 €/h.',
                output: 'Alerte de vente à perte (-819 €/mois) remontée à la direction.'
              },
              {
                num: 'Étape 5',
                name: 'Arbitrage de la direction commerciale',
                role: 'Validation du tarif de soumission',
                input: 'Comparatif entre tarif demandé (23,00 €/h) et tarif plancher (28,59 €/h).',
                rule: 'Aucune offre déficitaire ne peut être émise sans arbitrage explicite du dirigeant.',
                output: 'Proposition commerciale ajustée prête pour signature.'
              }
            ]
          }
        ]
      },
      famB: {
        addr: 'Module : Suivi de chantier en 6 jalons & contrôle des pièces (Omnirenov)',
        badgeCls: 'status-badge proto',
        badgeTxt: 'Prototype · Simulation locale (Données fictives)',
        need: 'Outil métier sur mesure',
        sector: 'OMNIRENOV — BTP et rénovation',
        ctaLabel: 'Étudier un outil de suivi chantier ou relance devis →',
        moreHref: 'btp.html',
        moreLabel: 'Ouvrir les démonstrateurs Omnirenov →',
        scenarios: [
          {
            key: 'chantier',
            label: 'Chantier CH-2026-148 · Isolation thermique & PAC (11 400 €)',
            prompt: 'Chantier CH-2026-148 (Lyon) : Suivi des 6 jalons d\'exécution et validité des attestations intervenants',
            refJournal: 'Chantier CH-2026-148 · Coordination & pièces légales',
            beforeTxt: 'Suivi par messages dispersés : attestations URSSAF expirées en cours de lot et réserves oubliées.',
            afterTxt: 'Registre unique en 6 jalons vérifiant les pièces légales avant chaque phase de travaux.',
            exceptionStep: 1,
            exceptionAlert: 'Anomalie interceptée au jalon 2 (Approvisionnement & pièces) : L\'attestation de vigilance URSSAF du sous-traitant arrive à expiration avant la date de pose.',
            exceptionResolved: 'Anomalie résolue : Attestation URSSAF renouvelée et rattachée au dossier CH-2026-148 ; passage au jalon 3 (Exécution) autorisé.',
            tableHeaders: ['Pièce ou jalon contrôlé', 'Lot concerné', 'Échéance / État', 'Statut'],
            tableRows: function (hasEx, exRes) {
              return [
                ['Assurance Décennale', 'Isolation & PAC', 'Valide jusqu\'en 12/2027', { txt: 'Pièce valide', cls: 'ok' }],
                ['Attestation vigilance URSSAF', 'Sous-traitant pose', exRes ? 'Renouvelée (6 mois)' : 'Échéance J-18', exRes
                  ? { txt: 'Régularisée', cls: 'ok' }
                  : (hasEx ? { txt: 'Blocage avant pose', cls: 'err' } : { txt: 'À renouveler', cls: 'warn' })],
                ['Devis associé DEV-148', '11 400 € HT', 'Suivi J+7 (08h30–19h00)', { txt: 'Prêt pour accord', cls: 'ok' }]
              ];
            },
            steps: [
              {
                num: 'Jalon 1',
                name: 'Préparation et dossier administratif',
                role: 'Validation du devis signé et contrôle décennale',
                input: 'Devis DEV-148 (11 400 €) et attestation d\'assurance Décennale.',
                rule: 'Vérification que la garantie décennale couvre l\'activité d\'isolation et de pompe à chaleur.',
                output: 'Dossier administratif validé pour ouverture de chantier.'
              },
              {
                num: 'Jalon 2',
                name: 'Approvisionnement et vigilance sous-traitants',
                role: 'Synchronisation des matériaux et pièces URSSAF',
                input: 'Bon de commande matériaux et dossier administratif de l\'intervenant.',
                rule: 'Toute attestation arrivant à échéance avant la fin des travaux bloque l\'ordre d\'intervention.',
                output: 'Matériaux réservés et contrôle de vigilance URSSAF effectué.'
              },
              {
                num: 'Jalon 3',
                name: 'Exécution et coordination des lots',
                role: 'Suivi de l\'intervention technique sur site',
                input: 'Planning des équipes Isolation thermique et Chauffage.',
                rule: 'Enchaînement des lots validé après confirmation de livraison des équipements.',
                output: 'Travaux exécutés selon le phasage prévu.'
              },
              {
                num: 'Jalon 4',
                name: 'Contrôle technique avant réception',
                role: 'Revue interne de fin de travaux',
                input: 'Fiche d\'auto-contrôle technique sur 8 points de conformité.',
                rule: 'Tout écart technique ouvre une action corrective immédiate avant convocation du client.',
                output: 'Contrôle préalable validé sans anomalie technique.'
              },
              {
                num: 'Jalon 5',
                name: 'Réception contradictoire des travaux',
                role: 'Édition du procès-verbal de réception',
                input: 'Constat de fin de chantier avec le maître d\'ouvrage.',
                rule: 'Consignation horodatée de la réception et des éventuelles observations.',
                output: 'Procès-verbal de réception préparé pour signature.'
              },
              {
                num: 'Jalon 6',
                name: 'Levée des réserves et clôture',
                role: 'Validation finale et autorisation de facturation',
                input: 'Procès-verbal signé et justificatifs de levée de réserves.',
                rule: 'Accord explicite du responsable requis avant émission de la facture de solde.',
                output: 'Chantier clôturé et dossier complet archivé.'
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
      humanDecision: 'En attente de validation'
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
      wfState.humanDecision = 'En attente de validation';
    }

    function playWorkflow(famKey) {
      clearSimTimers();
      var fam = WORKFLOW_FAMILIES[famKey];
      var sc = fam.scenarios[wfState.scIndex] || fam.scenarios[0];
      if (M.reduceMotion) {
        wfState.playing = false;
        wfState.stepIdx = sc.steps.length - 1;
        wfState.selectedIdx = sc.steps.length - 1;
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
      var rows = sc.tableRows(wfState.hasException, wfState.exceptionResolved);

      labAddress.textContent = fam.addr;
      labStatusBadge.className = fam.badgeCls;
      labStatusBadge.textContent = fam.badgeTxt;

      var scPillsHtml = fam.scenarios.length > 1
        ? '<div class="intent-pills" role="group" aria-label="Choisir un dossier de démonstration">' +
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
          '<div style="padding:.75rem .95rem;border-radius:6px;margin-bottom:1rem;border:1px solid ' + (wfState.exceptionResolved ? 'rgba(74,222,128,.55)' : 'var(--signal-err)') + ';background:' + (wfState.exceptionResolved ? 'rgba(74,222,128,.08)' : 'rgba(252,165,165,.1)') + ';font-size:.83rem;display:flex;justify-content:space-between;align-items:center;gap:.75rem;flex-wrap:wrap">' +
            '<span><strong style="color:' + (wfState.exceptionResolved ? 'var(--signal-ok)' : 'var(--signal-err)') + '">' +
              (wfState.exceptionResolved ? 'Anomalie résolue — ' : 'Anomalie interceptée — ') +
            '</strong>' + M.esc(wfState.exceptionResolved ? sc.exceptionResolved : sc.exceptionAlert) + '</span>' +
            (!wfState.exceptionResolved
              ? '<button type="button" class="btn btn-primary btn-xs" id="btnResolveEx">Valider la résolution</button>'
              : '') +
          '</div>';
      }

      labPanel.innerHTML =
        '<div class="intent-bar">' +
          '<div class="intent-prompt">' +
            '<span class="mono" style="color:var(--signal)">Cas étudié :</span>' +
            '<span>' + M.esc(sc.prompt) + '</span>' +
          '</div>' +
          '<div class="lab-controls" role="group" aria-label="Commandes de la simulation">' +
            '<button type="button" class="btn btn-primary btn-xs" id="btnLabPlayPause">' +
              (wfState.playing ? 'Suspendre' : 'Exécuter le flux') +
            '</button>' +
            '<button type="button" class="btn btn-ghost btn-xs" id="btnLabStep">Étape suivante</button>' +
            '<button type="button" class="btn btn-ghost btn-xs" id="btnLabException">Injecter une anomalie</button>' +
            '<button type="button" class="btn btn-ghost btn-xs" id="btnLabReset">Réinitialiser</button>' +
          '</div>' +
        '</div>' +
        scPillsHtml +
        exceptionBanner +
        '<div class="comet-canvas">' +
          '<div class="comet-card">' +
            '<div class="card-kicker">' +
              '<span>Séquence de traitement (cliquez sur une étape)</span>' +
              '<span style="color:var(--signal)">Progression : ' + (wfState.stepIdx + 1) + ' sur ' + steps.length + '</span>' +
            '</div>' +
            '<div class="agent-list" role="listbox" aria-label="Étapes du scénario">' +
              steps.map(function (st, idx) {
                var isDone = idx < wfState.stepIdx || (idx === wfState.stepIdx && !wfState.playing);
                var isRunning = idx === wfState.stepIdx && wfState.playing;
                var isEx = wfState.hasException && !wfState.exceptionResolved && idx === sc.exceptionStep;
                var stateTxt = isEx ? 'Anomalie' : (isRunning ? 'En cours' : (isDone ? 'Vérifié' : 'En attente'));
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
              '<div class="ba-before"><strong>Traitement manuel habituel</strong>' + M.esc(sc.beforeTxt) + '</div>' +
              '<div class="ba-after"><strong>Traitement structuré CANTARA</strong>' + M.esc(sc.afterTxt) + '</div>' +
            '</div>' +
          '</div>' +

          '<div class="comet-card">' +
            '<div class="card-kicker">' +
              '<span>Table de contrôle &amp; inspection</span>' +
              '<span class="status-badge sim">' + M.esc(selStep.num) + '</span>' +
            '</div>' +
            '<table class="ops-table" aria-label="Données de contrôle du dossier">' +
              '<thead><tr>' +
                sc.tableHeaders.map(function (h) { return '<th>' + M.esc(h) + '</th>'; }).join('') +
              '</tr></thead>' +
              '<tbody>' +
                rows.map(function (r) {
                  return '<tr>' +
                    '<td>' + M.esc(r[0]) + '</td>' +
                    '<td class="num">' + M.esc(r[1]) + '</td>' +
                    '<td class="num">' + M.esc(r[2]) + '</td>' +
                    '<td class="' + M.esc(r[3].cls) + '">' + M.esc(r[3].txt) + '</td>' +
                  '</tr>';
                }).join('') +
              '</tbody>' +
            '</table>' +
            '<h3 style="margin:.15rem 0 0;font-family:var(--serif);font-size:1.35rem;font-weight:400;color:var(--cream)">' +
              M.esc(selStep.name) +
            '</h3>' +
            '<ul class="comet-steps">' +
              '<li><b>Données lues</b><span>' + M.esc(selStep.input) + '</span></li>' +
              '<li><b>Règle appliquée</b><span>' + M.esc(selStep.rule) + '</span></li>' +
              '<li><b>Résultat</b><span><strong>' + M.esc(selStep.output) + '</strong></span></li>' +
            '</ul>' +
            '<div style="display:flex;align-items:center;justify-content:space-between;gap:.5rem;flex-wrap:wrap;padding-top:.15rem">' +
              '<span class="mono">Décision : <strong style="color:var(--cream)">' + M.esc(wfState.humanDecision) + '</strong></span>' +
              '<div style="display:flex;gap:.45rem;flex-wrap:wrap">' +
                '<button type="button" class="btn btn-primary btn-xs" id="btnWfApprove">Approuver le dossier</button>' +
                '<button type="button" class="btn btn-ghost btn-xs" id="btnWfReject">Mettre en réserve</button>' +
              '</div>' +
            '</div>' +
            '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.2rem">' +
              (fam.moreHref ? '<a href="' + M.esc(fam.moreHref) + '" class="btn btn-primary btn-sm">' + M.esc(fam.moreLabel) + '</a>' : '') +
              '<button type="button" class="btn ' + (fam.moreHref ? 'btn-ghost' : 'btn-primary') + ' btn-sm" id="btnWfCta">' + M.esc(fam.ctaLabel) + '</button>' +
            '</div>' +
            '<div class="comet-log">' +
              '<b>Journal d\'exploitation local :</b> ' + M.esc(sc.refJournal) + ' · Simulation sur données fictives sans action externe.' +
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
        renderWorkflowFamily(famKey);
      });
      document.getElementById('btnLabException').addEventListener('click', function () {
        clearSimTimers();
        wfState.playing = false;
        wfState.hasException = true;
        wfState.exceptionResolved = false;
        wfState.selectedIdx = sc.exceptionStep;
        renderWorkflowFamily(famKey);
      });
      document.getElementById('btnLabReset').addEventListener('click', function () {
        resetWfState(famKey);
        renderWorkflowFamily(famKey);
      });
      var btnResEx = document.getElementById('btnResolveEx');
      if (btnResEx) {
        btnResEx.addEventListener('click', function () {
          wfState.exceptionResolved = true;
          wfState.humanDecision = 'Anomalie résolue et validée';
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
        wfState.humanDecision = 'Dossier approuvé par le responsable';
        renderWorkflowFamily(famKey);
      });
      document.getElementById('btnWfReject').addEventListener('click', function () {
        wfState.humanDecision = 'Dossier placé en réserve';
        renderWorkflowFamily(famKey);
      });
      document.getElementById('btnWfCta').addEventListener('click', function () {
        selectNeedAndScroll(fam.need, fam.sector);
      });
    }

    /* ========================================================== */
    /* POSTE 2 (famA) — SÉCURITÉ PRIVÉE (SECURIAXE)               */
    /* Planificateur visuel de vacations & Marge contrat          */
    /* ========================================================== */
    var CANDIDATES_SECU = [
      {
        id: 'zaidi',
        name: 'Fatima ZAIDI (Déjà planifiée 09h–21h sur Site Athena)',
        cnaps: 'Valide (échéance J-11)',
        restHours: 4.0,
        overlapHours: 7.0,
        ok: false,
        verdict: 'Affectation refusée : chevauchement de 7,0 h avec le site Athena (09h–21h) et repos quotidien insuffisant (4,0 h < 11,0 h légal).'
      },
      {
        id: 'khelifi',
        name: 'Sofia KHELIFI (Carte professionnelle échue)',
        cnaps: 'Titre expiré',
        restHours: 16.0,
        overlapHours: 0.0,
        ok: false,
        verdict: 'Affectation refusée : carte professionnelle arrivée à expiration dans le registre du personnel.'
      },
      {
        id: 'diakite',
        name: 'Moussa DIAKITE (Disponible · Repos 24,0 h · Titres à jour)',
        cnaps: 'Carte pro, SST & SSIAP 1 valides',
        restHours: 24.0,
        overlapHours: 0.0,
        ok: true,
        verdict: 'Affectation conforme : 0,0 h de chevauchement, habilitations valides jusqu\'à fin de vacation et repos quotidien respecté (24,0 h ≥ 11,0 h).'
      }
    ];
    var secuState = { candIdx: 0, rate: 23.0 };

    function renderFamA() {
      clearSimTimers();
      labAddress.textContent = 'Module : Planificateur de vacations & marge contrat (Securiaxe)';
      labStatusBadge.className = 'status-badge proto';
      labStatusBadge.textContent = 'Prototype & Simulation locale · Données fictives';

      var cand = CANDIDATES_SECU[secuState.candIdx] || CANDIDATES_SECU[0];
      var unitCost = 25.73; /* 22,97 * 1,12 arrondi au centime */
      var floor = 28.59;    /* 25,73 / 0,90 */
      var monthly = Math.round((secuState.rate - unitCost) * 300);

      labPanel.innerHTML =
        '<div class="intent-bar">' +
          '<div class="intent-prompt">' +
            '<span class="mono" style="color:var(--signal)">Cas étudié :</span>' +
            '<span>Couverture de la vacation 14h–22h (Résidence Les Oliviers) &amp; chiffrage d\'un poste Nuit 300 h/mois</span>' +
          '</div>' +
          '<div class="lab-controls">' +
            '<button type="button" class="btn btn-primary btn-xs" id="btnExp3SecuAct">' +
              (secuState.candIdx === 2 && secuState.rate >= floor ? 'Réinitialiser le cas' : 'Affecter le remplaçant valide & appliquer le tarif plancher') +
            '</button>' +
          '</div>' +
        '</div>' +

        '<div class="comet-canvas">' +
          '<div class="comet-card">' +
            '<div class="card-kicker">' +
              '<span>1. Planificateur visuel de vacations</span>' +
              '<span>Règle : repos quotidien ≥ 11,0 h</span>' +
            '</div>' +
            '<label for="selSecuCand" style="font-size:.82rem;color:var(--cream-muted)">Choisir l\'agent affecté sur le créneau 14h–22h (Les Oliviers) :</label>' +
            '<select id="selSecuCand" class="input-ctrl" style="background:var(--night-panel);color:var(--cream);border-color:var(--night-edge)">' +
              CANDIDATES_SECU.map(function (c, i) {
                return '<option value="' + i + '"' + (i === secuState.candIdx ? ' selected' : '') + '>' + M.esc(c.name) + '</option>';
              }).join('') +
            '</select>' +
            '<table class="ops-table" aria-label="Grille de contrôle des créneaux horaires">' +
              '<thead><tr><th>Site &amp; créneau</th><th>Agent pressenti</th><th>Habilitations</th><th>Repos / Conflit</th></tr></thead>' +
              '<tbody>' +
                '<tr><td>Athena · 09h–21h</td><td>Fatima ZAIDI</td><td class="ok">Valide (J-11)</td><td class="ok">Poste en cours</td></tr>' +
                '<tr><td>Les Oliviers · 14h–22h</td><td>' + M.esc(cand.name.split(' (')[0]) + '</td>' +
                  '<td class="' + (cand.cnaps.indexOf('expiré') !== -1 ? 'err' : 'ok') + '">' + M.esc(cand.cnaps) + '</td>' +
                  '<td class="' + (cand.ok ? 'ok' : 'err') + '">' +
                    (cand.overlapHours > 0 ? 'Conflit ' + cand.overlapHours.toFixed(1).replace('.', ',') + ' h' : 'Repos ' + cand.restHours.toFixed(1).replace('.', ',') + ' h') +
                  '</td>' +
                '</tr>' +
                '<tr><td>Logisud · 22h–06h</td><td>Karim BENALI</td><td class="ok">Carte pro &amp; SST</td><td class="ok">Repos 16,0 h</td></tr>' +
              '</tbody>' +
            '</table>' +
            '<p style="margin:0;font-size:.84rem;color:' + (cand.ok ? 'var(--signal-ok)' : 'var(--signal-err)') + ';line-height:1.55">' +
              M.esc(cand.verdict) +
            '</p>' +
          '</div>' +

          '<div class="comet-card">' +
            '<div class="card-kicker">' +
              '<span>2. Simulateur de marge contrat (300 h Nuit)</span>' +
              '<span>Coût complet : 25,73 €/h</span>' +
            '</div>' +
            '<div style="display:flex;justify-content:space-between;align-items:baseline;font-size:.84rem">' +
              '<label for="rngSecuRate">Tarif horaire facturé au client (€/h HT)</label>' +
              '<output id="outSecuRate" class="mono" style="color:var(--cream)">' + secuState.rate.toFixed(2).replace('.', ',') + ' €/h</output>' +
            '</div>' +
            '<input type="range" id="rngSecuRate" min="21" max="34" step="0.5" value="' + secuState.rate + '">' +
            '<table class="ops-table" aria-label="Décomposition économique de la vacation">' +
              '<thead><tr><th>Composante</th><th>Montant horaire</th><th>Impact mensuel (300 h)</th></tr></thead>' +
              '<tbody>' +
                '<tr><td>Coût direct chargé (ADS Nuit)</td><td class="num">22,97 €/h</td><td class="num">6 891 €</td></tr>' +
                '<tr><td>Coût complet (+12 % structure)</td><td class="num">25,73 €/h</td><td class="num">7 719 €</td></tr>' +
                '<tr><td>Plancher conseillé (marge 10 %)</td><td class="ok">28,59 €/h</td><td class="ok">+858 € / mois</td></tr>' +
                '<tr><td>Résultat au tarif simulé (' + secuState.rate.toFixed(2).replace('.', ',') + ' €/h)</td>' +
                  '<td class="' + (monthly >= 0 ? 'ok' : 'err') + '">' + (secuState.rate - unitCost >= 0 ? '+' : '') + (secuState.rate - unitCost).toFixed(2).replace('.', ',') + ' €/h</td>' +
                  '<td class="' + (monthly >= 0 ? 'ok' : 'err') + '">' + (monthly > 0 ? '+' : '') + M.fmtEur(monthly) + '</td>' +
                '</tr>' +
              '</tbody>' +
            '</table>' +
            '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.2rem">' +
              '<a href="securite-privee.html" class="btn btn-primary btn-sm">Démonstrateurs Sécurité complets →</a>' +
              '<a href="https://naitconv-web.github.io/cos-operations-simulateur/boutique/" class="btn btn-ghost btn-sm" target="_blank" rel="noopener noreferrer" data-outbound-product="securiaxe">Site officiel Securiaxe ↗</a>' +
            '</div>' +
            '<div class="comet-log">' +
              '<b>Journal d\'exploitation local :</b> Hypothèses explicites hors bulletin de paie · Avenant n° 2 IDCC 1351 (plancher 6 h) · Repos quotidien ≥ 11,0 h.' +
            '</div>' +
          '</div>' +
        '</div>';

      document.getElementById('selSecuCand').addEventListener('change', function (e) {
        secuState.candIdx = Number(e.target.value) || 0;
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
        renderFamA();
      });
    }

    /* ========================================================== */
    /* POSTE 4 (famC) — GESTION PATRIMONIALE (OMNIPATRIMOINE)     */
    /* Cartographie pédagogique, Scénarios & Collecte (Incubation)*/
    /* ========================================================== */
    var PATRI_PROFILES = {
      equilibre: {
        label: 'Allocation équilibrée (Horizon 8 ans)',
        yieldHyp: '4,2 % / an (hypothèse théorique non garantie, inflation 2,0 %)',
        concentration: 'Répartition équilibrée (aucune classe > 40 %)',
        alloc: [
          { name: 'Liquidités & trésorerie disponible (Court terme)', pct: 15, cls: 'ok' },
          { name: 'Obligations & produits de taux (Moyen terme)', pct: 30, cls: 'ok' },
          { name: 'Immobilier & pierre-papier (Long terme)', pct: 35, cls: 'ok' },
          { name: 'Actions & entreprises (Long terme)', pct: 20, cls: 'ok' }
        ]
      },
      concentre: {
        label: 'Cas de concentration immobilière (72 %)',
        yieldHyp: '3,6 % / an brut théorique (avant fiscalité et charges)',
        concentration: 'Alerte de concentration : 72 % immobilisé / liquidité court terme 8 %',
        alloc: [
          { name: 'Liquidités disponibles (Court terme)', pct: 8, cls: 'err' },
          { name: 'Produits de taux (Moyen terme)', pct: 10, cls: 'ok' },
          { name: 'Immobilier locatif concentré (Long terme)', pct: 72, cls: 'err' },
          { name: 'Actions & entreprises (Long terme)', pct: 10, cls: 'ok' }
        ]
      }
    };
    var patriKey = 'equilibre';
    var patriDocChecked = false;

    function renderFamC() {
      clearSimTimers();
      labAddress.textContent = 'Module : Cartographie pédagogique & complétude documentaire (Omnipatrimoine)';
      labStatusBadge.className = 'status-badge incub';
      labStatusBadge.textContent = 'En incubation · Simulation locale exploratoire';

      var pf = PATRI_PROFILES[patriKey];
      labPanel.innerHTML =
        '<div class="intent-bar">' +
          '<div class="intent-prompt">' +
            '<span class="mono" style="color:var(--signal)">Statut R&amp;D :</span>' +
            '<span>Projet en incubation (non commercialisé) — Visualisation pédagogique sur patrimoine fictif, hors conseil personnalisé.</span>' +
          '</div>' +
          '<div class="lab-controls">' +
            '<button type="button" class="intent-pill' + (patriKey === 'equilibre' ? ' active' : '') + '" data-patri="equilibre">Allocation équilibrée</button>' +
            '<button type="button" class="intent-pill' + (patriKey === 'concentre' ? ' active' : '') + '" data-patri="concentre">Simuler une concentration (72 %)</button>' +
          '</div>' +
        '</div>' +

        '<div class="comet-canvas">' +
          '<div class="comet-card">' +
            '<div class="card-kicker">' +
              '<span>1. Répartition par horizon de liquidité</span>' +
              '<span>Patrimoine fictif d\'illustration</span>' +
            '</div>' +
            '<div class="alloc-bars">' +
              pf.alloc.map(function (a) {
                return '<div class="alloc-row">' +
                  '<div class="alloc-head"><span>' + M.esc(a.name) + '</span><span>' + a.pct + ' %</span></div>' +
                  '<div class="alloc-track"><div class="alloc-fill ' + M.esc(a.cls) + '" style="width:' + a.pct + '%"></div></div>' +
                '</div>';
              }).join('') +
            '</div>' +
            '<table class="ops-table" aria-label="Indicateurs de concentration et d\'horizon">' +
              '<tbody>' +
                '<tr><th>Diagnostic de concentration</th><td class="' + (patriKey === 'concentre' ? 'err' : 'ok') + '">' + M.esc(pf.concentration) + '</td></tr>' +
                '<tr><th>Hypothèses de simulation</th><td>' + M.esc(pf.yieldHyp) + '</td></tr>' +
              '</tbody>' +
            '</table>' +
          '</div>' +

          '<div class="comet-card">' +
            '<div class="card-kicker">' +
              '<span>2. Suivi de collecte documentaire</span>' +
              '<span>Validation humaine obligatoire</span>' +
            '</div>' +
            '<table class="ops-table" aria-label="Registre des pièces du dossier patrimonial">' +
              '<thead><tr><th>Pièce attendue</th><th>Étape</th><th>État de vérification</th></tr></thead>' +
              '<tbody>' +
                '<tr><td>Recueil des objectifs &amp; horizon</td><td>Entretien initial</td><td class="ok">Enregistré</td></tr>' +
                '<tr><td>Justificatif d\'origine des fonds</td><td>Contrôle conformité</td><td class="' + (patriDocChecked ? 'ok' : 'warn') + '">' + (patriDocChecked ? 'VÉRIFIÉ PAR LE CONSEILLER' : 'Pièce à vérifier') + '</td></tr>' +
                '<tr><td>Projet de lettre de mission</td><td>Validation conseiller</td><td class="' + (patriDocChecked ? 'ok' : 'warn') + '">' + (patriDocChecked ? 'Prêt pour revue' : 'Bloqué (pièce manquante)') + '</td></tr>' +
              '</tbody>' +
            '</table>' +
            '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.2rem">' +
              '<button type="button" class="btn btn-primary btn-xs" id="btnPatriCheck">' +
                (patriDocChecked ? 'Réinitialiser le dossier' : 'Valider la pièce justificative en attente') +
              '</button>' +
              '<button type="button" class="btn btn-ghost btn-xs" id="btnPatriContact">Échanger sur ce projet en incubation →</button>' +
            '</div>' +
            '<div class="comet-log">' +
              '<b>Note de transparence :</b> OMNIPATRIMOINE est en phase d\'incubation. Cet aperçu ne constitue ni une offre commerciale ni une recommandation d\'investissement.' +
            '</div>' +
          '</div>' +
        '</div>';

      Array.prototype.slice.call(labPanel.querySelectorAll('[data-patri]')).forEach(function (b) {
        b.addEventListener('click', function () {
          patriKey = b.getAttribute('data-patri');
          renderFamC();
        });
      });
      document.getElementById('btnPatriCheck').addEventListener('click', function () {
        patriDocChecked = !patriDocChecked;
        renderFamC();
      });
      document.getElementById('btnPatriContact').addEventListener('click', function () {
        selectNeedAndScroll('Conseil et cadrage', 'OMNIPATRIMOINE');
      });
    }

    /* ========================================================== */
    /* POSTE 5 (famD) — COMMERCE ET DISTRIBUTION                  */
    /* Compte d'exploitation unitaire SKU & Réapprovisionnement   */
    /* ========================================================== */
    var distState = { buyCost: 42, sellPrice: 68, discountPct: 10, stockUnits: 14, reorderValidated: false };

    function renderFamD() {
      clearSimTimers();
      labAddress.textContent = 'Module : Analyse de marge produit & seuil de réapprovisionnement';
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
            '<span class="mono" style="color:var(--signal)">Article suivi :</span>' +
            '<span>Référence SKU-408 (Équipement professionnel) — Coût d\'achat 42,00 € HT + Logistique 4,50 € HT</span>' +
          '</div>' +
          '<div class="lab-controls">' +
            '<button type="button" class="btn btn-primary btn-xs" id="btnDistReorder">' +
              (distState.reorderValidated ? 'Réinitialiser le stock' : 'Valider la commande fournisseur (+50 unités)') +
            '</button>' +
          '</div>' +
        '</div>' +

        '<div class="comet-canvas">' +
          '<div class="comet-card">' +
            '<div class="card-kicker">' +
              '<span>1. Compte d\'exploitation unitaire (SKU-408)</span>' +
              '<span>Seuil marge cible : 15,0 %</span>' +
            '</div>' +
            '<div style="display:flex;justify-content:space-between;font-size:.82rem">' +
              '<label for="rngDistPrice">Prix de vente catalogue (€ HT)</label>' +
              '<output class="mono" style="color:var(--cream)">' + distState.sellPrice + ',00 €</output>' +
            '</div>' +
            '<input type="range" id="rngDistPrice" min="48" max="95" step="1" value="' + distState.sellPrice + '">' +
            '<div style="display:flex;justify-content:space-between;font-size:.82rem">' +
              '<label for="rngDistDisc">Remise commerciale accordée (%)</label>' +
              '<output class="mono" style="color:var(--cream)">' + distState.discountPct + ' %</output>' +
            '</div>' +
            '<input type="range" id="rngDistDisc" min="0" max="30" step="2" value="' + distState.discountPct + '">' +
            '<table class="ops-table" aria-label="Décomposition de la marge nette unitaire">' +
              '<thead><tr><th>Poste</th><th>Montant HT</th><th>Part du prix net</th></tr></thead>' +
              '<tbody>' +
                '<tr><td>Prix de vente net après remise</td><td class="num">' + netSell.toFixed(2).replace('.', ',') + ' €</td><td class="num">100,0 %</td></tr>' +
                '<tr><td>Coût de revient (achat + préparation)</td><td class="num">46,50 €</td><td class="num">' + (netSell > 0 ? ((46.5 / netSell) * 100).toFixed(1).replace('.', ',') : '0') + ' %</td></tr>' +
                '<tr><td>Marge nette unitaire dégagée</td>' +
                  '<td class="' + (unitMargin > 5 ? 'ok' : 'err') + '">' + unitMargin.toFixed(2).replace('.', ',') + ' €</td>' +
                  '<td class="' + (marginPct >= 15 ? 'ok' : 'err') + '">' + marginPct.toFixed(1).replace('.', ',') + ' %</td>' +
                '</tr>' +
              '</tbody>' +
            '</table>' +
          '</div>' +

          '<div class="comet-card">' +
            '<div class="card-kicker">' +
              '<span>2. État du stock &amp; réapprovisionnement</span>' +
              '<span>Stock de sécurité : 20 unités</span>' +
            '</div>' +
            '<table class="ops-table" aria-label="Suivi des stocks et commandes">' +
              '<thead><tr><th>Indicateur logistique</th><th>Valeur constatée</th><th>État opérationnel</th></tr></thead>' +
              '<tbody>' +
                '<tr><td>Stock physique disponible</td><td class="num">' + (distState.reorderValidated ? (distState.stockUnits + 50) : distState.stockUnits) + ' unités</td>' +
                  '<td class="' + (isLowStock ? 'err' : 'ok') + '">' + (isLowStock ? 'Sous le seuil (20 u.)' : 'Couverture assurée') + '</td></tr>' +
                '<tr><td>Rotation hebdomadaire moyenne</td><td class="num">24 unités / sem.</td><td class="' + (isLowStock ? 'warn' : 'ok') + '">' + (isLowStock ? 'Rupture estimée à J+4' : '18 jours de stock') + '</td></tr>' +
                '<tr><td>Ordre de réapprovisionnement</td><td class="num">Lot de 50 unités</td><td class="' + (distState.reorderValidated ? 'ok' : 'warn') + '">' + (distState.reorderValidated ? 'Commande fournisseur validée' : 'Suggestion en attente d\'accord') + '</td></tr>' +
              '</tbody>' +
            '</table>' +
            '<div style="margin-top:.2rem"><button type="button" class="btn btn-ghost btn-sm" id="btnDistCta">Étudier un outil de pilotage des stocks et marges →</button></div>' +
            '<div class="comet-log">' +
              '<b>Journal d\'exploitation local :</b> Simulation sur catalogue fictif · Contrôle simultané de l\'érosion de marge et du risque de rupture.' +
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
        renderFamD();
      });
      document.getElementById('btnDistCta').addEventListener('click', function () {
        selectNeedAndScroll('Outil métier sur mesure', 'Commerce et distribution');
      });
    }

    /* ========================================================== */
    /* POSTE 6 (famE) — HÔTELLERIE ET RESTAURATION                */
    /* Registre de service, couverture d'équipe & incident client */
    /* ========================================================== */
    var hotelState = { conflictResolved: false };

    function renderFamE() {
      clearSimTimers();
      labAddress.textContent = 'Module : Exploitation hôtelière, planification de service & incident client';
      labStatusBadge.className = 'status-badge sim';
      labStatusBadge.textContent = 'Simulation locale · Données fictives';

      var isResolved = hotelState.conflictResolved;
      labPanel.innerHTML =
        '<div class="intent-bar">' +
          '<div class="intent-prompt">' +
            '<span class="mono" style="color:var(--signal)">Exploitation du jour :</span>' +
            '<span>Hôtel-Restaurant (45 chambres, 39 arrivées, 64 couverts réservés au service du soir)</span>' +
          '</div>' +
          '<div class="lab-controls">' +
            '<button type="button" class="btn btn-primary btn-xs" id="btnHotelResolve">' +
              (isResolved ? 'Réinitialiser le service' : 'Affecter le renfort salle & approuver le relogement') +
            '</button>' +
          '</div>' +
        '</div>' +

        '<div class="comet-canvas">' +
          '<div class="comet-card">' +
            '<div class="card-kicker">' +
              '<span>1. Couverture des équipes par créneau</span>' +
              '<span>Cadence cible : 13 couverts / équipier</span>' +
            '</div>' +
            '<table class="ops-table" aria-label="Registre de planification des services">' +
              '<thead><tr><th>Service &amp; horaire</th><th>Charge prévue</th><th>Effectif planifié</th><th>Statut</th></tr></thead>' +
              '<tbody>' +
                '<tr><td>Réception &amp; étages (07h–15h)</td><td>39 départs / 39 arrivées</td><td class="num">6 / 6 équipiers</td><td class="ok">38 / 39 chambres prêtes</td></tr>' +
                '<tr><td>Restauration Midi (12h–15h)</td><td>42 couverts</td><td class="num">4 / 4 équipiers</td><td class="ok">Service équilibré</td></tr>' +
                '<tr><td>Restauration Soir (19h–23h)</td><td>64 couverts réservés</td>' +
                  '<td class="num">' + (isResolved ? '5 / 5 équipiers' : '4 / 5 équipiers') + '</td>' +
                  '<td class="' + (isResolved ? 'ok' : 'err') + '">' + (isResolved ? 'Renfort Lucas M. affecté' : 'Sous-effectif (-1 salle)') + '</td>' +
                '</tr>' +
              '</tbody>' +
            '</table>' +
            '<p style="margin:0;font-size:.83rem;color:var(--cream-muted);line-height:1.55">' +
              (isResolved
                ? 'Le renfort de salle (Lucas M., repos hebdomadaire et amplitude journalière vérifiés) couvre le pic de 20h00.'
                : 'Alerte de charge sur le service du soir : 64 couverts confirmés pour 4 équipiers planifiés. Un équipier de réserve est disponible sans dépassement d\'amplitude.') +
            '</p>' +
          '</div>' +

          '<div class="comet-card">' +
            '<div class="card-kicker">' +
              '<span>2. Traitement d\'incident &amp; réclamation</span>' +
              '<span>Dossier CH-204</span>' +
            '</div>' +
            '<ul class="comet-steps">' +
              '<li><b>Signalement</b><span>Chambre 204 (16h15) : défaut de climatisation signalé à l\'arrivée du client.</span></li>' +
              '<li><b>Proposition</b><span>Relogement immédiat en Chambre 302 (catégorie supérieure disponible et inspectée) + bon d\'intervention technique créé.</span></li>' +
              '<li><b>État</b><span><strong>' + (isResolved ? 'Relogement en Chambre 302 validé par le directeur d\'exploitation' : 'En attente de validation par le responsable de service') + '</strong></span></li>' +
            '</ul>' +
            '<div style="margin-top:.2rem"><button type="button" class="btn btn-ghost btn-sm" id="btnHotelCta">Étudier un outil de planification ou de suivi d\'exploitation →</button></div>' +
            '<div class="comet-log">' +
              '<b>Journal d\'exploitation local :</b> Simulation sur données hôtelières fictives · Arbitrage humain sur l\'affectation et le geste commercial.' +
            '</div>' +
          '</div>' +
        '</div>';

      document.getElementById('btnHotelResolve').addEventListener('click', function () {
        hotelState.conflictResolved = !hotelState.conflictResolved;
        renderFamE();
      });
      document.getElementById('btnHotelCta').addEventListener('click', function () {
        selectNeedAndScroll('Outil métier sur mesure', 'Hôtellerie et restauration');
      });
    }

    /* Sélecteur principal des 6 domaines du CANTARA LAB */
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
        label: 'Orientation · Question 1 sur 4',
        title: 'Dans quel contexte s\'inscrit votre démarche ?',
        options: [
          { value: 'transversal', key: 'A', label: 'Entreprise (services, commerce, hôtellerie, industrie) cherchant un outil ou une automatisation' },
          { value: 'securite', key: 'B', label: 'Société de sécurité privée (planification, marges, conformité CSI / IDCC 1351)' },
          { value: 'btp', key: 'C', label: 'Entreprise du BTP et de la rénovation (suivi de chantier, pièces légales, relance devis)' },
          { value: 'patrimoine', key: 'D', label: 'Cabinet de gestion patrimoniale (intérêt exploratoire pour Omnipatrimoine)' }
        ]
      },
      {
        id: 'need',
        label: 'Orientation · Question 2 sur 4',
        title: 'Quelle est la nature principale de votre besoin ?',
        options: [
          { value: 'logiciel', key: 'A', label: 'Développement logiciel, outil métier sur mesure ou intégration de systèmes' },
          { value: 'auto_ia', key: 'B', label: 'Automatisation de processus, intégration d\'assistants IA ou orchestration multi-agents' },
          { value: 'conseil', key: 'C', label: 'Conseil et cadrage technologique, formation des équipes ou évolution d\'une solution' }
        ]
      },
      {
        id: 'horizon',
        label: 'Orientation · Question 3 sur 4',
        title: 'Quelle première étape souhaitez-vous engager ?',
        options: [
          { value: 'demo', key: 'A', label: 'Tester un démonstrateur métier existant (Securiaxe ou Omnirenov)' },
          { value: 'cadrage', key: 'B', label: 'Échanger sur le cadrage d\'un projet sur mesure ou d\'un prototype' },
          { value: 'audit', key: 'C', label: 'Évaluer la faisabilité d\'une automatisation sur nos flux actuels' }
        ]
      },
      {
        id: 'size',
        label: 'Orientation · Question 4 sur 4',
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
          title: 'Explorez le suivi de chantier & relance devis Omnirenov',
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
        badge: 'Orientation : Ingénierie & systèmes sur mesure',
        title: 'Cadrage technologique, développement & automatisation',
        desc: 'Expérimentez nos postes de démonstration dans CANTARA LAB (Services, Commerce, Hôtellerie) et complétez le formulaire ci-contre pré-rempli selon vos réponses.',
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
            '<span class="mono">' + M.esc(q.label) + '</span>' +
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
            (idx > 0 ? '<button type="button" class="link-btn" id="dPrev">← Question précédente</button>' : '<span></span>') +
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
        '<div style="border-top:1px solid var(--edge);padding-top:1rem;display:flex;justify-content:space-between;align-items:center;gap:.75rem;flex-wrap:wrap">' +
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
        var summaryText =
          'Nature du besoin : ' + need + '\n' +
          'Secteur/Solution : ' + sector + '\n' +
          'Interlocuteur    : ' + name + ' (' + org + ')\n' +
          'E-mail           : ' + mail + '\n' +
          'Projet / Besoin  : ' + msg;

        isSubmitting = true;
        if (submitBtn) submitBtn.disabled = true;
        noticeEl.innerHTML =
          '<div class="form-state-box form-state-sending" data-form-state="sending">' +
            '<strong>État : Envoi en cours…</strong>' +
            'Vérification du canal de réception serveur et transmission de votre demande…' +
          '</div>';

        M.submitServerContact({
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

          if (result.status === 'CONFIRMED') {
            noticeEl.innerHTML =
              '<div class="form-state-box form-state-confirmed" data-form-state="confirmed">' +
                '<strong>État : Réception confirmée par le serveur</strong>' +
                M.esc(result.message) + (result.serverRef ? ' (Référence : ' + M.esc(result.serverRef) + ')' : '') +
              '</div>';
            contactForm.reset();
            return;
          }

          if (result.status === 'TIMEOUT') {
            noticeEl.innerHTML =
              '<div class="form-state-box form-state-timeout" data-form-state="timeout">' +
                '<strong>État : Délai dépassé — Aucune confirmation serveur</strong>' +
                M.esc(result.message) + ' Vous pouvez réessayer ou copier votre récapitulatif ci-dessous :' +
                '<pre id="dossierRecap">' + M.esc(summaryText) + '</pre>' +
                '<div style="display:flex;gap:.55rem;flex-wrap:wrap;align-items:center">' +
                  '<button type="button" class="btn btn-primary btn-xs" id="btnCopyDossier">Copier mon récapitulatif</button>' +
                  '<a href="mentions.html" class="btn btn-ghost btn-xs">Coordonnées légales (Mentions) →</a>' +
                  '<span class="mono" id="copyFeedback"></span>' +
                '</div>' +
              '</div>';
          } else {
            noticeEl.innerHTML =
              '<div class="form-state-box form-state-error" data-form-state="unconfigured">' +
                '<strong>État : Transmission serveur non effectuée — Aucun envoi simulé</strong>' +
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
                  feedback.textContent = 'Récapitulatif copié dans le presse-papiers.';
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
