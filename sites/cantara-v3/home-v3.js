/*
 * CANTARA V3 — Logique interactive de la vitrine institutionnelle (index.html) :
 * 1. CANTARA LAB (Section D) — 3 Expériences interactives :
 *    - Expérience 1 : Orchestration multi-agents (scénario 5 étapes + sélection/inspection d'agent)
 *    - Expérience 2 : Automatisation d'un processus métier (5 étapes : Entrée -> Règle -> Action -> Notification -> Résultat)
 *    - Expérience 3 : Démonstrations métiers (SECURIAXE, OMNIRENOV, aperçu exploratoire OMNIPATRIMOINE en incubation)
 * 2. Diagnostic d'orientation (4 questions) couplé à la Section F
 * 3. Formulaire de contact qualifié (4 motifs officiels) SANS confirmation fictive lorsque WEBHOOK_ENABLED = false
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

    var activeExp = 'exp1';
    var simTimers = [];
    var prevHash = 'GENESIS';

    function clearSimTimers() {
      while (simTimers.length) {
        clearTimeout(simTimers.pop());
      }
    }

    function selectMotifAndScroll(motifValue, sectorValue) {
      var motifSelect = document.getElementById('cMotif');
      var sectorSelect = document.getElementById('cSector');
      if (motifSelect && motifValue) {
        for (var i = 0; i < motifSelect.options.length; i++) {
          if (motifSelect.options[i].value.toLowerCase().indexOf(motifValue.toLowerCase()) !== -1) {
            motifSelect.selectedIndex = i;
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
    /* EXPÉRIENCE 1 — ORCHESTRATION MULTI-AGENTS (5 ÉTAPES)       */
    /* ========================================================== */
    var EXP1_SCENARIOS = {
      contrat: {
        label: 'Mission A · Audit & chiffrage multi-sites',
        requestTitle: 'Demande entrante : Contrat de prestation multi-sites (300 h Nuit + astreinte)',
        agents: [
          {
            id: 'reception',
            stepNum: '1. Réception',
            name: 'Collecteur d\'Entrée & Horodatage',
            role: 'Réception d\'une demande et qualification initiale',
            mission: 'Capturer la demande brute du client, vérifier l\'intégrité des paramètres d\'entrée et ouvrir un dossier horodaté sans altération.',
            input: 'Cahier des charges : 300 h/mois Nuit, tarif demandé 23,00 €/h, 2 sites.',
            rule: 'Vérification de présence des volumes horaires, de la plage temporelle et du taux cible.',
            output: 'Dossier REQ-2026-089 structuré et transmis à l\'Agent Analyste.'
          },
          {
            id: 'analyse',
            stepNum: '2. Analyse',
            name: 'Agent Analyste de Mission',
            role: 'Analyse de la mission et découpage en contraintes',
            mission: 'Décomposer la demande en contraintes élémentaires vérifiables : cadre réglementaire, équilibre financier et faisabilité planning.',
            input: 'Dossier structuré REQ-2026-089.',
            rule: 'Identification automatique des conventions applicables (IDCC 1351, Avenant n° 2 plancher 6 h, repos quotidien ≥ 11 h).',
            output: 'Arbre de mission décomposé en 2 sous-tâches spécialisées.'
          },
          {
            id: 'attribution',
            stepNum: '3. Attribution',
            name: 'Orchestrateur & Agent Conformité',
            role: 'Attribution aux agents spécialisés (Légal & Planning)',
            mission: 'Affecter le contrôle des habilitations et des temps de repos à l\'Agent Conformité tout en isolant toute donnée nominative.',
            input: 'Sous-tâche Conformité & Planning.',
            rule: 'Contrôle strict : carte professionnelle valide jusqu\'à fin de vacation, SST à jour, repos quotidien ≥ 11,0 h entre deux postes.',
            output: 'Verrou réglementaire validé : candidat conforme identifié (repos 24 h).'
          },
          {
            id: 'execution',
            stepNum: '4. Exécution',
            name: 'Agent Financier & Bouclier de Marge',
            role: 'Exécution des tâches simulées de chiffrage',
            mission: 'Calculer le coût complet réel (base 22,97 €/h + 12 % structure = 25,73 €/h) et détecter toute vente à perte avant émission.',
            input: 'Tarif sollicité : 23,00 €/h sur 300 h/mois (structure 12 %).',
            rule: 'Formule déterministe : (23,00 - 25,73) × 300 h = -819 € / mois. Plancher conseillé (marge 10 %) = 28,59 €/h.',
            output: 'Alerte vente à perte (-819 €/mois) interceptée et proposition de révision à 28,59 €/h générée.'
          },
          {
            id: 'restitution',
            stepNum: '5. Restitution',
            name: 'Agent Auditeur & Sas Humain',
            role: 'Contrôle croisé et restitution du résultat au dirigeant',
            mission: 'Assembler les preuves des agents spécialisés, générer l\'empreinte de contrôle locale et présenter l\'arbitrage au dirigeant.',
            input: 'Sorties convergentes des agents Conformité et Financier.',
            rule: 'Aucune décision automatique : soumission obligatoire au Sas humain [OUI] / [NON].',
            output: 'Synthèse prête pour arbitrage : planning conforme (repos ≥ 11 h) + révision tarifaire à 28,59 €/h.'
          }
        ]
      },
      conformite: {
        label: 'Mission B · Revue documentaire & échéances sous-traitants',
        requestTitle: 'Demande entrante : Vérification avant démarrage d\'un chantier multi-intervenants',
        agents: [
          {
            id: 'reception',
            stepNum: '1. Réception',
            name: 'Collecteur Documentaire',
            role: 'Réception du dossier chantier et inventaire des pièces',
            mission: 'Enregistrer la liste des lots travaux et des attestations fournies pour le chantier.',
            input: 'Lot Charpente & Lot Isolation (devis 18 900 € et 11 400 €).',
            rule: 'Inventaire des pièces obligatoires : assurance Décennale et attestation de vigilance URSSAF.',
            output: 'Lot documentaire CH-2026-152 indexé.'
          },
          {
            id: 'analyse',
            stepNum: '2. Analyse',
            name: 'Agent Analyste Réglementaire',
            role: 'Analyse des dates de validité et couverture des lots',
            mission: 'Comparer les dates de validité des attestations avec la période réelle d\'exécution du chantier.',
            input: 'Calendrier chantier vs dates d\'échéance des pièces.',
            rule: 'Toute pièce arrivant à échéance avant la fin des travaux déclenche une vigilance proactive.',
            output: 'Détection d\'une attestation URSSAF arrivant à échéance à J-18 sur le lot Charpente.'
          },
          {
            id: 'attribution',
            stepNum: '3. Attribution',
            name: 'Orchestrateur deFlux',
            role: 'Attribution aux agents Vigilance et Communication',
            mission: 'Répartir la préparation de la demande de renouvellement et le suivi courtois du devis client.',
            input: 'Alerte J-18 sous-traitant + Devis client à J+3.',
            rule: 'Respect de la règle de bienséance : créneau ouvré 08h30–19h00 et plafond de 2 relances.',
            output: 'Tâches assignées aux deux agents d\'exécution.'
          },
          {
            id: 'execution',
            stepNum: '4. Exécution',
            name: 'Agent Rédacteur & Pseudonymisation',
            role: 'Exécution des brouillons sous garde-fou RGPD',
            mission: 'Préparer le message de relance courtois avec mention STOP et la notification de mise à jour d\'attestation.',
            input: 'Paramètres du dossier CH-2026-152.',
            rule: 'Masquage des données sensibles et insertion systématique de l\'option de désinscription.',
            output: '2 brouillons conformes préparés sans aucun envoi automatique.'
          },
          {
            id: 'restitution',
            stepNum: '5. Restitution',
            name: 'Agent Auditeur & Sas Humain',
            role: 'Contrôle final et restitution dans le poste dirigeant',
            mission: 'Regrouper l\'alerte documentaire et le brouillon de suivi dans une vue unique prête à valider.',
            input: 'Sorties vérifiées des 4 étapes précédentes.',
            rule: 'Validation humaine explicite requise avant toute action externe.',
            output: 'Dossier consolidé prêt : 1 vigilance J-18 interceptée + 1 suivi courtois prêt dans le Sas.'
          }
        ]
      }
    };

    var exp1ScenarioKey = 'contrat';
    var exp1SelectedIdx = 0;
    var exp1ProgressStep = 5; /* 1..5 완료 par défaut pour visibilité immédiate, animé au clic */
    var exp1Running = false;

    function runExp1Simulation() {
      clearSimTimers();
      var sc = EXP1_SCENARIOS[exp1ScenarioKey];
      if (M.reduceMotion) {
        exp1Running = false;
        exp1ProgressStep = 5;
        exp1SelectedIdx = 4;
        prevHash = M.hashDemo('EXP1-DONE-' + exp1ScenarioKey, prevHash);
        renderExp1();
        return;
      }
      exp1Running = true;
      exp1ProgressStep = 1;
      exp1SelectedIdx = 0;
      renderExp1();

      var step = 1;
      function next() {
        step += 1;
        if (step <= sc.agents.length) {
          exp1ProgressStep = step;
          exp1SelectedIdx = step - 1;
          prevHash = M.hashDemo('EXP1-STEP-' + step, prevHash);
          renderExp1();
          simTimers.push(setTimeout(next, 520));
        } else {
          exp1Running = false;
          renderExp1();
        }
      }
      simTimers.push(setTimeout(next, 520));
    }

    function renderExp1() {
      var sc = EXP1_SCENARIOS[exp1ScenarioKey];
      var selectedAgent = sc.agents[exp1SelectedIdx] || sc.agents[0];
      labAddress.textContent = 'cantara://lab/experience-01-orchestration-multi-agents';
      labStatusBadge.className = 'status-badge sim';
      labStatusBadge.textContent = 'Simulation interactive · Données fictives';

      labPanel.innerHTML =
        '<div class="intent-bar">' +
          '<div class="intent-prompt">' +
            '<span class="mono" style="color:var(--signal)">[Scénario]</span>' +
            '<span>' + M.esc(sc.requestTitle) + '</span>' +
          '</div>' +
          '<div style="display:flex;gap:.5rem;flex-wrap:wrap">' +
            '<button type="button" class="btn btn-primary btn-sm" id="btnRunExp1">' +
              (exp1Running ? 'Orchestration en cours…' : 'Lancer la simulation ▶') +
            '</button>' +
          '</div>' +
        '</div>' +

        '<div class="intent-pills" role="group" aria-label="Choisir une mission d\'orchestration">' +
          '<button type="button" class="intent-pill' + (exp1ScenarioKey === 'contrat' ? ' active' : '') + '" data-exp1-sc="contrat">' +
            M.esc(EXP1_SCENARIOS.contrat.label) +
          '</button>' +
          '<button type="button" class="intent-pill' + (exp1ScenarioKey === 'conformite' ? ' active' : '') + '" data-exp1-sc="conformite">' +
            M.esc(EXP1_SCENARIOS.conformite.label) +
          '</button>' +
        '</div>' +

        '<div class="comet-canvas">' +
          '<div class="comet-card">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;gap:.5rem;flex-wrap:wrap">' +
              '<span class="mono">[CHAÎNE MULTI-AGENTS · CLIQUEZ SUR UN AGENT]</span>' +
              '<span class="mono" style="color:var(--signal)">Étape ' + exp1ProgressStep + ' / 5</span>' +
            '</div>' +
            '<div class="agent-list" role="listbox" aria-label="Agents spécialisés de la simulation">' +
              sc.agents.map(function (ag, idx) {
                var isDone = (idx + 1) < exp1ProgressStep || ((idx + 1) === exp1ProgressStep && !exp1Running);
                var isRunning = (idx + 1) === exp1ProgressStep && exp1Running;
                var stateTxt = isRunning ? 'En cours…' : (isDone ? 'Exécuté ✓' : 'En attente');
                var cls = 'agent-node' +
                  (idx === exp1SelectedIdx ? ' selected' : '') +
                  (isDone ? ' done' : '') +
                  (isRunning ? ' running' : '');
                return '<button type="button" class="' + cls + '" role="option" aria-selected="' + (idx === exp1SelectedIdx ? 'true' : 'false') + '" data-agent-idx="' + idx + '">' +
                  '<div style="display:flex;align-items:center;gap:.75rem;min-width:0">' +
                    '<span class="agent-step-badge">' + M.esc(ag.stepNum) + '</span>' +
                    '<div style="min-width:0">' +
                      '<span class="agent-title">' + M.esc(ag.name) + '</span>' +
                      '<span class="agent-role">' + M.esc(ag.role) + '</span>' +
                    '</div>' +
                  '</div>' +
                  '<span class="agent-state">' + M.esc(stateTxt) + '</span>' +
                '</button>';
              }).join('') +
            '</div>' +
          '</div>' +

          '<div class="comet-card">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;gap:.5rem;flex-wrap:wrap">' +
              '<span class="mono">[INSPECTION DE L\'AGENT SÉLECTIONNÉ]</span>' +
              '<span class="status-badge sim">' + M.esc(selectedAgent.stepNum) + '</span>' +
            '</div>' +
            '<h3 style="margin:.15rem 0 0;font-family:var(--serif);font-size:1.55rem;font-weight:400;color:var(--cream)">' +
              M.esc(selectedAgent.name) +
            '</h3>' +
            '<p style="margin:0;font-size:.88rem;color:var(--cream-muted);line-height:1.55">' +
              M.esc(selectedAgent.mission) +
            '</p>' +
            '<ul class="comet-steps">' +
              '<li><b>[ENTRÉE]</b><span>' + M.esc(selectedAgent.input) + '</span></li>' +
              '<li><b>[RÈGLE]</b><span>' + M.esc(selectedAgent.rule) + '</span></li>' +
              '<li><b>[RÉSULTAT]</b><span><strong>' + M.esc(selectedAgent.output) + '</strong></span></li>' +
            '</ul>' +
            '<div style="display:flex;gap:.55rem;flex-wrap:wrap;margin-top:.25rem">' +
              '<button type="button" class="btn btn-primary btn-sm" id="btnExp1Cta">Étudier une orchestration pour mon entreprise →</button>' +
            '</div>' +
            '<div class="comet-log">' +
              '<b>[TRACE SIMULÉE · ' + M.esc(prevHash) + ']</b> Simulation locale déterministe (0 appel LLM externe · données fictives).' +
            '</div>' +
          '</div>' +
        '</div>';

      document.getElementById('btnRunExp1').addEventListener('click', runExp1Simulation);
      Array.prototype.slice.call(labPanel.querySelectorAll('[data-exp1-sc]')).forEach(function (b) {
        b.addEventListener('click', function () {
          clearSimTimers();
          exp1ScenarioKey = b.getAttribute('data-exp1-sc');
          exp1SelectedIdx = 0;
          exp1ProgressStep = 5;
          exp1Running = false;
          renderExp1();
        });
      });
      Array.prototype.slice.call(labPanel.querySelectorAll('[data-agent-idx]')).forEach(function (node) {
        node.addEventListener('click', function () {
          exp1SelectedIdx = Number(node.getAttribute('data-agent-idx')) || 0;
          renderExp1();
        });
      });
      document.getElementById('btnExp1Cta').addEventListener('click', function () {
        selectMotifAndScroll('besoin', 'Ingénierie');
      });
    }

    /* ========================================================== */
    /* EXPÉRIENCE 2 — AUTOMATISATION D'UN PROCESSUS MÉTIER        */
    /* ========================================================== */
    var EXP2_FLOWS = {
      relance: {
        title: 'Processus 1 · Suivi automatisé d\'un devis sans réponse à J+7',
        inputSummary: 'Devis DEV-2026-148 (11 400 €) envoyé il y a 7 jours, sans retour client.',
        steps: [
          { num: '1. Entrée de données', name: 'Détection du dossier', desc: 'Devis DEV-148 (11 400 €) identifié à J+7 sans réponse enregistrée.' },
          { num: '2. Règle métier', name: 'Contrôle de bienséance', desc: 'Jour ouvré (08h30–19h00) vérifié, attestations à jour et moins de 2 relances.' },
          { num: '3. Action automatisée', name: 'Préparation du suivi', desc: 'Génération d\'un message courtois personnalisé incluant la mention STOP.' },
          { num: '4. Notification', name: 'Alerte dans le Sas', desc: 'Le responsable est notifié qu\'un suivi est prêt pour validation en 1 clic.' },
          { num: '5. Résultat final', name: 'Validation & Trace', desc: 'Après votre clic [OUI], le dossier passe en statut suivi et l\'action est tracée.' }
        ],
        benefit: 'Résultat compréhensible immédiatement : aucun devis chiffré n\'est oublié, aucune relance intrusive ne part le soir ou le week-end, et le dirigeant garde la validation finale.'
      },
      vigilance: {
        title: 'Processus 2 · Vigilance sur une attestation légale arrivant à échéance',
        inputSummary: 'Attestation réglementaire arrivant à expiration dans 15 jours sur un dossier actif.',
        steps: [
          { num: '1. Entrée de données', name: 'Lecture d\'échéance', desc: 'Échéance détectée à J-15 lors du contrôle périodique du référentiel.' },
          { num: '2. Règle métier', name: 'Seuil de prévenance', desc: 'Règle active : alerter à J-15 et bloquer toute affectation si la date est dépassée.' },
          { num: '3. Action automatisée', name: 'Demande de pièce', desc: 'Préparation automatique de la demande de renouvellement avec liste des pièces.' },
          { num: '4. Notification', name: 'Sas d\'exploitation', desc: 'Mise en évidence de l\'alerte prioritaire sur le tableau de bord dirigeant.' },
          { num: '5. Résultat final', name: 'Risque neutralisé', desc: 'Dossier régularisé avant échéance, zéro défaut de conformité en cas de contrôle.' }
        ],
        benefit: 'Résultat compréhensible immédiatement : les dates critiques sont surveillées en permanence par une règle déterministe au lieu de reposer sur la mémoire humaine.'
      }
    };

    var exp2Key = 'relance';
    var exp2Step = 5;
    var exp2Running = false;
    var exp2Decision = 'En attente de votre clic';

    function runExp2Simulation() {
      clearSimTimers();
      exp2Decision = 'Pipeline exécuté · Prêt dans le Sas';
      if (M.reduceMotion) {
        exp2Running = false;
        exp2Step = 5;
        prevHash = M.hashDemo('EXP2-RUN-' + exp2Key, prevHash);
        renderExp2();
        return;
      }
      exp2Running = true;
      exp2Step = 1;
      renderExp2();
      var s = 1;
      function tick() {
        s += 1;
        if (s <= 5) {
          exp2Step = s;
          prevHash = M.hashDemo('EXP2-STEP-' + s, prevHash);
          renderExp2();
          simTimers.push(setTimeout(tick, 460));
        } else {
          exp2Running = false;
          renderExp2();
        }
      }
      simTimers.push(setTimeout(tick, 460));
    }

    function renderExp2() {
      var fl = EXP2_FLOWS[exp2Key];
      labAddress.textContent = 'cantara://lab/experience-02-automatisation-processus';
      labStatusBadge.className = 'status-badge sim';
      labStatusBadge.textContent = 'Simulation de processus · 0 envoi réel';

      labPanel.innerHTML =
        '<div class="intent-bar">' +
          '<div class="intent-prompt">' +
            '<span class="mono" style="color:var(--signal)">[Flux métier]</span>' +
            '<span>' + M.esc(fl.title) + '</span>' +
          '</div>' +
          '<button type="button" class="btn btn-primary btn-sm" id="btnRunExp2">' +
            (exp2Running ? 'Exécution du flux…' : 'Déclencher le scénario ▶') +
          '</button>' +
        '</div>' +

        '<div class="intent-pills" role="group" aria-label="Choisir un scénario d\'automatisation">' +
          '<button type="button" class="intent-pill' + (exp2Key === 'relance' ? ' active' : '') + '" data-exp2-key="relance">' +
            'Scénario 1 · Suivi de devis J+7' +
          '</button>' +
          '<button type="button" class="intent-pill' + (exp2Key === 'vigilance' ? ' active' : '') + '" data-exp2-key="vigilance">' +
            'Scénario 2 · Échéance d\'attestation J-15' +
          '</button>' +
        '</div>' +

        '<div class="pipe-grid" aria-label="Les 5 étapes du processus automatisé">' +
          fl.steps.map(function (st, idx) {
            var n = idx + 1;
            var cls = 'pipe-step' +
              (n === exp2Step && exp2Running ? ' active' : '') +
              (n <= exp2Step && !exp2Running ? ' done' : (n < exp2Step ? ' done' : ''));
            return '<div class="' + cls + '">' +
              '<span class="pipe-num">' + M.esc(st.num) + '</span>' +
              '<span class="pipe-name">' + M.esc(st.name) + '</span>' +
              '<span class="pipe-desc">' + M.esc(st.desc) + '</span>' +
            '</div>';
          }).join('') +
        '</div>' +

        '<div class="comet-canvas">' +
          '<div class="comet-card">' +
            '<span class="mono">[SYNTHÈSE DU PROCESSUS AUTOMATISÉ]</span>' +
            '<div class="comet-metrics">' +
              '<div class="comet-metric good"><div class="lbl">Étapes vérifiées</div><div class="val">' + exp2Step + ' / 5</div></div>' +
              '<div class="comet-metric"><div class="lbl">Statut Sas humain</div><div class="val" style="font-size:1.35rem">' + M.esc(exp2Decision) + '</div></div>' +
            '</div>' +
            '<p style="margin:0;font-size:.9rem;color:var(--cream-muted);line-height:1.6">' + M.esc(fl.benefit) + '</p>' +
          '</div>' +

          '<div class="comet-card">' +
            '<span class="mono">[ACTION DU DIRIGEANT &amp; CONVERSION]</span>' +
            '<p style="margin:0;font-size:.86rem;color:var(--cream-muted);line-height:1.55">' +
              'Testez l\'arbitrage final du responsable opérationnel sur ce flux :' +
            '</p>' +
            '<div style="display:flex;gap:.55rem;flex-wrap:wrap">' +
              '<button type="button" class="btn btn-primary btn-sm" id="btnExp2Approve">Approuver l\'action [OUI]</button>' +
              '<button type="button" class="btn btn-ghost btn-sm" id="btnExp2Reject">Mettre en attente [NON]</button>' +
            '</div>' +
            '<div style="margin-top:.35rem">' +
              '<button type="button" class="btn btn-ghost btn-sm" id="btnExp2Cta">Automatiser un processus dans mon entreprise →</button>' +
            '</div>' +
            '<div class="comet-log">' +
              '<b>[TRACE SIMULÉE · ' + M.esc(prevHash) + ']</b> Entrée : ' + M.esc(fl.inputSummary) +
            '</div>' +
          '</div>' +
        '</div>';

      document.getElementById('btnRunExp2').addEventListener('click', runExp2Simulation);
      Array.prototype.slice.call(labPanel.querySelectorAll('[data-exp2-key]')).forEach(function (b) {
        b.addEventListener('click', function () {
          clearSimTimers();
          exp2Key = b.getAttribute('data-exp2-key');
          exp2Step = 5;
          exp2Running = false;
          exp2Decision = 'Prêt dans le Sas';
          renderExp2();
        });
      });
      document.getElementById('btnExp2Approve').addEventListener('click', function () {
        exp2Decision = 'Validé [OUI] ✓';
        prevHash = M.hashDemo('EXP2-OUI-' + exp2Key, prevHash);
        renderExp2();
      });
      document.getElementById('btnExp2Reject').addEventListener('click', function () {
        exp2Decision = 'Reporté [NON]';
        prevHash = M.hashDemo('EXP2-NON-' + exp2Key, prevHash);
        renderExp2();
      });
      document.getElementById('btnExp2Cta').addEventListener('click', function () {
        selectMotifAndScroll('demonstration', 'Ingénierie');
      });
    }

    /* ========================================================== */
    /* EXPÉRIENCE 3 — DÉMONSTRATIONS MÉTIERS                      */
    /* (SECURIAXE · OMNIRENOV · OMNIPATRIMOINE EN INCUBATION)     */
    /* ========================================================== */
    var exp3Sub = 'securiaxe';
    var exp3SecuResolved = false;
    var exp3RenovApproved = false;

    function renderExp3() {
      var subBadges = {
        securiaxe: { cls: 'status-badge proto', txt: 'Opérationnel & Prototype · Données fictives', addr: 'cantara://lab/experience-03/securiaxe' },
        omnirenov: { cls: 'status-badge sim', txt: 'Simulation métier · Données fictives', addr: 'cantara://lab/experience-03/omnirenov' },
        omnipatrimoine: { cls: 'status-badge incub', txt: 'En incubation · Non commercialisé', addr: 'cantara://lab/experience-03/omnipatrimoine-incubation' }
      };
      var info = subBadges[exp3Sub] || subBadges.securiaxe;
      labAddress.textContent = info.addr;
      labStatusBadge.className = info.cls;
      labStatusBadge.textContent = info.txt;

      var bodyHtml = '';
      if (exp3Sub === 'securiaxe') {
        /* GARDE-FOU 3 : Cohérence mathématique exacte avec securite-v3.js (-818 € et 28,59 €/h pour 23 €/h, 300 h, structure 12 %) */
        bodyHtml =
          '<div class="comet-canvas">' +
            '<div class="comet-card">' +
              '<div style="display:flex;justify-content:space-between;align-items:center;gap:.5rem;flex-wrap:wrap">' +
                '<span class="mono">[SECURIAXE · SÉCURITÉ PRIVÉE (CSI &amp; IDCC 1351)]</span>' +
                '<span class="status-badge op">Site dédié actif</span>' +
              '</div>' +
              '<div class="comet-metrics">' +
                '<div class="comet-metric ' + (exp3SecuResolved ? 'good' : 'alert') + '">' +
                  '<div class="lbl">1. Marge ADS Nuit (23 €/h · 300 h)</div>' +
                  '<div class="val">' + (exp3SecuResolved ? '28,59 €/h' : '-819 €') + '</div>' +
                '</div>' +
                '<div class="comet-metric ' + (exp3SecuResolved ? 'good' : 'alert') + '">' +
                  '<div class="lbl">2. Conflit planning &amp; repos 11 h</div>' +
                  '<div class="val">' + (exp3SecuResolved ? '0,0 h (OK)' : '7,0 h conflit') + '</div>' +
                '</div>' +
              '</div>' +
              '<p style="margin:0;font-size:.88rem;color:var(--cream-muted);line-height:1.58">' +
                (exp3SecuResolved
                  ? 'Arbitrage appliqué : le tarif plancher conseillé (marge 10 % sur coût complet 25,73 €/h = 28,59 €/h) protège la marge, et Moussa DIAKITE remplace le poste en chevauchement (CNAPS valide, SST à jour, repos quotidien ≥ 11 h respecté).'
                  : 'Sur 300 h/mois en ADS Nuit (repère 22,97 €/h + 12 % structure = 25,73 €/h), facturer 23,00 €/h génère une perte de -819 €/mois (plancher conseillé marge 10 % : 28,59 €/h). Simultanément, un chevauchement de 7,0 h est détecté sur le planning.') +
              '</p>' +
              '<div style="display:flex;gap:.55rem;flex-wrap:wrap;margin-top:.2rem">' +
                '<button type="button" class="btn btn-primary btn-sm" id="btnExp3SecuAct">' +
                  (exp3SecuResolved ? 'Réinitialiser la simulation' : 'Appliquer le Bouclier & résoudre le conflit [OUI]') +
                '</button>' +
              '</div>' +
            '</div>' +

            '<div class="comet-card">' +
              '<span class="mono">[DISTINCTION RÉEL / PROTOTYPE &amp; REDIRECTION]</span>' +
              '<ul class="comet-steps">' +
                '<li><b>[OPÉRATIONNEL]</b><span><strong>Disponible sur Securiaxe :</strong> Simulateur COS, Arsenal Documentaire v3.2 (690 €), COS Opérations + Atelier 2 h (980 €), Commando AO 48 h (1 450 €).</span></li>' +
                '<li><b>[PROTOTYPE]</b><span><strong>En démonstration sur CANTARA :</strong> Aperçu guidé en 7 étapes de Securiaxe Director (107/107 tests unitaires sur jeu fictif).</span></li>' +
              '</ul>' +
              '<div style="display:flex;gap:.55rem;flex-wrap:wrap;margin-top:.25rem">' +
                '<a href="securite-privee.html" class="btn btn-primary btn-sm">Ouvrir le démonstrateur complet Sécurité →</a>' +
                '<a href="https://naitconv-web.github.io/cos-operations-simulateur/boutique/" class="btn btn-ghost btn-sm" target="_blank" rel="noopener noreferrer" data-outbound-product="securiaxe">Site officiel Securiaxe ↗</a>' +
              '</div>' +
              '<div class="comet-log">' +
                '<b>[TRACE SIMULÉE · ' + M.esc(prevHash) + ']</b> Avenant n° 2 IDCC 1351 (plancher 6 h) · Repos quotidien légal ≥ 11 h.' +
              '</div>' +
            '</div>' +
          '</div>';
      } else if (exp3Sub === 'omnirenov') {
        bodyHtml =
          '<div class="comet-canvas">' +
            '<div class="comet-card">' +
              '<div style="display:flex;justify-content:space-between;align-items:center;gap:.5rem;flex-wrap:wrap">' +
                '<span class="mono">[OMNIRENOV · BTP, CHANTIERS &amp; RELANCE DEVIS]</span>' +
                '<span class="status-badge sim">Simulation active</span>' +
              '</div>' +
              '<div class="comet-metrics">' +
                '<div class="comet-metric good">' +
                  '<div class="lbl">Coordination chantier</div>' +
                  '<div class="val">3 lots suivis</div>' +
                '</div>' +
                '<div class="comet-metric ' + (exp3RenovApproved ? 'good' : '') + '">' +
                  '<div class="lbl">Devis DEV-148 (11 400 €)</div>' +
                  '<div class="val">' + (exp3RenovApproved ? 'Suivi validé' : 'J+7 en attente') + '</div>' +
                '</div>' +
              '</div>' +
              '<p style="margin:0;font-size:.88rem;color:var(--cream-muted);line-height:1.58">' +
                (exp3RenovApproved
                  ? 'Coordination validée : les attestations Décennale et URSSAF du lot Isolation sont conformes, et la relance courtoise J+7 (créneau ouvré 08h30–19h00, mention STOP incluse) est approuvée dans le Sas.'
                  : 'Démonstration combinée : vérification de la conformité des intervenants avant ouverture de chantier (Décennale & vigilance URSSAF) et préparation d\'une relance courtoise J+7 sur un devis de 11 400 €.') +
              '</p>' +
              '<div style="display:flex;gap:.55rem;flex-wrap:wrap;margin-top:.2rem">' +
                '<button type="button" class="btn btn-primary btn-sm" id="btnExp3RenovAct">' +
                  (exp3RenovApproved ? 'Réinitialiser le dossier' : 'Valider le jalon chantier & la relance J+7 [OUI]') +
                '</button>' +
              '</div>' +
            '</div>' +

            '<div class="comet-card">' +
              '<span class="mono">[DISTINCTION STATUT &amp; ACCÈS DÉMONSTRATEUR]</span>' +
              '<ul class="comet-steps">' +
                '<li><b>[DÉMONSTRATEUR]</b><span><strong>Accessible sur CANTARA :</strong> Cockpit de coordination chantier, suivi de devis J+3/J+7 et simulateur de potentiel récupérable.</span></li>' +
                '<li><b>[SITE MÉTIER]</b><span><strong>Statut externe :</strong> Plateforme indépendante Omnirenov en préparation (URL officielle à confirmer).</span></li>' +
              '</ul>' +
              '<div style="display:flex;gap:.55rem;flex-wrap:wrap;margin-top:.25rem">' +
                '<a href="btp.html" class="btn btn-primary btn-sm">Ouvrir le démonstrateur complet Omnirenov →</a>' +
                '<button type="button" class="btn btn-ghost btn-sm" id="btnExp3RenovContact">Demander une présentation →</button>' +
              '</div>' +
              '<div class="comet-log">' +
                '<b>[TRACE SIMULÉE · ' + M.esc(prevHash) + ']</b> Simulation locale sur dossiers travaux fictifs (0 envoi réel).' +
              '</div>' +
            '</div>' +
          '</div>';
      } else {
        bodyHtml =
          '<div class="comet-canvas">' +
            '<div class="comet-card">' +
              '<div style="display:flex;justify-content:space-between;align-items:center;gap:.5rem;flex-wrap:wrap">' +
                '<span class="mono">[OMNIPATRIMOINE · GESTION PATRIMONIALE]</span>' +
                '<span class="status-badge incub">En incubation · Non commercialisé</span>' +
              '</div>' +
              '<div class="comet-metrics">' +
                '<div class="comet-metric">' +
                  '<div class="lbl">Statut du projet</div>' +
                  '<div class="val" style="font-size:1.45rem">En incubation</div>' +
                '</div>' +
                '<div class="comet-metric good">' +
                  '<div class="lbl">Confidentialité</div>' +
                  '<div class="val" style="font-size:1.45rem">100 % Locale</div>' +
                '</div>' +
              '</div>' +
              '<p style="margin:0;font-size:.88rem;color:var(--cream-muted);line-height:1.58">' +
                'Aperçu exploratoire de nos travaux de recherche sur la structuration documentaire pour cabinets de gestion de patrimoine : contrôle de complétude des pièces réglementaires (recueil patrimonial, profil de risque, rapport d\'adéquation) avec pseudonymisation locale.' +
              '</p>' +
            '</div>' +

            '<div class="comet-card">' +
              '<span class="mono">[TRANSPARENCE STRICTE · INCUBATION]</span>' +
              '<ul class="comet-steps">' +
                '<li><b>[INCUBATION]</b><span><strong>Aucune commercialisation active :</strong> OMNIPATRIMOINE est un projet en phase d\'incubation au sein de CANTARA.</span></li>' +
                '<li><b>[EXPLORATION]</b><span><strong>Échanges professionnels :</strong> Les professionnels du patrimoine peuvent partager leurs problématiques documentaires pour nourrir le cahier des charges pilote.</span></li>' +
              '</ul>' +
              '<div style="display:flex;gap:.55rem;flex-wrap:wrap;margin-top:.25rem">' +
                '<button type="button" class="btn btn-primary btn-sm" id="btnExp3PatriContact">Échanger autour du projet en incubation →</button>' +
              '</div>' +
              '<div class="comet-log">' +
                '<b>[STATUT · INCUBATION]</b> Aucun acte de vente ni engagement commercial sur OMNIPATRIMOINE.' +
              '</div>' +
            '</div>' +
          '</div>';
      }

      labPanel.innerHTML =
        '<div class="intent-pills" role="group" aria-label="Choisir une solution métier à explorer">' +
          '<button type="button" class="intent-pill' + (exp3Sub === 'securiaxe' ? ' active' : '') + '" data-exp3-sub="securiaxe">' +
            '1. SECURIAXE (Sécurité privée · Opérationnel &amp; Prototype)' +
          '</button>' +
          '<button type="button" class="intent-pill' + (exp3Sub === 'omnirenov' ? ' active' : '') + '" data-exp3-sub="omnirenov">' +
            '2. OMNIRENOV (BTP &amp; Rénovation · Démonstrateur)' +
          '</button>' +
          '<button type="button" class="intent-pill' + (exp3Sub === 'omnipatrimoine' ? ' active' : '') + '" data-exp3-sub="omnipatrimoine">' +
            '3. OMNIPATRIMOINE (Gestion patrimoniale · En incubation)' +
          '</button>' +
        '</div>' +
        bodyHtml;

      Array.prototype.slice.call(labPanel.querySelectorAll('[data-exp3-sub]')).forEach(function (b) {
        b.addEventListener('click', function () {
          exp3Sub = b.getAttribute('data-exp3-sub');
          renderExp3();
        });
      });

      var btnSecu = document.getElementById('btnExp3SecuAct');
      if (btnSecu) {
        btnSecu.addEventListener('click', function () {
          exp3SecuResolved = !exp3SecuResolved;
          prevHash = M.hashDemo('EXP3-SECU-' + exp3SecuResolved, prevHash);
          renderExp3();
        });
      }
      var btnRenov = document.getElementById('btnExp3RenovAct');
      if (btnRenov) {
        btnRenov.addEventListener('click', function () {
          exp3RenovApproved = !exp3RenovApproved;
          prevHash = M.hashDemo('EXP3-RENOV-' + exp3RenovApproved, prevHash);
          renderExp3();
        });
      }
      var btnRenovContact = document.getElementById('btnExp3RenovContact');
      if (btnRenovContact) {
        btnRenovContact.addEventListener('click', function () {
          selectMotifAndScroll('demonstration', 'OMNIRENOV');
        });
      }
      var btnPatriContact = document.getElementById('btnExp3PatriContact');
      if (btnPatriContact) {
        btnPatriContact.addEventListener('click', function () {
          selectMotifAndScroll('besoin', 'OMNIPATRIMOINE');
        });
      }
    }

    function switchLabExp(expKey, optionalSub) {
      clearSimTimers();
      activeExp = expKey;
      if (optionalSub) exp3Sub = optionalSub;
      labTabs.forEach(function (t) {
        var sel = t.getAttribute('data-exp') === expKey;
        t.setAttribute('aria-selected', sel ? 'true' : 'false');
        if (sel) labPanel.setAttribute('aria-labelledby', t.id);
      });
      if (expKey === 'exp1') renderExp1();
      else if (expKey === 'exp2') renderExp2();
      else renderExp3();
    }

    labTabs.forEach(function (t) {
      t.addEventListener('click', function () {
        switchLabExp(t.getAttribute('data-exp'));
      });
    });

    /* Raccourcis depuis les cartes du Portfolio vers le Lab ou le formulaire */
    Array.prototype.slice.call(document.querySelectorAll('[data-open-lab]')).forEach(function (el) {
      el.addEventListener('click', function () {
        switchLabExp(el.getAttribute('data-open-lab'), el.getAttribute('data-open-sub'));
      });
    });
    Array.prototype.slice.call(document.querySelectorAll('[data-select-motif]')).forEach(function (el) {
      el.addEventListener('click', function () {
        selectMotifAndScroll(el.getAttribute('data-select-motif'));
      });
    });

    switchLabExp('exp1');

    /* ========================================================== */
    /* 2. DIAGNOSTIC D'ORIENTATION (4 QUESTIONS → SOLUTION/MOTIF) */
    /* ========================================================== */
    var QUESTIONS = [
      {
        id: 'sector',
        label: 'Orientation · Étape 1 / 4',
        title: 'Quel est votre secteur ou contexte principal ?',
        options: [
          { value: 'ingenierie', key: 'A', label: 'Entreprise cherchant un développement sur mesure, une automatisation ou un système IA' },
          { value: 'securite', key: 'B', label: 'Dirigeant de société de sécurité privée (gardiennage, SSIAP, rondes)' },
          { value: 'btp', key: 'C', label: 'Entreprise du BTP, de la rénovation ou de la coordination de travaux' },
          { value: 'patrimoine', key: 'D', label: 'Cabinet de gestion de patrimoine (intérêt exploratoire)' }
        ]
      },
      {
        id: 'need',
        label: 'Orientation · Étape 2 / 4',
        title: 'Quel est votre objectif prioritaire ?',
        options: [
          { value: 'architecture', key: 'A', label: 'Concevoir un outil métier, automatiser un flux ou orchestrer des agents IA' },
          { value: 'marge', key: 'B', label: 'Sécuriser mes marges sur vacations, plannings CNAPS et appels d\'offres' },
          { value: 'devis', key: 'C', label: 'Coordonner mes chantiers et relancer mes devis en attente (J+3 / J+7)' }
        ]
      },
      {
        id: 'horizon',
        label: 'Orientation · Étape 3 / 4',
        title: 'Quel format d\'intervention recherchez-vous ?',
        options: [
          { value: 'outillage', key: 'A', label: 'Accéder à une solution métier prête à tester (Securiaxe ou Omnirenov)' },
          { value: 'cadrage', key: 'B', label: 'Un conseil de cadrage technologique, un développement spécifique ou une formation' },
          { value: 'demo', key: 'C', label: 'Une démonstration guidée appliquée à mes propres paramètres' }
        ]
      },
      {
        id: 'size',
        label: 'Orientation · Étape 4 / 4',
        title: 'Quelle est la taille de votre structure ?',
        options: [
          { value: 'tpe', key: 'A', label: '1 à 9 personnes' },
          { value: 'pme', key: 'B', label: '10 à 49 personnes' },
          { value: 'eti', key: 'C', label: '50 personnes et plus (multi-sites)' }
        ]
      }
    ];

    var answers = {};
    var idx = 0;
    var box = document.getElementById('diagBox');

    function getOrientation() {
      if (answers.sector === 'securite' || answers.need === 'marge') {
        return {
          badge: 'Solution recommandée : SECURIAXE (Sécurité privée)',
          title: 'Explorez le démonstrateur Sécurité Privée & Securiaxe',
          desc: 'Testez en direct le Bouclier Anti-Pertes et le prototype 7 étapes de Securiaxe Director sur CANTARA, puis accédez au site officiel Securiaxe pour les packs opérationnels.',
          primaryHref: 'securite-privee.html',
          primaryLabel: 'Ouvrir le démonstrateur Sécurité →',
          secondaryHref: M.CONFIG.SECURIAXE_URL,
          secondaryLabel: 'Site officiel Securiaxe ↗',
          motif: 'Demande de démonstration',
          sector: 'SECURIAXE (Sécurité privée)'
        };
      }
      if (answers.sector === 'btp' || answers.need === 'devis') {
        return {
          badge: 'Solution recommandée : OMNIRENOV (BTP & Rénovation)',
          title: 'Explorez le démonstrateur Omnirenov',
          desc: 'Testez immédiatement la coordination de chantier, le cockpit de relance courtoise J+3/J+7 et le simulateur de devis récupérables.',
          primaryHref: 'btp.html',
          primaryLabel: 'Ouvrir le démonstrateur Omnirenov →',
          secondaryHref: null,
          secondaryLabel: null,
          motif: 'Demande de démonstration',
          sector: 'OMNIRENOV (BTP & rénovation)'
        };
      }
      if (answers.sector === 'patrimoine') {
        return {
          badge: 'Projet exploratoire : OMNIPATRIMOINE (En incubation)',
          title: 'Consultez l\'aperçu exploratoire dans le CANTARA LAB',
          desc: 'OMNIPATRIMOINE est actuellement en incubation (non commercialisé). Vous pouvez explorer notre approche de conformité documentaire dans le Lab ou qualifier vos enjeux dans le formulaire ci-contre.',
          primaryHref: '#lab',
          primaryLabel: 'Voir dans le CANTARA LAB →',
          secondaryHref: null,
          secondaryLabel: null,
          motif: 'Présentation d\'un besoin métier',
          sector: 'OMNIPATRIMOINE (En incubation)'
        };
      }
      return {
        badge: 'Parcours recommandé : Ingénierie & Systèmes sur mesure',
        title: 'Cadrage technologique, automatisation & multi-agents',
        desc: 'Manipulez les expériences d\'orchestration multi-agents et d\'automatisation du CANTARA LAB, puis utilisez le formulaire ci-contre pour demander une consultation d\'architecture.',
        primaryHref: '#lab',
        primaryLabel: 'Explorer le CANTARA LAB →',
        secondaryHref: '#ingenierie',
        secondaryLabel: 'Revoir nos 8 capacités',
        motif: 'Demande de consultation',
        sector: 'Ingénierie transversale / Sur-mesure'
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
      /* Pré-sélectionner le motif et le secteur dans le formulaire de droite */
      var motifSelect = document.getElementById('cMotif');
      var sectorSelect = document.getElementById('cSector');
      if (motifSelect && rec.motif) motifSelect.value = rec.motif;
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
          '<span class="mono">Le formulaire ci-contre a été pré-calibré avec votre orientation.</span>' +
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
    /* 3. FORMULAIRE DE CONTACT SANS FAUSSE CONFIRMATION (LOT 3)  */
    /* ========================================================== */
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var motif = document.getElementById('cMotif').value;
        var name = document.getElementById('cName').value.trim();
        var org = document.getElementById('cOrg').value.trim();
        var mail = document.getElementById('cMail').value.trim();
        var sector = document.getElementById('cSector').value;
        var msg = document.getElementById('cMsg').value.trim();
        var ok = document.getElementById('cOk').checked;

        var validMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
        document.getElementById('eName').textContent = name ? '' : 'Veuillez indiquer votre nom.';
        document.getElementById('eOrg').textContent = org ? '' : 'Veuillez indiquer votre entreprise.';
        document.getElementById('eMail').textContent = validMail ? '' : 'Veuillez saisir un e-mail professionnel valide.';
        document.getElementById('eMsg').textContent = msg ? '' : 'Veuillez préciser brièvement votre besoin.';
        document.getElementById('eOk').textContent = ok ? '' : 'Veuillez cocher la case de consentement B2B.';

        if (!name || !org || !validMail || !msg || !ok) return;

        /* GARDE-FOU 2 & 4 : Zéro confirmation fictive verte (.notice-ok) et zéro fuite d'email personnel */
        var refCode = M.hashDemo(motif + '|' + org + '|' + mail, 'CONTACT');
        var summaryText =
          'DOSSIER DE DEMANDE CANTARA [' + refCode + ']\n' +
          'Motif      : ' + motif + '\n' +
          'Périmètre  : ' + sector + '\n' +
          'Contact    : ' + name + ' (' + org + ')\n' +
          'E-mail     : ' + mail + '\n' +
          'Synthèse   : ' + msg;

        var noticeEl = document.getElementById('contactNotice');
        if (!M.CONFIG.WEBHOOK_ENABLED) {
          noticeEl.innerHTML =
            '<div class="notice-preprod">' +
              '<strong>[AUCUNE TRANSMISSION SERVEUR EN PRÉ-PRODUCTION · WEBHOOK_ENABLED = FALSE]</strong>' +
              'Conformément à nos règles de transparence, nous n\'affichons aucune confirmation d\'envoi fictive : votre saisie est restée 100 % locale dans votre navigateur.' +
              '<pre id="dossierRecap">' + M.esc(summaryText) + '</pre>' +
              '<div style="display:flex;gap:.55rem;flex-wrap:wrap;align-items:center">' +
                '<button type="button" class="btn btn-primary btn-sm" id="btnCopyDossier">Copier mon récapitulatif</button>' +
                '<a href="mentions.html" class="btn btn-ghost btn-sm">Consulter le contact légal (Mentions) →</a>' +
                '<span class="mono" id="copyFeedback"></span>' +
              '</div>' +
            '</div>';

          var btnCopy = document.getElementById('btnCopyDossier');
          var feedback = document.getElementById('copyFeedback');
          if (btnCopy) {
            btnCopy.addEventListener('click', function () {
              if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(summaryText).then(function () {
                  feedback.textContent = 'Récapitulatif copié dans le presse-papiers ✓';
                }).catch(function () {
                  feedback.textContent = 'Sélectionnez le cadre ci-dessus pour copier.';
                });
              } else {
                feedback.textContent = 'Sélectionnez le cadre ci-dessus pour copier.';
              }
            });
          }
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
