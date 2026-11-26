/*
 * CANTARA V3 — Logique accueil :
 * 1. Barre d'intention interactive type Comet (3 scénarios + Sas [OUI]/[NON])
 * 2. Diagnostic épuré 4 questions orientant vers le bon Espace Métier (WEBHOOK_ENABLED = false)
 */
(function () {
  'use strict';

  function init() {
    var M = window.CANTARA_MOTION;
    if (!M) return;

    /* ---------------------------------------------------------- */
    /* 1. FENÊTRE COMET — BARRE D'INTENTION INTERACTIVE           */
    /* ---------------------------------------------------------- */
    var INTENTS = {
      bouclier: {
        address: 'cantara://espace/securite-privee/bouclier',
        prompt: 'Vérifier la rentabilité d\'un devis Sécurité Nuit à 23,00 €/h',
        linkHref: 'securite-privee.html#bouclier',
        linkLabel: 'Tester le Bouclier →',
        kicker: '[ESPACE SÉCURITÉ · BOUCLIER ANTI-PERTES]',
        metrics: [
          { lbl: 'Résultat mensuel', val: '-1 821 €', cls: 'alert' },
          { lbl: 'Prix plancher', val: '31,88 €/h', cls: 'good' }
        ],
        summary: 'Sur 300 h/mois en vacation ADS Nuit, facturer 23,00 €/h crée une perte sèche avant même le premier imprévu. Le verrou bloque l\'offre tant que la marge cible n\'est pas validée.',
        steps: [
          ['01', 'Taux horaire comparé au coût complet ADS Nuit (22,97 €/h + structure)'],
          ['02', 'Vérification du plancher 6 h (Avenant n° 2 IDCC 1351)'],
          ['03', 'Proposition de révision BPU soumise au dirigeant']
        ],
        approve: 'Verrou financier confirmé : révision du tarif plancher tracée.',
        reject: 'Alerte conservée en brouillon sans modification du devis.'
      },
      planning: {
        address: 'cantara://espace/securite-privee/director',
        prompt: 'Résoudre une double affectation CNAPS tout en respectant le repos 11 h',
        linkHref: 'securite-privee.html#director',
        linkLabel: 'Voir les 7 étapes →',
        kicker: '[ESPACE SÉCURITÉ · SECURIAXE DIRECTOR]',
        metrics: [
          { lbl: 'Chevauchement', val: '7,0 h', cls: 'alert' },
          { lbl: 'Remplaçant prêt', val: 'M. DIAKITE', cls: 'good' }
        ],
        summary: 'Fatima ZAIDI est affectée sur deux sites simultanés (09h–21h et 14h–22h). Le moteur propose un remplaçant 100 % conforme (CNAPS valide, SST/SSIAP à jour, repos ≥ 11 h).',
        steps: [
          ['01', 'Exclusion automatique des agents CNAPS ou SST expirés'],
          ['02', 'Contrôle du repos quotidien ≥ 11 h (Code du travail) et plafond 48 h'],
          ['03', 'Préparation de l\'Ordre de Mission (CSI L.612-9) en attente de clic']
        ],
        approve: 'Remplacement approuvé : affectation basculée et scellée (simulation).',
        reject: 'Affectation maintenue en alerte manuelle pour arbitrage direction.'
      },
      btp: {
        address: 'cantara://espace/btp/relance-devis',
        prompt: 'Préparer une relance courtoise J+7 pour un devis isolation de 11 400 €',
        linkHref: 'btp.html#cockpit',
        linkLabel: 'Tester le cockpit BTP →',
        kicker: '[ESPACE BTP · RELANCE DEVIS FRANCE]',
        metrics: [
          { lbl: 'Devis en attente', val: '11 400 €', cls: '' },
          { lbl: 'Bienséance', val: 'Conforme', cls: 'good' }
        ],
        summary: 'Un brouillon courtois et sobre est préparé (jours ouvrés 08h30–19h00, max 2 relances, mention STOP) après vérification des attestations Décennale et URSSAF.',
        steps: [
          ['01', 'Détection du devis sans réponse depuis 7 jours'],
          ['02', 'Contrôle Décennale & URSSAF à jour avant relance'],
          ['03', 'Brouillon prêt dans le Sas — aucun envoi sans votre accord']
        ],
        approve: 'Relance J+7 validée dans le Sas (simulation locale, 0 envoi réel).',
        reject: 'Relance écartée : dossier placé en suivi manuel.'
      }
    };

    var activeIntent = 'bouclier';
    var prevHash = 'GENESIS';
    var pills = Array.prototype.slice.call(document.querySelectorAll('.intent-pill[data-intent]'));

    function renderIntent(key) {
      activeIntent = key;
      var data = INTENTS[key];
      pills.forEach(function (p) {
        p.setAttribute('aria-selected', p.getAttribute('data-intent') === key ? 'true' : 'false');
      });
      document.getElementById('cometAddress').textContent = data.address;
      document.getElementById('intentText').textContent = data.prompt;
      var link = document.getElementById('intentSpaceLink');
      link.setAttribute('href', data.linkHref);
      link.textContent = data.linkLabel;
      document.getElementById('cometKicker').textContent = data.kicker;
      document.getElementById('cometSummary').textContent = data.summary;

      document.getElementById('cometMetrics').innerHTML = data.metrics.map(function (m) {
        return '<div class="comet-metric ' + M.esc(m.cls) + '">' +
          '<div class="lbl">' + M.esc(m.lbl) + '</div>' +
          '<div class="val">' + M.esc(m.val) + '</div>' +
        '</div>';
      }).join('');

      document.getElementById('cometSteps').innerHTML = data.steps.map(function (s) {
        return '<li><b>[' + M.esc(s[0]) + ']</b><span>' + M.esc(s[1]) + '</span></li>';
      }).join('');
    }

    function pushLog(tag, msg) {
      var ts = new Date().toTimeString().split(' ')[0];
      prevHash = M.hashDemo(ts + '|' + activeIntent + '|' + tag, prevHash);
      document.getElementById('cometLog').innerHTML =
        '<b>[' + M.esc(ts) + ' · ' + M.esc(tag) + ' · ' + M.esc(prevHash) + ']</b> ' + M.esc(msg);
    }

    pills.forEach(function (p) {
      p.addEventListener('click', function () {
        renderIntent(p.getAttribute('data-intent'));
      });
    });

    document.getElementById('btnCometApprove').addEventListener('click', function () {
      pushLog('OUI', INTENTS[activeIntent].approve);
    });
    document.getElementById('btnCometReject').addEventListener('click', function () {
      pushLog('NON', INTENTS[activeIntent].reject);
    });
    renderIntent('bouclier');

    /* ---------------------------------------------------------- */
    /* 2. DIAGNOSTIC ÉPURÉ (4 QUESTIONS → ESPACE MÉTIER)          */
    /* ---------------------------------------------------------- */
    var QUESTIONS = [
      {
        id: 'sector',
        label: 'Étape 1 / 4',
        title: 'Dans quel métier évolue votre entreprise ?',
        options: [
          { value: 'securite', key: 'A', label: 'Sécurité privée (gardiennage, SSIAP, rondes, événementiel)' },
          { value: 'btp', key: 'B', label: 'Bâtiment, rénovation, artisanat ou travaux' },
          { value: 'autre', key: 'C', label: 'Autre PME de services B2B en France' }
        ]
      },
      {
        id: 'need',
        label: 'Étape 2 / 4',
        title: 'Quel sujet voulez-vous sécuriser en priorité ?',
        options: [
          { value: 'marge', key: 'A', label: 'Vérifier mes marges et répondre plus vite aux appels d\'offres' },
          { value: 'planning', key: 'B', label: 'Piloter plannings, validités CNAPS et conformité au quotidien' },
          { value: 'devis', key: 'C', label: 'Récupérer mes devis envoyés sans réponse (J+3 / J+7)' }
        ]
      },
      {
        id: 'horizon',
        label: 'Étape 3 / 4',
        title: 'Quel rythme de mise en place recherchez-vous ?',
        options: [
          { value: 'immediat', key: 'A', label: 'Immédiat (outils autonomes ou dossier urgent 48 h)' },
          { value: 'semaine', key: 'B', label: 'Rapide (déploiement structuré en 3 à 7 jours)' },
          { value: 'pilote', key: 'C', label: 'Sur mesure (démonstration dirigeant et déploiement pilote)' }
        ]
      },
      {
        id: 'size',
        label: 'Étape 4 / 4',
        title: 'Quelle est la taille de votre équipe ?',
        options: [
          { value: 'tpe', key: 'A', label: '1 à 9 personnes' },
          { value: 'pme', key: 'B', label: '10 à 49 personnes' },
          { value: 'multi', key: 'C', label: '50 personnes et plus (multi-sites)' }
        ]
      }
    ];

    var answers = {};
    var idx = 0;
    var box = document.getElementById('diagBox');

    function getOrientation() {
      if (answers.sector === 'securite' || answers.need === 'marge' || answers.need === 'planning') {
        return {
          badge: 'Espace recommandé : Sécurité Privée (Securiaxe)',
          title: 'Rejoignez l\'espace Sécurité Privée',
          desc: 'Commencez par tester le Simulateur Bouclier Anti-Pertes et le parcours 7 étapes Securiaxe Director sur CANTARA. Si cela correspond à vos besoins, l\'acquisition s\'effectue ensuite directement sur le site dédié Securiaxe.',
          primaryHref: 'securite-privee.html',
          primaryLabel: 'Ouvrir l\'espace Sécurité Privée →',
          secondaryHref: M.CONFIG.SECURIAXE_URL,
          secondaryLabel: 'Aller sur le site Securiaxe ↗',
          secondaryExternal: true
        };
      }
      return {
        badge: 'Espace recommandé : BTP & Rénovation',
        title: 'Rejoignez l\'espace BTP & Relance Devis',
        desc: 'Testez immédiatement le cockpit de relance de devis J+3/J+7 avec Sas dirigeant et simulez le chiffre d\'affaires récupérable sur vos propres volumes.',
        primaryHref: 'btp.html',
        primaryLabel: 'Ouvrir l\'espace BTP & Relance →',
        secondaryHref: null,
        secondaryLabel: null,
        secondaryExternal: false
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
            (idx > 0 ? '<button type="button" class="link-btn" id="dPrev">← Retour</button>' : '<span></span>') +
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
      box.innerHTML =
        '<span class="mono" style="color:var(--accent-ok)">' + M.esc(rec.badge) + '</span>' +
        '<h3 class="q-title" style="margin-top:.6rem">' + M.esc(rec.title) + '</h3>' +
        '<p style="margin:0 0 1.4rem;color:var(--ink-body)">' + M.esc(rec.desc) + '</p>' +
        '<div style="display:flex;gap:.65rem;flex-wrap:wrap;margin-bottom:1.6rem">' +
          '<a href="' + M.esc(rec.primaryHref) + '" class="btn btn-primary btn-sm">' + M.esc(rec.primaryLabel) + '</a>' +
          (rec.secondaryHref ? '<a href="' + M.esc(rec.secondaryHref) + '" class="btn btn-ghost btn-sm" target="_blank" rel="noopener noreferrer">' + M.esc(rec.secondaryLabel) + '</a>' : '') +
          '<button type="button" class="link-btn" id="dRestart" style="margin-left:auto">Recommencer</button>' +
        '</div>' +
        '<form id="diagContact" novalidate style="border-top:1px dashed var(--edge);padding-top:1.3rem">' +
          '<p class="mono" style="margin:0 0 .9rem">Ou préparer une demande d\'échange dirigeant (15 min)</p>' +
          '<div class="form-grid">' +
            '<div class="field"><label for="cName">Votre nom *</label><input class="input-ctrl" id="cName" required autocomplete="name"><span class="err" id="eName"></span></div>' +
            '<div class="field"><label for="cOrg">Entreprise *</label><input class="input-ctrl" id="cOrg" required autocomplete="organization"><span class="err" id="eOrg"></span></div>' +
            '<div class="field full"><label for="cMail">E-mail professionnel *</label><input class="input-ctrl" id="cMail" type="email" required autocomplete="email"><span class="err" id="eMail"></span></div>' +
            '<div class="field full"><label class="consent"><input type="checkbox" id="cOk"><span>J\'accepte d\'être recontacté exclusivement pour cet échange B2B (jours ouvrés 08h30–19h00, purge 30 jours, aucune revente).</span></label><span class="err" id="eOk"></span></div>' +
          '</div>' +
          '<button type="submit" class="btn btn-primary btn-sm">Enregistrer ma demande</button>' +
          '<div id="diagNotice" aria-live="polite"></div>' +
        '</form>';

      document.getElementById('dRestart').addEventListener('click', function () {
        answers = {};
        idx = 0;
        renderDiag();
      });

      document.getElementById('diagContact').addEventListener('submit', function (e) {
        e.preventDefault();
        var n = document.getElementById('cName').value.trim();
        var o = document.getElementById('cOrg').value.trim();
        var m = document.getElementById('cMail').value.trim();
        var ok = document.getElementById('cOk').checked;
        document.getElementById('eName').textContent = n ? '' : 'Veuillez indiquer votre nom.';
        document.getElementById('eOrg').textContent = o ? '' : 'Veuillez indiquer votre entreprise.';
        document.getElementById('eMail').textContent = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m) ? '' : 'Veuillez saisir un e-mail valide.';
        document.getElementById('eOk').textContent = ok ? '' : 'Veuillez cocher la case de consentement.';
        if (!n || !o || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m) || !ok) return;

        document.getElementById('diagNotice').innerHTML =
          '<div class="notice notice-ok">Demande enregistrée localement (mode pré-production · WEBHOOK_ENABLED = false). Aucune donnée transmise sur Internet.</div>';
      });
    }

    renderDiag();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
