/*
 * OMNIRENOV (Solution CANTARA) — Cockpit Chantier 6 Jalons, Vigilance Sous-Traitants, Simulateur Devis & Formulaire Honnête
 * - 0 crochet pseudo-technique ni fausse URL.
 * - 0 coordonnée personnelle du dirigeant dans les chantiers fictifs (Lyon, Bordeaux).
 */
(function () {
  'use strict';

  function init() {
    var M = window.CANTARA_MOTION;
    if (!M) return;

    var OPERATIONS = [
      {
        id: 'OP-2026-08',
        label: 'Opération 1 · Réhabilitation Tertiaire Lyon (420 000 € HT)',
        title: 'Opération : Réhabilitation Plateau Tertiaire — Lyon Part-Dieu (420 000 € HT)',
        client: 'Foncière Rhône-Alpes (Maîtrise d\'ouvrage privée)',
        lots: 'Gros œuvre, cloisons, CVC, électricité CFO/CFA (4 sous-traitants)',
        alertMsg: 'Attestation de vigilance URSSAF du sous-traitant Lot CVC (ClimRéseaux SAS) expirée (+6 mois) — Situation n° 3 (34 800 € HT) suspendue.',
        resolvedMsg: 'Nouvelle attestation URSSAF vérifiée et archivée pour ClimRéseaux SAS — Situation n° 3 débloquée par le conducteur de travaux.',
        subcontractors: [
          { lot: 'Lot 01 · Démolition & Gros œuvre', company: 'BâtiRhône SARL', urssaf: 'Valide (échéance +92 j)', decennale: 'Valide (AXA BTP)', dc4: 'Signé', cls: 'ok' },
          { lot: 'Lot 02 · CVC & Plomberie', company: 'ClimRéseaux SAS', urssaf: 'Contrôle requis', decennale: 'Valide (SMABTP)', dc4: 'Signé', cls: 'dynamic' },
          { lot: 'Lot 03 · Électricité CFO/CFA', company: 'VoltLyon SAS', urssaf: 'Valide (échéance +64 j)', decennale: 'Valide (MMA Pro)', dc4: 'Signé', cls: 'ok' },
          { lot: 'Lot 04 · Menuiseries & Cloisons', company: 'Atelier Bois & Verre', urssaf: 'Valide (échéance +110 j)', decennale: 'Valide (Allianz)', dc4: 'Signé', cls: 'ok' }
        ],
        milestones: [
          { num: 'Jalon 1', name: 'Qualification & métrés', role: 'Relevé contradictoire et allotissement', detail: 'Plans d\'exécution et métrés vérifiés sur 1 200 m² de plateau tertiaire.' },
          { num: 'Jalon 2', name: 'Chiffrage & DPGF', role: 'Décomposition par lot et contrôle marge', detail: 'Chiffrage consolidé à 420 000 € HT avec marge prévisionnelle de 16,5 %.' },
          { num: 'Jalon 3', name: 'Devis & acompte démarrage', role: 'Ordre de service et encaissement acompte 30 %', detail: 'Ordre de service OS-01 signé, acompte de 126 000 € HT encaissé.' },
          { num: 'Jalon 4', name: 'Vigilance sous-traitants', role: 'Contrôle URSSAF, décennale, CIBTP et DC4', detail: 'Vérification semestrielle obligatoire (art. L.8222-1 C. trav.) avant paiement des situations.' },
          { num: 'Jalon 5', name: 'Suivi d\'exécution & situations', role: 'Avancement hebdomadaire et situations mensuelles', detail: 'Situation n° 3 préparée à 65 % d\'avancement physique.' },
          { num: 'Jalon 6', name: 'Réception & levée OPR', role: 'Procès-verbal de réception et quitus', detail: 'Pré-visite OPR programmée à J-10 de la livraison contractuelle.' }
        ]
      },
      {
        id: 'OP-2026-14',
        label: 'Opération 2 · Rénovation Thermique Bordeaux (185 000 € HT)',
        title: 'Opération : Rénovation Thermique Copropriété — Bordeaux Caudéran (185 000 € HT)',
        client: 'Syndicat de Copropriété Les Pins (24 logements)',
        lots: 'Isolation thermique par l\'extérieur (ITE), échafaudage, menuiseries RGE',
        alertMsg: 'Attestation d\'assurance décennale ITE du sous-traitant Façades Aquitaine en attente de mise à jour pour l\'exercice en cours.',
        resolvedMsg: 'Attestation décennale ITE mise à jour et vérifiée — Ordre de service Lot Façade validé.',
        subcontractors: [
          { lot: 'Lot 01 · Échafaudage & Sécurité', company: 'Aquitaine Échafaudages', urssaf: 'Valide (échéance +80 j)', decennale: 'Valide (SMABTP)', dc4: 'Signé', cls: 'ok' },
          { lot: 'Lot 02 · Isolation Thermique ITE', company: 'Façades Aquitaine SARL', urssaf: 'Valide (échéance +45 j)', decennale: 'Contrôle requis', dc4: 'Signé', cls: 'dynamic' },
          { lot: 'Lot 03 · Menuiseries Extérieures RGE', company: 'Menuiserie Gironde', urssaf: 'Valide (échéance +120 j)', decennale: 'Valide (MAAF Pro)', dc4: 'Signé', cls: 'ok' }
        ],
        milestones: [
          { num: 'Jalon 1', name: 'Audit énergétique & métrés', role: 'Vérification des surfaces façades et ponts thermiques', detail: 'Métré contradictoire de 940 m² de façades sous enduit.' },
          { num: 'Jalon 2', name: 'Chiffrage & conformité RGE', role: 'Devis détaillé par poste et mentions RGE', detail: 'Chiffrage validé à 185 000 € HT en assemblée générale.' },
          { num: 'Jalon 3', name: 'Validation & acompte travaux', role: 'Signature marché et appel de fonds initial', detail: 'Acompte de démarrage de 55 500 € HT réceptionné.' },
          { num: 'Jalon 4', name: 'Vigilance sous-traitants', role: 'Contrôle URSSAF, décennale ITE et certificats RGE', detail: 'Contrôle de concordance entre l\'activité déclarée sur la décennale et le lot confié.' },
          { num: 'Jalon 5', name: 'Suivi de chantier & situations', role: 'Contrôle des épaisseurs d\'isolant et avancement', detail: 'Pose des rails et panneaux isolants sur façade Nord et Est.' },
          { num: 'Jalon 6', name: 'Réception & dossier DOE', role: 'PV de réception et remise des fiches matériaux', detail: 'Compilation automatique des fiches techniques et certificats ACERMI.' }
        ]
      }
    ];

    var state = {
      opIdx: 0,
      stepIdx: 3,
      hasAlert: true,
      alertResolved: false
    };

    var stageEl = document.getElementById('omniCockpitStage');
    var titleEl = document.getElementById('omniCockpitTitle');

    function renderCockpit() {
      if (!stageEl) return;
      var op = OPERATIONS[state.opIdx];
      var ms = op.milestones[state.stepIdx];
      if (titleEl) titleEl.textContent = op.title;

      var alertBanner = '';
      if (state.hasAlert) {
        alertBanner =
          '<div style="padding:.8rem 1rem;border-radius:6px;margin-bottom:1rem;border:1px solid ' + (state.alertResolved ? 'rgba(74,222,128,.55)' : 'var(--signal-err)') + ';background:' + (state.alertResolved ? 'rgba(74,222,128,.08)' : 'rgba(252,165,165,.1)') + ';font-size:.84rem;display:flex;justify-content:space-between;align-items:center;gap:.75rem;flex-wrap:wrap">' +
            '<span><strong style="color:' + (state.alertResolved ? 'var(--signal-ok)' : 'var(--signal-err)') + '">' +
              (state.alertResolved ? 'Anomalie résolue — ' : 'Alerte de conformité sous-traitant — ') +
            '</strong>' + M.esc(state.alertResolved ? op.resolvedMsg : op.alertMsg) + '</span>' +
            (!state.alertResolved
              ? '<button type="button" class="btn btn-primary btn-xs" id="btnOmniResolve">Valider la pièce mise à jour</button>'
              : '<button type="button" class="btn btn-ghost btn-xs" id="btnOmniReinject">Simuler à nouveau l\'expiration</button>') +
          '</div>';
      }

      stageEl.innerHTML =
        '<div class="intent-bar">' +
          '<div class="intent-pills" role="group" aria-label="Choisir une opération de démonstration" style="margin-bottom:0">' +
            OPERATIONS.map(function (o, idx) {
              return '<button type="button" class="intent-pill' + (idx === state.opIdx ? ' active' : '') + '" data-omni-op="' + idx + '">' +
                M.esc(o.label) +
              '</button>';
            }).join('') +
          '</div>' +
          '<div class="lab-controls">' +
            '<span class="mono" style="font-size:.73rem;color:var(--cream-muted)">Client : ' + M.esc(op.client) + '</span>' +
          '</div>' +
        '</div>' +
        alertBanner +
        '<div class="comet-canvas">' +
          '<div class="comet-card">' +
            '<div class="card-kicker">' +
              '<span>1. Séquence des 6 jalons de l\'opération</span>' +
              '<span style="color:var(--signal)">Jalon sélectionné : ' + (state.stepIdx + 1) + ' sur 6</span>' +
            '</div>' +
            '<div class="agent-list" role="listbox" aria-label="Jalons du chantier">' +
              op.milestones.map(function (m, idx) {
                var isEx = idx === 3 && state.hasAlert && !state.alertResolved;
                var stateTxt = isEx ? 'Pièce à valider' : (idx <= state.stepIdx ? 'Vérifié' : 'Planifié');
                var cls = 'agent-node' +
                  (idx === state.stepIdx ? ' selected' : '') +
                  (isEx ? ' exception' : (idx <= state.stepIdx ? ' done' : ''));
                return '<button type="button" class="' + cls + '" role="option" aria-selected="' + (idx === state.stepIdx ? 'true' : 'false') + '" data-omni-step="' + idx + '">' +
                  '<div style="display:flex;align-items:center;gap:.7rem;min-width:0">' +
                    '<span class="agent-step-badge">' + M.esc(m.num) + '</span>' +
                    '<div style="min-width:0">' +
                      '<span class="agent-title">' + M.esc(m.name) + '</span>' +
                      '<span class="agent-role">' + M.esc(m.role) + '</span>' +
                    '</div>' +
                  '</div>' +
                  '<span class="agent-state">' + M.esc(stateTxt) + '</span>' +
                '</button>';
              }).join('') +
            '</div>' +
          '</div>' +

          '<div class="comet-card">' +
            '<div class="card-kicker">' +
              '<span>2. Registre de vigilance sous-traitants (Art. L.8222-1)</span>' +
              '<span>' + M.esc(op.id) + '</span>' +
            '</div>' +
            '<table class="ops-table" aria-label="Registre de conformité des sous-traitants">' +
              '<thead><tr><th>Lot &amp; Entreprise</th><th>URSSAF (&lt; 6 mois)</th><th>Décennale</th><th>Statut</th></tr></thead>' +
              '<tbody>' +
                op.subcontractors.map(function (s) {
                  var isDyn = s.cls === 'dynamic';
                  var okNow = !isDyn || state.alertResolved;
                  var urssafTxt = isDyn && state.opIdx === 0 ? (okNow ? 'Valide (renouvelée)' : 'Expirée (+6 mois)') : s.urssaf;
                  var decTxt = isDyn && state.opIdx === 1 ? (okNow ? 'Valide (attestation 2026)' : 'À mettre à jour') : s.decennale;
                  var stTxt = okNow ? 'Bon à payer actif' : 'Situation bloquée';
                  return '<tr>' +
                    '<td><strong>' + M.esc(s.company) + '</strong><br><span style="font-size:.72rem;color:var(--cream-muted)">' + M.esc(s.lot) + '</span></td>' +
                    '<td class="' + (isDyn && state.opIdx === 0 && !okNow ? 'err' : 'ok') + '">' + M.esc(urssafTxt) + '</td>' +
                    '<td class="' + (isDyn && state.opIdx === 1 && !okNow ? 'err' : 'ok') + '">' + M.esc(decTxt) + '</td>' +
                    '<td class="' + (okNow ? 'ok' : 'err') + '">' + M.esc(stTxt) + '</td>' +
                  '</tr>';
                }).join('') +
              '</tbody>' +
            '</table>' +
            '<div class="inspect-block">' +
              '<strong>Détail du ' + M.esc(ms.num) + ' — ' + M.esc(ms.name) + '</strong>' +
              '<span>' + M.esc(ms.detail) + '</span>' +
            '</div>' +
            '<div class="comet-log">' +
              '<b>Journal d\'exploitation local :</b> ' + M.esc(op.id) + ' · ' + M.esc(op.lots) + ' · Contrôle humain obligatoire avant règlement des situations.' +
            '</div>' +
          '</div>' +
        '</div>';

      Array.prototype.slice.call(stageEl.querySelectorAll('[data-omni-op]')).forEach(function (b) {
        b.addEventListener('click', function () {
          state.opIdx = Number(b.getAttribute('data-omni-op')) || 0;
          state.stepIdx = 3;
          state.alertResolved = false;
          renderCockpit();
        });
      });

      Array.prototype.slice.call(stageEl.querySelectorAll('[data-omni-step]')).forEach(function (b) {
        b.addEventListener('click', function () {
          state.stepIdx = Number(b.getAttribute('data-omni-step')) || 0;
          renderCockpit();
        });
      });

      var btnRes = document.getElementById('btnOmniResolve');
      if (btnRes) {
        btnRes.addEventListener('click', function () {
          state.alertResolved = true;
          renderCockpit();
        });
      }
      var btnRe = document.getElementById('btnOmniReinject');
      if (btnRe) {
        btnRe.addEventListener('click', function () {
          state.alertResolved = false;
          renderCockpit();
        });
      }
    }

    renderCockpit();

    /* Simulateur de chiffre d'affaires immobilisé dans les devis en sommeil */
    var qCount = document.getElementById('omQuoteCount');
    var qAvg = document.getElementById('omQuoteAvg');
    var qPct = document.getElementById('omDormantPct');

    function updateQuoteSim() {
      if (!qCount || !qAvg || !qPct) return;
      var count = Number(qCount.value) || 18;
      var avg = Number(qAvg.value) || 12500;
      var pct = Number(qPct.value) || 40;

      var totalMonthly = count * avg;
      var dormantAmt = Math.round(totalMonthly * (pct / 100));
      var dormantCount = Math.max(1, Math.round(count * (pct / 100)));
      var rec10 = Math.round(dormantAmt * 0.10);

      document.getElementById('omQuoteCountOut').textContent = count + ' devis / mois';
      document.getElementById('omQuoteAvgOut').textContent = avg.toLocaleString('fr-FR') + ' € HT';
      document.getElementById('omDormantPctOut').textContent = pct + ' %';
      document.getElementById('omDormantAmount').textContent = dormantAmt.toLocaleString('fr-FR') + ' € HT';
      document.getElementById('omTotalMonthly').textContent = totalMonthly.toLocaleString('fr-FR') + ' € HT';
      document.getElementById('omRecovered10').textContent = '+' + rec10.toLocaleString('fr-FR') + ' € HT / mois';
      document.getElementById('omDormantVerdict').textContent =
        'Soit environ ' + dormantCount + ' devis par mois restés sans retour client explicite (oui, non ou ajustement de périmètre).';
    }

    if (qCount && qAvg && qPct) {
      [qCount, qAvg, qPct].forEach(function (el) {
        el.addEventListener('input', updateQuoteSim);
      });
      updateQuoteSim();
    }

    /* Pré-sélection du module dans le formulaire de pilote */
    Array.prototype.slice.call(document.querySelectorAll('[data-select-module]')).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var mod = btn.getAttribute('data-select-module') || '';
        var msgEl = document.getElementById('cMsg');
        if (msgEl && !msgEl.value.trim()) {
          msgEl.value = 'Demande de pilote Omnirenov — ' + mod + '. ';
        }
      });
    });

    /* Formulaire de demande de pilote honnête (sans fausse confirmation d'envoi) */
    var channelBadge = document.getElementById('formChannelBadge');
    if (channelBadge) {
      var hasEndpoint = Boolean(M.CONFIG.WEBHOOK_ENABLED && M.CONFIG.CONTACT_ENDPOINT);
      channelBadge.className = 'status-badge ' + (hasEndpoint ? 'op' : 'prep');
      channelBadge.textContent = hasEndpoint
        ? 'Canal serveur : Endpoint actif'
        : 'Canal serveur : Endpoint non configuré';
    }

    function cleanField(str, maxLen) {
      var s = String(str == null ? '' : str).replace(/[\u0000-\u001F\u007F]/g, ' ').trim();
      if (s.length > (maxLen || 500)) s = s.slice(0, maxLen || 500);
      if (/^[=+\-@|%]/.test(s)) s = "'" + s;
      return s;
    }

    function validEmail(s) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(s || '').trim());
    }

    var contactForm = document.getElementById('omniContactForm');
    if (contactForm) {
      var isSubmitting = false;
      contactForm.addEventListener('submit', function (ev) {
        ev.preventDefault();
        if (isSubmitting) return;

        var hp = document.getElementById('cWebsite');
        if (hp && hp.value.trim() !== '') return;

        var need = cleanField((document.getElementById('cNeed') || {}).value, 120);
        var sector = cleanField((document.getElementById('cSector') || {}).value, 140);
        var msg = cleanField((document.getElementById('cMsg') || {}).value, 1200);
        var name = cleanField((document.getElementById('cName') || {}).value, 120);
        var org = cleanField((document.getElementById('cOrg') || {}).value, 140);
        var mail = cleanField((document.getElementById('cMail') || {}).value, 160);

        var eMsg = document.getElementById('eMsg');
        var eName = document.getElementById('eName');
        var eOrg = document.getElementById('eOrg');
        var eMail = document.getElementById('eMail');
        if (eMsg) eMsg.textContent = '';
        if (eName) eName.textContent = '';
        if (eOrg) eOrg.textContent = '';
        if (eMail) eMail.textContent = '';

        var ok = true;
        if (msg.length < 10) {
          if (eMsg) eMsg.textContent = 'Précisez votre logiciel actuel et le périmètre du pilote souhaité (minimum 10 caractères).';
          ok = false;
        }
        if (name.length < 2) {
          if (eName) eName.textContent = 'Indiquez votre nom et prénom.';
          ok = false;
        }
        if (org.length < 2) {
          if (eOrg) eOrg.textContent = 'Indiquez votre entreprise.';
          ok = false;
        }
        if (!validEmail(mail)) {
          if (eMail) eMail.textContent = 'Saisissez une adresse e-mail professionnelle valide.';
          ok = false;
        }
        if (!ok) return;

        var noticeEl = document.getElementById('contactNotice');
        var submitBtn = document.getElementById('btnSubmitContact');
        var summaryText =
          'Module Omnirenov : ' + need + '\n' +
          'Filière BTP      : ' + sector + '\n' +
          'Interlocuteur    : ' + name + ' (' + org + ')\n' +
          'E-mail           : ' + mail + '\n' +
          'Contexte chantier: ' + msg;

        isSubmitting = true;
        if (submitBtn) submitBtn.disabled = true;

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
                M.esc(result.message) +
              '</div>';
            contactForm.reset();
            return;
          }

          noticeEl.innerHTML =
            '<div class="form-state-box form-state-error" data-form-state="unconfigured">' +
              '<strong>État : Transmission serveur non effectuée — Aucun envoi simulé</strong>' +
              M.esc(result.message) + ' Pour conserver votre saisie ou nous contacter directement, copiez le récapitulatif ci-dessous :' +
              '<pre id="dossierRecap">' + M.esc(summaryText) + '</pre>' +
              '<div style="display:flex;gap:.55rem;flex-wrap:wrap;align-items:center">' +
                '<button type="button" class="btn btn-primary btn-xs" id="btnCopyDossier">Copier mon récapitulatif</button>' +
                '<a href="../cantara-v3/mentions.html" class="btn btn-ghost btn-xs">Coordonnées légales (Mentions) →</a>' +
                '<span class="mono" id="copyFeedback"></span>' +
              '</div>' +
            '</div>';

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
