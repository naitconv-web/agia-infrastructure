/*
 * CANTARA V3 — Espace BTP & Rénovation (Cockpit Relance Devis + Simulateur rapide)
 */
(function () {
  'use strict';

  function init() {
    var M = window.CANTARA_MOTION;
    if (!M) return;

    var DEALS = [
      {
        id: 'DEV-2026-148',
        client: 'M. Laurent — Isolation & PAC (Albi)',
        amount: '11 400 €',
        age: 'J+7 · Relance 2/2',
        checks: [
          ['CONFORME', 'Décennale 2027 & attestation URSSAF vérifiées'],
          ['BIENSÉANCE', 'Créneau autorisé : jours ouvrés 08h30–19h00'],
          ['MENTION', 'Option STOP intégrée en fin de message']
        ],
        draft: '« Bonjour M. Laurent, suite à notre devis n° DEV-2026-148 (11 400 €) pour l\'isolation et la pompe à chaleur, nous restons à votre écoute pour ajuster le calendrier ou répondre à vos questions. Répondez STOP pour ne plus recevoir de suivi. »',
        state: 'En attente'
      },
      {
        id: 'DEV-2026-152',
        client: 'SCI Les Chênes — Réfection toiture (Castres)',
        amount: '18 900 €',
        age: 'J+3 · Relance 1/2',
        checks: [
          ['VIGILANCE', 'Sous-traitant charpente : attestation URSSAF à J-18'],
          ['BIENSÉANCE', 'Relance courtoise n° 1 sur 2 maximum'],
          ['SAS', 'Aucune transmission sans validation dirigeant']
        ],
        draft: '« Bonjour, nous confirmons la bonne réception de notre devis n° DEV-2026-152 (18 900 €). Souhaitez-vous convenir d\'un échange de 10 minutes cette semaine pour caler les délais d\'intervention ? Répondez STOP pour ne plus recevoir de suivi. »',
        state: 'En attente'
      },
      {
        id: 'DEV-2026-159',
        client: 'Mme Bernard — Rénovation salle de bain (Toulouse)',
        amount: '6 850 €',
        age: 'J+4 · Relance 1/2',
        checks: [
          ['CONFORME', 'Décennale valide · dossier complet'],
          ['BIENSÉANCE', 'Ton courtois et non insistant'],
          ['AUDIT', 'Décision horodatée dans le journal']
        ],
        draft: '« Bonjour Mme Bernard, suite à notre visite et au devis n° DEV-2026-159 (6 850 €), n\'hésitez pas à nous indiquer si cette proposition correspond à vos attentes. Répondez STOP pour ne plus recevoir de suivi. »',
        state: 'En attente'
      }
    ];

    var active = 0;
    var hash = 'GENESIS';
    var tabs = Array.prototype.slice.call(document.querySelectorAll('.intent-pill[data-deal]'));
    var stage = document.getElementById('btpStage');

    function renderDeal(i) {
      active = i;
      var d = DEALS[i];
      tabs.forEach(function (t) {
        t.setAttribute('aria-selected', Number(t.getAttribute('data-deal')) === i ? 'true' : 'false');
      });

      var stateCls = d.state === 'Approuvé' ? 'good' : (d.state === 'Rejeté' ? 'alert' : '');
      stage.innerHTML =
        '<div class="comet-card">' +
          '<span class="mono">[' + M.esc(d.id) + ' · ' + M.esc(d.age) + ']</span>' +
          '<div class="comet-metrics">' +
            '<div class="comet-metric"><div class="lbl">Montant devis</div><div class="val">' + M.esc(d.amount) + '</div></div>' +
            '<div class="comet-metric ' + stateCls + '"><div class="lbl">Statut Sas</div><div class="val">' + M.esc(d.state) + '</div></div>' +
          '</div>' +
          '<p style="margin:0;font-size:.9rem;color:var(--cream);line-height:1.6">' + M.esc(d.draft) + '</p>' +
        '</div>' +
        '<div class="comet-card">' +
          '<span class="mono">[VÉRIFICATIONS AVANT ENVOI]</span>' +
          '<ul class="comet-steps">' +
            d.checks.map(function (c) {
              return '<li><b>[' + M.esc(c[0]) + ']</b><span>' + M.esc(c[1]) + '</span></li>';
            }).join('') +
          '</ul>' +
          '<div style="display:flex;gap:.55rem;flex-wrap:wrap">' +
            '<button type="button" class="btn btn-primary btn-sm" id="btnBtpOk">Approuver [OUI]</button>' +
            '<button type="button" class="btn btn-ghost btn-sm" id="btnBtpNo">Rejeter [NON]</button>' +
          '</div>' +
          '<div class="comet-log"><b>[TRACE · ' + M.esc(hash) + ']</b> ' + M.esc(d.client) + ' (simulation locale, 0 envoi réel).</div>' +
        '</div>';

      document.getElementById('btnBtpOk').addEventListener('click', function () {
        d.state = 'Approuvé';
        hash = M.hashDemo(d.id + '|OUI', hash);
        renderDeal(i);
      });
      document.getElementById('btnBtpNo').addEventListener('click', function () {
        d.state = 'Rejeté';
        hash = M.hashDemo(d.id + '|NON', hash);
        renderDeal(i);
      });
    }

    tabs.forEach(function (t) {
      t.addEventListener('click', function () {
        renderDeal(Number(t.getAttribute('data-deal')));
      });
    });
    renderDeal(0);

    /* Simulateur rapide */
    var rVol = document.getElementById('rVol');
    var rTicket = document.getElementById('rTicket');
    var rRate = document.getElementById('rRate');
    function updateSim() {
      var vol = parseFloat(rVol.value) || 15;
      var ticket = parseFloat(rTicket.value) || 4500;
      var rate = parseFloat(rRate.value) || 10;
      var deals = (vol * rate) / 100;
      var gain = deals * ticket;
      document.getElementById('rVolOut').textContent = Math.round(vol) + ' devis';
      document.getElementById('rTicketOut').textContent = M.fmtEur(ticket);
      document.getElementById('rRateOut').textContent = Math.round(rate) + ' %';
      document.getElementById('rGain').textContent = '+' + M.fmtEur(gain);
      document.getElementById('rSummary').textContent =
        'Soit environ ' + deals.toFixed(1).replace('.', ',') + ' devis récupéré(s) par mois (' + M.fmtEur(gain * 12) + ' / an de potentiel brut).';
    }
    [rVol, rTicket, rRate].forEach(function (el) { el.addEventListener('input', updateSim); });
    updateSim();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
