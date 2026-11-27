/*
 * CANTARA V3 — Moteur cinétique Comet × ADN CANTARA (JS natif, 0 dépendance, 60 fps)
 * - Configuration gelée (ENVIRONMENT: 'PREPROD', WEBHOOK_ENABLED: false)
 * - Utilitaires : échappement XSS esc(), formatage monétaire fmtEur(), empreinte locale FNV-1a 32-bit hashDemo()
 * - Suivi analytique local sans cookie des clics sortants (trackOutbound)
 * - Barre de progression de lecture + transition en-tête jour/nuit
 * - Fenêtre 3D qui se redresse au scroll (Comet Container Scroll Animation)
 * - Parallaxe douce des courbes orbitales
 * - Manifeste mot à mot illuminé au scroll
 * - Perspective tilt 3D subtile sur les cartes du Portfolio
 * - Menu mobile accessible (touche Échap + restauration du focus)
 */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var outboundEvents = [];

  window.CANTARA_MOTION = {
    CONFIG: Object.freeze({
      ENVIRONMENT: 'PREPROD',
      WEBHOOK_ENABLED: false,
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
    /* Empreinte de contrôle locale simulée (algorithme déterministe FNV-1a 32 bits) */
    hashDemo: function (txt, prev) {
      var input = String(prev || 'GENESIS') + '|' + String(txt || '');
      var h = 0x811c9dc5;
      for (var i = 0; i < input.length; i++) {
        h ^= input.charCodeAt(i);
        h = Math.imul(h, 0x01000193) >>> 0;
      }
      return 'FNV32-' + h.toString(16).padStart(8, '0').toUpperCase();
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
    }
  };

  function init() {
    var header = document.getElementById('siteHeader');
    var menuBtn = document.getElementById('menuBtn');
    var railBar = document.querySelector('.scroll-rail i');
    var nights = Array.prototype.slice.call(document.querySelectorAll('.night'));
    var cometWindows = Array.prototype.slice.call(document.querySelectorAll('.comet-window[data-scroll-3d]'));
    var orbitBg = document.querySelector('.orbit-bg');

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

    /* Révélations douces au scroll */
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

    /* Boucle scroll rAF (60 fps, GPU transform uniquement) */
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

      if (!reduceMotion) {
        /* Parallaxe orbitale douce */
        if (orbitBg && y < window.innerHeight * 1.4) {
          orbitBg.style.transform = 'translate3d(0,' + (y * 0.14).toFixed(1) + 'px,0)';
        }

        /* Fenêtre 3D Comet qui se redresse au scroll */
        cometWindows.forEach(function (win) {
          var rect = win.getBoundingClientRect();
          var vh = window.innerHeight || 800;
          var p = (vh - rect.top) / (vh * 0.78);
          p = Math.max(0, Math.min(1, p));
          var rotX = (1 - p) * 9;
          var scale = 0.955 + p * 0.045;
          var ty = (1 - p) * 18;
          win.style.transform = 'rotateX(' + rotX.toFixed(2) + 'deg) scale(' + scale.toFixed(4) + ') translate3d(0,' + ty.toFixed(1) + 'px,0)';
        });

        /* Illumination du manifeste mot à mot */
        if (manifesto && manifestoWords.length) {
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
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    }, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    /* Perspective 3D Tilt douce façon Comet sur les cartes du Portfolio (desktop uniquement) */
    if (!reduceMotion && window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
      Array.prototype.slice.call(document.querySelectorAll('.tilt-card')).forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
          var r = card.getBoundingClientRect();
          var rx = (e.clientX - r.left) / r.width;
          var ry = (e.clientY - r.top) / r.height;
          var tiltY = (rx - 0.5) * 4;
          var tiltX = (0.5 - ry) * 4;
          card.style.setProperty('--mx', (rx * 100).toFixed(1) + '%');
          card.style.setProperty('--my', (ry * 100).toFixed(1) + '%');
          card.style.transform = 'perspective(1100px) rotateX(' + tiltX.toFixed(2) + 'deg) rotateY(' + tiltY.toFixed(2) + 'deg) translateY(-3px)';
        });
        card.addEventListener('mouseleave', function () {
          card.style.transform = '';
        });
      });
    }

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
