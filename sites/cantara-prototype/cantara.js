/*
 * CANTARA — Prototype page d'accueil v1 — logique d'interaction (JS natif, 0 dépendance)
 * GARDE-FOU : aucune requête réseau. Le formulaire de rendez-vous ne transmet rien.
 * L'intégration réelle passera par sites/shared/syntesia-forms.js (pipeline CRM existant)
 * après arbitrage du fondateur.
 */
(function () {
  'use strict';

  var CONFIG = Object.freeze({ ENVIRONMENT: 'PREPROD', WEBHOOK_ENABLED: false });
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[c]; }); }
  function fmt(n) { return Math.round(n).toLocaleString('fr-FR').replace(/\u202f|\u00a0/g, ' '); }

  /* ------------------------------------------------------------------ */
  /* En-tête : état scrollé, bascule nuit, menu mobile, section active   */
  /* ------------------------------------------------------------------ */
  var header = $('#siteHeader');
  var menuBtn = $('#menuBtn');
  var nights = $$('.night');
  var spySections = $$('#capacites, #demonstration, #secteurs, #diagnostic, #methode');
  var navLinks = $$('.nav a:not(.nav-cta)');
  var ticking = false;

  function onScroll() {
    ticking = false;
    var y = window.scrollY;
    header.classList.toggle('scrolled', y > 8);
    var probe = header.getBoundingClientRect().bottom - 4;
    var inNight = nights.some(function (n) { var r = n.getBoundingClientRect(); return r.top <= probe && r.bottom >= probe; });
    document.documentElement.classList.toggle('in-night', inNight);
    var current = null;
    spySections.forEach(function (s) { if (s.getBoundingClientRect().top <= window.innerHeight * 0.4) current = s.id; });
    navLinks.forEach(function (a) { a.setAttribute('aria-current', a.getAttribute('href') === '#' + current ? 'true' : 'false'); });
    lightManifesto();
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener('resize', onScroll);

  function closeMenu() { header.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.textContent = 'Menu'; }
  menuBtn.addEventListener('click', function () {
    var open = !header.classList.contains('open');
    header.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.textContent = open ? 'Fermer' : 'Menu';
  });
  $$('.nav a').forEach(function (a) { a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && header.classList.contains('open')) { closeMenu(); menuBtn.focus(); } });

  /* ------------------------------------------------------------------ */
  /* Plan blueprint + révélations                                        */
  /* ------------------------------------------------------------------ */
  requestAnimationFrame(function () { $('#blueprint').classList.add('drawn'); });

  var revealObs = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); revealObs.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }) : null;
  $$('.reveal').forEach(function (el) { revealObs ? revealObs.observe(el) : el.classList.add('in'); });

  /* Manifeste : les mots s'allument au fil du défilement (accessible sans aria-label sur <p>) */
  var manifesto = $('#manifesto');
  var words = [], lastLit = -1;
  if (manifesto && !reduceMotion) {
    var text = manifesto.textContent.trim();
    manifesto.innerHTML = text.split(/\s+/).map(function (w) { return '<span class="dim">' + esc(w) + '</span>'; }).join(' ');
    words = $$('.dim', manifesto);
  }
  function lightManifesto() {
    if (!words.length) return;
    var r = manifesto.getBoundingClientRect();
    var vh = window.innerHeight;
    if (r.bottom < -50 || r.top > vh + 50) return;
    var p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
    var n = Math.round(p * words.length);
    if (n === lastLit) return;
    lastLit = n;
    for (var i = 0; i < words.length; i++) words[i].classList.toggle('lit', i < n);
  }

  /* ------------------------------------------------------------------ */
  /* Théâtre système — simulation pédagogique                            */
  /* ------------------------------------------------------------------ */
  var SECTORS = [
    {
      id: 'securite', label: 'Sécurité privée', events: [
        { src: 'Registre RH', title: 'Carte professionnelle d\'un agent : échéance dans 21 jours', steps: [
          ['Événement capté', 'Échéance détectée dans le registre des agents.', 'Registre RH'],
          ['Croisé avec vos règles', 'Une carte professionnelle valide est requise pour toute vacation.', 'Règle métier'],
          ['Impact évalué', '3 vacations planifiées après l\'échéance, sur le site « Entrepôt Nord » (fictif).', 'Planning'],
          ['Brouillon préparé', 'Message à l\'agent et remplacement pré-identifié pour les vacations exposées.', 'Agent IA']],
          draft: 'Bonjour M. Durand,\n\nVotre carte professionnelle arrive à échéance le 16/12. Pouvez-vous nous transmettre le récépissé de renouvellement avant le 06/12 ?\n\nSans ce document, vos 3 vacations prévues après le 16/12 seront réaffectées.\n\nL\'exploitation',
          checks: ['Agent et dates vérifiés', 'Remplaçant qualifié disponible', 'Aucun envoi sans validation'] },
        { src: 'Messagerie', title: 'Absence signalée : agent de nuit, ce soir 21 h', steps: [
          ['Événement capté', 'SMS d\'absence reçu à 16 h 42.', 'Messagerie'],
          ['Croisé avec vos règles', 'Qualification SSIAP 1 requise, repos de 11 h et plafond hebdomadaire respectés.', 'Règle métier'],
          ['Impact évalué', '2 agents éligibles sur 14. Aucun dépassement d\'heures.', 'Planning'],
          ['Brouillon préparé', 'Proposition de remplacement prête à envoyer.', 'Agent IA']],
          draft: 'Proposition de remplacement — ce soir 21 h → 7 h\nSite : Entrepôt Nord (fictif)\n\n1. K. Benali — SSIAP 1 — 31 h cette semaine — repos OK\n2. S. Morel — SSIAP 1 — 28 h cette semaine — repos OK\n\nAction : proposer la vacation à K. Benali.',
          checks: ['Qualification conforme', 'Temps de repos respectés', 'Client informé après validation'] },
        { src: 'Client', title: 'Le client demande le rapport mensuel des vacations', steps: [
          ['Événement capté', 'Demande reçue par e-mail.', 'Messagerie'],
          ['Croisé avec vos règles', 'Périmètre contractuel : 2 sites, mois de novembre.', 'Contrat'],
          ['Impact évalué', '186 vacations consolidées, 2 écarts horaires à justifier.', 'Planning'],
          ['Brouillon préparé', 'Rapport et réponse au client pré-rédigés.', 'Agent IA']],
          draft: 'Madame,\n\nVous trouverez ci-joint le rapport des vacations de novembre pour vos 2 sites : 186 vacations, taux de couverture 100 %.\n\nDeux écarts horaires (les 08/11 et 21/11) sont justifiés en annexe.\n\nCordialement,',
          checks: ['Chiffres rapprochés du planning', 'Écarts documentés', 'Pièce jointe générée'] }
      ]
    },
    {
      id: 'btp', label: 'Bâtiment & BTP', events: [
        { src: 'Logiciel de devis', title: 'Devis n° 2026-118 sans réponse depuis 12 jours (18 400 € HT)', steps: [
          ['Événement capté', 'Aucune réponse depuis l\'envoi du 13/11.', 'Logiciel de devis'],
          ['Croisé avec vos règles', 'Relance à J+10 pour tout devis supérieur à 5 000 € HT.', 'Règle métier'],
          ['Impact évalué', 'Validité du devis : encore 18 jours. Client récurrent (3 chantiers).', 'Historique'],
          ['Brouillon préparé', 'Relance personnalisée rédigée.', 'Agent IA']],
          draft: 'Bonjour Madame Leroy,\n\nJe reviens vers vous au sujet de notre devis n° 2026-118 pour la rénovation de la cage d\'escalier.\n\nNous pouvons démarrer dès la semaine 2. Souhaitez-vous que nous en parlions 10 minutes cette semaine ?\n\nBien cordialement,',
          checks: ['Montant et références vérifiés', 'Ton adapté à un client récurrent', 'Aucun envoi sans validation'] },
        { src: 'Suivi de chantier', title: 'Situation de travaux n° 3 à émettre — chantier « Rue des Lilas »', steps: [
          ['Événement capté', 'Avancement déclaré par le conducteur de travaux : 65 %.', 'Suivi de chantier'],
          ['Croisé avec vos règles', 'Situation mensuelle et retenue de garantie de 5 %.', 'Contrat'],
          ['Impact évalué', '24 180 € HT à facturer ce mois-ci.', 'Facturation'],
          ['Brouillon préparé', 'Situation pré-remplie, prête pour votre contrôle.', 'Agent IA']],
          draft: 'Situation n° 3 — Rue des Lilas (fictif)\n\nAvancement cumulé : 65 %\nMontant cumulé : 61 360 € HT\nDéjà facturé : 37 180 € HT\nRetenue de garantie 5 % : −1 209 €\n\nÀ facturer : 22 971 € HT',
          checks: ['Avancement cohérent avec le planning', 'Retenue appliquée', 'Envoi au client après validation'] },
        { src: 'Coffre documentaire', title: 'Attestation de vigilance d\'un sous-traitant : expire dans 9 jours', steps: [
          ['Événement capté', 'Date de fin de validité détectée.', 'Coffre documentaire'],
          ['Croisé avec vos règles', 'Obligation de vigilance du donneur d\'ordre : pièce à jour tous les 6 mois.', 'Règle métier'],
          ['Impact évalué', 'Sous-traitant présent sur 2 chantiers en cours.', 'Planning'],
          ['Brouillon préparé', 'Demande de pièce rédigée.', 'Agent IA']],
          draft: 'Bonjour,\n\nVotre attestation de vigilance arrive à échéance le 04/12. Merci de nous transmettre la nouvelle attestation avant cette date, afin de poursuivre les chantiers en cours sans interruption.\n\nService administratif',
          checks: ['Sous-traitant identifié', 'Chantiers concernés listés', 'Aucun envoi sans validation'] }
      ]
    },
    {
      id: 'hcr', label: 'Hôtellerie & restauration', events: [
        { src: 'Plateforme d\'avis', title: 'Avis 2★ publié : « attente trop longue au service du soir »', steps: [
          ['Événement capté', 'Nouvel avis détecté à 9 h 12.', 'Plateforme d\'avis'],
          ['Croisé avec vos règles', 'Réponse sous 24 h, ton courtois, aucune donnée client divulguée.', 'Charte'],
          ['Impact évalué', '3e mention de l\'attente ce mois-ci, toujours le vendredi soir.', 'Historique'],
          ['Brouillon préparé', 'Réponse publique et alerte interne rédigées.', 'Agent IA']],
          draft: 'Bonjour,\n\nMerci d\'avoir pris le temps de partager votre expérience. Vous avez raison : l\'attente de vendredi soir n\'était pas à la hauteur de ce que nous voulons offrir.\n\nNous renforçons l\'équipe de salle le vendredi dès cette semaine. Au plaisir de vous accueillir à nouveau.\n\nLa direction',
          checks: ['Aucune donnée personnelle', 'Récurrence signalée au gérant', 'Publication après validation'] },
        { src: 'Réservations', title: 'Banquet de samedi (80 couverts) : 2 extras manquants', steps: [
          ['Événement capté', 'Le besoin de personnel dépasse le planning actuel.', 'Réservations'],
          ['Croisé avec vos règles', 'Ratio d\'1 serveur pour 15 couverts et temps de travail HCR respectés.', 'Règle métier'],
          ['Impact évalué', '4 extras du vivier disponibles samedi.', 'Vivier'],
          ['Brouillon préparé', 'Proposition de mission prête à envoyer à 2 extras.', 'Agent IA']],
          draft: 'Bonjour Léa,\n\nNous recherchons un extra en salle ce samedi de 18 h à 0 h 30 pour un banquet de 80 couverts. Êtes-vous disponible ?\n\nMerci de répondre avant jeudi midi.',
          checks: ['Ratio de service atteint', 'Durée de travail conforme', 'Aucun envoi sans validation'] },
        { src: 'Capteur / relevés', title: 'Relevé de température de la chambre froide non saisi ce matin', steps: [
          ['Événement capté', 'Relevé de 8 h absent du registre.', 'Registre hygiène'],
          ['Croisé avec vos règles', 'Plan de maîtrise sanitaire : 2 relevés par jour.', 'HACCP'],
          ['Impact évalué', 'Dernier relevé hier à 18 h : 2,8 °C (conforme).', 'Historique'],
          ['Brouillon préparé', 'Rappel au responsable de cuisine.', 'Agent IA']],
          draft: 'Rappel hygiène — chambre froide n° 1\n\nLe relevé de 8 h n\'a pas été saisi. Merci de l\'effectuer et de le consigner avant 10 h.\n\nDernier relevé : hier 18 h — 2,8 °C (conforme).',
          checks: ['Historique conforme', 'Responsable identifié', 'Traçabilité HACCP conservée'] }
      ]
    }
  ];

  var tabsEl = $('#sectorTabs'), listEl = $('#eventList'), pipeEl = $('#pipeline'), barEl = $('#pipeBar');
  var draftEl = $('#draft'), checksEl = $('#checks'), approveBtn = $('#approveBtn'), rejectBtn = $('#rejectBtn');
  var auditEl = $('#audit'), pipeState = $('#pipeState'), evCount = $('#evCount'), panel = $('#demoPanel');
  var sectorIdx = 0, current = null, timers = [], doneMap = {};

  function clearTimers() { timers.forEach(clearTimeout); timers = []; }
  function now() { var d = new Date(); return d.toLocaleTimeString('fr-FR', { hour12: false }); }
  function log(html) {
    var div = document.createElement('div');
    div.innerHTML = '<b>' + now() + '</b> · ' + html;
    auditEl.prepend(div);
  }

  function renderTabs() {
    tabsEl.innerHTML = SECTORS.map(function (s, i) {
      return '<button type="button" role="tab" class="sector-tab" id="tab-' + s.id + '" aria-controls="demoPanel" aria-selected="' + (i === sectorIdx) + '" tabindex="' + (i === sectorIdx ? 0 : -1) + '">' + esc(s.label) + '</button>';
    }).join('');
    panel.setAttribute('aria-labelledby', 'tab-' + SECTORS[sectorIdx].id);
    $$('.sector-tab', tabsEl).forEach(function (b, i) {
      b.addEventListener('click', function () { selectSector(i, false); });
      b.addEventListener('keydown', function (e) {
        var k = e.key, n = SECTORS.length, t = null;
        if (k === 'ArrowRight') t = (i + 1) % n; else if (k === 'ArrowLeft') t = (i - 1 + n) % n; else if (k === 'Home') t = 0; else if (k === 'End') t = n - 1;
        if (t !== null) { e.preventDefault(); selectSector(t, true); }
      });
    });
  }

  function renderEvents() {
    var s = SECTORS[sectorIdx];
    listEl.innerHTML = s.events.map(function (ev, i) {
      var key = s.id + i, st = doneMap[key];
      return '<button type="button" class="event' + (st ? ' done' : '') + '" data-i="' + i + '" aria-pressed="' + (current === i) + '">' +
        '<span class="ev-meta"><span>' + esc(ev.src) + '</span><span class="ev-state">' + (st ? esc(st) : 'Nouveau') + '</span></span>' +
        '<span class="ev-title">' + esc(ev.title) + '</span></button>';
    }).join('');
    var done = s.events.filter(function (_, i) { return doneMap[s.id + i]; }).length;
    evCount.textContent = done + '/' + s.events.length;
    $$('.event', listEl).forEach(function (b) { b.addEventListener('click', function () { runEvent(+b.dataset.i); }); });
  }

  function idle() {
    pipeEl.innerHTML = '<li class="pipe-idle">Choisissez un événement à gauche.</li>';
    barEl.style.height = '0';
    draftEl.className = 'draft empty';
    draftEl.textContent = 'Sélectionnez un événement pour lancer le traitement.';
    checksEl.hidden = true;
    approveBtn.disabled = rejectBtn.disabled = true;
    pipeState.textContent = 'En attente';
  }

  function selectSector(i, focus) {
    clearTimers(); sectorIdx = i; current = null;
    renderTabs(); renderEvents(); idle();
    if (focus) $('#tab-' + SECTORS[i].id).focus();
    log('Métier sélectionné : ' + esc(SECTORS[i].label));
  }

  function runEvent(i) {
    clearTimers();
    var s = SECTORS[sectorIdx], ev = s.events[i];
    current = i; renderEvents();
    approveBtn.disabled = rejectBtn.disabled = true;
    checksEl.hidden = true;
    draftEl.className = 'draft empty';
    draftEl.textContent = 'Traitement en cours…';
    pipeState.textContent = 'Traitement';
    pipeEl.innerHTML = ev.steps.map(function (st) {
      return '<li class="step"><span class="pin" aria-hidden="true"></span><span class="tag">' + esc(st[2]) + '</span><h4>' + esc(st[0]) + '</h4><p>' + esc(st[1]) + '</p></li>';
    }).join('');
    barEl.style.height = '0';
    log('Événement capté : ' + esc(ev.title));
    var steps = $$('.step', pipeEl), delay = reduceMotion ? 0 : 620;
    steps.forEach(function (stEl, k) {
      timers.push(setTimeout(function () {
        if (k > 0) { steps[k - 1].classList.remove('active'); steps[k - 1].classList.add('passed'); }
        stEl.classList.add('active');
        var last = steps[steps.length - 1];
        var h = stEl.offsetTop + 6;
        barEl.style.height = Math.min(h, last.offsetTop + 6) + 'px';
      }, delay * k + (reduceMotion ? 0 : 150)));
    });
    timers.push(setTimeout(function () {
      steps[steps.length - 1].classList.remove('active'); steps[steps.length - 1].classList.add('passed');
      draftEl.className = 'draft';
      draftEl.textContent = ev.draft;
      checksEl.innerHTML = ev.checks.map(function (c) { return '<li>' + esc(c) + '</li>'; }).join('');
      checksEl.hidden = false;
      approveBtn.disabled = rejectBtn.disabled = false;
      pipeState.textContent = 'À valider';
      log('Brouillon prêt. <b>En attente de votre décision.</b>');
    }, delay * steps.length + (reduceMotion ? 0 : 250)));
  }

  function decide(ok) {
    if (current === null) return;
    var s = SECTORS[sectorIdx], key = s.id + current;
    doneMap[key] = ok ? 'Validé' : 'Écarté';
    log(ok ? 'Validé par vous. <b>Action simulée : aucun envoi réel.</b>' : 'Écarté par vous. Motif conservé au journal.');
    approveBtn.disabled = rejectBtn.disabled = true;
    pipeState.textContent = ok ? 'Validé' : 'Écarté';
    renderEvents();
    var next = s.events.findIndex(function (_, i) { return !doneMap[s.id + i]; });
    if (next !== -1) { var b = $('.event[data-i="' + next + '"]', listEl); if (b) b.focus(); }
  }
  approveBtn.addEventListener('click', function () { decide(true); });
  rejectBtn.addEventListener('click', function () { decide(false); });

  renderTabs(); renderEvents(); idle();
  setInterval(function () { $('#consoleClock').textContent = now(); }, 1000);

  /* Lancement automatique du premier événement quand la console devient visible */
  var consoleEl = $('#console'), autoplayed = false;
  if ('IntersectionObserver' in window) {
    var cObs = new IntersectionObserver(function (en) {
      if (en[0].isIntersecting && !autoplayed && current === null) { autoplayed = true; runEvent(0); cObs.disconnect(); }
    }, { threshold: 0.45 });
    cObs.observe(consoleEl);
  }

  /* ------------------------------------------------------------------ */
  /* Simulateur                                                          */
  /* ------------------------------------------------------------------ */
  var sp = $('#simPeople'), sh = $('#simHours'), sc = $('#simCost');
  function sim() {
    [sp, sh, sc].forEach(function (r) { r.style.setProperty('--p', ((r.value - r.min) / (r.max - r.min) * 100) + '%'); });
    var people = +sp.value, hours = +sh.value, cost = +sc.value;
    $('#simPeopleOut').textContent = people;
    $('#simHoursOut').textContent = hours + ' h';
    $('#simCostOut').textContent = cost + ' €';
    var base = people * hours * 4.33;
    var lo = base * 0.20, hi = base * 0.32;
    $('#simHoursRange').textContent = fmt(lo) + ' – ' + fmt(hi);
    $('#simEuroRange').textContent = fmt(Math.round(lo * cost * 11 / 100) * 100) + ' – ' + fmt(Math.round(hi * cost * 11 / 100) * 100) + ' €';
  }
  [sp, sh, sc].forEach(function (r) { r.addEventListener('input', sim); });
  sim();

  /* ------------------------------------------------------------------ */
  /* Diagnostic interactif → orientation → demande de rendez-vous        */
  /* ------------------------------------------------------------------ */
  var Q = [
    { id: 'secteur', t: 'Quel est votre secteur d\'activité ?', o: [
      ['securite', 'Sécurité privée'], ['btp', 'Bâtiment, BTP, rénovation'], ['hcr', 'Hôtellerie, restauration'], ['conseil', 'Conseil, gestion de patrimoine, services aux entreprises'], ['autre', 'Autre secteur']] },
    { id: 'taille', t: 'Combien de collaborateurs compte votre entreprise ?', o: [
      ['tpe', '1 à 9'], ['pme', '10 à 49'], ['pme2', '50 à 249'], ['eti', '250 et plus']] },
    { id: 'friction', t: 'Où votre équipe perd-elle le plus de temps ?', o: [
      ['devis', 'Devis, relances et suivi commercial'], ['planning', 'Plannings et affectation des équipes'], ['conformite', 'Conformité, documents et échéances'], ['facturation', 'Facturation et encaissements'], ['reporting', 'Reporting et tableaux de bord']] },
    { id: 'volume', t: 'Combien d\'heures par semaine y sont consacrées, au total ?', o: [
      ['v1', 'Moins de 5 heures'], ['v2', '5 à 15 heures'], ['v3', '15 à 30 heures'], ['v4', 'Plus de 30 heures']] },
    { id: 'outils', t: 'Comment vos informations sont-elles gérées aujourd\'hui ?', o: [
      ['papier', 'Principalement papier, e-mails et tableurs'], ['silos', 'Plusieurs logiciels qui ne communiquent pas'], ['central', 'Un logiciel central (ERP, CRM) déjà en place']] },
    { id: 'horizon', t: 'Quel est votre horizon ?', o: [
      ['urgent', 'Un problème urgent à régler dans le mois'], ['trimestre', 'Un projet à lancer dans le trimestre'], ['explorer', 'Je cherche d\'abord à comprendre ce qui est possible']] }
  ];
  var FRICTION = {
    devis: ['Relances de devis automatisées', 'Les devis dormants sont détectés et une relance personnalisée vous est soumise.'],
    planning: ['Planning sous contraintes', 'Affectations proposées selon les qualifications, les temps de repos et les absences.'],
    conformite: ['Veille des échéances et des pièces', 'Échéances suivies, pièces réclamées à temps, historique opposable.'],
    facturation: ['Facturation et relances d\'impayés', 'Factures préparées depuis l\'activité réelle, encours suivis.'],
    reporting: ['Tableau de bord consolidé', 'Indicateurs calculés automatiquement à partir de vos outils existants.']
  };
  var SECTOR_PRIO = {
    securite: ['Conformité des agents et des vacations', 'Cartes professionnelles, qualifications et temps de travail contrôlés avant chaque affectation.'],
    btp: ['Pilotage des situations de chantier', 'Situations, retenues et pièces des sous-traitants tenues à jour.'],
    hcr: ['Exploitation et hygiène au quotidien', 'Extras, relevés HACCP et réponses aux avis pris en charge.'],
    conseil: ['Dossiers clients et conformité', 'Pièces, échéances et comptes rendus structurés et tracés.'],
    autre: ['Cartographie de vos flux', 'Identifier précisément les tâches à fort potentiel avant de choisir les outils.']
  };
  var TOOL = {
    papier: { lvl: 'Fondations', g: 1, p: ['Structurer une source de vérité', 'Centraliser les données aujourd\'hui dispersées entre tableurs et e-mails.'] },
    silos: { lvl: 'Connexion', g: 2, p: ['Relier vos logiciels existants', 'Faire circuler l\'information sans double saisie, sans remplacer vos outils.'] },
    central: { lvl: 'Orchestration', g: 3, p: ['Déployer des agents sur votre socle', 'Votre logiciel central est prêt à accueillir des automatismes sous validation humaine.'] }
  };

  var stage = $('#diagStage'), answers = {}, step = 0, stepsNav = $$('#diagSteps li');

  function markSide(k) {
    stepsNav.forEach(function (li) { li.classList.toggle('on', +li.dataset.k <= k); });
  }

  function renderQ(focus) {
    var q = Q[step];
    markSide(step);
    stage.innerHTML =
      '<div class="field-row"><span class="mono">Question ' + (step + 1) + ' / ' + Q.length + '</span><span class="mono">≈ ' + Math.max(1, Math.ceil((Q.length - step) * 0.4)) + ' min</span></div>' +
      '<div class="progress" aria-hidden="true"><i style="width:' + (step / Q.length * 100) + '%"></i></div>' +
      '<fieldset class="options" id="diagOptions"><legend class="q-title" tabindex="-1" id="qTitle">' + esc(q.t) + '</legend>' +
      q.o.map(function (o, i) {
        var id = 'q-' + q.id + '-' + o[0];
        return '<label class="option" for="' + id + '"><input type="radio" name="' + q.id + '" id="' + id + '" value="' + o[0] + '"' + (answers[q.id] === o[0] ? ' checked' : '') + '><span class="key" aria-hidden="true">' + String.fromCharCode(65 + i) + '</span><span>' + esc(o[1]) + '</span></label>';
      }).join('') + '</fieldset>' +
      '<div class="diag-nav">' + (step > 0 ? '<button type="button" class="link-btn" id="diagBack">← Précédent</button>' : '<span></span>') +
      '<button type="button" class="btn btn-primary" id="diagNext"' + (answers[q.id] ? '' : ' disabled') + '>' + (step === Q.length - 1 ? 'Voir mon orientation' : 'Suivant') + ' <span class="arrow" aria-hidden="true">→</span></button></div>';
    requestAnimationFrame(function () { $('.progress i', stage).style.width = ((step + (answers[q.id] ? 1 : 0)) / Q.length * 100) + '%'; });
    $$('input', stage).forEach(function (inp) {
      inp.addEventListener('change', function () {
        answers[q.id] = inp.value;
        $('#diagNext').disabled = false;
        $('.progress i', stage).style.width = ((step + 1) / Q.length * 100) + '%';
      });
    });
    $('#diagNext').addEventListener('click', function () { if (!answers[q.id]) return; step++; step < Q.length ? renderQ(true) : renderResult(); });
    var back = $('#diagBack'); if (back) back.addEventListener('click', function () { step--; renderQ(true); });
    if (focus) $('#qTitle').focus({ preventScroll: true });
  }

  function qualification() {
    var s = 0;
    s += { tpe: 1, pme: 2, pme2: 3, eti: 3 }[answers.taille] || 0;
    s += { v1: 0, v2: 1, v3: 2, v4: 3 }[answers.volume] || 0;
    s += { urgent: 3, trimestre: 2, explorer: 0 }[answers.horizon] || 0;
    s += answers.secteur !== 'autre' ? 1 : 0;
    return s >= 7 ? 'A' : s >= 4 ? 'B' : 'C';
  }

  function renderResult() {
    markSide(6);
    var tool = TOOL[answers.outils], f = FRICTION[answers.friction], sp = SECTOR_PRIO[answers.secteur];
    var prios = [f, sp, tool.p];
    var next;
    if (answers.horizon === 'explorer') next = 'Un <strong>échange découverte de 30 minutes</strong> pour cartographier vos flux et vérifier le potentiel avant tout engagement.';
    else if (answers.volume === 'v3' || answers.volume === 'v4') next = 'Un <strong>audit opérationnel ciblé</strong> sur « ' + esc(f[0].toLowerCase()) + ' », avec chiffrage des gains avant toute conception.';
    else next = 'Un <strong>atelier de cadrage</strong> pour isoler une première automatisation rapide sur « ' + esc(f[0].toLowerCase()) + ' ».';
    var grade = qualification();
    stage.innerHTML =
      '<div class="field-row"><span class="mono">Votre orientation</span><span class="mono">Indicative</span></div>' +
      '<div class="progress" aria-hidden="true"><i style="width:100%"></i></div>' +
      '<h3 class="q-title" tabindex="-1" id="resTitle" style="margin-bottom:.6rem">Niveau de maturité opérationnelle</h3>' +
      '<div class="result-level"><span class="lvl">' + tool.lvl + '</span><span class="mono">Niveau ' + tool.g + ' / 3</span></div>' +
      '<div class="gauge" aria-hidden="true">' + [1, 2, 3].map(function (n) { return '<i' + (n <= tool.g ? ' class="on"' : '') + '></i>'; }).join('') + '</div>' +
      '<ol class="prio" aria-label="Vos trois priorités">' + prios.map(function (p, i) { return '<li><b>0' + (i + 1) + '</b><div><strong>' + esc(p[0]) + '</strong><span>' + esc(p[1]) + '</span></div></li>'; }).join('') + '</ol>' +
      '<p class="next-step"><span class="mono" style="display:block;margin-bottom:.3rem">Première étape recommandée</span>' + next + '</p>' +
      '<div class="diag-nav"><button type="button" class="link-btn" id="diagRestart">Recommencer</button><button type="button" class="btn btn-primary" id="toRdv">Demander un rendez-vous <span class="arrow" aria-hidden="true">→</span></button></div>' +
      '<p class="sim-hyp" style="margin-top:1.2rem">Orientation générée localement à partir de vos réponses, sans IA générative et sans transmission. Elle sera affinée lors de l\'échange.</p>';
    stage.dataset.grade = grade;
    $('#resTitle').focus({ preventScroll: true });
    $('#diagRestart').addEventListener('click', function () { answers = {}; step = 0; renderQ(true); });
    $('#toRdv').addEventListener('click', renderForm);
  }

  function renderForm() {
    markSide(7);
    var cfg = window.SYNTESIA_CONFIG || CONFIG;
    stage.innerHTML =
      '<div class="field-row"><span class="mono">Demande de rendez-vous</span><span class="mono">30 min · visio</span></div>' +
      '<div class="progress" aria-hidden="true"><i style="width:100%"></i></div>' +
      '<h3 class="q-title" tabindex="-1" id="formTitle">Échangeons sur votre système.</h3>' +
      '<form id="rdvForm" novalidate><div class="form-grid">' +
      field('fName', 'Nom et prénom', 'text', 'name', true) +
      field('fCompany', 'Entreprise', 'text', 'organization', true) +
      field('fEmail', 'E-mail professionnel', 'email', 'email', true) +
      field('fPhone', 'Téléphone (facultatif)', 'tel', 'tel', false) +
      '<div class="input"><label for="fMarket">Marché</label><select id="fMarket" name="market"><option value="FR">France</option><option value="DZ">Algérie</option></select><span class="err"></span></div>' +
      '<div class="input"><label for="fSlot">Créneau préféré</label><select id="fSlot" name="slot"><option>Matin (9 h – 12 h)</option><option>Début d\'après-midi (13 h – 15 h)</option><option>Fin d\'après-midi (15 h – 18 h)</option></select><span class="err"></span></div>' +
      '<div class="sr-only" aria-hidden="true"><label for="fTrap">Site web</label><input id="fTrap" name="website_url" type="text" tabindex="-1" autocomplete="off"></div>' +
      '<div class="full"><label class="consent" for="fConsent"><input type="checkbox" id="fConsent" name="consent"><span>J\'accepte que mes coordonnées et les réponses à mon diagnostic soient utilisées pour me recontacter au sujet de ma demande. Elles ne sont ni revendues ni utilisées à d\'autres fins.</span></label><span class="err" id="consentErr"></span></div>' +
      '</div><div class="diag-nav"><button type="button" class="link-btn" id="formBack">← Mon orientation</button><button type="submit" class="btn btn-primary" id="rdvSubmit">Envoyer la demande <span class="arrow" aria-hidden="true">→</span></button></div>' +
      '<p class="notice" role="note">Prototype : l\'envoi est désactivé (' + esc(cfg.ENVIRONMENT || 'PREPROD') + ', webhook inactif). Sécurité formulaire branchée sur le socle audité AGIA-009.</p></form>';
    $('#formTitle').focus({ preventScroll: true });
    $('#formBack').addEventListener('click', renderResult);
    $('#rdvForm').addEventListener('submit', submitForm);
  }
  function field(id, label, type, ac, req) {
    return '<div class="input"><label for="' + id + '">' + label + '</label><input id="' + id + '" type="' + type + '" autocomplete="' + ac + '"' + (req ? ' required aria-required="true"' : '') + ' aria-describedby="' + id + 'Err"><span class="err" id="' + id + 'Err"></span></div>';
  }
  function setErr(el, msg) {
    el.setAttribute('aria-invalid', msg ? 'true' : 'false');
    $('#' + el.id + 'Err').textContent = msg || '';
  }
  function safeSheet(str, max) {
    if (typeof window.sanitizeSheetField === 'function') return window.sanitizeSheetField(str, max);
    var c = String(str || '').replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, max || 500);
    return /^[=+\-@|%]/.test(c) ? "'" + c : c;
  }
  function submitForm(e) {
    e.preventDefault();
    var trap = $('#fTrap');
    if (trap && trap.value.trim()) return; // honeypot anti-robot
    var name = $('#fName'), co = $('#fCompany'), em = $('#fEmail'), ph = $('#fPhone'), cs = $('#fConsent');
    var first = null;
    function check(el, msg) { setErr(el, msg); if (msg && !first) first = el; }
    check(name, name.value.trim().length < 2 ? 'Indiquez votre nom.' : '');
    check(co, co.value.trim().length < 2 ? 'Indiquez votre entreprise.' : '');
    check(em, /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em.value.trim()) ? '' : 'Adresse e-mail invalide.');
    var phVal = ph.value.trim();
    var phDigits = phVal.replace(/\D/g, '');
    check(ph, phVal && (!/^[+\d\s().\-/]{8,25}$/.test(phVal) || phDigits.length < 8 || phDigits.length > 15) ? 'Numéro invalide (format E.164, 8 à 15 chiffres).' : '');
    $('#consentErr').textContent = cs.checked ? '' : 'Votre accord est nécessaire pour être recontacté.';
    if (!cs.checked && !first) first = cs;
    if (first) { first.focus(); return; }

    var sig = (em.value.trim().toLowerCase() + '|' + co.value.trim().toLowerCase());
    var reg = window.__SYNTESIA_SUBMITTED_SIGNATURES || (window.__SYNTESIA_SUBMITTED_SIGNATURES = {});
    if (reg[sig] && (Date.now() - reg[sig] < 120000)) {
      $('#consentErr').textContent = 'Cette demande a déjà été préparée il y a moins de 2 minutes.';
      return;
    }
    reg[sig] = Date.now();

    var cfg = window.SYNTESIA_CONFIG || CONFIG;
    var payload = {
      environment: cfg.ENVIRONMENT || 'PREPROD',
      webhook_enabled: cfg.WEBHOOK_ENABLED === true,
      source: 'cantara-prototype-accueil',
      nom_sanitized: safeSheet(name.value, 120),
      entreprise_sanitized: safeSheet(co.value, 160),
      diagnostic: answers,
      qualification: stage.dataset.grade,
      market: $('#fMarket').value,
      slot: $('#fSlot').value,
      submittedAt: new Date().toISOString()
    };
    window.__CANTARA_LAST_PAYLOAD = payload;
    markSide(8);
    stage.innerHTML =
      '<div class="field-row"><span class="mono">Demande préparée</span><span class="mono">Prototype</span></div>' +
      '<div class="progress" aria-hidden="true"><i style="width:100%"></i></div>' +
      '<div class="success"><h3 class="q-title" tabindex="-1" id="okTitle">Merci, ' + esc(name.value.trim().split(' ')[0]) + '.</h3>' +
      '<p class="lede" style="margin:0 0 1rem">En production, votre demande et votre diagnostic seraient transmis à notre équipe, avec une réponse sous un jour ouvré.</p></div>' +
      '<p class="notice" role="status">Mode prototype : aucune donnée transmise ni enregistrée. Qualification interne simulée : priorité ' + esc(payload.qualification) + '.</p>' +
      '<div class="diag-nav"><button type="button" class="link-btn" id="diagRestart2">Refaire le diagnostic</button><span></span></div>';
    $('#okTitle').focus({ preventScroll: true });
    $('#diagRestart2').addEventListener('click', function () { answers = {}; step = 0; renderQ(true); });
  }

  renderQ(false);
  onScroll();
})();
