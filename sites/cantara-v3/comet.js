/*
 * CANTARA V3 — Socle commun & utilitaires (JS natif, 0 dépendance)
 * - Configuration gelée (CONTACT_ENDPOINT configurable côté serveur, WEBHOOK_ENABLED: false par défaut)
 * - Utilitaires : échappement XSS esc(), formatage monétaire fmtEur(), référence de journal hashDemo()
 * - Client de transmission serveur submitServerContact() avec AbortController, anti-double envoi et 4 états explicites
 * - Suivi analytique local sans cookie des clics sortants (trackOutbound)
 * - Barre de progression de lecture + transition en-tête jour/nuit
 * - Manifeste illuminé au défilement + Menu mobile accessible (touche Échap + restauration du focus)
 */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var outboundEvents = [];

  window.CANTARA_MOTION = {
    CONFIG: Object.freeze({
      ENVIRONMENT: 'PREPROD',
      WEBHOOK_ENABLED: false,
      CONTACT_ENDPOINT: '',
      CONTACT_TIMEOUT_MS: 8000,
      SECURIAXE_URL: 'https://naitconv-web.github.io/cos-operations-simulateur/boutique/'
    }),
    reduceMotion: reduceMotion,
    esc: function (s) {
      return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[c];
      });
    },
    fmtEur: function (n) {
      var rounded = Math.round(Number(n) || 0);
      var sign = rounded < 0 ? '-' : '';
      return sign + Math.abs(rounded).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' €';
    },
    /* Identifiant de journalisation déterministe local */
    hashDemo: function (txt, prev) {
      var input = String(prev || 'INIT') + '|' + String(txt || '');
      var h = 0x811c9dc5;
      for (var i = 0; i < input.length; i++) {
        h ^= input.charCodeAt(i);
        h = Math.imul(h, 0x01000193) >>> 0;
      }
      return 'JRN-' + (h >>> 0).toString(16).slice(0, 6).toUpperCase();
    },
    trackOutbound: function (product, url) {
      var evt = {
        product: String(product || 'unknown'),
        url: String(url || ''),
        timestamp: new Date().toISOString()
      };
      outboundEvents.push(evt);
      return evt;
    },
    getOutboundEvents: function () {
      return outboundEvents.slice();
    },
    /*
     * Client de transmission serveur (§2.2 du Mandat)
     * Retourne une Promise résolue avec { status: 'CONFIRMED' | 'TIMEOUT' | 'ERROR' | 'UNCONFIGURED', message, serverRef }
     * Ne simule JAMAIS un envoi réussi si aucun service de réception n'a confirmé l'enregistrement.
     */
    submitServerContact: function (payload) {
      var cfg = window.CANTARA_MOTION.CONFIG;
      var endpoint = (cfg.WEBHOOK_ENABLED && cfg.CONTACT_ENDPOINT) ? String(cfg.CONTACT_ENDPOINT).trim() : '';
      if (!endpoint) {
        return Promise.resolve({
          status: 'UNCONFIGURED',
          message: 'Aucun service de réception serveur n\'est raccordé sur cet hébergement statique (prérequis externe en attente de configuration). Aucune donnée n\'a été transmise sur le réseau.'
        });
      }
      var ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
      var timer = setTimeout(function () {
        if (ctrl) ctrl.abort();
      }, cfg.CONTACT_TIMEOUT_MS || 8000);

      return fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
        signal: ctrl ? ctrl.signal : undefined
      }).then(function (res) {
        clearTimeout(timer);
        if (!res.ok) {
          return {
            status: 'ERROR',
            message: 'Le service de réception a retourné un code d\'erreur HTTP (' + res.status + ').'
          };
        }
        return res.json().catch(function () { return { ok: true }; }).then(function (data) {
          if (data && (data.ok === true || data.status === 'success' || data.received === true)) {
            return {
              status: 'CONFIRMED',
              message: 'Votre demande a été reçue et confirmée par le serveur.',
              serverRef: data.id || data.ref || null
            };
          }
          return {
            status: 'ERROR',
            message: 'Réponse serveur reçue sans confirmation explicite d\'enregistrement.'
          };
        });
      }).catch(function (err) {
        clearTimeout(timer);
        if (err && err.name === 'AbortError') {
          return {
            status: 'TIMEOUT',
            message: 'Délai d\'attente dépassé (' + Math.round((cfg.CONTACT_TIMEOUT_MS || 8000) / 1000) + ' s) sans réponse du serveur.'
          };
        }
        return {
          status: 'ERROR',
          message: 'Impossible de joindre le service de réception serveur.'
        };
      });
    }
  };

  function init() {
    var header = document.getElementById('siteHeader');
    var menuBtn = document.getElementById('menuBtn');
    var railBar = document.querySelector('.scroll-rail i');
    var nights = Array.prototype.slice.call(document.querySelectorAll('.night'));

    /* Suivi analytique sans cookie des clics sortants vers les sites métiers */
    document.addEventListener('click', function (e) {
      var link = e.target && e.target.closest ? e.target.closest('[data-outbound-product]') : null;
      if (link) {
        window.CANTARA_MOTION.trackOutbound(
          link.getAttribute('data-outbound-product'),
          link.getAttribute('href')
        );
      }
    });

    /* Manifeste mot à mot (ADN CANTARA) */
    var manifesto = document.getElementById('manifesto');
    var manifestoWords = [];
    if (manifesto && !reduceMotion) {
      var raw = manifesto.textContent.trim().split(/\s+/);
      manifesto.innerHTML = raw.map(function (w) {
        return '<span class="w">' + window.CANTARA_MOTION.esc(w) + '</span>';
      }).join(' ');
      manifestoWords = Array.prototype.slice.call(manifesto.querySelectorAll('.w'));
    }

    /* Révélations sobres au défilement */
    var fadeEls = Array.prototype.slice.call(document.querySelectorAll('.fade-up'));
    if (reduceMotion || !('IntersectionObserver' in window)) {
      fadeEls.forEach(function (el) { el.classList.add('in'); });
    } else {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add('in');
            obs.unobserve(en.target);
          }
        });
      }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });
      fadeEls.forEach(function (el) { obs.observe(el); });
    }

    /* Boucle scroll rAF (barre de lecture, en-tête jour/nuit, manifeste) */
    var ticking = false;
    function onScroll() {
      ticking = false;
      var y = window.scrollY || 0;
      var maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

      if (railBar) {
        railBar.style.width = Math.min(100, Math.max(0, (y / maxScroll) * 100)).toFixed(2) + '%';
      }

      if (header) {
        header.classList.toggle('scrolled', y > 10);
        if (nights.length) {
          var probe = header.getBoundingClientRect().bottom - 4;
          var inNight = nights.some(function (n) {
            var r = n.getBoundingClientRect();
            return r.top <= probe && r.bottom >= probe;
          });
          document.documentElement.classList.toggle('in-night', inNight);
        }
      }

      if (!reduceMotion && manifesto && manifestoWords.length) {
        var mr = manifesto.getBoundingClientRect();
        var vh2 = window.innerHeight || 800;
        var prog = (vh2 * 0.85 - mr.top) / (mr.height + vh2 * 0.35);
        prog = Math.max(0, Math.min(1, prog));
        var litCount = Math.round(prog * manifestoWords.length);
        for (var i = 0; i < manifestoWords.length; i++) {
          manifestoWords[i].classList.toggle('lit', i < litCount);
        }
      }
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    }, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    /* Menu mobile accessible (Échap + focus restore) */
    if (header && menuBtn) {
      function closeMenu() {
        header.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.textContent = 'Menu';
      }
      menuBtn.addEventListener('click', function () {
        var open = !header.classList.contains('open');
        header.classList.toggle('open', open);
        menuBtn.setAttribute('aria-expanded', String(open));
        menuBtn.textContent = open ? 'Fermer' : 'Menu';
      });
      Array.prototype.slice.call(document.querySelectorAll('.nav a')).forEach(function (a) {
        a.addEventListener('click', closeMenu);
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && header.classList.contains('open')) {
          closeMenu();
          menuBtn.focus();
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
