/*
 * CANTARA V3 — Démonstrateur Solution OMNIRENOV (BTP, Coordination de chantier & Relance Devis)
 * - 0 mention de la ville du dirigeant dans les exemples fictifs (Lyon, Bordeaux, Toulouse).
 * - 0 crochet pseudo-technique ni hash FNV32 visible dans l'interface.
 */
(function () {
  'use strict';

  function init() {
    var M = window.CANTARA_MOTION;
    if (!M) return;

    var DEALS = [
      {
        id: 'DEV-2026-148',
        client: 'M. Laurent — Isolation thermique & PAC (Lyon)',
        amount: '11 400 €',
        age: 'J+7 · Relance 2 sur 2 · Lot Isolation prêt',
        checks: [
          ['Chantier', 'Coordination lot Isolation & PAC : créneau d\'intervention pré-réservé'],
          ['Pièces légales', 'Attestation Décennale 2027 & vigilance URSSAF vérifiées'],
          ['Cadre d\'envoi', 'Créneau autorisé : jours ouvrés 08h30–19h00 · Mention STOP incluse']
        ],
        draft: '« Bonjour M. Laurent, suite à notre devis n° DEV-2026-148 (11 400 €) pour l\'isolation et la pompe à chaleur, nos équipes techniques restent disponibles pour caler le calendrier de chantier ou répondre à vos questions. Répondez STOP pour ne plus recevoir de suivi. »',
        state: 'En attente'
      },
      {
        id: 'DEV-2026-152',
        client: 'SCI Les Chênes — Charpente & Réfection toiture (Bordeaux)',
        amount: '18 900 €',
        age: 'J+3 · Relance 1 sur 2 · Vigilance sous-traitant',
        checks: [
          ['Vigilance', 'Sous-traitant charpente : attestation URSSAF arrivant à échéance à J-18'],
          ['Chantier', 'Jalon d\'approvisionnement toiture synchronisé sous réserve de pièce à jour'],
          ['Décision', 'Relance courtoise n° 1 sur 2 soumise à la validation du dirigeant']
        ],
        draft: '« Bonjour, nous confirmons la bonne réception de notre devis n° DEV-2026-152 (18 900 €). Souhaitez-vous convenir d\'un point de 10 minutes cette semaine pour valider le phasage du chantier ? Répondez STOP pour ne plus recevoir de suivi. »',
        state: 'En attente'
      },
      {
        id: 'DEV-2026-159',
        client: 'Mme Bernard — Rénovation complète salle de bain (Toulouse)',
        amount: '6 850 €',
        age: 'J+4 · Relance 1 sur 2 · Dossier complet',
        checks: [
          ['Chantier', 'Coordination Plomberie & Carrelage : 0 conflit de planning détecté'],
          ['Pièces légales', 'Assurance Décennale valide · dossier administratif complet'],
          ['Traçabilité', 'Décision horodatée dans le journal de contrôle local']
        ],
        draft: '« Bonjour Mme Bernard, suite à notre visite technique et au devis n° DEV-2026-159 (6 850 €), n\'hésitez pas à nous indiquer si le chiffrage et le planning proposés correspondent à vos attentes. Répondez STOP pour ne plus recevoir de suivi. »',
        state: 'En attente'
      }
    ];

    var active = 0;
    var tabs = Array.prototype.slice.call(document.querySelectorAll('.intent-pill[data-deal]'));
    var stage = document.getElementById('btpStage');

    function renderDeal(i) {
      active = i;
      var d = DEALS[i];
      tabs.forEach(function (t) {
        t.setAttribute('aria-selected', Number(t.getAttribute('data-deal')) === i ? 'true' : 'false');
      });

      var stateCls = d.state === 'Approuvé' ? 'good' : (d.state === 'Écarté' ? 'alert' : '');
      stage.innerHTML =
        '<div class="comet-card">' +
          '<div class="card-kicker"><span>' + M.esc(d.id) + '</span><span>' + M.esc(d.age) + '</span></div>' +
          '<div class="comet-metrics">' +
            '<div class="comet-metric"><div class="lbl">Montant chantier</div><div class="val">' + M.esc(d.amount) + '</div></div>' +
            '<div class="comet-metric ' + stateCls + '"><div class="lbl">Statut de validation</div><div class="val">' + M.esc(d.state) + '</div></div>' +
          '</div>' +
          '<p style="margin:0;font-size:.9rem;color:var(--cream);line-height:1.6">' + M.esc(d.draft) + '</p>' +
        '</div>' +
        '<div class="comet-card">' +
          '<div class="card-kicker"><span>Coordination chantier &amp; vérifications avant envoi</span><span>Simulation locale</span></div>' +
          '<ul class="comet-steps">' +
            d.checks.map(function (c) {
              return '<li><b>' + M.esc(c[0]) + '</b><span>' + M.esc(c[1]) + '</span></li>';
            }).join('') +
          '</ul>' +
          '<div style="display:flex;gap:.55rem;flex-wrap:wrap">' +
            '<button type="button" class="btn btn-primary btn-sm" id="btnBtpOk">Autoriser la relance</button>' +
            '<button type="button" class="btn btn-ghost btn-sm" id="btnBtpNo">Écarter ce suivi</button>' +
          '</div>' +
          '<div class="comet-log"><b>Journal d\'exploitation local :</b> ' + M.esc(d.client) + ' (simulation sur dossier fictif, aucun envoi externe).</div>' +
        '</div>';

      document.getElementById('btnBtpOk').addEventListener('click', function () {
        d.state = 'Approuvé';
        renderDeal(i);
      });
      document.getElementById('btnBtpNo').addEventListener('click', function () {
        d.state = 'Écarté';
        renderDeal(i);
      });
    }

    tabs.forEach(function (t) {
      t.addEventListener('click', function () {
        renderDeal(Number(t.getAttribute('data-deal')));
      });
    });
    renderDeal(0);

    /* Simulateur rapide de potentiel mensuel */
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
        'Soit environ ' + deals.toFixed(1).replace('.', ',') + ' chantier(s) récupéré(s) par mois (' + M.fmtEur(gain * 12) + ' / an de potentiel brut).';
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
