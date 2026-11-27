/*
 * CANTARA V3 — Démonstrateur Solution SECURIAXE (Sécurité Privée) :
 * 1. Calculateur opérationnel Bouclier Anti-Pertes (calcul local déterministe)
 * 2. Prototype interactif 7 étapes Securiaxe Director (simulation sur jeu d'essai fictif sans crochets artificiels ni fausses URLs)
 */
(function () {
  'use strict';

  function init() {
    var M = window.CANTARA_MOTION;
    if (!M) return;

    /* ---------------------------------------------------------- */
    /* 1. SIMULATEUR BOUCLIER ANTI-PERTES (CALCUL LOCAL)          */
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

      var unitCost = Math.round(base * (1 + struct / 100) * 100) / 100;
      var floor = Math.round((unitCost / 0.90) * 100) / 100;
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
        vEl.textContent = 'Tarif équilibré : marge nette estimée à ' + pct.toFixed(1).replace('.', ',') + ' % (' + M.fmtEur(monthly * 12) + ' / an).';
      }
    }

    [bType, bRate, bHours, bStruct].forEach(function (el) {
      el.addEventListener('input', updateBouclier);
      el.addEventListener('change', updateBouclier);
    });
    updateBouclier();

    /* ---------------------------------------------------------- */
    /* 2. PROTOTYPE INTERACTIF 7 ÉTAPES — SECURIAXE DIRECTOR      */
    /* ---------------------------------------------------------- */
    var resolved = false;
    var sealed = false;

    var STEPS = {
      1: {
        addr: 'Étape 1 sur 7 : Synthèse d\'exploitation multi-sites',
        kicker: '01 — Vue d\'exploitation dirigeant',
        metrics: [
          { lbl: 'Volume mensuel suivi (fictif)', val: '48 640 €', cls: '' },
          { lbl: 'Marge nette simulée', val: '+12,4 %', cls: 'good' }
        ],
        summary: 'Synthèse opérationnelle sur 3 sites fictifs : chiffre d\'affaires, rentabilité par poste, échéances de cartes professionnelles à moins de 30 jours et arbitrages en attente.',
        checks: [
          ['Site 01', 'Résidence Les Oliviers · Vacations 06h–14h et 14h–22h'],
          ['Site 02', 'Entrepôt Logisud · Vacation Nuit 22h–06h (marge équilibrée)'],
          ['Site 03', 'Centre Commercial Athena · Poste ERP SSIAP 1']
        ],
        action: null
      },
      2: {
        addr: 'Étape 2 sur 7 : Échéances des cartes professionnelles',
        kicker: '02 — Contrôle des titres CNAPS',
        metrics: [
          { lbl: 'Prévenance renouvellement', val: 'J-11', cls: 'warn' },
          { lbl: 'Titre expiré', val: 'Affectation bloquée', cls: 'alert' }
        ],
        summary: 'Les dates de validité des cartes professionnelles (saisies dans votre registre) sont vérifiées jusqu\'à l\'heure exacte de fin de vacation, y compris sur les fins de nuit à J+1 06h00.',
        checks: [
          ['Valide', 'Karim BENALI · Carte professionnelle CP-78421 en cours de validité'],
          ['Échéance J-11', 'Fatima ZAIDI · Dossier de renouvellement à anticiper'],
          ['Titre échu', 'Sofia KHELIFI · Carte expirée, planification impossible']
        ],
        action: null
      },
      3: {
        addr: 'Étape 3 sur 7 : Habilitations SST/SSIAP et repos quotidien 11 h',
        kicker: '03 — Verrous réglementaires & repos 11 h',
        metrics: [
          { lbl: 'Repos quotidien légal', val: '≥ 11,0 h', cls: 'good' },
          { lbl: 'Habilitation SST échue', val: 'Refus automatique', cls: 'alert' }
        ],
        summary: 'Six contrôles déterministes avant validation d\'un planning : carte professionnelle, SST, SSIAP, repos quotidien ≥ 11 h (Code du travail), plafond hebdomadaire 48 h et absence de chevauchement.',
        checks: [
          ['Qualification', 'Amine TOUATI écarté sur un poste exigeant un SST à jour'],
          ['Repos légal', 'Calcul de l\'intervalle minimal de 11,0 h depuis la fin du poste précédent'],
          ['Plafond 48 h', 'Vérification du cumul hebdomadaire avant affectation']
        ],
        action: null
      },
      4: {
        addr: 'Étape 4 sur 7 : Résolution d\'une double affectation',
        kicker: '04 — Arbitrage de conflit horaire',
        metrics: function () {
          return [
            { lbl: 'Chevauchement constaté', val: resolved ? '0,0 h' : '7,0 h', cls: resolved ? 'good' : 'alert' },
            { lbl: 'Remplaçant qualifié', val: 'M. DIAKITE', cls: 'good' }
          ];
        },
        summary: function () {
          return resolved
            ? 'Conflit résolu : Moussa DIAKITE reprend la vacation 14h–22h aux Oliviers (carte professionnelle, SST et repos de 24,0 h ≥ 11,0 h vérifiés).'
            : 'Fatima ZAIDI est planifiée simultanément sur Athena (09h–21h) et Les Oliviers (14h–22h), soit 7,0 h de chevauchement. Le moteur propose un remplaçant disponible et habilité.';
        },
        checks: [
          ['Conflit', 'Poste Athena (09h–21h) incompatible avec Les Oliviers (14h–22h)'],
          ['Candidat', 'Moussa DIAKITE : carte pro, SST et SSIAP 1 à jour, repos de 24,0 h'],
          ['Décision', 'Aucune modification du planning sans validation de l\'exploitant']
        ],
        action: 'resolve'
      },
      5: {
        addr: 'Étape 5 sur 7 : Contrôle du seuil de rentabilité',
        kicker: '05 — Verrou Bouclier Anti-Pertes',
        metrics: [
          { lbl: 'Écart à 23,00 €/h (300 h)', val: '-819 €', cls: 'alert' },
          { lbl: 'Plancher (marge 10 %)', val: '28,59 €/h', cls: 'good' }
        ],
        summary: 'Sur 300 h/mois en ADS Nuit (repère 22,97 €/h + 12 % structure = 25,73 €/h), facturer 23,00 €/h entraîne une perte de -819 €/mois. Le verrou signale un plancher à 28,59 €/h (marge 10 %) et rappelle l\'Avenant n° 2 (minimum 6 h).',
        checks: [
          ['Coût complet', 'ADS Nuit : 22,97 €/h hors structure (25,73 €/h avec 12 % de structure)'],
          ['Garde-fou', 'Alerte immédiate en cas de chiffrage sous le coût de revient'],
          ['Avenant n° 2', 'Prise en compte du plancher de 6 h sur les vacations isolées']
        ],
        action: null
      },
      6: {
        addr: 'Étape 6 sur 7 : Pseudonymisation avant assistance documentaire',
        kicker: '06 — Isolation des données nominatives',
        metrics: [
          { lbl: 'Masquage des identités', val: 'Actif', cls: 'good' },
          { lbl: 'Envoi automatique', val: 'Désactivé', cls: 'good' }
        ],
        summary: 'Avant toute synthèse assistée, les noms, prénoms et numéros de titres sont remplacés localement par des identifiants neutres. Le brouillon demeure soumis à la relecture humaine.',
        checks: [
          ['Confidentialité', 'Aucune identité réelle d\'agent transmise à un service externe'],
          ['Périmètre', 'Aide à la rédaction de synthèses, de courriers et de notes d\'exploitation'],
          ['Contrôle', 'Relecture et validation obligatoires par le dirigeant']
        ],
        action: null
      },
      7: {
        addr: 'Étape 7 sur 7 : Édition de l\'ordre de mission (CSI L.612-9)',
        kicker: '07 — Ordre de mission & journal de contrôle',
        metrics: function () {
          return [
            { lbl: 'Référence réglementaire', val: 'CSI L.612-9', cls: 'good' },
            { lbl: 'Journal de contrôle', val: sealed ? 'Enregistré' : 'En attente', cls: sealed ? 'good' : '' }
          ];
        },
        summary: 'Préparation structurée de l\'Ordre de Mission (CSI L.612-9) et de la liste des pièces de sous-traitance (L.612-14) : seuls les opérateurs conformes sont retenus et toute pièce non renseignée reste signalée à compléter.',
        checks: [
          ['Rigueur', 'Aucune coordonnée ou pièce manquante n\'est inventée'],
          ['Traçabilité', 'Chaque validation d\'affectation est inscrite au journal d\'exploitation'],
          ['Accès', 'Étude d\'un déploiement pilote sur demande auprès de CANTARA']
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
          '<button type="button" class="btn btn-primary btn-sm" id="btnDirResolve"' + (resolved ? ' disabled' : '') + '>' + (resolved ? 'Remplacement validé' : 'Valider le remplacement par M. DIAKITE') + '</button>' +
          (resolved ? '<button type="button" class="btn btn-ghost btn-sm" id="btnDirReset">Réinitialiser l\'étape</button>' : '') +
        '</div>';
      } else if (st.action === 'seal') {
        actionHtml = '<div style="display:flex;gap:.55rem;flex-wrap:wrap">' +
          '<button type="button" class="btn btn-primary btn-sm" id="btnDirSeal"' + (sealed ? ' disabled' : '') + '>' + (sealed ? 'Ordre de mission validé' : 'Valider l\'ordre de mission') + '</button>' +
        '</div>';
      }

      stage.innerHTML =
        '<div class="comet-card">' +
          '<div class="card-kicker"><span>' + M.esc(st.kicker) + '</span><span>Simulation locale</span></div>' +
          '<div class="comet-metrics">' +
            metrics.map(function (m) {
              return '<div class="comet-metric ' + M.esc(m.cls) + '"><div class="lbl">' + M.esc(m.lbl) + '</div><div class="val">' + M.esc(m.val) + '</div></div>';
            }).join('') +
          '</div>' +
          '<p style="margin:0;font-size:.9rem;color:var(--cream-muted);line-height:1.6">' + M.esc(summary) + '</p>' +
        '</div>' +
        '<div class="comet-card">' +
          '<div class="card-kicker"><span>Points de contrôle vérifiés</span><span>Étape ' + num + ' / 7</span></div>' +
          '<ul class="comet-steps">' +
            st.checks.map(function (c) {
              return '<li><b>' + M.esc(c[0]) + '</b><span>' + M.esc(c[1]) + '</span></li>';
            }).join('') +
          '</ul>' +
          actionHtml +
          '<div class="comet-log" id="dirLog"><b>Journal d\'exploitation local :</b> Étape ' + num + ' sur 7 consultée sur jeu de données fictives.</div>' +
        '</div>';

      var btnRes = document.getElementById('btnDirResolve');
      if (btnRes) {
        btnRes.addEventListener('click', function () {
          resolved = true;
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
