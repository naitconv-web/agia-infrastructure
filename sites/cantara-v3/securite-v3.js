/*
 * CANTARA V3 — Espace Sécurité Privée (Test Bouclier + Aperçu 7 étapes Securiaxe Director)
 */
(function () {
  'use strict';

  function init() {
    var M = window.CANTARA_MOTION;
    if (!M) return;

    /* ---------------------------------------------------------- */
    /* 1. SIMULATEUR BOUCLIER ANTI-PERTES (VERSION PUBLIQUE)      */
    /* ---------------------------------------------------------- */
    var BASE = { nuit: 22.97, jour: 19.50, ssiap: 24.40 };
    var bType = document.getElementById('bType');
    var bRate = document.getElementById('bRate');
    var bHours = document.getElementById('bHours');
    var bStruct = document.getElementById('bStruct');

    function updateBouclier() {
      var base = BASE[bType.value] || 22.97;
      var rate = parseFloat(bRate.value) || 23;
      var hours = parseFloat(bHours.value) || 300;
      var struct = parseFloat(bStruct.value) || 12;

      var unitCost = base * (1 + struct / 100);
      var floor = unitCost / 0.90;
      var monthly = (rate - unitCost) * hours;
      var pct = rate > 0 ? ((rate - unitCost) / rate) * 100 : 0;

      document.getElementById('bRateOut').textContent = rate.toFixed(2).replace('.', ',') + ' €/h';
      document.getElementById('bHoursOut').textContent = Math.round(hours) + ' h / mois';
      document.getElementById('bStructOut').textContent = Math.round(struct) + ' %';
      document.getElementById('bUnitCost').textContent = unitCost.toFixed(2).replace('.', ',') + ' €/h';
      document.getElementById('bFloor').textContent = floor.toFixed(2).replace('.', ',') + ' €/h';

      var resEl = document.getElementById('bResult');
      resEl.textContent = (monthly > 0 ? '+' : '') + M.fmtEur(monthly);
      resEl.className = 'sim-big ' + (monthly < 0 ? 'loss' : 'gain');

      var vEl = document.getElementById('bVerdict');
      if (monthly < 0) {
        vEl.textContent = 'Vente à perte détectée (' + pct.toFixed(1).replace('.', ',') + ' %). Il manque ' + (unitCost - rate).toFixed(2).replace('.', ',') + ' €/h pour atteindre l\'équilibre.';
      } else if (pct < 10) {
        vEl.textContent = 'Marge fragile (' + pct.toFixed(1).replace('.', ',') + ' %) : un remplacement d\'urgence absorbe le bénéfice du mois.';
      } else {
        vEl.textContent = 'Tarif sain : marge nette estimée à ' + pct.toFixed(1).replace('.', ',') + ' % (' + M.fmtEur(monthly * 12) + ' / an).';
      }
    }

    [bType, bRate, bHours, bStruct].forEach(function (el) {
      el.addEventListener('input', updateBouclier);
      el.addEventListener('change', updateBouclier);
    });
    updateBouclier();

    /* ---------------------------------------------------------- */
    /* 2. APERÇU 7 ÉTAPES — SECURIAXE DIRECTOR                    */
    /* ---------------------------------------------------------- */
    var resolved = false;
    var sealed = false;
    var lastHash = 'GENESIS';

    var STEPS = {
      1: {
        addr: 'securiaxe://director/01-cockpit',
        kicker: '[01 · COCKPIT DIRIGEANT]',
        metrics: [
          { lbl: 'CA mensuel suivi', val: '48 640 €', cls: '' },
          { lbl: 'Marge nette', val: '+12,4 %', cls: 'good' }
        ],
        summary: 'Vue exécutive instantanée sur 3 sites fictifs : chiffre d\'affaires, rentabilité réelle par poste, alertes CNAPS à moins de 30 jours et décisions en attente dans le Sas.',
        checks: [
          ['SITE 01', 'Résidence Les Oliviers · 06h–14h / 14h–22h'],
          ['SITE 02', 'Entrepôt Logisud · Nuit 22h–06h (rentable)'],
          ['SITE 03', 'Centre Commercial Athena · ERP SSIAP 1']
        ],
        action: null
      },
      2: {
        addr: 'securiaxe://director/02-cnaps',
        kicker: '[02 · VIGILANCE CNAPS]',
        metrics: [
          { lbl: 'Alerte proactive', val: 'J-11', cls: '' },
          { lbl: 'Carte échue', val: 'Bloquée', cls: 'alert' }
        ],
        summary: 'Les validités CNAPS (saisies par votre structure) sont contrôlées jusqu\'à la fin exacte de la vacation, y compris sur les fins de nuit à J+1 06h00.',
        checks: [
          ['OK', 'Karim BENALI · [DÉMO] CP-78421 valide'],
          ['J-11', 'Fatima ZAIDI · renouvellement à anticiper'],
          ['STOP', 'Sofia KHELIFI · carte échue, affectation impossible']
        ],
        action: null
      },
      3: {
        addr: 'securiaxe://director/03-verrous-11h',
        kicker: '[03 · 6 VERROUS MÉTIER & REPOS 11 H]',
        metrics: [
          { lbl: 'Repos légal', val: '≥ 11,0 h', cls: 'good' },
          { lbl: 'SST expiré', val: 'Refus auto', cls: 'alert' }
        ],
        summary: 'Six contrôles déterministes avant chaque affectation : CNAPS, SST, SSIAP, repos quotidien ≥ 11 h (Code du travail), plafond 48 h et anti-chevauchement.',
        checks: [
          ['VERROU', 'Amine TOUATI bloqué sur site exigeant SST'],
          ['LÉGAL', 'Contrôle repos 11 h calculé depuis la dernière fin de vacation'],
          ['PLAFOND', 'Verrouillage atomique contre le dépassement 48 h']
        ],
        action: null
      },
      4: {
        addr: 'securiaxe://director/04-double-affectation',
        kicker: '[04 · RÉSOLUTION DOUBLE AFFECTATION]',
        metrics: function () {
          return [
            { lbl: 'Chevauchement', val: resolved ? '0,0 h' : '7,0 h', cls: resolved ? 'good' : 'alert' },
            { lbl: 'Remplaçant', val: 'M. DIAKITE', cls: 'good' }
          ];
        },
        summary: function () {
          return resolved
            ? 'Conflit résolu : Moussa DIAKITE reprend la vacation 14h–22h aux Oliviers (CNAPS, SST et repos ≥ 11 h conformes) avec trace scellée.'
            : 'Fatima ZAIDI est affectée sur Athena (09h–21h) et Les Oliviers (14h–22h) : 7,0 h de chevauchement physique. Résolution en 1 clic proposée avec un agent 100 % conforme.';
        },
        checks: [
          ['CONFLIT', 'Athena (09h–21h) vs Les Oliviers (14h–22h)'],
          ['CANDIDAT', 'Moussa DIAKITE : CNAPS + SST + SSIAP1 + repos 24 h'],
          ['SAS', 'Aucun changement de planning sans votre clic [OUI]']
        ],
        action: 'resolve'
      },
      5: {
        addr: 'securiaxe://director/05-bouclier',
        kicker: '[05 · VERROU BOUCLIER ANTI-PERTES]',
        metrics: [
          { lbl: 'Piège 23 €/h', val: '-1 821 €', cls: 'alert' },
          { lbl: 'Plancher Nuit', val: '31,88 €/h', cls: 'good' }
        ],
        summary: 'Impossible d\'émettre un chiffrage sans certification des taux horaires par le dirigeant. Le système bloque les ventes à perte et applique l\'Avenant n° 2 (min 6 h).',
        checks: [
          ['ÉTALON', 'ADS Nuit : 22,97 €/h coût brut complet avant structure'],
          ['GARDE-FOU', 'Blocage si taux non vérifiés par la direction'],
          ['AVENANT 2', 'Prise en compte du plancher 6 h sur vacations isolées']
        ],
        action: null
      },
      6: {
        addr: 'securiaxe://director/06-assistant-rgpd',
        kicker: '[06 · ASSISTANT IA PSEUDONYMISÉ RGPD]',
        metrics: [
          { lbl: 'Masquage PII', val: 'Actif', cls: 'good' },
          { lbl: 'Envoi auto', val: 'Interdit', cls: 'good' }
        ],
        summary: 'Avant toute analyse assistée, les identités sont remplacées par des jetons neutres ([AGENT_02], [CNAPS_MASQUÉ]). Le brouillon reste bloqué dans le Sas humain.',
        checks: [
          ['RGPD', 'Aucune identité réelle transmise à un modèle externe'],
          ['5 RÔLES', 'Conformité · Chiffrage · Planning · Appels d\'offres · Synthèse'],
          ['CONTRÔLE', 'Validation explicite [OUI] / [NON] obligatoire']
        ],
        action: null
      },
      7: {
        addr: 'securiaxe://director/07-document-sha256',
        kicker: '[07 · DOCUMENT CSI L.612-9 & SHA-256]',
        metrics: function () {
          return [
            { lbl: 'Mentions CSI', val: 'L.612-9', cls: 'good' },
            { lbl: 'Audit SHA-256', val: sealed ? 'Scellé' : 'En attente', cls: sealed ? 'good' : '' }
          ];
        },
        summary: 'Génération déterministe de l\'Ordre de Mission (CSI L.612-9) et du Pack Sous-Traitance (L.612-14) : agents conformes uniquement, toute pièce manquante en [À FOURNIR].',
        checks: [
          ['ZÉRO INVENTÉ', 'Toute donnée absente reste affichée [À FOURNIR]'],
          ['PREUVE', 'Journal d\'audit chaîné horodaté à chaque validation'],
          ['PILOTE', 'Déploiement complet dédié disponible sur rendez-vous']
        ],
        action: 'seal'
      }
    };

    var stepTabs = Array.prototype.slice.call(document.querySelectorAll('.intent-pill[data-step]'));
    var stage = document.getElementById('dirStage');

    function renderStep(num) {
      var st = STEPS[num];
      stepTabs.forEach(function (t) {
        t.setAttribute('aria-selected', Number(t.getAttribute('data-step')) === num ? 'true' : 'false');
      });
      document.getElementById('dirAddr').textContent = st.addr;

      var metrics = typeof st.metrics === 'function' ? st.metrics() : st.metrics;
      var summary = typeof st.summary === 'function' ? st.summary() : st.summary;

      var actionHtml = '';
      if (st.action === 'resolve') {
        actionHtml = '<div style="display:flex;gap:.55rem;flex-wrap:wrap">' +
          '<button type="button" class="btn btn-primary btn-sm" id="btnDirResolve"' + (resolved ? ' disabled' : '') + '>' + (resolved ? 'Résolu ✓' : 'Résoudre en 1 clic [OUI]') + '</button>' +
          (resolved ? '<button type="button" class="btn btn-ghost btn-sm" id="btnDirReset">Rejouer</button>' : '') +
        '</div>';
      } else if (st.action === 'seal') {
        actionHtml = '<div style="display:flex;gap:.55rem;flex-wrap:wrap">' +
          '<button type="button" class="btn btn-primary btn-sm" id="btnDirSeal"' + (sealed ? ' disabled' : '') + '>' + (sealed ? 'Scellé SHA-256 ✓' : 'Sceller le document [OUI]') + '</button>' +
        '</div>';
      }

      stage.innerHTML =
        '<div class="comet-card">' +
          '<span class="mono">' + M.esc(st.kicker) + '</span>' +
          '<div class="comet-metrics">' +
            metrics.map(function (m) {
              return '<div class="comet-metric ' + M.esc(m.cls) + '"><div class="lbl">' + M.esc(m.lbl) + '</div><div class="val">' + M.esc(m.val) + '</div></div>';
            }).join('') +
          '</div>' +
          '<p style="margin:0;font-size:.92rem;color:var(--cream-muted);line-height:1.6">' + M.esc(summary) + '</p>' +
        '</div>' +
        '<div class="comet-card">' +
          '<span class="mono">[CONTRÔLES EXÉCUTÉS]</span>' +
          '<ul class="comet-steps">' +
            st.checks.map(function (c) {
              return '<li><b>[' + M.esc(c[0]) + ']</b><span>' + M.esc(c[1]) + '</span></li>';
            }).join('') +
          '</ul>' +
          actionHtml +
          '<div class="comet-log" id="dirLog"><b>[TRACE · ' + M.esc(lastHash) + ']</b> Étape ' + num + ' / 7 affichée sur jeu d\'essai fictif.</div>' +
        '</div>';

      var btnRes = document.getElementById('btnDirResolve');
      if (btnRes) {
        btnRes.addEventListener('click', function () {
          resolved = true;
          lastHash = M.hashDemo('RESOLVE-M-DIAKITE', lastHash);
          renderStep(4);
        });
      }
      var btnRst = document.getElementById('btnDirReset');
      if (btnRst) {
        btnRst.addEventListener('click', function () {
          resolved = false;
          renderStep(4);
        });
      }
      var btnSeal = document.getElementById('btnDirSeal');
      if (btnSeal) {
        btnSeal.addEventListener('click', function () {
          sealed = true;
          lastHash = M.hashDemo('SEAL-CSI-L612-9', lastHash);
          renderStep(7);
        });
      }
    }

    stepTabs.forEach(function (t) {
      t.addEventListener('click', function () {
        renderStep(Number(t.getAttribute('data-step')));
      });
    });
    renderStep(1);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
